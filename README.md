# [jQuery asSpinner](https://github.com/amazingSurge/jquery-asSpinner) ![bower][bower-image] [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![prs-welcome]](#contributing)

> A jquery plugin that convent a input into spinner that allows you to spin numbers with button.

## Table of contents
- [Main files](#main-files)
- [Quick start](#quick-start)
- [Requirements](#requirements)
- [Usage](#usage)
- [Examples](#examples)
- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [No conflict](#no-conflict)
- [Browser support](#browser-support)
- [Contributing](#contributing)
- [Development](#development)
- [Changelog](#changelog)
- [Copyright and license](#copyright-and-license)

## Main files
```
dist/
├── jquery-asSpinner.js
├── jquery-asSpinner.es.js
├── jquery-asSpinner.min.js
└── css/
    ├── asSpinner.css
    └── asSpinner.min.css
```

## Quick start
Several quick start options are available:
#### Download the latest build

 * [Development](https://raw.githubusercontent.com/amazingSurge/jquery-asSpinner/master/dist/jquery-asSpinner.js) - unminified
 * [Production](https://raw.githubusercontent.com/amazingSurge/jquery-asSpinner/master/dist/jquery-asSpinner.min.js) - minified

#### Install From Bower
```sh
bower install jquery-asSpinner --save
```

#### Install From Npm
```sh
npm install jquery-asSpinner --save
```

#### Build From Source
If you want build from source:

```sh
git clone git@github.com:amazingSurge/jquery-asSpinner.git
cd jquery-asSpinner
npm install
npm install -g gulp-cli babel-cli
gulp build
```

Done!

## Requirements
`jquery-asSpinner` requires the latest version of [`jQuery`](https://jquery.com/download/).

## Usage
#### Including files:

```html
<link rel="stylesheet" href="/path/to/asSpinner.css">
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery-asSpinner.js"></script>
```

#### Required HTML structure

```html
<input type="text" class="example" value="0" />
```

#### Initialization
All you need to do is call the plugin on the element:

```javascript
jQuery(function($) {
  $('.example').asSpinner(); 
});
```

## Examples
There are some example usages that you can look at to get started. They can be found in the
[examples folder](https://github.com/amazingSurge/jquery-asSpinner/tree/master/examples).

## Options
`jquery-asSpinner` can accept an options object to alter the way it behaves. You can see the default options by call `$.asSpinner.setDefaults()`. The structure of an options object is as follows:

```
{
  namespace: 'asSpinner',
  skin: null,

  disabled: false,
  min: -10,
  max: 10,
  step: 1,
  name: null,
  precision: 0,
  rule: null, //string, shortcut define max min step precision

  looping: true, // if cycling the value when it is outofbound
  mousewheel: false, // support mouse wheel

  format(value) { // function, define custom format
    return value;
  },
  parse(value) { // function, parse custom format value
    return parseFloat(value);
  }
}
```

## Methods
Methods are called on asSpinner instances through the asSpinner method itself.
You can also save the instances to variable for further use.

```javascript
// call directly
$().asSpinner('destory');

// or
var api = $().data('asSpinner');
api.destory();
```

#### val(value)
Set the spinner value if value is defined or get the value.
```javascript
// set the val
$().asSpinner('val', '5');

// get the val
var value = $().asSpinner('val');
```

#### set(value)
Set the spinner value
```javascript
$().asSpinner('set', '5');
```

#### get()
Get the spinner value.
```javascript
var value = $().asSpinner('get');
```

#### spinUp()
Spin up the value.
```javascript
$().asSpinner('spinUp');
```

#### spinDown()
Spin down the value.
```javascript
$().asSpinner('spinUp');
```

#### enable()
Enable the spinner functions.
```javascript
$().asSpinner('enable');
```

#### disable()
Disable the spinner functions.
```javascript
$().asSpinner('disable');
```

#### destroy()
Destroy the spinner instance.
```javascript
$().asSpinner('destroy');
```

## Events
`jquery-asSpinner` provides custom events for the plugin’s unique actions. 

```javascript
$('.the-element').on('asSpinner::ready', function (e) {
  // on instance ready
});

```

Event   | Description
------- | -----------
init    | Fires when the instance is setup for the first time.
ready   | Fires when the instance is ready for API use.
change  | Fires when the value is changing
enable  | Fired immediately when the `enable` instance method has been called.
disable | Fired immediately when the `disable` instance method has been called.
destroy | Fires when an instance is destroyed. 

## No conflict
If you have to use other plugin with the same namespace, just call the `$.asSpinner.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="jquery-asSpinner.js"></script>
<script>
  $.asSpinner.noConflict();
  // Code that uses other plugin's "$().asSpinner" can follow here.
</script>
```

## Browser support

Tested on all major browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_32x32.png" alt="Safari"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_32x32.png" alt="Chrome"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_32x32.png" alt="Firefox"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/edge/edge_32x32.png" alt="Edge"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_32x32.png" alt="IE"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_32x32.png" alt="Opera"> |
|:--:|:--:|:--:|:--:|:--:|:--:|
| Latest ✓ | Latest ✓ | Latest ✓ | Latest ✓ | 9-11 ✓ | Latest ✓ |

As a jQuery plugin, you also need to see the [jQuery Browser Support](http://jquery.com/browser-support/).

## Contributing
Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md). Make sure you're using the latest version of `jquery-asSpinner` before submitting an issue. There are several ways to help out:

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)
* Write test cases for open bug issues
* Contribute to the documentation

## Development
`jquery-asSpinner` is built modularly and uses Gulp as a build system to build its distributable files. To install the necessary dependencies for the build system, please run:

```sh
npm install -g gulp
npm install -g babel-cli
npm install
```

Then you can generate new distributable files from the sources, using:
```
gulp build
```

More gulp tasks can be found [here](CONTRIBUTING.md#available-tasks).

## Changelog
To see the list of recent changes, see [Releases section](https://github.com/amazingSurge/jquery-asSpinner/releases).

## Copyright and license
Copyright (C) 2016 amazingSurge.

Licensed under [the LGPL license](LICENSE).

[⬆ back to top](#table-of-contents)

[bower-image]: https://img.shields.io/bower/v/jquery-asSpinner.svg?style=flat
[bower-link]: https://david-dm.org/amazingSurge/jquery-asSpinner/dev-status.svg
[npm-image]: https://badge.fury.io/js/jquery-asSpinner.svg?style=flat
[npm-url]: https://npmjs.org/package/jquery-asSpinner
[license]: https://img.shields.io/npm/l/jquery-asSpinner.svg?style=flat
[prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[daviddm-image]: https://david-dm.org/amazingSurge/jquery-asSpinner.svg?style=flat
[daviddm-url]: https://david-dm.org/amazingSurge/jquery-asSpinner
