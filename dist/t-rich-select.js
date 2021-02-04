(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.clonedeep'), require('lodash.isequal'), require('vue'), require('lodash.get'), require('lodash.map')) :
    typeof define === 'function' && define.amd ? define(['exports', 'lodash.clonedeep', 'lodash.isequal', 'vue', 'lodash.get', 'lodash.map'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TRichSelect = {}, global.cloneDeep, global.isEqual, global.Vue, global.get, global.map));
}(this, (function (exports, cloneDeep, isEqual, Vue, get, map) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
    var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);
    var map__default = /*#__PURE__*/_interopDefaultLegacy(map);

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

    exports.default = TRichSelect;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=t-rich-select.js.map
