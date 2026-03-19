(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,85552,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),i=e.i(3938);let a=`
@keyframes noise-shift {
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
  100% { transform: translate(5%, 0); }
}

@keyframes noise-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(200,245,59,0.08), inset 0 0 30px rgba(200,245,59,0.03); }
  50% { box-shadow: 0 0 40px rgba(68,170,255,0.1), inset 0 0 40px rgba(68,170,255,0.04); }
}
`,s=(0,n.memo)(function(){let e,s,o,l,c,d,f,h,p,m=(0,r.c)(14),u=(0,i.useReducedMotion)(),x=(0,n.useRef)(null);m[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=a,document.head.appendChild(e),x.current=e,()=>{x.current&&(document.head.removeChild(x.current),x.current=null)}},s=[],m[0]=e,m[1]=s):(e=m[0],s=m[1]),(0,n.useEffect)(e,s),m[2]===Symbol.for("react.memo_cache_sentinel")?(o={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},m[2]=o):o=m[2];let b=u?"none":"noise-glow 6s ease-in-out infinite";m[3]!==b?(l={position:"relative",width:"80%",maxWidth:280,padding:"28px 24px",borderRadius:16,background:"rgba(17,17,17,0.75)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.06)",overflow:"hidden",animation:b},m[3]=b,m[4]=l):l=m[4];let g=u?"none":"noise-shift 0.5s steps(5) infinite";return m[5]!==g?(c={position:"absolute",inset:-20,opacity:.12,pointerEvents:"none",animation:g,willChange:"transform"},m[5]=g,m[6]=c):c=m[6],m[7]===Symbol.for("react.memo_cache_sentinel")?(d=(0,t.jsxs)("svg",{width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsxs)("filter",{id:"noise-filter",children:[(0,t.jsx)("feTurbulence",{type:"fractalNoise",baseFrequency:"0.85",numOctaves:"4",stitchTiles:"stitch"}),(0,t.jsx)("feColorMatrix",{type:"saturate",values:"0"})]}),(0,t.jsx)("rect",{width:"100%",height:"100%",filter:"url(#noise-filter)"})]}),m[7]=d):d=m[7],m[8]!==c?(f=(0,t.jsx)("div",{style:c,children:d}),m[8]=c,m[9]=f):f=m[9],m[10]===Symbol.for("react.memo_cache_sentinel")?(h=(0,t.jsxs)("div",{style:{position:"relative",zIndex:2},children:[(0,t.jsx)("div",{style:{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)",marginBottom:8},children:"Glass Card"}),(0,t.jsx)("div",{style:{fontSize:14,lineHeight:1.6,color:"var(--text)",opacity:.8},children:"Noise texture overlay with backdrop blur for frosted glass."}),(0,t.jsxs)("div",{style:{marginTop:14,display:"flex",gap:8},children:[(0,t.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:20,background:"rgba(200,245,59,0.1)",color:"var(--accent)",fontSize:11,fontWeight:600},children:"SVG Filter"}),(0,t.jsx)("span",{style:{display:"inline-block",padding:"4px 12px",borderRadius:20,background:"rgba(68,170,255,0.1)",color:"var(--accent3)",fontSize:11,fontWeight:600},children:"Backdrop Blur"})]})]}),m[10]=h):h=m[10],m[11]!==l||m[12]!==f?(p=(0,t.jsx)("div",{style:o,children:(0,t.jsxs)("div",{style:l,children:[f,h]})}),m[11]=l,m[12]=f,m[13]=p):p=m[13],p});e.s(["default",0,s])}]);