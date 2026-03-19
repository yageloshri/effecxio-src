(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,45358,e=>{"use strict";var t=e.i(25764),o=e.i(45444),r=e.i(87726),n=e.i(3938);let s=`
@keyframes draw-ring {
  0% { stroke-dashoffset: 440; opacity: 1; }
  80% { stroke-dashoffset: 0; opacity: 1; }
  90% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes draw-ring-delayed {
  0% { stroke-dashoffset: 440; opacity: 0.5; }
  80% { stroke-dashoffset: 0; opacity: 0.5; }
  90% { stroke-dashoffset: 0; opacity: 0.5; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes pulse-center {
  0%, 100% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

@keyframes counter-text {
  0% { opacity: 0.4; }
  80% { opacity: 1; }
  100% { opacity: 0.4; }
}
`,i=2*Math.PI*70,a=(0,r.memo)(function(){let e,a,c,l,f,d,h,y,u,m,p,k,x,g=(0,o.c)(22),v=(0,n.useReducedMotion)(),j=(0,r.useRef)(null);g[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=s,document.head.appendChild(e),j.current=e,()=>{j.current&&(document.head.removeChild(j.current),j.current=null)}},a=[],g[0]=e,g[1]=a):(e=g[0],a=g[1]),(0,r.useEffect)(e,a);let b=v?"0s":"3s";g[2]===Symbol.for("react.memo_cache_sentinel")?(c={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},l={position:"relative",width:160,height:160},g[2]=c,g[3]=l):(c=g[2],l=g[3]),g[4]===Symbol.for("react.memo_cache_sentinel")?(f={position:"absolute",top:0,left:0},d=(0,t.jsx)("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"var(--surface)",strokeWidth:"4"}),g[4]=f,g[5]=d):(f=g[4],d=g[5]);let w=v?"none":`draw-ring-delayed ${b} ease-in-out infinite`;g[6]!==w?(h=(0,t.jsx)("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"var(--accent3)",strokeWidth:"2",strokeDasharray:i,strokeDashoffset:i,strokeLinecap:"round",opacity:"0.3",transform:"rotate(-90 80 80)",style:{animation:w}}),g[6]=w,g[7]=h):h=g[7];let C=v?"none":`draw-ring ${b} ease-in-out infinite`;g[8]!==C?(y=(0,t.jsx)("circle",{cx:"80",cy:"80",r:"70",fill:"none",stroke:"var(--accent)",strokeWidth:"4",strokeDasharray:i,strokeDashoffset:i,strokeLinecap:"round",transform:"rotate(-90 80 80)",style:{animation:C,willChange:"stroke-dashoffset"}}),g[8]=C,g[9]=y):y=g[9];let _=v?"none":`pulse-center ${b} ease-in-out infinite`;g[10]!==_?(u=(0,t.jsx)("circle",{cx:"80",cy:"80",r:"8",fill:"var(--accent)",style:{transformOrigin:"80px 80px",animation:_}}),g[10]=_,g[11]=u):u=g[11],g[12]!==u||g[13]!==h||g[14]!==y?(m=(0,t.jsxs)("svg",{viewBox:"0 0 160 160",width:"160",height:"160",style:f,children:[d,h,y,u]}),g[12]=u,g[13]=h,g[14]=y,g[15]=m):m=g[15],g[16]===Symbol.for("react.memo_cache_sentinel")?(p={position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",pointerEvents:"none"},g[16]=p):p=g[16];let S=v?"none":`counter-text ${b} ease-in-out infinite`;return g[17]!==S?(k=(0,t.jsx)("div",{style:p,children:(0,t.jsx)("span",{style:{fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",fontWeight:700,animation:S},children:"scroll"})}),g[17]=S,g[18]=k):k=g[18],g[19]!==m||g[20]!==k?(x=(0,t.jsx)("div",{style:c,children:(0,t.jsxs)("div",{style:l,children:[m,k]})}),g[19]=m,g[20]=k,g[21]=x):x=g[21],x});e.s(["default",0,a])}]);