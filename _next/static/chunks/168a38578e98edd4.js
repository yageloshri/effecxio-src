(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,89490,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),o=e.i(3938);let i=`
@keyframes textwave3d-rotate {
  0%, 100% {
    transform: rotateX(0deg);
  }
  25% {
    transform: rotateX(40deg);
  }
  50% {
    transform: rotateX(0deg);
  }
  75% {
    transform: rotateX(-40deg);
  }
}
`,a=(0,n.memo)(function(){let e,a,l,s,d,c,u=(0,r.c)(8),m=(0,o.useReducedMotion)(),f=(0,n.useRef)(null);return u[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=i,document.head.appendChild(e),f.current=e,()=>{f.current&&(document.head.removeChild(f.current),f.current=null)}},a=[],u[0]=e,u[1]=a):(e=u[0],a=u[1]),(0,n.useEffect)(e,a),u[2]===Symbol.for("react.memo_cache_sentinel")?(l={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},s={display:"flex",perspective:500},u[2]=l,u[3]=s):(l=u[2],s=u[3]),u[4]!==m?(d="3D WAVE".split("").map((e,r)=>(0,t.jsx)("span",{style:{fontSize:44,fontWeight:900,color:"var(--text)",display:"inline-block",width:" "===e?18:void 0,transformStyle:"preserve-3d",animation:m?"none":`textwave3d-rotate 2s ease-in-out ${.12*r}s infinite`},children:" "===e?" ":e},r)),u[4]=m,u[5]=d):d=u[5],u[6]!==d?(c=(0,t.jsx)("div",{style:l,children:(0,t.jsx)("div",{style:s,children:d})}),u[6]=d,u[7]=c):c=u[7],c});e.s(["default",0,a])}]);