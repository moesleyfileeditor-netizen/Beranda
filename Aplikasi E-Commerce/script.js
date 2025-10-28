// Auto carousel for .kategori slides
(function(){
  const container = document.querySelector('.kategori');
  if(!container) return;
  const slides = Array.from(container.querySelectorAll('.card-small'));
  let index = 0;
  const len = slides.length;
  // ensure first active
  function setActive(i){
    slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
    slides[i].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  }
  setActive(index);
  const CAROUSEL_MS = 4200; // match CSS megaZoomPan duration
  let carouselInterval = setInterval(()=>{
    index = (index+1) % len;
    setActive(index);
  }, CAROUSEL_MS);

  // Lightbox functionality for listing images
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');

  // open lightbox when any listing image clicked
  const listingImgs = Array.from(document.querySelectorAll('.card img'));
  listingImgs.forEach(img=>{
    img.addEventListener('click',()=>{
      lbImg.src = img.src;
      lightbox.classList.add('active');
      clearInterval(carouselInterval); // pause carousel
    });
  });

  function closeLightbox(){
    lightbox.classList.remove('active');
    lbImg.src = '';
  carouselInterval = setInterval(()=>{ index = (index+1) % len; setActive(index); }, CAROUSEL_MS);
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click',(e)=>{ if(e.target===lightbox) closeLightbox(); });
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape' && lightbox.classList.contains('active')) closeLightbox(); });
})();

// Nav click / active handling: add .is-active to clicked nav item and a quick pop animation
(function(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  links.forEach(a=>{
    a.addEventListener('click', (e)=>{
      // prevent default for internal anchors that are '#', allow normal navigation otherwise
      // but still mark active for visual feedback
      links.forEach(l=> l.classList.remove('is-active'));
      a.classList.add('is-active');
      // trigger a quick click animation
      a.classList.remove('clicked');
      // force reflow to restart animation
      void a.offsetWidth;
      a.classList.add('clicked');
      setTimeout(()=> a.classList.remove('clicked'), 600);
    });
  });
})();
