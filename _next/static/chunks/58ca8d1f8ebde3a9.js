(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,38068,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),o=e.i(3938);let l=`
@keyframes splitchar-fly {
  from {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(0.3);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
    filter: blur(0px);
  }
}
`;function c(e,t){return Math.random()*(t-e)+e}function a(e){return e+1}let i=(0,n.memo)(function(){let e,i,s,u,m,d,f,h,p,y=(0,r.c)(14),b=(0,o.useReducedMotion)(),x=(0,n.useRef)(null),[v,g]=(0,n.useState)(0);y[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=l,document.head.appendChild(e),x.current=e,()=>{x.current&&(document.head.removeChild(x.current),x.current=null)}},i=[],y[0]=e,y[1]=i):(e=y[0],i=y[1]),(0,n.useEffect)(e,i),y[2]===Symbol.for("react.memo_cache_sentinel")?(s=()=>g(a),y[2]=s):s=y[2];let S=s;return y[3]===Symbol.for("react.memo_cache_sentinel")?(u={width:"100%",height:220,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",cursor:"pointer",gap:10},y[3]=u):u=y[3],y[4]===Symbol.for("react.memo_cache_sentinel")?(m={display:"flex",gap:2},y[4]=m):m=y[4],y[5]!==v||y[6]!==b?(d="EFFECTS".split("").map((e,r)=>(0,t.jsx)("span",{style:{fontSize:44,fontWeight:900,color:"var(--text)",display:"inline-block",opacity:+!!b,"--tx":`${c(-250,250)}px`,"--ty":`${c(-250,250)}px`,"--rot":`${c(-180,180)}deg`,animation:b?"none":`splitchar-fly 0.7s cubic-bezier(0.23,1,0.32,1) ${.1*r}s forwards`},children:e},`${v}-${r}`)),y[5]=v,y[6]=b,y[7]=d):d=y[7],y[8]!==v||y[9]!==d?(f=(0,t.jsx)("div",{style:m,children:d},v),y[8]=v,y[9]=d,y[10]=f):f=y[10],y[11]===Symbol.for("react.memo_cache_sentinel")?(h=(0,t.jsx)("span",{style:{fontSize:12,color:"var(--muted)"},children:"לחץ להפעלה מחדש"}),y[11]=h):h=y[11],y[12]!==f?(p=(0,t.jsxs)("div",{onClick:S,style:u,children:[f,h]}),y[12]=f,y[13]=p):p=y[13],p});e.s(["default",0,i])}]);