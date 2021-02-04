(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash.get'), require('body-scroll-lock'), require('lodash.map'), require('lodash.isequal'), require('lodash.clonedeep'), require('lodash.intersection'), require('lodash.range'), require('lodash.kebabcase'), require('lodash.pick'), require('lodash.merge')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash.get', 'body-scroll-lock', 'lodash.map', 'lodash.isequal', 'lodash.clonedeep', 'lodash.intersection', 'lodash.range', 'lodash.kebabcase', 'lodash.pick', 'lodash.merge'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueTailwind = {}, global.Vue, global.get, global.bodyScrollLock, global.map, global.isEqual, global.cloneDeep, global.intersection, global.range, global.kebabCase, global.pick, global.merge));
}(this, (function (exports, Vue, get, bodyScrollLock, map, isEqual, cloneDeep, intersection, range, kebabCase, pick, merge) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var map__default = /*#__PURE__*/_interopDefaultLegacy(map);
    var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
    var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
    var intersection__default = /*#__PURE__*/_interopDefaultLegacy(intersection);
    var range__default = /*#__PURE__*/_interopDefaultLegacy(range);
    var kebabCase__default = /*#__PURE__*/_interopDefaultLegacy(kebabCase);
    var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
    var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);

    /* eslint-disable no-shadow */
    var HideReason;
    (function (HideReason) {
        HideReason["Outside"] = "outside";
        HideReason["Close"] = "close";
        HideReason["Esc"] = "esc";
        HideReason["Cancel"] = "cancel";
        HideReason["Ok"] = "ok";
        HideReason["Method"] = "method";
        HideReason["Value"] = "value";
    })(HideReason || (HideReason = {}));
    var DialogType;
    (function (DialogType) {
        DialogType["Alert"] = "alert";
        DialogType["Confirm"] = "confirm";
        DialogType["Prompt"] = "prompt";
    })(DialogType || (DialogType = {}));

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

    const uniqid = () => Math.random().toString(36).substring(7);

    const TDialogOverlayWrapperTransitionDialogContentInput = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogContentInput',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
        },
        data() {
            return {
                errorMessage: null,
            };
        },
        mounted() {
            this.inputHandler();
        },
        methods: {
            getInputValue() {
                const input = this.$refs.input;
                if (!input) {
                    return undefined;
                }
                const inputName = input.name;
                if (input.type === 'radio') {
                    const checkedRadio = this.$refs.inputWrapper
                        .querySelector(`input[name="${inputName}"]:checked`);
                    return checkedRadio ? checkedRadio.value : null;
                }
                if (input.type === 'checkbox') {
                    if (this.inputOptions) {
                        const checkedCheckboxes = this.$refs.inputWrapper
                            .querySelectorAll(`input[name="${inputName}"]:checked`);
                        const inititalValue = Array.from(checkedCheckboxes).map((checkbox) => checkbox.value);
                        return inititalValue;
                    }
                    return input.checked ? input.value : null;
                }
                return input.value;
            },
            inputHandler() {
                this.errorMessage = null;
                const inputValue = this.getInputValue();
                this.$emit('input', inputValue);
            },
        },
        render(createElement) {
            let input;
            if (this.inputType === 'select') {
                const options = normalizeOptions((this.inputOptions || []))
                    .map((option) => {
                    const isSelected = this.inputValue === option.value;
                    return createElement('option', {
                        domProps: {
                            value: option.value,
                            selected: isSelected,
                        },
                    }, String(option.text));
                });
                input = createElement('select', {
                    class: this.getElementCssClass('select'),
                    ref: 'input',
                    attrs: Object.assign({ name: 'input' }, this.inputAttributes),
                    on: {
                        change: this.inputHandler,
                    },
                }, options);
            }
            else if (this.inputType === 'radio') {
                input = normalizeOptions((this.inputOptions || []))
                    .map((option) => {
                    const isChecked = this.inputValue === option.value;
                    return createElement('label', {
                        class: this.getElementCssClass('radioWrapper'),
                        attrs: {
                            for: `input-${String(option.value)}`,
                        },
                    }, [
                        createElement('input', {
                            class: this.getElementCssClass('radio'),
                            ref: 'input',
                            attrs: Object.assign({ type: 'radio', name: 'input', id: `input-${String(option.value)}`, value: option.value, checked: isChecked }, this.inputAttributes),
                            on: {
                                change: this.inputHandler,
                            },
                        }),
                        createElement('span', {
                            class: this.getElementCssClass('radioText'),
                        }, String(option.text)),
                    ]);
                });
            }
            else if (this.inputType === 'checkbox') {
                if (this.inputOptions) {
                    input = normalizeOptions((this.inputOptions || []))
                        .map((option) => {
                        const isChecked = Array.isArray(this.inputValue)
                            ? this.inputValue.includes(option.value)
                            : this.inputValue === option.value;
                        return createElement('label', {
                            class: this.getElementCssClass('checkboxWrapper'),
                            attrs: {
                                for: `input-${String(option.value)}`,
                            },
                        }, [
                            createElement('input', {
                                class: this.getElementCssClass('checkbox'),
                                ref: 'input',
                                attrs: Object.assign({ type: 'checkbox', name: 'input[]', id: `input-${String(option.value)}`, value: option.value, checked: isChecked }, this.inputAttributes),
                                on: {
                                    change: this.inputHandler,
                                },
                            }),
                            createElement('span', {
                                class: this.getElementCssClass('checkboxText'),
                            }, String(option.text)),
                        ]);
                    });
                }
                else {
                    const id = uniqid();
                    input = createElement('label', {
                        class: this.getElementCssClass('checkboxWrapper'),
                        attrs: {
                            for: `input-${id}`,
                        },
                    }, [
                        createElement('input', {
                            class: this.getElementCssClass('checkbox'),
                            ref: 'input',
                            attrs: Object.assign({ type: 'checkbox', name: 'input', id: `input-${id}`, value: this.inputValue }, this.inputAttributes),
                            on: {
                                change: this.inputHandler,
                            },
                        }),
                        createElement('span', {
                            class: this.getElementCssClass('checkboxText'),
                        }, this.inputPlaceholder ? String(this.inputPlaceholder) : ''),
                    ]);
                }
            }
            else {
                input = createElement('input', {
                    class: this.getElementCssClass('input'),
                    ref: 'input',
                    domProps: {
                        value: this.inputValue,
                    },
                    attrs: Object.assign({ name: 'input', type: this.inputType, placeholder: this.inputPlaceholder }, this.inputAttributes),
                    on: {
                        input: this.inputHandler,
                    },
                });
            }
            return createElement('div', {
                ref: 'inputWrapper',
                class: this.getElementCssClass('inputWrapper'),
            }, Array.isArray(input) ? input : [input]);
        },
    });

    const TDialogOverlayWrapperTransitionDialogContent = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogContent',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            titleTag: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                required: true,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            errorMessage: {
                type: String,
                required: true,
            },
        },
        render(createElement) {
            const subElements = [];
            if (this.title || this.$scopedSlots.title) {
                if (this.$scopedSlots.title) {
                    subElements.push(createElement('div', {
                        class: this.getElementCssClass('titleWrapper'),
                    }, [
                        this.$scopedSlots.title({ class: this.getElementCssClass('title') }),
                    ]));
                }
                else {
                    subElements.push(createElement('div', {
                        class: this.getElementCssClass('titleWrapper'),
                    }, [
                        createElement(this.titleTag, {
                            class: this.getElementCssClass('title'),
                        }, this.title || ''),
                    ]));
                }
            }
            if (this.$slots.default) {
                subElements.push(createElement('div', {
                    class: this.getElementCssClass('textWrapper'),
                }, this.$slots.default));
            }
            else if (this.text) {
                subElements.push(createElement('div', {
                    class: this.getElementCssClass('textWrapper'),
                }, this.text ? [
                    createElement(this.textTag, {
                        class: this.getElementCssClass('text'),
                    }, this.text),
                ] : undefined));
            }
            if (this.type === DialogType.Prompt) {
                subElements.push(createElement(TDialogOverlayWrapperTransitionDialogContentInput, {
                    props: {
                        getElementCssClass: this.getElementCssClass,
                        inputAttributes: this.inputAttributes,
                        inputType: this.inputType,
                        inputValue: this.inputValue,
                        inputOptions: this.inputOptions,
                        inputPlaceholder: this.inputPlaceholder,
                    },
                    on: {
                        input: (val) => this.$emit('input', val),
                    },
                }));
            }
            if (this.errorMessage && typeof this.errorMessage === 'string') {
                subElements.push(createElement('div', {
                    class: this.getElementCssClass('errorMessage'),
                }, this.errorMessage));
            }
            return createElement('div', {
                class: this.getElementCssClass('content'),
            }, subElements);
        },
    });

    var IconName;
    (function (IconName) {
        IconName["Success"] = "success";
        IconName["Error"] = "error";
        IconName["Warning"] = "warning";
        IconName["Info"] = "info";
        IconName["Question"] = "question";
    })(IconName || (IconName = {}));
    function getHtmlSvgPath(iconName) {
        if (!iconName) {
            return undefined;
        }
        const icons = {};
        icons[IconName.Success] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>';
        icons[IconName.Error] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        icons[IconName.Warning] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>';
        icons[IconName.Info] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
        icons[IconName.Question] = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>';
        return icons[iconName];
    }
    const TDialogOverlayWrapperTransitionDialogIcon = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogIcon',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            icon: {
                type: String,
                default: undefined,
            },
        },
        render(createElement) {
            if (this.$scopedSlots.icon) {
                return createElement('div', {
                    class: this.getElementCssClass('iconWrapper'),
                }, [
                    this.$scopedSlots.icon({}),
                ]);
            }
            const htmlSvgPath = getHtmlSvgPath(this.icon);
            if (!htmlSvgPath) {
                return createElement();
            }
            return createElement('div', {
                class: this.getElementCssClass('iconWrapper'),
            }, [
                createElement('svg', {
                    class: this.getElementCssClass('icon'),
                    attrs: {
                        fill: 'none',
                        stroke: 'currentColor',
                        viewBox: '0 0 24 24',
                        xmlns: 'http://www.w3.org/2000/svg',
                    },
                    domProps: {
                        innerHTML: htmlSvgPath,
                    },
                }),
            ]);
        },
    });

    const TDialogOverlayWrapperTransitionDialogClose = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogClose',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            showCloseButton: {
                type: Boolean,
                required: true,
            },
        },
        render(createElement) {
            if (!this.showCloseButton) {
                return createElement();
            }
            if (this.$scopedSlots.closeButton) {
                return createElement('button', {
                    class: this.getElementCssClass('close'),
                    attrs: {
                        type: 'button',
                    },
                    on: {
                        click: (e) => this.$emit('dismiss', e),
                    },
                }, [
                    this.$scopedSlots.closeButton({}),
                ]);
            }
            return createElement('button', {
                class: this.getElementCssClass('close'),
                attrs: {
                    type: 'button',
                },
                on: {
                    click: (e) => this.$emit('dismiss', e),
                },
            }, [
                createElement('svg', {
                    attrs: {
                        fill: 'currentColor',
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 20 20',
                    },
                    class: this.getElementCssClass('closeIcon'),
                }, [
                    createElement('path', {
                        attrs: {
                            'clip-rule': 'evenodd',
                            'fill-rule': 'evenodd',
                            d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                        },
                    }),
                ]),
            ]);
        },
    });

    const TDialogOverlayWrapperTransitionDialogLoader = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogLoader',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            busy: {
                type: Boolean,
                required: true,
            },
        },
        render(createElement) {
            if (!this.busy) {
                return createElement();
            }
            if (this.$scopedSlots.loader) {
                return createElement('div', {
                    class: this.getElementCssClass('busyWrapper'),
                }, [
                    this.$scopedSlots.loader({}),
                ]);
            }
            return createElement('div', {
                class: this.getElementCssClass('busyWrapper'),
            }, [
                createElement('svg', {
                    attrs: {
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: 32,
                        height: 32,
                        viewBox: '0 0 32 32',
                    },
                    class: this.getElementCssClass('busyIcon'),
                }, [
                    createElement('g', {
                        attrs: {
                            transform: 'scale(0.03125 0.03125)',
                        },
                    }, [
                        createElement('path', {
                            attrs: {
                                d: 'M512 1024c-136.76 0-265.334-53.258-362.040-149.96-96.702-96.706-149.96-225.28-149.96-362.040 0-96.838 27.182-191.134 78.606-272.692 50-79.296 120.664-143.372 204.356-185.3l43 85.832c-68.038 34.084-125.492 86.186-166.15 150.67-41.746 66.208-63.812 142.798-63.812 221.49 0 229.382 186.618 416 416 416s416-186.618 416-416c0-78.692-22.066-155.282-63.81-221.49-40.66-64.484-98.114-116.584-166.15-150.67l43-85.832c83.692 41.928 154.358 106.004 204.356 185.3 51.422 81.558 78.604 175.854 78.604 272.692 0 136.76-53.258 265.334-149.96 362.040-96.706 96.702-225.28 149.96-362.040 149.96z',
                            },
                        }),
                    ]),
                ]),
            ]);
        },
    });

    const TDialogOverlayWrapperTransitionDialogButtons = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialogButtons',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            cancelButtonText: {
                type: String,
                required: true,
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                required: true,
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                required: true,
            },
        },
        methods: {
            cancel(e) {
                this.$emit('cancel', e);
            },
            ok(e) {
                this.$emit('submit', e);
            },
        },
        render(createElement) {
            const type = this.type;
            if (this.$scopedSlots.buttons) {
                return createElement('div', {
                    class: this.getElementCssClass('buttons'),
                }, [
                    this.$scopedSlots.buttons({
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                        cancelButtonText: this.cancelButtonText,
                        okButtonText: this.okButtonText,
                        okButtonClass: this.getElementCssClass('okButton'),
                        cancelButtonClass: this.getElementCssClass('cancelButton'),
                        dialogType: type,
                        cancel: this.cancel,
                        ok: this.ok,
                    }),
                ]);
            }
            const subElements = [];
            const buttons = {
                cancel: createElement('button', {
                    attrs: {
                        type: 'button',
                        'aria-label': this.cancelButtonAriaLabel,
                    },
                    class: this.getElementCssClass('cancelButton'),
                    on: {
                        click: this.cancel,
                    },
                }, this.cancelButtonText),
                ok: createElement('button', {
                    attrs: {
                        type: 'button',
                        'aria-label': this.okButtonAriaLabel,
                    },
                    class: this.getElementCssClass('okButton'),
                    on: {
                        click: this.ok,
                    },
                }, this.okButtonText),
            };
            if (type === DialogType.Alert) {
                subElements.push(buttons.ok);
            }
            else if (type === DialogType.Confirm || type === DialogType.Prompt) {
                subElements.push(buttons.cancel);
                subElements.push(buttons.ok);
            }
            return createElement('div', {
                class: this.getElementCssClass('buttons'),
            }, subElements);
        },
    });

    const TDialogOverlayWrapperTransitionDialog = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransitionDialog',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            dialogShow: {
                type: Boolean,
                required: true,
            },
            titleTag: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: undefined,
            },
            icon: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: undefined,
            },
            cancelButtonText: {
                type: String,
                required: true,
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                required: true,
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            showCloseButton: {
                type: Boolean,
                required: true,
            },
            preConfirm: {
                type: Function,
                default: undefined,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValidator: {
                type: Function,
                default: undefined,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                currentValue: null,
                errorMessage: '',
                busy: false,
            };
        },
        methods: {
            submitHandler(e) {
                return this.resolveParam(this.inputValidator, this.currentValue)
                    .then((errorMessage) => {
                    if (errorMessage && typeof errorMessage === 'string') {
                        this.errorMessage = String(errorMessage);
                        return;
                    }
                    this.resolveParam(this.preConfirm, this.currentValue)
                        .then((response) => {
                        this.$emit('submit', e, this.currentValue, response);
                    }).catch((error) => {
                        this.$emit('submit-error', e, this.currentValue, error);
                    }).then(() => {
                        this.busy = false;
                    });
                }).catch((errorMessage) => {
                    this.errorMessage = String(errorMessage);
                });
            },
            inputHandler(input) {
                this.errorMessage = '';
                this.currentValue = input;
            },
            resolveParam(resolvable, input) {
                if (typeof resolvable === 'function') {
                    const result = resolvable(input);
                    if (result instanceof Promise) {
                        this.busy = true;
                        return result;
                    }
                    return new Promise((resolve) => {
                        resolve(result);
                    });
                }
                return new Promise((resolve) => resolve());
            },
        },
        render(createElement) {
            if (!this.dialogShow) {
                return createElement();
            }
            return createElement('div', {
                ref: 'dialog',
                class: this.getElementCssClass('dialog'),
            }, [
                createElement(TDialogOverlayWrapperTransitionDialogLoader, {
                    props: {
                        getElementCssClass: this.getElementCssClass,
                        busy: this.busy,
                    },
                    scopedSlots: {
                        loader: this.$scopedSlots.loader,
                    },
                }),
                createElement(TDialogOverlayWrapperTransitionDialogClose, {
                    props: {
                        getElementCssClass: this.getElementCssClass,
                        showCloseButton: this.showCloseButton,
                    },
                    on: {
                        dismiss: (e) => this.$emit('dismiss', e),
                    },
                    scopedSlots: {
                        closeButton: this.$scopedSlots.closeButton,
                    },
                }),
                createElement('div', {
                    ref: 'body',
                    class: this.getElementCssClass('body'),
                }, [
                    createElement(TDialogOverlayWrapperTransitionDialogIcon, {
                        props: {
                            getElementCssClass: this.getElementCssClass,
                            icon: this.icon,
                        },
                        scopedSlots: {
                            icon: this.$scopedSlots.icon,
                        },
                    }),
                    createElement(TDialogOverlayWrapperTransitionDialogContent, {
                        props: {
                            getElementCssClass: this.getElementCssClass,
                            titleTag: this.titleTag,
                            title: this.title,
                            textTag: this.textTag,
                            text: this.text,
                            type: this.type,
                            inputAttributes: this.inputAttributes,
                            inputType: this.inputType,
                            inputValue: this.inputValue,
                            inputOptions: this.inputOptions,
                            inputPlaceholder: this.inputPlaceholder,
                            errorMessage: this.errorMessage,
                        },
                        on: {
                            input: this.inputHandler,
                        },
                        scopedSlots: {
                            title: this.$scopedSlots.title,
                        },
                    }, this.$slots.default),
                ]),
                createElement(TDialogOverlayWrapperTransitionDialogButtons, {
                    props: {
                        getElementCssClass: this.getElementCssClass,
                        type: this.type,
                        cancelButtonText: this.cancelButtonText,
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonText: this.okButtonText,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                    },
                    on: {
                        cancel: (e) => this.$emit('cancel', e),
                        submit: this.submitHandler,
                    },
                    scopedSlots: {
                        buttons: this.$scopedSlots.buttons,
                    },
                }),
            ]);
        },
    });

    const TDialogOverlayWrapperTransition = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapperTransition',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            dialogShow: {
                type: Boolean,
                required: true,
            },
            titleTag: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: undefined,
            },
            icon: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: undefined,
            },
            cancelButtonText: {
                type: String,
                required: true,
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                required: true,
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            showCloseButton: {
                type: Boolean,
                required: true,
            },
            preConfirm: {
                type: Function,
                default: undefined,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValidator: {
                type: Function,
                default: undefined,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                required: true,
            },
        },
        render(createElement) {
            return createElement('transition', {
                props: {
                    enterClass: this.getElementCssClass('enterClass'),
                    enterActiveClass: this.getElementCssClass('enterActiveClass'),
                    enterToClass: this.getElementCssClass('enterToClass'),
                    leaveClass: this.getElementCssClass('leaveClass'),
                    leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
                    leaveToClass: this.getElementCssClass('leaveToClass'),
                },
            }, [
                createElement(TDialogOverlayWrapperTransitionDialog, {
                    props: {
                        getElementCssClass: this.getElementCssClass,
                        dialogShow: this.dialogShow,
                        titleTag: this.titleTag,
                        title: this.title,
                        icon: this.icon,
                        textTag: this.textTag,
                        text: this.text,
                        cancelButtonText: this.cancelButtonText,
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonText: this.okButtonText,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                        showCloseButton: this.showCloseButton,
                        preConfirm: this.preConfirm,
                        inputAttributes: this.inputAttributes,
                        inputType: this.inputType,
                        inputValidator: this.inputValidator,
                        inputValue: this.inputValue,
                        inputOptions: this.inputOptions,
                        inputPlaceholder: this.inputPlaceholder,
                        type: this.type,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        dismiss: (e) => this.$emit('dismiss', e),
                        cancel: (e) => this.$emit('cancel', e),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        submit: (e, input, response) => this.$emit('submit', e, input, response),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'submit-error': (e, input, error) => this.$emit('submit-error', e, input, error),
                    },
                }, this.$slots.default),
            ]);
        },
    });

    const TDialogOverlayWrapper = Vue__default['default'].extend({
        name: 'TDialogOverlayWrapper',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            dialogShow: {
                type: Boolean,
                required: true,
            },
            titleTag: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: undefined,
            },
            icon: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: undefined,
            },
            cancelButtonText: {
                type: String,
                required: true,
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                required: true,
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            showCloseButton: {
                type: Boolean,
                required: true,
            },
            preConfirm: {
                type: Function,
                default: undefined,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValidator: {
                type: Function,
                default: undefined,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                required: true,
            },
        },
        render(createElement) {
            return createElement('div', {
                ref: 'wrapper',
                class: this.getElementCssClass('wrapper'),
            }, [
                createElement(TDialogOverlayWrapperTransition, {
                    props: {
                        type: this.type,
                        dialogShow: this.dialogShow,
                        getElementCssClass: this.getElementCssClass,
                        titleTag: this.titleTag,
                        title: this.title,
                        icon: this.icon,
                        textTag: this.textTag,
                        text: this.text,
                        cancelButtonText: this.cancelButtonText,
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonText: this.okButtonText,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                        showCloseButton: this.showCloseButton,
                        preConfirm: this.preConfirm,
                        inputAttributes: this.inputAttributes,
                        inputType: this.inputType,
                        inputValidator: this.inputValidator,
                        inputValue: this.inputValue,
                        inputOptions: this.inputOptions,
                        inputPlaceholder: this.inputPlaceholder,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        dismiss: (e) => this.$emit('dismiss', e),
                        cancel: (e) => this.$emit('cancel', e),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        submit: (e, input, response) => this.$emit('submit', e, input, response),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'submit-error': (e, input, error) => this.$emit('submit-error', e, input, error),
                    },
                }, this.$slots.default),
            ]);
        },
    });

    const TDialogOverlay = Vue__default['default'].extend({
        name: 'TDialogOverlay',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            overlayShow: {
                type: Boolean,
                required: true,
            },
            dialogShow: {
                type: Boolean,
                required: true,
            },
            titleTag: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                default: undefined,
            },
            icon: {
                type: String,
                default: undefined,
            },
            cancelButtonText: {
                type: String,
                required: true,
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                required: true,
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            showCloseButton: {
                type: Boolean,
                required: true,
            },
            preConfirm: {
                type: Function,
                default: undefined,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                required: true,
            },
            inputValidator: {
                type: Function,
                default: undefined,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                default: null,
            },
        },
        methods: {
            clickHandler(e) {
                if (e.target !== this.$el) {
                    return;
                }
                this.$emit('outside-click', e);
            },
            keyupHandler(e) {
                this.$emit('keyup', e);
            },
            focus() {
                const overlay = this.$el;
                if (overlay && overlay.focus) {
                    overlay.focus();
                }
            },
            enableBodyScroll() {
                const mdl = this.$el;
                bodyScrollLock.enableBodyScroll(mdl);
            },
            disableBodyScroll() {
                const mdl = this.$el;
                bodyScrollLock.disableBodyScroll(mdl, {
                    reserveScrollBarGap: true,
                });
            },
        },
        render(createElement) {
            if (!this.overlayShow) {
                return createElement();
            }
            return createElement('div', {
                attrs: {
                    tabindex: 0,
                },
                class: this.getElementCssClass('overlay'),
                on: {
                    keyup: this.keyupHandler,
                    click: this.clickHandler,
                },
            }, [
                createElement(TDialogOverlayWrapper, {
                    props: {
                        type: this.type,
                        getElementCssClass: this.getElementCssClass,
                        dialogShow: this.dialogShow,
                        titleTag: this.titleTag,
                        title: this.title,
                        icon: this.icon,
                        textTag: this.textTag,
                        text: this.text,
                        cancelButtonText: this.cancelButtonText,
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonText: this.okButtonText,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                        showCloseButton: this.showCloseButton,
                        preConfirm: this.preConfirm,
                        inputAttributes: this.inputAttributes,
                        inputType: this.inputType,
                        inputValidator: this.inputValidator,
                        inputValue: this.inputValue,
                        inputOptions: this.inputOptions,
                        inputPlaceholder: this.inputPlaceholder,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        dismiss: (e) => this.$emit('dismiss', e),
                        cancel: (e) => this.$emit('cancel', e),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        submit: (e, input, response) => this.$emit('submit', e, input, response),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'submit-error': (e, input, error) => this.$emit('submit-error', e, input, error),
                    },
                }, this.$slots.default),
            ]);
        },
    });

    const getInitialData = (vm) => ({
        overlayShow: vm.value,
        dialogShow: vm.value,
        params: undefined,
        preventAction: false,
        hideReason: undefined,
        input: undefined,
        resolve: null,
        reject: null,
        preConfirmResponse: undefined,
        preConfirmError: undefined,
    });
    const TDialog = Component.extend({
        name: 'TDialog',
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                default: undefined,
            },
            titleTag: {
                type: String,
                default: 'h3',
            },
            title: {
                type: String,
                default: undefined,
            },
            icon: {
                type: String,
                default: undefined,
            },
            textTag: {
                type: String,
                default: 'p',
            },
            text: {
                type: String,
                default: undefined,
            },
            clickToClose: {
                type: Boolean,
                default: true,
            },
            escToClose: {
                type: Boolean,
                default: true,
            },
            cancelButtonText: {
                type: String,
                default: 'Cancel',
            },
            cancelButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            okButtonText: {
                type: String,
                default: 'OK',
            },
            okButtonAriaLabel: {
                type: String,
                default: undefined,
            },
            showCloseButton: {
                type: Boolean,
                default: false,
            },
            disableBodyScroll: {
                type: Boolean,
                default: true,
            },
            focusOnOpen: {
                type: Boolean,
                default: true,
            },
            preConfirm: {
                type: Function,
                default: undefined,
            },
            inputAttributes: {
                type: Object,
                default: undefined,
            },
            inputType: {
                type: String,
                default: 'text',
            },
            inputValidator: {
                type: Function,
                default: undefined,
            },
            inputValue: {
                type: [String, Array],
                default: undefined,
            },
            inputOptions: {
                type: [Array, Object],
                default: undefined,
            },
            inputPlaceholder: {
                type: String,
                default: undefined,
            },
            type: {
                type: String,
                default: DialogType.Alert,
            },
            fixedClasses: {
                type: Object,
                default() {
                    return {
                        overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed',
                        wrapper: 'relative mx-auto',
                        modal: 'overflow-visible relative ',
                        close: 'flex items-center justify-center',
                        dialog: 'overflow-visible relative',
                    };
                },
            },
            classes: {
                type: Object,
                default() {
                    return {
                        close: 'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        closeIcon: 'fill-current h-4 w-4',
                        overlay: 'z-40 bg-black bg-opacity-50',
                        wrapper: 'z-50 max-w-lg px-3 py-12',
                        dialog: 'bg-white shadow rounded text-left',
                        body: 'p-3 space-y-3',
                        buttons: 'p-3 flex space-x-4 justify-center bg-gray-100 rounded-b',
                        iconWrapper: 'bg-gray-100 flex flex-shrink-0 h-12 items-center justify-center rounded-full w-12 mx-auto',
                        icon: 'w-6 h-6 text-gray-500',
                        content: 'w-full flex justify-center flex-col',
                        titleWrapper: '',
                        title: 'text-lg font-semibold text-center',
                        textWrapper: 'text-left w-full',
                        text: '',
                        cancelButton: 'block px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
                        okButton: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs',
                        inputWrapper: 'mt-3 flex items-center space-x-3',
                        input: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed w-full',
                        select: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed w-full',
                        radioWrapper: 'flex items-center space-x-2',
                        radio: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
                        radioText: '',
                        checkboxWrapper: 'flex items-center space-x-2',
                        checkbox: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
                        checkboxText: '',
                        errorMessage: 'text-red-500 block text-sm',
                        busyWrapper: 'absolute bg-opacity-50 bg-white flex h-full items-center justify-center left-0 top-0 w-full',
                        busyIcon: 'animate-spin h-6 w-6 fill-current text-gray-500',
                        overlayEnterClass: '',
                        overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
                        overlayEnterToClass: 'opacity-100',
                        overlayLeaveClass: 'transition ease-in opacity-100',
                        overlayLeaveActiveClass: '',
                        overlayLeaveToClass: 'opacity-0 duration-75',
                        enterClass: '',
                        enterActiveClass: '',
                        enterToClass: '',
                        leaveClass: '',
                        leaveActiveClass: '',
                        leaveToClass: '',
                    };
                },
            },
        },
        data() {
            return getInitialData(this);
        },
        watch: {
            value(value) {
                if (value) {
                    this.show();
                }
                else {
                    this.hideReason = HideReason.Value;
                    this.close();
                }
            },
            overlayShow(shown) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (shown) {
                        this.$emit('input', shown);
                        this.$emit('change', shown);
                        yield this.$nextTick();
                        this.dialogShow = true;
                    }
                    else {
                        this.closed();
                    }
                });
            },
            dialogShow(shown) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!shown) {
                        this.$emit('input', shown);
                        this.$emit('change', shown);
                        yield this.$nextTick();
                        this.overlayShow = false;
                    }
                    else {
                        this.opened();
                    }
                });
            },
        },
        beforeDestroy() {
            const overlay = this.getOverlay();
            if (this.disableBodyScroll && overlay) {
                overlay.focus();
                overlay.enableBodyScroll();
            }
        },
        created() {
            if (this.name) {
                this.$dialog.$on(`show-${this.name}`, (resolve, reject, params = undefined) => {
                    this.resolve = resolve;
                    this.reject = reject;
                    this.show(params);
                });
                this.$dialog.$on(`hide-${this.name}`, () => {
                    this.hideReason = HideReason.Method;
                    this.close();
                });
            }
        },
        render(createElement) {
            return createElement('transition', {
                props: {
                    enterClass: this.getElementCssClass('overlayEnterClass'),
                    enterActiveClass: this.getElementCssClass('overlayEnterActiveClass'),
                    enterToClass: this.getElementCssClass('overlayEnterToClass'),
                    leaveClass: this.getElementCssClass('overlayLeaveClass'),
                    leaveActiveClass: this.getElementCssClass('overlayLeaveActiveClass'),
                    leaveToClass: this.getElementCssClass('overlayLeaveToClass'),
                },
            }, [
                createElement(TDialogOverlay, {
                    ref: 'overlay',
                    props: {
                        type: this.type,
                        overlayShow: this.overlayShow,
                        dialogShow: this.dialogShow,
                        titleTag: this.titleTag,
                        title: this.title,
                        icon: this.icon,
                        textTag: this.textTag,
                        text: this.text,
                        cancelButtonText: this.cancelButtonText,
                        cancelButtonAriaLabel: this.cancelButtonAriaLabel,
                        okButtonText: this.okButtonText,
                        okButtonAriaLabel: this.okButtonAriaLabel,
                        showCloseButton: this.showCloseButton,
                        preConfirm: this.preConfirm,
                        inputAttributes: this.inputAttributes,
                        inputType: this.inputType,
                        inputValidator: this.inputValidator,
                        inputValue: this.inputValue,
                        inputOptions: this.inputOptions,
                        inputPlaceholder: this.inputPlaceholder,
                        getElementCssClass: this.getElementCssClass,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        'outside-click': this.outsideClick,
                        keyup: this.keyupHandler,
                        dismiss: (e) => this.dismiss(e),
                        cancel: (e) => this.cancel(e),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        submit: (e, input, response) => this.submit(e, input, response),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        'submit-error': (e, input, error) => this.submitError(e, input, error),
                    },
                }, this.$slots.default),
            ]);
        },
        methods: {
            getOverlay() {
                return this.$refs.overlay;
            },
            keyupHandler(e) {
                if (e.keyCode === Key$1.ESC && this.escToClose) {
                    this.esc(e);
                }
            },
            beforeOpen() {
                this.$emit('before-open', { params: this.params, cancel: this.closeCancel });
            },
            opened() {
                this.$emit('opened', { params: this.params });
                this.prepareDomForDialog();
            },
            beforeClose(event) {
                if (this.disableBodyScroll) {
                    const overlay = this.getOverlay();
                    if (overlay) {
                        overlay.focus();
                        overlay.enableBodyScroll();
                    }
                }
                const beforeCloseParams = {
                    cancel: this.closeCancel,
                    event,
                    reason: this.hideReason,
                };
                if (this.input !== undefined) {
                    beforeCloseParams.input = this.input;
                }
                if (this.preConfirmResponse !== undefined) {
                    beforeCloseParams.response = this.preConfirmResponse;
                }
                this.$emit('before-close', beforeCloseParams);
            },
            closed() {
                const response = {
                    hideReason: this.hideReason,
                    isOk: this.hideReason === HideReason.Ok,
                    isCancel: this.hideReason === HideReason.Cancel,
                    isDismissed: typeof this.hideReason === 'string' && [HideReason.Close, HideReason.Esc, HideReason.Outside].includes(this.hideReason),
                };
                if (this.type === DialogType.Prompt && this.hideReason === HideReason.Ok && this.input !== undefined) {
                    response.input = this.input;
                }
                if (this.preConfirmResponse !== undefined) {
                    response.response = this.preConfirmResponse;
                }
                else if (this.preConfirmError !== undefined) {
                    response.response = this.preConfirmError;
                }
                this.$emit('closed', response);
                if (this.reject && this.preConfirmError !== undefined) {
                    this.reject(this.preConfirmError);
                }
                else if (this.resolve) {
                    this.resolve(response);
                }
                this.reset();
            },
            prepareDomForDialog() {
                const overlay = this.getOverlay();
                if (!overlay) {
                    return;
                }
                if (this.disableBodyScroll) {
                    overlay.disableBodyScroll();
                }
                if (this.focusOnOpen) {
                    overlay.focus();
                }
            },
            dismiss(e) {
                this.hideReason = HideReason.Close;
                this.close(e);
            },
            esc(e) {
                this.hideReason = HideReason.Esc;
                this.close(e);
            },
            cancel(e) {
                this.hideReason = HideReason.Cancel;
                this.close(e);
            },
            hide(e) {
                this.hideReason = HideReason.Method;
                this.close(e);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            submit(e, input, response) {
                this.hideReason = HideReason.Ok;
                this.input = input;
                this.preConfirmResponse = response;
                this.close(e);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            submitError(e, input, error) {
                this.hideReason = HideReason.Ok;
                this.input = input;
                this.preConfirmError = error;
                this.close(e);
            },
            close(e) {
                this.beforeClose(e);
                if (!this.preventAction) {
                    this.dialogShow = false;
                }
                else {
                    this.preventAction = false;
                }
            },
            show(params = undefined) {
                this.params = params;
                this.beforeOpen();
                if (!this.preventAction) {
                    this.overlayShow = true;
                }
                else {
                    this.preventAction = false;
                }
            },
            closeCancel() {
                this.preventAction = true;
            },
            reset() {
                Object.assign(this.$data, getInitialData(this));
            },
            outsideClick(e) {
                if (this.clickToClose) {
                    this.hideReason = HideReason.Outside;
                    this.close(e);
                }
            },
        },
    });

    const parseDialogOptions = (type, settings, titleOrDialogOptions, text, icon) => {
        const { props } = TDialog.options;
        const propsData = Object.assign({ type }, settings);
        let target = 'body';
        if (titleOrDialogOptions) {
            if (typeof titleOrDialogOptions === 'object') {
                Object.keys(props).forEach((propName) => {
                    if (propName in titleOrDialogOptions) {
                        const defaultValue = get__default['default'](props, `${propName}.default`);
                        propsData[propName] = get__default['default'](titleOrDialogOptions, propName, defaultValue);
                    }
                });
                if (titleOrDialogOptions.target) {
                    target = titleOrDialogOptions.target;
                }
            }
            else if (typeof titleOrDialogOptions === 'string') {
                propsData.title = titleOrDialogOptions;
                if (typeof text !== 'undefined') {
                    propsData.text = text;
                }
                if (typeof icon !== 'undefined') {
                    propsData.icon = icon;
                }
            }
        }
        return {
            propsData,
            target,
        };
    };
    const buildDialog = (target, propsData) => {
        const domTarget = document.querySelector(target);
        if (!domTarget) {
            throw new Error('Target not found!');
        }
        const instance = new TDialog({
            propsData,
        });
        instance.$mount();
        domTarget.appendChild(instance.$el);
        instance.show();
        return new Promise((resolve, reject) => {
            instance.resolve = resolve;
            instance.reject = reject;
        });
    };
    const configureDialogGlobals = (vueInstance, settings) => {
        if (!Vue__default['default'].prototype.$dialog) {
            // eslint-disable-next-line no-param-reassign
            vueInstance.prototype.$dialog = new Vue__default['default']({
                methods: {
                    alert(titleOrDialogOptions, text, icon) {
                        const { propsData, target } = parseDialogOptions(DialogType.Alert, settings, titleOrDialogOptions, text, icon);
                        return buildDialog(target, propsData);
                    },
                    confirm(titleOrDialogOptions, text, icon) {
                        const { propsData, target } = parseDialogOptions(DialogType.Confirm, settings, titleOrDialogOptions, text, icon);
                        return buildDialog(target, propsData);
                    },
                    prompt(titleOrDialogOptions, text, icon) {
                        const { propsData, target } = parseDialogOptions(DialogType.Prompt, settings, titleOrDialogOptions, text, icon);
                        return buildDialog(target, propsData);
                    },
                    show(name, params = undefined) {
                        return new Promise((resolve, reject) => {
                            this.$emit(`show-${name}`, resolve, reject, params);
                        });
                    },
                    hide(name) {
                        this.$emit(`hide-${name}`);
                    },
                },
            });
        }
        if (!vueInstance.prototype.$alert) {
            // eslint-disable-next-line no-param-reassign
            vueInstance.prototype.$alert = vueInstance.prototype.$dialog.alert;
            // eslint-disable-next-line no-param-reassign
            vueInstance.prototype.$confirm = vueInstance.prototype.$dialog.confirm;
            // eslint-disable-next-line no-param-reassign
            vueInstance.prototype.$prompt = vueInstance.prototype.$dialog.prompt;
        }
    };

    const configure = (component, props) => {
        var _a, _b;
        const componentProps = (_a = component === null || component === void 0 ? void 0 : component.options) === null || _a === void 0 ? void 0 : _a.props;
        const componentName = (_b = component === null || component === void 0 ? void 0 : component.options) === null || _b === void 0 ? void 0 : _b.name;
        if (componentName === 'TModal') {
            // eslint-disable-next-line no-param-reassign
            Vue__default['default'].prototype.$modal = new Vue__default['default']({
                methods: {
                    show(name, params = undefined) {
                        this.$emit(`show-${name}`, params);
                    },
                    hide(name) {
                        this.$emit(`hide-${name}`);
                    },
                },
            });
        }
        else if (componentName === 'TDialog') {
            configureDialogGlobals(Vue__default['default'], props);
        }
        if (!props || !componentProps) {
            return component;
        }
        const customProps = {};
        Object.keys(props).forEach((customPropName) => {
            const defaultProp = componentProps[customPropName];
            if (!defaultProp) {
                return;
            }
            const newDefaultValue = props[customPropName];
            customProps[customPropName] = {
                type: defaultProp === null || defaultProp === void 0 ? void 0 : defaultProp.type,
                default: ['object', 'function'].includes(typeof newDefaultValue)
                    ? () => newDefaultValue
                    : newDefaultValue,
            };
        });
        return component.extend({
            props: customProps,
        });
    };

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

    const TCheckbox = HtmlInput.extend({
        name: 'TCheckbox',
        props: {
            value: {
                type: [String, Object, Number, Boolean, Array],
                default: true,
            },
            uncheckedValue: {
                type: [String, Object, Number, Boolean, Array],
                default: false,
            },
            indeterminate: {
                type: [Boolean, String],
                default: undefined,
            },
            checked: {
                type: [Boolean, String],
                default: undefined,
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
                default: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        data() {
            return {
                localValue: this.model,
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
        computed: {
            isChecked: {
                get() {
                    if (this.model === undefined) {
                        return this.checked;
                    }
                    if (Array.isArray(this.model)) {
                        return this.model.indexOf(this.value) >= 0;
                    }
                    return this.model === this.value;
                },
                set(checked) {
                    this.localValue = checked;
                },
            },
        },
        watch: {
            isChecked(isChecked) {
                const input = this.getInput();
                if (input.checked !== isChecked) {
                    input.checked = isChecked;
                }
            },
            indeterminate(indeterminate) {
                this.setIndeterminate(indeterminate);
            },
            checked(checked) {
                this.setChecked(checked);
            },
        },
        methods: {
            getInput() {
                return this.$refs.input;
            },
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
                        value: this.isChecked ? this.value : this.uncheckedValue,
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
                            if (e.keyCode === Key$1.SPACE) {
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
                        checked: this.isChecked,
                        value: this.value,
                        id: this.id,
                        type: 'checkbox',
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
                        change: this.changeHandler,
                        input: () => {
                            // Empty, overrides the input handler from the checkbox group
                        },
                    }),
                });
            },
            wrapperSpaceHandler(e) {
                e.preventDefault();
                this.click();
            },
            setIndeterminate(indeterminate) {
                const input = this.getInput();
                input.indeterminate = indeterminate;
                // Emit update event to prop
                this.$emit('update:indeterminate', indeterminate);
            },
            setChecked(checked) {
                const input = this.getInput();
                // this.localValue = checked;
                input.checked = !checked;
                input.click();
                // Emit update event to prop
                this.$emit('update:checked', checked);
            },
            changeHandler() {
                const input = this.getInput();
                const isChecked = input.checked;
                let localValue;
                if (Array.isArray(this.model)) {
                    localValue = [...this.model];
                    const index = localValue.indexOf(this.value);
                    if (isChecked && index < 0) {
                        localValue.push(this.value);
                    }
                    else if (!isChecked && index >= 0) {
                        localValue.splice(index, 1);
                    }
                }
                else {
                    localValue = isChecked ? this.value : this.uncheckedValue;
                }
                this.$emit('input', localValue);
                this.$emit('change', localValue);
                this.$emit('update:indeterminate', false);
                this.$emit('update:checked', isChecked);
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            blur() {
                this.getInput().blur();
            },
            click() {
                this.getInput().click();
            },
            focus(options) {
                this.getInput().focus(options);
            },
        },
    });

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

    const TInput = TextInput.extend({
        name: 'TInput',
        props: {
            type: {
                type: String,
                default: 'text',
            },
            max: {
                type: [String, Number],
                default: undefined,
            },
            min: {
                type: [String, Number],
                default: undefined,
            },
            classes: {
                type: [String, Array, Object],
                default: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        render(createElement) {
            console.log("Input");
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            render(createElement) {
                return createElement('input', {
                    class: this.componentClass,
                    ref: 'input',
                    domProps: {
                        value: this.localValue,
                    },
                    attrs: {
                        id: this.id,
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        autocomplete: this.autocomplete,
                        autofocus: this.autofocus,
                        type: this.type,
                        required: this.required,
                        placeholder: this.placeholder,
                        pattern: this.pattern,
                        multiple: this.multiple,
                        minlength: this.minlength,
                        min: this.min,
                        maxlength: this.maxlength,
                        max: this.max,
                    },
                    on: this.getListeners({
                        blur: this.blurHandler,
                        focus: this.focusHandler,
                        keyup: this.keyupHandler,
                        keydown: this.keydownHandler,
                        input: this.inputHandler,
                    }),
                });
            },
            inputHandler(e) {
                const target = e.target;
                this.$emit('input', target.value);
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

    const TButton = HtmlInput.extend({
        name: 'TButton',
        props: {
            value: {
                type: [String, Number],
                default: null,
            },
            text: {
                type: String,
                default: undefined,
            },
            tagName: {
                type: String,
                default: 'button',
                validator(value) {
                    return ['button', 'a'].indexOf(value) !== -1;
                },
            },
            type: {
                type: String,
                default: undefined,
            },
            href: {
                type: String,
                default: null,
            },
            to: {
                type: [String, Object],
                default: undefined,
            },
            append: {
                type: Boolean,
                default: false,
            },
            activeClass: {
                type: String,
                default: 'router-link-active',
            },
            exact: {
                type: Boolean,
                default: false,
            },
            exactActiveClass: {
                type: String,
                default: 'router-link-exact-active',
            },
            event: {
                type: [String, Array],
                default: 'click',
            },
            data: {
                type: Object,
                default: () => ({}),
            },
            method: {
                type: String,
                default: 'get',
            },
            replace: {
                type: Boolean,
                default: false,
            },
            preserveScroll: {
                type: Boolean,
                default: false,
            },
            preserveState: {
                type: Boolean,
                default: false,
            },
            only: {
                type: Array,
                default: () => [],
            },
            native: {
                type: Boolean,
                default: false,
            },
            classes: {
                type: [String, Array, Object],
                default: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50  disabled:opacity-50 disabled:cursor-not-allowed',
            },
        },
        computed: {
            isInertiaLinkComponentAvailable() {
                return !!(this.$options.components
                    && this.$options.components.InertiaLink);
            },
            isRouterLinkComponentAvailable() {
                return !!(this.$options.components
                    && (this.$options.components.RouterLink || this.$options.components.NuxtLink));
            },
            /**
             * If we have the `to` defined and the routerLink or Nuxt link component is
             * available we can use it to create a router link
             *
             * @return {Boolean}
             */
            isARouterLink() {
                return this.to !== undefined
                    && this.isRouterLinkComponentAvailable
                    && !this.native;
            },
            /**
             * If we have the `href` defined and the InertiaLink component is available
             * we can use it to create an inertia link
             *
             * @return {Boolean}
             */
            isAnIntertiaLink() {
                return this.href !== null
                    && this.tagName === 'a'
                    && this.isInertiaLinkComponentAvailable
                    && !this.native;
            },
            /**
             * The component to render according to the props
             * @return {String}
             */
            componentToRender() {
                var _a;
                if (this.isARouterLink && this.$options.components) {
                    return this.$options.components.NuxtLink || this.$options.components.RouterLink;
                }
                if (this.isAnIntertiaLink) {
                    return (_a = this.$options.components) === null || _a === void 0 ? void 0 : _a.InertiaLink;
                }
                if (this.href) {
                    return 'a';
                }
                return this.tagName;
            },
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            clickHandler(e) {
                this.$emit('click', e);
            },
            keydownHandler(e) {
                this.$emit('keydown', e);
            },
            mousedownHandler(e) {
                this.$emit('mousedown', e);
            },
            blur() {
                this.$el.blur();
            },
            focus() {
                this.$el.focus();
            },
            inertiaLinkAttributes() {
                return {
                    data: this.data,
                    href: this.href,
                    method: this.method,
                    replace: this.replace,
                    preserveScroll: this.preserveScroll,
                    preserveState: this.preserveState,
                    only: this.only,
                    id: this.id,
                    value: this.value,
                    autofocus: this.autofocus,
                    disabled: this.disabled,
                    name: this.name,
                    type: this.type,
                };
            },
            routerLinkAttributes() {
                return {
                    to: this.to,
                    replace: this.replace,
                    append: this.append,
                    tag: this.tagName,
                    activeClass: this.activeClass,
                    exact: this.exact,
                    event: this.event,
                    exactActiveClass: this.exactActiveClass,
                    id: this.id,
                    value: this.value,
                    autofocus: this.autofocus,
                    disabled: this.disabled,
                    name: this.name,
                    type: this.type,
                };
            },
            /**
             * Attrs according to the button type
             * @return {Object}
             */
            getAttributes() {
                if (this.isAnIntertiaLink) {
                    return this.inertiaLinkAttributes();
                }
                if (this.isARouterLink) {
                    return this.routerLinkAttributes();
                }
                return {
                    id: this.id,
                    value: this.value,
                    autofocus: this.autofocus,
                    disabled: this.disabled,
                    name: this.name,
                    href: this.href,
                    type: this.type,
                };
            },
            render(createElement) {
                return createElement(this.componentToRender, {
                    attrs: this.getAttributes(),
                    class: this.componentClass,
                    on: this.getListeners({
                        click: this.clickHandler,
                        focus: this.focusHandler,
                        blur: this.blurHandler,
                        keydown: this.keydownHandler,
                        mousedown: this.mousedownHandler,
                    }),
                }, this.text === undefined ? this.$slots.default : this.text);
            },
        },
    });

    class TRichSelectRenderer {
        constructor(createElement, component) {
            this.createElement = createElement;
            this.component = component;
        }
        render() {
            return this.createWrapper();
        }
        /**
         * Div that wraps the whole component
         */
        createWrapper() {
            return this.createElement('div', {
                ref: 'wrapper',
                class: this.component.getElementCssClass('wrapper'),
            }, [
                this.createSelectButtonWrapper(),
                this.createDropdown(),
            ]);
        }
        /**
         * Div that wraps the button that is used as a select box
         */
        createSelectButtonWrapper() {
            const subElements = [this.createSelectButton()];
            const hasSelectedOption = this.component.multiple
                ? this.component.selectedOptions.filter((o) => !o.disabled).length > 0
                : !!(this.component.selectedOption && !this.component.selectedOption.disabled);
            if (this.component.clearable && hasSelectedOption && !this.component.disabled) {
                subElements.push(this.createSelectButtonClearButton());
            }
            return this.createElement('div', {
                ref: 'buttonWrapper',
                class: this.component.getElementCssClass('buttonWrapper'),
            }, subElements);
        }
        /**
         * The button that is used a select box
         */
        createSelectButton() {
            const subElements = [];
            if (this.component.multiple && this.component.selectedOptions.length) {
                if (this.component.$scopedSlots.label) {
                    subElements.push(this.component.$scopedSlots.label({
                        query: this.component.query,
                        options: this.component.selectedOptions,
                        className: this.component.getElementCssClass('selectButtonLabel'),
                    }));
                }
                else {
                    subElements.push(this.createSelectButtonLabel());
                }
            }
            else if (!this.component.multiple && this.component.selectedOption) {
                if (this.component.$scopedSlots.label) {
                    subElements.push(this.component.$scopedSlots.label({
                        query: this.component.query,
                        option: this.component.selectedOption,
                        className: this.component.getElementCssClass('selectButtonLabel'),
                    }));
                }
                else {
                    subElements.push(this.createSelectButtonLabel());
                }
            }
            else {
                subElements.push(this.createSelectButtonPlaceholder());
            }
            const hasSelectedOption = this.component.multiple
                ? this.component.selectedOptions.length > 0
                : !!this.component.selectedOption;
            if (!(this.component.clearable && hasSelectedOption) && !this.component.disabled) {
                subElements.push(this.createSelectButtonIcon());
            }
            if (this.component.multiple) {
                const hiddenInputs = this.component.selectedOptions.map((option) => this.createElement('input', {
                    attrs: {
                        type: 'hidden',
                        value: option.value,
                        name: this.component.name,
                    },
                }));
                return this.createElement('div', {
                    ref: 'tagsContainer',
                    attrs: {
                        tabindex: this.component.tabindex || 0,
                    },
                    class: this.component.getElementCssClass('selectButton'),
                    on: {
                        click: this.component.clickHandler,
                        focus: this.component.focusHandler,
                        keydown: (e) => {
                            if (e.keyCode === Key$1.DOWN) {
                                this.component.arrowDownHandler(e);
                            }
                            else if (e.keyCode === Key$1.UP) {
                                this.component.arrowUpHandler(e);
                            }
                            else if (e.keyCode === Key$1.ENTER) {
                                this.component.enterHandler(e);
                            }
                            else if (e.keyCode === Key$1.ESC) {
                                this.component.escapeHandler(e);
                            }
                        },
                        blur: this.component.blurHandler,
                        mousedown: (e) => {
                            e.preventDefault();
                        },
                    },
                }, subElements.concat(hiddenInputs));
            }
            return this.createElement('button', {
                ref: 'selectButton',
                attrs: {
                    type: 'button',
                    value: this.component.localValue,
                    id: this.component.id,
                    autofocus: this.component.autofocus,
                    disabled: this.component.disabled,
                    name: this.component.name,
                },
                class: this.component.getElementCssClass('selectButton'),
                on: {
                    click: this.component.clickHandler,
                    focus: this.component.focusHandler,
                    keydown: (e) => {
                        if (e.keyCode === Key$1.DOWN) {
                            this.component.arrowDownHandler(e);
                        }
                        else if (e.keyCode === Key$1.UP) {
                            this.component.arrowUpHandler(e);
                        }
                        else if (e.keyCode === Key$1.ENTER) {
                            this.component.enterHandler(e);
                        }
                        else if (e.keyCode === Key$1.ESC) {
                            this.component.escapeHandler(e);
                        }
                    },
                    blur: this.component.blurHandler,
                    mousedown: (e) => {
                        e.preventDefault();
                    },
                },
            }, subElements);
        }
        createSelectButtonLabel() {
            if (this.component.multiple) {
                return this.createElement('div', {
                    class: this.component.getElementCssClass('selectButtonTagWrapper'),
                }, this.component.selectedOptions.map((selectedOption, index) => this.createElement('button', {
                    class: this.component.getElementCssClass('selectButtonTag'),
                    attrs: {
                        tabindex: this.component.tagsAreFocusable && !selectedOption.disabled ? '0' : '-1',
                        type: 'button',
                        disabled: selectedOption.disabled ? true : undefined,
                    },
                    on: {
                        click: (e) => {
                            e.stopPropagation();
                            if (selectedOption.disabled) {
                                return;
                            }
                            this.component.selectTag(e.currentTarget);
                        },
                        blur: (e) => {
                            this.component.unselectTag(e.currentTarget);
                        },
                        focus: (e) => {
                            this.component.selectTag(e.currentTarget);
                        },
                        keydown: (e) => {
                            if (e.keyCode === Key$1.BACKSPACE) {
                                this.component.unselectOptionAtIndex(index);
                            }
                        },
                    },
                }, [
                    this.createElement('span', {
                        class: this.component.getElementCssClass('selectButtonTagText'),
                    }, (selectedOption ? selectedOption.text : '')),
                    [
                        selectedOption.disabled
                            ? null
                            : this.createElement('span', {
                                class: this.component.getElementCssClass('selectButtonTagDeleteButton'),
                                attrs: {
                                    tabindex: -1,
                                },
                                on: {
                                    click: (e) => {
                                        e.stopPropagation();
                                        this.component.unselectOptionAtIndex(index);
                                    },
                                },
                            }, [
                                this.createElement('svg', {
                                    class: this.component.getElementCssClass('selectButtonTagDeleteButtonIcon'),
                                    attrs: {
                                        fill: 'currentColor',
                                        viewBox: '0 0 20 20',
                                        xmlns: 'http://www.w3.org/2000/svg',
                                    },
                                }, [
                                    this.createElement('path', {
                                        attrs: {
                                            'fill-rule': 'evenodd',
                                            evenodd: 'evenodd',
                                            d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                                        },
                                    }),
                                ]),
                            ]),
                    ],
                ])));
            }
            return this.createElement('span', {
                ref: 'selectButtonLabel',
                class: this.component.getElementCssClass('selectButtonLabel'),
            }, (this.component.selectedOption ? this.component.selectedOption.text : ''));
        }
        createSelectButtonPlaceholder() {
            const domProps = {};
            if (!this.component.placeholder) {
                domProps.innerHTML = '&nbsp;';
            }
            return this.createElement('span', {
                ref: 'selectButtonPlaceholder',
                class: this.component.getElementCssClass('selectButtonPlaceholder'),
                domProps,
            }, this.component.placeholder || undefined);
        }
        createSelectButtonIcon() {
            return this.createElement('svg', {
                ref: 'selectButtonIcon',
                attrs: {
                    fill: 'currentColor',
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 20 20',
                },
                class: this.component.getElementCssClass('selectButtonIcon'),
            }, [
                this.createElement('path', {
                    attrs: {
                        'clip-rule': 'evenodd',
                        'fill-rule': 'evenodd',
                        d: 'M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z',
                    },
                }),
            ]);
        }
        createSelectButtonClearButton() {
            return this.createElement('button', {
                ref: 'selectButtonClearButton',
                class: this.component.getElementCssClass('selectButtonClearButton'),
                attrs: {
                    type: 'button',
                    tabindex: -1,
                },
                on: {
                    click: this.component.clearButtonClickHandler,
                },
            }, [
                this.createElement('svg', {
                    attrs: {
                        fill: 'currentColor',
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 20 20',
                    },
                    class: this.component.getElementCssClass('selectButtonClearIcon'),
                }, [
                    this.createElement('polygon', {
                        attrs: {
                            points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
                        },
                    }),
                ]),
            ]);
        }
        /**
         * Div that wraps the search box
         */
        createSearchBoxWrapper() {
            return this.createElement('div', {
                ref: 'searchWrapper',
                class: this.component.getElementCssClass('searchWrapper'),
            }, [
                this.createSearchBox(),
            ]);
        }
        /**
         * Filter search box
         */
        createSearchBox() {
            return this.createElement('input', {
                ref: 'searchBox',
                class: this.component.getElementCssClass('searchBox'),
                domProps: {
                    value: this.component.query,
                },
                attrs: {
                    placeholder: this.component.searchBoxPlaceholder,
                },
                on: {
                    keydown: (e) => {
                        if (e.keyCode === Key$1.DOWN) {
                            this.component.arrowDownHandler(e);
                        }
                        else if (e.keyCode === Key$1.UP) {
                            this.component.arrowUpHandler(e);
                        }
                        else if (e.keyCode === Key$1.ENTER) {
                            this.component.enterHandler(e);
                        }
                        else if (e.keyCode === Key$1.ESC) {
                            this.component.escapeHandler(e);
                        }
                    },
                    blur: this.component.blurHandler,
                    input: this.component.searchInputHandler,
                },
            });
        }
        getMinimumInputLengthText() {
            if (typeof this.component.minimumInputLengthText === 'function') {
                return this.component.minimumInputLengthText(this.component.minimumInputLength, this.component.query);
            }
            return this.component.minimumInputLengthText;
        }
        /**
         * The div used as dropdown with the options and the search box
         */
        createDropdown() {
            const subElements = [];
            if (this.component.shouldShowSearchbox) {
                subElements.push(this.createSearchBoxWrapper());
            }
            if (this.component.$scopedSlots.dropdownUp) {
                subElements.push(this.component.$scopedSlots.dropdownUp({
                    query: this.component.query,
                    selectedOption: this.component.selectedOption,
                    options: this.component.filteredOptions,
                }));
            }
            if (this.component.searching && !this.component.nextPage) {
                if (this.component.$scopedSlots.searchingText) {
                    subElements.push(this.component.$scopedSlots.searchingText({
                        text: this.component.searchingText,
                        query: this.component.query,
                        className: this.component.getElementCssClass('dropdownFeedback'),
                    }));
                }
                else {
                    subElements.push(this.createDropdownFeedback(this.component.searchingText));
                }
            }
            else if (this.component.minimumInputLength !== undefined
                && this.component.query.length < this.component.minimumInputLength) {
                const minInputLengthText = this.getMinimumInputLengthText();
                subElements.push(this.createDropdownFeedback(minInputLengthText));
            }
            else if (!this.component.filteredOptions.length) {
                if (this.component.$scopedSlots.noResults) {
                    subElements.push(this.component.$scopedSlots.noResults({
                        text: this.component.noResultsText,
                        query: this.component.query,
                        className: this.component.getElementCssClass('dropdownFeedback'),
                    }));
                }
                else {
                    subElements.push(this.createDropdownFeedback(this.component.noResultsText));
                }
            }
            if (this.component.filteredOptions.length) {
                subElements.push(this.createOptionsList(this.component.filteredOptions));
            }
            if (this.component.searching && this.component.nextPage) {
                if (this.component.$scopedSlots.loadingMoreResultsText) {
                    subElements.push(this.component.$scopedSlots.loadingMoreResultsText({
                        text: this.component.loadingMoreResultsText,
                        nextPage: this.component.nextPage,
                        query: this.component.query,
                        className: this.component.getElementCssClass('loadingMoreResults'),
                    }));
                }
                else {
                    subElements.push(this.createLoadingMoreResults(this.component.loadingMoreResultsText));
                }
            }
            if (this.component.$scopedSlots.dropdownDown) {
                subElements.push(this.component.$scopedSlots.dropdownDown({
                    query: this.component.query,
                    selectedOption: this.component.selectedOption,
                    options: this.component.filteredOptions,
                }));
            }
            return this.createElement('transition', {
                props: {
                    enterClass: this.component.getElementCssClass('enterClass'),
                    enterActiveClass: this.component.getElementCssClass('enterActiveClass'),
                    enterToClass: this.component.getElementCssClass('enterToClass'),
                    leaveClass: this.component.getElementCssClass('leaveClass'),
                    leaveActiveClass: this.component.getElementCssClass('leaveActiveClass'),
                    leaveToClass: this.component.getElementCssClass('leaveToClass'),
                },
            }, this.component.show ? [
                this.createElement('div', {
                    ref: 'dropdown',
                    class: this.component.getElementCssClass('dropdown'),
                }, subElements),
            ] : undefined);
        }
        /**
         * Options list wrapper
         */
        createOptionsList(options) {
            return this.createElement('ul', {
                ref: 'optionsList',
                class: this.component.getElementCssClass('optionsList'),
                style: {
                    maxHeight: this.component.normalizedHeight,
                },
                on: {
                    scroll: this.component.listScrollHandler,
                },
            }, this.createOptions(options));
        }
        /**
         * Dropdown feedback
         * @param text
         */
        createDropdownFeedback(text) {
            return this.createElement('div', {
                ref: 'dropdownFeedback',
                class: this.component.getElementCssClass('dropdownFeedback'),
            }, text);
        }
        /**
         * Dropdown feedback
         * @param text
         */
        createLoadingMoreResults(text) {
            return this.createElement('div', {
                ref: 'loadingMoreResults',
                class: this.component.getElementCssClass('loadingMoreResults'),
            }, text);
        }
        /**
         * List of options
         */
        createOptions(options) {
            let index = -1;
            return options
                .map((option) => {
                if (option.children) {
                    return [
                        option,
                        ...option.children,
                    ];
                }
                return option;
            })
                .flat()
                .map((option) => {
                if (option.children) {
                    return this.createOptgroup(option);
                }
                index += 1;
                return this.createOption(option, index);
            });
        }
        /**
         * Creates an optgroup element
         * @param option
         * @param index
         */
        createOptgroup(optgroup) {
            return this.createElement('li', {
                attrs: {
                    'data-type': 'optgroup',
                },
                class: this.component.getElementCssClass('optgroup'),
            }, guessOptionText(optgroup, this.component.textAttribute));
        }
        /**
         * Builds an option element
         * @param option
         * @param index
         */
        createOption(option, index) {
            const isSelected = this.component.optionHasValue(option, this.component.localValue);
            const isHighlighted = this.component.highlighted === index;
            let className;
            if (option.disabled) {
                className = this.component.getElementCssClass('disabledOption');
            }
            else if (isHighlighted && isSelected) {
                className = this.component.getElementCssClass('selectedHighlightedOption');
            }
            else if (isHighlighted) {
                className = this.component.getElementCssClass('highlightedOption');
            }
            else if (isSelected) {
                className = this.component.getElementCssClass('selectedOption');
            }
            else {
                className = this.component.getElementCssClass('option');
            }
            const subElements = [];
            if (this.component.$scopedSlots.option) {
                subElements.push(this.component.$scopedSlots.option({
                    index,
                    isHighlighted,
                    isSelected,
                    option,
                    query: this.component.query,
                    className: this.component.getElementCssClass('optionContent'),
                }));
            }
            else {
                subElements.push(this.createOptionContent(option, isSelected));
            }
            return this.createElement('li', {
                ref: 'option',
                class: className,
                attrs: {
                    'data-type': 'option',
                },
                on: {
                    mouseover: () => {
                        this.component.highlighted = index;
                    },
                    mouseleave: () => {
                        this.component.highlighted = null;
                    },
                    mousedown: (e) => {
                        e.preventDefault();
                    },
                    click: (e) => {
                        e.preventDefault();
                        if (option.disabled) {
                            return;
                        }
                        this.component.selectOption(option);
                    },
                },
            }, subElements);
        }
        createOptionContent(option, isSelected) {
            const subElements = [
                this.createOptionLabel(option),
            ];
            if (isSelected) {
                subElements.push(this.createOptionSelectedIcon());
            }
            return this.createElement('div', {
                ref: 'optionContent',
                class: this.component.getElementCssClass('optionContent'),
            }, subElements);
        }
        createOptionLabel(option) {
            return this.createElement('span', {
                ref: 'optionLabel',
                class: this.component.getElementCssClass('optionLabel'),
            }, option.text);
        }
        createOptionSelectedIcon() {
            return this.createElement('svg', {
                ref: 'selectedIcon',
                attrs: {
                    fill: 'currentColor',
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 20 20',
                },
                class: this.component.getElementCssClass('selectedIcon'),
            }, [
                this.createElement('polygon', {
                    attrs: {
                        points: '0 11 2 9 7 14 18 3 20 5 7 18',
                    },
                }),
            ]);
        }
    }

    const TRichSelect = MultipleInput.extend({
        name: 'TRichSelect',
        render(createElement) {
            const createSelectFunc = this.createSelect;
            return createSelectFunc(createElement);
        },
        props: {
            delay: {
                type: Number,
                default: 250,
            },
            fetchOptions: {
                type: Function,
                default: undefined,
            },
            minimumResultsForSearch: {
                type: Number,
                default: undefined,
            },
            minimumInputLength: {
                type: Number,
                default: undefined,
            },
            minimumInputLengthText: {
                type: [Function, String],
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                default: (minimumInputLength, _query) => `Please enter ${minimumInputLength} or more characters`,
            },
            hideSearchBox: {
                type: Boolean,
                default: false,
            },
            openOnFocus: {
                type: Boolean,
                default: true,
            },
            closeOnSelect: {
                type: Boolean,
                default: true,
            },
            selectOnClose: {
                type: Boolean,
                default: false,
            },
            clearable: {
                type: Boolean,
                default: false,
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: undefined,
            },
            searchBoxPlaceholder: {
                type: String,
                default: 'Search...',
            },
            noResultsText: {
                type: String,
                default: 'No results found',
            },
            searchingText: {
                type: String,
                default: 'Searching...',
            },
            loadingMoreResultsText: {
                type: String,
                default: 'Loading more results...',
            },
            maxHeight: {
                type: [String, Number],
                default: 300,
            },
            fixedClasses: {
                type: Object,
                default() {
                    return {
                        wrapper: 'relative',
                        buttonWrapper: 'inline-block relative w-full',
                        selectButton: 'w-full flex text-left justify-between items-center',
                        selectButtonLabel: 'block truncate',
                        selectButtonTagWrapper: 'flex flex-wrap overflow-hidden',
                        selectButtonTag: 'bg-blue-500 block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full overflow-hidden h-8 flex items-center',
                        selectButtonTagText: 'px-3',
                        selectButtonTagDeleteButton: '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
                        selectButtonTagDeleteButtonIcon: 'w-3 h-3',
                        selectButtonPlaceholder: 'block truncate',
                        selectButtonIcon: 'fill-current flex-shrink-0 ml-1 h-4 w-4',
                        selectButtonClearButton: 'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
                        selectButtonClearIcon: 'fill-current h-3 w-3',
                        dropdown: 'absolute w-full z-10',
                        dropdownFeedback: '',
                        loadingMoreResults: '',
                        optionsList: 'overflow-auto',
                        searchWrapper: 'inline-block w-full',
                        searchBox: 'inline-block w-full',
                        optgroup: '',
                        option: 'cursor-pointer',
                        disabledOption: 'opacity-50 cursor-not-allowed',
                        highlightedOption: 'cursor-pointer',
                        selectedOption: 'cursor-pointer',
                        selectedHighlightedOption: 'cursor-pointer',
                        optionContent: '',
                        optionLabel: 'truncate block',
                        selectedIcon: 'fill-current h-4 w-4',
                        enterClass: '',
                        enterActiveClass: '',
                        enterToClass: '',
                        leaveClass: '',
                        leaveActiveClass: '',
                        leaveToClass: '',
                    };
                },
            },
            classes: {
                type: Object,
                default() {
                    return {
                        wrapper: '',
                        buttonWrapper: '',
                        selectButton: 'px-3 py-2 text-black transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
                        selectButtonLabel: '',
                        selectButtonTagWrapper: '-mx-2 -my-2.5 py-1 pr-8',
                        selectButtonTag: 'bg-blue-500 block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full overflow-hidden h-8 flex items-center',
                        selectButtonTagText: 'px-3',
                        selectButtonTagDeleteButton: '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
                        selectButtonTagDeleteButtonIcon: '',
                        selectButtonPlaceholder: 'text-gray-400',
                        selectButtonIcon: 'text-gray-600',
                        selectButtonClearButton: 'hover:bg-blue-100 text-gray-600 rounded transition duration-100 ease-in-out',
                        selectButtonClearIcon: '',
                        dropdown: '-mt-1 bg-white border-b border-gray-300 border-l border-r rounded-b shadow-sm',
                        dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
                        loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
                        optionsList: '',
                        searchWrapper: 'p-2 placeholder-gray-400',
                        searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300',
                        optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
                        option: '',
                        disabledOption: '',
                        highlightedOption: 'bg-blue-100',
                        selectedOption: 'font-semibold bg-gray-100 bg-blue-500 font-semibold text-white',
                        selectedHighlightedOption: 'font-semibold bg-gray-100 bg-blue-600 font-semibold text-white',
                        optionContent: 'flex justify-between items-center px-3 py-2',
                        optionLabel: '',
                        selectedIcon: '',
                        enterClass: '',
                        enterActiveClass: 'opacity-0 transition ease-out duration-100',
                        enterToClass: 'opacity-100',
                        leaveClass: 'transition ease-in opacity-100',
                        leaveActiveClass: '',
                        leaveToClass: 'opacity-0 duration-75',
                    };
                },
            },
        },
        data() {
            return {
                hasFocus: false,
                show: false,
                localValue: this.value,
                highlighted: null,
                query: '',
                filteredOptions: [],
                selectedOption: undefined,
                selectedOptions: [],
                searching: false,
                delayTimeout: undefined,
                nextPage: undefined,
                tagsAreFocusable: false,
            };
        },
        created() {
            if (Array.isArray(this.value)) {
                this.selectedOptions = this.value
                    .map((value) => this.findOptionByValue(value))
                    .filter((option) => !!option);
            }
            else if (!this.selectedOption || this.selectedOption.value !== this.value) {
                this.selectedOption = this.findOptionByValue(this.value);
            }
        },
        updated() {
            if (typeof this.selectedOption === 'undefined'
                || (this.selectedOption.value !== this.value && this.value !== null)) {
                this.selectedOption = this.findOptionByValue(this.value);
            }
        },
        watch: {
            normalizedOptions: {
                handler() {
                    this.query = '';
                    this.filterOptions('');
                },
                immediate: true,
            },
            query(query) {
                this.nextPage = undefined;
                this.filterOptions(query);
            },
            localValue(localValue) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (Array.isArray(localValue)) {
                        this.selectedOptions = localValue
                            .map((value) => this.findOptionByValue(value))
                            .filter((option) => !!option);
                    }
                    else if (!this.selectedOption || this.selectedOption.value !== localValue) {
                        this.selectedOption = this.findOptionByValue(localValue);
                    }
                    this.$emit('input', localValue);
                    yield this.$nextTick();
                    this.$emit('change', localValue);
                    if (this.closeOnSelect) {
                        this.hideOptions();
                    }
                });
            },
            value(value) {
                this.localValue = value;
            },
            highlighted(highlighted) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (highlighted === null) {
                        return;
                    }
                    yield this.$nextTick();
                    this.scrollToHighlightedOption();
                });
            },
            show(show) {
                if (show) {
                    if (this.shouldShowSearchbox) {
                        this.focusSearchBox();
                    }
                    if (!this.atLeastOneValidOptionExists) {
                        this.highlighted = null;
                        return;
                    }
                    this.highlighted = this.selectedOptionIndex !== undefined
                        ? this.selectedOptionIndex
                        : this.findNextOptionIndex();
                }
            },
            shouldShowSearchbox(shouldShowSearchbox) {
                if (shouldShowSearchbox && this.show) {
                    this.focusSearchBox();
                }
            },
        },
        computed: {
            usesAJax() {
                return !!this.fetchOptions;
            },
            shouldShowSearchbox() {
                const showSearchbox = !this.hideSearchBox;
                const hasQuery = !!this.query;
                const hasMinResultsSetting = typeof this.minimumResultsForSearch === 'undefined';
                const hasminimumResultsForSearch = hasMinResultsSetting
                    || hasQuery
                    || (this.usesAJax
                        ? this.filteredflattenedOptions.length >= this.minimumResultsForSearch
                        : this.normalizedOptions.length >= this.minimumResultsForSearch);
                return showSearchbox && hasminimumResultsForSearch;
            },
            hasMinimumInputLength() {
                return this.minimumInputLength === undefined
                    || this.query.length >= this.minimumInputLength;
            },
            filteredflattenedOptions() {
                return this.filteredOptions.map((option) => {
                    if (option.children) {
                        return option.children;
                    }
                    return option;
                }).flat();
            },
            atLeastOneValidOptionExists() {
                return this.filteredflattenedOptions.some((option) => !option.disabled);
            },
            normalizedHeight() {
                if (/^\d+$/.test(String(this.maxHeight))) {
                    return `${this.maxHeight}px`;
                }
                return String(this.maxHeight);
            },
            selectedOptionIndex() {
                let selectedOption;
                if (this.multiple) {
                    selectedOption = this.selectedOptions.length >= 1 ? this.selectedOptions[this.selectedOptions.length - 1] : undefined;
                }
                else {
                    selectedOption = this.selectedOption;
                }
                if (!selectedOption) {
                    return undefined;
                }
                const index = this.filteredflattenedOptions
                    .findIndex((option) => this.optionHasValue(option, selectedOption.value));
                return index >= 0 ? index : undefined;
            },
            highlightedOption() {
                if (typeof this.highlighted === 'number') {
                    return this.filteredflattenedOptions[this.highlighted];
                }
                return undefined;
            },
        },
        methods: {
            // eslint-disable-next-line max-len
            findOptionByValue(value) {
                return this.filteredflattenedOptions
                    .find((option) => this.optionHasValue(option, value));
            },
            // eslint-disable-next-line max-len
            optionHasValue(option, value) {
                return Array.isArray(value)
                    ? value.includes(option.value)
                    : value === option.value;
            },
            createSelect(createElement) {
                return (new TRichSelectRenderer(createElement, this))
                    .render();
            },
            filterOptions(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!this.hasMinimumInputLength) {
                        this.filteredOptions = [];
                        return;
                    }
                    if (!this.fetchOptions) {
                        const options = cloneDeep__default['default'](this.normalizedOptions);
                        this.filteredOptions = this.queryFilter(options);
                        if (this.filteredOptions.length) {
                            this.highlighted = 0;
                        }
                        else {
                            this.highlighted = null;
                        }
                        return;
                    }
                    this.searching = true;
                    if (this.delayTimeout) {
                        clearTimeout(this.delayTimeout);
                    }
                    this.delayTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        try {
                            const { results, hasMorePages } = yield this.getFilterPromise(query);
                            if (this.nextPage) {
                                const currentOptionsListLength = this.filteredOptions.length;
                                this.filteredOptions = this.filteredOptions.concat(this.normalizeOptions(results));
                                // Ux: When the last item is highlighted highlight the next one, make
                                // special sense when using keyboard
                                if (this.highlighted === currentOptionsListLength - 1) {
                                    this.highlighted = currentOptionsListLength;
                                }
                            }
                            else {
                                this.filteredOptions = this.normalizeOptions(results);
                                if (this.filteredOptions.length) {
                                    this.highlighted = 0;
                                }
                                else {
                                    this.highlighted = null;
                                }
                            }
                            if (hasMorePages) {
                                this.nextPage = this.nextPage === undefined ? 2 : this.nextPage + 1;
                            }
                            else {
                                this.nextPage = undefined;
                            }
                        }
                        catch (error) {
                            this.$emit('fetch-error', error);
                            this.filteredOptions = [];
                        }
                        this.searching = false;
                        this.delayTimeout = undefined;
                    }), this.delay);
                });
            },
            getFilterPromise(query) {
                return Promise
                    .resolve(this.fetchOptions(query, this.nextPage));
            },
            listEndReached() {
                if (!this.nextPage || this.searching) {
                    return;
                }
                this.filterOptions(this.query);
            },
            queryFilter(options) {
                if (!this.query) {
                    return options;
                }
                return options
                    .map((option) => {
                    if (option.children) {
                        const newOption = Object.assign(Object.assign({}, option), {
                            children: this.queryFilter(option.children),
                        });
                        return newOption;
                    }
                    return option;
                }).filter((option) => {
                    const foundText = String(option.text)
                        .toUpperCase()
                        .trim()
                        .includes(this.query.toUpperCase().trim());
                    const hasChildren = option.children && option.children.length > 0;
                    return hasChildren || foundText;
                });
            },
            hideOptions() {
                this.show = false;
                if (this.selectOnClose && this.highlightedOption) {
                    this.selectOption(this.highlightedOption, false);
                }
            },
            showOptions() {
                this.show = true;
            },
            toggleOptions() {
                if (this.show) {
                    this.hideOptions();
                }
                else {
                    this.showOptions();
                }
            },
            focusSearchBox() {
                return __awaiter(this, void 0, void 0, function* () {
                    yield this.$nextTick();
                    const searchBox = this.getSearchBox();
                    searchBox.focus();
                    searchBox.select();
                });
            },
            blurHandler(e) {
                let shouldHideOptions = true;
                const clickedElement = e.relatedTarget;
                if (clickedElement) {
                    const wrapper = this.$refs.wrapper;
                    const isChild = wrapper.contains(clickedElement);
                    let clickedATag = false;
                    if (this.multiple) {
                        clickedATag = this.$refs.tagsContainer.contains(clickedElement);
                    }
                    if (isChild && !clickedATag) {
                        shouldHideOptions = false;
                    }
                }
                if (clickedElement !== this.$refs.selectButton
                    && !shouldHideOptions
                    && this.getSearchBox()) {
                    this.focusSearchBox();
                    return;
                }
                if (shouldHideOptions) {
                    this.hideOptions();
                }
                this.$emit('blur', e);
                this.hasFocus = false;
            },
            focusHandler(e) {
                this.hasFocus = true;
                if (this.openOnFocus) {
                    this.showOptions();
                }
                this.$emit('focus', e);
            },
            clickHandler(e) {
                if (!this.show && !this.hasFocus) {
                    if (this.multiple) {
                        this.getTagsContainer().focus();
                    }
                    else {
                        this.getButton().focus();
                    }
                    if (!this.openOnFocus) {
                        this.showOptions();
                    }
                }
                else {
                    this.toggleOptions();
                }
                this.$emit('click', e);
            },
            findNextOptionIndex(currentOptionIndex = null) {
                const endReached = currentOptionIndex !== null
                    && currentOptionIndex + 1 >= this.filteredflattenedOptions.length;
                let nextOptionIndex;
                if (currentOptionIndex === null || endReached) {
                    nextOptionIndex = 0;
                }
                else {
                    nextOptionIndex = currentOptionIndex + 1;
                }
                const nextOption = this.filteredflattenedOptions[nextOptionIndex];
                if (!nextOption || nextOption.disabled) {
                    return this.findNextOptionIndex(nextOptionIndex);
                }
                return nextOptionIndex;
            },
            findPrevOptionIndex(currentOptionIndex) {
                const beginningReached = currentOptionIndex === null
                    || currentOptionIndex - 1 < 0;
                let prevOptionIndex;
                if (currentOptionIndex === null || beginningReached) {
                    prevOptionIndex = this.filteredflattenedOptions.length - 1;
                }
                else {
                    prevOptionIndex = currentOptionIndex - 1;
                }
                const prevOption = this.filteredflattenedOptions[prevOptionIndex];
                if (!prevOption || prevOption.disabled) {
                    return this.findPrevOptionIndex(prevOptionIndex);
                }
                return prevOptionIndex;
            },
            arrowUpHandler(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    e.preventDefault();
                    if (!this.show) {
                        this.showOptions();
                        return;
                    }
                    if (!this.atLeastOneValidOptionExists) {
                        this.highlighted = null;
                        return;
                    }
                    this.highlighted = this.findPrevOptionIndex(this.highlighted);
                });
            },
            arrowDownHandler(e) {
                e.preventDefault();
                if (!this.show) {
                    this.showOptions();
                    return;
                }
                if (!this.atLeastOneValidOptionExists) {
                    this.highlighted = null;
                    return;
                }
                const nextOptionIndex = this.findNextOptionIndex(this.highlighted);
                const endReached = nextOptionIndex >= this.filteredflattenedOptions.length;
                if (endReached && this.usesAJax && this.nextPage) {
                    this.listEndReached();
                }
                else {
                    this.highlighted = nextOptionIndex;
                }
            },
            listScrollHandler(e) {
                const el = e.target;
                if (el.scrollTop === (el.scrollHeight - el.offsetHeight)) {
                    this.listEndReached();
                }
            },
            scrollToHighlightedOption(behavior = 'auto') {
                if (this.$refs.optionsList && typeof this.highlighted === 'number') {
                    const list = this.$refs.optionsList;
                    const li = list.querySelectorAll('li[data-type=option]')[this.highlighted];
                    if (li.scrollIntoView) {
                        li.scrollIntoView({ block: 'nearest', behavior });
                    }
                }
            },
            escapeHandler(e) {
                e.preventDefault();
                this.hideOptions();
            },
            enterHandler(e) {
                if (!this.show) {
                    return;
                }
                if (this.highlighted !== null) {
                    e.preventDefault();
                    this.selectOption(this.highlightedOption);
                }
            },
            searchInputHandler(e) {
                const target = e.target;
                this.query = target.value;
            },
            getButton() {
                return this.$refs.selectButton;
            },
            getTagsContainer() {
                return this.$refs.tagsContainer;
            },
            getSearchBox() {
                return this.$refs.searchBox;
            },
            selectOption(option, focus = true) {
                return __awaiter(this, void 0, void 0, function* () {
                    const optionValue = option.value;
                    if (this.multiple) {
                        if (Array.isArray(this.localValue)) {
                            const valueIndex = this.localValue.findIndex((value) => isEqual__default['default'](value, optionValue));
                            if (valueIndex >= 0) {
                                this.localValue.splice(valueIndex, 1);
                                const selectedOptionIndex = this.selectedOptions.findIndex((o) => o.value === optionValue);
                                if (selectedOptionIndex >= 0) {
                                    this.unselectOptionAtIndex(selectedOptionIndex);
                                    this.selectedOptions.splice(selectedOptionIndex, 1);
                                }
                            }
                            else {
                                this.localValue.push(optionValue);
                                this.selectedOptions.push(option);
                            }
                        }
                        else {
                            this.localValue = [optionValue];
                            this.selectedOptions.push(option);
                        }
                    }
                    else {
                        if (this.localValue !== optionValue) {
                            this.localValue = optionValue;
                        }
                        this.selectedOption = option;
                    }
                    yield this.$nextTick();
                    if (focus) {
                        if (!this.closeOnSelect && this.shouldShowSearchbox) {
                            this.getSearchBox().focus();
                        }
                        else {
                            if (this.multiple) {
                                this.getTagsContainer().focus();
                            }
                            else {
                                this.getButton().focus();
                            }
                            if (this.closeOnSelect && this.show) {
                                this.hideOptions();
                            }
                        }
                    }
                });
            },
            unselectOptionAtIndex(index) {
                const selectedOption = this.selectedOptions[index];
                const valueIndex = this.localValue.findIndex((value) => isEqual__default['default'](value, selectedOption.value));
                if (valueIndex >= 0) {
                    this.localValue.splice(valueIndex, 1);
                }
            },
            clearButtonClickHandler(e) {
                e.preventDefault();
                e.stopPropagation();
                if (this.multiple) {
                    this.localValue = this.selectedOptions.filter((o) => !!o.disabled).map((o) => o.value);
                }
                else {
                    this.localValue = null;
                }
                this.query = '';
            },
            blur() {
                const el = this.hideSearchBox
                    ? this.$refs.selectButton
                    : this.$refs.searchBox;
                el.blur();
            },
            focus(options) {
                const el = this.$refs.selectButton;
                el.focus(options);
            },
            selectTag(tag) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.tagsAreFocusable = true;
                    // Wait until the tag has `tabindex`
                    yield this.$nextTick();
                    tag.focus();
                });
            },
            unselectTag() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.tagsAreFocusable = false;
                });
            },
        },
    });

    const TInputGroup = Component.extend({
        name: 'TInputGroup',
        props: {
            inputName: {
                type: String,
                default: undefined,
            },
            label: {
                type: String,
                default: undefined,
            },
            description: {
                type: String,
                default: undefined,
            },
            feedback: {
                type: String,
                default: undefined,
            },
            sortedElements: {
                type: Array,
                default: () => (['label', 'default', 'feedback', 'description']),
                validator(value) {
                    const expectedValues = ['default', 'description', 'feedback', 'label'];
                    return value.length === intersection__default['default'](value, expectedValues).length;
                },
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
                        wrapper: '',
                        label: 'block',
                        body: '',
                        feedback: 'text-gray-400 text-sm',
                        description: 'text-gray-400 text-sm',
                    };
                },
            },
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        computed: {
            /**
             * Only render the elements that has a prop or a slot (always the default prop)
             * @return {Array}
             */
            elementsToRender() {
                const props = this.$props;
                const slots = this.$slots;
                return this.sortedElements
                    .filter((e) => e === 'default' || !!props[e] || !!slots[e]);
            },
        },
        methods: {
            render(createElement) {
                return createElement('div', {
                    ref: 'wrapper',
                    class: this.getElementCssClass('wrapper'),
                }, this.elementsToRender.map((elementName) => createElement(this.getTagName(elementName), {
                    ref: elementName,
                    class: this.getElementCssClass(elementName === 'default' ? 'body' : elementName),
                    attrs: {
                        for: elementName === 'label' ? this.inputName : undefined,
                    },
                    slot: elementName,
                }, this.$slots[elementName] || this.$props[elementName])));
            },
            /**
             * Get the tag name according to the slot name
             * @param  {String} slotName
             * @return {String}
             */
            getTagName(slotName) {
                switch (slotName) {
                    case 'label':
                        return 'label';
                    default:
                        return 'div';
                }
            },
        },
    });

    const TCard = Component.extend({
        name: 'TCard',
        props: {
            tagName: {
                type: String,
                default: 'div',
            },
            header: {
                type: String,
                default: undefined,
            },
            footer: {
                type: String,
                default: undefined,
            },
            noBody: {
                type: Boolean,
                default: false,
            },
            classes: {
                type: Object,
                default: () => ({
                    wrapper: 'border rounded shadow-sm bg-white border-gray-100',
                    body: 'p-3',
                    header: 'border-b border-gray-100 p-3 rounded-t',
                    footer: 'border-gray-100 border-t p-3 rounded-b',
                }),
            },
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            render(createElement) {
                return createElement(this.tagName, {
                    class: this.getElementCssClass('wrapper'),
                }, this.renderChilds(createElement));
            },
            renderChilds(createElement) {
                if (this.noBody) {
                    return this.$slots.default;
                }
                const childs = [];
                if (!!this.$slots.header || this.header !== undefined) {
                    childs.push(createElement('div', {
                        ref: 'header',
                        class: this.getElementCssClass('header'),
                    }, this.$slots.header || this.header));
                }
                childs.push(createElement('div', {
                    ref: 'body',
                    class: this.getElementCssClass('body'),
                }, this.$slots.default));
                if (!!this.$slots.footer || this.footer !== undefined) {
                    childs.push(createElement('div', {
                        ref: 'footer',
                        class: this.getElementCssClass('footer'),
                    }, this.$slots.footer || this.footer));
                }
                return childs;
            },
        },
    });

    const TAlert = Component.extend({
        name: 'TAlert',
        props: {
            tagName: {
                type: String,
                default: 'div',
            },
            bodyTagName: {
                type: String,
                default: 'div',
            },
            dismissible: {
                type: Boolean,
                default: true,
            },
            show: {
                type: Boolean,
                default: false,
            },
            timeout: {
                type: Number,
                default: undefined,
            },
            classes: {
                type: Object,
                default() {
                    return {
                        wrapper: 'relative flex items-center p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm',
                        body: 'flex-grow',
                        close: 'absolute relative flex items-center justify-center flex-shrink-0 w-6 h-6 ml-4 text-blue-500 transition duration-100 ease-in-out rounded hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        closeIcon: 'fill-current h-4 w-4',
                    };
                },
            },
        },
        data() {
            return {
                localShow: this.show,
            };
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        watch: {
            show(show) {
                this.localShow = show;
            },
            localShow(localShow) {
                this.$emit('update:show', localShow);
                if (this.localShow) {
                    this.$emit('shown');
                    if (this.timeout) {
                        this.initTimeout();
                    }
                }
                else {
                    this.$emit('hidden');
                }
            },
        },
        mounted() {
            if (this.localShow && this.timeout) {
                this.initTimeout();
            }
        },
        methods: {
            render(createElement) {
                if (!this.localShow) {
                    return createElement();
                }
                return createElement(this.tagName, {
                    class: this.getElementCssClass('wrapper'),
                }, !this.dismissible
                    ? [
                        createElement(this.bodyTagName, {
                            ref: 'body',
                            class: this.getElementCssClass('body'),
                        }, this.$slots.default),
                    ]
                    : [
                        createElement(this.bodyTagName, {
                            ref: 'body',
                            class: this.getElementCssClass('body'),
                        }, this.$slots.default),
                        createElement('button', {
                            ref: 'close',
                            class: this.getElementCssClass('close'),
                            attrs: {
                                type: 'button',
                            },
                            on: {
                                click: this.hide,
                            },
                        }, this.$slots.close
                            || [
                                createElement('svg', {
                                    attrs: {
                                        fill: 'currentColor',
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        viewBox: '0 0 20 20',
                                    },
                                    class: this.getElementCssClass('closeIcon'),
                                }, [
                                    createElement('path', {
                                        attrs: {
                                            'clip-rule': 'evenodd',
                                            'fill-rule': 'evenodd',
                                            d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                                        },
                                    }),
                                ]),
                            ]),
                    ]);
            },
            initTimeout() {
                setTimeout(() => {
                    this.hide();
                }, this.timeout);
            },
            hide() {
                this.localShow = false;
            },
        },
    });

    const TModal = Component.extend({
        name: 'TModal',
        props: {
            name: {
                type: String,
                default: undefined,
            },
            value: {
                type: Boolean,
                default: false,
            },
            header: {
                type: String,
                default: undefined,
            },
            footer: {
                type: String,
                default: undefined,
            },
            clickToClose: {
                type: Boolean,
                default: true,
            },
            escToClose: {
                type: Boolean,
                default: true,
            },
            noBody: {
                type: Boolean,
                default: false,
            },
            hideCloseButton: {
                type: Boolean,
                default: false,
            },
            disableBodyScroll: {
                type: Boolean,
                default: true,
            },
            focusOnOpen: {
                type: Boolean,
                default: true,
            },
            fixedClasses: {
                type: Object,
                default() {
                    return {
                        overlay: 'overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed',
                        wrapper: 'relative mx-auto',
                        modal: 'overflow-visible relative ',
                        close: 'flex items-center justify-center',
                    };
                },
            },
            classes: {
                type: Object,
                default() {
                    return {
                        overlay: 'z-40 bg-black bg-opacity-50',
                        wrapper: 'z-50 max-w-lg px-3 py-12',
                        modal: 'bg-white shadow rounded',
                        body: 'p-3',
                        header: 'border-b border-gray-100 p-3 rounded-t',
                        footer: 'bg-gray-100 p-3 rounded-b',
                        close: 'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        closeIcon: 'fill-current h-4 w-4',
                        overlayEnterClass: '',
                        overlayEnterActiveClass: 'opacity-0 transition ease-out duration-100',
                        overlayEnterToClass: 'opacity-100',
                        overlayLeaveClass: 'transition ease-in opacity-100',
                        overlayLeaveActiveClass: '',
                        overlayLeaveToClass: 'opacity-0 duration-75',
                        enterClass: '',
                        enterActiveClass: '',
                        enterToClass: '',
                        leaveClass: '',
                        leaveActiveClass: '',
                        leaveToClass: '',
                    };
                },
            },
        },
        data() {
            return {
                overlayShow: this.value,
                modalShow: this.value,
                params: undefined,
                preventAction: false,
            };
        },
        watch: {
            value(value) {
                if (value) {
                    this.show();
                }
                else {
                    this.hide();
                }
            },
            overlayShow(shown) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.$emit('input', shown);
                    this.$emit('change', shown);
                    yield this.$nextTick();
                    if (shown) {
                        this.modalShow = true;
                    }
                    else {
                        this.closed();
                    }
                });
            },
            modalShow(shown) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield this.$nextTick();
                    if (!shown) {
                        this.overlayShow = false;
                    }
                    else {
                        this.opened();
                    }
                });
            },
        },
        created() {
            if (this.name && this.$modal) {
                this.$modal.$on(`show-${this.name}`, (params = undefined) => {
                    this.show(params);
                });
                this.$modal.$on(`hide-${this.name}`, () => {
                    this.hide();
                });
            }
        },
        mounted() {
            if (this.overlayShow) {
                this.prepareDomForModal();
            }
        },
        beforeDestroy() {
            const overlay = this.getOverlay();
            if (this.disableBodyScroll && overlay) {
                overlay.focus();
                bodyScrollLock.enableBodyScroll(overlay);
            }
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            render(createElement) {
                return createElement('transition', {
                    props: {
                        enterClass: this.getElementCssClass('overlayEnterClass'),
                        enterActiveClass: this.getElementCssClass('overlayEnterActiveClass'),
                        enterToClass: this.getElementCssClass('overlayEnterToClass'),
                        leaveClass: this.getElementCssClass('overlayLeaveClass'),
                        leaveActiveClass: this.getElementCssClass('overlayLeaveActiveClass'),
                        leaveToClass: this.getElementCssClass('overlayLeaveToClass'),
                    },
                }, this.overlayShow ? [
                    createElement('div', {
                        ref: 'overlay',
                        attrs: {
                            tabindex: 0,
                        },
                        class: this.getElementCssClass('overlay'),
                        on: {
                            keyup: this.keyupHandler,
                            click: this.clickHandler,
                        },
                    }, [
                        this.renderWrapper(createElement),
                    ]),
                ] : undefined);
            },
            renderWrapper(createElement) {
                return createElement('div', {
                    ref: 'wrapper',
                    class: this.getElementCssClass('wrapper'),
                }, [
                    this.renderModal(createElement),
                ]);
            },
            renderModal(createElement) {
                return createElement('transition', {
                    props: {
                        enterClass: this.getElementCssClass('enterClass'),
                        enterActiveClass: this.getElementCssClass('enterActiveClass'),
                        enterToClass: this.getElementCssClass('enterToClass'),
                        leaveClass: this.getElementCssClass('leaveClass'),
                        leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
                        leaveToClass: this.getElementCssClass('leaveToClass'),
                    },
                }, this.modalShow ? [
                    createElement('div', {
                        ref: 'modal',
                        class: this.getElementCssClass('modal'),
                    }, this.renderChilds(createElement)),
                ] : undefined);
            },
            renderChilds(createElement) {
                if (this.noBody) {
                    return this.$slots.default;
                }
                const childs = [];
                if (!this.hideCloseButton) {
                    childs.push(createElement('button', {
                        ref: 'close',
                        class: this.getElementCssClass('close'),
                        attrs: {
                            type: 'button',
                        },
                        on: {
                            click: this.hide,
                        },
                    }, this.$slots.button
                        || [
                            createElement('svg', {
                                attrs: {
                                    fill: 'currentColor',
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    viewBox: '0 0 20 20',
                                },
                                class: this.getElementCssClass('closeIcon'),
                            }, [
                                createElement('path', {
                                    attrs: {
                                        'clip-rule': 'evenodd',
                                        'fill-rule': 'evenodd',
                                        d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
                                    },
                                }),
                            ]),
                        ]));
                }
                if (!!this.$slots.header || this.header !== undefined) {
                    childs.push(createElement('div', {
                        ref: 'header',
                        class: this.getElementCssClass('header'),
                    }, this.$slots.header || this.header));
                }
                childs.push(createElement('div', {
                    ref: 'body',
                    class: this.getElementCssClass('body'),
                }, this.$slots.default));
                if (!!this.$slots.footer || this.footer !== undefined) {
                    childs.push(createElement('div', {
                        ref: 'footer',
                        class: this.getElementCssClass('footer'),
                    }, this.$slots.footer || this.footer));
                }
                return childs;
            },
            clickHandler(e) {
                if (e.target === this.$refs.overlay) {
                    this.outsideClick();
                }
            },
            keyupHandler(e) {
                if (e.keyCode === Key$1.ESC && this.escToClose) {
                    this.hide();
                }
            },
            beforeOpen() {
                this.$emit('before-open', { params: this.params, cancel: this.cancel });
            },
            opened() {
                this.$emit('opened', { params: this.params });
                this.prepareDomForModal();
            },
            beforeClose() {
                if (this.disableBodyScroll) {
                    const overlay = this.getOverlay();
                    if (overlay) {
                        overlay.focus();
                        bodyScrollLock.enableBodyScroll(overlay);
                    }
                }
                this.$emit('before-close', { cancel: this.cancel });
            },
            closed() {
                this.$emit('closed');
            },
            prepareDomForModal() {
                const overlay = this.getOverlay();
                if (!overlay) {
                    return;
                }
                if (this.disableBodyScroll) {
                    bodyScrollLock.disableBodyScroll(overlay);
                }
                if (this.focusOnOpen) {
                    overlay.focus();
                }
            },
            hide() {
                this.beforeClose();
                if (!this.preventAction) {
                    this.modalShow = false;
                }
                else {
                    this.preventAction = false;
                }
            },
            show(params = undefined) {
                this.params = params;
                this.beforeOpen();
                if (!this.preventAction) {
                    this.overlayShow = true;
                }
                else {
                    this.preventAction = false;
                }
            },
            cancel() {
                this.preventAction = true;
            },
            outsideClick() {
                if (this.clickToClose) {
                    this.hide();
                }
            },
            getOverlay() {
                return this.$refs.overlay;
            },
        },
    });

    const TDropdown = Component.extend({
        name: 'TDropdown',
        props: {
            text: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            tagName: {
                type: String,
                default: 'div',
            },
            dropdownWrapperTagName: {
                type: String,
                default: 'div',
            },
            dropdownTagName: {
                type: String,
                default: 'div',
            },
            toggleOnFocus: {
                type: Boolean,
                default: false,
            },
            toggleOnClick: {
                type: Boolean,
                default: true,
            },
            toggleOnHover: {
                type: Boolean,
                default: false,
            },
            hideOnLeaveTimeout: {
                type: Number,
                default: 250,
            },
            show: {
                type: Boolean,
                default: false,
            },
            classes: {
                type: Object,
                default() {
                    return {
                        button: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
                        wrapper: 'inline-flex flex-col',
                        dropdownWrapper: 'relative z-10',
                        dropdown: 'origin-top-left absolute left-0 w-56 rounded shadow bg-white mt-1',
                        enterClass: '',
                        enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
                        enterToClass: 'transform opacity-100 scale-100',
                        leaveClass: 'transition ease-in transform opacity-100 scale-100',
                        leaveActiveClass: '',
                        leaveToClass: 'transform opacity-0 scale-95 duration-75',
                    };
                },
            },
        },
        data() {
            return {
                localShow: this.show,
                hasFocus: false,
                hideOnLeaveTimeoutHolder: null,
            };
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        watch: {
            show(show) {
                this.localShow = show;
            },
            localShow(localShow) {
                this.$emit('update:show', localShow);
                if (localShow) {
                    this.$emit('shown');
                }
                else {
                    this.$emit('hidden');
                }
            },
        },
        methods: {
            render(createElement) {
                const defaultSlot = this.$scopedSlots.default
                    ? this.$scopedSlots.default({
                        hide: this.doHide,
                        show: this.doShow,
                        toggle: this.doToggle,
                        blurHandler: this.blurHandler,
                    }) : null;
                const triggerSlot = this.$scopedSlots.trigger
                    ? this.$scopedSlots.trigger({
                        isShown: this.localShow,
                        hide: this.doHide,
                        hideIfFocusOutside: this.hideIfFocusOutside,
                        show: this.doShow,
                        toggle: this.doToggle,
                        mousedownHandler: this.mousedownHandler,
                        focusHandler: this.focusHandler,
                        blurHandler: this.blurHandler,
                        keydownHandler: this.keydownHandler,
                        disabled: this.disabled,
                    }) : createElement('button', {
                    ref: 'button',
                    attrs: {
                        type: 'button',
                        disabled: this.disabled,
                    },
                    class: this.getElementCssClass('button'),
                    on: {
                        keydown: this.keydownHandler,
                        mousedown: this.mousedownHandler,
                        focus: this.focusHandler,
                        blur: this.blurHandler,
                    },
                }, this.$slots.button || this.text);
                const subElements = [
                    triggerSlot,
                    createElement('transition', {
                        props: {
                            enterClass: this.getElementCssClass('enterClass'),
                            enterActiveClass: this.getElementCssClass('enterActiveClass'),
                            enterToClass: this.getElementCssClass('enterToClass'),
                            leaveClass: this.getElementCssClass('leaveClass'),
                            leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
                            leaveToClass: this.getElementCssClass('leaveToClass'),
                        },
                    }, this.localShow ? [
                        createElement(this.dropdownWrapperTagName, {
                            ref: 'dropdownWrapper',
                            class: this.getElementCssClass('dropdownWrapper'),
                            attrs: {
                                tabindex: -1,
                            },
                            on: {
                                focus: this.focusHandler,
                                blur: this.blurHandler,
                            },
                        }, [
                            createElement(this.dropdownTagName, {
                                ref: 'dropdown',
                                class: this.getElementCssClass('dropdown'),
                            }, defaultSlot),
                        ]),
                    ] : undefined),
                ];
                return createElement(this.tagName, {
                    ref: 'wrapper',
                    class: this.getElementCssClass('wrapper'),
                    on: {
                        mouseover: this.mouseoverHandler,
                        mouseleave: this.mouseleaveHandler,
                    },
                }, subElements);
            },
            blurEventTargetIsChild(e) {
                const blurredElement = e.relatedTarget;
                if (blurredElement) {
                    const wrapper = this.$refs.wrapper;
                    return wrapper.contains(blurredElement);
                }
                return false;
            },
            focusEventTargetIsChild(e) {
                const focusedElement = e.target;
                if (focusedElement) {
                    const wrapper = this.$refs.wrapper;
                    return wrapper.contains(focusedElement);
                }
                return false;
            },
            escapeHandler() {
                this.doHide();
            },
            mousedownHandler() {
                if (this.toggleOnClick) {
                    this.doToggle();
                }
            },
            focusHandler(e) {
                if (!this.hasFocus && this.focusEventTargetIsChild(e)) {
                    this.hasFocus = true;
                    this.$emit('focus', e);
                }
                if (this.toggleOnFocus) {
                    this.doShow();
                }
            },
            blurHandler(e) {
                if (this.hasFocus && !this.blurEventTargetIsChild(e)) {
                    this.hasFocus = false;
                    this.$emit('blur', e);
                }
                if (this.toggleOnFocus || this.toggleOnClick) {
                    this.hideIfFocusOutside(e);
                }
            },
            keydownHandler(e) {
                if ([Key$1.ENTER, Key$1.SPACE].includes(e.keyCode)) {
                    this.mousedownHandler();
                }
                else if (e.keyCode === Key$1.ESC) {
                    this.escapeHandler();
                }
                this.$emit('keydown', e);
            },
            mouseleaveHandler() {
                if (!this.toggleOnHover) {
                    return;
                }
                if (!this.hideOnLeaveTimeout) {
                    this.doHide();
                    return;
                }
                this.hideOnLeaveTimeoutHolder = setTimeout(() => {
                    this.doHide();
                    this.hideOnLeaveTimeoutHolder = null;
                }, this.hideOnLeaveTimeout);
            },
            mouseoverHandler() {
                if (!this.toggleOnHover) {
                    return;
                }
                if (this.hideOnLeaveTimeout && this.hideOnLeaveTimeoutHolder) {
                    clearTimeout(this.hideOnLeaveTimeoutHolder);
                    this.hideOnLeaveTimeoutHolder = null;
                }
                this.doShow();
            },
            doHide() {
                this.localShow = false;
            },
            hideIfFocusOutside(e) {
                if (!(e instanceof Event)) {
                    throw new Error('the method hideIfFocusOutside expects an instance of `Event` as parameter');
                }
                if (!this.blurEventTargetIsChild(e)) {
                    this.doHide();
                }
            },
            doShow() {
                this.localShow = true;
            },
            doToggle() {
                if (this.localShow) {
                    this.doHide();
                }
                else {
                    this.doShow();
                }
            },
            blur() {
                const el = this.$refs.button;
                el.blur();
            },
            focus(options) {
                const el = this.$refs.button;
                el.focus(options);
            },
        },
    });

    const TPagination = Component.extend({
        name: 'TPagination',
        props: {
            value: {
                type: Number,
                default: null,
            },
            tagName: {
                type: String,
                default: 'ul',
            },
            elementTagName: {
                type: String,
                default: 'li',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            perPage: {
                type: Number,
                default: 20,
                validator: (value) => value > 0,
            },
            totalItems: {
                type: Number,
                default: 0,
                validator: (value) => value >= 0,
            },
            limit: {
                type: Number,
                default: 5,
                validator: (value) => value >= 0,
            },
            prevLabel: {
                type: String,
                default: '&lsaquo;',
            },
            nextLabel: {
                type: String,
                default: '&rsaquo;',
            },
            firstLabel: {
                type: String,
                default: '&laquo;',
            },
            lastLabel: {
                type: String,
                default: '&raquo;',
            },
            ellipsisLabel: {
                type: String,
                default: '&hellip;',
            },
            hideFirstLastControls: {
                type: Boolean,
                default: false,
            },
            hidePrevNextControls: {
                type: Boolean,
                default: false,
            },
            hideEllipsis: {
                type: Boolean,
                default: false,
            },
            classes: {
                type: Object,
                default() {
                    return {
                        wrapper: 'table border-collapse text-center bg-white mx-auto shadow-sm',
                        element: 'w-8 h-8 border border-gray-200 table-cell hover:border-blue-100',
                        activeElement: 'w-8 h-8 border border-blue-500 table-cell hover:border-blue-600',
                        disabledElement: 'w-8 h-8 border border-gray-200 table-cell',
                        ellipsisElement: 'w-8 h-8 border border-gray-200 hidden md:table-cell',
                        activeButton: 'bg-blue-500 w-full h-full text-white hover:bg-blue-600 transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        disabledButton: 'opacity-25 w-full h-full cursor-not-allowed transition duration-100 ease-in-out',
                        button: 'hover:bg-blue-100 w-full h-full transition duration-100 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        ellipsis: '',
                    };
                },
            },
        },
        render(createElement) {
            const createComponentFunc = this.createComponent;
            return createComponentFunc(createElement);
        },
        data() {
            return {
                currentPage: this.value,
            };
        },
        computed: {
            totalPages() {
                if (this.perPage <= 0) {
                    return 0;
                }
                return Math.ceil(this.totalItems / this.perPage);
            },
            pageButtons() {
                const from1 = Number(this.currentPage) - Math.round(this.limit / 2) + 1;
                const from2 = this.totalPages + 1 - this.limit;
                const from = Math.max(Math.min(from1, from2), 1);
                const to = Math.min(from + this.limit - 1, this.totalPages);
                return range__default['default'](from, to + 1).map((page) => {
                    if (!this.hideEllipsis && page === from && from > 1) {
                        return 'less';
                    }
                    if (!this.hideEllipsis && page === to && to < this.totalPages) {
                        return 'more';
                    }
                    return String(page);
                });
            },
            prevIsDisabled() {
                return this.disabled || this.currentPage === null || this.currentPage <= 1;
            },
            nextIsDisabled() {
                return this.disabled || this.currentPage === null || this.currentPage >= this.totalPages;
            },
        },
        watch: {
            value(value) {
                this.currentPage = value;
            },
            currentPage(currentPage) {
                this.$emit('input', currentPage);
                this.$emit('change', currentPage);
            },
        },
        methods: {
            createComponent(createElement) {
                const subElements = [];
                if (!this.hideFirstLastControls) {
                    subElements.push(this.createControl(createElement, this.firstLabel, this.prevIsDisabled, false, this.goToFirstPage));
                }
                if (!this.hidePrevNextControls) {
                    subElements.push(this.createControl(createElement, this.prevLabel, this.prevIsDisabled, false, this.goToPrevPage));
                }
                this.pageButtons.forEach((page) => {
                    if (page === 'less' || page === 'more') {
                        subElements.push(this.createControl(createElement, this.ellipsisLabel));
                    }
                    else {
                        subElements.push(this.createControl(createElement, page, false, this.isPageActive(Number(page)), () => this.selectPage(Number(page))));
                    }
                });
                if (!this.hidePrevNextControls) {
                    subElements.push(this.createControl(createElement, this.nextLabel, this.nextIsDisabled, false, this.goToNextPage));
                }
                if (!this.hideFirstLastControls) {
                    subElements.push(this.createControl(createElement, this.lastLabel, this.nextIsDisabled, false, this.goToLastPage));
                }
                return createElement(this.tagName, {
                    class: this.getElementCssClass('wrapper'),
                }, subElements);
            },
            // eslint-disable-next-line max-len
            createControl(createElement, text, disabled = false, active = false, clickHandler) {
                let className = '';
                if (!clickHandler) {
                    className = this.getElementCssClass('ellipsisElement');
                }
                else if (disabled) {
                    className = this.getElementCssClass('disabledElement');
                }
                else if (active) {
                    className = this.getElementCssClass('activeElement');
                }
                else {
                    className = this.getElementCssClass('element');
                }
                return createElement(this.elementTagName, {
                    class: className,
                }, [
                    this.createControlButton(createElement, text, disabled, active, clickHandler),
                ]);
            },
            // eslint-disable-next-line max-len
            createControlButton(createElement, text, disabled = false, active = false, clickHandler) {
                if (!clickHandler) {
                    return createElement('span', {
                        class: this.getElementCssClass('ellipsis'),
                        domProps: {
                            innerHTML: text,
                        },
                    });
                }
                let className = '';
                const attrs = {};
                if (disabled) {
                    className = this.getElementCssClass('disabledButton');
                    attrs.disabled = true;
                }
                else if (active) {
                    className = this.getElementCssClass('activeButton');
                }
                else {
                    className = this.getElementCssClass('button');
                }
                return createElement('button', {
                    class: className,
                    on: {
                        click: clickHandler,
                    },
                    attrs,
                    domProps: {
                        disabled: disabled ? true : undefined,
                        innerHTML: text,
                    },
                });
            },
            selectPage(page) {
                this.currentPage = page;
            },
            goToPrevPage() {
                this.currentPage = this.currentPage === null
                    ? 1
                    : Math.max(this.currentPage - 1, 1);
            },
            goToNextPage() {
                this.currentPage = this.currentPage === null
                    ? this.totalPages
                    : Math.min(this.currentPage + 1, this.totalPages);
            },
            goToFirstPage() {
                this.currentPage = 1;
            },
            goToLastPage() {
                this.currentPage = this.totalPages;
            },
            isPageActive(page) {
                return page === this.currentPage;
            },
        },
    });

    const TTag = Component.extend({
        name: 'TTag',
        props: {
            text: {
                type: String,
                default: undefined,
            },
            tagName: {
                type: String,
                default: 'div',
            },
        },
        render(createElement) {
            const renderFun = this.render;
            return renderFun(createElement);
        },
        methods: {
            render(createElement) {
                return createElement(this.tagName, {
                    class: this.componentClass,
                }, this.text === undefined ? this.$slots.default : this.text);
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

    const TCheckboxGroup = InputWithOptions.extend({
        name: 'TCheckboxGroup',
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
            value: {
                type: Array,
                default() {
                    return [];
                },
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
                        input: 'text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0  disabled:opacity-50 disabled:cursor-not-allowed',
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
                return createElement(TCheckbox, {
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
                        input: this.inputHandler,
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
                this.localValue = value;
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
        },
    });

    const TTable = Component.extend({
        name: 'TTable',
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                },
            },
            headers: {
                type: Array,
                default() {
                    return [];
                },
            },
            footerData: {
                type: Array,
                default() {
                    return [];
                },
            },
            hideHeader: {
                type: Boolean,
                default: false,
            },
            showFooter: {
                type: Boolean,
                default: false,
            },
            responsive: {
                type: Boolean,
                default: false,
            },
            responsiveBreakpoint: {
                type: Number,
                default: 768,
            },
            classes: {
                type: Object,
                default: () => ({
                    table: 'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
                    thead: '',
                    theadTr: '',
                    theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
                    tbody: 'bg-white divide-y divide-gray-100',
                    tr: '',
                    td: 'px-3 py-2 whitespace-no-wrap',
                    tfoot: '',
                    tfootTr: '',
                    tfootTd: '',
                }),
            },
        },
        data() {
            return {
                ready: !this.responsive,
                windowWidth: null,
            };
        },
        computed: {
            renderResponsive() {
                const { windowWidth } = this;
                return this.responsive && windowWidth && windowWidth < this.responsiveBreakpoint;
            },
            normalizedHeaders() {
                return this.headers.map((header) => {
                    if (typeof header === 'string') {
                        return {
                            text: header,
                        };
                    }
                    return header;
                });
            },
            normalizedFooterData() {
                return this.footerData.map((footer) => {
                    if (typeof footer === 'string') {
                        return {
                            text: footer,
                        };
                    }
                    return footer;
                });
            },
            headersValues() {
                return this.headers
                    .filter((h) => h.value)
                    .map((h) => h.value);
            },
            showHeader() {
                return !this.hideHeader;
            },
        },
        mounted() {
            // If responsive we will need to calculate the windowWidth
            if (this.responsive) {
                this.windowWidth = window.innerWidth;
                // If responsive we want to show the table until we know the window size
                this.ready = true;
                window.addEventListener('resize', this.resizeListener);
            }
        },
        beforeDestroy() {
            if (this.responsive) {
                window.removeEventListener('resize', this.resizeListener);
            }
        },
        render(createElement) {
            const renderFun = this.renderTable;
            return renderFun(createElement);
        },
        methods: {
            resizeListener() {
                this.windowWidth = window.innerWidth;
            },
            renderTable(createElement) {
                if (!this.ready) {
                    return createElement();
                }
                const childElements = [];
                // The responsive version doesnt have header
                if (!this.renderResponsive) {
                    childElements.push(this.renderThead(createElement));
                }
                childElements.push(this.renderTbody(createElement));
                if (this.showFooter || this.$scopedSlots.tfoot) {
                    childElements.push(this.renderTfoot(createElement));
                }
                return createElement('table', {
                    ref: 'table',
                    class: this.getElementCssClass('table'),
                }, childElements);
            },
            renderThead(createElement) {
                const trClass = this.getElementCssClass('theadTr');
                const thClass = this.getElementCssClass('theadTh');
                const theadClass = this.getElementCssClass('thead');
                if (this.$scopedSlots.thead) {
                    const thead = this.$scopedSlots.thead({
                        theadClass,
                        trClass,
                        thClass,
                        data: this.normalizedHeaders,
                    });
                    if (thead) {
                        return thead;
                    }
                }
                if (!this.showHeader) {
                    return createElement();
                }
                const ths = this.normalizedHeaders.map((header) => createElement('th', {
                    attrs: {
                        id: header.id,
                    },
                    class: header.className ? [thClass, header.className] : thClass,
                }, header.text));
                return createElement('thead', {
                    class: theadClass,
                }, [
                    createElement('tr', {
                        class: trClass,
                    }, ths),
                ]);
            },
            renderTfoot(createElement) {
                const trClass = this.getElementCssClass('tfootTr');
                const tdClass = this.getElementCssClass('tfootTd');
                const tfootClass = this.getElementCssClass('tfoot');
                if (this.$scopedSlots.tfoot) {
                    const tfoot = this.$scopedSlots.tfoot({
                        tfootClass,
                        trClass,
                        tdClass,
                        data: this.normalizedFooterData,
                        headers: this.normalizedHeaders,
                        renderResponsive: this.renderResponsive,
                    });
                    if (tfoot) {
                        return tfoot;
                    }
                }
                const tds = this.normalizedFooterData.map((footer) => createElement('td', {
                    attrs: {
                        id: footer.id,
                    },
                    class: footer.className ? [tdClass, footer.className] : tdClass,
                }, footer.text));
                return createElement('tfoot', {
                    class: tfootClass,
                }, [
                    createElement('tr', {
                        class: trClass,
                    }, tds),
                ]);
            },
            renderTbody(createElement) {
                if (this.$scopedSlots.tbody) {
                    const tbody = this.$scopedSlots.tbody({
                        tbodyClass: this.getElementCssClass('tbody'),
                        trClass: this.getElementCssClass('tr'),
                        tdClass: this.getElementCssClass('td'),
                        data: this.data,
                        headers: this.normalizedHeaders,
                        renderResponsive: this.renderResponsive,
                    });
                    if (tbody) {
                        return tbody;
                    }
                }
                return createElement('tbody', {
                    class: this.getElementCssClass('tbody'),
                }, this.renderRows(createElement));
            },
            renderRows(createElement) {
                return this.data.map((row, rowIndex) => {
                    if (this.$scopedSlots.row) {
                        const tableRow = this.$scopedSlots.row({
                            rowIndex,
                            row,
                            trClass: this.getElementCssClass('tr'),
                            tdClass: this.getElementCssClass('td'),
                        });
                        if (tableRow) {
                            return tableRow;
                        }
                    }
                    return createElement('tr', {
                        class: this.getElementCssClass('tr'),
                    }, this.renderCols(createElement, row, rowIndex));
                });
            },
            renderCols(createElement, row, rowIndex) {
                const columns = this.getRowColumns(row);
                if (typeof columns === 'object') {
                    return Object.keys(columns).map((columnIndex) => {
                        const text = columns[columnIndex];
                        return this.renderCol(createElement, text, rowIndex, columnIndex);
                    });
                }
                return columns
                    .map((text, columnIndex) => this.renderCol(createElement, text, rowIndex, columnIndex));
            },
            renderCol(createElement, text, rowIndex, columnIndex) {
                if (this.$scopedSlots.column) {
                    const tableColumn = this.$scopedSlots.column({
                        rowIndex,
                        columnIndex,
                        text,
                        tdClass: this.getElementCssClass('td'),
                    });
                    if (tableColumn) {
                        return tableColumn;
                    }
                }
                return createElement('td', {
                    class: this.getElementCssClass('td'),
                }, text);
            },
            getRowColumns(row) {
                if (!this.headersValues.length) {
                    return row;
                }
                if (typeof row === 'object') {
                    return pick__default['default'](row, this.headersValues);
                }
                return {};
            },
        },
    });

    const English = {
        weekdays: {
            shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            longhand: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
        },
        months: {
            shorthand: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            longhand: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 0,
        ordinal: (nth) => {
            const s = nth % 100;
            if (s > 3 && s < 21)
                return 'th';
            switch (s % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        },
        rangeSeparator: ' to ',
        weekAbbreviation: 'Wk',
        amPM: ['AM', 'PM'],
        yearAriaLabel: 'Year',
        monthAriaLabel: 'Month',
        hourAriaLabel: 'Hour',
        minuteAriaLabel: 'Minute',
        time24hr: false,
    };

    const pad = (number, length = 2) => `000${number}`.slice(length * -1);
    const int = (bool) => (bool === true ? 1 : 0);

    // Credits to https://github.com/flatpickr/flatpickr/blob/master/src/utils/formatting.ts
    const doNothing = () => undefined;
    const monthToStr = (monthNumber, shorthand, locale) => locale.months[shorthand ? 'shorthand' : 'longhand'][monthNumber];
    const revFormat = {
        D: doNothing,
        F(dateObj, monthName, locale) {
            dateObj.setMonth(locale.months.longhand.indexOf(monthName));
        },
        G: (dateObj, hour) => {
            dateObj.setHours(parseFloat(hour));
        },
        H: (dateObj, hour) => {
            dateObj.setHours(parseFloat(hour));
        },
        J: (dateObj, day) => {
            dateObj.setDate(parseFloat(day));
        },
        K: (dateObj, amPM, locale) => {
            dateObj.setHours((dateObj.getHours() % 12)
                + 12 * int(new RegExp(locale.amPM[1], 'i').test(amPM)));
        },
        M(dateObj, shortMonth, locale) {
            dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
        },
        S: (dateObj, seconds) => {
            dateObj.setSeconds(parseFloat(seconds));
        },
        U: (_, unixSeconds) => new Date(parseFloat(unixSeconds) * 1000),
        W(dateObj, weekNum, locale) {
            const weekNumber = parseInt(weekNum, 10);
            const date = new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
            date.setDate(date.getDate() - date.getDay() + locale.firstDayOfWeek);
            return date;
        },
        Y: (dateObj, year) => {
            dateObj.setFullYear(parseFloat(year));
        },
        Z: (_, ISODate) => new Date(ISODate),
        d: (dateObj, day) => {
            dateObj.setDate(parseFloat(day));
        },
        h: (dateObj, hour) => {
            dateObj.setHours(parseFloat(hour));
        },
        i: (dateObj, minutes) => {
            dateObj.setMinutes(parseFloat(minutes));
        },
        j: (dateObj, day) => {
            dateObj.setDate(parseFloat(day));
        },
        l: doNothing,
        m: (dateObj, month) => {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        n: (dateObj, month) => {
            dateObj.setMonth(parseFloat(month) - 1);
        },
        s: (dateObj, seconds) => {
            dateObj.setSeconds(parseFloat(seconds));
        },
        u: (_, unixMillSeconds) => new Date(parseFloat(unixMillSeconds)),
        w: doNothing,
        y: (dateObj, year) => {
            dateObj.setFullYear(2000 + parseFloat(year));
        },
    };
    const tokenRegex = {
        D: '(\\w+)',
        F: '(\\w+)',
        G: '(\\d\\d|\\d)',
        H: '(\\d\\d|\\d)',
        J: '(\\d\\d|\\d)\\w+',
        K: '',
        M: '(\\w+)',
        S: '(\\d\\d|\\d)',
        U: '(.+)',
        W: '(\\d\\d|\\d)',
        Y: '(\\d{4})',
        Z: '(.+)',
        d: '(\\d\\d|\\d)',
        h: '(\\d\\d|\\d)',
        i: '(\\d\\d|\\d)',
        j: '(\\d\\d|\\d)',
        l: '(\\w+)',
        m: '(\\d\\d|\\d)',
        n: '(\\d\\d|\\d)',
        s: '(\\d\\d|\\d)',
        u: '(.+)',
        w: '(\\d\\d|\\d)',
        y: '(\\d{2})',
    };
    const formats = {
        // get the date in UTC
        Z: (date) => date.toISOString(),
        // weekday name, short, e.g. Thu
        D(date, locale) {
            return locale.weekdays.shorthand[formats.w(date, locale)];
        },
        // full month name e.g. January
        F(date, locale) {
            return monthToStr(formats.n(date, locale) - 1, false, locale);
        },
        // padded hour 1-12
        G(date, locale) {
            return pad(formats.h(date, locale));
        },
        // hours with leading zero e.g. 03
        H: (date) => pad(date.getHours()),
        // day (1-30) with ordinal suffix e.g. 1st, 2nd
        J(date, locale) {
            return locale.ordinal !== undefined
                ? date.getDate() + locale.ordinal(date.getDate())
                : date.getDate();
        },
        // AM/PM
        K: (date, locale) => locale.amPM[int(date.getHours() > 11)],
        // shorthand month e.g. Jan, Sep, Oct, etc
        M(date, locale) {
            return monthToStr(date.getMonth(), true, locale);
        },
        // seconds 00-59
        S: (date) => pad(date.getSeconds()),
        // unix timestamp
        U: (date) => date.getTime() / 1000,
        W(givenDate) {
            // return options.getWeek(date);
            const date = new Date(givenDate.getTime());
            date.setHours(0, 0, 0, 0);
            // Thursday in current week decides the year.
            date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
            // January 4 is always in week 1.
            const week1 = new Date(date.getFullYear(), 0, 4);
            // Adjust to Thursday in week 1 and count number of weeks from date to week1.
            return (1
                + Math.round(((date.getTime() - week1.getTime()) / 86400000
                    - 3
                    + ((week1.getDay() + 6) % 7))
                    / 7));
        },
        // full year e.g. 2016, padded (0001-9999)
        Y: (date) => pad(date.getFullYear(), 4),
        // day in month, padded (01-30)
        d: (date) => pad(date.getDate()),
        // hour from 1-12 (am/pm)
        h: (date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),
        // minutes, padded with leading zero e.g. 09
        i: (date) => pad(date.getMinutes()),
        // day in month (1-30)
        j: (date) => date.getDate(),
        // weekday name, full, e.g. Thursday
        l(date, locale) {
            return locale.weekdays.longhand[date.getDay()];
        },
        // padded month number (01-12)
        m: (date) => pad(date.getMonth() + 1),
        // the month number (1-12)
        n: (date) => date.getMonth() + 1,
        // seconds 0-59
        s: (date) => date.getSeconds(),
        // Unix Milliseconds
        u: (date) => date.getTime(),
        // number of the day of the week
        w: (date) => date.getDay(),
        // last two digits of year e.g. 16 for 2016
        y: (date) => String(date.getFullYear()).substring(2),
    };

    const formatDate = (dateObj, format, customLocale) => {
        if (!dateObj) {
            return '';
        }
        const locale = customLocale || English;
        return format
            .split('')
            .map((char, i, arr) => {
            if (formats[char] && arr[i - 1] !== '\\') {
                return formats[char](dateObj, locale);
            }
            if (char !== '\\') {
                return char;
            }
            return '';
        })
            .join('');
    };
    const parseDate = (date, format = 'Y-m-d H:i:S', timeless, customLocale) => {
        if (date !== 0 && !date) {
            return undefined;
        }
        const locale = customLocale || English;
        const localeTokenRegex = Object.assign({}, tokenRegex);
        localeTokenRegex.K = `(${locale.amPM[0]}|${locale.amPM[1]}|${locale.amPM[0].toLowerCase()}|${locale.amPM[1].toLowerCase()})`;
        let parsedDate;
        const dateOrig = date;
        if (date instanceof Date) {
            parsedDate = new Date(date.getTime());
        }
        else if (typeof date !== 'string'
            && date.toFixed !== undefined // timestamp
        ) {
            // create a copy
            parsedDate = new Date(date);
        }
        else if (typeof date === 'string') {
            // if (!userConfig.dateFormat && (userConfig.enableTime || timeMode)) {
            //   const defaultDateFormat =
            //     flatpickr.defaultConfig.dateFormat || defaultOptions.dateFormat;
            //   formats.dateFormat =
            //     userConfig.noCalendar || timeMode
            //       ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
            //       : defaultDateFormat + " H:i" + (userConfig.enableSeconds ? ":S" : "");
            // }
            const datestr = String(date).trim();
            if (datestr === 'today') {
                parsedDate = new Date();
                // eslint-disable-next-line no-param-reassign
                timeless = true;
            }
            else if (/Z$/.test(datestr)
                || /GMT$/.test(datestr) // datestrings w/ timezone
            ) {
                parsedDate = new Date(date);
            }
            else {
                parsedDate = new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
                // parsedDate = !config || !config.noCalendar
                //   ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                //   : (new Date(new Date().setHours(0, 0, 0, 0)) as Date);
                let matched;
                const ops = [];
                for (let i = 0, matchIndex = 0, regexStr = ''; i < format.length; i += 1) {
                    const token2 = format[i];
                    const isBackSlash = token2 === '\\';
                    const escaped = format[i - 1] === '\\' || isBackSlash;
                    if (localeTokenRegex[token2] && !escaped) {
                        regexStr += localeTokenRegex[token2];
                        const match = new RegExp(regexStr).exec(date);
                        if (match) {
                            matched = true;
                            ops[token2 !== 'Y' ? 'push' : 'unshift']({
                                fn: revFormat[token2],
                                val: match[matchIndex += 1],
                            });
                        }
                    }
                    else if (!isBackSlash) {
                        regexStr += '.'; // don't really care
                    }
                    // eslint-disable-next-line no-loop-func
                    ops.forEach((op) => {
                        const { fn } = op;
                        const { val } = op;
                        parsedDate = fn(parsedDate, String(val), locale) || parsedDate;
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        /* istanbul ignore next */
        // eslint-disable-next-line no-restricted-globals
        if (!(parsedDate instanceof Date && !isNaN(parsedDate.getTime()))) {
            throw new Error(`Invalid date provided: ${dateOrig}`);
        }
        if (timeless === true) {
            parsedDate.setHours(0, 0, 0, 0);
        }
        return parsedDate;
    };
    /**
     * Compute the difference in dates, measured in ms
     */
    function compareDates(date1, date2, timeless = true) {
        if (timeless !== false) {
            return (new Date(date1.getTime()).setHours(0, 0, 0, 0)
                - new Date(date2.getTime()).setHours(0, 0, 0, 0));
        }
        return date1.getTime() - date2.getTime();
    }
    const extractLocaleFromProps = (localeName, locales, defaultLocale) => {
        const availableLocales = Object.keys(locales);
        const find = availableLocales.find((l) => l === localeName);
        const locale = find && locales[find] ? locales[find] : defaultLocale;
        return merge__default['default'](cloneDeep__default['default'](English), locale);
    };
    const buildDateParser = (locale, customDateParser) => (date, format = 'Y-m-d H:i:S', timeless) => {
        if (customDateParser) {
            return customDateParser(date, format, timeless, locale);
        }
        return parseDate(date, format, timeless, locale);
    };
    const buildDateFormatter = (locale, customDateFormatter) => (date, format = 'Y-m-d H:i:S') => {
        if (customDateFormatter) {
            return customDateFormatter(date, format, locale);
        }
        return formatDate(date, format, locale);
    };
    /**
     * it two dates are in the same month
     */
    function isSameMonth(date1, date2) {
        return (!!date1)
            && (!!date2)
            && date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth();
    }
    /**
     * it two dates are in the same day
     */
    function isSameDay(date1, date2) {
        return isSameMonth(date1, date2) && (date1 === null || date1 === void 0 ? void 0 : date1.getDate()) === (date2 === null || date2 === void 0 ? void 0 : date2.getDate());
    }
    function dayIsPartOfTheConditions(day, condition, dateParser, dateFormat) {
        if (!day) {
            return false;
        }
        if (typeof condition === 'function') {
            return condition(day);
        }
        if (typeof condition === 'string' || condition instanceof String) {
            const disabledDate = dateParser(condition, dateFormat);
            return isSameDay(disabledDate, day);
        }
        if (condition instanceof Date) {
            return isSameDay(condition, day);
        }
        if (Array.isArray(condition)) {
            return condition.some((c) => dayIsPartOfTheConditions(day, c, dateParser, dateFormat));
        }
        return false;
    }
    function dateIsOutOfRange(date, min, max, dateParser = null, dateFormat = null) {
        let minDate;
        if (typeof min === 'string' || min instanceof String) {
            if (!dateParser) {
                throw new Error('strings needs a date parser');
            }
            if (!dateFormat) {
                throw new Error('strings needs a date format');
            }
            minDate = dateParser(min, dateFormat);
        }
        else {
            minDate = min;
        }
        let maxDate;
        if (typeof max === 'string' || max instanceof String) {
            if (!dateParser) {
                throw new Error('strings needs a date parser');
            }
            if (!dateFormat) {
                throw new Error('strings needs a date format');
            }
            maxDate = dateParser(max, dateFormat);
        }
        else {
            maxDate = max;
        }
        const time = date.getTime();
        if (minDate && maxDate) {
            return time < minDate.getTime() || time > maxDate.getTime();
        }
        if (minDate) {
            return time < minDate.getTime();
        }
        if (maxDate) {
            return time > maxDate.getTime();
        }
        return false;
    }
    function addDays(date, amount = 1) {
        return new Date(date.valueOf() + (amount * 24 * 60 * 60 * 1000));
    }
    function addMonths(date, amount = 1) {
        let newDate = new Date(date.valueOf());
        newDate.setMonth(date.getMonth() + amount);
        // Means the current day has less days so the extra month is
        // in the following month
        if (newDate.getDate() !== date.getDate()) {
            // Assign the last day of previous month
            newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
        }
        return newDate;
    }
    function addYears(date, amount = 1) {
        let newDate = new Date(date.valueOf());
        newDate.setFullYear(date.getFullYear() + amount);
        // Means the current day has less days so the extra month is
        // in the following month
        if (newDate.getDate() !== date.getDate()) {
            // Assign the last day of previous month
            newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
        }
        return newDate;
    }
    function lastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    const getYearsRange = (date, yearsPerView) => {
        const currentYear = date.getFullYear();
        const from = currentYear - Math.floor(currentYear % yearsPerView);
        const to = from + yearsPerView - 1;
        return [from, to];
    };
    var CalendarView;
    (function (CalendarView) {
        CalendarView["Day"] = "day";
        CalendarView["Month"] = "month";
        CalendarView["Year"] = "year";
    })(CalendarView || (CalendarView = {}));
    const TDatepickerNavigator = Vue__default['default'].extend({
        name: 'TDatepickerNavigator',
        props: {
            getElementCssClass: {
                type: Function,
                required: true,
            },
            value: {
                type: Date,
                default: null,
            },
            showSelector: {
                type: Boolean,
                default: true,
            },
            currentView: {
                type: String,
                default: CalendarView.Day,
                validator(value) {
                    return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
                },
            },
            parse: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            yearsPerView: {
                type: Number,
                required: true,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            locale: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                localValue: new Date(this.value.valueOf()),
            };
        },
        computed: {
            isDayView() {
                return this.currentView === CalendarView.Day;
            },
            isYearView() {
                return this.currentView === CalendarView.Year;
            },
            isMonthView() {
                return this.currentView === CalendarView.Month;
            },
            nextDate() {
                return this.getNextDate();
            },
            prevDate() {
                return this.getPrevDate();
            },
            prevButtonIsDisabled() {
                return !this.prevDate;
            },
            nextButtonIsDisabled() {
                return !this.nextDate;
            },
            nextButtonAriaLabel() {
                if (this.isDayView) {
                    return `Next ${this.locale.yearAriaLabel}`;
                }
                return `Next ${this.locale.yearAriaLabel}`;
            },
            prevButtonAriaLabel() {
                if (this.isDayView) {
                    return `Prev ${this.locale.yearAriaLabel}`;
                }
                return `Prev ${this.locale.yearAriaLabel}`;
            },
        },
        watch: {
            value(value) {
                this.localValue = new Date(value.valueOf());
            },
        },
        methods: {
            getNextDate() {
                let nextDate;
                if (this.currentView === CalendarView.Day) {
                    nextDate = this.getNextMonth();
                }
                else if (this.currentView === CalendarView.Month) {
                    nextDate = this.getNextYear();
                }
                else if (this.currentView === CalendarView.Year) {
                    nextDate = this.getNextYearGroup();
                }
                return nextDate;
            },
            getPrevDate() {
                let prevDate;
                if (this.currentView === CalendarView.Day) {
                    prevDate = this.getPrevMonth();
                }
                else if (this.currentView === CalendarView.Month) {
                    prevDate = this.getPrevYear();
                }
                else if (this.currentView === CalendarView.Year) {
                    prevDate = this.getPrevYearGroup();
                }
                return prevDate;
            },
            inputHandler(newDate) {
                this.$emit('input', newDate);
            },
            clickHandler() {
                if (this.currentView === CalendarView.Day) {
                    this.$emit('update-view', CalendarView.Month);
                }
                else if (this.currentView === CalendarView.Month) {
                    this.$emit('update-view', CalendarView.Year);
                }
                else if (this.currentView === CalendarView.Year) {
                    this.$emit('update-view', CalendarView.Day);
                }
            },
            next() {
                if (this.nextDate) {
                    this.inputHandler(this.nextDate);
                }
            },
            prev() {
                if (this.prevDate) {
                    this.inputHandler(this.prevDate);
                }
            },
            getPrevMonth() {
                const prevMonth = addMonths(this.localValue, -1);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(prevMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return prevMonth;
                }
                let day = prevMonth.getDate();
                let dateToTry = prevMonth;
                let validDate;
                day = prevMonth.getDate();
                const lastDay = lastDayOfMonth(prevMonth).getDate();
                do {
                    dateToTry = addDays(dateToTry, 1);
                    day += 1;
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (day <= lastDay && !validDate);
                if (!validDate) {
                    day = prevMonth.getDate();
                    do {
                        dateToTry = addDays(dateToTry, -1);
                        day -= 1;
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (day >= 1 && !validDate);
                }
                return validDate;
            },
            getNextMonth() {
                const nextMonth = addMonths(this.localValue, 1);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(nextMonth, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return nextMonth;
                }
                let day = nextMonth.getDate();
                let dateToTry = nextMonth;
                let validDate;
                do {
                    dateToTry = addDays(dateToTry, -1);
                    day -= 1;
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (day >= 1 && !validDate);
                if (!validDate) {
                    day = nextMonth.getDate();
                    const lastDay = lastDayOfMonth(nextMonth).getDate();
                    do {
                        dateToTry = addDays(dateToTry, 1);
                        day += 1;
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (day <= lastDay && !validDate);
                }
                return validDate;
            },
            getPrevYear() {
                const prevYear = addYears(this.localValue, -1);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return prevYear;
                }
                let validDate;
                let dateToTry = prevYear;
                const year = prevYear.getFullYear();
                do {
                    dateToTry = addDays(dateToTry, 1);
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (dateToTry.getFullYear() === year && !validDate);
                if (!validDate) {
                    do {
                        dateToTry = addDays(dateToTry, -1);
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (dateToTry.getFullYear() === year && !validDate);
                }
                return validDate;
            },
            getNextYear() {
                const nextYear = addYears(this.localValue, 1);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return nextYear;
                }
                let validDate;
                let dateToTry = nextYear;
                const year = nextYear.getFullYear();
                do {
                    dateToTry = addDays(dateToTry, -1);
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (dateToTry.getFullYear() === year && !validDate);
                if (!validDate) {
                    do {
                        dateToTry = addDays(dateToTry, 1);
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (dateToTry.getFullYear() === year && !validDate);
                }
                return validDate;
            },
            getPrevYearGroup() {
                const prevYear = addYears(this.localValue, -this.yearsPerView);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(prevYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return prevYear;
                }
                let validDate;
                let dateToTry = prevYear;
                const year = prevYear.getFullYear();
                do {
                    dateToTry = addDays(dateToTry, this.yearsPerView);
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (dateToTry.getFullYear() === year && !validDate);
                if (!validDate) {
                    do {
                        dateToTry = addDays(dateToTry, -this.yearsPerView);
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (dateToTry.getFullYear() === year && !validDate);
                }
                return validDate;
            },
            getNextYearGroup() {
                const nextYear = addYears(this.localValue, this.yearsPerView);
                const dateParser = this.parse;
                if (!dateIsOutOfRange(nextYear, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                    return nextYear;
                }
                let validDate;
                let dateToTry = nextYear;
                const year = nextYear.getFullYear();
                do {
                    dateToTry = addDays(dateToTry, -this.yearsPerView);
                    if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                        validDate = dateToTry;
                    }
                } while (dateToTry.getFullYear() === year && !validDate);
                if (!validDate) {
                    do {
                        dateToTry = addDays(dateToTry, this.yearsPerView);
                        if (!dateIsOutOfRange(dateToTry, this.minDate, this.maxDate, dateParser, this.dateFormat)) {
                            validDate = dateToTry;
                        }
                    } while (dateToTry.getFullYear() === year && !validDate);
                }
                return validDate;
            },
        },
        render(createElement) {
            const subElements = [];
            if (this.showSelector) {
                const buttonElements = [];
                if (this.currentView === CalendarView.Day) {
                    buttonElements.push(createElement('span', {
                        class: this.getElementCssClass('navigatorViewButtonMonthName'),
                    }, this.formatNative(this.localValue, 'F')));
                }
                if (this.currentView === CalendarView.Month || this.currentView === CalendarView.Day) {
                    buttonElements.push(createElement('span', {
                        class: this.getElementCssClass('navigatorViewButtonYear'),
                    }, this.formatNative(this.localValue, 'Y')));
                }
                if (this.currentView !== CalendarView.Year) {
                    buttonElements.push(createElement('svg', {
                        attrs: {
                            fill: 'currentColor',
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 20 20',
                        },
                        class: this.getElementCssClass('navigatorViewButtonIcon'),
                    }, [
                        createElement('polygon', {
                            attrs: {
                                points: '12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068',
                            },
                        }),
                    ]));
                }
                else {
                    buttonElements.push(createElement('svg', {
                        attrs: {
                            fill: 'currentColor',
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 20 20',
                        },
                        class: this.getElementCssClass('navigatorViewButtonBackIcon'),
                    }, [
                        createElement('polygon', {
                            attrs: {
                                points: '7.05025253 9.29289322 6.34314575 10 12 15.6568542 13.4142136 14.2426407 9.17157288 10 13.4142136 5.75735931 12 4.34314575',
                            },
                        }),
                    ]));
                    buttonElements.push(createElement('span', {
                        class: this.getElementCssClass('navigatorViewButtonYearRange'),
                    }, getYearsRange(this.localValue, this.yearsPerView).join(' - ')));
                }
                subElements.push(createElement('button', {
                    attrs: {
                        type: 'button',
                        class: this.getElementCssClass('navigatorViewButton'),
                        tabindex: -1,
                    },
                    on: {
                        click: this.clickHandler,
                    },
                }, buttonElements));
            }
            else {
                subElements.push(createElement('span', {
                    attrs: {
                        class: this.getElementCssClass('navigatorLabel'),
                    },
                }, [
                    createElement('span', {
                        class: this.getElementCssClass('navigatorLabelMonth'),
                    }, this.formatNative(this.localValue, 'F')),
                    createElement('span', {
                        class: this.getElementCssClass('navigatorLabelYear'),
                    }, this.formatNative(this.localValue, 'Y')),
                ]));
            }
            if (this.showSelector) {
                subElements.push(createElement('button', {
                    ref: 'prev',
                    attrs: {
                        'aria-label': this.prevButtonAriaLabel,
                        type: 'button',
                        class: this.getElementCssClass('navigatorPrevButton'),
                        tabindex: -1,
                        disabled: this.prevButtonIsDisabled ? true : undefined,
                    },
                    on: {
                        click: this.prev,
                    },
                }, [
                    createElement('svg', {
                        attrs: {
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                        },
                        class: this.getElementCssClass('navigatorPrevButtonIcon'),
                    }, [
                        createElement('path', {
                            attrs: {
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                'stroke-width': 2,
                                d: 'M15 19l-7-7 7-7',
                            },
                        }),
                    ]),
                ]));
                subElements.push(createElement('button', {
                    ref: 'next',
                    attrs: {
                        'aria-label': this.nextButtonAriaLabel,
                        type: 'button',
                        class: this.getElementCssClass('navigatorNextButton'),
                        tabindex: -1,
                        disabled: this.nextButtonIsDisabled ? true : undefined,
                    },
                    on: {
                        click: this.next,
                    },
                }, [
                    createElement('svg', {
                        attrs: {
                            fill: 'none',
                            viewBox: '0 0 24 24',
                            stroke: 'currentColor',
                        },
                        class: this.getElementCssClass('navigatorNextButtonIcon'),
                    }, [
                        createElement('path', {
                            attrs: {
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                'stroke-width': 2,
                                d: 'M9 5l7 7-7 7',
                            },
                        }),
                    ]),
                ]));
            }
            return createElement('div', {
                class: this.getElementCssClass('navigator'),
            }, subElements);
        },
    });

    const TDatepickerTrigger = Vue__default['default'].extend({
        name: 'TDatepickerTrigger',
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
            inputName: {
                type: String,
                default: undefined,
            },
            placeholder: {
                type: String,
                default: undefined,
            },
            show: {
                type: Function,
                default: undefined,
            },
            hideIfFocusOutside: {
                type: Function,
                default: undefined,
            },
            conjunction: {
                type: String,
                required: true,
            },
            multiple: {
                type: Boolean,
                required: true,
            },
            range: {
                type: Boolean,
                required: true,
            },
            clearable: {
                type: Boolean,
                required: true,
            },
            locale: {
                type: Object,
                required: true,
            },
            userFormatedDate: {
                type: [String, Array],
                required: true,
            },
            formatedDate: {
                type: [String, Array],
                required: true,
            },
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
        },
        computed: {
            hasValue() {
                if (Array.isArray(this.value)) {
                    return this.value.length > 0;
                }
                return !!this.value;
            },
        },
        methods: {
            clearButtonClickHandler(e) {
                this.$emit('clear', e);
            },
        },
        render(createElement) {
            const formattedDate = this.formatedDate;
            let formText = '';
            if (Array.isArray(this.userFormatedDate)) {
                const conjunction = this.range ? this.locale.rangeSeparator : this.conjunction;
                formText = this.userFormatedDate.join(conjunction);
            }
            else {
                formText = this.userFormatedDate;
            }
            const subElements = [
                createElement('input', {
                    ref: 'input',
                    class: this.getElementCssClass('input'),
                    attrs: {
                        readonly: true,
                        id: this.id,
                        name: this.name,
                        disabled: this.disabled,
                        autocomplete: 'off',
                        autofocus: this.autofocus,
                        type: 'text',
                        required: this.required,
                        placeholder: this.placeholder,
                        tabindex: this.tabindex,
                        value: formText,
                    },
                    on: {
                        click: (e) => {
                            if (this.show) {
                                this.show();
                            }
                            this.$emit('click', e);
                        },
                        input: (e) => {
                            this.$emit('input', e);
                        },
                        keydown: (e) => {
                            this.$emit('keydown', e);
                        },
                        blur: (e) => {
                            if (this.hideIfFocusOutside) {
                                this.hideIfFocusOutside(e);
                            }
                            this.$emit('blur', e);
                        },
                        focus: (e) => {
                            if (this.show) {
                                this.show();
                            }
                            this.$emit('focus', e);
                        },
                    },
                }),
            ];
            if (this.clearable && this.hasValue) {
                const clearButtonSlot = this.$scopedSlots.clearButton
                    ? this.$scopedSlots.clearButton({
                        className: this.getElementCssClass('clearButtonIcon'),
                        formatedDate: this.formatedDate,
                        userFormatedDate: this.userFormatedDate,
                        value: this.value,
                        activeDate: this.activeDate,
                    }) : [
                    createElement('svg', {
                        attrs: {
                            fill: 'currentColor',
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 20 20',
                        },
                        class: this.getElementCssClass('clearButtonIcon'),
                    }, [
                        createElement('polygon', {
                            attrs: {
                                points: '10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644',
                            },
                        }),
                    ]),
                ];
                subElements.push(createElement('button', {
                    ref: 'clearButton',
                    class: this.getElementCssClass('clearButton'),
                    attrs: {
                        type: 'button',
                        tabindex: -1,
                    },
                    on: {
                        click: this.clearButtonClickHandler,
                    },
                }, clearButtonSlot));
            }
            if (this.multiple) {
                const dates = Array.isArray(formattedDate) ? formattedDate : [formattedDate];
                const hiddenInputs = dates.map((date) => createElement('input', {
                    attrs: {
                        type: 'hidden',
                        value: date,
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        required: this.required,
                    },
                }));
                subElements.push(...hiddenInputs);
            }
            else {
                subElements.push(createElement('input', {
                    attrs: {
                        type: 'hidden',
                        value: Array.isArray(formattedDate) ? formattedDate.join(this.conjunction) : formattedDate,
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        required: this.required,
                    },
                }));
            }
            return createElement('div', {
                class: this.getElementCssClass('inputWrapper'),
            }, subElements);
        },
    });

    const TDatepickerViewsViewCalendarDaysDay = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewCalendarDaysDay',
        props: {
            day: {
                type: Date,
                required: true,
            },
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            activeMonth: {
                type: Date,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            parse: {
                type: Function,
                required: true,
            },
            format: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            userFormat: {
                type: String,
                required: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            range: {
                type: Boolean,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
                localActiveMonth: new Date(this.activeMonth.valueOf()),
            };
        },
        computed: {
            isSelected() {
                const d1 = this.getDay();
                const d2 = this.value;
                if (d2 instanceof Date) {
                    return isSameDay(d1, d2);
                }
                if (Array.isArray(d2)) {
                    return d2.some((d) => isSameDay(d, d1));
                }
                return false;
            },
            isActive() {
                const d1 = this.getDay();
                const d2 = this.localActiveDate;
                return isSameDay(d1, d2);
            },
            isToday() {
                const d1 = this.getDay();
                const d2 = new Date();
                return isSameDay(d1, d2);
            },
            isDisabled() {
                const day = this.getDay();
                const disabledDates = this.disabledDates;
                const dateParser = this.parse;
                return dateIsOutOfRange(day, this.minDate, this.maxDate, dateParser, this.dateFormat)
                    || dayIsPartOfTheConditions(day, disabledDates, dateParser, this.dateFormat);
            },
            isHighlighted() {
                const day = this.getDay();
                const highlightDates = this.highlightDates;
                const dateParser = this.parse;
                return dayIsPartOfTheConditions(day, highlightDates, dateParser, this.dateFormat);
            },
            isForAnotherMonth() {
                const d1 = this.localActiveMonth;
                const d2 = this.getDay();
                return d1.getFullYear() !== d2.getFullYear()
                    || d1.getMonth() !== d2.getMonth();
            },
            isInRange() {
                if (!this.range || !Array.isArray(this.value)) {
                    return false;
                }
                const [from, to] = this.value;
                if (from && to) {
                    return !dateIsOutOfRange(this.getDay(), addDays(from, 1), addDays(to, -1));
                }
                return false;
            },
            isFirstDayOfRange() {
                if (!this.range || !Array.isArray(this.value)) {
                    return false;
                }
                const [from] = this.value;
                return from && isSameDay(from, this.getDay());
            },
            isLastDayOfRange() {
                if (!this.range || !Array.isArray(this.value)) {
                    return false;
                }
                const [, to] = this.value;
                return to && isSameDay(to, this.getDay());
            },
            dayFormatted() {
                return this.formatNative(this.getDay(), 'j');
            },
            ariaLabel() {
                return this.format(this.getDay(), this.userFormat);
            },
            dateFormatted() {
                return this.format(this.getDay(), 'Y-m-d');
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
            activeMonth(activeMonth) {
                this.localActiveMonth = new Date(activeMonth.valueOf());
            },
        },
        methods: {
            getClass() {
                if (this.isForAnotherMonth) {
                    return this.getElementCssClass('otherMonthDay');
                }
                if (this.isFirstDayOfRange) {
                    return this.getElementCssClass('inRangeFirstDay');
                }
                if (this.isLastDayOfRange) {
                    return this.getElementCssClass('inRangeLastDay');
                }
                if (this.isInRange) {
                    return this.getElementCssClass('inRangeDay');
                }
                if (this.isSelected) {
                    return this.getElementCssClass('selectedDay');
                }
                if (this.isActive && this.showActiveDate) {
                    return this.getElementCssClass('activeDay');
                }
                if (this.isHighlighted) {
                    return this.getElementCssClass('highlightedDay');
                }
                if (this.isToday) {
                    return this.getElementCssClass('today');
                }
                return this.getElementCssClass('day');
            },
            getDay() {
                return this.day;
            },
        },
        render(createElement) {
            if (this.isForAnotherMonth && !this.showDaysForOtherMonth) {
                return createElement('span', {
                    class: this.getElementCssClass('emptyDay'),
                }, '');
            }
            const daySlot = this.$scopedSlots.day
                ? this.$scopedSlots.day({
                    dayFormatted: this.dayFormatted,
                    isForAnotherMonth: this.isForAnotherMonth,
                    isFirstDayOfRange: this.isFirstDayOfRange,
                    isLastDayOfRange: this.isLastDayOfRange,
                    isInRange: this.isInRange,
                    isSelected: this.isSelected,
                    isActive: this.isActive,
                    isHighlighted: this.isHighlighted,
                    isToday: this.isToday,
                    day: this.getDay(),
                    activeDate: this.activeDate,
                    value: this.value,
                }) : this.dayFormatted;
            return createElement('button', {
                class: this.getClass(),
                attrs: {
                    'aria-label': this.ariaLabel,
                    'aria-current': this.isToday ? 'date' : undefined,
                    'data-date': this.dateFormatted,
                    type: 'button',
                    tabindex: -1,
                    disabled: this.isDisabled ? true : undefined,
                },
                on: {
                    click: (e) => this.$emit('click', e),
                },
            }, daySlot);
        },
    });

    const TDatepickerViewsViewCalendarDays = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewCalendarDays',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            activeMonth: {
                type: Date,
                required: true,
            },
            weekStart: {
                type: Number,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            parse: {
                type: Function,
                required: true,
            },
            format: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            userFormat: {
                type: String,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            range: {
                type: Boolean,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
                localActiveMonth: new Date(this.activeMonth.valueOf()),
            };
        },
        computed: {
            firstDayOfMonth() {
                return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth(), 1);
            },
            lastDayOfMonth() {
                return lastDayOfMonth(this.localActiveMonth);
            },
            firstDayOfPrevMonth() {
                return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth() - 1, 1);
            },
            lastDayOfPrevMonth() {
                return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth(), 0);
            },
            firstDayOfNextMonth() {
                return new Date(this.localActiveMonth.getFullYear(), this.localActiveMonth.getMonth() + 1, 1);
            },
            monthDays() {
                return Array
                    .from({ length: this.lastDayOfMonth.getDate() }, (_x, i) => i + 1)
                    .map((day) => this.getDay(this.localActiveMonth, day));
            },
            prevMonthDays() {
                let prevMonthTotalDays = this.firstDayOfMonth.getDay() - this.weekStart;
                if (prevMonthTotalDays < 0) {
                    prevMonthTotalDays = 7 + prevMonthTotalDays;
                }
                return Array.from({ length: prevMonthTotalDays }, (_x, i) => this.lastDayOfPrevMonth.getDate() - i)
                    .reverse()
                    .map((day) => this.getDay(this.firstDayOfPrevMonth, day));
            },
            nextMonthDays() {
                const nextMonthTotalDays = 7 - (this.monthDays.concat(this.prevMonthDays).length % 7);
                if (nextMonthTotalDays === 7) {
                    return [];
                }
                return Array.from({ length: nextMonthTotalDays }, (_x, i) => i + 1)
                    .map((day) => this.getDay(this.firstDayOfNextMonth, day));
            },
            days() {
                const { prevMonthDays } = this;
                const { monthDays } = this;
                const { nextMonthDays } = this;
                return prevMonthDays.concat(monthDays, nextMonthDays);
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
            activeMonth(activeMonth) {
                this.localActiveMonth = new Date(activeMonth.valueOf());
            },
        },
        methods: {
            getDay(date, day) {
                return new Date(date.getFullYear(), date.getMonth(), day);
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('calendarDaysWrapper'),
            }, this.days.map((day) => createElement('span', {
                class: this.getElementCssClass('calendarDaysDayWrapper'),
            }, [
                createElement(TDatepickerViewsViewCalendarDaysDay, {
                    props: {
                        day,
                        value: this.value,
                        activeDate: this.localActiveDate,
                        activeMonth: this.localActiveMonth,
                        getElementCssClass: this.getElementCssClass,
                        parse: this.parse,
                        format: this.format,
                        formatNative: this.formatNative,
                        dateFormat: this.dateFormat,
                        userFormat: this.userFormat,
                        showDaysForOtherMonth: this.showDaysForOtherMonth,
                        showActiveDate: this.showActiveDate,
                        disabledDates: this.disabledDates,
                        highlightDates: this.highlightDates,
                        minDate: this.minDate,
                        maxDate: this.maxDate,
                        range: this.range,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        click: () => this.$emit('input', day),
                    },
                })
            ])));
        },
    });

    const TDatepickerViewsViewCalendarHeaders = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewCalendarHeaders',
        props: {
            weekStart: {
                type: Number,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
        },
        computed: {
            weekDays() {
                return Array.from({ length: 7 }, (_x, i) => {
                    const weekDay = this.weekStart + i;
                    if (weekDay >= 7) {
                        return weekDay - 7;
                    }
                    return weekDay;
                }).map(this.getWeekDayName);
            },
        },
        methods: {
            getWeekDayName(weekDay) {
                const date = new Date();
                date.setDate((date.getDate() + (7 + weekDay - date.getDay())) % 7);
                return this.formatNative(date, 'D');
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('calendarHeaderWrapper'),
            }, this.weekDays.map((weekDayName) => createElement('span', {
                class: this.getElementCssClass('calendarHeaderWeekDay'),
            }, weekDayName)));
        },
    });

    const TDatepickerViewsViewCalendar = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewCalendar',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            activeMonth: {
                type: Date,
                required: true,
            },
            weekStart: {
                type: Number,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            parse: {
                type: Function,
                required: true,
            },
            format: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            userFormat: {
                type: String,
                required: true,
            },
            monthsPerView: {
                type: Number,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            range: {
                type: Boolean,
                required: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
                localActiveMonth: new Date(this.activeMonth.valueOf()),
            };
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
            activeMonth(activeMonth) {
                this.localActiveMonth = new Date(activeMonth.valueOf());
            },
        },
        methods: {
            inputHandler(date) {
                this.$emit('input', date);
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('calendarWrapper'),
            }, [
                createElement(TDatepickerViewsViewCalendarHeaders, {
                    props: {
                        weekStart: this.weekStart,
                        getElementCssClass: this.getElementCssClass,
                        formatNative: this.formatNative,
                    },
                }),
                createElement(TDatepickerViewsViewCalendarDays, {
                    ref: 'days',
                    props: {
                        value: this.value,
                        activeDate: this.localActiveDate,
                        activeMonth: this.localActiveMonth,
                        weekStart: this.weekStart,
                        getElementCssClass: this.getElementCssClass,
                        parse: this.parse,
                        format: this.format,
                        formatNative: this.formatNative,
                        userFormat: this.userFormat,
                        dateFormat: this.dateFormat,
                        showDaysForOtherMonth: this.monthsPerView > 1 ? false : this.showDaysForOtherMonth,
                        showActiveDate: this.showActiveDate,
                        disabledDates: this.disabledDates,
                        highlightDates: this.highlightDates,
                        minDate: this.minDate,
                        maxDate: this.maxDate,
                        range: this.range,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        input: this.inputHandler,
                    },
                }),
            ]);
        },
    });

    const TDatepickerViewsViewMonthsMonth = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewMonthsMonth',
        props: {
            month: {
                type: Date,
                required: true,
            },
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
        },
        computed: {
            isSelected() {
                const d1 = this.getMonth();
                const d2 = this.value;
                if (d2 instanceof Date) {
                    return isSameMonth(d1, d2);
                }
                if (Array.isArray(d2)) {
                    return d2.some((d) => isSameMonth(d, d1));
                }
                return false;
            },
            isActive() {
                const d1 = this.getMonth();
                const d2 = this.activeDate;
                return isSameMonth(d1, d2);
            },
            monthFormatted() {
                return this.formatNative(this.getMonth(), 'M');
            },
        },
        methods: {
            getClass() {
                if (this.isSelected) {
                    return this.getElementCssClass('selectedMonth');
                }
                if (this.isActive && this.showActiveDate) {
                    return this.getElementCssClass('activeMonth');
                }
                return this.getElementCssClass('month');
            },
            getMonth() {
                return this.month;
            },
        },
        render(createElement) {
            const monthSlot = this.$scopedSlots.month
                ? this.$scopedSlots.month({
                    monthFormatted: this.monthFormatted,
                    isSelected: this.isSelected,
                    isActive: this.isActive,
                    month: this.getMonth(),
                    activeDate: this.activeDate,
                    value: this.value,
                }) : this.monthFormatted;
            return createElement('button', {
                class: this.getClass(),
                attrs: {
                    'aria-label': this.formatNative(this.getMonth(), 'F, Y'),
                    'data-date': this.formatNative(this.getMonth(), 'Y-m'),
                    type: 'button',
                    tabindex: -1,
                },
                on: {
                    click: (e) => this.$emit('click', e),
                },
            }, monthSlot);
        },
    });

    const TDatepickerViewsViewMonths = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewMonths',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
            };
        },
        computed: {
            months() {
                return Array
                    .from({ length: 12 }, (_x, i) => i)
                    .map((monthNumber) => this.getMonth(monthNumber));
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
        },
        methods: {
            getMonth(monthNumber) {
                let newDate = new Date(this.localActiveDate.valueOf());
                newDate.setMonth(monthNumber);
                // Means the current day has less days so the extra month is
                // in the following month
                if (newDate.getDate() !== this.localActiveDate.getDate()) {
                    // Assign the last day of previous month
                    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
                }
                return newDate;
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('monthWrapper'),
            }, this.months.map((month) => createElement(TDatepickerViewsViewMonthsMonth, {
                props: {
                    month,
                    value: this.value,
                    activeDate: this.localActiveDate,
                    getElementCssClass: this.getElementCssClass,
                    showActiveDate: this.showActiveDate,
                    formatNative: this.formatNative,
                },
                scopedSlots: this.$scopedSlots,
                on: {
                    click: () => this.$emit('input', month),
                },
            })));
        },
    });

    const TDatepickerViewsViewYearsYear = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewYearsYear',
        props: {
            year: {
                type: Date,
                required: true,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            value: {
                type: [Date, Array],
                default: null,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
            };
        },
        computed: {
            isSelected() {
                const d1 = this.getYear();
                const d2 = this.value;
                if (d2 instanceof Date) {
                    return d1.getFullYear() === d2.getFullYear();
                }
                if (Array.isArray(d2)) {
                    return d2.some((d) => d.getFullYear() === d1.getFullYear());
                }
                return false;
            },
            isActive() {
                const d1 = this.getYear();
                const d2 = this.activeDate;
                return d2 && d1.getFullYear() === d2.getFullYear();
            },
            yearFormatted() {
                return this.formatNative(this.getYear(), 'Y');
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
        },
        methods: {
            getClass() {
                if (this.isSelected) {
                    return this.getElementCssClass('selectedYear');
                }
                if (this.isActive && this.showActiveDate) {
                    return this.getElementCssClass('activeYear');
                }
                return this.getElementCssClass('year');
            },
            getYear() {
                return this.year;
            },
        },
        render(createElement) {
            const yearSlot = this.$scopedSlots.year
                ? this.$scopedSlots.year({
                    yearFormatted: this.yearFormatted,
                    isSelected: this.isSelected,
                    isActive: this.isActive,
                    year: this.getYear(),
                    activeDate: this.activeDate,
                    value: this.value,
                }) : this.yearFormatted;
            return createElement('button', {
                class: this.getClass(),
                attrs: {
                    'aria-label': this.yearFormatted,
                    'data-date': this.yearFormatted,
                    type: 'button',
                    tabindex: -1,
                },
                on: {
                    click: (e) => this.$emit('click', e),
                },
            }, yearSlot);
        },
    });

    const TDatepickerViewsViewYears = Vue__default['default'].extend({
        name: 'TDatepickerViewsViewYears',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            yearsPerView: {
                type: Number,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
            };
        },
        computed: {
            years() {
                const [initialYear] = getYearsRange(this.localActiveDate, this.yearsPerView);
                return Array
                    .from({ length: this.yearsPerView }, (_x, i) => i)
                    .map((year) => this.getYear(initialYear + year));
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
        },
        methods: {
            getYear(year) {
                let newDate = new Date(this.localActiveDate.valueOf());
                newDate.setFullYear(year);
                // Means the current day has less days so the extra month is
                // in the following month
                if (newDate.getDate() !== this.localActiveDate.getDate()) {
                    // Assign the last day of previous month
                    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);
                }
                return newDate;
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('yearWrapper'),
            }, this.years.map((year) => createElement(TDatepickerViewsViewYearsYear, {
                props: {
                    year,
                    activeDate: this.localActiveDate,
                    value: this.value,
                    getElementCssClass: this.getElementCssClass,
                    showActiveDate: this.showActiveDate,
                    formatNative: this.formatNative,
                },
                scopedSlots: this.$scopedSlots,
                on: {
                    click: () => this.$emit('input', year),
                },
            })));
        },
    });

    const TDatepickerViewsView = Vue__default['default'].extend({
        name: 'TDatepickerViewsView',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeMonth: {
                type: Date,
                required: true,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            weekStart: {
                type: Number,
                required: true,
            },
            lang: {
                type: String,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            parse: {
                type: Function,
                required: true,
            },
            format: {
                type: Function,
                required: true,
            },
            userFormat: {
                type: String,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            monthsPerView: {
                type: Number,
                required: true,
            },
            monthIndex: {
                type: Number,
                required: true,
            },
            currentView: {
                type: String,
                required: true,
            },
            yearsPerView: {
                type: Number,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                required: true,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            range: {
                type: Boolean,
                required: true,
            },
            locale: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
                localActiveMonth: new Date(this.activeMonth.valueOf()),
            };
        },
        computed: {
            isFirstMonth() {
                return this.monthIndex === 0;
            },
            isLastMonth() {
                return this.monthIndex === this.monthsPerView - 1;
            },
            showMonthName() {
                return this.monthsPerView > 1;
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
            activeMonth(activeMonth) {
                this.localActiveMonth = new Date(activeMonth.valueOf());
            },
        },
        methods: {
            inputHandler(date) {
                this.resetView();
                this.$emit('input', date);
            },
            viewInputActiveDateHandler(date) {
                this.resetView();
                this.inputActiveDateHandler(date);
            },
            inputActiveDateHandler(date) {
                this.$emit('input-active-date', date);
            },
            resetView() {
                this.$emit('reset-view');
            },
        },
        render(createElement) {
            const subElements = [];
            subElements.push(createElement(TDatepickerNavigator, {
                ref: 'navigator',
                props: {
                    value: this.localActiveMonth,
                    getElementCssClass: this.getElementCssClass,
                    showSelector: this.isFirstMonth,
                    currentView: this.currentView,
                    parse: this.parse,
                    formatNative: this.formatNative,
                    dateFormat: this.dateFormat,
                    yearsPerView: this.yearsPerView,
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    locale: this.locale,
                },
                on: {
                    input: this.inputActiveDateHandler,
                    'update-view': (newView) => {
                        this.$emit('update-view', newView);
                    },
                },
            }));
            if (this.currentView === CalendarView.Day) {
                subElements.push(createElement(TDatepickerViewsViewCalendar, {
                    ref: 'calendar',
                    props: {
                        value: this.value,
                        activeMonth: this.localActiveMonth,
                        activeDate: this.localActiveDate,
                        weekStart: this.weekStart,
                        getElementCssClass: this.getElementCssClass,
                        showDaysForOtherMonth: this.showDaysForOtherMonth,
                        parse: this.parse,
                        format: this.format,
                        formatNative: this.formatNative,
                        dateFormat: this.dateFormat,
                        userFormat: this.userFormat,
                        monthsPerView: this.monthsPerView,
                        showActiveDate: this.showActiveDate,
                        disabledDates: this.disabledDates,
                        highlightDates: this.highlightDates,
                        minDate: this.minDate,
                        maxDate: this.maxDate,
                        range: this.range,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        input: this.inputHandler,
                    },
                }));
            }
            else if (this.currentView === CalendarView.Month) {
                subElements.push(createElement(TDatepickerViewsViewMonths, {
                    ref: 'months',
                    props: {
                        value: this.value,
                        activeDate: this.localActiveDate,
                        getElementCssClass: this.getElementCssClass,
                        showActiveDate: this.showActiveDate,
                        formatNative: this.formatNative,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        input: this.viewInputActiveDateHandler,
                    },
                }));
            }
            else if (this.currentView === CalendarView.Year) {
                subElements.push(createElement(TDatepickerViewsViewYears, {
                    ref: 'years',
                    props: {
                        value: this.value,
                        activeDate: this.localActiveDate,
                        getElementCssClass: this.getElementCssClass,
                        yearsPerView: this.yearsPerView,
                        showActiveDate: this.showActiveDate,
                        formatNative: this.formatNative,
                    },
                    scopedSlots: this.$scopedSlots,
                    on: {
                        input: this.viewInputActiveDateHandler,
                    },
                }));
            }
            return createElement('div', {
                class: this.getElementCssClass('view'),
            }, subElements);
        },
    });

    const TDatepickerViews = Vue__default['default'].extend({
        name: 'TDatepickerViews',
        props: {
            value: {
                type: [Date, Array],
                default: null,
            },
            activeDate: {
                type: Date,
                required: true,
            },
            weekStart: {
                type: Number,
                required: true,
            },
            monthsPerView: {
                type: Number,
                required: true,
            },
            lang: {
                type: String,
                required: true,
            },
            getElementCssClass: {
                type: Function,
                required: true,
            },
            parse: {
                type: Function,
                required: true,
            },
            format: {
                type: Function,
                required: true,
            },
            formatNative: {
                type: Function,
                required: true,
            },
            dateFormat: {
                type: String,
                required: true,
            },
            userFormat: {
                type: String,
                required: true,
            },
            initialView: {
                type: String,
                required: true,
            },
            currentView: {
                type: String,
                required: true,
            },
            yearsPerView: {
                type: Number,
                required: true,
            },
            showActiveDate: {
                type: Boolean,
                required: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                required: true,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            range: {
                type: Boolean,
                required: true,
            },
            locale: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                localActiveDate: new Date(this.activeDate.valueOf()),
            };
        },
        computed: {
            activeMonths() {
                return Array
                    .from({ length: this.monthsPerView }, (_x, i) => i)
                    .map((i) => addMonths(this.localActiveDate, i));
            },
        },
        watch: {
            activeDate(activeDate) {
                this.localActiveDate = new Date(activeDate.valueOf());
            },
        },
        render(createElement) {
            return createElement('div', {
                class: this.getElementCssClass('viewGroup'),
            }, this.activeMonths.map((activeMonth, index) => createElement(TDatepickerViewsView, {
                ref: 'view',
                props: {
                    value: this.value,
                    activeMonth,
                    activeDate: this.localActiveDate,
                    weekStart: this.weekStart,
                    lang: this.lang,
                    getElementCssClass: this.getElementCssClass,
                    parse: this.parse,
                    format: this.format,
                    dateFormat: this.dateFormat,
                    userFormat: this.userFormat,
                    formatNative: this.formatNative,
                    monthsPerView: this.monthsPerView,
                    monthIndex: index,
                    currentView: index === 0 ? this.currentView : this.initialView,
                    yearsPerView: this.yearsPerView,
                    showActiveDate: this.showActiveDate,
                    disabledDates: this.disabledDates,
                    highlightDates: this.highlightDates,
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    range: this.range,
                    showDaysForOtherMonth: this.showDaysForOtherMonth,
                    locale: this.locale,
                },
                scopedSlots: this.$scopedSlots,
                on: {
                    input: (date) => {
                        this.$emit('input', date);
                    },
                    'input-active-date': (date) => {
                        this.$emit('input-active-date', date);
                    },
                    'update-view': (newView) => {
                        this.$emit('update-view', newView);
                    },
                    'reset-view': () => {
                        this.$emit('reset-view');
                    },
                },
            })));
        },
    });

    const TDatepicker = HtmlInput.extend({
        name: 'TDatepicker',
        props: {
            value: {
                type: [Date, String, Number, Array],
                default: null,
            },
            placeholder: {
                type: String,
                default: undefined,
            },
            inputName: {
                type: String,
                default: undefined,
            },
            weekStart: {
                type: Number,
                default: 0,
            },
            monthsPerView: {
                type: Number,
                default: 1,
                validator(value) {
                    return value >= 1;
                },
            },
            lang: {
                type: String,
                default: 'en',
            },
            locale: {
                type: Object,
                default: () => English,
            },
            locales: {
                type: Object,
                default: () => ({}),
            },
            dateFormat: {
                type: String,
                default: 'Y-m-d',
            },
            userFormat: {
                type: String,
                default: 'F j, Y',
            },
            dateFormatter: {
                type: Function,
                default: undefined,
            },
            dateParser: {
                type: Function,
                default: undefined,
            },
            closeOnSelect: {
                type: Boolean,
                default: true,
            },
            showDaysForOtherMonth: {
                type: Boolean,
                default: true,
            },
            show: {
                type: Boolean,
                default: false,
            },
            inline: {
                type: Boolean,
                default: false,
            },
            initialView: {
                type: String,
                default: CalendarView.Day,
                validator(value) {
                    return [CalendarView.Day, CalendarView.Month, CalendarView.Year].includes(value);
                },
            },
            yearsPerView: {
                type: Number,
                default: 12,
            },
            disabledDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            highlightDates: {
                type: [Date, Array, Function, String],
                default: undefined,
            },
            maxDate: {
                type: [Date, String],
                default: undefined,
            },
            minDate: {
                type: [Date, String],
                default: undefined,
            },
            initialDate: {
                type: [Date, String],
                default: undefined,
            },
            conjunction: {
                type: String,
                default: ',',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            range: {
                type: Boolean,
                default: false,
            },
            clearable: {
                type: Boolean,
                default: true,
            },
            classes: {
                type: Object,
                default: () => ({
                    wrapper: 'flex flex-col',
                    dropdownWrapper: 'relative z-10',
                    // Dropdown related classes
                    dropdown: 'origin-top-left absolute rounded shadow bg-white overflow-hidden mt-1',
                    enterClass: '',
                    enterActiveClass: 'transition ease-out duration-100 transform opacity-0 scale-95',
                    enterToClass: 'transform opacity-100 scale-100',
                    leaveClass: 'transition ease-in transform opacity-100 scale-100',
                    leaveActiveClass: '',
                    leaveToClass: 'transform opacity-0 scale-95 duration-75',
                    // Wrapper for inline calendar
                    inlineWrapper: '',
                    inlineViews: 'rounded bg-white border mt-1 inline-flex',
                    // Text input related classes
                    inputWrapper: '',
                    input: 'block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
                    clearButton: 'hover:bg-gray-100 rounded transition duration-100 ease-in-out text-gray-600',
                    clearButtonIcon: '',
                    // Picker views
                    viewGroup: '',
                    view: '',
                    // Navigator
                    navigator: 'pt-2 px-3',
                    navigatorViewButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer rounded-full px-2 py-1 -ml-1 hover:bg-gray-100',
                    navigatorViewButtonIcon: 'fill-current text-gray-400',
                    navigatorViewButtonBackIcon: 'fill-current text-gray-400',
                    navigatorViewButtonMonth: 'text-gray-700 font-semibold',
                    navigatorViewButtonYear: 'text-gray-500 ml-1',
                    navigatorViewButtonYearRange: 'text-gray-500 ml-1',
                    navigatorLabel: 'py-1',
                    navigatorLabelMonth: 'text-gray-700 font-semibold',
                    navigatorLabelYear: 'text-gray-500 ml-1',
                    navigatorPrevButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 ml-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed',
                    navigatorNextButton: 'transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-100 rounded-full p-1 -mr-1 disabled:opacity-50 disabled:cursor-not-allowed',
                    navigatorPrevButtonIcon: 'text-gray-400',
                    navigatorNextButtonIcon: 'text-gray-400',
                    // Calendar View
                    calendarWrapper: 'px-3 pt-2',
                    calendarHeaderWrapper: '',
                    calendarHeaderWeekDay: 'uppercase text-xs text-gray-500 w-8 h-8 flex items-center justify-center',
                    calendarDaysWrapper: '',
                    calendarDaysDayWrapper: 'w-full h-8 flex flex-shrink-0 items-center',
                    // Day item
                    otherMonthDay: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed',
                    emptyDay: '',
                    inRangeFirstDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-l-full',
                    inRangeLastDay: 'text-sm bg-blue-500 text-white w-full h-8 rounded-r-full',
                    inRangeDay: 'text-sm bg-blue-200 w-full h-8 disabled:opacity-50 disabled:cursor-not-allowed',
                    selectedDay: 'text-sm rounded-full w-8 h-8 mx-auto bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed',
                    activeDay: 'text-sm rounded-full bg-blue-100 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
                    highlightedDay: 'text-sm rounded-full bg-blue-200 w-8 h-8 mx-auto disabled:opacity-50 disabled:cursor-not-allowed',
                    day: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed',
                    today: 'text-sm rounded-full w-8 h-8 mx-auto hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500',
                    // Months View
                    monthWrapper: 'px-3 pt-2',
                    selectedMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white',
                    activeMonth: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
                    month: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
                    // Years View
                    yearWrapper: 'px-3 pt-2',
                    year: 'text-sm rounded w-full h-12 mx-auto hover:bg-blue-100',
                    selectedYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-500 text-white',
                    activeYear: 'text-sm rounded w-full h-12 mx-auto bg-blue-100',
                }),
            },
            fixedClasses: {
                type: Object,
                default: () => ({
                    navigator: 'flex',
                    navigatorViewButton: 'flex items-center',
                    navigatorViewButtonIcon: 'flex-shrink-0 h-5 w-5',
                    navigatorViewButtonBackIcon: 'flex-shrink-0 h-5 w-5',
                    navigatorLabel: 'flex items-center py-1',
                    navigatorPrevButtonIcon: 'h-6 w-6 inline-flex',
                    navigatorNextButtonIcon: 'h-6 w-6 inline-flex',
                    inputWrapper: 'relative',
                    viewGroup: 'inline-flex flex-wrap',
                    view: 'w-64',
                    calendarDaysWrapper: 'grid grid-cols-7',
                    calendarHeaderWrapper: 'grid grid-cols-7',
                    monthWrapper: 'grid grid-cols-4',
                    yearWrapper: 'grid grid-cols-4',
                    clearButton: 'flex flex-shrink-0 items-center justify-center absolute right-0 top-0 m-2 h-6 w-6',
                    clearButtonIcon: 'fill-current h-3 w-3',
                }),
            },
        },
        data() {
            const currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
            const dateFormatter = this.dateFormatter;
            const parse = buildDateParser(currentLocale, this.dateParser);
            const format = buildDateFormatter(currentLocale, dateFormatter);
            // Keep a native formatter for the different views
            const formatNative = !dateFormatter ? format : buildDateFormatter(currentLocale);
            let localValue = this.multiple || this.range ? [] : null;
            if (Array.isArray(this.value)) {
                localValue = this.value
                    .map((value) => parse(value, this.dateFormat) || null)
                    .filter((value) => !!value);
            }
            else {
                localValue = parse(this.value, this.dateFormat) || localValue;
            }
            const formatedDate = Array.isArray(localValue)
                ? localValue.map((d) => format(d, this.dateFormat))
                : format(localValue, this.dateFormat);
            const userFormatedDate = Array.isArray(localValue)
                ? localValue.map((d) => format(d, this.userFormat))
                : format(localValue, this.userFormat);
            let activeDate = new Date();
            if (Array.isArray(localValue) && localValue.length) {
                [activeDate] = localValue;
            }
            else if (localValue instanceof Date) {
                activeDate = localValue;
            }
            else {
                activeDate = parse(this.initialDate, this.dateFormat) || activeDate;
            }
            // Used to show the selected month/year
            const currentView = this.initialView;
            return {
                localValue,
                formatedDate,
                userFormatedDate,
                activeDate,
                shown: this.show,
                showActiveDate: false,
                currentView,
                parse,
                format,
                formatNative,
                currentLocale,
            };
        },
        computed: {
            visibleRange() {
                const start = new Date(this.activeDate.valueOf());
                const end = new Date(this.activeDate.valueOf());
                start.setDate(1);
                end.setMonth(end.getMonth() + this.monthsPerView, 0);
                return [start, end];
            },
            latestDate() {
                if (Array.isArray(this.localValue)) {
                    if (this.localValue.length) {
                        return this.localValue[this.localValue.length - 1] || null;
                    }
                    return null;
                }
                return this.localValue;
            },
            currentValueIsInTheView() {
                // eslint-disable-next-line no-restricted-globals
                if (this.latestDate) {
                    const [start, end] = this.visibleRange;
                    return compareDates(end, this.latestDate) >= 0 && compareDates(this.latestDate, start) >= 0;
                }
                return true;
            },
        },
        watch: {
            shown(shown) {
                this.$emit('update:show', shown);
            },
            activeDate(activeDate) {
                this.$emit('active-change', activeDate);
            },
            formatedDate(formatedDate) {
                this.$emit('input', formatedDate);
                this.$emit('change', formatedDate);
            },
            userFormatedDate(userFormatedDate) {
                this.$emit('user-date-changed', userFormatedDate);
            },
            localValue(localValue) {
                if (this.monthsPerView === 1 || !this.currentValueIsInTheView) {
                    if (Array.isArray(localValue) && localValue.length) {
                        this.activeDate = localValue[localValue.length - 1];
                    }
                    else {
                        this.activeDate = localValue instanceof Date ? localValue : new Date();
                    }
                }
                this.refreshFormattedDate();
            },
            value(value) {
                if (Array.isArray(value)) {
                    const localValue = value
                        .map((v) => this.parse(v, this.dateFormat) || null)
                        .filter((v) => !!v);
                    if (!isEqual__default['default'](localValue, this.localValue)) {
                        this.localValue = localValue;
                    }
                }
                else {
                    this.localValue = this.parse(value, this.dateFormat)
                        || (this.multiple || this.range ? [] : null);
                }
            },
            dateParser() {
                this.refreshParser();
            },
            dateFormatter() {
                this.refreshFormatter();
            },
            lang() {
                this.refreshCurrentLocale();
            },
            locale() {
                this.refreshCurrentLocale();
            },
            locales: {
                handler() {
                    this.refreshCurrentLocale();
                },
                deep: true,
            },
        },
        methods: {
            refreshFormattedDate() {
                const formatedDate = Array.isArray(this.localValue)
                    ? this.localValue.map((d) => this.format(d, this.dateFormat))
                    : this.format(this.localValue, this.dateFormat);
                const userFormatedDate = Array.isArray(this.localValue)
                    ? this.localValue.map((d) => this.format(d, this.userFormat))
                    : this.format(this.localValue, this.userFormat);
                this.formatedDate = formatedDate;
                this.userFormatedDate = userFormatedDate;
            },
            refreshCurrentLocale() {
                this.currentLocale = extractLocaleFromProps(this.lang, this.locales, this.locale);
                this.refreshParser();
                this.refreshFormatter();
                this.refreshFormattedDate();
            },
            refreshParser() {
                const parse = buildDateParser(this.currentLocale, this.dateParser);
                this.parse = parse;
            },
            refreshFormatter() {
                const dateFormatter = this.dateFormatter;
                const format = buildDateFormatter(this.currentLocale, dateFormatter);
                // Keep a native formatter for the different views
                const formatNative = !dateFormatter ? format : buildDateFormatter(this.currentLocale);
                this.format = format;
                this.formatNative = formatNative;
            },
            focus(options) {
                const wrapper = this.$el;
                const input = wrapper.querySelector('input[type=text]');
                if (!input) {
                    throw new Error('Input not found');
                }
                input.focus(options);
            },
            doHide() {
                const dropdown = this.getDropdown();
                if (dropdown) {
                    dropdown.doHide();
                }
            },
            doShow() {
                const dropdown = this.getDropdown();
                if (dropdown) {
                    dropdown.doShow();
                }
            },
            toggle() {
                const dropdown = this.getDropdown();
                if (dropdown) {
                    dropdown.doToggle();
                }
            },
            arrowKeyHandler(e) {
                e.preventDefault();
                this.showActiveDate = true;
                if (!this.inline && !this.shown) {
                    this.doShow();
                    return;
                }
                let newActiveDate;
                if (this.currentView === CalendarView.Day) {
                    if (e.keyCode === Key$1.DOWN) {
                        newActiveDate = addDays(this.activeDate, 7);
                    }
                    else if (e.keyCode === Key$1.LEFT) {
                        newActiveDate = addDays(this.activeDate, -1);
                    }
                    else if (e.keyCode === Key$1.UP) {
                        newActiveDate = addDays(this.activeDate, -7);
                    }
                    else if (e.keyCode === Key$1.RIGHT) {
                        newActiveDate = addDays(this.activeDate, 1);
                    }
                }
                else if (this.currentView === CalendarView.Month) {
                    if (e.keyCode === Key$1.DOWN) {
                        newActiveDate = addMonths(this.activeDate, 4);
                    }
                    else if (e.keyCode === Key$1.LEFT) {
                        newActiveDate = addMonths(this.activeDate, -1);
                    }
                    else if (e.keyCode === Key$1.UP) {
                        newActiveDate = addMonths(this.activeDate, -4);
                    }
                    else if (e.keyCode === Key$1.RIGHT) {
                        newActiveDate = addMonths(this.activeDate, 1);
                    }
                }
                else if (this.currentView === CalendarView.Year) {
                    if (e.keyCode === Key$1.DOWN) {
                        newActiveDate = addYears(this.activeDate, 4);
                    }
                    else if (e.keyCode === Key$1.LEFT) {
                        newActiveDate = addYears(this.activeDate, -1);
                    }
                    else if (e.keyCode === Key$1.UP) {
                        newActiveDate = addYears(this.activeDate, -4);
                    }
                    else if (e.keyCode === Key$1.RIGHT) {
                        newActiveDate = addYears(this.activeDate, 1);
                    }
                }
                if (newActiveDate && !dateIsOutOfRange(newActiveDate, this.minDate, this.maxDate, this.parse, this.dateFormat)) {
                    this.activeDate = newActiveDate;
                }
            },
            inputHandler(newDate) {
                const date = new Date(newDate.valueOf());
                const disabledDates = this.disabledDates;
                if (dayIsPartOfTheConditions(date, disabledDates, this.parse, this.dateFormat)
                    || dateIsOutOfRange(date, this.minDate, this.maxDate, this.parse, this.dateFormat)) {
                    return;
                }
                if (this.range) {
                    let range = [];
                    // Reset the range when
                    // 1. Is not an array
                    // 2. The range already have both values
                    // 3. The range has the first value and the second value is before
                    if (!this.localValue
                        || !Array.isArray(this.localValue)
                        || (Array.isArray(this.localValue)
                            && (this.localValue.length === 0 || this.localValue.length === 2))
                        || (Array.isArray(this.localValue)
                            && this.localValue.length === 1
                            && this.localValue[0]
                            && this.localValue[0].getTime() > date.getTime())) {
                        range = [date];
                    }
                    else if (this.localValue.length === 1) {
                        range = [this.localValue[0], date];
                    }
                    this.localValue = range;
                    // Range is complete
                    if (!this.inline && this.localValue.length === 2 && this.closeOnSelect) {
                        this.doHide();
                    }
                }
                else if (Array.isArray(this.localValue)) {
                    const index = this.localValue.findIndex((d) => isSameDay(d, date));
                    if (index >= 0) {
                        this.localValue.splice(index, 1);
                    }
                    else {
                        this.localValue.push(date);
                    }
                }
                else {
                    this.focus();
                    this.localValue = date;
                }
                if (!this.inline && this.closeOnSelect && !Array.isArray(this.localValue)) {
                    this.doHide();
                }
            },
            inputActiveDateHandler(newDate) {
                this.activeDate = new Date(newDate.valueOf());
                this.focus();
            },
            setView(newView) {
                this.currentView = newView;
                this.focus();
            },
            resetView() {
                if (this.currentView === CalendarView.Month) {
                    this.setView(CalendarView.Day);
                }
                else if (this.currentView === CalendarView.Year) {
                    this.setView(CalendarView.Month);
                }
                else {
                    this.setView(CalendarView.Day);
                }
            },
            enterHandler(e) {
                e.preventDefault();
                if (!this.inline && !this.shown) {
                    this.doShow();
                }
                else if (this.showActiveDate) {
                    if (this.currentView === CalendarView.Day) {
                        this.inputHandler(new Date(this.activeDate.valueOf()));
                    }
                    else {
                        this.resetView();
                    }
                }
            },
            escapeHandler(e) {
                e.preventDefault();
                const dropdown = this.getDropdown();
                if (dropdown) {
                    dropdown.escapeHandler(e);
                }
            },
            spaceHandler(e) {
                e.preventDefault();
                this.toggle();
            },
            getDropdown() {
                return this.$refs.dropdown;
            },
            resetInitialState() {
                this.shown = false;
                this.currentView = this.initialView;
                this.showActiveDate = false;
                if (Array.isArray(this.localValue) && this.localValue.length) {
                    [this.activeDate] = this.localValue;
                }
                else {
                    this.activeDate = this.localValue instanceof Date ? this.localValue : new Date();
                }
            },
            clearHandler() {
                if (this.multiple || this.range) {
                    this.localValue = [];
                }
                else {
                    this.localValue = null;
                }
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            blurHandler(e) {
                this.$emit('blur', e);
            },
        },
        render(createElement) {
            const views = createElement(TDatepickerViews, {
                ref: 'views',
                props: {
                    value: this.localValue,
                    activeDate: this.activeDate,
                    weekStart: this.weekStart,
                    monthsPerView: this.monthsPerView,
                    lang: this.lang,
                    locale: this.currentLocale,
                    getElementCssClass: this.getElementCssClass,
                    parse: this.parse,
                    format: this.format,
                    formatNative: this.formatNative,
                    dateFormat: this.dateFormat,
                    userFormat: this.userFormat,
                    initialView: this.initialView,
                    currentView: this.currentView,
                    yearsPerView: this.yearsPerView,
                    showActiveDate: this.showActiveDate,
                    disabledDates: this.disabledDates,
                    highlightDates: this.highlightDates,
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    range: this.range,
                    showDaysForOtherMonth: this.showDaysForOtherMonth,
                },
                scopedSlots: this.$scopedSlots,
                on: {
                    input: this.inputHandler,
                    'input-active-date': this.inputActiveDateHandler,
                    'update-view': this.setView,
                    'reset-view': this.resetView,
                },
            });
            const triggerSettings = {
                ref: 'trigger',
                props: {
                    id: this.id,
                    name: this.name,
                    inputName: this.inputName,
                    disabled: this.disabled,
                    readonly: this.readonly,
                    autofocus: this.autofocus,
                    required: this.required,
                    placeholder: this.placeholder,
                    tabindex: this.tabindex,
                    userFormatedDate: this.userFormatedDate,
                    formatedDate: this.formatedDate,
                    conjunction: this.conjunction,
                    multiple: this.multiple,
                    range: this.range,
                    clearable: this.clearable,
                    locale: this.currentLocale,
                    value: this.localValue,
                    activeDate: this.activeDate,
                    getElementCssClass: this.getElementCssClass,
                },
                scopedSlots: this.$scopedSlots,
                on: {
                    clear: this.clearHandler,
                    focus: this.focusHandler,
                    blur: this.blurHandler,
                    keydown: (e) => {
                        if ([Key$1.LEFT, Key$1.UP, Key$1.RIGHT, Key$1.DOWN].includes(e.keyCode)) {
                            this.arrowKeyHandler(e);
                        }
                        else if (e.keyCode === Key$1.ENTER) {
                            this.enterHandler(e);
                        }
                        else if (e.keyCode === Key$1.ESC) {
                            this.escapeHandler(e);
                        }
                        else if (e.keyCode === Key$1.SPACE) {
                            this.spaceHandler(e);
                        }
                        this.$emit('keydown', e);
                    },
                },
            };
            if (this.inline) {
                return createElement('div', {
                    class: this.getElementCssClass('inlineWrapper'),
                }, [
                    createElement(TDatepickerTrigger, triggerSettings),
                    createElement('div', {
                        class: this.getElementCssClass('inlineViews'),
                    }, [views]),
                ]);
            }
            return createElement(TDropdown, {
                ref: 'dropdown',
                props: {
                    fixedClasses: undefined,
                    classes: {
                        wrapper: this.getElementCssClass('wrapper'),
                        dropdownWrapper: this.getElementCssClass('dropdownWrapper'),
                        dropdown: this.getElementCssClass('dropdown'),
                        enterClass: this.getElementCssClass('enterClass'),
                        enterActiveClass: this.getElementCssClass('enterActiveClass'),
                        enterToClass: this.getElementCssClass('enterToClass'),
                        leaveClass: this.getElementCssClass('leaveClass'),
                        leaveActiveClass: this.getElementCssClass('leaveActiveClass'),
                        leaveToClass: this.getElementCssClass('leaveToClass'),
                    },
                    show: this.show,
                },
                on: {
                    hidden: () => {
                        this.$emit('hidden');
                        this.resetInitialState();
                    },
                    shown: () => {
                        this.$emit('shown');
                        this.shown = true;
                    },
                },
                scopedSlots: {
                    trigger: (props) => {
                        const settings = cloneDeep__default['default'](triggerSettings);
                        settings.props = Object.assign(Object.assign({}, settings.props), {
                            hideIfFocusOutside: props.hideIfFocusOutside,
                            show: props.show,
                        });
                        return [
                            createElement(TDatepickerTrigger, settings),
                        ];
                    },
                },
            }, [
                views,
            ]);
        },
    });

    const isChecked = (model, value) => {
        if (Array.isArray(model)) {
            return model.indexOf(value) >= 0;
        }
        return model === value;
    };
    const TToggle = HtmlInput.extend({
        name: 'TToggle',
        props: {
            value: {
                type: [String, Object, Number, Boolean, Array],
                default: true,
            },
            uncheckedValue: {
                type: [String, Object, Number, Boolean, Array],
                default: false,
            },
            model: {
                // v-model
                type: [String, Object, Number, Boolean, Array],
                default: undefined,
            },
            checked: {
                type: Boolean,
                default: undefined,
            },
            tabindex: {
                type: [String, Number],
                default: 0,
            },
            uncheckedPlaceholder: {
                type: String,
                default: undefined,
            },
            checkedPlaceholder: {
                type: String,
                default: undefined,
            },
            uncheckedLabel: {
                type: String,
                default: undefined,
            },
            checkedLabel: {
                type: String,
                default: undefined,
            },
            classes: {
                type: Object,
                default() {
                    return {
                        wrapper: 'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        wrapperChecked: 'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        wrapperDisabled: 'bg-gray-100 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        wrapperCheckedDisabled: 'bg-blue-500 rounded-full border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
                        button: 'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-gray-400 text-xs',
                        buttonChecked: 'h-5 w-5 rounded-full bg-white shadow flex items-center justify-center text-blue-500 text-xs',
                        checkedPlaceholder: 'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
                        uncheckedPlaceholder: 'rounded-full w-5 h-5 flex items-center justify-center text-gray-400 text-xs',
                    };
                },
            },
            fixedClasses: {
                type: [String, Array, Object],
                default() {
                    return {
                        wrapper: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
                        wrapperChecked: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200',
                        wrapperDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
                        wrapperCheckedDisabled: 'relative inline-flex flex-shrink-0 cursor-pointer transition-colors ease-in-out duration-200 opacity-50 cursor-not-allowed',
                        button: 'inline-block absolute transform translate-x-0 transition ease-in-out duration-200',
                        buttonChecked: 'inline-block absolute transform translate-x-full transition ease-in-out duration-200',
                        checkedPlaceholder: 'inline-block',
                        uncheckedPlaceholder: 'inline-block',
                    };
                },
            },
        },
        model: {
            prop: 'model',
            event: 'input',
        },
        data() {
            const checked = typeof this.checked === 'boolean' && typeof this.model === 'undefined'
                ? this.checked
                : isChecked(this.model, this.value);
            return {
                isChecked: checked,
            };
        },
        computed: {
            isDisabled() {
                return this.disabled || this.readonly;
            },
            currentValue() {
                return this.isChecked ? this.value : this.uncheckedValue;
            },
        },
        watch: {
            model(model) {
                this.isChecked = isChecked(model, this.value);
            },
            isChecked(checked) {
                let localValue;
                if (Array.isArray(this.model)) {
                    localValue = [...this.model];
                    const index = localValue.indexOf(this.value);
                    if (checked && index < 0) {
                        localValue.push(this.value);
                    }
                    else if (!checked && index >= 0) {
                        localValue.splice(index, 1);
                    }
                }
                else {
                    localValue = this.currentValue;
                }
                this.$emit('input', localValue);
                this.$emit('change', localValue);
                // Emit update event to prop
                this.$emit('update:checked', checked);
            },
        },
        methods: {
            blurHandler(e) {
                this.$emit('blur', e);
            },
            focusHandler(e) {
                this.$emit('focus', e);
            },
            getElement() {
                return this.$el;
            },
            blur() {
                this.getElement().blur();
            },
            click() {
                this.getElement().click();
            },
            spaceHandler(e) {
                e.preventDefault();
                this.toggleValue();
            },
            clickHandler() {
                this.toggleValue();
            },
            toggleValue() {
                if (this.isDisabled) {
                    return;
                }
                this.isChecked = !this.isChecked;
            },
            setChecked(checked) {
                this.isChecked = checked;
            },
            focus(options) {
                this.getElement().focus(options);
            },
        },
        render(createElement) {
            let wrapperClass;
            if (this.isDisabled) {
                if (this.isChecked) {
                    wrapperClass = this.getElementCssClass('wrapperCheckedDisabled');
                }
                else {
                    wrapperClass = this.getElementCssClass('wrapperDisabled');
                }
            }
            else if (this.isChecked) {
                wrapperClass = this.getElementCssClass('wrapperChecked');
            }
            else {
                wrapperClass = this.getElementCssClass('wrapper');
            }
            let defaultSlot = this.$scopedSlots.default ? this.$scopedSlots.default({
                value: this.currentValue,
                uncheckedValue: this.uncheckedValue,
                isChecked: this.isChecked,
            }) : null;
            if (!defaultSlot) {
                defaultSlot = this.isChecked ? this.checkedLabel : this.uncheckedLabel;
            }
            let checkedslot = this.$scopedSlots.checked ? this.$scopedSlots.checked({
                value: this.currentValue,
                uncheckedValue: this.uncheckedValue,
                isChecked: this.isChecked,
            }) : null;
            if (this.checkedPlaceholder && !checkedslot) {
                checkedslot = this.checkedPlaceholder;
            }
            let uncheckedSlot = this.$scopedSlots.unchecked ? this.$scopedSlots.unchecked({
                value: this.currentValue,
                uncheckedValue: this.uncheckedValue,
                isChecked: this.isChecked,
            }) : null;
            if (this.uncheckedPlaceholder && !uncheckedSlot) {
                uncheckedSlot = this.uncheckedPlaceholder;
            }
            return createElement('span', {
                class: wrapperClass,
                attrs: {
                    role: 'checkbox',
                    id: this.id,
                    tabindex: this.tabindex,
                    autofocus: this.autofocus,
                    'aria-checked': this.isChecked ? 'true' : 'false',
                },
                on: {
                    blur: this.blurHandler,
                    focus: this.focusHandler,
                    click: (e) => {
                        this.clickHandler();
                        this.$emit('click', e);
                    },
                    keydown: (e) => {
                        if (e.keyCode === Key$1.SPACE) {
                            this.spaceHandler(e);
                        }
                        this.$emit('keydown', e);
                    },
                },
            }, [
                createElement('input', {
                    ref: 'input',
                    attrs: {
                        value: this.currentValue,
                        type: 'hidden',
                        name: this.name,
                        disabled: this.disabled,
                        readonly: this.readonly,
                        required: this.required,
                    },
                }),
                createElement('span', {
                    class: this.getElementCssClass('checkedPlaceholder'),
                    attrs: {
                        'aria-hidden': 'true',
                    },
                }, checkedslot),
                createElement('span', {
                    class: this.getElementCssClass('uncheckedPlaceholder'),
                    attrs: {
                        'aria-hidden': 'true',
                    },
                }, uncheckedSlot),
                createElement('span', {
                    ref: 'button',
                    class: this.isChecked
                        ? this.getElementCssClass('buttonChecked')
                        : this.getElementCssClass('button'),
                    attrs: {
                        'aria-hidden': 'true',
                    },
                }, defaultSlot),
            ]);
        },
    });

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        TInput: TInput,
        TTextarea: TTextarea,
        TSelect: TSelect,
        TRadio: TRadio,
        TCheckbox: TCheckbox,
        TButton: TButton,
        TInputGroup: TInputGroup,
        TCard: TCard,
        TAlert: TAlert,
        TModal: TModal,
        TDropdown: TDropdown,
        TRichSelect: TRichSelect,
        TPagination: TPagination,
        TTag: TTag,
        TRadioGroup: TRadioGroup,
        TCheckboxGroup: TCheckboxGroup,
        TTable: TTable,
        TDatepicker: TDatepicker,
        TToggle: TToggle,
        TDialog: TDialog
    });

    const entries = Object.entries(components);
    // install function executed by Vue.use()
    // eslint-disable-next-line max-len
    const install = function installVueTailwind(vueInstance, settings) {
        if (install.installed)
            return;
        install.installed = true;
        // eslint-disable-next-line no-param-reassign
        vueInstance.prototype.$vueTailwind = true;
        entries.forEach(([componentName, component]) => {
            const props = settings ? settings[componentName] : undefined;
            vueInstance.component(componentName, configure(component, props));
        });
    };
    // Create module definition for Vue.use()
    const plugin = {
        install,
    };

    exports.default = plugin;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=full.js.map
