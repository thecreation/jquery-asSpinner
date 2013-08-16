# jQuery spiner

The powerful jQuery plugin that creates spinner. <a href="http://amazingsurge.github.io/jquery-spiner/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-spiner/archive/master.zip">jquery-spiner-master.zip</a>

***

## Features

* **Keyboard navigation support** — use `Arrow up/down` to navigate
* **Lightweight size** — 1 kb gzipped

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-spiner.min.js

And CSS:
* jquery-spinner.css - desirable if you have not yet connected one


Create base html element:
```html
    <input type="text" class="custom" value="0"/>
```

Initialize tabs:
```javascript
$('.custom').spinner();
```

Or initialize spiner with custom settings:
```javascript
$('.custom').spinner({
       namespace: 'spinner',
       skin: 'simple',
       value: 0,
       min: 0,
       max: 10,
       step: 1,
       looping: true
});
```



## Settings

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>namespace</td>
            <td>'spinner'</td>
            <td>Optional property, set a namspace for css class, for example, we have <code>.spinner_active</code> class for active effect, if namespace set to 'as-spinner', then it will be <code>.as-spinner_active</code></td>
        </tr>
        <tr>
            <td>skin</td>
            <td>'simple'</td>
            <td>Optional property, set transition effect, it works after you load specified skin file</td>
        </tr>
        <tr>
            <td>value</td>
            <td>0</td>
            <td>Optional property,set the input's start value  when spinner initilize</td>
        </tr>
        <tr>
            <td>min</td>
            <td>0</td>
            <td>Optional property, set the minimal value of input</td>
        </tr>
        <tr>
            <td>max</td>
            <td>10</td>
            <td>Optional property, set the maximal value of input</td>
        </tr>
        <tr>
            <td>step</td>
            <td>1</td>
            <td>Optional property, set the spacing of value</td>
        </tr>
        <tr>
            <td>looping</td>
            <td>true</td>
            <td>Optional property, if true, the value will loop</td>
        </tr>
        <tr>
            <td>keyboard</td>
            <td>true</td>
            <td>Optional property, if true, open keyboard navigation function</td>
        </tr>
    </tbody>
</table>

## Public methods

jquery spinner has different methods , we can use it as below :
```javascript
// set element's value
$('.custom').spinner("set");

// get element's value
$('.custom').spinner("get");

// element's value become prevous
$('.custom').spinner("prev");

// element's value become next
$('.custom').spinner("next");

// judge value whether a number
$('.custom').spinner("isNumber");

// judge element's value whether out of bounds
$('.custom').spinner("isOutOfBounds");

//element's value can be setted
$('.custom').spinner("enable");

// element's value cann't be setted
$('.custom').spinner("disable");
```

## Browser support
jquery-spiner is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|   0.1.x | ([compare][compare-1.1]) add keyboard function                   |
|     ... | ...                                                              |

[compare-1.1]: https://github.com/amazingSurge/jquery-spiner/compare/v1.1.0...v1.2.0

## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-spiner plugin is released under the <a href="https://github.com/amazingSurge/jquery-spiner/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


