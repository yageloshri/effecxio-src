export default {

  // ─────────────────────────────────────────────
  // 1. saas-dark — "Neural Network" (Three.js)
  // ─────────────────────────────────────────────
  'saas-dark': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,#1a0a2e 0%,#0a0a0a 100%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  var COUNT=80,THRESH=1.8;
  var positions=[],velocities=[],nodeMat=new THREE.MeshBasicMaterial({color:0x7c3aed});
  var nodes=new THREE.Group();
  for(var i=0;i<COUNT;i++){
    var m=new THREE.Mesh(new THREE.SphereGeometry(0.04,8,8),nodeMat);
    var x=(Math.random()-0.5)*8,y=(Math.random()-0.5)*6,z=(Math.random()-0.5)*4;
    m.position.set(x,y,z);
    positions.push({x:x,y:y,z:z});
    velocities.push({x:(Math.random()-0.5)*0.005,y:(Math.random()-0.5)*0.005,z:(Math.random()-0.5)*0.003});
    nodes.add(m);
  }
  scene.add(nodes);
  var lineGeo=new THREE.BufferGeometry();
  var maxLines=COUNT*COUNT;
  var linePositions=new Float32Array(maxLines*6);
  lineGeo.setAttribute('position',new THREE.BufferAttribute(linePositions,3));
  lineGeo.setDrawRange(0,0);
  var lineMat=new THREE.LineBasicMaterial({color:0x7c3aed,transparent:true,opacity:0.3});
  var lines=new THREE.LineSegments(lineGeo,lineMat);
  scene.add(lines);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){
    raf=requestAnimationFrame(loop);
    var mxN=(mx/W-0.5)*8,myN=-(my/H-0.5)*6;
    for(var i=0;i<COUNT;i++){
      var p=positions[i],v=velocities[i];
      p.x+=v.x;p.y+=v.y;p.z+=v.z;
      if(p.x>4||p.x<-4)v.x*=-1;
      if(p.y>3||p.y<-3)v.y*=-1;
      if(p.z>2||p.z<-2)v.z*=-1;
      var dx=p.x-mxN,dy=p.y-myN,d=Math.sqrt(dx*dx+dy*dy);
      if(d<1.5){var f=0.002/Math.max(d,0.3);p.x+=dx*f;p.y+=dy*f;}
      nodes.children[i].position.set(p.x,p.y,p.z);
    }
    var idx=0;
    for(var i=0;i<COUNT;i++){
      for(var j=i+1;j<COUNT;j++){
        var a=positions[i],b=positions[j];
        var dx=a.x-b.x,dy=a.y-b.y,dz=a.z-b.z,dist=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(dist<THRESH){
          linePositions[idx*6]=a.x;linePositions[idx*6+1]=a.y;linePositions[idx*6+2]=a.z;
          linePositions[idx*6+3]=b.x;linePositions[idx*6+4]=b.y;linePositions[idx*6+5]=b.z;
          idx++;
        }
      }
    }
    lineGeo.setDrawRange(0,idx*2);
    lineGeo.attributes.position.needsUpdate=true;
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 2. saas-light — "Bubble Float" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-light': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 80%,#dcfce7 0%,#ffffff 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var bubbles=[];
  for(var i=0;i<15;i++){
    bubbles.push({
      x:Math.random()*W,
      y:H+Math.random()*200,
      r:20+Math.random()*60,
      speed:0.3+Math.random()*0.7,
      wobble:Math.random()*Math.PI*2,
      wobbleSpeed:0.005+Math.random()*0.01
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<bubbles.length;i++){
      var b=bubbles[i];
      b.y-=b.speed;
      b.wobble+=b.wobbleSpeed;
      var bx=b.x+Math.sin(b.wobble)*30;
      if(b.y<-b.r*2){b.y=H+b.r;b.x=Math.random()*W;}
      ctx.beginPath();
      ctx.arc(bx,b.y,b.r,0,Math.PI*2);
      ctx.fillStyle='rgba(22,163,74,0.08)';
      ctx.fill();
      ctx.strokeStyle='rgba(22,163,74,0.15)';
      ctx.lineWidth=1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(bx-b.r*0.3,b.y-b.r*0.3,b.r*0.18,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.5)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(bx-b.r*0.15,b.y-b.r*0.45,b.r*0.08,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.4)';
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 3. saas-gradient — "Aurora Mesh" (Three.js ShaderMaterial)
  // ─────────────────────────────────────────────
  'saas-gradient': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#ec4899 0%,#8b5cf6 50%,#06b6d4 100%)';return;}
  var W=innerWidth,H=innerHeight,mx=0.5,my=0.5;
  var scene=new THREE.Scene();
  var camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  var vertSrc='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}';
  var fragSrc=[
    'uniform float uTime;uniform vec2 uMouse;varying vec2 vUv;',
    'vec3 c1=vec3(0.925,0.282,0.6);vec3 c2=vec3(0.545,0.361,0.965);vec3 c3=vec3(0.024,0.714,0.831);',
    'float blob(vec2 p,vec2 center,float r){return smoothstep(r,0.0,length(p-center));}',
    'void main(){',
    '  vec2 uv=vUv;float t=uTime*0.3;',
    '  vec2 p1=vec2(0.3+sin(t*0.7)*0.2,0.4+cos(t*0.5)*0.2)+uMouse*0.15;',
    '  vec2 p2=vec2(0.7+cos(t*0.6)*0.2,0.6+sin(t*0.8)*0.2)+uMouse*0.1;',
    '  vec2 p3=vec2(0.5+sin(t*0.9)*0.25,0.3+cos(t*0.4)*0.25)+uMouse*0.12;',
    '  float b1=blob(uv,p1,0.5);float b2=blob(uv,p2,0.5);float b3=blob(uv,p3,0.5);',
    '  vec3 col=c1*b1+c2*b2+c3*b3;',
    '  col=mix(vec3(0.02),col,0.6);',
    '  gl_FragColor=vec4(col,1.0);',
    '}'
  ].join('\\n');
  var uniforms={uTime:{value:0},uMouse:{value:new THREE.Vector2(0.5,0.5)}};
  var mat=new THREE.ShaderMaterial({vertexShader:vertSrc,fragmentShader:fragSrc,uniforms:uniforms});
  var mesh=new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat);
  scene.add(mesh);
  document.addEventListener('mousemove',function(e){mx=e.clientX/W;my=1.0-e.clientY/H;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);});
  var raf,startTime=Date.now();
  function loop(){
    raf=requestAnimationFrame(loop);
    uniforms.uTime.value=(Date.now()-startTime)*0.001;
    uniforms.uMouse.value.set(mx,my);
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 4. saas-minimal — "Single Particle" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-minimal': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(255,0,102,0.06) 0%,transparent 70%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var cx=W/2,cy=H/2;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    cx+=(mx-cx)*0.02;
    cy+=(my-cy)*0.02;
    var g=ctx.createRadialGradient(cx,cy,0,cx,cy,200);
    g.addColorStop(0,'rgba(255,0,102,0.08)');
    g.addColorStop(1,'rgba(255,0,102,0)');
    ctx.beginPath();
    ctx.arc(cx,cy,200,0,Math.PI*2);
    ctx.fillStyle=g;
    ctx.fill();
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 5. saas-dashboard — "Data Rain" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-dashboard': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 0%,#064e3b 0%,#0a0a0a 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var chars='0123456789+-=.%$\\u2211\\u0394\\u03BB\\u222B';
  var cols=Math.floor(W/18);
  var drops=[];
  for(var i=0;i<cols;i++)drops[i]=Math.random()*H/18;
  var raf;
  function draw(){
    ctx.fillStyle='rgba(0,0,0,0.06)';
    ctx.fillRect(0,0,W,H);
    ctx.font='14px monospace';
    for(var i=0;i<cols;i++){
      var ch=chars[Math.floor(Math.random()*chars.length)];
      var x=i*18,y=drops[i]*18;
      var bright=0.15+Math.random()*0.1;
      ctx.fillStyle='rgba(16,185,129,'+bright+')';
      ctx.fillText(ch,x,y);
      if(y>H&&Math.random()>0.975)drops[i]=0;
      drops[i]+=0.5+Math.random()*0.5;
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 6. saas-glassmorphism — "Floating Orbs" (Three.js)
  // ─────────────────────────────────────────────
  'saas-glassmorphism': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 30% 30%,rgba(124,58,237,0.15) 0%,rgba(37,99,235,0.1) 50%,transparent 100%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  scene.add(new THREE.AmbientLight(0x404040,0.8));
  var pl=new THREE.PointLight(0xffffff,1,100);pl.position.set(5,5,5);scene.add(pl);
  var pl2=new THREE.PointLight(0x7c3aed,0.5,100);pl2.position.set(-5,-3,3);scene.add(pl2);
  var colors=[0x7c3aed,0x2563eb,0xec4899,0x06b6d4];
  var orbs=[];
  for(var i=0;i<4;i++){
    var geo=new THREE.SphereGeometry(0.6+Math.random()*0.4,32,32);
    var mat=new THREE.MeshPhongMaterial({color:colors[i],transparent:true,opacity:0.18,shininess:100});
    var m=new THREE.Mesh(geo,mat);
    orbs.push({mesh:m,phase:i*Math.PI*0.5,speed:0.3+Math.random()*0.3,radius:1.5+Math.random()*1.5,yOff:(Math.random()-0.5)*2});
    scene.add(m);
  }
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf,t=0;
  function loop(){
    raf=requestAnimationFrame(loop);
    t+=0.005;
    for(var i=0;i<orbs.length;i++){
      var o=orbs[i];
      o.mesh.position.x=Math.sin(t*o.speed+o.phase)*o.radius;
      o.mesh.position.y=Math.cos(t*o.speed*0.7+o.phase)*o.radius*0.6+o.yOff;
      o.mesh.position.z=Math.sin(t*o.speed*0.5+o.phase)*1;
    }
    camera.position.x+=(((mx/W)-0.5)*0.5-camera.position.x)*0.02;
    camera.position.y+=(((my/H)-0.5)*-0.3-camera.position.y)*0.02;
    camera.lookAt(scene.position);
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 7. saas-analytics — "Self-Drawing Chart" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-analytics': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 80%,rgba(124,58,237,0.06) 0%,transparent 70%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var pts1=[],pts2=[],N=12;
  function genPts(){
    pts1=[];pts2=[];
    for(var i=0;i<N;i++){
      pts1.push({x:W*0.1+i*(W*0.8/(N-1)),y:H*0.3+Math.random()*H*0.4});
      pts2.push({x:W*0.1+i*(W*0.8/(N-1)),y:H*0.35+Math.random()*H*0.35});
    }
  }
  genPts();
  var progress=0,startTime=Date.now(),duration=2000,dotPulse=0;
  var raf;
  function drawLine(pts,color,fillColor,p){
    var count=Math.floor(p*(pts.length-1));
    var frac=p*(pts.length-1)-count;
    if(count<0)return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x,pts[0].y);
    for(var i=1;i<=count&&i<pts.length;i++){
      ctx.lineTo(pts[i].x,pts[i].y);
    }
    if(count<pts.length-1){
      var a=pts[count],b=pts[count+1];
      ctx.lineTo(a.x+(b.x-a.x)*frac,a.y+(b.y-a.y)*frac);
    }
    ctx.strokeStyle=color;
    ctx.lineWidth=2;
    ctx.stroke();
    var lastIdx=Math.min(count,pts.length-1);
    var lastX=count<pts.length-1?pts[count].x+(pts[count+1].x-pts[count].x)*frac:pts[lastIdx].x;
    var lastY=count<pts.length-1?pts[count].y+(pts[count+1].y-pts[count].y)*frac:pts[lastIdx].y;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x,H*0.85);
    ctx.lineTo(pts[0].x,pts[0].y);
    for(var i=1;i<=count&&i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);
    if(count<pts.length-1)ctx.lineTo(lastX,lastY);
    ctx.lineTo(lastX,H*0.85);
    ctx.closePath();
    var grd=ctx.createLinearGradient(0,H*0.3,0,H*0.85);
    grd.addColorStop(0,fillColor);
    grd.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=grd;
    ctx.fill();
    ctx.restore();
    if(p>=1){
      var r=3+Math.sin(dotPulse)*1.5;
      ctx.beginPath();ctx.arc(pts[pts.length-1].x,pts[pts.length-1].y,r,0,Math.PI*2);
      ctx.fillStyle=color;ctx.fill();
    }
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var elapsed=Date.now()-startTime;
    progress=Math.min(elapsed/duration,1);
    dotPulse+=0.05;
    drawLine(pts1,'#7c3aed','rgba(124,58,237,0.08)',progress);
    drawLine(pts2,'#06b6d4','rgba(6,182,212,0.08)',Math.max(0,progress-0.1)/0.9);
    if(progress>=1&&elapsed>duration+6000){startTime=Date.now();genPts();}
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 8. saas-security — "Matrix Rain" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-security': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 0%,#003300 0%,#0a0a0a 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;initCols();}
  var colW=16,drops=[],speeds=[];
  function initCols(){
    var n=Math.ceil(W/colW);
    drops=[];speeds=[];
    for(var i=0;i<n;i++){drops[i]=Math.random()*H/colW;speeds[i]=0.4+Math.random()*0.6;}
  }
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var bin='01';
  var hex='0123456789ABCDEF';
  var kata='\\u30A2\\u30A4\\u30A6\\u30A8\\u30AA\\u30AB\\u30AD\\u30AF\\u30B1\\u30B3\\u30B5\\u30B7\\u30B9\\u30BB\\u30BD\\u30BF\\u30C1\\u30C4\\u30C6\\u30C8';
  var allChars=bin+hex+kata;
  var raf;
  function draw(){
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,W,H);
    ctx.font='14px monospace';
    for(var i=0;i<drops.length;i++){
      var ch=allChars[Math.floor(Math.random()*allChars.length)];
      var x=i*colW,y=drops[i]*colW;
      var distToMouse=Math.abs(x-mx);
      var speedMult=distToMouse<120?(1+3*(1-distToMouse/120)):1;
      var alpha=distToMouse<120?0.25:0.1;
      ctx.fillStyle='rgba(0,255,65,'+alpha+')';
      ctx.fillText(ch,x,y);
      if(y>H&&Math.random()>0.975)drops[i]=0;
      drops[i]+=speeds[i]*speedMult;
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 9. saas-productivity — "Speed Lines" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-productivity': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(90deg,rgba(163,230,53,0.05) 0%,transparent 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var lines=[];
  for(var i=0;i<60;i++){
    lines.push({
      x:Math.random()*W,
      y:Math.random()*H,
      len:40+Math.random()*120,
      speed:2+Math.random()*4,
      alpha:0.03+Math.random()*0.07,
      width:1+Math.random()*2
    });
  }
  var scrollBoost=1;
  addEventListener('scroll',function(){scrollBoost=3;});
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    scrollBoost+=(1-scrollBoost)*0.02;
    for(var i=0;i<lines.length;i++){
      var l=lines[i];
      l.x-=l.speed*scrollBoost;
      if(l.x+l.len<0){l.x=W+l.len;l.y=Math.random()*H;}
      ctx.beginPath();
      ctx.moveTo(l.x+l.len,l.y);
      ctx.lineTo(l.x,l.y);
      ctx.strokeStyle='rgba(163,230,53,'+l.alpha+')';
      ctx.lineWidth=l.width;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 10. saas-crm — "Connection Graph" (Three.js)
  // ─────────────────────────────────────────────
  'saas-crm': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(249,115,22,0.08) 0%,transparent 70%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(60,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=6;
  scene.add(new THREE.AmbientLight(0x404040));
  var pl=new THREE.PointLight(0xffffff,1,100);pl.position.set(5,5,5);scene.add(pl);
  var nodeColors=[0xf97316,0x2563eb,0x2563eb,0x16a34a,0x16a34a,0x7c3aed];
  var nodePositions=[
    [0,0,0],[2,1,0.5],[-1.5,1.5,-0.5],[-2,-1,0.3],[1.5,-1.5,0.2],[0,2.5,-0.3]
  ];
  var edges=[[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[3,4],[2,5]];
  var graph=new THREE.Group();
  var nodeMeshes=[];
  for(var i=0;i<6;i++){
    var geo=new THREE.SphereGeometry(0.2,16,16);
    var mat=new THREE.MeshPhongMaterial({color:nodeColors[i],emissive:nodeColors[i],emissiveIntensity:0.3});
    var m=new THREE.Mesh(geo,mat);
    m.position.set(nodePositions[i][0],nodePositions[i][1],nodePositions[i][2]);
    graph.add(m);nodeMeshes.push(m);
  }
  for(var i=0;i<edges.length;i++){
    var a=nodePositions[edges[i][0]],b=nodePositions[edges[i][1]];
    var pts=[new THREE.Vector3(a[0],a[1],a[2]),new THREE.Vector3(b[0],b[1],b[2])];
    var geo=new THREE.BufferGeometry().setFromPoints(pts);
    var mat=new THREE.LineBasicMaterial({color:0x444444,transparent:true,opacity:0.4});
    graph.add(new THREE.Line(geo,mat));
  }
  scene.add(graph);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf,t=0;
  function loop(){
    raf=requestAnimationFrame(loop);
    t+=0.003;
    graph.rotation.y=t;
    graph.rotation.x=Math.sin(t*0.5)*0.15;
    for(var i=0;i<nodeMeshes.length;i++){
      var s=1+Math.sin(t*2+i)*0.1;
      nodeMeshes[i].scale.set(s,s,s);
    }
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 11. saas-finance — "Live Ticker Candles" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-finance': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 80%,rgba(22,163,74,0.04) 0%,transparent 70%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var candles=[],maxCandles=60,candleW,lastUpdate=0,price=100;
  function init(){
    candles=[];candleW=Math.max(8,W/maxCandles);
    price=100;
    for(var i=0;i<maxCandles;i++){addCandle();}
  }
  function addCandle(){
    var open=price;
    price+=((Math.random()-0.48)*4);
    var close=price;
    var high=Math.max(open,close)+Math.random()*2;
    var low=Math.min(open,close)-Math.random()*2;
    candles.push({open:open,close:close,high:high,low:low,bull:close>=open});
    if(candles.length>maxCandles)candles.shift();
  }
  init();
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var now=Date.now();
    if(now-lastUpdate>2000){lastUpdate=now;addCandle();}
    if(candles.length<2)return;
    var allPrices=[];
    for(var i=0;i<candles.length;i++){allPrices.push(candles[i].high,candles[i].low);}
    var minP=Math.min.apply(null,allPrices),maxP=Math.max.apply(null,allPrices);
    var range=maxP-minP||1;
    var chartH=H*0.6,chartY=H*0.2;
    function priceToY(p){return chartY+chartH-(((p-minP)/range)*chartH);}
    for(var i=0;i<candles.length;i++){
      var c=candles[i];
      var x=i*candleW+candleW*0.1;
      var w=candleW*0.8;
      var oY=priceToY(c.open),cY=priceToY(c.close);
      var hY=priceToY(c.high),lY=priceToY(c.low);
      var color=c.bull?'rgba(22,163,74,0.08)':'rgba(220,38,38,0.08)';
      var wickColor=c.bull?'rgba(22,163,74,0.06)':'rgba(220,38,38,0.06)';
      ctx.strokeStyle=wickColor;
      ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(x+w/2,hY);ctx.lineTo(x+w/2,lY);ctx.stroke();
      ctx.fillStyle=color;
      ctx.fillRect(x,Math.min(oY,cY),w,Math.abs(cY-oY)||1);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 12. saas-hr — "People Dots" (Canvas 2D)
  // ─────────────────────────────────────────────
  'saas-hr': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(168,85,247,0.06) 0%,transparent 70%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;initDots();}
  var colors=['rgba(251,113,133,0.5)','rgba(168,85,247,0.5)','rgba(6,182,212,0.5)','rgba(234,179,8,0.5)'];
  var centers=[],dots=[];
  function initDots(){
    centers=[{x:W*0.25,y:H*0.35},{x:W*0.75,y:H*0.35},{x:W*0.3,y:H*0.7},{x:W*0.7,y:H*0.7}];
    dots=[];
    for(var g=0;g<4;g++){
      for(var i=0;i<12;i++){
        dots.push({
          x:Math.random()*W,y:Math.random()*H,
          tx:centers[g].x+(Math.random()-0.5)*100,
          ty:centers[g].y+(Math.random()-0.5)*80,
          r:3+Math.random()*3,group:g,phase:Math.random()*Math.PI*2
        });
      }
    }
  }
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var raf,t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.02;
    for(var i=0;i<dots.length;i++){
      var d=dots[i];
      d.x+=(d.tx-d.x)*0.02;
      d.y+=(d.ty-d.y)*0.02;
      var pulse=1+Math.sin(t+d.phase)*0.3;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r*pulse,0,Math.PI*2);
      ctx.fillStyle=colors[d.group];
      ctx.fill();
    }
    for(var g=0;g<4;g++){
      ctx.beginPath();
      ctx.arc(centers[g].x,centers[g].y,55,0,Math.PI*2);
      ctx.strokeStyle=colors[g].replace('0.5','0.1');
      ctx.lineWidth=1;
      ctx.setLineDash([4,4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 13. ai-chatbot — "3D Chat Bubbles" (Three.js)
  // ─────────────────────────────────────────────
  'ai-chatbot': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(37,99,235,0.08) 0%,rgba(124,58,237,0.05) 50%,transparent 100%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(60,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=7;
  scene.add(new THREE.AmbientLight(0x606060));
  var pl=new THREE.PointLight(0xffffff,0.8,100);pl.position.set(5,5,5);scene.add(pl);
  var bubbles=[],bubColors=[0x2563eb,0x7c3aed];
  for(var i=0;i<8;i++){
    var w=0.8+Math.random()*1.2,h=0.3+Math.random()*0.4,d=0.3;
    var geo=new THREE.BoxGeometry(w,h,d,2,2,2);
    var mat=new THREE.MeshPhongMaterial({color:bubColors[i%2],transparent:true,opacity:0.15,shininess:80});
    var m=new THREE.Mesh(geo,mat);
    m.position.set((Math.random()-0.5)*6,(Math.random()-0.5)*5,(Math.random()-0.5)*3);
    m.rotation.z=(Math.random()-0.5)*0.3;
    scene.add(m);
    bubbles.push({mesh:m,vy:0.002+Math.random()*0.003,vx:(Math.random()-0.5)*0.002,phase:Math.random()*Math.PI*2});
  }
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf,t=0;
  function loop(){
    raf=requestAnimationFrame(loop);
    t+=0.01;
    for(var i=0;i<bubbles.length;i++){
      var b=bubbles[i];
      b.mesh.position.y+=b.vy;
      b.mesh.position.x+=Math.sin(t+b.phase)*0.003;
      b.mesh.rotation.z+=0.001;
      if(b.mesh.position.y>4){b.mesh.position.y=-4;b.mesh.position.x=(Math.random()-0.5)*6;}
    }
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 14. ai-agent — "Workflow DAG" (Three.js)
  // ─────────────────────────────────────────────
  'ai-agent': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(57,255,20,0.06) 0%,#0a0a0a 100%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(60,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=8;
  scene.add(new THREE.AmbientLight(0x202020));
  var pl=new THREE.PointLight(0x39ff14,0.6,100);pl.position.set(0,0,5);scene.add(pl);
  var nodePos=[[-3,2,0],[-1,0,0],[1,2,0],[3,0,0],[1,-2,0],[-1,-2,0]];
  var edgesArr=[[0,1],[1,2],[2,3],[1,4],[4,5],[5,0],[3,4]];
  var dag=new THREE.Group();
  var nodeMat=new THREE.MeshPhongMaterial({color:0x39ff14,emissive:0x39ff14,emissiveIntensity:0.5});
  for(var i=0;i<nodePos.length;i++){
    var m=new THREE.Mesh(new THREE.SphereGeometry(0.18,16,16),nodeMat);
    m.position.set(nodePos[i][0],nodePos[i][1],nodePos[i][2]);
    dag.add(m);
  }
  for(var i=0;i<edgesArr.length;i++){
    var a=nodePos[edgesArr[i][0]],b=nodePos[edgesArr[i][1]];
    var geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(a[0],a[1],a[2]),new THREE.Vector3(b[0],b[1],b[2])]);
    dag.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x39ff14,transparent:true,opacity:0.2})));
  }
  var packets=[];
  var pktMat=new THREE.MeshBasicMaterial({color:0xffffff});
  for(var i=0;i<edgesArr.length;i++){
    var m=new THREE.Mesh(new THREE.SphereGeometry(0.06,8,8),pktMat);
    dag.add(m);
    packets.push({mesh:m,edge:i,t:Math.random()});
  }
  scene.add(dag);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){
    raf=requestAnimationFrame(loop);
    dag.rotation.y+=0.002;
    for(var i=0;i<packets.length;i++){
      var p=packets[i];
      p.t+=0.005;
      if(p.t>1)p.t=0;
      var e=edgesArr[p.edge];
      var a=nodePos[e[0]],b=nodePos[e[1]];
      p.mesh.position.set(a[0]+(b[0]-a[0])*p.t,a[1]+(b[1]-a[1])*p.t,a[2]+(b[2]-a[2])*p.t);
    }
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 15. ai-image — "Gallery Cube" (Three.js)
  // ─────────────────────────────────────────────
  'ai-image': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 70% 50%,rgba(124,58,237,0.08) 0%,transparent 70%)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(60,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  scene.add(new THREE.AmbientLight(0x606060));
  var pl=new THREE.PointLight(0xffffff,0.8,100);pl.position.set(5,5,5);scene.add(pl);
  var faceColors=[0x7c3aed,0xec4899,0x06b6d4,0xf59e0b,0x10b981,0x6366f1];
  var mats=[];
  for(var i=0;i<6;i++){
    mats.push(new THREE.MeshPhongMaterial({color:faceColors[i],transparent:true,opacity:0.35}));
  }
  var cube=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),mats);
  cube.position.x=1.5;
  scene.add(cube);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf,baseSpeed=0.005;
  function loop(){
    raf=requestAnimationFrame(loop);
    var hover=mx>W*0.5?1+((mx-W*0.5)/(W*0.5))*4:1;
    cube.rotation.y+=baseSpeed*hover;
    cube.rotation.x+=baseSpeed*0.7*hover;
    renderer.render(scene,camera);
  }
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 16. ai-writing — "Perspective Desk" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-writing': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(180deg,transparent 0%,rgba(194,65,12,0.04) 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var raf,t=0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.005;
    var vanishX=W*0.5+(mx-W/2)*0.05;
    var vanishY=H*0.32+(my-H/2)*0.03;
    var numH=18;
    ctx.strokeStyle='rgba(194,65,12,0.06)';
    ctx.lineWidth=1;
    for(var i=0;i<numH;i++){
      var frac=i/numH;
      var y=vanishY+(H-vanishY)*frac*frac;
      var spread=frac*frac;
      var x1=vanishX-W*0.6*spread;
      var x2=vanishX+W*0.6*spread;
      ctx.beginPath();
      ctx.moveTo(x1,y);
      ctx.lineTo(x2,y);
      ctx.stroke();
    }
    var numV=14;
    for(var i=0;i<numV;i++){
      var frac=(i/(numV-1))-0.5;
      ctx.beginPath();
      ctx.moveTo(vanishX,vanishY);
      ctx.lineTo(vanishX+frac*W*1.2,H);
      ctx.strokeStyle='rgba(194,65,12,0.03)';
      ctx.stroke();
    }
    var cursorX=W*0.35+Math.sin(t*2)*2;
    var cursorY=H*0.55;
    var blink=Math.sin(t*6)>0?0.15:0;
    ctx.fillStyle='rgba(194,65,12,'+blink+')';
    ctx.fillRect(cursorX,cursorY-12,2,16);
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 17. ai-voice — "Waveform Bars" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-voice': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(13,148,136,0.08) 0%,transparent 70%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var NUM=80,t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.03;
    var ampMod=0.3+0.7*(1-my/H);
    var barW=W/NUM;
    for(var i=0;i<NUM;i++){
      var x=i*barW;
      var norm=i/NUM;
      var v=Math.sin(norm*Math.PI*3+t)*0.4
        +Math.sin(norm*Math.PI*7-t*1.3)*0.25
        +Math.sin(norm*Math.PI*11+t*0.7)*0.15;
      v*=ampMod;
      var h=Math.abs(v)*H*0.35;
      var alpha=0.5+Math.abs(v)*0.3;
      var grd=ctx.createLinearGradient(x,H/2-h,x,H/2+h);
      grd.addColorStop(0,'rgba(13,148,136,'+alpha*0.3+')');
      grd.addColorStop(0.5,'rgba(13,148,136,'+alpha+')');
      grd.addColorStop(1,'rgba(13,148,136,'+alpha*0.3+')');
      ctx.fillStyle=grd;
      ctx.fillRect(x+1,H/2-h,barW-2,h*2);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 18. ai-video — "Film Grain + Light Leak" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-video': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 30% 40%,rgba(234,88,12,0.06) 0%,transparent 60%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var frameCount=0,leakX=W*0.3,leakY=H*0.4;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    frameCount++;
    if(frameCount%3===0){
      var imgData=ctx.createImageData(W,H);
      var d=imgData.data;
      for(var i=0;i<d.length;i+=4){
        var v=Math.random()*255;
        d[i]=v;d[i+1]=v;d[i+2]=v;d[i+3]=15;
      }
      ctx.putImageData(imgData,0,0);
    }
    var t=frameCount*0.008;
    var lx=W*0.3+Math.sin(t)*W*0.2;
    var ly=H*0.4+Math.cos(t*0.7)*H*0.15;
    leakX+=(lx-leakX)*0.01;
    leakY+=(ly-leakY)*0.01;
    var g=ctx.createRadialGradient(leakX,leakY,0,leakX,leakY,W*0.4);
    g.addColorStop(0,'rgba(234,88,12,0.08)');
    g.addColorStop(0.5,'rgba(234,88,12,0.03)');
    g.addColorStop(1,'rgba(234,88,12,0)');
    ctx.fillStyle=g;
    ctx.fillRect(0,0,W,H);
    var g2=ctx.createRadialGradient(leakX+W*0.2,leakY-H*0.1,0,leakX+W*0.2,leakY-H*0.1,W*0.25);
    g2.addColorStop(0,'rgba(251,191,36,0.04)');
    g2.addColorStop(1,'rgba(251,191,36,0)');
    ctx.fillStyle=g2;
    ctx.fillRect(0,0,W,H);
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 19. ai-code — "Code Rain" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-code': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 0%,rgba(74,222,128,0.05) 0%,transparent 60%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;initSnippets();}
  var snippets=[
    'function init() {',
    '  return data.map(x =>',
    'const result = await',
    'for i in range(n):',
    '  if valid(node):',
    'import torch',
    'export default {',
    '  console.log(state)',
    'def transform(self):',
    '  yield from gen()',
    'async function fetch(',
    '  .filter(Boolean)',
    'class Model(nn.Module):',
    '  setState(prev =>',
    'try { await db.query(',
    '  } catch (err) {'
  ];
  var falling=[];
  function initSnippets(){
    falling=[];
    for(var i=0;i<8;i++){
      falling.push({
        text:snippets[Math.floor(Math.random()*snippets.length)],
        x:Math.random()*W*0.8+W*0.1,
        y:Math.random()*H,
        speed:0.3+Math.random()*0.5,
        alpha:0.04+Math.random()*0.04
      });
    }
  }
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.font='13px monospace';
    for(var i=0;i<falling.length;i++){
      var f=falling[i];
      f.y+=f.speed;
      if(f.y>H+20){
        f.y=-20;
        f.x=Math.random()*W*0.8+W*0.1;
        f.text=snippets[Math.floor(Math.random()*snippets.length)];
      }
      ctx.fillStyle='rgba(74,222,128,'+f.alpha+')';
      ctx.fillText(f.text,f.x,f.y);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 20. ai-data — "Data Flow Particles" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-data': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(90deg,rgba(22,163,74,0.04) 0%,rgba(37,99,235,0.04) 50%,rgba(124,58,237,0.04) 100%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;initPaths();}
  var paths=[],particles=[];
  var pathColors=['rgba(22,163,74,','rgba(37,99,235,','rgba(139,92,246,'];
  function cubicBezier(t,p0,p1,p2,p3){
    var u=1-t;
    return u*u*u*p0+3*u*u*t*p1+3*u*t*t*p2+t*t*t*p3;
  }
  function initPaths(){
    paths=[];particles=[];
    for(var p=0;p<3;p++){
      var yBase=H*0.25+p*H*0.25;
      var path={
        x0:-20,y0:yBase+Math.random()*40-20,
        x1:W*0.3,y1:yBase+(Math.random()-0.5)*H*0.2,
        x2:W*0.7,y2:yBase+(Math.random()-0.5)*H*0.2,
        x3:W+20,y3:yBase+Math.random()*40-20,
        color:p
      };
      paths.push(path);
      for(var i=0;i<12;i++){
        particles.push({path:p,t:Math.random(),speed:0.001+Math.random()*0.003,size:2+Math.random()*3});
      }
    }
  }
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var p=0;p<paths.length;p++){
      var pa=paths[p];
      ctx.beginPath();
      ctx.moveTo(pa.x0,pa.y0);
      ctx.bezierCurveTo(pa.x1,pa.y1,pa.x2,pa.y2,pa.x3,pa.y3);
      ctx.strokeStyle=pathColors[pa.color]+'0.04)';
      ctx.lineWidth=1;
      ctx.stroke();
    }
    for(var i=0;i<particles.length;i++){
      var pt=particles[i],pa=paths[pt.path];
      pt.t+=pt.speed;
      if(pt.t>1)pt.t=0;
      var x=cubicBezier(pt.t,pa.x0,pa.x1,pa.x2,pa.x3);
      var y=cubicBezier(pt.t,pa.y0,pa.y1,pa.y2,pa.y3);
      var alpha=0.15+Math.sin(pt.t*Math.PI)*0.35;
      ctx.beginPath();
      ctx.arc(x,y,pt.size,0,Math.PI*2);
      ctx.fillStyle=pathColors[pa.color]+alpha+')';
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 21. ai-minimal — "Shader Orb" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-minimal': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(139,92,246,0.06) 0%,transparent 60%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var cx=W/2,cy=H/2,t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.015;
    cx+=(mx-cx)*0.01;
    cy+=(my-cy)*0.01;
    var breath=1+Math.sin(t)*0.15;
    var radius=280*breath;
    var g=ctx.createRadialGradient(cx,cy,0,cx,cy,radius);
    var coreAlpha=0.1+Math.sin(t*0.7)*0.03;
    g.addColorStop(0,'rgba(139,92,246,'+coreAlpha+')');
    g.addColorStop(0.4,'rgba(139,92,246,'+(coreAlpha*0.5)+')');
    g.addColorStop(1,'rgba(139,92,246,0)');
    ctx.beginPath();
    ctx.arc(cx,cy,radius,0,Math.PI*2);
    ctx.fillStyle=g;
    ctx.fill();
    var g2=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*0.5);
    g2.addColorStop(0,'rgba(192,160,255,'+(coreAlpha*0.4)+')');
    g2.addColorStop(1,'rgba(192,160,255,0)');
    ctx.beginPath();
    ctx.arc(cx,cy,radius*0.5,0,Math.PI*2);
    ctx.fillStyle=g2;
    ctx.fill();
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ─────────────────────────────────────────────
  // 22. ai-search — "Ripple Grid" (Canvas 2D)
  // ─────────────────────────────────────────────
  'ai-search': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='radial-gradient(ellipse at 50% 50%,rgba(12,74,110,0.06) 0%,transparent 60%)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var spacing=30,t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.04;
    var cols=Math.ceil(W/spacing)+1;
    var rows=Math.ceil(H/spacing)+1;
    for(var r=0;r<rows;r++){
      for(var c=0;c<cols;c++){
        var x=c*spacing;
        var y=r*spacing;
        var dx=x-mx,dy=y-my;
        var dist=Math.sqrt(dx*dx+dy*dy);
        var wave=Math.sin(dist*0.03-t)*0.5+0.5;
        var proximity=Math.max(0,1-dist/300);
        var scale=1+proximity*wave*3;
        var alpha=0.06+proximity*wave*0.2;
        var depth=0.4+proximity*0.6;
        ctx.beginPath();
        ctx.arc(x,y,1.5*scale,0,Math.PI*2);
        ctx.fillStyle='rgba(12,74,'+Math.floor(110*depth)+','+alpha+')';
        ctx.fill();
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`

};
