# jQuery asSpinner

The powerful jQuery plugin that creates spinner that allows you to spin articles with button. 
Download: <a href="https://github.com/amazingSurge/jquery-asSpinner/archive/master.zip">jquery-asSpinner-master.zip</a>

***

## Features

* **Spin a number range** — Provide a range of numbers with an interval to spin these values
* **Keyboard navigation support** — use `Arrow up/down` to navigate
* **Lightweight size** — 1 kb gzipped
* **Looping Spinner** — once you reach to the end, it can automatically start over again

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-asSpinner.min.js

And CSS:
* jquery-spinner.css - desirable if you have not yet connected one


Create base html element:
```html
    <input type="text" class="custom" value="0"/>
```

Initialize spinner:
```javascript
$('.custom').spinner();
```

Or initialize asSpinner with custom settings:
```javascript
$('.custom').asSpinner({
       namespace: 'asSpinner',
       skin: 'simple',
       value: 0,
       min: 0,
       max: 10,
       step: 1,
       looping: true
});
```

Mouse Whell function depends on https://github.com/brandonaaron/jquery-mousewheel

## Settings

```javascript
{
    // Optional property, Set a namespace for css class
    namespace: 'asSpinner',

    //Optional property, set transition effect, it works after you load specified skin file
    skin: 'simple',

    //Optional property, set the minimum value of asSpinner
    min: 0,

    //Optional property, set the maximum value of asSpinner
    max: 10,

    //Optional property, set the interval between neighbouring value
    step: 1,

    //Optional property,if the value reaches to the either of the ends in the provided range，list it starts over from the other end on setting the value to this option as true.
    looping: true

    //Optional property, if true, open keyboard navigation function
    keyboard: true
      
}
```

## Public methods

jquery asSpinner has different methods , we can use it as below :
```javascript
// set element's value
$('.custom').asSpinner("set");

// get element's value
$('.custom').asSpinner("get");

// element's value become spinDownous
$('.custom').asSpinner("spinDown");

// element's value become spinUp
$('.custom').asSpinner("spinUp");

// judge value whether a number
$('.custom').asSpinner("isNumber");

// judge element's value whether out of bounds
$('.custom').asSpinner("isOutOfBounds");

//element's value can be setted
$('.custom').asSpinner("enable");

// element's value cann't be setted
$('.custom').asSpinner("disable");
```

## Browser support
jquery-asSpinner is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-asSpinner plugin is released under the <a href="https://github.com/amazingSurge/jquery-asSpinner/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


