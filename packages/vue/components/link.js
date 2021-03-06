import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import F7Icon from './icon';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-link',
  props: {
    id: [
      String,
      Number
    ],
    noLinkClass: Boolean,
    noFastClick: Boolean,
    noFastclick: Boolean,
    text: String,
    tabLink: [
      Boolean,
      String
    ],
    tabLinkActive: Boolean,
    tabbarLabel: Boolean,
    iconOnly: Boolean,
    badge: [
      String,
      Number
    ],
    badgeColor: [String],
    iconBadge: [
      String,
      Number
    ],
    href: {
      type: [
        String,
        Boolean
      ],
      default: '#'
    },
    ...Mixins.colorProps,
    ...Mixins.linkIconProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps
  },
  data() {
    const props = __vueComponentProps(this);
    const state = (() => {
      return { isTabbarLabel: props.tabbarLabel };
    })();
    return { state };
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {text, badge, badgeColor, iconOnly, iconBadge, icon, iconColor, iconSize, iconMaterial, iconIon, iconFa, iconF7, iconIfMd, iconIfIos, id, style} = props;
    const defaultSlots = self.$slots.default;
    let iconEl;
    let textEl;
    let badgeEl;
    let iconBadgeEl;
    if (text) {
      if (badge)
        badgeEl = _h(F7Badge, { attrs: { color: badgeColor } }, [badge]);
      textEl = _h('span', { class: self.state.isTabbarLabel ? 'tabbar-label' : '' }, [
        text,
        badgeEl
      ]);
    }
    if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconIfMd && self.$theme.md || iconIfIos && self.$theme.ios) {
      if (iconBadge) {
        iconBadgeEl = _h(F7Badge, { attrs: { color: badgeColor } }, [iconBadge]);
      }
      iconEl = _h(F7Icon, {
        attrs: {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
          icon: icon,
          ifMd: iconIfMd,
          ifIos: iconIfIos,
          color: iconColor,
          size: iconSize
        }
      }, [iconBadgeEl]);
    }
    if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
      self.iconOnlyComputed = true;
    } else {
      self.iconOnlyComputed = false;
    }
    return _h('a', __vueComponentTransformJSXProps({
      ref: 'el',
      style: style,
      class: self.classes,
      ...self.attrs,
      on: { click: self.onClick.bind(self) },
      attrs: { id: id }
    }), [
      iconEl,
      textEl,
      defaultSlots
    ]);
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {tabbarLabel, tabLink} = self.props;
    let isTabbarLabel = false;
    if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
      isTabbarLabel = true;
    }
    self.setState({ isTabbarLabel });
  },
  computed: {
    attrs() {
      const self = this;
      const props = self.props;
      const {href, target, tabLink} = props;
      let hrefComputed = href;
      if (href === true)
        hrefComputed = '#';
      if (href === false)
        hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    },
    classes() {
      const self = this;
      const props = self.props;
      const {noFastclick, noFastClick, tabLink, tabLinkActive, noLinkClass, className} = props;
      return Utils.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },
    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  }
};