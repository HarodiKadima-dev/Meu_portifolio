const root=document.documentElement;
const themeToggle=document.getElementById('theme-toggle');
const savedTheme=localStorage.getItem('pedro-theme');
if(savedTheme==='light') root.dataset.theme='light';
function updateThemeButton(){
  const isLight=root.dataset.theme==='light';
  if(themeToggle){
    themeToggle.innerHTML=isLight?'☾':'☼';
    themeToggle.setAttribute('aria-label',isLight?'Mudar para modo escuro':'Mudar para modo claro');
    themeToggle.setAttribute('title',isLight?'Mudar para modo escuro':'Mudar para modo claro');
  }
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta) meta.content=isLight?'#f4f4f2':'#050505';
}
updateThemeButton();
if(themeToggle) themeToggle.addEventListener('click',()=>{
  if(root.dataset.theme==='light') delete root.dataset.theme;
  else root.dataset.theme='light';
  localStorage.setItem('pedro-theme',root.dataset.theme||'dark');
  updateThemeButton();
});
const menuToggle=document.querySelector('.menu-toggle');const navMenu=document.querySelector('.nav-menu');
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));navMenu.classList.toggle('open',!open);});
navMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const sections=[...document.querySelectorAll('main section[id]')];const navLinks=[...document.querySelectorAll('.nav-link')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>sectionObserver.observe(section));
const progress=document.querySelector('.scroll-progress');function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';}window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('feedback-form').addEventListener('submit',event=>{event.preventDefault();const name=document.getElementById('visitor-name').value.trim()||'Visitante';const project=document.getElementById('project-select').value;const message=document.getElementById('feedback-message').value.trim();if(!project||!message)return;const body=`Olá, Pedro! Sou ${name} e visitei o teu portfólio.\n\nProjecto: ${project}\nFeedback: ${message}`;window.open('https://wa.me/244951090896?text='+encodeURIComponent(body),'_blank','noopener,noreferrer');});
