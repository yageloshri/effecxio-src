(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,28911,e=>{"use strict";var t=e.i(25764),o=e.i(45444),r=e.i(87726),n=e.i(3938);let i=`
@keyframes preview-drag-path {
  0%   { left: 20px;  top: 30px; }
  15%  { left: 100px; top: 20px; }
  30%  { left: 160px; top: 60px; }
  50%  { left: 120px; top: 100px; }
  65%  { left: 40px;  top: 80px; }
  80%  { left: 80px;  top: 40px; }
  100% { left: 20px;  top: 30px; }
}
`,l=(0,r.memo)(function(){let e,l,a,d,c,s,p,u=(0,o.c)(9),h=(0,n.useReducedMotion)(),f=(0,r.useRef)(null);u[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=i,document.head.appendChild(e),f.current=e,()=>{f.current&&(document.head.removeChild(f.current),f.current=null)}},l=[],u[0]=e,u[1]=l):(e=u[0],l=u[1]),(0,r.useEffect)(e,l),u[2]===Symbol.for("react.memo_cache_sentinel")?(a={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},d={position:"relative",width:240,height:160,border:"2px dashed var(--border)",borderRadius:14,background:"var(--surface)"},u[2]=a,u[3]=d):(a=u[2],d=u[3]);let x=h?"none":"preview-drag-path 6s ease-in-out infinite";return u[4]!==x?(c=(0,t.jsx)("div",{style:{position:"absolute",width:50,height:50,borderRadius:12,background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--bg)",fontWeight:700,fontSize:10,userSelect:"none",boxShadow:"0 4px 16px rgba(200,245,59,0.2)",animation:x,left:20,top:30},children:"Drag"}),u[4]=x,u[5]=c):c=u[5],u[6]===Symbol.for("react.memo_cache_sentinel")?(s=(0,t.jsx)("div",{style:{position:"absolute",bottom:8,left:0,right:0,textAlign:"center",color:"var(--muted)",fontSize:10},children:"simulated drag path"}),u[6]=s):s=u[6],u[7]!==c?(p=(0,t.jsx)("div",{style:a,children:(0,t.jsxs)("div",{style:d,children:[c,s]})}),u[7]=c,u[8]=p):p=u[8],p});e.s(["default",0,l])}]);