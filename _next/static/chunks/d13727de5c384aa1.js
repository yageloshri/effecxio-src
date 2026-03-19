(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,8280,e=>{"use strict";var t=e.i(25764),r=e.i(45444),n=e.i(87726),o=e.i(3938);let a=`
@keyframes preview-confetti-fall {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--cdx), var(--cdy)) rotate(var(--crot)) scale(0.3);
  }
}
`,i=["#c8f53b","#f43f5e","#fbbf24","#34d399","#60a5fa","#f472b6"],c=(0,n.memo)(function(){let e,c,l,d,s,u,f=(0,r.c)(8),h=(0,o.useReducedMotion)(),m=(0,n.useRef)(null),p=(0,n.useRef)(null);f[0]===Symbol.for("react.memo_cache_sentinel")?(e=()=>{let e=document.createElement("style");return e.textContent=a,document.head.appendChild(e),m.current=e,()=>{m.current&&(document.head.removeChild(m.current),m.current=null)}},c=[],f[0]=e,f[1]=c):(e=f[0],c=f[1]),(0,n.useEffect)(e,c),f[2]!==h?(l=()=>{if(h||!p.current)return;let e=p.current,t=e.getBoundingClientRect(),r=t.width/2,n=t.height/2;for(let t=0;t<24;t++){let o=document.createElement("div"),a=2*Math.PI*t/24,c=50+80*Math.random(),l=Math.cos(a)*c,d=Math.sin(a)*c-30,s=720*Math.random()-360+"deg",u=5+6*Math.random();o.style.cssText=`
          position: absolute;
          width: ${u}px;
          height: ${u}px;
          left: ${r}px;
          top: ${n}px;
          background: ${i[t%i.length]};
          border-radius: ${Math.random()>.5?"50%":"2px"};
          pointer-events: none;
          z-index: 10;
          animation: preview-confetti-fall ${.7+.5*Math.random()}s ease-out forwards;
        `,o.style.setProperty("--cdx",l+"px"),o.style.setProperty("--cdy",d+"px"),o.style.setProperty("--crot",s),e.appendChild(o),o.addEventListener("animationend",()=>o.remove())}},f[2]=h,f[3]=l):l=f[3];let y=l;return f[4]===Symbol.for("react.memo_cache_sentinel")?(d={width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden",position:"relative"},f[4]=d):d=f[4],f[5]===Symbol.for("react.memo_cache_sentinel")?(s={position:"relative",padding:"14px 40px",borderRadius:14,border:"none",background:"var(--accent)",color:"var(--bg)",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",transition:"transform 0.2s",zIndex:1,letterSpacing:1},f[5]=s):s=f[5],f[6]!==y?(u=(0,t.jsx)("div",{ref:p,style:d,children:(0,t.jsx)("button",{onMouseEnter:y,style:s,children:"Confetti"})}),f[6]=y,f[7]=u):u=f[7],u});e.s(["default",0,c])}]);