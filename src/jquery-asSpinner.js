/*
 * spinner
 * https://github.com/amazingSurge/jquery-spinner
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {

    var AsSpinner = $.asSpinner = function(element, options) {
        this.element = element;
        this.$element = $(element);

        // options
        var meta_data = [];
        $.each(this.$element.data(), function(k, v) {
            var re = new RegExp("^asSpinner", "i");
            if (re.test(k)) {
                meta_data[k.toLowerCase().replace(re, '')] = v;
            }
        });

        this.options = $.extend({}, AsSpinner.defaults, options, meta_data);
        this.namespace = this.options.namespace;

        if (this.options.rule) {
            var self = this;
            var array = ['min', 'max', 'step', 'precision'];
            $.each(array, function(key, value) {
                self[value] = AsSpinner.rules[self.options.rule][value];
            });
        } else {
            this.min = this.options.min;
            this.max = this.options.max;
            this.step = this.options.step;
            this.precision = this.options.precision;
        }

        // get input value attr setting 
        if (this.isNumber(this.$element.val())) {
            this.options.value = this.$element.val();
        }

        this.disabled = false;
        this.value = this.options.value;
        this.eventBinded = false;
        this.mousewheel = this.options.mousewheel;
        this.spinTimeout = null;
        this.isFocused = false;

        this.classes = {
            disabled: this.namespace + '_disabled',
            skin: this.namespace + '_' + this.options.skin,
            focus: this.namespace + '_focus',

            control: this.namespace + '-control',
            prev: this.namespace + '-prev',
            next: this.namespace + '-next',
            wrap: this.namespace + '-wrap'
        };

        this.init();
    };

    AsSpinner.prototype = {
        constructor: AsSpinner,

        init: function() {
            this.$control = $('<div class="' + this.namespace + '-control"><span class="' + this.classes.prev + '"></span><span class="' + this.classes.next + '"></span></div>');
            this.$wrap = this.$element.wrap('<div tabindex="0" class="' + this.classes.wrap + '"></div>').parent();
            this.$prev = this.$control.find('.' + this.classes.prev);
            this.$next = this.$control.find('.' + this.classes.next);

            this.$element.addClass(this.namespace);

            if (this.options.skin) {
                this.$wrap.addClass(this.classes.skin);
            }

            this.$control.appendTo(this.$wrap);

            if (this.disabled === false) {
                // attach event
                this.bindEvent();
            } else {
                this.$wrap.addClass(this.classes.disabled);
            }

            // inital
            this.set(this.value);
            this.$element.trigger('asSpinner::ready', this);
        },
        // 500ms to detect if it is a click event
        // 60ms interval execute if it if long pressdown
        spin: function(fn, timeout) {
            var self = this;
            var next = function(timeout) {
                clearTimeout(self.spinTimeout);
                self.spinTimeout = setTimeout(function() {
                    fn.call(self);
                    next(60);
                }, timeout);
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
            this.$prev.on('mousedown.asSpinner', function() {
                self._focus();
                self.spin(self.prev);
                return false;
            }).on('mouseup.asSpinner', function() {
                clearTimeout(self.spinTimeout);
                self.prev.call(self);
                return false;
            });

            this.$next.on('mousedown.asSpinner', function() {
                self._focus();
                self.spin(self.next);
                return false;
            }).on('mouseup.asSpinner', function() {
                clearTimeout(self.spinTimeout);
                return false;
            }).on('click.asSpinner', function() {
                self.next.call(self);
                return false;
            });

            this.$element.on('focus.asSpinner', function() {
                var value = $.trim(self.$element.val());
                // here how to parse value for input value attr
                if (typeof self.options.parse === 'function') {
                    value = self.options.parse(value);
                } else {
                    // TODO: default parse method
                    var matches = value.match(/([0-9.]+)/);
                    value = matches[1];
                }
                self._set(value);
                return false;
            }).on('blur.asSpinner', function() {
                self.set(self.value);
                return false;
            });

            this.$wrap.on('blur.asSpinner', function() {
                self.set(self.value);
                self.$wrap.removeClass(self.classes.focus);
                return false;
            }).on('click.asSpinner', function() {
                self.$wrap.addClass(self.classes.focus);
                return false;
            });

            this.$element.on('focus.asSpinner', function() {
                self.isFocused = true;
                $(this).on('keydown.asSpinner', function(e) {
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
            }).on('blur.asSpinner', function() {
                self.isFocused = false;
                $(this).off('keydown.asSpinner');
                self.$wrap.removeClass(self.classes.focus);
                if (self.mousewheel === true) {
                    self.$element.unmousewheel();
                }
            });
        },
        unbindEvent: function() {
            this.eventBinded = false;
            this.$element.off('focus.asSpinner').off('blur.asSpinner').off('keydown.asSpinner');
            this.$prev.off('click.asSpinner').off('mousedown.asSpinner').off('mouseup.asSpinner');
            this.$next.off('click.asSpinner').off('mousedown.asSpinner').off('mouseup.asSpinner');
            this.$wrap.off('blur.asSpinner').off('click.asSpinner');
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
            if (value < this.min) {
                return -1;
            }
            if (value > this.max) {
                return 1;
            }
            return 0;
        },
        _set: function(value, callback) {
            var valid = this.isOutOfBounds(value);
            if (valid !== 0) {
                if (this.options.looping === true) {
                    value = (valid === 1) ? this.min : this.max;
                } else {
                    value = (valid === -1) ? this.min : this.max;
                }
            }
            this.value = value = Number(value).toFixed(this.precision);
            if (typeof callback === 'function') {
                value = callback(value);
            }
            this.$element.val(value);
        },
        set: function(value) {
            this._set(value, this.options.format);
            this.$element.trigger('asSpinner::change', this);
        },
        get: function() {
            return this.value;
        },
        update: function(obj) {
            obj.min && this.min = obj.min;
            obj.max && this.max = obj.max;
            obj.precision && this.precision = obj.precision;
            obj.step && this.step = obj.step;

            obj.value && this.set(obj.value);
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
            this.value = parseFloat(this.value) - parseFloat(this.step);
            this._set(this.value);
            return this;
        },
        next: function() {
            if (!$.isNumeric(this.value)) {
                this.value = 0;
            }
            this.value = parseFloat(this.value) + parseFloat(this.step);
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

    AsSpinner.rules = {
        defaults: {
            min: null,
            max: null,
            step: 1,
            precision: 0
        },
        currency: {
            min: 0.00,
            max: 99999,
            step: 0.01,
            precision: 2
        },
        quantity: {
            min: 1,
            max: 999,
            step: 1,
            precision: 0
        },
        percent: {
            min: 1,
            max: 100,
            step: 1,
            precision: 0
        },
        month: {
            min: 1,
            max: 12,
            step: 1,
            precision: 0
        },
        day: {
            min: 1,
            max: 31,
            step: 1,
            precision: 0
        },
        hour: {
            min: 0,
            max: 23,
            step: 1,
            precision: 0
        },
        minute: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        },
        second: {
            min: 1,
            max: 59,
            step: 1,
            precision: 0
        }
    };

    AsSpinner.defaults = {
        namespace: 'asSpinner',
        skin: null,

        value: 0,
        min: -10,
        max: 10,
        step: 1,
        precision: 0,
        rule: null, //string, shortcut define max min step precision 

        looping: false, // if cycling the value when it is outofbound
        mousewheel: false, // support mouse wheel

        format: null, // function, define custom format
        parse: null // function, parse custom format value
    };

    $.fn.asSpinner = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'asSpinner');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {
            return this.each(function() {
                if (!$.data(this, 'asSpinner')) {
                    $.data(this, 'asSpinner', new AsSpinner(this, options));
                }
            });
        }
    };

}(jQuery));