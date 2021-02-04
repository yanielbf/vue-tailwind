(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('lodash.get'), require('body-scroll-lock'), require('lodash.map')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'lodash.get', 'body-scroll-lock', 'lodash.map'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.VueTailwind = {}, global.Vue, global.get, global.bodyScrollLock, global.map));
}(this, (function (exports, Vue, get, bodyScrollLock, map) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var map__default = /*#__PURE__*/_interopDefaultLegacy(map);

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

    // install function executed by Vue.use()
    // eslint-disable-next-line max-len
    const install = function installVueTailwind(vueInstance, settings) {
        if (install.installed)
            return;
        install.installed = true;
        // eslint-disable-next-line no-param-reassign
        vueInstance.prototype.$vueTailwind = true;
        if (!settings) {
            return;
        }
        Object.keys(settings).forEach((componentName) => {
            const componentSettings = settings[componentName];
            if (typeof componentSettings === 'function' && typeof componentSettings.extend !== undefined) {
                const component = componentSettings;
                vueInstance.component(componentName, configure(component));
                return;
            }
            const { component, props } = componentSettings;
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
//# sourceMappingURL=vue-tailwind.js.map
