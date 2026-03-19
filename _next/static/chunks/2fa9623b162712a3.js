(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,56760,e=>{"use strict";var t=e.i(25764),n=e.i(45444),r=e.i(87726),a=e.i(3938);let o=`
@keyframes glowpulse-breathe {
  0% {
    text-shadow:
      0 0 4px color-mix(in srgb, var(--accent) 50%, transparent),
      0 0 11px color-mix(in srgb, var(--accent) 30%, transparent),
      0 0 19px color-mix(in srgb, var(--accent) 15%, transparent);
  }
  100% {
    text-shadow:
      0 0 8px color-mix(in srgb, var(--accent) 80%, transparent),
      0 0 25px color-mix(in srgb, var(--accent) 50%, transparent),
      0 0 46px color-mix(in srgb, var(--accent) 30%, transparent),
      0 0 80px color-mix(in srgb, var(--accent) 15%, transparent);
  }
}
`,c=(0,r.memo)(function(){let e,c,i,l,s,m,u=(0,n.c)(8),d=(0,a.useReducedMotion)(),p=(0,r.useRef)(null);u[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=o,document.head.appendChild(e),p.current=e,()=>{p.current&&(document.head.removeChild(p.current),p.current=null)}},c=[],u[0]=e,u[1]=c):(e=u[0],c=u[1]),(0,r.useEffect)(e,c),u[2]===Symbol.for("react.memo_cache_sentinel")?(i={width:"100%",height:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",gap:12},u[2]=i):i=u[2];let x=d?"none":"glowpulse-breathe 2s ease-in-out infinite alternate";return u[3]!==x?(l=(0,t.jsx)("span",{style:{fontSize:48,fontWeight:900,color:"var(--text)",animation:x},children:"GLOW"}),u[3]=x,u[4]=l):l=u[4],u[5]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)("span",{style:{fontSize:14,color:"var(--muted)"},children:"זוהר ניאון פועם"}),u[5]=s):s=u[5],u[6]!==l?(m=(0,t.jsxs)("div",{style:i,children:[l,s]}),u[6]=l,u[7]=m):m=u[7],m});e.s(["default",0,c])}]);