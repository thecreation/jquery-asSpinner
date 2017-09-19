export default {
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
};
