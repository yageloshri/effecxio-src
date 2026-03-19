(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,53763,e=>{"use strict";var t=e.i(25764),n=e.i(45444),i=e.i(87726),o=e.i(3938);let r=`
@keyframes textflicker-blink {
  0%  { opacity: 1; }
  5%  { opacity: 0.85; }
  10% { opacity: 1; }
  15% { opacity: 0.4; }
  20% { opacity: 1; }
  50% { opacity: 1; }
  55% { opacity: 0.7; }
  60% { opacity: 1; }
  80% { opacity: 0.9; }
  85% { opacity: 0.3; transform: translateX(2px); }
  90% { opacity: 1; transform: translateX(0); }
  100%{ opacity: 1; }
}
`,a=(0,i.memo)(function(){let e,a,c,l,s,p,d=(0,n.c)(7),u=(0,o.useReducedMotion)(),y=(0,i.useRef)(null);d[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=r,document.head.appendChild(e),y.current=e,()=>{y.current&&(document.head.removeChild(y.current),y.current=null)}},a=[],d[0]=e,d[1]=a):(e=d[0],a=d[1]),(0,i.useEffect)(e,a),d[2]===Symbol.for("react.memo_cache_sentinel")?(c={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},l=(0,t.jsx)("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",zIndex:2}}),s=(0,t.jsx)("div",{style:{position:"absolute",inset:0,pointerEvents:"none",background:"radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5))",zIndex:1}}),d[2]=c,d[3]=l,d[4]=s):(c=d[2],l=d[3],s=d[4]);let m=u?"none":"textflicker-blink 0.15s infinite";return d[5]!==m?(p=(0,t.jsxs)("div",{style:c,children:[l,s,(0,t.jsx)("span",{style:{fontSize:36,fontWeight:700,fontFamily:"'Courier New', monospace",color:"var(--text)",textShadow:"0 0 8px color-mix(in srgb, var(--accent) 60%, transparent)",animation:m,position:"relative",zIndex:3},children:"SIGNAL LOST"})]}),d[5]=m,d[6]=p):p=d[6],p});e.s(["default",0,a])}]);