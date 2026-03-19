(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94224,e=>{"use strict";var t=e.i(25764),r=e.i(45444),a=e.i(87726),o=e.i(3938);let n=`
@keyframes aurora-1 {
  0%, 100% { transform: translate(0%, 0%) scale(1); filter: hue-rotate(0deg); }
  25% { transform: translate(30%, -20%) scale(1.1); filter: hue-rotate(30deg); }
  50% { transform: translate(-10%, 25%) scale(0.9); filter: hue-rotate(60deg); }
  75% { transform: translate(-25%, -10%) scale(1.05); filter: hue-rotate(90deg); }
}

@keyframes aurora-2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); filter: hue-rotate(0deg); }
  25% { transform: translate(-25%, 20%) scale(0.95); filter: hue-rotate(-40deg); }
  50% { transform: translate(20%, -15%) scale(1.15); filter: hue-rotate(-80deg); }
  75% { transform: translate(10%, 30%) scale(1); filter: hue-rotate(-120deg); }
}

@keyframes aurora-3 {
  0%, 100% { transform: translate(0%, 0%) scale(1.05); filter: hue-rotate(0deg); }
  33% { transform: translate(15%, 25%) scale(0.9); filter: hue-rotate(50deg); }
  66% { transform: translate(-20%, -20%) scale(1.1); filter: hue-rotate(100deg); }
}
`,i=[{size:160,color:"var(--accent)",animation:"aurora-1 8s ease-in-out infinite",top:"10%",left:"15%",opacity:.35},{size:130,color:"var(--accent2)",animation:"aurora-2 10s ease-in-out infinite",top:"30%",left:"55%",opacity:.3},{size:110,color:"var(--accent3)",animation:"aurora-3 12s ease-in-out infinite",top:"50%",left:"30%",opacity:.3}],l=(0,a.memo)(function(){let e,l,s,c,u,f,d=(0,r.c)(8),m=(0,o.useReducedMotion)(),h=(0,a.useRef)(null);return d[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=n,document.head.appendChild(e),h.current=e,()=>{h.current&&(document.head.removeChild(h.current),h.current=null)}},l=[],d[0]=e,d[1]=l):(e=d[0],l=d[1]),(0,a.useEffect)(e,l),d[2]===Symbol.for("react.memo_cache_sentinel")?(s={width:"100%",height:220,position:"relative",overflow:"hidden",background:"var(--bg)",borderRadius:0},d[2]=s):s=d[2],d[3]!==m?(c=i.map((e,r)=>(0,t.jsx)("div",{style:{position:"absolute",width:e.size,height:e.size,borderRadius:"50%",background:e.color,filter:"blur(50px)",opacity:e.opacity,top:e.top,left:e.left,animation:m?"none":e.animation,willChange:"transform, filter"}},r)),d[3]=m,d[4]=c):c=d[4],d[5]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:10},children:(0,t.jsx)("span",{style:{fontSize:14,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:"var(--text)",opacity:.5,pointerEvents:"none"},children:"Aurora"})}),d[5]=u):u=d[5],d[6]!==c?(f=(0,t.jsxs)("div",{style:s,children:[c,u]}),d[6]=c,d[7]=f):f=d[7],f});e.s(["default",0,l])}]);