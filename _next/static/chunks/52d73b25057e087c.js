(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94282,e=>{"use strict";var t=e.i(25764),r=e.i(45444),o=e.i(87726),n=e.i(3938);let a=`
@keyframes morphloader-shape {
  0%, 100% {
    border-radius: 50%;
    transform: rotate(0deg);
    clip-path: none;
    background: var(--accent);
  }
  33% {
    border-radius: 12px;
    transform: rotate(90deg);
    clip-path: none;
    background: var(--accent2);
  }
  66% {
    border-radius: 0;
    transform: rotate(180deg);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    background: var(--accent3);
  }
}
@keyframes morphloader-pulse {
  0%, 100% { transform: scale(1); opacity: 0.25; }
  50% { transform: scale(1.6); opacity: 0; }
}
`,i=(0,o.memo)(function(){let e,i,s,d,c,l,u,h=(0,r.c)(11),m=(0,n.useReducedMotion)(),p=(0,o.useRef)(null);h[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=a,document.head.appendChild(e),p.current=e,()=>{p.current&&(document.head.removeChild(p.current),p.current=null)}},i=[],h[0]=e,h[1]=i):(e=h[0],i=h[1]),(0,o.useEffect)(e,i),h[2]===Symbol.for("react.memo_cache_sentinel")?(s={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},d={position:"relative",width:64,height:64},h[2]=s,h[3]=d):(s=h[2],d=h[3]);let f=m?"none":"morphloader-pulse 2s ease-in-out infinite";h[4]!==f?(c=(0,t.jsx)("div",{style:{position:"absolute",inset:-8,borderRadius:"50%",border:"2px solid var(--accent)",animation:f}}),h[4]=f,h[5]=c):c=h[5];let b=m?"none":"morphloader-shape 6s ease-in-out infinite";return h[6]!==b?(l=(0,t.jsx)("div",{style:{width:64,height:64,background:"var(--accent)",borderRadius:"50%",animation:b,willChange:"border-radius, transform, clip-path"}}),h[6]=b,h[7]=l):l=h[7],h[8]!==c||h[9]!==l?(u=(0,t.jsx)("div",{style:s,children:(0,t.jsxs)("div",{style:d,children:[c,l]})}),h[8]=c,h[9]=l,h[10]=u):u=h[10],u});e.s(["default",0,i])}]);