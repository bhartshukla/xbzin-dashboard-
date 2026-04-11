
(function() {
  // Wait for Lenis to be available with fallback smooth scroll
  let lenis;
  const initLenis = () => {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { if (lenis) lenis.raf(time * 1000); });
    } else {
      // Fallback: use default scroll, but still update ScrollTrigger
      window.addEventListener('scroll', () => ScrollTrigger.update());
    }
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLenis);
  } else {
    initLenis();
  }
  
  gsap.ticker.lagSmoothing(0);
  gsap.registerPlugin(ScrollTrigger);
})();

/* ── HAMBURGER MENU TOGGLE (CSS class toggle, no inline JS style abuse) ── */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  const mobileMenuClass = 'nav-links-mobile';
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .nav-links-mobile {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 70px;
      right: 5%;
      background-color: var(--cream);
      padding: 1.5rem;
      gap: 1rem;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      z-index: 1000;
    }
    @media (min-width: 769px) {
      .nav-links-mobile {
        display: flex !important;
        flex-direction: row;
        position: static;
        background-color: transparent;
        padding: 0;
        box-shadow: none;
      }
    }
  `;
  document.head.appendChild(styleSheet);
  
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('nav-links-mobile');
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('nav-links-mobile');
    }
  });
}

/* ── ABOUT END REVEAL (single ScrollTrigger) ── */
ScrollTrigger.create({
  trigger: '#about-end',
  start: 'top 70%',
  onEnter: () => document.getElementById('about-end').classList.add('visible'),
  onLeaveBack: () => document.getElementById('about-end').classList.remove('visible'),
});

/* ── PROJECTS HORIZONTAL ── */
(function(){
  const container = document.getElementById('projectsContainer');
  const section   = document.getElementById('projectsScrollSection');
  const label     = document.getElementById('projProgress');
  if (!container || !section) return;
  function getAmt(){ return -(container.scrollWidth - window.innerWidth); }
  gsap.to(container, {
    x: getAmt,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: 'top top',
      end: () => '+=' + (-getAmt()),
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = (self.progress * 100).toFixed(0).padStart(2,'0');
        if(label) label.textContent = '('+p+'%)';
      }
    }
  });
})();

/* ── WEBGL PIXEL REVEAL (only renders when section enters view, hidden on small screens) ── */
(function(){
  const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 600;
  const stage = document.getElementById('webglStage');
  if (!stage) return;
  
  if (isSmallScreen) {
    stage.style.background = '#000';
    stage.style.display = 'block';
    const canvasEl = stage.querySelector('canvas');
    if (canvasEl) canvasEl.style.display = 'none';
    const imgEl = stage.querySelector('img');
    if (imgEl) imgEl.style.display = 'none';
    return;
  }

  const lerp=(a,b,t)=>a+(b-a)*t;
  const damp=(a,b,lambda,dt)=>lerp(a,b,1-Math.exp(-lambda*dt));

  const vert=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
  const fragBase=`precision highp float;uniform sampler2D uTexture;uniform vec2 uImageSize;uniform vec2 uPlaneSize;varying vec2 vUv;vec2 coverUv(vec2 uv,vec2 img,vec2 plane){float ia=img.x/img.y;float pa=plane.x/plane.y;vec2 s=vec2(1.0);if(pa>ia)s.y=ia/pa;else s.x=pa/ia;return(uv-0.5)*s+0.5;}void main(){vec2 uv=coverUv(vUv,uImageSize,uPlaneSize);uv=clamp(uv,0.0,1.0);gl_FragColor=texture2D(uTexture,uv);}`;
  const fragCover=`precision highp float;uniform float uProgress;uniform float uRawProgress;uniform float uPixelSize;uniform float uTime;uniform vec2 uPlaneSize;uniform sampler2D uChars;uniform float uCharCount;varying vec2 vUv;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}float hash3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);}void main(){vec2 gridSize=uPlaneSize/uPixelSize;vec2 pixelId=floor(vUv*gridSize);vec2 gridUv=pixelId/gridSize;vec2 gridFrac=fract(vUv*gridSize);float blockRand=hash(pixelId);float progressY=1.0-gridUv.y;float rowRand=hash(vec2(0.0,pixelId.y));float delay=progressY+0.35*blockRand+0.05*rowRand;float blockReveal=uProgress-delay;float softEdge=0.025;float blockAlpha=1.0-smoothstep(-softEdge,softEdge,blockReveal);if(blockAlpha<0.004)discard;float timeFlicker=floor(uTime*8.0);float charIndex=floor(hash3(vec3(pixelId,timeFlicker))*uCharCount);float fontMargin=0.08+0.08*hash(pixelId+17.3);vec2 charUV=vec2(gridFrac.x*(1.0-2.0*fontMargin)+fontMargin,(charIndex+gridFrac.y)/uCharCount);float letterMask=texture2D(uChars,charUV).r;float letterAppearBase=-0.20;float letterAppearThresh=letterAppearBase+0.07*blockRand;float letterShow=smoothstep(letterAppearThresh,0.0,blockReveal)*blockAlpha;letterShow*=step(0.002,uProgress);float thresh=0.28+0.10*hash(pixelId+333.0);float letterAlpha=smoothstep(thresh-0.08,thresh+0.08,letterMask)*pow(max(letterShow,0.0),0.65+0.3*hash(pixelId+544.0));if(letterAlpha<0.4&&hash(pixelId+uRawProgress*7.577)>0.62){float charIndex2=mod(charIndex+1.0,uCharCount);vec2 charUV2=vec2(charUV.x,(charIndex2+gridFrac.y)/uCharCount);float letterMask2=texture2D(uChars,charUV2).r;float letterAlpha2=smoothstep(thresh-0.08,thresh+0.08,letterMask2)*letterShow;letterAlpha=max(letterAlpha,letterAlpha2*0.55);}float lightness=0.03+0.04*hash(pixelId+77.0);vec3 blockColor=vec3(lightness);vec3 glyphBase=mix(vec3(0.85,0.86,0.92),vec3(0.98,0.97,0.95),hash(pixelId+149.0));vec3 glyphColor=mix(glyphBase,vec3(1.0),0.18+0.24*hash(pixelId+999.0));vec2 cellCenter=gridFrac-0.5;float innerVig=1.0-smoothstep(0.3,0.5,length(cellCenter));blockColor*=0.7+0.3*innerVig;vec3 finalRgb=mix(blockColor,glyphColor,letterAlpha);float finalAlpha=blockAlpha;gl_FragColor=vec4(finalRgb,finalAlpha);}`;

  const CHARS=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#','@','!','?','%','&','*','+','-','=','~','^','░','▒','▓','█','■','□'];
  const img=document.getElementById('sourceImg');
  const display=document.getElementById('progressDisplay');

  function buildAtlas(chars,cellPx=96){
    const c=document.createElement('canvas');
    c.width=cellPx;c.height=cellPx*chars.length;
    const ctx=c.getContext('2d');
    ctx.fillStyle='#000';ctx.fillRect(0,0,c.width,c.height);
    ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.font=`bold ${Math.round(cellPx*0.70)}px "Courier New",monospace`;
    chars.forEach((ch,i)=>ctx.fillText(ch,cellPx/2,cellPx*i+cellPx/2));
    return c;
  }

  function waitImg(el){return new Promise(res=>{if(el.complete&&el.naturalWidth)return res(el);el.onload=el.onerror=()=>res(el);});}

  let isWebGLActive = false;
  
  async function boot(){
    await waitImg(img);
    const W=stage.clientWidth,H=stage.clientHeight;
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(W,H);renderer.autoClear=false;renderer.sortObjects=false;
    stage.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
    const geo=new THREE.PlaneGeometry(2,2);
    const imgTex=new THREE.Texture(img);
    imgTex.needsUpdate=true;imgTex.minFilter=THREE.LinearFilter;imgTex.magFilter=THREE.LinearFilter;imgTex.generateMipmaps=false;
    const baseMat=new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:fragBase,uniforms:{uTexture:{value:imgTex},uImageSize:{value:new THREE.Vector2(img.naturalWidth||2000,img.naturalHeight||1333)},uPlaneSize:{value:new THREE.Vector2(W,H)}},depthTest:false});
    scene.add(new THREE.Mesh(geo,baseMat));
    const atlasCvs=buildAtlas(CHARS,96);
    const charsTex=new THREE.CanvasTexture(atlasCvs);
    charsTex.minFilter=THREE.LinearFilter;charsTex.magFilter=THREE.LinearFilter;charsTex.generateMipmaps=false;
    const coverMat=new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:fragCover,uniforms:{uProgress:{value:0.0},uRawProgress:{value:0.0},uPixelSize:{value:20.0},uTime:{value:0.0},uPlaneSize:{value:new THREE.Vector2(W,H)},uChars:{value:charsTex},uCharCount:{value:CHARS.length}},transparent:true,depthWrite:false,depthTest:false});
    scene.add(new THREE.Mesh(geo,coverMat));
    window.addEventListener('resize',()=>{
      const w=stage.clientWidth,h=stage.clientHeight;
      renderer.setSize(w,h);
      baseMat.uniforms.uPlaneSize.value.set(w,h);
      coverMat.uniforms.uPlaneSize.value.set(w,h);
    });
    let rawProgress=0,smoothProgress=0;
    ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self){ rawProgress=gsap.utils.clamp(0,1,(self.progress-0.05)/0.85); }
    });
    let prevTime=0;
    function loop(time){
      requestAnimationFrame(loop);
      const dt=Math.min((time-prevTime)/1000,0.05);prevTime=time;
      ScrollTrigger.update();
      smoothProgress=damp(smoothProgress,rawProgress,6.5,dt);
      coverMat.uniforms.uProgress.value=smoothProgress;
      coverMat.uniforms.uRawProgress.value=rawProgress;
      coverMat.uniforms.uTime.value=time*0.001;
      const pct=Math.round(smoothProgress*100);
      if(display) display.textContent=pct+'%';
      if(display) display.style.color=smoothProgress>0.5?'rgba(255,255,255,0.12)':'rgba(255,255,255,0.25)';
      renderer.clear();renderer.render(scene,camera);
    }
    requestAnimationFrame(loop);
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isWebGLActive) {
        isWebGLActive = true;
        boot();
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });
  observer.observe(stage);
})();

/* ── SKILLS LIST SCROLL (safe checks) ── */
(function(){
  const listWrapper=document.getElementById('skillsListWrapper');
  const section=document.getElementById('skillsSection');
  const items=document.querySelectorAll('.skill-item');
  if(!items.length || !listWrapper || !section) return;
  const preview=document.getElementById('skillPreview');
  const itemH=items[0].offsetHeight+6;
  const total=itemH*(items.length-1);
  gsap.to(listWrapper,{
    y:-total,ease:'none',
    scrollTrigger:{
      trigger:section,start:'top top',end:'+='+ total,
      pin:true,scrub:0.8,
      onUpdate:(self)=>{
        const idx=Math.min(Math.max(0,Math.round(self.progress*(items.length-1))), items.length-1);
        items.forEach((it,i)=>it.classList.toggle('active',i===idx));
        if(preview && items[idx] && items[idx].dataset.img) preview.src=items[idx].dataset.img;
      },
      onLeave:()=>{if(preview) gsap.to(preview,{opacity:0,duration:0.3});items.forEach(it=>it.classList.remove('active'));},
      onEnterBack:()=>{if(preview) gsap.to(preview,{opacity:1,duration:0.3});},
    }
  });
})();

/* ── PIN CARDS (safe existence checks) ── */
(function(){
  const cards=gsap.utils.toArray('.pin-card');
  if(cards.length){
    cards.forEach((card,i)=>{
      if(i<cards.length-1){
        ScrollTrigger.create({
          trigger:card,start:'top top',
          endTrigger:cards[cards.length-1],end:'top top',
          pin:true,pinSpacing:false
        });
        ScrollTrigger.create({
          trigger:cards[i+1],start:'top bottom',end:'top top',
          onUpdate:(self)=>{
            const p=self.progress;
            gsap.set(card,{
              scale:1-p*0.22,
              rotation: i%2===0 ? p*4 : -p*4,
              rotationX: i%2===0 ? p*35 : -p*35,
            });
            const overlay = card.querySelector('.pin-card-overlay');
            if(overlay) gsap.set(overlay,{opacity:p*0.45});
          }
        });
      }
    });
  }
})();

/* ── FINAL REFRESH to avoid duplicate triggers and ensure proper layering ── */
ScrollTrigger.refresh();
