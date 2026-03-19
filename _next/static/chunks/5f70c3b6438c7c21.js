(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,62070,e=>{"use strict";var t=e.i(25764),n=e.i(45444),r=e.i(87726),o=e.i(3938);let l=`
@keyframes bounceletters-drop {
  0% {
    opacity: 0;
    transform: translateY(-80px) scale(0.6);
  }
  60% {
    opacity: 1;
    transform: translateY(8px) scale(1.05);
  }
  80% {
    transform: translateY(-4px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`;function c(e){return e+1}let a=(0,r.memo)(function(){let e,a,s,i,u,d,m,f,p,h=(0,n.c)(14),y=(0,o.useReducedMotion)(),b=(0,r.useRef)(null),[x,v]=(0,r.useState)(0);return h[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=l,document.head.appendChild(e),b.current=e,()=>{b.current&&(document.head.removeChild(b.current),b.current=null)}},a=[],h[0]=e,h[1]=a):(e=h[0],a=h[1]),(0,r.useEffect)(e,a),h[2]===Symbol.for("react.memo_cache_sentinel")?(s=()=>v(c),i={width:"100%",height:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",cursor:"pointer",gap:10},h[2]=s,h[3]=i):(s=h[2],i=h[3]),h[4]===Symbol.for("react.memo_cache_sentinel")?(u={display:"flex"},h[4]=u):u=h[4],h[5]!==x||h[6]!==y?(d="BOUNCE".split("").map((e,n)=>(0,t.jsx)("span",{style:{fontSize:48,fontWeight:900,color:"var(--text)",display:"inline-block",opacity:+!!y,animation:y?"none":`bounceletters-drop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${.08*n}s forwards`},children:e},`${x}-${n}`)),h[5]=x,h[6]=y,h[7]=d):d=h[7],h[8]!==x||h[9]!==d?(m=(0,t.jsx)("div",{style:u,children:d},x),h[8]=x,h[9]=d,h[10]=m):m=h[10],h[11]===Symbol.for("react.memo_cache_sentinel")?(f=(0,t.jsx)("span",{style:{fontSize:12,color:"var(--muted)"},children:"לחץ להפעלה מחדש"}),h[11]=f):f=h[11],h[12]!==m?(p=(0,t.jsxs)("div",{onClick:s,style:i,children:[m,f]}),h[12]=m,h[13]=p):p=h[13],p});e.s(["default",0,a])}]);