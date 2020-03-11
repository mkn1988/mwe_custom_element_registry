var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, h } from './core-3bd9b574.js';
var Lumo = /** @class */ (function (_super) {
    __extends(Lumo, _super);
    function Lumo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Lumo, "version", {
        get: function () {
            return '1.6.0';
        },
        enumerable: true,
        configurable: true
    });
    return Lumo;
}(HTMLElement));
customElements.define('vaadin-lumo-styles', Lumo);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/** @type {Promise<void>} */
var readyPromise = null;
/** @type {?function(?function())} */
var whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;
/** @type {function()} */
var resolveFn;
/**
 * @param {?function()} callback
 */
function documentWait(callback) {
    requestAnimationFrame(function () {
        if (whenReady) {
            whenReady(callback);
        }
        else {
            if (!readyPromise) {
                readyPromise = new Promise(function (resolve) { resolveFn = resolve; });
                if (document.readyState === 'complete') {
                    resolveFn();
                }
                else {
                    document.addEventListener('readystatechange', function () {
                        if (document.readyState === 'complete') {
                            resolveFn();
                        }
                    });
                }
            }
            readyPromise.then(function () { callback && callback(); });
        }
    });
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var SEEN_MARKER = '__seenByShadyCSS';
var CACHED_STYLE = '__shadyCSSCachedStyle';
/** @type {?function(!HTMLStyleElement)} */
var transformFn = null;
/** @type {?function()} */
var validateFn = null;
/**
This interface is provided to add document-level <style> elements to ShadyCSS for processing.
These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
This function will be called when calculating styles.

An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

@unrestricted
*/
var CustomStyleInterface = /** @class */ (function () {
    function CustomStyleInterface() {
        /** @type {!Array<!CustomStyleProvider>} */
        this['customStyles'] = [];
        this['enqueued'] = false;
        // NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;
        documentWait(function () {
            if (window['ShadyCSS']['flushCustomStyles']) {
                window['ShadyCSS']['flushCustomStyles']();
            }
        });
    }
    /**
     * Queue a validation for new custom styles to batch style recalculations
     */
    CustomStyleInterface.prototype.enqueueDocumentValidation = function () {
        if (this['enqueued'] || !validateFn) {
            return;
        }
        this['enqueued'] = true;
        documentWait(validateFn);
    };
    /**
     * @param {!HTMLStyleElement} style
     */
    CustomStyleInterface.prototype.addCustomStyle = function (style) {
        if (!style[SEEN_MARKER]) {
            style[SEEN_MARKER] = true;
            this['customStyles'].push(style);
            this.enqueueDocumentValidation();
        }
    };
    /**
     * @param {!CustomStyleProvider} customStyle
     * @return {HTMLStyleElement}
     */
    CustomStyleInterface.prototype.getStyleForCustomStyle = function (customStyle) {
        if (customStyle[CACHED_STYLE]) {
            return customStyle[CACHED_STYLE];
        }
        var style;
        if (customStyle['getStyle']) {
            style = customStyle['getStyle']();
        }
        else {
            style = customStyle;
        }
        return style;
    };
    /**
     * @return {!Array<!CustomStyleProvider>}
     */
    CustomStyleInterface.prototype.processStyles = function () {
        var cs = this['customStyles'];
        for (var i = 0; i < cs.length; i++) {
            var customStyle = cs[i];
            if (customStyle[CACHED_STYLE]) {
                continue;
            }
            var style = this.getStyleForCustomStyle(customStyle);
            if (style) {
                // HTMLImports polyfill may have cloned the style into the main document,
                // which is referenced with __appliedElement.
                var styleToTransform = /** @type {!HTMLStyleElement} */ (style['__appliedElement'] || style);
                if (transformFn) {
                    transformFn(styleToTransform);
                }
                customStyle[CACHED_STYLE] = styleToTransform;
            }
        }
        return cs;
    };
    return CustomStyleInterface;
}());
/* eslint-disable no-self-assign */
CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;
/* eslint-enable no-self-assign */
Object.defineProperties(CustomStyleInterface.prototype, {
    'transformCallback': {
        /** @return {?function(!HTMLStyleElement)} */
        get: function () {
            return transformFn;
        },
        /** @param {?function(!HTMLStyleElement)} fn */
        set: function (fn) {
            transformFn = fn;
        }
    },
    'validateCallback': {
        /** @return {?function()} */
        get: function () {
            return validateFn;
        },
        /**
         * @param {?function()} fn
         * @this {CustomStyleInterface}
         */
        set: function (fn) {
            var needsEnqueue = false;
            if (!validateFn) {
                needsEnqueue = true;
            }
            validateFn = fn;
            if (needsEnqueue) {
                this.enqueueDocumentValidation();
            }
        },
    }
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * @param {Element} element
 * @param {Object=} properties
 */
function updateNativeProperties(element, properties) {
    // remove previous properties
    for (var p in properties) {
        // NOTE: for bc with shim, don't apply null values.
        if (p === null) {
            element.style.removeProperty(p);
        }
        else {
            element.style.setProperty(p, properties[p]);
        }
    }
}
/**
 * @param {Element} element
 * @param {string} property
 * @return {string}
 */
function getComputedStyleValue(element, property) {
    /**
     * @const {string}
     */
    var value = window.getComputedStyle(element).getPropertyValue(property);
    if (!value) {
        return '';
    }
    else {
        return value.trim();
    }
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
var nativeCssVariables_;
/**
 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
 */
function calcCssVariables(settings) {
    if (settings && settings['shimcssproperties']) {
        nativeCssVariables_ = false;
    }
    else {
        // chrome 49 has semi-working css vars, check if box-shadow works
        // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
        // However, shim css custom properties are only supported with ShadyDOM enabled,
        // so fall back on native if we do not detect ShadyDOM
        // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
        nativeCssVariables_ = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) &&
            window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
    }
}
/** @type {string | undefined} */
var cssBuild;
if (window.ShadyCSS && window.ShadyCSS.cssBuild !== undefined) {
    cssBuild = window.ShadyCSS.cssBuild;
}
/** @type {boolean} */
var disableRuntime = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);
if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
    nativeCssVariables_ = window.ShadyCSS.nativeCss;
}
else if (window.ShadyCSS) {
    calcCssVariables(window.ShadyCSS);
    // reset window variable to let ShadyCSS API take its place
    window.ShadyCSS = undefined;
}
else {
    calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
}
// Hack for type error under new type inference which doesn't like that
// nativeCssVariables is updated in a function and assigns the type
// `function(): ?` instead of `boolean`.
var nativeCssVariables = /** @type {boolean} */ (nativeCssVariables_);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var customStyleInterface = new CustomStyleInterface();
if (!window.ShadyCSS) {
    window.ShadyCSS = {
        /**
         * @param {!HTMLTemplateElement} template
         * @param {string} elementName
         * @param {string=} elementExtends
         */
        prepareTemplate: function (template, elementName, elementExtends) { },
        /**
         * @param {!HTMLTemplateElement} template
         * @param {string} elementName
         */
        prepareTemplateDom: function (template, elementName) { },
        /**
         * @param {!HTMLTemplateElement} template
         * @param {string} elementName
         * @param {string=} elementExtends
         */
        prepareTemplateStyles: function (template, elementName, elementExtends) { },
        /**
         * @param {Element} element
         * @param {Object=} properties
         */
        styleSubtree: function (element, properties) {
            customStyleInterface.processStyles();
            updateNativeProperties(element, properties);
        },
        /**
         * @param {Element} element
         */
        styleElement: function (element) {
            customStyleInterface.processStyles();
        },
        /**
         * @param {Object=} properties
         */
        styleDocument: function (properties) {
            customStyleInterface.processStyles();
            updateNativeProperties(document.body, properties);
        },
        /**
         * @param {Element} element
         * @param {string} property
         * @return {string}
         */
        getComputedStyleValue: function (element, property) {
            return getComputedStyleValue(element, property);
        },
        flushCustomStyles: function () { },
        nativeCss: nativeCssVariables,
        nativeShadow: nativeShadow,
        cssBuild: cssBuild,
        disableRuntime: disableRuntime,
    };
}
window.ShadyCSS.CustomStyleInterface = customStyleInterface;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* eslint-disable no-unused-vars */
/**
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
 * We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
 *
 * @param {string} prop Property name
 * @param {?Object} obj Reference object
 * @return {string} Potentially renamed property name
 */
window.JSCompiler_renameProperty = function (prop, obj) {
    return prop;
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var CSS_URL_RX = /(url\()([^)]*)(\))/g;
var ABS_URL = /(^\/[^\/])|(^#)|(^[\w-\d]*:)/;
var workingURL;
var resolveDoc;
/**
 * Resolves the given URL against the provided `baseUri'.
 *
 * Note that this function performs no resolution for URLs that start
 * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
 * URL resolution, use `window.URL`.
 *
 * @param {string} url Input URL to resolve
 * @param {?string=} baseURI Base URI to resolve the URL against
 * @return {string} resolved URL
 */
function resolveUrl(url, baseURI) {
    if (url && ABS_URL.test(url)) {
        return url;
    }
    if (url === '//') {
        return url;
    }
    // Lazy feature detection.
    if (workingURL === undefined) {
        workingURL = false;
        try {
            var u = new URL('b', 'http://a');
            u.pathname = 'c%20d';
            workingURL = (u.href === 'http://a/c%20d');
        }
        catch (e) {
            // silently fail
        }
    }
    if (!baseURI) {
        baseURI = document.baseURI || window.location.href;
    }
    if (workingURL) {
        try {
            return (new URL(url, baseURI)).href;
        }
        catch (e) {
            // Bad url or baseURI structure. Do not attempt to resolve.
            return url;
        }
    }
    // Fallback to creating an anchor into a disconnected document.
    if (!resolveDoc) {
        resolveDoc = document.implementation.createHTMLDocument('temp');
        resolveDoc.base = resolveDoc.createElement('base');
        resolveDoc.head.appendChild(resolveDoc.base);
        resolveDoc.anchor = resolveDoc.createElement('a');
        resolveDoc.body.appendChild(resolveDoc.anchor);
    }
    resolveDoc.base.href = baseURI;
    resolveDoc.anchor.href = url;
    return resolveDoc.anchor.href || url;
}
/**
 * Resolves any relative URL's in the given CSS text against the provided
 * `ownerDocument`'s `baseURI`.
 *
 * @param {string} cssText CSS text to process
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Processed CSS text with resolved URL's
 */
function resolveCss(cssText, baseURI) {
    return cssText.replace(CSS_URL_RX, function (m, pre, url, post) {
        return pre + '\'' +
            resolveUrl(url.replace(/["']/g, ''), baseURI) +
            '\'' + post;
    });
}
/**
 * Returns a path from a given `url`. The path includes the trailing
 * `/` from the url.
 *
 * @param {string} url Input URL to transform
 * @return {string} resolved path
 */
function pathFromUrl(url) {
    return url.substring(0, url.lastIndexOf('/') + 1);
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Globally settable property that is automatically assigned to
 * `ElementMixin` instances, useful for binding in templates to
 * make URL's relative to an application's root.  Defaults to the main
 * document URL, but can be overridden by users.  It may be useful to set
 * `rootPath` to provide a stable application mount path when
 * using client side routing.
 */
var rootPath = pathFromUrl(document.baseURI || window.location.href);
/**
 * A global callback used to sanitize any value before inserting it into the DOM.
 * The callback signature is:
 *
 *  function sanitizeDOMValue(value, name, type, node) { ... }
 *
 * Where:
 *
 * `value` is the value to sanitize.
 * `name` is the name of an attribute or property (for example, href).
 * `type` indicates where the value is being inserted: one of property, attribute, or text.
 * `node` is the node where the value is being inserted.
 *
 * @type {(function(*,string,string,Node):*)|undefined}
 */
var sanitizeDOMValue = window.Polymer && window.Polymer.sanitizeDOMValue || undefined;
/**
 * Globally settable property to make Polymer Gestures use passive TouchEvent listeners when recognizing gestures.
 * When set to `true`, gestures made from touch will not be able to prevent scrolling, allowing for smoother
 * scrolling performance.
 * Defaults to `false` for backwards compatibility.
 */
var passiveTouchGestures = false;
/**
 * Setting to ensure Polymer template evaluation only occurs based on tempates
 * defined in trusted script.  When true, `<dom-module>` re-registration is
 * disallowed, `<dom-bind>` is disabled, and `<dom-if>`/`<dom-repeat>`
 * templates will only evaluate in the context of a trusted element template.
 */
var strictTemplatePolicy = false;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var modules = {};
var lcModules = {};
/**
 * Sets a dom-module into the global registry by id.
 *
 * @param {string} id dom-module id
 * @param {DomModule} module dom-module instance
 * @return {void}
 */
function setModule(id, module) {
    // store id separate from lowercased id so that
    // in all cases mixedCase id will stored distinctly
    // and lowercase version is a fallback
    modules[id] = lcModules[id.toLowerCase()] = module;
}
/**
 * Retrieves a dom-module from the global registry by id.
 *
 * @param {string} id dom-module id
 * @return {DomModule!} dom-module instance
 */
function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
}
function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
        console.warn('dom-module %s has style outside template', inst.id);
    }
}
/**
 * The `dom-module` element registers the dom it contains to the name given
 * by the module's id attribute. It provides a unified database of dom
 * accessible via its static `import` API.
 *
 * A key use case of `dom-module` is for providing custom element `<template>`s
 * via HTML imports that are parsed by the native HTML parser, that can be
 * relocated during a bundling pass and still looked up by `id`.
 *
 * Example:
 *
 *     <dom-module id="foo">
 *       <img src="stuff.png">
 *     </dom-module>
 *
 * Then in code in some other location that cannot access the dom-module above
 *
 *     let img = customElements.get('dom-module').import('foo', 'img');
 *
 * @customElement
 * @extends HTMLElement
 * @summary Custom element that provides a registry of relocatable DOM content
 *   by `id` that is agnostic to bundling.
 * @unrestricted
 */
var DomModule = /** @class */ (function (_super) {
    __extends(DomModule, _super);
    function DomModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DomModule, "observedAttributes", {
        /** @override */
        get: function () { return ['id']; },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     *
     * @export
     * @nocollapse Referred to indirectly in style-gather.js
     */
    DomModule.import = function (id, selector) {
        if (id) {
            var m = findModule(id);
            if (m && selector) {
                return m.querySelector(selector);
            }
            return m;
        }
        return null;
    };
    /* eslint-disable no-unused-vars */
    /**
     * @param {string} name Name of attribute.
     * @param {?string} old Old value of attribute.
     * @param {?string} value Current value of attribute.
     * @param {?string} namespace Attribute namespace.
     * @return {void}
     * @override
     */
    DomModule.prototype.attributeChangedCallback = function (name, old, value, namespace) {
        if (old !== value) {
            this.register();
        }
    };
    Object.defineProperty(DomModule.prototype, "assetpath", {
        /* eslint-enable no-unused-args */
        /**
         * The absolute URL of the original location of this `dom-module`.
         *
         * This value will differ from this element's `ownerDocument` in the
         * following ways:
         * - Takes into account any `assetpath` attribute added during bundling
         *   to indicate the original location relative to the bundled location
         * - Uses the HTMLImports polyfill's `importForElement` API to ensure
         *   the path is relative to the import document's location since
         *   `ownerDocument` is not currently polyfilled
         */
        get: function () {
            // Don't override existing assetpath.
            if (!this.__assetpath) {
                // note: assetpath set via an attribute must be relative to this
                // element's location; accomodate polyfilled HTMLImports
                var owner = window.HTMLImports && HTMLImports.importForElement ?
                    HTMLImports.importForElement(this) || document : this.ownerDocument;
                var url = resolveUrl(this.getAttribute('assetpath') || '', owner.baseURI);
                this.__assetpath = pathFromUrl(url);
            }
            return this.__assetpath;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     * @return {void}
     */
    DomModule.prototype.register = function (id) {
        id = id || this.id;
        if (id) {
            this.id = id;
            setModule(id, this);
            styleOutsideTemplateCheck(this);
        }
    };
    return DomModule;
}(HTMLElement));
DomModule.prototype['modules'] = modules;
customElements.define('dom-module', DomModule);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
var INCLUDE_ATTR = 'include';
var SHADY_UNSCOPED_ATTR = 'shady-unscoped';
/**
 * @param {string} moduleId .
 * @return {?DomModule} .
 */
function importModule(moduleId) {
    return /** @type {?DomModule} */ (DomModule.import(moduleId));
}
function styleForImport(importDoc) {
    // NOTE: polyfill affordance.
    // under the HTMLImports polyfill, there will be no 'body',
    // but the import pseudo-doc can be used directly.
    var container = importDoc.body ? importDoc.body : importDoc;
    var importCss = resolveCss(container.textContent, importDoc.baseURI);
    var style = document.createElement('style');
    style.textContent = importCss;
    return style;
}
/**
 * Returns a list of <style> elements in a space-separated list of `dom-module`s.
 *
 * @function
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {!Array<!HTMLStyleElement>} Array of contained <style> elements
 */
function stylesFromModules(moduleIds) {
    var modules = moduleIds.trim().split(/\s+/);
    var styles = [];
    for (var i = 0; i < modules.length; i++) {
        styles.push.apply(styles, stylesFromModule(modules[i]));
    }
    return styles;
}
/**
 * Returns a list of <style> elements in a given `dom-module`.
 * Styles in a `dom-module` can come either from `<style>`s within the
 * first `<template>`, or else from one or more
 * `<link rel="import" type="css">` links outside the template.
 *
 * @param {string} moduleId dom-module id to gather styles from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */
function stylesFromModule(moduleId) {
    var m = importModule(moduleId);
    if (!m) {
        console.warn('Could not find style data in module named', moduleId);
        return [];
    }
    if (m._styles === undefined) {
        var styles = [];
        // module imports: <link rel="import" type="css">
        styles.push.apply(styles, _stylesFromModuleImports(m));
        // include css from the first template in the module
        var template = /** @type {?HTMLTemplateElement} */ (m.querySelector('template'));
        if (template) {
            styles.push.apply(styles, stylesFromTemplate(template, 
            /** @type {templateWithAssetPath} */ (m).assetpath));
        }
        m._styles = styles;
    }
    return m._styles;
}
/**
 * Returns the `<style>` elements within a given template.
 *
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string=} baseURI baseURI for style content
 * @return {!Array<!HTMLStyleElement>} Array of styles
 */
function stylesFromTemplate(template, baseURI) {
    if (!template._styles) {
        var styles = [];
        // if element is a template, get content from its .content
        var e$ = template.content.querySelectorAll('style');
        for (var i = 0; i < e$.length; i++) {
            var e = e$[i];
            // support style sharing by allowing styles to "include"
            // other dom-modules that contain styling
            var include = e.getAttribute(INCLUDE_ATTR);
            if (include) {
                styles.push.apply(styles, stylesFromModules(include).filter(function (item, index, self) {
                    return self.indexOf(item) === index;
                }));
            }
            if (baseURI) {
                e.textContent =
                    resolveCss(e.textContent, /** @type {string} */ (baseURI));
            }
            styles.push(e);
        }
        template._styles = styles;
    }
    return template._styles;
}
/**
 * Returns a list of <style> elements  from stylesheets loaded via `<link rel="import" type="css">` links within the specified `dom-module`.
 *
 * @param {string} moduleId Id of `dom-module` to gather CSS from
 * @return {!Array<!HTMLStyleElement>} Array of contained styles.
 */
function stylesFromModuleImports(moduleId) {
    var m = importModule(moduleId);
    return m ? _stylesFromModuleImports(m) : [];
}
/**
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {!Array<!HTMLStyleElement>} Array of contained styles
 */
function _stylesFromModuleImports(module) {
    var styles = [];
    var p$ = module.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
    for (var i = 0; i < p$.length; i++) {
        var p = p$[i];
        if (p.import) {
            var importDoc = p.import;
            var unscoped = p.hasAttribute(SHADY_UNSCOPED_ATTR);
            if (unscoped && !importDoc._unscopedStyle) {
                var style = styleForImport(importDoc);
                style.setAttribute(SHADY_UNSCOPED_ATTR, '');
                importDoc._unscopedStyle = style;
            }
            else if (!importDoc._style) {
                importDoc._style = styleForImport(importDoc);
            }
            styles.push(unscoped ? importDoc._unscopedStyle : importDoc._style);
        }
    }
    return styles;
}
/**
 *
 * Returns CSS text of styles in a space-separated list of `dom-module`s.
 * Note: This method is deprecated, use `stylesFromModules` instead.
 *
 * @deprecated
 * @param {string} moduleIds List of dom-module id's within which to
 * search for css.
 * @return {string} Concatenated CSS content from specified `dom-module`s
 */
function cssFromModules(moduleIds) {
    var modules = moduleIds.trim().split(/\s+/);
    var cssText = '';
    for (var i = 0; i < modules.length; i++) {
        cssText += cssFromModule(modules[i]);
    }
    return cssText;
}
/**
 * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
 * can come either from `<style>`s within the first `<template>`, or else
 * from one or more `<link rel="import" type="css">` links outside the
 * template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromModule` instead.
 *
 * @deprecated
 * @param {string} moduleId dom-module id to gather styles from
 * @return {string} Concatenated CSS content from specified `dom-module`
 */
function cssFromModule(moduleId) {
    var m = importModule(moduleId);
    if (m && m._cssText === undefined) {
        // module imports: <link rel="import" type="css">
        var cssText = _cssFromModuleImports(m);
        // include css from the first template in the module
        var t = /** @type {?HTMLTemplateElement} */ (m.querySelector('template'));
        if (t) {
            cssText += cssFromTemplate(t, 
            /** @type {templateWithAssetPath} */ (m).assetpath);
        }
        m._cssText = cssText || null;
    }
    if (!m) {
        console.warn('Could not find style data in module named', moduleId);
    }
    return m && m._cssText || '';
}
/**
 * Returns CSS text of `<styles>` within a given template.
 *
 * Any `<styles>` processed are removed from their original location.
 * Note: This method is deprecated, use `styleFromTemplate` instead.
 *
 * @deprecated
 * @param {!HTMLTemplateElement} template Template to gather styles from
 * @param {string} baseURI Base URI to resolve the URL against
 * @return {string} Concatenated CSS content from specified template
 */
function cssFromTemplate(template, baseURI) {
    var cssText = '';
    var e$ = stylesFromTemplate(template, baseURI);
    // if element is a template, get content from its .content
    for (var i = 0; i < e$.length; i++) {
        var e = e$[i];
        if (e.parentNode) {
            e.parentNode.removeChild(e);
        }
        cssText += e.textContent;
    }
    return cssText;
}
/**
 * @deprecated
 * @param {!HTMLElement} module dom-module element that could contain `<link rel="import" type="css">` styles
 * @return {string} Concatenated CSS content from links in the dom-module
 */
function _cssFromModuleImports(module) {
    var cssText = '';
    var styles = _stylesFromModuleImports(module);
    for (var i = 0; i < styles.length; i++) {
        cssText += styles[i].textContent;
    }
    return cssText;
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var attr = 'include';
var CustomStyleInterface$1 = window.ShadyCSS.CustomStyleInterface;
/**
 * Custom element for defining styles in the main document that can take
 * advantage of [shady DOM](https://github.com/webcomponents/shadycss) shims
 * for style encapsulation, custom properties, and custom mixins.
 *
 * - Document styles defined in a `<custom-style>` are shimmed to ensure they
 *   do not leak into local DOM when running on browsers without native
 *   Shadow DOM.
 * - Custom properties can be defined in a `<custom-style>`. Use the `html` selector
 *   to define custom properties that apply to all custom elements.
 * - Custom mixins can be defined in a `<custom-style>`, if you import the optional
 *   [apply shim](https://github.com/webcomponents/shadycss#about-applyshim)
 *   (`shadycss/apply-shim.html`).
 *
 * To use:
 *
 * - Import `custom-style.html`.
 * - Place a `<custom-style>` element in the main document, wrapping an inline `<style>` tag that
 *   contains the CSS rules you want to shim.
 *
 * For example:
 *
 * ```html
 * <!-- import apply shim--only required if using mixins -->
 * <link rel="import" href="bower_components/shadycss/apply-shim.html">
 * <!-- import custom-style element -->
 * <link rel="import" href="bower_components/polymer/lib/elements/custom-style.html">
 *
 * <custom-style>
 *   <style>
 *     html {
 *       --custom-color: blue;
 *       --custom-mixin: {
 *         font-weight: bold;
 *         color: red;
 *       };
 *     }
 *   </style>
 * </custom-style>
 * ```
 *
 * @customElement
 * @extends HTMLElement
 * @summary Custom element for defining styles in the main document that can
 *   take advantage of Polymer's style scoping and custom properties shims.
 */
var CustomStyle = /** @class */ (function (_super) {
    __extends(CustomStyle, _super);
    function CustomStyle() {
        var _this = _super.call(this) || this;
        _this._style = null;
        CustomStyleInterface$1.addCustomStyle(_this);
        return _this;
    }
    /**
     * Returns the light-DOM `<style>` child this element wraps.  Upon first
     * call any style modules referenced via the `include` attribute will be
     * concatenated to this element's `<style>`.
     *
     * @export
     * @return {HTMLStyleElement} This element's light-DOM `<style>`
     */
    CustomStyle.prototype.getStyle = function () {
        if (this._style) {
            return this._style;
        }
        var style = /** @type {HTMLStyleElement} */ (this.querySelector('style'));
        if (!style) {
            return null;
        }
        this._style = style;
        var include = style.getAttribute(attr);
        if (include) {
            style.removeAttribute(attr);
            /** @suppress {deprecated} */
            style.textContent = cssFromModules(include) + style.textContent;
        }
        /*
        HTML Imports styling the main document are deprecated in Chrome
        https://crbug.com/523952
    
        If this element is not in the main document, then it must be in an HTML Import document.
        In that case, move the custom style to the main document.
    
        The ordering of `<custom-style>` should stay the same as when loaded by HTML Imports, but there may be odd
        cases of ordering w.r.t the main document styles.
        */
        if (this.ownerDocument !== window.document) {
            window.document.head.appendChild(this);
        }
        return this._style;
    };
    return CustomStyle;
}(HTMLElement));
window.customElements.define('custom-style', CustomStyle);
var $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = "<custom-style>\n  <style>\n    html {\n      /* Base (background) */\n      --lumo-base-color: #FFF;\n\n      /* Tint */\n      --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);\n      --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);\n      --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);\n      --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);\n      --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);\n      --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);\n      --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);\n      --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);\n      --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);\n      --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);\n      --lumo-tint: #FFF;\n\n      /* Shade */\n      --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);\n      --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);\n      --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);\n      --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);\n      --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);\n      --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);\n      --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);\n      --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);\n      --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);\n      --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);\n      --lumo-shade: hsl(214, 35%, 15%);\n\n      /* Contrast */\n      --lumo-contrast-5pct: var(--lumo-shade-5pct);\n      --lumo-contrast-10pct: var(--lumo-shade-10pct);\n      --lumo-contrast-20pct: var(--lumo-shade-20pct);\n      --lumo-contrast-30pct: var(--lumo-shade-30pct);\n      --lumo-contrast-40pct: var(--lumo-shade-40pct);\n      --lumo-contrast-50pct: var(--lumo-shade-50pct);\n      --lumo-contrast-60pct: var(--lumo-shade-60pct);\n      --lumo-contrast-70pct: var(--lumo-shade-70pct);\n      --lumo-contrast-80pct: var(--lumo-shade-80pct);\n      --lumo-contrast-90pct: var(--lumo-shade-90pct);\n      --lumo-contrast: var(--lumo-shade);\n\n      /* Text */\n      --lumo-header-text-color: var(--lumo-contrast);\n      --lumo-body-text-color: var(--lumo-contrast-90pct);\n      --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n      --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n      --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n      /* Primary */\n      --lumo-primary-color: hsl(214, 90%, 52%);\n      --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);\n      --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);\n      --lumo-primary-text-color: var(--lumo-primary-color);\n      --lumo-primary-contrast-color: #FFF;\n\n      /* Error */\n      --lumo-error-color: hsl(3, 100%, 61%);\n      --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);\n      --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);\n      --lumo-error-text-color: hsl(3, 92%, 53%);\n      --lumo-error-contrast-color: #FFF;\n\n      /* Success */\n      --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */\n      --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);\n      --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);\n      --lumo-success-text-color: hsl(145, 100%, 32%);\n      --lumo-success-contrast-color: #FFF;\n    }\n  </style>\n</custom-style><dom-module id=\"lumo-color\">\n  <template>\n    <style>\n      [theme~=\"dark\"] {\n        /* Base (background) */\n        --lumo-base-color: hsl(214, 35%, 21%);\n\n        /* Tint */\n        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);\n        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);\n        --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);\n        --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);\n        --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);\n        --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);\n        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);\n        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);\n        --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);\n        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);\n        --lumo-tint: hsl(214, 100%, 98%);\n\n        /* Shade */\n        --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);\n        --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);\n        --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);\n        --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);\n        --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);\n        --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);\n        --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);\n        --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);\n        --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);\n        --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);\n        --lumo-shade: hsl(214, 33%, 13%);\n\n        /* Contrast */\n        --lumo-contrast-5pct: var(--lumo-tint-5pct);\n        --lumo-contrast-10pct: var(--lumo-tint-10pct);\n        --lumo-contrast-20pct: var(--lumo-tint-20pct);\n        --lumo-contrast-30pct: var(--lumo-tint-30pct);\n        --lumo-contrast-40pct: var(--lumo-tint-40pct);\n        --lumo-contrast-50pct: var(--lumo-tint-50pct);\n        --lumo-contrast-60pct: var(--lumo-tint-60pct);\n        --lumo-contrast-70pct: var(--lumo-tint-70pct);\n        --lumo-contrast-80pct: var(--lumo-tint-80pct);\n        --lumo-contrast-90pct: var(--lumo-tint-90pct);\n        --lumo-contrast: var(--lumo-tint);\n\n        /* Text */\n        --lumo-header-text-color: var(--lumo-contrast);\n        --lumo-body-text-color: var(--lumo-contrast-90pct);\n        --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n        --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n        --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n        /* Primary */\n        --lumo-primary-color: hsl(214, 86%, 55%);\n        --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);\n        --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);\n        --lumo-primary-text-color: hsl(214, 100%, 70%);\n        --lumo-primary-contrast-color: #FFF;\n\n        /* Error */\n        --lumo-error-color: hsl(3, 90%, 63%);\n        --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);\n        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);\n        --lumo-error-text-color: hsl(3, 100%, 67%);\n\n        /* Success */\n        --lumo-success-color: hsl(145, 65%, 42%);\n        --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);\n        --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);\n        --lumo-success-text-color: hsl(145, 85%, 47%);\n      }\n\n      html {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      [theme~=\"dark\"] {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        color: var(--lumo-header-text-color);\n      }\n\n      a {\n        color: var(--lumo-primary-text-color);\n      }\n\n      blockquote {\n        color: var(--lumo-secondary-text-color);\n      }\n\n      code,\n      pre {\n        background-color: var(--lumo-contrast-10pct);\n        border-radius: var(--lumo-border-radius-m);\n      }\n    </style>\n  </template>\n</dom-module><dom-module id=\"lumo-color-legacy\">\n  <template>\n    <style include=\"lumo-color\">\n      :host {\n        color: var(--lumo-body-text-color) !important;\n        background-color: var(--lumo-base-color) !important;\n      }\n    </style>\n  </template>\n</dom-module>";
document.head.appendChild($_documentContainer.content);
var $_documentContainer$1 = document.createElement('template');
$_documentContainer$1.innerHTML = "<custom-style>\n  <style>\n    html {\n      --lumo-size-xs: 1.625rem;\n      --lumo-size-s: 1.875rem;\n      --lumo-size-m: 2.25rem;\n      --lumo-size-l: 2.75rem;\n      --lumo-size-xl: 3.5rem;\n\n      /* Icons */\n      --lumo-icon-size-s: 1.25em;\n      --lumo-icon-size-m: 1.5em;\n      --lumo-icon-size-l: 2.25em;\n      /* For backwards compatibility */\n      --lumo-icon-size: var(--lumo-icon-size-m);\n    }\n  </style>\n</custom-style>";
document.head.appendChild($_documentContainer$1.content);
var $_documentContainer$2 = document.createElement('template');
$_documentContainer$2.innerHTML = "<custom-style>\n  <style>\n    html {\n      /* Square */\n      --lumo-space-xs: 0.25rem;\n      --lumo-space-s: 0.5rem;\n      --lumo-space-m: 1rem;\n      --lumo-space-l: 1.5rem;\n      --lumo-space-xl: 2.5rem;\n\n      /* Wide */\n      --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);\n      --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);\n      --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);\n      --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);\n      --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);\n\n      /* Tall */\n      --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);\n      --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);\n      --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);\n      --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);\n      --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);\n    }\n  </style>\n</custom-style>";
document.head.appendChild($_documentContainer$2.content);
var $_documentContainer$3 = document.createElement('template');
$_documentContainer$3.innerHTML = "<custom-style>\n  <style>\n    html {\n      /* Border radius */\n      --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */\n      --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */\n      --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */\n      --lumo-border-radius: 0.25em; /* Deprecated */\n\n      /* Shadow */\n      --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);\n      --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);\n      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);\n      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);\n      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);\n\n      /* Clickable element cursor */\n      --lumo-clickable-cursor: default;\n    }\n  </style>\n</custom-style>";
document.head.appendChild($_documentContainer$3.content);
var $_documentContainer$4 = document.createElement('template');
$_documentContainer$4.innerHTML = "<custom-style>\n  <style>\n    html {\n      /* Font families */\n      --lumo-font-family: -apple-system, BlinkMacSystemFont, \"Roboto\", \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n\n      /* Font sizes */\n      --lumo-font-size-xxs: .75rem;\n      --lumo-font-size-xs: .8125rem;\n      --lumo-font-size-s: .875rem;\n      --lumo-font-size-m: 1rem;\n      --lumo-font-size-l: 1.125rem;\n      --lumo-font-size-xl: 1.375rem;\n      --lumo-font-size-xxl: 1.75rem;\n      --lumo-font-size-xxxl: 2.5rem;\n\n      /* Line heights */\n      --lumo-line-height-xs: 1.25;\n      --lumo-line-height-s: 1.375;\n      --lumo-line-height-m: 1.625;\n    }\n\n  </style>\n</custom-style><dom-module id=\"lumo-typography\">\n  <template>\n    <style>\n      html {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      /* Can\u2019t combine with the above selector because that doesn\u2019t work in browsers without native shadow dom */\n      :host {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      small,\n      [theme~=\"font-size-s\"] {\n        font-size: var(--lumo-font-size-s);\n        line-height: var(--lumo-line-height-s);\n      }\n\n      [theme~=\"font-size-xs\"] {\n        font-size: var(--lumo-font-size-xs);\n        line-height: var(--lumo-line-height-xs);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-weight: 600;\n        line-height: var(--lumo-line-height-xs);\n        margin-top: 1.25em;\n      }\n\n      h1 {\n        font-size: var(--lumo-font-size-xxxl);\n        margin-bottom: 0.75em;\n      }\n\n      h2 {\n        font-size: var(--lumo-font-size-xxl);\n        margin-bottom: 0.5em;\n      }\n\n      h3 {\n        font-size: var(--lumo-font-size-xl);\n        margin-bottom: 0.5em;\n      }\n\n      h4 {\n        font-size: var(--lumo-font-size-l);\n        margin-bottom: 0.5em;\n      }\n\n      h5 {\n        font-size: var(--lumo-font-size-m);\n        margin-bottom: 0.25em;\n      }\n\n      h6 {\n        font-size: var(--lumo-font-size-xs);\n        margin-bottom: 0;\n        text-transform: uppercase;\n        letter-spacing: 0.03em;\n      }\n\n      p,\n      blockquote {\n        margin-top: 0.5em;\n        margin-bottom: 0.75em;\n      }\n\n      a {\n        text-decoration: none;\n      }\n\n      a:hover {\n        text-decoration: underline;\n      }\n\n      hr {\n        display: block;\n        align-self: stretch;\n        height: 1px;\n        border: 0;\n        padding: 0;\n        margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);\n        background-color: var(--lumo-contrast-10pct);\n      }\n\n      blockquote {\n        border-left: 2px solid var(--lumo-contrast-30pct);\n      }\n\n      b,\n      strong {\n        font-weight: 600;\n      }\n\n      /* RTL specific styles */\n\n      blockquote[dir=\"rtl\"] {\n        border-left: none;\n        border-right: 2px solid var(--lumo-contrast-30pct);\n      }\n\n    </style>\n  </template>\n</dom-module>";
document.head.appendChild($_documentContainer$4.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Class representing a static string value which can be used to filter
 * strings by asseting that they have been created via this class. The
 * `value` property returns the string passed to the constructor.
 */
var LiteralString = /** @class */ (function () {
    function LiteralString(string) {
        /** @type {string} */
        this.value = string.toString();
    }
    /**
     * @return {string} LiteralString string value
     * @override
     */
    LiteralString.prototype.toString = function () {
        return this.value;
    };
    return LiteralString;
}());
/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */
function literalValue(value) {
    if (value instanceof LiteralString) {
        return /** @type {!LiteralString} */ (value).value;
    }
    else {
        throw new Error("non-literal value passed to Polymer's htmlLiteral function: " + value);
    }
}
/**
 * @param {*} value Object to stringify into HTML
 * @return {string} HTML stringified form of `obj`
 */
function htmlValue(value) {
    if (value instanceof HTMLTemplateElement) {
        return /** @type {!HTMLTemplateElement } */ (value).innerHTML;
    }
    else if (value instanceof LiteralString) {
        return literalValue(value);
    }
    else {
        throw new Error("non-template value passed to Polymer's html function: " + value);
    }
}
/**
 * A template literal tag that creates an HTML <template> element from the
 * contents of the string.
 *
 * This allows you to write a Polymer Template in JavaScript.
 *
 * Templates can be composed by interpolating `HTMLTemplateElement`s in
 * expressions in the JavaScript template literal. The nested template's
 * `innerHTML` is included in the containing template.  The only other
 * values allowed in expressions are those returned from `htmlLiteral`
 * which ensures only literal values from JS source ever reach the HTML, to
 * guard against XSS risks.
 *
 * All other values are disallowed in expressions to help prevent XSS
 * attacks; however, `htmlLiteral` can be used to compose static
 * string values into templates. This is useful to compose strings into
 * places that do not accept html, like the css text of a `style`
 * element.
 *
 * Example:
 *
 *     static get template() {
 *       return html`
 *         <style>:host{ content:"..." }</style>
 *         <div class="shadowed">${this.partialTemplate}</div>
 *         ${super.template}
 *       `;
 *     }
 *     static get partialTemplate() { return html`<span>Partial!</span>`; }
 *
 * @param {!ITemplateArray} strings Constant parts of tagged template literal
 * @param {...*} values Variable parts of tagged template literal
 * @return {!HTMLTemplateElement} Constructed HTMLTemplateElement
 */
var html = function html(strings) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    var template = /** @type {!HTMLTemplateElement} */ (document.createElement('template'));
    template.innerHTML = values.reduce(function (acc, v, idx) {
        return acc + htmlValue(v) + strings[idx + 1];
    }, strings[0]);
    return template;
};
var $_documentContainer$5 = html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<dom-module id=\"lumo-button\" theme-for=\"vaadin-button\">\n  <template>\n    <style>\n      :host {\n        /* Sizing */\n        --lumo-button-size: var(--lumo-size-m);\n        min-width: calc(var(--lumo-button-size) * 2);\n        height: var(--lumo-button-size);\n        padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius) / 2);\n        margin: var(--lumo-space-xs) 0;\n        box-sizing: border-box;\n        /* Style */\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size-m);\n        font-weight: 500;\n        color: var(--_lumo-button-color, var(--lumo-primary-text-color));\n        background-color: var(--_lumo-button-background-color, var(--lumo-contrast-5pct));\n        border-radius: var(--lumo-border-radius);\n        cursor: default;\n        -webkit-tap-highlight-color: transparent;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      /* Set only for the internal parts so we don\u2019t affect the host vertical alignment */\n      [part=\"label\"],\n      [part=\"prefix\"],\n      [part=\"suffix\"] {\n        line-height: var(--lumo-line-height-xs);\n      }\n\n      [part=\"label\"] {\n        padding: calc(var(--lumo-button-size) / 6) 0;\n      }\n\n      :host([theme~=\"small\"]) {\n        font-size: var(--lumo-font-size-s);\n        --lumo-button-size: var(--lumo-size-s);\n      }\n\n      :host([theme~=\"large\"]) {\n        font-size: var(--lumo-font-size-l);\n        --lumo-button-size: var(--lumo-size-l);\n      }\n\n      /* This needs to be the last selector for it to take priority */\n      :host([disabled][disabled]) {\n        pointer-events: none;\n        color: var(--lumo-disabled-text-color);\n        background-color: var(--lumo-contrast-5pct);\n      }\n\n      /* For interaction states */\n      :host::before,\n      :host::after {\n        content: \"\";\n        /* We rely on the host always being relative */\n        position: absolute;\n        z-index: 1;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background-color: currentColor;\n        border-radius: inherit;\n        opacity: 0;\n        transition: opacity 0.2s;\n        pointer-events: none;\n      }\n\n      /* Hover */\n\n      :host(:hover)::before {\n        opacity: 0.05;\n      }\n\n      /* Disable hover for touch devices */\n      @media (pointer: coarse) {\n        :host(:not([active]):hover)::before {\n          opacity: 0;\n        }\n      }\n\n      /* Active */\n\n      :host::after {\n        transition: opacity 1.4s, transform 0.1s;\n        filter: blur(8px);\n      }\n\n      :host([active])::before {\n        opacity: 0.1;\n        transition-duration: 0s;\n      }\n\n      :host([active])::after {\n        opacity: 0.1;\n        transition-duration: 0s, 0s;\n        transform: scale(0);\n      }\n\n      /* Keyboard focus */\n\n      :host([focus-ring]) {\n        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);\n      }\n\n      /* Types (primary, tertiary, tertiary-inline */\n\n      :host([theme~=\"tertiary\"]),\n      :host([theme~=\"tertiary-inline\"]) {\n        background-color: transparent !important;\n        transition: opacity 0.2s;\n        min-width: 0;\n      }\n\n      :host([theme~=\"tertiary\"])::before,\n      :host([theme~=\"tertiary-inline\"])::before {\n        display: none;\n      }\n\n      :host([theme~=\"tertiary\"]) {\n        padding: 0 calc(var(--lumo-button-size) / 6);\n      }\n\n      @media (hover: hover) {\n        :host([theme*=\"tertiary\"]:not([active]):hover) {\n          opacity: 0.8;\n        }\n      }\n\n      :host([theme~=\"tertiary\"][active]),\n      :host([theme~=\"tertiary-inline\"][active]) {\n        opacity: 0.5;\n        transition-duration: 0s;\n      }\n\n      :host([theme~=\"tertiary-inline\"]) {\n        margin: 0;\n        height: auto;\n        padding: 0;\n        line-height: inherit;\n        font-size: inherit;\n      }\n\n      :host([theme~=\"tertiary-inline\"]) [part=\"label\"] {\n        padding: 0;\n        overflow: visible;\n        line-height: inherit;\n      }\n\n      :host([theme~=\"primary\"]) {\n        background-color: var(--_lumo-button-primary-background-color, var(--lumo-primary-color));\n        color: var(--_lumo-button-primary-color, var(--lumo-primary-contrast-color));\n        font-weight: 600;\n        min-width: calc(var(--lumo-button-size) * 2.5);\n      }\n\n      :host([theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-primary-color-50pct);\n        color: var(--lumo-primary-contrast-color);\n      }\n\n      :host([theme~=\"primary\"]:hover)::before {\n        opacity: 0.1;\n      }\n\n      :host([theme~=\"primary\"][active])::before {\n        background-color: var(--lumo-shade-20pct);\n      }\n\n      @media (pointer: coarse) {\n        :host([theme~=\"primary\"][active])::before {\n          background-color: var(--lumo-shade-60pct);\n        }\n\n        :host([theme~=\"primary\"]:not([active]):hover)::before {\n          opacity: 0;\n        }\n      }\n\n      :host([theme~=\"primary\"][active])::after {\n        opacity: 0.2;\n      }\n\n      /* Colors (success, error, contrast) */\n\n      :host([theme~=\"success\"]) {\n        color: var(--lumo-success-text-color);\n      }\n\n      :host([theme~=\"success\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-success-color);\n        color: var(--lumo-success-contrast-color);\n      }\n\n      :host([theme~=\"success\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-success-color-50pct);\n      }\n\n      :host([theme~=\"error\"]) {\n        color: var(--lumo-error-text-color);\n      }\n\n      :host([theme~=\"error\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-error-color);\n        color: var(--lumo-error-contrast-color);\n      }\n\n      :host([theme~=\"error\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-error-color-50pct);\n      }\n\n      :host([theme~=\"contrast\"]) {\n        color: var(--lumo-contrast);\n      }\n\n      :host([theme~=\"contrast\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-contrast);\n        color: var(--lumo-base-color);\n      }\n\n      :host([theme~=\"contrast\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-contrast-50pct);\n      }\n\n      /* Icons */\n\n      [part] ::slotted(iron-icon) {\n        display: inline-block;\n        width: var(--lumo-icon-size-m);\n        height: var(--lumo-icon-size-m);\n      }\n\n      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */\n      [part] ::slotted(iron-icon[icon^=\"vaadin:\"]) {\n        padding: 0.25em;\n        box-sizing: border-box !important;\n      }\n\n      [part=\"prefix\"] {\n        margin-left: -0.25em;\n        margin-right: 0.25em;\n      }\n\n      [part=\"suffix\"] {\n        margin-left: 0.25em;\n        margin-right: -0.25em;\n      }\n\n      /* Icon-only */\n\n      :host([theme~=\"icon\"]:not([theme~=\"tertiary-inline\"])) {\n        min-width: var(--lumo-button-size);\n        padding-left: calc(var(--lumo-button-size) / 4);\n        padding-right: calc(var(--lumo-button-size) / 4);\n      }\n\n      :host([theme~=\"icon\"]) [part=\"prefix\"],\n      :host([theme~=\"icon\"]) [part=\"suffix\"] {\n        margin-left: 0;\n        margin-right: 0;\n      }\n    </style>\n  </template>\n</dom-module>"], ["<dom-module id=\"lumo-button\" theme-for=\"vaadin-button\">\n  <template>\n    <style>\n      :host {\n        /* Sizing */\n        --lumo-button-size: var(--lumo-size-m);\n        min-width: calc(var(--lumo-button-size) * 2);\n        height: var(--lumo-button-size);\n        padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius) / 2);\n        margin: var(--lumo-space-xs) 0;\n        box-sizing: border-box;\n        /* Style */\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size-m);\n        font-weight: 500;\n        color: var(--_lumo-button-color, var(--lumo-primary-text-color));\n        background-color: var(--_lumo-button-background-color, var(--lumo-contrast-5pct));\n        border-radius: var(--lumo-border-radius);\n        cursor: default;\n        -webkit-tap-highlight-color: transparent;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      /* Set only for the internal parts so we don\u2019t affect the host vertical alignment */\n      [part=\"label\"],\n      [part=\"prefix\"],\n      [part=\"suffix\"] {\n        line-height: var(--lumo-line-height-xs);\n      }\n\n      [part=\"label\"] {\n        padding: calc(var(--lumo-button-size) / 6) 0;\n      }\n\n      :host([theme~=\"small\"]) {\n        font-size: var(--lumo-font-size-s);\n        --lumo-button-size: var(--lumo-size-s);\n      }\n\n      :host([theme~=\"large\"]) {\n        font-size: var(--lumo-font-size-l);\n        --lumo-button-size: var(--lumo-size-l);\n      }\n\n      /* This needs to be the last selector for it to take priority */\n      :host([disabled][disabled]) {\n        pointer-events: none;\n        color: var(--lumo-disabled-text-color);\n        background-color: var(--lumo-contrast-5pct);\n      }\n\n      /* For interaction states */\n      :host::before,\n      :host::after {\n        content: \"\";\n        /* We rely on the host always being relative */\n        position: absolute;\n        z-index: 1;\n        top: 0;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background-color: currentColor;\n        border-radius: inherit;\n        opacity: 0;\n        transition: opacity 0.2s;\n        pointer-events: none;\n      }\n\n      /* Hover */\n\n      :host(:hover)::before {\n        opacity: 0.05;\n      }\n\n      /* Disable hover for touch devices */\n      @media (pointer: coarse) {\n        :host(:not([active]):hover)::before {\n          opacity: 0;\n        }\n      }\n\n      /* Active */\n\n      :host::after {\n        transition: opacity 1.4s, transform 0.1s;\n        filter: blur(8px);\n      }\n\n      :host([active])::before {\n        opacity: 0.1;\n        transition-duration: 0s;\n      }\n\n      :host([active])::after {\n        opacity: 0.1;\n        transition-duration: 0s, 0s;\n        transform: scale(0);\n      }\n\n      /* Keyboard focus */\n\n      :host([focus-ring]) {\n        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);\n      }\n\n      /* Types (primary, tertiary, tertiary-inline */\n\n      :host([theme~=\"tertiary\"]),\n      :host([theme~=\"tertiary-inline\"]) {\n        background-color: transparent !important;\n        transition: opacity 0.2s;\n        min-width: 0;\n      }\n\n      :host([theme~=\"tertiary\"])::before,\n      :host([theme~=\"tertiary-inline\"])::before {\n        display: none;\n      }\n\n      :host([theme~=\"tertiary\"]) {\n        padding: 0 calc(var(--lumo-button-size) / 6);\n      }\n\n      @media (hover: hover) {\n        :host([theme*=\"tertiary\"]:not([active]):hover) {\n          opacity: 0.8;\n        }\n      }\n\n      :host([theme~=\"tertiary\"][active]),\n      :host([theme~=\"tertiary-inline\"][active]) {\n        opacity: 0.5;\n        transition-duration: 0s;\n      }\n\n      :host([theme~=\"tertiary-inline\"]) {\n        margin: 0;\n        height: auto;\n        padding: 0;\n        line-height: inherit;\n        font-size: inherit;\n      }\n\n      :host([theme~=\"tertiary-inline\"]) [part=\"label\"] {\n        padding: 0;\n        overflow: visible;\n        line-height: inherit;\n      }\n\n      :host([theme~=\"primary\"]) {\n        background-color: var(--_lumo-button-primary-background-color, var(--lumo-primary-color));\n        color: var(--_lumo-button-primary-color, var(--lumo-primary-contrast-color));\n        font-weight: 600;\n        min-width: calc(var(--lumo-button-size) * 2.5);\n      }\n\n      :host([theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-primary-color-50pct);\n        color: var(--lumo-primary-contrast-color);\n      }\n\n      :host([theme~=\"primary\"]:hover)::before {\n        opacity: 0.1;\n      }\n\n      :host([theme~=\"primary\"][active])::before {\n        background-color: var(--lumo-shade-20pct);\n      }\n\n      @media (pointer: coarse) {\n        :host([theme~=\"primary\"][active])::before {\n          background-color: var(--lumo-shade-60pct);\n        }\n\n        :host([theme~=\"primary\"]:not([active]):hover)::before {\n          opacity: 0;\n        }\n      }\n\n      :host([theme~=\"primary\"][active])::after {\n        opacity: 0.2;\n      }\n\n      /* Colors (success, error, contrast) */\n\n      :host([theme~=\"success\"]) {\n        color: var(--lumo-success-text-color);\n      }\n\n      :host([theme~=\"success\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-success-color);\n        color: var(--lumo-success-contrast-color);\n      }\n\n      :host([theme~=\"success\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-success-color-50pct);\n      }\n\n      :host([theme~=\"error\"]) {\n        color: var(--lumo-error-text-color);\n      }\n\n      :host([theme~=\"error\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-error-color);\n        color: var(--lumo-error-contrast-color);\n      }\n\n      :host([theme~=\"error\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-error-color-50pct);\n      }\n\n      :host([theme~=\"contrast\"]) {\n        color: var(--lumo-contrast);\n      }\n\n      :host([theme~=\"contrast\"][theme~=\"primary\"]) {\n        background-color: var(--lumo-contrast);\n        color: var(--lumo-base-color);\n      }\n\n      :host([theme~=\"contrast\"][theme~=\"primary\"][disabled]) {\n        background-color: var(--lumo-contrast-50pct);\n      }\n\n      /* Icons */\n\n      [part] ::slotted(iron-icon) {\n        display: inline-block;\n        width: var(--lumo-icon-size-m);\n        height: var(--lumo-icon-size-m);\n      }\n\n      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */\n      [part] ::slotted(iron-icon[icon^=\"vaadin:\"]) {\n        padding: 0.25em;\n        box-sizing: border-box !important;\n      }\n\n      [part=\"prefix\"] {\n        margin-left: -0.25em;\n        margin-right: 0.25em;\n      }\n\n      [part=\"suffix\"] {\n        margin-left: 0.25em;\n        margin-right: -0.25em;\n      }\n\n      /* Icon-only */\n\n      :host([theme~=\"icon\"]:not([theme~=\"tertiary-inline\"])) {\n        min-width: var(--lumo-button-size);\n        padding-left: calc(var(--lumo-button-size) / 4);\n        padding-right: calc(var(--lumo-button-size) / 4);\n      }\n\n      :host([theme~=\"icon\"]) [part=\"prefix\"],\n      :host([theme~=\"icon\"]) [part=\"suffix\"] {\n        margin-left: 0;\n        margin-right: 0;\n      }\n    </style>\n  </template>\n</dom-module>"])));
document.head.appendChild($_documentContainer$5.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// unique global id for deduping mixins.
var dedupeId = 0;
/* eslint-disable valid-jsdoc */
/**
 * Wraps an ES6 class expression mixin such that the mixin is only applied
 * if it has not already been applied its base argument. Also memoizes mixin
 * applications.
 *
 * @template T
 * @param {T} mixin ES6 class expression mixin to wrap
 * @return {T}
 * @suppress {invalidCasts}
 */
var dedupingMixin = function (mixin) {
    var mixinApplications = /** @type {!MixinFunction} */ (mixin).__mixinApplications;
    if (!mixinApplications) {
        mixinApplications = new WeakMap();
        /** @type {!MixinFunction} */ (mixin).__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    var mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
        var baseSet = /** @type {!MixinFunction} */ (base).__mixinSet;
        if (baseSet && baseSet[mixinDedupeId]) {
            return base;
        }
        var map = mixinApplications;
        var extended = map.get(base);
        if (!extended) {
            extended = /** @type {!Function} */ (mixin)(base);
            map.set(base, extended);
        }
        // copy inherited mixin set from the extended class, or the base class
        // NOTE: we avoid use of Set here because some browser (IE11)
        // cannot extend a base Set via the constructor.
        var mixinSet = Object.create(/** @type {!MixinFunction} */ (extended).__mixinSet || baseSet || null);
        mixinSet[mixinDedupeId] = true;
        /** @type {!MixinFunction} */ (extended).__mixinSet = mixinSet;
        return extended;
    }
    return dedupingMixin;
};
/* eslint-enable valid-jsdoc */
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/* eslint-disable valid-jsdoc */
/**
 * Node wrapper to ensure ShadowDOM safe operation regardless of polyfill
 * presence or mode. Note that with the introduction of `ShadyDOM.noPatch`,
 * a node wrapper must be used to access ShadowDOM API.
 * This is similar to using `Polymer.dom` but relies exclusively
 * on the presence of the ShadyDOM polyfill rather than requiring the loading
 * of legacy (Polymer.dom) API.
 * @type {function(Node):Node}
 */
var wrap = (window['ShadyDOM'] && window['ShadyDOM']['noPatch'] && window['ShadyDOM']['wrap']) ?
    window['ShadyDOM']['wrap'] :
    (window['ShadyDOM'] ? function (n) { return ShadyDOM['patch'](n); } : function (n) { return n; });
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Module with utilities for manipulating structured data path strings.
 *
 * @summary Module with utilities for manipulating structured data path strings.
 */
/**
 * Returns true if the given string is a structured data path (has dots).
 *
 * Example:
 *
 * ```
 * isPath('foo.bar.baz') // true
 * isPath('foo')         // false
 * ```
 *
 * @param {string} path Path string
 * @return {boolean} True if the string contained one or more dots
 */
function isPath(path) {
    return path.indexOf('.') >= 0;
}
/**
 * Returns the root property name for the given path.
 *
 * Example:
 *
 * ```
 * root('foo.bar.baz') // 'foo'
 * root('foo')         // 'foo'
 * ```
 *
 * @param {string} path Path string
 * @return {string} Root property name
 */
function root(path) {
    var dotIndex = path.indexOf('.');
    if (dotIndex === -1) {
        return path;
    }
    return path.slice(0, dotIndex);
}
/**
 * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
 * Returns true if the given path is an ancestor of the base path.
 *
 * Example:
 *
 * ```
 * isAncestor('foo.bar', 'foo')         // true
 * isAncestor('foo.bar', 'foo.bar')     // false
 * isAncestor('foo.bar', 'foo.bar.baz') // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is an ancestor of `base`.
 */
function isAncestor(base, path) {
    //     base.startsWith(path + '.');
    return base.indexOf(path + '.') === 0;
}
/**
 * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
 *
 * Example:
 *
 * ```
 * isDescendant('foo.bar', 'foo.bar.baz') // true
 * isDescendant('foo.bar', 'foo.bar')     // false
 * isDescendant('foo.bar', 'foo')         // false
 * ```
 *
 * @param {string} base Path string to test against.
 * @param {string} path Path string to test.
 * @return {boolean} True if `path` is a descendant of `base`.
 */
function isDescendant(base, path) {
    //     path.startsWith(base + '.');
    return path.indexOf(base + '.') === 0;
}
/**
 * Replaces a previous base path with a new base path, preserving the
 * remainder of the path.
 *
 * User must ensure `path` has a prefix of `base`.
 *
 * Example:
 *
 * ```
 * translate('foo.bar', 'zot', 'foo.bar.baz') // 'zot.baz'
 * ```
 *
 * @param {string} base Current base string to remove
 * @param {string} newBase New base string to replace with
 * @param {string} path Path to translate
 * @return {string} Translated string
 */
function translate(base, newBase, path) {
    return newBase + path.slice(base.length);
}
/**
 * Converts array-based paths to flattened path.  String-based paths
 * are returned as-is.
 *
 * Example:
 *
 * ```
 * normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
 * normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {string} Flattened path
 */
function normalize(path) {
    if (Array.isArray(path)) {
        var parts = [];
        for (var i = 0; i < path.length; i++) {
            var args = path[i].toString().split('.');
            for (var j = 0; j < args.length; j++) {
                parts.push(args[j]);
            }
        }
        return parts.join('.');
    }
    else {
        return path;
    }
}
/**
 * Splits a path into an array of property names. Accepts either arrays
 * of path parts or strings.
 *
 * Example:
 *
 * ```
 * split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
 * split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
 * ```
 *
 * @param {string | !Array<string|number>} path Input path
 * @return {!Array<string>} Array of path parts
 * @suppress {checkTypes}
 */
function split(path) {
    if (Array.isArray(path)) {
        return normalize(path).split('.');
    }
    return path.toString().split('.');
}
/**
 * Reads a value from a path.  If any sub-property in the path is `undefined`,
 * this method returns `undefined` (will never throw.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to read
 * @param {Object=} info If an object is provided to `info`, the normalized
 *  (flattened) path will be set to `info.path`.
 * @return {*} Value at path, or `undefined` if the path could not be
 *  fully dereferenced.
 */
function get(root, path, info) {
    var prop = root;
    var parts = split(path);
    // Loop over path parts[0..n-1] and dereference
    for (var i = 0; i < parts.length; i++) {
        if (!prop) {
            return;
        }
        var part = parts[i];
        prop = prop[part];
    }
    if (info) {
        info.path = parts.join('.');
    }
    return prop;
}
/**
 * Sets a value to a path.  If any sub-property in the path is `undefined`,
 * this method will no-op.
 *
 * @param {Object} root Object from which to dereference path from
 * @param {string | !Array<string|number>} path Path to set
 * @param {*} value Value to set to path
 * @return {string | undefined} The normalized version of the input path
 */
function set(root, path, value) {
    var prop = root;
    var parts = split(path);
    var last = parts[parts.length - 1];
    if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (var i = 0; i < parts.length - 1; i++) {
            var part = parts[i];
            prop = prop[part];
            if (!prop) {
                return;
            }
        }
        // Set value to object at end of path
        prop[last] = value;
    }
    else {
        // Simple property set
        prop[path] = value;
    }
    return parts.join('.');
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var caseMap = {};
var DASH_TO_CAMEL = /-[a-z]/g;
var CAMEL_TO_DASH = /([A-Z])/g;
/**
 * @fileoverview Module with utilities for converting between "dash-case" and
 * "camelCase" identifiers.
 */
/**
 * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
 * (e.g. `fooBarBaz`).
 *
 * @param {string} dash Dash-case identifier
 * @return {string} Camel-case representation of the identifier
 */
function dashToCamelCase(dash) {
    return caseMap[dash] || (caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL, function (m) { return m[1].toUpperCase(); }));
}
/**
 * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
 * (e.g. `foo-bar-baz`).
 *
 * @param {string} camel Camel-case identifier
 * @return {string} Dash-case representation of the identifier
 */
function camelToDashCase(camel) {
    return caseMap[camel] || (caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase());
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// Microtask implemented using Mutation Observer
var microtaskCurrHandle = 0;
var microtaskLastHandle = 0;
var microtaskCallbacks = [];
var microtaskNodeContent = 0;
var microtaskNode = document.createTextNode('');
new window.MutationObserver(microtaskFlush).observe(microtaskNode, { characterData: true });
function microtaskFlush() {
    var len = microtaskCallbacks.length;
    for (var i = 0; i < len; i++) {
        var cb = microtaskCallbacks[i];
        if (cb) {
            try {
                cb();
            }
            catch (e) {
                setTimeout(function () { throw e; });
            }
        }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
}
/**
 * Async interface wrapper around `setTimeout`.
 *
 * @namespace
 * @summary Async interface wrapper around `setTimeout`.
 */
var timeOut = {
    /**
     * Returns a sub-module with the async interface providing the provided
     * delay.
     *
     * @memberof timeOut
     * @param {number=} delay Time to wait before calling callbacks in ms
     * @return {!AsyncInterface} An async timeout interface
     */
    after: function (delay) {
        return {
            run: function (fn) { return window.setTimeout(fn, delay); },
            cancel: function (handle) {
                window.clearTimeout(handle);
            }
        };
    },
    /**
     * Enqueues a function called in the next task.
     *
     * @memberof timeOut
     * @param {!Function} fn Callback to run
     * @param {number=} delay Delay in milliseconds
     * @return {number} Handle used for canceling task
     */
    run: function (fn, delay) {
        return window.setTimeout(fn, delay);
    },
    /**
     * Cancels a previously enqueued `timeOut` callback.
     *
     * @memberof timeOut
     * @param {number} handle Handle returned from `run` of callback to cancel
     * @return {void}
     */
    cancel: function (handle) {
        window.clearTimeout(handle);
    }
};
/**
 * Async interface wrapper around `requestIdleCallback`.  Falls back to
 * `setTimeout` on browsers that do not support `requestIdleCallback`.
 *
 * @namespace
 * @summary Async interface wrapper around `requestIdleCallback`.
 */
var idlePeriod = {
    /**
     * Enqueues a function called at `requestIdleCallback` timing.
     *
     * @memberof idlePeriod
     * @param {function(!IdleDeadline):void} fn Callback to run
     * @return {number} Handle used for canceling task
     */
    run: function (fn) {
        return window.requestIdleCallback ?
            window.requestIdleCallback(fn) :
            window.setTimeout(fn, 16);
    },
    /**
     * Cancels a previously enqueued `idlePeriod` callback.
     *
     * @memberof idlePeriod
     * @param {number} handle Handle returned from `run` of callback to cancel
     * @return {void}
     */
    cancel: function (handle) {
        window.cancelIdleCallback ?
            window.cancelIdleCallback(handle) :
            window.clearTimeout(handle);
    }
};
/**
 * Async interface for enqueuing callbacks that run at microtask timing.
 *
 * Note that microtask timing is achieved via a single `MutationObserver`,
 * and thus callbacks enqueued with this API will all run in a single
 * batch, and not interleaved with other microtasks such as promises.
 * Promises are avoided as an implementation choice for the time being
 * due to Safari bugs that cause Promises to lack microtask guarantees.
 *
 * @namespace
 * @summary Async interface for enqueuing callbacks that run at microtask
 *   timing.
 */
var microTask = {
    /**
     * Enqueues a function called at microtask timing.
     *
     * @memberof microTask
     * @param {!Function=} callback Callback to run
     * @return {number} Handle used for canceling task
     */
    run: function (callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
    },
    /**
     * Cancels a previously enqueued `microTask` callback.
     *
     * @memberof microTask
     * @param {number} handle Handle returned from `run` of callback to cancel
     * @return {void}
     */
    cancel: function (handle) {
        var idx = handle - microtaskLastHandle;
        if (idx >= 0) {
            if (!microtaskCallbacks[idx]) {
                throw new Error('invalid async handle: ' + handle);
            }
            microtaskCallbacks[idx] = null;
        }
    }
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/** @const {!AsyncInterface} */
var microtask = microTask;
/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin, call `MyClass.createProperties(props)`
 * once at class definition time to create property accessors for properties
 * named in props, implement `_propertiesChanged` to react as desired to
 * property changes, and implement `static get observedAttributes()` and
 * include lowercase versions of any property names that should be set from
 * attributes. Last, call `this._enableProperties()` in the element's
 * `connectedCallback` to enable the accessors.
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var PropertiesChanged = dedupingMixin(
/**
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
function (superClass) {
    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertiesChanged}
     * @unrestricted
     */
    var PropertiesChanged = /** @class */ (function (_super) {
        __extends(PropertiesChanged, _super);
        function PropertiesChanged() {
            var _this = _super.call(this) || this;
            /** @type {boolean} */
            _this.__dataEnabled = false;
            _this.__dataReady = false;
            _this.__dataInvalid = false;
            _this.__data = {};
            _this.__dataPending = null;
            _this.__dataOld = null;
            _this.__dataInstanceProps = null;
            _this.__serializing = false;
            _this._initializeProperties();
            return _this;
        }
        /**
         * Creates property accessors for the given property names.
         * @param {!Object} props Object whose keys are names of accessors.
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertiesChanged.createProperties = function (props) {
            var proto = this.prototype;
            for (var prop in props) {
                // don't stomp an existing accessor
                if (!(prop in proto)) {
                    proto._createPropertyAccessor(prop);
                }
            }
        };
        /**
         * Returns an attribute name that corresponds to the given property.
         * The attribute name is the lowercased property name. Override to
         * customize this mapping.
         * @param {string} property Property to convert
         * @return {string} Attribute name corresponding to the given property.
         *
         * @protected
         * @nocollapse
         */
        PropertiesChanged.attributeNameForProperty = function (property) {
            return property.toLowerCase();
        };
        /**
         * Override point to provide a type to which to deserialize a value to
         * a given property.
         * @param {string} name Name of property
         *
         * @protected
         * @nocollapse
         */
        PropertiesChanged.typeForProperty = function (name) { }; //eslint-disable-line no-unused-vars
        /**
         * Creates a setter/getter pair for the named property with its own
         * local storage.  The getter returns the value in the local storage,
         * and the setter calls `_setProperty`, which updates the local storage
         * for the property and enqueues a `_propertiesChanged` callback.
         *
         * This method may be called on a prototype or an instance.  Calling
         * this method may overwrite a property value that already exists on
         * the prototype/instance by creating the accessor.
         *
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created; the
         *   protected `_setProperty` function must be used to set the property
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._createPropertyAccessor = function (property, readOnly) {
            this._addPropertyToAttributeMap(property);
            if (!this.hasOwnProperty(JSCompiler_renameProperty('__dataHasAccessor', this))) {
                this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
            }
            if (!this.__dataHasAccessor[property]) {
                this.__dataHasAccessor[property] = true;
                this._definePropertyAccessor(property, readOnly);
            }
        };
        /**
         * Adds the given `property` to a map matching attribute names
         * to property names, using `attributeNameForProperty`. This map is
         * used when deserializing attribute values to properties.
         *
         * @param {string} property Name of the property
         * @override
         */
        PropertiesChanged.prototype._addPropertyToAttributeMap = function (property) {
            if (!this.hasOwnProperty(JSCompiler_renameProperty('__dataAttributes', this))) {
                this.__dataAttributes = Object.assign({}, this.__dataAttributes);
            }
            if (!this.__dataAttributes[property]) {
                var attr_1 = this.constructor.attributeNameForProperty(property);
                this.__dataAttributes[attr_1] = property;
            }
        };
        /**
         * Defines a property accessor for the given property.
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created
         * @return {void}
         * @override
         */
        PropertiesChanged.prototype._definePropertyAccessor = function (property, readOnly) {
            Object.defineProperty(this, property, {
                /* eslint-disable valid-jsdoc */
                /** @this {PropertiesChanged} */
                get: function () {
                    return this._getProperty(property);
                },
                /** @this {PropertiesChanged} */
                set: readOnly ? function () { } : function (value) {
                    this._setProperty(property, value);
                }
                /* eslint-enable */
            });
        };
        /**
         * Lifecycle callback called when properties are enabled via
         * `_enableProperties`.
         *
         * Users may override this function to implement behavior that is
         * dependent on the element having its property data initialized, e.g.
         * from defaults (initialized from `constructor`, `_initializeProperties`),
         * `attributeChangedCallback`, or values propagated from host e.g. via
         * bindings.  `super.ready()` must be called to ensure the data system
         * becomes enabled.
         *
         * @return {void}
         * @public
         * @override
         */
        PropertiesChanged.prototype.ready = function () {
            this.__dataReady = true;
            this._flushProperties();
        };
        /**
         * Initializes the local storage for property accessors.
         *
         * Provided as an override point for performing any setup work prior
         * to initializing the property accessor system.
         *
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._initializeProperties = function () {
            // Capture instance properties; these will be set into accessors
            // during first flush. Don't set them here, since we want
            // these to overwrite defaults/constructor assignments
            for (var p in this.__dataHasAccessor) {
                if (this.hasOwnProperty(p)) {
                    this.__dataInstanceProps = this.__dataInstanceProps || {};
                    this.__dataInstanceProps[p] = this[p];
                    delete this[p];
                }
            }
        };
        /**
         * Called at ready time with bag of instance properties that overwrote
         * accessors when the element upgraded.
         *
         * The default implementation sets these properties back into the
         * setter at ready time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._initializeInstanceProperties = function (props) {
            Object.assign(this, props);
        };
        /**
         * Updates the local storage for a property (via `_setPendingProperty`)
         * and enqueues a `_proeprtiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._setProperty = function (property, value) {
            if (this._setPendingProperty(property, value)) {
                this._invalidateProperties();
            }
        };
        /**
         * Returns the value for the given property.
         * @param {string} property Name of property
         * @return {*} Value for the given property
         * @protected
         * @override
         */
        PropertiesChanged.prototype._getProperty = function (property) {
            return this.__data[property];
        };
        /* eslint-disable no-unused-vars */
        /**
         * Updates the local storage for a property, records the previous value,
         * and adds it to the set of "pending changes" that will be passed to the
         * `_propertiesChanged` callback.  This method does not enqueue the
         * `_propertiesChanged` callback.
         *
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @param {boolean=} ext Not used here; affordance for closure
         * @return {boolean} Returns true if the property changed
         * @protected
         * @override
         */
        PropertiesChanged.prototype._setPendingProperty = function (property, value, ext) {
            var old = this.__data[property];
            var changed = this._shouldPropertyChange(property, value, old);
            if (changed) {
                if (!this.__dataPending) {
                    this.__dataPending = {};
                    this.__dataOld = {};
                }
                // Ensure old is captured from the last turn
                if (this.__dataOld && !(property in this.__dataOld)) {
                    this.__dataOld[property] = old;
                }
                this.__data[property] = value;
                this.__dataPending[property] = value;
            }
            return changed;
        };
        /* eslint-enable */
        /**
         * Marks the properties as invalid, and enqueues an async
         * `_propertiesChanged` callback.
         *
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._invalidateProperties = function () {
            var _this = this;
            if (!this.__dataInvalid && this.__dataReady) {
                this.__dataInvalid = true;
                microtask.run(function () {
                    if (_this.__dataInvalid) {
                        _this.__dataInvalid = false;
                        _this._flushProperties();
                    }
                });
            }
        };
        /**
         * Call to enable property accessor processing. Before this method is
         * called accessor values will be set but side effects are
         * queued. When called, any pending side effects occur immediately.
         * For elements, generally `connectedCallback` is a normal spot to do so.
         * It is safe to call this method multiple times as it only turns on
         * property accessors once.
         *
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._enableProperties = function () {
            if (!this.__dataEnabled) {
                this.__dataEnabled = true;
                if (this.__dataInstanceProps) {
                    this._initializeInstanceProperties(this.__dataInstanceProps);
                    this.__dataInstanceProps = null;
                }
                this.ready();
            }
        };
        /**
         * Calls the `_propertiesChanged` callback with the current set of
         * pending changes (and old values recorded when pending changes were
         * set), and resets the pending set of changes. Generally, this method
         * should not be called in user code.
         *
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._flushProperties = function () {
            var props = this.__data;
            var changedProps = this.__dataPending;
            var old = this.__dataOld;
            if (this._shouldPropertiesChange(props, changedProps, old)) {
                this.__dataPending = null;
                this.__dataOld = null;
                this._propertiesChanged(props, changedProps, old);
            }
        };
        /**
         * Called in `_flushProperties` to determine if `_propertiesChanged`
         * should be called. The default implementation returns true if
         * properties are pending. Override to customize when
         * `_propertiesChanged` is called.
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {?Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {?Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @return {boolean} true if changedProps is truthy
         * @override
         */
        PropertiesChanged.prototype._shouldPropertiesChange = function (currentProps, changedProps, oldProps) {
            return Boolean(changedProps);
        };
        /**
         * Callback called when any properties with accessors created via
         * `_createPropertyAccessor` have been set.
         *
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {?Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {?Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @return {void}
         * @protected
         * @override
         */
        PropertiesChanged.prototype._propertiesChanged = function (currentProps, changedProps, oldProps) {
        };
        /**
         * Method called to determine whether a property value should be
         * considered as a change and cause the `_propertiesChanged` callback
         * to be enqueued.
         *
         * The default implementation returns `true` if a strict equality
         * check fails. The method always returns false for `NaN`.
         *
         * Override this method to e.g. provide stricter checking for
         * Objects/Arrays when using immutable patterns.
         *
         * @param {string} property Property name
         * @param {*} value New property value
         * @param {*} old Previous property value
         * @return {boolean} Whether the property should be considered a change
         *   and enqueue a `_proeprtiesChanged` callback
         * @protected
         * @override
         */
        PropertiesChanged.prototype._shouldPropertyChange = function (property, value, old) {
            return (
            // Strict equality check
            (old !== value &&
                // This ensures (old==NaN, value==NaN) always returns false
                (old === old || value === value)));
        };
        /**
         * Implements native Custom Elements `attributeChangedCallback` to
         * set an attribute value to a property via `_attributeToProperty`.
         *
         * @param {string} name Name of attribute that changed
         * @param {?string} old Old attribute value
         * @param {?string} value New attribute value
         * @param {?string} namespace Attribute namespace.
         * @return {void}
         * @suppress {missingProperties} Super may or may not implement the callback
         * @override
         */
        PropertiesChanged.prototype.attributeChangedCallback = function (name, old, value, namespace) {
            if (old !== value) {
                this._attributeToProperty(name, value);
            }
            if (_super.prototype.attributeChangedCallback) {
                _super.prototype.attributeChangedCallback.call(this, name, old, value, namespace);
            }
        };
        /**
         * Deserializes an attribute to its associated property.
         *
         * This method calls the `_deserializeValue` method to convert the string to
         * a typed value.
         *
         * @param {string} attribute Name of attribute to deserialize.
         * @param {?string} value of the attribute.
         * @param {*=} type type to deserialize to, defaults to the value
         * returned from `typeForProperty`
         * @return {void}
         * @override
         */
        PropertiesChanged.prototype._attributeToProperty = function (attribute, value, type) {
            if (!this.__serializing) {
                var map = this.__dataAttributes;
                var property = map && map[attribute] || attribute;
                this[property] = this._deserializeValue(value, type ||
                    this.constructor.typeForProperty(property));
            }
        };
        /**
         * Serializes a property to its associated attribute.
         *
         * @suppress {invalidCasts} Closure can't figure out `this` is an element.
         *
         * @param {string} property Property name to reflect.
         * @param {string=} attribute Attribute name to reflect to.
         * @param {*=} value Property value to refect.
         * @return {void}
         * @override
         */
        PropertiesChanged.prototype._propertyToAttribute = function (property, attribute, value) {
            this.__serializing = true;
            value = (arguments.length < 3) ? this[property] : value;
            this._valueToNodeAttribute(/** @type {!HTMLElement} */ (this), value, attribute || this.constructor.attributeNameForProperty(property));
            this.__serializing = false;
        };
        /**
         * Sets a typed value to an HTML attribute on a node.
         *
         * This method calls the `_serializeValue` method to convert the typed
         * value to a string.  If the `_serializeValue` method returns `undefined`,
         * the attribute will be removed (this is the default for boolean
         * type `false`).
         *
         * @param {Element} node Element to set attribute to.
         * @param {*} value Value to serialize.
         * @param {string} attribute Attribute name to serialize to.
         * @return {void}
         * @override
         */
        PropertiesChanged.prototype._valueToNodeAttribute = function (node, value, attribute) {
            var str = this._serializeValue(value);
            if (attribute === 'class' || attribute === 'name' || attribute === 'slot') {
                node = /** @type {?Element} */ (wrap(node));
            }
            if (str === undefined) {
                node.removeAttribute(attribute);
            }
            else {
                node.setAttribute(attribute, str);
            }
        };
        /**
         * Converts a typed JavaScript value to a string.
         *
         * This method is called when setting JS property values to
         * HTML attributes.  Users may override this method to provide
         * serialization for custom types.
         *
         * @param {*} value Property value to serialize.
         * @return {string | undefined} String serialized from the provided
         * property  value.
         * @override
         */
        PropertiesChanged.prototype._serializeValue = function (value) {
            switch (typeof value) {
                case 'boolean':
                    return value ? '' : undefined;
                default:
                    return value != null ? value.toString() : undefined;
            }
        };
        /**
         * Converts a string to a typed JavaScript value.
         *
         * This method is called when reading HTML attribute values to
         * JS properties.  Users may override this method to provide
         * deserialization for custom `type`s. Types for `Boolean`, `String`,
         * and `Number` convert attributes to the expected types.
         *
         * @param {?string} value Value to deserialize.
         * @param {*=} type Type to deserialize the string to.
         * @return {*} Typed value deserialized from the provided string.
         * @override
         */
        PropertiesChanged.prototype._deserializeValue = function (value, type) {
            switch (type) {
                case Boolean:
                    return (value !== null);
                case Number:
                    return Number(value);
                default:
                    return value;
            }
        };
        return PropertiesChanged;
    }(superClass));
    return PropertiesChanged;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// Save map of native properties; this forms a blacklist or properties
// that won't have their values "saved" by `saveAccessorValue`, since
// reading from an HTMLElement accessor from the context of a prototype throws
var nativeProperties = {};
var proto = HTMLElement.prototype;
while (proto) {
    var props = Object.getOwnPropertyNames(proto);
    for (var i = 0; i < props.length; i++) {
        nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
}
/**
 * Used to save the value of a property that will be overridden with
 * an accessor. If the `model` is a prototype, the values will be saved
 * in `__dataProto`, and it's up to the user (or downstream mixin) to
 * decide how/when to set these values back into the accessors.
 * If `model` is already an instance (it has a `__data` property), then
 * the value will be set as a pending property, meaning the user should
 * call `_invalidateProperties` or `_flushProperties` to take effect
 *
 * @param {Object} model Prototype or instance
 * @param {string} property Name of property
 * @return {void}
 * @private
 */
function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
        var value = model[property];
        if (value !== undefined) {
            if (model.__data) {
                // Adding accessor to instance; update the property
                // It is the user's responsibility to call _flushProperties
                model._setPendingProperty(property, value);
            }
            else {
                // Adding accessor to proto; save proto's value for instance-time use
                if (!model.__dataProto) {
                    model.__dataProto = {};
                }
                else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
                    model.__dataProto = Object.create(model.__dataProto);
                }
                model.__dataProto[property] = value;
            }
        }
    }
}
/**
 * Element class mixin that provides basic meta-programming for creating one
 * or more property accessors (getter/setter pair) that enqueue an async
 * (batched) `_propertiesChanged` callback.
 *
 * For basic usage of this mixin:
 *
 * -   Declare attributes to observe via the standard `static get
 *     observedAttributes()`. Use `dash-case` attribute names to represent
 *     `camelCase` property names.
 * -   Implement the `_propertiesChanged` callback on the class.
 * -   Call `MyClass.createPropertiesForAttributes()` **once** on the class to
 *     generate property accessors for each observed attribute. This must be
 *     called before the first instance is created, for example, by calling it
 *     before calling `customElements.define`. It can also be called lazily from
 *     the element's `constructor`, as long as it's guarded so that the call is
 *     only made once, when the first instance is created.
 * -   Call `this._enableProperties()` in the element's `connectedCallback` to
 *     enable the accessors.
 *
 * Any `observedAttributes` will automatically be
 * deserialized via `attributeChangedCallback` and set to the associated
 * property using `dash-case`-to-`camelCase` convention.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Element class mixin for reacting to property changes from
 *   generated property accessors.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var PropertyAccessors = dedupingMixin(function (superClass) {
    /**
     * @constructor
     * @implements {Polymer_PropertiesChanged}
     * @unrestricted
     * @private
     */
    var base = PropertiesChanged(superClass);
    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends {base}
     * @unrestricted
     */
    var PropertyAccessors = /** @class */ (function (_super) {
        __extends(PropertyAccessors, _super);
        function PropertyAccessors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Generates property accessors for all attributes in the standard
         * static `observedAttributes` array.
         *
         * Attribute names are mapped to property names using the `dash-case` to
         * `camelCase` convention
         *
         * @return {void}
         * @nocollapse
         */
        PropertyAccessors.createPropertiesForAttributes = function () {
            var a$ = /** @type {?} */ (this).observedAttributes;
            for (var i = 0; i < a$.length; i++) {
                this.prototype._createPropertyAccessor(dashToCamelCase(a$[i]));
            }
        };
        /**
         * Returns an attribute name that corresponds to the given property.
         * By default, converts camel to dash case, e.g. `fooBar` to `foo-bar`.
         * @param {string} property Property to convert
         * @return {string} Attribute name corresponding to the given property.
         *
         * @protected
         * @nocollapse
         */
        PropertyAccessors.attributeNameForProperty = function (property) {
            return camelToDashCase(property);
        };
        /**
         * Overrides PropertiesChanged implementation to initialize values for
         * accessors created for values that already existed on the element
         * prototype.
         *
         * @return {void}
         * @protected
         * @override
         */
        PropertyAccessors.prototype._initializeProperties = function () {
            if (this.__dataProto) {
                this._initializeProtoProperties(this.__dataProto);
                this.__dataProto = null;
            }
            _super.prototype._initializeProperties.call(this);
        };
        /**
         * Called at instance time with bag of properties that were overwritten
         * by accessors on the prototype when accessors were created.
         *
         * The default implementation sets these properties back into the
         * setter at instance time.  This method is provided as an override
         * point for customizing or providing more efficient initialization.
         *
         * @param {Object} props Bag of property values that were overwritten
         *   when creating property accessors.
         * @return {void}
         * @protected
         * @override
         */
        PropertyAccessors.prototype._initializeProtoProperties = function (props) {
            for (var p in props) {
                this._setProperty(p, props[p]);
            }
        };
        /**
         * Ensures the element has the given attribute. If it does not,
         * assigns the given value to the attribute.
         *
         * @suppress {invalidCasts} Closure can't figure out `this` is infact an
         *     element
         *
         * @param {string} attribute Name of attribute to ensure is set.
         * @param {string} value of the attribute.
         * @return {void}
         * @override
         */
        PropertyAccessors.prototype._ensureAttribute = function (attribute, value) {
            var el = /** @type {!HTMLElement} */ (this);
            if (!el.hasAttribute(attribute)) {
                this._valueToNodeAttribute(el, value, attribute);
            }
        };
        /**
         * Overrides PropertiesChanged implemention to serialize objects as JSON.
         *
         * @param {*} value Property value to serialize.
         * @return {string | undefined} String serialized from the provided property
         *     value.
         * @override
         */
        PropertyAccessors.prototype._serializeValue = function (value) {
            /* eslint-disable no-fallthrough */
            switch (typeof value) {
                case 'object':
                    if (value instanceof Date) {
                        return value.toString();
                    }
                    else if (value) {
                        try {
                            return JSON.stringify(value);
                        }
                        catch (x) {
                            return '';
                        }
                    }
                default:
                    return _super.prototype._serializeValue.call(this, value);
            }
        };
        /**
         * Converts a string to a typed JavaScript value.
         *
         * This method is called by Polymer when reading HTML attribute values to
         * JS properties.  Users may override this method on Polymer element
         * prototypes to provide deserialization for custom `type`s.  Note,
         * the `type` argument is the value of the `type` field provided in the
         * `properties` configuration object for a given property, and is
         * by convention the constructor for the type to deserialize.
         *
         *
         * @param {?string} value Attribute value to deserialize.
         * @param {*=} type Type to deserialize the string to.
         * @return {*} Typed value deserialized from the provided string.
         * @override
         */
        PropertyAccessors.prototype._deserializeValue = function (value, type) {
            /**
             * @type {*}
             */
            var outValue;
            switch (type) {
                case Object:
                    try {
                        outValue = JSON.parse(/** @type {string} */ (value));
                    }
                    catch (x) {
                        // allow non-JSON literals like Strings and Numbers
                        outValue = value;
                    }
                    break;
                case Array:
                    try {
                        outValue = JSON.parse(/** @type {string} */ (value));
                    }
                    catch (x) {
                        outValue = null;
                        console.warn("Polymer::Attributes: couldn't decode Array as JSON: " + value);
                    }
                    break;
                case Date:
                    outValue = isNaN(value) ? String(value) : Number(value);
                    outValue = new Date(outValue);
                    break;
                default:
                    outValue = _super.prototype._deserializeValue.call(this, value, type);
                    break;
            }
            return outValue;
        };
        /* eslint-enable no-fallthrough */
        /**
         * Overrides PropertiesChanged implementation to save existing prototype
         * property value so that it can be reset.
         * @param {string} property Name of the property
         * @param {boolean=} readOnly When true, no setter is created
         *
         * When calling on a prototype, any overwritten values are saved in
         * `__dataProto`, and it is up to the subclasser to decide how/when
         * to set those properties back into the accessor.  When calling on an
         * instance, the overwritten value is set via `_setPendingProperty`,
         * and the user should call `_invalidateProperties` or `_flushProperties`
         * for the values to take effect.
         * @protected
         * @return {void}
         * @override
         */
        PropertyAccessors.prototype._definePropertyAccessor = function (property, readOnly) {
            saveAccessorValue(this, property);
            _super.prototype._definePropertyAccessor.call(this, property, readOnly);
        };
        /**
         * Returns true if this library created an accessor for the given property.
         *
         * @param {string} property Property name
         * @return {boolean} True if an accessor was created
         * @override
         */
        PropertyAccessors.prototype._hasAccessor = function (property) {
            return this.__dataHasAccessor && this.__dataHasAccessor[property];
        };
        /**
         * Returns true if the specified property has a pending change.
         *
         * @param {string} prop Property name
         * @return {boolean} True if property has a pending change
         * @protected
         * @override
         */
        PropertyAccessors.prototype._isPropertyPending = function (prop) {
            return Boolean(this.__dataPending && (prop in this.__dataPending));
        };
        return PropertyAccessors;
    }(base));
    return PropertyAccessors;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// 1.x backwards-compatible auto-wrapper for template type extensions
// This is a clear layering violation and gives favored-nation status to
// dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
// a.) to ease 1.x backwards-compatibility due to loss of `is`, and
// b.) to maintain if/repeat capability in parser-constrained elements
//     (e.g. table, select) in lieu of native CE type extensions without
//     massive new invention in this space (e.g. directive system)
var templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
};
var placeholderBugDetect = false;
var placeholderBug = false;
function hasPlaceholderBug() {
    if (!placeholderBugDetect) {
        placeholderBugDetect = true;
        var t = document.createElement('textarea');
        t.placeholder = 'a';
        placeholderBug = t.placeholder === t.textContent;
    }
    return placeholderBug;
}
/**
 * Some browsers have a bug with textarea, where placeholder text is copied as
 * a textnode child of the textarea.
 *
 * If the placeholder is a binding, this can break template stamping in two
 * ways.
 *
 * One issue is that when the `placeholder` attribute is removed when the
 * binding is processed, the textnode child of the textarea is deleted, and the
 * template info tries to bind into that node.
 *
 * With `legacyOptimizations` in use, when the template is stamped and the
 * `textarea.textContent` binding is processed, no corresponding node is found
 * because it was removed during parsing. An exception is generated when this
 * binding is updated.
 *
 * With `legacyOptimizations` not in use, the template is cloned before
 * processing and this changes the above behavior. The cloned template also has
 * a value property set to the placeholder and textContent. This prevents the
 * removal of the textContent when the placeholder attribute is removed.
 * Therefore the exception does not occur. However, there is an extra
 * unnecessary binding.
 *
 * @param {!Node} node Check node for placeholder bug
 * @return {void}
 */
function fixPlaceholder(node) {
    if (hasPlaceholderBug() && node.localName === 'textarea' && node.placeholder
        && node.placeholder === node.textContent) {
        node.textContent = null;
    }
}
function wrapTemplateExtension(node) {
    var is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
        var t = node;
        t.removeAttribute('is');
        node = t.ownerDocument.createElement(is);
        t.parentNode.replaceChild(node, t);
        node.appendChild(t);
        while (t.attributes.length) {
            node.setAttribute(t.attributes[0].name, t.attributes[0].value);
            t.removeAttribute(t.attributes[0].name);
        }
    }
    return node;
}
function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    var parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
        // note: marginally faster than indexing via childNodes
        // (http://jsperf.com/childnodes-lookup)
        for (var n = parent.firstChild, i = 0; n; n = n.nextSibling) {
            if (nodeInfo.parentIndex === i++) {
                return n;
            }
        }
    }
    else {
        return root;
    }
}
// construct `$` map (from id annotations)
function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
        map[nodeInfo.id] = node;
    }
}
// install event listeners (from event annotations)
function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
        for (var j = 0, e$ = nodeInfo.events, e = void 0; (j < e$.length) && (e = e$[j]); j++) {
            inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
        }
    }
}
// push configuration references at configure time
function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
        node._templateInfo = nodeInfo.templateInfo;
    }
}
function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    var handler = function (e) {
        if (context[methodName]) {
            context[methodName](e, e.detail);
        }
        else {
            console.warn('listener method `' + methodName + '` not defined');
        }
    };
    return handler;
}
/**
 * Element mixin that provides basic template parsing and stamping, including
 * the following template-related features for stamped templates:
 *
 * - Declarative event listeners (`on-eventname="listener"`)
 * - Map of node id's to stamped node instances (`this.$.id`)
 * - Nested template content caching/removal and re-installation (performance
 *   optimization)
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin that provides basic template parsing and stamping
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var TemplateStamp = dedupingMixin(
/**
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
function (superClass) {
    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    var TemplateStamp = /** @class */ (function (_super) {
        __extends(TemplateStamp, _super);
        function TemplateStamp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Scans a template to produce template metadata.
         *
         * Template-specific metadata are stored in the object returned, and node-
         * specific metadata are stored in objects in its flattened `nodeInfoList`
         * array.  Only nodes in the template that were parsed as nodes of
         * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
         * contains an `index` (`childNodes` index in parent) and optionally
         * `parent`, which points to node info of its parent (including its index).
         *
         * The template metadata object returned from this method has the following
         * structure (many fields optional):
         *
         * ```js
         *   {
         *     // Flattened list of node metadata (for nodes that generated metadata)
         *     nodeInfoList: [
         *       {
         *         // `id` attribute for any nodes with id's for generating `$` map
         *         id: {string},
         *         // `on-event="handler"` metadata
         *         events: [
         *           {
         *             name: {string},   // event name
         *             value: {string},  // handler method name
         *           }, ...
         *         ],
         *         // Notes when the template contained a `<slot>` for shady DOM
         *         // optimization purposes
         *         hasInsertionPoint: {boolean},
         *         // For nested `<template>`` nodes, nested template metadata
         *         templateInfo: {object}, // nested template metadata
         *         // Metadata to allow efficient retrieval of instanced node
         *         // corresponding to this metadata
         *         parentInfo: {number},   // reference to parent nodeInfo>
         *         parentIndex: {number},  // index in parent's `childNodes` collection
         *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
         *       },
         *       ...
         *     ],
         *     // When true, the template had the `strip-whitespace` attribute
         *     // or was nested in a template with that setting
         *     stripWhitespace: {boolean},
         *     // For nested templates, nested template content is moved into
         *     // a document fragment stored here; this is an optimization to
         *     // avoid the cost of nested template cloning
         *     content: {DocumentFragment}
         *   }
         * ```
         *
         * This method kicks off a recursive treewalk as follows:
         *
         * ```
         *    _parseTemplate <---------------------+
         *      _parseTemplateContent              |
         *        _parseTemplateNode  <------------|--+
         *          _parseTemplateNestedTemplate --+  |
         *          _parseTemplateChildNodes ---------+
         *          _parseTemplateNodeAttributes
         *            _parseTemplateNodeAttribute
         *
         * ```
         *
         * These methods may be overridden to add custom metadata about templates
         * to either `templateInfo` or `nodeInfo`.
         *
         * Note that this method may be destructive to the template, in that
         * e.g. event annotations may be removed after being noted in the
         * template metadata.
         *
         * @param {!HTMLTemplateElement} template Template to parse
         * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
         *   template, for parsing nested templates
         * @return {!TemplateInfo} Parsed template metadata
         * @nocollapse
         */
        TemplateStamp._parseTemplate = function (template, outerTemplateInfo) {
            // since a template may be re-used, memo-ize metadata
            if (!template._templateInfo) {
                // TODO(rictic): fix typing
                var /** ? */ templateInfo = template._templateInfo = {};
                templateInfo.nodeInfoList = [];
                templateInfo.stripWhiteSpace =
                    (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
                        template.hasAttribute('strip-whitespace');
                // TODO(rictic): fix typing
                this._parseTemplateContent(template, templateInfo, /** @type {?} */ ({ parent: null }));
            }
            return template._templateInfo;
        };
        /**
         * See docs for _parseTemplateNode.
         *
         * @param {!HTMLTemplateElement} template .
         * @param {!TemplateInfo} templateInfo .
         * @param {!NodeInfo} nodeInfo .
         * @return {boolean} .
         * @nocollapse
         */
        TemplateStamp._parseTemplateContent = function (template, templateInfo, nodeInfo) {
            return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
        };
        /**
         * Parses template node and adds template and node metadata based on
         * the current node, and its `childNodes` and `attributes`.
         *
         * This method may be overridden to add custom node or template specific
         * metadata based on this node.
         *
         * @param {Node} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @nocollapse
         */
        TemplateStamp._parseTemplateNode = function (node, templateInfo, nodeInfo) {
            var noted = false;
            var element = /** @type {!HTMLTemplateElement} */ (node);
            if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
                noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
            }
            else if (element.localName === 'slot') {
                // For ShadyDom optimization, indicating there is an insertion point
                templateInfo.hasInsertionPoint = true;
            }
            fixPlaceholder(element);
            if (element.firstChild) {
                this._parseTemplateChildNodes(element, templateInfo, nodeInfo);
            }
            if (element.hasAttributes && element.hasAttributes()) {
                noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
            }
            return noted;
        };
        /**
         * Parses template child nodes for the given root node.
         *
         * This method also wraps whitelisted legacy template extensions
         * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
         * wrappers, collapses text nodes, and strips whitespace from the template
         * if the `templateInfo.stripWhitespace` setting was provided.
         *
         * @param {Node} root Root node whose `childNodes` will be parsed
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {void}
         */
        TemplateStamp._parseTemplateChildNodes = function (root, templateInfo, nodeInfo) {
            if (root.localName === 'script' || root.localName === 'style') {
                return;
            }
            for (var node = root.firstChild, parentIndex = 0, next = void 0; node; node = next) {
                // Wrap templates
                if (node.localName == 'template') {
                    node = wrapTemplateExtension(node);
                }
                // collapse adjacent textNodes: fixes an IE issue that can cause
                // text nodes to be inexplicably split =(
                // note that root.normalize() should work but does not so we do this
                // manually.
                next = node.nextSibling;
                if (node.nodeType === Node.TEXT_NODE) {
                    var /** Node */ n = next;
                    while (n && (n.nodeType === Node.TEXT_NODE)) {
                        node.textContent += n.textContent;
                        next = n.nextSibling;
                        root.removeChild(n);
                        n = next;
                    }
                    // optionally strip whitespace
                    if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
                        root.removeChild(node);
                        continue;
                    }
                }
                var childInfo = 
                /** @type {!NodeInfo} */ ({ parentIndex: parentIndex, parentInfo: nodeInfo });
                if (this._parseTemplateNode(node, templateInfo, childInfo)) {
                    childInfo.infoIndex = templateInfo.nodeInfoList.push(childInfo) - 1;
                }
                // Increment if not removed
                if (node.parentNode) {
                    parentIndex++;
                }
            }
        };
        /**
         * Parses template content for the given nested `<template>`.
         *
         * Nested template info is stored as `templateInfo` in the current node's
         * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
         * It will then be the responsibility of the host to set it back to the
         * template and for users stamping nested templates to use the
         * `_contentForTemplate` method to retrieve the content for this template
         * (an optimization to avoid the cost of cloning nested template content).
         *
         * @param {HTMLTemplateElement} node Node to parse (a <template>)
         * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
         *   that includes the template `node`
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @nocollapse
         */
        TemplateStamp._parseTemplateNestedTemplate = function (node, outerTemplateInfo, nodeInfo) {
            // TODO(rictic): the type of node should be non-null
            var element = /** @type {!HTMLTemplateElement} */ (node);
            var templateInfo = this._parseTemplate(element, outerTemplateInfo);
            var content = templateInfo.content =
                element.content.ownerDocument.createDocumentFragment();
            content.appendChild(element.content);
            nodeInfo.templateInfo = templateInfo;
            return true;
        };
        /**
         * Parses template node attributes and adds node metadata to `nodeInfo`
         * for nodes of interest.
         *
         * @param {Element} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current
         *     template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @nocollapse
         */
        TemplateStamp._parseTemplateNodeAttributes = function (node, templateInfo, nodeInfo) {
            // Make copy of original attribute list, since the order may change
            // as attributes are added and removed
            var noted = false;
            var attrs = Array.from(node.attributes);
            for (var i = attrs.length - 1, a = void 0; (a = attrs[i]); i--) {
                noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
            }
            return noted;
        };
        /**
         * Parses a single template node attribute and adds node metadata to
         * `nodeInfo` for attributes of interest.
         *
         * This implementation adds metadata for `on-event="handler"` attributes
         * and `id` attributes.
         *
         * @param {Element} node Node to parse
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @param {string} name Attribute name
         * @param {string} value Attribute value
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @nocollapse
         */
        TemplateStamp._parseTemplateNodeAttribute = function (node, templateInfo, nodeInfo, name, value) {
            // events (on-*)
            if (name.slice(0, 3) === 'on-') {
                node.removeAttribute(name);
                nodeInfo.events = nodeInfo.events || [];
                nodeInfo.events.push({
                    name: name.slice(3),
                    value: value
                });
                return true;
            }
            // static id
            else if (name === 'id') {
                nodeInfo.id = value;
                return true;
            }
            return false;
        };
        /**
         * Returns the `content` document fragment for a given template.
         *
         * For nested templates, Polymer performs an optimization to cache nested
         * template content to avoid the cost of cloning deeply nested templates.
         * This method retrieves the cached content for a given template.
         *
         * @param {HTMLTemplateElement} template Template to retrieve `content` for
         * @return {DocumentFragment} Content fragment
         * @nocollapse
         */
        TemplateStamp._contentForTemplate = function (template) {
            var templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
            return (templateInfo && templateInfo.content) || template.content;
        };
        /**
         * Clones the provided template content and returns a document fragment
         * containing the cloned dom.
         *
         * The template is parsed (once and memoized) using this library's
         * template parsing features, and provides the following value-added
         * features:
         * * Adds declarative event listeners for `on-event="handler"` attributes
         * * Generates an "id map" for all nodes with id's under `$` on returned
         *   document fragment
         * * Passes template info including `content` back to templates as
         *   `_templateInfo` (a performance optimization to avoid deep template
         *   cloning)
         *
         * Note that the memoized template parsing process is destructive to the
         * template: attributes for bindings and declarative event listeners are
         * removed after being noted in notes, and any nested `<template>.content`
         * is removed and stored in notes as well.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         * @override
         */
        TemplateStamp.prototype._stampTemplate = function (template) {
            // Polyfill support: bootstrap the template if it has not already been
            if (template && !template.content &&
                window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
                HTMLTemplateElement.decorate(template);
            }
            var templateInfo = this.constructor._parseTemplate(template);
            var nodeInfo = templateInfo.nodeInfoList;
            var content = templateInfo.content || template.content;
            var dom = /** @type {DocumentFragment} */ (document.importNode(content, true));
            // NOTE: ShadyDom optimization indicating there is an insertion point
            dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
            var nodes = dom.nodeList = new Array(nodeInfo.length);
            dom.$ = {};
            for (var i = 0, l = nodeInfo.length, info = void 0; (i < l) && (info = nodeInfo[i]); i++) {
                var node = nodes[i] = findTemplateNode(dom, info);
                applyIdToMap(this, dom.$, node, info);
                applyTemplateContent(this, node, info);
                applyEventListener(this, node, info);
            }
            dom = /** @type {!StampedTemplate} */ (dom); // eslint-disable-line no-self-assign
            return dom;
        };
        /**
         * Adds an event listener by method name for the event provided.
         *
         * This method generates a handler function that looks up the method
         * name at handling time.
         *
         * @param {!EventTarget} node Node to add listener on
         * @param {string} eventName Name of event
         * @param {string} methodName Name of method
         * @param {*=} context Context the method will be called on (defaults
         *   to `node`)
         * @return {Function} Generated handler function
         * @override
         */
        TemplateStamp.prototype._addMethodEventListenerToNode = function (node, eventName, methodName, context) {
            context = context || node;
            var handler = createNodeEventHandler(context, eventName, methodName);
            this._addEventListenerToNode(node, eventName, handler);
            return handler;
        };
        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {!EventTarget} node Node to add event listener to
         * @param {string} eventName Name of event
         * @param {function(!Event):void} handler Listener function to add
         * @return {void}
         * @override
         */
        TemplateStamp.prototype._addEventListenerToNode = function (node, eventName, handler) {
            node.addEventListener(eventName, handler);
        };
        /**
         * Override point for adding custom or simulated event handling.
         *
         * @param {!EventTarget} node Node to remove event listener from
         * @param {string} eventName Name of event
         * @param {function(!Event):void} handler Listener function to remove
         * @return {void}
         * @override
         */
        TemplateStamp.prototype._removeEventListenerFromNode = function (node, eventName, handler) {
            node.removeEventListener(eventName, handler);
        };
        return TemplateStamp;
    }(superClass));
    return TemplateStamp;
});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
// Monotonically increasing unique ID used for de-duping effects triggered
// from multiple properties in the same turn
var dedupeId$1 = 0;
/**
 * Property effect types; effects are stored on the prototype using these keys
 * @enum {string}
 */
var TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'
};
/** @const {!RegExp} */
var capitalAttributeRegex = /[A-Z]/;
/**
 * Ensures that the model has an own-property map of effects for the given type.
 * The model may be a prototype or an instance.
 *
 * Property effects are stored as arrays of effects by property in a map,
 * by named type on the model. e.g.
 *
 *   __computeEffects: {
 *     foo: [ ... ],
 *     bar: [ ... ]
 *   }
 *
 * If the model does not yet have an effect map for the type, one is created
 * and returned.  If it does, but it is not an own property (i.e. the
 * prototype had effects), the the map is deeply cloned and the copy is
 * set on the model and returned, ready for new effects to be added.
 *
 * @param {Object} model Prototype or instance
 * @param {string} type Property effect type
 * @return {Object} The own-property map of effects for the given type
 * @private
 */
function ensureOwnEffectMap(model, type) {
    var effects = model[type];
    if (!effects) {
        effects = model[type] = {};
    }
    else if (!model.hasOwnProperty(type)) {
        effects = model[type] = Object.create(model[type]);
        for (var p in effects) {
            var protoFx = effects[p];
            var instFx = effects[p] = Array(protoFx.length);
            for (var i = 0; i < protoFx.length; i++) {
                instFx[i] = protoFx[i];
            }
        }
    }
    return effects;
}
// -- effects ----------------------------------------------
/**
 * Runs all effects of a given type for the given set of property changes
 * on an instance.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {?Object} effects Object map of property-to-Array of effects
 * @param {?Object} props Bag of current property changes
 * @param {?Object=} oldProps Bag of previous values for changed properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
        var ran = false;
        var id = dedupeId$1++;
        for (var prop in props) {
            if (runEffectsForProperty(inst, /** @type {!Object} */ (effects), id, prop, props, oldProps, hasPaths, extraArgs)) {
                ran = true;
            }
        }
        return ran;
    }
    return false;
}
/**
 * Runs a list of effects for a given property.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {!Object} effects Object map of property-to-Array of effects
 * @param {number} dedupeId Counter used for de-duping effects
 * @param {string} prop Name of changed property
 * @param {*} props Changed properties
 * @param {*} oldProps Old properties
 * @param {boolean=} hasPaths True with `props` contains one or more paths
 * @param {*=} extraArgs Additional metadata to pass to effect function
 * @return {boolean} True if an effect ran for this property
 * @private
 */
function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    var ran = false;
    var rootProperty = hasPaths ? root(prop) : prop;
    var fxs = effects[rootProperty];
    if (fxs) {
        for (var i = 0, l = fxs.length, fx = void 0; (i < l) && (fx = fxs[i]); i++) {
            if ((!fx.info || fx.info.lastRun !== dedupeId) &&
                (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
                if (fx.info) {
                    fx.info.lastRun = dedupeId;
                }
                fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
                ran = true;
            }
        }
    }
    return ran;
}
/**
 * Determines whether a property/path that has changed matches the trigger
 * criteria for an effect.  A trigger is a descriptor with the following
 * structure, which matches the descriptors returned from `parseArg`.
 * e.g. for `foo.bar.*`:
 * ```
 * trigger: {
 *   name: 'a.b',
 *   structured: true,
 *   wildcard: true
 * }
 * ```
 * If no trigger is given, the path is deemed to match.
 *
 * @param {string} path Path or property that changed
 * @param {?DataTrigger} trigger Descriptor
 * @return {boolean} Whether the path matched the trigger
 */
function pathMatchesTrigger(path, trigger) {
    if (trigger) {
        var triggerPath = /** @type {string} */ (trigger.name);
        return (triggerPath == path) ||
            !!(trigger.structured && isAncestor(triggerPath, path)) ||
            !!(trigger.wildcard && isDescendant(triggerPath, path));
    }
    else {
        return true;
    }
}
/**
 * Implements the "observer" effect.
 *
 * Calls the method with `info.methodName` on the instance, passing the
 * new and old values.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runObserverEffect(inst, property, props, oldProps, info) {
    var fn = typeof info.method === "string" ? inst[info.method] : info.method;
    var changedProp = info.property;
    if (fn) {
        fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    }
    else if (!info.dynamicFn) {
        console.warn('observer method `' + info.method + '` not defined');
    }
}
/**
 * Runs "notify" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * will dispatch path notification events in the case that the property
 * changed was a path and the root property for that path didn't have a
 * "notify" effect.  This is to maintain 1.0 behavior that did not require
 * `notify: true` to ensure object sub-property notifications were
 * sent.
 *
 * @param {!Polymer_PropertyEffects} inst The instance with effects to run
 * @param {Object} notifyProps Bag of properties to notify
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    var fxs = inst[TYPES.NOTIFY];
    var notified;
    var id = dedupeId$1++;
    // Try normal notify effects; if none, fall back to try path notification
    for (var prop in notifyProps) {
        if (notifyProps[prop]) {
            if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
                notified = true;
            }
            else if (hasPaths && notifyPath(inst, prop, props)) {
                notified = true;
            }
        }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    var host;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
        host._invalidateProperties();
    }
}
/**
 * Dispatches {property}-changed events with path information in the detail
 * object to indicate a sub-path of the property was changed.
 *
 * @param {!Polymer_PropertyEffects} inst The element from which to fire the
 *     event
 * @param {string} path The path that was changed
 * @param {Object} props Bag of current property changes
 * @return {boolean} Returns true if the path was notified
 * @private
 */
function notifyPath(inst, path, props) {
    var rootProperty = root(path);
    if (rootProperty !== path) {
        var eventName = camelToDashCase(rootProperty) + '-changed';
        dispatchNotifyEvent(inst, eventName, props[path], path);
        return true;
    }
    return false;
}
/**
 * Dispatches {property}-changed events to indicate a property (or path)
 * changed.
 *
 * @param {!Polymer_PropertyEffects} inst The element from which to fire the
 *     event
 * @param {string} eventName The name of the event to send
 *     ('{property}-changed')
 * @param {*} value The value of the changed property
 * @param {string | null | undefined} path If a sub-path of this property
 *     changed, the path that changed (optional).
 * @return {void}
 * @private
 * @suppress {invalidCasts}
 */
function dispatchNotifyEvent(inst, eventName, value, path) {
    var detail = {
        value: value,
        queueProperty: true
    };
    if (path) {
        detail.path = path;
    }
    wrap(/** @type {!HTMLElement} */ (inst)).dispatchEvent(new CustomEvent(eventName, { detail: detail }));
}
/**
 * Implements the "notify" effect.
 *
 * Dispatches a non-bubbling event named `info.eventName` on the instance
 * with a detail object containing the new `value`.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    var rootProperty = hasPaths ? root(property) : property;
    var path = rootProperty != property ? property : null;
    var value = path ? get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
        value = props[property]; // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
}
/**
 * Handler function for 2-way notification events. Receives context
 * information captured in the `addNotifyListener` closure from the
 * `__notifyListeners` metadata.
 *
 * Sets the value of the notified property to the host property or path.  If
 * the event contained path information, translate that path to the host
 * scope's name for that path first.
 *
 * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
 * @param {!Polymer_PropertyEffects} inst Host element instance handling the
 *     notification event
 * @param {string} fromProp Child element property that was bound
 * @param {string} toPath Host property/path that was bound
 * @param {boolean} negate Whether the binding was negated
 * @return {void}
 * @private
 */
function handleNotification(event, inst, fromProp, toPath, negate) {
    var value;
    var detail = /** @type {Object} */ (event.detail);
    var fromPath = detail && detail.path;
    if (fromPath) {
        toPath = translate(fromProp, toPath, fromPath);
        value = detail && detail.value;
    }
    else {
        value = event.currentTarget[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
        if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
            && (!detail || !detail.queueProperty)) {
            inst._invalidateProperties();
        }
    }
}
/**
 * Implements the "reflect" effect.
 *
 * Sets the attribute named `info.attrName` to the given property value.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runReflectEffect(inst, property, props, oldProps, info) {
    var value = inst.__data[property];
    if (sanitizeDOMValue) {
        value = sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */ (inst));
    }
    inst._propertyToAttribute(property, info.attrName, value);
}
/**
 * Runs "computed" effects for a set of changed properties.
 *
 * This method differs from the generic `runEffects` method in that it
 * continues to run computed effects based on the output of each pass until
 * there are no more newly computed properties.  This ensures that all
 * properties that will be computed by the initial set of changes are
 * computed before other effects (binding propagation, observers, and notify)
 * run.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {?Object} changedProps Bag of changed properties
 * @param {?Object} oldProps Bag of previous values for changed properties
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @return {void}
 * @private
 */
function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    var computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
        var inputProps = changedProps;
        while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
            Object.assign(/** @type {!Object} */ (oldProps), inst.__dataOld);
            Object.assign(/** @type {!Object} */ (changedProps), inst.__dataPending);
            inputProps = inst.__dataPending;
            inst.__dataPending = null;
        }
    }
}
/**
 * Implements the "computed property" effect by running the method with the
 * values of the arguments specified in the `info` object and setting the
 * return value to the computed property specified.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {?Object} props Bag of current property changes
 * @param {?Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {void}
 * @private
 */
function runComputedEffect(inst, property, props, oldProps, info) {
    var result = runMethodEffect(inst, property, props, oldProps, info);
    var computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
        inst._setPendingProperty(computedProp, result, true);
    }
    else {
        inst[computedProp] = result;
    }
}
/**
 * Computes path changes based on path links set up using the `linkPaths`
 * API.
 *
 * @param {!Polymer_PropertyEffects} inst The instance whose props are changing
 * @param {string} path Path that has changed
 * @param {*} value Value of changed path
 * @return {void}
 * @private
 */
function computeLinkedPaths(inst, path, value) {
    var links = inst.__dataLinkedPaths;
    if (links) {
        var link = void 0;
        for (var a in links) {
            var b = links[a];
            if (isDescendant(a, path)) {
                link = translate(a, b, path);
                inst._setPendingPropertyOrPath(link, value, true, true);
            }
            else if (isDescendant(b, path)) {
                link = translate(b, a, path);
                inst._setPendingPropertyOrPath(link, value, true, true);
            }
        }
    }
}
// -- bindings ----------------------------------------------
/**
 * Adds binding metadata to the current `nodeInfo`, and binding effects
 * for all part dependencies to `templateInfo`.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {NodeInfo} nodeInfo Node metadata for current template node
 * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
 * @param {string} target Target property name
 * @param {!Array<!BindingPart>} parts Array of binding part metadata
 * @param {string=} literal Literal text surrounding binding parts (specified
 *   only for 'property' bindings, since these must be initialized as part
 *   of boot-up)
 * @return {void}
 * @private
 */
function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    var /** Binding */ binding = { kind: kind, target: target, parts: parts, literal: literal, isCompound: (parts.length !== 1) };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
        var _a = binding.parts[0], event = _a.event, negate = _a.negate;
        binding.listenerEvent = event || (camelToDashCase(target) + '-changed');
        binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    var index = templateInfo.nodeInfoList.length;
    for (var i = 0; i < binding.parts.length; i++) {
        var part = binding.parts[i];
        part.compoundIndex = i;
        addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
}
/**
 * Adds property effects to the given `templateInfo` for the given binding
 * part.
 *
 * @param {Function} constructor Class that `_parseTemplate` is currently
 *   running on
 * @param {TemplateInfo} templateInfo Template metadata for current template
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {number} index Index into `nodeInfoList` for this node
 * @return {void}
 */
function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
        if (binding.kind === 'attribute' && binding.target[0] === '-') {
            console.warn('Cannot set attribute ' + binding.target +
                ' because "-" is not a valid attribute starting character');
        }
        else {
            var dependencies = part.dependencies;
            var info = { index: index, binding: binding, part: part, evaluator: constructor };
            for (var j = 0; j < dependencies.length; j++) {
                var trigger = dependencies[j];
                if (typeof trigger == 'string') {
                    trigger = parseArg(trigger);
                    trigger.wildcard = true;
                }
                constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
                    fn: runBindingEffect,
                    info: info, trigger: trigger
                });
            }
        }
    }
}
/**
 * Implements the "binding" (property/path binding) effect.
 *
 * Note that binding syntax is overridable via `_parseBindings` and
 * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
 * non-literal parts returned from `_parseBindings`.  However,
 * there is no support for _path_ bindings via custom binding parts,
 * as this is specific to Polymer's path binding syntax.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} path Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @param {boolean} hasPaths True with `props` contains one or more paths
 * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
 *   metadata
 * @return {void}
 * @private
 */
function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    var node = nodeList[info.index];
    var binding = info.binding;
    var part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && (path.length > part.source.length) &&
        (binding.kind == 'property') && !binding.isCompound &&
        node.__isPropertyEffectsClient &&
        node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
        var value = props[path];
        path = translate(part.source, binding.target, path);
        if (node._setPendingPropertyOrPath(path, value, false, true)) {
            inst._enqueueClient(node);
        }
    }
    else {
        var value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
        // Propagate value to child
        applyBindingValue(inst, node, binding, part, value);
    }
}
/**
 * Sets the value for an "binding" (binding) effect to a node,
 * either as a property or attribute.
 *
 * @param {!Polymer_PropertyEffects} inst The instance owning the binding effect
 * @param {Node} node Target node for binding
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @param {*} value Value to set
 * @return {void}
 * @private
 */
function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (sanitizeDOMValue) {
        value = sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
        // Attribute binding
        inst._valueToNodeAttribute(/** @type {Element} */ (node), value, binding.target);
    }
    else {
        // Property binding
        var prop = binding.target;
        if (node.__isPropertyEffectsClient &&
            node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
            if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
                if (node._setPendingProperty(prop, value)) {
                    inst._enqueueClient(node);
                }
            }
        }
        else {
            inst._setUnmanagedPropertyToNode(node, prop, value);
        }
    }
}
/**
 * Transforms an "binding" effect value based on compound & negation
 * effect metadata, as well as handling for special-case properties
 *
 * @param {Node} node Node the value will be set to
 * @param {*} value Value to set
 * @param {!Binding} binding Binding metadata
 * @param {!BindingPart} part Binding part metadata
 * @return {*} Transformed value to set
 * @private
 */
function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
        var storage = node.__dataCompoundStorage[binding.target];
        storage[part.compoundIndex] = value;
        value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
        // Some browsers serialize `undefined` to `"undefined"`
        if (binding.target === 'textContent' ||
            (binding.target === 'value' &&
                (node.localName === 'input' || node.localName === 'textarea'))) {
            value = value == undefined ? '' : value;
        }
    }
    return value;
}
/**
 * Returns true if a binding's metadata meets all the requirements to allow
 * 2-way binding, and therefore a `<property>-changed` event listener should be
 * added:
 * - used curly braces
 * - is a property (not attribute) binding
 * - is not a textContent binding
 * - is not compound
 *
 * @param {!Binding} binding Binding metadata
 * @return {boolean} True if 2-way listener should be added
 * @private
 */
function shouldAddListener(binding) {
    return Boolean(binding.target) &&
        binding.kind != 'attribute' &&
        binding.kind != 'text' &&
        !binding.isCompound &&
        binding.parts[0].mode === '{';
}
/**
 * Setup compound binding storage structures, notify listeners, and dataHost
 * references onto the bound nodeList.
 *
 * @param {!Polymer_PropertyEffects} inst Instance that bas been previously
 *     bound
 * @param {TemplateInfo} templateInfo Template metadata
 * @return {void}
 * @private
 */
function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    var nodeList = templateInfo.nodeList, nodeInfoList = templateInfo.nodeInfoList;
    if (nodeInfoList.length) {
        for (var i = 0; i < nodeInfoList.length; i++) {
            var info = nodeInfoList[i];
            var node = nodeList[i];
            var bindings = info.bindings;
            if (bindings) {
                for (var i_1 = 0; i_1 < bindings.length; i_1++) {
                    var binding = bindings[i_1];
                    setupCompoundStorage(node, binding);
                    addNotifyListener(node, inst, binding);
                }
            }
            node.__dataHost = inst;
        }
    }
}
/**
 * Initializes `__dataCompoundStorage` local storage on a bound node with
 * initial literal data for compound bindings, and sets the joined
 * literal parts to the bound property.
 *
 * When changes to compound parts occur, they are first set into the compound
 * storage array for that property, and then the array is joined to result in
 * the final value set to the property/attribute.
 *
 * @param {Node} node Bound node to initialize
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
        // Create compound storage map
        var storage = node.__dataCompoundStorage ||
            (node.__dataCompoundStorage = {});
        var parts = binding.parts;
        // Copy literals from parts into storage for this binding
        var literals = new Array(parts.length);
        for (var j = 0; j < parts.length; j++) {
            literals[j] = parts[j].literal;
        }
        var target = binding.target;
        storage[target] = literals;
        // Configure properties with their literal parts
        if (binding.literal && binding.kind == 'property') {
            // Note, className needs style scoping so this needs wrapping.
            // We may also want to consider doing this for `textContent` and
            // `innerHTML`.
            if (target === 'className') {
                node = wrap(node);
            }
            node[target] = binding.literal;
        }
    }
}
/**
 * Adds a 2-way binding notification event listener to the node specified
 *
 * @param {Object} node Child element to add listener to
 * @param {!Polymer_PropertyEffects} inst Host element instance to handle
 *     notification event
 * @param {Binding} binding Binding metadata
 * @return {void}
 * @private
 */
function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
        var part_1 = binding.parts[0];
        node.addEventListener(binding.listenerEvent, function (e) {
            handleNotification(e, inst, binding.target, part_1.source, part_1.negate);
        });
    }
}
// -- for method-based effects (complexObserver & computed) --------------
/**
 * Adds property effects for each argument in the method signature (and
 * optionally, for the method name if `dynamic` is true) that calls the
 * provided effect function.
 *
 * @param {Element | Object} model Prototype or instance
 * @param {!MethodSignature} sig Method signature metadata
 * @param {string} type Type of property effect to add
 * @param {Function} effectFn Function to run when arguments change
 * @param {*=} methodInfo Effect-specific information to be included in
 *   method effect metadata
 * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
 *   method names should be included as a dependency to the effect. Note,
 *   defaults to true if the signature is static (sig.static is true).
 * @return {void}
 * @private
 */
function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || (dynamicFn &&
        (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
    var info = {
        methodName: sig.methodName,
        args: sig.args,
        methodInfo: methodInfo,
        dynamicFn: dynamicFn
    };
    for (var i = 0, arg = void 0; (i < sig.args.length) && (arg = sig.args[i]); i++) {
        if (!arg.literal) {
            model._addPropertyEffect(arg.rootProperty, type, {
                fn: effectFn, info: info, trigger: arg
            });
        }
    }
    if (dynamicFn) {
        model._addPropertyEffect(sig.methodName, type, {
            fn: effectFn, info: info
        });
    }
}
/**
 * Calls a method with arguments marshaled from properties on the instance
 * based on the method signature contained in the effect metadata.
 *
 * Multi-property observers, computed properties, and inline computing
 * functions call this function to invoke the method, then use the return
 * value accordingly.
 *
 * @param {!Polymer_PropertyEffects} inst The instance the effect will be run on
 * @param {string} property Name of property
 * @param {Object} props Bag of current property changes
 * @param {Object} oldProps Bag of previous values for changed properties
 * @param {?} info Effect metadata
 * @return {*} Returns the return value from the method invocation
 * @private
 */
function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    var context = inst._methodHost || inst;
    var fn = context[info.methodName];
    if (fn) {
        var args = inst._marshalArgs(info.args, property, props);
        return fn.apply(context, args);
    }
    else if (!info.dynamicFn) {
        console.warn('method `' + info.methodName + '` not defined');
    }
}
var emptyArray = [];
// Regular expressions used for binding
var IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
var NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
var SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
var DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
var STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
var ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' + STRING + ')\\s*' + ')';
var ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
var ARGUMENT_LIST = '(?:' + '\\(\\s*' +
    '(?:' + ARGUMENTS + '?' + ')' +
    '\\)\\s*' + ')';
var BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
var OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
var CLOSE_BRACKET = '(?:]]|}})';
var NEGATE = '(?:(!)\\s*)?'; // Group 2
var EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
var bindingRegex = new RegExp(EXPRESSION, "g");
/**
 * Create a string from binding parts of all the literal parts
 *
 * @param {!Array<BindingPart>} parts All parts to stringify
 * @return {string} String made from the literal parts
 */
function literalFromParts(parts) {
    var s = '';
    for (var i = 0; i < parts.length; i++) {
        var literal = parts[i].literal;
        s += literal || '';
    }
    return s;
}
/**
 * Parses an expression string for a method signature, and returns a metadata
 * describing the method in terms of `methodName`, `static` (whether all the
 * arguments are literals), and an array of `args`
 *
 * @param {string} expression The expression to parse
 * @return {?MethodSignature} The method metadata object if a method expression was
 *   found, otherwise `undefined`
 * @private
 */
function parseMethod(expression) {
    // tries to match valid javascript property names
    var m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
        var methodName = m[1];
        var sig = { methodName: methodName, static: true, args: emptyArray };
        if (m[2].trim()) {
            // replace escaped commas with comma entity, split on un-escaped commas
            var args = m[2].replace(/\\,/g, '&comma;').split(',');
            return parseArgs(args, sig);
        }
        else {
            return sig;
        }
    }
    return null;
}
/**
 * Parses an array of arguments and sets the `args` property of the supplied
 * signature metadata object. Sets the `static` property to false if any
 * argument is a non-literal.
 *
 * @param {!Array<string>} argList Array of argument names
 * @param {!MethodSignature} sig Method signature metadata object
 * @return {!MethodSignature} The updated signature metadata object
 * @private
 */
function parseArgs(argList, sig) {
    sig.args = argList.map(function (rawArg) {
        var arg = parseArg(rawArg);
        if (!arg.literal) {
            sig.static = false;
        }
        return arg;
    }, this);
    return sig;
}
/**
 * Parses an individual argument, and returns an argument metadata object
 * with the following fields:
 *
 *   {
 *     value: 'prop',        // property/path or literal value
 *     literal: false,       // whether argument is a literal
 *     structured: false,    // whether the property is a path
 *     rootProperty: 'prop', // the root property of the path
 *     wildcard: false       // whether the argument was a wildcard '.*' path
 *   }
 *
 * @param {string} rawArg The string value of the argument
 * @return {!MethodArg} Argument metadata object
 * @private
 */
function parseArg(rawArg) {
    // clean up whitespace
    var arg = rawArg.trim()
        // replace comma entity with comma
        .replace(/&comma;/g, ',')
        // repair extra escape sequences; note only commas strictly need
        // escaping, but we allow any other char to be escaped since its
        // likely users will do this
        .replace(/\\(.)/g, '\$1');
    // basic argument descriptor
    var a = {
        name: arg,
        value: '',
        literal: false
    };
    // detect literal value (must be String or Number)
    var fc = arg[0];
    if (fc === '-') {
        fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
        fc = '#';
    }
    switch (fc) {
        case "'":
        case '"':
            a.value = arg.slice(1, -1);
            a.literal = true;
            break;
        case '#':
            a.value = Number(arg);
            a.literal = true;
            break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
        a.rootProperty = root(arg);
        // detect structured path (has dots)
        a.structured = isPath(arg);
        if (a.structured) {
            a.wildcard = (arg.slice(-2) == '.*');
            if (a.wildcard) {
                a.name = arg.slice(0, -2);
            }
        }
    }
    return a;
}
function getArgValue(data, props, path) {
    var value = get(data, path);
    // when data is not stored e.g. `splices`, get the value from changedProps
    // TODO(kschaaf): Note, this can cause a rare issue where the wildcard
    // info.value could pull a stale value out of changedProps during a reentrant
    // change that sets the value back to undefined.
    // https://github.com/Polymer/polymer/issues/5479
    if (value === undefined) {
        value = props[path];
    }
    return value;
}
// data api
/**
 * Sends array splice notifications (`.splices` and `.length`)
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {Array} splices Array of splice records
 * @return {void}
 * @private
 */
function notifySplices(inst, array, path, splices) {
    inst.notifyPath(path + '.splices', { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
}
/**
 * Creates a splice record and sends an array splice notification for
 * the described mutation
 *
 * Note: this implementation only accepts normalized paths
 *
 * @param {!Polymer_PropertyEffects} inst Instance to send notifications to
 * @param {Array} array The array the mutations occurred on
 * @param {string} path The path to the array that was mutated
 * @param {number} index Index at which the array mutation occurred
 * @param {number} addedCount Number of added items
 * @param {Array} removed Array of removed items
 * @return {void}
 * @private
 */
function notifySplice(inst, array, path, index, addedCount, removed) {
    notifySplices(inst, array, path, [{
            index: index,
            addedCount: addedCount,
            removed: removed,
            object: array,
            type: 'splice'
        }]);
}
/**
 * Returns an upper-cased version of the string.
 *
 * @param {string} name String to uppercase
 * @return {string} Uppercased string
 * @private
 */
function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
}
/**
 * Element class mixin that provides meta-programming for Polymer's template
 * binding and data observation (collectively, "property effects") system.
 *
 * This mixin uses provides the following key static methods for adding
 * property effects to an element class:
 * - `addPropertyEffect`
 * - `createPropertyObserver`
 * - `createMethodObserver`
 * - `createNotifyingProperty`
 * - `createReadOnlyProperty`
 * - `createReflectedProperty`
 * - `createComputedProperty`
 * - `bindTemplate`
 *
 * Each method creates one or more property accessors, along with metadata
 * used by this mixin's implementation of `_propertiesChanged` to perform
 * the property effects.
 *
 * Underscored versions of the above methods also exist on the element
 * prototype for adding property effects on instances at runtime.
 *
 * Note that this mixin overrides several `PropertyAccessors` methods, in
 * many cases to maintain guarantees provided by the Polymer 1.x features;
 * notably it changes property accessors to be synchronous by default
 * whereas the default when using `PropertyAccessors` standalone is to be
 * async by default.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin TemplateStamp
 * @appliesMixin PropertyAccessors
 * @summary Element class mixin that provides meta-programming for Polymer's
 * template binding and data observation system.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var PropertyEffects = dedupingMixin(function (superClass) {
    /**
     * @constructor
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     * @private
     */
    var propertyEffectsBase = TemplateStamp(PropertyAccessors(superClass));
    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */
    var PropertyEffects = /** @class */ (function (_super) {
        __extends(PropertyEffects, _super);
        function PropertyEffects() {
            var _this = _super.call(this) || this;
            /** @type {boolean} */
            // Used to identify users of this mixin, ala instanceof
            _this.__isPropertyEffectsClient = true;
            /** @type {number} */
            // NOTE: used to track re-entrant calls to `_flushProperties`
            // path changes dirty check against `__dataTemp` only during one "turn"
            // and are cleared when `__dataCounter` returns to 0.
            _this.__dataCounter = 0;
            return _this;
        }
        Object.defineProperty(PropertyEffects.prototype, "PROPERTY_EFFECT_TYPES", {
            /**
             * @return {!Object<string, string>} Effect prototype property name map.
             */
            get: function () {
                return TYPES;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @override
         * @return {void}
         */
        PropertyEffects.prototype._initializeProperties = function () {
            _super.prototype._initializeProperties.call(this);
            hostStack.registerHost(this);
            this.__dataClientsReady = false;
            this.__dataPendingClients = null;
            this.__dataToNotify = null;
            this.__dataLinkedPaths = null;
            this.__dataHasPaths = false;
            // May be set on instance prior to upgrade
            this.__dataCompoundStorage = this.__dataCompoundStorage || null;
            this.__dataHost = this.__dataHost || null;
            this.__dataTemp = {};
            this.__dataClientsInitialized = false;
        };
        /**
         * Overrides `PropertyAccessors` implementation to provide a
         * more efficient implementation of initializing properties from
         * the prototype on the instance.
         *
         * @override
         * @param {Object} props Properties to initialize on the prototype
         * @return {void}
         */
        PropertyEffects.prototype._initializeProtoProperties = function (props) {
            this.__data = Object.create(props);
            this.__dataPending = Object.create(props);
            this.__dataOld = {};
        };
        /**
         * Overrides `PropertyAccessors` implementation to avoid setting
         * `_setProperty`'s `shouldNotify: true`.
         *
         * @override
         * @param {Object} props Properties to initialize on the instance
         * @return {void}
         */
        PropertyEffects.prototype._initializeInstanceProperties = function (props) {
            var readOnly = this[TYPES.READ_ONLY];
            for (var prop in props) {
                if (!readOnly || !readOnly[prop]) {
                    this.__dataPending = this.__dataPending || {};
                    this.__dataOld = this.__dataOld || {};
                    this.__data[prop] = this.__dataPending[prop] = props[prop];
                }
            }
        };
        // Prototype setup ----------------------------------------
        /**
         * Equivalent to static `addPropertyEffect` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._addPropertyEffect = function (property, type, effect) {
            this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
            // effects are accumulated into arrays per property based on type
            var effects = ensureOwnEffectMap(this, type)[property];
            if (!effects) {
                effects = this[type][property] = [];
            }
            effects.push(effect);
        };
        /**
         * Removes the given property effect.
         *
         * @override
         * @param {string} property Property the effect was associated with
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object to remove
         * @return {void}
         */
        PropertyEffects.prototype._removePropertyEffect = function (property, type, effect) {
            var effects = ensureOwnEffectMap(this, type)[property];
            var idx = effects.indexOf(effect);
            if (idx >= 0) {
                effects.splice(idx, 1);
            }
        };
        /**
         * Returns whether the current prototype/instance has a property effect
         * of a certain type.
         *
         * @override
         * @param {string} property Property name
         * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @return {boolean} True if the prototype/instance has an effect of this
         *     type
         * @protected
         */
        PropertyEffects.prototype._hasPropertyEffect = function (property, type) {
            var effects = this[type];
            return Boolean(effects && effects[property]);
        };
        /**
         * Returns whether the current prototype/instance has a "read only"
         * accessor for the given property.
         *
         * @override
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this
         *     type
         * @protected
         */
        PropertyEffects.prototype._hasReadOnlyEffect = function (property) {
            return this._hasPropertyEffect(property, TYPES.READ_ONLY);
        };
        /**
         * Returns whether the current prototype/instance has a "notify"
         * property effect for the given property.
         *
         * @override
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this
         *     type
         * @protected
         */
        PropertyEffects.prototype._hasNotifyEffect = function (property) {
            return this._hasPropertyEffect(property, TYPES.NOTIFY);
        };
        /**
         * Returns whether the current prototype/instance has a "reflect to
         * attribute" property effect for the given property.
         *
         * @override
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this
         *     type
         * @protected
         */
        PropertyEffects.prototype._hasReflectEffect = function (property) {
            return this._hasPropertyEffect(property, TYPES.REFLECT);
        };
        /**
         * Returns whether the current prototype/instance has a "computed"
         * property effect for the given property.
         *
         * @override
         * @param {string} property Property name
         * @return {boolean} True if the prototype/instance has an effect of this
         *     type
         * @protected
         */
        PropertyEffects.prototype._hasComputedEffect = function (property) {
            return this._hasPropertyEffect(property, TYPES.COMPUTE);
        };
        // Runtime ----------------------------------------
        /**
         * Sets a pending property or path.  If the root property of the path in
         * question had no accessor, the path is set, otherwise it is enqueued
         * via `_setPendingProperty`.
         *
         * This function isolates relatively expensive functionality necessary
         * for the public API (`set`, `setProperties`, `notifyPath`, and property
         * change listeners via {{...}} bindings), such that it is only done
         * when paths enter the system, and not at every propagation step.  It
         * also sets a `__dataHasPaths` flag on the instance which is used to
         * fast-path slower path-matching code in the property effects host paths.
         *
         * `path` can be a path string or array of path parts as accepted by the
         * public API.
         *
         * @override
         * @param {string | !Array<number|string>} path Path to set
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify Set to true if this change should
         *  cause a property notification event dispatch
         * @param {boolean=} isPathNotification If the path being set is a path
         *   notification of an already changed value, as opposed to a request
         *   to set and notify the change.  In the latter `false` case, a dirty
         *   check is performed and then the value is set to the path before
         *   enqueuing the pending property change.
         * @return {boolean} Returns true if the property/path was enqueued in
         *   the pending changes bag.
         * @protected
         */
        PropertyEffects.prototype._setPendingPropertyOrPath = function (path, value, shouldNotify, isPathNotification) {
            if (isPathNotification ||
                root(Array.isArray(path) ? path[0] : path) !== path) {
                // Dirty check changes being set to a path against the actual object,
                // since this is the entry point for paths into the system; from here
                // the only dirty checks are against the `__dataTemp` cache to prevent
                // duplicate work in the same turn only. Note, if this was a notification
                // of a change already set to a path (isPathNotification: true),
                // we always let the change through and skip the `set` since it was
                // already dirty checked at the point of entry and the underlying
                // object has already been updated
                if (!isPathNotification) {
                    var old = get(this, path);
                    path = /** @type {string} */ (set(this, path, value));
                    // Use property-accessor's simpler dirty check
                    if (!path || !_super.prototype._shouldPropertyChange.call(this, path, value, old)) {
                        return false;
                    }
                }
                this.__dataHasPaths = true;
                if (this._setPendingProperty(/**@type{string}*/ (path), value, shouldNotify)) {
                    computeLinkedPaths(this, /**@type{string}*/ (path), value);
                    return true;
                }
            }
            else {
                if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
                    return this._setPendingProperty(/**@type{string}*/ (path), value, shouldNotify);
                }
                else {
                    this[path] = value;
                }
            }
            return false;
        };
        /**
         * Applies a value to a non-Polymer element/node's property.
         *
         * The implementation makes a best-effort at binding interop:
         * Some native element properties have side-effects when
         * re-setting the same value (e.g. setting `<input>.value` resets the
         * cursor position), so we do a dirty-check before setting the value.
         * However, for better interop with non-Polymer custom elements that
         * accept objects, we explicitly re-set object changes coming from the
         * Polymer world (which may include deep object changes without the
         * top reference changing), erring on the side of providing more
         * information.
         *
         * Users may override this method to provide alternate approaches.
         *
         * @override
         * @param {!Node} node The node to set a property on
         * @param {string} prop The property to set
         * @param {*} value The value to set
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._setUnmanagedPropertyToNode = function (node, prop, value) {
            // It is a judgment call that resetting primitives is
            // "bad" and resettings objects is also "good"; alternatively we could
            // implement a whitelist of tag & property values that should never
            // be reset (e.g. <input>.value && <select>.value)
            if (value !== node[prop] || typeof value == 'object') {
                // Note, className needs style scoping so this needs wrapping.
                if (prop === 'className') {
                    node = /** @type {!Node} */ (wrap(node));
                }
                node[prop] = value;
            }
        };
        /**
         * Overrides the `PropertiesChanged` implementation to introduce special
         * dirty check logic depending on the property & value being set:
         *
         * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
         *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
         * 2. Object set to simple property (e.g. 'prop': {...})
         *    Stored in `__dataTemp` and `__data`, dirty checked against
         *    `__dataTemp` by default implementation of `_shouldPropertyChange`
         * 3. Primitive value set to simple property (e.g. 'prop': 42)
         *    Stored in `__data`, dirty checked against `__data`
         *
         * The dirty-check is important to prevent cycles due to two-way
         * notification, but paths and objects are only dirty checked against any
         * previous value set during this turn via a "temporary cache" that is
         * cleared when the last `_propertiesChanged` exits. This is so:
         * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
         *    due to array mutations like shift/unshift/splice; this is fine
         *    since path changes are dirty-checked at user entry points like `set`
         * b. dirty-checking for objects only lasts one turn to allow the user
         *    to mutate the object in-place and re-set it with the same identity
         *    and have all sub-properties re-propagated in a subsequent turn.
         *
         * The temp cache is not necessarily sufficient to prevent invalid array
         * paths, since a splice can happen during the same turn (with pathological
         * user code); we could introduce a "fixup" for temporarily cached array
         * paths if needed: https://github.com/Polymer/polymer/issues/4227
         *
         * @override
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @param {boolean=} shouldNotify True if property should fire notification
         *   event (applies only for `notify: true` properties)
         * @return {boolean} Returns true if the property changed
         */
        PropertyEffects.prototype._setPendingProperty = function (property, value, shouldNotify) {
            var propIsPath = this.__dataHasPaths && isPath(property);
            var prevProps = propIsPath ? this.__dataTemp : this.__data;
            if (this._shouldPropertyChange(property, value, prevProps[property])) {
                if (!this.__dataPending) {
                    this.__dataPending = {};
                    this.__dataOld = {};
                }
                // Ensure old is captured from the last turn
                if (!(property in this.__dataOld)) {
                    this.__dataOld[property] = this.__data[property];
                }
                // Paths are stored in temporary cache (cleared at end of turn),
                // which is used for dirty-checking, all others stored in __data
                if (propIsPath) {
                    this.__dataTemp[property] = value;
                }
                else {
                    this.__data[property] = value;
                }
                // All changes go into pending property bag, passed to _propertiesChanged
                this.__dataPending[property] = value;
                // Track properties that should notify separately
                if (propIsPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
                    this.__dataToNotify = this.__dataToNotify || {};
                    this.__dataToNotify[property] = shouldNotify;
                }
                return true;
            }
            return false;
        };
        /**
         * Overrides base implementation to ensure all accessors set `shouldNotify`
         * to true, for per-property notification tracking.
         *
         * @override
         * @param {string} property Name of the property
         * @param {*} value Value to set
         * @return {void}
         */
        PropertyEffects.prototype._setProperty = function (property, value) {
            if (this._setPendingProperty(property, value, true)) {
                this._invalidateProperties();
            }
        };
        /**
         * Overrides `PropertyAccessor`'s default async queuing of
         * `_propertiesChanged`: if `__dataReady` is false (has not yet been
         * manually flushed), the function no-ops; otherwise flushes
         * `_propertiesChanged` synchronously.
         *
         * @override
         * @return {void}
         */
        PropertyEffects.prototype._invalidateProperties = function () {
            if (this.__dataReady) {
                this._flushProperties();
            }
        };
        /**
         * Enqueues the given client on a list of pending clients, whose
         * pending property changes can later be flushed via a call to
         * `_flushClients`.
         *
         * @override
         * @param {Object} client PropertyEffects client to enqueue
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._enqueueClient = function (client) {
            this.__dataPendingClients = this.__dataPendingClients || [];
            if (client !== this) {
                this.__dataPendingClients.push(client);
            }
        };
        /**
         * Overrides superclass implementation.
         *
         * @override
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._flushProperties = function () {
            this.__dataCounter++;
            _super.prototype._flushProperties.call(this);
            this.__dataCounter--;
        };
        /**
         * Flushes any clients previously enqueued via `_enqueueClient`, causing
         * their `_flushProperties` method to run.
         *
         * @override
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._flushClients = function () {
            if (!this.__dataClientsReady) {
                this.__dataClientsReady = true;
                this._readyClients();
                // Override point where accessors are turned on; importantly,
                // this is after clients have fully readied, providing a guarantee
                // that any property effects occur only after all clients are ready.
                this.__dataReady = true;
            }
            else {
                this.__enableOrFlushClients();
            }
        };
        // NOTE: We ensure clients either enable or flush as appropriate. This
        // handles two corner cases:
        // (1) clients flush properly when connected/enabled before the host
        // enables; e.g.
        //   (a) Templatize stamps with no properties and does not flush and
        //   (b) the instance is inserted into dom and
        //   (c) then the instance flushes.
        // (2) clients enable properly when not connected/enabled when the host
        // flushes; e.g.
        //   (a) a template is runtime stamped and not yet connected/enabled
        //   (b) a host sets a property, causing stamped dom to flush
        //   (c) the stamped dom enables.
        PropertyEffects.prototype.__enableOrFlushClients = function () {
            var clients = this.__dataPendingClients;
            if (clients) {
                this.__dataPendingClients = null;
                for (var i = 0; i < clients.length; i++) {
                    var client = clients[i];
                    if (!client.__dataEnabled) {
                        client._enableProperties();
                    }
                    else if (client.__dataPending) {
                        client._flushProperties();
                    }
                }
            }
        };
        /**
         * Perform any initial setup on client dom. Called before the first
         * `_flushProperties` call on client dom and before any element
         * observers are called.
         *
         * @override
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._readyClients = function () {
            this.__enableOrFlushClients();
        };
        /**
         * Sets a bag of property changes to this instance, and
         * synchronously processes all effects of the properties as a batch.
         *
         * Property names must be simple properties, not paths.  Batched
         * path propagation is not supported.
         *
         * @override
         * @param {Object} props Bag of one or more key-value pairs whose key is
         *   a property and value is the new value to set for that property.
         * @param {boolean=} setReadOnly When true, any private values set in
         *   `props` will be set. By default, `setProperties` will not set
         *   `readOnly: true` root properties.
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.setProperties = function (props, setReadOnly) {
            for (var path in props) {
                if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
                    //TODO(kschaaf): explicitly disallow paths in setProperty?
                    // wildcard observers currently only pass the first changed path
                    // in the `info` object, and you could do some odd things batching
                    // paths, e.g. {'foo.bar': {...}, 'foo': null}
                    this._setPendingPropertyOrPath(path, props[path], true);
                }
            }
            this._invalidateProperties();
        };
        /**
         * Overrides `PropertyAccessors` so that property accessor
         * side effects are not enabled until after client dom is fully ready.
         * Also calls `_flushClients` callback to ensure client dom is enabled
         * that was not enabled as a result of flushing properties.
         *
         * @override
         * @return {void}
         */
        PropertyEffects.prototype.ready = function () {
            // It is important that `super.ready()` is not called here as it
            // immediately turns on accessors. Instead, we wait until `readyClients`
            // to enable accessors to provide a guarantee that clients are ready
            // before processing any accessors side effects.
            this._flushProperties();
            // If no data was pending, `_flushProperties` will not `flushClients`
            // so ensure this is done.
            if (!this.__dataClientsReady) {
                this._flushClients();
            }
            // Before ready, client notifications do not trigger _flushProperties.
            // Therefore a flush is necessary here if data has been set.
            if (this.__dataPending) {
                this._flushProperties();
            }
        };
        /**
         * Implements `PropertyAccessors`'s properties changed callback.
         *
         * Runs each class of effects for the batch of changed properties in
         * a specific order (compute, propagate, reflect, observe, notify).
         *
         * @override
         * @param {!Object} currentProps Bag of all current accessor values
         * @param {?Object} changedProps Bag of properties changed since the last
         *   call to `_propertiesChanged`
         * @param {?Object} oldProps Bag of previous values for each property
         *   in `changedProps`
         * @return {void}
         */
        PropertyEffects.prototype._propertiesChanged = function (currentProps, changedProps, oldProps) {
            // ----------------------------
            // let c = Object.getOwnPropertyNames(changedProps || {});
            // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
            // if (window.debug) { debugger; }
            // ----------------------------
            var hasPaths = this.__dataHasPaths;
            this.__dataHasPaths = false;
            // Compute properties
            runComputedEffects(this, changedProps, oldProps, hasPaths);
            // Clear notify properties prior to possible reentry (propagate, observe),
            // but after computing effects have a chance to add to them
            var notifyProps = this.__dataToNotify;
            this.__dataToNotify = null;
            // Propagate properties to clients
            this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
            // Flush clients
            this._flushClients();
            // Reflect properties
            runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
            // Observe properties
            runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
            // Notify properties to host
            if (notifyProps) {
                runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
            }
            // Clear temporary cache at end of turn
            if (this.__dataCounter == 1) {
                this.__dataTemp = {};
            }
            // ----------------------------
            // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
            // ----------------------------
        };
        /**
         * Called to propagate any property changes to stamped template nodes
         * managed by this element.
         *
         * @override
         * @param {Object} changedProps Bag of changed properties
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._propagatePropertyChanges = function (changedProps, oldProps, hasPaths) {
            if (this[TYPES.PROPAGATE]) {
                runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
            }
            var templateInfo = this.__templateInfo;
            while (templateInfo) {
                runEffects(this, templateInfo.propertyEffects, changedProps, oldProps, hasPaths, templateInfo.nodeList);
                templateInfo = templateInfo.nextTemplateInfo;
            }
        };
        /**
         * Aliases one data path as another, such that path notifications from one
         * are routed to the other.
         *
         * @override
         * @param {string | !Array<string|number>} to Target path to link.
         * @param {string | !Array<string|number>} from Source path to link.
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.linkPaths = function (to, from) {
            to = normalize(to);
            from = normalize(from);
            this.__dataLinkedPaths = this.__dataLinkedPaths || {};
            this.__dataLinkedPaths[to] = from;
        };
        /**
         * Removes a data path alias previously established with `_linkPaths`.
         *
         * Note, the path to unlink should be the target (`to`) used when
         * linking the paths.
         *
         * @override
         * @param {string | !Array<string|number>} path Target path to unlink.
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.unlinkPaths = function (path) {
            path = normalize(path);
            if (this.__dataLinkedPaths) {
                delete this.__dataLinkedPaths[path];
            }
        };
        /**
         * Notify that an array has changed.
         *
         * Example:
         *
         *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
         *     ...
         *     this.items.splice(1, 1, {name: 'Sam'});
         *     this.items.push({name: 'Bob'});
         *     this.notifySplices('items', [
         *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1,
         *         object: this.items, type: 'splice' },
         *       { index: 3, removed: [], addedCount: 1,
         *         object: this.items, type: 'splice'}
         *     ]);
         *
         * @param {string} path Path that should be notified.
         * @param {Array} splices Array of splice records indicating ordered
         *   changes that occurred to the array. Each record should have the
         *   following fields:
         *    * index: index at which the change occurred
         *    * removed: array of items that were removed from this index
         *    * addedCount: number of new items added at this index
         *    * object: a reference to the array in question
         *    * type: the string literal 'splice'
         *
         *   Note that splice records _must_ be normalized such that they are
         *   reported in index order (raw results from `Object.observe` are not
         *   ordered and must be normalized/merged before notifying).
         *
         * @override
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.notifySplices = function (path, splices) {
            var info = { path: '' };
            var array = /** @type {Array} */ (get(this, path, info));
            notifySplices(this, array, info.path, splices);
        };
        /**
         * Convenience method for reading a value from a path.
         *
         * Note, if any part in the path is undefined, this method returns
         * `undefined` (this method does not throw when dereferencing undefined
         * paths).
         *
         * @override
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `users.12.name` or `['users', 12, 'name']`).
         * @param {Object=} root Root object from which the path is evaluated.
         * @return {*} Value at the path, or `undefined` if any part of the path
         *   is undefined.
         * @public
         */
        PropertyEffects.prototype.get = function (path, root) {
            return get(root || this, path);
        };
        /**
         * Convenience method for setting a value to a path and notifying any
         * elements bound to the same path.
         *
         * Note, if any part in the path except for the last is undefined,
         * this method does nothing (this method does not throw when
         * dereferencing undefined paths).
         *
         * @override
         * @param {(string|!Array<(string|number)>)} path Path to the value
         *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
         *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
         *   bracketed expressions are not supported; string-based path parts
         *   *must* be separated by dots.  Note that when dereferencing array
         *   indices, the index may be used as a dotted part directly
         *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
         * @param {*} value Value to set at the specified path.
         * @param {Object=} root Root object from which the path is evaluated.
         *   When specified, no notification will occur.
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.set = function (path, value, root) {
            if (root) {
                set(root, path, value);
            }
            else {
                if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][ /** @type {string} */(path)]) {
                    if (this._setPendingPropertyOrPath(path, value, true)) {
                        this._invalidateProperties();
                    }
                }
            }
        };
        /**
         * Adds items onto the end of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @override
         * @param {string | !Array<string|number>} path Path to array.
         * @param {...*} items Items to push onto array
         * @return {number} New length of the array.
         * @public
         */
        PropertyEffects.prototype.push = function (path) {
            var items = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                items[_i - 1] = arguments[_i];
            }
            var info = { path: '' };
            var array = /** @type {Array}*/ (get(this, path, info));
            var len = array.length;
            var ret = array.push.apply(array, items);
            if (items.length) {
                notifySplice(this, array, info.path, len, items.length, []);
            }
            return ret;
        };
        /**
         * Removes an item from the end of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @override
         * @param {string | !Array<string|number>} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */
        PropertyEffects.prototype.pop = function (path) {
            var info = { path: '' };
            var array = /** @type {Array} */ (get(this, path, info));
            var hadLength = Boolean(array.length);
            var ret = array.pop();
            if (hadLength) {
                notifySplice(this, array, info.path, array.length, 0, [ret]);
            }
            return ret;
        };
        /**
         * Starting from the start index specified, removes 0 or more items
         * from the array and inserts 0 or more new items in their place.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.splice`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @override
         * @param {string | !Array<string|number>} path Path to array.
         * @param {number} start Index from which to start removing/inserting.
         * @param {number=} deleteCount Number of items to remove.
         * @param {...*} items Items to insert into array.
         * @return {Array} Array of removed items.
         * @public
         */
        PropertyEffects.prototype.splice = function (path, start, deleteCount) {
            var items = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                items[_i - 3] = arguments[_i];
            }
            var info = { path: '' };
            var array = /** @type {Array} */ (get(this, path, info));
            // Normalize fancy native splice handling of crazy start values
            if (start < 0) {
                start = array.length - Math.floor(-start);
            }
            else if (start) {
                start = Math.floor(start);
            }
            // array.splice does different things based on the number of arguments
            // you pass in. Therefore, array.splice(0) and array.splice(0, undefined)
            // do different things. In the former, the whole array is cleared. In the
            // latter, no items are removed.
            // This means that we need to detect whether 1. one of the arguments
            // is actually passed in and then 2. determine how many arguments
            // we should pass on to the native array.splice
            //
            var ret;
            // Omit any additional arguments if they were not passed in
            if (arguments.length === 2) {
                ret = array.splice(start);
                // Either start was undefined and the others were defined, but in this
                // case we can safely pass on all arguments
                //
                // Note: this includes the case where none of the arguments were passed in,
                // e.g. this.splice('array'). However, if both start and deleteCount
                // are undefined, array.splice will not modify the array (as expected)
            }
            else {
                ret = array.splice.apply(array, __spreadArrays([start, deleteCount], items));
            }
            // At the end, check whether any items were passed in (e.g. insertions)
            // or if the return array contains items (e.g. deletions).
            // Only notify if items were added or deleted.
            if (items.length || ret.length) {
                notifySplice(this, array, info.path, start, items.length, ret);
            }
            return ret;
        };
        /**
         * Removes an item from the beginning of array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.pop`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @override
         * @param {string | !Array<string|number>} path Path to array.
         * @return {*} Item that was removed.
         * @public
         */
        PropertyEffects.prototype.shift = function (path) {
            var info = { path: '' };
            var array = /** @type {Array} */ (get(this, path, info));
            var hadLength = Boolean(array.length);
            var ret = array.shift();
            if (hadLength) {
                notifySplice(this, array, info.path, 0, 0, [ret]);
            }
            return ret;
        };
        /**
         * Adds items onto the beginning of the array at the path specified.
         *
         * The arguments after `path` and return value match that of
         * `Array.prototype.push`.
         *
         * This method notifies other paths to the same array that a
         * splice occurred to the array.
         *
         * @override
         * @param {string | !Array<string|number>} path Path to array.
         * @param {...*} items Items to insert info array
         * @return {number} New length of the array.
         * @public
         */
        PropertyEffects.prototype.unshift = function (path) {
            var items = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                items[_i - 1] = arguments[_i];
            }
            var info = { path: '' };
            var array = /** @type {Array} */ (get(this, path, info));
            var ret = array.unshift.apply(array, items);
            if (items.length) {
                notifySplice(this, array, info.path, 0, items.length, []);
            }
            return ret;
        };
        /**
         * Notify that a path has changed.
         *
         * Example:
         *
         *     this.item.user.name = 'Bob';
         *     this.notifyPath('item.user.name');
         *
         * @override
         * @param {string} path Path that should be notified.
         * @param {*=} value Value at the path (optional).
         * @return {void}
         * @public
         */
        PropertyEffects.prototype.notifyPath = function (path, value) {
            /** @type {string} */
            var propPath;
            if (arguments.length == 1) {
                // Get value if not supplied
                var info = { path: '' };
                value = get(this, path, info);
                propPath = info.path;
            }
            else if (Array.isArray(path)) {
                // Normalize path if needed
                propPath = normalize(path);
            }
            else {
                propPath = /** @type{string} */ (path);
            }
            if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
                this._invalidateProperties();
            }
        };
        /**
         * Equivalent to static `createReadOnlyProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._createReadOnlyProperty = function (property, protectedSetter) {
            this._addPropertyEffect(property, TYPES.READ_ONLY);
            if (protectedSetter) {
                this['_set' + upper(property)] = /** @this {PropertyEffects} */ function (value) {
                    this._setProperty(property, value);
                };
            }
        };
        /**
         * Equivalent to static `createPropertyObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Property name
         * @param {string|function(*,*)} method Function or name of observer method
         *     to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._createPropertyObserver = function (property, method, dynamicFn) {
            var info = { property: property, method: method, dynamicFn: Boolean(dynamicFn) };
            this._addPropertyEffect(property, TYPES.OBSERVE, {
                fn: runObserverEffect, info: info, trigger: { name: property }
            });
            if (dynamicFn) {
                this._addPropertyEffect(/** @type {string} */ (method), TYPES.OBSERVE, {
                    fn: runObserverEffect, info: info, trigger: { name: method }
                });
            }
        };
        /**
         * Equivalent to static `createMethodObserver` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._createMethodObserver = function (expression, dynamicFn) {
            var sig = parseMethod(expression);
            if (!sig) {
                throw new Error("Malformed observer expression '" + expression + "'");
            }
            createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
        };
        /**
         * Equivalent to static `createNotifyingProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Property name
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._createNotifyingProperty = function (property) {
            this._addPropertyEffect(property, TYPES.NOTIFY, {
                fn: runNotifyEffect,
                info: {
                    eventName: camelToDashCase(property) + '-changed',
                    property: property
                }
            });
        };
        /**
         * Equivalent to static `createReflectedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Property name
         * @return {void}
         * @protected
         * @suppress {missingProperties} go/missingfnprops
         */
        PropertyEffects.prototype._createReflectedProperty = function (property) {
            var attr = this.constructor.attributeNameForProperty(property);
            if (attr[0] === '-') {
                console.warn('Property ' + property + ' cannot be reflected to attribute ' +
                    attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.');
            }
            else {
                this._addPropertyEffect(property, TYPES.REFLECT, {
                    fn: runReflectEffect,
                    info: {
                        attrName: attr
                    }
                });
            }
        };
        /**
         * Equivalent to static `createComputedProperty` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * @override
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         *   whether method names should be included as a dependency to the effect.
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._createComputedProperty = function (property, expression, dynamicFn) {
            var sig = parseMethod(expression);
            if (!sig) {
                throw new Error("Malformed computed expression '" + expression + "'");
            }
            createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
        };
        /**
         * Gather the argument values for a method specified in the provided array
         * of argument metadata.
         *
         * The `path` and `value` arguments are used to fill in wildcard descriptor
         * when the method is being called as a result of a path notification.
         *
         * @param {!Array<!MethodArg>} args Array of argument metadata
         * @param {string} path Property/path name that triggered the method effect
         * @param {Object} props Bag of current property changes
         * @return {Array<*>} Array of argument values
         * @private
         */
        PropertyEffects.prototype._marshalArgs = function (args, path, props) {
            var data = this.__data;
            var values = [];
            for (var i = 0, l = args.length; i < l; i++) {
                var _a = args[i], name = _a.name, structured = _a.structured, wildcard = _a.wildcard, value = _a.value, literal = _a.literal;
                if (!literal) {
                    if (wildcard) {
                        var matches = isDescendant(name, path);
                        var pathValue = getArgValue(data, props, matches ? path : name);
                        value = {
                            path: matches ? path : name,
                            value: pathValue,
                            base: matches ? get(data, name) : pathValue
                        };
                    }
                    else {
                        value = structured ? getArgValue(data, props, name) : data[name];
                    }
                }
                values[i] = value;
            }
            return values;
        };
        // -- static class methods ------------
        /**
         * Ensures an accessor exists for the specified property, and adds
         * to a list of "property effects" that will run when the accessor for
         * the specified property is set.  Effects are grouped by "type", which
         * roughly corresponds to a phase in effect processing.  The effect
         * metadata should be in the following form:
         *
         *     {
         *       fn: effectFunction, // Reference to function to call to perform effect
         *       info: { ... }       // Effect metadata passed to function
         *       trigger: {          // Optional triggering metadata; if not provided
         *         name: string      // the property is treated as a wildcard
         *         structured: boolean
         *         wildcard: boolean
         *       }
         *     }
         *
         * Effects are called from `_propertiesChanged` in the following order by
         * type:
         *
         * 1. COMPUTE
         * 2. PROPAGATE
         * 3. REFLECT
         * 4. OBSERVE
         * 5. NOTIFY
         *
         * Effect functions are called with the following signature:
         *
         *     effectFunction(inst, path, props, oldProps, info, hasPaths)
         *
         * @param {string} property Property that should trigger the effect
         * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
         * @param {Object=} effect Effect metadata object
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.addPropertyEffect = function (property, type, effect) {
            this.prototype._addPropertyEffect(property, type, effect);
        };
        /**
         * Creates a single-property observer for the given property.
         *
         * @param {string} property Property name
         * @param {string|function(*,*)} method Function or name of observer method to call
         * @param {boolean=} dynamicFn Whether the method name should be included as
         *   a dependency to the effect.
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.createPropertyObserver = function (property, method, dynamicFn) {
            this.prototype._createPropertyObserver(property, method, dynamicFn);
        };
        /**
         * Creates a multi-property "method observer" based on the provided
         * expression, which should be a string in the form of a normal JavaScript
         * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
         * should correspond to a property or path in the context of this
         * prototype (or instance), or may be a literal string or number.
         *
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating
         * @return {void}
         *   whether method names should be included as a dependency to the effect.
         * @protected
         * @nocollapse
         */
        PropertyEffects.createMethodObserver = function (expression, dynamicFn) {
            this.prototype._createMethodObserver(expression, dynamicFn);
        };
        /**
         * Causes the setter for the given property to dispatch `<property>-changed`
         * events to notify of changes to the property.
         *
         * @param {string} property Property name
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.createNotifyingProperty = function (property) {
            this.prototype._createNotifyingProperty(property);
        };
        /**
         * Creates a read-only accessor for the given property.
         *
         * To set the property, use the protected `_setProperty` API.
         * To create a custom protected setter (e.g. `_setMyProp()` for
         * property `myProp`), pass `true` for `protectedSetter`.
         *
         * Note, if the property will have other property effects, this method
         * should be called first, before adding other effects.
         *
         * @param {string} property Property name
         * @param {boolean=} protectedSetter Creates a custom protected setter
         *   when `true`.
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.createReadOnlyProperty = function (property, protectedSetter) {
            this.prototype._createReadOnlyProperty(property, protectedSetter);
        };
        /**
         * Causes the setter for the given property to reflect the property value
         * to a (dash-cased) attribute of the same name.
         *
         * @param {string} property Property name
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.createReflectedProperty = function (property) {
            this.prototype._createReflectedProperty(property);
        };
        /**
         * Creates a computed property whose value is set to the result of the
         * method described by the given `expression` each time one or more
         * arguments to the method changes.  The expression should be a string
         * in the form of a normal JavaScript function signature:
         * `'methodName(arg1, [..., argn])'`
         *
         * @param {string} property Name of computed property to set
         * @param {string} expression Method expression
         * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
         *   method names should be included as a dependency to the effect.
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects.createComputedProperty = function (property, expression, dynamicFn) {
            this.prototype._createComputedProperty(property, expression, dynamicFn);
        };
        /**
         * Parses the provided template to ensure binding effects are created
         * for them, and then ensures property accessors are created for any
         * dependent properties in the template.  Binding effects for bound
         * templates are stored in a linked list on the instance so that
         * templates can be efficiently stamped and unstamped.
         *
         * @param {!HTMLTemplateElement} template Template containing binding
         *   bindings
         * @return {!TemplateInfo} Template metadata object
         * @protected
         * @nocollapse
         */
        PropertyEffects.bindTemplate = function (template) {
            return this.prototype._bindTemplate(template);
        };
        // -- binding ----------------------------------------------
        /**
         * Equivalent to static `bindTemplate` API but can be called on
         * an instance to add effects at runtime.  See that method for
         * full API docs.
         *
         * This method may be called on the prototype (for prototypical template
         * binding, to avoid creating accessors every instance) once per prototype,
         * and will be called with `runtimeBinding: true` by `_stampTemplate` to
         * create and link an instance of the template metadata associated with a
         * particular stamping.
         *
         * @override
         * @param {!HTMLTemplateElement} template Template containing binding
         *   bindings
         * @param {boolean=} instanceBinding When false (default), performs
         *   "prototypical" binding of the template and overwrites any previously
         *   bound template for the class. When true (as passed from
         *   `_stampTemplate`), the template info is instanced and linked into
         *   the list of bound templates.
         * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
         *   this is an instance of the prototypical template info
         * @protected
         * @suppress {missingProperties} go/missingfnprops
         */
        PropertyEffects.prototype._bindTemplate = function (template, instanceBinding) {
            var templateInfo = this.constructor._parseTemplate(template);
            var wasPreBound = this.__templateInfo == templateInfo;
            // Optimization: since this is called twice for proto-bound templates,
            // don't attempt to recreate accessors if this template was pre-bound
            if (!wasPreBound) {
                for (var prop in templateInfo.propertyEffects) {
                    this._createPropertyAccessor(prop);
                }
            }
            if (instanceBinding) {
                // For instance-time binding, create instance of template metadata
                // and link into list of templates if necessary
                templateInfo = /** @type {!TemplateInfo} */ (Object.create(templateInfo));
                templateInfo.wasPreBound = wasPreBound;
                if (!wasPreBound && this.__templateInfo) {
                    var last = this.__templateInfoLast || this.__templateInfo;
                    this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
                    templateInfo.previousTemplateInfo = last;
                    return templateInfo;
                }
            }
            return this.__templateInfo = templateInfo;
        };
        /**
         * Adds a property effect to the given template metadata, which is run
         * at the "propagate" stage of `_propertiesChanged` when the template
         * has been bound to the element via `_bindTemplate`.
         *
         * The `effect` object should match the format in `_addPropertyEffect`.
         *
         * @param {Object} templateInfo Template metadata to add effect to
         * @param {string} prop Property that should trigger the effect
         * @param {Object=} effect Effect metadata object
         * @return {void}
         * @protected
         * @nocollapse
         */
        PropertyEffects._addTemplatePropertyEffect = function (templateInfo, prop, effect) {
            var hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
            hostProps[prop] = true;
            var effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
            var propEffects = effects[prop] = effects[prop] || [];
            propEffects.push(effect);
        };
        /**
         * Stamps the provided template and performs instance-time setup for
         * Polymer template features, including data bindings, declarative event
         * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
         * is returned containing the stamped DOM, ready for insertion into the
         * DOM.
         *
         * This method may be called more than once; however note that due to
         * `shadycss` polyfill limitations, only styles from templates prepared
         * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
         * to the shadow root and support CSS custom properties), and note that
         * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
         * any styles required by in runtime-stamped templates must be included
         * in the main element template.
         *
         * @param {!HTMLTemplateElement} template Template to stamp
         * @return {!StampedTemplate} Cloned template content
         * @override
         * @protected
         */
        PropertyEffects.prototype._stampTemplate = function (template) {
            // Ensures that created dom is `_enqueueClient`'d to this element so
            // that it can be flushed on next call to `_flushProperties`
            hostStack.beginHosting(this);
            var dom = _super.prototype._stampTemplate.call(this, template);
            hostStack.endHosting(this);
            var templateInfo = /** @type {!TemplateInfo} */ (this._bindTemplate(template, true));
            // Add template-instance-specific data to instanced templateInfo
            templateInfo.nodeList = dom.nodeList;
            // Capture child nodes to allow unstamping of non-prototypical templates
            if (!templateInfo.wasPreBound) {
                var nodes = templateInfo.childNodes = [];
                for (var n = dom.firstChild; n; n = n.nextSibling) {
                    nodes.push(n);
                }
            }
            dom.templateInfo = templateInfo;
            // Setup compound storage, 2-way listeners, and dataHost for bindings
            setupBindings(this, templateInfo);
            // Flush properties into template nodes if already booted
            if (this.__dataReady) {
                runEffects(this, templateInfo.propertyEffects, this.__data, null, false, templateInfo.nodeList);
            }
            return dom;
        };
        /**
         * Removes and unbinds the nodes previously contained in the provided
         * DocumentFragment returned from `_stampTemplate`.
         *
         * @override
         * @param {!StampedTemplate} dom DocumentFragment previously returned
         *   from `_stampTemplate` associated with the nodes to be removed
         * @return {void}
         * @protected
         */
        PropertyEffects.prototype._removeBoundDom = function (dom) {
            // Unlink template info
            var templateInfo = dom.templateInfo;
            if (templateInfo.previousTemplateInfo) {
                templateInfo.previousTemplateInfo.nextTemplateInfo =
                    templateInfo.nextTemplateInfo;
            }
            if (templateInfo.nextTemplateInfo) {
                templateInfo.nextTemplateInfo.previousTemplateInfo =
                    templateInfo.previousTemplateInfo;
            }
            if (this.__templateInfoLast == templateInfo) {
                this.__templateInfoLast = templateInfo.previousTemplateInfo;
            }
            templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
            // Remove stamped nodes
            var nodes = templateInfo.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                node.parentNode.removeChild(node);
            }
        };
        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PropertyEffects._parseTemplateNode = function (node, templateInfo, nodeInfo) {
            // TODO(https://github.com/google/closure-compiler/issues/3240):
            //     Change back to just super.methodCall()
            var noted = propertyEffectsBase._parseTemplateNode.call(this, node, templateInfo, nodeInfo);
            if (node.nodeType === Node.TEXT_NODE) {
                var parts = this._parseBindings(node.textContent, templateInfo);
                if (parts) {
                    // Initialize the textContent with any literal parts
                    // NOTE: default to a space here so the textNode remains; some browsers
                    // (IE) omit an empty textNode following cloneNode/importNode.
                    node.textContent = literalFromParts(parts) || ' ';
                    addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
                    noted = true;
                }
            }
            return noted;
        };
        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * parsing bindings from attributes.  A `bindings`
         * array is added to `nodeInfo` and populated with binding metadata
         * with information capturing the binding target, and a `parts` array
         * with one or more metadata objects capturing the source(s) of the
         * binding.
         *
         * @param {Element} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @param {string} name Attribute name
         * @param {string} value Attribute value
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PropertyEffects._parseTemplateNodeAttribute = function (node, templateInfo, nodeInfo, name, value) {
            var parts = this._parseBindings(value, templateInfo);
            if (parts) {
                // Attribute or property
                var origName = name;
                var kind = 'property';
                // The only way we see a capital letter here is if the attr has
                // a capital letter in it per spec. In this case, to make sure
                // this binding works, we go ahead and make the binding to the attribute.
                if (capitalAttributeRegex.test(name)) {
                    kind = 'attribute';
                }
                else if (name[name.length - 1] == '$') {
                    name = name.slice(0, -1);
                    kind = 'attribute';
                }
                // Initialize attribute bindings with any literal parts
                var literal = literalFromParts(parts);
                if (literal && kind == 'attribute') {
                    // Ensure a ShadyCSS template scoped style is not removed
                    // when a class$ binding's initial literal value is set.
                    if (name == 'class' && node.hasAttribute('class')) {
                        literal += ' ' + node.getAttribute(name);
                    }
                    node.setAttribute(name, literal);
                }
                // Clear attribute before removing, since IE won't allow removing
                // `value` attribute if it previously had a value (can't
                // unconditionally set '' before removing since attributes with `$`
                // can't be set using setAttribute)
                if (node.localName === 'input' && origName === 'value') {
                    node.setAttribute(origName, '');
                }
                // Remove annotation
                node.removeAttribute(origName);
                // Case hackery: attributes are lower-case, but bind targets
                // (properties) are case sensitive. Gambit is to map dash-case to
                // camel-case: `foo-bar` becomes `fooBar`.
                // Attribute bindings are excepted.
                if (kind === 'property') {
                    name = dashToCamelCase(name);
                }
                addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
                return true;
            }
            else {
                // TODO(https://github.com/google/closure-compiler/issues/3240):
                //     Change back to just super.methodCall()
                return propertyEffectsBase._parseTemplateNodeAttribute.call(this, node, templateInfo, nodeInfo, name, value);
            }
        };
        /**
         * Overrides default `TemplateStamp` implementation to add support for
         * binding the properties that a nested template depends on to the template
         * as `_host_<property>`.
         *
         * @param {Node} node Node to parse
         * @param {TemplateInfo} templateInfo Template metadata for current template
         * @param {NodeInfo} nodeInfo Node metadata for current template node
         * @return {boolean} `true` if the visited node added node-specific
         *   metadata to `nodeInfo`
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PropertyEffects._parseTemplateNestedTemplate = function (node, templateInfo, nodeInfo) {
            // TODO(https://github.com/google/closure-compiler/issues/3240):
            //     Change back to just super.methodCall()
            var noted = propertyEffectsBase._parseTemplateNestedTemplate.call(this, node, templateInfo, nodeInfo);
            // Merge host props into outer template and add bindings
            var hostProps = nodeInfo.templateInfo.hostProps;
            var mode = '{';
            for (var source in hostProps) {
                var parts = [{ mode: mode, source: source, dependencies: [source] }];
                addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
            }
            return noted;
        };
        /**
         * Called to parse text in a template (either attribute values or
         * textContent) into binding metadata.
         *
         * Any overrides of this method should return an array of binding part
         * metadata  representing one or more bindings found in the provided text
         * and any "literal" text in between.  Any non-literal parts will be passed
         * to `_evaluateBinding` when any dependencies change.  The only required
         * fields of each "part" in the returned array are as follows:
         *
         * - `dependencies` - Array containing trigger metadata for each property
         *   that should trigger the binding to update
         * - `literal` - String containing text if the part represents a literal;
         *   in this case no `dependencies` are needed
         *
         * Additional metadata for use by `_evaluateBinding` may be provided in
         * each part object as needed.
         *
         * The default implementation handles the following types of bindings
         * (one or more may be intermixed with literal strings):
         * - Property binding: `[[prop]]`
         * - Path binding: `[[object.prop]]`
         * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
         * - Two-way property or path bindings (supports negation):
         *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
         * - Inline computed method (supports negation):
         *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
         *
         * The default implementation uses a regular expression for best
         * performance. However, the regular expression uses a white-list of
         * allowed characters in a data-binding, which causes problems for
         * data-bindings that do use characters not in this white-list.
         *
         * Instead of updating the white-list with all allowed characters,
         * there is a StrictBindingParser (see lib/mixins/strict-binding-parser)
         * that uses a state machine instead. This state machine is able to handle
         * all characters. However, it is slightly less performant, therefore we
         * extracted it into a separate optional mixin.
         *
         * @param {string} text Text to parse from attribute or textContent
         * @param {Object} templateInfo Current template metadata
         * @return {Array<!BindingPart>} Array of binding part metadata
         * @protected
         * @nocollapse
         */
        PropertyEffects._parseBindings = function (text, templateInfo) {
            var parts = [];
            var lastIndex = 0;
            var m;
            // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
            // Regex matches:
            //        Iteration 1:  Iteration 2:
            // m[1]: '{{'          '[['
            // m[2]: ''            '!'
            // m[3]: 'prop'        'compute(foo,bar)'
            while ((m = bindingRegex.exec(text)) !== null) {
                // Add literal part
                if (m.index > lastIndex) {
                    parts.push({ literal: text.slice(lastIndex, m.index) });
                }
                // Add binding part
                var mode = m[1][0];
                var negate = Boolean(m[2]);
                var source = m[3].trim();
                var customEvent = false, notifyEvent = '', colon = -1;
                if (mode == '{' && (colon = source.indexOf('::')) > 0) {
                    notifyEvent = source.substring(colon + 2);
                    source = source.substring(0, colon);
                    customEvent = true;
                }
                var signature = parseMethod(source);
                var dependencies = [];
                if (signature) {
                    // Inline computed function
                    var args = signature.args, methodName = signature.methodName;
                    for (var i = 0; i < args.length; i++) {
                        var arg = args[i];
                        if (!arg.literal) {
                            dependencies.push(arg);
                        }
                    }
                    var dynamicFns = templateInfo.dynamicFns;
                    if (dynamicFns && dynamicFns[methodName] || signature.static) {
                        dependencies.push(methodName);
                        signature.dynamicFn = true;
                    }
                }
                else {
                    // Property or path
                    dependencies.push(source);
                }
                parts.push({
                    source: source, mode: mode, negate: negate, customEvent: customEvent, signature: signature, dependencies: dependencies,
                    event: notifyEvent
                });
                lastIndex = bindingRegex.lastIndex;
            }
            // Add a final literal part
            if (lastIndex && lastIndex < text.length) {
                var literal = text.substring(lastIndex);
                if (literal) {
                    parts.push({
                        literal: literal
                    });
                }
            }
            if (parts.length) {
                return parts;
            }
            else {
                return null;
            }
        };
        /**
         * Called to evaluate a previously parsed binding part based on a set of
         * one or more changed dependencies.
         *
         * @param {!Polymer_PropertyEffects} inst Element that should be used as
         *     scope for binding dependencies
         * @param {BindingPart} part Binding part metadata
         * @param {string} path Property/path that triggered this effect
         * @param {Object} props Bag of current property changes
         * @param {Object} oldProps Bag of previous values for changed properties
         * @param {boolean} hasPaths True with `props` contains one or more paths
         * @return {*} Value the binding part evaluated to
         * @protected
         * @nocollapse
         */
        PropertyEffects._evaluateBinding = function (inst, part, path, props, oldProps, hasPaths) {
            var value;
            if (part.signature) {
                value = runMethodEffect(inst, path, props, oldProps, part.signature);
            }
            else if (path != part.source) {
                value = get(inst, part.source);
            }
            else {
                if (hasPaths && isPath(path)) {
                    value = get(inst, path);
                }
                else {
                    value = inst.__data[path];
                }
            }
            if (part.negate) {
                value = !value;
            }
            return value;
        };
        return PropertyEffects;
    }(propertyEffectsBase));
    return PropertyEffects;
});
/**
 * Helper api for enqueuing client dom created by a host element.
 *
 * By default elements are flushed via `_flushProperties` when
 * `connectedCallback` is called. Elements attach their client dom to
 * themselves at `ready` time which results from this first flush.
 * This provides an ordering guarantee that the client dom an element
 * creates is flushed before the element itself (i.e. client `ready`
 * fires before host `ready`).
 *
 * However, if `_flushProperties` is called *before* an element is connected,
 * as for example `Templatize` does, this ordering guarantee cannot be
 * satisfied because no elements are connected. (Note: Bound elements that
 * receive data do become enqueued clients and are properly ordered but
 * unbound elements are not.)
 *
 * To maintain the desired "client before host" ordering guarantee for this
 * case we rely on the "host stack. Client nodes registers themselves with
 * the creating host element when created. This ensures that all client dom
 * is readied in the proper order, maintaining the desired guarantee.
 *
 * @private
 */
var HostStack = /** @class */ (function () {
    function HostStack() {
        this.stack = [];
    }
    /**
     * @param {*} inst Instance to add to hostStack
     * @return {void}
     */
    HostStack.prototype.registerHost = function (inst) {
        if (this.stack.length) {
            var host = this.stack[this.stack.length - 1];
            host._enqueueClient(inst);
        }
    };
    /**
     * @param {*} inst Instance to begin hosting
     * @return {void}
     */
    HostStack.prototype.beginHosting = function (inst) {
        this.stack.push(inst);
    };
    /**
     * @param {*} inst Instance to end hosting
     * @return {void}
     */
    HostStack.prototype.endHosting = function (inst) {
        var stackLen = this.stack.length;
        if (stackLen && this.stack[stackLen - 1] == inst) {
            this.stack.pop();
        }
    };
    return HostStack;
}());
var hostStack = new HostStack();
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Creates a copy of `props` with each property normalized such that
 * upgraded it is an object with at least a type property { type: Type}.
 *
 * @param {Object} props Properties to normalize
 * @return {Object} Copy of input `props` with normalized properties that
 * are in the form {type: Type}
 * @private
 */
function normalizeProperties(props) {
    var output = {};
    for (var p in props) {
        var o = props[p];
        output[p] = (typeof o === 'function') ? { type: o } : o;
    }
    return output;
}
/**
 * Mixin that provides a minimal starting point to using the PropertiesChanged
 * mixin by providing a mechanism to declare properties in a static
 * getter (e.g. static get properties() { return { foo: String } }). Changes
 * are reported via the `_propertiesChanged` method.
 *
 * This mixin provides no specific support for rendering. Users are expected
 * to create a ShadowRoot and put content into it and update it in whatever
 * way makes sense. This can be done in reaction to properties changing by
 * implementing `_propertiesChanged`.
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertiesChanged
 * @summary Mixin that provides a minimal starting point for using
 * the PropertiesChanged mixin by providing a declarative `properties` object.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var PropertiesMixin = dedupingMixin(function (superClass) {
    /**
     * @constructor
     * @implements {Polymer_PropertiesChanged}
     * @private
     */
    var base = PropertiesChanged(superClass);
    /**
     * Returns the super class constructor for the given class, if it is an
     * instance of the PropertiesMixin.
     *
     * @param {!PropertiesMixinConstructor} constructor PropertiesMixin constructor
     * @return {?PropertiesMixinConstructor} Super class constructor
     */
    function superPropertiesClass(constructor) {
        var superCtor = Object.getPrototypeOf(constructor);
        // Note, the `PropertiesMixin` class below only refers to the class
        // generated by this call to the mixin; the instanceof test only works
        // because the mixin is deduped and guaranteed only to apply once, hence
        // all constructors in a proto chain will see the same `PropertiesMixin`
        return (superCtor.prototype instanceof PropertiesMixin) ?
            /** @type {!PropertiesMixinConstructor} */ (superCtor) : null;
    }
    /**
     * Returns a memoized version of the `properties` object for the
     * given class. Properties not in object format are converted to at
     * least {type}.
     *
     * @param {PropertiesMixinConstructor} constructor PropertiesMixin constructor
     * @return {Object} Memoized properties object
     */
    function ownProperties(constructor) {
        if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
            var props = null;
            if (constructor.hasOwnProperty(JSCompiler_renameProperty('properties', constructor))) {
                var properties = constructor.properties;
                if (properties) {
                    props = normalizeProperties(properties);
                }
            }
            constructor.__ownProperties = props;
        }
        return constructor.__ownProperties;
    }
    /**
     * @polymer
     * @mixinClass
     * @extends {base}
     * @implements {Polymer_PropertiesMixin}
     * @unrestricted
     */
    var PropertiesMixin = /** @class */ (function (_super) {
        __extends(PropertiesMixin, _super);
        function PropertiesMixin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(PropertiesMixin, "observedAttributes", {
            /**
             * Implements standard custom elements getter to observes the attributes
             * listed in `properties`.
             * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
             * @nocollapse
             */
            get: function () {
                var _this = this;
                if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
                    var props = this._properties;
                    this.__observedAttributes = props ? Object.keys(props).map(function (p) { return _this.attributeNameForProperty(p); }) : [];
                }
                return this.__observedAttributes;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Finalizes an element definition, including ensuring any super classes
         * are also finalized. This includes ensuring property
         * accessors exist on the element prototype. This method calls
         * `_finalizeClass` to finalize each constructor in the prototype chain.
         * @return {void}
         * @nocollapse
         */
        PropertiesMixin.finalize = function () {
            if (!this.hasOwnProperty(JSCompiler_renameProperty('__finalized', this))) {
                var superCtor = superPropertiesClass(/** @type {!PropertiesMixinConstructor} */ (this));
                if (superCtor) {
                    superCtor.finalize();
                }
                this.__finalized = true;
                this._finalizeClass();
            }
        };
        /**
         * Finalize an element class. This includes ensuring property
         * accessors exist on the element prototype. This method is called by
         * `finalize` and finalizes the class constructor.
         *
         * @protected
         * @nocollapse
         */
        PropertiesMixin._finalizeClass = function () {
            var props = ownProperties(/** @type {!PropertiesMixinConstructor} */ (this));
            if (props) {
                /** @type {?} */ (this).createProperties(props);
            }
        };
        Object.defineProperty(PropertiesMixin, "_properties", {
            /**
             * Returns a memoized version of all properties, including those inherited
             * from super classes. Properties not in object format are converted to
             * at least {type}.
             *
             * @return {Object} Object containing properties for this class
             * @protected
             * @nocollapse
             */
            get: function () {
                if (!this.hasOwnProperty(JSCompiler_renameProperty('__properties', this))) {
                    var superCtor = superPropertiesClass(/** @type {!PropertiesMixinConstructor} */ (this));
                    this.__properties = Object.assign({}, superCtor && superCtor._properties, ownProperties(/** @type {PropertiesMixinConstructor} */ (this)));
                }
                return this.__properties;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Overrides `PropertiesChanged` method to return type specified in the
         * static `properties` object for the given property.
         * @param {string} name Name of property
         * @return {*} Type to which to deserialize attribute
         *
         * @protected
         * @nocollapse
         */
        PropertiesMixin.typeForProperty = function (name) {
            var info = this._properties[name];
            return info && info.type;
        };
        /**
         * Overrides `PropertiesChanged` method and adds a call to
         * `finalize` which lazily configures the element's property accessors.
         * @override
         * @return {void}
         */
        PropertiesMixin.prototype._initializeProperties = function () {
            this.constructor.finalize();
            _super.prototype._initializeProperties.call(this);
        };
        /**
         * Called when the element is added to a document.
         * Calls `_enableProperties` to turn on property system from
         * `PropertiesChanged`.
         * @suppress {missingProperties} Super may or may not implement the callback
         * @return {void}
         * @override
         */
        PropertiesMixin.prototype.connectedCallback = function () {
            if (_super.prototype.connectedCallback) {
                _super.prototype.connectedCallback.call(this);
            }
            this._enableProperties();
        };
        /**
         * Called when the element is removed from a document
         * @suppress {missingProperties} Super may or may not implement the callback
         * @return {void}
         * @override
         */
        PropertiesMixin.prototype.disconnectedCallback = function () {
            if (_super.prototype.disconnectedCallback) {
                _super.prototype.disconnectedCallback.call(this);
            }
        };
        return PropertiesMixin;
    }(base));
    return PropertiesMixin;
});
/**
 * @fileoverview
 * @suppress {checkPrototypalTypes}
 * @license Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */
/**
 * Current Polymer version in Semver notation.
 * @type {string} Semver notation of the current version of Polymer.
 */
var version = '3.3.1';
var builtCSS = window.ShadyCSS && window.ShadyCSS['cssBuild'];
/**
 * Element class mixin that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * Subclassers may provide the following static getters to return metadata
 * used to configure Polymer's features for the class:
 *
 * - `static get is()`: When the template is provided via a `dom-module`,
 *   users should return the `dom-module` id from a static `is` getter.  If
 *   no template is needed or the template is provided directly via the
 *   `template` getter, there is no need to define `is` for the element.
 *
 * - `static get template()`: Users may provide the template directly (as
 *   opposed to via `dom-module`) by implementing a static `template` getter.
 *   The getter must return an `HTMLTemplateElement`.
 *
 * - `static get properties()`: Should return an object describing
 *   property-related metadata used by Polymer features (key: property name
 *   value: object containing property metadata). Valid keys in per-property
 *   metadata include:
 *   - `type` (String|Number|Object|Array|...): Used by
 *     `attributeChangedCallback` to determine how string-based attributes
 *     are deserialized to JavaScript property values.
 *   - `notify` (boolean): Causes a change in the property to fire a
 *     non-bubbling event called `<property>-changed`. Elements that have
 *     enabled two-way binding to the property use this event to observe changes.
 *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
 *     To set a read-only property, use the private setter method
 *     `_setProperty(property, value)`.
 *   - `observer` (string): Observer method name that will be called when
 *     the property changes. The arguments of the method are
 *     `(value, previousValue)`.
 *   - `computed` (string): String describing method and dependent properties
 *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
 *     Computed properties are read-only by default and can only be changed
 *     via the return value of the computing method.
 *
 * - `static get observers()`: Array of strings describing multi-property
 *   observer methods and their dependent properties (e.g.
 *   `'observeABC(a, b, c)'`).
 *
 * The base class provides default implementations for the following standard
 * custom element lifecycle callbacks; users may override these, but should
 * call the super method to ensure
 * - `constructor`: Run when the element is created or upgraded
 * - `connectedCallback`: Run each time the element is connected to the
 *   document
 * - `disconnectedCallback`: Run each time the element is disconnected from
 *   the document
 * - `attributeChangedCallback`: Run each time an attribute in
 *   `observedAttributes` is set or removed (note: this element's default
 *   `observedAttributes` implementation will automatically return an array
 *   of dash-cased attributes based on `properties`)
 *
 * @mixinFunction
 * @polymer
 * @appliesMixin PropertyEffects
 * @appliesMixin PropertiesMixin
 * @property rootPath {string} Set to the value of `rootPath`,
 *   which defaults to the main document path
 * @property importPath {string} Set to the value of the class's static
 *   `importPath` property, which defaults to the path of this element's
 *   `dom-module` (when `is` is used), but can be overridden for other
 *   import strategies.
 * @summary Element class mixin that provides the core API for Polymer's
 * meta-programming features.
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var ElementMixin = dedupingMixin(function (base) {
    /**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     * @implements {Polymer_PropertiesMixin}
     * @extends {HTMLElement}
     * @private
     */
    var polymerElementBase = PropertiesMixin(PropertyEffects(base));
    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `_properties`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} constructor Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaults(constructor) {
        if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__propertyDefaults', constructor))) {
            constructor.__propertyDefaults = null;
            var props = constructor._properties;
            for (var p in props) {
                var info = props[p];
                if ('value' in info) {
                    constructor.__propertyDefaults = constructor.__propertyDefaults || {};
                    constructor.__propertyDefaults[p] = info;
                }
            }
        }
        return constructor.__propertyDefaults;
    }
    /**
     * Returns a memoized version of the `observers` array.
     * @param {PolymerElementConstructor} constructor Element class
     * @return {Array} Array containing own observers for the given class
     * @protected
     */
    function ownObservers(constructor) {
        if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownObservers', constructor))) {
            constructor.__ownObservers =
                constructor.hasOwnProperty(JSCompiler_renameProperty('observers', constructor)) ?
                    /** @type {PolymerElementConstructor} */ (constructor).observers :
                    null;
        }
        return constructor.__ownObservers;
    }
    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is deserialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * is also automatically set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttribute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     *
     * @param {!PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @return {void}
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
        // computed forces readOnly...
        if (info.computed) {
            info.readOnly = true;
        }
        // Note, since all computed properties are readOnly, this prevents
        // adding additional computed property effects (which leads to a confusing
        // setup where multiple triggers for setting a property)
        // While we do have `hasComputedEffect` this is set on the property's
        // dependencies rather than itself.
        if (info.computed) {
            if (proto._hasReadOnlyEffect(name)) {
                console.warn("Cannot redefine computed property '" + name + "'.");
            }
            else {
                proto._createComputedProperty(name, info.computed, allProps);
            }
        }
        if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
            proto._createReadOnlyProperty(name, !info.computed);
        }
        else if (info.readOnly === false && proto._hasReadOnlyEffect(name)) {
            console.warn("Cannot make readOnly property '" + name + "' non-readOnly.");
        }
        if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
            proto._createReflectedProperty(name);
        }
        else if (info.reflectToAttribute === false && proto._hasReflectEffect(name)) {
            console.warn("Cannot make reflected property '" + name + "' non-reflected.");
        }
        if (info.notify && !proto._hasNotifyEffect(name)) {
            proto._createNotifyingProperty(name);
        }
        else if (info.notify === false && proto._hasNotifyEffect(name)) {
            console.warn("Cannot make notify property '" + name + "' non-notify.");
        }
        // always add observer
        if (info.observer) {
            proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
        }
        // always create the mapping from attribute back to property for deserialization.
        proto._addPropertyToAttributeMap(name);
    }
    /**
     * Process all style elements in the element template. Styles with the
     * `include` attribute are processed such that any styles in
     * the associated "style modules" are included in the element template.
     * @param {PolymerElementConstructor} klass Element class
     * @param {!HTMLTemplateElement} template Template to process
     * @param {string} is Name of element
     * @param {string} baseURI Base URI for element
     * @private
     */
    function processElementStyles(klass, template, is, baseURI) {
        if (!builtCSS) {
            var templateStyles = template.content.querySelectorAll('style');
            var stylesWithImports = stylesFromTemplate(template);
            // insert styles from <link rel="import" type="css"> at the top of the template
            var linkedStyles = stylesFromModuleImports(is);
            var firstTemplateChild = template.content.firstElementChild;
            for (var idx = 0; idx < linkedStyles.length; idx++) {
                var s = linkedStyles[idx];
                s.textContent = klass._processStyleText(s.textContent, baseURI);
                template.content.insertBefore(s, firstTemplateChild);
            }
            // keep track of the last "concrete" style in the template we have encountered
            var templateStyleIndex = 0;
            // ensure all gathered styles are actually in this template.
            for (var i = 0; i < stylesWithImports.length; i++) {
                var s = stylesWithImports[i];
                var templateStyle = templateStyles[templateStyleIndex];
                // if the style is not in this template, it's been "included" and
                // we put a clone of it in the template before the style that included it
                if (templateStyle !== s) {
                    s = s.cloneNode(true);
                    templateStyle.parentNode.insertBefore(s, templateStyle);
                }
                else {
                    templateStyleIndex++;
                }
                s.textContent = klass._processStyleText(s.textContent, baseURI);
            }
        }
        if (window.ShadyCSS) {
            window.ShadyCSS.prepareTemplate(template, is);
        }
    }
    /**
     * Look up template from dom-module for element
     *
     * @param {string} is Element name to look up
     * @return {?HTMLTemplateElement|undefined} Template found in dom module, or
     *   undefined if not found
     * @protected
     */
    function getTemplateFromDomModule(is) {
        var template = null;
        // Under strictTemplatePolicy in 3.x+, dom-module lookup is only allowed
        // when opted-in via allowTemplateFromDomModule
        if (is && (!strictTemplatePolicy)) {
            template = /** @type {?HTMLTemplateElement} */ (DomModule.import(is, 'template'));
        }
        return template;
    }
    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     * @extends {polymerElementBase}
     */
    var PolymerElement = /** @class */ (function (_super) {
        __extends(PolymerElement, _super);
        function PolymerElement() {
            return _super.call(this) || this;
        }
        Object.defineProperty(PolymerElement, "polymerElementVersion", {
            /**
             * Current Polymer version in Semver notation.
             * @type {string} Semver notation of the current version of Polymer.
             * @nocollapse
             */
            get: function () {
                return version;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Override of PropertiesMixin _finalizeClass to create observers and
         * find the template.
         * @return {void}
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PolymerElement._finalizeClass = function () {
            // TODO(https://github.com/google/closure-compiler/issues/3240):
            //     Change back to just super.methodCall()
            polymerElementBase._finalizeClass.call(this);
            var observers = ownObservers(this);
            if (observers) {
                this.createObservers(observers, this._properties);
            }
            this._prepareTemplate();
        };
        /** @nocollapse */
        PolymerElement._prepareTemplate = function () {
            // note: create "working" template that is finalized at instance time
            var template = /** @type {PolymerElementConstructor} */ (this).template;
            if (template) {
                if (typeof template === 'string') {
                    console.error('template getter must return HTMLTemplateElement');
                    template = null;
                }
                else {
                    template = template.cloneNode(true);
                }
            }
            /** @override */
            this.prototype._template = template;
        };
        /**
         * Override of PropertiesChanged createProperties to create accessors
         * and property effects for all of the properties.
         * @param {!Object} props .
         * @return {void}
         * @protected
         * @nocollapse
         */
        PolymerElement.createProperties = function (props) {
            for (var p in props) {
                createPropertyFromConfig(
                /** @type {?} */ (this.prototype), p, props[p], props);
            }
        };
        /**
         * Creates observers for the given `observers` array.
         * Leverages `PropertyEffects` to create observers.
         * @param {Object} observers Array of observer descriptors for
         *   this class
         * @param {Object} dynamicFns Object containing keys for any properties
         *   that are functions and should trigger the effect when the function
         *   reference is changed
         * @return {void}
         * @protected
         * @nocollapse
         */
        PolymerElement.createObservers = function (observers, dynamicFns) {
            var proto = this.prototype;
            for (var i = 0; i < observers.length; i++) {
                proto._createMethodObserver(observers[i], dynamicFns);
            }
        };
        Object.defineProperty(PolymerElement, "template", {
            /**
             * Returns the template that will be stamped into this element's shadow root.
             *
             * If a `static get is()` getter is defined, the default implementation
             * will return the first `<template>` in a `dom-module` whose `id`
             * matches this element's `is`.
             *
             * Users may override this getter to return an arbitrary template
             * (in which case the `is` getter is unnecessary). The template returned
             * must be an `HTMLTemplateElement`.
             *
             * Note that when subclassing, if the super class overrode the default
             * implementation and the subclass would like to provide an alternate
             * template via a `dom-module`, it should override this getter and
             * return `DomModule.import(this.is, 'template')`.
             *
             * If a subclass would like to modify the super class template, it should
             * clone it rather than modify it in place.  If the getter does expensive
             * work such as cloning/modifying a template, it should memoize the
             * template for maximum performance:
             *
             *   let memoizedTemplate;
             *   class MySubClass extends MySuperClass {
             *     static get template() {
             *       if (!memoizedTemplate) {
             *         memoizedTemplate = super.template.cloneNode(true);
             *         let subContent = document.createElement('div');
             *         subContent.textContent = 'This came from MySubClass';
             *         memoizedTemplate.content.appendChild(subContent);
             *       }
             *       return memoizedTemplate;
             *     }
             *   }
             *
             * @return {!HTMLTemplateElement|string} Template to be stamped
             * @nocollapse
             */
            get: function () {
                // Explanation of template-related properties:
                // - constructor.template (this getter): the template for the class.
                //     This can come from the prototype (for legacy elements), from a
                //     dom-module, or from the super class's template (or can be overridden
                //     altogether by the user)
                // - constructor._template: memoized version of constructor.template
                // - prototype._template: working template for the element, which will be
                //     parsed and modified in place. It is a cloned version of
                //     constructor.template, saved in _finalizeClass(). Note that before
                //     this getter is called, for legacy elements this could be from a
                //     _template field on the info object passed to Polymer(), a behavior,
                //     or set in registered(); once the static getter runs, a clone of it
                //     will overwrite it on the prototype as the working template.
                if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
                    this._template =
                        // If user has put template on prototype (e.g. in legacy via registered
                        // callback or info object), prefer that first
                        this.prototype.hasOwnProperty(JSCompiler_renameProperty('_template', this.prototype)) ?
                            this.prototype._template :
                            // Look in dom-module associated with this element's is
                            (getTemplateFromDomModule(/** @type {PolymerElementConstructor}*/ (this).is) ||
                                // Next look for superclass template (call the super impl this
                                // way so that `this` points to the superclass)
                                Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/ (this).prototype).constructor.template);
                }
                return this._template;
            },
            /**
             * Set the template.
             *
             * @param {!HTMLTemplateElement|string} value Template to set.
             * @nocollapse
             */
            set: function (value) {
                this._template = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PolymerElement, "importPath", {
            /**
             * Path matching the url from which the element was imported.
             *
             * This path is used to resolve url's in template style cssText.
             * The `importPath` property is also set on element instances and can be
             * used to create bindings relative to the import path.
             *
             * For elements defined in ES modules, users should implement
             * `static get importMeta() { return import.meta; }`, and the default
             * implementation of `importPath` will  return `import.meta.url`'s path.
             * For elements defined in HTML imports, this getter will return the path
             * to the document containing a `dom-module` element matching this
             * element's static `is` property.
             *
             * Note, this path should contain a trailing `/`.
             *
             * @return {string} The import path for this element class
             * @suppress {missingProperties}
             * @nocollapse
             */
            get: function () {
                if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
                    var meta = this.importMeta;
                    if (meta) {
                        this._importPath = pathFromUrl(meta.url);
                    }
                    else {
                        var module = DomModule.import(/** @type {PolymerElementConstructor} */ (this).is);
                        this._importPath = (module && module.assetpath) ||
                            Object.getPrototypeOf(/** @type {PolymerElementConstructor}*/ (this).prototype).constructor.importPath;
                    }
                }
                return this._importPath;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Overrides the default `PropertyAccessors` to ensure class
         * metaprogramming related to property accessors and effects has
         * completed (calls `finalize`).
         *
         * It also initializes any property defaults provided via `value` in
         * `properties` metadata.
         *
         * @return {void}
         * @override
         * @suppress {invalidCasts,missingProperties} go/missingfnprops
         */
        PolymerElement.prototype._initializeProperties = function () {
            this.constructor.finalize();
            // note: finalize template when we have access to `localName` to
            // avoid dependence on `is` for polyfilling styling.
            this.constructor._finalizeTemplate(/** @type {!HTMLElement} */ (this).localName);
            _super.prototype._initializeProperties.call(this);
            // set path defaults
            this.rootPath = rootPath;
            this.importPath = this.constructor.importPath;
            // apply property defaults...
            var p$ = propertyDefaults(this.constructor);
            if (!p$) {
                return;
            }
            for (var p in p$) {
                var info = p$[p];
                // Don't set default value if there is already an own property, which
                // happens when a `properties` property with default but no effects had
                // a property set (e.g. bound) by its host before upgrade
                if (!this.hasOwnProperty(p)) {
                    var value = typeof info.value == 'function' ?
                        info.value.call(this) :
                        info.value;
                    // Set via `_setProperty` if there is an accessor, to enable
                    // initializing readOnly property defaults
                    if (this._hasAccessor(p)) {
                        this._setPendingProperty(p, value, true);
                    }
                    else {
                        this[p] = value;
                    }
                }
            }
        };
        /**
         * Gather style text for a style element in the template.
         *
         * @param {string} cssText Text containing styling to process
         * @param {string} baseURI Base URI to rebase CSS paths against
         * @return {string} The processed CSS text
         * @protected
         * @nocollapse
         */
        PolymerElement._processStyleText = function (cssText, baseURI) {
            return resolveCss(cssText, baseURI);
        };
        /**
        * Configures an element `proto` to function with a given `template`.
        * The element name `is` and extends `ext` must be specified for ShadyCSS
        * style scoping.
        *
        * @param {string} is Tag name (or type extension name) for this element
        * @return {void}
        * @protected
        * @nocollapse
        */
        PolymerElement._finalizeTemplate = function (is) {
            /** @const {HTMLTemplateElement} */
            var template = this.prototype._template;
            if (template && !template.__polymerFinalized) {
                template.__polymerFinalized = true;
                var importPath = this.importPath;
                var baseURI = importPath ? resolveUrl(importPath) : '';
                // e.g. support `include="module-name"`, and ShadyCSS
                processElementStyles(this, template, is, baseURI);
                this.prototype._bindTemplate(template);
            }
        };
        /**
         * Provides a default implementation of the standard Custom Elements
         * `connectedCallback`.
         *
         * The default implementation enables the property effects system and
         * flushes any pending properties, and updates shimmed CSS properties
         * when using the ShadyCSS scoping/custom properties polyfill.
         *
         * @override
         * @suppress {missingProperties, invalidCasts} Super may or may not
         *     implement the callback
         * @return {void}
         */
        PolymerElement.prototype.connectedCallback = function () {
            if (window.ShadyCSS && this._template) {
                window.ShadyCSS.styleElement(/** @type {!HTMLElement} */ (this));
            }
            _super.prototype.connectedCallback.call(this);
        };
        /**
         * Stamps the element template.
         *
         * @return {void}
         * @override
         */
        PolymerElement.prototype.ready = function () {
            if (this._template) {
                this.root = this._stampTemplate(this._template);
                this.$ = this.root.$;
            }
            _super.prototype.ready.call(this);
        };
        /**
         * Implements `PropertyEffects`'s `_readyClients` call. Attaches
         * element dom by calling `_attachDom` with the dom stamped from the
         * element's template via `_stampTemplate`. Note that this allows
         * client dom to be attached to the element prior to any observers
         * running.
         *
         * @return {void}
         * @override
         */
        PolymerElement.prototype._readyClients = function () {
            if (this._template) {
                this.root = this._attachDom(/** @type {StampedTemplate} */ (this.root));
            }
            // The super._readyClients here sets the clients initialized flag.
            // We must wait to do this until after client dom is created/attached
            // so that this flag can be checked to prevent notifications fired
            // during this process from being handled before clients are ready.
            _super.prototype._readyClients.call(this);
        };
        /**
         * Attaches an element's stamped dom to itself. By default,
         * this method creates a `shadowRoot` and adds the dom to it.
         * However, this method may be overridden to allow an element
         * to put its dom in another location.
         *
         * @override
         * @throws {Error}
         * @suppress {missingReturn}
         * @param {StampedTemplate} dom to attach to the element.
         * @return {ShadowRoot} node to which the dom has been attached.
         */
        PolymerElement.prototype._attachDom = function (dom) {
            var n = wrap(this);
            if (n.attachShadow) {
                if (dom) {
                    if (!n.shadowRoot) {
                        n.attachShadow({ mode: 'open', shadyUpgradeFragment: dom });
                        n.shadowRoot.appendChild(dom);
                    }
                    return n.shadowRoot;
                }
                return null;
            }
            else {
                throw new Error('ShadowDOM not available. ' +
                    // TODO(sorvell): move to compile-time conditional when supported
                    'PolymerElement can create dom as children instead of in ' +
                    'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
            }
        };
        /**
         * When using the ShadyCSS scoping and custom property shim, causes all
         * shimmed styles in this element (and its subtree) to be updated
         * based on current custom property values.
         *
         * The optional parameter overrides inline custom property styles with an
         * object of properties where the keys are CSS properties, and the values
         * are strings.
         *
         * Example: `this.updateStyles({'--color': 'blue'})`
         *
         * These properties are retained unless a value of `null` is set.
         *
         * Note: This function does not support updating CSS mixins.
         * You can not dynamically change the value of an `@apply`.
         *
         * @override
         * @param {Object=} properties Bag of custom property key/values to
         *   apply to this element.
         * @return {void}
         * @suppress {invalidCasts}
         */
        PolymerElement.prototype.updateStyles = function (properties) {
            if (window.ShadyCSS) {
                window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */ (this), properties);
            }
        };
        /**
         * Rewrites a given URL relative to a base URL. The base URL defaults to
         * the original location of the document containing the `dom-module` for
         * this element. This method will return the same URL before and after
         * bundling.
         *
         * Note that this function performs no resolution for URLs that start
         * with `/` (absolute URLs) or `#` (hash identifiers).  For general purpose
         * URL resolution, use `window.URL`.
         *
         * @override
         * @param {string} url URL to resolve.
         * @param {string=} base Optional base URL to resolve against, defaults
         * to the element's `importPath`
         * @return {string} Rewritten URL relative to base
         */
        PolymerElement.prototype.resolveUrl = function (url, base) {
            if (!base && this.importPath) {
                base = resolveUrl(this.importPath);
            }
            return resolveUrl(url, base);
        };
        /**
         * Overrides `PropertyEffects` to add map of dynamic functions on
         * template info, for consumption by `PropertyEffects` template binding
         * code. This map determines which method templates should have accessors
         * created for them.
         *
         * @param {!HTMLTemplateElement} template Template
         * @param {!TemplateInfo} templateInfo Template metadata for current template
         * @param {!NodeInfo} nodeInfo Node metadata for current template.
         * @return {boolean} .
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PolymerElement._parseTemplateContent = function (template, templateInfo, nodeInfo) {
            templateInfo.dynamicFns = templateInfo.dynamicFns || this._properties;
            // TODO(https://github.com/google/closure-compiler/issues/3240):
            //     Change back to just super.methodCall()
            return polymerElementBase._parseTemplateContent.call(this, template, templateInfo, nodeInfo);
        };
        /**
         * Overrides `PropertyEffects` to warn on use of undeclared properties in
         * template.
         *
         * @param {Object} templateInfo Template metadata to add effect to
         * @param {string} prop Property that should trigger the effect
         * @param {Object=} effect Effect metadata object
         * @return {void}
         * @protected
         * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
         * @nocollapse
         */
        PolymerElement._addTemplatePropertyEffect = function (templateInfo, prop, effect) {
            // TODO(https://github.com/google/closure-compiler/issues/3240):
            //     Change back to just super.methodCall()
            return polymerElementBase._addTemplatePropertyEffect.call(this, templateInfo, prop, effect);
        };
        return PolymerElement;
    }(polymerElementBase));
    return PolymerElement;
});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Base class that provides the core API for Polymer's meta-programming
 * features including template stamping, data-binding, attribute deserialization,
 * and property change observation.
 *
 * @customElement
 * @polymer
 * @constructor
 * @implements {Polymer_ElementMixin}
 * @extends HTMLElement
 * @appliesMixin ElementMixin
 * @summary Custom element base class that provides the core API for Polymer's
 *   key meta-programming features including template stamping, data-binding,
 *   attribute deserialization, and property change observation
 */
var PolymerElement = ElementMixin(HTMLElement);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 */
var Debouncer = /** @class */ (function () {
    function Debouncer() {
        this._asyncModule = null;
        this._callback = null;
        this._timer = null;
    }
    /**
     * Sets the scheduler; that is, a module with the Async interface,
     * a callback and optional arguments to be passed to the run function
     * from the async module.
     *
     * @param {!AsyncInterface} asyncModule Object with Async interface.
     * @param {function()} callback Callback to run.
     * @return {void}
     */
    Debouncer.prototype.setConfig = function (asyncModule, callback) {
        var _this = this;
        this._asyncModule = asyncModule;
        this._callback = callback;
        this._timer = this._asyncModule.run(function () {
            _this._timer = null;
            debouncerQueue.delete(_this);
            _this._callback();
        });
    };
    /**
     * Cancels an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */
    Debouncer.prototype.cancel = function () {
        if (this.isActive()) {
            this._cancelAsync();
            // Canceling a debouncer removes its spot from the flush queue,
            // so if a debouncer is manually canceled and re-debounced, it
            // will reset its flush order (this is a very minor difference from 1.x)
            // Re-debouncing via the `debounce` API retains the 1.x FIFO flush order
            debouncerQueue.delete(this);
        }
    };
    /**
     * Cancels a debouncer's async callback.
     *
     * @return {void}
     */
    Debouncer.prototype._cancelAsync = function () {
        if (this.isActive()) {
            this._asyncModule.cancel(/** @type {number} */ (this._timer));
            this._timer = null;
        }
    };
    /**
     * Flushes an active debouncer and returns a reference to itself.
     *
     * @return {void}
     */
    Debouncer.prototype.flush = function () {
        if (this.isActive()) {
            this.cancel();
            this._callback();
        }
    };
    /**
     * Returns true if the debouncer is active.
     *
     * @return {boolean} True if active.
     */
    Debouncer.prototype.isActive = function () {
        return this._timer != null;
    };
    /**
     * Creates a debouncer if no debouncer is passed as a parameter
     * or it cancels an active debouncer otherwise. The following
     * example shows how a debouncer can be called multiple times within a
     * microtask and "debounced" such that the provided callback function is
     * called once. Add this method to a custom element:
     *
     * ```js
     * import {microTask} from '@polymer/polymer/lib/utils/async.js';
     * import {Debouncer} from '@polymer/polymer/lib/utils/debounce.js';
     * // ...
     *
     * _debounceWork() {
     *   this._debounceJob = Debouncer.debounce(this._debounceJob,
     *       microTask, () => this._doWork());
     * }
     * ```
     *
     * If the `_debounceWork` method is called multiple times within the same
     * microtask, the `_doWork` function will be called only once at the next
     * microtask checkpoint.
     *
     * Note: In testing it is often convenient to avoid asynchrony. To accomplish
     * this with a debouncer, you can use `enqueueDebouncer` and
     * `flush`. For example, extend the above example by adding
     * `enqueueDebouncer(this._debounceJob)` at the end of the
     * `_debounceWork` method. Then in a test, call `flush` to ensure
     * the debouncer has completed.
     *
     * @param {Debouncer?} debouncer Debouncer object.
     * @param {!AsyncInterface} asyncModule Object with Async interface
     * @param {function()} callback Callback to run.
     * @return {!Debouncer} Returns a debouncer object.
     */
    Debouncer.debounce = function (debouncer, asyncModule, callback) {
        if (debouncer instanceof Debouncer) {
            // Cancel the async callback, but leave in debouncerQueue if it was
            // enqueued, to maintain 1.x flush order
            debouncer._cancelAsync();
        }
        else {
            debouncer = new Debouncer();
        }
        debouncer.setConfig(asyncModule, callback);
        return debouncer;
    };
    return Debouncer;
}());
var debouncerQueue = new Set();
/**
 * Adds a `Debouncer` to a list of globally flushable tasks.
 *
 * @param {!Debouncer} debouncer Debouncer to enqueue
 * @return {void}
 */
var enqueueDebouncer = function (debouncer) {
    debouncerQueue.add(debouncer);
};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
// detect native touch action support
var HAS_NATIVE_TA = typeof document.head.style.touchAction === 'string';
var GESTURE_KEY = '__polymerGestures';
var HANDLED_OBJ = '__polymerGesturesHandled';
var TOUCH_ACTION = '__polymerGesturesTouchAction';
// radius for tap and track
var TAP_DISTANCE = 25;
var TRACK_DISTANCE = 5;
// number of last N track positions to keep
var TRACK_LENGTH = 2;
// Disabling "mouse" handlers for 2500ms is enough
var MOUSE_TIMEOUT = 2500;
var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'click'];
// an array of bitmask values for mapping MouseEvent.which to MouseEvent.buttons
var MOUSE_WHICH_TO_BUTTONS = [0, 1, 4, 2];
var MOUSE_HAS_BUTTONS = (function () {
    try {
        return new MouseEvent('test', { buttons: 1 }).buttons === 1;
    }
    catch (e) {
        return false;
    }
})();
/**
 * @param {string} name Possible mouse event name
 * @return {boolean} true if mouse event, false if not
 */
function isMouseEvent(name) {
    return MOUSE_EVENTS.indexOf(name) > -1;
}
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
// check for passive event listeners
var supportsPassive = false;
(function () {
    try {
        var opts = Object.defineProperty({}, 'passive', { get: function () { supportsPassive = true; } });
        window.addEventListener('test', null, opts);
        window.removeEventListener('test', null, opts);
    }
    catch (e) { }
})();
/**
 * Generate settings for event listeners, dependant on `passiveTouchGestures`
 *
 * @param {string} eventName Event name to determine if `{passive}` option is
 *   needed
 * @return {{passive: boolean} | undefined} Options to use for addEventListener
 *   and removeEventListener
 */
function PASSIVE_TOUCH(eventName) {
    if (isMouseEvent(eventName) || eventName === 'touchend') {
        return;
    }
    if (HAS_NATIVE_TA && supportsPassive && passiveTouchGestures) {
        return { passive: true };
    }
    else {
        return;
    }
}
// Check for touch-only devices
var IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
// keep track of any labels hit by the mouseCanceller
/** @type {!Array<!HTMLLabelElement>} */
var clickedLabels = [];
/** @type {!Object<boolean>} */
var labellable = {
    'button': true,
    'input': true,
    'keygen': true,
    'meter': true,
    'output': true,
    'textarea': true,
    'progress': true,
    'select': true
};
// Defined at https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#enabling-and-disabling-form-controls:-the-disabled-attribute
/** @type {!Object<boolean>} */
var canBeDisabled = {
    'button': true,
    'command': true,
    'fieldset': true,
    'input': true,
    'keygen': true,
    'optgroup': true,
    'option': true,
    'select': true,
    'textarea': true
};
/**
 * @param {HTMLElement} el Element to check labelling status
 * @return {boolean} element can have labels
 */
function canBeLabelled(el) {
    return labellable[el.localName] || false;
}
/**
 * @param {HTMLElement} el Element that may be labelled.
 * @return {!Array<!HTMLLabelElement>} Relevant label for `el`
 */
function matchingLabels(el) {
    var labels = Array.prototype.slice.call(/** @type {HTMLInputElement} */ (el).labels || []);
    // IE doesn't have `labels` and Safari doesn't populate `labels`
    // if element is in a shadowroot.
    // In this instance, finding the non-ancestor labels is enough,
    // as the mouseCancellor code will handle ancstor labels
    if (!labels.length) {
        labels = [];
        var root_1 = el.getRootNode();
        // if there is an id on `el`, check for all labels with a matching `for` attribute
        if (el.id) {
            var matching = root_1.querySelectorAll("label[for = " + el.id + "]");
            for (var i = 0; i < matching.length; i++) {
                labels.push(/** @type {!HTMLLabelElement} */ (matching[i]));
            }
        }
    }
    return labels;
}
// touch will make synthetic mouse events
// `preventDefault` on touchend will cancel them,
// but this breaks `<input>` focus and link clicks
// disable mouse handlers for MOUSE_TIMEOUT ms after
// a touchend to ignore synthetic mouse events
var mouseCanceller = function (mouseEvent) {
    // Check for sourceCapabilities, used to distinguish synthetic events
    // if mouseEvent did not come from a device that fires touch events,
    // it was made by a real mouse and should be counted
    // http://wicg.github.io/InputDeviceCapabilities/#dom-inputdevicecapabilities-firestouchevents
    var sc = mouseEvent.sourceCapabilities;
    if (sc && !sc.firesTouchEvents) {
        return;
    }
    // skip synthetic mouse events
    mouseEvent[HANDLED_OBJ] = { skip: true };
    // disable "ghost clicks"
    if (mouseEvent.type === 'click') {
        var clickFromLabel = false;
        var path = getComposedPath(mouseEvent);
        for (var i = 0; i < path.length; i++) {
            if (path[i].nodeType === Node.ELEMENT_NODE) {
                if (path[i].localName === 'label') {
                    clickedLabels.push(/** @type {!HTMLLabelElement} */ (path[i]));
                }
                else if (canBeLabelled(/** @type {!HTMLElement} */ (path[i]))) {
                    var ownerLabels = matchingLabels(/** @type {!HTMLElement} */ (path[i]));
                    // check if one of the clicked labels is labelling this element
                    for (var j = 0; j < ownerLabels.length; j++) {
                        clickFromLabel = clickFromLabel || clickedLabels.indexOf(ownerLabels[j]) > -1;
                    }
                }
            }
            if (path[i] === POINTERSTATE.mouse.target) {
                return;
            }
        }
        // if one of the clicked labels was labelling the target element,
        // this is not a ghost click
        if (clickFromLabel) {
            return;
        }
        mouseEvent.preventDefault();
        mouseEvent.stopPropagation();
    }
};
/**
 * @param {boolean=} setup True to add, false to remove.
 * @return {void}
 */
function setupTeardownMouseCanceller(setup) {
    var events = IS_TOUCH_ONLY ? ['click'] : MOUSE_EVENTS;
    for (var i = 0, en = void 0; i < events.length; i++) {
        en = events[i];
        if (setup) {
            // reset clickLabels array
            clickedLabels.length = 0;
            document.addEventListener(en, mouseCanceller, true);
        }
        else {
            document.removeEventListener(en, mouseCanceller, true);
        }
    }
}
function ignoreMouse(e) {
    if (!POINTERSTATE.mouse.mouseIgnoreJob) {
        setupTeardownMouseCanceller(true);
    }
    var unset = function () {
        setupTeardownMouseCanceller();
        POINTERSTATE.mouse.target = null;
        POINTERSTATE.mouse.mouseIgnoreJob = null;
    };
    POINTERSTATE.mouse.target = getComposedPath(e)[0];
    POINTERSTATE.mouse.mouseIgnoreJob = Debouncer.debounce(POINTERSTATE.mouse.mouseIgnoreJob, timeOut.after(MOUSE_TIMEOUT), unset);
}
/**
 * @param {MouseEvent} ev event to test for left mouse button down
 * @return {boolean} has left mouse button down
 */
function hasLeftMouseButton(ev) {
    var type = ev.type;
    // exit early if the event is not a mouse event
    if (!isMouseEvent(type)) {
        return false;
    }
    // ev.button is not reliable for mousemove (0 is overloaded as both left button and no buttons)
    // instead we use ev.buttons (bitmask of buttons) or fall back to ev.which (deprecated, 0 for no buttons, 1 for left button)
    if (type === 'mousemove') {
        // allow undefined for testing events
        var buttons = ev.buttons === undefined ? 1 : ev.buttons;
        if ((ev instanceof window.MouseEvent) && !MOUSE_HAS_BUTTONS) {
            buttons = MOUSE_WHICH_TO_BUTTONS[ev.which] || 0;
        }
        // buttons is a bitmask, check that the left button bit is set (1)
        return Boolean(buttons & 1);
    }
    else {
        // allow undefined for testing events
        var button = ev.button === undefined ? 0 : ev.button;
        // ev.button is 0 in mousedown/mouseup/click for left button activation
        return button === 0;
    }
}
function isSyntheticClick(ev) {
    if (ev.type === 'click') {
        // ev.detail is 0 for HTMLElement.click in most browsers
        if (ev.detail === 0) {
            return true;
        }
        // in the worst case, check that the x/y position of the click is within
        // the bounding box of the target of the event
        // Thanks IE 10 >:(
        var t = _findOriginalTarget(ev);
        // make sure the target of the event is an element so we can use getBoundingClientRect,
        // if not, just assume it is a synthetic click
        if (!t.nodeType || /** @type {Element} */ (t).nodeType !== Node.ELEMENT_NODE) {
            return true;
        }
        var bcr = /** @type {Element} */ (t).getBoundingClientRect();
        // use page x/y to account for scrolling
        var x = ev.pageX, y = ev.pageY;
        // ev is a synthetic click if the position is outside the bounding box of the target
        return !((x >= bcr.left && x <= bcr.right) && (y >= bcr.top && y <= bcr.bottom));
    }
    return false;
}
var POINTERSTATE = {
    mouse: {
        target: null,
        mouseIgnoreJob: null
    },
    touch: {
        x: 0,
        y: 0,
        id: -1,
        scrollDecided: false
    }
};
function firstTouchAction(ev) {
    var ta = 'auto';
    var path = getComposedPath(ev);
    for (var i = 0, n = void 0; i < path.length; i++) {
        n = path[i];
        if (n[TOUCH_ACTION]) {
            ta = n[TOUCH_ACTION];
            break;
        }
    }
    return ta;
}
function trackDocument(stateObj, movefn, upfn) {
    stateObj.movefn = movefn;
    stateObj.upfn = upfn;
    document.addEventListener('mousemove', movefn);
    document.addEventListener('mouseup', upfn);
}
function untrackDocument(stateObj) {
    document.removeEventListener('mousemove', stateObj.movefn);
    document.removeEventListener('mouseup', stateObj.upfn);
    stateObj.movefn = null;
    stateObj.upfn = null;
}
{
    // use a document-wide touchend listener to start the ghost-click prevention mechanism
    // Use passive event listeners, if supported, to not affect scrolling performance
    document.addEventListener('touchend', ignoreMouse, supportsPassive ? { passive: true } : false);
}
/**
 * Returns the composedPath for the given event.
 * @param {Event} event to process
 * @return {!Array<!EventTarget>} Path of the event
 */
var getComposedPath = window.ShadyDOM && window.ShadyDOM.noPatch ?
    window.ShadyDOM.composedPath :
    function (event) { return event.composedPath && event.composedPath() || []; };
/** @type {!Object<string, !GestureRecognizer>} */
var gestures = {};
/** @type {!Array<!GestureRecognizer>} */
var recognizers = [];
/**
 * Finds the element rendered on the screen at the provided coordinates.
 *
 * Similar to `document.elementFromPoint`, but pierces through
 * shadow roots.
 *
 * @param {number} x Horizontal pixel coordinate
 * @param {number} y Vertical pixel coordinate
 * @return {Element} Returns the deepest shadowRoot inclusive element
 * found at the screen position given.
 */
function deepTargetFind(x, y) {
    var node = document.elementFromPoint(x, y);
    var next = node;
    // this code path is only taken when native ShadowDOM is used
    // if there is a shadowroot, it may have a node at x/y
    // if there is not a shadowroot, exit the loop
    while (next && next.shadowRoot && !window.ShadyDOM) {
        // if there is a node at x/y in the shadowroot, look deeper
        var oldNext = next;
        next = next.shadowRoot.elementFromPoint(x, y);
        // on Safari, elementFromPoint may return the shadowRoot host
        if (oldNext === next) {
            break;
        }
        if (next) {
            node = next;
        }
    }
    return node;
}
/**
 * a cheaper check than ev.composedPath()[0];
 *
 * @private
 * @param {Event|Touch} ev Event.
 * @return {EventTarget} Returns the event target.
 */
function _findOriginalTarget(ev) {
    var path = getComposedPath(/** @type {?Event} */ (ev));
    // It shouldn't be, but sometimes path is empty (window on Safari).
    return path.length > 0 ? path[0] : ev.target;
}
/**
 * @private
 * @param {Event} ev Event.
 * @return {void}
 */
function _handleNative(ev) {
    var handled;
    var type = ev.type;
    var node = ev.currentTarget;
    var gobj = node[GESTURE_KEY];
    if (!gobj) {
        return;
    }
    var gs = gobj[type];
    if (!gs) {
        return;
    }
    if (!ev[HANDLED_OBJ]) {
        ev[HANDLED_OBJ] = {};
        if (type.slice(0, 5) === 'touch') {
            ev = /** @type {TouchEvent} */ (ev); // eslint-disable-line no-self-assign
            var t = ev.changedTouches[0];
            if (type === 'touchstart') {
                // only handle the first finger
                if (ev.touches.length === 1) {
                    POINTERSTATE.touch.id = t.identifier;
                }
            }
            if (POINTERSTATE.touch.id !== t.identifier) {
                return;
            }
            if (!HAS_NATIVE_TA) {
                if (type === 'touchstart' || type === 'touchmove') {
                    _handleTouchAction(ev);
                }
            }
        }
    }
    handled = ev[HANDLED_OBJ];
    // used to ignore synthetic mouse events
    if (handled.skip) {
        return;
    }
    // reset recognizer state
    for (var i = 0, r = void 0; i < recognizers.length; i++) {
        r = recognizers[i];
        if (gs[r.name] && !handled[r.name]) {
            if (r.flow && r.flow.start.indexOf(ev.type) > -1 && r.reset) {
                r.reset();
            }
        }
    }
    // enforce gesture recognizer order
    for (var i = 0, r = void 0; i < recognizers.length; i++) {
        r = recognizers[i];
        if (gs[r.name] && !handled[r.name]) {
            handled[r.name] = true;
            r[type](ev);
        }
    }
}
/**
 * @private
 * @param {TouchEvent} ev Event.
 * @return {void}
 */
function _handleTouchAction(ev) {
    var t = ev.changedTouches[0];
    var type = ev.type;
    if (type === 'touchstart') {
        POINTERSTATE.touch.x = t.clientX;
        POINTERSTATE.touch.y = t.clientY;
        POINTERSTATE.touch.scrollDecided = false;
    }
    else if (type === 'touchmove') {
        if (POINTERSTATE.touch.scrollDecided) {
            return;
        }
        POINTERSTATE.touch.scrollDecided = true;
        var ta = firstTouchAction(ev);
        var shouldPrevent = false;
        var dx = Math.abs(POINTERSTATE.touch.x - t.clientX);
        var dy = Math.abs(POINTERSTATE.touch.y - t.clientY);
        if (!ev.cancelable)
            ;
        else if (ta === 'none') {
            shouldPrevent = true;
        }
        else if (ta === 'pan-x') {
            shouldPrevent = dy > dx;
        }
        else if (ta === 'pan-y') {
            shouldPrevent = dx > dy;
        }
        if (shouldPrevent) {
            ev.preventDefault();
        }
        else {
            prevent('track');
        }
    }
}
/**
 * Adds an event listener to a node for the given gesture type.
 *
 * @param {!EventTarget} node Node to add listener on
 * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
 * @param {!function(!Event):void} handler Event listener function to call
 * @return {boolean} Returns true if a gesture event listener was added.
 */
function addListener(node, evType, handler) {
    if (gestures[evType]) {
        _add(node, evType, handler);
        return true;
    }
    return false;
}
/**
 * Removes an event listener from a node for the given gesture type.
 *
 * @param {!EventTarget} node Node to remove listener from
 * @param {string} evType Gesture type: `down`, `up`, `track`, or `tap`
 * @param {!function(!Event):void} handler Event listener function previously passed to
 *  `addListener`.
 * @return {boolean} Returns true if a gesture event listener was removed.
 */
function removeListener(node, evType, handler) {
    if (gestures[evType]) {
        _remove(node, evType, handler);
        return true;
    }
    return false;
}
/**
 * automate the event listeners for the native events
 *
 * @private
 * @param {!EventTarget} node Node on which to add the event.
 * @param {string} evType Event type to add.
 * @param {function(!Event)} handler Event handler function.
 * @return {void}
 */
function _add(node, evType, handler) {
    var recognizer = gestures[evType];
    var deps = recognizer.deps;
    var name = recognizer.name;
    var gobj = node[GESTURE_KEY];
    if (!gobj) {
        node[GESTURE_KEY] = gobj = {};
    }
    for (var i = 0, dep = void 0, gd = void 0; i < deps.length; i++) {
        dep = deps[i];
        // don't add mouse handlers on iOS because they cause gray selection overlays
        if (IS_TOUCH_ONLY && isMouseEvent(dep) && dep !== 'click') {
            continue;
        }
        gd = gobj[dep];
        if (!gd) {
            gobj[dep] = gd = { _count: 0 };
        }
        if (gd._count === 0) {
            node.addEventListener(dep, _handleNative, PASSIVE_TOUCH(dep));
        }
        gd[name] = (gd[name] || 0) + 1;
        gd._count = (gd._count || 0) + 1;
    }
    node.addEventListener(evType, handler);
    if (recognizer.touchAction) {
        setTouchAction(node, recognizer.touchAction);
    }
}
/**
 * automate event listener removal for native events
 *
 * @private
 * @param {!EventTarget} node Node on which to remove the event.
 * @param {string} evType Event type to remove.
 * @param {function(!Event): void} handler Event handler function.
 * @return {void}
 */
function _remove(node, evType, handler) {
    var recognizer = gestures[evType];
    var deps = recognizer.deps;
    var name = recognizer.name;
    var gobj = node[GESTURE_KEY];
    if (gobj) {
        for (var i = 0, dep = void 0, gd = void 0; i < deps.length; i++) {
            dep = deps[i];
            gd = gobj[dep];
            if (gd && gd[name]) {
                gd[name] = (gd[name] || 1) - 1;
                gd._count = (gd._count || 1) - 1;
                if (gd._count === 0) {
                    node.removeEventListener(dep, _handleNative, PASSIVE_TOUCH(dep));
                }
            }
        }
    }
    node.removeEventListener(evType, handler);
}
/**
 * Registers a new gesture event recognizer for adding new custom
 * gesture event types.
 *
 * @param {!GestureRecognizer} recog Gesture recognizer descriptor
 * @return {void}
 */
function register(recog) {
    recognizers.push(recog);
    for (var i = 0; i < recog.emits.length; i++) {
        gestures[recog.emits[i]] = recog;
    }
}
/**
 * @private
 * @param {string} evName Event name.
 * @return {Object} Returns the gesture for the given event name.
 */
function _findRecognizerByEvent(evName) {
    for (var i = 0, r = void 0; i < recognizers.length; i++) {
        r = recognizers[i];
        for (var j = 0, n = void 0; j < r.emits.length; j++) {
            n = r.emits[j];
            if (n === evName) {
                return r;
            }
        }
    }
    return null;
}
/**
 * Sets scrolling direction on node.
 *
 * This value is checked on first move, thus it should be called prior to
 * adding event listeners.
 *
 * @param {!EventTarget} node Node to set touch action setting on
 * @param {string} value Touch action value
 * @return {void}
 */
function setTouchAction(node, value) {
    if (HAS_NATIVE_TA && node instanceof HTMLElement) {
        // NOTE: add touchAction async so that events can be added in
        // custom element constructors. Otherwise we run afoul of custom
        // elements restriction against settings attributes (style) in the
        // constructor.
        microTask.run(function () {
            node.style.touchAction = value;
        });
    }
    node[TOUCH_ACTION] = value;
}
/**
 * Dispatches an event on the `target` element of `type` with the given
 * `detail`.
 * @private
 * @param {!EventTarget} target The element on which to fire an event.
 * @param {string} type The type of event to fire.
 * @param {!Object=} detail The detail object to populate on the event.
 * @return {void}
 */
function _fire(target, type, detail) {
    var ev = new Event(type, { bubbles: true, cancelable: true, composed: true });
    ev.detail = detail;
    wrap(/** @type {!Node} */ (target)).dispatchEvent(ev);
    // forward `preventDefault` in a clean way
    if (ev.defaultPrevented) {
        var preventer = detail.preventer || detail.sourceEvent;
        if (preventer && preventer.preventDefault) {
            preventer.preventDefault();
        }
    }
}
/**
 * Prevents the dispatch and default action of the given event name.
 *
 * @param {string} evName Event name.
 * @return {void}
 */
function prevent(evName) {
    var recognizer = _findRecognizerByEvent(evName);
    if (recognizer.info) {
        recognizer.info.prevent = true;
    }
}
/* eslint-disable valid-jsdoc */
register({
    name: 'downup',
    deps: ['mousedown', 'touchstart', 'touchend'],
    flow: {
        start: ['mousedown', 'touchstart'],
        end: ['mouseup', 'touchend']
    },
    emits: ['down', 'up'],
    info: {
        movefn: null,
        upfn: null
    },
    /**
     * @this {GestureRecognizer}
     * @return {void}
     */
    reset: function () {
        untrackDocument(this.info);
    },
    /**
     * @this {GestureRecognizer}
     * @param {MouseEvent} e
     * @return {void}
     */
    mousedown: function (e) {
        if (!hasLeftMouseButton(e)) {
            return;
        }
        var t = _findOriginalTarget(e);
        var self = this;
        var movefn = function movefn(e) {
            if (!hasLeftMouseButton(e)) {
                downupFire('up', t, e);
                untrackDocument(self.info);
            }
        };
        var upfn = function upfn(e) {
            if (hasLeftMouseButton(e)) {
                downupFire('up', t, e);
            }
            untrackDocument(self.info);
        };
        trackDocument(this.info, movefn, upfn);
        downupFire('down', t, e);
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchstart: function (e) {
        downupFire('down', _findOriginalTarget(e), e.changedTouches[0], e);
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchend: function (e) {
        downupFire('up', _findOriginalTarget(e), e.changedTouches[0], e);
    }
});
/**
 * @param {string} type
 * @param {EventTarget} target
 * @param {Event|Touch} event
 * @param {Event=} preventer
 * @return {void}
 */
function downupFire(type, target, event, preventer) {
    if (!target) {
        return;
    }
    _fire(target, type, {
        x: event.clientX,
        y: event.clientY,
        sourceEvent: event,
        preventer: preventer,
        prevent: function (e) {
            return prevent(e);
        }
    });
}
register({
    name: 'track',
    touchAction: 'none',
    deps: ['mousedown', 'touchstart', 'touchmove', 'touchend'],
    flow: {
        start: ['mousedown', 'touchstart'],
        end: ['mouseup', 'touchend']
    },
    emits: ['track'],
    info: {
        x: 0,
        y: 0,
        state: 'start',
        started: false,
        moves: [],
        /** @this {GestureInfo} */
        addMove: function (move) {
            if (this.moves.length > TRACK_LENGTH) {
                this.moves.shift();
            }
            this.moves.push(move);
        },
        movefn: null,
        upfn: null,
        prevent: false
    },
    /**
     * @this {GestureRecognizer}
     * @return {void}
     */
    reset: function () {
        this.info.state = 'start';
        this.info.started = false;
        this.info.moves = [];
        this.info.x = 0;
        this.info.y = 0;
        this.info.prevent = false;
        untrackDocument(this.info);
    },
    /**
     * @this {GestureRecognizer}
     * @param {MouseEvent} e
     * @return {void}
     */
    mousedown: function (e) {
        if (!hasLeftMouseButton(e)) {
            return;
        }
        var t = _findOriginalTarget(e);
        var self = this;
        var movefn = function movefn(e) {
            var x = e.clientX, y = e.clientY;
            if (trackHasMovedEnough(self.info, x, y)) {
                // first move is 'start', subsequent moves are 'move', mouseup is 'end'
                self.info.state = self.info.started ? (e.type === 'mouseup' ? 'end' : 'track') : 'start';
                if (self.info.state === 'start') {
                    // if and only if tracking, always prevent tap
                    prevent('tap');
                }
                self.info.addMove({ x: x, y: y });
                if (!hasLeftMouseButton(e)) {
                    // always fire "end"
                    self.info.state = 'end';
                    untrackDocument(self.info);
                }
                if (t) {
                    trackFire(self.info, t, e);
                }
                self.info.started = true;
            }
        };
        var upfn = function upfn(e) {
            if (self.info.started) {
                movefn(e);
            }
            // remove the temporary listeners
            untrackDocument(self.info);
        };
        // add temporary document listeners as mouse retargets
        trackDocument(this.info, movefn, upfn);
        this.info.x = e.clientX;
        this.info.y = e.clientY;
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchstart: function (e) {
        var ct = e.changedTouches[0];
        this.info.x = ct.clientX;
        this.info.y = ct.clientY;
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchmove: function (e) {
        var t = _findOriginalTarget(e);
        var ct = e.changedTouches[0];
        var x = ct.clientX, y = ct.clientY;
        if (trackHasMovedEnough(this.info, x, y)) {
            if (this.info.state === 'start') {
                // if and only if tracking, always prevent tap
                prevent('tap');
            }
            this.info.addMove({ x: x, y: y });
            trackFire(this.info, t, ct);
            this.info.state = 'track';
            this.info.started = true;
        }
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchend: function (e) {
        var t = _findOriginalTarget(e);
        var ct = e.changedTouches[0];
        // only trackend if track was started and not aborted
        if (this.info.started) {
            // reset started state on up
            this.info.state = 'end';
            this.info.addMove({ x: ct.clientX, y: ct.clientY });
            trackFire(this.info, t, ct);
        }
    }
});
/**
 * @param {!GestureInfo} info
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
function trackHasMovedEnough(info, x, y) {
    if (info.prevent) {
        return false;
    }
    if (info.started) {
        return true;
    }
    var dx = Math.abs(info.x - x);
    var dy = Math.abs(info.y - y);
    return (dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE);
}
/**
 * @param {!GestureInfo} info
 * @param {?EventTarget} target
 * @param {Touch} touch
 * @return {void}
 */
function trackFire(info, target, touch) {
    if (!target) {
        return;
    }
    var secondlast = info.moves[info.moves.length - 2];
    var lastmove = info.moves[info.moves.length - 1];
    var dx = lastmove.x - info.x;
    var dy = lastmove.y - info.y;
    var ddx, ddy = 0;
    if (secondlast) {
        ddx = lastmove.x - secondlast.x;
        ddy = lastmove.y - secondlast.y;
    }
    _fire(target, 'track', {
        state: info.state,
        x: touch.clientX,
        y: touch.clientY,
        dx: dx,
        dy: dy,
        ddx: ddx,
        ddy: ddy,
        sourceEvent: touch,
        hover: function () {
            return deepTargetFind(touch.clientX, touch.clientY);
        }
    });
}
register({
    name: 'tap',
    deps: ['mousedown', 'click', 'touchstart', 'touchend'],
    flow: {
        start: ['mousedown', 'touchstart'],
        end: ['click', 'touchend']
    },
    emits: ['tap'],
    info: {
        x: NaN,
        y: NaN,
        prevent: false
    },
    /**
     * @this {GestureRecognizer}
     * @return {void}
     */
    reset: function () {
        this.info.x = NaN;
        this.info.y = NaN;
        this.info.prevent = false;
    },
    /**
     * @this {GestureRecognizer}
     * @param {MouseEvent} e
     * @return {void}
     */
    mousedown: function (e) {
        if (hasLeftMouseButton(e)) {
            this.info.x = e.clientX;
            this.info.y = e.clientY;
        }
    },
    /**
     * @this {GestureRecognizer}
     * @param {MouseEvent} e
     * @return {void}
     */
    click: function (e) {
        if (hasLeftMouseButton(e)) {
            trackForward(this.info, e);
        }
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchstart: function (e) {
        var touch = e.changedTouches[0];
        this.info.x = touch.clientX;
        this.info.y = touch.clientY;
    },
    /**
     * @this {GestureRecognizer}
     * @param {TouchEvent} e
     * @return {void}
     */
    touchend: function (e) {
        trackForward(this.info, e.changedTouches[0], e);
    }
});
/**
 * @param {!GestureInfo} info
 * @param {Event | Touch} e
 * @param {Event=} preventer
 * @return {void}
 */
function trackForward(info, e, preventer) {
    var dx = Math.abs(e.clientX - info.x);
    var dy = Math.abs(e.clientY - info.y);
    // find original target from `preventer` for TouchEvents, or `e` for MouseEvents
    var t = _findOriginalTarget((preventer || e));
    if (!t || (canBeDisabled[ /** @type {!HTMLElement} */(t).localName] && t.hasAttribute('disabled'))) {
        return;
    }
    // dx,dy can be NaN if `click` has been simulated and there was no `down` for `start`
    if (isNaN(dx) || isNaN(dy) || (dx <= TAP_DISTANCE && dy <= TAP_DISTANCE) || isSyntheticClick(e)) {
        // prevent taps from being generated if an event has canceled them
        if (!info.prevent) {
            _fire(t, 'tap', {
                x: e.clientX,
                y: e.clientY,
                sourceEvent: e,
                preventer: preventer
            });
        }
    }
}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
/**
 * Element class mixin that provides API for adding Polymer's cross-platform
 * gesture events to nodes.
 *
 * The API is designed to be compatible with override points implemented
 * in `TemplateStamp` such that declarative event listeners in
 * templates will support gesture events when this mixin is applied along with
 * `TemplateStamp`.
 *
 * @mixinFunction
 * @polymer
 * @summary Element class mixin that provides API for adding Polymer's
 *   cross-platform gesture events to nodes
 * @template T
 * @param {function(new:T)} superClass Class to apply mixin to.
 * @return {function(new:T)} superClass with mixin applied.
 */
var GestureEventListeners = dedupingMixin(function (superClass) {
    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_GestureEventListeners}
     */
    var GestureEventListeners = /** @class */ (function (_super) {
        __extends(GestureEventListeners, _super);
        function GestureEventListeners() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Add the event listener to the node if it is a gestures event.
         *
         * @param {!EventTarget} node Node to add event listener to
         * @param {string} eventName Name of event
         * @param {function(!Event):void} handler Listener function to add
         * @return {void}
         * @override
         */
        GestureEventListeners.prototype._addEventListenerToNode = function (node, eventName, handler) {
            if (!addListener(node, eventName, handler)) {
                _super.prototype._addEventListenerToNode.call(this, node, eventName, handler);
            }
        };
        /**
         * Remove the event listener to the node if it is a gestures event.
         *
         * @param {!EventTarget} node Node to remove event listener from
         * @param {string} eventName Name of event
         * @param {function(!Event):void} handler Listener function to remove
         * @return {void}
         * @override
         */
        GestureEventListeners.prototype._removeEventListenerFromNode = function (node, eventName, handler) {
            if (!removeListener(node, eventName, handler)) {
                _super.prototype._removeEventListenerFromNode.call(this, node, eventName, handler);
            }
        };
        return GestureEventListeners;
    }(superClass));
    return GestureEventListeners;
});
/**
 * @polymerMixin
 */
var ThemePropertyMixin = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinThemePropertyMixin, _super);
    function VaadinThemePropertyMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VaadinThemePropertyMixin, "properties", {
        get: function () {
            return {
                /**
                 * Helper property with theme attribute value facilitating propagation
                 * in shadow DOM.
                 *
                 * Enables the component implementation to propagate the `theme`
                 * attribute value to the subcomponents in Shadow DOM by binding
                 * the subcomponent’s "theme" attribute to the `theme` property of
                 * the host.
                 *
                 * **NOTE:** Extending the mixin only provides the property for binding,
                 * and does not make the propagation alone.
                 *
                 * See [Theme Attribute and Subcomponents](https://github.com/vaadin/vaadin-themable-mixin/wiki/5.-Theme-Attribute-and-Subcomponents).
                 * page for more information.
                 *
                 * @protected
                 */
                theme: {
                    type: String,
                    readOnly: true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    /** @protected */
    VaadinThemePropertyMixin.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        if (name === 'theme') {
            this._setTheme(newValue);
        }
    };
    return VaadinThemePropertyMixin;
}(superClass)); };
/**
 * @polymerMixin
 * @mixes Vaadin.ThemePropertyMixin
 */
var ThemableMixin = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinThemableMixin, _super);
    function VaadinThemableMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @protected */
    VaadinThemableMixin.finalize = function () {
        var _this = this;
        _super.finalize.call(this);
        var template = this.prototype._template;
        var hasOwnTemplate = this.template && this.template.parentElement && this.template.parentElement.id === this.is;
        var inheritedTemplate = Object.getPrototypeOf(this.prototype)._template;
        if (inheritedTemplate && !hasOwnTemplate) {
            // The element doesn't define its own template -> include the theme modules from the inherited template
            Array.from(inheritedTemplate.content.querySelectorAll('style[include]')).forEach(function (s) {
                _this._includeStyle(s.getAttribute('include'), template);
            });
        }
        this._includeMatchingThemes(template);
    };
    /** @protected */
    VaadinThemableMixin._includeMatchingThemes = function (template) {
        var _this = this;
        var domModule = DomModule;
        var modules = domModule.prototype.modules;
        var hasThemes = false;
        var defaultModuleName = this.is + '-default-theme';
        Object.keys(modules)
            .sort(function (moduleNameA, moduleNameB) {
            var vaadinA = moduleNameA.indexOf('vaadin-') === 0;
            var vaadinB = moduleNameB.indexOf('vaadin-') === 0;
            var vaadinThemePrefixes = ['lumo-', 'material-'];
            var vaadinThemeA = vaadinThemePrefixes.filter(function (prefix) { return moduleNameA.indexOf(prefix) === 0; }).length > 0;
            var vaadinThemeB = vaadinThemePrefixes.filter(function (prefix) { return moduleNameB.indexOf(prefix) === 0; }).length > 0;
            if (vaadinA !== vaadinB) {
                // Include vaadin core styles first
                return vaadinA ? -1 : 1;
            }
            else if (vaadinThemeA !== vaadinThemeB) {
                // Include vaadin theme styles after that
                return vaadinThemeA ? -1 : 1;
            }
            else {
                // Lastly include custom styles so they override all vaadin styles
                return 0;
            }
        })
            .forEach(function (moduleName) {
            if (moduleName !== defaultModuleName) {
                var themeFor = modules[moduleName].getAttribute('theme-for');
                if (themeFor) {
                    themeFor.split(' ').forEach(function (themeForToken) {
                        if (new RegExp('^' + themeForToken.split('*').join('.*') + '$').test(_this.is)) {
                            hasThemes = true;
                            _this._includeStyle(moduleName, template);
                        }
                    });
                }
            }
        });
        if (!hasThemes && modules[defaultModuleName]) {
            // No theme modules found, include the default module if it exists
            this._includeStyle(defaultModuleName, template);
        }
    };
    /** @private */
    VaadinThemableMixin._includeStyle = function (moduleName, template) {
        if (template && !template.content.querySelector("style[include=\"" + moduleName + "\"]")) {
            var styleEl = document.createElement('style');
            styleEl.setAttribute('include', moduleName);
            template.content.appendChild(styleEl);
        }
    };
    return VaadinThemableMixin;
}(ThemePropertyMixin(superClass))); };
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
/**
 * A private mixin to avoid problems with dynamic properties and Polymer Analyzer.
 * No need to expose these properties in the API docs.
 * @polymerMixin
 */
var TabIndexMixin = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinTabIndexMixin, _super);
    function VaadinTabIndexMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VaadinTabIndexMixin, "properties", {
        get: function () {
            var properties = {
                /**
                 * Internal property needed to listen to `tabindex` attribute changes.
                 *
                 * For changing the tabindex of this component use the native `tabIndex` property.
                 * @private
                 */
                tabindex: {
                    type: Number,
                    value: 0,
                    reflectToAttribute: true,
                    observer: '_tabindexChanged'
                }
            };
            if (window.ShadyDOM) {
                // ShadyDOM browsers need the `tabIndex` in order to notify when the user changes it programmatically.
                properties['tabIndex'] = properties.tabindex;
            }
            return properties;
        },
        enumerable: true,
        configurable: true
    });
    return VaadinTabIndexMixin;
}(superClass)); };
/**
 * Polymer.IronControlState is not a proper 2.0 class, also, its tabindex
 * implementation fails in the shadow dom, so we have this for vaadin elements.
 * @polymerMixin
 */
var ControlStateMixin = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinControlStateMixin, _super);
    function VaadinControlStateMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VaadinControlStateMixin, "properties", {
        get: function () {
            return {
                /**
                 * Specify that this control should have input focus when the page loads.
                 */
                autofocus: {
                    type: Boolean
                },
                /**
                 * Stores the previous value of tabindex attribute of the disabled element
                 */
                _previousTabIndex: {
                    type: Number
                },
                /**
                 * If true, the user cannot interact with this element.
                 */
                disabled: {
                    type: Boolean,
                    observer: '_disabledChanged',
                    reflectToAttribute: true
                },
                _isShiftTabbing: {
                    type: Boolean
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    VaadinControlStateMixin.prototype.ready = function () {
        var _this = this;
        this.addEventListener('focusin', function (e) {
            if (e.composedPath()[0] === _this) {
                _this._focus(e);
            }
            else if (e.composedPath().indexOf(_this.focusElement) !== -1 && !_this.disabled) {
                _this._setFocused(true);
            }
        });
        this.addEventListener('focusout', function (e) { return _this._setFocused(false); });
        // In super.ready() other 'focusin' and 'focusout' listeners might be
        // added, so we call it after our own ones to ensure they execute first.
        // Issue to watch out: when incorrect, <vaadin-combo-box> refocuses the
        // input field on iOS after “Done” is pressed.
        _super.prototype.ready.call(this);
        // This fixes the bug in Firefox 61 (https://bugzilla.mozilla.org/show_bug.cgi?id=1472887)
        // where focusout event does not go out of shady DOM because composed property in the event is not true
        var ensureEventComposed = function (e) {
            if (!e.composed) {
                e.target.dispatchEvent(new CustomEvent(e.type, {
                    bubbles: true,
                    composed: true,
                    cancelable: false
                }));
            }
        };
        this.shadowRoot.addEventListener('focusin', ensureEventComposed);
        this.shadowRoot.addEventListener('focusout', ensureEventComposed);
        this.addEventListener('keydown', function (e) {
            if (!e.defaultPrevented && e.keyCode === 9) {
                if (e.shiftKey) {
                    // Flag is checked in _focus event handler.
                    _this._isShiftTabbing = true;
                    HTMLElement.prototype.focus.apply(_this);
                    _this._setFocused(false);
                    // Event handling in IE is asynchronous and the flag is removed asynchronously as well
                    setTimeout(function () { return _this._isShiftTabbing = false; }, 0);
                }
                else {
                    // Workaround for FF63-65 bug that causes the focus to get lost when
                    // blurring a slotted component with focusable shadow root content
                    // https://bugzilla.mozilla.org/show_bug.cgi?id=1528686
                    // TODO: Remove when safe
                    var firefox = window.navigator.userAgent.match(/Firefox\/(\d\d\.\d)/);
                    if (firefox
                        && parseFloat(firefox[1]) >= 63
                        && parseFloat(firefox[1]) < 66
                        && _this.parentNode
                        && _this.nextSibling) {
                        var fakeTarget_1 = document.createElement('input');
                        fakeTarget_1.style.position = 'absolute';
                        fakeTarget_1.style.opacity = 0;
                        fakeTarget_1.tabIndex = _this.tabIndex;
                        _this.parentNode.insertBefore(fakeTarget_1, _this.nextSibling);
                        fakeTarget_1.focus();
                        fakeTarget_1.addEventListener('focusout', function () { return _this.parentNode.removeChild(fakeTarget_1); });
                    }
                }
            }
        });
        if (this.autofocus && !this.focused && !this.disabled) {
            window.requestAnimationFrame(function () {
                _this._focus();
                _this._setFocused(true);
                _this.setAttribute('focus-ring', '');
            });
        }
        this._boundKeydownListener = this._bodyKeydownListener.bind(this);
        this._boundKeyupListener = this._bodyKeyupListener.bind(this);
    };
    /**
     * @protected
     */
    VaadinControlStateMixin.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
        document.body.addEventListener('keydown', this._boundKeydownListener, true);
        document.body.addEventListener('keyup', this._boundKeyupListener, true);
    };
    /**
     * @protected
     */
    VaadinControlStateMixin.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        document.body.removeEventListener('keydown', this._boundKeydownListener, true);
        document.body.removeEventListener('keyup', this._boundKeyupListener, true);
        // in non-Chrome browsers, blur does not fire on the element when it is disconnected.
        // reproducible in `<vaadin-date-picker>` when closing on `Cancel` or `Today` click.
        if (this.hasAttribute('focused')) {
            this._setFocused(false);
        }
    };
    VaadinControlStateMixin.prototype._setFocused = function (focused) {
        if (focused) {
            this.setAttribute('focused', '');
        }
        else {
            this.removeAttribute('focused');
        }
        // focus-ring is true when the element was focused from the keyboard.
        // Focus Ring [A11ycasts]: https://youtu.be/ilj2P5-5CjI
        if (focused && this._tabPressed) {
            this.setAttribute('focus-ring', '');
        }
        else {
            this.removeAttribute('focus-ring');
        }
    };
    VaadinControlStateMixin.prototype._bodyKeydownListener = function (e) {
        this._tabPressed = e.keyCode === 9;
    };
    VaadinControlStateMixin.prototype._bodyKeyupListener = function () {
        this._tabPressed = false;
    };
    Object.defineProperty(VaadinControlStateMixin.prototype, "focusElement", {
        /**
         * Any element extending this mixin is required to implement this getter.
         * It returns the actual focusable element in the component.
         */
        get: function () {
            window.console.warn("Please implement the 'focusElement' property in <" + this.localName + ">");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    VaadinControlStateMixin.prototype._focus = function (e) {
        if (this._isShiftTabbing) {
            return;
        }
        this.focusElement.focus();
        this._setFocused(true);
    };
    /**
     * Moving the focus from the host element causes firing of the blur event what leads to problems in IE.
     * @private
     */
    VaadinControlStateMixin.prototype.focus = function () {
        if (!this.focusElement || this.disabled) {
            return;
        }
        this.focusElement.focus();
        this._setFocused(true);
    };
    /**
     * Native bluring in the host element does nothing because it does not have the focus.
     * In chrome it works, but not in FF.
     * @private
     */
    VaadinControlStateMixin.prototype.blur = function () {
        this.focusElement.blur();
        this._setFocused(false);
    };
    VaadinControlStateMixin.prototype._disabledChanged = function (disabled) {
        this.focusElement.disabled = disabled;
        if (disabled) {
            this.blur();
            this._previousTabIndex = this.tabindex;
            this.tabindex = -1;
            this.setAttribute('aria-disabled', 'true');
        }
        else {
            if (typeof this._previousTabIndex !== 'undefined') {
                this.tabindex = this._previousTabIndex;
            }
            this.removeAttribute('aria-disabled');
        }
    };
    VaadinControlStateMixin.prototype._tabindexChanged = function (tabindex) {
        if (tabindex !== undefined) {
            this.focusElement.tabIndex = tabindex;
        }
        if (this.disabled && this.tabindex) {
            // If tabindex attribute was changed while checkbox was disabled
            if (this.tabindex !== -1) {
                this._previousTabIndex = this.tabindex;
            }
            this.tabindex = tabindex = undefined;
        }
        if (window.ShadyDOM) {
            this.setProperties({ tabIndex: tabindex, tabindex: tabindex });
        }
    };
    /**
     * @protected
     */
    VaadinControlStateMixin.prototype.click = function () {
        if (!this.disabled) {
            _super.prototype.click.call(this);
        }
    };
    return VaadinControlStateMixin;
}(TabIndexMixin(superClass))); };
/**
 * Array of Vaadin custom element classes that have been subscribed to the dir changes.
 */
var directionSubscribers = [];
var directionUpdater = function () {
    var documentDir = getDocumentDir();
    directionSubscribers.forEach(function (element) {
        alignDirs(element, documentDir);
    });
};
var directionObserver = new MutationObserver(directionUpdater);
directionObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
var alignDirs = function (element, documentDir) {
    if (documentDir) {
        element.setAttribute('dir', documentDir);
    }
    else {
        element.removeAttribute('dir');
    }
};
var getDocumentDir = function () {
    return document.documentElement.getAttribute('dir');
};
/**
 * @polymerMixin
 */
var DirMixin = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinDirMixin, _super);
    function VaadinDirMixin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VaadinDirMixin, "properties", {
        get: function () {
            return {
                /**
                 * @protected
                 */
                dir: {
                    type: String,
                    readOnly: true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    VaadinDirMixin.prototype.connectedCallback = function () {
        _super.prototype.connectedCallback.call(this);
        if (!this.hasAttribute('dir')) {
            this.__subscribe();
            alignDirs(this, getDocumentDir());
        }
    };
    /** @protected */
    VaadinDirMixin.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        _super.prototype.attributeChangedCallback.call(this, name, oldValue, newValue);
        if (name !== 'dir') {
            return;
        }
        // New value equals to the document direction and the element is not subscribed to the changes
        var newValueEqlDocDir = newValue === getDocumentDir() && directionSubscribers.indexOf(this) === -1;
        // Value was emptied and the element is not subscribed to the changes
        var newValueEmptied = !newValue && oldValue && directionSubscribers.indexOf(this) === -1;
        // New value is different and the old equals to document direction and the element is not subscribed to the changes
        var newDiffValue = newValue !== getDocumentDir() && oldValue === getDocumentDir();
        if (newValueEqlDocDir || newValueEmptied) {
            this.__subscribe();
            alignDirs(this, getDocumentDir());
        }
        else if (newDiffValue) {
            this.__subscribe(false);
        }
    };
    VaadinDirMixin.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        this.__subscribe(false);
    };
    VaadinDirMixin.prototype.__subscribe = function (push) {
        if (push === void 0) { push = true; }
        if (push) {
            directionSubscribers.indexOf(this) === -1 &&
                directionSubscribers.push(this);
        }
        else {
            directionSubscribers.indexOf(this) > -1 &&
                directionSubscribers.splice(directionSubscribers.indexOf(this), 1);
        }
    };
    return VaadinDirMixin;
}(superClass)); };
var DEV_MODE_CODE_REGEXP = /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
var FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;
function isMinified() {
    function test() {
        /** vaadin-dev-mode:start
        return false;
        vaadin-dev-mode:end **/
        return true;
    }
    return uncommentAndRun(test);
}
function isDevelopmentMode() {
    try {
        if (isForcedDevelopmentMode()) {
            return true;
        }
        if (!isLocalhost()) {
            return false;
        }
        if (FlowClients) {
            return !isFlowProductionMode();
        }
        return !isMinified();
    }
    catch (e) {
        // Some error in this code, assume production so no further actions will be taken
        return false;
    }
}
function isForcedDevelopmentMode() {
    return localStorage.getItem("vaadin.developmentmode.force");
}
function isLocalhost() {
    return (["localhost", "127.0.0.1"].indexOf(window.location.hostname) >= 0);
}
function isFlowProductionMode() {
    if (FlowClients) {
        var productionModeApps = Object.keys(FlowClients)
            .map(function (key) { return FlowClients[key]; })
            .filter(function (client) { return client.productionMode; });
        if (productionModeApps.length > 0) {
            return true;
        }
    }
    return false;
}
function uncommentAndRun(callback, args) {
    if (typeof callback !== 'function') {
        return;
    }
    var match = DEV_MODE_CODE_REGEXP.exec(callback.toString());
    if (match) {
        try {
            // requires CSP: script-src 'unsafe-eval'
            callback = new Function(match[1]);
        }
        catch (e) {
            // eat the exception
            console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
        }
    }
    return callback(args);
}
// A guard against polymer-modulizer removing the window.Vaadin
// initialization above.
window['Vaadin'] = window['Vaadin'] || {};
/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */
var runIfDevelopmentMode = function (callback, args) {
    if (window.Vaadin.developmentMode) {
        return uncommentAndRun(callback, args);
    }
};
if (window.Vaadin.developmentMode === undefined) {
    window.Vaadin.developmentMode = isDevelopmentMode();
}
/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */
function maybeGatherAndSendStats() {
    /** vaadin-dev-mode:start
    (function () {
  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  
  var getPolymerVersion = function getPolymerVersion() {
    return window.Polymer && window.Polymer.version;
  };
  
  var StatisticsGatherer = function () {
    function StatisticsGatherer(logger) {
      classCallCheck(this, StatisticsGatherer);
  
      this.now = new Date().getTime();
      this.logger = logger;
    }
  
    createClass(StatisticsGatherer, [{
      key: 'frameworkVersionDetectors',
      value: function frameworkVersionDetectors() {
        return {
          'Flow': function Flow() {
            if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
              var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
                return window.Vaadin.Flow.clients[key];
              }).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().flow;
              });
              if (flowVersions.length > 0) {
                return flowVersions[0];
              }
            }
          },
          'Vaadin Framework': function VaadinFramework() {
            if (window.vaadin && window.vaadin.clients) {
              var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
                return client.getVersionInfo;
              }).map(function (client) {
                return client.getVersionInfo().vaadinVersion;
              });
              if (frameworkVersions.length > 0) {
                return frameworkVersions[0];
              }
            }
          },
          'AngularJs': function AngularJs() {
            if (window.angular && window.angular.version && window.angular.version) {
              return window.angular.version.full;
            }
          },
          'Angular': function Angular() {
            if (window.ng) {
              var tags = document.querySelectorAll("[ng-version]");
              if (tags.length > 0) {
                return tags[0].getAttribute("ng-version");
              }
              return "Unknown";
            }
          },
          'Backbone.js': function BackboneJs() {
            if (window.Backbone) {
              return window.Backbone.VERSION;
            }
          },
          'React': function React() {
            var reactSelector = '[data-reactroot], [data-reactid]';
            if (!!document.querySelector(reactSelector)) {
              // React does not publish the version by default
              return "unknown";
            }
          },
          'Ember': function Ember() {
            if (window.Em && window.Em.VERSION) {
              return window.Em.VERSION;
            } else if (window.Ember && window.Ember.VERSION) {
              return window.Ember.VERSION;
            }
          },
          'jQuery': function (_jQuery) {
            function jQuery() {
              return _jQuery.apply(this, arguments);
            }
  
            jQuery.toString = function () {
              return _jQuery.toString();
            };
  
            return jQuery;
          }(function () {
            if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
              return jQuery.prototype.jquery;
            }
          }),
          'Polymer': function Polymer() {
            var version = getPolymerVersion();
            if (version) {
              return version;
            }
          },
          'LitElement': function LitElement() {
            var version = window.litElementVersions && window.litElementVersions[0];
            if (version) {
              return version;
            }
          },
          'LitHtml': function LitHtml() {
            var version = window.litHtmlVersions && window.litHtmlVersions[0];
            if (version) {
              return version;
            }
          },
          'Vue.js': function VueJs() {
            if (window.Vue) {
              return window.Vue.version;
            }
          }
        };
      }
    }, {
      key: 'getUsedVaadinElements',
      value: function getUsedVaadinElements(elements) {
        var version = getPolymerVersion();
        var elementClasses = void 0;
        // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
        // Check all locations calling the method getEntries() in
        // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
        // Currently it is only used by BootstrapHandler.
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: components classes are stored in window.Vaadin
          elementClasses = Object.keys(window.Vaadin).map(function (c) {
            return window.Vaadin[c];
          }).filter(function (c) {
            return c.is;
          });
        } else {
          // Polymer 3: components classes are stored in window.Vaadin.registrations
          elementClasses = window.Vaadin.registrations || [];
        }
        elementClasses.forEach(function (klass) {
          var version = klass.version ? klass.version : "0.0.0";
          elements[klass.is] = { version: version };
        });
      }
    }, {
      key: 'getUsedVaadinThemes',
      value: function getUsedVaadinThemes(themes) {
        ['Lumo', 'Material'].forEach(function (themeName) {
          var theme;
          var version = getPolymerVersion();
          if (version && version.indexOf('2') === 0) {
            // Polymer 2: themes are stored in window.Vaadin
            theme = window.Vaadin[themeName];
          } else {
            // Polymer 3: themes are stored in custom element registry
            theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
          }
          if (theme && theme.version) {
            themes[themeName] = { version: theme.version };
          }
        });
      }
    }, {
      key: 'getFrameworks',
      value: function getFrameworks(frameworks) {
        var detectors = this.frameworkVersionDetectors();
        Object.keys(detectors).forEach(function (framework) {
          var detector = detectors[framework];
          try {
            var version = detector();
            if (version) {
              frameworks[framework] = { version: version };
            }
          } catch (e) {}
        });
      }
    }, {
      key: 'gather',
      value: function gather(storage) {
        var storedStats = storage.read();
        var gatheredStats = {};
        var types = ["elements", "frameworks", "themes"];
  
        types.forEach(function (type) {
          gatheredStats[type] = {};
          if (!storedStats[type]) {
            storedStats[type] = {};
          }
        });
  
        var previousStats = JSON.stringify(storedStats);
  
        this.getUsedVaadinElements(gatheredStats.elements);
        this.getFrameworks(gatheredStats.frameworks);
        this.getUsedVaadinThemes(gatheredStats.themes);
  
        var now = this.now;
        types.forEach(function (type) {
          var keys = Object.keys(gatheredStats[type]);
          keys.forEach(function (key) {
            if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
              storedStats[type][key] = { firstUsed: now };
            }
            // Discards any previously logged version number
            storedStats[type][key].version = gatheredStats[type][key].version;
            storedStats[type][key].lastUsed = now;
          });
        });
  
        var newStats = JSON.stringify(storedStats);
        storage.write(newStats);
        if (newStats != previousStats && Object.keys(storedStats).length > 0) {
          this.logger.debug("New stats: " + newStats);
        }
      }
    }]);
    return StatisticsGatherer;
  }();
  
  var StatisticsStorage = function () {
    function StatisticsStorage(key) {
      classCallCheck(this, StatisticsStorage);
  
      this.key = key;
    }
  
    createClass(StatisticsStorage, [{
      key: 'read',
      value: function read() {
        var localStorageStatsString = localStorage.getItem(this.key);
        try {
          return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
        } catch (e) {
          return {};
        }
      }
    }, {
      key: 'write',
      value: function write(data) {
        localStorage.setItem(this.key, data);
      }
    }, {
      key: 'clear',
      value: function clear() {
        localStorage.removeItem(this.key);
      }
    }, {
      key: 'isEmpty',
      value: function isEmpty() {
        var storedStats = this.read();
        var empty = true;
        Object.keys(storedStats).forEach(function (key) {
          if (Object.keys(storedStats[key]).length > 0) {
            empty = false;
          }
        });
  
        return empty;
      }
    }]);
    return StatisticsStorage;
  }();
  
  var StatisticsSender = function () {
    function StatisticsSender(url, logger) {
      classCallCheck(this, StatisticsSender);
  
      this.url = url;
      this.logger = logger;
    }
  
    createClass(StatisticsSender, [{
      key: 'send',
      value: function send(data, errorHandler) {
        var logger = this.logger;
  
        if (navigator.onLine === false) {
          logger.debug("Offline, can't send");
          errorHandler();
          return;
        }
        logger.debug("Sending data to " + this.url);
  
        var req = new XMLHttpRequest();
        req.withCredentials = true;
        req.addEventListener("load", function () {
          // Stats sent, nothing more to do
          logger.debug("Response: " + req.responseText);
        });
        req.addEventListener("error", function () {
          logger.debug("Send failed");
          errorHandler();
        });
        req.addEventListener("abort", function () {
          logger.debug("Send aborted");
          errorHandler();
        });
        req.open("POST", this.url);
        req.setRequestHeader("Content-Type", "application/json");
        req.send(data);
      }
    }]);
    return StatisticsSender;
  }();
  
  var StatisticsLogger = function () {
    function StatisticsLogger(id) {
      classCallCheck(this, StatisticsLogger);
  
      this.id = id;
    }
  
    createClass(StatisticsLogger, [{
      key: '_isDebug',
      value: function _isDebug() {
        return localStorage.getItem("vaadin." + this.id + ".debug");
      }
    }, {
      key: 'debug',
      value: function debug(msg) {
        if (this._isDebug()) {
          console.info(this.id + ": " + msg);
        }
      }
    }]);
    return StatisticsLogger;
  }();
  
  var UsageStatistics = function () {
    function UsageStatistics() {
      classCallCheck(this, UsageStatistics);
  
      this.now = new Date();
      this.timeNow = this.now.getTime();
      this.gatherDelay = 10; // Delay between loading this file and gathering stats
      this.initialDelay = 24 * 60 * 60;
  
      this.logger = new StatisticsLogger("statistics");
      this.storage = new StatisticsStorage("vaadin.statistics.basket");
      this.gatherer = new StatisticsGatherer(this.logger);
      this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
    }
  
    createClass(UsageStatistics, [{
      key: 'maybeGatherAndSend',
      value: function maybeGatherAndSend() {
        var _this = this;
  
        if (localStorage.getItem(UsageStatistics.optOutKey)) {
          return;
        }
        this.gatherer.gather(this.storage);
        setTimeout(function () {
          _this.maybeSend();
        }, this.gatherDelay * 1000);
      }
    }, {
      key: 'lottery',
      value: function lottery() {
        return true;
      }
    }, {
      key: 'currentMonth',
      value: function currentMonth() {
        return this.now.getYear() * 12 + this.now.getMonth();
      }
    }, {
      key: 'maybeSend',
      value: function maybeSend() {
        var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));
  
        if (!firstUse) {
          // Use a grace period to avoid interfering with tests, incognito mode etc
          firstUse = this.timeNow;
          localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
        }
  
        if (this.timeNow < firstUse + this.initialDelay * 1000) {
          this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
          return;
        }
        if (this.currentMonth() <= monthProcessed) {
          this.logger.debug("This month has already been processed");
          return;
        }
        localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
        // Use random sampling
        if (this.lottery()) {
          this.logger.debug("Congratulations, we have a winner!");
        } else {
          this.logger.debug("Sorry, no stats from you this time");
          return;
        }
  
        this.send();
      }
    }, {
      key: 'send',
      value: function send() {
        // Ensure we have the latest data
        this.gatherer.gather(this.storage);
  
        // Read, send and clean up
        var data = this.storage.read();
        data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
        data["usageStatisticsVersion"] = UsageStatistics.version;
        var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
        var self = this;
        this.sender.send(info + JSON.stringify(data), function () {
          // Revert the 'month processed' flag
          localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
        });
      }
    }], [{
      key: 'version',
      get: function get$1() {
        return '2.1.0';
      }
    }, {
      key: 'firstUseKey',
      get: function get$1() {
        return 'vaadin.statistics.firstuse';
      }
    }, {
      key: 'monthProcessedKey',
      get: function get$1() {
        return 'vaadin.statistics.monthProcessed';
      }
    }, {
      key: 'optOutKey',
      get: function get$1() {
        return 'vaadin.statistics.optout';
      }
    }]);
    return UsageStatistics;
  }();
  
  try {
    window.Vaadin = window.Vaadin || {};
    window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
    window.Vaadin.usageStatsChecker.maybeGatherAndSend();
  } catch (e) {
    // Intentionally ignored as this is not a problem in the app being developed
  }
  
  }());
  
    vaadin-dev-mode:end **/
}
var usageStatistics = function () {
    if (typeof runIfDevelopmentMode === 'function') {
        return runIfDevelopmentMode(maybeGatherAndSendStats);
    }
};
if (!window.Vaadin) {
    window['Vaadin'] = {};
}
/**
 * Array of Vaadin custom element classes that have been finalized.
 */
window['Vaadin'].registrations = window.Vaadin.registrations || [];
// Use the hack to prevent polymer-modulizer from converting to exports
window['Vaadin'].developmentModeCallback = window.Vaadin.developmentModeCallback || {};
window['Vaadin'].developmentModeCallback['vaadin-usage-statistics'] = function () {
    if (usageStatistics) {
        usageStatistics();
    }
};
var statsJob;
var registered = new Set();
/**
 * @polymerMixin
 */
var ElementMixin$1 = function (superClass) { return /** @class */ (function (_super) {
    __extends(VaadinElementMixin, _super);
    function VaadinElementMixin() {
        var _this = _super.call(this) || this;
        if (document.doctype === null) {
            console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.');
        }
        return _this;
    }
    /** @protected */
    VaadinElementMixin.finalize = function () {
        _super.finalize.call(this);
        var is = this.is;
        // Registers a class prototype for telemetry purposes.
        if (is && !registered.has(is)) {
            window.Vaadin.registrations.push(this);
            registered.add(is);
            if (window.Vaadin.developmentModeCallback) {
                statsJob = Debouncer.debounce(statsJob, idlePeriod, function () {
                    window.Vaadin.developmentModeCallback['vaadin-usage-statistics']();
                });
                enqueueDebouncer(statsJob);
            }
        }
    };
    return VaadinElementMixin;
}(DirMixin(superClass))); };
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/
/**
 * `<vaadin-button>` is a Web Component providing an accessible and customizable button.
 *
 * ```html
 * <vaadin-button>
 * </vaadin-button>
 * ```
 *
 * ```js
 * document.querySelector('vaadin-button').addEventListener('click', () => alert('Hello World!'));
 * ```
 *
 * ### Styling
 *
 * The following shadow DOM parts are exposed for styling:
 *
 * Part name | Description
 * ----------------|----------------
 * `label` | The label (text) inside the button
 * `prefix` | A slot for e.g. an icon before the label
 * `suffix` | A slot for e.g. an icon after the label
 *
 *
 * The following attributes are exposed for styling:
 *
 * Attribute | Description
 * --------- | -----------
 * `active` | Set when the button is pressed down, either with mouse, touch or the keyboard.
 * `disabled` | Set when the button is disabled.
 * `focus-ring` | Set when the button is focused using the keyboard.
 * `focused` | Set when the button is focused.
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @memberof Vaadin
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ControlStateMixin
 * @mixes Vaadin.ThemableMixin
 * @mixes Polymer.GestureEventListeners
 * @demo demo/index.html
 */
var ButtonElement = /** @class */ (function (_super) {
    __extends(ButtonElement, _super);
    function ButtonElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ButtonElement, "template", {
        get: function () {
            return html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        outline: none;\n        white-space: nowrap;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      /* Ensure the button is always aligned on the baseline */\n      .vaadin-button-container::before {\n        content: \"\\2003\";\n        display: inline-block;\n        width: 0;\n      }\n\n      .vaadin-button-container {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        text-align: center;\n        width: 100%;\n        height: 100%;\n        min-height: inherit;\n        text-shadow: inherit;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      [part=\"prefix\"],\n      [part=\"suffix\"] {\n        flex: none;\n      }\n\n      [part=\"label\"] {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      #button {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        cursor: inherit;\n      }\n    </style>\n    <div class=\"vaadin-button-container\">\n      <div part=\"prefix\">\n        <slot name=\"prefix\"></slot>\n      </div>\n      <div part=\"label\">\n        <slot></slot>\n      </div>\n      <div part=\"suffix\">\n        <slot name=\"suffix\"></slot>\n      </div>\n    </div>\n    <button id=\"button\" type=\"button\"></button>\n"], ["\n    <style>\n      :host {\n        display: inline-block;\n        position: relative;\n        outline: none;\n        white-space: nowrap;\n      }\n\n      :host([hidden]) {\n        display: none !important;\n      }\n\n      /* Ensure the button is always aligned on the baseline */\n      .vaadin-button-container::before {\n        content: \"\\\\2003\";\n        display: inline-block;\n        width: 0;\n      }\n\n      .vaadin-button-container {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        text-align: center;\n        width: 100%;\n        height: 100%;\n        min-height: inherit;\n        text-shadow: inherit;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      [part=\"prefix\"],\n      [part=\"suffix\"] {\n        flex: none;\n      }\n\n      [part=\"label\"] {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n\n      #button {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        opacity: 0;\n        cursor: inherit;\n      }\n    </style>\n    <div class=\"vaadin-button-container\">\n      <div part=\"prefix\">\n        <slot name=\"prefix\"></slot>\n      </div>\n      <div part=\"label\">\n        <slot></slot>\n      </div>\n      <div part=\"suffix\">\n        <slot name=\"suffix\"></slot>\n      </div>\n    </div>\n    <button id=\"button\" type=\"button\"></button>\n"])));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonElement, "is", {
        get: function () {
            return 'vaadin-button';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonElement, "version", {
        get: function () {
            return '2.2.2';
        },
        enumerable: true,
        configurable: true
    });
    ButtonElement.prototype.ready = function () {
        _super.prototype.ready.call(this);
        // Leaving default role in the native button, makes navigation announcement
        // being different when using focus navigation (tab) versus using normal
        // navigation (arrows). The first way announces the label on a button
        // since the focus is moved programmatically, and the second on a group.
        this.setAttribute('role', 'button');
        this.$.button.setAttribute('role', 'presentation');
        this._addActiveListeners();
        // Fix for https://github.com/vaadin/vaadin-button-flow/issues/120
        window.ShadyDOM && window.ShadyDOM.flush();
    };
    /**
     * @protected
     */
    ButtonElement.prototype.disconnectedCallback = function () {
        _super.prototype.disconnectedCallback.call(this);
        // `active` state is preserved when the element is disconnected between keydown and keyup events.
        // reproducible in `<vaadin-date-picker>` when closing on `Cancel` or `Today` click.
        if (this.hasAttribute('active')) {
            this.removeAttribute('active');
        }
    };
    ButtonElement.prototype._addActiveListeners = function () {
        var _this = this;
        addListener(this, 'down', function () { return !_this.disabled && _this.setAttribute('active', ''); });
        addListener(this, 'up', function () { return _this.removeAttribute('active'); });
        this.addEventListener('keydown', function (e) { return !_this.disabled && [13, 32].indexOf(e.keyCode) >= 0 && _this.setAttribute('active', ''); });
        this.addEventListener('keyup', function () { return _this.removeAttribute('active'); });
        this.addEventListener('blur', function () { return _this.removeAttribute('active'); });
    };
    Object.defineProperty(ButtonElement.prototype, "focusElement", {
        /**
         * @protected
         */
        get: function () {
            return this.$.button;
        },
        enumerable: true,
        configurable: true
    });
    return ButtonElement;
}(ElementMixin$1(ControlStateMixin(ThemableMixin(GestureEventListeners(PolymerElement))))));
customElements.define(ButtonElement.is, ButtonElement);
var MyComponent = /** @class */ (function () {
    function MyComponent(hostRef) {
        registerInstance(this, hostRef);
    }
    MyComponent.prototype.render = function () {
        return (h("vaadin-button", null, "Test"));
    };
    return MyComponent;
}());
export { MyComponent as my_component };
var templateObject_1, templateObject_2;
