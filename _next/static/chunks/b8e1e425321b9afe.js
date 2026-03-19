(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,6314,e=>{"use strict";var t=e.i(25764),n=e.i(45444),r=e.i(87726),i=e.i(3938);let a=`
@keyframes liquidloader-rise {
  0% { transform: translateY(100%); }
  80% { transform: translateY(0%); }
  100% { transform: translateY(0%); }
}
@keyframes liquidloader-wave {
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-25%) translateY(-3px); }
  100% { transform: translateX(-50%) translateY(0); }
}
@keyframes liquidloader-cycle {
  0%, 100% { transform: translateY(100%); }
  50%, 80% { transform: translateY(0%); }
}
`,o=(0,r.memo)(function(){let e,o,l,s,d,c,u,m,f,h,y=(0,n.c)(15),p=(0,i.useReducedMotion)(),v=(0,r.useRef)(null);y[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=a,document.head.appendChild(e),v.current=e,()=>{v.current&&(document.head.removeChild(v.current),v.current=null)}},o=[],y[0]=e,y[1]=o):(e=y[0],o=y[1]),(0,r.useEffect)(e,o),y[2]===Symbol.for("react.memo_cache_sentinel")?(l={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},s={width:100,height:100,borderRadius:"50%",border:"2px solid var(--border)",position:"relative",overflow:"hidden"},y[2]=l,y[3]=s):(l=y[2],s=y[3]);let b=p?"none":"liquidloader-cycle 4s ease-in-out infinite";y[4]!==b?(d={position:"absolute",bottom:0,left:0,width:"100%",height:"100%",animation:b},y[4]=b,y[5]=d):d=y[5];let g=p?"none":"liquidloader-wave 2s linear infinite";return y[6]!==g?(c=(0,t.jsx)("div",{style:{position:"absolute",top:-6,left:"-50%",width:"200%",height:12,borderRadius:"40%",background:"var(--accent)",opacity:.6,animation:g}}),y[6]=g,y[7]=c):c=y[7],y[8]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("div",{style:{position:"absolute",top:4,left:0,width:"100%",height:"100%",background:"linear-gradient(to top, var(--accent), var(--accent3))",opacity:.85}}),y[8]=u):u=y[8],y[9]!==d||y[10]!==c?(m=(0,t.jsxs)("div",{style:d,children:[c,u]}),y[9]=d,y[10]=c,y[11]=m):m=y[11],y[12]===Symbol.for("react.memo_cache_sentinel")?(f=(0,t.jsx)("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2},children:(0,t.jsx)("span",{style:{fontSize:16,fontWeight:700,color:"var(--text)",mixBlendMode:"difference"},children:"LOAD"})}),y[12]=f):f=y[12],y[13]!==m?(h=(0,t.jsx)("div",{style:l,children:(0,t.jsxs)("div",{style:s,children:[m,f]})}),y[13]=m,y[14]=h):h=y[14],h});e.s(["default",0,o])}]);