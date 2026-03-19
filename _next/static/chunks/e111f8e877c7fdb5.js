(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,81881,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),a=e.i(3938);let o=`
@keyframes preview-elastic-bounce {
  0%   { transform: scale(1, 1); }
  10%  { transform: scale(1.15, 0.85); }
  20%  { transform: scale(0.85, 1.15); }
  30%  { transform: scale(1.1, 0.9); }
  40%  { transform: scale(0.95, 1.05); }
  50%  { transform: scale(1.05, 0.95); }
  60%  { transform: scale(0.98, 1.02); }
  70%  { transform: scale(1.02, 0.98); }
  80%  { transform: scale(0.99, 1.01); }
  90%  { transform: scale(1.01, 0.99); }
  100% { transform: scale(1, 1); }
}
`,c=(0,n.memo)(function(){let e,c,s,l,i,m,u,d=(0,r.c)(11),f=(0,a.useReducedMotion)(),[h,b]=(0,n.useState)(!1),p=(0,n.useRef)(null);d[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=o,document.head.appendChild(e),p.current=e,()=>{p.current&&(document.head.removeChild(p.current),p.current=null)}},c=[],d[0]=e,d[1]=c):(e=d[0],c=d[1]),(0,n.useEffect)(e,c),d[2]!==f?(s=()=>{f||(b(!1),requestAnimationFrame(()=>{b(!0)}))},d[2]=f,d[3]=s):s=d[3];let g=s;d[4]===Symbol.for("react.memo_cache_sentinel")?(l={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},d[4]=l):l=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(i=()=>b(!1),d[5]=i):i=d[5];let v=h?"preview-elastic-bounce 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)":"none";return d[6]!==v?(m={padding:"14px 40px",borderRadius:12,border:"2px solid var(--accent)",background:"var(--accent)",color:"var(--bg)",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",transformOrigin:"center center",willChange:"transform",animation:v,letterSpacing:1},d[6]=v,d[7]=m):m=d[7],d[8]!==g||d[9]!==m?(u=(0,t.jsx)("div",{style:l,children:(0,t.jsx)("button",{onMouseEnter:g,onAnimationEnd:i,style:m,children:"Elastic"})}),d[8]=g,d[9]=m,d[10]=u):u=d[10],u});e.s(["default",0,c])}]);