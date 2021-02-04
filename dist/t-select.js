(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.get'), require('lodash.map'), require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash.get', 'lodash.map', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TSelect = {}, global.get, global.map, global.Vue));
}(this, (function (exports, get, map, Vue) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var map__default = /*#__PURE__*/_interopDefaultLegacy(map);
    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

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

    const MultipleInput = InputWithOptions.extend({
        props: {
            value: {
                type: [Array, String, Number, Boolean, Object],
                default: null,
            },
            multiple: {
                type: Boolean,
                default: undefined,
            },
        },
    });

    const TSelect = MultipleInput.extend({
        name: 'TSelect',
        props: {
            placeholder: {
                type: String,
                default: undefined,
            },
            wrapped: {
                type: Boolean,
                default: false,
            },
            classes: {
                type: [String, Array, Object],
                default: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        data() {
            return {
                localValue: this.value,
            };
        },
        computed: {
            normalizedOptionsWithPlaceholder() {
                if (this.placeholder === undefined) {
                    return this.normalizedOptions;
                }
                const { normalizedOptions } = this;
                const placeholder = [{
                        value: null,
                        text: this.placeholder,
                    }];
                return placeholder.concat(normalizedOptions);
            },
        },
        watch: {
            localValue(localValue) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.$emit('input', localValue);
                    yield this.$nextTick();
                    this.$emit('change', localValue);
                });
            },
            value(value) {
                this.localValue = value;
            },
        },
        render(createElement) {
            const createSelectFunc = this.createSelect;
            // eslint-disable-next-line max-len
            const createSelectWrapperFunc = this.createSelectWrapper;
            if (this.wrapped) {
                return createSelectWrapperFunc(createElement);
            }
            return createSelectFunc(createElement);
        },
        methods: {
            createSelectWrapper(createElement) {
                const children = [
                    this.createSelect(createElement),
                ];
                if (!this.multiple) {
                    if (this.$scopedSlots.arrowWrapper) {
                        const arrowWrapper = this.$scopedSlots.arrowWrapper({
                            className: this.getElementCssClass('arrowWrapper'),
                            variant: this.variant,
                            value: this.localValue,
                        });
                        children.push(arrowWrapper);
                    }
                    else {
                        children.push(this.createArrow(createElement));
                    }
                }
                return createElement('div', {
                    ref: 'selectWrapper',
                    class: this.getElementCssClass('wrapper'),
                }, children);
            },
            createArrow(createElement) {
                const subElements = [];
                if (this.$scopedSlots.arrow) {
                    subElements.push(this.$scopedSlots.arrow({
                        className: this.getElementCssClass('arrow'),
                        variant: this.variant,
                        value: this.localValue,
                    }));
                }
                else {
                    subElements.push(createElement('svg', {
                        attrs: {
                            fill: 'currentColor',
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 20 20',
                        },
                        class: this.getElementCssClass('arrow'),
                    }, [
                        createElement('path', {
                            attrs: {
                                'clip-rule': 'evenodd',
                                'fill-rule': 'evenodd',
                                d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
                            },
                        }),
                    ]));
                }
                return createElement('span', {
                    ref: 'arrow',
                    class: this.getElementCssClass('arrowWrapper'),
                }, subElements);
            },
            createSelect(createElement) {
                return createElement('select', {
                    ref: 'select',
                    attrs: {
                        id: this.id,
                        autofocus: this.autofocus,
                        disabled: this.disabled,
                        name: this.name,
                        required: this.required,
                        multiple: this.multiple,
                    },
                    class: this.wrapped ? this.getElementCssClass('input') : this.getElementCssClass(),
                    on: this.getListeners({
                        blur: this.blurHandler,
                        focus: this.focusHandler,
                        input: this.inputHandler,
                    }),
                }, this.createOptions(createElement, this.value));
            },
            createOptions(createElement, value) {
                const options = this.normalizedOptionsWithPlaceholder;
                return options.map((option) => {
                    if (option.children) {
                        return this.createOptgroup(createElement, option, value);
                    }
                    return this.createOption(createElement, option, value);
                });
            },
            createOptgroup(createElement, option, value) {
                var _a;
                return createElement('optgroup', {
                    domProps: {
                        label: guessOptionText(option, this.textAttribute),
                    },
                }, (_a = option.children) === null || _a === void 0 ? void 0 : _a.map((opt) => this.createOption(createElement, opt, value)));
            },
            createOption(createElement, option, value) {
                const isSelected = Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value;
                return createElement('option', {
                    domProps: {
                        value: option.value,
                        selected: isSelected,
                        disabled: option.disabled,
                    },
                }, option.text);
            },
            inputHandler(e) {
                const target = e.target;
                let value;
                if (this.multiple) {
                    value = Array
                        .from(target.selectedOptions)
                        .map((o) => o.value);
                }
                else {
                    value = target.value;
                }
                this.localValue = value;
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            blur() {
                this.$refs.select.blur();
            },
            focus(options) {
                this.$refs.select.focus(options);
            },
        },
    });

    exports.default = TSelect;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=t-select.js.map
