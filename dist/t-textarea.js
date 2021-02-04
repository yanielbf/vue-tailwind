(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash.get')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash.get'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TTextarea = {}, global.Vue, global.get));
}(this, (function (exports, Vue, get) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);

    const mergeClasses = (classesA, classesB) => {
        let a = classesA;
        let b = classesB;
        // Convert array of string classes to a single string
        if (Array.isArray(classesA) && classesA.every((className) => typeof className === 'string' || !!className)) {
            a = classesA.filter((className) => !!className).join(' ');
        }
        // Convert array of string classes to a single string
        if (Array.isArray(classesB) && classesB.every((className) => typeof className === 'string' || !!className)) {
            b = classesB.filter((className) => !!className).join(' ');
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return `${a} ${b}`;
        }
        if (typeof a === 'string' && Array.isArray(b)) {
            return [a].concat(b);
        }
        if (typeof b === 'string' && Array.isArray(a)) {
            return a.concat([b]);
        }
        if (Array.isArray(a) && Array.isArray(b)) {
            return a.concat(b);
        }
        return [a, b];
    };
    const Component = Vue__default['default'].extend({
        props: {
            classes: {
                type: [String, Array, Object],
                default: undefined,
            },
            fixedClasses: {
                type: [String, Array, Object],
                default: undefined,
            },
            variants: {
                type: Object,
                default: undefined,
            },
            variant: {
                type: [String, Object],
                default: undefined,
            },
        },
        computed: {
            componentClass() {
                return this.getElementCssClass();
            },
            activeVariant() {
                if (!this.variant) {
                    return undefined;
                }
                if (typeof this.variant === 'object') {
                    const truthyVariant = Object.keys(this.variant).find((variant) => !!this.variant[variant]);
                    return truthyVariant || undefined;
                }
                return this.variant;
            },
        },
        methods: {
            getElementCssClass(elementName, defaultClasses = '') {
                let classes;
                if (elementName) {
                    if (this.activeVariant) {
                        const elementVariant = get__default['default'](this.variants, `${this.activeVariant}.${elementName}`);
                        // If the variant exists but not for the element fallback to the default
                        if (elementVariant === undefined
                            && get__default['default'](this.variants, this.activeVariant) !== undefined) {
                            classes = get__default['default'](this.classes, elementName, defaultClasses);
                        }
                        else {
                            classes = elementVariant === undefined ? defaultClasses : elementVariant;
                        }
                    }
                    else {
                        classes = get__default['default'](this.classes, elementName, defaultClasses);
                    }
                    const fixedClasses = get__default['default'](this.fixedClasses, elementName);
                    if (fixedClasses) {
                        return mergeClasses(fixedClasses, classes);
                    }
                    return classes;
                }
                if (this.activeVariant) {
                    classes = get__default['default'](this.variants, this.activeVariant, defaultClasses);
                }
                else {
                    classes = this.classes === undefined ? defaultClasses : this.classes;
                }
                if (this.fixedClasses) {
                    return mergeClasses(this.fixedClasses, classes);
                }
                return classes;
            },
        },
    });

    const HtmlInput = Component.extend({
        props: {
            id: {
                type: String,
                default: undefined,
            },
            name: {
                type: String,
                default: undefined,
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            readonly: {
                type: Boolean,
                default: undefined,
            },
            autofocus: {
                type: Boolean,
                default: undefined,
            },
            required: {
                type: Boolean,
                default: undefined,
            },
            tabindex: {
                type: [String, Number],
                default: undefined,
            },
        },
        methods: {
            getListeners(listeners) {
                return Object.assign(Object.assign({}, this.$listeners), listeners);
            },
        },
    });

    const TextInput = HtmlInput.extend({
        props: {
            value: {
                type: [String, Number],
                default: undefined,
            },
            autocomplete: {
                type: String,
                default: undefined,
            },
            maxlength: {
                type: [String, Number],
                default: undefined,
            },
            minlength: {
                type: [String, Number],
                default: undefined,
            },
            multiple: {
                type: Boolean,
                default: undefined,
            },
            pattern: {
                type: String,
                default: undefined,
            },
            placeholder: {
                type: String,
                default: undefined,
            },
            classes: {
                type: [String, Array, Object],
                default: undefined,
            },
        },
        data() {
            return {
                localValue: this.value,
                valueWhenFocus: null,
            };
        },
        watch: {
            localValue(localValue) {
                this.$emit('input', localValue);
            },
            value(value) {
                this.localValue = value;
            },
        },
        methods: {
            blurHandler(e) {
                this.$emit('blur', e);
                if (this.localValue !== this.valueWhenFocus) {
                    this.$emit('change', this.localValue);
                }
            },
            focusHandler(e) {
                this.$emit('focus', e);
                this.valueWhenFocus = this.localValue;
            },
            keyupHandler(e) {
                this.$emit('keyup', e);
            },
            keydownHandler(e) {
                this.$emit('keydown', e);
            },
            blur() {
                this.$el.blur();
            },
            click() {
                this.$el.click();
            },
            focus(options) {
                this.$el.focus(options);
            },
            select() {
                this.$el.select();
            },
            setSelectionRange(start, end, direction) {
                this.$el.setSelectionRange(start, end, direction);
            },
            setRangeText(replacement) {
                this.$el.setRangeText(replacement);
            },
        },
    });

    const TTextarea = TextInput.extend({
        name: 'TTextarea',
        props: {
            rows: {
                type: String,
                default: undefined,
            },
            cols: {
                type: String,
                default: undefined,
            },
            wrap: {
                type: String,
                default: 'soft',
            },
            classes: {
                type: [String, Array, Object],
                default: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            render(createElement) {
                return createElement('textarea', {
                    class: this.componentClass,
                    ref: 'input',
                    attrs: {
                        id: this.id,
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        autocomplete: this.autocomplete,
                        autofocus: this.autofocus,
                        required: this.required,
                        placeholder: this.placeholder,
                        pattern: this.pattern,
                        multiple: this.multiple,
                        minlength: this.minlength,
                        maxlength: this.maxlength,
                        wrap: this.wrap,
                        rows: this.rows,
                        cols: this.cols,
                    },
                    on: this.getListeners({
                        blur: this.blurHandler,
                        focus: this.focusHandler,
                        keyup: this.keyupHandler,
                        keydown: this.keydownHandler,
                        input: this.inputHandler,
                    }),
                }, this.value ? String(this.value) : '');
            },
            inputHandler(e) {
                const target = e.target;
                this.$emit('input', target.value);
            },
        },
    });

    exports.default = TTextarea;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=t-textarea.js.map
