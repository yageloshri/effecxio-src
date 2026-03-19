(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5e3,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),a=e.i(3938);let i=`
@keyframes pagereveal-wipe {
  0% { transform: translateX(0%); }
  40% { transform: translateX(0%); }
  100% { transform: translateX(101%); }
}
@keyframes pagereveal-fadein {
  0%, 40% { opacity: 0; }
  100% { opacity: 1; }
}
`;function o(e){return e+1}let l=(0,n.memo)(function(){let e,l,s,c,u,d,f,m,p,v=(0,r.c)(18),h=(0,a.useReducedMotion)(),y=(0,n.useRef)(null),[g,b]=(0,n.useState)(0);v[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=i,document.head.appendChild(e),y.current=e,()=>{y.current&&(document.head.removeChild(y.current),y.current=null)}},l=[],v[0]=e,v[1]=l):(e=v[0],l=v[1]),(0,n.useEffect)(e,l),v[2]!==h?(s=()=>{if(h)return;let e=setInterval(()=>b(o),3e3);return()=>clearInterval(e)},c=[h],v[2]=h,v[3]=s,v[4]=c):(s=v[3],c=v[4]),(0,n.useEffect)(s,c),v[5]===Symbol.for("react.memo_cache_sentinel")?(u={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},v[5]=u):u=v[5];let x=`text-${g}`,w=h?1:void 0,C=h?"none":"pagereveal-fadein 2s ease forwards";return v[6]!==w||v[7]!==C?(d={fontSize:20,fontWeight:700,color:"var(--text)",letterSpacing:2,opacity:w,animation:C},v[6]=w,v[7]=C,v[8]=d):d=v[8],v[9]!==x||v[10]!==d?(f=(0,t.jsx)("span",{style:d,children:"Page Revealed"},x),v[9]=x,v[10]=d,v[11]=f):f=v[11],v[12]!==g||v[13]!==h?(m=!h&&(0,t.jsx)("div",{style:{position:"absolute",inset:0,background:"var(--accent)",animation:"pagereveal-wipe 2s cubic-bezier(0.77,0,0.18,1) forwards",zIndex:2}},`overlay-${g}`),v[12]=g,v[13]=h,v[14]=m):m=v[14],v[15]!==m||v[16]!==f?(p=(0,t.jsxs)("div",{style:u,children:[f,m]}),v[15]=m,v[16]=f,v[17]=p):p=v[17],p});e.s(["default",0,l])}]);