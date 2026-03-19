(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5334,e=>{"use strict";var t=e.i(25764),o=e.i(45444),n=e.i(87726),r=e.i(3938);let i=`
@keyframes customcursor-move {
  0%   { left: 20%; top: 50%; }
  15%  { left: 45%; top: 30%; }
  30%  { left: 70%; top: 55%; }
  45%  { left: 50%; top: 70%; }
  60%  { left: 30%; top: 40%; }
  75%  { left: 65%; top: 35%; }
  90%  { left: 40%; top: 60%; }
  100% { left: 20%; top: 50%; }
}
@keyframes customcursor-ring {
  0%   { left: 20%; top: 50%; }
  15%  { left: 44%; top: 31%; }
  30%  { left: 69%; top: 54%; }
  45%  { left: 49%; top: 69%; }
  60%  { left: 29%; top: 41%; }
  75%  { left: 64%; top: 36%; }
  90%  { left: 39%; top: 59%; }
  100% { left: 20%; top: 50%; }
}
`,l=(0,n.memo)(function(){let e,l,s,a,c,d,u,f,p,m=(0,o.c)(13),h=(0,r.useReducedMotion)(),b=(0,n.useRef)(null);m[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=i,document.head.appendChild(e),b.current=e,()=>{b.current&&(document.head.removeChild(b.current),b.current=null)}},l=[],m[0]=e,m[1]=l):(e=m[0],l=m[1]),(0,n.useEffect)(e,l),m[2]===Symbol.for("react.memo_cache_sentinel")?(s={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},a=(0,t.jsx)("div",{style:{position:"absolute",left:"20%",top:"35%",width:80,height:40,borderRadius:10,border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--muted)"},children:"Hover"}),c=(0,t.jsx)("div",{style:{position:"absolute",right:"20%",top:"50%",width:80,height:40,borderRadius:10,border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"var(--muted)"},children:"Click"}),m[2]=s,m[3]=a,m[4]=c):(s=m[2],a=m[3],c=m[4]);let v=h?"none":"customcursor-ring 6s ease-in-out infinite";m[5]!==v?(d=(0,t.jsx)("div",{style:{position:"absolute",width:32,height:32,borderRadius:"50%",border:"2px solid var(--accent)",opacity:.5,pointerEvents:"none",transform:"translate(-50%, -50%)",animation:v,willChange:"left, top"}}),m[5]=v,m[6]=d):d=m[6];let y=h?"none":"customcursor-move 6s ease-in-out infinite";return m[7]!==y?(u=(0,t.jsx)("div",{style:{position:"absolute",width:8,height:8,borderRadius:"50%",background:"var(--accent)",pointerEvents:"none",transform:"translate(-50%, -50%)",animation:y,willChange:"left, top",boxShadow:"0 0 8px var(--accent)"}}),m[7]=y,m[8]=u):u=m[8],m[9]===Symbol.for("react.memo_cache_sentinel")?(f=(0,t.jsx)("span",{style:{position:"absolute",bottom:14,fontSize:12,color:"var(--muted)",opacity:.5,pointerEvents:"none"},children:"Custom Cursor"}),m[9]=f):f=m[9],m[10]!==d||m[11]!==u?(p=(0,t.jsxs)("div",{style:s,children:[a,c,d,u,f]}),m[10]=d,m[11]=u,m[12]=p):p=m[12],p});e.s(["default",0,l])}]);