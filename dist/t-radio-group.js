(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.kebabcase'), require('lodash.isequal'), require('vue'), require('lodash.get'), require('lodash.map')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash.kebabcase', 'lodash.isequal', 'vue', 'lodash.get', 'lodash.map'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TRadioGroup = {}, global.kebabCase, global.isEqual, global.Vue, global.get, global.map));
}(this, (function (exports, kebabCase, isEqual, Vue, get, map) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var kebabCase__default = /*#__PURE__*/_interopDefaultLegacy(kebabCase);
    var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var map__default = /*#__PURE__*/_interopDefaultLegacy(map);

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

    const guessOptionValue = (option, valueAttribute) => {
        if (valueAttribute) {
            return get__default['default'](option, valueAttribute);
        }
        return get__default['default'](option, 'value', get__default['default'](option, 'id', get__default['default'](option, 'text')));
    };
    const guessOptionText = (option, textAttribute) => {
        if (textAttribute) {
            return get__default['default'](option, textAttribute);
        }
        return get__default['default'](option, 'text', get__default['default'](option, 'label'));
    };
    const normalizeOption = (option, textAttribute, valueAttribute) => {
        if (typeof option === 'string'
            || typeof option === 'number'
            || typeof option === 'boolean') {
            return {
                value: option,
                text: option,
                raw: option,
            };
        }
        if (option.children) {
            const children = option.children.map((childOption) => normalizeOption(childOption));
            return {
                value: guessOptionValue(option, valueAttribute),
                text: guessOptionText(option, textAttribute),
                children,
            };
        }
        const normalizedOption = {
            value: guessOptionValue(option, valueAttribute),
            text: guessOptionText(option, textAttribute),
            raw: option,
        };
        if (option.disabled !== undefined) {
            normalizedOption.disabled = option.disabled;
        }
        return normalizedOption;
    };
    const normalizeOptions = (options, textAttribute, valueAttribute) => {
        if (!options) {
            return [];
        }
        if (Array.isArray(options)) {
            return options.map((option) => normalizeOption(option, textAttribute, valueAttribute));
        }
        return map__default['default'](options, (option, key) => ({
            value: key,
            text: option,
        }));
    };

    const InputWithOptions = HtmlInput.extend({
        props: {
            value: {
                type: [String, Object, Number, Boolean],
                default: null,
            },
            valueAttribute: {
                type: String,
                default: undefined,
            },
            textAttribute: {
                type: String,
                default: undefined,
            },
            options: {
                type: [Array, Object],
                default: undefined,
            },
        },
        data() {
            return {
                localValue: this.value,
            };
        },
        computed: {
            normalizedOptions() {
                return this.normalizeOptions(this.options);
            },
            flattenedOptions() {
                return this.normalizedOptions.map((option) => {
                    if (option.children) {
                        return option.children;
                    }
                    return option;
                }).flat();
            },
        },
        methods: {
            normalizeOptions(options) {
                return normalizeOptions(options, this.textAttribute, this.valueAttribute);
            },
        },
    });

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    /* eslint-disable no-shadow */
    var Key;
    (function (Key) {
        Key[Key["LEFT"] = 37] = "LEFT";
        Key[Key["UP"] = 38] = "UP";
        Key[Key["RIGHT"] = 39] = "RIGHT";
        Key[Key["DOWN"] = 40] = "DOWN";
        Key[Key["ENTER"] = 13] = "ENTER";
        Key[Key["ESC"] = 27] = "ESC";
        Key[Key["SPACE"] = 32] = "SPACE";
        Key[Key["BACKSPACE"] = 8] = "BACKSPACE";
    })(Key || (Key = {}));
    var Key$1 = Key;

    const checkIfTagShouldBeChecked = (model, checked, value) => (model === undefined ? !!checked : isEqual__default['default'](model, value));
    const TRadio = HtmlInput.extend({
        name: 'TRadio',
        props: {
            value: {
                type: [String, Object, Number, Boolean, Array],
                default: 'on',
            },
            checked: {
                type: [Boolean, String],
                default: false,
            },
            model: {
                // v-model
                type: [String, Object, Number, Boolean, Array],
                default: undefined,
            },
            wrapped: {
                type: Boolean,
                default: false,
            },
            wrapperTag: {
                type: String,
                default: 'label',
            },
            inputWrapperTag: {
                type: String,
                default: 'span',
            },
            labelTag: {
                type: String,
                default: 'span',
            },
            label: {
                type: [String, Number],
                default: undefined,
            },
            classes: {
                type: [String, Array, Object],
                default: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        data() {
            // const defaultValue = (this.model === undefined ? null : this.model);
            return {
                localValue: this.checked ? this.value : null,
            };
        },
        model: {
            prop: 'model',
            event: 'input',
        },
        render(createElement) {
            const renderFun = this.render;
            // eslint-disable-next-line max-len
            const createWrappedFunc = this.renderWrapped;
            if (this.wrapped) {
                return createWrappedFunc(createElement);
            }
            return renderFun(createElement);
        },
        watch: {
            model(model) {
                if (isEqual__default['default'](model, this.localValue)) {
                    return;
                }
                this.localValue = model;
            },
            checked(checked) {
                const localValue = checked ? this.value : null;
                if (!isEqual__default['default'](localValue, this.localValue)) {
                    this.localValue = localValue;
                }
            },
            localValue(localValue) {
                if (isEqual__default['default'](this.model, localValue)) {
                    return;
                }
                this.$emit('input', localValue);
                this.$emit('change', localValue);
            },
            isChecked(isChecked) {
                const input = this.$refs.input;
                if (input && input.checked !== isChecked) {
                    input.checked = isChecked;
                }
            },
        },
        computed: {
            isChecked() {
                return checkIfTagShouldBeChecked(this.model, this.checked, this.value);
            },
        },
        methods: {
            renderWrapped(createElement) {
                const childElements = [];
                const input = this.render(createElement);
                const inputWrapperClass = this.getElementCssClass('inputWrapper');
                const checkedInputWrapperClass = this.getElementCssClass('inputWrapperChecked', this.getElementCssClass('inputWrapper'));
                childElements.push(createElement(this.inputWrapperTag, {
                    ref: 'inputWrapper',
                    class: this.isChecked ? checkedInputWrapperClass : inputWrapperClass,
                }, [
                    input,
                ]));
                const labelClass = this.getElementCssClass('label');
                const checkedLabelClass = this.getElementCssClass('labelChecked', this.getElementCssClass('label'));
                let label;
                if (this.$scopedSlots.default !== undefined) {
                    label = this.$scopedSlots.default({
                        isChecked: this.isChecked,
                        value: this.localValue,
                        label: this.label,
                    });
                }
                else {
                    label = typeof this.label === 'number' ? String(this.label) : this.label;
                }
                childElements.push(createElement(this.labelTag, {
                    ref: 'label',
                    class: this.isChecked ? checkedLabelClass : labelClass,
                }, label));
                const wrapperClass = this.getElementCssClass('wrapper');
                const checkedWrapperClass = this.getElementCssClass('wrapperChecked', this.getElementCssClass('wrapper'));
                return createElement(this.wrapperTag, {
                    ref: 'wrapper',
                    class: this.isChecked ? checkedWrapperClass : wrapperClass,
                    attrs: {
                        for: this.id,
                        tabindex: this.tabindex,
                        autofocus: this.autofocus,
                    },
                    on: {
                        keydown: (e) => {
                            if ([Key$1.DOWN, Key$1.RIGHT].includes(e.keyCode)) {
                                this.selectNextRadio(e);
                            }
                            else if ([Key$1.UP, Key$1.LEFT].includes(e.keyCode)) {
                                this.selectPrevRadio(e);
                            }
                            else if (e.keyCode === Key$1.SPACE) {
                                this.wrapperSpaceHandler(e);
                            }
                        },
                    },
                }, childElements);
            },
            render(createElement) {
                return createElement('input', {
                    class: this.wrapped ? this.getElementCssClass('input') : this.componentClass,
                    ref: 'input',
                    attrs: {
                        value: this.value,
                        id: this.id,
                        type: 'radio',
                        checked: checkIfTagShouldBeChecked(this.model, this.checked, this.value),
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        required: this.required,
                        autofocus: !this.wrapped ? this.autofocus : undefined,
                        tabindex: this.wrapped && this.tabindex !== undefined ? -1 : this.tabindex,
                    },
                    on: this.getListeners({
                        blur: this.blurHandler,
                        focus: this.focusHandler,
                        input: this.inputHandler,
                    }),
                });
            },
            inputHandler(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    const target = e.target;
                    // Only update the local value when the element is checked
                    if (target.checked) {
                        this.localValue = this.value;
                        this.sendInputEventToTheNotCheckedInputs();
                    }
                });
            },
            /**
             * We need to trigger the input event in all the inputs that are not checked
             * so we can update the `elementChecked` local property that is used to
             * change the classes of the wrapper div according to the state
             */
            sendInputEventToTheNotCheckedInputs() {
                const notCheckedEls = document.querySelectorAll(`input[name=${this.name}]:not(:checked)`);
                notCheckedEls.forEach((el) => {
                    el.dispatchEvent(new Event('input'));
                });
            },
            selectPrevRadio(e) {
                e.preventDefault();
                const currentEl = this.$refs.input;
                const els = Array
                    .from(document.querySelectorAll(`input[name=${this.name}]`));
                const currentElementIndex = els
                    .findIndex((radioInput) => radioInput === this.$refs.input);
                const prevElement = els[currentElementIndex - 1] || els[els.length - 1];
                if (prevElement !== currentEl && prevElement) {
                    const wrapper = prevElement.parentNode ? prevElement.parentNode.parentNode : undefined;
                    if (wrapper && wrapper.tabIndex >= 0) {
                        wrapper.focus();
                    }
                    else {
                        prevElement.focus();
                    }
                }
            },
            selectNextRadio(e) {
                e.preventDefault();
                const currentEl = this.$refs.input;
                const els = Array
                    .from(document.querySelectorAll(`input[name=${this.name}]`));
                const currentElementIndex = els
                    .findIndex((radioInput) => radioInput === this.$refs.input);
                const nextElement = els[currentElementIndex + 1] || els[0];
                if (nextElement !== currentEl && nextElement) {
                    const wrapper = nextElement.parentNode ? nextElement.parentNode.parentNode : undefined;
                    if (wrapper && wrapper.tabIndex >= 0) {
                        wrapper.focus();
                    }
                    else {
                        nextElement.focus();
                    }
                }
            },
            wrapperSpaceHandler(e) {
                e.preventDefault();
                this.localValue = this.value;
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            blur() {
                this.$refs.input.blur();
            },
            click() {
                this.$refs.input.click();
            },
            focus(options) {
                this.$refs.input.focus(options);
            },
        },
    });

    const TRadioGroup = InputWithOptions.extend({
        name: 'TRadioGroup',
        props: {
            groupWrapperTag: {
                type: String,
                default: 'div',
            },
            wrapperTag: {
                type: String,
                default: 'label',
            },
            inputWrapperTag: {
                type: String,
                default: 'span',
            },
            labelTag: {
                type: String,
                default: 'span',
            },
            fixedClasses: {
                type: Object,
                default() {
                    return {};
                },
            },
            classes: {
                type: Object,
                default() {
                    return {
                        groupWrapper: 'flex flex-col',
                        label: '',
                        input: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
                        inputWrapper: 'inline-flex',
                        wrapper: 'inline-flex items-center space-x-2',
                    };
                },
            },
        },
        data() {
            return {
                localValue: this.value,
            };
        },
        watch: {
            localValue(localValue) {
                this.$emit('input', localValue);
                this.$emit('change', localValue);
            },
            value(value) {
                this.localValue = value;
            },
        },
        render(createElement) {
            const createRadioGroupFunc = this.createRadioGroup;
            return createRadioGroupFunc(createElement);
        },
        methods: {
            createRadioGroup(createElement) {
                return createElement(this.groupWrapperTag, {
                    ref: 'wrapper',
                    class: this.getElementCssClass('groupWrapper'),
                }, this.createRadioOptions(createElement));
            },
            createRadioOptions(createElement) {
                const options = this.normalizedOptions;
                return options
                    .map((option, index) => this.createRadioOption(createElement, option, index));
            },
            createRadioOption(createElement, option, index) {
                return createElement(TRadio, {
                    props: {
                        id: this.buildId(option, index),
                        name: this.name,
                        tabindex: this.tabindex,
                        disabled: this.disabled,
                        autofocus: this.autofocus,
                        required: this.required,
                        model: this.localValue,
                        label: option.text,
                        wrapped: true,
                        value: option.value,
                        checked: this.value === option.value,
                        variant: this.variant,
                        classes: this.classes,
                        fixedClasses: this.fixedClasses,
                        variants: this.variants,
                        wrapperTag: this.wrapperTag,
                        inputWrapperTag: this.inputWrapperTag,
                        labelTag: this.labelTag,
                    },
                    scopedSlots: {
                        default: this.$scopedSlots.default,
                    },
                    on: {
                        blur: this.blurHandler,
                        focus: this.focusHandler,
                        input: (value) => {
                            if (isEqual__default['default'](value, option.value)) {
                                this.inputHandler(option.value);
                            }
                        },
                    },
                });
            },
            buildId(option, index) {
                const parts = [];
                if (this.id) {
                    parts.push(this.id);
                }
                else if (this.name) {
                    parts.push(this.name);
                }
                if (['string', 'number'].includes(typeof option.value)) {
                    parts.push(kebabCase__default['default'](String(option.value)));
                }
                else {
                    parts.push(index);
                }
                return parts.join('-');
            },
            inputHandler(value) {
                this.$emit('input', value);
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
        },
    });

    exports.default = TRadioGroup;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=t-radio-group.js.map
