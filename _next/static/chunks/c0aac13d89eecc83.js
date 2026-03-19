(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,40189,e=>{"use strict";var t=e.i(25764),i=e.i(45444),r=e.i(87726),n=e.i(3938);let o=`
@keyframes progressbar-fill {
  0% { width: 0%; }
  80% { width: 100%; }
  100% { width: 100%; }
}
@keyframes progressbar-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes progressbar-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`,a=(0,r.memo)(function(){let e,a,s,l,c,d,u,h=(0,i.c)(11),m=(0,n.useReducedMotion)(),g=(0,r.useRef)(null);h[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=o,document.head.appendChild(e),g.current=e,()=>{g.current&&(document.head.removeChild(g.current),g.current=null)}},a=[],h[0]=e,h[1]=a):(e=h[0],a=h[1]),(0,r.useEffect)(e,a),h[2]===Symbol.for("react.memo_cache_sentinel")?(s={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative",flexDirection:"column",gap:16},l={width:220,height:12,borderRadius:6,background:"var(--surface)",overflow:"hidden",position:"relative"},h[2]=s,h[3]=l):(s=h[2],l=h[3]);let f=m?"none":"progressbar-fill 2.5s ease-in-out infinite, progressbar-shimmer 1.5s linear infinite";h[4]!==f?(c=(0,t.jsx)("div",{style:l,children:(0,t.jsx)("div",{style:{height:"100%",borderRadius:6,background:"linear-gradient(90deg, var(--accent), var(--accent3))",backgroundSize:"400% 100%",animation:f}})}),h[4]=f,h[5]=c):c=h[5];let p=m?"none":"progressbar-pulse 2.5s ease-in-out infinite";return h[6]!==p?(d=(0,t.jsx)("span",{style:{fontSize:13,fontWeight:600,color:"var(--muted)",letterSpacing:1,animation:p},children:"Loading..."}),h[6]=p,h[7]=d):d=h[7],h[8]!==c||h[9]!==d?(u=(0,t.jsxs)("div",{style:s,children:[c,d]}),h[8]=c,h[9]=d,h[10]=u):u=h[10],u});e.s(["default",0,a])}]);