import{r as t,h as e}from"./p-5b37b001.js";class n extends HTMLElement{static get version(){return"1.6.0"}}customElements.define("vaadin-lumo-styles",n);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let o,i=null,s=window.HTMLImports&&window.HTMLImports.whenReady||null;function r(t){requestAnimationFrame((function(){s?s(t):(i||(i=new Promise(t=>{o=t}),"complete"===document.readyState?o():document.addEventListener("readystatechange",()=>{"complete"===document.readyState&&o()})),i.then((function(){t&&t()})))}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const l="__shadyCSSCachedStyle";let a=null,c=null;class u{constructor(){this.customStyles=[],this.enqueued=!1,r(()=>{window.ShadyCSS.flushCustomStyles&&window.ShadyCSS.flushCustomStyles()})}enqueueDocumentValidation(){!this.enqueued&&c&&(this.enqueued=!0,r(c))}addCustomStyle(t){t.__seenByShadyCSS||(t.__seenByShadyCSS=!0,this.customStyles.push(t),this.enqueueDocumentValidation())}getStyleForCustomStyle(t){if(t[l])return t[l];let e;return e=t.getStyle?t.getStyle():t,e}processStyles(){const t=this.customStyles;for(let e=0;e<t.length;e++){const n=t[e];if(n[l])continue;const o=this.getStyleForCustomStyle(n);if(o){const t=o.__appliedElement||o;a&&a(t),n[l]=t}}return t}}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function h(t,e){for(let n in e)null===n?t.style.removeProperty(n):t.style.setProperty(n,e[n])}u.prototype.addCustomStyle=u.prototype.addCustomStyle,u.prototype.getStyleForCustomStyle=u.prototype.getStyleForCustomStyle,u.prototype.processStyles=u.prototype.processStyles,Object.defineProperties(u.prototype,{transformCallback:{get:()=>a,set(t){a=t}},validateCallback:{get:()=>c,set(t){let e=!1;c||(e=!0),c=t,e&&this.enqueueDocumentValidation()}}});
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
const m=!(window.ShadyDOM&&window.ShadyDOM.inUse);let d,p;function f(t){d=(!t||!t.shimcssproperties)&&(m||Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/)&&window.CSS&&CSS.supports&&CSS.supports("box-shadow","0 0 0 var(--foo)")))}window.ShadyCSS&&void 0!==window.ShadyCSS.cssBuild&&(p=window.ShadyCSS.cssBuild);const y=Boolean(window.ShadyCSS&&window.ShadyCSS.disableRuntime);window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss?d=window.ShadyCSS.nativeCss:window.ShadyCSS?(f(window.ShadyCSS),window.ShadyCSS=void 0):f(window.WebComponents&&window.WebComponents.flags);const b=d,v=new u;
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/window.ShadyCSS||(window.ShadyCSS={prepareTemplate(t,e,n){},prepareTemplateDom(t,e){},prepareTemplateStyles(t,e,n){},styleSubtree(t,e){v.processStyles(),h(t,e)},styleElement(t){v.processStyles()},styleDocument(t){v.processStyles(),h(document.body,t)},getComputedStyleValue:(t,e)=>function(t,e){const n=window.getComputedStyle(t).getPropertyValue(e);return n?n.trim():""}(t,e),flushCustomStyles(){},nativeCss:b,nativeShadow:m,cssBuild:p,disableRuntime:y}),window.ShadyCSS.CustomStyleInterface=v,
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
window.JSCompiler_renameProperty=function(t){return t};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let w,g,x=/(url\()([^)]*)(\))/g,_=/(^\/[^\/])|(^#)|(^[\w-\d]*:)/;function k(t,e){if(t&&_.test(t))return t;if("//"===t)return t;if(void 0===w){w=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",w="http://a/c%20d"===t.href}catch(n){}}if(e||(e=document.baseURI||window.location.href),w)try{return new URL(t,e).href}catch(n){return t}return g||(g=document.implementation.createHTMLDocument("temp"),g.base=g.createElement("base"),g.head.appendChild(g.base),g.anchor=g.createElement("a"),g.body.appendChild(g.anchor)),g.base.href=e,g.anchor.href=t,g.anchor.href||t}function z(t,e){return t.replace(x,(function(t,n,o,i){return n+"'"+k(o.replace(/["']/g,""),e)+"'"+i}))}function P(t){return t.substring(0,t.lastIndexOf("/")+1)}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let C=P(document.baseURI||window.location.href),T=window.Polymer&&window.Polymer.sanitizeDOMValue||void 0,E={},S={};class N extends HTMLElement{static get observedAttributes(){return["id"]}static import(t,e){if(t){let n=function(t){return E[t]||S[t.toLowerCase()]}(t);return n&&e?n.querySelector(e):n}return null}attributeChangedCallback(t,e,n,o){e!==n&&this.register()}get assetpath(){if(!this.__assetpath){const t=window.HTMLImports&&HTMLImports.importForElement?HTMLImports.importForElement(this)||document:this.ownerDocument,e=k(this.getAttribute("assetpath")||"",t.baseURI);this.__assetpath=P(e)}return this.__assetpath}register(t){var e;(t=t||this.id)&&(this.id=t,function(t,e){E[t]=S[t.toLowerCase()]=e}(t,this),(e=this).querySelector("style")&&console.warn("dom-module %s has style outside template",e.id))}}function O(t){return N.import(t)}function A(t){const e=z((t.body?t.body:t).textContent,t.baseURI),n=document.createElement("style");return n.textContent=e,n}function F(t){const e=t.trim().split(/\s+/),n=[];for(let o=0;o<e.length;o++)n.push(...M(e[o]));return n}function M(t){const e=O(t);if(!e)return console.warn("Could not find style data in module named",t),[];if(void 0===e._styles){const t=[];t.push(...L(e));const n=e.querySelector("template");n&&t.push(...j(n,e.assetpath)),e._styles=t}return e._styles}function j(t,e){if(!t._styles){const n=[],o=t.content.querySelectorAll("style");for(let t=0;t<o.length;t++){let i=o[t],s=i.getAttribute("include");s&&n.push(...F(s).filter((function(t,e,n){return n.indexOf(t)===e}))),e&&(i.textContent=z(i.textContent,e)),n.push(i)}t._styles=n}return t._styles}function L(t){const e=[],n=t.querySelectorAll("link[rel=import][type~=css]");for(let o=0;o<n.length;o++){let t=n[o];if(t.import){const n=t.import,o=t.hasAttribute("shady-unscoped");if(o&&!n._unscopedStyle){const t=A(n);t.setAttribute("shady-unscoped",""),n._unscopedStyle=t}else n._style||(n._style=A(n));e.push(o?n._unscopedStyle:n._style)}}return e}function B(t){let e=O(t);if(e&&void 0===e._cssText){let t=function(t){let e="",n=L(t);for(let o=0;o<n.length;o++)e+=n[o].textContent;return e}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/(e),n=e.querySelector("template");n&&(t+=function(t,e){let n="";const o=j(t,e);for(let i=0;i<o.length;i++){let t=o[i];t.parentNode&&t.parentNode.removeChild(t),n+=t.textContent}return n}(n,e.assetpath)),e._cssText=t||null}return e||console.warn("Could not find style data in module named",t),e&&e._cssText||""}N.prototype.modules=E,customElements.define("dom-module",N);const H=window.ShadyCSS.CustomStyleInterface;class R extends HTMLElement{constructor(){super(),this._style=null,H.addCustomStyle(this)}getStyle(){if(this._style)return this._style;const t=this.querySelector("style");if(!t)return null;this._style=t;const e=t.getAttribute("include");return e&&(t.removeAttribute("include"),t.textContent=function(t){let e=t.trim().split(/\s+/),n="";for(let o=0;o<e.length;o++)n+=B(e[o]);return n}(e)+t.textContent),this.ownerDocument!==window.document&&window.document.head.appendChild(this),this._style}}window.customElements.define("custom-style",R);const $=document.createElement("template");$.innerHTML='<custom-style>\n  <style>\n    html {\n      /* Base (background) */\n      --lumo-base-color: #FFF;\n\n      /* Tint */\n      --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);\n      --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);\n      --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);\n      --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);\n      --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);\n      --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);\n      --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);\n      --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);\n      --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);\n      --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);\n      --lumo-tint: #FFF;\n\n      /* Shade */\n      --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);\n      --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);\n      --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);\n      --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);\n      --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);\n      --lumo-shade-50pct: hsla(214, 45%, 20%, 0.5);\n      --lumo-shade-60pct: hsla(214, 43%, 19%, 0.61);\n      --lumo-shade-70pct: hsla(214, 42%, 18%, 0.72);\n      --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);\n      --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);\n      --lumo-shade: hsl(214, 35%, 15%);\n\n      /* Contrast */\n      --lumo-contrast-5pct: var(--lumo-shade-5pct);\n      --lumo-contrast-10pct: var(--lumo-shade-10pct);\n      --lumo-contrast-20pct: var(--lumo-shade-20pct);\n      --lumo-contrast-30pct: var(--lumo-shade-30pct);\n      --lumo-contrast-40pct: var(--lumo-shade-40pct);\n      --lumo-contrast-50pct: var(--lumo-shade-50pct);\n      --lumo-contrast-60pct: var(--lumo-shade-60pct);\n      --lumo-contrast-70pct: var(--lumo-shade-70pct);\n      --lumo-contrast-80pct: var(--lumo-shade-80pct);\n      --lumo-contrast-90pct: var(--lumo-shade-90pct);\n      --lumo-contrast: var(--lumo-shade);\n\n      /* Text */\n      --lumo-header-text-color: var(--lumo-contrast);\n      --lumo-body-text-color: var(--lumo-contrast-90pct);\n      --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n      --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n      --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n      /* Primary */\n      --lumo-primary-color: hsl(214, 90%, 52%);\n      --lumo-primary-color-50pct: hsla(214, 90%, 52%, 0.5);\n      --lumo-primary-color-10pct: hsla(214, 90%, 52%, 0.1);\n      --lumo-primary-text-color: var(--lumo-primary-color);\n      --lumo-primary-contrast-color: #FFF;\n\n      /* Error */\n      --lumo-error-color: hsl(3, 100%, 61%);\n      --lumo-error-color-50pct: hsla(3, 100%, 60%, 0.5);\n      --lumo-error-color-10pct: hsla(3, 100%, 60%, 0.1);\n      --lumo-error-text-color: hsl(3, 92%, 53%);\n      --lumo-error-contrast-color: #FFF;\n\n      /* Success */\n      --lumo-success-color: hsl(145, 80%, 42%); /* hsl(144,82%,37%); */\n      --lumo-success-color-50pct: hsla(145, 76%, 44%, 0.55);\n      --lumo-success-color-10pct: hsla(145, 76%, 44%, 0.12);\n      --lumo-success-text-color: hsl(145, 100%, 32%);\n      --lumo-success-contrast-color: #FFF;\n    }\n  </style>\n</custom-style><dom-module id="lumo-color">\n  <template>\n    <style>\n      [theme~="dark"] {\n        /* Base (background) */\n        --lumo-base-color: hsl(214, 35%, 21%);\n\n        /* Tint */\n        --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);\n        --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);\n        --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);\n        --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);\n        --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);\n        --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);\n        --lumo-tint-60pct: hsla(214, 82%, 90%, 0.6);\n        --lumo-tint-70pct: hsla(214, 87%, 92%, 0.7);\n        --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);\n        --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);\n        --lumo-tint: hsl(214, 100%, 98%);\n\n        /* Shade */\n        --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);\n        --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);\n        --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);\n        --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);\n        --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);\n        --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);\n        --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);\n        --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);\n        --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);\n        --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);\n        --lumo-shade: hsl(214, 33%, 13%);\n\n        /* Contrast */\n        --lumo-contrast-5pct: var(--lumo-tint-5pct);\n        --lumo-contrast-10pct: var(--lumo-tint-10pct);\n        --lumo-contrast-20pct: var(--lumo-tint-20pct);\n        --lumo-contrast-30pct: var(--lumo-tint-30pct);\n        --lumo-contrast-40pct: var(--lumo-tint-40pct);\n        --lumo-contrast-50pct: var(--lumo-tint-50pct);\n        --lumo-contrast-60pct: var(--lumo-tint-60pct);\n        --lumo-contrast-70pct: var(--lumo-tint-70pct);\n        --lumo-contrast-80pct: var(--lumo-tint-80pct);\n        --lumo-contrast-90pct: var(--lumo-tint-90pct);\n        --lumo-contrast: var(--lumo-tint);\n\n        /* Text */\n        --lumo-header-text-color: var(--lumo-contrast);\n        --lumo-body-text-color: var(--lumo-contrast-90pct);\n        --lumo-secondary-text-color: var(--lumo-contrast-70pct);\n        --lumo-tertiary-text-color: var(--lumo-contrast-50pct);\n        --lumo-disabled-text-color: var(--lumo-contrast-30pct);\n\n        /* Primary */\n        --lumo-primary-color: hsl(214, 86%, 55%);\n        --lumo-primary-color-50pct: hsla(214, 86%, 55%, 0.5);\n        --lumo-primary-color-10pct: hsla(214, 90%, 63%, 0.1);\n        --lumo-primary-text-color: hsl(214, 100%, 70%);\n        --lumo-primary-contrast-color: #FFF;\n\n        /* Error */\n        --lumo-error-color: hsl(3, 90%, 63%);\n        --lumo-error-color-50pct: hsla(3, 90%, 63%, 0.5);\n        --lumo-error-color-10pct: hsla(3, 90%, 63%, 0.1);\n        --lumo-error-text-color: hsl(3, 100%, 67%);\n\n        /* Success */\n        --lumo-success-color: hsl(145, 65%, 42%);\n        --lumo-success-color-50pct: hsla(145, 65%, 42%, 0.5);\n        --lumo-success-color-10pct: hsla(145, 65%, 42%, 0.1);\n        --lumo-success-text-color: hsl(145, 85%, 47%);\n      }\n\n      html {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      [theme~="dark"] {\n        color: var(--lumo-body-text-color);\n        background-color: var(--lumo-base-color);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        color: var(--lumo-header-text-color);\n      }\n\n      a {\n        color: var(--lumo-primary-text-color);\n      }\n\n      blockquote {\n        color: var(--lumo-secondary-text-color);\n      }\n\n      code,\n      pre {\n        background-color: var(--lumo-contrast-10pct);\n        border-radius: var(--lumo-border-radius-m);\n      }\n    </style>\n  </template>\n</dom-module><dom-module id="lumo-color-legacy">\n  <template>\n    <style include="lumo-color">\n      :host {\n        color: var(--lumo-body-text-color) !important;\n        background-color: var(--lumo-base-color) !important;\n      }\n    </style>\n  </template>\n</dom-module>',document.head.appendChild($.content);const D=document.createElement("template");D.innerHTML="<custom-style>\n  <style>\n    html {\n      --lumo-size-xs: 1.625rem;\n      --lumo-size-s: 1.875rem;\n      --lumo-size-m: 2.25rem;\n      --lumo-size-l: 2.75rem;\n      --lumo-size-xl: 3.5rem;\n\n      /* Icons */\n      --lumo-icon-size-s: 1.25em;\n      --lumo-icon-size-m: 1.5em;\n      --lumo-icon-size-l: 2.25em;\n      /* For backwards compatibility */\n      --lumo-icon-size: var(--lumo-icon-size-m);\n    }\n  </style>\n</custom-style>",document.head.appendChild(D.content);const J=document.createElement("template");J.innerHTML="<custom-style>\n  <style>\n    html {\n      /* Square */\n      --lumo-space-xs: 0.25rem;\n      --lumo-space-s: 0.5rem;\n      --lumo-space-m: 1rem;\n      --lumo-space-l: 1.5rem;\n      --lumo-space-xl: 2.5rem;\n\n      /* Wide */\n      --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);\n      --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);\n      --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);\n      --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);\n      --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);\n\n      /* Tall */\n      --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);\n      --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);\n      --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);\n      --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);\n      --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);\n    }\n  </style>\n</custom-style>",document.head.appendChild(J.content);const I=document.createElement("template");I.innerHTML="<custom-style>\n  <style>\n    html {\n      /* Border radius */\n      --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */\n      --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */\n      --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */\n      --lumo-border-radius: 0.25em; /* Deprecated */\n\n      /* Shadow */\n      --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);\n      --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);\n      --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);\n      --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);\n      --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);\n\n      /* Clickable element cursor */\n      --lumo-clickable-cursor: default;\n    }\n  </style>\n</custom-style>",document.head.appendChild(I.content);const q=document.createElement("template");q.innerHTML='<custom-style>\n  <style>\n    html {\n      /* Font families */\n      --lumo-font-family: -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n\n      /* Font sizes */\n      --lumo-font-size-xxs: .75rem;\n      --lumo-font-size-xs: .8125rem;\n      --lumo-font-size-s: .875rem;\n      --lumo-font-size-m: 1rem;\n      --lumo-font-size-l: 1.125rem;\n      --lumo-font-size-xl: 1.375rem;\n      --lumo-font-size-xxl: 1.75rem;\n      --lumo-font-size-xxxl: 2.5rem;\n\n      /* Line heights */\n      --lumo-line-height-xs: 1.25;\n      --lumo-line-height-s: 1.375;\n      --lumo-line-height-m: 1.625;\n    }\n\n  </style>\n</custom-style><dom-module id="lumo-typography">\n  <template>\n    <style>\n      html {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      /* Can’t combine with the above selector because that doesn’t work in browsers without native shadow dom */\n      :host {\n        font-family: var(--lumo-font-family);\n        font-size: var(--lumo-font-size, var(--lumo-font-size-m));\n        line-height: var(--lumo-line-height-m);\n        -webkit-text-size-adjust: 100%;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      small,\n      [theme~="font-size-s"] {\n        font-size: var(--lumo-font-size-s);\n        line-height: var(--lumo-line-height-s);\n      }\n\n      [theme~="font-size-xs"] {\n        font-size: var(--lumo-font-size-xs);\n        line-height: var(--lumo-line-height-xs);\n      }\n\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-weight: 600;\n        line-height: var(--lumo-line-height-xs);\n        margin-top: 1.25em;\n      }\n\n      h1 {\n        font-size: var(--lumo-font-size-xxxl);\n        margin-bottom: 0.75em;\n      }\n\n      h2 {\n        font-size: var(--lumo-font-size-xxl);\n        margin-bottom: 0.5em;\n      }\n\n      h3 {\n        font-size: var(--lumo-font-size-xl);\n        margin-bottom: 0.5em;\n      }\n\n      h4 {\n        font-size: var(--lumo-font-size-l);\n        margin-bottom: 0.5em;\n      }\n\n      h5 {\n        font-size: var(--lumo-font-size-m);\n        margin-bottom: 0.25em;\n      }\n\n      h6 {\n        font-size: var(--lumo-font-size-xs);\n        margin-bottom: 0;\n        text-transform: uppercase;\n        letter-spacing: 0.03em;\n      }\n\n      p,\n      blockquote {\n        margin-top: 0.5em;\n        margin-bottom: 0.75em;\n      }\n\n      a {\n        text-decoration: none;\n      }\n\n      a:hover {\n        text-decoration: underline;\n      }\n\n      hr {\n        display: block;\n        align-self: stretch;\n        height: 1px;\n        border: 0;\n        padding: 0;\n        margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);\n        background-color: var(--lumo-contrast-10pct);\n      }\n\n      blockquote {\n        border-left: 2px solid var(--lumo-contrast-30pct);\n      }\n\n      b,\n      strong {\n        font-weight: 600;\n      }\n\n      /* RTL specific styles */\n\n      blockquote[dir="rtl"] {\n        border-left: none;\n        border-right: 2px solid var(--lumo-contrast-30pct);\n      }\n\n    </style>\n  </template>\n</dom-module>',document.head.appendChild(q.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class U{constructor(t){this.value=t.toString()}toString(){return this.value}}const V=function(t,...e){const n=document.createElement("template");return n.innerHTML=e.reduce((e,n,o)=>e+function(t){if(t instanceof HTMLTemplateElement)return t.innerHTML;if(t instanceof U)return function(t){if(t instanceof U)return t.value;throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)}(t);throw new Error(`non-template value passed to Polymer's html function: ${t}`)}(n)+t[o+1],t[0]),n},Y=V`<dom-module id="lumo-button" theme-for="vaadin-button">
  <template>
    <style>
      :host {
        /* Sizing */
        --lumo-button-size: var(--lumo-size-m);
        min-width: calc(var(--lumo-button-size) * 2);
        height: var(--lumo-button-size);
        padding: 0 calc(var(--lumo-button-size) / 3 + var(--lumo-border-radius) / 2);
        margin: var(--lumo-space-xs) 0;
        box-sizing: border-box;
        /* Style */
        font-family: var(--lumo-font-family);
        font-size: var(--lumo-font-size-m);
        font-weight: 500;
        color: var(--_lumo-button-color, var(--lumo-primary-text-color));
        background-color: var(--_lumo-button-background-color, var(--lumo-contrast-5pct));
        border-radius: var(--lumo-border-radius);
        cursor: default;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Set only for the internal parts so we don’t affect the host vertical alignment */
      [part="label"],
      [part="prefix"],
      [part="suffix"] {
        line-height: var(--lumo-line-height-xs);
      }

      [part="label"] {
        padding: calc(var(--lumo-button-size) / 6) 0;
      }

      :host([theme~="small"]) {
        font-size: var(--lumo-font-size-s);
        --lumo-button-size: var(--lumo-size-s);
      }

      :host([theme~="large"]) {
        font-size: var(--lumo-font-size-l);
        --lumo-button-size: var(--lumo-size-l);
      }

      /* This needs to be the last selector for it to take priority */
      :host([disabled][disabled]) {
        pointer-events: none;
        color: var(--lumo-disabled-text-color);
        background-color: var(--lumo-contrast-5pct);
      }

      /* For interaction states */
      :host::before,
      :host::after {
        content: "";
        /* We rely on the host always being relative */
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: currentColor;
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }

      /* Hover */

      :host(:hover)::before {
        opacity: 0.05;
      }

      /* Disable hover for touch devices */
      @media (pointer: coarse) {
        :host(:not([active]):hover)::before {
          opacity: 0;
        }
      }

      /* Active */

      :host::after {
        transition: opacity 1.4s, transform 0.1s;
        filter: blur(8px);
      }

      :host([active])::before {
        opacity: 0.1;
        transition-duration: 0s;
      }

      :host([active])::after {
        opacity: 0.1;
        transition-duration: 0s, 0s;
        transform: scale(0);
      }

      /* Keyboard focus */

      :host([focus-ring]) {
        box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
      }

      /* Types (primary, tertiary, tertiary-inline */

      :host([theme~="tertiary"]),
      :host([theme~="tertiary-inline"]) {
        background-color: transparent !important;
        transition: opacity 0.2s;
        min-width: 0;
      }

      :host([theme~="tertiary"])::before,
      :host([theme~="tertiary-inline"])::before {
        display: none;
      }

      :host([theme~="tertiary"]) {
        padding: 0 calc(var(--lumo-button-size) / 6);
      }

      @media (hover: hover) {
        :host([theme*="tertiary"]:not([active]):hover) {
          opacity: 0.8;
        }
      }

      :host([theme~="tertiary"][active]),
      :host([theme~="tertiary-inline"][active]) {
        opacity: 0.5;
        transition-duration: 0s;
      }

      :host([theme~="tertiary-inline"]) {
        margin: 0;
        height: auto;
        padding: 0;
        line-height: inherit;
        font-size: inherit;
      }

      :host([theme~="tertiary-inline"]) [part="label"] {
        padding: 0;
        overflow: visible;
        line-height: inherit;
      }

      :host([theme~="primary"]) {
        background-color: var(--_lumo-button-primary-background-color, var(--lumo-primary-color));
        color: var(--_lumo-button-primary-color, var(--lumo-primary-contrast-color));
        font-weight: 600;
        min-width: calc(var(--lumo-button-size) * 2.5);
      }

      :host([theme~="primary"][disabled]) {
        background-color: var(--lumo-primary-color-50pct);
        color: var(--lumo-primary-contrast-color);
      }

      :host([theme~="primary"]:hover)::before {
        opacity: 0.1;
      }

      :host([theme~="primary"][active])::before {
        background-color: var(--lumo-shade-20pct);
      }

      @media (pointer: coarse) {
        :host([theme~="primary"][active])::before {
          background-color: var(--lumo-shade-60pct);
        }

        :host([theme~="primary"]:not([active]):hover)::before {
          opacity: 0;
        }
      }

      :host([theme~="primary"][active])::after {
        opacity: 0.2;
      }

      /* Colors (success, error, contrast) */

      :host([theme~="success"]) {
        color: var(--lumo-success-text-color);
      }

      :host([theme~="success"][theme~="primary"]) {
        background-color: var(--lumo-success-color);
        color: var(--lumo-success-contrast-color);
      }

      :host([theme~="success"][theme~="primary"][disabled]) {
        background-color: var(--lumo-success-color-50pct);
      }

      :host([theme~="error"]) {
        color: var(--lumo-error-text-color);
      }

      :host([theme~="error"][theme~="primary"]) {
        background-color: var(--lumo-error-color);
        color: var(--lumo-error-contrast-color);
      }

      :host([theme~="error"][theme~="primary"][disabled]) {
        background-color: var(--lumo-error-color-50pct);
      }

      :host([theme~="contrast"]) {
        color: var(--lumo-contrast);
      }

      :host([theme~="contrast"][theme~="primary"]) {
        background-color: var(--lumo-contrast);
        color: var(--lumo-base-color);
      }

      :host([theme~="contrast"][theme~="primary"][disabled]) {
        background-color: var(--lumo-contrast-50pct);
      }

      /* Icons */

      [part] ::slotted(iron-icon) {
        display: inline-block;
        width: var(--lumo-icon-size-m);
        height: var(--lumo-icon-size-m);
      }

      /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
      [part] ::slotted(iron-icon[icon^="vaadin:"]) {
        padding: 0.25em;
        box-sizing: border-box !important;
      }

      [part="prefix"] {
        margin-left: -0.25em;
        margin-right: 0.25em;
      }

      [part="suffix"] {
        margin-left: 0.25em;
        margin-right: -0.25em;
      }

      /* Icon-only */

      :host([theme~="icon"]:not([theme~="tertiary-inline"])) {
        min-width: var(--lumo-button-size);
        padding-left: calc(var(--lumo-button-size) / 4);
        padding-right: calc(var(--lumo-button-size) / 4);
      }

      :host([theme~="icon"]) [part="prefix"],
      :host([theme~="icon"]) [part="suffix"] {
        margin-left: 0;
        margin-right: 0;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild(Y.content);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
let Z=0;const K=function(t){let e=t.__mixinApplications;e||(e=new WeakMap,t.__mixinApplications=e);let n=Z++;return function(o){let i=o.__mixinSet;if(i&&i[n])return o;let s=e,r=s.get(o);r||(r=t(o),s.set(o,r));let l=Object.create(r.__mixinSet||i||null);return l[n]=!0,r.__mixinSet=l,r}},W=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:window.ShadyDOM?t=>ShadyDOM.patch(t):t=>t;
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
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function G(t){return t.indexOf(".")>=0}function Q(t){let e=t.indexOf(".");return-1===e?t:t.slice(0,e)}function X(t,e){return 0===e.indexOf(t+".")}function tt(t,e,n){return e+n.slice(t.length)}function et(t){if(Array.isArray(t)){let e=[];for(let n=0;n<t.length;n++){let o=t[n].toString().split(".");for(let t=0;t<o.length;t++)e.push(o[t])}return e.join(".")}return t}function nt(t){return Array.isArray(t)?et(t).split("."):t.toString().split(".")}function ot(t,e,n){let o=t,i=nt(e);for(let s=0;s<i.length;s++){if(!o)return;o=o[i[s]]}return n&&(n.path=i.join(".")),o}function it(t,e,n){let o=t,i=nt(e),s=i[i.length-1];if(i.length>1){for(let t=0;t<i.length-1;t++)if(o=o[i[t]],!o)return;o[s]=n}else o[e]=n;return i.join(".")}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const st={},rt=/-[a-z]/g,lt=/([A-Z])/g;function at(t){return st[t]||(st[t]=t.indexOf("-")<0?t:t.replace(rt,t=>t[1].toUpperCase()))}function ct(t){return st[t]||(st[t]=t.replace(lt,"-$1").toLowerCase())}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let ut=0,ht=0,mt=[],dt=0,pt=document.createTextNode("");new window.MutationObserver((function(){const t=mt.length;for(let n=0;n<t;n++){let t=mt[n];if(t)try{t()}catch(e){setTimeout(()=>{throw e})}}mt.splice(0,t),ht+=t})).observe(pt,{characterData:!0});const ft={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},yt={run:t=>window.requestIdleCallback?window.requestIdleCallback(t):window.setTimeout(t,16),cancel(t){window.cancelIdleCallback?window.cancelIdleCallback(t):window.clearTimeout(t)}},bt={run:t=>(pt.textContent=dt++,mt.push(t),ut++),cancel(t){const e=t-ht;if(e>=0){if(!mt[e])throw new Error("invalid async handle: "+t);mt[e]=null}}},vt=bt,wt=K(t=>class extends t{static createProperties(t){const e=this.prototype;for(let n in t)n in e||e._createPropertyAccessor(n)}static attributeNameForProperty(t){return t.toLowerCase()}static typeForProperty(t){}_createPropertyAccessor(t,e){this._addPropertyToAttributeMap(t),this.hasOwnProperty(JSCompiler_renameProperty("__dataHasAccessor",this))||(this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)),this.__dataHasAccessor[t]||(this.__dataHasAccessor[t]=!0,this._definePropertyAccessor(t,e))}_addPropertyToAttributeMap(t){if(this.hasOwnProperty(JSCompiler_renameProperty("__dataAttributes",this))||(this.__dataAttributes=Object.assign({},this.__dataAttributes)),!this.__dataAttributes[t]){const e=this.constructor.attributeNameForProperty(t);this.__dataAttributes[e]=t}}_definePropertyAccessor(t,e){Object.defineProperty(this,t,{get(){return this._getProperty(t)},set:e?function(){}:function(e){this._setProperty(t,e)}})}constructor(){super(),this.__dataEnabled=!1,this.__dataReady=!1,this.__dataInvalid=!1,this.__data={},this.__dataPending=null,this.__dataOld=null,this.__dataInstanceProps=null,this.__serializing=!1,this._initializeProperties()}ready(){this.__dataReady=!0,this._flushProperties()}_initializeProperties(){for(let t in this.__dataHasAccessor)this.hasOwnProperty(t)&&(this.__dataInstanceProps=this.__dataInstanceProps||{},this.__dataInstanceProps[t]=this[t],delete this[t])}_initializeInstanceProperties(t){Object.assign(this,t)}_setProperty(t,e){this._setPendingProperty(t,e)&&this._invalidateProperties()}_getProperty(t){return this.__data[t]}_setPendingProperty(t,e,n){let o=this.__data[t],i=this._shouldPropertyChange(t,e,o);return i&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),!this.__dataOld||t in this.__dataOld||(this.__dataOld[t]=o),this.__data[t]=e,this.__dataPending[t]=e),i}_invalidateProperties(){!this.__dataInvalid&&this.__dataReady&&(this.__dataInvalid=!0,vt.run(()=>{this.__dataInvalid&&(this.__dataInvalid=!1,this._flushProperties())}))}_enableProperties(){this.__dataEnabled||(this.__dataEnabled=!0,this.__dataInstanceProps&&(this._initializeInstanceProperties(this.__dataInstanceProps),this.__dataInstanceProps=null),this.ready())}_flushProperties(){const t=this.__data,e=this.__dataPending,n=this.__dataOld;this._shouldPropertiesChange(t,e,n)&&(this.__dataPending=null,this.__dataOld=null,this._propertiesChanged(t,e,n))}_shouldPropertiesChange(t,e,n){return Boolean(e)}_propertiesChanged(t,e,n){}_shouldPropertyChange(t,e,n){return n!==e&&(n==n||e==e)}attributeChangedCallback(t,e,n,o){e!==n&&this._attributeToProperty(t,n),super.attributeChangedCallback&&super.attributeChangedCallback(t,e,n,o)}_attributeToProperty(t,e,n){if(!this.__serializing){const o=this.__dataAttributes,i=o&&o[t]||t;this[i]=this._deserializeValue(e,n||this.constructor.typeForProperty(i))}}_propertyToAttribute(t,e,n){this.__serializing=!0,this._valueToNodeAttribute(this,n=arguments.length<3?this[t]:n,e||this.constructor.attributeNameForProperty(t)),this.__serializing=!1}_valueToNodeAttribute(t,e,n){const o=this._serializeValue(e);"class"!==n&&"name"!==n&&"slot"!==n||(t=W(t)),void 0===o?t.removeAttribute(n):t.setAttribute(n,o)}_serializeValue(t){switch(typeof t){case"boolean":return t?"":void 0;default:return null!=t?t.toString():void 0}}_deserializeValue(t,e){switch(e){case Boolean:return null!==t;case Number:return Number(t);default:return t}}}),gt={};let xt=HTMLElement.prototype;for(;xt;){let t=Object.getOwnPropertyNames(xt);for(let e=0;e<t.length;e++)gt[t[e]]=!0;xt=Object.getPrototypeOf(xt)}const _t=K(t=>{const e=wt(t);return class extends e{static createPropertiesForAttributes(){let t=this.observedAttributes;for(let e=0;e<t.length;e++)this.prototype._createPropertyAccessor(at(t[e]))}static attributeNameForProperty(t){return ct(t)}_initializeProperties(){this.__dataProto&&(this._initializeProtoProperties(this.__dataProto),this.__dataProto=null),super._initializeProperties()}_initializeProtoProperties(t){for(let e in t)this._setProperty(e,t[e])}_ensureAttribute(t,e){this.hasAttribute(t)||this._valueToNodeAttribute(this,e,t)}_serializeValue(t){switch(typeof t){case"object":if(t instanceof Date)return t.toString();if(t)try{return JSON.stringify(t)}catch(e){return""}default:return super._serializeValue(t)}}_deserializeValue(t,e){let n;switch(e){case Object:try{n=JSON.parse(t)}catch(o){n=t}break;case Array:try{n=JSON.parse(t)}catch(o){n=null,console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)}break;case Date:n=isNaN(t)?String(t):Number(t),n=new Date(n);break;default:n=super._deserializeValue(t,e)}return n}_definePropertyAccessor(t,e){!function(t,e){if(!gt[e]){let n=t[e];void 0!==n&&(t.__data?t._setPendingProperty(e,n):(t.__dataProto?t.hasOwnProperty(JSCompiler_renameProperty("__dataProto",t))||(t.__dataProto=Object.create(t.__dataProto)):t.__dataProto={},t.__dataProto[e]=n))}}(this,t),super._definePropertyAccessor(t,e)}_hasAccessor(t){return this.__dataHasAccessor&&this.__dataHasAccessor[t]}_isPropertyPending(t){return Boolean(this.__dataPending&&t in this.__dataPending)}}}),kt={"dom-if":!0,"dom-repeat":!0};
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let zt=!1,Pt=!1;function Ct(t){let e=t.getAttribute("is");if(e&&kt[e]){let n=t;for(n.removeAttribute("is"),t=n.ownerDocument.createElement(e),n.parentNode.replaceChild(t,n),t.appendChild(n);n.attributes.length;)t.setAttribute(n.attributes[0].name,n.attributes[0].value),n.removeAttribute(n.attributes[0].name)}return t}function Tt(t,e){let n=e.parentInfo&&Tt(t,e.parentInfo);if(!n)return t;for(let o=n.firstChild,i=0;o;o=o.nextSibling)if(e.parentIndex===i++)return o}function Et(t,e,n,o){o.id&&(e[o.id]=n)}function St(t,e,n){if(n.events&&n.events.length)for(let o,i=0,s=n.events;i<s.length&&(o=s[i]);i++)t._addMethodEventListenerToNode(e,o.name,o.value,t)}function Nt(t,e,n){n.templateInfo&&(e._templateInfo=n.templateInfo)}const Ot=K(t=>class extends t{static _parseTemplate(t,e){if(!t._templateInfo){let n=t._templateInfo={};n.nodeInfoList=[],n.stripWhiteSpace=e&&e.stripWhiteSpace||t.hasAttribute("strip-whitespace"),this._parseTemplateContent(t,n,{parent:null})}return t._templateInfo}static _parseTemplateContent(t,e,n){return this._parseTemplateNode(t.content,e,n)}static _parseTemplateNode(t,e,n){let o=!1,i=t;return"template"!=i.localName||i.hasAttribute("preserve-content")?"slot"===i.localName&&(e.hasInsertionPoint=!0):o=this._parseTemplateNestedTemplate(i,e,n)||o,function(t){(function(){if(!zt){zt=!0;const t=document.createElement("textarea");t.placeholder="a",Pt=t.placeholder===t.textContent}return Pt})()&&"textarea"===t.localName&&t.placeholder&&t.placeholder===t.textContent&&(t.textContent=null)}(i),i.firstChild&&this._parseTemplateChildNodes(i,e,n),i.hasAttributes&&i.hasAttributes()&&(o=this._parseTemplateNodeAttributes(i,e,n)||o),o}static _parseTemplateChildNodes(t,e,n){if("script"!==t.localName&&"style"!==t.localName)for(let o,i=t.firstChild,s=0;i;i=o){if("template"==i.localName&&(i=Ct(i)),o=i.nextSibling,i.nodeType===Node.TEXT_NODE){let n=o;for(;n&&n.nodeType===Node.TEXT_NODE;)i.textContent+=n.textContent,o=n.nextSibling,t.removeChild(n),n=o;if(e.stripWhiteSpace&&!i.textContent.trim()){t.removeChild(i);continue}}let r={parentIndex:s,parentInfo:n};this._parseTemplateNode(i,e,r)&&(r.infoIndex=e.nodeInfoList.push(r)-1),i.parentNode&&s++}}static _parseTemplateNestedTemplate(t,e,n){let o=t,i=this._parseTemplate(o,e);return(i.content=o.content.ownerDocument.createDocumentFragment()).appendChild(o.content),n.templateInfo=i,!0}static _parseTemplateNodeAttributes(t,e,n){let o=!1,i=Array.from(t.attributes);for(let s,r=i.length-1;s=i[r];r--)o=this._parseTemplateNodeAttribute(t,e,n,s.name,s.value)||o;return o}static _parseTemplateNodeAttribute(t,e,n,o,i){return"on-"===o.slice(0,3)?(t.removeAttribute(o),n.events=n.events||[],n.events.push({name:o.slice(3),value:i}),!0):"id"===o&&(n.id=i,!0)}static _contentForTemplate(t){let e=t._templateInfo;return e&&e.content||t.content}_stampTemplate(t){t&&!t.content&&window.HTMLTemplateElement&&HTMLTemplateElement.decorate&&HTMLTemplateElement.decorate(t);let e=this.constructor._parseTemplate(t),n=e.nodeInfoList,o=document.importNode(e.content||t.content,!0);o.__noInsertionPoint=!e.hasInsertionPoint;let i=o.nodeList=new Array(n.length);o.$={};for(let s,r=0,l=n.length;r<l&&(s=n[r]);r++){let t=i[r]=Tt(o,s);Et(0,o.$,t,s),Nt(0,t,s),St(this,t,s)}return o=o,o}_addMethodEventListenerToNode(t,e,n,o){let i=function(t,e,n){return t=t._methodHost||t,function(e){t[n]?t[n](e,e.detail):console.warn("listener method `"+n+"` not defined")}}(o=o||t,0,n);return this._addEventListenerToNode(t,e,i),i}_addEventListenerToNode(t,e,n){t.addEventListener(e,n)}_removeEventListenerFromNode(t,e,n){t.removeEventListener(e,n)}});
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
 */let At=0;const Ft={COMPUTE:"__computeEffects",REFLECT:"__reflectEffects",NOTIFY:"__notifyEffects",PROPAGATE:"__propagateEffects",OBSERVE:"__observeEffects",READ_ONLY:"__readOnly"},Mt=/[A-Z]/;function jt(t,e){let n=t[e];if(n){if(!t.hasOwnProperty(e)){n=t[e]=Object.create(t[e]);for(let t in n){let e=n[t],o=n[t]=Array(e.length);for(let t=0;t<e.length;t++)o[t]=e[t]}}}else n=t[e]={};return n}function Lt(t,e,n,o,i,s){if(e){let r=!1,l=At++;for(let a in n)Bt(t,e,l,a,n,o,i,s)&&(r=!0);return r}return!1}function Bt(t,e,n,o,i,s,r,l){let a=!1,c=e[r?Q(o):o];if(c)for(let u,h=0,m=c.length;h<m&&(u=c[h]);h++)u.info&&u.info.lastRun===n||r&&!Ht(o,u.trigger)||(u.info&&(u.info.lastRun=n),u.fn(t,o,i,s,u.info,r,l),a=!0);return a}function Ht(t,e){if(e){let n=e.name;return n==t||!(!e.structured||!function(t,e){return 0===t.indexOf(e+".")}(n,t))||!(!e.wildcard||!X(n,t))}return!0}function Rt(t,e,n,o,i){let s="string"==typeof i.method?t[i.method]:i.method,r=i.property;s?s.call(t,t.__data[r],o[r]):i.dynamicFn||console.warn("observer method `"+i.method+"` not defined")}function $t(t,e,n){let o=Q(e);return o!==e&&(Dt(t,ct(o)+"-changed",n[e],e),!0)}function Dt(t,e,n,o){let i={value:n,queueProperty:!0};o&&(i.path=o),W(t).dispatchEvent(new CustomEvent(e,{detail:i}))}function Jt(t,e,n,o,i,s){let r=(s?Q(e):e)!=e?e:null,l=r?ot(t,r):t.__data[e];r&&void 0===l&&(l=n[e]),Dt(t,i.eventName,l,r)}function It(t,e,n,o,i){let s=t.__data[e];T&&(s=T(s,i.attrName,"attribute",t)),t._propertyToAttribute(e,i.attrName,s)}function qt(t,e,n,o,i){let s=Gt(t,e,n,0,i),r=i.methodInfo;t.__dataHasAccessor&&t.__dataHasAccessor[r]?t._setPendingProperty(r,s,!0):t[r]=s}function Ut(t,e,n,o,i,s,r){n.bindings=n.bindings||[];let l={kind:o,target:i,parts:s,literal:r,isCompound:1!==s.length};if(n.bindings.push(l),function(t){return Boolean(t.target)&&"attribute"!=t.kind&&"text"!=t.kind&&!t.isCompound&&"{"===t.parts[0].mode}(l)){let{event:t,negate:e}=l.parts[0];l.listenerEvent=t||ct(i)+"-changed",l.listenerNegate=e}let a=e.nodeInfoList.length;for(let c=0;c<l.parts.length;c++){let n=l.parts[c];n.compoundIndex=c,Vt(t,e,l,n,a)}}function Vt(t,e,n,o,i){if(!o.literal)if("attribute"===n.kind&&"-"===n.target[0])console.warn("Cannot set attribute "+n.target+' because "-" is not a valid attribute starting character');else{let s=o.dependencies,r={index:i,binding:n,part:o,evaluator:t};for(let n=0;n<s.length;n++){let o=s[n];"string"==typeof o&&(o=ne(o),o.wildcard=!0),t._addTemplatePropertyEffect(e,o.rootProperty,{fn:Yt,info:r,trigger:o})}}}function Yt(t,e,n,o,i,s,r){let l=r[i.index],a=i.binding,c=i.part;if(s&&c.source&&e.length>c.source.length&&"property"==a.kind&&!a.isCompound&&l.__isPropertyEffectsClient&&l.__dataHasAccessor&&l.__dataHasAccessor[a.target]){let o=n[e];e=tt(c.source,a.target,e),l._setPendingPropertyOrPath(e,o,!1,!0)&&t._enqueueClient(l)}else!function(t,e,n,o,i){if(i=function(t,e,n,o){if(n.isCompound){let i=t.__dataCompoundStorage[n.target];i[o.compoundIndex]=e,e=i.join("")}return"attribute"!==n.kind&&("textContent"!==n.target&&("value"!==n.target||"input"!==t.localName&&"textarea"!==t.localName)||(e=null==e?"":e)),e}(e,i,n,o),T&&(i=T(i,n.target,n.kind,e)),"attribute"==n.kind)t._valueToNodeAttribute(e,i,n.target);else{let o=n.target;e.__isPropertyEffectsClient&&e.__dataHasAccessor&&e.__dataHasAccessor[o]?e[Ft.READ_ONLY]&&e[Ft.READ_ONLY][o]||e._setPendingProperty(o,i)&&t._enqueueClient(e):t._setUnmanagedPropertyToNode(e,o,i)}}(t,l,a,c,i.evaluator._evaluateBinding(t,c,e,n,o,s))}function Zt(t,e){if(e.isCompound){let n=t.__dataCompoundStorage||(t.__dataCompoundStorage={}),o=e.parts,i=new Array(o.length);for(let t=0;t<o.length;t++)i[t]=o[t].literal;let s=e.target;n[s]=i,e.literal&&"property"==e.kind&&("className"===s&&(t=W(t)),t[s]=e.literal)}}function Kt(t,e,n){if(n.listenerEvent){let o=n.parts[0];t.addEventListener(n.listenerEvent,(function(t){!function(t,e,n,o,i){let s,r=t.detail,l=r&&r.path;l?(o=tt(n,o,l),s=r&&r.value):s=t.currentTarget[n],s=i?!s:s,e[Ft.READ_ONLY]&&e[Ft.READ_ONLY][o]||!e._setPendingPropertyOrPath(o,s,!0,Boolean(l))||r&&r.queueProperty||e._invalidateProperties()}(t,e,n.target,o.source,o.negate)}))}}function Wt(t,e,n,o,i,s){let r={methodName:e.methodName,args:e.args,methodInfo:i,dynamicFn:s=e.static||s&&("object"!=typeof s||s[e.methodName])};for(let l,a=0;a<e.args.length&&(l=e.args[a]);a++)l.literal||t._addPropertyEffect(l.rootProperty,n,{fn:o,info:r,trigger:l});s&&t._addPropertyEffect(e.methodName,n,{fn:o,info:r})}function Gt(t,e,n,o,i){let s=t._methodHost||t,r=s[i.methodName];if(r){let o=t._marshalArgs(i.args,e,n);return r.apply(s,o)}i.dynamicFn||console.warn("method `"+i.methodName+"` not defined")}const Qt=[],Xt=new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*)(?:,\\s*(?:((?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\")))\\s*))*)?)\\)\\s*)?)(?:]]|}})","g");function te(t){let e="";for(let n=0;n<t.length;n++)e+=t[n].literal||"";return e}function ee(t){let e=t.match(/([^\s]+?)\(([\s\S]*)\)/);if(e){let t={methodName:e[1],static:!0,args:Qt};return e[2].trim()?function(t,e){return e.args=t.map((function(t){let n=ne(t);return n.literal||(e.static=!1),n}),this),e}(e[2].replace(/\\,/g,"&comma;").split(","),t):t}return null}function ne(t){let e=t.trim().replace(/&comma;/g,",").replace(/\\(.)/g,"$1"),n={name:e,value:"",literal:!1},o=e[0];switch("-"===o&&(o=e[1]),o>="0"&&o<="9"&&(o="#"),o){case"'":case'"':n.value=e.slice(1,-1),n.literal=!0;break;case"#":n.value=Number(e),n.literal=!0}return n.literal||(n.rootProperty=Q(e),n.structured=G(e),n.structured&&(n.wildcard=".*"==e.slice(-2),n.wildcard&&(n.name=e.slice(0,-2)))),n}function oe(t,e,n){let o=ot(t,n);return void 0===o&&(o=e[n]),o}function ie(t,e,n,o){t.notifyPath(n+".splices",{indexSplices:o}),t.notifyPath(n+".length",e.length)}function se(t,e,n,o,i,s){ie(t,e,n,[{index:o,addedCount:i,removed:s,object:e,type:"splice"}])}const re=K(t=>{const e=Ot(_t(t));return class extends e{constructor(){super(),this.__isPropertyEffectsClient=!0,this.__dataCounter=0}get PROPERTY_EFFECT_TYPES(){return Ft}_initializeProperties(){super._initializeProperties(),le.registerHost(this),this.__dataClientsReady=!1,this.__dataPendingClients=null,this.__dataToNotify=null,this.__dataLinkedPaths=null,this.__dataHasPaths=!1,this.__dataCompoundStorage=this.__dataCompoundStorage||null,this.__dataHost=this.__dataHost||null,this.__dataTemp={},this.__dataClientsInitialized=!1}_initializeProtoProperties(t){this.__data=Object.create(t),this.__dataPending=Object.create(t),this.__dataOld={}}_initializeInstanceProperties(t){let e=this[Ft.READ_ONLY];for(let n in t)e&&e[n]||(this.__dataPending=this.__dataPending||{},this.__dataOld=this.__dataOld||{},this.__data[n]=this.__dataPending[n]=t[n])}_addPropertyEffect(t,e,n){this._createPropertyAccessor(t,e==Ft.READ_ONLY);let o=jt(this,e)[t];o||(o=this[e][t]=[]),o.push(n)}_removePropertyEffect(t,e,n){let o=jt(this,e)[t],i=o.indexOf(n);i>=0&&o.splice(i,1)}_hasPropertyEffect(t,e){let n=this[e];return Boolean(n&&n[t])}_hasReadOnlyEffect(t){return this._hasPropertyEffect(t,Ft.READ_ONLY)}_hasNotifyEffect(t){return this._hasPropertyEffect(t,Ft.NOTIFY)}_hasReflectEffect(t){return this._hasPropertyEffect(t,Ft.REFLECT)}_hasComputedEffect(t){return this._hasPropertyEffect(t,Ft.COMPUTE)}_setPendingPropertyOrPath(t,e,n,o){if(o||Q(Array.isArray(t)?t[0]:t)!==t){if(!o){let n=ot(this,t);if(!(t=it(this,t,e))||!super._shouldPropertyChange(t,e,n))return!1}if(this.__dataHasPaths=!0,this._setPendingProperty(t,e,n))return function(t,e,n){let o=t.__dataLinkedPaths;if(o){let i;for(let s in o){let r=o[s];X(s,e)?(i=tt(s,r,e),t._setPendingPropertyOrPath(i,n,!0,!0)):X(r,e)&&(i=tt(r,s,e),t._setPendingPropertyOrPath(i,n,!0,!0))}}}(this,t,e),!0}else{if(this.__dataHasAccessor&&this.__dataHasAccessor[t])return this._setPendingProperty(t,e,n);this[t]=e}return!1}_setUnmanagedPropertyToNode(t,e,n){n===t[e]&&"object"!=typeof n||("className"===e&&(t=W(t)),t[e]=n)}_setPendingProperty(t,e,n){let o=this.__dataHasPaths&&G(t);return!!this._shouldPropertyChange(t,e,(o?this.__dataTemp:this.__data)[t])&&(this.__dataPending||(this.__dataPending={},this.__dataOld={}),t in this.__dataOld||(this.__dataOld[t]=this.__data[t]),o?this.__dataTemp[t]=e:this.__data[t]=e,this.__dataPending[t]=e,(o||this[Ft.NOTIFY]&&this[Ft.NOTIFY][t])&&(this.__dataToNotify=this.__dataToNotify||{},this.__dataToNotify[t]=n),!0)}_setProperty(t,e){this._setPendingProperty(t,e,!0)&&this._invalidateProperties()}_invalidateProperties(){this.__dataReady&&this._flushProperties()}_enqueueClient(t){this.__dataPendingClients=this.__dataPendingClients||[],t!==this&&this.__dataPendingClients.push(t)}_flushProperties(){this.__dataCounter++,super._flushProperties(),this.__dataCounter--}_flushClients(){this.__dataClientsReady?this.__enableOrFlushClients():(this.__dataClientsReady=!0,this._readyClients(),this.__dataReady=!0)}__enableOrFlushClients(){let t=this.__dataPendingClients;if(t){this.__dataPendingClients=null;for(let e=0;e<t.length;e++){let n=t[e];n.__dataEnabled?n.__dataPending&&n._flushProperties():n._enableProperties()}}}_readyClients(){this.__enableOrFlushClients()}setProperties(t,e){for(let n in t)!e&&this[Ft.READ_ONLY]&&this[Ft.READ_ONLY][n]||this._setPendingPropertyOrPath(n,t[n],!0);this._invalidateProperties()}ready(){this._flushProperties(),this.__dataClientsReady||this._flushClients(),this.__dataPending&&this._flushProperties()}_propertiesChanged(t,e,n){let o=this.__dataHasPaths;this.__dataHasPaths=!1,function(t,e,n,o){let i=t[Ft.COMPUTE];if(i){let s=e;for(;Lt(t,i,s,n,o);)Object.assign(n,t.__dataOld),Object.assign(e,t.__dataPending),s=t.__dataPending,t.__dataPending=null}}(this,e,n,o);let i=this.__dataToNotify;this.__dataToNotify=null,this._propagatePropertyChanges(e,n,o),this._flushClients(),Lt(this,this[Ft.REFLECT],e,n,o),Lt(this,this[Ft.OBSERVE],e,n,o),i&&function(t,e,n,o,i){let s,r,l=t[Ft.NOTIFY],a=At++;for(let c in e)e[c]&&(l&&Bt(t,l,a,c,n,o,i)?s=!0:i&&$t(t,c,n)&&(s=!0));s&&(r=t.__dataHost)&&r._invalidateProperties&&r._invalidateProperties()}(this,i,e,n,o),1==this.__dataCounter&&(this.__dataTemp={})}_propagatePropertyChanges(t,e,n){this[Ft.PROPAGATE]&&Lt(this,this[Ft.PROPAGATE],t,e,n);let o=this.__templateInfo;for(;o;)Lt(this,o.propertyEffects,t,e,n,o.nodeList),o=o.nextTemplateInfo}linkPaths(t,e){t=et(t),e=et(e),this.__dataLinkedPaths=this.__dataLinkedPaths||{},this.__dataLinkedPaths[t]=e}unlinkPaths(t){t=et(t),this.__dataLinkedPaths&&delete this.__dataLinkedPaths[t]}notifySplices(t,e){let n={path:""};ie(this,ot(this,t,n),n.path,e)}get(t,e){return ot(e||this,t)}set(t,e,n){n?it(n,t,e):this[Ft.READ_ONLY]&&this[Ft.READ_ONLY][t]||this._setPendingPropertyOrPath(t,e,!0)&&this._invalidateProperties()}push(t,...e){let n={path:""},o=ot(this,t,n),i=o.length,s=o.push(...e);return e.length&&se(this,o,n.path,i,e.length,[]),s}pop(t){let e={path:""},n=ot(this,t,e),o=Boolean(n.length),i=n.pop();return o&&se(this,n,e.path,n.length,0,[i]),i}splice(t,e,n,...o){let i,s={path:""},r=ot(this,t,s);return e<0?e=r.length-Math.floor(-e):e&&(e=Math.floor(e)),i=2===arguments.length?r.splice(e):r.splice(e,n,...o),(o.length||i.length)&&se(this,r,s.path,e,o.length,i),i}shift(t){let e={path:""},n=ot(this,t,e),o=Boolean(n.length),i=n.shift();return o&&se(this,n,e.path,0,0,[i]),i}unshift(t,...e){let n={path:""},o=ot(this,t,n),i=o.unshift(...e);return e.length&&se(this,o,n.path,0,e.length,[]),i}notifyPath(t,e){let n;if(1==arguments.length){let o={path:""};e=ot(this,t,o),n=o.path}else n=Array.isArray(t)?et(t):t;this._setPendingPropertyOrPath(n,e,!0,!0)&&this._invalidateProperties()}_createReadOnlyProperty(t,e){var n;this._addPropertyEffect(t,Ft.READ_ONLY),e&&(this["_set"+(n=t,n[0].toUpperCase()+n.substring(1))]=function(e){this._setProperty(t,e)})}_createPropertyObserver(t,e,n){let o={property:t,method:e,dynamicFn:Boolean(n)};this._addPropertyEffect(t,Ft.OBSERVE,{fn:Rt,info:o,trigger:{name:t}}),n&&this._addPropertyEffect(e,Ft.OBSERVE,{fn:Rt,info:o,trigger:{name:e}})}_createMethodObserver(t,e){let n=ee(t);if(!n)throw new Error("Malformed observer expression '"+t+"'");Wt(this,n,Ft.OBSERVE,Gt,null,e)}_createNotifyingProperty(t){this._addPropertyEffect(t,Ft.NOTIFY,{fn:Jt,info:{eventName:ct(t)+"-changed",property:t}})}_createReflectedProperty(t){let e=this.constructor.attributeNameForProperty(t);"-"===e[0]?console.warn("Property "+t+" cannot be reflected to attribute "+e+' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.'):this._addPropertyEffect(t,Ft.REFLECT,{fn:It,info:{attrName:e}})}_createComputedProperty(t,e,n){let o=ee(e);if(!o)throw new Error("Malformed computed expression '"+e+"'");Wt(this,o,Ft.COMPUTE,qt,t,n)}_marshalArgs(t,e,n){const o=this.__data,i=[];for(let s=0,r=t.length;s<r;s++){let{name:r,structured:l,wildcard:a,value:c,literal:u}=t[s];if(!u)if(a){const t=X(r,e),i=oe(o,n,t?e:r);c={path:t?e:r,value:i,base:t?ot(o,r):i}}else c=l?oe(o,n,r):o[r];i[s]=c}return i}static addPropertyEffect(t,e,n){this.prototype._addPropertyEffect(t,e,n)}static createPropertyObserver(t,e,n){this.prototype._createPropertyObserver(t,e,n)}static createMethodObserver(t,e){this.prototype._createMethodObserver(t,e)}static createNotifyingProperty(t){this.prototype._createNotifyingProperty(t)}static createReadOnlyProperty(t,e){this.prototype._createReadOnlyProperty(t,e)}static createReflectedProperty(t){this.prototype._createReflectedProperty(t)}static createComputedProperty(t,e,n){this.prototype._createComputedProperty(t,e,n)}static bindTemplate(t){return this.prototype._bindTemplate(t)}_bindTemplate(t,e){let n=this.constructor._parseTemplate(t),o=this.__templateInfo==n;if(!o)for(let i in n.propertyEffects)this._createPropertyAccessor(i);if(e&&(n=Object.create(n),n.wasPreBound=o,!o&&this.__templateInfo)){let t=this.__templateInfoLast||this.__templateInfo;return this.__templateInfoLast=t.nextTemplateInfo=n,n.previousTemplateInfo=t,n}return this.__templateInfo=n}static _addTemplatePropertyEffect(t,e,n){(t.hostProps=t.hostProps||{})[e]=!0;let o=t.propertyEffects=t.propertyEffects||{};(o[e]=o[e]||[]).push(n)}_stampTemplate(t){le.beginHosting(this);let e=super._stampTemplate(t);le.endHosting(this);let n=this._bindTemplate(t,!0);if(n.nodeList=e.nodeList,!n.wasPreBound){let t=n.childNodes=[];for(let n=e.firstChild;n;n=n.nextSibling)t.push(n)}return e.templateInfo=n,function(t,e){let{nodeList:n,nodeInfoList:o}=e;if(o.length)for(let i=0;i<o.length;i++){let e=n[i],s=o[i].bindings;if(s)for(let n=0;n<s.length;n++){let o=s[n];Zt(e,o),Kt(e,t,o)}e.__dataHost=t}}(this,n),this.__dataReady&&Lt(this,n.propertyEffects,this.__data,null,!1,n.nodeList),e}_removeBoundDom(t){let e=t.templateInfo;e.previousTemplateInfo&&(e.previousTemplateInfo.nextTemplateInfo=e.nextTemplateInfo),e.nextTemplateInfo&&(e.nextTemplateInfo.previousTemplateInfo=e.previousTemplateInfo),this.__templateInfoLast==e&&(this.__templateInfoLast=e.previousTemplateInfo),e.previousTemplateInfo=e.nextTemplateInfo=null;let n=e.childNodes;for(let o=0;o<n.length;o++){let t=n[o];t.parentNode.removeChild(t)}}static _parseTemplateNode(t,n,o){let i=e._parseTemplateNode.call(this,t,n,o);if(t.nodeType===Node.TEXT_NODE){let e=this._parseBindings(t.textContent,n);e&&(t.textContent=te(e)||" ",Ut(this,n,o,"text","textContent",e),i=!0)}return i}static _parseTemplateNodeAttribute(t,n,o,i,s){let r=this._parseBindings(s,n);if(r){let e=i,s="property";Mt.test(i)?s="attribute":"$"==i[i.length-1]&&(i=i.slice(0,-1),s="attribute");let l=te(r);return l&&"attribute"==s&&("class"==i&&t.hasAttribute("class")&&(l+=" "+t.getAttribute(i)),t.setAttribute(i,l)),"input"===t.localName&&"value"===e&&t.setAttribute(e,""),t.removeAttribute(e),"property"===s&&(i=at(i)),Ut(this,n,o,s,i,r,l),!0}return e._parseTemplateNodeAttribute.call(this,t,n,o,i,s)}static _parseTemplateNestedTemplate(t,n,o){let i=e._parseTemplateNestedTemplate.call(this,t,n,o),s=o.templateInfo.hostProps;for(let e in s)Ut(this,n,o,"property","_host_"+e,[{mode:"{",source:e,dependencies:[e]}]);return i}static _parseBindings(t,e){let n,o=[],i=0;for(;null!==(n=Xt.exec(t));){n.index>i&&o.push({literal:t.slice(i,n.index)});let s=n[1][0],r=Boolean(n[2]),l=n[3].trim(),a=!1,c="",u=-1;"{"==s&&(u=l.indexOf("::"))>0&&(c=l.substring(u+2),l=l.substring(0,u),a=!0);let h=ee(l),m=[];if(h){let{args:t,methodName:n}=h;for(let e=0;e<t.length;e++){let n=t[e];n.literal||m.push(n)}let o=e.dynamicFns;(o&&o[n]||h.static)&&(m.push(n),h.dynamicFn=!0)}else m.push(l);o.push({source:l,mode:s,negate:r,customEvent:a,signature:h,dependencies:m,event:c}),i=Xt.lastIndex}if(i&&i<t.length){let e=t.substring(i);e&&o.push({literal:e})}return o.length?o:null}static _evaluateBinding(t,e,n,o,i,s){let r;return r=e.signature?Gt(t,n,o,0,e.signature):n!=e.source?ot(t,e.source):s&&G(n)?ot(t,n):t.__data[n],e.negate&&(r=!r),r}}}),le=new class{constructor(){this.stack=[]}registerHost(t){this.stack.length&&this.stack[this.stack.length-1]._enqueueClient(t)}beginHosting(t){this.stack.push(t)}endHosting(t){let e=this.stack.length;e&&this.stack[e-1]==t&&this.stack.pop()}},ae=K(t=>{const e=wt(t);function n(t){const e=Object.getPrototypeOf(t);return e.prototype instanceof i?e:null}function o(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",t))){let e=null;if(t.hasOwnProperty(JSCompiler_renameProperty("properties",t))){const n=t.properties;n&&(e=
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
function(t){const e={};for(let n in t){const o=t[n];e[n]="function"==typeof o?{type:o}:o}return e}(n))}t.__ownProperties=e}return t.__ownProperties}class i extends e{static get observedAttributes(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__observedAttributes",this))){const t=this._properties;this.__observedAttributes=t?Object.keys(t).map(t=>this.attributeNameForProperty(t)):[]}return this.__observedAttributes}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const t=n(this);t&&t.finalize(),this.__finalized=!0,this._finalizeClass()}}static _finalizeClass(){const t=o(this);t&&this.createProperties(t)}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const t=n(this);this.__properties=Object.assign({},t&&t._properties,o(this))}return this.__properties}static typeForProperty(t){const e=this._properties[t];return e&&e.type}_initializeProperties(){this.constructor.finalize(),super._initializeProperties()}connectedCallback(){super.connectedCallback&&super.connectedCallback(),this._enableProperties()}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback()}}return i}),ce=window.ShadyCSS&&window.ShadyCSS.cssBuild,ue=K(t=>{const e=ae(re(t));function n(t,e,n,o){n.computed&&(n.readOnly=!0),n.computed&&(t._hasReadOnlyEffect(e)?console.warn(`Cannot redefine computed property '${e}'.`):t._createComputedProperty(e,n.computed,o)),n.readOnly&&!t._hasReadOnlyEffect(e)?t._createReadOnlyProperty(e,!n.computed):!1===n.readOnly&&t._hasReadOnlyEffect(e)&&console.warn(`Cannot make readOnly property '${e}' non-readOnly.`),n.reflectToAttribute&&!t._hasReflectEffect(e)?t._createReflectedProperty(e):!1===n.reflectToAttribute&&t._hasReflectEffect(e)&&console.warn(`Cannot make reflected property '${e}' non-reflected.`),n.notify&&!t._hasNotifyEffect(e)?t._createNotifyingProperty(e):!1===n.notify&&t._hasNotifyEffect(e)&&console.warn(`Cannot make notify property '${e}' non-notify.`),n.observer&&t._createPropertyObserver(e,n.observer,o[n.observer]),t._addPropertyToAttributeMap(e)}return class extends e{static get polymerElementVersion(){return"3.3.1"}static _finalizeClass(){e._finalizeClass.call(this);const t=((n=this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers",n))||(n.__ownObservers=n.hasOwnProperty(JSCompiler_renameProperty("observers",n))?n.observers:null),n.__ownObservers);var n;t&&this.createObservers(t,this._properties),this._prepareTemplate()}static _prepareTemplate(){let t=this.template;t&&("string"==typeof t?(console.error("template getter must return HTMLTemplateElement"),t=null):t=t.cloneNode(!0)),this.prototype._template=t}static createProperties(t){for(let e in t)n(this.prototype,e,t[e],t)}static createObservers(t,e){const n=this.prototype;for(let o=0;o<t.length;o++)n._createMethodObserver(t[o],e)}static get template(){return this.hasOwnProperty(JSCompiler_renameProperty("_template",this))||(this._template=this.prototype.hasOwnProperty(JSCompiler_renameProperty("_template",this.prototype))?this.prototype._template:function(t){let e=null;return t&&(e=N.import(t,"template")),e}(this.is)||Object.getPrototypeOf(this.prototype).constructor.template),this._template}static set template(t){this._template=t}static get importPath(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_importPath",this))){const t=this.importMeta;if(t)this._importPath=P(t.url);else{const t=N.import(this.is);this._importPath=t&&t.assetpath||Object.getPrototypeOf(this.prototype).constructor.importPath}}return this._importPath}constructor(){super()}_initializeProperties(){this.constructor.finalize(),this.constructor._finalizeTemplate(this.localName),super._initializeProperties(),this.rootPath=C,this.importPath=this.constructor.importPath;let t=function(t){if(!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults",t))){t.__propertyDefaults=null;let e=t._properties;for(let n in e){let o=e[n];"value"in o&&(t.__propertyDefaults=t.__propertyDefaults||{},t.__propertyDefaults[n]=o)}}return t.__propertyDefaults}(this.constructor);if(t)for(let e in t){let n=t[e];if(!this.hasOwnProperty(e)){let t="function"==typeof n.value?n.value.call(this):n.value;this._hasAccessor(e)?this._setPendingProperty(e,t,!0):this[e]=t}}}static _processStyleText(t,e){return z(t,e)}static _finalizeTemplate(t){const e=this.prototype._template;if(e&&!e.__polymerFinalized){e.__polymerFinalized=!0;const n=this.importPath;(function(t,e,n,o){if(!ce){const i=e.content.querySelectorAll("style"),s=j(e),r=function(t){let e=O(t);return e?L(e):[]}(n),l=e.content.firstElementChild;for(let n=0;n<r.length;n++){let i=r[n];i.textContent=t._processStyleText(i.textContent,o),e.content.insertBefore(i,l)}let a=0;for(let e=0;e<s.length;e++){let n=s[e],r=i[a];r!==n?(n=n.cloneNode(!0),r.parentNode.insertBefore(n,r)):a++,n.textContent=t._processStyleText(n.textContent,o)}}window.ShadyCSS&&window.ShadyCSS.prepareTemplate(e,n)})(this,e,t,n?k(n):""),this.prototype._bindTemplate(e)}}connectedCallback(){window.ShadyCSS&&this._template&&window.ShadyCSS.styleElement(this),super.connectedCallback()}ready(){this._template&&(this.root=this._stampTemplate(this._template),this.$=this.root.$),super.ready()}_readyClients(){this._template&&(this.root=this._attachDom(this.root)),super._readyClients()}_attachDom(t){const e=W(this);if(e.attachShadow)return t?(e.shadowRoot||(e.attachShadow({mode:"open",shadyUpgradeFragment:t}),e.shadowRoot.appendChild(t)),e.shadowRoot):null;throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")}updateStyles(t){window.ShadyCSS&&window.ShadyCSS.styleSubtree(this,t)}resolveUrl(t,e){return!e&&this.importPath&&(e=k(this.importPath)),k(t,e)}static _parseTemplateContent(t,n,o){return n.dynamicFns=n.dynamicFns||this._properties,e._parseTemplateContent.call(this,t,n,o)}static _addTemplatePropertyEffect(t,n,o){return e._addTemplatePropertyEffect.call(this,t,n,o)}}})(HTMLElement);
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
class he{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,me.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),me.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,n){return t instanceof he?t._cancelAsync():t=new he,t.setConfig(e,n),t}}let me=new Set,de="string"==typeof document.head.style.touchAction,pe="__polymerGesturesHandled",fe="__polymerGesturesTouchAction",ye=["mousedown","mousemove","mouseup","click"],be=[0,1,4,2],ve=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function we(t){return ye.indexOf(t)>-1}let ge=!1;function xe(t){we(t)}!function(){try{let t=Object.defineProperty({},"passive",{get(){ge=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let _e=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const ke=[],ze={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},Pe={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Ce(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let n=t.getRootNode();if(t.id){let o=n.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<o.length;t++)e.push(o[t])}}return e}let Te=function(t){let e=t.sourceCapabilities;if((!e||e.firesTouchEvents)&&(t[pe]={skip:!0},"click"===t.type)){let e=!1,n=Fe(t);for(let t=0;t<n.length;t++){if(n[t].nodeType===Node.ELEMENT_NODE)if("label"===n[t].localName)ke.push(n[t]);else if(ze[n[t].localName]){let o=Ce(n[t]);for(let t=0;t<o.length;t++)e=e||ke.indexOf(o[t])>-1}if(n[t]===Ne.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function Ee(t){let e=_e?["click"]:ye;for(let n,o=0;o<e.length;o++)n=e[o],t?(ke.length=0,document.addEventListener(n,Te,!0)):document.removeEventListener(n,Te,!0)}function Se(t){let e=t.type;if(!we(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!ve&&(e=be[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let Ne={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Oe(t,e,n){t.movefn=e,t.upfn=n,document.addEventListener("mousemove",e),document.addEventListener("mouseup",n)}function Ae(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",(function(t){Ne.mouse.mouseIgnoreJob||Ee(!0),Ne.mouse.target=Fe(t)[0],Ne.mouse.mouseIgnoreJob=he.debounce(Ne.mouse.mouseIgnoreJob,ft.after(2500),(function(){Ee(),Ne.mouse.target=null,Ne.mouse.mouseIgnoreJob=null}))}),!!ge&&{passive:!0});const Fe=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],Me={},je=[];function Le(t){const e=Fe(t);return e.length>0?e[0]:t.target}function Be(t){let e,n=t.type,o=t.currentTarget.__polymerGestures;if(!o)return;let i=o[n];if(i){if(!t[pe]&&(t[pe]={},"touch"===n.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===n&&1===t.touches.length&&(Ne.touch.id=e.identifier),Ne.touch.id!==e.identifier)return;de||"touchstart"!==n&&"touchmove"!==n||function(t){let e=t.changedTouches[0],n=t.type;if("touchstart"===n)Ne.touch.x=e.clientX,Ne.touch.y=e.clientY,Ne.touch.scrollDecided=!1;else if("touchmove"===n){if(Ne.touch.scrollDecided)return;Ne.touch.scrollDecided=!0;let n=function(t){let e="auto",n=Fe(t);for(let o,i=0;i<n.length;i++)if(o=n[i],o[fe]){e=o[fe];break}return e}(t),o=!1,i=Math.abs(Ne.touch.x-e.clientX),s=Math.abs(Ne.touch.y-e.clientY);t.cancelable&&("none"===n?o=!0:"pan-x"===n?o=s>i:"pan-y"===n&&(o=i>s)),o?t.preventDefault():De("track")}}(t)}if(e=t[pe],!e.skip){for(let n,o=0;o<je.length;o++)n=je[o],i[n.name]&&!e[n.name]&&n.flow&&n.flow.start.indexOf(t.type)>-1&&n.reset&&n.reset();for(let o,s=0;s<je.length;s++)o=je[s],i[o.name]&&!e[o.name]&&(e[o.name]=!0,o[n](t))}}}function He(t,e,n){return!!Me[e]&&(function(t,e,n){let o=Me[e],i=o.deps,s=o.name,r=t.__polymerGestures;r||(t.__polymerGestures=r={});for(let l,a,c=0;c<i.length;c++)l=i[c],_e&&we(l)&&"click"!==l||(a=r[l],a||(r[l]=a={_count:0}),0===a._count&&t.addEventListener(l,Be,xe(l)),a[s]=(a[s]||0)+1,a._count=(a._count||0)+1);t.addEventListener(e,n),o.touchAction&&function(t,e){de&&t instanceof HTMLElement&&bt.run(()=>{t.style.touchAction=e}),t[fe]=e}(t,o.touchAction)}(t,e,n),!0)}function Re(t){je.push(t);for(let e=0;e<t.emits.length;e++)Me[t.emits[e]]=t}function $e(t,e,n){let o=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(o.detail=n,W(t).dispatchEvent(o),o.defaultPrevented){let t=n.preventer||n.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function De(t){let e=function(t){for(let e,n=0;n<je.length;n++){e=je[n];for(let n,o=0;o<e.emits.length;o++)if(n=e.emits[o],n===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function Je(t,e,n,o){e&&$e(e,t,{x:n.clientX,y:n.clientY,sourceEvent:n,preventer:o,prevent:function(t){return De(t)}})}function Ie(t,e,n){if(t.prevent)return!1;if(t.started)return!0;let o=Math.abs(t.x-e),i=Math.abs(t.y-n);return o>=5||i>=5}function qe(t,e,n){if(!e)return;let o,i=t.moves[t.moves.length-2],s=t.moves[t.moves.length-1],r=0;i&&(o=s.x-i.x,r=s.y-i.y),$e(e,"track",{state:t.state,x:n.clientX,y:n.clientY,dx:s.x-t.x,dy:s.y-t.y,ddx:o,ddy:r,sourceEvent:n,hover:function(){return function(t,e){let n=document.elementFromPoint(t,e),o=n;for(;o&&o.shadowRoot&&!window.ShadyDOM;){let i=o;if(o=o.shadowRoot.elementFromPoint(t,e),i===o)break;o&&(n=o)}return n}(n.clientX,n.clientY)}})}function Ue(t,e,n){let o=Math.abs(e.clientX-t.x),i=Math.abs(e.clientY-t.y),s=Le(n||e);!s||Pe[s.localName]&&s.hasAttribute("disabled")||(isNaN(o)||isNaN(i)||o<=25&&i<=25||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=Le(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let n=e.getBoundingClientRect(),o=t.pageX,i=t.pageY;return!(o>=n.left&&o<=n.right&&i>=n.top&&i<=n.bottom)}return!1}(e))&&(t.prevent||$e(s,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:n}))}
/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/Re({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){Ae(this.info)},mousedown:function(t){if(!Se(t))return;let e=Le(t),n=this;Oe(this.info,(function(t){Se(t)||(Je("up",e,t),Ae(n.info))}),(function(t){Se(t)&&Je("up",e,t),Ae(n.info)})),Je("down",e,t)},touchstart:function(t){Je("down",Le(t),t.changedTouches[0],t)},touchend:function(t){Je("up",Le(t),t.changedTouches[0],t)}}),Re({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,Ae(this.info)},mousedown:function(t){if(!Se(t))return;let e=Le(t),n=this,o=function(t){let o=t.clientX,i=t.clientY;Ie(n.info,o,i)&&(n.info.state=n.info.started?"mouseup"===t.type?"end":"track":"start","start"===n.info.state&&De("tap"),n.info.addMove({x:o,y:i}),Se(t)||(n.info.state="end",Ae(n.info)),e&&qe(n.info,e,t),n.info.started=!0)};Oe(this.info,o,(function(t){n.info.started&&o(t),Ae(n.info)})),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=Le(t),n=t.changedTouches[0],o=n.clientX,i=n.clientY;Ie(this.info,o,i)&&("start"===this.info.state&&De("tap"),this.info.addMove({x:o,y:i}),qe(this.info,e,n),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=Le(t),n=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:n.clientX,y:n.clientY}),qe(this.info,e,n))}}),Re({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){Se(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){Se(t)&&Ue(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){Ue(this.info,t.changedTouches[0],t)}});const Ve=K(t=>class extends t{_addEventListenerToNode(t,e,n){He(t,e,n)||super._addEventListenerToNode(t,e,n)}_removeEventListenerFromNode(t,e,n){(function(t,e,n){return!!Me[e]&&(function(t,e,n){let o=Me[e],i=o.deps,s=o.name,r=t.__polymerGestures;if(r)for(let l,a,c=0;c<i.length;c++)l=i[c],a=r[l],a&&a[s]&&(a[s]=(a[s]||1)-1,a._count=(a._count||1)-1,0===a._count&&t.removeEventListener(l,Be,xe(l)));t.removeEventListener(e,n)}(t,e,n),!0)})(t,e,n)||super._removeEventListenerFromNode(t,e,n)}}),Ye=t=>class extends t{static get properties(){return{theme:{type:String,readOnly:!0}}}attributeChangedCallback(t,e,n){super.attributeChangedCallback(t,e,n),"theme"===t&&this._setTheme(n)}},Ze=t=>class extends(Ye(t)){static finalize(){super.finalize();const t=this.prototype._template,e=this.template&&this.template.parentElement&&this.template.parentElement.id===this.is,n=Object.getPrototypeOf(this.prototype)._template;n&&!e&&Array.from(n.content.querySelectorAll("style[include]")).forEach(e=>{this._includeStyle(e.getAttribute("include"),t)}),this._includeMatchingThemes(t)}static _includeMatchingThemes(t){const e=N.prototype.modules;let n=!1;const o=this.is+"-default-theme";Object.keys(e).sort((t,e)=>{const n=0===t.indexOf("vaadin-"),o=0===e.indexOf("vaadin-"),i=["lumo-","material-"],s=i.filter(e=>0===t.indexOf(e)).length>0,r=i.filter(t=>0===e.indexOf(t)).length>0;return n!==o?n?-1:1:s!==r?s?-1:1:0}).forEach(i=>{if(i!==o){const o=e[i].getAttribute("theme-for");o&&o.split(" ").forEach(e=>{new RegExp("^"+e.split("*").join(".*")+"$").test(this.is)&&(n=!0,this._includeStyle(i,t))})}}),!n&&e[o]&&this._includeStyle(o,t)}static _includeStyle(t,e){if(e&&!e.content.querySelector(`style[include="${t}"]`)){const n=document.createElement("style");n.setAttribute("include",t),e.content.appendChild(n)}}}
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/,Ke=t=>class extends((t=>class extends t{static get properties(){var t={tabindex:{type:Number,value:0,reflectToAttribute:!0,observer:"_tabindexChanged"}};return window.ShadyDOM&&(t.tabIndex=t.tabindex),t}})(t)){static get properties(){return{autofocus:{type:Boolean},_previousTabIndex:{type:Number},disabled:{type:Boolean,observer:"_disabledChanged",reflectToAttribute:!0},_isShiftTabbing:{type:Boolean}}}ready(){this.addEventListener("focusin",t=>{t.composedPath()[0]===this?this._focus(t):-1===t.composedPath().indexOf(this.focusElement)||this.disabled||this._setFocused(!0)}),this.addEventListener("focusout",()=>this._setFocused(!1)),super.ready();const t=t=>{t.composed||t.target.dispatchEvent(new CustomEvent(t.type,{bubbles:!0,composed:!0,cancelable:!1}))};this.shadowRoot.addEventListener("focusin",t),this.shadowRoot.addEventListener("focusout",t),this.addEventListener("keydown",t=>{if(!t.defaultPrevented&&9===t.keyCode)if(t.shiftKey)this._isShiftTabbing=!0,HTMLElement.prototype.focus.apply(this),this._setFocused(!1),setTimeout(()=>this._isShiftTabbing=!1,0);else{const t=window.navigator.userAgent.match(/Firefox\/(\d\d\.\d)/);if(t&&parseFloat(t[1])>=63&&parseFloat(t[1])<66&&this.parentNode&&this.nextSibling){const t=document.createElement("input");t.style.position="absolute",t.style.opacity=0,t.tabIndex=this.tabIndex,this.parentNode.insertBefore(t,this.nextSibling),t.focus(),t.addEventListener("focusout",()=>this.parentNode.removeChild(t))}}}),!this.autofocus||this.focused||this.disabled||window.requestAnimationFrame(()=>{this._focus(),this._setFocused(!0),this.setAttribute("focus-ring","")}),this._boundKeydownListener=this._bodyKeydownListener.bind(this),this._boundKeyupListener=this._bodyKeyupListener.bind(this)}connectedCallback(){super.connectedCallback(),document.body.addEventListener("keydown",this._boundKeydownListener,!0),document.body.addEventListener("keyup",this._boundKeyupListener,!0)}disconnectedCallback(){super.disconnectedCallback(),document.body.removeEventListener("keydown",this._boundKeydownListener,!0),document.body.removeEventListener("keyup",this._boundKeyupListener,!0),this.hasAttribute("focused")&&this._setFocused(!1)}_setFocused(t){t?this.setAttribute("focused",""):this.removeAttribute("focused"),t&&this._tabPressed?this.setAttribute("focus-ring",""):this.removeAttribute("focus-ring")}_bodyKeydownListener(t){this._tabPressed=9===t.keyCode}_bodyKeyupListener(){this._tabPressed=!1}get focusElement(){return window.console.warn(`Please implement the 'focusElement' property in <${this.localName}>`),this}_focus(t){this._isShiftTabbing||(this.focusElement.focus(),this._setFocused(!0))}focus(){this.focusElement&&!this.disabled&&(this.focusElement.focus(),this._setFocused(!0))}blur(){this.focusElement.blur(),this._setFocused(!1)}_disabledChanged(t){this.focusElement.disabled=t,t?(this.blur(),this._previousTabIndex=this.tabindex,this.tabindex=-1,this.setAttribute("aria-disabled","true")):(void 0!==this._previousTabIndex&&(this.tabindex=this._previousTabIndex),this.removeAttribute("aria-disabled"))}_tabindexChanged(t){void 0!==t&&(this.focusElement.tabIndex=t),this.disabled&&this.tabindex&&(-1!==this.tabindex&&(this._previousTabIndex=this.tabindex),this.tabindex=t=void 0),window.ShadyDOM&&this.setProperties({tabIndex:t,tabindex:t})}click(){this.disabled||super.click()}},We=[];new MutationObserver((function(){const t=Qe();We.forEach(e=>{Ge(e,t)})})).observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});const Ge=function(t,e){e?t.setAttribute("dir",e):t.removeAttribute("dir")},Qe=function(){return document.documentElement.getAttribute("dir")},Xe=t=>class extends t{static get properties(){return{dir:{type:String,readOnly:!0}}}connectedCallback(){super.connectedCallback(),this.hasAttribute("dir")||(this.__subscribe(),Ge(this,Qe()))}attributeChangedCallback(t,e,n){if(super.attributeChangedCallback(t,e,n),"dir"!==t)return;const o=n===Qe()&&-1===We.indexOf(this),i=!n&&e&&-1===We.indexOf(this),s=n!==Qe()&&e===Qe();o||i?(this.__subscribe(),Ge(this,Qe())):s&&this.__subscribe(!1)}disconnectedCallback(){super.disconnectedCallback(),this.__subscribe(!1)}__subscribe(t=!0){t?-1===We.indexOf(this)&&We.push(this):We.indexOf(this)>-1&&We.splice(We.indexOf(this),1)}},tn=/\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,en=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function nn(t,e){if("function"!=typeof t)return;const n=tn.exec(t.toString());if(n)try{t=new Function(n[1])}catch(o){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",o)}return t(e)}window.Vaadin=window.Vaadin||{};function on(){}void 0===window.Vaadin.developmentMode&&(window.Vaadin.developmentMode=function(){try{return!!localStorage.getItem("vaadin.developmentmode.force")||["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0&&(en?!(en&&Object.keys(en).map(t=>en[t]).filter(t=>t.productionMode).length>0):!nn((function(){return!0})))}catch(t){return!1}}());const sn=function(){return function(t,e){if(window.Vaadin.developmentMode)return nn(t,e)}(on)};let rn;window.Vaadin||(window.Vaadin={}),window.Vaadin.registrations=window.Vaadin.registrations||[],window.Vaadin.developmentModeCallback=window.Vaadin.developmentModeCallback||{},window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]=function(){sn&&sn()};const ln=new Set,an=t=>class extends(Xe(t)){static finalize(){super.finalize();const{is:t}=this;t&&!ln.has(t)&&(window.Vaadin.registrations.push(this),ln.add(t),window.Vaadin.developmentModeCallback&&(rn=he.debounce(rn,yt,()=>{window.Vaadin.developmentModeCallback["vaadin-usage-statistics"]()}),me.add(rn)))}constructor(){super(),null===document.doctype&&console.warn('Vaadin components require the "standards mode" declaration. Please add <!DOCTYPE html> to the HTML document.')}}
/**
@license
Copyright (c) 2017 Vaadin Ltd.
This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/;class cn extends(an(Ke(Ze(Ve(ue))))){static get template(){return V`
    <style>
      :host {
        display: inline-block;
        position: relative;
        outline: none;
        white-space: nowrap;
      }

      :host([hidden]) {
        display: none !important;
      }

      /* Ensure the button is always aligned on the baseline */
      .vaadin-button-container::before {
        content: "\\2003";
        display: inline-block;
        width: 0;
      }

      .vaadin-button-container {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: 100%;
        height: 100%;
        min-height: inherit;
        text-shadow: inherit;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      [part="prefix"],
      [part="suffix"] {
        flex: none;
      }

      [part="label"] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: inherit;
      }
    </style>
    <div class="vaadin-button-container">
      <div part="prefix">
        <slot name="prefix"></slot>
      </div>
      <div part="label">
        <slot></slot>
      </div>
      <div part="suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
    <button id="button" type="button"></button>
`}static get is(){return"vaadin-button"}static get version(){return"2.2.2"}ready(){super.ready(),this.setAttribute("role","button"),this.$.button.setAttribute("role","presentation"),this._addActiveListeners(),window.ShadyDOM&&window.ShadyDOM.flush()}disconnectedCallback(){super.disconnectedCallback(),this.hasAttribute("active")&&this.removeAttribute("active")}_addActiveListeners(){He(this,"down",()=>!this.disabled&&this.setAttribute("active","")),He(this,"up",()=>this.removeAttribute("active")),this.addEventListener("keydown",t=>!this.disabled&&[13,32].indexOf(t.keyCode)>=0&&this.setAttribute("active","")),this.addEventListener("keyup",()=>this.removeAttribute("active")),this.addEventListener("blur",()=>this.removeAttribute("active"))}get focusElement(){return this.$.button}}customElements.define(cn.is,cn);const un=class{constructor(e){t(this,e)}render(){return e("vaadin-button",null,"Test")}};export{un as my_component};