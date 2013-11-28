/*! jquery spiner - v0.1.0 - 2013-11-28
* https://github.com/amazingSurge/jquery-spiner
* Copyright (c) 2013 amazingSurge; Licensed GPL */
(function($) {

    var Spinner = $.spinner = function(element, options) {
        this.element = element;
        this.$element = $(element);

        this.options = $.extend({}, Spinner.defaults, options);
        this.namespace = this.options.namespace;
        this.disabled = false;
        this.step = this.options.step;
        this.value = this.options.value;

        this.eventBinded = false;
        this.mousewheel = this.options.mousewheel;
        this.spinTimeout = null;
        this.isFocused = false;

        this.classes = {
            disabled: this.namespace + '_disabled',
            skin: this.namespace + '_' + this.options.skin,
            focus: this.namespace + '_focus'
        };
        
        this.init();
    };

    Spinner.prototype = {
        constructor: Spinner,

        init: function() {
            this.$control = $('<div class="' + this.namespace + '-control"><span class="' + this.namespace + '-prev"></span><span class="' + this.namespace + '-next"></span></div>');

            this.$prev = this.$control.find('.' + this.namespace + '-prev');
            this.$next = this.$control.find('.' + this.namespace + '-next');

            this.$element.wrap('<div tabindex="0" class="' + this.namespace + '-wrap"></div>');
            this.$wrap = this.$element.parent();
            
            this.$element.addClass(this.namespace);

            if (this.options.skin) {
                this.$wrap.addClass(this.classes.skin);
            }

            this.$control.appendTo(this.$wrap);

            // attach event
            if (this.disabled === false) {
                this.bindEvent();
            } else {
                this.$wrap.addClass(this.classes.disabled);
            }

            // inital
            this.set(this.value);
            this.$element.trigger('spinner::ready', this);
        },
        // 500ms to detect if it is a click event
        // 100ms interval execute if it if long pressdown
        spin: function(fn,timeout) {
            var self = this;
            var next = function(timeout) {
                clearTimeout(self.spinTimeout);    
                self.spinTimeout = setTimeout(function(){
                    fn.call(self);
                    next(100);
                },timeout);
            };
            next(timeout || 500);
        },
        _focus: function() {
            if (!this.isFocused) {
                this.$element.focus();
            }
        },
        bindEvent: function() {
            var self = this;
            this.eventBinded = true;
            this.$prev.on('mousedown.spinner', function() {
                self._focus();
                self.spin(self.prev);
                return false;
            }).on('mouseup',function() {
                clearTimeout(self.spinTimeout);
                self.prev.call(self);
                return false;
            });

            this.$next.on('mousedown.spinner', function() {
                self._focus();
                self.spin(self.next);
                return false;
            }).on('mouseup',function() {
                clearTimeout(self.spinTimeout);
                return false;
            }).on('click.spinner', function() {
                self.next.call(self);
                return false;
            });

            this.$element.on('focus.spinner', function() {
                self._set(self.value);
                return false;
            }).on('blur.spinner', function() {
                var value = self.$element.val().replace(' ','');
                
                if ($.isNumeric(value) === false) {
                    value = self.value;
                }

                if (self.isOutOfBounds(value) === 'min') {
                     value = self.options.min;  
                }
                if (self.isOutOfBounds(value) === 'max') {
                    value = self.options.max;
                }

                self.set(value);
                return false;
            });

            this.$wrap.on('blur.spinner', function() {
                self.set(self.value);
                self.$wrap.removeClass(self.classes.focus);
                return false;
            }).on('click.spinner', function() {
                self.$wrap.addClass(self.classes.focus);
                return false;
            });

            this.$element.on('focus.spinner', function() {
                self.isFocused = true;
                $(this).on('keydown.spinner', function(e) {
                    var key = e.keyCode || e.which;
                    if (key === 38) {
                        self.next.call(self);
                        return false;
                    }
                    if (key === 40) {
                        self.prev.call(self);
                        return false;
                    }
                });
                if (self.mousewheel === true) {
                    $(this).mousewheel(function(event, delta) {
                        if (delta > 0) {
                            self.next();
                        } else {
                            self.prev();
                        }
                        event.preventDefault();
                    });
                }
            }).on('blur.spinner', function() {
                self.isFocused = false;
                $(this).off('keydown.spinner');
                self.$wrap.removeClass(self.classes.focus);
                if (self.mousewheel === true) {
                    self.$element.unmousewheel();
                }
            });
        },
        unbindEvent: function() {
            this.eventBinded = false;
            this.$element.off('focus').off('blur').off('keydown');
            this.$prev.off('click');
            this.$next.off('click');
            this.$wrap.off('blur').off('click');
        },
        isNumber: function(value) {
            // get rid of NaN
            if (typeof value === 'number' && $.isNumeric(value)) {
                return true;
            } else {
                return false;
            }
        },
        isOutOfBounds: function(value) {
            if (value < this.options.min) {
                return -1;
            }
            if (value > this.options.max) {
                return 1;
            }
            return 0;
        },
        _set: function(value) {
            var valid = this.isOutOfBounds(value);
            if (valid !== 0) {
                if (this.options.looping === true) {
                    value = (valid === 1) ? this.options.min : this.options.max;
                } else {
                    value = (valid === -1) ? this.options.min : this.options.max;
                }
            }
            this.value = value;
            this.$element.val(value);
        },
        set: function(value) {
            this.value = value;
            if (typeof this.options.format === 'function') {
                value = this.options.format(value);
            }

            this.$element.val(value);
            this.$element.trigger('spinner::change', this);
        },
        get: function() {
            return this.value;
        },

        /*
            Public Method
         */
        
        val: function(value) {
            if (value) {
                this.set(value);
            } else {
                return this.get();
            }
        },
        prev: function() {
            if (!$.isNumeric(this.value)) {
                this.value = 0;
            }
            this.value = parseInt(this.value, 10) - parseInt(this.step, 10);   
            this._set(this.value);
            return this;
        },
        next: function() {
            if (!$.isNumeric(this.value)) {
                this.value = 0;
            }
            this.value = parseInt(this.value, 10) + parseInt(this.step, 10);
            this._set(this.value);
            return this;
        },
        enable: function() {
            this.disabled = false;
            this.$wrap.addClass(this.classes.disabled);
            if (this.eventBinded === false) {
                this.bindEvent();
            } 
            return this;
        },
        disable: function() {
            this.disabled = true;
            this.$wrap.removeClass(this.classes.disabled);
            this.unbindEvent();
            return this;
        },
        destroy: function() {
            this.unbindEvent();
        }
    };

    Spinner.defaults = {
        namespace: 'spinner',
        skin: null,

        value: 0,
        min: -10,
        max: 10,
        step: 1,

        looping: false,
        mousewheel: false,

        format: function(value) {
            return value + ' minutes';
        }
    };

    $.fn.spinner = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'spinner');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function() {
                if (!$.data(this, 'spinner')) {
                    $.data(this, 'spinner', new Spinner(this, options));
                }
            });
        }
    };
    
}(jQuery));


// (function() {
//     $(document).on('spinner::change',function(event, instance) {
//         console.log(instance.val());
//         console.log(instance);
//     });
// })
// thanks to https://github.com/brandonaaron/jquery-mousewheel

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
        if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }

        // New school wheel delta (wheel event)
        if ( orgEvent.deltaY ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( orgEvent.deltaX ) {
            deltaX = orgEvent.deltaX;
            delta  = deltaX * -1;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Look for lowest delta to normalize the delta values
        absDelta = Math.abs(delta);
        if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }

        // Get a whole value for the deltas
        fn = delta > 0 ? 'floor' : 'ceil';
        delta  = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
}));