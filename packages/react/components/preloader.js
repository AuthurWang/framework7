import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Preloader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get sizeComputed() {
    let s = this.props.size;
    if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
      s = s.replace('px', '');
    }
    return s;
  }
  render() {
    const self = this;
    const {sizeComputed} = self;
    const props = self.props;
    const {id, style, className} = props;
    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${ sizeComputed }px`;
      preloaderStyle.height = `${ sizeComputed }px`;
    }
    if (style)
      Utils.extend(preloaderStyle, style || {});
    let innerEl;
    if (self.$theme.md) {
      innerEl = React.createElement('span', { className: 'preloader-inner' }, React.createElement('span', { className: 'preloader-inner-gap' }), React.createElement('span', { className: 'preloader-inner-left' }, React.createElement('span', { className: 'preloader-inner-half-circle' })), React.createElement('span', { className: 'preloader-inner-right' }, React.createElement('span', { className: 'preloader-inner-half-circle' })));
    }
    const classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
    return React.createElement('span', {
      id: id,
      style: preloaderStyle,
      className: classes
    }, innerEl);
  }
}
__reactComponentSetProps(F7Preloader, {
  id: [
    String,
    Number
  ],
  size: [
    Number,
    String
  ],
  ...Mixins.colorProps
});
export default F7Preloader;