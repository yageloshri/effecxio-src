(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,36878,e=>{"use strict";var t=e.i(25764),n=e.i(87726),r=e.i(3938);let i=`
@keyframes preview-ripple-expand {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`,o=(0,n.memo)(function(){let e=(0,r.useReducedMotion)(),o=(0,n.useRef)(null),a=(0,n.useRef)(null);if("u">typeof document&&!o.current){let e=document.createElement("style");e.textContent=i,document.head.appendChild(e),o.current=e}let d=(0,n.useCallback)(()=>{if(e)return;let t=a.current;if(!t)return;let n=t.getBoundingClientRect(),r=n.width/2,i=n.height/2,o=Math.max(n.width,n.height),d=document.createElement("span");d.style.cssText=`
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.35);
        width: ${o}px;
        height: ${o}px;
        left: ${r-o/2}px;
        top: ${i-o/2}px;
        transform: scale(0);
        animation: preview-ripple-expand 0.6s ease-out forwards;
        pointer-events: none;
      `,t.appendChild(d),d.addEventListener("animationend",()=>d.remove())},[e]);return(0,t.jsx)("div",{style:{width:"100%",height:220,display:"flex",alignItems:"center",justifyContent:"center",background:"var(--bg)",overflow:"hidden"},children:(0,t.jsx)("button",{ref:a,onMouseEnter:d,style:{position:"relative",padding:"14px 40px",borderRadius:12,border:"none",background:"var(--accent)",color:"var(--bg)",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",overflow:"hidden",transition:"transform 0.2s ease",letterSpacing:1},children:"Ripple"})})});e.s(["default",0,o])}]);