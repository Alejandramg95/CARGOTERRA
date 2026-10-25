const $ = (s) => document.querySelector(s);
const services = {
  local: { label:'MANZANILLO Y SU ZONA DE OPERACIÓN', title:'Del puerto a tu operación.', description:'Traslados de contenedores llenos y carga entre puerto, patios, bodegas y plantas. Revisamos los puntos de acceso, horarios y características del movimiento contigo.', image:'puerto-industrial-atardecer.webp', alt:'Contenedores y grúas de una terminal portuaria; imagen ilustrativa', service:'Transporte local', cta:'Cotizar transporte local' },
  vacios: { label:'DEVOLUCIONES Y REPOSICIONAMIENTOS', title:'Un vacío también necesita una ruta.', description:'Movimientos de contenedores vacíos entre patios y terminales en Manzanillo. Comparte los puntos del traslado, el tamaño y la cantidad de contenedores para revisar tu solicitud.', image:'puerto-contenedores-atardecer.webp', alt:'Terminal de contenedores al atardecer; imagen ilustrativa', service:'Contenedores vacíos', cta:'Cotizar movimiento de vacío' },
  foraneo: { label:'RUTAS SUJETAS A REVISIÓN Y DISPONIBILIDAD', title:'Desde Manzanillo, más allá.', description:'Transporte terrestre a otros destinos de México. Evaluamos cada ruta según el tipo de carga, el equipo requerido y las condiciones de recolección y entrega.', image:'carretera-atardecer.webp', alt:'Tractocamión con contenedor en carretera; imagen ilustrativa', service:'Transporte foráneo', cta:'Cotizar una ruta foránea' },
  coordinacion: { label:'RECOLECCIÓN, RUTA Y ENTREGA', title:'Los detalles también se mueven.', description:'Reunimos la información del servicio para alinear fechas, puntos de acceso e instrucciones de recolección y entrega. Una comunicación clara antes de programar el movimiento.', image:'puerto-industrial-atardecer.webp', alt:'Operación de una terminal portuaria; imagen ilustrativa', service:'Coordinación logística', cta:'Planear mi operación' }
};
const tabs = [...document.querySelectorAll('.service-tab')];
function activate(tab) {
  tabs.forEach(t => {const active = t === tab; t.classList.toggle('active', active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
  const data=services[tab.dataset.key];
  $('#service-panel').setAttribute('aria-labelledby',tab.id);
  $('#service-image').src='assets/'+data.image;$('#service-image').alt=data.alt;
  $('#service-label').textContent=data.label;$('#service-title').textContent=data.title;$('#service-description').textContent=data.description;
  $('#service-cta').dataset.quote=data.service;$('#service-cta').firstChild.textContent=data.cta+' ';
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>activate(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowDown'||e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}});});
const menu=$('.menu-toggle');const nav=$('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const form=$('#quote-form');let request='';
function showForm(){form.hidden=false;$('#review').hidden=true;$('#step-data').classList.add('current');$('#step-data').setAttribute('aria-current','step');$('#step-review').classList.remove('current');$('#step-review').removeAttribute('aria-current');}
document.addEventListener('click',e=>{const link=e.target.closest('[data-quote]');if(!link)return;showForm();$('#service').value=link.dataset.quote;if(link.dataset.quote==='Contenedores vacíos')$('#condition').value='Vacío';});
form.addEventListener('submit',e=>{
  e.preventDefault(); if(!form.reportValidity())return;
  for(const input of form.querySelectorAll('[required]')){if(!input.value.trim()){input.setCustomValidity('Completa este campo.');input.reportValidity();return;}}
  const d=Object.fromEntries(new FormData(form));Object.keys(d).forEach(k=>d[k]=d[k].trim());
  const date=d.fecha?d.fecha.split('-').reverse().join('/'):'Por definir';
  request=['SOLICITUD DE COTIZACIÓN · CARGOTERRA','','SERVICIO: '+d.servicio,'Origen: '+d.origen,'Destino: '+d.destino,'Fecha estimada: '+date,'Equipo: '+(d.equipo||'Por definir'),'Condición: '+(d.condicion||'Por definir / no aplica'),'Peso aproximado: '+(d.peso?Number(d.peso).toLocaleString('es-MX')+' kg':'Por definir'),'','CARGA Y OBSERVACIONES',d.carga,'','DATOS DE CONTACTO','Nombre: '+d.nombre,'Empresa: '+(d.empresa||'No indicada'),'Correo: '+d.correo,'','Solicitud sujeta a revisión de disponibilidad y condiciones.'].join('\n');
  $('#summary').textContent=request;
  $('#send-email').href='mailto:contacto@cargoterra.com.mx?subject='+encodeURIComponent('Solicitud de cotización | '+d.servicio+' | '+d.origen+' → '+d.destino)+'&body='+encodeURIComponent(request);
  form.hidden=true;$('#review').hidden=false;$('#step-data').classList.remove('current');$('#step-data').removeAttribute('aria-current');$('#step-review').classList.add('current');$('#step-review').setAttribute('aria-current','step');$('#request-status').textContent='';$('#review-title').focus();
});
form.querySelectorAll('[required]').forEach(input=>input.addEventListener('input',()=>input.setCustomValidity('')));
$('#edit').addEventListener('click',()=>{showForm();$('#service').focus();});
async function copyText(text,status){try{await navigator.clipboard.writeText(text);status.textContent='Copiado al portapapeles.';}catch{status.textContent='No se pudo copiar automáticamente. Selecciona el texto para copiarlo.';}}
$('#copy-email').addEventListener('click',()=>copyText('contacto@cargoterra.com.mx',$('#email-status')));
$('#copy').addEventListener('click',()=>copyText(request,$('#request-status')));
$('#download').addEventListener('click',()=>{const blob=new Blob([request],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='Solicitud_CARGOTERRA.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#request-status').textContent='Solicitud descargada. Puedes adjuntarla en tu correo.';});

// Progressive enhancement: content stays visible if animation APIs are unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const runningAnimations = new Set();
function animateEntrance(element, delay = 0) {
  if (motionPreference.matches || !element.animate) return;
  const animation = element.animate([
    { opacity: 0, transform: 'translateY(22px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 650, delay, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' });
  runningAnimations.add(animation);
  animation.finished.catch(() => {}).finally(() => runningAnimations.delete(animation));
}
if ('IntersectionObserver' in window) {
  const entrances = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateEntrance(entry.target);
      entrances.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-head,.service-browser,.about-visual,.about-copy,.steps li,.route-banner .wrap,.quote-intro,.quote-box,.faq>div').forEach(element => entrances.observe(element));
}
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) runningAnimations.forEach(animation => animation.cancel());
});
tabs.forEach(tab => tab.addEventListener('click', () => animateEntrance($('.service-panel-copy'))));
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
$('.header').append(progress);
const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
const navigationSections = sectionLinks.map(link => ({ link, section: document.querySelector(link.hash) })).filter(item => item.section);
let scrollScheduled = false;
function updateScrollState() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  let current;
  navigationSections.forEach(item => { if (item.section.getBoundingClientRect().top <= 160) current = item; });
  sectionLinks.forEach(link => {
    if (current?.link === link) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
function scheduleScrollState() {
  if (!scrollScheduled) { scrollScheduled = true; requestAnimationFrame(updateScrollState); }
}
window.addEventListener('scroll', scheduleScrollState, { passive: true });
window.addEventListener('resize', scheduleScrollState);
updateScrollState();
