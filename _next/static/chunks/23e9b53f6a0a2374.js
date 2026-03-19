(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,86610,e=>{"use strict";var t=e.i(25764),r=e.i(45444),o=e.i(87726),l=e.i(3938);let n=`
@keyframes followeyes-cursor {
  0%   { left: 20%; top: 50%; }
  12%  { left: 70%; top: 25%; }
  25%  { left: 85%; top: 60%; }
  37%  { left: 50%; top: 80%; }
  50%  { left: 15%; top: 65%; }
  62%  { left: 35%; top: 20%; }
  75%  { left: 80%; top: 45%; }
  87%  { left: 55%; top: 75%; }
  100% { left: 20%; top: 50%; }
}
@keyframes followeyes-pupil-x {
  0%   { --px: -8px; }
  12%  { --px: 10px; }
  25%  { --px: 12px; }
  37%  { --px: 2px; }
  50%  { --px: -10px; }
  62%  { --px: -4px; }
  75%  { --px: 10px; }
  87%  { --px: 4px; }
  100% { --px: -8px; }
}
`,a=`
@keyframes followeyes-pupil-left {
  0%   { transform: translate(-6px, 0); }
  12%  { transform: translate(8px, -6px); }
  25%  { transform: translate(10px, 3px); }
  37%  { transform: translate(2px, 8px); }
  50%  { transform: translate(-8px, 4px); }
  62%  { transform: translate(-3px, -8px); }
  75%  { transform: translate(9px, -1px); }
  87%  { transform: translate(3px, 6px); }
  100% { transform: translate(-6px, 0); }
}
@keyframes followeyes-pupil-right {
  0%   { transform: translate(-10px, 0); }
  12%  { transform: translate(6px, -7px); }
  25%  { transform: translate(10px, 2px); }
  37%  { transform: translate(0px, 7px); }
  50%  { transform: translate(-10px, 3px); }
  62%  { transform: translate(-5px, -9px); }
  75%  { transform: translate(8px, -2px); }
  87%  { transform: translate(2px, 5px); }
  100% { transform: translate(-10px, 0); }
}
`,s=(0,o.memo)(function(){let e,s,i,p,f,c,m,x,d,u,h,y,b,g,_,v,w,S=(0,r.c)(23),j=(0,l.useReducedMotion)(),k=(0,o.useRef)(null);S[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=n+a,document.head.appendChild(e),k.current=e,()=>{k.current&&(document.head.removeChild(k.current),k.current=null)}},s=[],S[0]=e,S[1]=s):(e=S[0],s=S[1]),(0,o.useEffect)(e,s),S[2]===Symbol.for("react.memo_cache_sentinel")?(i={width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle, #f0f0f0 60%, #d0d0d0 100%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"inset 0 3px 8px rgba(0,0,0,0.2), 0 0 20px rgba(200,245,59,0.06)",position:"relative",overflow:"hidden"},S[2]=i):i=S[2];let C=i;S[3]===Symbol.for("react.memo_cache_sentinel")?(p={width:22,height:22,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%, #333 50%, #111 100%)",position:"relative",willChange:"transform"},S[3]=p):p=S[3];let R=p;S[4]===Symbol.for("react.memo_cache_sentinel")?(f={position:"absolute",top:4,left:5,width:6,height:6,background:"#fff",borderRadius:"50%"},S[4]=f):f=S[4];let E=f;S[5]===Symbol.for("react.memo_cache_sentinel")?(c={position:"absolute",top:5,left:"25%",width:"50%",height:10,background:"rgba(255,255,255,0.4)",borderRadius:"50%",filter:"blur(4px)"},S[5]=c):c=S[5];let T=c;S[6]===Symbol.for("react.memo_cache_sentinel")?(m={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",gap:24,background:"var(--bg)",overflow:"hidden",position:"relative"},S[6]=m):m=S[6],S[7]===Symbol.for("react.memo_cache_sentinel")?(x=(0,t.jsx)("div",{style:T}),S[7]=x):x=S[7];let A=j?"none":"followeyes-pupil-left 7s ease-in-out infinite";S[8]!==A?(d={...R,animation:A},S[8]=A,S[9]=d):d=S[9],S[10]===Symbol.for("react.memo_cache_sentinel")?(u=(0,t.jsx)("div",{style:E}),S[10]=u):u=S[10],S[11]!==d?(h=(0,t.jsxs)("div",{style:C,children:[x,(0,t.jsx)("div",{style:d,children:u})]}),S[11]=d,S[12]=h):h=S[12],S[13]===Symbol.for("react.memo_cache_sentinel")?(y=(0,t.jsx)("div",{style:T}),S[13]=y):y=S[13];let B=j?"none":"followeyes-pupil-right 7s ease-in-out infinite";return S[14]!==B?(b={...R,animation:B},S[14]=B,S[15]=b):b=S[15],S[16]===Symbol.for("react.memo_cache_sentinel")?(g=(0,t.jsx)("div",{style:E}),S[16]=g):g=S[16],S[17]!==b?(_=(0,t.jsxs)("div",{style:C,children:[y,(0,t.jsx)("div",{style:b,children:g})]}),S[17]=b,S[18]=_):_=S[18],S[19]===Symbol.for("react.memo_cache_sentinel")?(v=(0,t.jsx)("span",{style:{position:"absolute",bottom:14,fontSize:12,color:"var(--muted)",opacity:.5,pointerEvents:"none"},children:"Follow Eyes"}),S[19]=v):v=S[19],S[20]!==h||S[21]!==_?(w=(0,t.jsxs)("div",{style:m,children:[h,_,v]}),S[20]=h,S[21]=_,S[22]=w):w=S[22],w});e.s(["default",0,s])}]);