(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,25100,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),i=e.i(3938);let s=`
@keyframes preview-glitch-r {
  0%   { clip-path: inset(20% 0 40% 0); transform: translate(-4px, 2px); }
  25%  { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
  50%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, -1px); }
  75%  { clip-path: inset(50% 0 20% 0); transform: translate(3px, 1px); }
  100% { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 3px); }
}
@keyframes preview-glitch-b {
  0%   { clip-path: inset(50% 0 20% 0); transform: translate(4px, -1px); }
  25%  { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 2px); }
  50%  { clip-path: inset(70% 0 5% 0); transform: translate(3px, 1px); }
  75%  { clip-path: inset(30% 0 40% 0); transform: translate(-3px, -2px); }
  100% { clip-path: inset(5% 0 75% 0); transform: translate(2px, -3px); }
}
@keyframes preview-glitch-skew {
  0%   { transform: skew(0deg); }
  25%  { transform: skew(-2deg); }
  50%  { transform: skew(1deg); }
  75%  { transform: skew(-1deg); }
  100% { transform: skew(0deg); }
}
`,a=(0,n.memo)(function(){let e,a,o,l,p,c,f,d,h,m,u=(0,r.c)(19),x=(0,i.useReducedMotion)(),[g,v]=(0,n.useState)(!1),w=(0,n.useRef)(null);u[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=s,document.head.appendChild(e),w.current=e,()=>{w.current&&(document.head.removeChild(w.current),w.current=null)}},a=[],u[0]=e,u[1]=a):(e=u[0],a=u[1]),(0,n.useEffect)(e,a);let b=g&&!x,y=.8*!!b;u[2]!==y?(o={position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,letterSpacing:3,fontFamily:"'Courier New', monospace",overflow:"hidden",pointerEvents:"none",opacity:y,background:"var(--surface)"},u[2]=y,u[3]=o):o=u[3];let k=o;u[4]===Symbol.for("react.memo_cache_sentinel")?(l={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},p=()=>v(!0),c=()=>v(!1),u[4]=l,u[5]=p,u[6]=c):(l=u[4],p=u[5],c=u[6]);let C=b?"preview-glitch-skew 0.5s steps(4) infinite":"none";u[7]!==C?(f={position:"relative",padding:"14px 44px",fontSize:15,fontWeight:700,letterSpacing:3,fontFamily:"'Courier New', monospace",color:"var(--text)",background:"var(--surface)",border:"2px solid var(--border)",cursor:"pointer",textTransform:"uppercase",animation:C},u[7]=C,u[8]=f):f=u[8];let S=b?"preview-glitch-r 0.3s steps(2) infinite":"none";u[9]!==k||u[10]!==S?(d=(0,t.jsx)("span",{"aria-hidden":!0,style:{...k,color:"#0ff",borderLeft:"2px solid #0ff",borderRight:"2px solid #0ff",animation:S},children:"GLITCH"}),u[9]=k,u[10]=S,u[11]=d):d=u[11];let T=b?"preview-glitch-b 0.3s steps(2) infinite":"none";return u[12]!==k||u[13]!==T?(h=(0,t.jsx)("span",{"aria-hidden":!0,style:{...k,color:"#f0f",borderLeft:"2px solid #f0f",borderRight:"2px solid #f0f",animation:T},children:"GLITCH"}),u[12]=k,u[13]=T,u[14]=h):h=u[14],u[15]!==d||u[16]!==h||u[17]!==f?(m=(0,t.jsx)("div",{style:l,children:(0,t.jsxs)("div",{onMouseEnter:p,onMouseLeave:c,style:f,children:["GLITCH",d,h]})}),u[15]=d,u[16]=h,u[17]=f,u[18]=m):m=u[18],m});e.s(["default",0,a])}]);