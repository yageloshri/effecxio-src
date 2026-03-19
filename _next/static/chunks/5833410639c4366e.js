(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,65066,e=>{"use strict";var t=e.i(25764),r=e.i(45444),o=e.i(87726),l=e.i(3938);let i=`
@keyframes blurreveal-in {
  from {
    opacity: 0;
    filter: blur(20px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
  }
}
`;function n(e){return e+1}let c=(0,o.memo)(function(){let e,c,a,u,d,s,m=(0,r.c)(8),f=(0,l.useReducedMotion)(),h=(0,o.useRef)(null),[y,b]=(0,o.useState)(0);m[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=i,document.head.appendChild(e),h.current=e,()=>{h.current&&(document.head.removeChild(h.current),h.current=null)}},c=[],m[0]=e,m[1]=c):(e=m[0],c=m[1]),(0,o.useEffect)(e,c),m[2]===Symbol.for("react.memo_cache_sentinel")?(a=[{text:"BLUR REVEAL",size:38,weight:900,color:"var(--text)",delay:0},{text:"כניסה חלומית",size:16,weight:400,color:"var(--muted)",delay:.3},{text:"מטשטוש לבהירות",size:14,weight:400,color:"var(--muted)",delay:.6}],m[2]=a):a=m[2];let p=a;return m[3]===Symbol.for("react.memo_cache_sentinel")?(u=()=>b(n),d={width:"100%",height:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",cursor:"pointer",gap:8},m[3]=u,m[4]=d):(u=m[3],d=m[4]),m[5]!==y||m[6]!==f?(s=(0,t.jsx)("div",{onClick:u,style:d,children:p.map((e,r)=>(0,t.jsx)("div",{style:{fontSize:e.size,fontWeight:e.weight,color:e.color,opacity:+!!f,filter:f?"none":"blur(20px)",animation:f?"none":`blurreveal-in 1s cubic-bezier(0.25,0.46,0.45,0.94) ${e.delay}s forwards`},children:e.text},`${y}-${r}`))}),m[5]=y,m[6]=f,m[7]=s):s=m[7],s});e.s(["default",0,c])}]);