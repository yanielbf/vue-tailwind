(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('body-scroll-lock'), require('vue'), require('lodash.get')) :
    typeof define === 'function' && define.amd ? define(['exports', 'body-scroll-lock', 'vue', 'lodash.get'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TModal = {}, global.bodyScrollLock, global.Vue, global.get));
}(this, (function (exports, bodyScrollLock, Vue, get) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);
    var get__default = /*#__PURE__*/_interopDefaultLegacy(get);

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

    exports.default = TModal;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=t-modal.js.map
