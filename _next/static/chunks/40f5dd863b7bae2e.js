(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,44731,t=>{"use strict";var e=t.i(25764),n=t.i(45444),a=t.i(87726),r=t.i(3938);let s=`
@keyframes glitch-1 {
  0% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
  10% { clip-path: inset(50% 0 10% 0); transform: translate(3px, -1px); }
  20% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 3px); }
  30% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -3px); }
  40% { clip-path: inset(5% 0 85% 0); transform: translate(-1px, 1px); }
  50% { clip-path: inset(60% 0 20% 0); transform: translate(3px, 2px); }
  60% { clip-path: inset(30% 0 50% 0); transform: translate(-3px, -2px); }
  70% { clip-path: inset(70% 0 10% 0); transform: translate(1px, 3px); }
  80% { clip-path: inset(15% 0 65% 0); transform: translate(-2px, -1px); }
  90% { clip-path: inset(45% 0 35% 0); transform: translate(2px, 1px); }
  100% { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 2px); }
}

@keyframes glitch-2 {
  0% { clip-path: inset(65% 0 10% 0); transform: translate(3px, -2px); }
  10% { clip-path: inset(10% 0 75% 0); transform: translate(-3px, 1px); }
  20% { clip-path: inset(40% 0 30% 0); transform: translate(2px, -3px); }
  30% { clip-path: inset(5% 0 80% 0); transform: translate(-2px, 3px); }
  40% { clip-path: inset(75% 0 5% 0); transform: translate(1px, -1px); }
  50% { clip-path: inset(25% 0 55% 0); transform: translate(-3px, -2px); }
  60% { clip-path: inset(55% 0 25% 0); transform: translate(3px, 2px); }
  70% { clip-path: inset(15% 0 70% 0); transform: translate(-1px, -3px); }
  80% { clip-path: inset(85% 0 5% 0); transform: translate(2px, 1px); }
  90% { clip-path: inset(35% 0 45% 0); transform: translate(-2px, -1px); }
  100% { clip-path: inset(65% 0 10% 0); transform: translate(3px, -2px); }
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  20% { transform: skew(-2deg); }
  40% { transform: skew(0.5deg); }
  60% { transform: skew(-0.5deg); }
  80% { transform: skew(1.5deg); }
  100% { transform: skew(0deg); }
}
`,i=(0,a.memo)(function(){let t,i,l,p,o,c,m,h,x,f,d=(0,n.c)(17),u=(0,r.useReducedMotion)(),g=(0,a.useRef)(null);d[0]===Symbol.for("react.memo_cache_sentinel")?(t=()=>{let t=document.createElement("style");return t.textContent=s,document.head.appendChild(t),g.current=t,()=>{g.current&&(document.head.removeChild(g.current),g.current=null)}},i=[],d[0]=t,d[1]=i):(t=d[0],i=d[1]),(0,a.useEffect)(t,i);let y=u?"none":"glitch-skew 4s infinite linear alternate";d[2]!==y?(l={fontSize:48,fontWeight:900,fontFamily:"'Space Mono', monospace",color:"var(--text)",letterSpacing:6,position:"relative",display:"inline-block",animation:y},d[2]=y,d[3]=l):l=d[3];let v=l;d[4]===Symbol.for("react.memo_cache_sentinel")?(p={content:'"GLITCH"',position:"absolute",top:0,left:0,width:"100%",height:"100%",fontSize:48,fontWeight:900,fontFamily:"'Space Mono', monospace",letterSpacing:6,pointerEvents:"none"},d[4]=p):p=d[4];let k=p;d[5]===Symbol.for("react.memo_cache_sentinel")?(o={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},c={position:"relative"},d[5]=o,d[6]=c):(o=d[5],c=d[6]),d[7]!==v?(m=(0,e.jsx)("span",{style:v,children:"GLITCH"}),d[7]=v,d[8]=m):m=d[8];let w=u?"none":"glitch-1 0.7s infinite linear alternate-reverse";d[9]!==w?(h=(0,e.jsx)("span",{"aria-hidden":!0,style:{...k,color:"var(--accent2)",animation:w,mixBlendMode:"screen"},children:"GLITCH"}),d[9]=w,d[10]=h):h=d[10];let b=u?"none":"glitch-2 0.5s infinite linear alternate-reverse";return d[11]!==b?(x=(0,e.jsx)("span",{"aria-hidden":!0,style:{...k,color:"var(--accent3)",animation:b,mixBlendMode:"screen"},children:"GLITCH"}),d[11]=b,d[12]=x):x=d[12],d[13]!==x||d[14]!==m||d[15]!==h?(f=(0,e.jsx)("div",{style:o,children:(0,e.jsxs)("div",{style:c,children:[m,h,x]})}),d[13]=x,d[14]=m,d[15]=h,d[16]=f):f=d[16],f});t.s(["default",0,i])}]);