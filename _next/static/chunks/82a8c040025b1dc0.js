(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,49932,(e,t,i)=>{class a{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function r(e,...t){let i=Object.create(null);for(let t in e)i[t]=e[t];return t.forEach(function(e){for(let t in e)i[t]=e[t]}),i}class o{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=n(e)}openNode(e){if(!e.scope)return;let t=((e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){let i=e.split(".");return[`${t}${i.shift()}`,...i.map((e,t)=>`${e}${"_".repeat(t+1)}`)].join(" ")}return`${t}${e}`})(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){e.scope&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}let s=(e={})=>{let t={children:[]};return Object.assign(t,e),t};class l{constructor(){this.rootNode=s(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let t=s({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(t=>this._walk(e,t)),e.closeNode(t)),e}static _collapse(e){"string"==typeof e||e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{l._collapse(e)}))}}class d extends l{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){let i=e.root;t&&(i.scope=`language:${t}`),this.add(i)}toHTML(){return new o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function c(e){return e?"string"==typeof e?e:e.source:null}function p(e){return m("(?=",e,")")}function g(e){return m("(?:",e,")*")}function h(e){return m("(?:",e,")?")}function m(...e){return e.map(e=>c(e)).join("")}function b(...e){let t;return"("+(("object"==typeof(t=e[e.length-1])&&t.constructor===Object?(e.splice(e.length-1,1),t):{}).capture?"":"?:")+e.map(e=>c(e)).join("|")+")"}function f(e){return RegExp(e.toString()+"|").exec("").length-1}let u=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function v(e,{joinWith:t}){let i=0;return e.map(e=>{let t=i+=1,a=c(e),n="";for(;a.length>0;){let e=u.exec(a);if(!e){n+=a;break}n+=a.substring(0,e.index),a=a.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?n+="\\"+String(Number(e[1])+t):(n+=e[0],"("===e[0]&&i++)}return n}).map(e=>`(${e})`).join(t)}let x="[a-zA-Z]\\w*",y="[a-zA-Z_]\\w*",w="\\b\\d+(\\.\\d+)?",k="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",S="\\b(0b[01]+)",T={begin:"\\\\[\\s\\S]",relevance:0},H=function(e,t,i={}){let a=r({scope:"comment",begin:e,end:t,contains:[]},i);a.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let n=b("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return a.contains.push({begin:m(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),a},C=H("//","$"),E=H("/\\*","\\*/"),z=H("#","$");var M=Object.freeze({__proto__:null,APOS_STRING_MODE:{scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[T]},BACKSLASH_ESCAPE:T,BINARY_NUMBER_MODE:{scope:"number",begin:S,relevance:0},BINARY_NUMBER_RE:S,COMMENT:H,C_BLOCK_COMMENT_MODE:E,C_LINE_COMMENT_MODE:C,C_NUMBER_MODE:{scope:"number",begin:k,relevance:0},C_NUMBER_RE:k,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},HASH_COMMENT_MODE:z,IDENT_RE:x,MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:{begin:"\\.\\s*"+y,relevance:0},NUMBER_MODE:{scope:"number",begin:w,relevance:0},NUMBER_RE:w,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},QUOTE_STRING_MODE:{scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[T]},REGEXP_MODE:{scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[T,{begin:/\[/,end:/\]/,relevance:0,contains:[T]}]},RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{let t=/^#![ ]*\//;return e.binary&&(e.begin=m(t,/.*\b/,e.binary,/\b.*/)),r({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},TITLE_MODE:{scope:"title",begin:x,relevance:0},UNDERSCORE_IDENT_RE:y,UNDERSCORE_TITLE_MODE:{scope:"title",begin:y,relevance:0}});function L(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function A(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function _(e,t){!t||e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=L,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function j(e,t){Array.isArray(e.illegal)&&(e.illegal=b(...e.illegal))}function I(e,t){if(e.match){if(e.begin||e.end)throw Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function R(e,t){void 0===e.relevance&&(e.relevance=1)}let O=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw Error("beforeMatch cannot be used with starts");let i=Object.assign({},e);Object.keys(e).forEach(t=>{delete e[t]}),e.keywords=i.keywords,e.begin=m(i.beforeMatch,p(i.begin)),e.starts={relevance:0,contains:[Object.assign(i,{endsParent:!0})]},e.relevance=0,delete i.beforeMatch},B=["of","and","for","in","not","or","if","then","parent","list","value"],F={},P=e=>{console.error(e)},D=(e,...t)=>{console.log(`WARN: ${e}`,...t)},N=(e,t)=>{F[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),F[`${e}/${t}`]=!0)},Y=Error();function U(e,t,{key:i}){let a=0,n=e[i],r={},o={};for(let e=1;e<=t.length;e++)o[e+a]=n[e],r[e+a]=!0,a+=f(t[e-1]);e[i]=o,e[i]._emit=r,e[i]._multi=!0}function X(e){if(e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw P("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Y;if("object"!=typeof e.beginScope||null===e.beginScope)throw P("beginScope must be object"),Y;U(e,e.begin,{key:"beginScope"}),e.begin=v(e.begin,{joinWith:""})}if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw P("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Y;if("object"!=typeof e.endScope||null===e.endScope)throw P("endScope must be object"),Y;U(e,e.end,{key:"endScope"}),e.end=v(e.end,{joinWith:""})}}class q extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}let G=Symbol("nomatch"),W=function(e){let t=Object.create(null),i=Object.create(null),o=[],s=!0,l="Could not find the language '{}', did you forget to load/include a language module?",u={disableAutodetect:!0,name:"Plain text",contains:[]},x={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:d};function y(e){return x.noHighlightRe.test(e)}function w(e,t,i){let a="",n="";"object"==typeof t?(a=e,i=t.ignoreIllegals,n=t.language):(N("10.7.0","highlight(lang, code, ...args) has been deprecated."),N("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),n=e,a=t),void 0===i&&(i=!0);let r={code:a,language:n};F("before:highlight",r);let o=r.result?r.result:k(r.language,r.code,i);return o.code=r.code,F("after:highlight",o),o}function k(e,i,o,d){let p=Object.create(null);function g(){if(!z.keywords)return void L.addText(D);let e=0;z.keywordPatternRe.lastIndex=0;let t=z.keywordPatternRe.exec(D),i="";for(;t;){i+=D.substring(e,t.index);let a=T.case_insensitive?t[0].toLowerCase():t[0],n=z.keywords[a];if(n){let[e,r]=n;if(L.addText(i),i="",p[a]=(p[a]||0)+1,p[a]<=7&&(N+=r),e.startsWith("_"))i+=t[0];else{let i=T.classNameAliases[e]||e;m(t[0],i)}}else i+=t[0];e=z.keywordPatternRe.lastIndex,t=z.keywordPatternRe.exec(D)}i+=D.substring(e),L.addText(i)}function h(){null!=z.subLanguage?function(){if(""===D)return;let e=null;if("string"==typeof z.subLanguage){if(!t[z.subLanguage])return L.addText(D);e=k(z.subLanguage,D,!0,M[z.subLanguage]),M[z.subLanguage]=e._top}else e=S(D,z.subLanguage.length?z.subLanguage:null);z.relevance>0&&(N+=e.relevance),L.__addSublanguage(e._emitter,e.language)}():g(),D=""}function m(e,t){""!==e&&(L.startScope(t),L.addText(e),L.endScope())}function b(e,t){let i=1,a=t.length-1;for(;i<=a;){if(!e._emit[i]){i++;continue}let a=T.classNameAliases[e[i]]||e[i],n=t[i];a?m(n,a):(D=n,g(),D=""),i++}}function u(e,t){return e.scope&&"string"==typeof e.scope&&L.openNode(T.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(m(D,T.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),D=""):e.beginScope._multi&&(b(e.beginScope,t),D="")),z=Object.create(e,{parent:{value:z}})}let y={};function w(t,n){let r=n&&n[0];if(D+=t,null==r)return h(),0;if("begin"===y.type&&"end"===n.type&&y.index===n.index&&""===r){if(D+=i.slice(n.index,n.index+1),!s){let t=Error(`0 width match regex (${e})`);throw t.languageName=e,t.badRule=y.rule,t}return 1}if(y=n,"begin"===n.type){let e=n[0],t=n.rule,i=new a(t);for(let a of[t.__beforeBegin,t["on:begin"]])if(a&&(a(n,i),i.isMatchIgnored))return 0===z.matcher.regexIndex?(D+=e[0],1):(q=!0,0);return t.skip?D+=e:(t.excludeBegin&&(D+=e),h(),t.returnBegin||t.excludeBegin||(D=e)),u(t,n),t.returnBegin?0:e.length}if("illegal"!==n.type||o){if("end"===n.type){let e=function(e){let t=e[0],n=i.substring(e.index),r=function e(t,i,n){var r;let o,s=(r=t.endRe,(o=r&&r.exec(n))&&0===o.index);if(s){if(t["on:end"]){let e=new a(t);t["on:end"](i,e),e.isMatchIgnored&&(s=!1)}if(s){for(;t.endsParent&&t.parent;)t=t.parent;return t}}if(t.endsWithParent)return e(t.parent,i,n)}(z,e,n);if(!r)return G;let o=z;z.endScope&&z.endScope._wrap?(h(),m(t,z.endScope._wrap)):z.endScope&&z.endScope._multi?(h(),b(z.endScope,e)):o.skip?D+=t:(o.returnEnd||o.excludeEnd||(D+=t),h(),o.excludeEnd&&(D=t));do z.scope&&L.closeNode(),z.skip||z.subLanguage||(N+=z.relevance),z=z.parent;while(z!==r.parent)return r.starts&&u(r.starts,e),o.returnEnd?0:t.length}(n);if(e!==G)return e}}else{let e=Error('Illegal lexeme "'+r+'" for mode "'+(z.scope||"<unnamed>")+'"');throw e.mode=z,e}if("illegal"===n.type&&""===r)return D+="\n",1;if(U>1e5&&U>3*n.index)throw Error("potential infinite loop, way more iterations than matches");return D+=r,r.length}let T=E(e);if(!T)throw P(l.replace("{}",e)),Error('Unknown language: "'+e+'"');let H=function(e){function t(t,i){return RegExp(c(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=f(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);let e=this.regexes.map(e=>e[1]);this.matcherRe=t(v(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;let t=this.matcherRe.exec(e);if(!t)return null;let i=t.findIndex((e,t)=>t>0&&void 0!==e),a=this.matchIndexes[i];return t.splice(0,i),Object.assign(t,a)}}class a{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];let t=new i;return this.rules.slice(e).forEach(([e,i])=>t.addRule(e,i)),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){let t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let i=t.exec(e);if(this.resumingScanAtSamePosition())if(i&&i.index===this.lastIndex);else{let t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,i=t.exec(e)}return i&&(this.regexIndex+=i.position+1,this.regexIndex===this.count&&this.considerAll()),i}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=r(e.classNameAliases||{}),function i(n,o){let s;if(n.isCompiled)return n;[A,I,X,O].forEach(e=>e(n,o)),e.compilerExtensions.forEach(e=>e(n,o)),n.__beforeBegin=null,[_,j,R].forEach(e=>e(n,o)),n.isCompiled=!0;let l=null;return"object"==typeof n.keywords&&n.keywords.$pattern&&(n.keywords=Object.assign({},n.keywords),l=n.keywords.$pattern,delete n.keywords.$pattern),l=l||/\w+/,n.keywords&&(n.keywords=function e(t,i,a="keyword"){let n=Object.create(null);return"string"==typeof t?r(a,t.split(" ")):Array.isArray(t)?r(a,t):Object.keys(t).forEach(function(a){Object.assign(n,e(t[a],i,a))}),n;function r(e,t){i&&(t=t.map(e=>e.toLowerCase())),t.forEach(function(t){var i,a,r;let o=t.split("|");n[o[0]]=[e,(i=o[0],(a=o[1])?Number(a):+(r=i,!B.includes(r.toLowerCase())))]})}}(n.keywords,e.case_insensitive)),n.keywordPatternRe=t(l,!0),o&&(n.begin||(n.begin=/\B|\b/),n.beginRe=t(n.begin),n.end||n.endsWithParent||(n.end=/\B|\b/),n.end&&(n.endRe=t(n.end)),n.terminatorEnd=c(n.end)||"",n.endsWithParent&&o.terminatorEnd&&(n.terminatorEnd+=(n.end?"|":"")+o.terminatorEnd)),n.illegal&&(n.illegalRe=t(n.illegal)),n.contains||(n.contains=[]),n.contains=[].concat(...n.contains.map(function(e){var t;return((t="self"===e?n:e).variants&&!t.cachedVariants&&(t.cachedVariants=t.variants.map(function(e){return r(t,{variants:null},e)})),t.cachedVariants)?t.cachedVariants:!function e(t){return!!t&&(t.endsWithParent||e(t.starts))}(t)?Object.isFrozen(t)?r(t):t:r(t,{starts:t.starts?r(t.starts):null})})),n.contains.forEach(function(e){i(e,n)}),n.starts&&i(n.starts,o),s=new a,n.contains.forEach(e=>s.addRule(e.begin,{rule:e,type:"begin"})),n.terminatorEnd&&s.addRule(n.terminatorEnd,{type:"end"}),n.illegal&&s.addRule(n.illegal,{type:"illegal"}),n.matcher=s,n}(e)}(T),C="",z=d||H,M={},L=new x.__emitter(x),F=[];for(let e=z;e!==T;e=e.parent)e.scope&&F.unshift(e.scope);F.forEach(e=>L.openNode(e));let D="",N=0,Y=0,U=0,q=!1;try{if(T.__emitTokens)T.__emitTokens(i,L);else{for(z.matcher.considerAll();;){U++,q?q=!1:z.matcher.considerAll(),z.matcher.lastIndex=Y;let e=z.matcher.exec(i);if(!e)break;let t=i.substring(Y,e.index),a=w(t,e);Y=e.index+a}w(i.substring(Y))}return L.finalize(),C=L.toHTML(),{language:e,value:C,relevance:N,illegal:!1,_emitter:L,_top:z}}catch(t){if(t.message&&t.message.includes("Illegal"))return{language:e,value:n(i),illegal:!0,relevance:0,_illegalBy:{message:t.message,index:Y,context:i.slice(Y-100,Y+100),mode:t.mode,resultSoFar:C},_emitter:L};if(s)return{language:e,value:n(i),illegal:!1,relevance:0,errorRaised:t,_emitter:L,_top:z};throw t}}function S(e,i){let a;i=i||x.languages||Object.keys(t);let r=((a={value:n(e),illegal:!1,relevance:0,_top:u,_emitter:new x.__emitter(x)})._emitter.addText(e),a),o=i.filter(E).filter(L).map(t=>k(t,e,!1));o.unshift(r);let[s,l]=o.sort((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(E(e.language).supersetOf===t.language)return 1;else if(E(t.language).supersetOf===e.language)return -1}return 0});return s.secondBest=l,s}function T(e){var t;let a,n=function(e){let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";let i=x.languageDetectRe.exec(t);if(i){let t=E(i[1]);return t||(D(l.replace("{}",i[1])),D("Falling back to no-highlight mode for this block.",e)),t?i[1]:"no-highlight"}return t.split(/\s+/).find(e=>y(e)||E(e))}(e);if(y(n))return;if(F("before:highlightElement",{el:e,language:n}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e);if(e.children.length>0&&(x.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),x.throwUnescapedHTML))throw new q("One of your code blocks includes unescaped HTML.",e.innerHTML);let r=e.textContent,o=n?w(r,{language:n,ignoreIllegals:!0}):S(r);e.innerHTML=o.value,e.dataset.highlighted="yes",t=o.language,a=n&&i[n]||t,e.classList.add("hljs"),e.classList.add(`language-${a}`),e.result={language:o.language,re:o.relevance,relevance:o.relevance},o.secondBest&&(e.secondBest={language:o.secondBest.language,relevance:o.secondBest.relevance}),F("after:highlightElement",{el:e,result:o,text:r})}let H=!1;function C(){if("loading"===document.readyState){H||window.addEventListener("DOMContentLoaded",function(){C()},!1),H=!0;return}document.querySelectorAll(x.cssSelector).forEach(T)}function E(e){return t[e=(e||"").toLowerCase()]||t[i[e]]}function z(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach(e=>{i[e.toLowerCase()]=t})}function L(e){let t=E(e);return t&&!t.disableAutodetect}function F(e,t){o.forEach(function(i){i[e]&&i[e](t)})}for(let a in Object.assign(e,{highlight:w,highlightAuto:S,highlightAll:C,highlightElement:T,highlightBlock:function(e){return N("10.7.0","highlightBlock will be removed entirely in v12.0"),N("10.7.0","Please use highlightElement now."),T(e)},configure:function(e){x=r(x,e)},initHighlighting:()=>{C(),N("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){C(),N("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(i,a){let n=null;try{n=a(e)}catch(e){if(P("Language definition for '{}' could not be registered.".replace("{}",i)),s)P(e);else throw e;n=u}n.name||(n.name=i),t[i]=n,n.rawDefinition=a.bind(null,e),n.aliases&&z(n.aliases,{languageName:i})},unregisterLanguage:function(e){for(let a of(delete t[e],Object.keys(i)))i[a]===e&&delete i[a]},listLanguages:function(){return Object.keys(t)},getLanguage:E,registerAliases:z,autoDetection:L,inherit:r,addPlugin:function(e){var t;(t=e)["before:highlightBlock"]&&!t["before:highlightElement"]&&(t["before:highlightElement"]=e=>{t["before:highlightBlock"](Object.assign({block:e.el},e))}),t["after:highlightBlock"]&&!t["after:highlightElement"]&&(t["after:highlightElement"]=e=>{t["after:highlightBlock"](Object.assign({block:e.el},e))}),o.push(e)},removePlugin:function(e){let t=o.indexOf(e);-1!==t&&o.splice(t,1)}}),e.debugMode=function(){s=!1},e.safeMode=function(){s=!0},e.versionString="11.11.1",e.regex={concat:m,lookahead:p,either:b,optional:h,anyNumberOfTimes:g},M)"object"==typeof M[a]&&function e(t){return t instanceof Map?t.clear=t.delete=t.set=function(){throw Error("map is read-only")}:t instanceof Set&&(t.add=t.clear=t.delete=function(){throw Error("set is read-only")}),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(i=>{let a=t[i],n=typeof a;"object"!==n&&"function"!==n||Object.isFrozen(a)||e(a)}),t}(M[a]);return Object.assign(e,M),e},$=W({});$.newInstance=()=>W({}),t.exports=$,$.HighlightJS=$,$.default=$},57128,e=>{"use strict";var t=e.i(25764),i=e.i(45444),a=e.i(87726);let n=[{id:"parallax",title:"Parallax Depth",titleHe:"Parallax עומק",description:"Multi-layer parallax scrolling effect where background layers move at different speeds to create a sense of depth.",descriptionHe:"אפקט גלילה בפרלקס רב-שכבתי שבו שכבות רקע נעות במהירויות שונות ליצירת תחושת עומק.",categories:["scroll","background"],tags:[{label:"scroll"},{label:"parallax"},{label:"layers"}],difficulty:"beginner",previewComponent:"parallax",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Parallax Depth</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { height: 300vh; overflow-x: hidden; background: #0a0a0a; font-family: sans-serif; }
  .parallax-container { position: relative; height: 100vh; overflow: hidden; }
  .layer {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: bold; color: #fff;
    will-change: transform;
  }
  .layer-1 {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    z-index: 1;
  }
  .layer-2 {
    background: radial-gradient(circle at 30% 50%, rgba(108, 99, 255, 0.35), transparent 60%);
    z-index: 2;
  }
  .layer-3 {
    z-index: 3;
  }
  .layer-3 span {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(6px);
    padding: 1.5rem 3rem;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.15);
  }
  .content {
    position: relative; z-index: 4;
    display: flex; align-items: center; justify-content: center;
    height: 100vh; color: #aaa; font-size: 1.2rem;
  }
</style>
</head>
<body>
  <div class="parallax-container" id="parallaxBox">
    <div class="layer layer-1">Background Layer</div>
    <div class="layer layer-2">Middle Layer</div>
    <div class="layer layer-3"><span>Foreground Layer</span></div>
  </div>
  <div class="content">Scroll up to see the parallax effect</div>
  <div class="content">Keep scrolling...</div>

  <script>
    const layers = document.querySelectorAll('.layer');
    const speeds = [0.1, 0.35, 0.7];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach((layer, i) => {
        const yOffset = -(scrollY * speeds[i]);
        layer.style.transform = \`translateY(\${yOffset}px)\`;
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה שלוש שכבות אחת על השנייה, וכל אחת זזה במהירות אחרת כשגוללים. השכבה הכי אחורית זזה לאט, והקדמית זזה מהר — וככה נוצרת אשליה של עומק, כמו שרואים בעולם האמיתי כשנוסעים ברכב והעצים הקרובים עוברים מהר והרים רחוקים זזים לאט.</p>`,proTipHe:"השתמשו ב-requestAnimationFrame במקום מאזין scroll ישיר כדי לשפר ביצועים באתרים כבדים.",promptHe:"אני רוצה אפקט פרלקס (Parallax) לאתר שלי — כמה שכבות שזזות במהירויות שונות כשגוללים, כדי ליצור תחושת עומק. לפני שאתה כותב קוד, תשאל אותי: כמה שכבות אני רוצה? מה יהיה בכל שכבה (תמונות, צבעים, טקסט)? באיזה כיוון הגלילה (אנכי או אופקי)? מה סגנון העיצוב הכללי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"glitch",title:"Glitch Text",titleHe:"גליץ' טקסט",description:"A glitchy text animation using CSS clip-path and pseudo-elements that creates a digital distortion look.",descriptionHe:"אנימציית טקסט גליץ' באמצעות CSS clip-path ופסאודו-אלמנטים שיוצרת מראה של עיוות דיגיטלי.",categories:["text"],tags:[{label:"glitch"},{label:"text"},{label:"animation"}],difficulty:"intermediate",previewComponent:"glitch",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glitch Text</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .glitch {
    position: relative; font-size: 5rem; font-weight: 900;
    color: #fff; letter-spacing: 4px;
  }
  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    overflow: hidden;
  }
  .glitch::before {
    color: #0ff;
    animation: glitch-top 2s infinite linear alternate-reverse;
    clip-path: inset(0 0 65% 0);
  }
  .glitch::after {
    color: #f0f;
    animation: glitch-bottom 3s infinite linear alternate-reverse;
    clip-path: inset(60% 0 0 0);
  }
  @keyframes glitch-top {
    0%   { transform: translate(0); }
    20%  { transform: translate(-3px, 3px); }
    40%  { transform: translate(3px, -2px); }
    60%  { transform: translate(-2px, 1px); }
    80%  { transform: translate(2px, -3px); }
    100% { transform: translate(-1px, 2px); }
  }
  @keyframes glitch-bottom {
    0%   { transform: translate(0); }
    25%  { transform: translate(4px, -1px); }
    50%  { transform: translate(-3px, 2px); }
    75%  { transform: translate(2px, 1px); }
    100% { transform: translate(-4px, -2px); }
  }
  .scanlines {
    position: fixed; inset: 0; pointer-events: none; z-index: 10;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
  }
</style>
</head>
<body>
  <div class="scanlines"></div>
  <div class="glitch" data-text="GLITCH">GLITCH</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט מועתק לשתי שכבות נוספות מעליו בצבעים שונים (ציאן ומגנטה), וכל שכבה חתוכה ככה שרואים רק חלק ממנה. האנימציה מזיזה את השכבות האלה בכיוונים שונים — וזה יוצר את אפקט ה"תקלה" הדיגיטלית. בנוסף יש שכבת קווי סריקה דקיקים שנותנת תחושה של מסך ישן.</p>`,proTipHe:"שנו את ערכי ה-clip-path ואת קצב האנימציה כדי ליצור גליץ'ים עדינים יותר או אגרסיביים יותר.",promptHe:"אני רוצה אפקט גליץ' (Glitch) על טקסט — שהטקסט ייראה כאילו יש תקלה דיגיטלית עם רעידות וצבעים מפוצלים. לפני שאתה כותב קוד, תשאל אותי: מה הטקסט שאני רוצה להציג? באיזה צבעים לגליץ'? כמה חזק ומהיר האפקט צריך להיות? האם להוסיף קווי סריקה (scanlines) של מסך ישן? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"magnetic",title:"Magnetic Button",titleHe:"כפתור מגנטי",description:"A button that follows the cursor with a magnetic pull effect when the mouse is nearby.",descriptionHe:"כפתור שנמשך אחרי הסמן באפקט מגנטי כאשר העכבר בקרבת מקום.",categories:["button","cursor"],tags:[{label:"magnetic"},{label:"button"},{label:"cursor"},{label:"hover"}],difficulty:"intermediate",previewComponent:"magnetic",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Magnetic Button</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .magnetic-wrap {
    position: relative; padding: 60px;
  }
  .magnetic-btn {
    position: relative;
    padding: 18px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; background: transparent;
    border: 2px solid rgba(108, 99, 255, 0.7);
    border-radius: 50px; cursor: pointer;
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
                background 0.3s ease, box-shadow 0.3s ease;
    will-change: transform;
  }
  .magnetic-btn:hover {
    background: rgba(108, 99, 255, 0.15);
    box-shadow: 0 0 30px rgba(108, 99, 255, 0.25);
  }
  .magnetic-btn span {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
</style>
</head>
<body>
  <div class="magnetic-wrap" id="wrap">
    <button class="magnetic-btn" id="btn">
      <span id="btnText">Hover Me</span>
    </button>
  </div>

  <script>
    const wrap = document.getElementById('wrap');
    const btn = document.getElementById('btn');
    const btnText = document.getElementById('btnText');
    const strength = 40;
    const textStrength = 20;

    wrap.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 150;

      if (dist < maxDist) {
        const pull = 1 - dist / maxDist;
        btn.style.transform =
          \`translate(\${dx * pull * 0.4}px, \${dy * pull * 0.4}px)\`;
        btnText.style.transform =
          \`translate(\${dx * pull * 0.2}px, \${dy * pull * 0.2}px)\`;
      }
    });

    wrap.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btnText.style.transform = 'translate(0, 0)';
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכפתור "מרגיש" את העכבר כשהוא מתקרב. הקוד מחשב כל הזמן את המרחק בין הסמן למרכז הכפתור, וככל שהסמן קרוב יותר — הכפתור נמשך אליו חזק יותר, כמו מגנט. הטקסט בתוך הכפתור זז קצת פחות מהכפתור עצמו, מה שנותן תחושת עומק. כשהעכבר עוזב, הכפתור חוזר בצורה חלקה למקומו.</p>`,proTipHe:"הוסיפו אפקט scale קל ב-hover כדי להעצים את תחושת המגנטיות.",promptHe:"אני רוצה כפתור מגנטי — כפתור שנמשך לכיוון העכבר כשמתקרבים אליו, כמו מגנט. לפני שאתה כותב קוד, תשאל אותי: מה הטקסט בכפתור? מה הצבע והסגנון שלו (מלא, שקוף, עם מסגרת)? כמה חזקה המשיכה צריכה להיות? האם להוסיף אפקטים נוספים ב-hover כמו זוהר או הגדלה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"aurora",title:"Aurora Background",titleHe:"רקע אורורה",description:"A dreamy aurora borealis background using animated CSS gradients with hue-rotate for continuous color shifts.",descriptionHe:"רקע אורורה חלומי באמצעות גרדיאנטים מונפשים עם hue-rotate לשינויי צבע רציפים.",categories:["background"],tags:[{label:"aurora"},{label:"gradient"},{label:"background"}],difficulty:"beginner",previewComponent:"aurora",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Aurora Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: #050510; font-family: sans-serif;
  }
  .aurora {
    position: fixed; inset: 0; z-index: 0;
    filter: blur(80px) saturate(1.5);
    animation: hueShift 12s ease-in-out infinite;
  }
  .aurora .blob {
    position: absolute; border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  .blob:nth-child(1) {
    width: 60vw; height: 60vh;
    top: -15%; left: -10%;
    background: radial-gradient(circle, rgba(0,255,128,0.4), transparent 70%);
    animation-duration: 10s;
  }
  .blob:nth-child(2) {
    width: 50vw; height: 50vh;
    top: 20%; right: -10%;
    background: radial-gradient(circle, rgba(80,120,255,0.4), transparent 70%);
    animation-duration: 14s;
    animation-delay: -3s;
  }
  .blob:nth-child(3) {
    width: 45vw; height: 45vh;
    bottom: -10%; left: 25%;
    background: radial-gradient(circle, rgba(200,50,255,0.35), transparent 70%);
    animation-duration: 12s;
    animation-delay: -5s;
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(40px, -30px) scale(1.05); }
    66%      { transform: translate(-20px, 20px) scale(0.95); }
  }
  @keyframes hueShift {
    0%, 100% { filter: blur(80px) saturate(1.5) hue-rotate(0deg); }
    50%      { filter: blur(80px) saturate(1.8) hue-rotate(40deg); }
  }
  .content {
    position: relative; z-index: 1;
    color: #fff; text-align: center;
  }
  .content h1 { font-size: 3rem; margin-bottom: 0.5rem; }
  .content p  { opacity: 0.7; font-size: 1.1rem; }
</style>
</head>
<body>
  <div class="aurora">
    <div class="blob"></div>
    <div class="blob"></div>
    <div class="blob"></div>
  </div>
  <div class="content">
    <h1>Aurora</h1>
    <p>A dreamy animated background</p>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>שלושה כתמי צבע גדולים (ירוק, כחול וסגול) זזים לאט ברקע. טשטוש חזק מאוד ממזג אותם ביחד ככה שנראה כמו אורורה אמיתית ולא עיגולים נפרדים. בנוסף, הצבעים משתנים לאט לאורך זמן — ככה שהרקע כל הזמן חי ונושם.</p>`,proTipHe:"הוסיפו blob רביעי עם צבע חם כמו כתום כדי ליצור אורורה עשירה יותר.",promptHe:"אני רוצה רקע אורורה (Aurora) לאתר שלי — כתמי צבע שזזים ומשתנים לאט, כמו זוהר צפוני. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים אני רוצה? כמה כתמי צבע? באיזה קצב הם צריכים לזוז ולהשתנות? האם יש תוכן (טקסט, לוגו) שצריך לשבת מעל הרקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"noise",title:"Noise Glass Card",titleHe:"כרטיס noise זכוכית",description:"A glass-morphism card with an SVG noise texture filter for a frosted, grainy aesthetic.",descriptionHe:"כרטיס בסגנון זכוכית עם מסנן טקסטורת רעש SVG למראה חלבי ומגורען.",categories:["card","background"],tags:[{label:"glass"},{label:"noise"},{label:"card"},{label:"frosted"}],difficulty:"intermediate",previewComponent:"noise",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Noise Glass Card</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    font-family: sans-serif;
  }
  .scene {
    position: relative;
    width: 380px;
  }
  .orb {
    position: absolute; border-radius: 50%; filter: blur(60px);
  }
  .orb-1 {
    width: 200px; height: 200px;
    background: rgba(108, 99, 255, 0.5);
    top: -60px; left: -40px;
  }
  .orb-2 {
    width: 160px; height: 160px;
    background: rgba(255, 80, 150, 0.4);
    bottom: -40px; right: -30px;
  }
  .glass-card {
    position: relative;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #fff;
    overflow: hidden;
  }
  .glass-card::before {
    content: '';
    position: absolute; inset: 0;
    filter: url(#noiseFilter);
    opacity: 0.08;
    pointer-events: none;
  }
  .glass-card h2 { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .glass-card p  { font-size: 0.95rem; opacity: 0.8; line-height: 1.6; }
  .glass-card .badge {
    display: inline-block; margin-top: 1.2rem;
    padding: 6px 16px; border-radius: 20px;
    background: rgba(108, 99, 255, 0.25);
    border: 1px solid rgba(108, 99, 255, 0.4);
    font-size: 0.8rem;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65"
        numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </svg>

  <div class="scene">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="glass-card">
      <h2>Glass Card</h2>
      <p>A frosted glass card with a subtle SVG noise texture overlay that gives it a real-world grainy feel.</p>
      <span class="badge">Glassmorphism</span>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכרטיס מטשטש את מה שמאחוריו, מה שנותן לו מראה של זכוכית חלבית. מעליו יש שכבה דקיקה של טקסטורת רעש (גרגר) שנותנת תחושה של זכוכית אמיתית. מאחורי הכרטיס יש כתמי צבע מטושטשים שנראים דרך הזכוכית ונותנים לו את המראה הצבעוני היפה.</p>`,proTipHe:"הגדילו את baseFrequency של ה-feTurbulence כדי לקבל גרגר עדין יותר, או הקטינו אותו לטקסטורה גסה יותר.",promptHe:"אני רוצה כרטיס בסגנון זכוכית (Glassmorphism) עם טקסטורת רעש עדינה — שייראה כמו זכוכית חלבית אמיתית. לפני שאתה כותב קוד, תשאל אותי: מה התוכן בתוך הכרטיס (כותרת, טקסט, כפתור)? מה הצבעים ברקע מאחורי הכרטיס? כמה חזק הטשטוש צריך להיות? האם הכרטיס צריך להיות רספונסיבי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"reveal",title:"Word Reveal",titleHe:"חשיפת מילים",description:"Words reveal one by one as the user scrolls into view using IntersectionObserver.",descriptionHe:"מילים נחשפות אחת אחת כאשר המשתמש גולל לאזור הנראה באמצעות IntersectionObserver.",categories:["text","scroll"],tags:[{label:"reveal"},{label:"scroll"},{label:"text"}],difficulty:"beginner",previewComponent:"reveal",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Word Reveal</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 200vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .reveal-section {
    max-width: 700px; margin: 0 auto;
    padding: 4rem 2rem; line-height: 2.2;
  }
  .reveal-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    margin: 0 4px;
    font-size: 2rem; font-weight: 700;
  }
  .reveal-word.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down to reveal words</div>

  <div class="reveal-section" id="revealBox">
    <span class="reveal-word">Design</span>
    <span class="reveal-word">is</span>
    <span class="reveal-word">not</span>
    <span class="reveal-word">just</span>
    <span class="reveal-word">what</span>
    <span class="reveal-word">it</span>
    <span class="reveal-word">looks</span>
    <span class="reveal-word">like.</span>
    <span class="reveal-word">Design</span>
    <span class="reveal-word">is</span>
    <span class="reveal-word">how</span>
    <span class="reveal-word">it</span>
    <span class="reveal-word">works.</span>
  </div>

  <div class="spacer"></div>

  <script>
    const words = document.querySelectorAll('.reveal-word');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = [...words].indexOf(el);
          setTimeout(() => {
            el.classList.add('visible');
          }, idx * 120);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    words.forEach(word => observer.observe(word));
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל מילה בהתחלה מוסתרת ונמצאת קצת למטה. כשגוללים ומגיעים אליה, היא עולה ומתגלה בצורה חלקה. המילים נחשפות אחת אחרי השנייה בהשהייה קטנה, מה שיוצר אפקט של גל — כאילו המשפט נכתב מול העיניים שלכם.</p>`,proTipHe:"נסו להחליף את translateY ב-translateX או scale כדי לקבל אפקטי כניסה שונים ומעניינים.",promptHe:"אני רוצה אפקט חשיפת מילים (Word Reveal) — שמילים יתגלו אחת אחרי השנייה כשגוללים למטה. לפני שאתה כותב קוד, תשאל אותי: מה הטקסט שצריך להיחשף? באיזה סגנון כניסה (מלמטה, מהצד, fade בלבד)? מה המהירות בין מילה למילה? מה גודל וצבע הפונט? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"spotlight",title:"Spotlight Grid",titleHe:"Spotlight רשת",description:"A grid where a radial gradient spotlight follows the mouse cursor to illuminate nearby cells.",descriptionHe:"רשת שבה ספוטלייט גרדיאנט רדיאלי עוקב אחרי הסמן ומאיר את התאים הקרובים.",categories:["background","cursor"],tags:[{label:"spotlight"},{label:"grid"},{label:"cursor"}],difficulty:"intermediate",previewComponent:"spotlight",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Spotlight Grid</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #050508; font-family: sans-serif;
  }
  .grid-wrap {
    position: relative; padding: 1px;
    border-radius: 16px; overflow: hidden;
  }
  .grid-spotlight {
    position: absolute; inset: 0;
    pointer-events: none; z-index: 1;
    background: radial-gradient(
      300px circle at var(--x, 50%) var(--y, 50%),
      rgba(108, 99, 255, 0.15),
      transparent 70%
    );
    transition: opacity 0.3s;
    opacity: 0;
  }
  .grid-wrap:hover .grid-spotlight { opacity: 1; }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 140px);
    gap: 1px;
    background: rgba(255,255,255,0.06);
    border-radius: 16px; overflow: hidden;
    position: relative; z-index: 0;
  }
  .cell {
    height: 100px;
    background: #0c0c14;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.25); font-size: 0.8rem;
    transition: color 0.3s;
  }
  .grid-wrap:hover .cell { color: rgba(255,255,255,0.5); }
</style>
</head>
<body>
  <div class="grid-wrap" id="gridWrap">
    <div class="grid-spotlight" id="spotlight"></div>
    <div class="grid" id="grid"></div>
  </div>

  <script>
    const grid = document.getElementById('grid');
    const wrap = document.getElementById('gridWrap');
    const spot = document.getElementById('spotlight');

    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = \`\${String(i + 1).padStart(2, '0')}\`;
      grid.appendChild(cell);
    }

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      wrap.style.setProperty('--x', x + 'px');
      wrap.style.setProperty('--y', y + 'px');
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>מעל הרשת יש שכבה שקופה עם עיגול אור שעוקב אחרי העכבר. כשמזיזים את העכבר על הרשת, האור זז איתו ומאיר את התאים שמתחתיו — בדיוק כמו פנס בחדר חשוך. כשהעכבר יוצא מהרשת, האור נעלם בצורה חלקה.</p>`,proTipHe:"שנו את גודל ה-radial-gradient (300px) ואת עוצמת הצבע כדי לשלוט בגודל ובהירות הספוטלייט.",promptHe:"אני רוצה אפקט ספוטלייט על רשת (Spotlight Grid) — רשת של תאים שעליהם עובר אור שעוקב אחרי העכבר. לפני שאתה כותב קוד, תשאל אותי: כמה שורות ועמודות ברשת? מה הצבע של האור? מה גודל עיגול האור? מה יש בתוך כל תא (מספרים, אייקונים, טקסט)? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"typewriter",title:"Typewriter",titleHe:"מכונת כתיבה",description:"A pure CSS typewriter animation using steps() timing and a blinking cursor made with border-right.",descriptionHe:"אנימציית מכונת כתיבה ב-CSS בלבד עם פונקציית steps() וסמן מהבהב באמצעות border-right.",categories:["text"],tags:[{label:"typewriter"},{label:"text"},{label:"CSS-only"}],difficulty:"beginner",previewComponent:"typewriter",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typewriter</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2rem;
    min-height: 100vh; background: #0a0a0a;
    font-family: 'Courier New', Courier, monospace;
  }
  .typewriter-line {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid rgba(108, 99, 255, 0.9);
    font-size: 2rem; color: #fff;
    width: 0;
    animation:
      typing 3s steps(28) 0.5s forwards,
      blink 0.6s step-end infinite;
  }
  .typewriter-line.line-2 {
    font-size: 1.2rem;
    color: rgba(255,255,255,0.5);
    animation:
      typing2 2.5s steps(32) 4s forwards,
      blink 0.6s step-end infinite;
  }
  @keyframes typing {
    from { width: 0; }
    to   { width: 17ch; }
  }
  @keyframes typing2 {
    from { width: 0; }
    to   { width: 32ch; }
  }
  @keyframes blink {
    50% { border-color: transparent; }
  }
  .restart-btn {
    padding: 10px 24px;
    background: rgba(108, 99, 255, 0.15);
    border: 1px solid rgba(108, 99, 255, 0.4);
    border-radius: 8px; color: #fff;
    cursor: pointer; font-family: inherit;
    font-size: 0.9rem;
    transition: background 0.3s;
  }
  .restart-btn:hover {
    background: rgba(108, 99, 255, 0.3);
  }
</style>
</head>
<body>
  <div>
    <div class="typewriter-line" id="line1">Hello, I'm a coder.</div>
    <div class="typewriter-line line-2" id="line2">I build things for the web, daily.</div>
  </div>
  <button class="restart-btn" id="restartBtn">Restart</button>

  <script>
    const btn = document.getElementById('restartBtn');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');

    btn.addEventListener('click', () => {
      [line1, line2].forEach(el => {
        const clone = el.cloneNode(true);
        el.parentNode.replaceChild(clone, el);
      });
      /* re-assign after clone so next restart works */
      document.getElementById('restartBtn').addEventListener('click', arguments.callee);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט כבר קיים בדף אבל מוסתר. האנימציה מרחיבה את הרוחב של האלמנט בצעדים — כל צעד חושף בדיוק תו אחד, מה שנותן תחושה של הקלדה אמיתית. בנוסף יש קו מהבהב בצד ימין שנראה כמו סמן של מכונת כתיבה. השורה השנייה מתחילה רק אחרי שהראשונה נגמרת.</p>`,proTipHe:"כדי שהאפקט יעבוד מושלם, ודאו שמספר ה-steps() תואם בדיוק למספר התווים בטקסט.",promptHe:"אני רוצה אפקט מכונת כתיבה (Typewriter) — טקסט שנכתב תו אחרי תו עם סמן מהבהב. לפני שאתה כותב קוד, תשאל אותי: מה הטקסט שצריך להיכתב? האם יש כמה שורות בזו אחר זו? מה מהירות ההקלדה? האם צריך כפתור להפעלה מחדש? מה הפונט והצבע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"liquid",title:"Liquid Buttons",titleHe:"כפתורים נוזליים",description:"Buttons with an SVG liquid morph effect on hover using feTurbulence and feDisplacementMap filters.",descriptionHe:"כפתורים עם אפקט עיוות נוזלי ב-hover באמצעות פילטרים של feTurbulence ו-feDisplacementMap ב-SVG.",categories:["button"],tags:[{label:"liquid"},{label:"SVG filter"},{label:"button"}],difficulty:"beginner",previewComponent:"liquid",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Liquid Buttons</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    gap: 2rem; flex-wrap: wrap;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .liquid-btn {
    position: relative;
    padding: 16px 42px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; border: none; cursor: pointer;
    border-radius: 50px;
    transition: filter 0.3s ease, transform 0.2s ease;
    will-change: filter;
  }
  .liquid-btn:hover {
    filter: url(#liquid);
    transform: scale(1.05);
  }
  .liquid-btn:active {
    transform: scale(0.97);
  }
  .btn-purple { background: linear-gradient(135deg, #6c63ff, #8b5cf6); }
  .btn-pink   { background: linear-gradient(135deg, #ec4899, #f43f5e); }
  .btn-cyan   { background: linear-gradient(135deg, #06b6d4, #0891b2); }

  .label {
    width: 100%; text-align: center;
    color: #555; font-size: 0.85rem;
    margin-top: -0.5rem;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0">
    <filter id="liquid">
      <feTurbulence type="turbulence" baseFrequency="0.015"
        numOctaves="3" result="turbulence" seed="2">
        <animate attributeName="baseFrequency"
          dur="1.5s" values="0.015;0.04;0.015"
          repeatCount="indefinite" />
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="turbulence"
        scale="14" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </svg>

  <button class="liquid-btn btn-purple">Explore</button>
  <button class="liquid-btn btn-pink">Subscribe</button>
  <button class="liquid-btn btn-cyan">Download</button>
  <p class="label">Hover over the buttons</p>

  <script>
    /* Optional: animate seed for varied turbulence */
    const turb = document.querySelector('feTurbulence');
    let seed = 2;
    setInterval(() => {
      seed = (seed % 100) + 1;
      turb.setAttribute('seed', seed);
    }, 200);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים על הכפתור, פילטר SVG מוסיף עליו תבנית רעש שמזיזה את הפיקסלים שלו — וזה יוצר עיוות שנראה כמו נוזל זז. התבנית משתנה כל הזמן ככה שהכפתור נראה כאילו הוא "רוטט" כמו מים. כשעוזבים את הכפתור, הוא חוזר למצב הרגיל שלו.</p>`,proTipHe:"שנו את scale ב-feDisplacementMap כדי לשלוט בעוצמת העיוות — ערכים גבוהים יותר יוצרים אפקט דרמטי יותר.",promptHe:"אני רוצה כפתורים עם אפקט נוזלי (Liquid Buttons) — כפתורים שמתעוותים כמו נוזל כשמרחפים עליהם. לפני שאתה כותב קוד, תשאל אותי: כמה כפתורים אני צריך ומה הטקסט בכל אחד? מה הצבעים של הכפתורים? כמה חזק העיוות הנוזלי צריך להיות? האם להוסיף אפקט הגדלה ב-hover? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrollring",title:"Scroll Ring",titleHe:"טבעת גלילה",description:"An SVG circle whose stroke fills progressively based on the scroll percentage of the page.",descriptionHe:"מעגל SVG שהקו שלו מתמלא בהדרגה בהתאם לאחוז הגלילה בעמוד.",categories:["scroll"],tags:[{label:"scroll"},{label:"SVG"},{label:"progress"},{label:"ring"}],difficulty:"intermediate",previewComponent:"scrollring",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Ring</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh;
    background: #0a0a0a; font-family: sans-serif;
  }
  .ring-container {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 100;
    width: 72px; height: 72px;
  }
  .ring-svg {
    transform: rotate(-90deg);
    width: 72px; height: 72px;
  }
  .ring-bg {
    fill: none;
    stroke: rgba(255,255,255,0.08);
    stroke-width: 4;
  }
  .ring-progress {
    fill: none;
    stroke: url(#ringGrad);
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 188.5;
    stroke-dashoffset: 188.5;
    transition: stroke-dashoffset 0.15s ease-out;
  }
  .ring-label {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.8rem; font-weight: 600;
  }
  .sections { padding: 2rem; }
  .sections section {
    max-width: 600px; margin: 0 auto 60vh;
    padding: 2rem; color: #ccc;
    border-left: 2px solid rgba(108,99,255,0.3);
    padding-left: 1.5rem;
  }
  .sections h2 { color: #fff; margin-bottom: 0.5rem; font-size: 1.3rem; }
  .sections p  { line-height: 1.7; opacity: 0.7; }
</style>
</head>
<body>
  <div class="ring-container">
    <svg class="ring-svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6c63ff" />
          <stop offset="100%" stop-color="#a855f7" />
        </linearGradient>
      </defs>
      <circle class="ring-bg" cx="32" cy="32" r="30" />
      <circle class="ring-progress" id="ringCircle" cx="32" cy="32" r="30" />
    </svg>
    <div class="ring-label" id="ringLabel">0%</div>
  </div>

  <div class="sections">
    <section><h2>Section 1</h2><p>Scroll down to watch the ring fill up. The stroke-dashoffset of the SVG circle is driven by the scroll percentage.</p></section>
    <section><h2>Section 2</h2><p>The circle has a circumference calculated from its radius. As you scroll, the dashoffset decreases to reveal more of the stroke.</p></section>
    <section><h2>Section 3</h2><p>A linear gradient gives the stroke a nice purple hue that transitions from indigo to violet.</p></section>
    <section><h2>Section 4</h2><p>Keep going — you're almost at 100 percent!</p></section>
  </div>

  <script>
    const circle = document.getElementById('ringCircle');
    const label = document.getElementById('ringLabel');
    const circumference = 2 * Math.PI * 30; /* ~188.5 */

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(scrollTop / docHeight, 1);

      circle.style.strokeDashoffset = circumference * (1 - pct);
      label.textContent = Math.round(pct * 100) + '%';
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש מעגל SVG קבוע בפינת המסך שמראה כמה גללתם בדף. הטריק הוא שהמעגל מצויר עם קו מקווקו שאורכו בדיוק כמו ההיקף של המעגל. כשמזיזים את תחילת הקווקוו, רואים יותר או פחות מהמעגל. הקוד מחשב את אחוז הגלילה ומעדכן את המעגל בהתאם — ככה מקבלים מד התקדמות מעגלי יפה.</p>`,proTipHe:"הוסיפו rotate(-90deg) על ה-SVG כדי שהמילוי יתחיל מלמעלה ולא מהצד הימני.",promptHe:"אני רוצה טבעת גלילה (Scroll Ring) — מעגל קטן קבוע על המסך שמתמלא ככל שגוללים בדף ומראה את אחוז ההתקדמות. לפני שאתה כותב קוד, תשאל אותי: באיזו פינה של המסך לשים את הטבעת? מה הצבע שלה? האם להציג אחוז מספרי במרכז? מה הגודל של הטבעת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"trail",title:"Mouse Trail",titleHe:"שובל עכבר",description:"Creates a smooth trail of fading circles that follow the mouse cursor.",descriptionHe:"יוצר שובל חלק של עיגולים דועכים שעוקבים אחרי סמן העכבר.",categories:["cursor"],tags:[{label:"cursor"},{label:"animation"},{label:"mousemove"}],difficulty:"intermediate",previewComponent:"trail",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    overflow: hidden;
    cursor: none;
  }
  .trail-dot {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle, #a78bfa, #7c3aed);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .hint {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #555; font-family: sans-serif; font-size: 1.2rem;
  }
</style>
</head>
<body>
<p class="hint">הזיזו את העכבר</p>
<script>
  const dots = [];
  const MAX = 20;

  document.addEventListener('mousemove', (e) => {
    createDot(e.clientX, e.clientY);
  });

  function createDot(x, y) {
    const dot = document.createElement('div');
    dot.classList.add('trail-dot');
    const size = 18;
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = (x - size / 2) + 'px';
    dot.style.top = (y - size / 2) + 'px';
    dot.style.opacity = '1';
    document.body.appendChild(dot);
    dots.push(dot);

    requestAnimationFrame(() => {
      dot.style.opacity = '0';
      dot.style.transform = 'scale(0.2)';
    });

    setTimeout(() => {
      dot.remove();
      dots.shift();
    }, 600);

    if (dots.length > MAX) {
      const old = dots.shift();
      old.remove();
    }
  }
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל פעם שמזיזים את העכבר, נוצר עיגול קטן בדיוק במקום הסמן. העיגול מיד מתחיל להתכווץ ולהיעלם בצורה חלקה, וככה נוצר אפקט של שובל שנגרר אחרי העכבר. יש מגבלה של 20 עיגולים בו-זמנית כדי שהדפדפן לא יתחיל לעבוד קשה מדי.</p>`,proTipHe:"אפשר להוסיף צבעים משתנים לכל נקודה באמצעות hsl עם ערך hue שמשתנה לפי הזמן.",promptHe:`אני רוצה אפקט שובל עכבר — שכשמזיזים את העכבר, נוצרים אלמנטים קטנים שנגררים אחרי הסמן ונעלמים בהדרגה. לפני שאתה כותב קוד, תשאל אותי: באיזה צבע או גרדיאנט אתה רוצה את השובל? מה הצורה — עיגולים, כוכבים, או משהו אחר? כמה מהר האלמנטים ייעלמו? כמה אלמנטים יופיעו בו-זמנית? האם הסמן המקורי ייעלם או יישאר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"glass",title:"Glass Cards",titleHe:"כרטיסי זכוכית",description:"Semi-transparent cards with a frosted glass effect using backdrop-filter.",descriptionHe:"כרטיסים שקופים למחצה עם אפקט זכוכית חלבית באמצעות backdrop-filter.",categories:["card","background"],tags:[{label:"glassmorphism"},{label:"CSS"},{label:"backdrop-filter"}],difficulty:"beginner",previewComponent:"glass",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: sans-serif;
  }
  .bg-shapes {
    position: fixed; inset: 0; z-index: 0; overflow: hidden;
  }
  .bg-shapes span {
    position: absolute; border-radius: 50%;
  }
  .bg-shapes span:nth-child(1) {
    width: 300px; height: 300px; background: #ff6b6b; top: -50px; left: 10%;
  }
  .bg-shapes span:nth-child(2) {
    width: 200px; height: 200px; background: #feca57; bottom: 10%; right: 15%;
  }
  .bg-shapes span:nth-child(3) {
    width: 250px; height: 250px; background: #48dbfb; top: 40%; left: 50%;
  }
  .glass-card {
    position: relative; z-index: 1;
    width: 260px; padding: 2rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .glass-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
  .glass-card h3 { font-size: 1.3rem; margin-bottom: 0.8rem; }
  .glass-card p { font-size: 0.95rem; opacity: 0.9; line-height: 1.5; }
  .glass-icon { font-size: 2.5rem; margin-bottom: 0.8rem; }
</style>
</head>
<body>
<div class="bg-shapes"><span></span><span></span><span></span></div>
<div class="glass-card">
  <div class="glass-icon">🎨</div>
  <h3>עיצוב</h3>
  <p>כרטיס זכוכית עם טשטוש רקע ושקיפות</p>
</div>
<div class="glass-card">
  <div class="glass-icon">⚡</div>
  <h3>ביצועים</h3>
  <p>אפקט קל שרץ חלק על כל דפדפן מודרני</p>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכרטיסים האלה נראים כמו זכוכית חלבית — אפשר לראות דרכם את הרקע בצורה מטושטשת. הטריק הוא שילוב של רקע שקוף למחצה עם טשטוש של מה שמאחורה. הצורות הצבעוניות ברקע הן מה שגורם לאפקט להיראות כל כך טוב — בלי רקע מעניין, הטשטוש פחות מרשים.</p>`,proTipHe:"הוסיפו -webkit-backdrop-filter תמיד לצד backdrop-filter כדי לתמוך גם בדפדפני Safari.",promptHe:`אני רוצה כרטיסים בסגנון זכוכית חלבית (glassmorphism) — כרטיסים שקופים למחצה עם טשטוש רקע. לפני שאתה כותב קוד, תשאל אותי: כמה כרטיסים צריך? מה התוכן בכל כרטיס? מה צבעי הרקע? האם צריך אפקט hover? באיזה גודל ופריסה — שורה, רשת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"marquee",title:"Infinite Marquee",titleHe:"מרקי אינסופי",description:"A smooth infinite horizontal scrolling text marquee using pure CSS animation.",descriptionHe:"טקסט נגלל אינסופי וחלק לאורך באמצעות אנימציית CSS בלבד.",categories:["text"],tags:[{label:"marquee"},{label:"CSS animation"},{label:"infinite scroll"}],difficulty:"beginner",previewComponent:"marquee",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 2rem;
    background: #0f0f1a;
    font-family: sans-serif;
    overflow: hidden;
  }
  .marquee-wrapper {
    width: 100%;
    overflow: hidden;
    padding: 1.2rem 0;
    background: linear-gradient(90deg, #1a1a2e, #16213e);
    border-top: 1px solid #333;
    border-bottom: 1px solid #333;
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: scroll-left 12s linear infinite;
  }
  .marquee-wrapper:nth-child(2) .marquee-track {
    animation-direction: reverse;
    animation-duration: 15s;
  }
  .marquee-track span {
    white-space: nowrap;
    font-size: 1.6rem;
    font-weight: 700;
    color: #e2e8f0;
    padding: 0 2.5rem;
    letter-spacing: 0.05em;
  }
  .marquee-track span .highlight {
    color: #a78bfa;
  }
  @keyframes scroll-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  h2 { color: #e2e8f0; font-size: 1.4rem; }
</style>
</head>
<body>
<h2>מרקי אינסופי עם CSS בלבד</h2>
<div class="marquee-wrapper">
  <div class="marquee-track">
    <span>עיצוב ✦ <span class="highlight">פיתוח</span> ✦ יצירתיות ✦ קוד ✦ אנימציה ✦ חדשנות ✦&nbsp;</span>
    <span>עיצוב ✦ <span class="highlight">פיתוח</span> ✦ יצירתיות ✦ קוד ✦ אנימציה ✦ חדשנות ✦&nbsp;</span>
  </div>
</div>
<div class="marquee-wrapper">
  <div class="marquee-track">
    <span>HTML ★ CSS ★ JavaScript ★ React ★ TypeScript ★ Node.js ★&nbsp;</span>
    <span>HTML ★ CSS ★ JavaScript ★ React ★ TypeScript ★ Node.js ★&nbsp;</span>
  </div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה רצועת טקסט שנעה הצידה בלי סוף. הטריק הוא שהתוכן מופיע פעמיים ברצף — כשהעותק הראשון יוצא מהמסך, השני כבר שם ממשיך, וככה נוצרת לולאה אינסופית חלקה. האנימציה מזיזה את הרצועה בדיוק בחצי מהרוחב שלה כדי שהמעבר יהיה בלתי מורגש.</p>`,proTipHe:"כדי שהמרקי יעצור כשהמשתמש מרחף עליו, הוסיפו .marquee-wrapper:hover .marquee-track { animation-play-state: paused; }",promptHe:`אני רוצה אפקט מרקי אינסופי — טקסט או תוכן שנגלל לאורך המסך ברצף בלי סוף. לפני שאתה כותב קוד, תשאל אותי: מה התוכן שיופיע ברצועה — טקסט, לוגואים, אייקונים? כמה שורות צריך? באיזה כיוון לגלול — שמאלה, ימינה, או שורות בכיוונים מנוגדים? מה המהירות? האם לעצור בריחוף? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"morphtext",title:"Morphing Text",titleHe:"מורפינג טקסט",description:"Text that smoothly morphs between different words using opacity transitions.",descriptionHe:"טקסט שמשתנה בצורה חלקה בין מילים שונות עם מעברי שקיפות.",categories:["text"],tags:[{label:"text"},{label:"animation"},{label:"transition"}],difficulty:"intermediate",previewComponent:"morphtext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0f0f1a;
    font-family: sans-serif;
  }
  .morph-container {
    text-align: center;
  }
  .morph-container h2 {
    color: #94a3b8;
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
  .morph-word {
    font-size: 4rem;
    font-weight: 800;
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 1;
    transition: opacity 0.4s ease, transform 0.4s ease;
    display: inline-block;
  }
  .morph-word.out {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  .morph-word.in {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  .morph-dots {
    margin-top: 1.5rem;
    display: flex; gap: 0.5rem; justify-content: center;
  }
  .morph-dots span {
    width: 10px; height: 10px; border-radius: 50%;
    background: #334155;
    transition: background 0.3s;
  }
  .morph-dots span.active {
    background: #a78bfa;
  }
</style>
</head>
<body>
<div class="morph-container">
  <h2>אנחנו בונים אתרים</h2>
  <div class="morph-word" id="word">מדהימים</div>
  <div class="morph-dots" id="dots"></div>
</div>
<script>
  const words = ['מדהימים', 'מהירים', 'יצירתיים', 'מרשימים', 'חכמים'];
  let index = 0;
  const wordEl = document.getElementById('word');
  const dotsEl = document.getElementById('dots');

  words.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsEl.appendChild(dot);
  });
  const dotEls = dotsEl.querySelectorAll('span');

  function morphNext() {
    wordEl.classList.add('out');
    wordEl.classList.remove('in');

    setTimeout(() => {
      index = (index + 1) % words.length;
      wordEl.textContent = words[index];
      dotEls.forEach((d, i) => d.classList.toggle('active', i === index));
      wordEl.classList.remove('out');
      wordEl.classList.add('in');
    }, 400);
  }

  setInterval(morphNext, 2200);
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש כותרת קבועה ומילה אחת שמתחלפת כל כמה שניות עם אנימציה חלקה. המילה הנוכחית נעלמת כלפי מעלה, ואז מילה חדשה מופיעה במקומה. למטה יש נקודות קטנות שמראות באיזו מילה מתוך הרשימה אנחנו נמצאים עכשיו.</p>`,proTipHe:"אפשר להוסיף אפקט blur קל בזמן המעבר עם filter: blur(4px) ב-class out.",promptHe:`אני רוצה אפקט מורפינג טקסט — מילה שמתחלפת בצורה חלקה בתוך משפט. לפני שאתה כותב קוד, תשאל אותי: מה המשפט הקבוע ומה רשימת המילים שמתחלפות? באיזה סגנון אנימציה — דעיכה, החלקה, סיבוב? כמה זמן כל מילה תישאר על המסך? מה הצבעים והגופן? האם צריך נקודות מחוון למטה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"tilt",title:"3D Tilt Card",titleHe:"כרטיס הטיה 3D",description:"A card that tilts in 3D following the mouse position using perspective transforms.",descriptionHe:"כרטיס שנוטה בתלת-ממד בעקבות מיקום העכבר באמצעות טרנספורמציות פרספקטיבה.",categories:["card","hover"],tags:[{label:"3D"},{label:"perspective"},{label:"hover"},{label:"transform"}],difficulty:"advanced",previewComponent:"tilt",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0f0f1a;
    font-family: sans-serif;
    perspective: 1000px;
  }
  .tilt-card {
    width: 320px; height: 400px;
    background: linear-gradient(145deg, #1e1b4b, #312e81);
    border-radius: 20px;
    padding: 2rem;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    color: #e2e8f0;
    transform-style: preserve-3d;
    transition: transform 0.1s ease;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }
  .tilt-card::before {
    content: '';
    position: absolute;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(167,139,250,0.3), transparent);
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tilt-card:hover::before { opacity: 1; }
  .tilt-icon { font-size: 3.5rem; transform: translateZ(40px); margin-bottom: 1rem; }
  .tilt-title { font-size: 1.6rem; font-weight: 700; transform: translateZ(30px); margin-bottom: 0.5rem; }
  .tilt-desc { text-align: center; opacity: 0.8; transform: translateZ(20px); line-height: 1.6; }
</style>
</head>
<body>
<div class="tilt-card" id="card">
  <div class="tilt-icon">🚀</div>
  <div class="tilt-title">כרטיס 3D</div>
  <p class="tilt-desc">הזיזו את העכבר מעל הכרטיס כדי לראות את אפקט ההטיה התלת-ממדי</p>
</div>
<script>
  const card = document.getElementById('card');
  const MAX_TILT = 15;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -MAX_TILT;
    const rotateY = ((x - centerX) / centerX) * MAX_TILT;

    card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

    const before = card.querySelector('::before') || card;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0)';
  });
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכרטיס הזה מגיב לתנועת העכבר ונוטה לכיוון שבו נמצא הסמן, מה שיוצר תחושת תלת-ממד. הקוד מחשב כמה רחוק העכבר מהמרכז של הכרטיס ומתרגם את זה לזוויות הטיה. האלמנטים בתוך הכרטיס ממוקמים ב"גבהים" שונים כדי ליצור תחושת עומק, כאילו הם צפים אחד מעל השני.</p>`,proTipHe:"הוסיפו אפקט אור עם pseudo-element radial-gradient שעוקב אחרי העכבר כדי לשפר את התחושה התלת-ממדית.",promptHe:`אני רוצה כרטיס עם אפקט הטיה תלת-ממדית — כרטיס שנוטה לכיוון העכבר כשמרחפים עליו. לפני שאתה כותב קוד, תשאל אותי: מה התוכן בכרטיס — טקסט, תמונה, אייקון? מה הגודל והצבעים? כמה חזקה ההטיה צריכה להיות? האם צריך אפקט אור שעוקב אחרי העכבר? האם צריך אפקט עומק (פרלקס) בין שכבות התוכן? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"neontext",title:"Neon Text",titleHe:"טקסט ניאון",description:"Glowing neon text effect with pulsating multi-layered text-shadow animations.",descriptionHe:"אפקט טקסט ניאון זוהר עם אנימציית הבהוב רב-שכבתית של text-shadow.",categories:["text"],tags:[{label:"neon"},{label:"glow"},{label:"text-shadow"}],difficulty:"intermediate",previewComponent:"neontext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 3rem;
    background: #0a0a0a;
    font-family: sans-serif;
  }
  .neon {
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    animation: neon-pulse 2s ease-in-out infinite alternate;
  }
  .neon-blue {
    color: #4fc3f7;
    text-shadow:
      0 0 7px #4fc3f7,
      0 0 10px #4fc3f7,
      0 0 21px #4fc3f7,
      0 0 42px #0288d1,
      0 0 82px #0288d1,
      0 0 92px #0288d1;
  }
  .neon-pink {
    color: #f48fb1;
    text-shadow:
      0 0 7px #f48fb1,
      0 0 10px #f48fb1,
      0 0 21px #f48fb1,
      0 0 42px #c2185b,
      0 0 82px #c2185b,
      0 0 92px #c2185b;
    animation-delay: 0.5s;
  }
  .neon-green {
    color: #69f0ae;
    text-shadow:
      0 0 7px #69f0ae,
      0 0 10px #69f0ae,
      0 0 21px #69f0ae,
      0 0 42px #00c853,
      0 0 82px #00c853,
      0 0 92px #00c853;
    animation-delay: 1s;
  }
  @keyframes neon-pulse {
    from {
      text-shadow:
        0 0 7px currentColor,
        0 0 10px currentColor,
        0 0 21px currentColor,
        0 0 42px currentColor,
        0 0 82px currentColor;
      opacity: 1;
    }
    to {
      text-shadow:
        0 0 4px currentColor,
        0 0 7px currentColor,
        0 0 12px currentColor,
        0 0 20px currentColor,
        0 0 40px currentColor;
      opacity: 0.85;
    }
  }
  .subtitle {
    color: #555; font-size: 1rem;
    text-align: center; margin-top: -1.5rem;
  }
</style>
</head>
<body>
<div class="neon neon-blue">שלום עולם</div>
<div class="neon neon-pink">אפקט ניאון</div>
<div class="neon neon-green">CSS בלבד</div>
<p class="subtitle">אנימציית text-shadow עם שכבות זוהר מרובות</p>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט נראה כמו שלט ניאון אמיתי שזוהר בחושך. האפקט נוצר על ידי כמה שכבות של צל טקסט — שכבות קרובות בצבע בהיר ושכבות רחוקות בצבע כהה יותר — מה שיוצר הילה של זוהר. אנימציה עדינה משנה את עוצמת הזוהר כדי לדמות את ההבהוב של ניאון אמיתי, וכל שורה מתחילה בזמן קצת שונה כדי שזה ייראה טבעי.</p>`,proTipHe:"הוסיפו אפקט flicker ריאליסטי על ידי שינוי ה-opacity באקראי עם keyframes מרובים.",promptHe:`אני רוצה אפקט טקסט ניאון זוהר — טקסט שנראה כמו שלט ניאון על רקע כהה. לפני שאתה כותב קוד, תשאל אותי: מה הטקסט שצריך להופיע? באילו צבעים — כחול, ורוד, ירוק, או אחרים? האם צריך אנימציית הבהוב או פעימה? כמה שורות טקסט? האם הרקע כהה או שצריך להוסיף רקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"particlesbg",title:"Particles Network",titleHe:"רשת חלקיקים",description:"An animated canvas background with floating particles connected by lines.",descriptionHe:"רקע קנבס מונפש עם חלקיקים צפים שמחוברים בקווים ביניהם.",categories:["background"],tags:[{label:"canvas"},{label:"particles"},{label:"animation"},{label:"background"}],difficulty:"advanced",previewComponent:"particlesbg",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #0a0a1a; overflow: hidden; }
  canvas { display: block; }
  .overlay-text {
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    color: #e2e8f0; font-family: sans-serif;
    text-align: center; z-index: 1;
    pointer-events: none;
  }
  .overlay-text h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .overlay-text p { opacity: 0.6; font-size: 1rem; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<div class="overlay-text">
  <h1>רשת חלקיקים</h1>
  <p>רקע אינטראקטיבי עם Canvas 2D</p>
</div>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const COUNT = 80;
  const MAX_DIST = 120;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      r: Math.random() * 2 + 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 139, 250, 0.8)';
      ctx.fill();

      for (let j = i + 1; j < COUNT; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = \`rgba(167, 139, 250, \${1 - dist / MAX_DIST})\`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>על המסך יש עשרות נקודות קטנות שצפות לאט לכל הכיוונים. כשנקודה מתקרבת לנקודה אחרת, נוצר ביניהן קו מחבר — ככל שהן קרובות יותר, הקו בולט יותר. זה יוצר מראה של רשת דינמית שכל הזמן משתנה. הכול מצויר על קנבס עם 60 פריימים בשנייה כדי שהתנועה תהיה חלקה.</p>`,proTipHe:"הוסיפו אינטראקציה עם העכבר על ידי הוספת חלקיק מיוחד שמיקומו תמיד במקום הסמן.",promptHe:`אני רוצה רקע אנימטיבי של רשת חלקיקים — נקודות שצפות ומתחברות בקווים כשהן קרובות. לפני שאתה כותב קוד, תשאל אותי: כמה חלקיקים צריך? מה הצבע שלהם ושל הקווים? באיזה מרחק נוצר קו מחבר? האם צריך אינטראקציה עם העכבר? מה צבע הרקע? האם יש טקסט שצריך להופיע מעל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"gradientborder",title:"Gradient Border",titleHe:"גבול גרדיאנט",description:"Animated gradient border on cards using a rotating conic-gradient pseudo-element.",descriptionHe:"גבול גרדיאנט מונפש על כרטיסים באמצעות pseudo-element עם conic-gradient מסתובב.",categories:["card","hover"],tags:[{label:"gradient"},{label:"border"},{label:"animation"}],difficulty:"intermediate",previewComponent:"gradientborder",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    background: #0a0a1a;
    font-family: sans-serif;
  }
  .gradient-card {
    position: relative;
    width: 280px; height: 200px;
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .gradient-card::before {
    content: '';
    position: absolute;
    width: 200%; height: 200%;
    top: -50%; left: -50%;
    background: conic-gradient(
      from 0deg,
      #a78bfa, #f472b6, #fb923c, #34d399, #60a5fa, #a78bfa
    );
    animation: spin 3s linear infinite;
  }
  .gradient-card::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: #13131f;
    border-radius: 14px;
  }
  .gradient-card .content {
    position: relative;
    z-index: 1;
    color: #e2e8f0;
    text-align: center;
    padding: 1.5rem;
  }
  .gradient-card .content h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }
  .gradient-card .content p {
    font-size: 0.9rem;
    opacity: 0.7;
    line-height: 1.5;
  }
  .gradient-card:hover::before {
    animation-duration: 1.5s;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }
</style>
</head>
<body>
<div class="gradient-card">
  <div class="content">
    <div class="card-icon">✨</div>
    <h3>גבול מסתובב</h3>
    <p>הגבול מסתובב ומאיץ כשמרחפים</p>
  </div>
</div>
<div class="gradient-card">
  <div class="content">
    <div class="card-icon">🎯</div>
    <h3>גרדיאנט קוני</h3>
    <p>שימוש ב-conic-gradient ו-pseudo-element</p>
  </div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>סביב הכרטיס יש גבול צבעוני שמסתובב כל הזמן. הטריק הוא שיש שכבה ענקית עם גרדיאנט עגול שמסתובבת מאחורי הכרטיס, ושכבה כהה שמכסה את הפנים ומשאירה רק רצועה דקה של 3 פיקסלים גלויה — וזה הגבול. כשמרחפים על הכרטיס, הסיבוב מואץ ליצירת אפקט דינמי.</p>`,proTipHe:"אפשר לשנות את עובי הגבול על ידי שינוי ערך ה-inset ב-::after, למשל 2px לגבול דק יותר.",promptHe:`אני רוצה כרטיס עם גבול גרדיאנט מסתובב — גבול צבעוני שמסתובב סביב הכרטיס ברצף. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הגרדיאנט? מה עובי הגבול? מה התוכן בכרטיס? כמה כרטיסים צריך? מה צריך לקרות בריחוף — האצת הסיבוב, שינוי צבע? מה הרקע של הכרטיס מבפנים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"countup",title:"Count Up",titleHe:"ספירה עולה",description:"Animated number counter that starts when the element scrolls into view.",descriptionHe:"ספירת מספרים מונפשת שמתחילה כשהאלמנט נכנס לתצוגה בגלילה.",categories:["text","scroll"],tags:[{label:"counter"},{label:"IntersectionObserver"},{label:"animation"}],difficulty:"beginner",previewComponent:"countup",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 200vh;
    background: #0f0f1a;
    font-family: sans-serif;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .stats {
    display: flex; justify-content: center; gap: 3rem;
    flex-wrap: wrap;
    padding: 4rem 2rem;
    background: linear-gradient(180deg, #13131f, #1a1a2e);
    border-top: 1px solid #222;
    border-bottom: 1px solid #222;
  }
  .stat-item {
    text-align: center;
    min-width: 140px;
  }
  .stat-number {
    font-size: 3.5rem;
    font-weight: 800;
    color: #a78bfa;
    font-variant-numeric: tabular-nums;
  }
  .stat-number::after {
    content: attr(data-suffix);
    font-size: 2rem;
  }
  .stat-label {
    margin-top: 0.5rem;
    color: #94a3b8;
    font-size: 1rem;
  }
</style>
</head>
<body>
<div class="spacer">⬇ גללו למטה כדי לראות את האפקט ⬇</div>
<section class="stats" id="stats">
  <div class="stat-item">
    <div class="stat-number" data-target="1500" data-suffix="+">0</div>
    <div class="stat-label">לקוחות מרוצים</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="98" data-suffix="%">0</div>
    <div class="stat-label">שביעות רצון</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="350" data-suffix="">0</div>
    <div class="stat-label">פרויקטים</div>
  </div>
  <div class="stat-item">
    <div class="stat-number" data-target="12" data-suffix="">0</div>
    <div class="stat-label">שנות ניסיון</div>
  </div>
</section>
<script>
  const numbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCount(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numbers.forEach((n) => animateCount(n));
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('stats'));
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשגוללים למטה והמספרים נכנסים למסך, הם מתחילים לספור מאפס עד הערך הסופי עם אנימציה חלקה. הספירה מתחילה מהר ומאטה לקראת הסוף כדי שזה ייראה טבעי. הכול קורה רק פעם אחת — גם אם גוללים חזרה למעלה ושוב למטה, הספירה לא מתחילה מחדש.</p>`,proTipHe:"אפשר להשתמש ב-CSS pseudo-element ::after עם content: attr(data-suffix) כדי להוסיף את הסימן בלי JavaScript.",promptHe:`אני רוצה אפקט ספירה עולה — מספרים שסופרים מאפס עד ערך מסוים כשהמשתמש גולל אליהם. לפני שאתה כותב קוד, תשאל אותי: כמה מספרים צריך ומה הערכים? מה הכיתוב מתחת לכל מספר? האם צריך סימנים כמו %, + וכדומה? כמה זמן הספירה צריכה לקחת? מה סגנון העיצוב — צבעים, גופנים, רקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"splitscroll",title:"Split Scroll",titleHe:"גלילה מפוצלת",description:"A split-screen layout where left and right columns scroll at different speeds.",descriptionHe:"פריסת מסך מפוצל שבה העמודות גוללות במהירויות שונות.",categories:["scroll"],tags:[{label:"scroll"},{label:"sticky"},{label:"layout"},{label:"parallax"}],difficulty:"advanced",previewComponent:"splitscroll",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: sans-serif;
    background: #0f0f1a;
    color: #e2e8f0;
  }
  .split-container {
    display: flex;
    min-height: 100vh;
  }
  .split-left {
    width: 50%;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #1e1b4b, #312e81);
  }
  .split-left-content {
    text-align: center;
    padding: 2rem;
  }
  .split-left-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .split-left-content p {
    color: #94a3b8;
    font-size: 1.1rem;
    line-height: 1.6;
  }
  .split-right {
    width: 50%;
  }
  .split-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    border-bottom: 1px solid #1e293b;
  }
  .split-section:nth-child(1) { background: #0f172a; }
  .split-section:nth-child(2) { background: #1a1a2e; }
  .split-section:nth-child(3) { background: #162032; }
  .split-section:nth-child(4) { background: #1a1028; }
  .section-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 2rem;
    max-width: 380px;
    text-align: center;
  }
  .section-card .num {
    font-size: 3rem;
    font-weight: 800;
    color: #a78bfa;
    margin-bottom: 0.5rem;
  }
  .section-card h3 { font-size: 1.3rem; margin-bottom: 0.8rem; }
  .section-card p { color: #94a3b8; line-height: 1.6; font-size: 0.95rem; }
</style>
</head>
<body>
<div class="split-container">
  <div class="split-left">
    <div class="split-left-content">
      <h1>גלילה מפוצלת</h1>
      <p>הצד השמאלי נשאר קבוע בזמן<br>שהצד הימני גולל</p>
    </div>
  </div>
  <div class="split-right">
    <div class="split-section">
      <div class="section-card">
        <div class="num">01</div>
        <h3>תכנון</h3>
        <p>שלב ראשון של כל פרויקט מצליח הוא תכנון מדויק של המטרות והיעדים</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">02</div>
        <h3>עיצוב</h3>
        <p>עיצוב ממשק משתמש מודרני ונקי שמתמקד בחוויית המשתמש</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">03</div>
        <h3>פיתוח</h3>
        <p>כתיבת קוד נקי ויעיל עם טכנולוגיות מתקדמות ומעודכנות</p>
      </div>
    </div>
    <div class="split-section">
      <div class="section-card">
        <div class="num">04</div>
        <h3>השקה</h3>
        <p>בדיקות מקיפות והשקה מוצלחת של המוצר הסופי ללקוח</p>
      </div>
    </div>
  </div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>המסך מחולק לשני חצאים. הצד השמאלי נשאר קבוע במקום כל הזמן, בעוד הצד הימני גולל כרגיל עם תוכן שמחולק לסקשנים. הטריק הוא שהצד השמאלי "דביק" — הוא נצמד לחלק העליון של המסך ולא זז גם כשגוללים. זה נפוץ מאוד באתרי תדמית ודפי נחיתה.</p>`,proTipHe:"אפשר להוסיף IntersectionObserver שמחליף את התוכן בצד השמאלי בהתאם לסקשן הנוכחי בצד הימני.",promptHe:`אני רוצה פריסת גלילה מפוצלת — מסך מחולק לשניים, צד אחד קבוע וצד שני גולל. לפני שאתה כותב קוד, תשאל אותי: מה התוכן בצד הקבוע — כותרת, תמונה, לוגו? כמה סקשנים בצד הגולל ומה התוכן שלהם? באיזה צד הגלילה — ימין או שמאל? מה הצבעים והסגנון? האם התוכן בצד הקבוע צריך להשתנות בהתאם לסקשן הנוכחי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"scrollvideo",title:"Scroll Video",titleHe:"סרטון גלילה",description:"Frame-by-frame video playback driven by scroll position",descriptionHe:"הפעלת וידאו פריים-אחר-פריים לפי מיקום הגלילה — עובד על כל הדפדפנים כולל מובייל",categories:["scroll"],tags:[{label:"scroll"},{label:"video"},{label:"canvas"},{label:"mobile"}],difficulty:"advanced",previewComponent:"scrollvideo",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Video</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; }
    .scroll-video-section {
      height: calc(var(--frame-count, 60) * 20px + 100dvh);
      position: relative;
    }
    @supports not (height: 100dvh) {
      .scroll-video-section {
        height: calc(var(--frame-count, 60) * 20px + 100vh);
      }
    }
    .scroll-video-sticky {
      position: sticky; top: 0;
      height: 100dvh;
      display: flex; align-items: center; justify-content: center;
      overflow: hidden; background: #000;
    }
    @supports not (height: 100dvh) {
      .scroll-video-sticky { height: 100vh; }
    }
    #scrollCanvas {
      max-width: 100%; max-height: 100%;
      width: auto; height: auto;
      display: block; will-change: contents;
    }
    .scroll-video-loader {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 3px; background: rgba(255,255,255,0.1);
    }
    .scroll-video-loader-fill {
      height: 100%; background: #c8f53b;
      width: 0%; transition: width 0.3s;
    }
    #scrollCanvas.loading { opacity: 0; }
    #scrollCanvas.ready { opacity: 1; transition: opacity 0.4s; }
  </style>
</head>
<body>
  <div class="scroll-video-section" id="scrollVideoSection">
    <div class="scroll-video-sticky">
      <canvas id="scrollCanvas" class="loading"></canvas>
      <div class="scroll-video-loader">
        <div class="scroll-video-loader-fill" id="loaderFill"></div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    'use strict';
    var FRAME_URLS = [
      /* הדבק כאן את מערך ה-URL של הפריימים */
    ];
    var TOTAL = FRAME_URLS.length;
    var canvas = document.getElementById('scrollCanvas');
    var ctx = canvas.getContext('2d');
    var section = document.getElementById('scrollVideoSection');
    var loader = document.getElementById('loaderFill');
    var imgs = [], cur = 0, ticking = false;

    function setVh() {
      document.documentElement.style.setProperty('--vh', innerHeight * 0.01 + 'px');
      section.style.setProperty('--frame-count', TOTAL);
    }
    setVh();
    addEventListener('orientationchange', setVh);

    function preload() {
      imgs = FRAME_URLS.map(function(u) {
        var i = new Image(); i.crossOrigin = 'anonymous'; i.src = u; return i;
      });
      Promise.all(imgs.slice(0, 10).map(function(i) {
        return i.decode ? i.decode().catch(function(){}) :
          new Promise(function(r) { i.onload = r; i.onerror = r; });
      })).then(function() {
        if (imgs[0].naturalWidth) {
          canvas.width = imgs[0].naturalWidth;
          canvas.height = imgs[0].naturalHeight;
        }
        fit(); ctx.drawImage(imgs[0], 0, 0);
        canvas.classList.replace('loading', 'ready');
        loader.style.width = '100%';
      });
    }

    function fit() {
      if (!canvas.width) return;
      var r = canvas.width / canvas.height;
      if (innerWidth / innerHeight > r) {
        canvas.style.height = innerHeight + 'px';
        canvas.style.width = Math.round(innerHeight * r) + 'px';
      } else {
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = Math.round(innerWidth / r) + 'px';
      }
    }

    var rt;
    addEventListener('orientationchange', function() {
      clearTimeout(rt);
      rt = setTimeout(function() { fit(); draw(cur); }, 200);
    });

    function draw(i) {
      var m = imgs[i];
      if (!m || !m.complete || !m.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(m, 0, 0);
    }

    function sched() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        var rect = section.getBoundingClientRect();
        var total = section.offsetHeight - innerHeight;
        var p = total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
        var f = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
        if (f !== cur) { cur = f; draw(cur); }
        ticking = false;
      });
    }

    addEventListener('scroll', sched, { passive: true });
    addEventListener('touchmove', sched, { passive: true });
    preload();
  })();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>במקום להפעיל וידאו רגיל, הסרטון כאן מורכב מתמונות נפרדות (פריימים) שמוצגות אחת אחרי השנייה לפי כמה גללתם בדף. ככל שגוללים למטה, רואים את הפריים הבא — בדיוק כמו שאפל עושים בדפי המוצרים שלהם. הקנבס נשאר קבוע על המסך בזמן שהדף גולל מאחוריו.</p>`,proTipHe:"השתמש בכלי היצירה המובנה כדי לחלץ פריימים מוידאו ולהעלות אותם אוטומטית. שמור על 40-60 פריימים לביצועים מיטביים.",promptHe:`אני רוצה אפקט סרטון גלילה — וידאו שמתקדם פריים אחרי פריים לפי מיקום הגלילה בדף. לפני שאתה כותב קוד, תשאל אותי: מאיזה וידאו לחלץ את הפריימים, או שיש כבר תמונות מוכנות? כמה פריימים בערך? האם הסרטון צריך לתפוס את כל המסך? האם צריך פס טעינה? האם צריך לתמוך במובייל ומגע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"ripplebutton",title:"Ripple Button",titleHe:"כפתור גלים",description:"Click ripple effect expanding from click point.",descriptionHe:"אפקט גלים שמתפשט מנקודת הלחיצה על הכפתור.",categories:["button"],tags:[{label:"ripple"},{label:"button"},{label:"click"}],difficulty:"beginner",previewComponent:"ripplebutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Ripple Button</title>
<!-- Ripple Button — Click triggers an expanding circle from the click point -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 1.5rem;
  }
  .ripple-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer; overflow: hidden;
    transition: transform 0.2s ease;
  }
  .ripple-btn:active { transform: scale(0.97); }
  .ripple-btn .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    transform: scale(0);
    animation: ripple-expand 0.6s ease-out forwards;
    pointer-events: none;
  }
  @keyframes ripple-expand {
    to {
      transform: scale(4); /* expand to 4x the initial size */
      opacity: 0;
    }
  }
</style>
</head>
<body>
  <button class="ripple-btn" id="btn1">לחץ עליי</button>
  <button class="ripple-btn" id="btn2" style="background: linear-gradient(135deg, #ec4899, #f43f5e);">כפתור שני</button>

  <script>
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height);

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (x - size / 2) + 'px';
        ripple.style.top = (y - size / 2) + 'px';

        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשלוחצים על הכפתור, נוצר עיגול בדיוק במקום שבו לחצתם — כמו גל במים. העיגול מתפשט החוצה, הולך ונעלם, ואז מתנקה מעצמו. זה בדיוק האפקט שגוגל משתמשת בו בכפתורים שלהם, והוא נותן תחושה נעימה של פידבק ללחיצה.</p>`,proTipHe:"שנו את צבע ה-ripple ואת ערך ה-scale הסופי כדי להתאים לסגנון העיצוב שלכם.",promptHe:`אני רוצה ליצור כפתור עם אפקט גלים (Ripple) באתר שלי. כשלוחצים על הכפתור, יופיע עיגול שמתפשט מנקודת הלחיצה ונעלם.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שיהיה על הכפתור?
2. מה צבע הרקע של הכפתור?
3. מה צבע הגל שמתפשט (לבן שקוף, או צבע אחר)?
4. מה הגודל של הכפתור (קטן, בינוני, גדול)?
5. כמה מהר הגל צריך להתפשט ולהיעלם?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"borderbeam",title:"Border Beam",titleHe:"קרן גבול",description:"Animated light beam travels around button border.",descriptionHe:"קרן אור מונפשת שנוסעת לאורך גבול הכפתור.",categories:["button"],tags:[{label:"border"},{label:"beam"},{label:"glow"}],difficulty:"intermediate",previewComponent:"borderbeam",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Border Beam</title>
<!-- Border Beam — A glowing beam of light orbits the button border continuously -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .beam-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff; background: #111;
    border: none; border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
  }
  .beam-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    padding: 2px; /* border thickness */
    background: conic-gradient(
      from var(--beam-angle, 0deg),
      transparent 0%,
      transparent 70%,
      #6c63ff 78%,
      #a78bfa 85%,
      transparent 92%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: beam-rotate 2.5s linear infinite; /* full orbit duration */
  }
  .beam-btn::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 16px;
    background: conic-gradient(
      from var(--beam-angle, 0deg),
      transparent 0%,
      transparent 72%,
      rgba(108, 99, 255, 0.25) 80%,
      transparent 90%
    );
    filter: blur(8px);
    z-index: -1;
    animation: beam-rotate 2.5s linear infinite;
  }
  @keyframes beam-rotate {
    to { --beam-angle: 360deg; }
  }
  @property --beam-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .beam-btn span { position: relative; z-index: 1; }
</style>
</head>
<body>
  <button class="beam-btn"><span>קרן גבול</span></button>
  <button class="beam-btn" style="border-radius: 50px; padding: 16px 40px;">
    <span>כפתור עגול</span>
  </button>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>קרן אור זוהרת מסתובבת ברציפות לאורך המסגרת של הכפתור, כמו אור שרץ על הקצוות. האפקט נוצר על ידי גרדיאנט עגול (כמו שעון) שמסתובב 360 מעלות, וחותכים ממנו את הפנים כך שרק המסגרת נשארת גלויה. בנוסף, יש זוהר רך שעוקב אחרי הקרן כדי לתת תחושה של אור אמיתי.</p>`,proTipHe:"שנו את אחוזי השקיפות ב-conic-gradient כדי לשלוט באורך הקרן — אחוז קטן יותר יוצר קרן קצרה וחדה יותר.",promptHe:`אני רוצה ליצור כפתור עם אפקט קרן גבול (Border Beam) באתר שלי. קרן אור זוהרת שמסתובבת לאורך מסגרת הכפתור ברציפות.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. מה צבע הרקע של הכפתור?
3. מה צבע הקרן הזוהרת?
4. מה המהירות של הסיבוב (איטי ועדין, או מהיר ודינמי)?
5. מה עובי המסגרת שבה הקרן רצה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"shinybutton",title:"Shiny Button",titleHe:"כפתור מבריק",description:"Shine reflection sweeps on hover like metal.",descriptionHe:"ברק שעובר על הכפתור בריחוף כמו משטח מתכתי.",categories:["button","hover"],tags:[{label:"shine"},{label:"hover"},{label:"button"}],difficulty:"beginner",previewComponent:"shinybutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Shiny Button</title>
<!-- Shiny Button — Metallic shine sweeps across the button on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .shiny-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 600;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%);
    border: none; border-radius: 12px;
    cursor: pointer; overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }
  .shiny-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(108, 99, 255, 0.3);
  }
  .shiny-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; /* width of the shine band */
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0) 70%,
      transparent 100%
    );
    transition: none;
    pointer-events: none;
  }
  .shiny-btn:hover::before {
    animation: shine-sweep 0.7s ease-out forwards;
  }
  @keyframes shine-sweep {
    from { left: -100%; }
    to   { left: 130%; } /* travel full width plus overflow */
  }
  .shiny-btn span { position: relative; z-index: 1; }
</style>
</head>
<body>
  <button class="shiny-btn"><span>כפתור מבריק</span></button>
  <button class="shiny-btn" style="background: linear-gradient(135deg, #ec4899, #f43f5e); border-radius: 50px;">
    <span>ברק מתכתי</span>
  </button>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים עם העכבר מעל הכפתור, פס של אור לבן עובר על פניו מצד לצד — כמו ברק שמשתקף ממשטח מתכתי מבריק. הפס מתחיל מחוץ לכפתור, עובר על כל השטח, ונעלם מהצד השני. הכפתור מסתיר את מה שחורג מהגבולות שלו, ככה שהאפקט נראה חלק ומדויק.</p>`,proTipHe:"שנו את הזווית של ה-linear-gradient (120deg) ואת רוחב פס האור כדי ליצור אפקטי ברק שונים.",promptHe:`אני רוצה ליצור כפתור עם אפקט ברק מבריק (Shiny Button) באתר שלי. כשמרחפים על הכפתור, פס של אור עובר עליו כמו השתקפות ממשטח מתכתי.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. מה צבע הרקע של הכפתור?
3. מה צבע הברק (לבן, או צבע אחר)?
4. באיזו מהירות הברק צריך לעבור?
5. האם הכפתור עגול (pill) או עם פינות מעוגלות?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"splitbutton",title:"Split Button",titleHe:"כפתור מפוצל",description:"Button splits in half on hover revealing content.",descriptionHe:"כפתור שנפצל לשני חלקים בריחוף וחושף תוכן מוסתר.",categories:["button","hover"],tags:[{label:"split"},{label:"hover"},{label:"reveal"}],difficulty:"advanced",previewComponent:"splitbutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split Button</title>
<!-- Split Button — Button halves split apart on hover revealing hidden content -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .split-btn {
    position: relative;
    width: 220px; height: 56px;
    cursor: pointer;
    border: none; background: transparent;
  }
  .split-half {
    position: absolute;
    width: 100%; height: 50%;
    left: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    color: #fff; font-weight: 700; font-size: 1rem;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                border-radius 0.4s ease;
  }
  .split-top {
    top: 0;
    border-radius: 12px 12px 0 0;
    clip-path: inset(0 0 0 0); /* top half text crop */
  }
  .split-bottom {
    top: 50%;
    border-radius: 0 0 12px 12px;
    clip-path: inset(0 0 0 0);
  }
  .split-half span {
    position: absolute;
    white-space: nowrap;
  }
  .split-top span { bottom: 0; transform: translateY(50%); }
  .split-bottom span { top: 0; transform: translateY(-50%); }
  .split-btn:hover .split-top {
    transform: translateY(-10px) rotateX(-8deg);
    border-radius: 12px;
  }
  .split-btn:hover .split-bottom {
    transform: translateY(10px) rotateX(8deg);
    border-radius: 12px;
  }
  .split-reveal {
    position: absolute;
    inset: 0;
    display: flex; align-items: center; justify-content: center;
    color: #a78bfa; font-size: 0.85rem; font-weight: 600;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
    pointer-events: none;
  }
  .split-btn:hover .split-reveal { opacity: 1; }
</style>
</head>
<body>
  <div class="split-btn" role="button" tabindex="0">
    <div class="split-half split-top"><span>לחץ כאן</span></div>
    <div class="split-half split-bottom"><span>לחץ כאן</span></div>
    <div class="split-reveal">✦ תוכן מוסתר ✦</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכפתור הזה מורכב בעצם משני חצאים — עליון ותחתון — שנראים כמו כפתור אחד רגיל. כשמרחפים עליו, החצי העליון עולה למעלה והתחתון יורד למטה, ובתווך נחשף תוכן מוסתר. הטקסט בכל חצי ממוקם בדיוק כך שבמצב רגיל הוא נראה כמו מילה אחת שלמה, וההפרדה יוצרת אפקט דרמטי ומפתיע.</p>`,proTipHe:"הוסיפו perspective על האלמנט ההורה לקבלת אפקט 3D מודגש יותר בפיצול.",promptHe:`אני רוצה ליצור כפתור מפוצל (Split Button) באתר שלי. כשמרחפים על הכפתור, הוא נפצל לשני חלקים ונחשף תוכן מוסתר מאחוריו.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור (הטקסט הראשי שנראה לפני הפיצול)?
2. מה התוכן שנחשף אחרי הפיצול?
3. מה הצבעים של הכפתור?
4. מה הגודל של הכפתור?
5. לאיזה כיוון הכפתור צריך להיפצל (למעלה-למטה או לצדדים)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"morphbutton",title:"Morph Button",titleHe:"כפתור מורף",description:"Button morphs shape on hover (pill to square to pill).",descriptionHe:"כפתור שמשנה צורה בריחוף — מגלולה לריבוע ובחזרה.",categories:["button"],tags:[{label:"morph"},{label:"shape"},{label:"animation"}],difficulty:"intermediate",previewComponent:"morphbutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Morph Button</title>
<!-- Morph Button — Smoothly transitions between pill and square shapes on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .morph-btn {
    position: relative;
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none;
    border-radius: 50px; /* pill shape */
    cursor: pointer;
    transition:
      border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
      box-shadow 0.4s ease,
      padding 0.4s ease;
    box-shadow: 0 4px 20px rgba(108, 99, 255, 0.2);
  }
  .morph-btn:hover {
    border-radius: 8px; /* square-ish shape */
    transform: scale(1.08);
    box-shadow: 0 8px 40px rgba(108, 99, 255, 0.35);
    padding: 18px 52px;
  }
  .morph-btn:active {
    transform: scale(0.95);
    border-radius: 20px; /* mid-morph */
  }
  .morph-btn .icon {
    display: inline-block;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .morph-btn:hover .icon {
    transform: rotate(90deg) scale(1.2);
  }
  .label-text {
    display: inline-block;
    transition: letter-spacing 0.4s ease;
  }
  .morph-btn:hover .label-text {
    letter-spacing: 2px;
  }
</style>
</head>
<body>
  <button class="morph-btn">
    <span class="icon">▶</span>
    <span class="label-text">הפעל</span>
  </button>
  <button class="morph-btn" style="background: linear-gradient(135deg, #06b6d4, #0891b2);">
    <span class="icon">⬇</span>
    <span class="label-text">הורד</span>
  </button>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים על הכפתור, הוא משנה צורה בצורה חלקה — מגלולה עגולה לריבוע עם פינות מעוגלות. במקביל הכפתור קצת גדל, האייקון מסתובב, והרווח בין האותיות גדל. כל השינויים האלה קורים ביחד עם תנועה קפיצית קלה, מה שיוצר תחושה חיה ודינמית.</p>`,proTipHe:"נסו ערכי cubic-bezier שונים כמו (0.68, -0.55, 0.27, 1.55) לאפקטי תנועה שונים.",promptHe:`אני רוצה ליצור כפתור מורף (Morph Button) באתר שלי. כשמרחפים עליו הוא משנה צורה בצורה חלקה מגלולה לריבוע ובחזרה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. האם יש אייקון ליד הטקסט? אם כן, איזה?
3. מה הצבעים של הכפתור (רקע, טקסט)?
4. מה הצורה ההתחלתית (גלולה, ריבוע מעוגל, עיגול)?
5. מה הצורה שהכפתור ישתנה אליה בריחוף?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"glitchbutton",title:"Glitch Button",titleHe:"כפתור גליץ'",description:"RGB split glitch on hover.",descriptionHe:"פיצול RGB ואפקט גליץ' בריחוף על הכפתור.",categories:["button","hover"],tags:[{label:"glitch"},{label:"RGB"},{label:"hover"}],difficulty:"intermediate",previewComponent:"glitchbutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glitch Button</title>
<!-- Glitch Button — RGB split and chromatic aberration glitch on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .glitch-btn {
    position: relative;
    padding: 18px 56px;
    font-size: 1.2rem; font-weight: 700;
    color: #fff; letter-spacing: 4px;
    background: #111; border: 2px solid #333;
    cursor: pointer;
    text-transform: uppercase;
  }
  .glitch-btn::before,
  .glitch-btn::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    padding: 18px 56px;
    background: #111;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }
  .glitch-btn::before {
    color: #0ff; /* cyan channel */
    border: 2px solid #0ff;
    z-index: -1;
  }
  .glitch-btn::after {
    color: #f0f; /* magenta channel */
    border: 2px solid #f0f;
    z-index: -1;
  }
  .glitch-btn:hover::before {
    opacity: 0.8;
    animation: glitch-r 0.3s steps(2) infinite;
  }
  .glitch-btn:hover::after {
    opacity: 0.8;
    animation: glitch-b 0.3s steps(2) infinite;
  }
  .glitch-btn:hover {
    animation: glitch-skew 0.5s steps(4) infinite;
  }
  @keyframes glitch-r {
    0%   { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); }
    25%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
    50%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -1px); }
    75%  { clip-path: inset(50% 0 20% 0); transform: translate(3px, 1px); }
    100% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 3px); }
  }
  @keyframes glitch-b {
    0%   { clip-path: inset(50% 0 20% 0); transform: translate(4px, -1px); }
    25%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
    50%  { clip-path: inset(70% 0 5% 0); transform: translate(3px, 1px); }
    75%  { clip-path: inset(30% 0 40% 0); transform: translate(-3px, -2px); }
    100% { clip-path: inset(5% 0 75% 0); transform: translate(2px, -3px); }
  }
  @keyframes glitch-skew {
    0%  { transform: skew(0deg); }
    25% { transform: skew(-2deg); }
    50% { transform: skew(1deg); }
    75% { transform: skew(-1deg); }
    100% { transform: skew(0deg); }
  }
</style>
</head>
<body>
  <button class="glitch-btn" data-text="GLITCH">GLITCH</button>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים על הכפתור, הוא נראה כאילו יש בו תקלה דיגיטלית — הטקסט "מתפצל" לשכבות בצבעים שונים (ציאן ומגנטה) שזזות לכיוונים שונים. החלקים הצבעוניים מופיעים ונעלמים באופן קופצני ולא חלק, מה שמחזק את התחושה של באג או שיבוש במסך. הכפתור גם קצת מתעוות הצידה, כאילו המסך "רוטט".</p>`,proTipHe:"הגדילו את ערכי ה-translate לגליץ' אגרסיבי יותר, או הקטינו אותם לאפקט עדין.",promptHe:`אני רוצה ליצור כפתור עם אפקט גליץ' (Glitch Button) באתר שלי. כשמרחפים עליו, הוא נראה כאילו יש תקלה דיגיטלית עם פיצול צבעים.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. מה צבע הרקע של הכפתור?
3. מה הצבעים של שכבות הגליץ' (ציאן ומגנטה, או צבעים אחרים)?
4. כמה חזק האפקט צריך להיות (עדין או אגרסיבי)?
5. האם האפקט רק בריחוף, או גם באנימציה רציפה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"elasticbutton",title:"Elastic Button",titleHe:"כפתור אלסטי",description:"Button stretches elastically on click with spring back.",descriptionHe:"כפתור שנמתח בצורה אלסטית בלחיצה וקופץ בחזרה כמו גומי.",categories:["button"],tags:[{label:"elastic"},{label:"spring"},{label:"click"}],difficulty:"advanced",previewComponent:"elasticbutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Elastic Button</title>
<!-- Elastic Button — Button stretches and bounces like rubber on click -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .elastic-btn {
    padding: 16px 48px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer;
    transform-origin: center center;
    will-change: transform;
  }
  .elastic-btn.bounce {
    animation: elastic-bounce 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  @keyframes elastic-bounce {
    0%   { transform: scale(1, 1); }
    10%  { transform: scale(1.15, 0.85); } /* squash horizontally */
    20%  { transform: scale(0.85, 1.15); } /* stretch vertically */
    30%  { transform: scale(1.1, 0.9); }
    40%  { transform: scale(0.95, 1.05); }
    50%  { transform: scale(1.05, 0.95); }
    60%  { transform: scale(0.98, 1.02); }
    70%  { transform: scale(1.02, 0.98); }
    80%  { transform: scale(0.99, 1.01); }
    90%  { transform: scale(1.01, 0.99); }
    100% { transform: scale(1, 1); }
  }
  .elastic-btn:active {
    transform: scale(0.9, 1.1);
  }
  .hint { color: #555; font-size: 0.85rem; }
</style>
</head>
<body>
  <button class="elastic-btn" id="btn1">לחץ עליי</button>
  <button class="elastic-btn" id="btn2" style="background: linear-gradient(135deg, #f97316, #ef4444);">
    כפתור שני
  </button>
  <p class="hint">לחצו על הכפתורים</p>

  <script>
    document.querySelectorAll('.elastic-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        this.classList.remove('bounce');
        void this.offsetWidth; /* force reflow to restart animation */
        this.classList.add('bounce');
      });
      btn.addEventListener('animationend', function() {
        this.classList.remove('bounce');
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשלוחצים על הכפתור, הוא מתנהג כמו כדור גומי — נמעך לרוחב, קופץ לגובה, ואז ממשיך לקפוץ בתנודות שהולכות ונחלשות עד שהוא חוזר לצורה הרגילה. זה עובד על עיקרון אנימציה קלאסי שנקרא "מעיכה ומתיחה" — כשהכפתור מתרחב בכיוון אחד, הוא מתכווץ בכיוון השני, מה שנותן תחושה של חומר אמיתי וגמיש.</p>`,proTipHe:"הגדילו את ערכי ה-scale הראשונים (1.15/0.85) לאלסטיות דרמטית יותר.",promptHe:`אני רוצה ליצור כפתור אלסטי (Elastic Button) באתר שלי. כשלוחצים עליו הוא נמתח ומקפיץ כמו גומי.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. מה הצבעים של הכפתור?
3. מה הגודל של הכפתור?
4. כמה חזקה האלסטיות צריכה להיות (עדינה או מוגזמת)?
5. האם האפקט מופעל בלחיצה, בריחוף, או בשניהם?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"confettibutton",title:"Confetti Button",titleHe:"כפתור קונפטי",description:"Click triggers confetti particles burst.",descriptionHe:"לחיצה מפעילה פיצוץ של חלקיקי קונפטי צבעוניים.",categories:["button"],tags:[{label:"confetti"},{label:"particles"},{label:"celebration"}],difficulty:"intermediate",previewComponent:"confettibutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Confetti Button</title>
<!-- Confetti Button — Click spawns colorful confetti particles that burst and fall -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    overflow: hidden;
  }
  .confetti-btn {
    position: relative;
    padding: 18px 56px;
    font-size: 1.2rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    border: none; border-radius: 14px;
    cursor: pointer;
    transition: transform 0.2s;
    z-index: 1;
  }
  .confetti-btn:active { transform: scale(0.95); }
  .confetti {
    position: fixed;
    width: 10px; height: 10px;
    pointer-events: none;
    z-index: 0;
    animation: confetti-fall 1.2s ease-out forwards;
  }
  @keyframes confetti-fall {
    0% {
      opacity: 1;
      transform: translate(0, 0) rotate(0deg) scale(1);
    }
    100% {
      opacity: 0;
      transform:
        translate(var(--dx), var(--dy))
        rotate(var(--rot))
        scale(0.3);
    }
  }
</style>
</head>
<body>
  <button class="confetti-btn" id="confettiBtn">🎉 חגיגה!</button>

  <script>
    const btn = document.getElementById('confettiBtn');
    const colors = ['#6c63ff', '#f43f5e', '#fbbf24', '#34d399', '#60a5fa', '#f472b6'];
    const PARTICLE_COUNT = 30; /* number of particles per burst */

    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const el = document.createElement('div');
        el.className = 'confetti';

        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT;
        const velocity = 80 + Math.random() * 120; /* px travel distance */
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 40; /* bias upward */
        const rot = (Math.random() * 720 - 360) + 'deg';

        el.style.left = cx + 'px';
        el.style.top = cy + 'px';
        el.style.setProperty('--dx', dx + 'px');
        el.style.setProperty('--dy', dy + 'px');
        el.style.setProperty('--rot', rot);
        el.style.background = colors[i % colors.length];
        el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        el.style.width = (6 + Math.random() * 8) + 'px';
        el.style.height = (6 + Math.random() * 8) + 'px';
        el.style.animationDuration = (0.8 + Math.random() * 0.6) + 's';

        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
      }
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשלוחצים על הכפתור, מתפרצים ממנו עשרות חלקיקי קונפטי צבעוניים לכל הכיוונים — כמו זיקוקים של חגיגה. כל חלקיק עף לכיוון אחר, מסתובב, ונעלם בהדרגה. החלקיקים באים בצורות שונות (עיגולים וריבועים), בגדלים שונים, ובצבעים שונים, מה שיוצר אפקט טבעי ושמח. אחרי שהאנימציה נגמרת, כל חלקיק מתנקה אוטומטית.</p>`,proTipHe:"שנו את PARTICLE_COUNT ואת velocity כדי לשלוט בעוצמת הפיצוץ.",promptHe:`אני רוצה ליצור כפתור עם אפקט קונפטי (Confetti Button) באתר שלי. כשלוחצים עליו, מתפרצים חלקיקים צבעוניים לכל הכיוונים.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור?
2. מה הצבעים של הכפתור עצמו?
3. אילו צבעים לקונפטי (רשימת צבעים ספציפיים, או צבעי קשת)?
4. כמה חלקיקים בכל פיצוץ (מעט ועדין, או הרבה ומרשים)?
5. האם הקונפטי צריך ליפול למטה כמו כוח משיכה, או פשוט להתפזר ולהיעלם?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"successbutton",title:"Success Button",titleHe:"כפתור הצלחה",description:"Click triggers checkmark animation and success message.",descriptionHe:"לחיצה מפעילה אנימציית וי ירוק והודעת הצלחה שנכנסת.",categories:["button"],tags:[{label:"success"},{label:"checkmark"},{label:"feedback"}],difficulty:"beginner",previewComponent:"successbutton",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Success Button</title>
<!-- Success Button — Click morphs button into a success checkmark with animated stroke -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .success-btn {
    position: relative;
    min-width: 200px; height: 56px;
    padding: 0 32px;
    font-size: 1.1rem; font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, #6c63ff, #8b5cf6);
    border: none; border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .success-btn.done {
    background: #10b981;
    min-width: 56px;
    border-radius: 50%;
    padding: 0;
  }
  .success-btn .label {
    transition: opacity 0.2s, transform 0.3s;
  }
  .success-btn.done .label {
    opacity: 0;
    transform: scale(0.5);
  }
  .check-svg {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 28px; height: 28px;
    opacity: 0;
    transition: opacity 0.3s ease 0.3s;
  }
  .success-btn.done .check-svg { opacity: 1; }
  .check-path {
    fill: none; stroke: #fff; stroke-width: 3;
    stroke-linecap: round; stroke-linejoin: round;
    stroke-dasharray: 30;   /* total path length */
    stroke-dashoffset: 30;  /* fully hidden */
    transition: stroke-dashoffset 0.4s ease 0.4s;
  }
  .success-btn.done .check-path {
    stroke-dashoffset: 0; /* fully drawn */
  }
  .msg {
    margin-top: 1rem;
    color: #10b981; font-weight: 600;
    opacity: 0; transform: translateY(10px);
    transition: all 0.4s ease 0.6s;
  }
  .msg.show {
    opacity: 1; transform: translateY(0);
  }
</style>
</head>
<body>
  <div style="text-align: center;">
    <button class="success-btn" id="successBtn">
      <span class="label">שלח</span>
      <svg class="check-svg" viewBox="0 0 24 24">
        <polyline class="check-path" points="4 12 10 18 20 6" />
      </svg>
    </button>
    <div class="msg" id="msg">✓ הפעולה הושלמה בהצלחה!</div>
  </div>

  <script>
    const btn = document.getElementById('successBtn');
    const msg = document.getElementById('msg');

    btn.addEventListener('click', () => {
      if (btn.classList.contains('done')) return;
      btn.classList.add('done');
      msg.classList.add('show');

      setTimeout(() => {
        btn.classList.remove('done');
        msg.classList.remove('show');
      }, 2500); /* reset after 2.5 seconds */
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשלוחצים על הכפתור, הוא מתכווץ מכפתור רגיל לעיגול ירוק קטן, ואז סימן וי מצטייר בתוכו בהדרגה — כאילו מישהו מצייר אותו ביד. מתחת לכפתור מופיעה הודעת הצלחה. הכל קורה בשרשרת — קודם הטקסט נעלם, אז הכפתור מתכווץ לעיגול, אז הוי מצטייר, ואז ההודעה עולה. אחרי כמה שניות הכל חוזר למצב הרגיל.</p>`,proTipHe:"הוסיפו מצב loading עם ספינר לפני ההצלחה כדי ליצור תהליך שלם של submit > loading > success.",promptHe:`אני רוצה ליצור כפתור הצלחה (Success Button) באתר שלי. כשלוחצים עליו, הוא הופך לעיגול ירוק עם סימן וי מונפש והודעת הצלחה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט על הכפתור לפני הלחיצה?
2. מה הודעת ההצלחה שתופיע?
3. מה הצבעים (צבע הכפתור הרגיל, וצבע ההצלחה)?
4. כמה זמן ההודעה תישאר לפני שהכפתור חוזר למצב רגיל?
5. האם להוסיף גם מצב טעינה (ספינר) לפני ההצלחה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"hoverreveal",title:"Hover Reveal",titleHe:"חשיפת hover",description:"Hidden content slides up from behind element on hover.",descriptionHe:"תוכן מוסתר שמחליק למעלה מאחורי האלמנט בריחוף.",categories:["hover","card"],tags:[{label:"hover"},{label:"reveal"},{label:"card"}],difficulty:"beginner",previewComponent:"hoverreveal",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Hover Reveal</title>
<!-- Hover Reveal — Hidden overlay content slides up from behind the card on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 2rem;
  }
  .reveal-card {
    position: relative;
    width: 260px; height: 200px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    background: linear-gradient(145deg, #1e1b4b, #312e81);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .reveal-front {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.8rem;
    color: #e2e8f0;
    padding: 1.5rem;
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 1;
  }
  .reveal-front .icon { font-size: 2.5rem; }
  .reveal-front h3 { font-size: 1.2rem; }
  .reveal-card:hover .reveal-front {
    opacity: 0;
    transform: translateY(-20px);
  }
  .reveal-back {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 0.8rem;
    padding: 1.5rem;
    color: #e2e8f0;
    background: linear-gradient(145deg, #312e81, #4c1d95);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 2;
  }
  .reveal-card:hover .reveal-back {
    transform: translateY(0);
  }
  .reveal-back p {
    font-size: 0.9rem;
    line-height: 1.6;
    text-align: center;
    opacity: 0.85;
  }
  .reveal-back .cta {
    padding: 8px 24px;
    border-radius: 8px;
    background: rgba(108, 99, 255, 0.3);
    border: 1px solid rgba(108, 99, 255, 0.5);
    color: #fff; font-size: 0.85rem; font-weight: 600;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="reveal-card">
    <div class="reveal-front">
      <span class="icon">🚀</span>
      <h3>רחף עליי</h3>
    </div>
    <div class="reveal-back">
      <p>תוכן מוסתר שנחשף בריחוף עם אנימציה חלקה</p>
      <button class="cta">גלה עוד</button>
    </div>
  </div>
  <div class="reveal-card">
    <div class="reveal-front">
      <span class="icon">✨</span>
      <h3>רחף גם עליי</h3>
    </div>
    <div class="reveal-back">
      <p>האפקט משתמש ב-translateY וב-cubic-bezier לתנועה קפיצית</p>
      <button class="cta">לפרטים</button>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש לנו כרטיס עם שתי שכבות — חזית ואחורה. בדרך כלל רואים רק את החזית (אייקון וכותרת). כשמרחפים על הכרטיס, החזית נעלמת כלפי מעלה, ובמקומה עולה שכבה אחורית מלמטה עם תוכן נוסף וכפתור. התנועה קפיצית קלות, כאילו השכבה "נזרקת" למעלה, מה שנותן תחושה חיה ומהנה.</p>`,proTipHe:"נסו לשנות את כיוון הכניסה — translateX במקום translateY ליצירת חשיפה אופקית.",promptHe:`אני רוצה ליצור כרטיס עם אפקט חשיפה בריחוף (Hover Reveal) באתר שלי. כשמרחפים על הכרטיס, תוכן מוסתר מחליק ונחשף.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן שמוצג בחזית הכרטיס (אייקון, כותרת)?
2. מה התוכן שנחשף בריחוף (טקסט, כפתור, קישור)?
3. מה הצבעים של הכרטיס (רקע חזית, רקע אחורי)?
4. מה הגודל של הכרטיס?
5. מאיזה כיוון התוכן המוסתר צריך להיכנס (מלמטה, מהצד, מלמעלה)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"tooltipfancy",title:"Fancy Tooltip",titleHe:"טולטיפ מעוצב",description:"Animated tooltip with arrow, fade + scale entrance.",descriptionHe:"טולטיפ מונפש עם חץ, כניסה של fade ו-scale.",categories:["hover","interaction"],tags:[{label:"tooltip"},{label:"hover"},{label:"UI"}],difficulty:"beginner",previewComponent:"tooltipfancy",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Fancy Tooltip</title>
<!-- Fancy Tooltip — Animated tooltip with arrow, fade and scale entrance -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 3rem;
  }
  .tooltip-wrap {
    position: relative;
    display: inline-block;
  }
  .tooltip-trigger {
    padding: 12px 32px;
    font-size: 1rem; font-weight: 600;
    color: #e2e8f0;
    background: #1a1a2e;
    border: 1px solid #333;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.3s;
  }
  .tooltip-trigger:hover { border-color: #6c63ff; }
  .tooltip-bubble {
    position: absolute;
    bottom: calc(100% + 12px); /* gap above trigger */
    left: 50%;
    transform: translateX(-50%) scale(0.85);
    padding: 10px 18px;
    background: #6c63ff;
    color: #fff;
    font-size: 0.85rem; font-weight: 500;
    white-space: nowrap;
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
  }
  .tooltip-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #6c63ff; /* arrow pointing down */
  }
  .tooltip-wrap:hover .tooltip-bubble {
    opacity: 1;
    transform: translateX(-50%) scale(1);
    pointer-events: auto;
  }
  /* Bottom variant */
  .tooltip-bubble.bottom {
    bottom: auto;
    top: calc(100% + 12px);
    transform-origin: top center;
  }
  .tooltip-bubble.bottom::after {
    top: auto; bottom: 100%;
    border-top-color: transparent;
    border-bottom-color: #6c63ff;
  }
</style>
</head>
<body>
  <div class="tooltip-wrap">
    <button class="tooltip-trigger">רחף למעלה</button>
    <div class="tooltip-bubble">✨ טולטיפ מונפש עם חץ!</div>
  </div>

  <div class="tooltip-wrap">
    <button class="tooltip-trigger">רחף למטה</button>
    <div class="tooltip-bubble bottom">📌 טולטיפ מלמטה</div>
  </div>

  <div class="tooltip-wrap">
    <button class="tooltip-trigger">עוד טולטיפ</button>
    <div class="tooltip-bubble" style="background: #ec4899; box-shadow: 0 8px 24px rgba(236,72,153,0.3);">
      💡 צבע מותאם אישית
      <span style="position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#ec4899;"></span>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים על אלמנט, מופיעה בועה קטנה מעליו (או מתחתיו) עם טקסט הסבר וחץ שמצביע על האלמנט. הבועה לא פשוט מופיעה — היא גדלה קצת תוך כדי ונכנסת עם תנועה קפיצית עדינה, מה שנותן תחושה חיה ונעימה. החץ נוצר רק עם CSS בלי תמונות, וההכל עובד בלי JavaScript בכלל.</p>`,proTipHe:"הוסיפו transition-delay קצר (0.1s) כדי שהטולטיפ לא יופיע מיד ויימנע מהבזקים מיותרים.",promptHe:`אני רוצה ליצור טולטיפ מעוצב (Fancy Tooltip) באתר שלי. כשמרחפים על אלמנט, מופיעה בועת הסבר מונפשת עם חץ.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שיהיה בטולטיפ?
2. על איזה אלמנט הטולטיפ יופיע (כפתור, אייקון, טקסט)?
3. מאיזה כיוון הטולטיפ יופיע (מעל, מתחת, מהצד)?
4. מה הצבעים של הטולטיפ (רקע וטקסט)?
5. האם צריך כמה טולטיפים בדף או רק אחד?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"toggleswitch",title:"Toggle Switch",titleHe:"מתג מונפש",description:"Custom toggle switch with fluid animation.",descriptionHe:"מתג מותאם אישית עם אנימציה נוזלית וחלקה.",categories:["interaction"],tags:[{label:"toggle"},{label:"switch"},{label:"UI"}],difficulty:"beginner",previewComponent:"toggleswitch",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Toggle Switch</title>
<!-- Toggle Switch — Custom animated toggle with stretchy knob and color transition -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    gap: 3rem; flex-direction: column;
  }
  .toggle-row {
    display: flex; align-items: center; gap: 1rem;
    color: #94a3b8; font-size: 0.95rem;
  }
  .toggle {
    position: relative;
    width: 56px; height: 30px;
    cursor: pointer;
  }
  .toggle input {
    opacity: 0; width: 0; height: 0;
    position: absolute;
  }
  .track {
    position: absolute; inset: 0;
    background: #333;
    border-radius: 15px; /* pill shape */
    transition: background 0.4s ease;
  }
  .toggle input:checked + .track {
    background: #6c63ff;
  }
  .knob {
    position: absolute;
    top: 3px; left: 3px;
    width: 24px; height: 24px;
    background: #fff;
    border-radius: 50%;
    transition:
      left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      width 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  }
  .toggle input:checked ~ .knob {
    left: 29px; /* 56 - 24 - 3 = 29 */
  }
  .toggle:active .knob {
    width: 30px; /* stretch the knob on press */
  }
  .toggle input:checked + .track + .knob {
    /* knob shifts accounting for stretch */
  }
  .toggle:active input:checked ~ .knob {
    left: 23px; /* compensate for wider knob */
  }
  .status {
    font-weight: 600;
    min-width: 40px;
    transition: color 0.3s;
  }
</style>
</head>
<body>
  <div class="toggle-row">
    <span>התראות</span>
    <label class="toggle">
      <input type="checkbox" checked />
      <div class="track"></div>
      <div class="knob"></div>
    </label>
    <span class="status" id="s1">פועל</span>
  </div>
  <div class="toggle-row">
    <span>מצב כהה</span>
    <label class="toggle">
      <input type="checkbox" />
      <div class="track"></div>
      <div class="knob"></div>
    </label>
    <span class="status" id="s2">כבוי</span>
  </div>

  <script>
    document.querySelectorAll('.toggle input').forEach((input, i) => {
      const statusEl = document.getElementById('s' + (i + 1));
      input.addEventListener('change', () => {
        statusEl.textContent = input.checked ? 'פועל' : 'כבוי';
        statusEl.style.color = input.checked ? '#6c63ff' : '#94a3b8';
      });
      /* init */
      statusEl.style.color = input.checked ? '#6c63ff' : '#94a3b8';
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>מתג הפעלה/כיבוי מעוצב שעובד כמו מתג באייפון. מאחורי הקלעים יש צ'קבוקס רגיל שמוסתר, ומעליו בנוי העיצוב המותאם. כשלוחצים, הכדור הלבן זז מצד לצד עם תנועה קפיצית, הרקע משנה צבע, והכדור אפילו נמתח קצת בזמן הלחיצה כאילו הוא נדחס. המתג גם נגיש — אפשר להפעיל אותו עם מקלדת.</p>`,proTipHe:"הוסיפו אייקונים של שמש וירח בתוך ה-track ליצירת מתג dark mode מקצועי.",promptHe:`אני רוצה ליצור מתג מונפש (Toggle Switch) באתר שלי. מתג הפעלה/כיבוי מעוצב עם אנימציה חלקה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התווית ליד המתג (למשל: "התראות", "מצב כהה")?
2. מה הצבע כשהמתג דולק?
3. מה הצבע כשהמתג כבוי?
4. מה הגודל של המתג (קטן, בינוני, גדול)?
5. האם צריך להציג טקסט סטטוס ליד המתג (פועל/כבוי)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"inputfloat",title:"Float Label Input",titleHe:"שדה float label",description:"Label floats up when input focused.",descriptionHe:"תווית שצפה למעלה כשהשדה מקבל פוקוס.",categories:["interaction"],tags:[{label:"input"},{label:"form"},{label:"label"}],difficulty:"beginner",previewComponent:"inputfloat",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Float Label Input</title>
<!-- Float Label Input — Label text animates upward when the input receives focus -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .form-group {
    display: flex; flex-direction: column; gap: 1.5rem;
    width: 320px;
  }
  .float-field {
    position: relative;
  }
  .float-field input {
    width: 100%;
    padding: 18px 16px 8px;
    font-size: 1rem;
    color: #e2e8f0;
    background: #111;
    border: 2px solid #333;
    border-radius: 10px;
    outline: none;
    transition: border-color 0.3s ease;
    font-family: inherit;
  }
  .float-field input:focus {
    border-color: #6c63ff;
  }
  .float-field label {
    position: absolute;
    left: 16px; top: 50%;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #666;
    pointer-events: none;
    transition:
      top 0.25s ease,
      font-size 0.25s ease,
      color 0.25s ease;
  }
  .float-field input:focus + label,
  .float-field input:not(:placeholder-shown) + label {
    top: 10px;
    font-size: 0.75rem;
    color: #6c63ff;
  }
  .float-field .line {
    position: absolute;
    bottom: 0; left: 50%;
    width: 0; height: 2px;
    background: #6c63ff;
    transition: width 0.3s ease, left 0.3s ease;
    border-radius: 0 0 10px 10px;
  }
  .float-field input:focus ~ .line {
    width: 100%;
    left: 0;
  }
</style>
</head>
<body>
  <div class="form-group">
    <div class="float-field">
      <input type="text" id="name" placeholder=" " />
      <label for="name">שם מלא</label>
      <div class="line"></div>
    </div>
    <div class="float-field">
      <input type="email" id="email" placeholder=" " />
      <label for="email">אימייל</label>
      <div class="line"></div>
    </div>
    <div class="float-field">
      <input type="password" id="pass" placeholder=" " />
      <label for="pass">סיסמה</label>
      <div class="line"></div>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>בשדה הזה, התווית (למשל "שם מלא") יושבת בתוך השדה כמו placeholder רגיל. ברגע שלוחצים על השדה או מתחילים להקליד, התווית צפה למעלה, מתכווצת ומשנה צבע — ככה תמיד רואים מה השדה הזה אמור להכיל. בנוסף יש קו צבעוני שמתפשט מהמרכז לצדדים כשהשדה פעיל. כל זה עובד רק עם CSS, בלי JavaScript בכלל.</p>`,proTipHe:"הוסיפו :valid ו-:invalid selectors כדי לשנות את צבע הגבול והתווית לפי תקינות השדה.",promptHe:`אני רוצה ליצור שדות קלט עם תווית צפה (Float Label Input) באתר שלי. התווית יושבת בתוך השדה וצפה למעלה כשלוחצים.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה שדות צריך ומה השמות שלהם (שם, אימייל, סיסמה וכו')?
2. מה סוג כל שדה (טקסט, אימייל, סיסמה, מספר)?
3. מה צבע המסגרת והתווית כשהשדה פעיל?
4. מה צבע הרקע של השדות?
5. האם צריך קו תחתון מונפש כשהשדה פעיל?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"draggable",title:"Draggable Element",titleHe:"אלמנט גרירה",description:"Draggable element with momentum and boundary snap.",descriptionHe:"אלמנט שניתן לגרור עם מומנטום ותפיסה לגבולות.",categories:["interaction"],tags:[{label:"drag"},{label:"interaction"},{label:"momentum"}],difficulty:"advanced",previewComponent:"draggable",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Draggable Element</title>
<!-- Draggable Element — Drag with momentum physics and boundary snapping -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    font-family: sans-serif;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .drag-area {
    position: relative;
    width: 500px; height: 350px;
    border: 2px dashed #333;
    border-radius: 16px;
    background: #0c0c14;
  }
  .draggable {
    position: absolute;
    width: 80px; height: 80px;
    border-radius: 16px;
    background: linear-gradient(135deg, #6c63ff, #a855f7);
    cursor: grab;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-weight: 700; font-size: 0.8rem;
    user-select: none;
    touch-action: none;
    transition: box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(108,99,255,0.2);
    left: 50px; top: 50px;
  }
  .draggable.dragging {
    cursor: grabbing;
    box-shadow: 0 8px 40px rgba(108,99,255,0.4);
    z-index: 10;
  }
  .hint {
    position: absolute;
    bottom: 12px; left: 0; right: 0;
    text-align: center;
    color: #555; font-size: 0.8rem;
  }
</style>
</head>
<body>
  <div class="drag-area" id="area">
    <div class="draggable" id="box">גרור</div>
    <div class="hint">גררו את הקוביה בתוך האזור</div>
  </div>

  <script>
    const box = document.getElementById('box');
    const area = document.getElementById('area');
    let isDragging = false;
    let startX, startY, offsetX, offsetY;
    let velX = 0, velY = 0;
    let lastX, lastY, lastTime;
    let animId = null;
    const FRICTION = 0.92; /* momentum decay rate */
    const MIN_VEL = 0.5;   /* threshold to stop */

    box.addEventListener('pointerdown', (e) => {
      isDragging = true;
      box.classList.add('dragging');
      box.setPointerCapture(e.pointerId);
      const rect = box.getBoundingClientRect();
      const areaRect = area.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      lastX = e.clientX; lastY = e.clientY;
      lastTime = performance.now();
      velX = 0; velY = 0;
      if (animId) cancelAnimationFrame(animId);
    });

    document.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const aRect = area.getBoundingClientRect();
      let x = e.clientX - aRect.left - offsetX;
      let y = e.clientY - aRect.top - offsetY;

      /* clamp within boundaries */
      x = Math.max(0, Math.min(x, aRect.width - 80));
      y = Math.max(0, Math.min(y, aRect.height - 80));

      box.style.left = x + 'px';
      box.style.top = y + 'px';

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velX = (e.clientX - lastX) / dt * 16;
        velY = (e.clientY - lastY) / dt * 16;
      }
      lastX = e.clientX; lastY = e.clientY;
      lastTime = now;
    });

    document.addEventListener('pointerup', () => {
      if (!isDragging) return;
      isDragging = false;
      box.classList.remove('dragging');
      applyMomentum();
    });

    function applyMomentum() {
      const aRect = area.getBoundingClientRect();
      const maxX = aRect.width - 80;
      const maxY = aRect.height - 80;

      function tick() {
        velX *= FRICTION;
        velY *= FRICTION;

        let x = parseFloat(box.style.left) + velX;
        let y = parseFloat(box.style.top) + velY;

        /* bounce off boundaries */
        if (x <= 0) { x = 0; velX = -velX * 0.5; }
        if (x >= maxX) { x = maxX; velX = -velX * 0.5; }
        if (y <= 0) { y = 0; velY = -velY * 0.5; }
        if (y >= maxY) { y = maxY; velY = -velY * 0.5; }

        box.style.left = x + 'px';
        box.style.top = y + 'px';

        if (Math.abs(velX) > MIN_VEL || Math.abs(velY) > MIN_VEL) {
          animId = requestAnimationFrame(tick);
        }
      }
      animId = requestAnimationFrame(tick);
    }
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש קוביה שאפשר לגרור עם העכבר בתוך אזור מוגדר. הדבר המגניב הוא שכשעוזבים את הקוביה, היא ממשיכה לזוז בכיוון שגררתם — כמו שזורקים כדור. היא גם מקפיצה מהקירות ומאטה בהדרגה עד שעוצרת. זה עובד על פיזיקה פשוטה של מהירות וחיכוך, ותומך גם בעכבר וגם במגע על מובייל.</p>`,proTipHe:"הוסיפו מספר אלמנטים ניתנים לגרירה עם בדיקת התנגשות ביניהם ליצירת חוויה אינטראקטיבית מורכבת.",promptHe:`אני רוצה ליצור אלמנט שניתן לגרירה (Draggable Element) באתר שלי. אלמנט שאפשר לגרור עם העכבר, עם מומנטום והקפצה מגבולות.

לפני שתיצור את הקוד, תשאל אותי:
1. מה האלמנט שאפשר לגרור (קוביה, עיגול, תמונה, כרטיס)?
2. מה הגודל של האלמנט והצבע שלו?
3. מה גודל האזור שבו אפשר לגרור?
4. האם האלמנט צריך לקפוץ מהקירות או פשוט לעצור?
5. כמה מהר האלמנט צריך להאט אחרי שעוזבים אותו?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"stackedcards",title:"Stacked Cards",titleHe:"כרטיסים מוערמים",description:"Cards in a stack spread on hover like a hand of cards.",descriptionHe:"כרטיסים ערוכים בערימה שנפרשים כמניפה בעת ריחוף.",categories:["card","hover"],tags:[{label:"card"},{label:"hover"},{label:"transform"}],difficulty:"advanced",previewComponent:"stackedcards",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Stacked Cards — Cards fan out like a hand of playing cards on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .stack {
    position: relative;
    width: 200px;
    height: 280px;
    cursor: pointer;
  }
  .stack .card {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: rgba(255,255,255,0.3);
    transition: transform 0.5s cubic-bezier(.4,0,.2,1);
    transform-origin: center bottom; /* pivot at card bottom */
  }
  /* Default resting state — slight offset per card */
  .card:nth-child(1) { transform: translateY(-6px) rotate(-2deg); }
  .card:nth-child(2) { transform: translateY(-3px) rotate(-1deg); }
  .card:nth-child(3) { transform: translateY(0); }
  .card:nth-child(4) { transform: translateY(-3px) rotate(1deg); }
  .card:nth-child(5) { transform: translateY(-6px) rotate(2deg); }
  /* Fan out on hover — 16deg spread per card */
  .stack:hover .card:nth-child(1) { transform: translateX(-80px) translateY(-20px) rotate(-24deg); }
  .stack:hover .card:nth-child(2) { transform: translateX(-40px) translateY(-10px) rotate(-12deg); }
  .stack:hover .card:nth-child(3) { transform: translateY(-6px) rotate(0deg); }
  .stack:hover .card:nth-child(4) { transform: translateX(40px) translateY(-10px) rotate(12deg); }
  .stack:hover .card:nth-child(5) { transform: translateX(80px) translateY(-20px) rotate(24deg); }
  .card:nth-child(1) { background: linear-gradient(135deg, #c8f53b33, #1a1a2e); }
  .card:nth-child(2) { background: linear-gradient(135deg, #ff3cac33, #1a1a2e); }
  .card:nth-child(3) { background: linear-gradient(135deg, #44aaff33, #1a1a2e); }
  .card:nth-child(4) { background: linear-gradient(135deg, #fbbf2433, #1a1a2e); }
  .card:nth-child(5) { background: linear-gradient(135deg, #a78bfa33, #1a1a2e); }
</style>
</head>
<body>
<div class="stack">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כמה כרטיסים שמונחים אחד על השני בערימה. ברגע שמעבירים את העכבר מעליהם, הם נפרשים כמו מניפה — כל כרטיס זז לצד שלו ומסתובב קצת. האפקט הזה עובד רק עם CSS, בלי שום קוד נוסף, וזה נראה מרשים במיוחד לתצוגת גלריה או תפריט ויזואלי.</p>`,proTipHe:"הוסיפו box-shadow שונה לכל כרטיס כדי ליצור תחושת עומק מציאותית יותר.",promptHe:`אני רוצה ליצור אפקט של כרטיסים מוערמים באתר שלי. הכרטיסים יהיו בערימה אחת, וכשמרחפים מעליהם הם נפרשים כמו מניפה.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה כרטיסים אני רוצה בערימה?
2. מה התוכן שיופיע על כל כרטיס?
3. מה הצבעים והסגנון של הכרטיסים?
4. לאיזה כיוון המניפה תיפתח (ימינה, שמאלה, למעלה)?
5. מה הגודל של כל כרטיס?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"flipcard",title:"Flip Card",titleHe:"כרטיס הפיך",description:"3D card flip on hover revealing back face.",descriptionHe:"כרטיס שמתהפך ב-3D בעת ריחוף ומגלה צד אחורי.",categories:["card","hover"],tags:[{label:"card"},{label:"3D"},{label:"flip"}],difficulty:"intermediate",previewComponent:"flipcard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Flip Card — 3D card flip revealing a back face on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .flip-container {
    perspective: 800px; /* Perspective depth for 3D */
    width: 260px;
    height: 340px;
    cursor: pointer;
  }
  .flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.7s cubic-bezier(.4,0,.2,1);
  }
  .flip-container:hover .flip-inner {
    transform: rotateY(180deg);
  }
  .flip-front, .flip-back {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .flip-front {
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    color: #eee;
  }
  .flip-back {
    background: linear-gradient(145deg, #c8f53b, #44aaff);
    transform: rotateY(180deg);
    color: #0a0a1a;
  }
  .icon { font-size: 3rem; }
  .title { font-size: 1.3rem; font-weight: 700; }
  .subtitle { font-size: 0.85rem; opacity: 0.7; }
</style>
</head>
<body>
<div class="flip-container">
  <div class="flip-inner">
    <div class="flip-front">
      <div class="icon">&#9733;</div>
      <div class="title">צד קדמי</div>
      <div class="subtitle">רחפו כדי להפוך</div>
    </div>
    <div class="flip-back">
      <div class="icon">&#10004;</div>
      <div class="title">צד אחורי</div>
      <div class="subtitle">תוכן מוסתר נחשף!</div>
    </div>
  </div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס עם שני צדדים — צד קדמי וצד אחורי. כשמעבירים את העכבר מעליו, הכרטיס מתהפך כמו מטבע ומגלה את הצד השני. האפקט הזה מושלם להצגת מידע נוסף, כמו פרטים על מוצר, תשובה לשאלה, או תוכן מפתיע שמוסתר מאחורה.</p>`,proTipHe:"הוסיפו מעבר עם rotateX במקום rotateY כדי ליצור היפוך אנכי במקום אופקי.",promptHe:`אני רוצה ליצור כרטיס הפיך באתר שלי. כשמרחפים עליו, הוא מתהפך ב-3D ומגלה צד אחורי עם תוכן אחר.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן בצד הקדמי של הכרטיס?
2. מה התוכן בצד האחורי?
3. מה הצבעים של כל צד?
4. באיזה כיוון הכרטיס יתהפך (אופקי או אנכי)?
5. מה הגודל של הכרטיס?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"expandcard",title:"Expand Card",titleHe:"כרטיס מתרחב",description:"Card expands to full screen on click.",descriptionHe:"כרטיס שמתרחב למסך מלא בלחיצה.",categories:["card"],tags:[{label:"card"},{label:"expand"},{label:"animation"}],difficulty:"advanced",previewComponent:"expandcard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Expand Card — Card expands to fill the entire viewport on click -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .card {
    width: 280px;
    height: 360px;
    border-radius: 18px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
    cursor: pointer;
    transition: all 0.6s cubic-bezier(.4,0,.2,1);
    position: fixed;
  }
  .card.expanded {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    top: 0; left: 0;
    z-index: 100;
    box-shadow: none;
    border: none;
  }
  .card .icon {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    transition: all 0.6s cubic-bezier(.4,0,.2,1);
  }
  .card.expanded .icon { width: 100px; height: 100px; border-radius: 24px; }
  .title { font-size: 1.3rem; font-weight: 700; transition: font-size 0.6s ease; }
  .card.expanded .title { font-size: 2rem; }
  .hint { font-size: 0.85rem; opacity: 0.5; }
</style>
</head>
<body>
<div class="card" onclick="this.classList.toggle('expanded')">
  <div class="icon"></div>
  <div class="title">לחצו להרחבה</div>
  <div class="hint">לחצו שוב לסגירה</div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס רגיל שכשלוחצים עליו הוא גדל בצורה חלקה וממלא את כל המסך. לחיצה נוספת מחזירה אותו לגודל הרגיל. זה מושלם לתצוגת פרטי מוצר, גלריית תמונות, או כל מקום שבו רוצים להציג תוכן מורחב בלי לעבור לדף אחר.</p>`,proTipHe:"שלבו עם View Transitions API לאנימציה בין דפים שלמים.",promptHe:`אני רוצה ליצור כרטיס מתרחב באתר שלי. כשלוחצים עליו, הוא גדל ומתרחב למסך מלא עם אנימציה חלקה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן של הכרטיס במצב הרגיל?
2. מה התוכן שמוצג במצב המורחב?
3. מה הצבעים והעיצוב של הכרטיס?
4. האם יש כפתור סגירה או שלחיצה נוספת סוגרת?
5. מה הגודל ההתחלתי של הכרטיס?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"hovercard3d",title:"3D Hover Card",titleHe:"כרטיס 3D hover",description:"Perspective tilt with spotlight that follows cursor.",descriptionHe:"הטיית פרספקטיבה עם כתם אור שעוקב אחרי הסמן.",categories:["card","hover","cursor"],tags:[{label:"3D"},{label:"perspective"},{label:"cursor"}],difficulty:"intermediate",previewComponent:"hovercard3d",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- 3D Hover Card — Perspective tilt with a spotlight following the cursor -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .card-3d {
    width: 300px;
    height: 400px;
    border-radius: 20px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
    transform-style: preserve-3d;
    transition: box-shadow 0.3s ease;
  }
  .spotlight {
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .card-3d:hover .spotlight { opacity: 1; }
  .icon3d {
    width: 60px; height: 60px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
  }
</style>
</head>
<body>
<div class="card-3d" id="card">
  <div class="spotlight" id="spot"></div>
  <div class="icon3d"></div>
  <div style="font-size:1.3rem;font-weight:700">כרטיס 3D</div>
  <div style="font-size:0.85rem;opacity:0.5">הזיזו את העכבר</div>
</div>
<script>
  const card = document.getElementById('card');
  const spot = document.getElementById('spot');
  const MAX_TILT = 15; /* Max rotation degrees */

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -MAX_TILT;
    const rotateY = ((x - cx) / cx) * MAX_TILT;

    card.style.transform = \`perspective(600px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.03,1.03,1.03)\`;
    spot.style.background = \`radial-gradient(circle at \${(x/rect.width)*100}% \${(y/rect.height)*100}%, rgba(255,255,255,0.18) 0%, transparent 55%)\`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמגיב לתנועת העכבר ונוטה לכיוון שבו הסמן נמצא, כאילו מחזיקים אותו ביד. בנוסף, כתם אור עדין עוקב אחרי העכבר על פני הכרטיס. זה נותן תחושה תלת-ממדית אמיתית ומשדרג כל כרטיס מוצר או פרופיל באתר.</p>`,proTipHe:"הוסיפו שכבת שיקוף (glare) עם gradient נוסף למראה מבריק יותר.",promptHe:`אני רוצה ליצור כרטיס עם אפקט 3D באתר שלי. הכרטיס נוטה לכיוון העכבר עם כתם אור שעוקב אחרי הסמן.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן של הכרטיס (טקסט, תמונה, אייקון)?
2. מה הצבעים והרקע של הכרטיס?
3. מה הגודל של הכרטיס?
4. כמה חזקה תהיה ההטייה (עדינה או דרמטית)?
5. מה צבע כתם האור שעוקב אחרי העכבר?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"imagezoom",title:"Image Zoom",titleHe:"זום תמונה",description:"Image zooms into cursor position on hover.",descriptionHe:"תמונה מתקרבת למיקום הסמן בעת ריחוף.",categories:["card","hover"],tags:[{label:"zoom"},{label:"image"},{label:"hover"}],difficulty:"intermediate",previewComponent:"imagezoom",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Image Zoom — Image zooms into the cursor position on hover -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .zoom-container {
    width: 400px;
    height: 300px;
    border-radius: 18px;
    overflow: hidden;
    cursor: zoom-in;
    position: relative;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .zoom-img {
    width: 100%;
    height: 100%;
    /* Use a gradient as placeholder image */
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #a78bfa);
    background-size: cover;
    transition: transform 0.4s cubic-bezier(.4,0,.2,1);
    transform-origin: center center;
  }
  .zoom-container:hover .zoom-img {
    transform: scale(2.5); /* 2.5x zoom factor */
  }
  .label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    background: rgba(0,0,0,0.3);
    opacity: 1;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .zoom-container:hover .label { opacity: 0; }
</style>
</head>
<body>
<div class="zoom-container" id="zc">
  <div class="zoom-img" id="zi"></div>
  <div class="label">רחפו לזום</div>
</div>
<script>
  const container = document.getElementById('zc');
  const img = document.getElementById('zi');

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = x + '% ' + y + '%';
  });

  container.addEventListener('mouseleave', () => {
    img.style.transformOrigin = '50% 50%';
  });
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה תמונה שכשמעבירים עליה את העכבר, היא מתקרבת בדיוק למקום שבו הסמן נמצא. ככל שמזיזים את העכבר, נקודת הזום זזה איתו. זה אפקט נהדר לאתרי חנות שבהם רוצים לאפשר ללקוחות לבדוק פרטים קטנים של מוצר בלי לפתוח דף נפרד.</p>`,proTipHe:"למוצרי e-commerce, שלבו עם לופה עגולה שעוקבת אחרי הסמן לחוויית בדיקת מוצר.",promptHe:`אני רוצה ליצור אפקט זום תמונה באתר שלי. כשמרחפים על התמונה, היא מתקרבת למיקום העכבר.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התמונה שתוצג (קישור או תיאור)?
2. מה הגודל של אזור התמונה?
3. כמה חזק יהיה הזום (פי 2, פי 3)?
4. האם רוצים מסגרת או פינות מעוגלות?
5. האם צריך טקסט או כיתוב מעל התמונה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"revealcard",title:"Reveal Card",titleHe:"כרטיס חשיפה",description:"Colored overlay wipes to reveal content underneath.",descriptionHe:"שכבת צבע נמחקת וחושפת תוכן מתחתיה.",categories:["card","hover"],tags:[{label:"reveal"},{label:"clip-path"},{label:"hover"}],difficulty:"intermediate",previewComponent:"revealcard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Reveal Card — Colored overlay wipes away to reveal hidden content -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .reveal-card {
    width: 300px;
    height: 380px;
    border-radius: 18px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .reveal-content {
    position: absolute;
    inset: 0;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
  }
  .reveal-content .icon {
    width: 64px; height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
  }
  .reveal-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #c8f53b, #ff3cac);
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: inset(0 0 0 0); /* Fully visible */
    transition: clip-path 0.6s cubic-bezier(.4,0,.2,1);
    color: #0a0a1a;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .reveal-card:hover .reveal-overlay {
    clip-path: inset(0 100% 0 0); /* Wipe to right */
  }
</style>
</head>
<body>
<div class="reveal-card">
  <div class="reveal-content">
    <div class="icon"></div>
    <div style="font-size:1.3rem;font-weight:700">תוכן נחשף!</div>
    <div style="font-size:0.85rem;opacity:0.5">מוסתר מתחת לשכבה</div>
  </div>
  <div class="reveal-overlay">רחפו לחשיפה</div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמכוסה בשכבת צבע. כשמעבירים את העכבר מעליו, השכבה הצבעונית נמחקת הצידה ונחשף התוכן שמתחתיה. זה אפקט מעולה ליצירת סקרנות — אפשר להשתמש בו כדי לחשוף תמונות, מידע מוסתר, או הפתעות באתר.</p>`,proTipHe:"נסו clip-path עם polygon() ליצירת מחיקות באלכסון או בצורות מעניינות.",promptHe:`אני רוצה ליצור כרטיס חשיפה באתר שלי. שכבת צבע מכסה את הכרטיס, וכשמרחפים עליו השכבה נמחקת וחושפת את התוכן.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן המוסתר שייחשף (טקסט, תמונה)?
2. מה הצבע של שכבת הכיסוי?
3. מאיזה כיוון השכבה תימחק (ימין, שמאל, למעלה, למטה)?
4. מה הגודל של הכרטיס?
5. האם יש טקסט על שכבת הכיסוי (כמו "רחפו לחשיפה")?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"skeletoncard",title:"Skeleton Card",titleHe:"כרטיס שלד",description:"Skeleton loading animation with shimmer sweep.",descriptionHe:"אנימציית טעינה בסגנון שלד עם הברקה חולפת.",categories:["card","loader"],tags:[{label:"skeleton"},{label:"loading"},{label:"shimmer"}],difficulty:"beginner",previewComponent:"skeletoncard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Skeleton Card — Shimmer loading placeholder with smooth sweep animation -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 24px;
  }
  .skel-card {
    width: 280px;
    padding: 20px;
    border-radius: 18px;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .skel {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.04) 25%,
      rgba(255,255,255,0.1) 50%,
      rgba(255,255,255,0.04) 75%
    );
    background-size: 200% 100%; /* Double width for sweep */
    animation: shimmer 1.8s ease infinite;
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .skel-avatar { width: 48px; height: 48px; border-radius: 50%; }
  .skel-row { display: flex; gap: 12px; align-items: center; }
  .skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
  .skel-line { height: 10px; }
  .skel-img { width: 100%; height: 120px; }
</style>
</head>
<body>
<div class="skel-card">
  <div class="skel-row">
    <div class="skel skel-avatar"></div>
    <div class="skel-lines">
      <div class="skel skel-line" style="width:80%"></div>
      <div class="skel skel-line" style="width:50%"></div>
    </div>
  </div>
  <div class="skel skel-img"></div>
  <div class="skel skel-line" style="width:100%"></div>
  <div class="skel skel-line" style="width:65%"></div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס שמדמה טעינה של תוכן — במקום לראות מסך ריק, המשתמש רואה צורות אפורות שמהבהבות עם אפקט הברקה. הצורות מדמות את המבנה של התוכן האמיתי (תמונת פרופיל, שורות טקסט, תמונה). ברגע שהתוכן נטען, מחליפים את השלד בתוכן האמיתי.</p>`,proTipHe:'התאימו את המבנה של השלד למבנה המדויק של התוכן שייטען כדי למנוע "קפיצה" ויזואלית.',promptHe:`אני רוצה ליצור כרטיס שלד (Skeleton) לטעינה באתר שלי. במקום מסך ריק, יוצגו צורות מהבהבות שמדמות את מבנה התוכן.

לפני שתיצור את הקוד, תשאל אותי:
1. מה מבנה התוכן שהשלד מדמה (פרופיל, כרטיס מוצר, פוסט)?
2. אילו אלמנטים צריכים להופיע (אווטר, כותרת, תמונה, שורות טקסט)?
3. מה הצבעים של הרקע וההברקה?
4. מה הגודל של הכרטיס?
5. כמה כרטיסי שלד להציג בשורה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"glowbordercard",title:"Glow Border Card",titleHe:"כרטיס זוהר",description:"Animated gradient glow border follows cursor around card edges.",descriptionHe:"גבול זוהר מדרג שעוקב אחרי הסמן לאורך קצוות הכרטיס.",categories:["card","cursor"],tags:[{label:"glow"},{label:"border"},{label:"cursor"}],difficulty:"intermediate",previewComponent:"glowbordercard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Glow Border Card — Gradient glow border that tracks the cursor position -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .glow-wrap {
    position: relative;
    width: 300px;
    height: 380px;
    border-radius: 20px;
    padding: 2px; /* Border thickness */
    cursor: pointer;
    background: radial-gradient(circle at 50% 50%, #c8f53b, #44aaff, #ff3cac, transparent 70%);
  }
  .glow-inner {
    width: 100%;
    height: 100%;
    border-radius: 18px;
    background: #1a1a2e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: #eee;
  }
  .glow-icon {
    width: 56px; height: 56px;
    border-radius: 14px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    opacity: 0.7;
  }
</style>
</head>
<body>
<div class="glow-wrap" id="gw">
  <div class="glow-inner">
    <div class="glow-icon"></div>
    <div style="font-size:1.2rem;font-weight:700">גבול זוהר</div>
    <div style="font-size:0.85rem;opacity:0.5">הזיזו את העכבר</div>
  </div>
</div>
<script>
  const wrap = document.getElementById('gw');

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wrap.style.background = \`radial-gradient(circle at \${x}% \${y}%, #c8f53b 0%, #44aaff 30%, #ff3cac 60%, transparent 80%)\`;
  });

  wrap.addEventListener('mouseleave', () => {
    wrap.style.background = 'radial-gradient(circle at 50% 50%, #c8f53b, #44aaff, #ff3cac, transparent 70%)';
  });
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיס עם גבול זוהר צבעוני שעוקב אחרי תנועת העכבר. ככל שמזיזים את הסמן סביב הכרטיס, הזוהר זז איתו לאורך הקצוות. זה נותן תחושה של אנרגיה חיה שזורמת סביב הכרטיס, ומשדרג כל ממשק בסגנון מודרני ומרשים.</p>`,proTipHe:"הוסיפו conic-gradient במקום radial-gradient ליצירת אפקט סיבובי מרהיב.",promptHe:`אני רוצה ליצור כרטיס עם גבול זוהר באתר שלי. הגבול יהיה צבעוני וזוהר, ויעקוב אחרי תנועת העכבר.

לפני שתיצור את הקוד, תשאל אותי:
1. מה התוכן של הכרטיס?
2. מה הצבעים של הזוהר (שני צבעים או יותר)?
3. מה העובי של הגבול הזוהר?
4. מה הגודל של הכרטיס?
5. האם הזוהר יהיה רק בריחוף או תמיד פעיל?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"stackscroll",title:"Stack Scroll",titleHe:"גלילת stack",description:"Cards stack on top of each other as you scroll.",descriptionHe:"כרטיסים נערמים זה על זה בזמן גלילה.",categories:["card","scroll"],tags:[{label:"scroll"},{label:"stack"},{label:"sticky"}],difficulty:"advanced",previewComponent:"stackscroll",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Stack Scroll — Cards stack on top of each other as the user scrolls -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a1a;
    font-family: sans-serif;
    color: #eee;
  }
  .spacer { height: 50vh; }
  .stack-section {
    position: relative;
    /* Each card is 100vh, minus overlap */
    height: calc(4 * 80vh);
  }
  .stack-card {
    position: sticky;
    top: 60px; /* Offset from top of viewport */
    width: 80%;
    max-width: 600px;
    margin: 0 auto 80vh;
    height: 50vh;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.06);
  }
  .stack-card:nth-child(1) { background: linear-gradient(145deg, #c8f53b22, #1a1a2e); }
  .stack-card:nth-child(2) { background: linear-gradient(145deg, #ff3cac22, #1a1a2e); }
  .stack-card:nth-child(3) { background: linear-gradient(145deg, #44aaff22, #1a1a2e); }
  .stack-card:nth-child(4) { background: linear-gradient(145deg, #a78bfa22, #1a1a2e); }
  .num { font-size: 3rem; font-weight: 800; opacity: 0.3; }
  .label { font-size: 1.1rem; opacity: 0.6; }
</style>
</head>
<body>
<div class="spacer"></div>
<div class="stack-section">
  <div class="stack-card"><div class="num">01</div><div class="label">כרטיס ראשון</div></div>
  <div class="stack-card"><div class="num">02</div><div class="label">כרטיס שני</div></div>
  <div class="stack-card"><div class="num">03</div><div class="label">כרטיס שלישי</div></div>
  <div class="stack-card"><div class="num">04</div><div class="label">כרטיס רביעי</div></div>
</div>
<div class="spacer"></div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה כרטיסים שנערמים זה על זה בזמן שגוללים את הדף. כל כרטיס נדבק לחלק העליון של המסך, וכשממשיכים לגלול, הכרטיס הבא עולה ומכסה את הקודם. זה יוצר אפקט של חפיסת קלפים שמתגלה בהדרגה, מושלם לסיפור שלבים, הצגת שירותים, או כל תוכן שרוצים להציג ברצף.</p>`,proTipHe:"הוסיפו scale קטן יותר לכרטיסים הישנים יותר כדי ליצור תחושת עומק תלת-ממדית.",promptHe:`אני רוצה ליצור אפקט גלילת Stack באתר שלי. כרטיסים נערמים זה על זה בזמן גלילה, כמו חפיסת קלפים.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה כרטיסים יהיו?
2. מה התוכן של כל כרטיס?
3. מה הצבעים והסגנון של הכרטיסים?
4. מה הגודל של כל כרטיס?
5. האם הכרטיסים מכסים לגמרי את הקודמים או שנשאר חלק גלוי?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"carouselsnap",title:"Carousel Snap",titleHe:"קרוסלה snap",description:"Horizontal scroll carousel with snap and indicators.",descriptionHe:"קרוסלה אופקית עם גלילה חלקה ואינדיקטורים.",categories:["card","scroll"],tags:[{label:"carousel"},{label:"snap"},{label:"scroll"}],difficulty:"intermediate",previewComponent:"carouselsnap",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Carousel Snap — Horizontal scroll carousel with snap points and indicators -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 20px;
  }
  .carousel {
    width: 400px;
    overflow-x: auto;
    scroll-snap-type: x mandatory; /* Snap horizontally */
    display: flex;
    gap: 0;
    border-radius: 18px;
    scrollbar-width: none;
  }
  .carousel::-webkit-scrollbar { display: none; }
  .slide {
    min-width: 400px;
    height: 280px;
    scroll-snap-align: start; /* Snap to start of each slide */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #eee;
  }
  .slide:nth-child(1) { background: linear-gradient(135deg, #c8f53b33, #1a1a2e); }
  .slide:nth-child(2) { background: linear-gradient(135deg, #ff3cac33, #1a1a2e); }
  .slide:nth-child(3) { background: linear-gradient(135deg, #44aaff33, #1a1a2e); }
  .slide:nth-child(4) { background: linear-gradient(135deg, #a78bfa33, #1a1a2e); }
  .slide .title { font-size: 1.4rem; font-weight: 700; }
  .slide .sub { font-size: 0.85rem; opacity: 0.5; }
  .dots { display: flex; gap: 10px; }
  .dot {
    width: 10px; height: 10px;
    border-radius: 5px;
    border: none;
    background: rgba(255,255,255,0.2);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .dot.active { width: 24px; background: #c8f53b; }
</style>
</head>
<body>
<div class="carousel" id="carousel">
  <div class="slide"><div class="title">שקופית 1</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 2</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 3</div><div class="sub">גלילת snap</div></div>
  <div class="slide"><div class="title">שקופית 4</div><div class="sub">גלילת snap</div></div>
</div>
<div class="dots" id="dots">
  <button class="dot active"></button>
  <button class="dot"></button>
  <button class="dot"></button>
  <button class="dot"></button>
</div>
<script>
  const carousel = document.getElementById('carousel');
  const dots = document.querySelectorAll('.dot');
  const SLIDE_W = 400; /* px per slide */

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      carousel.scrollTo({ left: i * SLIDE_W, behavior: 'smooth' });
    });
  });

  carousel.addEventListener('scroll', () => {
    const idx = Math.round(carousel.scrollLeft / SLIDE_W);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  });
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה קרוסלה אופקית שאפשר לגלול בה ימינה ושמאלה, והיא "ננעלת" אוטומטית על כל שקופית כדי שתמיד תראו שקופית שלמה. למטה יש נקודות שמראות באיזו שקופית אתם, ואפשר גם ללחוץ עליהן כדי לקפוץ ישירות לשקופית מסוימת.</p>`,proTipHe:"הוסיפו IntersectionObserver במקום scroll event לביצועים טובים יותר על מובייל.",promptHe:`אני רוצה ליצור קרוסלה עם Snap באתר שלי. שקופיות שגוללים ביניהן אופקית עם נעילה אוטומטית ואינדיקטורים.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה שקופיות יהיו בקרוסלה?
2. מה התוכן של כל שקופית?
3. מה הגודל של הקרוסלה?
4. האם צריך חיצי ניווט בנוסף לאינדיקטורים?
5. האם הקרוסלה צריכה לחזור מההתחלה אחרי השקופית האחרונה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"accordionsmooth",title:"Smooth Accordion",titleHe:"אקורדיון חלק",description:"Smooth height transition accordion using CSS grid.",descriptionHe:"אקורדיון עם מעבר גובה חלק באמצעות CSS grid.",categories:["card","interaction"],tags:[{label:"accordion"},{label:"CSS grid"},{label:"interaction"}],difficulty:"beginner",previewComponent:"accordionsmooth",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Smooth Accordion — Animated height transitions using the CSS grid 0fr/1fr trick -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
  }
  .accordion {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .acc-item {
    border-radius: 12px;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .acc-header {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #eee;
    font-weight: 600;
  }
  .acc-header:hover { background: rgba(255,255,255,0.03); }
  .acc-arrow {
    transition: transform 0.3s ease;
    color: #c8f53b;
  }
  .acc-item.open .acc-arrow { transform: rotate(180deg); }
  .acc-body {
    display: grid;
    grid-template-rows: 0fr; /* Collapsed: 0fr */
    transition: grid-template-rows 0.35s ease;
  }
  .acc-item.open .acc-body {
    grid-template-rows: 1fr; /* Expanded: 1fr */
  }
  .acc-body-inner {
    overflow: hidden;
  }
  .acc-body-inner p {
    padding: 0 20px 16px;
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
    line-height: 1.6;
  }
</style>
</head>
<body>
<div class="accordion">
  <div class="acc-item open">
    <div class="acc-header" onclick="toggle(this)">
      <span>מה זה Effects Lab?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>ספריית אפקטים מוכנים לשימוש עם קוד נקי וקל להתאמה.</p></div></div>
  </div>
  <div class="acc-item">
    <div class="acc-header" onclick="toggle(this)">
      <span>האם זה בחינם?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>כן! כל האפקטים זמינים בקוד פתוח ללא הגבלה.</p></div></div>
  </div>
  <div class="acc-item">
    <div class="acc-header" onclick="toggle(this)">
      <span>איך מתחילים?</span>
      <span class="acc-arrow">&#9660;</span>
    </div>
    <div class="acc-body"><div class="acc-body-inner"><p>בחרו אפקט, העתיקו את הקוד, והדביקו אותו בפרויקט שלכם.</p></div></div>
  </div>
</div>
<script>
  function toggle(header) {
    const item = header.parentElement;
    /* Close all others first (single open mode) */
    document.querySelectorAll('.acc-item').forEach(el => {
      if (el !== item) el.classList.remove('open');
    });
    item.classList.toggle('open');
  }
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה רשימת שאלות ותשובות (אקורדיון) שבה לוחצים על שאלה והתשובה נפתחת בצורה חלקה. כשפותחים פריט אחד, הפריטים האחרים נסגרים אוטומטית. האפקט הזה מושלם לעמוד שאלות נפוצות, תפריטים מתקפלים, או כל מקום שרוצים לחסוך מקום במסך.</p>`,proTipHe:"טריק ה-grid-template-rows: 0fr/1fr עובד גם עם details/summary לגרסה ללא JavaScript.",promptHe:`אני רוצה ליצור אקורדיון חלק באתר שלי. פריטים שנפתחים ונסגרים בלחיצה עם אנימציה חלקה.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה פריטים יהיו באקורדיון?
2. מה הכותרות והתוכן של כל פריט?
3. האם רק פריט אחד יכול להיות פתוח בו-זמנית?
4. מה הצבעים והסגנון של האקורדיון?
5. האם הפריט הראשון צריך להיות פתוח כברירת מחדל?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"pricingcard",title:"Pricing Card",titleHe:"כרטיס מחיר",description:"Pricing card with hover highlight and feature reveal.",descriptionHe:"כרטיס תמחור עם הדגשה בריחוף וחשיפת תכונות.",categories:["card","hover"],tags:[{label:"pricing"},{label:"hover"},{label:"card"}],difficulty:"beginner",previewComponent:"pricingcard",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Pricing Card — Three-tier pricing with hover highlight and feature reveal -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    gap: 20px;
  }
  .pricing-card {
    width: 220px;
    padding: 32px 24px;
    border-radius: 20px;
    background: #1a1a2e;
    border: 1.5px solid rgba(255,255,255,0.06);
    text-align: center;
    color: #eee;
    transition: all 0.35s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
  .pricing-card:hover {
    transform: scale(1.06);
    box-shadow: 0 16px 50px rgba(0,0,0,0.4);
    border-color: var(--clr);
    background: #16213e;
  }
  .plan-name { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; }
  .price { font-size: 2.2rem; font-weight: 800; }
  .features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  .features li {
    font-size: 0.85rem;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  .pricing-card:hover .features li { opacity: 1; }
  .cta {
    padding: 10px 28px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    color: #0a0a1a;
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s ease;
  }
  .pricing-card:hover .cta {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>
<div class="pricing-card" style="--clr:#888">
  <div class="plan-name" style="color:#888">בסיסי</div>
  <div class="price">חינם</div>
  <ul class="features">
    <li>5 פרויקטים</li><li>1GB אחסון</li>
  </ul>
  <button class="cta" style="background:#888">בחר</button>
</div>
<div class="pricing-card" style="--clr:#c8f53b">
  <div class="plan-name" style="color:#c8f53b">פרו</div>
  <div class="price">49&#8362;</div>
  <ul class="features">
    <li>50 פרויקטים</li><li>20GB אחסון</li><li>תמיכה מועדפת</li><li>API גישה</li>
  </ul>
  <button class="cta" style="background:#c8f53b">בחר</button>
</div>
<div class="pricing-card" style="--clr:#44aaff">
  <div class="plan-name" style="color:#44aaff">עסקי</div>
  <div class="price">99&#8362;</div>
  <ul class="features">
    <li>פרויקטים ללא הגבלה</li><li>100GB אחסון</li><li>תמיכה 24/7</li>
  </ul>
  <button class="cta" style="background:#44aaff">בחר</button>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה שלושה כרטיסי תמחור זה לצד זה. כשמעבירים את העכבר על אחד מהם, הוא מתרומם קצת, מקבל גבול צבעוני, רשימת התכונות מתבהרת, וכפתור "בחר" מופיע בצורה חלקה. כל כרטיס בצבע אחר כדי ליצור הבדל ברור בין המסלולים.</p>`,proTipHe:'הוסיפו תגית "מומלץ" לכרטיס המרכזי עם position absolute ליצירת היררכיה חזותית.',promptHe:`אני רוצה ליצור כרטיסי תמחור באתר שלי. כרטיסים עם מסלולים שונים שמתעוררים לחיים בריחוף.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה מסלולי תמחור יש?
2. מה השם, המחיר והתכונות של כל מסלול?
3. מה הצבע של כל מסלול?
4. האם יש מסלול "מומלץ" שצריך להיות בולט יותר?
5. מה הטקסט בכפתור הפעולה (CTA)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"customcursor",title:"Custom Cursor",titleHe:"קורסור מותאם",description:"Custom cursor that replaces the default, morphs on hover over interactive elements.",descriptionHe:"קורסור מותאם אישית שמחליף את ברירת המחדל ומשנה צורה בעת ריחוף על אלמנטים אינטראקטיביים.",categories:["cursor"],tags:[{label:"cursor"},{label:"custom"},{label:"morph"}],difficulty:"intermediate",previewComponent:"customcursor",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Custom Cursor</title>
<!-- Custom Cursor — replaces default cursor with a morphing dot + ring -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; cursor: none; }
  body {
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
  }
  /* Small inner dot */
  .cursor-dot {
    position: fixed; top: 0; left: 0; z-index: 9999;
    width: 8px; height: 8px; border-radius: 50%;
    background: #c8f53b; pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.25s, height 0.25s, background 0.25s;
  }
  /* Outer ring */
  .cursor-ring {
    position: fixed; top: 0; left: 0; z-index: 9998;
    width: 36px; height: 36px; border-radius: 50%;
    border: 2px solid rgba(200,245,59,0.5);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, border-color 0.3s, border-radius 0.3s;
  }
  /* Morph state when hovering interactive elements */
  .cursor-dot.hover { width: 0; height: 0; }
  .cursor-ring.hover {
    width: 56px; height: 56px;
    border-color: #ff3cac;
    background: rgba(255,60,172,0.1);
  }
  .demo-box {
    padding: 2rem 3rem; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff; font-size: 1rem;
    transition: border-color 0.3s;
  }
  .demo-box:hover { border-color: #ff3cac; }
  .demo-link {
    color: #c8f53b; text-decoration: underline;
    font-size: 1.1rem;
  }
</style>
</head>
<body>
  <div class="cursor-dot" id="dot"></div>
  <div class="cursor-ring" id="ring"></div>

  <div class="demo-box" data-cursor="hover">Hover me</div>
  <a href="#" class="demo-link" data-cursor="hover">Link</a>

  <script>
    const dot = document.getElementById('dot');
    const ring = document.getElementById('ring');
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    const LERP = 0.15; /* ring follow speed */

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animate() {
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    /* Morph on hover targets */
    document.querySelectorAll('[data-cursor="hover"]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hover');
        ring.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הסמן הרגיל של הדפדפן נעלם, ובמקומו מופיעים שני אלמנטים — נקודה קטנה שצמודה לעכבר וטבעת גדולה שעוקבת אחריו בהשהייה קלה. כשמרחפים על כפתור או לינק, הנקודה נעלמת והטבעת מתרחבת ומשנה צבע. השילוב של תנועה מהירה עם תנועה איטית נותן תחושה חלקה ואלגנטית.</p>`,proTipHe:"הוסיפו mix-blend-mode: difference על הטבעת כדי שהקורסור ייראה טוב על כל צבע רקע.",promptHe:`אני רוצה ליצור קורסור מותאם אישית לאתר שלי — נקודה קטנה וטבעת חיצונית שעוקבים אחרי העכבר ומשנים צורה בריחוף על אלמנטים.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הצבע של הנקודה ושל הטבעת?
2. מה הגודל של הנקודה ושל הטבעת?
3. כמה מהירה העקיבה של הטבעת (חלקה ואיטית או צמודה ומהירה)?
4. מה קורה כשמרחפים על כפתורים — שינוי צבע, הגדלה, אפקט אחר?
5. האם להציג את הקורסור בכל הדף או רק באזור מסוים?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"cursorblob",title:"Cursor Blob",titleHe:"קורסור blob",description:"Large blob cursor that follows the mouse with smooth lerp easing and blur effect.",descriptionHe:"קורסור blob גדול שעוקב אחרי העכבר עם החלקת lerp ואפקט טשטוש.",categories:["cursor"],tags:[{label:"cursor"},{label:"blob"},{label:"lerp"}],difficulty:"intermediate",previewComponent:"cursorblob",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Blob</title>
<!-- Cursor Blob — large gooey blob follows mouse with lerp smoothing -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; color: #fff;
  }
  .blob {
    position: fixed; top: 0; left: 0; z-index: 0;
    width: 250px; height: 250px; /* blob diameter */
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,245,59,0.35) 0%, transparent 70%);
    filter: blur(60px); /* heavy blur for gooey look */
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: transform;
  }
  .content {
    position: relative; z-index: 1;
    text-align: center;
  }
  .content h1 {
    font-size: 3rem; margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content p { opacity: 0.5; font-size: 1rem; }
  .card {
    margin-top: 2rem; padding: 1.5rem 2.5rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(8px);
  }
</style>
</head>
<body>
  <div class="blob" id="blob"></div>
  <div class="content">
    <h1>Blob Cursor</h1>
    <p>Move your mouse around</p>
    <div class="card">The blob follows with smooth lerp</div>
  </div>

  <script>
    const blob = document.getElementById('blob');
    let bx = window.innerWidth / 2, by = window.innerHeight / 2;
    let mx = bx, my = by;
    const EASE = 0.08; /* lerp factor — lower = more lag */

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      bx += (mx - bx) * EASE;
      by += (my - by) * EASE;
      blob.style.left = bx + 'px';
      blob.style.top = by + 'px';
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כתם צבע גדול ומטושטש עוקב אחרי העכבר בתנועה איטית ועדינה, כמו בועה שצפה מאחורי התוכן. הכתם זז רק חלק קטן מהמרחק בכל פריים, מה שנותן לו תחושה רכה ואורגנית. הוא יושב מתחת לכל התוכן בדף כך שהוא לא מסתיר שום דבר, אלא פשוט מוסיף שכבת אור דינמית שמגיבה לתנועה שלכם.</p>`,proTipHe:"הוסיפו blob שני בצבע אחר עם ערך lerp שונה ליצירת אפקט שכבות צבעוני.",promptHe:`אני רוצה ליצור אפקט blob — כתם צבע גדול ומטושטש שעוקב אחרי העכבר ברקע האתר שלי.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הצבע של הכתם (ירוק, כחול, סגול, או שילוב)?
2. מה הגודל של הכתם?
3. כמה מטושטש הוא צריך להיות?
4. כמה איטית או מהירה העקיבה אחרי העכבר?
5. האם להוסיף כתם נוסף בצבע אחר ליצירת שכבות?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"magneticfield",title:"Magnetic Field",titleHe:"שדה מגנטי",description:"Multiple elements attracted and repelled by the cursor based on proximity.",descriptionHe:"מספר אלמנטים שנמשכים ונדחים על ידי הסמן בהתאם לקרבה.",categories:["cursor"],tags:[{label:"cursor"},{label:"magnetic"},{label:"physics"},{label:"interaction"}],difficulty:"advanced",previewComponent:"magneticfield",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Magnetic Field</title>
<!-- Magnetic Field — particles attract/repel from cursor based on distance -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    font-family: sans-serif;
  }
  .field { position: fixed; inset: 0; }
  .node {
    position: absolute;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: rgba(200,245,59,0.6);
    transition: background 0.3s;
    will-change: transform;
  }
  .node::after {
    content: '';
    position: absolute; inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(200,245,59,0.15);
  }
</style>
</head>
<body>
  <div class="field" id="field"></div>
  <script>
    const field = document.getElementById('field');
    const COLS = 10, ROWS = 6;
    const RADIUS = 180; /* influence radius in px */
    const STRENGTH = 45; /* max displacement in px */
    const nodes = [];
    let mx = -999, my = -999;

    /* Create grid of nodes */
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const el = document.createElement('div');
        el.className = 'node';
        const ox = ((c + 0.5) / COLS) * 100;
        const oy = ((r + 0.5) / ROWS) * 100;
        el.style.left = ox + '%';
        el.style.top = oy + '%';
        field.appendChild(el);
        nodes.push({ el, ox, oy });
      }
    }

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
    });

    function animate() {
      const w = window.innerWidth, h = window.innerHeight;
      nodes.forEach(({ el, ox, oy }) => {
        const nx = (ox / 100) * w;
        const ny = (oy / 100) * h;
        const dx = mx - nx, dy = my - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          /* Repel: push away from cursor */
          const tx = -Math.cos(angle) * force;
          const ty = -Math.sin(angle) * force;
          el.style.transform = \`translate(\${tx}px, \${ty}px) scale(\${1 + force / 80})\`;
          el.style.background = \`rgba(255, 60, 172, \${0.4 + force / 60})\`;
        } else {
          el.style.transform = 'translate(0,0) scale(1)';
          el.style.background = 'rgba(200,245,59,0.6)';
        }
      });
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש רשת של נקודות פזורות על המסך, וכשהסמן מתקרב אליהן — הן נדחות ממנו, כמו מגנט שדוחה חתיכות מתכת. ככל שהסמן קרוב יותר לנקודה, הדחייה חזקה יותר. הנקודות גם משנות צבע ומתרחבות קצת באזור ההשפעה, וכשהסמן מתרחק הכל חוזר למקום.</p>`,proTipHe:"שנו את הסימן מ-minus ל-plus בחישוב tx/ty כדי להפוך מדחייה למשיכה.",promptHe:`אני רוצה ליצור אפקט שדה מגנטי באתר שלי — רשת של נקודות שנדחות מהסמן כשהוא מתקרב אליהן.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה נקודות אני רוצה ברשת (צפוף או מרווח)?
2. מה הצבע של הנקודות במצב רגיל ובמצב השפעה?
3. האם הנקודות צריכות להידחות מהסמן או להימשך אליו?
4. מה הרדיוס של אזור ההשפעה סביב הסמן?
5. האם להוסיף אפקטים נוספים כמו קווים מחברים בין הנקודות?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"cursorlens",title:"Cursor Lens",titleHe:"עדשת קורסור",description:"A magnifying glass effect that follows the cursor and enlarges content underneath.",descriptionHe:"אפקט זכוכית מגדלת שעוקב אחרי הסמן ומגדיל את התוכן שמתחתיו.",categories:["cursor"],tags:[{label:"cursor"},{label:"lens"},{label:"magnify"},{label:"zoom"}],difficulty:"advanced",previewComponent:"cursorlens",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Lens</title>
<!-- Cursor Lens — magnifying glass follows cursor, enlarges page content -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    display: flex; align-items: center; justify-content: center;
    cursor: none;
  }
  .content {
    text-align: center; color: #fff; padding: 2rem;
  }
  .content h1 {
    font-size: 3rem; margin-bottom: 1rem;
    background: linear-gradient(90deg, #c8f53b, #44aaff, #ff3cac);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content p { color: #888; font-size: 1rem; max-width: 500px; line-height: 1.8; }
  .grid {
    display: grid; grid-template-columns: repeat(4, 60px);
    gap: 8px; margin-top: 1.5rem; justify-content: center;
  }
  .grid span {
    height: 60px; border-radius: 8px;
    background: rgba(200,245,59,0.15);
    border: 1px solid rgba(200,245,59,0.2);
  }
  .grid span:nth-child(even) { background: rgba(68,170,255,0.15); border-color: rgba(68,170,255,0.2); }
  /* Lens element */
  .lens {
    position: fixed; top: 0; left: 0; z-index: 100;
    width: 150px; height: 150px; /* lens diameter */
    border-radius: 50%;
    border: 2px solid rgba(200,245,59,0.4);
    box-shadow: 0 0 30px rgba(200,245,59,0.1);
    pointer-events: none;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }
  .lens-inner {
    position: absolute;
    width: 100vw; height: 100vh;
    transform-origin: 0 0;
    transform: scale(2); /* 2x magnification */
  }
</style>
</head>
<body>
  <div class="content" id="source">
    <h1>Lens Effect</h1>
    <p>Move your cursor to magnify. The lens clones the page and scales it 2x inside a clipped circle that follows the mouse.</p>
    <div class="grid">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>
  </div>

  <div class="lens" id="lens">
    <div class="lens-inner" id="lensInner"></div>
  </div>

  <script>
    const lens = document.getElementById('lens');
    const inner = document.getElementById('lensInner');
    const ZOOM = 2; /* magnification factor */
    const SIZE = 150; /* must match CSS .lens width/height */

    /* Clone page content into lens */
    inner.innerHTML = document.getElementById('source').outerHTML;

    document.addEventListener('mousemove', (e) => {
      const x = e.clientX, y = e.clientY;
      lens.style.left = x + 'px';
      lens.style.top = y + 'px';
      /* Offset the inner clone so the lens shows the correct area */
      inner.style.transform = \`scale(\${ZOOM}) translate(\${-x + SIZE / (2 * ZOOM)}px, \${-y + SIZE / (2 * ZOOM)}px)\`;
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>עיגול שעוקב אחרי הסמן עובד כמו זכוכית מגדלת — הוא מראה גרסה מוגדלת של מה שנמצא מתחתיו בדף. בפועל, תוכן הדף משוכפל לתוך העיגול ומוגדל פי 2, והמיקום מתעדכן כל הזמן כדי שמה שרואים דרך העדשה יתאים בדיוק למה שמתחת לסמן.</p>`,proTipHe:"שנו את ערך ה-ZOOM ל-3 או 4 להגדלה חזקה יותר, או הוסיפו filter: brightness(1.2) לעדשה להדגשת האזור המוגדל.",promptHe:`אני רוצה ליצור אפקט עדשה מגדלת באתר שלי — עיגול שעוקב אחרי הסמן ומגדיל את התוכן שמתחתיו.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הגודל של העדשה (קוטר בפיקסלים)?
2. מה רמת ההגדלה (פי 2, פי 3, וכו׳)?
3. מה הסגנון של מסגרת העדשה (צבע, עובי, צל)?
4. האם העדשה פעילה תמיד או רק בלחיצה/ריחוף?
5. על איזה תוכן העדשה צריכה לעבוד (תמונות, טקסט, כל הדף)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"cursortrailcolor",title:"Cursor Trail Color",titleHe:"שובל צבעוני",description:"Color-changing cursor trail using HSL rotation for a rainbow effect.",descriptionHe:"שובל קורסור צבעוני עם סיבוב HSL ליצירת אפקט קשת בענן.",categories:["cursor"],tags:[{label:"cursor"},{label:"trail"},{label:"HSL"},{label:"rainbow"}],difficulty:"beginner",previewComponent:"cursortrailcolor",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cursor Trail Color</title>
<!-- Cursor Trail Color — rainbow trail using HSL hue rotation on canvas -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; cursor: crosshair;
  }
  canvas {
    position: fixed; inset: 0; z-index: 0;
  }
  .label {
    position: relative; z-index: 1;
    color: #fff; font-size: 1.2rem; opacity: 0.5;
  }
</style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <div class="label">Move your cursor</div>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const trail = []; /* stores {x, y, hue, alpha} */
    const MAX = 50; /* max trail points */
    let hue = 0;
    let mx = -100, my = -100;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Add new point */
      hue = (hue + 2) % 360; /* rotate hue 2deg per frame */
      trail.push({ x: mx, y: my, hue, alpha: 1 });
      if (trail.length > MAX) trail.shift();

      /* Draw trail */
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const progress = i / trail.length;
        const radius = 4 + progress * 10; /* grow from 4 to 14 */
        p.alpha -= 0.015; /* fade each frame */
        if (p.alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = \`hsla(\${p.hue}, 80%, 60%, \${p.alpha})\`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל תנועה של העכבר משאירה שובל של עיגולים צבעוניים שמשנים צבע כל הזמן כמו קשת. כל עיגול חדש מקבל גוון קצת שונה מהקודם, ועיגולים ישנים דועכים ונעלמים בהדרגה. הגודל של העיגולים גדל לכיוון הסמן, מה שנותן צורת זנב יפה. הכל מצויר על קנבס כדי שזה ירוץ חלק גם עם הרבה עיגולים.</p>`,proTipHe:"שנו את קצב סיבוב ה-hue (2 מעלות) לערך גבוה יותר לקשת מהירה, או נמוך יותר למעבר צבעים עדין.",promptHe:`אני רוצה ליצור שובל צבעוני שעוקב אחרי העכבר באתר שלי — אפקט קשת בענן שדועך ונעלם.

לפני שתיצור את הקוד, תשאל אותי:
1. מה סגנון השובל (עיגולים, כוכבים, קווים)?
2. מה טווח הצבעים (קשת מלאה, גווני כחול, צבע אחיד שדועך)?
3. כמה ארוך השובל (כמה נקודות)?
4. מה המהירות של שינוי הצבעים?
5. מה הגודל של הנקודות בשובל?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"followeyes",title:"Follow Eyes",titleHe:"עיניים עוקבות",description:"Illustrated eyes on screen that follow the cursor movement with smooth animation.",descriptionHe:"עיניים מאויירות על המסך שעוקבות אחרי תנועת הסמן באנימציה חלקה.",categories:["cursor"],tags:[{label:"cursor"},{label:"eyes"},{label:"follow"},{label:"fun"}],difficulty:"intermediate",previewComponent:"followeyes",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Follow Eyes</title>
<!-- Follow Eyes — two illustrated eyes that track cursor position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    gap: 3rem; font-family: sans-serif;
  }
  .eye {
    width: 120px; height: 120px;
    background: radial-gradient(circle, #f0f0f0 60%, #d0d0d0 100%);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: inset 0 4px 12px rgba(0,0,0,0.2),
                0 0 40px rgba(200,245,59,0.08);
    position: relative;
    overflow: hidden;
  }
  .eye::before {
    content: '';
    position: absolute; top: 8px; left: 25%;
    width: 50%; height: 20px;
    background: rgba(255,255,255,0.5);
    border-radius: 50%;
    filter: blur(6px);
  }
  .pupil {
    width: 44px; height: 44px;
    background: radial-gradient(circle at 35% 35%, #333 50%, #111 100%);
    border-radius: 50%;
    position: relative;
    transition: transform 0.1s ease-out;
  }
  .pupil::after {
    content: '';
    position: absolute; top: 8px; left: 10px;
    width: 12px; height: 12px;
    background: #fff; border-radius: 50%;
  }
</style>
</head>
<body>
  <div class="eye" id="eye1"><div class="pupil" id="pupil1"></div></div>
  <div class="eye" id="eye2"><div class="pupil" id="pupil2"></div></div>

  <script>
    const eyes = [
      { eye: document.getElementById('eye1'), pupil: document.getElementById('pupil1') },
      { eye: document.getElementById('eye2'), pupil: document.getElementById('pupil2') },
    ];
    const MAX_OFFSET = 28; /* max pupil movement in px */

    document.addEventListener('mousemove', (e) => {
      eyes.forEach(({ eye, pupil }) => {
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const angle = Math.atan2(dy, dx);
        const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 300);
        const offset = (dist / 300) * MAX_OFFSET;
        const tx = Math.cos(angle) * offset;
        const ty = Math.sin(angle) * offset;
        pupil.style.transform = \`translate(\${tx}px, \${ty}px)\`;
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>שתי עיניים מאויירות מופיעות על המסך, והאישונים שלהן זזים לכיוון הסמן בכל פעם שמזיזים את העכבר. האישונים מוגבלים לטווח תנועה כדי שהם לא ייצאו מהעין. ככל שהסמן רחוק יותר מהעין, האישון נמשך יותר לכיוונו. הרעיון פשוט אבל נותן תחושה חיה ומשעשעת — כאילו מישהו באתר מסתכל עליכם.</p>`,proTipHe:'הוסיפו אנימציית "מצמוץ" עם keyframes שמשנה את scaleY של העין ל-0.1 ובחזרה ל-1 כל כמה שניות.',promptHe:`אני רוצה ליצור אפקט עיניים עוקבות באתר שלי — עיניים מאויירות שהאישונים שלהן עוקבים אחרי הסמן.

לפני שתיצור את הקוד, תשאל אותי:
1. כמה עיניים אני רוצה (2, יותר, או עין אחת)?
2. מה הגודל של העיניים?
3. מה הצבע של האישונים והעיניים?
4. האם להוסיף אפקט מצמוץ אוטומטי?
5. איפה העיניים יופיעו בדף (מרכז, פינה, לצד תוכן)?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"skeletonloader",title:"Skeleton Loader",titleHe:"שלד טעינה",description:"Skeleton screen with animated shimmer pulse that mimics content placeholders.",descriptionHe:"מסך שלד עם אנימציית נצנוץ פועם שמדמה מקומות שמורים לתוכן.",categories:["loader"],tags:[{label:"skeleton"},{label:"loading"},{label:"shimmer"}],difficulty:"beginner",previewComponent:"skeletonloader",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Skeleton Loader — shimmer pulse placeholder while content loads -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
  }
  .skeleton-card {
    width: 340px;
    padding: 24px;
    background: #111;
    border-radius: 16px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .skeleton-row {
    display: flex; gap: 12px; align-items: center;
  }
  .skeleton {
    background: linear-gradient(
      90deg,
      #1a1a1a 25%,   /* base color */
      #2a2a2a 50%,   /* shimmer highlight */
      #1a1a1a 75%    /* back to base */
    );
    background-size: 400% 100%; /* 4x width for travel distance */
    animation: shimmer 1.8s ease-in-out infinite;
    border-radius: 8px;
  }
  .skeleton-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .skeleton-line { height: 12px; }
  .skeleton-line-short { width: 60%; }
  .skeleton-line-medium { width: 80%; }
  .skeleton-line-full { width: 100%; }
  .skeleton-image {
    width: 100%; height: 120px;
    border-radius: 12px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
</head>
<body>
<div class="skeleton-card">
  <div class="skeleton-row">
    <div class="skeleton skeleton-avatar"></div>
    <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
      <div class="skeleton skeleton-line skeleton-line-medium"></div>
      <div class="skeleton skeleton-line skeleton-line-short"></div>
    </div>
  </div>
  <div class="skeleton skeleton-image"></div>
  <div class="skeleton skeleton-line skeleton-line-full"></div>
  <div class="skeleton skeleton-line skeleton-line-medium"></div>
  <div class="skeleton skeleton-line skeleton-line-short"></div>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>בזמן שהתוכן האמיתי נטען, במקום מסך ריק מוצגים מלבנים ועיגולים אפורים שנראים כמו המבנה של הדף. גל אור רך עובר עליהם שוב ושוב כדי להראות שמשהו קורה. ככה המשתמש מרגיש שהדף כבר כמעט מוכן, במקום לבהות בספינר גנרי.</p>`,proTipHe:"השתמשו ב-@media (prefers-reduced-motion) כדי לבטל את האנימציה למשתמשים שמעדיפים פחות תנועה.",promptHe:"אני רוצה אנימציית טעינה בסגנון Skeleton Loader — מסך שלד עם מלבנים ועיגולים אפורים שגל אור (shimmer) עובר עליהם בזמן שהתוכן נטען. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים שאני רוצה לשלד ולגל האור? באיזו מהירות הנצנוץ צריך לנוע? מה המבנה שצריך להציג (אווטאר + שורות טקסט, תמונה, כרטיס)? מה הגודל הכללי של הרכיב? האם צריך רקע כהה או בהיר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"pagereveal",title:"Page Reveal",titleHe:"חשיפת עמוד",description:"Full-page overlay that wipes away on load to reveal the content beneath.",descriptionHe:"שכבת כיסוי על כל העמוד שנמחקת בטעינה כדי לחשוף את התוכן מתחת.",categories:["loader"],tags:[{label:"transition"},{label:"page-load"},{label:"reveal"}],difficulty:"intermediate",previewComponent:"pagereveal",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Page Reveal — full-screen overlay wipes away on load -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    overflow: hidden;
  }
  .page-content {
    text-align: center; color: #f0f0f0;
    opacity: 0;
    animation: content-fadein 1s ease 1.2s forwards;
  }
  .page-content h1 {
    font-size: 3rem; margin-bottom: 0.5rem;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .page-content p { color: #888; font-size: 1.2rem; }
  /* Overlay that wipes horizontally */
  .page-overlay {
    position: fixed; inset: 0;
    background: #c8f53b;
    z-index: 100;
    animation: wipe-out 1.2s cubic-bezier(0.77, 0, 0.18, 1) forwards;
  }
  /* Secondary overlay for layered feel */
  .page-overlay-2 {
    position: fixed; inset: 0;
    background: #44aaff;
    z-index: 99;
    animation: wipe-out 1.2s cubic-bezier(0.77, 0, 0.18, 1) 0.15s forwards;
  }
  @keyframes wipe-out {
    0%   { transform: translateX(0); }
    100% { transform: translateX(101%); }
  }
  @keyframes content-fadein {
    0%   { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
</style>
</head>
<body>
<div class="page-overlay"></div>
<div class="page-overlay-2"></div>
<div class="page-content">
  <h1>ברוכים הבאים</h1>
  <p>העמוד נחשף עם אנימציית מעבר חלקה</p>
</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשהעמוד נטען, שתי שכבות צבעוניות מכסות את כל המסך ואז נמחקות הצידה אחת אחרי השנייה. אחרי שהשכבות נעלמות, התוכן שמתחת מופיע בהדרגה עם אנימציית כניסה חלקה. זה יוצר רושם ראשוני מרשים ומקצועי כשנכנסים לאתר.</p>`,proTipHe:"אפשר לשנות את כיוון המחיקה ל-translateY לאפקט אנכי, או להשתמש ב-clip-path לחיתוך יצירתי.",promptHe:"אני רוצה אפקט חשיפת עמוד (Page Reveal) — שכבות צבעוניות שמכסות את כל המסך ונמחקות הצידה כשהדף נטען, וחושפות את התוכן מתחת. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לשכבות הכיסוי? כמה שכבות אני רוצה? באיזה כיוון המחיקה (ימין, שמאל, למעלה, למטה)? מה המהירות של האנימציה? האם התוכן צריך להופיע עם אפקט נוסף אחרי החשיפה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"morphloader",title:"Morph Loader",titleHe:"טעינה מורפת",description:"Loading shape morphs between circle, square, and triangle continuously.",descriptionHe:"צורת טעינה שמשתנה ברציפות בין עיגול, ריבוע ומשולש.",categories:["loader"],tags:[{label:"morph"},{label:"shape"},{label:"animation"}],difficulty:"intermediate",previewComponent:"morphloader",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Morph Loader — shape morphs between circle, square, triangle -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .morph-shape {
    width: 80px; height: 80px;
    background: linear-gradient(135deg, #c8f53b, #44aaff);
    animation: morph 6s ease-in-out infinite;
    will-change: border-radius, transform, clip-path;
  }
  .morph-ring {
    width: 96px; height: 96px;
    position: absolute;
    border-radius: 50%;
    border: 2px solid #c8f53b;
    opacity: 0.25;
    animation: morph-pulse 2s ease-in-out infinite;
  }
  .morph-label {
    color: #555; font-size: 0.9rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes morph {
    0%, 100% {
      border-radius: 50%;          /* circle */
      transform: rotate(0deg);
      clip-path: none;
    }
    33% {
      border-radius: 12px;         /* rounded square */
      transform: rotate(90deg);
      clip-path: none;
    }
    66% {
      border-radius: 0;
      transform: rotate(180deg);
      clip-path: polygon(50% 0%, 0% 100%, 100% 100%); /* triangle */
    }
  }
  @keyframes morph-pulse {
    0%, 100% { transform: scale(1); opacity: 0.25; }
    50% { transform: scale(1.5); opacity: 0; }
  }
</style>
</head>
<body>
<div style="position:relative; display:flex; align-items:center; justify-content:center;">
  <div class="morph-ring"></div>
  <div class="morph-shape"></div>
</div>
<p class="morph-label">טוען...</p>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>צורה צבעונית משתנה ברציפות בין עיגול, ריבוע ומשולש תוך כדי סיבוב איטי. מסביב לצורה יש טבעת שפועמת ונעלמת, מה שנותן תחושה של עומק ותנועה. האפקט הזה עובד מצוין כאנימציית טעינה שמושכת את העין בלי להיות מעצבנת.</p>`,proTipHe:"הוסיפו filter: hue-rotate() לאנימציה כדי שהצבעים ישתנו בהדרגה יחד עם הצורה.",promptHe:'אני רוצה אנימציית טעינה בסגנון Morph Loader — צורה שמשתנה ברציפות בין עיגול, ריבוע ומשולש עם סיבוב חלק וטבעת פועמת ברקע. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הצורה? באיזו מהירות השינוי בין הצורות? מה הגודל של האלמנט? האם להוסיף טקסט מתחת (כמו "טוען...")? האם צריך טבעת פועמת ברקע או בלי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.'},{id:"dotsloader",title:"Dots Loader",titleHe:"טעינת נקודות",description:"Three dots that bounce up and down in a smooth sequential pattern.",descriptionHe:"שלוש נקודות שקופצות למעלה ולמטה בדפוס רציף וחלק.",categories:["loader"],tags:[{label:"dots"},{label:"bounce"},{label:"loading"}],difficulty:"beginner",previewComponent:"dotsloader",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Dots Loader — three dots bounce in sequence -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .dots-container {
    display: flex;
    gap: 14px; /* space between dots */
    align-items: center;
  }
  .dot {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #c8f53b;
    animation: dot-bounce 1.4s ease-in-out infinite;
  }
  .dot:nth-child(1) { animation-delay: 0s; }
  .dot:nth-child(2) { animation-delay: 0.16s; }   /* 160ms stagger */
  .dot:nth-child(3) { animation-delay: 0.32s; }   /* 320ms stagger */
  .dots-label {
    color: #555; font-size: 0.9rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes dot-bounce {
    0%, 80%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0.4;
    }
    40% {
      transform: translateY(-24px) scale(1.15); /* bounce height */
      opacity: 1;
    }
  }
</style>
</head>
<body>
<div class="dots-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>
<p class="dots-label">טוען...</p>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>שלוש נקודות עגולות קופצות למעלה ולמטה אחת אחרי השנייה, כמו גל. כשנקודה בשיא הקפיצה היא גדלה קצת ונהיית יותר בולטת, וכשהיא למטה היא שקופה יותר. התוצאה היא אנימציית טעינה קלאסית שכולם מכירים, שנותנת תחושה שמשהו קורה ברקע.</p>`,proTipHe:"החליפו את הנקודות בריבועים או לבבות כדי להתאים את האנימציה לסגנון האתר שלכם.",promptHe:'אני רוצה אנימציית טעינה בסגנון Dots Loader — שלוש נקודות שקופצות למעלה ולמטה בזו אחר זו כמו גל. לפני שאתה כותב קוד, תשאל אותי: מה צבע הנקודות? כמה נקודות אני רוצה? מה הגודל של כל נקודה? באיזו מהירות הקפיצה? האם להוסיף טקסט כמו "טוען..." מתחת? האם הרקע כהה או בהיר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.'},{id:"progressbar",title:"Progress Bar",titleHe:"סרגל התקדמות",description:"Animated progress bar with a gradient fill and a shimmer pulse effect.",descriptionHe:"סרגל התקדמות מונפש עם מילוי גרדיאנט ואפקט נצנוץ פועם.",categories:["loader"],tags:[{label:"progress"},{label:"bar"},{label:"gradient"}],difficulty:"beginner",previewComponent:"progressbar",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Progress Bar — animated fill with gradient and shimmer -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 16px;
  }
  .progress-track {
    width: 320px; height: 14px;
    background: #1a1a1a;
    border-radius: 7px;
    overflow: hidden;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    border-radius: 7px;
    background: linear-gradient(90deg, #c8f53b, #44aaff);
    background-size: 400% 100%;
    animation:
      progress-grow 2.5s ease-in-out infinite,
      progress-shimmer 1.5s linear infinite;
  }
  .progress-label {
    color: #555; font-size: 0.85rem;
    letter-spacing: 1px;
    animation: label-pulse 2.5s ease-in-out infinite;
  }
  /* Glow under the bar */
  .progress-glow {
    width: 320px; height: 14px;
    border-radius: 7px;
    position: absolute;
    filter: blur(12px);    /* glow radius */
    opacity: 0.3;
    background: linear-gradient(90deg, #c8f53b, #44aaff);
    animation: progress-grow 2.5s ease-in-out infinite;
  }
  @keyframes progress-grow {
    0%   { width: 0%; }
    80%  { width: 100%; }
    100% { width: 100%; }
  }
  @keyframes progress-shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes label-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
</style>
</head>
<body>
<div style="position:relative;">
  <div class="progress-glow"></div>
  <div class="progress-track">
    <div class="progress-fill"></div>
  </div>
</div>
<p class="progress-label">Loading...</p>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>סרגל כהה מתמלא בהדרגה בצבע גרדיאנט מירוק לכחול, עם נצנוץ שנע על פני המילוי. מתחת לסרגל יש זוהר מטושטש שנותן אפקט ניאוני, והטקסט למטה פועם בסנכרון עם ההתקדמות. זה סרגל התקדמות קלאסי אבל עם נראות מודרנית ומושכת.</p>`,proTipHe:"חברו את הסרגל ל-JavaScript אמיתי עם fetch progress events כדי להציג התקדמות אמיתית בהורדות.",promptHe:"אני רוצה סרגל התקדמות מונפש (Progress Bar) עם מילוי גרדיאנט, אפקט נצנוץ שנע על פני הסרגל, וזוהר ניאוני מתחת. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הגרדיאנט? מה הרוחב והגובה של הסרגל? באיזו מהירות המילוי? האם להציג אחוזים או טקסט מותאם אישית? האם צריך זוהר מתחת לסרגל? מה צבע הרקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"countdowntimer",title:"Countdown Timer",titleHe:"ספירה לאחור",description:"Animated countdown timer with a 3D flip animation between numbers.",descriptionHe:"טיימר ספירה לאחור מונפש עם אנימציית היפוך תלת-ממדית בין מספרים.",categories:["loader"],tags:[{label:"countdown"},{label:"flip"},{label:"timer"}],difficulty:"intermediate",previewComponent:"countdowntimer",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Countdown Timer — flip animation between digits -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    gap: 12px;
  }
  .flip-card {
    width: 80px; height: 100px;
    perspective: 400px;     /* 3D depth */
    position: relative;
  }
  .flip-face {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: #111;
    border: 1px solid #222;
    border-radius: 12px;
    font-size: 48px;
    font-weight: 800;
    color: #c8f53b;
    font-variant-numeric: tabular-nums;
    backface-visibility: hidden;
  }
  .flip-face.active {
    animation: flip-out 0.3s ease-in forwards;
    transform-origin: bottom center;
  }
  .flip-face.next {
    animation: flip-in 0.3s ease-out 0.3s forwards;
    transform-origin: top center;
    opacity: 0;
    position: absolute; top: 0; left: 0;
  }
  /* Separator colon */
  .flip-colon {
    font-size: 48px; font-weight: 800;
    color: #333;
    animation: colon-blink 1s step-end infinite;
  }
  .flip-label {
    position: absolute; bottom: -24px; left: 0; width: 100%;
    text-align: center; font-size: 0.7rem;
    color: #555; text-transform: uppercase; letter-spacing: 2px;
  }
  @keyframes flip-out {
    0%   { transform: rotateX(0deg); opacity: 1; }
    100% { transform: rotateX(-90deg); opacity: 0; }
  }
  @keyframes flip-in {
    0%   { transform: rotateX(90deg); opacity: 0; }
    100% { transform: rotateX(0deg); opacity: 1; }
  }
  @keyframes colon-blink {
    50% { opacity: 0; }
  }
</style>
</head>
<body>
<div class="flip-card">
  <div class="flip-face" id="min">05</div>
  <span class="flip-label">דקות</span>
</div>
<span class="flip-colon">:</span>
<div class="flip-card">
  <div class="flip-face" id="sec">00</div>
  <span class="flip-label">שניות</span>
</div>
<script>
  let total = 300; /* 5 minutes in seconds */
  const minEl = document.getElementById('min');
  const secEl = document.getElementById('sec');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    if (total <= 0) { total = 300; } /* loop back */
    total--;
    const m = Math.floor(total / 60);
    const s = total % 60;
    /* Trigger flip animation by cloning */
    [minEl, secEl].forEach((el, i) => {
      const val = i === 0 ? pad(m) : pad(s);
      if (el.textContent !== val) {
        el.classList.add('active');
        const next = el.cloneNode(true);
        next.classList.remove('active');
        next.classList.add('next');
        next.textContent = val;
        el.parentElement.appendChild(next);
        setTimeout(() => {
          el.textContent = val;
          el.classList.remove('active');
          next.remove();
        }, 600);
      }
    });
  }

  setInterval(tick, 1000);
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כרטיסים עם מספרים מציגים ספירה לאחור, וכל פעם שמספר משתנה הוא מתהפך בתלת-ממד כמו שעון מכני ישן. הנקודותיים באמצע מהבהבות כל שנייה כדי לתת תחושה של שעון אמיתי. האפקט מושלם לדפי השקה או כל מקום שצריכים ספירה לאחור מרשימה.</p>`,proTipHe:"הוסיפו קו אופקי באמצע כל כרטיס עם pseudo-element כדי לדמות שעון flip מכני קלאסי.",promptHe:"אני רוצה טיימר ספירה לאחור (Countdown Timer) עם אנימציית היפוך תלת-ממדית בין המספרים, כמו שעון flip מכני. לפני שאתה כותב קוד, תשאל אותי: מאיזה זמן להתחיל את הספירה? מה הצבעים של הכרטיסים והמספרים? מה הגודל של הכרטיסים? האם להציג שעות, דקות ושניות או רק חלק מהם? מה קורה כשהספירה מגיעה לאפס? האם צריך טקסט מתחת לכל כרטיס? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"numberticket",title:"Number Ticket",titleHe:"כרטיס מספר",description:"Number display that rolls digits up like a slot machine.",descriptionHe:"תצוגת מספרים שמגלגלת ספרות למעלה כמו מכונת מזל.",categories:["loader"],tags:[{label:"slot"},{label:"numbers"},{label:"roll"}],difficulty:"intermediate",previewComponent:"numberticket",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Number Ticket — digits roll like a slot machine -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 24px;
  }
  .ticket {
    display: flex; gap: 8px;
    background: #111;
    padding: 16px 24px;
    border-radius: 16px;
    border: 1px solid #222;
  }
  .slot {
    width: 52px; height: 72px;
    overflow: hidden;
    background: #0a0a0a;
    border-radius: 8px;
    position: relative;
  }
  /* Gradient mask for depth */
  .slot::before, .slot::after {
    content: ''; position: absolute;
    left: 0; right: 0; height: 20px;
    z-index: 2; pointer-events: none;
  }
  .slot::before { top: 0; background: linear-gradient(#0a0a0a, transparent); }
  .slot::after  { bottom: 0; background: linear-gradient(transparent, #0a0a0a); }
  .slot-strip {
    display: flex; flex-direction: column;
    align-items: center;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  .slot-num {
    height: 72px; /* must match .slot height */
    display: flex; align-items: center; justify-content: center;
    font-size: 40px; font-weight: 800;
    color: #c8f53b;
    font-variant-numeric: tabular-nums;
  }
  .ticket-label {
    color: #555; font-size: 0.85rem;
    letter-spacing: 3px; text-transform: uppercase;
  }
</style>
</head>
<body>
<div class="ticket" id="ticket">
  <div class="slot"><div class="slot-strip" id="s0"></div></div>
  <div class="slot"><div class="slot-strip" id="s1"></div></div>
  <div class="slot"><div class="slot-strip" id="s2"></div></div>
</div>
<p class="ticket-label">כרטיס מספר</p>
<script>
  const strips = [
    document.getElementById('s0'),
    document.getElementById('s1'),
    document.getElementById('s2'),
  ];
  /* Build digit strips 0-9 for each slot */
  strips.forEach((strip) => {
    for (let d = 0; d <= 9; d++) {
      const el = document.createElement('div');
      el.className = 'slot-num';
      el.textContent = d;
      strip.appendChild(el);
    }
  });

  function rollTo(targets) {
    strips.forEach((strip, i) => {
      const offset = targets[i] * -72; /* 72px per digit */
      strip.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  function randomRoll() {
    const targets = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    rollTo(targets);
  }

  randomRoll();
  setInterval(randomRoll, 2000); /* roll every 2s */
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>שלושה חלונות קטנים מציגים ספרות שמתגלגלות למעלה כמו מכונת מזל. כל כמה שניות נבחרים מספרים חדשים והספרות מתגלגלות אליהם בתנועה חלקה. בקצוות החלונות יש הצללה שגורמת לספרות להיעלם בהדרגה, מה שנותן תחושה של עומק ותלת-ממד.</p>`,proTipHe:"הוסיפו animation-delay שונה לכל slot כדי שהספרות ייעצרו אחת אחרי השנייה כמו מכונת מזל אמיתית.",promptHe:"אני רוצה תצוגת מספרים בסגנון Number Ticket — ספרות שמתגלגלות למעלה כמו מכונת מזל (slot machine). לפני שאתה כותב קוד, תשאל אותי: כמה ספרות להציג? מה צבע הספרות והרקע? מה הגודל של כל חריץ? באיזו מהירות הגלגול? האם המספרים צריכים להיות אקראיים או לספור למספר מסוים? האם להוסיף כותרת או תווית מתחת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"liquidloader",title:"Liquid Loader",titleHe:"טעינה נוזלית",description:"Liquid fill progress inside a circle with animated wave surface.",descriptionHe:"מילוי נוזלי מתקדם בתוך עיגול עם משטח גל מונפש.",categories:["loader"],tags:[{label:"liquid"},{label:"wave"},{label:"fill"},{label:"svg"}],difficulty:"advanced",previewComponent:"liquidloader",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<!-- Liquid Loader — liquid fill with wave inside a circle -->
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a;
    font-family: sans-serif;
    flex-direction: column; gap: 20px;
  }
  .liquid-container {
    width: 140px; height: 140px;
    border-radius: 50%;
    border: 3px solid #222;
    position: relative;
    overflow: hidden;
  }
  .liquid-fill {
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(to top, #c8f53b, #44aaff);
    animation: liquid-rise 4s ease-in-out infinite;
    opacity: 0.85;
  }
  /* Wave on top of liquid */
  .liquid-wave {
    position: absolute;
    top: -8px;        /* wave crests peek above liquid level */
    left: -50%;
    width: 200%;
    height: 16px;
    border-radius: 40%;
    background: rgba(200, 245, 59, 0.6);
    animation: wave-move 2s linear infinite;
  }
  .liquid-wave:nth-child(2) {
    top: -4px;
    animation-duration: 3s;
    animation-direction: reverse;
    opacity: 0.4;
    background: rgba(68, 170, 255, 0.5);
  }
  .liquid-label {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    z-index: 2;
    font-size: 1.6rem; font-weight: 800;
    color: #f0f0f0;
    mix-blend-mode: difference;
  }
  .liquid-caption {
    color: #555; font-size: 0.85rem;
    letter-spacing: 2px; text-transform: uppercase;
  }
  @keyframes liquid-rise {
    0%, 100% { transform: translateY(100%); }
    50%, 80% { transform: translateY(0%); }
  }
  @keyframes wave-move {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
</style>
</head>
<body>
<div class="liquid-container">
  <div class="liquid-fill">
    <div class="liquid-wave"></div>
    <div class="liquid-wave"></div>
  </div>
  <div class="liquid-label" id="pct">0%</div>
</div>
<p class="liquid-caption">טוען...</p>
<script>
  const label = document.getElementById('pct');
  let pct = 0;
  let dir = 1;
  setInterval(() => {
    pct += dir * 2;          /* increment 2% each tick */
    if (pct >= 100) dir = -1;
    if (pct <= 0) dir = 1;
    label.textContent = pct + '%';
  }, 80);                     /* ~50 ticks for 0→100 */
</script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>עיגול מתמלא בנוזל צבעוני שעולה מלמטה למעלה, עם גלים שזזים על פני השטח כמו מים אמיתיים. באמצע העיגול מוצג אחוז ההתקדמות שמתעדכן בזמן אמת. האפקט נראה מרשים ויצירתי, ומתאים למסכי טעינה שרוצים לבלוט מעל הרגיל.</p>`,proTipHe:"החליפו את העיגול בכל צורת SVG עם clip-path — לדוגמה לוגו של החברה שמתמלא בנוזל.",promptHe:"אני רוצה אנימציית טעינה בסגנון Liquid Loader — עיגול שמתמלא בנוזל צבעוני עם גלים מונפשים על פני השטח ותצוגת אחוזים באמצע. לפני שאתה כותב קוד, תשאל אותי: מה הצבעים של הנוזל? מה הגודל של העיגול? באיזו מהירות הנוזל עולה? האם להציג אחוזים או טקסט אחר באמצע? כמה גלים על פני השטח? האם הצורה צריכה להיות עיגול או צורה אחרת? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"imageparallax",title:"Image Parallax",titleHe:"פרלקס תמונה",description:"Image inside a card moves opposite to scroll direction, creating a depth illusion.",descriptionHe:"תמונה בתוך כרטיס נעה בכיוון הפוך לגלילה ויוצרת אשליית עומק.",categories:["media","scroll"],tags:[{label:"parallax"},{label:"image"},{label:"scroll"}],difficulty:"intermediate",previewComponent:"imageparallax",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Parallax</title>
<!-- Image Parallax — image inside card moves opposite to scroll for depth effect -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh;
    background: #0a0a0a;
    font-family: sans-serif;
    color: #fff;
  }
  .spacer {
    height: 60vh;
    display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.1rem;
  }
  .parallax-cards {
    display: flex; gap: 2rem;
    justify-content: center; flex-wrap: wrap;
    padding: 2rem;
  }
  .parallax-card {
    width: 300px;
    height: 220px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .parallax-card__img {
    position: absolute;
    inset: -40px; /* 40px extra on each side for movement range */
    will-change: transform;
    transition: transform 0.1s linear;
  }
  .card-img-1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  .card-img-2 {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  .card-img-3 {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  .parallax-card__label {
    position: absolute; bottom: 16px; left: 16px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
    padding: 8px 16px; border-radius: 8px;
    font-size: 0.9rem; z-index: 1;
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down to see parallax images</div>
  <div class="parallax-cards">
    <div class="parallax-card">
      <div class="parallax-card__img card-img-1"></div>
      <div class="parallax-card__label">Mountain View</div>
    </div>
    <div class="parallax-card">
      <div class="parallax-card__img card-img-2"></div>
      <div class="parallax-card__label">Sunset Beach</div>
    </div>
    <div class="parallax-card">
      <div class="parallax-card__img card-img-3"></div>
      <div class="parallax-card__label">Ocean Drive</div>
    </div>
  </div>
  <div class="spacer"></div>

  <script>
    const cards = document.querySelectorAll('.parallax-card');
    const STRENGTH = 0.15; /* parallax intensity — higher = more movement */

    function update() {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const viewH = window.innerHeight;
        /* Center of card relative to viewport center: -1 to 1 */
        const center = (rect.top + rect.height / 2 - viewH / 2) / (viewH / 2);
        const yOffset = center * 40 * STRENGTH; /* max 40px * strength */
        const img = card.querySelector('.parallax-card__img');
        img.style.transform = 'translateY(' + yOffset + 'px)';
      });
    }

    window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשגוללים את הדף, התמונה שבתוך הכרטיס זזה בכיוון ההפוך — וככה נוצרת תחושת עומק, כאילו התמונה נמצאת מאחורי חלון. התמונה קצת יותר גדולה מהכרטיס כדי שיהיה לה מקום לזוז, וסקריפט קטן מחשב לפי מיקום הגלילה כמה להזיז אותה.</p>`,proTipHe:"הוסיפו scale(1.05) קל ב-hover מעל הכרטיס כדי ליצור תחושה שהתמונה מתקרבת אליכם.",promptHe:"אני רוצה אפקט פרלקס תמונה — כרטיסים עם תמונות שזזות בכיוון הפוך לגלילה ויוצרות אשליית עומק. לפני שאתה כותב קוד, תשאל אותי: כמה כרטיסים להציג? מה התמונות שישמשו (URL או placeholder)? מה הגודל של כל כרטיס? מה עוצמת אפקט הפרלקס? האם יש טקסט על הכרטיסים? מה צבע הרקע של הדף? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"imageclip",title:"Image Clip",titleHe:"חיתוך תמונה",description:"Circular or shape clip-path that expands smoothly on hover to reveal the full image.",descriptionHe:"חיתוך עיגולי שמתרחב בצורה חלקה ב-hover וחושף את התמונה המלאה.",categories:["media","hover"],tags:[{label:"clip-path"},{label:"image"},{label:"hover"}],difficulty:"intermediate",previewComponent:"imageclip",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Clip</title>
<!-- Image Clip — shape clip-path expands on hover to reveal full image -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
  }
  .clip-card {
    width: 280px; height: 360px;
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
  }
  .clip-card__bg {
    position: absolute; inset: 0;
    /* Gradient placeholder for image */
    transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .clip-bg-1 {
    background: linear-gradient(135deg, #667eea, #764ba2);
    clip-path: circle(25% at 50% 50%); /* collapsed circle */
  }
  .clip-bg-2 {
    background: linear-gradient(135deg, #f093fb, #f5576c);
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); /* diamond */
  }
  .clip-bg-3 {
    background: linear-gradient(135deg, #43e97b, #38f9d7);
    clip-path: inset(30% round 16px); /* inset rectangle */
  }
  .clip-card:hover .clip-bg-1 {
    clip-path: circle(75% at 50% 50%); /* expanded circle */
  }
  .clip-card:hover .clip-bg-2 {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); /* full rect */
  }
  .clip-card:hover .clip-bg-3 {
    clip-path: inset(0% round 16px); /* full area */
  }
  .clip-card__overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex; flex-direction: column;
    align-items: center; justify-content: flex-end;
    padding: 1.5rem; color: #fff;
    transition: background 0.4s;
  }
  .clip-card:hover .clip-card__overlay {
    background: rgba(0,0,0,0.15);
  }
  .clip-card__overlay h3 { font-size: 1.2rem; margin-bottom: 4px; }
  .clip-card__overlay p  { font-size: 0.85rem; opacity: 0.8; }
  .clip-label {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    padding: 4px 12px; border-radius: 20px;
    font-size: 0.75rem; color: #fff;
  }
</style>
</head>
<body>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-1"></div>
    <div class="clip-card__overlay">
      <h3>Circle Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">circle</span>
  </div>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-2"></div>
    <div class="clip-card__overlay">
      <h3>Diamond Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">polygon</span>
  </div>
  <div class="clip-card">
    <div class="clip-card__bg clip-bg-3"></div>
    <div class="clip-card__overlay">
      <h3>Inset Reveal</h3>
      <p>Hover to expand</p>
    </div>
    <span class="clip-label">inset</span>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>התמונה מוסתרת מאחורי צורה — עיגול, יהלום או מלבן — ורואים רק חלק קטן ממנה. כשמרחפים עם העכבר, הצורה מתרחבת בצורה חלקה וחושפת את כל התמונה. זה עובד עם תכונת CSS שנקראת clip-path שחותכת את מה שמחוץ לצורה.</p>`,proTipHe:"השתמשו בכלי כמו Clippy (bennettfeely.com/clippy) כדי ליצור צורות clip-path מורכבות בצורה ויזואלית.",promptHe:"אני רוצה אפקט חיתוך תמונה — תמונה שמוסתרת מאחורי צורה (עיגול, יהלום וכו') ומתגלה ב-hover. לפני שאתה כותב קוד, תשאל אותי: כמה כרטיסים להציג? מה הצורות שרוצים (עיגול, יהלום, מלבן, כוכב)? מה התמונות או הצבעים? מה הגודל של כל כרטיס? האם יש טקסט על הכרטיסים? מה סגנון האנימציה (מהירות, סוג)? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"beforeafter",title:"Before & After",titleHe:"לפני ואחרי",description:"Draggable divider that reveals before and after images side by side.",descriptionHe:"מחיצה נגררת שחושפת תמונות לפני ואחרי זו לצד זו.",categories:["media","interaction"],tags:[{label:"comparison"},{label:"slider"},{label:"image"}],difficulty:"intermediate",previewComponent:"beforeafter",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Before &amp; After</title>
<!-- Before & After — draggable divider reveals before/after images -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; font-family: sans-serif;
  }
  .ba-container {
    position: relative;
    width: 600px; height: 400px;
    border-radius: 16px;
    overflow: hidden;
    cursor: ew-resize;
    user-select: none;
  }
  .ba-layer {
    position: absolute; inset: 0;
  }
  .ba-before {
    /* "Before" image — warm gradient */
    background: linear-gradient(135deg, #f5af19, #f12711);
    z-index: 1;
  }
  .ba-after {
    /* "After" image — cool gradient */
    background: linear-gradient(135deg, #667eea, #764ba2);
    z-index: 0;
  }
  .ba-clip {
    /* Clip the "before" layer to reveal "after" underneath */
    clip-path: inset(0 50% 0 0); /* initial: show left 50% */
  }
  .ba-label {
    position: absolute; top: 16px;
    padding: 6px 14px; border-radius: 20px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
    color: #fff; font-size: 0.8rem; z-index: 5;
    pointer-events: none;
  }
  .ba-label-before { left: 16px; }
  .ba-label-after  { right: 16px; }
  .ba-handle {
    position: absolute;
    top: 0; bottom: 0;
    left: 50%; /* initial position */
    width: 4px;
    background: #fff;
    z-index: 10;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .ba-handle::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .ba-handle::after {
    content: '\\2194'; /* ↔ arrows */
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px; color: #333;
    z-index: 1;
  }
</style>
</head>
<body>
  <div class="ba-container" id="ba">
    <div class="ba-layer ba-after"></div>
    <div class="ba-layer ba-before ba-clip" id="baClip"></div>
    <div class="ba-handle" id="baHandle"></div>
    <span class="ba-label ba-label-before">Before</span>
    <span class="ba-label ba-label-after">After</span>
  </div>

  <script>
    const container = document.getElementById('ba');
    const clip = document.getElementById('baClip');
    const handle = document.getElementById('baHandle');
    let dragging = false;

    function setPos(x) {
      const rect = container.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      const right = (1 - pct) * 100; /* percentage from right edge */
      clip.style.clipPath = 'inset(0 ' + right + '% 0 0)';
      handle.style.left = pct * 100 + '%';
    }

    container.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup', () => { dragging = false; });

    /* Touch support */
    container.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => { dragging = false; });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש שתי תמונות אחת מעל השנייה — "לפני" ו"אחרי". קו מחיצה לבן מאפשר לגרור ימינה ושמאלה כדי לחשוף יותר מתמונה אחת או מהשנייה. הסקריפט עוקב אחרי מיקום העכבר או האצבע ומעדכן את החיתוך בהתאם, וזה עובד גם על מובייל.</p>`,proTipHe:"הוסיפו אנימציית bounce קלה למחיצה בטעינה כדי לרמז למשתמש שהיא ניתנת לגרירה.",promptHe:'אני רוצה רכיב השוואת לפני ואחרי — שתי תמונות עם מחיצה שאפשר לגרור כדי לראות את ההבדל. לפני שאתה כותב קוד, תשאל אותי: מה שתי התמונות שישמשו (URL או placeholder)? מה הגודל של הרכיב? האם המחיצה אנכית או אופקית? מה צבע וסגנון קו המחיצה? האם יש תוויות "לפני/אחרי"? האם צריך תמיכה במובייל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.'},{id:"imagestack",title:"Image Stack",titleHe:"מחסנית תמונות",description:"Stack of images that fan out on hover, revealing all images in the stack.",descriptionHe:"מחסנית תמונות שנפרשת ב-hover וחושפת את כל התמונות.",categories:["media","hover"],tags:[{label:"stack"},{label:"image"},{label:"hover"},{label:"fan"}],difficulty:"intermediate",previewComponent:"imagestack",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Stack</title>
<!-- Image Stack — stacked images fan out on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    background: #0a0a0a; font-family: sans-serif;
  }
  .stack-container {
    position: relative;
    width: 240px; height: 320px;
    cursor: pointer;
  }
  .stack-item {
    position: absolute;
    width: 240px; height: 320px;
    border-radius: 16px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.5s ease;
    transform-origin: center bottom;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    overflow: hidden;
  }
  .stack-item::after {
    content: attr(data-label);
    position: absolute; bottom: 16px; left: 16px;
    padding: 6px 12px; border-radius: 8px;
    background: rgba(0,0,0,0.5); backdrop-filter: blur(6px);
    color: #fff; font-size: 0.8rem;
  }
  /* Gradient image placeholders */
  .stack-1 { background: linear-gradient(135deg, #667eea, #764ba2); z-index: 5; }
  .stack-2 { background: linear-gradient(135deg, #f093fb, #f5576c); z-index: 4; }
  .stack-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); z-index: 3; }
  .stack-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); z-index: 2; }
  .stack-5 { background: linear-gradient(135deg, #fa709a, #fee140); z-index: 1; }
  /* Collapsed: slight offset */
  .stack-2 { transform: translateY(-4px) rotate(-1deg); }
  .stack-3 { transform: translateY(-8px) rotate(1deg); }
  .stack-4 { transform: translateY(-12px) rotate(-2deg); }
  .stack-5 { transform: translateY(-16px) rotate(2deg); }
  /* Fan out on hover */
  .stack-container:hover .stack-1 { transform: translateX(0) rotate(0deg); }
  .stack-container:hover .stack-2 { transform: translateX(-90px) rotate(-12deg); }
  .stack-container:hover .stack-3 { transform: translateX(-180px) rotate(-24deg); }
  .stack-container:hover .stack-4 { transform: translateX(90px) rotate(12deg); }
  .stack-container:hover .stack-5 { transform: translateX(180px) rotate(24deg); }
  .stack-container:hover .stack-item {
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }
  .hint {
    position: fixed; bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    color: #555; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="stack-container">
    <div class="stack-item stack-5" data-label="Photo 5"></div>
    <div class="stack-item stack-4" data-label="Photo 4"></div>
    <div class="stack-item stack-3" data-label="Photo 3"></div>
    <div class="stack-item stack-2" data-label="Photo 2"></div>
    <div class="stack-item stack-1" data-label="Photo 1"></div>
  </div>
  <p class="hint">Hover over the stack</p>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כמה תמונות מונחות אחת על השנייה כמו חפיסת קלפים. כשמרחפים עם העכבר, הן נפרשות לצדדים כמו מניפה — כל תמונה זזה לכיוון אחר ומסתובבת קצת. כשעוזבים את העכבר, הכל חוזר בחזרה לערימה מסודרת.</p>`,proTipHe:"הוסיפו transition-delay שונה לכל כרטיס כדי ליצור אפקט גל שבו הכרטיסים נפתחים בזה אחר זה.",promptHe:"אני רוצה אפקט מחסנית תמונות — תמונות שמונחות אחת על השנייה ונפרשות כמו מניפה ב-hover. לפני שאתה כותב קוד, תשאל אותי: כמה תמונות במחסנית? מה התמונות (URL או placeholder)? מה הגודל של כל תמונה? באיזה כיוון הן נפרשות (לצדדים, למעלה)? מה זווית הסיבוב? מה צבע הרקע? האם יש טקסט על כל תמונה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"distortimage",title:"Distort Image",titleHe:"עיוות תמונה",description:"SVG filter image distortion effect on hover using feTurbulence and feDisplacementMap.",descriptionHe:"אפקט עיוות תמונה ב-hover באמצעות פילטרי SVG של feTurbulence ו-feDisplacementMap.",categories:["media","hover"],tags:[{label:"distortion"},{label:"SVG filter"},{label:"image"},{label:"hover"}],difficulty:"advanced",previewComponent:"distortimage",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Distort Image</title>
<!-- Distort Image — SVG feTurbulence distortion on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 2rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
  }
  .distort-card {
    width: 320px; height: 400px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: filter 0.4s ease;
  }
  .distort-card:hover {
    filter: url(#distortFilter);
  }
  .distort-card__img {
    width: 100%; height: 100%;
  }
  .distort-img-1 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  }
  .distort-img-2 {
    background: linear-gradient(135deg, #f5af19, #f12711 50%, #a80077 100%);
  }
  /* Grid overlay for visual texture */
  .distort-card__img::before {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 40px 40px; /* grid cell size */
  }
  .distort-card__label {
    position: absolute; bottom: 16px; left: 16px;
    color: #fff; font-size: 1.2rem; font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5);
    z-index: 2;
  }
  .distort-card__label small {
    display: block; font-size: 0.8rem; font-weight: 400; opacity: 0.7;
  }
  .hint {
    width: 100%; text-align: center;
    color: #555; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <!-- SVG filter definition -->
  <svg style="position:absolute;width:0;height:0">
    <filter id="distortFilter">
      <feTurbulence id="turb" type="turbulence"
        baseFrequency="0.02" numOctaves="3"
        result="turbulence" seed="5" />
      <feDisplacementMap in="SourceGraphic" in2="turbulence"
        scale="0" xChannelSelector="R" yChannelSelector="G">
        <animate attributeName="scale"
          values="0;30;0" dur="0.8s"
          begin="indefinite" fill="freeze" id="distAnim" />
      </feDisplacementMap>
    </filter>
  </svg>

  <div class="distort-card" id="card1">
    <div class="distort-card__img distort-img-1"></div>
    <div class="distort-card__label">Liquid Waves<small>Hover to distort</small></div>
  </div>
  <div class="distort-card" id="card2">
    <div class="distort-card__img distort-img-2"></div>
    <div class="distort-card__label">Heat Haze<small>Hover to distort</small></div>
  </div>
  <p class="hint">Hover over the images</p>

  <script>
    const turb = document.getElementById('turb');
    const cards = document.querySelectorAll('.distort-card');
    let animId;

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        let seed = 1;
        /* Animate turbulence seed for varied distortion */
        animId = setInterval(() => {
          seed = (seed % 50) + 1;
          turb.setAttribute('seed', seed);
        }, 80); /* update every 80ms */
      });

      card.addEventListener('mouseleave', () => {
        clearInterval(animId);
        turb.setAttribute('seed', '5');
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמרחפים עם העכבר מעל התמונה, היא מתעוותת כאילו מסתכלים עליה דרך מים או גלי חום. האפקט הזה נוצר באמצעות פילטר SVG שמייצר תבנית רעש ומזיז את הפיקסלים של התמונה לפיה. סקריפט קטן משנה את התבנית כל הזמן כדי שהעיוות ייראה כמו תנועה חיה.</p>`,proTipHe:"שלבו את האפקט עם transition על scale ב-hover כדי ליצור תחושה של תמונה שמתעוותת ומתגדלת בו-זמנית.",promptHe:"אני רוצה אפקט עיוות תמונה — תמונה שמתעוותת ב-hover באפקט נוזלי או גלי חום באמצעות פילטרי SVG. לפני שאתה כותב קוד, תשאל אותי: כמה תמונות להציג? מה התמונות (URL או placeholder)? מה הגודל של כל תמונה? מה סוג העיוות (גלי, נוזלי, רעידה)? מה עוצמת העיוות? מה מהירות האנימציה? מה צבע הרקע? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"imagegallery",title:"Image Gallery",titleHe:"גלריית תמונות",description:"Masonry-style grid gallery with lightbox zoom effect on click.",descriptionHe:"גלריית רשת בסגנון masonry עם אפקט זום לתיבת אור בלחיצה.",categories:["media"],tags:[{label:"gallery"},{label:"masonry"},{label:"lightbox"},{label:"grid"}],difficulty:"intermediate",previewComponent:"imagegallery",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Image Gallery</title>
<!-- Image Gallery — masonry grid with lightbox zoom on click -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    background: #0a0a0a; font-family: sans-serif;
    padding: 2rem;
  }
  h1 { color: #fff; text-align: center; margin-bottom: 2rem; font-size: 1.6rem; }
  .gallery {
    columns: 3;
    column-gap: 12px;
    max-width: 900px;
    margin: 0 auto;
  }
  .gallery-item {
    break-inside: avoid;
    margin-bottom: 12px;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.4);
  }
  .gallery-item__img {
    width: 100%; display: block;
  }
  /* Gradient image placeholders with varied heights */
  .gi-1 { background: linear-gradient(135deg, #667eea, #764ba2); height: 200px; }
  .gi-2 { background: linear-gradient(135deg, #f093fb, #f5576c); height: 280px; }
  .gi-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); height: 180px; }
  .gi-4 { background: linear-gradient(135deg, #43e97b, #38f9d7); height: 240px; }
  .gi-5 { background: linear-gradient(135deg, #fa709a, #fee140); height: 200px; }
  .gi-6 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); height: 260px; }
  .gi-7 { background: linear-gradient(135deg, #ffecd2, #fcb69f); height: 190px; }
  .gi-8 { background: linear-gradient(135deg, #89f7fe, #66a6ff); height: 220px; }
  .gi-9 { background: linear-gradient(135deg, #fddb92, #d1fdff); height: 250px; }

  /* Lightbox overlay */
  .lightbox {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.9);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .lightbox.active { opacity: 1; pointer-events: all; }
  .lightbox__content {
    width: 70vw; height: 70vh;
    border-radius: 16px;
    transform: scale(0.8);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .lightbox.active .lightbox__content {
    transform: scale(1);
  }
  .lightbox__close {
    position: absolute; top: 24px; right: 24px;
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: none;
    color: #fff; font-size: 1.4rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lightbox__close:hover { background: rgba(255,255,255,0.3); }
</style>
</head>
<body>
  <h1>Gallery</h1>
  <div class="gallery" id="gallery">
    <div class="gallery-item" data-bg="linear-gradient(135deg, #667eea, #764ba2)"><div class="gallery-item__img gi-1"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #f093fb, #f5576c)"><div class="gallery-item__img gi-2"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #4facfe, #00f2fe)"><div class="gallery-item__img gi-3"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #43e97b, #38f9d7)"><div class="gallery-item__img gi-4"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #fa709a, #fee140)"><div class="gallery-item__img gi-5"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #a18cd1, #fbc2eb)"><div class="gallery-item__img gi-6"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #ffecd2, #fcb69f)"><div class="gallery-item__img gi-7"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #89f7fe, #66a6ff)"><div class="gallery-item__img gi-8"></div></div>
    <div class="gallery-item" data-bg="linear-gradient(135deg, #fddb92, #d1fdff)"><div class="gallery-item__img gi-9"></div></div>
  </div>

  <div class="lightbox" id="lightbox">
    <div class="lightbox__content" id="lbContent"></div>
    <button class="lightbox__close" id="lbClose">&times;</button>
  </div>

  <script>
    const lightbox = document.getElementById('lightbox');
    const lbContent = document.getElementById('lbContent');
    const lbClose = document.getElementById('lbClose');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const bg = item.getAttribute('data-bg');
        lbContent.style.background = bg;
        lightbox.classList.add('active');
      });
    });

    lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('active');
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>תמונות בגדלים שונים מסודרות בפריסת עמודות כמו בפינטרסט. כשלוחצים על תמונה, היא נפתחת בגדול על כל המסך עם אפקט זום חלק. אפשר לסגור את התצוגה המוגדלת בלחיצה על X, על הרקע הכהה, או במקש Escape.</p>`,proTipHe:"הוסיפו חצים לניווט בין תמונות בתוך ה-lightbox כדי ליצור חוויית גלרייה מלאה.",promptHe:"אני רוצה גלריית תמונות בסגנון masonry עם תיבת אור — תמונות בגדלים שונים שנפתחות בגדול בלחיצה. לפני שאתה כותב קוד, תשאל אותי: כמה תמונות בגלרייה? מה התמונות (URL או placeholder)? כמה עמודות? האם יש ניווט בתיבת האור (חצים, מקלדת)? מה גודל התמונה המוגדלת? מה צבע הרקע? האם הגלרייה רספונסיבית? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"lightbox",title:"Lightbox",titleHe:"תיבת אור",description:"Click an image to open a fullscreen lightbox with smooth scale and fade transition.",descriptionHe:"לחיצה על תמונה פותחת תיבת אור במסך מלא עם מעבר חלק של סקייל ושקיפות.",categories:["media"],tags:[{label:"lightbox"},{label:"modal"},{label:"image"},{label:"fullscreen"}],difficulty:"intermediate",previewComponent:"lightbox",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Lightbox</title>
<!-- Lightbox — click image to open fullscreen with transition -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center; gap: 1.5rem;
    flex-wrap: wrap;
    background: #0a0a0a; font-family: sans-serif;
    padding: 2rem;
  }
  .thumb {
    width: 200px; height: 160px;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .thumb:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 30px rgba(0,0,0,0.4);
  }
  .thumb::after {
    content: '\\1F50D'; /* magnifier emoji */
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.3);
    font-size: 1.8rem;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .thumb:hover::after { opacity: 1; }
  .t1 { background: linear-gradient(135deg, #667eea, #764ba2); }
  .t2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
  .t3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
  .t4 { background: linear-gradient(135deg, #43e97b, #38f9d7); }
  .t5 { background: linear-gradient(135deg, #fa709a, #fee140); }
  .t6 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }

  /* Lightbox */
  .lb-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.92);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity 0.35s ease;
  }
  .lb-overlay.open { opacity: 1; pointer-events: all; }
  .lb-img {
    width: 75vw; max-width: 800px;
    height: 60vh;
    border-radius: 16px;
    transform: scale(0.7) translateY(30px);
    transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .lb-overlay.open .lb-img {
    transform: scale(1) translateY(0);
  }
  .lb-close {
    position: absolute; top: 20px; right: 20px;
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 1.5rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lb-close:hover { background: rgba(255,255,255,0.25); }
  .lb-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 1.2rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s;
  }
  .lb-nav:hover { background: rgba(255,255,255,0.25); }
  .lb-prev { left: 20px; }
  .lb-next { right: 20px; }
  .lb-counter {
    position: absolute; bottom: 20px; left: 50%;
    transform: translateX(-50%);
    color: rgba(255,255,255,0.5); font-size: 0.85rem;
  }
</style>
</head>
<body>
  <div class="thumb t1" data-idx="0"></div>
  <div class="thumb t2" data-idx="1"></div>
  <div class="thumb t3" data-idx="2"></div>
  <div class="thumb t4" data-idx="3"></div>
  <div class="thumb t5" data-idx="4"></div>
  <div class="thumb t6" data-idx="5"></div>

  <div class="lb-overlay" id="lbOverlay">
    <div class="lb-img" id="lbImg"></div>
    <button class="lb-close" id="lbClose">&times;</button>
    <button class="lb-nav lb-prev" id="lbPrev">&#8249;</button>
    <button class="lb-nav lb-next" id="lbNext">&#8250;</button>
    <span class="lb-counter" id="lbCounter"></span>
  </div>

  <script>
    const bgs = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)',
      'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    ];
    const overlay = document.getElementById('lbOverlay');
    const img = document.getElementById('lbImg');
    const counter = document.getElementById('lbCounter');
    let current = 0;

    function show(idx) {
      current = ((idx % bgs.length) + bgs.length) % bgs.length;
      img.style.background = bgs[current];
      counter.textContent = (current + 1) + ' / ' + bgs.length;
      overlay.classList.add('open');
    }
    function close() { overlay.classList.remove('open'); }

    document.querySelectorAll('.thumb').forEach(t => {
      t.addEventListener('click', () => show(parseInt(t.dataset.idx)));
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', () => show(current - 1));
    document.getElementById('lbNext').addEventListener('click', () => show(current + 1));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>לוחצים על תמונה קטנה והיא נפתחת על כל המסך עם אפקט זום חלק. אפשר לעבור בין תמונות עם חצים בצדדים או עם מקשי החצים במקלדת, ולסגור עם X, לחיצה על הרקע, או Escape. מונה בתחתית מראה באיזו תמונה אתם מתוך הסדרה.</p>`,proTipHe:"הוסיפו preload לתמונות הבאות והקודמות כדי שהניווט יהיה מיידי ובלי עיכובים.",promptHe:"אני רוצה תיבת אור (Lightbox) — לחיצה על תמונה קטנה פותחת אותה בגדול על כל המסך עם ניווט בין תמונות. לפני שאתה כותב קוד, תשאל אותי: כמה תמונות? מה התמונות (URL או placeholder)? מה הגודל של התמונות הקטנות? האם יש ניווט עם חצים ומקלדת? האם יש מונה תמונות? מה אנימציית הפתיחה (זום, פייד, סלייד)? מה צבע הרקע הכהה? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"horizontalscroll",title:"Horizontal Scroll",titleHe:"גלילה אופקית",description:"Section scrolls content horizontally while page scrolls vertically.",descriptionHe:"סקשן שגולל תוכן אופקית בזמן שהעמוד גולל אנכית.",categories:["scroll"],tags:[{label:"scroll"},{label:"horizontal"},{label:"layout"}],difficulty:"advanced",previewComponent:"horizontalscroll",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Horizontal Scroll</title>
<!-- Horizontal Scroll — Converts vertical page scroll into horizontal content movement -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .spacer {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; color: #555;
  }
  .horizontal-section {
    position: relative;
    height: 400vh; /* 4x viewport = 4 panels worth of scroll */
  }
  .horizontal-sticky {
    position: sticky; top: 0;
    height: 100vh; overflow: hidden;
  }
  .horizontal-track {
    display: flex; height: 100%;
    will-change: transform;
  }
  .panel {
    min-width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-size: 3rem; font-weight: 800;
  }
  .panel:nth-child(1) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
  .panel:nth-child(2) { background: linear-gradient(135deg, #0f3460, #1a1a2e); }
  .panel:nth-child(3) { background: linear-gradient(135deg, #16213e, #0f3460); }
  .panel:nth-child(4) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
</style>
</head>
<body>
  <div class="spacer">Scroll down for horizontal section</div>

  <div class="horizontal-section" id="hSection">
    <div class="horizontal-sticky">
      <div class="horizontal-track" id="track">
        <div class="panel">Panel One</div>
        <div class="panel">Panel Two</div>
        <div class="panel">Panel Three</div>
        <div class="panel">Panel Four</div>
      </div>
    </div>
  </div>

  <div class="spacer">End of horizontal section</div>

  <script>
    const section = document.getElementById('hSection');
    const track = document.getElementById('track');
    const panelCount = 4;

    window.addEventListener('scroll', () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = -rect.top;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(sectionTop / sectionHeight, 1));
      /* Move track left by progress * (panelCount - 1) viewports */
      const translateX = progress * (panelCount - 1) * window.innerWidth;
      track.style.transform = \`translateX(-\${translateX}px)\`;
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש לנו סקשן גבוה מאוד שמכיל כמה פאנלים אופקיים. כשגוללים למטה בעמוד, הפאנלים זזים הצידה במקום למטה. הטריק הוא שהתצוגה נדבקת למסך בזמן שהגלילה האנכית מתורגמת לתנועה אופקית באמצעות JavaScript.</p>`,proTipHe:"הוסיפו snap points עם scroll-snap-type כדי שכל פאנל ייעצר בדיוק במרכז המסך.",promptHe:"אני רוצה אפקט גלילה אופקית — סקשן שבו כשגוללים למטה בעמוד, התוכן זז הצידה כמו סליידר. לפני שאתה כותב קוד, תשאל אותי כמה פאנלים אני רוצה, מה התוכן בכל פאנל, ואיזה צבעים או רקעים מתאימים. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"stickyheader",title:"Sticky Header",titleHe:"כותרת sticky",description:"Header shrinks and changes style when scrolling past hero section.",descriptionHe:"כותרת שמתכווצת ומשנה סגנון כשגוללים מעבר לסקשן ההירו.",categories:["scroll"],tags:[{label:"scroll"},{label:"header"},{label:"sticky"}],difficulty:"beginner",previewComponent:"stickyheader",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Header</title>
<!-- Sticky Header — Header shrinks on scroll with smooth transitions -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 40px; /* tall padding initially */
    background: transparent;
    transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  .header.scrolled {
    padding: 12px 40px; /* shrunk padding */
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(12px);
    box-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }
  .header .logo {
    font-size: 1.5rem; font-weight: 800;
    transition: font-size 0.3s ease;
  }
  .header.scrolled .logo { font-size: 1.1rem; }
  .header nav a {
    color: #aaa; text-decoration: none; margin-left: 24px;
    font-size: 0.95rem; transition: color 0.3s;
  }
  .header nav a:hover { color: #fff; }
  .hero {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    font-size: 3rem; font-weight: 800;
    background: linear-gradient(135deg, #1a1a2e, #0a0a0a);
  }
  .content {
    max-width: 700px; margin: 0 auto; padding: 4rem 2rem;
    color: #aaa; line-height: 1.8; font-size: 1.1rem;
  }
  .content p { margin-bottom: 2rem; }
</style>
</head>
<body>
  <header class="header" id="header">
    <div class="logo">MySite</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </nav>
  </header>
  <div class="hero">Scroll Down</div>
  <div class="content">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <script>
    const header = document.getElementById('header');
    const threshold = 100; /* pixels before header shrinks */
    window.addEventListener('scroll', () => {
      if (window.scrollY > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הכותרת קבועה בראש המסך כל הזמן. כשמתחילים לגלול למטה, היא מתכווצת, הרקע שלה נהיה כהה ומטושטש, והכל עובר עם אנימציה חלקה. זה עובד על ידי הוספת מחלקת CSS כשהגלילה עוברת סף מסוים.</p>`,proTipHe:"הוסיפו transform: translateY(-100%) כשגוללים למטה ו-translateY(0) כשגוללים למעלה כדי ליצור header שמתחבא ומופיע.",promptHe:"אני רוצה כותרת עליונה (header) שנדבקת למסך ומתכווצת כשגוללים למטה — עם שינוי רקע ואנימציה חלקה. לפני שאתה כותב קוד, תשאל אותי מה הלוגו, אילו קישורי ניווט צריך, ואיזה צבעים מתאימים לי. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"revealonscrool",title:"Reveal on Scroll",titleHe:"חשיפה בגלילה",description:"Elements fade and slide in when entering viewport using IntersectionObserver.",descriptionHe:"אלמנטים נכנסים עם fade ותנועה כשהם מופיעים באזור הנראה באמצעות IntersectionObserver.",categories:["scroll"],tags:[{label:"scroll"},{label:"reveal"},{label:"intersection-observer"}],difficulty:"beginner",previewComponent:"revealonscrool",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reveal on Scroll</title>
<!-- Reveal on Scroll — Elements fade+slide in when entering the viewport -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 60vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .reveal-item {
    max-width: 600px; margin: 80px auto;
    padding: 2rem; border-radius: 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal-item.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-item.from-left {
    transform: translateX(-40px) translateY(0);
    opacity: 0;
  }
  .reveal-item.from-left.visible {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
  .reveal-item h3 { font-size: 1.3rem; margin-bottom: 0.5rem; }
  .reveal-item p { color: #aaa; line-height: 1.6; }
</style>
</head>
<body>
  <div class="spacer">Scroll down to reveal elements</div>
  <div class="reveal-item"><h3>Card One</h3><p>This card fades up from below when it enters the viewport.</p></div>
  <div class="reveal-item from-left"><h3>Card Two</h3><p>This one slides in from the left side.</p></div>
  <div class="reveal-item"><h3>Card Three</h3><p>Each element animates independently with IntersectionObserver.</p></div>
  <div class="reveal-item from-left"><h3>Card Four</h3><p>No scroll event listener needed — all handled by the browser.</p></div>
  <div class="spacer"></div>
  <script>
    const items = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 }); /* trigger when 15% visible */
    items.forEach(item => observer.observe(item));
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל כרטיס מתחיל שקוף ומוזז קצת למטה או לצד. כשגוללים והכרטיס נכנס לאזור הנראה במסך, הוא נחשף עם אנימציה חלקה. הדפדפן מזהה אוטומטית מתי אלמנט נכנס למסך, בלי צורך לעקוב אחרי כל גלילה.</p>`,proTipHe:"הוסיפו stagger effect עם transition-delay שונה לכל אלמנט כדי ליצור אפקט גל מרשים.",promptHe:"אני רוצה אפקט חשיפה בגלילה — אלמנטים שמופיעים עם אנימציית fade ותנועה כשגוללים אליהם. לפני שאתה כותב קוד, תשאל אותי כמה אלמנטים צריך, מאיזה כיוון הם נכנסים, ומה התוכן בכל אחד. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"parallaximage",title:"Parallax Image",titleHe:"תמונת parallax",description:"Image moves slower than scroll creating a depth effect within its container.",descriptionHe:"תמונה שנעה לאט יותר מהגלילה ויוצרת אפקט עומק בתוך המכיל שלה.",categories:["scroll"],tags:[{label:"parallax"},{label:"image"},{label:"scroll"}],difficulty:"beginner",previewComponent:"parallaximage",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Parallax Image</title>
<!-- Parallax Image — Image moves at slower speed than scroll for depth illusion -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .content-block {
    max-width: 700px; margin: 0 auto; padding: 4rem 2rem;
    color: #aaa; line-height: 1.8;
  }
  .parallax-container {
    position: relative; height: 60vh;
    overflow: hidden;
  }
  .parallax-img {
    position: absolute;
    top: -20%; left: 0; right: 0;
    height: 140%; /* 40% taller for parallax room */
    width: 100%; object-fit: cover;
    will-change: transform;
  }
  .parallax-overlay {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.3);
    font-size: 2.5rem; font-weight: 800;
  }
</style>
</head>
<body>
  <div class="content-block">
    <h1>Parallax Image Demo</h1>
    <p>Scroll down to see the parallax effect on the image below. The image moves slower than the page, creating a sense of depth.</p>
  </div>

  <div class="parallax-container" id="pxContainer">
    <img class="parallax-img" id="pxImg"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0' stop-color='%231a1a2e'/%3E%3Cstop offset='0.5' stop-color='%230f3460'/%3E%3Cstop offset='1' stop-color='%236c63ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='1200' height='800'/%3E%3Ccircle cx='300' cy='200' r='120' fill='%23ffffff10'/%3E%3Ccircle cx='900' cy='500' r='200' fill='%23ffffff08'/%3E%3C/svg%3E"
      alt="Parallax background" />
    <div class="parallax-overlay">Depth Effect</div>
  </div>

  <div class="content-block">
    <p>The image is 140% the height of its container, positioned at -20% top. As you scroll, it translates at 0.4x speed creating the parallax illusion.</p>
    <p>Keep scrolling to see it fully...</p>
  </div>

  <script>
    const container = document.getElementById('pxContainer');
    const img = document.getElementById('pxImg');
    const speed = 0.4; /* parallax speed factor: lower = slower movement */

    window.addEventListener('scroll', () => {
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewH) return; /* skip if off screen */
      const offset = rect.top * speed;
      img.style.transform = \`translateY(\${offset}px)\`;
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>התמונה גדולה יותר מהמסגרת שמכילה אותה, וכשגוללים היא זזה לאט יותר מהעמוד. ההבדל במהירות יוצר תחושת עומק — כאילו התמונה רחוקה ברקע. המסגרת חותכת את החלקים שחורגים כך שהכל נראה נקי.</p>`,proTipHe:"השתמשו ב-will-change: transform ו-transform: translateY במקום שינוי top/margin לביצועים מיטביים.",promptHe:"אני רוצה אפקט פרלקס על תמונה — תמונה שזזה לאט יותר מהגלילה ויוצרת תחושת עומק. לפני שאתה כותב קוד, תשאל אותי איזו תמונה להשתמש, מה גובה האזור, ואיזה מהירות פרלקס מתאימה. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"pinnedsection",title:"Pinned Section",titleHe:"סקשן מוצמד",description:"Content stays pinned to the viewport while background content changes behind it.",descriptionHe:"תוכן נשאר מוצמד למסך בזמן שתוכן הרקע משתנה מאחוריו.",categories:["scroll"],tags:[{label:"scroll"},{label:"sticky"},{label:"pin"}],difficulty:"advanced",previewComponent:"pinnedsection",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pinned Section</title>
<!-- Pinned Section — Text stays pinned while background panels scroll behind -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: sans-serif; background: #0a0a0a; color: #fff; }
  .spacer {
    height: 100vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.5rem;
  }
  .pinned-wrapper {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 300vh; /* room for 3 panels */
  }
  .pinned-left {
    position: sticky; top: 0;
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 3rem;
  }
  .pinned-left h2 {
    font-size: 2.5rem; font-weight: 800;
    line-height: 1.3;
  }
  .pinned-left h2 span { color: #6c63ff; }
  .right-panels { display: flex; flex-direction: column; }
  .right-panel {
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 3rem; font-size: 1.2rem;
    border-left: 1px solid rgba(255,255,255,0.06);
  }
  .right-panel:nth-child(1) { background: rgba(108,99,255,0.05); }
  .right-panel:nth-child(2) { background: rgba(236,72,153,0.05); }
  .right-panel:nth-child(3) { background: rgba(6,182,212,0.05); }
  .right-panel .card {
    max-width: 350px; padding: 2rem;
    background: rgba(255,255,255,0.03);
    border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);
    color: #ccc; line-height: 1.7;
  }
  .right-panel .card h3 { color: #fff; margin-bottom: 0.5rem; }
</style>
</head>
<body>
  <div class="spacer">Scroll to see pinned section</div>
  <div class="pinned-wrapper">
    <div class="pinned-left">
      <h2>Content stays<br/><span>pinned</span> here<br/>while you scroll</h2>
    </div>
    <div class="right-panels">
      <div class="right-panel"><div class="card"><h3>Step 1</h3><p>The left column stays fixed in place using CSS sticky positioning.</p></div></div>
      <div class="right-panel"><div class="card"><h3>Step 2</h3><p>The right column scrolls normally, revealing new content panels.</p></div></div>
      <div class="right-panel"><div class="card"><h3>Step 3</h3><p>No JavaScript needed — pure CSS sticky does all the work.</p></div></div>
    </div>
  </div>
  <div class="spacer">End of pinned section</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>העמוד מחולק לשני חצאים. הצד השמאלי נדבק למסך ולא זז, בזמן שהצד הימני גולל רגיל ומציג תוכן חדש. הכל עובד עם CSS בלבד בלי JavaScript — הדפדפן יודע לבד מתי להפסיק להדביק את הצד.</p>`,proTipHe:"שנו את התוכן הפינאלי בצד השמאלי בהתאם לפאנל הנראה בימין עם IntersectionObserver ליצירת אפקט דינמי יותר.",promptHe:"אני רוצה סקשן מוצמד — צד אחד נשאר קבוע על המסך בזמן שהצד השני גולל ומראה תוכן חדש. לפני שאתה כותב קוד, תשאל אותי מה התוכן הקבוע, כמה שלבים/פאנלים גוללים צריך, ומה הסגנון הרצוי. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrollprogress",title:"Scroll Progress",titleHe:"פס גלילה",description:"Thin progress bar at top of page showing scroll percentage.",descriptionHe:"פס התקדמות דק בראש העמוד שמראה את אחוז הגלילה.",categories:["scroll"],tags:[{label:"scroll"},{label:"progress"},{label:"indicator"}],difficulty:"beginner",previewComponent:"scrollprogress",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Progress</title>
<!-- Scroll Progress — Top bar that fills based on scroll position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .progress-bar {
    position: fixed; top: 0; left: 0; z-index: 9999;
    height: 3px; /* thin bar */
    width: 0%;
    background: linear-gradient(90deg, #6c63ff, #a855f7, #ec4899);
    transition: width 0.1s linear;
    border-radius: 0 2px 2px 0;
    box-shadow: 0 0 10px rgba(108, 99, 255, 0.5);
  }
  .header {
    position: fixed; top: 3px; left: 0; right: 0;
    padding: 16px 40px; background: rgba(10,10,10,0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    z-index: 100;
  }
  .content {
    max-width: 700px; margin: 0 auto;
    padding: 120px 2rem 4rem;
  }
  .content h1 { font-size: 2.5rem; margin-bottom: 2rem; }
  .content p {
    color: #aaa; line-height: 1.8; font-size: 1.05rem;
    margin-bottom: 2rem;
  }
</style>
</head>
<body>
  <div class="progress-bar" id="progressBar"></div>
  <div class="header">Scroll Progress Demo</div>
  <div class="content">
    <h1>Reading Progress Bar</h1>
    <p>Scroll down to see the progress bar fill up at the top of the page. It shows how far you've scrolled through the content.</p>
    <p>This is commonly used on blog posts and long-form articles to give readers a sense of how much content remains.</p>
    <p>The bar uses a gradient from purple to pink, with a subtle glow effect for extra visual appeal.</p>
    <p>Implementation is simple: listen to scroll events, calculate the percentage, and update the width.</p>
    <p>For better performance, you can use requestAnimationFrame to throttle updates.</p>
    <p>The bar is position: fixed so it stays at the very top of the viewport as you scroll.</p>
  </div>
  <script>
    const bar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrollTop / docHeight) * 100;
      bar.style.width = pct + '%';
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>פס צבעוני דק קבוע בראש המסך. ככל שגוללים יותר למטה, הפס מתרחב ומראה כמה מהעמוד כבר קראנו. זה עובד על ידי חישוב פשוט — כמה גללנו חלקי כמה יש בסך הכל — והתוצאה הופכת לרוחב הפס באחוזים.</p>`,proTipHe:"עטפו את עדכון הרוחב ב-requestAnimationFrame לחוויה חלקה יותר בעמודים כבדים.",promptHe:"אני רוצה פס התקדמות קריאה בראש העמוד שמתמלא ככל שגוללים למטה. לפני שאתה כותב קוד, תשאל אותי איזה צבע או גרדיאנט מתאים, מה העובי הרצוי, ואם צריך גם כותרת קבועה מתחתיו. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrolltrigger",title:"Scroll Trigger",titleHe:"טריגר גלילה",description:"Elements animate with staggered timing when they scroll into view.",descriptionHe:"אלמנטים מונפשים בתזמון מדורג כשהם נגללים לאזור הנראה.",categories:["scroll"],tags:[{label:"scroll"},{label:"trigger"},{label:"stagger"}],difficulty:"intermediate",previewComponent:"scrolltrigger",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Trigger</title>
<!-- Scroll Trigger — Staggered animations triggered by scroll position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 300vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 70vh; display: flex; align-items: center;
    justify-content: center; color: #555; font-size: 1.2rem;
  }
  .trigger-grid {
    max-width: 800px; margin: 0 auto; padding: 2rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
  }
  .trigger-card {
    padding: 2rem; border-radius: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    text-align: center;
    opacity: 0; transform: translateY(60px) scale(0.9);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .trigger-card.active {
    opacity: 1; transform: translateY(0) scale(1);
  }
  .trigger-card .icon {
    width: 48px; height: 48px; margin: 0 auto 1rem;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem;
  }
  .trigger-card:nth-child(3n+1) .icon { background: rgba(108,99,255,0.15); }
  .trigger-card:nth-child(3n+2) .icon { background: rgba(236,72,153,0.15); }
  .trigger-card:nth-child(3n+3) .icon { background: rgba(6,182,212,0.15); }
  .trigger-card h3 { font-size: 1rem; margin-bottom: 0.5rem; }
  .trigger-card p { color: #888; font-size: 0.85rem; line-height: 1.5; }
  .stats-row {
    max-width: 800px; margin: 80px auto; padding: 2rem;
    display: flex; justify-content: space-around;
  }
  .stat {
    text-align: center;
    opacity: 0; transform: scale(0.8);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .stat.active { opacity: 1; transform: scale(1); }
  .stat .num { font-size: 2.5rem; font-weight: 800; color: #6c63ff; }
  .stat .label { color: #888; font-size: 0.9rem; margin-top: 0.25rem; }
</style>
</head>
<body>
  <div class="spacer">Scroll down for triggered animations</div>
  <div class="trigger-grid" id="grid">
    <div class="trigger-card"><div class="icon">&#9733;</div><h3>Design</h3><p>Beautiful interfaces</p></div>
    <div class="trigger-card"><div class="icon">&#9889;</div><h3>Speed</h3><p>Lightning fast</p></div>
    <div class="trigger-card"><div class="icon">&#9881;</div><h3>Build</h3><p>Solid architecture</p></div>
    <div class="trigger-card"><div class="icon">&#9752;</div><h3>Scale</h3><p>Grows with you</p></div>
    <div class="trigger-card"><div class="icon">&#9829;</div><h3>Quality</h3><p>Pixel perfect</p></div>
    <div class="trigger-card"><div class="icon">&#9830;</div><h3>Support</h3><p>Always here</p></div>
  </div>
  <div class="stats-row" id="stats">
    <div class="stat"><div class="num">250+</div><div class="label">Projects</div></div>
    <div class="stat"><div class="num">99%</div><div class="label">Satisfaction</div></div>
    <div class="stat"><div class="num">50K</div><div class="label">Users</div></div>
  </div>
  <div class="spacer"></div>
  <script>
    function triggerStagger(container, selector, staggerMs) {
      const items = container.querySelectorAll(selector);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('active'), i * staggerMs);
            });
            obs.disconnect();
          }
        });
      }, { threshold: 0.2 });
      obs.observe(container);
    }
    triggerStagger(document.getElementById('grid'), '.trigger-card', 120);
    triggerStagger(document.getElementById('stats'), '.stat', 200);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשגוללים לאזור של הכרטיסים, הם לא מופיעים כולם בבת אחת אלא אחד אחרי השני באפקט גל. כל כרטיס נכנס עם תנועה מלמטה והגדלה קלה, עם השהייה קצרה בין כרטיס לכרטיס. ברגע שההנפשה רצה פעם אחת, היא לא חוזרת.</p>`,proTipHe:"שנו את כיוון ה-stagger לפי מיקום הגלילה — מימין לשמאל או מהמרכז החוצה לאפקטים מעניינים יותר.",promptHe:"אני רוצה אפקט טריגר גלילה — כרטיסים שמופיעים אחד אחרי השני באפקט גל כשגוללים אליהם. לפני שאתה כותב קוד, תשאל אותי כמה כרטיסים, מה התוכן והאייקונים בכל אחד, ואיזה תזמון בין הכרטיסים מתאים. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"infinitescroll",title:"Infinite Scroll",titleHe:"גלילה אינסופית",description:"Auto-load more content when user reaches the bottom of the page.",descriptionHe:"טעינה אוטומטית של תוכן נוסף כשהמשתמש מגיע לתחתית העמוד.",categories:["scroll"],tags:[{label:"scroll"},{label:"infinite"},{label:"loading"}],difficulty:"intermediate",previewComponent:"infinitescroll",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Infinite Scroll</title>
<!-- Infinite Scroll — Loads more content when nearing page bottom -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; font-family: sans-serif; color: #fff; }
  .feed { max-width: 600px; margin: 0 auto; padding: 2rem; }
  .feed h1 { text-align: center; margin-bottom: 2rem; font-size: 1.5rem; }
  .feed-item {
    padding: 1.5rem; margin-bottom: 16px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    animation: fadeUp 0.4s ease forwards;
  }
  .feed-item h3 { font-size: 1rem; margin-bottom: 0.3rem; }
  .feed-item p { color: #888; font-size: 0.9rem; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .sentinel {
    height: 1px; /* invisible trigger element at bottom */
  }
  .loader {
    text-align: center; padding: 2rem; color: #555;
    display: none;
  }
  .loader.visible { display: block; }
  .loader .spinner {
    width: 24px; height: 24px; margin: 0 auto 8px;
    border: 2px solid rgba(108,99,255,0.3);
    border-top-color: #6c63ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
  <div class="feed" id="feed">
    <h1>Infinite Feed</h1>
  </div>
  <div class="loader" id="loader">
    <div class="spinner"></div>
    <span>Loading more...</span>
  </div>
  <div class="sentinel" id="sentinel"></div>

  <script>
    const feed = document.getElementById('feed');
    const loader = document.getElementById('loader');
    const sentinel = document.getElementById('sentinel');
    let page = 0;
    let loading = false;
    const maxPages = 10; /* cap for demo */

    function loadItems() {
      if (loading || page >= maxPages) return;
      loading = true;
      loader.classList.add('visible');
      /* Simulate async fetch with 800ms delay */
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          const n = page * 5 + i + 1;
          const item = document.createElement('div');
          item.className = 'feed-item';
          item.innerHTML = '<h3>Item #' + n + '</h3><p>Auto-loaded content block number ' + n + '.</p>';
          feed.appendChild(item);
        }
        page++;
        loading = false;
        loader.classList.remove('visible');
      }, 800);
    }

    /* Load initial batch */
    loadItems();

    /* Watch sentinel element at bottom */
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadItems();
    }, { rootMargin: '200px' }); /* trigger 200px before visible */
    obs.observe(sentinel);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>בתחתית העמוד יש אלמנט בלתי נראה שמשמש כ"זקיף". כשהגלילה מתקרבת אליו, הדפדפן מזהה את זה וטוען פריטים חדשים אוטומטית. יש מנגנון שמונע טעינות כפולות ומגביל את הכמות הכוללת, וכל פריט חדש נכנס עם אנימציה קלה.</p>`,proTipHe:"הוסיפו skeleton loading במקום ספינר כדי ליצור תחושה שהתוכן כמעט מוכן.",promptHe:"אני רוצה אפקט גלילה אינסופית — תוכן שנטען אוטומטית כשמגיעים לתחתית העמוד. לפני שאתה כותב קוד, תשאל אותי איזה סוג תוכן נטען (כרטיסים, פוסטים, תמונות), כמה פריטים בכל טעינה, ואיזה אנימציית כניסה מתאימה. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"stickycolumn",title:"Sticky Column",titleHe:"עמודה sticky",description:"Two-column layout where one column stays sticky while the other scrolls.",descriptionHe:"פריסה דו-עמודית שבה עמודה אחת נשארת sticky בזמן שהשנייה גוללת.",categories:["scroll"],tags:[{label:"scroll"},{label:"sticky"},{label:"layout"}],difficulty:"intermediate",previewComponent:"stickycolumn",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Sticky Column</title>
<!-- Sticky Column — Left column sticks while right column scrolls freely -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a0a; font-family: sans-serif; color: #fff; }
  .two-col {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 0;
    max-width: 1100px; margin: 0 auto;
    min-height: 100vh;
  }
  .col-sticky {
    position: sticky; top: 0;
    height: 100vh;
    padding: 3rem 2rem;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.01);
  }
  .col-sticky h1 { font-size: 2rem; margin-bottom: 1rem; }
  .col-sticky p { color: #888; line-height: 1.6; margin-bottom: 1.5rem; }
  .col-sticky .tag {
    display: inline-block; padding: 6px 14px;
    background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.3);
    border-radius: 20px; font-size: 0.8rem;
    margin-right: 6px; margin-bottom: 6px;
  }
  .col-scroll { padding: 3rem 2rem; }
  .scroll-card {
    padding: 2rem; margin-bottom: 24px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
  }
  .scroll-card h3 { margin-bottom: 0.5rem; }
  .scroll-card p { color: #888; line-height: 1.7; font-size: 0.95rem; }
</style>
</head>
<body>
  <div class="two-col">
    <div class="col-sticky">
      <h1>Sticky Sidebar</h1>
      <p>This column stays in place while you scroll through the content on the right. Perfect for navigation, table of contents, or product details.</p>
      <div>
        <span class="tag">CSS</span>
        <span class="tag">Sticky</span>
        <span class="tag">Layout</span>
        <span class="tag">Grid</span>
      </div>
    </div>
    <div class="col-scroll">
      <div class="scroll-card"><h3>Section 1</h3><p>The sticky column uses position: sticky with top: 0 and height: 100vh. It stays fixed within the grid container.</p></div>
      <div class="scroll-card"><h3>Section 2</h3><p>CSS Grid makes the two-column layout simple. The left column has a fixed width while the right takes remaining space.</p></div>
      <div class="scroll-card"><h3>Section 3</h3><p>The sticky behavior automatically stops when the grid container ends, so no JavaScript is needed to handle the un-sticking.</p></div>
      <div class="scroll-card"><h3>Section 4</h3><p>This pattern works great for documentation sites, product pages, and dashboards where persistent navigation is needed.</p></div>
      <div class="scroll-card"><h3>Section 5</h3><p>You can add scroll-linked highlighting to the sidebar items by tracking which section is currently in view.</p></div>
      <div class="scroll-card"><h3>Section 6</h3><p>For responsive design, switch to a single column on mobile with the sticky element at the top instead of the side.</p></div>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>העמוד מחולק לשתי עמודות. העמודה השמאלית נדבקת למסך ונשארת במקום כל הזמן, בזמן שהעמודה הימנית גוללת רגיל ומציגה כרטיסי תוכן. הכל עובד עם CSS בלבד — בלי JavaScript, וההדבקה מפסיקה אוטומטית כשמגיעים לסוף האזור.</p>`,proTipHe:"הוסיפו media query שמחליף ל-column layout על מסכים צרים, עם ה-sticky element בראש במקום בצד.",promptHe:"אני רוצה פריסה דו-עמודית עם עמודה דביקה — צד אחד נשאר קבוע וצד שני גולל. לפני שאתה כותב קוד, תשאל אותי מה יהיה בצד הקבוע (ניווט, פרטים, תוכן עניינים), כמה כרטיסים בצד הגולל, ומה הרוחב הרצוי של כל עמודה. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrollcolor",title:"Scroll Color",titleHe:"שינוי צבע גלילה",description:"Page background color transitions smoothly as the user scrolls.",descriptionHe:"צבע הרקע של העמוד משתנה בצורה חלקה בזמן שהמשתמש גולל.",categories:["scroll","background"],tags:[{label:"scroll"},{label:"color"},{label:"background"}],difficulty:"beginner",previewComponent:"scrollcolor",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Color</title>
<!-- Scroll Color — Background interpolates between colors as user scrolls -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 500vh; font-family: sans-serif;
    transition: background-color 0.1s linear;
    background-color: #0a0a1a;
  }
  .section {
    height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; font-weight: 800; color: #fff;
  }
  .section span {
    background: rgba(0,0,0,0.3); padding: 1rem 2rem;
    border-radius: 12px; backdrop-filter: blur(8px);
  }
</style>
</head>
<body>
  <div class="section"><span>Section 1 — Deep Blue</span></div>
  <div class="section"><span>Section 2 — Purple</span></div>
  <div class="section"><span>Section 3 — Magenta</span></div>
  <div class="section"><span>Section 4 — Teal</span></div>
  <div class="section"><span>Section 5 — Dark</span></div>
  <script>
    /* Color stops: one per viewport height */
    const colors = [
      [10, 10, 26],    /* deep blue-black */
      [30, 15, 60],    /* purple */
      [60, 10, 50],    /* magenta */
      [10, 40, 50],    /* teal */
      [8, 8, 8],       /* near black */
    ];

    function lerp(a, b, t) { return a + (b - a) * t; }

    function interpolateColor(t) {
      const segment = Math.min(Math.floor(t * (colors.length - 1)), colors.length - 2);
      const local = (t * (colors.length - 1)) - segment;
      const c1 = colors[segment];
      const c2 = colors[segment + 1];
      const r = Math.round(lerp(c1[0], c2[0], local));
      const g = Math.round(lerp(c1[1], c2[1], local));
      const b = Math.round(lerp(c1[2], c2[2], local));
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const t = Math.max(0, Math.min(scrollTop / docHeight, 1));
      document.body.style.backgroundColor = interpolateColor(t);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>מוגדרים מראש כמה צבעים, אחד לכל סקשן בעמוד. כשגוללים, הרקע עובר בצורה חלקה בין הצבעים לפי המיקום בעמוד. זה עובד על ידי חישוב מתמטי שמערבב בין שני צבעים סמוכים ויוצר מעבר זורם.</p>`,proTipHe:"הוסיפו שינוי צבע טקסט מקביל (לבן על רקע כהה, כהה על רקע בהיר) כדי לשמור על נגישות.",promptHe:"אני רוצה אפקט שינוי צבע רקע בגלילה — הרקע עובר בין צבעים שונים ככל שגוללים בעמוד. לפני שאתה כותב קוד, תשאל אותי איזה צבעים לכלול, כמה סקשנים, ואם צריך גם שינוי צבע טקסט בהתאם. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrollzoom",title:"Scroll Zoom",titleHe:"זום גלילה",description:"Element scales from small to large as it scrolls into viewport center.",descriptionHe:"אלמנט גדל מקטן לגדול כשהוא נגלל למרכז אזור הצפייה.",categories:["scroll"],tags:[{label:"scroll"},{label:"zoom"},{label:"scale"}],difficulty:"intermediate",previewComponent:"scrollzoom",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scroll Zoom</title>
<!-- Scroll Zoom — Elements scale up as they approach viewport center -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #0a0a0a;
    font-family: sans-serif; color: #fff;
  }
  .spacer {
    height: 80vh; display: flex; align-items: center; justify-content: center;
    color: #555; font-size: 1.2rem;
  }
  .zoom-item {
    max-width: 500px; margin: 120px auto;
    padding: 3rem; border-radius: 20px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    text-align: center;
    will-change: transform, opacity;
  }
  .zoom-item h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .zoom-item p { color: #888; line-height: 1.6; }
  .zoom-item .badge {
    display: inline-block; margin-top: 1rem;
    padding: 6px 18px; border-radius: 20px;
    background: rgba(108,99,255,0.2);
    font-size: 0.85rem; color: #a99bff;
  }
</style>
</head>
<body>
  <div class="spacer">Scroll down for zoom effect</div>
  <div class="zoom-item" id="z1"><h2>Zoom In</h2><p>This element grows as you scroll it into view.</p><span class="badge">scale(0.6) → scale(1)</span></div>
  <div class="zoom-item" id="z2"><h2>Keep Going</h2><p>The scale is mapped to how close the element is to the viewport center.</p><span class="badge">Scroll-linked</span></div>
  <div class="zoom-item" id="z3"><h2>Smooth Zoom</h2><p>No transition jitter — direct scroll-to-scale mapping.</p><span class="badge">will-change</span></div>
  <div class="spacer">End</div>
  <script>
    const items = document.querySelectorAll('.zoom-item');
    const minScale = 0.6;  /* scale when far from center */
    const maxScale = 1;     /* scale when at center */

    function update() {
      const viewH = window.innerHeight;
      const center = viewH / 2;
      items.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - center);
        const maxDist = viewH; /* normalize against viewport height */
        const t = Math.max(0, 1 - dist / maxDist);
        const scale = minScale + (maxScale - minScale) * t;
        const opacity = 0.3 + 0.7 * t;
        el.style.transform = 'scale(' + scale.toFixed(3) + ')';
        el.style.opacity = opacity.toFixed(3);
      });
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל אלמנט משתנה בגודל בהתאם למרחק שלו ממרכז המסך. ככל שהוא קרוב יותר למרכז, הוא גדול ובולט יותר. ככל שהוא רחוק, הוא קטן ומעומעם. זה יוצר אפקט של "פוקוס" על מה שנמצא באמצע המסך.</p>`,proTipHe:"הוסיפו filter: blur() קל לאלמנטים הרחוקים מהמרכז לחיזוק אפקט העומק.",promptHe:"אני רוצה אפקט זום בגלילה — אלמנטים שגדלים ונהיים בולטים כשהם מגיעים למרכז המסך. לפני שאתה כותב קוד, תשאל אותי כמה אלמנטים, מה התוכן בכל אחד, ומה טווח הגדלים הרצוי (מינימום ומקסימום). תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"depthscroll",title:"Depth Scroll",titleHe:"גלילת עומק",description:"Multiple layers move at different scroll speeds to create a 3D depth feel.",descriptionHe:"שכבות מרובות נעות במהירויות גלילה שונות ליצירת תחושת עומק תלת-ממדית.",categories:["scroll","background"],tags:[{label:"scroll"},{label:"depth"},{label:"parallax"},{label:"3D"}],difficulty:"advanced",previewComponent:"depthscroll",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Depth Scroll</title>
<!-- Depth Scroll — Multiple layers at different speeds for 3D parallax depth -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 400vh; background: #050510;
    font-family: sans-serif; color: #fff;
    overflow-x: hidden;
  }
  .depth-scene {
    position: fixed; inset: 0;
    pointer-events: none; overflow: hidden;
  }
  .depth-layer {
    position: absolute; inset: 0;
    will-change: transform;
    display: flex; align-items: center; justify-content: center;
  }
  .shape {
    position: absolute; border-radius: 50%;
    opacity: 0.15;
  }
  /* Layer 1: far background — slowest */
  .layer-1 .shape { background: #6c63ff; }
  .layer-1 .s1 { width: 400px; height: 400px; top: 10%; left: 5%; }
  .layer-1 .s2 { width: 300px; height: 300px; top: 60%; right: 10%; }

  /* Layer 2: mid — medium speed */
  .layer-2 .shape { background: #ec4899; opacity: 0.12; }
  .layer-2 .s1 { width: 200px; height: 200px; top: 30%; left: 40%; }
  .layer-2 .s2 { width: 250px; height: 250px; top: 70%; left: 15%; }
  .layer-2 .s3 { width: 150px; height: 150px; top: 15%; right: 20%; }

  /* Layer 3: near — fastest */
  .layer-3 .shape { background: #06b6d4; opacity: 0.1; }
  .layer-3 .s1 { width: 100px; height: 100px; top: 20%; left: 70%; }
  .layer-3 .s2 { width: 120px; height: 120px; top: 50%; left: 25%; }

  .content {
    position: relative; z-index: 10;
    max-width: 700px; margin: 0 auto;
    padding: 15vh 2rem;
  }
  .content h1 {
    font-size: 3rem; font-weight: 800;
    margin-bottom: 2rem;
  }
  .content p {
    color: #aaa; line-height: 1.8; font-size: 1.1rem;
    margin-bottom: 3rem;
  }
</style>
</head>
<body>
  <div class="depth-scene">
    <div class="depth-layer layer-1" data-speed="0.1">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
    </div>
    <div class="depth-layer layer-2" data-speed="0.3">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
      <div class="shape s3"></div>
    </div>
    <div class="depth-layer layer-3" data-speed="0.6">
      <div class="shape s1"></div>
      <div class="shape s2"></div>
    </div>
  </div>

  <div class="content">
    <h1>Depth Scroll</h1>
    <p>Watch the shapes in the background move at different speeds as you scroll, creating a 3D depth illusion.</p>
    <p>Three layers of shapes — far (slow), mid (medium), and near (fast) — simulate distance through parallax movement.</p>
    <p>This technique is used in hero sections and storytelling pages to add visual depth without actual 3D rendering.</p>
    <p>The key is subtle speed differences — dramatic parallax can feel disorienting, but gentle movement adds polish.</p>
  </div>

  <script>
    const layers = document.querySelectorAll('.depth-layer');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed);
        layer.style.transform = 'translateY(' + (-scrollY * speed) + 'px)';
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>ברקע יש שלוש שכבות של צורות עגולות, כל שכבה זזה במהירות שונה כשגוללים. שכבות "רחוקות" זזות לאט ושכבות "קרובות" זזות מהר — בדיוק כמו שקורה במציאות כשמסתכלים מחלון נוסע. זה יוצר תחושת עומק תלת-ממדית בלי שום מנוע תלת-ממד אמיתי.</p>`,proTipHe:"השתמשו ב-filter: blur() על השכבות הרחוקות כדי לדמות depth-of-field אמיתי.",promptHe:"אני רוצה אפקט גלילת עומק — שכבות רקע שזזות במהירויות שונות ויוצרות תחושה תלת-ממדית. לפני שאתה כותב קוד, תשאל אותי כמה שכבות, איזה צורות וצבעים, ומה רמת העדינות של התנועה. תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"meshgradient",title:"Mesh Gradient",titleHe:"גרדיאנט רשת",description:"Animated multi-point mesh gradient background with flowing color blobs.",descriptionHe:"רקע גרדיאנט רשת מונפש עם כתמי צבע זורמים בתנועה אורגנית.",categories:["background"],tags:[{label:"gradient"},{label:"mesh"},{label:"background"}],difficulty:"intermediate",previewComponent:"meshgradient",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Mesh Gradient — Animated multi-point mesh gradient using layered radial gradients -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Mesh Gradient</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080808; overflow: hidden; }
  .mesh-container {
    position: relative;
    width: 100%; height: 100vh;
    overflow: hidden;
    background: #080808;
  }
  /* Each blob is a radial gradient circle */
  .mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px); /* heavy blur for smooth blending */
    will-change: transform;
    mix-blend-mode: screen;
  }
  .blob-1 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #c8f53b 0%, transparent 70%);
    top: -10%; left: -5%;
    animation: drift1 8s ease-in-out infinite alternate;
  }
  .blob-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, #ff3cac 0%, transparent 70%);
    top: 30%; right: -10%;
    animation: drift2 10s ease-in-out infinite alternate;
  }
  .blob-3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #44aaff 0%, transparent 70%);
    bottom: -15%; left: 30%;
    animation: drift3 12s ease-in-out infinite alternate;
  }
  .blob-4 {
    width: 350px; height: 350px;
    background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
    top: 50%; left: 10%;
    animation: drift4 9s ease-in-out infinite alternate;
  }
  @keyframes drift1 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(30vw, 20vh) scale(1.2); }
  }
  @keyframes drift2 {
    0% { transform: translate(0, 0) scale(1.1); }
    100% { transform: translate(-25vw, 15vh) scale(0.9); }
  }
  @keyframes drift3 {
    0% { transform: translate(0, 0) scale(0.9); }
    100% { transform: translate(20vw, -25vh) scale(1.15); }
  }
  @keyframes drift4 {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-15vw, -20vh) scale(1.1); }
  }
  .content {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    z-index: 10; color: #fff; font-family: sans-serif;
    font-size: 2rem; font-weight: 700; text-shadow: 0 2px 20px rgba(0,0,0,0.5);
  }
</style>
</head>
<body>
  <div class="mesh-container">
    <div class="mesh-blob blob-1"></div>
    <div class="mesh-blob blob-2"></div>
    <div class="mesh-blob blob-3"></div>
    <div class="mesh-blob blob-4"></div>
    <div class="content">Mesh Gradient</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>יש פה ארבעה כתמי צבע גדולים ומטושטשים שמרחפים על רקע כהה. כל כתם הוא עיגול עם גרדיאנט שנמוג לשקוף, והטשטוש הכבד גורם להם להתמזג אחד עם השני בצורה חלקה. התנועה נראית טבעית כי כל כתם זז במסלול אחר ובמהירות שונה, וכשהצבעים נפגשים הם מתערבבים ויוצרים גוונים חדשים.</p>`,proTipHe:"הוסיפו opacity נמוך (0.3-0.5) לכתמים לאפקט עדין יותר שלא מסיח תשומת לב מהתוכן.",promptHe:"אני רוצה רקע של גרדיאנט רשת (Mesh Gradient) — כתמי צבע גדולים ומטושטשים שמרחפים ומתמזגים על רקע כהה. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים אני רוצה לכתמים? כמה כתמים? באיזו מהירות הם יזוזו? כמה חזק הטשטוש? האם הרקע לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"wavesbg",title:"Waves Background",titleHe:"רקע גלים",description:"SVG animated waves at bottom of section with layered parallax motion.",descriptionHe:"גלים מונפשים ב-SVG בתחתית המקטע עם תנועת פרלקס שכבתית.",categories:["background"],tags:[{label:"waves"},{label:"svg"},{label:"background"}],difficulty:"beginner",previewComponent:"wavesbg",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Waves Background — SVG animated waves with layered parallax motion -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Waves Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif; color: #f0f0f0;
  }
  .wave-section {
    position: relative; width: 100%; height: 100vh;
    overflow: hidden; background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
  }
  .wave-section h1 {
    position: absolute; top: 30%; width: 100%;
    text-align: center; font-size: 2.5rem; z-index: 10;
  }
  .waves {
    position: absolute; bottom: 0; left: 0; width: 100%; height: 200px;
  }
  .waves svg { width: 200%; height: 100%; }
  .wave-layer { animation: wave-scroll 8s linear infinite; }
  .wave-layer:nth-child(2) { animation-duration: 12s; animation-direction: reverse; opacity: 0.6; }
  .wave-layer:nth-child(3) { animation-duration: 16s; opacity: 0.3; }
  @keyframes wave-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } /* scroll half since svg is 200% wide */
  }
</style>
</head>
<body>
  <div class="wave-section">
    <h1>Waves Background</h1>
    <div class="waves">
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="rgba(200,245,59,0.15)" d="M0,100 C360,180 720,20 1080,100 C1260,140 1350,80 1440,100 L1440,200 L0,200Z
          M1440,100 C1800,180 2160,20 2520,100 C2700,140 2790,80 2880,100 L2880,200 L1440,200Z"/>
      </svg>
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;">
        <path fill="rgba(68,170,255,0.12)" d="M0,120 C240,40 480,180 720,100 C960,20 1200,160 1440,120 L1440,200 L0,200Z
          M1440,120 C1680,40 1920,180 2160,100 C2400,20 2640,160 2880,120 L2880,200 L1440,200Z"/>
      </svg>
      <svg class="wave-layer" viewBox="0 0 1440 200" preserveAspectRatio="none" style="position:absolute;bottom:0;left:0;">
        <path fill="rgba(255,60,172,0.08)" d="M0,140 C480,60 960,180 1440,140 L1440,200 L0,200Z
          M1440,140 C1920,60 2400,180 2880,140 L2880,200 L1440,200Z"/>
      </svg>
    </div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>בתחתית המסך יש שלושה גלים מונפשים שנעים כל אחד בכיוון ובמהירות אחרים, וזה יוצר תחושה של ים. כל גל הוא נתיב SVG ברוחב כפול מהמסך שגולל את עצמו בלופ אינסופי, ככה שאין קפיצה. שלוש השכבות בשקיפויות שונות נותנות תחושת עומק.</p>`,proTipHe:"שנו את ערכי ה-path כדי לקבל גלים חדים יותר או רכים יותר. כלי כמו SVG Wave Generator יכולים לעזור.",promptHe:"אני רוצה רקע עם גלים מונפשים (Waves Background) בתחתית העמוד, בסגנון גלי ים עדינים שנעים לצדדים. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לגלים? כמה שכבות של גלים? באיזו מהירות הם יזוזו? כמה גבוהים הגלים? מה צבע הרקע מאחוריהם? האם הגלים בתחתית העמוד או במקום אחר? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"gridlines",title:"Grid Lines",titleHe:"קווי רשת",description:"Animated perspective grid lines background with vanishing point.",descriptionHe:"רקע קווי רשת מונפש עם פרספקטיבה ונקודת היעלמות.",categories:["background"],tags:[{label:"grid"},{label:"perspective"},{label:"background"}],difficulty:"intermediate",previewComponent:"gridlines",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Grid Lines — Animated perspective grid with scrolling lines and vanishing point -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Grid Lines</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .grid-container {
    position: relative; width: 100%; height: 100vh;
    perspective: 500px; /* depth of 3D effect */
    overflow: hidden;
  }
  .grid-plane {
    position: absolute; bottom: 0; left: -50%; width: 200%; height: 70%;
    transform: rotateX(60deg); /* tilt plane toward viewer */
    transform-origin: center bottom;
    background-image:
      repeating-linear-gradient(90deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 60px),
      repeating-linear-gradient(0deg, rgba(200,245,59,0.15) 0px, transparent 1px, transparent 60px);
    background-size: 60px 60px; /* grid cell size */
    animation: grid-scroll 3s linear infinite;
  }
  @keyframes grid-scroll {
    0% { background-position: 0 0; }
    100% { background-position: 0 60px; } /* move by one cell */
  }
  .glow {
    position: absolute; bottom: 0; left: 50%; width: 600px; height: 200px;
    transform: translateX(-50%);
    background: radial-gradient(ellipse, rgba(200,245,59,0.2) 0%, transparent 70%);
    pointer-events: none;
  }
  .title {
    position: absolute; top: 15%; width: 100%; text-align: center;
    font-size: 2.5rem; font-weight: 700; color: #f0f0f0;
    text-shadow: 0 0 40px rgba(200,245,59,0.3);
    z-index: 10;
  }
</style>
</head>
<body>
  <div class="grid-container">
    <div class="grid-plane"></div>
    <div class="glow"></div>
    <div class="title">Grid Lines</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>זה משטח רשת שנראה תלת-ממדי, כאילו אתם מסתכלים על רצפה עם קווים שרצה לכיוונכם. הטריק הוא הטיית המשטח עם פרספקטיבה כדי ליצור עומק, בזמן שהרקע של הקווים זז כלפי מטה בלופ. זוהר עדין בתחתית מוסיף תחושה של נקודת היעלמות באופק.</p>`,proTipHe:"הוסיפו שכבת radial-gradient עם mask כדי שהרשת תדעך בהדרגה לכיוון האופק.",promptHe:"אני רוצה רקע של קווי רשת בפרספקטיבה (Grid Lines) שנראה תלת-ממדי, בסגנון רטרו-פיוצ'ריסטי עם קווים שזזים קדימה. לפני שאתה כותב קוד, תשאל אותי: איזה צבע לקווים? מה גודל המשבצות? באיזו מהירות הקווים זזים? האם להוסיף זוהר בנקודת ההיעלמות? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"dotmatrix",title:"Dot Matrix",titleHe:"מטריצת נקודות",description:"Dot grid that reacts to mouse proximity with scale and color changes.",descriptionHe:"רשת נקודות שמגיבה לקרבת העכבר עם שינויי גודל וצבע.",categories:["background","cursor"],tags:[{label:"dots"},{label:"interactive"},{label:"cursor"}],difficulty:"advanced",previewComponent:"dotmatrix",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Dot Matrix — Interactive dot grid reacting to mouse proximity -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Dot Matrix</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="dots"></canvas>
  <script>
    const canvas = document.getElementById('dots');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const GAP = 28;        /* space between dots */
    const BASE_R = 2;      /* base dot radius */
    const MAX_R = 8;       /* max radius when near cursor */
    const INFLUENCE = 120;  /* cursor influence radius in px */
    let mouse = { x: -999, y: -999 };

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

    function draw() {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const t = Math.max(0, 1 - dist / INFLUENCE); /* 0-1 proximity */
          const r = BASE_R + (MAX_R - BASE_R) * t;
          const green = Math.round(245 * t + 85 * (1 - t));
          const red = Math.round(200 * t + 85 * (1 - t));
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = \`rgba(\${red},\${green},59,\${0.2 + 0.8 * t})\`;
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל המסך מלא ברשת של נקודות קטנות, וכשמזיזים את העכבר הנקודות הקרובות אליו גדלות ומשנות צבע. ככל שהנקודה קרובה יותר לסמן היא יותר גדולה ובוהקת, וככל שהיא רחוקה היא חוזרת להיות קטנה ומעומעמת. הכל מצויר על Canvas כי זה הרבה יותר יעיל מאלפי אלמנטים ב-HTML.</p>`,proTipHe:"הגבילו את טווח הלולאה רק לנקודות בתוך אזור ההשפעה של הסמן לשיפור ביצועים משמעותי ברזולוציות גבוהות.",promptHe:"אני רוצה רקע של מטריצת נקודות (Dot Matrix) אינטראקטיבית — רשת נקודות שמגיבה לתנועת העכבר עם שינויי גודל וצבע. לפני שאתה כותב קוד, תשאל אותי: איזה צבע לנקודות? מה הגודל הבסיסי ומה הגודל המקסימלי? כמה צפופה הרשת? מה רדיוס ההשפעה של העכבר? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"cloudbg",title:"Cloud Background",titleHe:"רקע עננים",description:"Soft moving cloud shapes with blur for dreamy atmosphere.",descriptionHe:"צורות ענן רכות נעות עם טשטוש ליצירת אווירה חלומית.",categories:["background"],tags:[{label:"clouds"},{label:"blur"},{label:"background"}],difficulty:"beginner",previewComponent:"cloudbg",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Cloud Background — Soft moving cloud shapes with blur for dreamy look -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Cloud Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0e1a; overflow: hidden;
    font-family: sans-serif;
  }
  .sky {
    position: relative; width: 100%; height: 100vh; overflow: hidden;
  }
  .cloud {
    position: absolute;
    background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.08), transparent 70%);
    border-radius: 50%;
    filter: blur(40px); /* soften edges */
    will-change: transform;
  }
  .cloud-1 { width: 500px; height: 200px; top: 10%; left: -10%; animation: float-right 30s linear infinite; }
  .cloud-2 { width: 400px; height: 160px; top: 35%; left: -15%; animation: float-right 45s linear infinite; opacity: 0.7; }
  .cloud-3 { width: 600px; height: 220px; top: 55%; left: -20%; animation: float-right 35s linear infinite; opacity: 0.5; }
  .cloud-4 { width: 350px; height: 140px; top: 75%; left: -10%; animation: float-right 50s linear infinite; opacity: 0.4; }
  .cloud-5 { width: 450px; height: 180px; top: 20%; left: -15%; animation: float-right 40s linear infinite; opacity: 0.6; animation-delay: -20s; }
  @keyframes float-right {
    0%   { transform: translateX(0); }
    100% { transform: translateX(calc(100vw + 600px)); } /* fully off right edge */
  }
  .moon {
    position: absolute; top: 12%; right: 15%;
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #f0f0f0, #ccc);
    box-shadow: 0 0 60px rgba(255,255,255,0.2), 0 0 120px rgba(200,245,59,0.05);
  }
  .title {
    position: absolute; bottom: 15%; width: 100%; text-align: center;
    color: rgba(240,240,240,0.6); font-size: 1.5rem; z-index: 10;
  }
</style>
</head>
<body>
  <div class="sky">
    <div class="moon"></div>
    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>
    <div class="cloud cloud-3"></div>
    <div class="cloud cloud-4"></div>
    <div class="cloud cloud-5"></div>
    <div class="title">Cloud Background</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>על רקע שמיים כהים צפים עננים רכים ומטושטשים משמאל לימין. כל ענן הוא בעצם אליפסה עם גרדיאנט לבן שדועך וטשטוש חזק שנותן לו מראה טבעי. חמישה עננים בגדלים ומהירויות שונות יוצרים תחושת עומק, וחלקם מתחילים באמצע האנימציה כדי שהמסך לא יהיה ריק בהתחלה.</p>`,proTipHe:"הוסיפו box-shadow פנימי לעננים עם צבע כחלחל עדין לאפקט של אור ירח.",promptHe:"אני רוצה רקע עם עננים צפים (Cloud Background) — עננים רכים ומטושטשים שנעים לאט על רקע שמיים כהים. לפני שאתה כותב קוד, תשאל אותי: מה צבע השמיים? מה צבע העננים ומה רמת השקיפות? כמה עננים? באיזו מהירות הם צפים? האם להוסיף ירח או כוכבים? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"raindrop",title:"Raindrop",titleHe:"טיפות גשם",description:"Canvas rain animation with falling drops and splash effect at bottom.",descriptionHe:"אנימציית גשם על Canvas עם טיפות נופלות ואפקט מתיזה בתחתית.",categories:["background"],tags:[{label:"rain"},{label:"canvas"},{label:"particles"}],difficulty:"intermediate",previewComponent:"raindrop",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Raindrop — Canvas rain with falling drops and splash particles -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Raindrop</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080a10; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="rain"></canvas>
  <script>
    const canvas = document.getElementById('rain');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const DROP_COUNT = 200;   /* number of raindrops */
    const SPLASH_LIFE = 12;   /* frames a splash lives */

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    /* Rain drops */
    const drops = Array.from({ length: DROP_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * -1000,
      speed: 4 + Math.random() * 6,   /* fall speed */
      len: 12 + Math.random() * 18,   /* streak length */
      opacity: 0.2 + Math.random() * 0.4,
    }));

    /* Splash particles */
    const splashes = [];

    function animate() {
      ctx.clearRect(0, 0, W, H);
      /* Draw drops */
      for (const d of drops) {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + 0.5, d.y + d.len); /* slight slant */
        ctx.strokeStyle = \`rgba(170,210,255,\${d.opacity})\`;
        ctx.lineWidth = 1;
        ctx.stroke();
        d.y += d.speed;
        if (d.y > H) {
          /* Create splash */
          for (let i = 0; i < 3; i++) {
            splashes.push({
              x: d.x, y: H,
              vx: (Math.random() - 0.5) * 2,
              vy: -1 - Math.random() * 2,
              life: SPLASH_LIFE,
            });
          }
          d.y = Math.random() * -200;
          d.x = Math.random() * W;
        }
      }
      /* Draw splashes */
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        const alpha = s.life / SPLASH_LIFE;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(170,210,255,\${alpha * 0.6})\`;
        ctx.fill();
        s.x += s.vx; s.y += s.vy; s.vy += 0.15; /* gravity */
        s.life--;
        if (s.life <= 0) splashes.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>סימולציית גשם על Canvas — מאתיים טיפות נופלות מלמעלה למטה במהירויות שונות, וכשטיפה פוגעת בתחתית המסך נוצרים חלקיקי מתיזה קטנים שעפים הצידה ולמעלה. הטיפות שיורדות מהמסך חוזרות למעלה במיקום אקראי, ככה שהגשם לעולם לא נגמר. הכל מצויר על Canvas כי זה הרבה יותר יעיל מאות אלמנטים נעים ב-HTML.</p>`,proTipHe:"הוסיפו רוח באמצעות הזזת d.x קלה בכל פריים — זה נותן מראה גשם אלכסוני יותר ריאליסטי.",promptHe:"אני רוצה רקע עם אפקט גשם (Raindrop) — טיפות גשם שנופלות עם אפקט מתיזה כשהן פוגעות בתחתית. לפני שאתה כותב קוד, תשאל אותי: כמה טיפות? באיזו מהירות הן נופלות? מה צבע הטיפות? האם להוסיף רוח (גשם אלכסוני)? מה עוצמת המתיזה? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"fireeffect",title:"Fire Effect",titleHe:"אפקט אש",description:"Canvas fire particles rising animation with glow and fade.",descriptionHe:"אנימציית חלקיקי אש עולים על Canvas עם זוהר ודעיכה.",categories:["background"],tags:[{label:"fire"},{label:"particles"},{label:"canvas"}],difficulty:"intermediate",previewComponent:"fireeffect",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Fire Effect — Canvas fire particles rising with color fade from orange to transparent -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Fire Effect</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #080808; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="fire"></canvas>
  <script>
    const canvas = document.getElementById('fire');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const PARTICLE_COUNT = 120;

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
      return {
        x: W / 2 + (Math.random() - 0.5) * 80,  /* spread from center */
        y: H,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -2 - Math.random() * 3,               /* upward speed */
        radius: 3 + Math.random() * 5,
        life: 1.0,                                 /* 1 = alive, 0 = dead */
        decay: 0.008 + Math.random() * 0.015,      /* fade speed */
      };
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

    function animate() {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        /* Color transitions: white -> yellow -> orange -> red -> transparent */
        const r = 255;
        const g = Math.round(200 * p.life);    /* green fades first */
        const b = Math.round(50 * p.life * p.life); /* blue fades fast */
        const a = p.life;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(\${r},\${g},\${b},\${a})\`;
        ctx.shadowColor = \`rgba(255,\${g},0,\${a * 0.5})\`;
        ctx.shadowBlur = 15; /* glow effect */
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx + (Math.random() - 0.5) * 0.5; /* slight wobble */
        p.y += p.vy;
        p.vy *= 0.99;  /* slow down gradually */
        p.life -= p.decay;

        if (p.life <= 0) Object.assign(p, createParticle()); /* recycle */
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>חלקיקים עולים מתחתית המסך ומדמים להבות אש. כל חלקיק מתחיל צהוב-לבן, עובר לכתום ואדום, ולבסוף דועך ונעלם. יש להם תזוזה קטנה הצידה שנותנת תנועה ריאלית של אש, וזוהר סביב כל חלקיק. כשחלקיק דועך לגמרי הוא מתחיל מחדש מלמטה, ככה שהאש לעולם לא נכבית.</p>`,proTipHe:"הוסיפו שכבה שנייה של חלקיקי עשן (אפור, איטיים יותר, גדולים יותר) מעל האש לריאליזם.",promptHe:"אני רוצה רקע עם אפקט אש (Fire Effect) — חלקיקי אש שעולים מלמטה עם מעבר צבעים מצהוב לאדום וזוהר. לפני שאתה כותב קוד, תשאל אותי: כמה חלקיקים? באיזו מהירות הם עולים? מאיפה האש יוצאת (מרכז, תחתית, מנקודה מסוימת)? מה טווח הצבעים? האם להוסיף עשן? מה צבע הרקע? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"holographic",title:"Holographic",titleHe:"הולוגרפי",description:"Holographic shimmer on surface that reacts to hover position.",descriptionHe:"אפקט הולוגרפי נוצץ על משטח שמגיב למיקום העכבר.",categories:["background","hover"],tags:[{label:"holographic"},{label:"shimmer"},{label:"hover"}],difficulty:"intermediate",previewComponent:"holographic",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Holographic — Shimmer surface with rainbow gradient that follows mouse -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Holographic</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .holo-card {
    position: relative; width: 320px; height: 200px;
    border-radius: 16px; overflow: hidden;
    background: #111; border: 1px solid rgba(255,255,255,0.1);
    cursor: pointer;
  }
  .holo-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255,0,0,0.15),
      rgba(255,165,0,0.15),
      rgba(255,255,0,0.15),
      rgba(0,255,0,0.15),
      rgba(0,255,255,0.15),
      rgba(0,0,255,0.15),
      rgba(128,0,255,0.15)
    );
    background-size: 300% 300%;
    mix-blend-mode: color-dodge;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .holo-card:hover .holo-shimmer { opacity: 1; }
  .holo-content {
    position: relative; z-index: 2; padding: 24px;
    color: #f0f0f0; height: 100%;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .holo-content h3 { font-size: 1.2rem; margin-bottom: 4px; }
  .holo-content p { font-size: 0.85rem; opacity: 0.6; }
</style>
</head>
<body>
  <div class="holo-card" id="card">
    <div class="holo-shimmer" id="shimmer"></div>
    <div class="holo-content">
      <h3>Holographic Card</h3>
      <p>Move your mouse across the card</p>
    </div>
  </div>
  <script>
    const card = document.getElementById('card');
    const shimmer = document.getElementById('shimmer');
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      /* Move gradient origin to follow cursor */
      shimmer.style.backgroundPosition = \`\${x}% \${y}%\`;
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כרטיס עם שכבת קשת צבעים שקופה מעליו שנראית רק כשמעבירים עליו את העכבר. הקשת זזה בעקבות הסמן, מה שיוצר אפקט של הולוגרמה נוצצת. הצבעים מתערבבים עם הרקע הכהה בצורה שגורמת להם להיראות כמו אור מוחזר, ממש כמו כרטיס הולוגרפי אמיתי.</p>`,proTipHe:"הוסיפו transform: perspective(600px) rotateX/Y קל לפי מיקום הסמן ליצירת אפקט כרטיס תלת-ממדי מלא.",promptHe:"אני רוצה אפקט הולוגרפי (Holographic) על כרטיס או אלמנט — קשת צבעים נוצצת שעוקבת אחרי העכבר. לפני שאתה כותב קוד, תשאל אותי: מה גודל האלמנט? אילו צבעים בקשת? כמה חזק האפקט? האם להוסיף גם הטיה תלת-ממדית? מה צבע הרקע של הכרטיס? האם האפקט רק בהובר או תמיד פעיל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"constellations",title:"Constellations",titleHe:"כוכבים",description:"Twinkling star field with connecting constellation lines between nearby stars.",descriptionHe:"שדה כוכבים מנצנצים עם קווי קבוצות כוכבים המחברים בין כוכבים קרובים.",categories:["background"],tags:[{label:"stars"},{label:"constellations"},{label:"canvas"}],difficulty:"intermediate",previewComponent:"constellations",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Constellations — Twinkling star field with connecting lines between nearby stars -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Constellations</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; background: #050510; overflow: hidden; }
  canvas { display: block; width: 100%; height: 100vh; }
</style>
</head>
<body>
  <canvas id="stars"></canvas>
  <script>
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const STAR_COUNT = 150;
    const LINE_DIST = 100;  /* max distance for constellation lines */

    let W, H;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      radius: 0.5 + Math.random() * 1.5,
      twinkleSpeed: 0.01 + Math.random() * 0.03, /* radians per frame */
      phase: Math.random() * Math.PI * 2,         /* start at random phase */
    }));

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      /* Draw constellation lines first (behind stars) */
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            const alpha = (1 - dist / LINE_DIST) * 0.2;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = \`rgba(100,150,255,\${alpha})\`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* Draw twinkling stars */
      for (const s of stars) {
        const brightness = 0.4 + 0.6 * Math.abs(Math.sin(frame * s.twinkleSpeed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(200,220,255,\${brightness})\`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>שמיים מלאים בכוכבים מנצנצים, וכשכוכבים קרובים מספיק אחד לשני נמתח ביניהם קו עדין שיוצר צורה של קבוצת כוכבים. כל כוכב מנצנץ בקצב אחר שנותן תחושה טבעית. הקווים נעלמים ככל שהמרחק גדל, וככה מקבלים מראה של שמי לילה אמיתיים עם קבוצות כוכבים.</p>`,proTipHe:"הוסיפו כוכב שביט מדי פעם (חלקיק מהיר עם שובל דועך) כדי להפתיע את המשתמש.",promptHe:"אני רוצה רקע של כוכבים עם קבוצות כוכבים (Constellations) — כוכבים מנצנצים עם קווי חיבור בין כוכבים קרובים. לפני שאתה כותב קוד, תשאל אותי: כמה כוכבים? מה המרחק המקסימלי לקווי חיבור? מה צבע הכוכבים והקווים? באיזה קצב הם מנצנצים? מה צבע הרקע? האם להוסיף כוכב שביט מדי פעם? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"liquidbg",title:"Liquid Background",titleHe:"רקע נוזלי",description:"SVG turbulence filter animated liquid background effect.",descriptionHe:"אפקט רקע נוזלי מונפש באמצעות פילטר SVG turbulence.",categories:["background"],tags:[{label:"liquid"},{label:"svg-filter"},{label:"turbulence"}],difficulty:"advanced",previewComponent:"liquidbg",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Liquid Background — SVG feTurbulence + feDisplacementMap for liquid distortion -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Liquid Background</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .liquid-container {
    position: relative; width: 100%; height: 100vh; overflow: hidden;
  }
  .liquid-bg {
    position: absolute; inset: -20px; /* overflow to hide edge artifacts */
    background: linear-gradient(135deg, #0a1628, #1a0a28, #0a2818, #1a1a0a);
    background-size: 400% 400%;
    animation: gradient-shift 10s ease infinite;
    filter: url(#liquid-filter);
  }
  @keyframes gradient-shift {
    0%, 100% { background-position: 0% 50%; }
    25% { background-position: 100% 0%; }
    50% { background-position: 100% 100%; }
    75% { background-position: 0% 100%; }
  }
  .liquid-content {
    position: relative; z-index: 10; height: 100%;
    display: flex; align-items: center; justify-content: center;
    color: #f0f0f0; font-size: 2rem; font-weight: 700;
    text-shadow: 0 2px 20px rgba(0,0,0,0.8);
  }
  /* Blobs that get distorted by the filter */
  .liquid-blob {
    position: absolute; border-radius: 50%;
    filter: url(#liquid-filter);
  }
  .blob-a {
    width: 300px; height: 300px; top: 20%; left: 15%;
    background: radial-gradient(circle, rgba(68,170,255,0.3), transparent 70%);
    animation: drift-a 8s ease-in-out infinite alternate;
  }
  .blob-b {
    width: 250px; height: 250px; bottom: 20%; right: 15%;
    background: radial-gradient(circle, rgba(255,60,172,0.3), transparent 70%);
    animation: drift-b 10s ease-in-out infinite alternate;
  }
  @keyframes drift-a { 0% { transform: translate(0,0); } 100% { transform: translate(60px, 40px); } }
  @keyframes drift-b { 0% { transform: translate(0,0); } 100% { transform: translate(-50px, -30px); } }
</style>
</head>
<body>
  <!-- SVG filter definition -->
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="liquid-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1" result="noise">
          <animate attributeName="seed" from="1" to="100" dur="10s" repeatCount="indefinite"/>
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  </svg>
  <div class="liquid-container">
    <div class="liquid-bg"></div>
    <div class="liquid-blob blob-a"></div>
    <div class="liquid-blob blob-b"></div>
    <div class="liquid-content">Liquid Background</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הרקע נראה כמו נוזל זורם שמתעוות כל הזמן. הטריק הוא פילטר SVG שיוצר רעש אקראי ומשתמש בו כדי להזיז פיקסלים מהמקום שלהם, מה שנותן תחושה של מים או לבה. הרעש משתנה כל הזמן ויוצר תנועה נוזלית רציפה. מעל זה יש גרדיאנט צבעוני שזז לאט וכתמי צבע נוספים שמתעוותים גם הם.</p>`,proTipHe:"שנו את numOctaves ל-4 או 5 לטקסטורה מפורטת יותר, אבל זהירות מעלות הביצועים.",promptHe:"אני רוצה רקע נוזלי (Liquid Background) — אפקט של נוזל זורם עם עיוות אורגני באמצעות פילטרי SVG. לפני שאתה כותב קוד, תשאל אותי: אילו צבעים לרקע? כמה חזק העיוות? באיזו מהירות הנוזל זז? האם להוסיף כתמי צבע נוספים? מה רמת הפירוט של הטקסטורה? האם זה לכל העמוד או לאזור מסוים? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scanlines",title:"Scanlines",titleHe:"קווי סריקה",description:"CRT monitor scanlines overlay effect with optional flicker.",descriptionHe:"אפקט קווי סריקה של מסך CRT ישן עם הבהוב אופציונלי.",categories:["background"],tags:[{label:"scanlines"},{label:"retro"},{label:"crt"}],difficulty:"beginner",previewComponent:"scanlines",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Scanlines — CRT monitor scanlines overlay with vignette and flicker -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scanlines</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #0a0a0a; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Courier New', monospace;
  }
  .crt-screen {
    position: relative; width: 500px; height: 320px;
    background: #0a0a0a; border-radius: 12px; overflow: hidden;
    border: 2px solid #222;
  }
  .crt-content {
    position: relative; z-index: 1; padding: 40px;
    color: #33ff33; /* classic green terminal */
    font-size: 1rem; line-height: 1.8;
  }
  .crt-content h2 { font-size: 1.4rem; margin-bottom: 12px; color: #44ff44; }
  /* Scanlines overlay */
  .scanlines {
    position: absolute; inset: 0; pointer-events: none; z-index: 10;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,          /* visible line */
      rgba(0,0,0,0.3) 2px,
      rgba(0,0,0,0.3) 4px       /* dark line, 4px total period */
    );
  }
  /* CRT vignette — dark edges */
  .vignette {
    position: absolute; inset: 0; pointer-events: none; z-index: 11;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
  }
  /* Subtle flicker */
  .flicker {
    position: absolute; inset: 0; pointer-events: none; z-index: 12;
    animation: crt-flicker 0.1s infinite;
    opacity: 0.03;
    background: #fff;
  }
  @keyframes crt-flicker {
    0%, 100% { opacity: 0.03; }
    50% { opacity: 0.05; }
  }
</style>
</head>
<body>
  <div class="crt-screen">
    <div class="crt-content">
      <h2>> SYSTEM ONLINE</h2>
      <p>> Initializing display...</p>
      <p>> Scanlines enabled.</p>
      <p>> Vignette active.</p>
      <p>> Ready._</p>
    </div>
    <div class="scanlines"></div>
    <div class="vignette"></div>
    <div class="flicker"></div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>המסך נראה כמו מסך מחשב ישן מהשנות ה-80 עם שלושה אפקטים שנערמים זה על זה. יש פסים אופקיים דקיקים שמדמים קווי סריקה של מסך CRT, כהייה בפינות שמדמה מסך קמור, והבהוב עדין שכמעט לא מורגש אבל מוסיף אותנטיות. הטקסט ירוק בסגנון טרמינל קלאסי.</p>`,proTipHe:"הוסיפו text-shadow: 0 0 8px #33ff33 לטקסט כדי לדמות את הזוהר האופייני של פוספור ירוק.",promptHe:'אני רוצה אפקט קווי סריקה (Scanlines) בסגנון מסך CRT ישן — עם קווי סריקה, כהייה בקצוות והבהוב עדין. לפני שאתה כותב קוד, תשאל אותי: מה צבע הטקסט (ירוק קלאסי, כתום, לבן)? כמה חזקים קווי הסריקה? האם להוסיף הבהוב? מה צבע הרקע? מה גודל ה"מסך"? האם זה על כל העמוד או על אלמנט ספציפי? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.'},{id:"pixelate",title:"Pixelate",titleHe:"פיקסלציה",description:"Content pixelates and depixelates on hover using CSS scaling trick.",descriptionHe:"תוכן מתפקסל ומתבהר בהובר באמצעות טריק CSS של הקטנה והגדלה.",categories:["background","hover"],tags:[{label:"pixelate"},{label:"hover"},{label:"image"}],difficulty:"intermediate",previewComponent:"pixelate",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<!-- Pixelate — CSS pixelation trick using image-rendering and scale transforms -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pixelate</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    min-height: 100vh; background: #080808; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    font-family: sans-serif;
  }
  .pixel-container {
    position: relative; width: 360px; height: 240px;
    border-radius: 12px; overflow: hidden; cursor: pointer;
  }
  .pixel-content {
    width: 100%; height: 100%;
    /* Gradient as sample content to pixelate */
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #c8f53b);
    background-size: 200% 200%;
    animation: hue-shift 6s ease infinite;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 1.5rem; font-weight: 700;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }
  @keyframes hue-shift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  /* Pixelation overlay: tiny scaled-down version re-scaled up */
  .pixel-overlay {
    position: absolute; inset: 0;
    background: inherit;
    /* Step 1: shrink to tiny size */
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    background: linear-gradient(135deg, #c8f53b, #44aaff, #ff3cac, #c8f53b);
    background-size: 200% 200%;
    animation: hue-shift 6s ease infinite;
    /* Pixelation via SVG filter */
    filter: url(#pixelate-filter);
    transition: opacity 0.6s ease;
    opacity: 1;
  }
  .pixel-container:hover .pixel-overlay {
    opacity: 0; /* reveal clear content on hover */
  }
  .pixel-label {
    position: absolute; bottom: 12px; width: 100%; text-align: center;
    color: rgba(255,255,255,0.7); font-size: 0.8rem; z-index: 5;
  }
</style>
</head>
<body>
  <svg style="position:absolute;width:0;height:0;">
    <defs>
      <filter id="pixelate-filter">
        <!-- Shrink to 1/10th resolution then scale back up for pixel effect -->
        <feFlood x="4" y="4" width="2" height="2"/>
        <feComposite width="10" height="10"/>
        <feTile result="tiled"/>
        <feComposite in="SourceGraphic" in2="tiled" operator="in"/>
        <feMorphology operator="dilate" radius="5"/>
      </filter>
    </defs>
  </svg>
  <div class="pixel-container">
    <div class="pixel-content">HOVER ME</div>
    <div class="pixel-overlay"></div>
    <div class="pixel-label">Hover to reveal</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>התוכן מוצג מפוקסל, כאילו הורידו לו את הרזולוציה. כשמעבירים את העכבר מעל, שכבת הפיקסלציה נעלמת בהדרגה וחושפת את התוכן הברור. הפיקסלציה נעשית באמצעות פילטר SVG שמצמצם את הרזולוציה ומגדיל חזרה עם קצוות חדים, ומעבר רך של שקיפות עושה את החשיפה אלגנטית.</p>`,proTipHe:"השתמשו באפקט הזה כמסך טעינה — התחילו מפוקסל ובהדרגה חשפו את התוכן כשהוא מוכן.",promptHe:"אני רוצה אפקט פיקסלציה (Pixelate) — תוכן שמוצג מפוקסל ומתבהר בהובר או באנימציה. לפני שאתה כותב קוד, תשאל אותי: מה גודל הפיקסלים? מה מהירות החשיפה? האם החשיפה בהובר או אוטומטית? מה התוכן שמאחורי הפיקסלציה (תמונה, גרדיאנט, טקסט)? מה גודל האלמנט? האם להוסיף אנימציה לרקע גם במצב המפוקסל? תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה."},{id:"scrambletext",title:"Scramble Text",titleHe:"טקסט מתערבב",description:"Random character scramble animates to final text on hover — each letter cycles through random chars before settling.",descriptionHe:"תווים אקראיים מתערבבים ומתייצבים לטקסט הסופי בעת ריחוף — כל אות עוברת מחזור של תווים רנדומליים.",categories:["text"],tags:[{label:"scramble"},{label:"text"},{label:"hover"}],difficulty:"intermediate",previewComponent:"scrambletext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Scramble Text</title>
<!-- Scramble Text — Random chars cycle through before resolving to final text on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: monospace;
  }
  .scramble {
    font-size: 3rem; font-weight: 700; color: #fff;
    cursor: pointer; letter-spacing: 4px;
    padding: 1rem 2rem; border-radius: 12px;
    transition: background 0.3s;
  }
  .scramble:hover { background: rgba(108,99,255,0.08); }
  .label { color: #555; font-size: 0.85rem; margin-top: 1rem; text-align: center; }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="scramble" id="scramble">EFFECTS</div>
    <div class="label">Hover to scramble</div>
  </div>
  <script>
    const el = document.getElementById('scramble');
    const original = el.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';
    let animId = null;

    el.addEventListener('mouseenter', () => {
      let iteration = 0;
      const totalIterations = original.length * 3; /* 3 cycles per letter */
      clearInterval(animId);
      animId = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (i < Math.floor(iteration / 3)) return original[i]; /* settled */
            return chars[Math.floor(Math.random() * chars.length)]; /* scrambling */
          })
          .join('');
        iteration++;
        if (iteration > totalIterations) clearInterval(animId);
      }, 40); /* 40ms per frame */
    });

    el.addEventListener('mouseleave', () => {
      clearInterval(animId);
      el.textContent = original;
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשמעבירים את העכבר מעל הטקסט, האותיות מתחילות לקפוץ ולהשתנות לתווים רנדומליים — כאילו מישהו מפענח קוד סודי. אחרי שנייה הכל מתייצב חזרה למילים המקוריות. האפקט הזה עובד עם JavaScript פשוט שמחליף כל אות באות אקראית כל 40 אלפיות שנייה, ובהדרגה מחזיר את האותיות הנכונות משמאל לימין.</p>`,proTipHe:"שנו את מספר הסבבים לכל אות (3) כדי לשלוט במהירות ההתייצבות — ערך גבוה יותר = אנימציה ארוכה יותר.",promptHe:`אני רוצה ליצור אפקט טקסט מתערבב (Scramble Text) באתר שלי. כשמרחפים עם העכבר מעל טקסט, האותיות מתחלפות באופן אקראי ואז מתייצבות חזרה למילה המקורית.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה שיתערבב?
2. מה גודל הפונט?
3. מה צבע הטקסט והרקע?
4. כמה מהר האותיות מתייצבות?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"splitchar",title:"Split Char",titleHe:"פיצול תווים",description:"Each letter flies in from a random position on load with staggered delays for a dramatic entrance.",descriptionHe:"כל אות עפה ממיקום אקראי ומתייצבת במקומה עם השהיה מדורגת ליצירת כניסה דרמטית.",categories:["text"],tags:[{label:"split"},{label:"text"},{label:"animation"}],difficulty:"intermediate",previewComponent:"splitchar",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Split Char</title>
<!-- Split Char — Each letter flies in from a random off-screen position -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .split-container { display: flex; gap: 4px; perspective: 600px; }
  .split-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block;
    opacity: 0;
    animation: fly-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  }
  @keyframes fly-in {
    from {
      opacity: 0;
      transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0) rotate(0deg) scale(1);
      filter: blur(0px);
    }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="split-container" id="container"></div>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    const text = 'EFFECTS';
    const container = document.getElementById('container');

    function render() {
      container.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'split-char';
        span.textContent = ch;
        /* Random origin between -300px and 300px */
        span.style.setProperty('--tx', (Math.random() * 600 - 300) + 'px');
        span.style.setProperty('--ty', (Math.random() * 600 - 300) + 'px');
        span.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
        span.style.animationDelay = (i * 0.1) + 's'; /* 100ms stagger */
        container.appendChild(span);
      });
    }

    render();
    document.getElementById('replay').addEventListener('click', render);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כשהדף נטען, כל אות עפה ממיקום אקראי על המסך ונוחתת בדיוק במקום שלה — כמו חתיכות פאזל שמתאספות. כל אות מגיעה עם השהייה קצרה אחרי הקודמת, מה שיוצר אפקט גלי ומסודר. בזמן הטיסה האותיות גם מטושטשות קצת ומסתובבות, וכשהן מגיעות למקום הן מתחדדות ומתיישרות.</p>`,proTipHe:"הוסיפו perspective ל-container כדי לקבל תחושת תלת-מימד כשהאותיות עפות.",promptHe:`אני רוצה ליצור אפקט פיצול תווים (Split Char) באתר שלי. כשהדף נטען, כל אות עפה ממיקום אקראי ונוחתת במקום שלה עם אנימציה דרמטית.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה שיוצג?
2. מה גודל הפונט והצבע?
3. מה צבע הרקע?
4. כמה מהירה האנימציה?
5. האם להוסיף כפתור Replay?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"stroketext",title:"Stroke Text",titleHe:"קו מתאר טקסט",description:"SVG text stroke-dashoffset draw-on animation that traces the outline of each letter.",descriptionHe:"אנימציית ציור קו מתאר טקסט באמצעות SVG stroke-dashoffset שמשרטטת את המתאר של כל אות.",categories:["text"],tags:[{label:"stroke"},{label:"SVG"},{label:"draw"}],difficulty:"intermediate",previewComponent:"stroketext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Stroke Text</title>
<!-- Stroke Text — SVG text stroke draws on with dashoffset animation -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  svg { overflow: visible; }
  .stroke-text {
    font-size: 80px; font-weight: 900; font-family: Arial, sans-serif;
    fill: none;
    stroke: #6c63ff;
    stroke-width: 2;
    stroke-dasharray: 500; /* total path length estimate */
    stroke-dashoffset: 500;
    animation: draw-stroke 3s ease forwards;
  }
  .fill-text {
    font-size: 80px; font-weight: 900; font-family: Arial, sans-serif;
    fill: #fff; opacity: 0;
    animation: fade-fill 1s ease 2.5s forwards; /* starts near end of stroke */
  }
  @keyframes draw-stroke {
    to { stroke-dashoffset: 0; }
  }
  @keyframes fade-fill {
    to { opacity: 1; }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <svg id="svg" viewBox="0 0 420 100" width="420" height="100">
    <text class="stroke-text" x="50%" y="75" text-anchor="middle" id="strokeEl">EFFECT</text>
    <text class="fill-text" x="50%" y="75" text-anchor="middle" id="fillEl">EFFECT</text>
  </svg>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    document.getElementById('replay').addEventListener('click', () => {
      const svg = document.getElementById('svg');
      const clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
      /* re-bind replay */
      document.getElementById('replay').addEventListener('click', arguments.callee);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט נצייר על המסך כאילו מישהו משרטט אותו ביד — קו דק סגול שעוקב אחרי צורת האותיות לאט לאט. בסוף הציור הטקסט מתמלא בצבע לבן ונהיה מוצק. הכל נעשה עם SVG ואנימציית CSS שמזיזה את נקודת ההתחלה של הקו עד שהוא נראה במלואו.</p>`,proTipHe:"השתמשו ב-getTotalLength() ב-JavaScript כדי לחשב את אורך הנתיב המדויק של כל אות.",promptHe:`אני רוצה ליצור אפקט קו מתאר טקסט (Stroke Text) באתר שלי. הטקסט נצייר על המסך כאילו מישהו משרטט אותו ביד, ואז מתמלא בצבע.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה צבע הקו המתאר ומה צבע המילוי?
3. מה גודל הפונט?
4. כמה מהירה האנימציה?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"blurreveal",title:"Blur Reveal",titleHe:"חשיפת טשטוש",description:"Text reveals by animating blur from 20px to 0 with a fade-in for a dreamy entrance.",descriptionHe:"טקסט נחשף באנימציית טשטוש מ-20px ל-0 עם דהייה-פנימה ליצירת כניסה חלומית.",categories:["text"],tags:[{label:"blur"},{label:"reveal"},{label:"fade"}],difficulty:"beginner",previewComponent:"blurreveal",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Blur Reveal</title>
<!-- Blur Reveal — Text fades in while blur animates from 20px to 0 -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1.5rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .blur-word {
    font-size: 3.5rem; font-weight: 900; color: #fff;
    opacity: 0;
    filter: blur(20px); /* start fully blurred */
    animation: blur-reveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  .blur-word:nth-child(2) { animation-delay: 0.3s; font-size: 1.5rem; color: #888; }
  .blur-word:nth-child(3) { animation-delay: 0.6s; font-size: 1.1rem; color: #555; }
  @keyframes blur-reveal {
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }
  .replay-btn {
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
    animation: blur-reveal 0.8s 1s forwards; opacity: 0; filter: blur(10px);
  }
</style>
</head>
<body>
  <div id="container">
    <div class="blur-word">BLUR REVEAL</div>
    <div class="blur-word">Smooth text entrance</div>
    <div class="blur-word">From foggy to crystal clear</div>
  </div>
  <button class="replay-btn" id="replay" onclick="replay()">Replay</button>
  <script>
    function replay() {
      const c = document.getElementById('container');
      const html = c.innerHTML;
      c.innerHTML = '';
      /* Force reflow then re-insert to re-trigger animations */
      requestAnimationFrame(() => { c.innerHTML = html; });
    }
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט מתחיל מטושטש לגמרי ובלתי נראה, כאילו מסתתר בתוך ערפל. בהדרגה הוא מתחדד ומתגלה — קודם השורה הראשונה, אחר כך השנייה, ואז השלישית. זה עובד עם אנימציית CSS פשוטה שמשנה את רמת הטשטוש מגבוהה לאפס ובמקביל מעלה את השקיפות.</p>`,proTipHe:"שלבו את האפקט עם translateY קל כדי שהטקסט גם יעלה מלמטה תוך כדי התגלות.",promptHe:`אני רוצה ליצור אפקט חשיפת טשטוש (Blur Reveal) באתר שלי. טקסט שמתחיל מטושטש ובלתי נראה ובהדרגה מתחדד ומתגלה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט (אפשר כמה שורות)?
2. מה גודל הפונט לכל שורה?
3. מה צבע הטקסט והרקע?
4. כמה מהירה ההתגלות?
5. האם להוסיף כפתור Replay?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"wavytext",title:"Wavy Text",titleHe:"טקסט גלי",description:"Each letter animates up and down in a continuous sine wave loop with staggered delays.",descriptionHe:"כל אות מתנודדת למעלה ולמטה בלולאת גל סינוסי רציפה עם השהיות מדורגות.",categories:["text"],tags:[{label:"wave"},{label:"text"},{label:"loop"}],difficulty:"beginner",previewComponent:"wavytext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Wavy Text</title>
<!-- Wavy Text — Each letter bobs up and down in a sine wave loop -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .wavy-container { display: flex; }
  .wavy-char {
    font-size: 3.5rem; font-weight: 900; color: #fff;
    display: inline-block;
    animation: wave 1.5s ease-in-out infinite;
  }
  .wavy-char.space { width: 16px; } /* visible space */
  @keyframes wave {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); } /* 20px peak height */
  }
</style>
</head>
<body>
  <div class="wavy-container" id="wavy"></div>
  <script>
    const text = 'WAVE EFFECT';
    const container = document.getElementById('wavy');
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'wavy-char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '' : ch;
      span.style.animationDelay = (i * 0.08) + 's'; /* 80ms stagger per letter */
      container.appendChild(span);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל אות בטקסט קופצת למעלה ולמטה בלולאה אינסופית, אבל כל אות מתחילה רגע אחרי הקודמת — וככה נוצר גל שעובר מהאות הראשונה עד האחרונה. האפקט כולו נעשה עם CSS בלבד, בלי JavaScript, באמצעות אנימציה שמזיזה כל אות למעלה ולמטה עם השהייה מדורגת.</p>`,proTipHe:"הוסיפו שינוי צבע לכל אות לפי האינדקס כדי ליצור אפקט קשת בענן גלית.",promptHe:`אני רוצה ליצור אפקט טקסט גלי (Wavy Text) באתר שלי. כל אות מתנודדת למעלה ולמטה וזה יוצר גל שעובר לאורך המילה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה גודל הפונט והצבע?
3. מה צבע הרקע?
4. כמה גבוה הגל (כמה פיקסלים כל אות קופצת)?
5. מה מהירות הגל?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"highlighttext",title:"Highlight Text",titleHe:"הדגשת טקסט",description:"A colored highlight sweeps under text like a marker pen on load or scroll.",descriptionHe:"הדגשה צבעונית גולשת מתחת לטקסט כמו טוש מרקר בזמן טעינה או גלילה.",categories:["text"],tags:[{label:"highlight"},{label:"marker"},{label:"underline"}],difficulty:"beginner",previewComponent:"highlighttext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Highlight Text</title>
<!-- Highlight Text — Marker-style highlight sweeps under text -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .highlight-line {
    font-size: 2.5rem; font-weight: 700; color: #fff;
    line-height: 1.8; text-align: center; max-width: 600px;
  }
  .highlight {
    position: relative; display: inline;
    background: linear-gradient(
      transparent 55%,                /* top 55% is transparent */
      rgba(108, 99, 255, 0.35) 55%    /* bottom 45% is the highlight */
    );
    background-size: 0% 100%;         /* start with zero width */
    background-repeat: no-repeat;
    animation: sweep 1.2s ease forwards;
  }
  .highlight:nth-child(2) { animation-delay: 0.5s; }
  .highlight:nth-child(3) {
    animation-delay: 1s;
    background: linear-gradient(transparent 55%, rgba(236,72,153,0.3) 55%);
    background-size: 0% 100%;
    background-repeat: no-repeat;
  }
  @keyframes sweep {
    to { background-size: 100% 100%; } /* expand to full width */
  }
</style>
</head>
<body>
  <div class="highlight-line">
    <span class="highlight">This is important</span><br/>
    <span class="highlight">text that gets</span><br/>
    <span class="highlight">highlighted like a marker</span>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הדגשה צבעונית גולשת מתחת לטקסט, כמו שמישהו מעביר טוש מרקר בזמן אמת. ההדגשה מופיעה משמאל לימין, שורה אחרי שורה. הטריק הוא שימוש ברקע מדורג שמכסה רק את החלק התחתון של כל שורה, ואנימציה שמרחיבה אותו מאפס לרוחב מלא.</p>`,proTipHe:"השתמשו ב-background-position: right במקום left כדי שההדגשה תגלוש מימין — מתאים יותר לעברית.",promptHe:`אני רוצה ליצור אפקט הדגשת טקסט (Highlight Text) באתר שלי. הדגשה צבעונית שגולשת מתחת לטקסט כמו טוש מרקר.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה להדגיש?
2. מה צבע ההדגשה (אפשר כמה צבעים לשורות שונות)?
3. מה גודל הפונט?
4. מה צבע הטקסט והרקע?
5. כמה מהירה אנימציית ההדגשה?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"flipword",title:"Flip Word",titleHe:"מילים מתהפכות",description:"Words flip on the Y axis to reveal the next word in a rotating list with 3D perspective.",descriptionHe:"מילים מתהפכות על ציר ה-Y לחשוף את המילה הבאה ברשימה מסתובבת עם פרספקטיבה תלת-ממדית.",categories:["text"],tags:[{label:"flip"},{label:"3D"},{label:"rotate"}],difficulty:"intermediate",previewComponent:"flipword",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Flip Word</title>
<!-- Flip Word — Words flip on Y axis to reveal the next word in a list -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
    color: #fff;
  }
  .flip-container {
    font-size: 2.5rem; font-weight: 700;
    display: flex; align-items: center; gap: 16px;
  }
  .flip-slot {
    perspective: 600px; /* depth for 3D flip */
    display: inline-block; position: relative;
    height: 1.3em; overflow: hidden;
    min-width: 200px; text-align: center;
  }
  .flip-word {
    display: block;
    backface-visibility: hidden;
    color: #6c63ff;
    animation: flipIn 0.6s ease forwards;
  }
  .flip-word.exit {
    animation: flipOut 0.6s ease forwards;
    position: absolute; top: 0; left: 0; width: 100%;
  }
  @keyframes flipIn {
    from { transform: rotateX(-90deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }
  @keyframes flipOut {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(90deg);  opacity: 0; }
  }
</style>
</head>
<body>
  <div class="flip-container">
    <span>We build</span>
    <div class="flip-slot" id="slot"></div>
  </div>
  <script>
    const words = ['websites', 'products', 'dreams', 'brands', 'futures'];
    const slot = document.getElementById('slot');
    let idx = 0;

    function showWord() {
      /* Exit current */
      const current = slot.querySelector('.flip-word:not(.exit)');
      if (current) {
        current.classList.add('exit');
        setTimeout(() => current.remove(), 600); /* remove after flip-out */
      }
      /* Enter new */
      const span = document.createElement('span');
      span.className = 'flip-word';
      span.textContent = words[idx];
      slot.appendChild(span);
      idx = (idx + 1) % words.length;
    }

    showWord();
    setInterval(showWord, 2500); /* switch every 2.5 seconds */
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>מילה אחת מתהפכת ונעלמת, ובמקומה מגיעה מילה חדשה שמתהפכת פנימה — כמו לוח מודעות מתגלגל. זה מושלם לסלוגנים כמו "אנחנו בונים אתרים / מוצרים / חלומות". האפקט עובד עם אנימציית CSS שמסובבת את המילה ב-90 מעלות כדי שתיעלם, ומכניסה את המילה הבאה מהכיוון הנגדי עם תחושה תלת-ממדית.</p>`,proTipHe:"הוסיפו text-shadow עדין בזמן ה-flip כדי להעצים את אפקט התלת-מימד.",promptHe:`אני רוצה ליצור אפקט מילים מתהפכות (Flip Word) באתר שלי. מילה אחת מתהפכת ונעלמת ומילה חדשה מגיעה במקומה באנימציה תלת-ממדית.

לפני שתיצור את הקוד, תשאל אותי:
1. מה המשפט הקבוע (למשל "אנחנו בונים")?
2. מה רשימת המילים שמתחלפות?
3. מה גודל הפונט והצבעים?
4. כמה זמן כל מילה מוצגת לפני שמתחלפת?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"stackedtext",title:"Stacked Text",titleHe:"טקסט מוערם",description:"Multiple text layers with different opacities that spread apart on hover for a depth effect.",descriptionHe:"מספר שכבות טקסט עם שקיפויות שונות שנפרדות בריחוף ליצירת אפקט עומק.",categories:["text"],tags:[{label:"stack"},{label:"layers"},{label:"hover"}],difficulty:"beginner",previewComponent:"stackedtext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Stacked Text</title>
<!-- Stacked Text — Layered text copies spread apart on hover -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .stack-wrap {
    position: relative; cursor: pointer;
    font-size: 4rem; font-weight: 900;
  }
  .stack-layer {
    position: absolute; top: 0; left: 0;
    transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1),
                opacity 0.5s ease;
    user-select: none;
  }
  .stack-layer:nth-child(1) { color: rgba(108,99,255,0.15); } /* deepest */
  .stack-layer:nth-child(2) { color: rgba(108,99,255,0.30); }
  .stack-layer:nth-child(3) { color: rgba(108,99,255,0.50); }
  .stack-front { position: relative; color: #fff; z-index: 4; }

  .stack-wrap:hover .stack-layer:nth-child(1) {
    transform: translate(-12px, -12px); /* offset back layer */
  }
  .stack-wrap:hover .stack-layer:nth-child(2) {
    transform: translate(-8px, -8px);
  }
  .stack-wrap:hover .stack-layer:nth-child(3) {
    transform: translate(-4px, -4px);
  }
  .label { color: #555; font-size: 0.85rem; text-align: center; margin-top: 2rem; }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="stack-wrap">
      <span class="stack-layer">STACK</span>
      <span class="stack-layer">STACK</span>
      <span class="stack-layer">STACK</span>
      <span class="stack-front">STACK</span>
    </div>
    <div class="label">Hover to expand layers</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כמה עותקים של אותו טקסט מונחים אחד על השני בשקיפויות שונות. כשמעבירים את העכבר מעל, השכבות נפרדות ונחשף אפקט עומק — כאילו הטקסט עשוי מכמה שכבות שפתאום נפתחות כמו מניפה. הכל נעשה עם CSS בלבד, בלי JavaScript, באמצעות שכבות עם שקיפות שונה שזזות בריחוף.</p>`,proTipHe:'נסו לשנות את כיוון ה-translate לכל שכבה בנפרד ליצירת אפקט "התפוצצות" מעניין.',promptHe:`אני רוצה ליצור אפקט טקסט מוערם (Stacked Text) באתר שלי. כמה שכבות של אותו טקסט מונחות אחת על השנייה, ובריחוף הן נפרדות ויוצרות אפקט עומק.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה גודל הפונט?
3. כמה שכבות ומה הצבעים שלהן?
4. מה צבע הרקע?
5. לאיזה כיוון השכבות נפרדות בריחוף?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"gradienttext",title:"Gradient Text",titleHe:"טקסט גרדיאנט",description:"Animated moving gradient inside text using background-clip and background-position animation.",descriptionHe:"גרדיאנט נע מונפש בתוך טקסט באמצעות background-clip ואנימציית background-position.",categories:["text"],tags:[{label:"gradient"},{label:"color"},{label:"clip"}],difficulty:"beginner",previewComponent:"gradienttext",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Gradient Text</title>
<!-- Gradient Text — Moving gradient clipped to text shape -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 1rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .gradient-text {
    font-size: 4.5rem; font-weight: 900;
    background: linear-gradient(
      90deg,
      #6c63ff, #ec4899, #06b6d4, #a855f7, #6c63ff
    );
    background-size: 300% 100%; /* 3x width for smooth travel */
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradient-shift 4s linear infinite;
  }
  .sub { color: #555; font-size: 0.9rem; }
  @keyframes gradient-shift {
    0%   { background-position: 0% 50%; }
    100% { background-position: 300% 50%; } /* travel full 300% width */
  }
</style>
</head>
<body>
  <div class="gradient-text">GRADIENT</div>
  <div class="sub">Animated gradient clipped to text</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט מלא בצבעי קשת שזורמים ומתנועעים בתוך האותיות — כאילו יש סרטון צבעוני שמנגן רק בתוך צורת האותיות. האפקט עובד עם רקע גרדיאנט שנחתך לצורת הטקסט, כך שרואים את הצבעים רק דרך האותיות. אנימציה פשוטה מזיזה את הצבעים כל הזמן כדי שייראה שהם זורמים.</p>`,proTipHe:"הוסיפו הרבה צבעים לגרדיאנט ושנו את המהירות כדי ליצור אפקט קשת בענן נעה.",promptHe:`אני רוצה ליצור אפקט טקסט גרדיאנט (Gradient Text) באתר שלי. צבעים שזורמים ומתנועעים בתוך האותיות כמו קשת נעה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה הצבעים לגרדיאנט?
3. מה גודל הפונט?
4. כמה מהירה תנועת הצבעים?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"glowpulse",title:"Glow Pulse",titleHe:"פולס זוהר",description:"Text glows and pulses with layered text-shadow animation for a neon breathing effect.",descriptionHe:"טקסט זוהר ופועם עם אנימציית text-shadow בשכבות ליצירת אפקט ניאון נושם.",categories:["text"],tags:[{label:"glow"},{label:"pulse"},{label:"neon"}],difficulty:"beginner",previewComponent:"glowpulse",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Glow Pulse</title>
<!-- Glow Pulse — Layered text-shadow creates pulsing neon glow -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .glow-text {
    font-size: 4rem; font-weight: 900; color: #fff;
    animation: glow-pulse 2s ease-in-out infinite alternate;
  }
  @keyframes glow-pulse {
    0% {
      text-shadow:
        0 0 4px rgba(108,99,255,0.5),    /* tight glow */
        0 0 11px rgba(108,99,255,0.3),   /* medium spread */
        0 0 19px rgba(108,99,255,0.15);  /* wide ambient */
    }
    100% {
      text-shadow:
        0 0 8px rgba(108,99,255,0.8),    /* intensified tight */
        0 0 25px rgba(108,99,255,0.5),   /* intensified medium */
        0 0 46px rgba(108,99,255,0.3),   /* intensified wide */
        0 0 80px rgba(108,99,255,0.15);  /* extra ambient ring */
    }
  }
  .sub-glow {
    font-size: 1rem; color: #666; margin-top: 1rem; text-align: center;
    animation: glow-sub 2s ease-in-out infinite alternate;
  }
  @keyframes glow-sub {
    0% { text-shadow: 0 0 4px rgba(236,72,153,0.3); }
    100% { text-shadow: 0 0 20px rgba(236,72,153,0.4); }
  }
</style>
</head>
<body>
  <div style="text-align:center">
    <div class="glow-text">GLOW</div>
    <div class="sub-glow">Pulsing neon text shadow</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט זוהר כמו שלט ניאון ו"נושם" — הזוהר מתחזק ונחלש בלולאה אינסופית. התחושה היא של שלט ניאון שפועם באור. האפקט נעשה עם כמה שכבות של צל סביב הטקסט ברדיוסים שונים, ואנימציה שמשנה את העוצמה שלהם הלוך וחזור.</p>`,proTipHe:"שלבו מספר צבעים בשכבות text-shadow שונות (למשל כחול וורוד) ליצירת זוהר ניאון דו-גוני.",promptHe:`אני רוצה ליצור אפקט פולס זוהר (Glow Pulse) באתר שלי. טקסט שזוהר כמו שלט ניאון ופועם באור לסירוגין.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה צבע הזוהר?
3. מה גודל הפונט?
4. כמה חזק הזוהר ומה מהירות הפעימה?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"textmask",title:"Text Mask",titleHe:"מסכת טקסט",description:"A video or animated gradient plays inside text letters using mix-blend-mode masking.",descriptionHe:"וידאו או גרדיאנט מונפש מופעל בתוך אותיות טקסט באמצעות מיסוך mix-blend-mode.",categories:["text"],tags:[{label:"mask"},{label:"blend"},{label:"video"}],difficulty:"advanced",previewComponent:"textmask",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Mask</title>
<!-- Text Mask — Animated gradient visible only inside text via mix-blend-mode -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #000; font-family: sans-serif;
  }
  .mask-container {
    position: relative; width: 600px; height: 200px;
    overflow: hidden;
    background: #000; /* must be black for multiply blend */
  }
  .gradient-bg {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg, #6c63ff, #ec4899, #06b6d4, #a855f7
    );
    background-size: 400% 400%;
    animation: gradient-move 6s ease infinite;
    z-index: 1;
  }
  @keyframes gradient-move {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .mask-text {
    position: absolute; inset: 0; z-index: 2;
    display: flex; align-items: center; justify-content: center;
    font-size: 7rem; font-weight: 900;
    color: #000;                    /* black text */
    background: #000;               /* black fill around text */
    mix-blend-mode: multiply;       /* black stays, text reveals gradient */
    letter-spacing: 6px;
    user-select: none;
  }
  /* Blend explanation:
     multiply: black * anything = black (hides gradient)
               white * anything = that color (but we use knockout text)
     Since text is black on black bg, the text area shows the gradient underneath. */
</style>
</head>
<body>
  <div class="mask-container">
    <div class="gradient-bg"></div>
    <div class="mask-text">MASK</div>
  </div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>גרדיאנט צבעוני נע ומשתנה כל הזמן, אבל אפשר לראות אותו רק דרך צורת האותיות — כאילו הטקסט הוא חלון שדרכו רואים את הצבעים. הטריק הוא שכבה שחורה עם הטקסט שמונחת מעל הגרדיאנט, ומצב ערבוב מיוחד שגורם לאזור הטקסט להיות שקוף ולחשוף את מה שמתחת.</p>`,proTipHe:"החליפו את הגרדיאנט בוידאו עם autoplay ו-loop לקבלת אפקט מרהיב של וידאו בתוך טקסט.",promptHe:`אני רוצה ליצור אפקט מסכת טקסט (Text Mask) באתר שלי. גרדיאנט צבעוני או וידאו שנראה רק דרך צורת האותיות.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה הצבעים לגרדיאנט (או האם להשתמש בוידאו)?
3. מה גודל הפונט?
4. מה מהירות תנועת הצבעים?
5. מה גודל האזור שמציג את האפקט?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"bounceletters",title:"Bounce Letters",titleHe:"אותיות קופצות",description:"Letters bounce in sequence with spring physics feel using cubic-bezier easing.",descriptionHe:"אותיות קופצות ברצף עם תחושת פיזיקת קפיץ באמצעות עקומת cubic-bezier.",categories:["text"],tags:[{label:"bounce"},{label:"spring"},{label:"sequence"}],difficulty:"beginner",previewComponent:"bounceletters",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bounce Letters</title>
<!-- Bounce Letters — Each letter drops in with spring-like bounce -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .bounce-container { display: flex; }
  .bounce-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block; opacity: 0;
    animation: bounce-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  .bounce-char.space { width: 18px; }
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: translateY(-80px) scale(0.6); /* start above */
    }
    60% {
      opacity: 1;
      transform: translateY(8px) scale(1.05);  /* overshoot below */
    }
    80% {
      transform: translateY(-4px) scale(0.98);  /* small rebound */
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);        /* settle */
    }
  }
  .replay-btn {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    padding: 10px 28px; background: rgba(108,99,255,0.15);
    border: 1px solid rgba(108,99,255,0.4); border-radius: 8px;
    color: #fff; cursor: pointer; font-size: 0.9rem;
  }
</style>
</head>
<body>
  <div class="bounce-container" id="container"></div>
  <button class="replay-btn" id="replay">Replay</button>
  <script>
    const text = 'BOUNCE';
    const container = document.getElementById('container');

    function render() {
      container.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'bounce-char' + (ch === ' ' ? ' space' : '');
        span.textContent = ch === ' ' ? '' : ch;
        span.style.animationDelay = (i * 0.08) + 's'; /* 80ms stagger */
        container.appendChild(span);
      });
    }

    render();
    document.getElementById('replay').addEventListener('click', render);
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל אות נופלת מלמעלה ונוחתת במקומה עם קפיצה קטנה, כמו כדור שנופל על הרצפה וקופץ פעם-פעמיים לפני שמתייצב. כל אות מגיעה רגע אחרי הקודמת, מה שיוצר אפקט גל עליז של קפיצות. הכל נעשה עם אנימציית CSS שכוללת נפילה, חריגה קלה מעבר למיקום, קפיצה קטנה חזרה, והתייצבות.</p>`,proTipHe:"שחקו עם ערכי ה-cubic-bezier — ערך Y מעל 1 יוצר overshoot חזק יותר.",promptHe:`אני רוצה ליצור אפקט אותיות קופצות (Bounce Letters) באתר שלי. כל אות נופלת מלמעלה ונוחתת עם קפיצה כמו קפיץ.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה גודל הפונט והצבע?
3. מה צבע הרקע?
4. כמה חזקה הקפיצה?
5. האם להוסיף כפתור Replay?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"rotatewords",title:"Rotate Words",titleHe:"מילים מסתובבות",description:"One word rotates out on X axis while the next word rotates in — a 3D word carousel.",descriptionHe:"מילה אחת מסתובבת החוצה על ציר X בזמן שהבאה מסתובבת פנימה — קרוסלת מילים תלת-ממדית.",categories:["text"],tags:[{label:"rotate"},{label:"3D"},{label:"carousel"}],difficulty:"intermediate",previewComponent:"rotatewords",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Rotate Words</title>
<!-- Rotate Words — Words rotate in/out on X axis like a vertical carousel -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif; color: #fff;
  }
  .rotate-container {
    text-align: center;
    font-size: 2.5rem; font-weight: 700;
  }
  .rotate-slot {
    display: inline-block; position: relative;
    height: 1.4em; overflow: hidden;
    perspective: 400px; /* 3D depth */
    vertical-align: bottom;
    min-width: 220px;
  }
  .rotate-word {
    display: block; color: #6c63ff;
    transform-origin: center bottom;
    position: absolute; width: 100%;
    top: 0; left: 0;
    animation: rotate-in 0.6s ease forwards;
  }
  .rotate-word.exiting {
    animation: rotate-out 0.6s ease forwards;
  }
  @keyframes rotate-in {
    from { transform: rotateX(-80deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }
  @keyframes rotate-out {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(80deg);  opacity: 0; }
  }
</style>
</head>
<body>
  <div class="rotate-container">
    <div>Think</div>
    <div class="rotate-slot" id="slot"></div>
  </div>
  <script>
    const words = ['different', 'creative', 'bigger', 'forward', 'boldly'];
    const slot = document.getElementById('slot');
    let idx = 0;

    function next() {
      const prev = slot.querySelector('.rotate-word:not(.exiting)');
      if (prev) {
        prev.classList.add('exiting');
        setTimeout(() => prev.remove(), 600);
      }
      const el = document.createElement('span');
      el.className = 'rotate-word';
      el.textContent = words[idx];
      slot.appendChild(el);
      idx = (idx + 1) % words.length;
    }

    next();
    setInterval(next, 2500); /* rotate every 2.5s */
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>מילה מסתובבת ונעלמת למעלה, ומילה חדשה מגיעה מלמטה ומסתובבת למקומה — כמו קרוסלה אנכית של מילים. מושלם לסלוגנים כמו "חשבו אחרת / גדול / קדימה". האפקט עובד עם אנימציית CSS שמסובבת את המילה על הציר האופקי עם תחושה תלת-ממדית, ו-JavaScript שמחליף מילים כל כמה שניות.</p>`,proTipHe:"שנו את transform-origin ל-center top כדי שהמילה תסתובב לכיוון ההפוך — למטה במקום למעלה.",promptHe:`אני רוצה ליצור אפקט מילים מסתובבות (Rotate Words) באתר שלי. מילים שמתחלפות באנימציית סיבוב תלת-ממדית כמו קרוסלה אנכית.

לפני שתיצור את הקוד, תשאל אותי:
1. מה המשפט הקבוע?
2. מה רשימת המילים שמסתובבות?
3. מה גודל הפונט והצבעים?
4. כמה זמן כל מילה מוצגת?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"textfillhover",title:"Text Fill Hover",titleHe:"מילוי טקסט hover",description:"Outlined text fills with color on hover using a sliding background-clip technique.",descriptionHe:"טקסט מקווקו מתמלא בצבע בריחוף באמצעות טכניקת background-clip נגללת.",categories:["text"],tags:[{label:"fill"},{label:"hover"},{label:"outline"}],difficulty:"intermediate",previewComponent:"textfillhover",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Fill Hover</title>
<!-- Text Fill Hover — Outlined text fills with color on hover via clip -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 2rem;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .fill-text {
    font-size: 4rem; font-weight: 900;
    color: transparent;
    -webkit-text-stroke: 2px rgba(255,255,255,0.4); /* outline */
    position: relative; cursor: pointer;
    display: inline-block;
  }
  .fill-text::after {
    content: attr(data-text);
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
    color: #6c63ff;
    -webkit-text-stroke: 0;
    clip-path: inset(0 100% 0 0);   /* hidden: clip from right */
    transition: clip-path 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .fill-text:hover::after {
    clip-path: inset(0 0 0 0);       /* fully visible */
  }
  .label { color: #555; font-size: 0.85rem; }
</style>
</head>
<body>
  <span class="fill-text" data-text="HOVER ME">HOVER ME</span>
  <span class="fill-text" data-text="FILL EFFECT">FILL EFFECT</span>
  <div class="label">Hover over the text</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט מוצג רק כקו מתאר ריק, וכשמעבירים את העכבר מעליו הוא מתמלא בצבע בהדרגה משמאל לימין — כמו שמישהו צובע את האותיות בזמן אמת. האפקט עובד עם שתי שכבות — אחת עם קו מתאר בלבד, ומעליה עותק צבעוני שמוסתר ונחשף בהדרגה בריחוף.</p>`,proTipHe:"שנו את כיוון ה-clip-path (למשל inset(100% 0 0 0)) כדי שהמילוי יגיע מלמעלה למטה.",promptHe:`אני רוצה ליצור אפקט מילוי טקסט בריחוף (Text Fill Hover) באתר שלי. טקסט עם קו מתאר בלבד שמתמלא בצבע כשמעבירים עליו את העכבר.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט?
2. מה צבע קו המתאר ומה צבע המילוי?
3. מה גודל הפונט?
4. מאיזה כיוון המילוי מגיע (שמאל, ימין, למעלה, למטה)?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"textflicker",title:"Text Flicker",titleHe:"טקסט מהבהב",description:"Random flicker and noise on text like an old CRT monitor with glitch artifacts.",descriptionHe:"הבהוב ורעש אקראי על טקסט כמו מסך CRT ישן עם ארטיפקטים של תקלה.",categories:["text"],tags:[{label:"flicker"},{label:"CRT"},{label:"retro"}],difficulty:"intermediate",previewComponent:"textflicker",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Flicker</title>
<!-- Text Flicker — CRT-style random opacity flicker on text -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .flicker-text {
    font-size: 3.5rem; font-weight: 700; color: #fff;
    text-shadow: 0 0 8px rgba(108,99,255,0.6);
    animation: flicker 0.15s infinite; /* fast flicker cycle */
  }
  @keyframes flicker {
    0%  { opacity: 1; }
    5%  { opacity: 0.85; }
    10% { opacity: 1; }
    15% { opacity: 0.4;  text-shadow: 0 0 12px rgba(108,99,255,0.8); }
    20% { opacity: 1; }
    50% { opacity: 1; }
    55% { opacity: 0.7; }
    60% { opacity: 1; }
    80% { opacity: 0.9; }
    85% { opacity: 0.3;  transform: translateX(2px); } /* slight jitter */
    90% { opacity: 1;    transform: translateX(0); }
    100%{ opacity: 1; }
  }
  .scanlines {
    position: fixed; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 2px,
      rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px
    );
    z-index: 10;
  }
  .vignette {
    position: fixed; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6));
    z-index: 9;
  }
</style>
</head>
<body>
  <div class="scanlines"></div>
  <div class="vignette"></div>
  <div class="flicker-text">SIGNAL LOST</div>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>הטקסט מהבהב ורועד כמו שלט ניאון ישן שמאבד חשמל, או כמו מסך טלוויזיה ישנה עם תקלות. יש גם קווים אופקיים דקים שרצים על המסך וכהייה בפינות — בדיוק כמו מסכי CRT מפעם. האפקט נעשה עם אנימציית CSS מהירה מאוד שמשנה את רמת השקיפות של הטקסט בערכים לא-סדירים, ושכבות נוספות שמדמות קווי סריקה.</p>`,proTipHe:"האטו את האנימציה (0.5s במקום 0.15s) לאפקט הבהוב עדין יותר שמתאים לשילוב עם טקסט רגיל.",promptHe:`אני רוצה ליצור אפקט טקסט מהבהב (Text Flicker) באתר שלי. טקסט שמהבהב כמו שלט ניאון ישן או מסך CRT עם קווי סריקה.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה צבע הטקסט והזוהר?
3. מה גודל הפונט?
4. כמה חזק ההבהוב?
5. האם להוסיף קווי סריקה וכהייה בפינות?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"typingcursor",title:"Typing Cursor",titleHe:"קורסור הקלדה",description:"Multi-line typing effect with blinking cursor that types, erases, and moves to next line.",descriptionHe:"אפקט הקלדה רב-שורתי עם קורסור מהבהב שמקליד, מוחק ועובר לשורה הבאה.",categories:["text"],tags:[{label:"typing"},{label:"cursor"},{label:"terminal"}],difficulty:"beginner",previewComponent:"typingcursor",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Typing Cursor</title>
<!-- Typing Cursor — Multi-line JS typing with blinking caret -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: 'Courier New', monospace;
  }
  .terminal {
    background: #111; border-radius: 12px; padding: 24px 32px;
    min-width: 420px; border: 1px solid #222;
  }
  .terminal-bar {
    display: flex; gap: 8px; margin-bottom: 16px;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot-r { background: #ff5f56; }
  .dot-y { background: #ffbd2e; }
  .dot-g { background: #27c93f; }
  #output {
    color: #0f0; font-size: 1rem; line-height: 1.7;
    min-height: 80px;
  }
  .cursor {
    display: inline-block; width: 8px; height: 1.1em;
    background: #0f0; vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink {
    50% { opacity: 0; }
  }
</style>
</head>
<body>
  <div class="terminal">
    <div class="terminal-bar">
      <div class="dot dot-r"></div>
      <div class="dot dot-y"></div>
      <div class="dot dot-g"></div>
    </div>
    <div id="output"><span class="cursor"></span></div>
  </div>
  <script>
    const lines = [
      '$ npm install effects-lab',
      '> Installing dependencies...',
      '> Build successful!',
      '$ echo "Ready to go!"',
    ];
    const output = document.getElementById('output');
    let lineIdx = 0, charIdx = 0;

    function type() {
      if (lineIdx >= lines.length) { lineIdx = 0; output.innerHTML = ''; }
      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        /* rebuild all completed lines + current partial line + cursor */
        const prev = lines.slice(0, lineIdx).join('<br/>');
        const curr = line.slice(0, charIdx);
        output.innerHTML = (prev ? prev + '<br/>' : '') + curr + '<span class="cursor"></span>';
        charIdx++;
        setTimeout(type, 50); /* 50ms per character */
      } else {
        charIdx = 0;
        lineIdx++;
        setTimeout(type, 800); /* 800ms pause between lines */
      }
    }
    type();
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>טקסט נכתב על המסך אות אחרי אות כאילו מישהו מקליד אותו בזמן אמת, עם קורסור מהבהב בסוף. כשהשורה נגמרת, יש הפסקה קצרה ואז מתחילה שורה חדשה — בדיוק כמו בחלון טרמינל. הכל נעשה עם JavaScript שמוסיף תו אחד כל 50 אלפיות שנייה, וקורסור CSS שמהבהב כל שנייה.</p>`,proTipHe:"הוסיפו צבעים שונים לכל שורה (למשל ירוק לפלט, לבן לפקודות) לתחושת טרמינל אותנטית.",promptHe:`אני רוצה ליצור אפקט קורסור הקלדה (Typing Cursor) באתר שלי. טקסט שנכתב אות אחרי אות עם קורסור מהבהב כמו בטרמינל.

לפני שתיצור את הקוד, תשאל אותי:
1. מה השורות שאני רוצה שייכתבו?
2. מה מהירות ההקלדה?
3. מה צבע הטקסט והרקע?
4. האם לעטוף את זה בעיצוב של חלון טרמינל?
5. מה גודל הפונט?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"textwave3d",title:"Text Wave 3D",titleHe:"גל טקסט 3D",description:"Text letters rotate on X axis in a wave sequence with perspective for a 3D ribbon effect.",descriptionHe:"אותיות טקסט מסתובבות על ציר X בגל רצוף עם פרספקטיבה ליצירת אפקט סרט תלת-ממדי.",categories:["text"],tags:[{label:"3D"},{label:"wave"},{label:"perspective"}],difficulty:"advanced",previewComponent:"textwave3d",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Wave 3D</title>
<!-- Text Wave 3D — Letters rotate on X axis in a wave with perspective -->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a; font-family: sans-serif;
  }
  .wave3d-container {
    display: flex;
    perspective: 500px; /* 3D depth for all children */
  }
  .wave3d-char {
    font-size: 4rem; font-weight: 900; color: #fff;
    display: inline-block;
    transform-style: preserve-3d;
    animation: wave3d 2s ease-in-out infinite;
  }
  @keyframes wave3d {
    0%, 100% {
      transform: rotateX(0deg);
      color: #fff;
    }
    25% {
      transform: rotateX(40deg);  /* tilt forward */
      color: #6c63ff;
    }
    50% {
      transform: rotateX(0deg);
    }
    75% {
      transform: rotateX(-40deg); /* tilt backward */
      color: #ec4899;
    }
  }
</style>
</head>
<body>
  <div class="wave3d-container" id="wave3d"></div>
  <script>
    const text = '3D WAVE';
    const container = document.getElementById('wave3d');
    text.split('').forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'wave3d-char';
      if (ch === ' ') {
        span.style.width = '20px'; /* visible space width */
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = ch;
      }
      span.style.animationDelay = (i * 0.12) + 's'; /* 120ms stagger */
      container.appendChild(span);
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>כל אות בטקסט מתקפלת קדימה ואחורה בתנועה תלת-ממדית, וכיוון שכל אות מגיבה רגע אחרי הקודמת, נוצר גל תלת-ממדי שעובר לאורך הטקסט — כמו גל בים. בזמן הקיפול הצבע גם משתנה, מה שמוסיף לאפקט הויזואלי. הכל נעשה עם CSS ופרספקטיבה שנותנת תחושת עומק אמיתית.</p>`,proTipHe:"הוסיפו text-shadow שמשתנה עם הסיבוב כדי לדמות תאורה תלת-ממדית אמיתית.",promptHe:`אני רוצה ליצור אפקט גל טקסט תלת-ממדי (Text Wave 3D) באתר שלי. אותיות שמתקפלות קדימה ואחורה בגל תלת-ממדי.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה גודל הפונט?
3. מה הצבעים (צבע רגיל + צבעים בזמן הסיבוב)?
4. כמה מהיר הגל?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`},{id:"textpressure",title:"Text Pressure",titleHe:"לחץ טקסט",description:"Variable font weight changes dynamically based on cursor distance from each letter.",descriptionHe:"משקל הפונט המשתנה נשלט דינמית לפי מרחק הסמן מכל אות.",categories:["text"],tags:[{label:"variable-font"},{label:"cursor"},{label:"interactive"}],difficulty:"advanced",previewComponent:"textpressure",codeTabs:[{label:"מלא",language:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Text Pressure</title>
<!-- Text Pressure — Font weight reacts to cursor proximity per letter -->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; background: #0a0a0a;
    font-family: 'Inter', sans-serif;
  }
  .pressure-container { display: flex; flex-wrap: wrap; justify-content: center; }
  .pressure-char {
    font-size: 4rem;
    color: #fff;
    display: inline-block;
    transition: font-weight 0.15s ease, color 0.15s ease;
    font-weight: 100; /* minimum weight */
    line-height: 1.1;
  }
  .pressure-char.space { width: 20px; }
  .label {
    position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%);
    color: #555; font-size: 0.85rem;
  }
</style>
</head>
<body>
  <div class="pressure-container" id="container"></div>
  <div class="label">Move your cursor near the text</div>
  <script>
    const text = 'PRESSURE';
    const container = document.getElementById('container');
    const spans = [];
    const maxDist = 150; /* px — influence radius */

    text.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'pressure-char' + (ch === ' ' ? ' space' : '');
      span.textContent = ch === ' ' ? '' : ch;
      container.appendChild(span);
      spans.push(span);
    });

    document.addEventListener('mousemove', (e) => {
      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
        const ratio = Math.max(0, 1 - dist / maxDist); /* 0..1 */
        const weight = Math.round(100 + ratio * 800);   /* 100..900 */
        span.style.fontWeight = weight;
        /* color shifts from white to accent as weight increases */
        const r = Math.round(255 - ratio * 147); /* 255→108 */
        const g = Math.round(255 - ratio * 156); /* 255→99 */
        const b = Math.round(255 - ratio * 0);   /* stays 255 */
        span.style.color = \`rgb(\${r},\${g},\${b})\`;
      });
    });
  </script>
</body>
</html>`}],explanationHe:`<p><strong>מה קורה פה?</strong></p><p>האותיות "מרגישות" את העכבר — כשמקרבים אותו לאות מסוימת, היא נהיית עבה יותר ומשנה צבע. ככל שהעכבר רחוק יותר, האות דקה ורגילה. זה יוצר אפקט כאילו לוחצים על הטקסט. האפקט עובד עם JavaScript שמחשב את המרחק בין העכבר לכל אות ומשנה את עובי הפונט בהתאם, בשילוב עם פונט משתנה שתומך בכל העוביים.</p>`,proTipHe:"נסו להוסיף font-variation-settings כדי לשלוט גם ברוחב ובנטייה של הפונט לפי מרחק הסמן.",promptHe:`אני רוצה ליצור אפקט לחץ טקסט (Text Pressure) באתר שלי. אותיות שמגיבות לעכבר ומשנות עובי לפי המרחק ממנו.

לפני שתיצור את הקוד, תשאל אותי:
1. מה הטקסט שאני רוצה?
2. מה גודל הפונט?
3. מה צבע הטקסט הרגיל ומה הצבע כשהעכבר קרוב?
4. מה רדיוס ההשפעה של העכבר?
5. מה צבע הרקע?

אחרי שאענה, תייצר לי את הקוד המלא (HTML + CSS + JavaScript) מוכן להדבקה.`}],r=[{id:"text",label:"טקסט",tagline:"כל מה שצריך כדי שהטקסט באתר שלך יהיה חי ונושם",order:1},{id:"button",label:"כפתורים",tagline:"כפתורים שהמשתמשים שלך לא יפסיקו ללחוץ עליהם",order:2},{id:"card",label:"כרטיסים",tagline:"כרטיסים שגורמים למשתמש לרצות לגעת במסך",order:3},{id:"scroll",label:"גלילה",tagline:"הפוך את הגלילה לחוויה, לא לדרך",order:4},{id:"background",label:"רקעים",tagline:"רקעים שהופכים כל דף למשהו שאי אפשר לעזוב",order:5},{id:"media",label:"מדיה",tagline:"תמונות ווידאו שזזים, נחשפים ומפתיעים",order:6},{id:"cursor",label:"עכבר",tagline:"הפוך את העכבר לחלק מהעיצוב",order:7},{id:"loader",label:"טעינה",tagline:"גם ההמתנה יכולה להיות יפה",order:8},{id:"hover",label:"hover",tagline:"אינטראקציות ריחוף שנותנות חיים לממשק",order:9},{id:"interaction",label:"אינטראקציה",tagline:"אינטראקציות שהופכות את הממשק לחוויה",order:10}];var o=e.i(44203);function s(){let e,n,r,o=(0,i.c)(4),[s,l]=(0,a.useState)(0);o[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=()=>{let e=window.scrollY,t=document.documentElement.scrollHeight-window.innerHeight;l(t>0?e/t*100:0)};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},n=[],o[0]=e,o[1]=n):(e=o[0],n=o[1]),(0,a.useEffect)(e,n);let d=`${s}%`;return o[2]!==d?(r=(0,t.jsx)("div",{className:"fixed top-0 left-0 z-[60] h-[2px]",style:{width:d,background:"linear-gradient(90deg, var(--accent), var(--accent2))",transition:"width 0.1s linear"}}),o[2]=d,o[3]=r):r=o[3],r}var l=e.i(67173);function d(){let e,o,s,d,p,g,h,m,b=(0,i.c)(9),[f,u]=(0,a.useState)("all");if(b[0]===Symbol.for("react.memo_cache_sentinel")){for(let t of(e={},r))e[t.id]=n.filter(e=>e.categories.includes(t.id)).length;e.all=n.length,b[0]=e}else e=b[0];let v=e;b[1]===Symbol.for("react.memo_cache_sentinel")?(o=()=>{let e=r.map(c),t=new Map,i=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&u(t.target.id)},{threshold:.3}),a=function(){for(let a of e){let e=document.getElementById(a);if(!e||t.get(a)===e)continue;let n=t.get(a);n&&i.unobserve(n),i.observe(e),t.set(a,e)}};a();let n=new MutationObserver(()=>{t.size<e.length&&a()});n.observe(document.body,{childList:!0,subtree:!0});let o=document.getElementById("featured");if(o){let e=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&u("all")},{threshold:.3});return e.observe(o),()=>{i.disconnect(),e.disconnect(),n.disconnect()}}return()=>{i.disconnect(),n.disconnect()}},s=[],b[1]=o,b[2]=s):(o=b[1],s=b[2]),(0,a.useEffect)(o,s),b[3]===Symbol.for("react.memo_cache_sentinel")?(d=[{id:"all",label:"הכל",count:v.all},...r.map(e=>({id:e.id,label:e.label,count:v[e.id]??0}))],b[3]=d):d=b[3];let x=d;return b[4]===Symbol.for("react.memo_cache_sentinel")?(p={top:64,background:"rgba(5, 5, 5, 0.8)",borderBottom:"1px solid var(--border)"},b[4]=p):p=b[4],b[5]===Symbol.for("react.memo_cache_sentinel")?(g={maxWidth:1360,margin:"0 auto",padding:"16px 24px",scrollbarWidth:"none",msOverflowStyle:"none",direction:"rtl"},h=(0,t.jsx)("style",{children:"\n          .filter-scroll::-webkit-scrollbar {\n            display: none;\n          }\n        "}),b[5]=g,b[6]=h):(g=b[5],h=b[6]),b[7]!==f?(m=(0,t.jsx)("div",{className:"sticky z-40 backdrop-blur-xl",style:p,children:(0,t.jsxs)("div",{className:"filter-scroll flex items-center gap-3 overflow-x-auto",style:g,children:[h,x.map(e=>{let i=f===e.id;return(0,t.jsxs)(l.motion.button,{onClick:()=>(function(e){let t="all"===e?r[0].id:e;document.getElementById(t)?.scrollIntoView({behavior:"smooth"})})(e.id),whileTap:{scale:.95},style:{position:"relative",border:"none",borderRadius:8,padding:"8px 18px",color:i?"#000":"var(--muted)",background:i?"var(--accent)":"rgba(255, 255, 255, 0.05)",fontFamily:"'Heebo', sans-serif",fontSize:14,fontWeight:i?700:500,cursor:"pointer",outline:"none",whiteSpace:"nowrap",transition:"all 0.2s ease",boxShadow:i?"0 0 20px var(--glow)":"none"},onMouseEnter:e=>{if(!i){let t=e.currentTarget;t.style.background="rgba(255, 255, 255, 0.1)",t.style.color="var(--text)"}},onMouseLeave:e=>{if(!i){let t=e.currentTarget;t.style.background="rgba(255, 255, 255, 0.05)",t.style.color="var(--muted)"}},children:[e.label,(0,t.jsx)("span",{style:{marginRight:6,fontSize:12,opacity:i?.7:.5},children:e.count})]},e.id)})]})}),b[7]=f,b[8]=m):m=b[8],m}function c(e){return e.id}let p={parallax:(0,a.lazy)(()=>e.A(21930)),glitch:(0,a.lazy)(()=>e.A(48792)),magnetic:(0,a.lazy)(()=>e.A(37558)),aurora:(0,a.lazy)(()=>e.A(13101)),noise:(0,a.lazy)(()=>e.A(9110)),reveal:(0,a.lazy)(()=>e.A(7493)),spotlight:(0,a.lazy)(()=>e.A(10379)),typewriter:(0,a.lazy)(()=>e.A(63123)),liquid:(0,a.lazy)(()=>e.A(39854)),scrollring:(0,a.lazy)(()=>e.A(93271)),trail:(0,a.lazy)(()=>e.A(52349)),glass:(0,a.lazy)(()=>e.A(2587)),marquee:(0,a.lazy)(()=>e.A(57811)),morphtext:(0,a.lazy)(()=>e.A(36776)),tilt:(0,a.lazy)(()=>e.A(48295)),neontext:(0,a.lazy)(()=>e.A(65703)),particlesbg:(0,a.lazy)(()=>e.A(5823)),gradientborder:(0,a.lazy)(()=>e.A(66e3)),countup:(0,a.lazy)(()=>e.A(40011)),splitscroll:(0,a.lazy)(()=>e.A(22258)),scrollvideo:(0,a.lazy)(()=>e.A(94008)),customcursor:(0,a.lazy)(()=>e.A(46256)),cursorblob:(0,a.lazy)(()=>e.A(95647)),magneticfield:(0,a.lazy)(()=>e.A(93014)),cursorlens:(0,a.lazy)(()=>e.A(83259)),cursortrailcolor:(0,a.lazy)(()=>e.A(71373)),followeyes:(0,a.lazy)(()=>e.A(69272)),skeletonloader:(0,a.lazy)(()=>e.A(12684)),pagereveal:(0,a.lazy)(()=>e.A(26005)),morphloader:(0,a.lazy)(()=>e.A(29050)),dotsloader:(0,a.lazy)(()=>e.A(59560)),progressbar:(0,a.lazy)(()=>e.A(10506)),countdowntimer:(0,a.lazy)(()=>e.A(92984)),numberticket:(0,a.lazy)(()=>e.A(38218)),liquidloader:(0,a.lazy)(()=>e.A(88753)),imageparallax:(0,a.lazy)(()=>e.A(91976)),imageclip:(0,a.lazy)(()=>e.A(49215)),beforeafter:(0,a.lazy)(()=>e.A(20511)),imagestack:(0,a.lazy)(()=>e.A(16707)),distortimage:(0,a.lazy)(()=>e.A(11274)),imagegallery:(0,a.lazy)(()=>e.A(21695)),lightbox:(0,a.lazy)(()=>e.A(54669)),ripplebutton:(0,a.lazy)(()=>e.A(82725)),borderbeam:(0,a.lazy)(()=>e.A(12918)),shinybutton:(0,a.lazy)(()=>e.A(17958)),splitbutton:(0,a.lazy)(()=>e.A(46863)),morphbutton:(0,a.lazy)(()=>e.A(27729)),glitchbutton:(0,a.lazy)(()=>e.A(83265)),elasticbutton:(0,a.lazy)(()=>e.A(37140)),confettibutton:(0,a.lazy)(()=>e.A(57349)),successbutton:(0,a.lazy)(()=>e.A(46676)),hoverreveal:(0,a.lazy)(()=>e.A(89788)),tooltipfancy:(0,a.lazy)(()=>e.A(46215)),toggleswitch:(0,a.lazy)(()=>e.A(58545)),inputfloat:(0,a.lazy)(()=>e.A(35617)),draggable:(0,a.lazy)(()=>e.A(52848)),stackedcards:(0,a.lazy)(()=>e.A(31340)),flipcard:(0,a.lazy)(()=>e.A(12016)),expandcard:(0,a.lazy)(()=>e.A(33267)),hovercard3d:(0,a.lazy)(()=>e.A(29003)),imagezoom:(0,a.lazy)(()=>e.A(38805)),revealcard:(0,a.lazy)(()=>e.A(96963)),skeletoncard:(0,a.lazy)(()=>e.A(90719)),glowbordercard:(0,a.lazy)(()=>e.A(67854)),stackscroll:(0,a.lazy)(()=>e.A(4901)),carouselsnap:(0,a.lazy)(()=>e.A(76302)),accordionsmooth:(0,a.lazy)(()=>e.A(92412)),pricingcard:(0,a.lazy)(()=>e.A(37192)),horizontalscroll:(0,a.lazy)(()=>e.A(89797)),stickyheader:(0,a.lazy)(()=>e.A(96223)),revealonscrool:(0,a.lazy)(()=>e.A(89285)),parallaximage:(0,a.lazy)(()=>e.A(33153)),pinnedsection:(0,a.lazy)(()=>e.A(34522)),scrollprogress:(0,a.lazy)(()=>e.A(52719)),scrolltrigger:(0,a.lazy)(()=>e.A(78357)),infinitescroll:(0,a.lazy)(()=>e.A(40601)),stickycolumn:(0,a.lazy)(()=>e.A(6302)),scrollcolor:(0,a.lazy)(()=>e.A(37460)),scrollzoom:(0,a.lazy)(()=>e.A(59222)),depthscroll:(0,a.lazy)(()=>e.A(1455)),meshgradient:(0,a.lazy)(()=>e.A(47923)),wavesbg:(0,a.lazy)(()=>e.A(51136)),gridlines:(0,a.lazy)(()=>e.A(84592)),dotmatrix:(0,a.lazy)(()=>e.A(66624)),cloudbg:(0,a.lazy)(()=>e.A(72945)),raindrop:(0,a.lazy)(()=>e.A(43114)),fireeffect:(0,a.lazy)(()=>e.A(47948)),holographic:(0,a.lazy)(()=>e.A(74101)),constellations:(0,a.lazy)(()=>e.A(32189)),liquidbg:(0,a.lazy)(()=>e.A(91646)),scanlines:(0,a.lazy)(()=>e.A(35915)),pixelate:(0,a.lazy)(()=>e.A(39355)),scrambletext:(0,a.lazy)(()=>e.A(42596)),splitchar:(0,a.lazy)(()=>e.A(68312)),stroketext:(0,a.lazy)(()=>e.A(96132)),blurreveal:(0,a.lazy)(()=>e.A(43795)),wavytext:(0,a.lazy)(()=>e.A(26987)),highlighttext:(0,a.lazy)(()=>e.A(54205)),flipword:(0,a.lazy)(()=>e.A(95943)),stackedtext:(0,a.lazy)(()=>e.A(3120)),gradienttext:(0,a.lazy)(()=>e.A(31028)),glowpulse:(0,a.lazy)(()=>e.A(53197)),textmask:(0,a.lazy)(()=>e.A(88845)),bounceletters:(0,a.lazy)(()=>e.A(29995)),rotatewords:(0,a.lazy)(()=>e.A(95672)),textfillhover:(0,a.lazy)(()=>e.A(96301)),textflicker:(0,a.lazy)(()=>e.A(93830)),typingcursor:(0,a.lazy)(()=>e.A(20973)),textwave3d:(0,a.lazy)(()=>e.A(52835)),textpressure:(0,a.lazy)(()=>e.A(37042))},g=(...e)=>e.filter((e,t,i)=>!!e&&""!==e.trim()&&i.indexOf(e)===t).join(" ").trim(),h=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,i)=>i?i.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)};var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let b=(0,a.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:r="",children:o,iconNode:s,...l},d)=>(0,a.createElement)("svg",{ref:d,...m,width:t,height:t,stroke:e,strokeWidth:n?24*Number(i)/Number(t):i,className:g("lucide",r),...!o&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(l)&&{"aria-hidden":"true"},...l},[...s.map(([e,t])=>(0,a.createElement)(e,t)),...Array.isArray(o)?o:[o]])),f=(e,t)=>{let i=(0,a.forwardRef)(({className:i,...n},r)=>(0,a.createElement)(b,{ref:r,iconNode:t,className:g(`lucide-${h(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,i),...n}));return i.displayName=h(e),i},u=f("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]),v=f("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);function x(e){let t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.top="0",t.style.left="0",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select();try{return document.execCommand("copy"),!0}finally{document.body.removeChild(t)}}function y(e){let n,r,o,s,l=(0,i.c)(14),{code:d,onCopy:c}=e,[p,g]=(0,a.useState)(!1);l[0]!==d||l[1]!==c?(n=e=>{e.stopPropagation(),x(d),g(!0),c?.(),setTimeout(()=>g(!1),2e3)},l[0]=d,l[1]=c,l[2]=n):n=l[2];let h=n,m=p?"rgba(200,245,59,0.2)":"rgba(0,0,0,0.7)",b=`1px solid ${p?"var(--accent)":"var(--border)"}`,f=p?"var(--accent)":"var(--text)";l[3]!==m||l[4]!==b||l[5]!==f?(r={background:m,border:b,color:f,fontFamily:"'Space Mono', monospace",backdropFilter:"blur(8px)",cursor:"pointer"},l[3]=m,l[4]=b,l[5]=f,l[6]=r):r=l[6],l[7]!==p?(o=p?(0,t.jsx)(v,{size:12}):(0,t.jsx)(u,{size:12}),l[7]=p,l[8]=o):o=l[8];let y=p?"הועתק":"העתק";return l[9]!==h||l[10]!==r||l[11]!==o||l[12]!==y?(s=(0,t.jsxs)("button",{onClick:h,className:"absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200",style:r,children:[o,y]}),l[9]=h,l[10]=r,l[11]=o,l[12]=y,l[13]=s):s=l[13],s}var w=e.i(28906);function k(e){let a,n,r,o=(0,i.c)(5),{height:s}=e;return o[0]!==s?(a={height:s,background:"var(--surface)",display:"flex",alignItems:"center",justifyContent:"center"},o[0]=s,o[1]=a):a=o[1],o[2]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsx)("div",{style:{width:"50%",height:10,borderRadius:5,background:"linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 75%)",backgroundSize:"200% 100%",animation:"preview-shimmer 1.5s ease-in-out infinite"}}),o[2]=n):n=o[2],o[3]!==a?(r=(0,t.jsx)("div",{className:"w-full",style:a,children:n}),o[3]=a,o[4]=r):r=o[4],r}function S(e){let n,r,o,s,l,d,c,p=(0,i.c)(18),{component:g,height:h,margin:m}=e,b=void 0===m?"200px":m,f=(0,a.useRef)(null),[u,v]=(0,a.useState)("idle");p[0]!==b?(n=()=>{let e=f.current;if(!e)return;let t=new IntersectionObserver(e=>{let[t]=e;v(e=>t.isIntersecting?"idle"===e?"visible":e:"idle")},{rootMargin:b,threshold:.05});return t.observe(e),()=>t.disconnect()},r=[b],p[0]=b,p[1]=n,p[2]=r):(n=p[1],r=p[2]),(0,a.useEffect)(n,r),p[3]===Symbol.for("react.memo_cache_sentinel")?(o=()=>{v(H)},p[3]=o):o=p[3];let x=o;p[4]===Symbol.for("react.memo_cache_sentinel")?(s=()=>{v(T)},p[4]=s):s=p[4];let y=s;if(!g){let e;return p[5]!==h?(e=(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center",style:{height:h,background:"var(--bg)",color:"var(--muted)",fontFamily:"'Space Mono', monospace",fontSize:14},children:"Preview"}),p[5]=h,p[6]=e):e=p[6],e}let S="idle"!==u;return p[7]!==h?(l={height:h,width:"100%"},p[7]=h,p[8]=l):l=p[8],p[9]!==g||p[10]!==h||p[11]!==S||p[12]!==u?(d=S?(0,t.jsx)(w.PreviewStateContext.Provider,{value:u,children:(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)(k,{height:h}),children:(0,t.jsx)(g,{})})}):(0,t.jsx)(k,{height:h}),p[9]=g,p[10]=h,p[11]=S,p[12]=u,p[13]=d):d=p[13],p[14]!==u||p[15]!==l||p[16]!==d?(c=(0,t.jsx)("div",{ref:f,"data-preview-state":u,onMouseEnter:x,onMouseLeave:y,style:l,children:d}),p[14]=u,p[15]=l,p[16]=d,p[17]=c):c=p[17],c}function T(e){return"active"===e?"visible":e}function H(e){return"idle"!==e?"active":e}let C=[{color:"#ff5f57",shadow:"#ff5f5766"},{color:"#febc2e",shadow:"#febc2e66"},{color:"#28c840",shadow:"#28c84066"}],E={beginner:{bg:"#dcfce7",text:"#166534",label:"קל"},intermediate:{bg:"#fef9c3",text:"#854d0e",label:"בינוני"},advanced:{bg:"#fee2e2",text:"#991b1b",label:"מתקדם"}};function z(e){let n,r,o,s,l,d,c,g,h,m,b,f,u,v,x,w,k,T,H,z,A,_,j,I,R,O,B,F,P,D,N,Y,U,X=(0,i.c)(67),{effect:q,onSelect:G,onCopy:W}=e,$=p[q.previewComponent],[J,V]=(0,a.useState)(!1);X[0]!==q.difficulty?(n=E[q.difficulty]??{bg:"#f3f4f6",text:"#374151",label:q.difficulty},X[0]=q.difficulty,X[1]=n):n=X[1];let Z=n;X[2]===Symbol.for("react.memo_cache_sentinel")?(r=()=>V(!0),o=()=>V(!1),X[2]=r,X[3]=o):(r=X[2],o=X[3]),X[4]!==q||X[5]!==G?(s=()=>G(q),X[4]=q,X[5]=G,X[6]=s):s=X[6];let K=J?"0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)":"0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03)",Q=J?"translateY(-5px) scale(1.015)":"translateY(0) scale(1)";X[7]!==K||X[8]!==Q?(l={borderRadius:12,overflow:"hidden",background:"#ffffff",boxShadow:K,transform:Q,transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",cursor:"pointer"},X[7]=K,X[8]=Q,X[9]=l):l=X[9],X[10]===Symbol.for("react.memo_cache_sentinel")?(d={background:"#f0f0f0",borderBottom:"1px solid #e2e2e2",padding:"9px 12px",display:"flex",alignItems:"center",gap:10,userSelect:"none"},c={display:"flex",gap:6,flexShrink:0},X[10]=d,X[11]=c):(d=X[10],c=X[11]),X[12]!==J?(g=C.map((e,i)=>(0,t.jsx)("div",{style:{width:11,height:11,borderRadius:"50%",background:J?e.color:"#d0d0d0",boxShadow:J?`0 0 6px ${e.shadow}`:"none",transition:"background 0.25s, box-shadow 0.25s"}},i)),X[12]=J,X[13]=g):g=X[13],X[14]!==g?(h=(0,t.jsx)("div",{style:c,children:g}),X[14]=g,X[15]=h):h=X[15],X[16]===Symbol.for("react.memo_cache_sentinel")?(m={flex:1,background:"#ffffff",border:"1px solid #d8d8d8",borderRadius:5,padding:"3px 8px",fontSize:11,fontFamily:"'Space Mono', monospace",color:"#555",display:"flex",alignItems:"center",gap:4,overflow:"hidden",whiteSpace:"nowrap",minWidth:0},b=(0,t.jsx)("span",{style:{color:"#22c55e",fontSize:9,flexShrink:0},children:"🔒"}),f=(0,t.jsx)("span",{style:{color:"#aaa",flexShrink:0},children:"effectslab.dev/"}),u={color:"#222",fontWeight:700,overflow:"hidden",textOverflow:"ellipsis"},X[16]=m,X[17]=b,X[18]=f,X[19]=u):(m=X[16],b=X[17],f=X[18],u=X[19]),X[20]!==q.id?(v=(0,t.jsxs)("div",{style:m,children:[b,f,(0,t.jsx)("span",{style:u,children:q.id})]}),X[20]=q.id,X[21]=v):v=X[21],X[22]!==Z.bg||X[23]!==Z.text?(x={fontSize:10,padding:"2px 8px",borderRadius:20,background:Z.bg,color:Z.text,fontFamily:"'Heebo', sans-serif",fontWeight:700,flexShrink:0,whiteSpace:"nowrap"},X[22]=Z.bg,X[23]=Z.text,X[24]=x):x=X[24],X[25]!==Z.label||X[26]!==x?(w=(0,t.jsx)("span",{style:x,children:Z.label}),X[25]=Z.label,X[26]=x,X[27]=w):w=X[27],X[28]!==h||X[29]!==v||X[30]!==w?(k=(0,t.jsxs)("div",{style:d,children:[h,v,w]}),X[28]=h,X[29]=v,X[30]=w,X[31]=k):k=X[31],X[32]===Symbol.for("react.memo_cache_sentinel")?(T={height:200,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},X[32]=T):T=X[32],X[33]!==$?(H=(0,t.jsx)(S,{component:$,height:200}),X[33]=$,X[34]=H):H=X[34];let ee=q.codeTabs[0]?.code??"";return X[35]!==W||X[36]!==ee?(z=(0,t.jsx)(y,{code:ee,onCopy:W}),X[35]=W,X[36]=ee,X[37]=z):z=X[37],X[38]!==H||X[39]!==z?(A=(0,t.jsxs)("div",{style:T,children:[H,z]}),X[38]=H,X[39]=z,X[40]=A):A=X[40],X[41]===Symbol.for("react.memo_cache_sentinel")?(_={background:"#fafafa",borderTop:"1px solid #ebebeb",padding:"10px 13px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},j={fontFamily:"'Heebo', sans-serif",fontSize:14,fontWeight:700,color:"#111111",direction:"rtl",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},X[41]=_,X[42]=j):(_=X[41],j=X[42]),X[43]!==q.titleHe?(I=(0,t.jsx)("span",{style:j,children:q.titleHe}),X[43]=q.titleHe,X[44]=I):I=X[44],X[45]===Symbol.for("react.memo_cache_sentinel")?(R={display:"flex",gap:6,alignItems:"center",flexShrink:0},O={fontSize:10,padding:"2px 8px",borderRadius:4,background:"#f3f4f6",border:"1px solid #e5e7eb",color:"#6b7280",fontFamily:"'Space Mono', monospace",whiteSpace:"nowrap"},X[45]=R,X[46]=O):(R=X[45],O=X[46]),X[47]!==q.categories[0]?(B=(0,t.jsx)("span",{style:O,children:q.categories[0]}),X[47]=q.categories[0],X[48]=B):B=X[48],X[49]!==q||X[50]!==G?(F=e=>{e.stopPropagation(),G(q)},X[49]=q,X[50]=G,X[51]=F):F=X[51],X[52]===Symbol.for("react.memo_cache_sentinel")?(P={fontSize:11,padding:"4px 10px",borderRadius:5,background:"#111",color:"#c8f53b",border:"none",cursor:"pointer",fontFamily:"'Space Mono', monospace",fontWeight:700,letterSpacing:"0.02em",transition:"background 0.15s"},X[52]=P):P=X[52],X[53]!==F?(D=(0,t.jsx)("button",{onClick:F,style:P,onMouseEnter:L,onMouseLeave:M,children:"</>"}),X[53]=F,X[54]=D):D=X[54],X[55]!==B||X[56]!==D?(N=(0,t.jsxs)("div",{style:R,children:[B,D]}),X[55]=B,X[56]=D,X[57]=N):N=X[57],X[58]!==I||X[59]!==N?(Y=(0,t.jsxs)("div",{style:_,children:[I,N]}),X[58]=I,X[59]=N,X[60]=Y):Y=X[60],X[61]!==k||X[62]!==A||X[63]!==Y||X[64]!==s||X[65]!==l?(U=(0,t.jsxs)("div",{onMouseEnter:r,onMouseLeave:o,onClick:s,style:l,children:[k,A,Y]}),X[61]=k,X[62]=A,X[63]=Y,X[64]=s,X[65]=l,X[66]=U):U=X[66],U}function M(e){e.currentTarget.style.background="#111"}function L(e){e.currentTarget.style.background="#000"}function A(e){let a,n,r,o,s,d,c,p,g,h,m,b,f,u,v,x,y,w=(0,i.c)(31),{id:k,label:S,tagline:T,count:H,effects:C,onSelect:E}=e;if(w[0]===Symbol.for("react.memo_cache_sentinel")?(a={maxWidth:1360,margin:"0 auto",padding:"40px 24px"},w[0]=a):a=w[0],w[1]===Symbol.for("react.memo_cache_sentinel")?(n={opacity:0,x:30},r={opacity:1,x:0},o={once:!0,margin:"-50px"},s={display:"flex",justifyContent:"space-between",alignItems:"center",direction:"rtl"},d={fontFamily:"Heebo, sans-serif",fontWeight:700,fontSize:24,color:"var(--text)",margin:0},w[1]=n,w[2]=r,w[3]=o,w[4]=s,w[5]=d):(n=w[1],r=w[2],o=w[3],s=w[4],d=w[5]),w[6]!==S?(c=(0,t.jsxs)("h2",{style:d,children:["◈ ",S]}),w[6]=S,w[7]=c):c=w[7],w[8]===Symbol.for("react.memo_cache_sentinel")?(p={fontFamily:"'Space Mono', monospace",fontSize:13,color:"var(--muted)"},w[8]=p):p=w[8],w[9]!==H?(g=(0,t.jsxs)("span",{style:p,children:[H," אפקטים"]}),w[9]=H,w[10]=g):g=w[10],w[11]!==c||w[12]!==g?(h=(0,t.jsxs)(l.motion.div,{initial:n,whileInView:r,viewport:o,style:s,children:[c,g]}),w[11]=c,w[12]=g,w[13]=h):h=w[13],w[14]===Symbol.for("react.memo_cache_sentinel")?(m={fontFamily:"Heebo, sans-serif",fontSize:16,color:"var(--muted)",marginTop:8,marginBottom:24,direction:"rtl"},w[14]=m):m=w[14],w[15]!==T?(b=(0,t.jsx)("p",{style:m,children:T}),w[15]=T,w[16]=b):b=w[16],w[17]===Symbol.for("react.memo_cache_sentinel")?(f={display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(290px, 1fr))",gap:20},w[17]=f):f=w[17],w[18]!==C||w[19]!==E){let e;w[21]!==E?(e=e=>(0,t.jsx)(z,{effect:e,onSelect:E},e.id),w[21]=E,w[22]=e):e=w[22],u=C.map(e),w[18]=C,w[19]=E,w[20]=u}else u=w[20];return w[23]!==u?(v=(0,t.jsx)("div",{style:f,children:u}),w[23]=u,w[24]=v):v=w[24],w[25]===Symbol.for("react.memo_cache_sentinel")?(x=(0,t.jsx)(l.motion.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!0,margin:"-50px"},style:{height:1,width:"60%",margin:"48px auto 0",background:"linear-gradient(90deg, var(--accent) 0%, transparent 100%)",opacity:.3,originX:1}}),w[25]=x):x=w[25],w[26]!==k||w[27]!==h||w[28]!==b||w[29]!==v?(y=(0,t.jsxs)("section",{id:k,style:a,children:[h,b,v,x]}),w[26]=k,w[27]=h,w[28]=b,w[29]=v,w[30]=y):y=w[30],y}function _(e){let n,r,o,s,l=(0,i.c)(11),{children:d,id:c,height:p,margin:g}=e,h=void 0===p?600:p,m=void 0===g?"400px":g,b=(0,a.useRef)(null),[f,u]=(0,a.useState)(!1);if(l[0]!==m||l[1]!==f?(n=()=>{let e=b.current;if(!e||f)return;let t=new IntersectionObserver(e=>{let[i]=e;i.isIntersecting&&(u(!0),t.disconnect())},{rootMargin:m});return t.observe(e),()=>t.disconnect()},r=[f,m],l[0]=m,l[1]=f,l[2]=n,l[3]=r):(n=l[2],r=l[3]),(0,a.useEffect)(n,r),f){let e;return l[4]!==d?(e=(0,t.jsx)(t.Fragment,{children:d}),l[4]=d,l[5]=e):e=l[5],e}return l[6]!==h?(o={minHeight:h,background:"transparent"},l[6]=h,l[7]=o):o=l[7],l[8]!==c||l[9]!==o?(s=(0,t.jsx)("div",{ref:b,id:c,style:o}),l[8]=c,l[9]=o,l[10]=s):s=l[10],s}var j=e.i(10722),I=e.i(3938);function R(e){let n,r,o,s,d,c,g,h,m,b,f,u=(0,i.c)(19),{effects:v}=e,x=(0,I.useReducedMotion)();u[0]!==v.length?(n=()=>Math.floor(Math.random()*v.length),u[0]=v.length,u[1]=n):n=u[1];let[y,w]=(0,a.useState)(n);u[2]!==v.length||u[3]!==x?(r=()=>{if(x||v.length<=1)return;let e=setInterval(()=>{w(e=>(e+1)%v.length)},5e3);return()=>clearInterval(e)},o=[x,v.length],u[2]=v.length,u[3]=x,u[4]=r,u[5]=o):(r=u[4],o=u[5]),(0,a.useEffect)(r,o);let k=v[y];if(!k)return null;let S=p[k.previewComponent];return u[6]===Symbol.for("react.memo_cache_sentinel")?(s={maxWidth:800,margin:"0 auto",padding:"80px 24px",textAlign:"center"},d=(0,t.jsx)("div",{style:{width:"60%",height:1,margin:"0 auto 48px",background:"linear-gradient(90deg, var(--accent) 0%, transparent 100%)",opacity:.3}}),c=(0,t.jsx)("h2",{style:{fontSize:32,fontWeight:"bold",fontFamily:"'Heebo', sans-serif",color:"#fff",marginBottom:32},children:"מה, עדיין לא העתקת כלום?"}),g={width:300,height:200,margin:"0 auto 32px",borderRadius:12,border:"1px solid var(--border)",background:"var(--surface)",overflow:"hidden",position:"relative"},u[6]=s,u[7]=d,u[8]=c,u[9]=g):(s=u[6],d=u[7],c=u[8],g=u[9]),u[10]!==S||u[11]!==k.id||u[12]!==x?(h=x?S?(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"animate-pulse",style:{background:"var(--surface)",height:"100%"}}),children:(0,t.jsx)(S,{})}):null:(0,t.jsx)(j.AnimatePresence,{mode:"wait",children:(0,t.jsx)(l.motion.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.4},style:{width:"100%",height:"100%"},children:S?(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{className:"animate-pulse",style:{background:"var(--surface)",height:"100%"}}),children:(0,t.jsx)(S,{})}):null},k.id)}),u[10]=S,u[11]=k.id,u[12]=x,u[13]=h):h=u[13],u[14]!==h?(m=(0,t.jsx)("div",{style:g,children:h}),u[14]=h,u[15]=m):m=u[15],u[16]===Symbol.for("react.memo_cache_sentinel")?(b=(0,t.jsx)("button",{onClick:F,className:"rounded-full",style:{paddingInline:32,paddingBlock:12,background:"var(--accent)",color:"#111",fontFamily:"'Heebo', sans-serif",fontSize:16,fontWeight:"bold",border:"none",cursor:"pointer",transition:"filter 0.2s ease"},onMouseEnter:B,onMouseLeave:O,children:"בחר אפקט והתחל"}),u[16]=b):b=u[16],u[17]!==m?(f=(0,t.jsxs)("section",{style:s,children:[d,c,m,b]}),u[17]=m,u[18]=f):f=u[18],f}function O(e){e.currentTarget.style.filter="brightness(1)"}function B(e){e.currentTarget.style.filter="brightness(1.15)"}function F(){let e=document.getElementById("featured");e&&e.scrollIntoView({behavior:"smooth"})}var P=e.i(3216);let D=f("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),N=f("sparkles",[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]]),Y=e.i(49932).default,U=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","optgroup","option","p","picture","q","quote","samp","section","select","source","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video","defs","g","marker","mask","pattern","svg","switch","symbol","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feFlood","feGaussianBlur","feImage","feMerge","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence","linearGradient","radialGradient","stop","circle","ellipse","image","line","path","polygon","polyline","rect","text","use","textPath","tspan","foreignObject","clipPath"],X=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"].sort().reverse(),q=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"].sort().reverse(),G=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"].sort().reverse(),W=["accent-color","align-content","align-items","align-self","alignment-baseline","all","anchor-name","animation","animation-composition","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-range","animation-range-end","animation-range-start","animation-timeline","animation-timing-function","appearance","aspect-ratio","backdrop-filter","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-position-x","background-position-y","background-repeat","background-size","baseline-shift","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-end-end-radius","border-end-start-radius","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-start-end-radius","border-start-start-radius","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-align","box-decoration-break","box-direction","box-flex","box-flex-group","box-lines","box-ordinal-group","box-orient","box-pack","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","color-scheme","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","contain-intrinsic-block-size","contain-intrinsic-height","contain-intrinsic-inline-size","contain-intrinsic-size","contain-intrinsic-width","container","container-name","container-type","content","content-visibility","counter-increment","counter-reset","counter-set","cue","cue-after","cue-before","cursor","cx","cy","direction","display","dominant-baseline","empty-cells","enable-background","field-sizing","fill","fill-opacity","fill-rule","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flood-color","flood-opacity","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-optical-sizing","font-palette","font-size","font-size-adjust","font-smooth","font-smoothing","font-stretch","font-style","font-synthesis","font-synthesis-position","font-synthesis-small-caps","font-synthesis-style","font-synthesis-weight","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-emoji","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","forced-color-adjust","gap","glyph-orientation-horizontal","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphenate-character","hyphenate-limit-chars","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","initial-letter","initial-letter-align","inline-size","inset","inset-area","inset-block","inset-block-end","inset-block-start","inset-inline","inset-inline-end","inset-inline-start","isolation","justify-content","justify-items","justify-self","kerning","left","letter-spacing","lighting-color","line-break","line-height","line-height-step","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","margin-trim","marker","marker-end","marker-mid","marker-start","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","masonry-auto-flow","math-depth","math-shift","math-style","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","offset","offset-anchor","offset-distance","offset-path","offset-position","offset-rotate","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-anchor","overflow-block","overflow-clip-margin","overflow-inline","overflow-wrap","overflow-x","overflow-y","overlay","overscroll-behavior","overscroll-behavior-block","overscroll-behavior-inline","overscroll-behavior-x","overscroll-behavior-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","paint-order","pause","pause-after","pause-before","perspective","perspective-origin","place-content","place-items","place-self","pointer-events","position","position-anchor","position-visibility","print-color-adjust","quotes","r","resize","rest","rest-after","rest-before","right","rotate","row-gap","ruby-align","ruby-position","scale","scroll-behavior","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scroll-timeline","scroll-timeline-axis","scroll-timeline-name","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","shape-rendering","speak","speak-as","src","stop-color","stop-opacity","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tab-size","table-layout","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-skip-ink","text-decoration-style","text-decoration-thickness","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-offset","text-underline-position","text-wrap","text-wrap-mode","text-wrap-style","timeline-scope","top","touch-action","transform","transform-box","transform-origin","transform-style","transition","transition-behavior","transition-delay","transition-duration","transition-property","transition-timing-function","translate","unicode-bidi","user-modify","user-select","vector-effect","vertical-align","view-timeline","view-timeline-axis","view-timeline-inset","view-timeline-name","view-transition-name","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","white-space-collapse","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","x","y","z-index","zoom"].sort().reverse(),$="[A-Za-z$_][0-9A-Za-z$_]*",J=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],V=["true","false","null","undefined","NaN","Infinity"],Z=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],K=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],Q=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ee=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],et=[].concat(Q,Z,K);function ei(e){var t;let i=e.regex,a=/<[A-Za-z0-9\\._:-]+/,n=/\/[A-Za-z0-9\\._:-]+>|\/>/,r={$pattern:$,keyword:J,literal:V,built_in:et,"variable.language":ee},o="[0-9](_?[0-9])*",s=`\\.(${o})`,l="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${l})((${s})|\\.)?|(${s}))[eE][+-]?(${o})\\b`},{begin:`\\b(${l})\\b((${s})\\b|\\.)?|(${s})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},c={className:"subst",begin:"\\$\\{",end:"\\}",keywords:r,contains:[]},p={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"xml"}},g={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"css"}},h={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,c],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,c]},b={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:$+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},f=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,g,h,m,{match:/\$\d+/},d];c.contains=f.concat({begin:/\{/,end:/\}/,keywords:r,contains:["self"].concat(f)});let u=[].concat(b,c.contains),v=u.concat([{begin:/(\s*)\(/,end:/\)/,keywords:r,contains:["self"].concat(u)}]),x={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:v},y={variants:[{match:[/class/,/\s+/,$,/\s+/,/extends/,/\s+/,i.concat($,"(",i.concat(/\./,$),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,$],scope:{1:"keyword",3:"title.class"}}]},w={relevance:0,match:i.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Z,...K]}},k={match:i.concat(/\b/,(t=[...Q,"super","import"].map(e=>`${e}\\s*\\(`),i.concat("(?!",t.join("|"),")")),$,i.lookahead(/\s*\(/)),className:"title.function",relevance:0},S={begin:i.concat(/\./,i.lookahead(i.concat($,/(?![0-9A-Za-z$_(])/))),end:$,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",H={match:[/const|var|let/,/\s+/,$,/\s*/,/=\s*/,/(async\s*)?/,i.lookahead(T)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[x]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:r,exports:{PARAMS_CONTAINS:v,CLASS_REFERENCE:w},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,p,g,h,m,b,{match:/\$\d+/},d,w,{scope:"attr",match:$+i.lookahead(":"),relevance:0},H,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[b,e.REGEXP_MODE,{className:"function",begin:T,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:r,contains:v}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:a,"on:begin":(e,t)=>{let i,a=e[0].length+e.index,n=e.input[a];if("<"===n||","===n)return void t.ignoreMatch();">"!==n||((e,{after:t})=>{let i="</"+e[0].slice(1);return -1!==e.input.indexOf(i,t)})(e,{after:a})||t.ignoreMatch();let r=e.input.substring(a);if((i=r.match(/^\s*=/))||(i=r.match(/^\s+extends\s+/))&&0===i.index)return void t.ignoreMatch()},end:n}],subLanguage:"xml",contains:[{begin:a,end:n,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,$,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[x],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[x,e.inherit(e.TITLE_MODE,{begin:$,className:"title.function"})]},{match:/\.\.\./,relevance:0},S,{match:"\\$"+$,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[x]},k,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},y,{match:[/get|set/,/\s+/,$,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},x]},{match:/\$[(.]/}]}}let ea="[A-Za-z$_][0-9A-Za-z$_]*",en=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],er=["true","false","null","undefined","NaN","Infinity"],eo=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],es=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],el=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],ed=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ec=[].concat(el,eo,es);function ep(e){var t;let i,a,n,r,o,s,l,d,c,p,g,h,m,b,f,u,v,x,y,w,k,S,T,H,C,E=e.regex,z=(i=e.regex,a=/<[A-Za-z0-9\\._:-]+/,n=/\/[A-Za-z0-9\\._:-]+>|\/>/,r=(e,t)=>{let i,a=e[0].length+e.index,n=e.input[a];if("<"===n||","===n)return void t.ignoreMatch();">"!==n||((e,{after:t})=>{let i="</"+e[0].slice(1);return -1!==e.input.indexOf(i,t)})(e,{after:a})||t.ignoreMatch();let r=e.input.substring(a);if((i=r.match(/^\s*=/))||(i=r.match(/^\s+extends\s+/))&&0===i.index)return void t.ignoreMatch()},o={$pattern:ea,keyword:en,literal:er,built_in:ec,"variable.language":ed},s="[0-9](_?[0-9])*",l=`\\.(${s})`,d="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",c={className:"number",variants:[{begin:`(\\b(${d})((${l})|\\.)?|(${l}))[eE][+-]?(${s})\\b`},{begin:`\\b(${d})\\b((${l})\\b|\\.)?|(${l})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},p={className:"subst",begin:"\\$\\{",end:"\\}",keywords:o,contains:[]},g={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"xml"}},h={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"css"}},m={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,p],subLanguage:"graphql"}},b={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,p]},f={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:ea+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},p.contains=(u=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,m,b,{match:/\$\d+/},c]).concat({begin:/\{/,end:/\}/,keywords:o,contains:["self"].concat(u)}),x=(v=[].concat(f,p.contains)).concat([{begin:/(\s*)\(/,end:/\)/,keywords:o,contains:["self"].concat(v)}]),y={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:x},w={variants:[{match:[/class/,/\s+/,ea,/\s+/,/extends/,/\s+/,i.concat(ea,"(",i.concat(/\./,ea),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,ea],scope:{1:"keyword",3:"title.class"}}]},k={relevance:0,match:i.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...eo,...es]}},S={match:i.concat(/\b/,(t=[...el,"super","import"].map(e=>`${e}\\s*\\(`),i.concat("(?!",t.join("|"),")")),ea,i.lookahead(/\s*\(/)),className:"title.function",relevance:0},T={begin:i.concat(/\./,i.lookahead(i.concat(ea,/(?![0-9A-Za-z$_(])/))),end:ea,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},H="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",C={match:[/const|var|let/,/\s+/,ea,/\s*/,/=\s*/,/(async\s*)?/,i.lookahead(H)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[y]},{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:o,exports:{PARAMS_CONTAINS:x,CLASS_REFERENCE:k},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,g,h,m,b,f,{match:/\$\d+/},c,k,{scope:"attr",match:ea+i.lookahead(":"),relevance:0},C,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[f,e.REGEXP_MODE,{className:"function",begin:H,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:x}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:a,"on:begin":r,end:n}],subLanguage:"xml",contains:[{begin:a,end:n,skip:!0,contains:["self"]}]}]},{variants:[{match:[/function/,/\s+/,ea,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[y],illegal:/%/},{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[y,e.inherit(e.TITLE_MODE,{begin:ea,className:"title.function"})]},{match:/\.\.\./,relevance:0},T,{match:"\\$"+ea,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[y]},S,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},w,{match:[/get|set/,/\s+/,ea,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},y]},{match:/\$[(.]/}]}),M=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],L={begin:[/namespace/,/\s+/,e.IDENT_RE],beginScope:{1:"keyword",3:"title.class"}},A={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:M},contains:[z.exports.CLASS_REFERENCE]},_={$pattern:ea,keyword:en.concat(["type","interface","public","private","protected","implements","declare","abstract","readonly","enum","override","satisfies"]),literal:er,built_in:ec.concat(M),"variable.language":ed},j={className:"meta",begin:"@"+ea},I=(e,t,i)=>{let a=e.contains.findIndex(e=>e.label===t);if(-1===a)throw Error("can not find mode to replace");e.contains.splice(a,1,i)};Object.assign(z.keywords,_),z.exports.PARAMS_CONTAINS.push(j);let R=z.contains.find(e=>"attr"===e.scope),O=Object.assign({},R,{match:E.concat(ea,E.lookahead(/\s*\?:/))});return z.exports.PARAMS_CONTAINS.push([z.exports.CLASS_REFERENCE,R,O]),z.contains=z.contains.concat([j,L,A,O]),I(z,"shebang",e.SHEBANG()),I(z,"use_strict",{className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/}),z.contains.find(e=>"func.def"===e.label).relevance=0,Object.assign(z,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),z}function eg(e){let t=e.regex,i=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),a={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},n={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},r=e.inherit(n,{begin:/\(/,end:/\)/}),o=e.inherit(e.APOS_STRING_MODE,{className:"string"}),s=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[a]},{begin:/'/,end:/'/,contains:[a]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[n,s,o,r,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[n,r,s,o]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},a,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[s]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(i,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:i,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(i,/>/))),contains:[{className:"name",begin:i,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}Y.registerLanguage("css",function(e){let t=e.regex,i={IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}},a=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE];return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[i.BLOCK_COMMENT,{begin:/-(webkit|moz|ms|o)-(?=[a-z])/},i.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\.[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0},i.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+q.join("|")+")"},{begin:":(:)?("+G.join("|")+")"}]},i.CSS_VARIABLE,{className:"attribute",begin:"\\b("+W.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[i.BLOCK_COMMENT,i.HEXCOLOR,i.IMPORTANT,i.CSS_NUMBER_MODE,...a,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...a,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},i.FUNCTION_DISPATCH]},{begin:t.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:/@-?\w[\w]*(-\w+)*/},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:"and or not only",attribute:X.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...a,i.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+U.join("|")+")\\b"}]}}),Y.registerLanguage("javascript",ei),Y.registerLanguage("typescript",ep),Y.registerLanguage("html",eg),Y.registerLanguage("xml",eg),Y.registerLanguage("jsx",ei),Y.registerLanguage("tsx",ep);let eh={beginner:{color:"#4ade80",bg:"rgba(74, 222, 128, 0.1)",label:"קל"},intermediate:{color:"#facc15",bg:"rgba(250, 204, 21, 0.1)",label:"בינוני"},advanced:{color:"#f87171",bg:"rgba(248, 113, 113, 0.1)",label:"מתקדם"}},em=[{color:"#ff5f57"},{color:"#febc2e"},{color:"#28c840"}];function eb(e){let n,r,o,s,d,c,g,h,m,b,f,y=(0,i.c)(30),{effect:w,onClose:k,onCopy:S}=e,[T,H]=(0,a.useState)(0),[C,E]=(0,a.useState)(!1),z=(0,a.useRef)(null),[M,L]=(0,a.useState)(w?.id);M!==w?.id&&(L(w?.id),H(0),E(!1)),y[0]!==w||y[1]!==k?(n=()=>{if(!w)return;let e=e=>{"Escape"===e.key&&k()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},r=[w,k],y[0]=w,y[1]=k,y[2]=n,y[3]=r):(n=y[2],r=y[3]),(0,a.useEffect)(n,r),y[4]!==w?(o=()=>{if(!w)return;let e=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=e}},s=[w],y[4]=w,y[5]=o,y[6]=s):(o=y[5],s=y[6]),(0,a.useEffect)(o,s),y[7]!==w?(d=()=>{if(!w||!z.current)return;let e=z.current,t=t=>{if("Tab"!==t.key)return;let i=e.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(0===i.length)return;let a=i[0],n=i[i.length-1];t.shiftKey?document.activeElement===a&&(t.preventDefault(),n.focus()):document.activeElement===n&&(t.preventDefault(),a.focus())};document.addEventListener("keydown",t);let i=e.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');return i?.focus(),()=>document.removeEventListener("keydown",t)},c=[w],y[7]=w,y[8]=d,y[9]=c):(d=y[8],c=y[9]),(0,a.useEffect)(d,c),y[10]!==T||y[11]!==w||y[12]!==S?(g=async()=>{w&&(x(w.codeTabs[T]?.code??""),E(!0),S(),setTimeout(()=>E(!1),2e3))},y[10]=T,y[11]=w,y[12]=S,y[13]=g):g=y[13];let A=g;y[14]===Symbol.for("react.memo_cache_sentinel")?(h=function(e,t){let i=t.toLowerCase();return Y.getLanguage(i)?Y.highlight(e,{language:i}).value:Y.highlightAuto(e).value},y[14]=h):h=y[14];let _=h,I=w?.codeTabs[T];if(y[15]!==T||y[16]!==C||y[17]!==I||y[18]!==w||y[19]!==A||y[20]!==k){let e,i,n=I?.code.split("\n")??[];y[23]!==I?(e=I?_(I.code,I.language):"",y[23]=I,y[24]=e):e=y[24];let r=e;y[25]!==w?(i=w?eh[w.difficulty]??{color:"#9ca3af",bg:"rgba(156,163,175,0.1)",label:w.difficulty}:null,y[25]=w,y[26]=i):i=y[26];let o=i,s=w?p[w.previewComponent]:void 0;m=j.AnimatePresence,b=w&&(0,t.jsxs)(l.motion.div,{className:"fixed inset-0 z-50 flex items-center justify-center p-4",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},children:[(0,t.jsx)("style",{children:"\n            .codemodal-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }\n            .codemodal-scrollbar::-webkit-scrollbar-track { background: transparent; }\n            .codemodal-scrollbar::-webkit-scrollbar-thumb {\n              background: rgba(255,255,255,0.1);\n              border-radius: 3px;\n            }\n            .codemodal-scrollbar::-webkit-scrollbar-thumb:hover {\n              background: rgba(255,255,255,0.2);\n            }\n            .codemodal-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }\n\n            .codemodal-explanation h4 {\n              color: var(--accent);\n              margin-bottom: 8px;\n              font-family: 'Heebo', sans-serif;\n              font-weight: 700;\n              font-size: 15px;\n            }\n            .codemodal-explanation p {\n              color: rgba(255,255,255,0.7);\n              margin-bottom: 10px;\n              font-family: 'Heebo', sans-serif;\n              font-size: 13.5px;\n              line-height: 1.75;\n            }\n            .codemodal-explanation ul {\n              list-style: none;\n              padding: 0;\n              color: rgba(255,255,255,0.7);\n              font-family: 'Heebo', sans-serif;\n              font-size: 13.5px;\n              line-height: 1.75;\n            }\n            .codemodal-explanation li {\n              margin-bottom: 4px;\n              padding-right: 16px;\n              position: relative;\n            }\n            .codemodal-explanation li::before {\n              content: '';\n              position: absolute;\n              right: 0;\n              top: 10px;\n              width: 5px;\n              height: 5px;\n              border-radius: 50%;\n              background: var(--accent);\n              opacity: 0.6;\n            }\n            .codemodal-explanation code {\n              background: rgba(200, 245, 59, 0.08);\n              padding: 2px 7px;\n              border-radius: 4px;\n              font-family: 'Space Mono', monospace;\n              font-size: 11.5px;\n              color: var(--accent);\n              border: 1px solid rgba(200, 245, 59, 0.15);\n            }\n\n            @media (max-width: 900px) {\n              .codemodal-grid { grid-template-columns: 1fr !important; }\n              .codemodal-left { max-height: 300px !important; }\n            }\n          "}),(0,t.jsx)(l.motion.div,{className:"absolute inset-0 backdrop-blur-xl",style:{background:"rgba(0, 0, 0, 0.85)"},onClick:k,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0}}),(0,t.jsxs)(l.motion.div,{ref:z,className:"relative z-10 flex flex-col w-full overflow-hidden",style:{maxWidth:1200,maxHeight:"92vh",borderRadius:20,background:"#0c0c0c",border:"1px solid rgba(255, 255, 255, 0.08)",boxShadow:"0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(200, 245, 59, 0.03)"},initial:{scale:.92,opacity:0,y:20},animate:{scale:1,opacity:1,y:0},exit:{scale:.92,opacity:0,y:20},transition:{duration:.35,ease:[.16,1,.3,1]},onClick:ew,children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:"1px solid rgba(255, 255, 255, 0.06)",background:"rgba(255, 255, 255, 0.02)"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:14,direction:"rtl",minWidth:0},children:[(0,t.jsx)("h2",{style:{margin:0,fontSize:20,fontWeight:800,color:"#ffffff",fontFamily:"'Heebo', sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:w.titleHe}),o&&(0,t.jsx)("span",{style:{fontSize:11,padding:"3px 10px",borderRadius:20,background:o.bg,color:o.color,fontFamily:"'Heebo', sans-serif",fontWeight:700,border:`1px solid ${o.color}22`,whiteSpace:"nowrap",flexShrink:0},children:o.label}),(0,t.jsx)("span",{style:{fontSize:10,padding:"3px 8px",borderRadius:4,background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.4)",fontFamily:"'Space Mono', monospace",border:"1px solid rgba(255,255,255,0.06)",flexShrink:0},children:w.categories[0]})]}),(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,flexShrink:0},children:[(0,t.jsx)("button",{onClick:A,style:{display:"flex",alignItems:"center",gap:8,padding:"9px 20px",borderRadius:10,background:C?"rgba(200, 245, 59, 0.12)":"var(--accent)",color:C?"var(--accent)":"#000",border:C?"1px solid rgba(200,245,59,0.3)":"1px solid transparent",fontFamily:"'Heebo', sans-serif",fontWeight:700,fontSize:14,cursor:"pointer",transition:"all 0.2s ease",boxShadow:C?"none":"0 0 24px rgba(200, 245, 59, 0.2)"},onMouseEnter:e=>{C||(e.currentTarget.style.boxShadow="0 0 36px rgba(200,245,59,0.35)")},onMouseLeave:e=>{C||(e.currentTarget.style.boxShadow="0 0 24px rgba(200,245,59,0.2)")},children:C?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v,{size:15})," הועתק!"]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(u,{size:15})," העתק קוד"]})}),(0,t.jsx)("button",{onClick:k,style:{width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",cursor:"pointer",transition:"all 0.2s"},onMouseEnter:ey,onMouseLeave:ex,"aria-label":"סגור",children:(0,t.jsx)(D,{size:18})})]})]}),(0,t.jsxs)("div",{className:"codemodal-grid flex-1 overflow-hidden",style:{display:"grid",gridTemplateColumns:"380px 1fr",minHeight:0},children:[(0,t.jsxs)("div",{className:"codemodal-left codemodal-scrollbar",style:{borderRight:"1px solid rgba(255,255,255,0.06)",overflow:"auto",display:"flex",flexDirection:"column"},children:[(0,t.jsx)("div",{style:{padding:20,paddingBottom:0},children:(0,t.jsxs)("div",{style:{borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)",background:"#1a1a1a"},children:[(0,t.jsxs)("div",{style:{padding:"8px 12px",display:"flex",alignItems:"center",gap:8,background:"#1a1a1a",borderBottom:"1px solid rgba(255,255,255,0.06)"},children:[(0,t.jsx)("div",{style:{display:"flex",gap:5},children:em.map(ev)}),(0,t.jsxs)("div",{style:{flex:1,background:"rgba(255,255,255,0.05)",borderRadius:5,padding:"3px 8px",fontSize:10,fontFamily:"'Space Mono', monospace",color:"rgba(255,255,255,0.3)",display:"flex",alignItems:"center",gap:4},children:[(0,t.jsx)("span",{style:{fontSize:8,flexShrink:0},children:"🔒"}),(0,t.jsxs)("span",{children:["effecxio.dev/",w.id]})]})]}),(0,t.jsx)("div",{style:{height:220,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:s?(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{color:"rgba(255,255,255,0.2)",fontFamily:"'Space Mono', monospace",fontSize:12},children:"Loading..."}),children:(0,t.jsx)(s,{})}):(0,t.jsx)("div",{style:{color:"rgba(255,255,255,0.2)",fontFamily:"'Space Mono', monospace",fontSize:12},children:"Preview"})})]})}),(0,t.jsx)("div",{style:{padding:"16px 20px 0"},dir:"rtl",children:(0,t.jsx)("p",{style:{fontSize:13.5,lineHeight:1.75,color:"rgba(255,255,255,0.6)",fontFamily:"'Heebo', sans-serif",margin:0},children:w.descriptionHe})}),w.tags.length>0&&(0,t.jsx)("div",{style:{padding:"12px 20px 0",display:"flex",flexWrap:"wrap",gap:6,direction:"rtl"},children:w.tags.map(eu)}),(0,t.jsx)("div",{style:{margin:"16px 20px",height:1,background:"linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)"}}),(0,t.jsxs)("div",{style:{padding:"0 20px",direction:"rtl",flex:1},children:[(0,t.jsx)("div",{className:"codemodal-explanation",dangerouslySetInnerHTML:{__html:w.explanationHe}}),w.proTipHe&&(0,t.jsxs)("div",{style:{marginTop:14,padding:"12px 14px",borderRadius:10,background:"rgba(200, 245, 59, 0.04)",border:"1px solid rgba(200, 245, 59, 0.1)",display:"flex",gap:8,alignItems:"flex-start"},children:[(0,t.jsx)(N,{size:14,style:{color:"var(--accent)",flexShrink:0,marginTop:3}}),(0,t.jsx)("span",{style:{fontSize:12.5,lineHeight:1.7,color:"rgba(255,255,255,0.55)",fontFamily:"'Heebo', sans-serif"},children:w.proTipHe})]}),w.promptHe&&(0,t.jsxs)("div",{style:{marginTop:14,padding:"12px 14px",borderRadius:10,background:"rgba(168, 85, 247, 0.05)",border:"1px solid rgba(168, 85, 247, 0.12)"},children:[(0,t.jsx)("div",{style:{fontSize:11,fontWeight:700,color:"rgba(168, 85, 247, 0.7)",fontFamily:"'Heebo', sans-serif",marginBottom:6},children:"פרומפט ל-AI"}),(0,t.jsx)("p",{style:{fontSize:12,lineHeight:1.7,color:"rgba(255,255,255,0.45)",fontFamily:"'Heebo', sans-serif",margin:0},children:w.promptHe})]}),(0,t.jsx)("div",{style:{height:20}})]})]}),(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",minHeight:0},children:[(0,t.jsx)("div",{style:{display:"flex",alignItems:"center",gap:2,padding:"10px 16px",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.015)",overflowX:"auto",scrollbarWidth:"none"},children:w.codeTabs.map((e,i)=>(0,t.jsx)("button",{onClick:()=>{H(i),E(!1)},style:{padding:"6px 14px",borderRadius:8,fontSize:12,fontFamily:"'Space Mono', monospace",fontWeight:T===i?700:400,cursor:"pointer",border:"none",whiteSpace:"nowrap",transition:"all 0.15s",background:T===i?"rgba(200, 245, 59, 0.1)":"transparent",color:T===i?"var(--accent)":"rgba(255,255,255,0.35)"},onMouseEnter:e=>{T!==i&&(e.currentTarget.style.color="rgba(255,255,255,0.7)")},onMouseLeave:e=>{T!==i&&(e.currentTarget.style.color="rgba(255,255,255,0.35)")},children:e.label},e.label))}),(0,t.jsx)("div",{className:"codemodal-scrollbar",dir:"ltr",style:{flex:1,overflow:"auto",background:"#0a0a0a"},children:(0,t.jsxs)("div",{style:{padding:"20px 20px",display:"flex",minWidth:"fit-content"},children:[(0,t.jsx)("div",{style:{userSelect:"none",paddingRight:20,textAlign:"right",color:"rgba(255, 255, 255, 0.12)",fontFamily:"'Space Mono', monospace",fontSize:12.5,lineHeight:"1.75",minWidth:36},children:n.map(ef)}),(0,t.jsx)("div",{style:{width:1,background:"rgba(255,255,255,0.04)",marginRight:20,flexShrink:0}}),(0,t.jsx)("pre",{style:{margin:0,fontFamily:"'Space Mono', monospace",fontSize:12.5,lineHeight:"1.75",flex:1},children:(0,t.jsx)("code",{dangerouslySetInnerHTML:{__html:r},style:{color:"rgba(255,255,255,0.85)"}})})]})})]})]})]})]}),y[15]=T,y[16]=C,y[17]=I,y[18]=w,y[19]=A,y[20]=k,y[21]=m,y[22]=b}else m=y[21],b=y[22];return y[27]!==m||y[28]!==b?(f=(0,t.jsx)(m,{children:b}),y[27]=m,y[28]=b,y[29]=f):f=y[29],f}function ef(e,i){return(0,t.jsx)("div",{children:i+1},i)}function eu(e){return(0,t.jsxs)("span",{style:{fontSize:10,padding:"3px 9px",borderRadius:20,background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.35)",fontFamily:"'Space Mono', monospace",border:"1px solid rgba(255,255,255,0.06)"},children:["#",e.label]},e.label)}function ev(e,i){return(0,t.jsx)("div",{style:{width:9,height:9,borderRadius:"50%",background:e.color,opacity:.8}},i)}function ex(e){e.currentTarget.style.background="rgba(255,255,255,0.05)",e.currentTarget.style.color="rgba(255,255,255,0.4)"}function ey(e){e.currentTarget.style.background="rgba(255,255,255,0.1)",e.currentTarget.style.color="#fff"}function ew(e){return e.stopPropagation()}let ek=f("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]),eS=f("film",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M7 3v18",key:"bbkbws"}],["path",{d:"M3 7.5h4",key:"zfgn84"}],["path",{d:"M3 12h18",key:"1i2n21"}],["path",{d:"M3 16.5h4",key:"1230mu"}],["path",{d:"M17 3v18",key:"in4fa5"}],["path",{d:"M17 7.5h4",key:"myr1c1"}],["path",{d:"M17 16.5h4",key:"go4c1d"}]]),eT=f("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),eH=f("rotate-ccw",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]]);async function eC(e){return"requestVideoFrameCallback"in e?new Promise(t=>{let i=0,a=0,n=e.currentTime;e.muted=!0,e.currentTime=0;let r=(o,s)=>{0===i&&(a=s.mediaTime),i++;let l=s.mediaTime-a;if(l<.6)e.requestVideoFrameCallback(r);else{e.pause();let a=l>0?Math.round(i/l):24;e.currentTime=n,t(Math.max(1,a))}};e.requestVideoFrameCallback(r),e.play().catch(()=>t(24))}):24}let eE=`<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scroll Video — Effects Lab</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; }

    /* Total scroll distance = frames * 20px per frame + full viewport */
    .scroll-video-section {
      height: calc(var(--frame-count, 60) * 20px + 100dvh);
      position: relative;
    }
    @supports not (height: 100dvh) {
      .scroll-video-section {
        height: calc(var(--frame-count, 60) * 20px + 100vh);
      }
    }

    /* BUG FIX #1 — iOS Safari: 100dvh adjusts with address bar */
    .scroll-video-sticky {
      position: sticky;
      top: 0;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #000;
    }
    @supports not (height: 100dvh) {
      .scroll-video-sticky { height: 100vh; }
    }

    #scrollCanvas {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      display: block;
      will-change: contents;
    }

    .scroll-video-loader {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 3px;
      background: rgba(255,255,255,0.1);
    }
    .scroll-video-loader-fill {
      height: 100%;
      background: #c8f53b;
      width: 0%;
      transition: width 0.3s;
    }

    #scrollCanvas.loading { opacity: 0; }
    #scrollCanvas.ready { opacity: 1; transition: opacity 0.4s; }
  </style>
</head>
<body>
  <div class="scroll-video-section" id="scrollVideoSection">
    <div class="scroll-video-sticky">
      <canvas id="scrollCanvas" class="loading"></canvas>
      <div class="scroll-video-loader">
        <div class="scroll-video-loader-fill" id="loaderFill"></div>
      </div>
    </div>
  </div>

  <script>
  (function () {
    'use strict';

    var FRAME_URLS = [
      /* URLS_PLACEHOLDER */
    ];

    var TOTAL_FRAMES = FRAME_URLS.length;
    var canvas = document.getElementById('scrollCanvas');
    var ctx = canvas.getContext('2d');
    var section = document.getElementById('scrollVideoSection');
    var loaderFill = document.getElementById('loaderFill');
    var images = [];
    var currentFrame = 0;
    var ticking = false;
    var decodedCount = 0;

    /* BUG FIX #1 — dynamic viewport height for iOS Safari */
    function setVh() {
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
      section.style.setProperty('--frame-count', TOTAL_FRAMES);
    }
    setVh();
    /* Do NOT listen to resize — causes jumpy scroll on iOS when address bar hides */
    window.addEventListener('orientationchange', setVh);

    /* BUG FIX #6 — Preload with img.decode() for flicker-free canvas */
    function preloadAll() {
      images = FRAME_URLS.map(function (url) {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;
        return img;
      });

      var priority = images.slice(0, Math.min(10, TOTAL_FRAMES));
      Promise.all(priority.map(function (img) {
        return img.decode
          ? img.decode().catch(function () {})
          : new Promise(function (r) { img.onload = r; img.onerror = r; });
      })).then(function () {
        if (images[0] && images[0].naturalWidth) {
          canvas.width = images[0].naturalWidth;
          canvas.height = images[0].naturalHeight;
        }
        fitCanvasToContainer();
        ctx.drawImage(images[0], 0, 0);
        canvas.classList.remove('loading');
        canvas.classList.add('ready');
        loaderFill.style.width = '100%';

        images.slice(10).forEach(function (img) {
          if (img.decode) {
            img.decode().catch(function () {}).then(function () {
              decodedCount++;
              var pct = Math.round(10 + (decodedCount / Math.max(1, TOTAL_FRAMES - 10)) * 90);
              loaderFill.style.width = pct + '%';
            });
          }
        });
      });
    }

    /* BUG FIX #5 — Canvas CSS sizing for orientation change */
    function fitCanvasToContainer() {
      if (!canvas.width || !canvas.height) return;
      var maxW = window.innerWidth;
      var maxH = window.innerHeight;
      var ratio = canvas.width / canvas.height;
      if (maxW / maxH > ratio) {
        canvas.style.height = maxH + 'px';
        canvas.style.width = Math.round(maxH * ratio) + 'px';
      } else {
        canvas.style.width = maxW + 'px';
        canvas.style.height = Math.round(maxW / ratio) + 'px';
      }
    }

    var resizeTimer;
    window.addEventListener('orientationchange', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        fitCanvasToContainer();
        drawFrame(currentFrame);
      }, 200);
    });

    function drawFrame(index) {
      var img = images[index];
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }

    /* BUG FIX #2 — getBoundingClientRect updates during iOS momentum scroll */
    function getProgress() {
      var rect = section.getBoundingClientRect();
      var total = section.offsetHeight - window.innerHeight;
      return total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
    }

    function updateFrame() {
      var progress = getProgress();
      var frameIndex = Math.min(Math.floor(progress * TOTAL_FRAMES), TOTAL_FRAMES - 1);
      if (frameIndex !== currentFrame) {
        currentFrame = frameIndex;
        drawFrame(currentFrame);
      }
    }

    /* BUG FIX #4 — rAF ticking flag: one draw per animation frame max */
    function scheduleUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        updateFrame();
        ticking = false;
      });
    }

    /* BUG FIX #2 + #3 — scroll + touchmove, always passive: true */
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('touchmove', scheduleUpdate, { passive: true });

    preloadAll();
  })();
  </script>
</body>
</html>`,ez={lovable:{label:"העתק פרומפט ל-Lovable",icon:"💜",color:"#a855f7",bg:"rgba(168, 85, 247, 0.12)"},base44:{label:"העתק פרומפט ל-Base44",icon:"🟠",color:"#f97316",bg:"rgba(249, 115, 22, 0.12)"},html:{label:"קוד HTML גולמי",icon:"</>",color:"#94a3b8",bg:"rgba(148, 163, 184, 0.1)"}};function eM(e){let n,r,o,s,d,c,p,g,h,m,b,f,u,y,w,k,S,T,H,C,E,z,M,L,A,_,I,R,O,B,F,P,N,Y,U,X,q,G,W,$,J,V=(0,i.c)(72),{onClose:Z,onCopy:K}=e,[Q,ee]=(0,a.useState)("idle"),[et,ei]=(0,a.useState)(0),[ea,en]=(0,a.useState)(""),[er,eo]=(0,a.useState)(0),[es,el]=(0,a.useState)(null),[ed,ec]=(0,a.useState)("lovable"),[ep,eg]=(0,a.useState)(""),[eh,em]=(0,a.useState)(null),[eb,ef]=(0,a.useState)(null),[eu,ev]=(0,a.useState)(!1),ex=(0,a.useRef)(null),ey=(0,a.useRef)(null),ew=(0,a.useRef)(null);V[0]!==Z?(n=()=>{let e=e=>{"Escape"===e.key&&Z()};return document.addEventListener("keydown",e),()=>document.removeEventListener("keydown",e)},r=[Z],V[0]=Z,V[1]=n,V[2]=r):(n=V[1],r=V[2]),(0,a.useEffect)(n,r),V[3]===Symbol.for("react.memo_cache_sentinel")?(o=[],V[3]=o):o=V[3],(0,a.useEffect)(eO,o),V[4]===Symbol.for("react.memo_cache_sentinel")?(s=async e=>new Promise((t,i)=>{let a=ex.current,n=ey.current,r=n.getContext("2d"),o=[],s=URL.createObjectURL(e);a.src=s,a.muted=!0,a.preload="auto";let l=async()=>{let i=a.duration,l=Math.round(i*await eC(a));eo(l),ef({name:e.name,duration:i});let d=Math.min(1,1280/a.videoWidth);n.width=Math.floor(a.videoWidth*d),n.height=Math.floor(a.videoHeight*d),ee("extracting");for(let e=0;e<l;e++){a.currentTime=e/Math.max(1,l-1)*i,await new Promise(e=>{a.addEventListener("seeked",()=>e(),{once:!0})}),r.drawImage(a,0,0,n.width,n.height);let t=await new Promise((e,t)=>{n.toBlob(i=>i?e(i):t(Error("blob failed")),"image/jpeg",.82)});o.push(t),ei(Math.floor((e+1)/l*50)),en("מחלץ פריימים... "+(e+1)+"/"+l)}URL.revokeObjectURL(s),t(o)};a.addEventListener("loadedmetadata",l,{once:!0}),a.addEventListener("error",()=>i(Error("שגיאה בטעינת הוידאו")),{once:!0})}),V[4]=s):s=V[4];let eM=s,eB=eR;V[5]===Symbol.for("react.memo_cache_sentinel")?(d=async e=>{ee("uploading");let t=Array(e.length);for(let i=0;i<e.length;i+=4){let a=e.slice(i,i+4);(await Promise.all(a.map((e,t)=>eB(e,i+t)))).forEach((e,a)=>{t[i+a]=e});let n=Math.min(i+4,e.length);ei(50+Math.floor(n/e.length*50)),en("מעלה ל-imgbb... "+n+"/"+e.length)}return t},V[5]=d):d=V[5];let eF=d;V[6]===Symbol.for("react.memo_cache_sentinel")?(c=async e=>{if(!e.type.startsWith("video/"))return void eg("נא להעלות קובץ וידאו (MP4, MOV, WEBM)");if(e.size>0x3200000)return void eg("הקובץ גדול מדי — מקסימום 50MB");eg(""),el(null),ei(0),em(null);try{let t=await eM(e),i=await eF(t),a=function(e){let t,i,a,n,r;return{html:(t=e.map(e=>"      '"+e+"'").join(",\n"),eE.replace("      /* URLS_PLACEHOLDER */",t)),lovable:(i=e.map(e=>`  "${e}"`).join(",\n"),a=20*e.length,`Create a full-screen scroll-driven video hero section component.

## Component: ScrollVideoHero

Create ScrollVideoHero.tsx as a default export React component.
No external libraries. React hooks + vanilla canvas API only.

---

## What it does

As the user scrolls, a video plays frame by frame across the full screen.
Text overlays fade in and out at different scroll stages — like Apple's product pages.
The video fills the entire screen (cover mode, no black bars).

---

## Frame URLs (${e.length} frames)

\`\`\`ts
const FRAME_URLS = [
${i}
];
\`\`\`

---

## Text overlays — YOU decide the content

Read the existing app to understand its purpose, product, and tone.
Then write 3 short text overlays that feel like they belong on this site:

- **TITLE**: A short powerful headline (3-6 words). Shown centered at scroll start.
- **LEFT**: A supporting line for the left side (5-10 words). Shown at scroll middle-left.
- **RIGHT**: A supporting line for the right side (5-10 words). Shown at scroll middle-right.

Make them sound like real marketing copy for this specific product/brand.
Use the same language as the rest of the site (Hebrew or English, match the site).

Define them as constants at the top of the file:
\`\`\`ts
const TEXT_TITLE = "..."; // your choice
const TEXT_LEFT  = "..."; // your choice
const TEXT_RIGHT = "..."; // your choice
\`\`\`

---

## Layout structure

\`\`\`tsx
<div ref={sectionRef} style={{ height: \`calc(${a}px + var(--svh, 100vh))\`, position: 'relative' }}>

  {/* Sticky fullscreen container */}
  <div style={{
    position: 'sticky', top: 0,
    width: '100vw',
    height: 'var(--svh, 100vh)',
    overflow: 'hidden',
    background: '#000',
  }}>
    {/* Canvas — fullscreen cover, no black bars */}
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0,
      width: '100%', height: '100%',
      objectFit: 'cover',      // hint only — actual cover done in drawCover()
    }} />

    {/* TITLE — centered, fades in at 0% scroll, fades out at 30% */}
    <div ref={titleRef} style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: 0,
      pointerEvents: 'none',
      textAlign: 'center', padding: '0 2rem',
    }}>
      <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 900,
        textShadow: '0 2px 40px rgba(0,0,0,0.5)', lineHeight: 1.1 }}>
        {TEXT_TITLE}
      </h1>
    </div>

    {/* LEFT text — fades in at 30%, fades out at 60% */}
    <div ref={leftRef} style={{
      position: 'absolute', left: '5%', top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0,
      pointerEvents: 'none', maxWidth: '30%',
    }}>
      <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 600,
        textShadow: '0 2px 20px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
        {TEXT_LEFT}
      </p>
    </div>

    {/* RIGHT text — fades in at 55%, fades out at 85% */}
    <div ref={rightRef} style={{
      position: 'absolute', right: '5%', top: '50%',
      transform: 'translateY(-50%)',
      opacity: 0,
      pointerEvents: 'none', maxWidth: '30%', textAlign: 'right',
    }}>
      <p style={{ color: '#fff', fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 600,
        textShadow: '0 2px 20px rgba(0,0,0,0.6)', lineHeight: 1.4 }}>
        {TEXT_RIGHT}
      </p>
    </div>

  </div>
</div>
\`\`\`

---

## Canvas cover drawing — NO black bars

The canvas pixel dimensions stay equal to the video's original size.
CSS width/height both 100% so it stretches to fill the container.
Use drawImage with source crop to implement cover behavior:

\`\`\`ts
function drawCover(img: HTMLImageElement) {
  const vw = canvas.offsetWidth  || window.innerWidth;
  const vh = canvas.offsetHeight || window.innerHeight;

  const imgRatio  = img.naturalWidth / img.naturalHeight;
  const viewRatio = vw / vh;

  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

  if (viewRatio > imgRatio) {
    // viewport is wider than image — crop top and bottom
    sh = img.naturalWidth / viewRatio;
    sy = (img.naturalHeight - sh) / 2;
  } else {
    // viewport is taller than image — crop left and right
    sw = img.naturalHeight * viewRatio;
    sx = (img.naturalWidth - sw) / 2;
  }

  // Set canvas pixel size to match viewport for sharp rendering
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width  = vw;
    canvas.height = vh;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}
\`\`\`

Call drawCover(images[currentFrame]) instead of ctx.drawImage.
Also call drawCover on orientationchange after fitCanvas.

---

## Text opacity & position — scroll-driven

Calculate these values inside the rAF update loop (not with useState — too slow):

\`\`\`ts
// progress = 0 to 1 across the full scroll section

function getTextValues(progress: number) {
  // Helper: fade a value in/out between two scroll points
  const fade = (start: number, inEnd: number, outStart: number, end: number) => {
    if (progress < start || progress > end) return 0;
    if (progress < inEnd)   return (progress - start) / (inEnd - start);
    if (progress > outStart) return 1 - (progress - outStart) / (end - outStart);
    return 1;
  };

  return {
    titleOpacity: fade(0,    0.15, 0.25, 0.38),
    titleY:       -progress * 30,

    leftOpacity:  fade(0.30, 0.44, 0.54, 0.64),
    leftY:        progress < 0.44 ? (1 - (progress - 0.30) / 0.14) * 30 : 0,

    rightOpacity: fade(0.58, 0.70, 0.80, 0.90),
    rightY:       progress < 0.70 ? (1 - (progress - 0.58) / 0.12) * 30 : 0,
  };
}
\`\`\`

Apply these values by writing directly to element.style (not React state):

\`\`\`ts
const titleEl = titleRef.current;
const leftEl  = leftRef.current;
const rightEl = rightRef.current;

const v = getTextValues(progress);
if (titleEl) {
  titleEl.style.opacity   = String(v.titleOpacity);
  titleEl.style.transform = \`translateY(\${v.titleY}px)\`;
}
if (leftEl) {
  leftEl.style.opacity   = String(v.leftOpacity);
  leftEl.style.transform = \`translateY(calc(-50% + \${v.leftY}px))\`;
}
if (rightEl) {
  rightEl.style.opacity   = String(v.rightOpacity);
  rightEl.style.transform = \`translateY(calc(-50% + \${v.rightY}px))\`;
}
\`\`\`

Use refs (titleRef, leftRef, rightRef) for direct DOM manipulation —
this is intentional and critical for 60fps performance.
Do NOT use useState or useReducer for opacity/transform values.

---

## Scroll & mobile logic

\`\`\`ts
// iOS Safari viewport fix
const setVh = () =>
  document.documentElement.style.setProperty('--svh', window.innerHeight + 'px');
setVh();
window.addEventListener('orientationchange', setVh);

// getBoundingClientRect — works during iOS momentum scroll
function getProgress() {
  const rect  = sectionRef.current!.getBoundingClientRect();
  const total = sectionRef.current!.offsetHeight - window.innerHeight;
  return total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0;
}

// rAF ticking — one update per frame
let ticking = false;
const schedule = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const progress   = getProgress();
    const frameIndex = Math.min(Math.floor(progress * FRAME_URLS.length), FRAME_URLS.length - 1);

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawCover(images[frameIndex]);
    }

    // Update text overlays directly on DOM
    updateTextOverlays(progress);

    ticking = false;
  });
};

// Both listeners passive — required for Chrome, catches iOS momentum
window.addEventListener('scroll',    schedule, { passive: true });
window.addEventListener('touchmove', schedule, { passive: true });
\`\`\`

---

## Preloading

\`\`\`ts
// Decode first 10 frames before showing canvas
const priority = images.slice(0, Math.min(10, FRAME_URLS.length));
await Promise.all(priority.map(img =>
  img.decode ? img.decode().catch(() => {}) : new Promise(r => { img.onload = r; })
));
// Draw first frame with cover crop
drawCover(images[0]);
canvas.style.opacity = '1';
// Decode rest in background
images.slice(10).forEach(img => img.decode?.().catch(() => {}));
\`\`\`

---

## Cleanup

\`\`\`ts
return () => {
  window.removeEventListener('scroll',    schedule);
  window.removeEventListener('touchmove', schedule);
  window.removeEventListener('orientationchange', setVh);
};
\`\`\`

---

## Final notes

- Use <ScrollVideoHero /> anywhere in the app — fully self-contained
- Three text strings (TEXT_TITLE, TEXT_LEFT, TEXT_RIGHT) are defined at the top — easy to change
- No black bars — video always fills the full screen
- 60fps on mobile — no React state updates during scroll, only direct DOM writes
- Works on iOS Safari, Android Chrome, desktop`),base44:(n=e.map(e=>`"${e}"`).join(", "),r=20*e.length,`בנה סקשן hero מלא מסך עם אנימציית גלילה — סגנון Apple AirPods.

## מה לבנות
קומפוננטת ScrollVideoHero — וידאו שמתנגן פריים אחר פריים בזמן גלילה.
הוידאו ממלא את כל המסך ללא פסים שחורים.
טקסטים מופיעים ונעלמים בצדדים בזמן הגלילה.

---

## פריימים (${e.length} במספר)
const FRAME_URLS = [${n}];

---

## טקסטים — אתה בוחר את התוכן

קרא את האתר הקיים כדי להבין את המוצר, המותג והטון.
כתוב 3 טקסטים קצרים שמרגישים חלק מהאתר:

TEXT_TITLE — כותרת חזקה (3-6 מילים). מוצגת במרכז בתחילת הגלילה.
TEXT_LEFT  — משפט תומך שמאל (5-10 מילים). מופיע באמצע הגלילה בצד שמאל.
TEXT_RIGHT — משפט תומך ימין (5-10 מילים). מופיע מאוחר יותר בצד ימין.

השתמש בשפה של שאר האתר (עברית או אנגלית — תתאם).
הגדר אותם בראש הקובץ:
const TEXT_TITLE = "...";
const TEXT_LEFT  = "...";
const TEXT_RIGHT = "...";

---

## Canvas — cover מלא, ללא פסים שחורים

אל תשתמש ב-CSS לבד. חשב crop ידנית עם drawImage:

function drawCover(img) {
  const vw = canvas.offsetWidth  || window.innerWidth;
  const vh = canvas.offsetHeight || window.innerHeight;
  const imgRatio  = img.naturalWidth / img.naturalHeight;
  const viewRatio = vw / vh;
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
  if (viewRatio > imgRatio) {
    sh = img.naturalWidth / viewRatio;
    sy = (img.naturalHeight - sh) / 2;
  } else {
    sw = img.naturalHeight * viewRatio;
    sx = (img.naturalWidth - sw) / 2;
  }
  if (canvas.width !== vw || canvas.height !== vh) {
    canvas.width  = vw;
    canvas.height = vh;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}

קרא ל-drawCover בכל עדכון פריים ובכל שינוי orientation.

---

## מבנה HTML/CSS

div חיצוני: גובה ${r}px + גובה המסך האמיתי (לא 100vh — ראה למטה)
div sticky פנימי: position sticky, top 0, רוחב 100vw, גובה מסך אמיתי, overflow hidden, רקע שחור
canvas: position absolute, inset 0, width 100%, height 100%
3 div טקסט: position absolute, pointer-events none

---

## מיקום הטקסטים

TITLE: מרכז המסך, אנכי ואופקי
LEFT: 5% מהשמאל, 50% גובה
RIGHT: 5% מהימין, 50% גובה, text-align right

---

## אנימציית טקסט לפי גלילה (progress = 0 עד 1)

חשב opacity ו-translateY ישירות על ה-DOM element (לא useState — זה איטי מדי ל-60fps):

element.style.opacity   = String(opacityValue);
element.style.transform = \`translateY(\${yValue}px)\`;

לוח זמנים:
TITLE: נכנס 0-0.15, יציב 0.15-0.25, יוצא 0.25-0.38
LEFT:  נכנס 0.30-0.44, יציב 0.44-0.54, יוצא 0.54-0.64
RIGHT: נכנס 0.58-0.70, יציב 0.70-0.80, יוצא 0.80-0.90

כשנכנס: translateY מ-30px ל-0px
כשיוצא: translateY מ-0px ל--30px

---

## גובה מסך נכון — תיקון iOS Safari

אל תשתמש ב-100vh — כולל את ה-address bar ו-sticky canvas קופץ.
במקום:
document.documentElement.style.setProperty('--svh', window.innerHeight + 'px');
הרץ פעם אחת בטעינה ושוב ב-orientationchange בלבד (לא ב-resize).

---

## חישוב progress

השתמש ב-getBoundingClientRect ולא ב-scrollY.
סיבה: scrollY לא מתעדכן במהלך momentum scroll ב-iOS Safari.
progress = -sectionEl.getBoundingClientRect().top / (sectionHeight - windowHeight)

---

## scroll listeners

האזן גם ל-scroll וגם ל-touchmove.
שניהם חייבים להיות passive: true.
השתמש ב-requestAnimationFrame עם ticking flag — עדכון אחד לכל פריים.

---

## ניקוי

הסר את כל ה-event listeners ב-unmount / cleanup.

---

## חשוב

- ללא ספריות חיצוניות
- ללא useState/useReducer לאנימציות — רק DOM ישיר
- וידאו ממלא מסך מלא, ללא פסים שחורים
- 60fps במובייל
- עובד ב-iOS Safari, Android Chrome, דסקטופ`)}}(i);el(a),ec("lovable"),ee("done"),ei(100),en(i.length+" פריימים הועלו בהצלחה")}catch(e){ee("error"),eg(e instanceof Error?e.message:"שגיאה לא ידועה — נסה שוב")}},V[6]=c):c=V[6];let eP=c;V[7]===Symbol.for("react.memo_cache_sentinel")?(p=e=>{e.preventDefault(),ev(!0)},V[7]=p):p=V[7];let eD=p;V[8]===Symbol.for("react.memo_cache_sentinel")?(g=()=>{ev(!1)},V[8]=g):g=V[8];let eN=g;V[9]===Symbol.for("react.memo_cache_sentinel")?(h=e=>{e.preventDefault(),ev(!1);let t=e.dataTransfer.files[0];t&&eP(t)},V[9]=h):h=V[9];let eY=h;V[10]===Symbol.for("react.memo_cache_sentinel")?(m=e=>{let t=e.target.files?.[0];t&&eP(t)},V[10]=m):m=V[10];let eU=m;V[11]!==es||V[12]!==K?(b=e=>{es&&(x(es[e]),em(e),ec(e),K(),setTimeout(()=>em(null),2e3))},V[11]=es,V[12]=K,V[13]=b):b=V[13];let eX=b;V[14]===Symbol.for("react.memo_cache_sentinel")?(f=()=>{ee("idle"),ei(0),en(""),eo(0),el(null),eg(""),em(null),ef(null),ew.current&&(ew.current.value="")},V[14]=f):f=V[14];let eq=f,eG="extracting"===Q||"uploading"===Q;return V[15]===Symbol.for("react.memo_cache_sentinel")?(u={opacity:0},y={opacity:1},w={opacity:0},V[15]=u,V[16]=y,V[17]=w):(u=V[15],y=V[16],w=V[17]),V[18]===Symbol.for("react.memo_cache_sentinel")?(k={position:"fixed",inset:0,background:"rgba(0, 0, 0, 0.8)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",zIndex:50},V[18]=k):k=V[18],V[19]!==Z?(S=(0,t.jsx)(l.motion.div,{initial:u,animate:y,exit:w,onClick:Z,style:k},"scroll-video-backdrop"),V[19]=Z,V[20]=S):S=V[20],V[21]===Symbol.for("react.memo_cache_sentinel")?(T={opacity:0,scale:.95,y:10},H={opacity:1,scale:1,y:0},C={opacity:0,scale:.95,y:10},E={duration:.2},z={position:"fixed",inset:0,zIndex:51,display:"flex",alignItems:"center",justifyContent:"center",padding:20,pointerEvents:"none"},V[21]=T,V[22]=H,V[23]=C,V[24]=E,V[25]=z):(T=V[21],H=V[22],C=V[23],E=V[24],z=V[25]),V[26]===Symbol.for("react.memo_cache_sentinel")?(M={pointerEvents:"auto",width:"100%",maxWidth:720,maxHeight:"85vh",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"},L={padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},A={fontSize:18,fontWeight:700,color:"var(--text)",fontFamily:"'Heebo', sans-serif",display:"flex",alignItems:"center",gap:8},V[26]=M,V[27]=L,V[28]=A):(M=V[26],L=V[27],A=V[28]),V[29]===Symbol.for("react.memo_cache_sentinel")?(_=(0,t.jsxs)("h2",{style:A,children:[(0,t.jsx)(eS,{size:20,style:{color:"var(--accent)"}}),"סרטון גלילה — כלי יצירה"]}),V[29]=_):_=V[29],V[30]===Symbol.for("react.memo_cache_sentinel")?(I={background:"none",border:"none",color:"var(--muted)",cursor:"pointer",padding:4,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"},V[30]=I):I=V[30],V[31]===Symbol.for("react.memo_cache_sentinel")?(R=(0,t.jsx)(D,{size:18}),V[31]=R):R=V[31],V[32]!==Z?(O=(0,t.jsxs)("div",{style:L,children:[_,(0,t.jsx)("button",{onClick:Z,"aria-label":"סגור",style:I,onMouseEnter:ej,onMouseLeave:e_,children:R})]}),V[32]=Z,V[33]=O):O=V[33],V[34]===Symbol.for("react.memo_cache_sentinel")?(B={overflowY:"auto",padding:20,flex:1},V[34]=B):B=V[34],V[35]!==eu||V[36]!==Q?(F="idle"===Q&&(0,t.jsxs)("div",{onDragOver:eD,onDragLeave:eN,onDrop:eY,onClick:()=>ew.current?.click(),style:{border:"2px dashed "+(eu?"var(--accent)":"var(--border)"),borderRadius:12,padding:"40px 20px",textAlign:"center",cursor:"pointer",background:eu?"rgba(200, 245, 59, 0.05)":"transparent",transition:"all 0.2s",marginBottom:20},children:[(0,t.jsx)(ek,{size:32,style:{color:eu?"var(--accent)":"var(--muted)",marginBottom:12,margin:"0 auto 12px",display:"block"}}),(0,t.jsx)("p",{style:{color:"var(--text)",fontSize:16,fontWeight:600,fontFamily:"'Heebo', sans-serif",marginBottom:6},children:"גרור וידאו לכאן"}),(0,t.jsx)("p",{style:{color:"var(--muted)",fontSize:13,fontFamily:"'Heebo', sans-serif"},children:"או לחץ לבחירת קובץ — MP4, MOV, WEBM (עד 50MB)"}),(0,t.jsx)("input",{ref:ew,type:"file",accept:"video/*",onChange:eU,style:{display:"none"}})]}),V[35]=eu,V[36]=Q,V[37]=F):F=V[37],V[38]!==Q||V[39]!==er||V[40]!==eb?(P=eb&&"idle"!==Q&&(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:16,padding:"10px 14px",borderRadius:8,background:"rgba(255,255,255,0.03)",border:"1px solid var(--border)"},children:[(0,t.jsx)(eS,{size:16,style:{color:"var(--accent)",flexShrink:0}}),(0,t.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,t.jsx)("p",{style:{fontSize:13,color:"var(--text)",fontFamily:"'Space Mono', monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",direction:"ltr"},children:eb.name}),(0,t.jsxs)("p",{style:{fontSize:12,color:"var(--muted)",fontFamily:"'Heebo', sans-serif"},children:[eb.duration.toFixed(1)," שניות — ",er," פריימים"]})]})]}),V[38]=Q,V[39]=er,V[40]=eb,V[41]=P):P=V[41],V[42]!==eG||V[43]!==et||V[44]!==ea?(N=eG&&(0,t.jsxs)("div",{style:{marginBottom:20},children:[(0,t.jsx)("div",{style:{height:6,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden",marginBottom:8},children:(0,t.jsx)("div",{style:{height:"100%",borderRadius:3,background:"var(--accent)",width:et+"%",transition:"width 0.3s ease-out"}})}),(0,t.jsx)("p",{style:{fontSize:13,color:"var(--muted)",fontFamily:"'Heebo', sans-serif",textAlign:"center"},children:ea})]}),V[42]=eG,V[43]=et,V[44]=ea,V[45]=N):N=V[45],V[46]!==ep?(Y=ep&&(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderRadius:8,background:"rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.3)",marginBottom:16},children:[(0,t.jsx)(eT,{size:16,style:{color:"#ef4444",flexShrink:0}}),(0,t.jsx)("p",{style:{fontSize:13,color:"#ef4444",fontFamily:"'Heebo', sans-serif"},children:ep})]}),V[46]=ep,V[47]=Y):Y=V[47],V[48]!==ed||V[49]!==eh||V[50]!==es||V[51]!==eX||V[52]!==ea||V[53]!==Q?(U="done"===Q&&es&&(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14},children:[(0,t.jsx)("p",{style:{fontSize:14,fontWeight:600,color:"var(--accent)",fontFamily:"'Heebo', sans-serif"},children:ea}),(0,t.jsxs)("button",{onClick:eq,style:{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",borderRadius:6,border:"1px solid var(--border)",background:"transparent",color:"var(--muted)",fontSize:12,fontFamily:"'Heebo', sans-serif",cursor:"pointer"},onMouseEnter:eA,onMouseLeave:eL,children:[(0,t.jsx)(eH,{size:12}),"וידאו חדש"]})]}),(0,t.jsx)("div",{style:{display:"flex",gap:8,marginBottom:14},children:Object.keys(ez).map(e=>{let i=ez[e],a=eh===e;return(0,t.jsx)("button",{onClick:()=>eX(e),style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 8px",borderRadius:8,border:`1px solid ${ed===e?i.color:"var(--border)"}`,background:a||ed===e?i.bg:"transparent",color:a?"#22c55e":i.color,fontSize:13,fontWeight:600,fontFamily:"'Heebo', sans-serif",cursor:"pointer",transition:"all 0.2s"},children:a?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v,{size:14}),(0,t.jsx)("span",{children:"הועתק!"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:i.icon}),(0,t.jsx)("span",{children:i.label})]})},e)})}),(0,t.jsx)("div",{style:{borderRadius:8,overflow:"hidden",border:"1px solid var(--border)",maxHeight:280,overflowY:"auto"},children:(0,t.jsx)("pre",{style:{margin:0,padding:16,background:"var(--code-bg)",fontSize:12,lineHeight:1.6,direction:"ltr",textAlign:"left",whiteSpace:"pre-wrap",wordBreak:"break-word",color:"var(--muted)",fontFamily:"'Space Mono', monospace"},children:es[ed]})}),(0,t.jsx)("p",{style:{fontSize:12,color:"var(--muted)",marginTop:10,fontFamily:"'Heebo', sans-serif",opacity:.7,textAlign:"center"},children:"העתק את הפרומפט ← פתח את Lovable/Base44 ← הדבק בשורת ה-chat"})]}),V[48]=ed,V[49]=eh,V[50]=es,V[51]=eX,V[52]=ea,V[53]=Q,V[54]=U):U=V[54],V[55]!==Q?(X="error"===Q&&(0,t.jsx)("div",{style:{textAlign:"center",marginTop:8},children:(0,t.jsxs)("button",{onClick:eq,style:{display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",borderRadius:8,border:"1px solid var(--accent)",background:"transparent",color:"var(--accent)",fontSize:14,fontFamily:"'Heebo', sans-serif",cursor:"pointer"},children:[(0,t.jsx)(eH,{size:14}),"נסה שוב"]})}),V[55]=Q,V[56]=X):X=V[56],V[57]!==F||V[58]!==P||V[59]!==N||V[60]!==Y||V[61]!==U||V[62]!==X?(q=(0,t.jsxs)("div",{style:B,children:[F,P,N,Y,U,X]}),V[57]=F,V[58]=P,V[59]=N,V[60]=Y,V[61]=U,V[62]=X,V[63]=q):q=V[63],V[64]!==O||V[65]!==q?(G=(0,t.jsx)(l.motion.div,{initial:T,animate:H,exit:C,transition:E,style:z,children:(0,t.jsxs)("div",{onClick:eI,style:M,children:[O,q]})},"scroll-video-panel"),V[64]=O,V[65]=q,V[66]=G):G=V[66],V[67]===Symbol.for("react.memo_cache_sentinel")?(W=(0,t.jsx)("video",{ref:ex,style:{display:"none"},playsInline:!0}),V[67]=W):W=V[67],V[68]===Symbol.for("react.memo_cache_sentinel")?($=(0,t.jsx)("canvas",{ref:ey,style:{display:"none"}}),V[68]=$):$=V[68],V[69]!==S||V[70]!==G?(J=(0,t.jsxs)(j.AnimatePresence,{children:[S,G,W,$]}),V[69]=S,V[70]=G,V[71]=J):J=V[71],J}function eL(e){e.currentTarget.style.borderColor="var(--border)"}function eA(e){e.currentTarget.style.borderColor="var(--muted)"}function e_(e){e.currentTarget.style.color="var(--muted)"}function ej(e){e.currentTarget.style.color="var(--accent)"}function eI(e){return e.stopPropagation()}async function eR(e,t){let i=await new Promise(t=>{let i=new FileReader;i.onload=()=>t(i.result.split(",")[1]),i.readAsDataURL(e)}),a=new FormData;a.append("key","25b04553339a4a409b2c07eb1f9ca8a4"),a.append("image",i),a.append("name","frame_"+String(t).padStart(3,"0"));let n=await fetch("https://api.imgbb.com/1/upload",{method:"POST",body:a}),r=await n.json();if(!r.success)throw Error(r.error?.message??"Upload failed");return r.data.url}function eO(){return document.body.style.overflow="hidden",eB}function eB(){document.body.style.overflow=""}function eF(e){let a,n,r=(0,i.c)(5),{show:o,message:s}=e;return r[0]!==s||r[1]!==o?(a=o&&(0,t.jsxs)(l.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},transition:{duration:.3,ease:[.25,.46,.45,.94]},className:"flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg",style:{background:"var(--accent)",color:"#000",fontWeight:700,fontFamily:"'Space Mono', monospace",fontSize:14},children:[(0,t.jsx)(v,{size:16,strokeWidth:3}),(0,t.jsx)("span",{children:s??"✓ הקוד הועתק!"})]}),r[0]=s,r[1]=o,r[2]=a):a=r[2],r[3]!==a?(n=(0,t.jsx)("div",{className:"fixed bottom-6 right-6 z-50",dir:"rtl",children:(0,t.jsx)(j.AnimatePresence,{children:a})}),r[3]=a,r[4]=n):n=r[4],n}let eP=["זו רק ההתחלה","יש לכם עוד למטה","מה חשבתם שנגמר?","תגללו"],eD=["keep going","copy. paste. done.","no libraries needed","almost there"];function eN(){let e,a=(0,i.c)(1);return a[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsxs)("svg",{width:"14",height:"22",viewBox:"0 0 14 22",fill:"none",style:{display:"block",flexShrink:0},children:[(0,t.jsx)("line",{x1:"7",y1:"0",x2:"7",y2:"17",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,t.jsx)("polyline",{points:"1,12 7,19 13,12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})]}),a[0]=e):e=a[0],e}function eY(e){let n,r,o,s,l,d,c,p=(0,i.c)(14),{messages:g,side:h}=e;p[0]===Symbol.for("react.memo_cache_sentinel")?(n=[],p[0]=n):n=p[0];let m=(0,a.useRef)(n),b=(0,a.useRef)(void 0),f="left"===h;p[1]!==g?(r=()=>{let e=window.scrollY,t=window.innerHeight,i=Math.max(0,Math.min(1,(e-t)/(Math.max(document.body.scrollHeight-window.innerHeight,1)-t)));g.forEach((e,t)=>{let a,n,r=m.current[t];if(!r)return;let o=t/g.length,s=o+.04,l=o+.12,d=o+.18;if(i<o)a=0,n=28;else if(i<s){let e=(i-o)/(s-o);a=e,n=28*(1-e)}else if(i<l)a=1,n=0;else if(i<d){let e=(i-l)/(d-l);a=1-e,n=-(20*e)}else a=0,n=-20;r.style.opacity=String(Math.max(0,Math.min(1,a))),r.style.transform=`translateY(${n}px)`})},p[1]=g,p[2]=r):r=p[2];let u=r;return p[3]!==u?(o=()=>{let e=()=>{b.current||(b.current=requestAnimationFrame(()=>{u(),b.current=void 0}))};return u(),window.addEventListener("scroll",e,{passive:!0}),()=>{window.removeEventListener("scroll",e),b.current&&cancelAnimationFrame(b.current)}},s=[u],p[3]=u,p[4]=o,p[5]=s):(o=p[4],s=p[5]),(0,a.useEffect)(o,s),p[6]!==h?(l={position:"fixed",top:0,[h]:0,width:"calc((100vw - 1360px) / 2)",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:30},p[6]=h,p[7]=l):l=p[7],p[8]!==f||p[9]!==g?(d=g.map((e,i)=>(0,t.jsxs)("div",{ref:e=>{m.current[i]=e},style:{position:"absolute",opacity:0,transform:"translateY(28px)",willChange:"opacity, transform",display:"flex",flexDirection:"column",alignItems:"center",gap:10,color:"#ffffff",fontSize:14,fontFamily:"'Heebo', sans-serif",fontWeight:700,whiteSpace:"nowrap",direction:f?"rtl":"ltr"},children:[e,(0,t.jsx)("span",{style:{color:"#c8f53b",opacity:.8},children:(0,t.jsx)(eN,{})})]},i)),p[8]=f,p[9]=g,p[10]=d):d=p[10],p[11]!==l||p[12]!==d?(c=(0,t.jsx)("div",{"aria-hidden":"true",style:l,children:d}),p[11]=l,p[12]=d,p[13]=c):c=p[13],c}function eU(){let e,a,n,r=(0,i.c)(3);return r[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,t.jsx)("style",{children:"\n        @media (max-width: 1720px) {\n          .scroll-side-left,\n          .scroll-side-right {\n            display: none !important;\n          }\n        }\n      "}),r[0]=e):e=r[0],r[1]===Symbol.for("react.memo_cache_sentinel")?(a=(0,t.jsx)("div",{className:"scroll-side-left",children:(0,t.jsx)(eY,{messages:eP,side:"left"})}),r[1]=a):a=r[1],r[2]===Symbol.for("react.memo_cache_sentinel")?(n=(0,t.jsxs)(t.Fragment,{children:[e,a,(0,t.jsx)("div",{className:"scroll-side-right",children:(0,t.jsx)(eY,{messages:eD,side:"right"})})]}),r[2]=n):n=r[2],n}var eX=e.i(2634),eq=e.i(52011),eG=e.i(52906),eW=e.i(72789);function e$(){let e,l,c,g,h,m,b,f,u,v,x,y=(0,i.c)(41),[w,k]=(0,a.useState)(null),[S,T]=(0,a.useState)(!1),H=function(e){let t=new Map;for(let i of r){let a=e.filter(e=>e.categories.includes(i.id));a.length>0&&t.set(i.id,a)}return t}(n),C=(0,eq.useIsMobile)(),[E,z]=(0,a.useState)(""),[M,L]=(0,a.useState)("all");y[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{T(!0),setTimeout(()=>T(!1),2e3)},y[0]=e):e=y[0];let j=e;if(C){let e,i,n,o,s,l,d,c,g,h,m=r.flatMap(e=>H.get(e.id)||[]);y[1]!==M||y[2]!==E?(e=e=>{let t="all"===M||e.categories.includes(M),i=!E||e.titleHe.includes(E)||e.title.toLowerCase().includes(E.toLowerCase())||e.tags.some(e=>e.label.toLowerCase().includes(E.toLowerCase()));return t&&i},y[1]=M,y[2]=E,y[3]=e):e=y[3];let b=m.filter(e);y[4]===Symbol.for("react.memo_cache_sentinel")?(i=(0,t.jsx)(eG.default,{title:"אפקטים",onSearch:z,searchPlaceholder:"חפש אפקט..."}),y[4]=i):i=y[4];let f=`filter-pill-mobile ${"all"===M?"active":""}`;return y[5]===Symbol.for("react.memo_cache_sentinel")?(n=()=>L("all"),y[5]=n):n=y[5],y[6]!==f?(o=(0,t.jsx)("button",{className:f,onClick:n,children:"הכל"}),y[6]=f,y[7]=o):o=y[7],y[8]!==M?(s=r.map(e=>(0,t.jsx)("button",{className:`filter-pill-mobile ${M===e.id?"active":""}`,onClick:()=>L(e.id),children:e.label},e.id)),y[8]=M,y[9]=s):s=y[9],y[10]!==o||y[11]!==s?(l=(0,t.jsxs)("div",{className:"mobile-filter-pills","data-scroll-horizontal":!0,children:[o,s]}),y[10]=o,y[11]=s,y[12]=l):l=y[12],y[13]===Symbol.for("react.memo_cache_sentinel")?(d={paddingTop:8},y[13]=d):d=y[13],y[14]===Symbol.for("react.memo_cache_sentinel")?(c=e=>{let i=p[e.previewComponent];return(0,t.jsxs)("div",{className:"effect-card-mobile card-reveal",children:[(0,t.jsx)("div",{className:"effect-preview-mobile",children:i&&(0,t.jsx)(a.Suspense,{fallback:(0,t.jsx)("div",{style:{width:"100%",height:"100%",background:"var(--surface)"}}),children:(0,t.jsx)(i,{})})}),(0,t.jsxs)("div",{className:"effect-info-mobile",children:[(0,t.jsx)("span",{className:"effect-name-mobile",children:e.titleHe}),(0,t.jsx)("button",{className:"copy-btn-mobile",onClick:()=>{k(e)},children:"העתק"})]})]},e.id)},y[14]=c):c=y[14],y[15]!==j||y[16]!==w?(g=w?.id==="scrollvideo"?(0,t.jsx)(eM,{onClose:()=>k(null),onCopy:j}):(0,t.jsx)(eb,{effect:w,onClose:()=>k(null),onCopy:j}),y[15]=j,y[16]=w,y[17]=g):g=y[17],y[18]!==S?(h=(0,t.jsx)(eW.default,{show:S}),y[18]=S,y[19]=h):h=y[19],(0,t.jsxs)("div",{className:"mobile-page",children:[i,l,(0,t.jsx)("div",{style:d,children:b.map(c)}),g,h]})}y[20]===Symbol.for("react.memo_cache_sentinel")?(l=(0,t.jsx)(eU,{}),c=(0,t.jsx)(s,{}),g=(0,t.jsx)(o.default,{}),h=(0,t.jsx)(eX.default,{}),m=(0,t.jsx)(d,{}),y[20]=l,y[21]=c,y[22]=g,y[23]=h,y[24]=m):(l=y[20],c=y[21],g=y[22],h=y[23],m=y[24]);let I=r.map((e,i)=>{let a=H.get(e.id);if(!a||0===a.length)return null;let n=(0,t.jsx)(A,{id:e.id,label:e.label,tagline:e.tagline,count:a.length,effects:a,onSelect:k},e.id);return i<2?n:(0,t.jsx)(_,{id:e.id,height:600,children:n},e.id)});return y[25]===Symbol.for("react.memo_cache_sentinel")?(b=(0,t.jsx)(R,{effects:n}),f=(0,t.jsx)(P.default,{}),y[25]=b,y[26]=f):(b=y[25],f=y[26]),y[27]!==j||y[28]!==w?(u=w?.id==="scrollvideo"?(0,t.jsx)(eM,{onClose:()=>k(null),onCopy:j}):(0,t.jsx)(eb,{effect:w,onClose:()=>k(null),onCopy:j}),y[27]=j,y[28]=w,y[29]=u):u=y[29],y[30]!==S?(v=(0,t.jsx)(eF,{show:S}),y[30]=S,y[31]=v):v=y[31],y[32]!==l||y[33]!==v||y[34]!==c||y[35]!==g||y[36]!==h||y[37]!==m||y[38]!==I||y[39]!==u?(x=(0,t.jsxs)(t.Fragment,{children:[l,c,g,h,m,I,b,f,u,v]}),y[32]=l,y[33]=v,y[34]=c,y[35]=g,y[36]=h,y[37]=m,y[38]=I,y[39]=u,y[40]=x):x=y[40],x}e.s(["default",()=>e$],57128)}]);