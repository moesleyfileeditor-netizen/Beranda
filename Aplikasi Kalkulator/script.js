// script.js - theme toggle, loader hide, persist theme in localStorage
document.addEventListener('DOMContentLoaded', function(){
  const root = document.documentElement;
  const userPref = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('moes-theme');
  const initial = stored ? stored : (userPref ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initial);
  // toggle button
  const toggle = document.getElementById('themeToggle');
  if(toggle){
    toggle.addEventListener('click', function(){
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('moes-theme', next);
    });
  }
  // hide loader after 900ms (logo shine)
  const loader = document.getElementById('loader');
  setTimeout(()=>{
    if(loader){ loader.style.opacity = '0'; setTimeout(()=>loader.style.display='none',500); }
  },900);
});