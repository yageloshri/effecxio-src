export default {

  // =============================================
  // STARTUP TEMPLATES (8)
  // =============================================

  // 1. startup-bold — "Floating Dodecahedron" (Three.js)
  'startup-bold': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#1a1a0a)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  var geo=new THREE.DodecahedronGeometry(1.8,0);
  var mat=new THREE.MeshBasicMaterial({color:0xfacc15,wireframe:true,transparent:true,opacity:0.35});
  var mesh=new THREE.Mesh(geo,mat);
  scene.add(mesh);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var t=0;
  function update(){
    t+=0.008;
    mesh.rotation.x+=0.003;
    mesh.rotation.y+=0.005;
    mesh.position.y=Math.sin(t)*0.4;
    mesh.position.x=Math.cos(t*0.7)*0.15;
    var tx=(mx/W-0.5)*0.3;
    var ty=(my/H-0.5)*0.3;
    camera.position.x+=(tx-camera.position.x)*0.02;
    camera.position.y+=(-ty-camera.position.y)*0.02;
    camera.lookAt(scene.position);
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 2. startup-waitlist — "Pulse Rings" (Canvas 2D)
  'startup-waitlist': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#1a1a0a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var rings=[];
  for(var i=0;i<5;i++){
    rings.push({phase:i*(Math.PI*2/5),radius:0});
  }
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.015;
    for(var i=0;i<rings.length;i++){
      var r=rings[i];
      var progress=(Math.sin(t+r.phase)+1)/2;
      var radius=progress*Math.min(W,H)*0.45;
      var opacity=1-progress;
      ctx.beginPath();
      ctx.arc(W/2,H/2,radius,0,Math.PI*2);
      ctx.strokeStyle='rgba(200,245,59,'+opacity*0.25+')';
      ctx.lineWidth=2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(W/2,H/2,radius,0,Math.PI*2);
      ctx.strokeStyle='rgba(200,245,59,'+opacity*0.1+')';
      ctx.lineWidth=8;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 3. startup-product-hunt — "Arrow Rain" (Canvas 2D)
  'startup-product-hunt': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#fafafa,#fff5f3)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var arrows=[];
  for(var i=0;i<20;i++){
    arrows.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      size:5+Math.random()*10,
      speed:0.3+Math.random()*0.7,
      opacity:0.04+Math.random()*0.08,
      wobble:Math.random()*Math.PI*2
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<arrows.length;i++){
      var a=arrows[i];
      a.y-=a.speed;
      a.wobble+=0.02;
      a.x+=Math.sin(a.wobble)*0.3;
      if(a.y<-30){
        a.y=H+30;
        a.x=Math.random()*W;
      }
      ctx.save();
      ctx.translate(a.x,a.y);
      ctx.beginPath();
      ctx.moveTo(0,-a.size);
      ctx.lineTo(-a.size*0.6,a.size*0.5);
      ctx.lineTo(a.size*0.6,a.size*0.5);
      ctx.closePath();
      ctx.fillStyle='rgba(255,97,84,'+a.opacity+')';
      ctx.fill();
      ctx.restore();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 4. startup-mvp — "Hex Grid" (Canvas 2D)
  'startup-mvp': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#141410)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var spacing=40;
  var hexR=spacing*0.55;
  var raf;
  function drawHex(cx,cy,r){
    ctx.beginPath();
    for(var i=0;i<6;i++){
      var angle=Math.PI/3*i-Math.PI/6;
      var hx=cx+r*Math.cos(angle);
      var hy=cy+r*Math.sin(angle);
      if(i===0)ctx.moveTo(hx,hy);
      else ctx.lineTo(hx,hy);
    }
    ctx.closePath();
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var colW=spacing*1.5;
    var rowH=spacing*Math.sqrt(3);
    var cols=Math.ceil(W/colW)+2;
    var rows=Math.ceil(H/rowH)+2;
    for(var col=0;col<cols;col++){
      for(var row=0;row<rows;row++){
        var cx=col*colW;
        var cy=row*rowH+(col%2?rowH*0.5:0);
        var dx=mx-cx;
        var dy=my-cy;
        var dist=Math.sqrt(dx*dx+dy*dy);
        var prox=Math.max(0,1-dist/200);
        drawHex(cx,cy,hexR);
        ctx.fillStyle='rgba(250,204,21,'+(0.02+prox*0.08)+')';
        ctx.fill();
        ctx.strokeStyle='rgba(250,204,21,'+(0.05+prox*0.2)+')';
        ctx.lineWidth=0.5;
        ctx.stroke();
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 5. startup-b2b — "Blueprint Grid" (Canvas 2D)
  'startup-b2b': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a1628,#0f1d32)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var t=0;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t+=0.002;
    var bigStep=80;
    var smallStep=20;
    ctx.strokeStyle='rgba(37,99,235,0.03)';
    ctx.lineWidth=0.5;
    for(var x=0;x<W;x+=smallStep){
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
    }
    for(var y=0;y<H;y+=smallStep){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
    }
    ctx.strokeStyle='rgba(37,99,235,0.06)';
    ctx.lineWidth=1;
    for(var x=0;x<W;x+=bigStep){
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();
    }
    for(var y=0;y<H;y+=bigStep){
      ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();
    }
    var scanY=(t*200)%H;
    ctx.strokeStyle='rgba(37,99,235,0.12)';
    ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(0,scanY);ctx.lineTo(W,scanY);ctx.stroke();
    var grad=ctx.createLinearGradient(0,scanY-30,0,scanY+30);
    grad.addColorStop(0,'rgba(37,99,235,0)');
    grad.addColorStop(0.5,'rgba(37,99,235,0.04)');
    grad.addColorStop(1,'rgba(37,99,235,0)');
    ctx.fillStyle=grad;
    ctx.fillRect(0,scanY-30,W,60);
    ctx.fillStyle='rgba(37,99,235,0.15)';
    for(var x=0;x<W;x+=bigStep){
      for(var y=0;y<H;y+=bigStep){
        var dx=mx-x;var dy=my-y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<150){
          ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fill();
        }
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 6. startup-community — "Connected Stars" (Canvas 2D)
  'startup-community': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#1a0a1a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var dots=[];
  for(var i=0;i<60;i++){
    dots.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      vx:(Math.random()-0.5)*0.4,
      vy:(Math.random()-0.5)*0.4,
      r:1.5+Math.random()*2
    });
  }
  var connectDist=120;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<dots.length;i++){
      var d=dots[i];
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0||d.x>W)d.vx*=-1;
      if(d.y<0||d.y>H)d.vy*=-1;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fillStyle='rgba(236,72,153,0.5)';
      ctx.fill();
      for(var j=i+1;j<dots.length;j++){
        var d2=dots[j];
        var dx=d.x-d2.x;var dy=d.y-d2.y;
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<connectDist){
          ctx.beginPath();
          ctx.moveTo(d.x,d.y);
          ctx.lineTo(d2.x,d2.y);
          ctx.strokeStyle='rgba(236,72,153,'+(0.15*(1-dist/connectDist))+')';
          ctx.lineWidth=0.5;
          ctx.stroke();
        }
      }
      var dmx=d.x-mx;var dmy=d.y-my;
      var mdist=Math.sqrt(dmx*dmx+dmy*dmy);
      if(mdist<150){
        ctx.beginPath();
        ctx.moveTo(d.x,d.y);
        ctx.lineTo(mx,my);
        ctx.strokeStyle='rgba(236,72,153,'+(0.2*(1-mdist/150))+')';
        ctx.lineWidth=0.8;
        ctx.stroke();
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 7. startup-mobile — "Phone Orbit" (Three.js)
  'startup-mobile': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a1a,#10102a)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=6;
  scene.add(new THREE.AmbientLight(0x404040,0.6));
  var pl=new THREE.PointLight(0x4f46e5,2,50);pl.position.set(3,3,5);scene.add(pl);
  var pl2=new THREE.PointLight(0x8b5cf6,1,50);pl2.position.set(-3,-2,3);scene.add(pl2);
  var phoneGeo=new THREE.BoxGeometry(0.8,1.5,0.08);
  var phoneMat=new THREE.MeshPhongMaterial({color:0x4f46e5,transparent:true,opacity:0.6,shininess:100});
  var phone=new THREE.Mesh(phoneGeo,phoneMat);
  scene.add(phone);
  var edgesGeo=new THREE.EdgesGeometry(phoneGeo);
  var edgesMat=new THREE.LineBasicMaterial({color:0x8b5cf6,transparent:true,opacity:0.4});
  var edges=new THREE.LineSegments(edgesGeo,edgesMat);
  phone.add(edges);
  var screenGeo=new THREE.PlaneGeometry(0.6,1.2);
  var screenMat=new THREE.MeshBasicMaterial({color:0x1a1a3a,transparent:true,opacity:0.5});
  var screen=new THREE.Mesh(screenGeo,screenMat);
  screen.position.z=0.045;
  phone.add(screen);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var t=0;
  function update(){
    t+=0.008;
    phone.rotation.y=Math.sin(t)*0.4;
    phone.rotation.x=Math.sin(t*0.7)*0.15+0.1;
    phone.rotation.z=Math.cos(t*0.5)*0.05;
    phone.position.y=Math.sin(t*1.2)*0.3;
    phone.position.x=Math.cos(t*0.8)*0.2;
    var tx=(mx/W-0.5)*0.5;
    var ty=(my/H-0.5)*0.5;
    camera.position.x+=(tx-camera.position.x)*0.02;
    camera.position.y+=(-ty-camera.position.y)*0.02;
    camera.lookAt(scene.position);
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 8. startup-open-source — "Git Command Fall" (Canvas 2D)
  'startup-open-source': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#0a140a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var words=['git commit','npm install','fork','merge','push','pull request','git branch','open source'];
  var items=[];
  for(var i=0;i<8;i++){
    items.push({
      text:words[i],
      x:Math.random()*2000,
      y:Math.random()*2000,
      speed:0.2+Math.random()*0.4,
      size:12+Math.random()*8,
      opacity:0.04+Math.random()*0.04
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.textAlign='center';
    for(var i=0;i<items.length;i++){
      var it=items[i];
      it.y+=it.speed;
      if(it.y>H+50){
        it.y=-50;
        it.x=Math.random()*W;
      }
      ctx.font=it.size+'px monospace';
      ctx.fillStyle='rgba(34,197,94,'+it.opacity+')';
      ctx.fillText(it.text,it.x,it.y);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // =============================================
  // AGENCY TEMPLATES (8)
  // =============================================

  // 9. agency-creative — "Cursor Trail" (Canvas 2D)
  'agency-creative': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#1a0a0a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var particles=[];
  var maxP=150;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    if(particles.length<maxP){
      particles.push({
        x:mx,
        y:my,
        vx:(Math.random()-0.5)*2,
        vy:(Math.random()-0.5)*2-1,
        life:1,
        decay:0.01+Math.random()*0.015,
        hue:20+Math.random()*40,
        size:2+Math.random()*4
      });
    }
    for(var i=particles.length-1;i>=0;i--){
      var p=particles[i];
      p.x+=p.vx;
      p.y+=p.vy;
      p.vy+=0.05;
      p.life-=p.decay;
      if(p.life<=0){
        particles.splice(i,1);
        continue;
      }
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);
      ctx.fillStyle='hsla('+p.hue+',90%,60%,'+p.life*0.5+')';
      ctx.fill();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 10. agency-digital — "ROI Floats" (Canvas 2D)
  'agency-digital': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#0a0a1a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var symbols=['$','%','\\u2191','\\u00d72','+ROI','$$$','\\u2191\\u2191','10x','%','$','\\u2191','\\u00d73','$','%','\\u2191','ROI','$','%','2x','\\u2191'];
  var items=[];
  for(var i=0;i<20;i++){
    items.push({
      text:symbols[i],
      x:Math.random()*2000,
      y:Math.random()*2000,
      speed:0.2+Math.random()*0.5,
      size:12+Math.random()*20,
      opacity:0.04+Math.random()*0.06,
      wobble:Math.random()*Math.PI*2
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.textAlign='center';
    for(var i=0;i<items.length;i++){
      var it=items[i];
      it.y-=it.speed;
      it.wobble+=0.01;
      it.x+=Math.sin(it.wobble)*0.3;
      if(it.y<-50){
        it.y=H+50;
        it.x=Math.random()*W;
      }
      ctx.font='bold '+it.size+'px sans-serif';
      ctx.fillStyle='rgba(124,58,237,'+it.opacity+')';
      ctx.fillText(it.text,it.x,it.y);
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 11. agency-motion — "Particle Morph" (Three.js)
  'agency-motion': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#1a0a00)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=5;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var count=2000;
  var geo=new THREE.BufferGeometry();
  var posArr=new Float32Array(count*3);
  var randArr=new Float32Array(count*3);
  var gridArr=new Float32Array(count*3);
  var gridSide=Math.ceil(Math.pow(count,1/3));
  var spacing=0.12;
  for(var i=0;i<count;i++){
    randArr[i*3]=(Math.random()-0.5)*6;
    randArr[i*3+1]=(Math.random()-0.5)*6;
    randArr[i*3+2]=(Math.random()-0.5)*6;
    var ix=i%gridSide;
    var iy=Math.floor(i/gridSide)%gridSide;
    var iz=Math.floor(i/(gridSide*gridSide));
    gridArr[i*3]=(ix-gridSide/2)*spacing;
    gridArr[i*3+1]=(iy-gridSide/2)*spacing;
    gridArr[i*3+2]=(iz-gridSide/2)*spacing;
    posArr[i*3]=randArr[i*3];
    posArr[i*3+1]=randArr[i*3+1];
    posArr[i*3+2]=randArr[i*3+2];
  }
  geo.setAttribute('position',new THREE.BufferAttribute(posArr,3));
  var mat=new THREE.PointsMaterial({color:0xf97316,size:0.04,transparent:true,opacity:0.7});
  var points=new THREE.Points(geo,mat);
  scene.add(points);
  var t=0;
  function smoothstep(a,b,x){var v=(x-a)/(b-a);v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);}
  function update(){
    t+=0.005;
    var blend=smoothstep(0,1,(Math.sin(t)+1)/2);
    var pos=geo.attributes.position.array;
    for(var i=0;i<count;i++){
      var i3=i*3;
      pos[i3]=randArr[i3]*(1-blend)+gridArr[i3]*blend;
      pos[i3+1]=randArr[i3+1]*(1-blend)+gridArr[i3+1]*blend;
      pos[i3+2]=randArr[i3+2]*(1-blend)+gridArr[i3+2]*blend;
    }
    geo.attributes.position.needsUpdate=true;
    points.rotation.y+=0.002;
    points.rotation.x+=0.001;
    var tx=(mx/W-0.5)*1.5;
    var ty=(my/H-0.5)*1.5;
    camera.position.x+=(tx-camera.position.x)*0.02;
    camera.position.y+=(-ty-camera.position.y)*0.02;
    camera.lookAt(scene.position);
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 12. agency-branding — "Scroll Letters" (Three.js)
  'agency-branding': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#141414)';return;}
  var W=innerWidth,H=innerHeight,mx=W/2,my=H/2;
  var scene=new THREE.Scene();
  var camera=new THREE.PerspectiveCamera(75,W/H,0.1,1000);
  var renderer=new THREE.WebGLRenderer({canvas:C,alpha:true});
  renderer.setSize(W,H);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  camera.position.z=8;
  scene.add(new THREE.AmbientLight(0x404040,0.8));
  var pl=new THREE.PointLight(0xd97706,2,50);pl.position.set(5,5,5);scene.add(pl);
  var pl2=new THREE.PointLight(0xe2e8f0,1,50);pl2.position.set(-5,-3,3);scene.add(pl2);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var letters=[];
  var letterMat=new THREE.MeshPhongMaterial({color:0xd97706,transparent:true,opacity:0.5,shininess:80});
  for(var i=0;i<5;i++){
    var geo=new THREE.BoxGeometry(0.5,0.7,0.15);
    var mesh=new THREE.Mesh(geo,letterMat.clone());
    mesh.userData={
      startX:(Math.random()-0.5)*10,
      startY:(Math.random()-0.5)*8,
      startZ:(Math.random()-0.5)*4,
      startRx:Math.random()*Math.PI*2,
      startRy:Math.random()*Math.PI*2,
      startRz:Math.random()*Math.PI*2,
      targetX:(i-2)*0.9,
      targetY:0,
      targetZ:0
    };
    mesh.position.set(mesh.userData.startX,mesh.userData.startY,mesh.userData.startZ);
    mesh.rotation.set(mesh.userData.startRx,mesh.userData.startRy,mesh.userData.startRz);
    scene.add(mesh);
    letters.push(mesh);
  }
  var scrollProgress=0;
  addEventListener('scroll',function(){
    var maxScroll=document.documentElement.scrollHeight-innerHeight;
    scrollProgress=maxScroll>0?window.scrollY/maxScroll:0;
  });
  function lerp(a,b,t){return a+(b-a)*t;}
  function easeInOut(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);}
  function update(){
    var p=easeInOut(Math.min(1,scrollProgress*3));
    for(var i=0;i<letters.length;i++){
      var m=letters[i];var u=m.userData;
      m.position.x=lerp(u.startX,u.targetX,p);
      m.position.y=lerp(u.startY,u.targetY,p);
      m.position.z=lerp(u.startZ,u.targetZ,p);
      m.rotation.x=lerp(u.startRx,0,p);
      m.rotation.y=lerp(u.startRy,0,p);
      m.rotation.z=lerp(u.startRz,0,p);
    }
    var tx=(mx/W-0.5)*0.5;
    var ty=(my/H-0.5)*0.5;
    camera.position.x+=(tx-camera.position.x)*0.02;
    camera.position.y+=(-ty-camera.position.y)*0.02;
    camera.lookAt(scene.position);
  }
  addEventListener('resize',function(){W=innerWidth;H=innerHeight;renderer.setSize(W,H);camera.aspect=W/H;camera.updateProjectionMatrix();});
  var raf;
  function loop(){raf=requestAnimationFrame(loop);update();renderer.render(scene,camera);}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 13. agency-seo — "Growth Flow Field" (Canvas 2D)
  'agency-seo': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#0a140a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var particles=[];
  for(var i=0;i<200;i++){
    particles.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      px:0,py:0,
      speed:0.5+Math.random()*1,
      life:Math.random()
    });
  }
  var t=0;
  var raf;
  function noise(x,y){
    return Math.sin(x*0.01+t)*Math.cos(y*0.01+t*0.7)+Math.sin((x+y)*0.005+t*0.5);
  }
  function draw(){
    ctx.fillStyle='rgba(10,10,10,0.05)';
    ctx.fillRect(0,0,W,H);
    t+=0.01;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.px=p.x;p.py=p.y;
      var angle=noise(p.x,p.y)*Math.PI*2;
      p.x+=Math.cos(angle)*p.speed;
      p.y+=Math.sin(angle)*p.speed;
      if(p.x<0||p.x>W||p.y<0||p.y>H){
        p.x=Math.random()*W;p.y=Math.random()*H;
        p.px=p.x;p.py=p.y;
      }
      ctx.beginPath();
      ctx.moveTo(p.px,p.py);
      ctx.lineTo(p.x,p.y);
      ctx.strokeStyle='rgba(34,197,94,0.3)';
      ctx.lineWidth=0.8;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 14. agency-social — "Social Icons Float" (Canvas 2D)
  'agency-social': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#140a14)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var icons=['\\u2665','\\ud83d\\udc4d','\\u2b50','\\ud83d\\udcac','\\ud83d\\udcf1','\\ud83d\\udd14','\\u2665','\\ud83d\\udc4d','\\u2b50','\\ud83d\\udcac','\\ud83d\\udcf1','\\ud83d\\udd14','\\u2665','\\ud83d\\udc4d','\\u2b50','\\ud83d\\udcac','\\ud83d\\udcf1','\\ud83d\\udd14','\\u2665','\\ud83d\\udc4d'];
  var items=[];
  for(var i=0;i<20;i++){
    items.push({
      icon:icons[i],
      x:Math.random()*2000,
      y:Math.random()*2000,
      speed:0.15+Math.random()*0.35,
      size:16+Math.random()*20,
      opacity:0.06+Math.random()*0.09,
      wobble:Math.random()*Math.PI*2,
      wobbleSpeed:0.008+Math.random()*0.012
    });
  }
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    for(var i=0;i<items.length;i++){
      var it=items[i];
      it.y-=it.speed;
      it.wobble+=it.wobbleSpeed;
      it.x+=Math.sin(it.wobble)*0.4;
      if(it.y<-50){
        it.y=H+50;
        it.x=Math.random()*W;
      }
      ctx.globalAlpha=it.opacity;
      ctx.font=it.size+'px sans-serif';
      ctx.fillText(it.icon,it.x,it.y);
    }
    ctx.globalAlpha=1;
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 15. agency-web — "Code Grid" (Canvas 2D)
  'agency-web': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#0a0a0a,#0a0a1a)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var dots=[];
  for(var i=0;i<100;i++){
    dots.push({
      x:Math.random()*2000,
      y:Math.random()*2000,
      ox:0,oy:0,
      vx:(Math.random()-0.5)*0.3,
      vy:(Math.random()-0.5)*0.3
    });
  }
  var connectRadius=80;
  var raf;
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<dots.length;i++){
      var d=dots[i];
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0)d.x=W;if(d.x>W)d.x=0;
      if(d.y<0)d.y=H;if(d.y>H)d.y=0;
      var dmx=d.x-mx;var dmy=d.y-my;
      var mdist=Math.sqrt(dmx*dmx+dmy*dmy);
      ctx.beginPath();
      ctx.arc(d.x,d.y,2,0,Math.PI*2);
      if(mdist<connectRadius*2){
        ctx.fillStyle='rgba(59,130,246,'+(0.6*(1-mdist/(connectRadius*2)))+')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(d.x,d.y,4*(1-mdist/(connectRadius*2)),0,Math.PI*2);
        ctx.fillStyle='rgba(59,130,246,'+(0.2*(1-mdist/(connectRadius*2)))+')';
        ctx.fill();
      } else {
        ctx.fillStyle='rgba(59,130,246,0.15)';
        ctx.fill();
      }
      if(mdist<connectRadius){
        ctx.beginPath();
        ctx.moveTo(d.x,d.y);
        ctx.lineTo(mx,my);
        ctx.strokeStyle='rgba(59,130,246,'+(0.15*(1-mdist/connectRadius))+')';
        ctx.lineWidth=0.8;
        ctx.stroke();
        for(var j=i+1;j<dots.length;j++){
          var d2=dots[j];
          var d2mx=d2.x-mx;var d2my=d2.y-my;
          var d2mdist=Math.sqrt(d2mx*d2mx+d2my*d2my);
          if(d2mdist<connectRadius){
            var ddist=Math.sqrt(Math.pow(d.x-d2.x,2)+Math.pow(d.y-d2.y,2));
            if(ddist<connectRadius){
              ctx.beginPath();
              ctx.moveTo(d.x,d.y);
              ctx.lineTo(d2.x,d2.y);
              ctx.strokeStyle='rgba(59,130,246,'+(0.1*(1-ddist/connectRadius))+')';
              ctx.lineWidth=0.5;
              ctx.stroke();
            }
          }
        }
      }
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`,

  // 16. agency-ai — "Neural Flow" (Canvas 2D)
  'agency-ai': `(function(){
  var isP=self!==top,C=document.getElementById('bg-canvas');
  if(isP){C.style.background='linear-gradient(135deg,#050510,#0a0520)';return;}
  var ctx=C.getContext('2d'),W,H,mx,my;
  function resize(){W=C.width=innerWidth;H=C.height=innerHeight;mx=W/2;my=H/2;}
  resize();addEventListener('resize',resize);
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;});
  var particles=[];
  var numStreams=8;
  for(var i=0;i<150;i++){
    var stream=Math.floor(Math.random()*numStreams);
    var baseY=(stream+0.5)*(H/numStreams);
    particles.push({
      x:Math.random()*2000,
      y:baseY+((Math.random()-0.5)*60),
      baseY:baseY,
      speed:1+Math.random()*2,
      amp:15+Math.random()*25,
      freq:0.003+Math.random()*0.004,
      phase:Math.random()*Math.PI*2,
      size:1+Math.random()*2,
      hue:260+Math.random()*40,
      opacity:0.15+Math.random()*0.2
    });
  }
  var t=0;
  var raf;
  function draw(){
    ctx.fillStyle='rgba(5,5,16,0.12)';
    ctx.fillRect(0,0,W,H);
    t+=0.01;
    for(var i=0;i<particles.length;i++){
      var p=particles[i];
      p.x+=p.speed;
      if(p.x>W+20){
        p.x=-20;
        var stream=Math.floor(Math.random()*numStreams);
        p.baseY=(stream+0.5)*(H/numStreams);
      }
      var yOff=Math.sin(p.x*p.freq+p.phase+t)*p.amp;
      var yOff2=Math.cos(p.x*p.freq*1.5+p.phase*0.7+t*0.8)*p.amp*0.3;
      p.y=p.baseY+yOff+yOff2;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fillStyle='hsla('+p.hue+',70%,65%,'+p.opacity+')';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size+2,0,Math.PI*2);
      ctx.fillStyle='hsla('+p.hue+',70%,65%,'+(p.opacity*0.2)+')';
      ctx.fill();
    }
    for(var s=0;s<numStreams;s++){
      var sy=(s+0.5)*(H/numStreams);
      ctx.beginPath();
      ctx.moveTo(0,sy);
      for(var x=0;x<W;x+=20){
        var ny=sy+Math.sin(x*0.004+t)*20+Math.cos(x*0.006+t*0.7)*10;
        ctx.lineTo(x,ny);
      }
      ctx.strokeStyle='rgba(139,92,246,0.03)';
      ctx.lineWidth=1;
      ctx.stroke();
    }
  }
  function loop(){raf=requestAnimationFrame(loop);draw();}
  loop();
  document.addEventListener('visibilitychange',function(){if(document.hidden)cancelAnimationFrame(raf);else loop();});
})();`

};
