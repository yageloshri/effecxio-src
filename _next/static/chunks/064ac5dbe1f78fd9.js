(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,22532,e=>{"use strict";var t=e.i(25764),n=e.i(45444),i=e.i(87726),a=e.i(3938);let r=`
@keyframes mesh-drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(60px, 40px) scale(1.15); }
}
@keyframes mesh-drift2 {
  0%, 100% { transform: translate(0, 0) scale(1.1); }
  50% { transform: translate(-50px, 30px) scale(0.9); }
}
@keyframes mesh-drift3 {
  0%, 100% { transform: translate(0, 0) scale(0.95); }
  50% { transform: translate(40px, -35px) scale(1.1); }
}
@keyframes mesh-drift4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -25px) scale(1.1); }
}
`,o=[{size:140,color:"var(--accent)",animation:"mesh-drift1 8s ease-in-out infinite",top:"-10%",left:"-5%",opacity:.4},{size:120,color:"var(--accent2)",animation:"mesh-drift2 10s ease-in-out infinite",top:"25%",right:"-5%",opacity:.35},{size:110,color:"var(--accent3)",animation:"mesh-drift3 12s ease-in-out infinite",bottom:"-10%",left:"25%",opacity:.35},{size:100,color:"#ff6b35",animation:"mesh-drift4 9s ease-in-out infinite",top:"40%",left:"5%",opacity:.3}],s=(0,i.memo)(function(){let e,s,l,c,m,f,d=(0,n.c)(8),p=(0,a.useReducedMotion)(),h=(0,i.useRef)(null);return d[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=r,document.head.appendChild(e),h.current=e,()=>{h.current&&(document.head.removeChild(h.current),h.current=null)}},s=[],d[0]=e,d[1]=s):(e=d[0],s=d[1]),(0,i.useEffect)(e,s),d[2]===Symbol.for("react.memo_cache_sentinel")?(l={width:"100%",height:220,position:"relative",overflow:"hidden",background:"var(--bg)"},d[2]=l):l=d[2],d[3]!==p?(c=o.map((e,n)=>(0,t.jsx)("div",{style:{position:"absolute",width:e.size,height:e.size,borderRadius:"50%",background:e.color,filter:"blur(50px)",opacity:e.opacity,top:e.top,left:e.left,right:e.right,bottom:e.bottom,animation:p?"none":e.animation,willChange:"transform",mixBlendMode:"screen"}},n)),d[3]=p,d[4]=c):c=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(m=(0,t.jsx)("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10},children:(0,t.jsx)("span",{style:{fontSize:14,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"var(--text)",opacity:.5,pointerEvents:"none"},children:"Mesh Gradient"})}),d[5]=m):m=d[5],d[6]!==c?(f=(0,t.jsxs)("div",{style:l,children:[c,m]}),d[6]=c,d[7]=f):f=d[7],f});e.s(["default",0,s])}]);