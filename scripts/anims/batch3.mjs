export default {

  // ============================================================
  // PORTFOLIO (8 templates)
  // ============================================================

  // 1. portfolio-developer — "Terminal Text" (Canvas 2D)
  'portfolio-developer': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0c0c0c,#1a1a2e)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var strings=['const x = 42;','function(){}','return true;','let arr = [];','if(ok){run()}','var i = 0;','export default','import {data}','async await','try{parse()}','null === void','for(;;){next}','yield* gen()','new Map()','class App{}','Promise.all()'];
  var drops=[];
  for(var i=0;i<8;i++){
    drops.push({
      x:Math.random()*W,
      y:Math.random()*H,
      speed:0.3+Math.random()*0.5,
      text:strings[Math.floor(Math.random()*strings.length)],
      alpha:0.04+Math.random()*0.04
    });
  }
  var raf;
  function draw(){
    ctx.fillStyle='rgba(12,12,12,0.06)';
    ctx.fillRect(0,0,W,H);
    ctx.font='13px monospace';
    for(var i=0;i<drops.length;i++){
      var d=drops[i];
      d.y+=d.speed;
      if(d.y>H+20){
        d.y=-20;
        d.x=Math.random()*W;
        d.text=strings[Math.floor(Math.random()*strings.length)];
      }
      ctx.fillStyle='rgba(34,197,94,'+d.alpha+')';
      ctx.fillText(d.text,d.x,d.y);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 2. portfolio-designer — "Color Splash Flow" (Canvas 2D)
  'portfolio-designer': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0c0c0c,#2a1030)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var particles=[];
  for(var i=0;i<180;i++){
    particles.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      vx:0,vy:0,
      seed:Math.random()*1000
    });
  }
  var t=0;
  function noise(px,py){
    return Math.sin(px*0.003+t*0.4)*Math.cos(py*0.004+t*0.3)+Math.sin((px+py)*0.002+t*0.2);
  }
  var raf;
  function draw(){
    ctx.fillStyle='rgba(12,12,12,0.04)';
    ctx.fillRect(0,0,W,H);
    t+=0.01;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      var angle=noise(p.x+p.seed,p.y+p.seed)*Math.PI*2;
      p.vx+=(Math.cos(angle)*0.3-p.vx)*0.1;
      p.vy+=(Math.sin(angle)*0.3-p.vy)*0.1;
      var ox=p.x,oy=p.y;
      p.x+=p.vx;
      p.y+=p.vy;
      if(p.x<0||p.x>W||p.y<0||p.y>H){
        p.x=Math.random()*W;
        p.y=Math.random()*H;
        ox=p.x;oy=p.y;
      }
      ctx.beginPath();
      ctx.moveTo(ox,oy);
      ctx.lineTo(p.x,p.y);
      ctx.strokeStyle='rgba(236,72,153,0.3)';
      ctx.lineWidth=1;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 3. portfolio-photographer — "Bokeh Circles" (Canvas 2D)
  'portfolio-photographer': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0c0c0c,#1a1a1a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var circles=[];
  for(var i=0;i<12;i++){
    circles.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      r:30+Math.random()*90,
      vx:(Math.random()-0.5)*0.2,
      vy:(Math.random()-0.5)*0.2,
      opacity:0.03+Math.random()*0.05
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<circles.length;i++){
      var c=circles[i];
      c.x+=c.vx;
      c.y+=c.vy;
      if(c.x<-c.r)c.x=W+c.r;
      if(c.x>W+c.r)c.x=-c.r;
      if(c.y<-c.r)c.y=H+c.r;
      if(c.y>H+c.r)c.y=-c.r;
      var grad=ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r);
      grad.addColorStop(0,'rgba(245,245,245,'+c.opacity+')');
      grad.addColorStop(0.5,'rgba(245,245,245,'+(c.opacity*0.5)+')');
      grad.addColorStop(1,'rgba(245,245,245,0)');
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
      ctx.fillStyle=grad;
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 4. portfolio-freelancer — "Gentle Float" (Canvas 2D)
  'portfolio-freelancer': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#fafafa,#f0f0ff)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var dots=[];
  for(var i=0;i<10;i++){
    dots.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      r:8+Math.random()*32,
      angle:Math.random()*Math.PI*2,
      speed:0.001+Math.random()*0.002,
      drift:20+Math.random()*40,
      baseX:Math.random()*2000,
      baseY:Math.random()*2000,
      opacity:0.04+Math.random()*0.06
    });
  }
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=1;
    for(var i=0;i<dots.length;i++){
      var d=dots[i];
      d.angle+=d.speed;
      d.x=d.baseX+Math.cos(d.angle)*d.drift;
      d.y=d.baseY+Math.sin(d.angle*0.7)*d.drift;
      if(d.baseX>W)d.baseX=d.baseX%W;
      if(d.baseY>H)d.baseY=d.baseY%H;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle='rgba(124,58,237,'+d.opacity+')';
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 5. portfolio-minimal — "Dot Follow" (Canvas 2D)
  'portfolio-minimal': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0c0c0c,#141414)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var dotX=W/2,dotY=H/2;
  var trail=[];
  var maxTrail=30;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    dotX+=(mx-dotX)*0.01;
    dotY+=(my-dotY)*0.01;
    trail.push({x:dotX,y:dotY});
    if(trail.length>maxTrail)trail.shift();
    for(var i=0;i<trail.length;i++){
      var p=trail[i];
      var alpha=(i/trail.length)*0.4;
      var r=1+(i/trail.length)*3;
      ctx.beginPath();
      ctx.arc(p.x,p.y,r,0,Math.PI*2);
      ctx.fillStyle='rgba(34,197,94,'+alpha+')';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(dotX,dotY,4,0,Math.PI*2);
    ctx.fillStyle='rgba(34,197,94,0.4)';
    ctx.fill();
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 6. portfolio-motion — "Frame Burst" (Canvas 2D)
  'portfolio-motion': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0c0c0c,#1a1018)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var colors=['rgba(247,150,20,0.08)','rgba(236,72,153,0.08)','rgba(124,58,237,0.08)'];
  var frames=[];
  for(var i=0;i<30;i++){
    var w=6+Math.random()*18;
    var h=6+Math.random()*18;
    frames.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      w:w,h:h,
      vx:(Math.random()-0.5)*0.4,
      vy:(Math.random()-0.5)*0.4,
      rot:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-0.5)*0.005,
      color:colors[Math.floor(Math.random()*colors.length)]
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<frames.length;i++){
      var f=frames[i];
      f.x+=f.vx;
      f.y+=f.vy;
      f.rot+=f.rotSpeed;
      if(f.x<-30)f.x=W+30;
      if(f.x>W+30)f.x=-30;
      if(f.y<-30)f.y=H+30;
      if(f.y>H+30)f.y=-30;
      ctx.save();
      ctx.translate(f.x,f.y);
      ctx.rotate(f.rot);
      ctx.fillStyle=f.color;
      ctx.fillRect(-f.w/2,-f.h/2,f.w,f.h);
      ctx.restore();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 7. portfolio-consultant — "Trust Ripples" (Canvas 2D)
  'portfolio-consultant': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a1628,#0f1d32)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var maxR=Math.max(W,H)*0.8;
  var rings=[];
  function spawnRing(){
    rings.push({r:10,alpha:0.25});
  }
  spawnRing();
  var originX,originY;
  function updateOrigin(){originX=W*0.85;originY=H*0.85;}
  updateOrigin();
  addEventListener('resize',function(){updateOrigin();});
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=rings.length-1;i>=0;i--){
      var ring=rings[i];
      ring.r+=0.5;
      ring.alpha=0.25*(1-ring.r/maxR);
      if(ring.alpha<=0){
        rings.splice(i,1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(originX,originY,ring.r,0,Math.PI*2);
      ctx.strokeStyle='rgba(37,99,235,'+ring.alpha+')';
      ctx.lineWidth=1.5;
      ctx.stroke();
    }
    if(rings.length===0||rings[rings.length-1].r>maxR*0.6){
      spawnRing();
    }
    if(rings.length>0&&rings.length<3){
      var last=rings[rings.length-1];
      if(last.r>maxR*0.2&&(rings.length<2||rings[rings.length-2].r>maxR*0.6)){
        spawnRing();
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 8. portfolio-3d — "Wireframe Terrain" (Three.js)
  'portfolio-3d': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#050510,#0d0d1a)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.set(0,5,7);
  camera.lookAt(0,0,0);
  scene.add(new THREE.AmbientLight(0x404040));
  var pl=new THREE.PointLight(0xffffff,1,100);pl.position.set(5,5,5);scene.add(pl);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var geo=new THREE.PlaneGeometry(10,10,20,20);
  var verts=geo.attributes.position;
  for(var i=0;i<verts.count;i++){
    verts.setZ(i,(Math.random()-0.5)*1.2);
  }
  geo.computeVertexNormals();
  var mat=new THREE.MeshBasicMaterial({color:0x1e3a5f,wireframe:true,transparent:true,opacity:0.4});
  var terrain=new THREE.Mesh(geo,mat);
  terrain.rotation.x=-Math.PI*0.45;
  scene.add(terrain);
  var isDragging=false,prevDX=0,prevDY=0,rotY=0,rotX=0;
  C.style.pointerEvents='auto';
  C.addEventListener('mousedown',function(e){isDragging=true;prevDX=e.clientX;prevDY=e.clientY;});
  addEventListener('mouseup',function(){isDragging=false;});
  addEventListener('mousemove',function(e){
    if(isDragging){
      rotY+=(e.clientX-prevDX)*0.005;
      rotX+=(e.clientY-prevDY)*0.005;
      prevDX=e.clientX;prevDY=e.clientY;
    }
  });
  var autoRot=0;
  function update(){
    autoRot+=0.002;
    terrain.rotation.z=autoRot+rotY;
    terrain.rotation.x=-Math.PI*0.45+rotX;
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // ============================================================
  // ECOMMERCE (8 templates)
  // ============================================================

  // 9. ecommerce-fashion — "Liquid Shimmer" (Canvas 2D)
  'ecommerce-fashion': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#fafafa,#f5f5f5)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var t=0;
  var waves=[
    {freq:0.008,amp:12,speed:0.015,phase:0},
    {freq:0.012,amp:8,speed:0.02,phase:2},
    {freq:0.006,amp:15,speed:0.01,phase:4},
    {freq:0.015,amp:6,speed:0.025,phase:1},
    {freq:0.01,amp:10,speed:0.018,phase:3}
  ];
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=1;
    var bandH=H/waves.length;
    for(var w=0;w<waves.length;w++){
      var wave=waves[w];
      var baseY=w*bandH;
      ctx.beginPath();
      ctx.moveTo(0,baseY);
      for(var x=0;x<=W;x+=4){
        var y=baseY+Math.sin(x*wave.freq+t*wave.speed+wave.phase)*wave.amp;
        y+=Math.sin(x*wave.freq*1.5+t*wave.speed*0.7)*wave.amp*0.5;
        ctx.lineTo(x,y);
      }
      ctx.lineTo(W,baseY+bandH+30);
      ctx.lineTo(0,baseY+bandH+30);
      ctx.closePath();
      ctx.fillStyle='rgba(17,17,17,0.03)';
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 10. ecommerce-product — "Product Rotate" (Three.js)
  'ecommerce-product': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#fafafa,#f0f0f0)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  var ambLight=new THREE.AmbientLight(0x404040,0.6);scene.add(ambLight);
  var keyLight=new THREE.DirectionalLight(0xffffff,0.9);keyLight.position.set(5,5,5);scene.add(keyLight);
  var fillLight=new THREE.DirectionalLight(0xffffff,0.4);fillLight.position.set(-3,2,3);scene.add(fillLight);
  var rimLight=new THREE.PointLight(0xffffff,0.5,50);rimLight.position.set(0,-3,-5);scene.add(rimLight);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var geo=new THREE.TorusKnotGeometry(1.2,0.4,128,32);
  var mat=new THREE.MeshPhongMaterial({color:0xffffff,shininess:120,specular:0x444444});
  var knot=new THREE.Mesh(geo,mat);
  scene.add(knot);
  var scrollY=0;
  addEventListener('scroll',function(){scrollY=window.pageYOffset||document.documentElement.scrollTop;});
  function update(){
    var hue=(scrollY*0.001)%1;
    var c=new THREE.Color();
    c.setHSL(hue,0.7,0.6);
    mat.color=c;
    knot.rotation.y+=0.008;
    knot.rotation.x=Math.sin(Date.now()*0.0005)*0.3;
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 11. ecommerce-digital — "Pixel Grid" (Canvas 2D)
  'ecommerce-digital': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0f,#111118)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var size=8,gap=4,step=size+gap;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    var cols=Math.ceil(W/step)+1;
    var rows=Math.ceil(H/step)+1;
    for(var r=0;r<rows;r++){
      for(var c=0;c<cols;c++){
        var px=c*step;
        var py=r*step;
        var dx=px-mx;
        var dy=py-my;
        var dist=Math.sqrt(dx*dx+dy*dy);
        var proximity=Math.max(0,1-dist/180);
        var alpha=0.06+proximity*0.25;
        ctx.fillStyle='rgba(139,92,246,'+alpha+')';
        ctx.fillRect(px,py,size,size);
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 12. ecommerce-food — "Rising Steam" (Canvas 2D)
  'ecommerce-food': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#faf8f5,#f5f0ea)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var particles=[];
  for(var i=0;i<20;i++){
    particles.push({
      x:Math.random()*2000,
      y:H+Math.random()*200,
      r:40+Math.random()*40,
      speed:0.2+Math.random()*0.3,
      wobbleFreq:0.01+Math.random()*0.01,
      wobbleAmp:15+Math.random()*20,
      phase:Math.random()*Math.PI*2,
      opacity:0.02+Math.random()*0.02
    });
  }
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=1;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.y-=p.speed;
      var wx=Math.sin(t*p.wobbleFreq+p.phase)*p.wobbleAmp;
      if(p.y<-p.r*2){
        p.y=H+p.r;
        p.x=Math.random()*W;
        p.phase=Math.random()*Math.PI*2;
      }
      var drawX=p.x+wx;
      var fade=1;
      if(p.y<H*0.2)fade=p.y/(H*0.2);
      var grad=ctx.createRadialGradient(drawX,p.y,0,drawX,p.y,p.r);
      grad.addColorStop(0,'rgba(239,68,68,'+(p.opacity*fade)+')');
      grad.addColorStop(0.6,'rgba(239,68,68,'+(p.opacity*0.3*fade)+')');
      grad.addColorStop(1,'rgba(239,68,68,0)');
      ctx.beginPath();
      ctx.arc(drawX,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=grad;
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 13. ecommerce-beauty — "Liquid Gold" (Canvas 2D)
  'ecommerce-beauty': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#faf5f0,#f5ece3)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var blobs=[
    {cx:0,cy:0,r:250,color1:'rgba(212,165,116,0.08)',color2:'rgba(212,165,116,0)',speedX:0.0007,speedY:0.0011,phaseX:0,phaseY:0,ampX:0,ampY:0},
    {cx:0,cy:0,r:200,color1:'rgba(236,72,153,0.05)',color2:'rgba(236,72,153,0)',speedX:0.0009,speedY:0.0006,phaseX:2,phaseY:1,ampX:0,ampY:0},
    {cx:0,cy:0,r:220,color1:'rgba(212,165,116,0.06)',color2:'rgba(212,165,116,0)',speedX:0.0005,speedY:0.0008,phaseX:4,phaseY:3,ampX:0,ampY:0}
  ];
  function updateAmps(){
    for(var i=0;i<blobs.length;i++){
      blobs[i].ampX=W*0.3;
      blobs[i].ampY=H*0.3;
    }
  }
  updateAmps();
  addEventListener('resize',function(){updateAmps();});
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=1;
    for(var i=0;i<blobs.length;i++){
      var b=blobs[i];
      var figT=t*b.speedX;
      b.cx=W/2+Math.sin(figT+b.phaseX)*b.ampX*Math.cos(figT*0.5+b.phaseY);
      b.cy=H/2+Math.sin(figT*0.8+b.phaseY)*b.ampY*Math.cos(figT*0.3+b.phaseX);
      var grad=ctx.createRadialGradient(b.cx,b.cy,0,b.cx,b.cy,b.r);
      grad.addColorStop(0,b.color1);
      grad.addColorStop(0.7,b.color1);
      grad.addColorStop(1,b.color2);
      ctx.beginPath();
      ctx.arc(b.cx,b.cy,b.r,0,Math.PI*2);
      ctx.fillStyle=grad;
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 14. ecommerce-subscription — "Confetti Burst" (Canvas 2D)
  'ecommerce-subscription': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0f,#111118)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var colors=['rgba(245,158,11,0.08)','rgba(139,92,246,0.08)','rgba(236,72,153,0.08)','rgba(59,130,246,0.08)'];
  var confetti=[];
  for(var i=0;i<40;i++){
    confetti.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      vy:0.2+Math.random()*0.5,
      vx:(Math.random()-0.5)*0.3,
      size:3+Math.random()*5,
      color:colors[Math.floor(Math.random()*colors.length)],
      rot:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-0.5)*0.03,
      wobble:Math.random()*Math.PI*2,
      wobbleSpeed:0.02+Math.random()*0.02
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<confetti.length;i++){
      var c=confetti[i];
      c.y+=c.vy;
      c.wobble+=c.wobbleSpeed;
      c.x+=c.vx+Math.sin(c.wobble)*0.3;
      c.rot+=c.rotSpeed;
      if(c.y>H+20){
        c.y=-20;
        c.x=Math.random()*W;
      }
      if(c.x<-20)c.x=W+20;
      if(c.x>W+20)c.x=-20;
      ctx.save();
      ctx.translate(c.x,c.y);
      ctx.rotate(c.rot);
      ctx.fillStyle=c.color;
      ctx.fillRect(-c.size/2,-c.size/2,c.size,c.size*0.6);
      ctx.restore();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 15. ecommerce-course — "Knowledge Stars" (Canvas 2D)
  'ecommerce-course': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#fafafa,#f0f0ff)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var dots=[];
  for(var i=0;i<80;i++){
    dots.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      vx:(Math.random()-0.5)*0.3,
      vy:(Math.random()-0.5)*0.3,
      r:1.5+Math.random()*1.5,
      pulsePhase:Math.random()*Math.PI*2,
      pulseSpeed:0.01+Math.random()*0.01
    });
  }
  var threshold=100;
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=1;
    for(var i=0;i<dots.length;i++){
      var d=dots[i];
      d.x+=d.vx;
      d.y+=d.vy;
      if(d.x<0){d.x=0;d.vx*=-1;}
      if(d.x>W){d.x=W;d.vx*=-1;}
      if(d.y<0){d.y=0;d.vy*=-1;}
      if(d.y>H){d.y=H;d.vy*=-1;}
      d.pulsePhase+=d.pulseSpeed;
      var pulse=0.5+0.5*Math.sin(d.pulsePhase);
      var dotAlpha=0.15+pulse*0.15;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r+pulse,0,Math.PI*2);
      ctx.fillStyle='rgba(124,58,237,'+dotAlpha+')';
      ctx.fill();
    }
    for(var i=0;i<dots.length;i++){
      for(var j=i+1;j<dots.length;j++){
        var dx=dots[i].x-dots[j].x;
        var dy=dots[i].y-dots[j].y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<threshold){
          var lineAlpha=0.08*(1-dist/threshold);
          ctx.beginPath();
          ctx.moveTo(dots[i].x,dots[i].y);
          ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle='rgba(124,58,237,'+lineAlpha+')';
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 16. ecommerce-saas-trial — "Timer Rings" (Canvas 2D)
  'ecommerce-saas-trial': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0f,#111118)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var maxR=Math.max(W,H)*0.6;
  var rings=[];
  var spawnInterval=60;
  var frame=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    frame++;
    if(frame%spawnInterval===0){
      rings.push({r:10,alpha:0.35});
    }
    var cx=W/2,cy=H/2;
    for(var i=rings.length-1;i>=0;i--){
      var ring=rings[i];
      ring.r+=1.5;
      ring.alpha=0.35*(1-ring.r/maxR);
      if(ring.alpha<=0||ring.r>maxR){
        rings.splice(i,1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(cx,cy,ring.r,0,Math.PI*2);
      ctx.strokeStyle='rgba(59,130,246,'+ring.alpha+')';
      ctx.lineWidth=2;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`

};
