export const CONTACT_EMAIL = 'contacto@cargoterra.com.mx';

const clean = value => String(value ?? '').trim();
export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function buildRequest(data) {
  const get = key => clean(data[key]);
  const date = /^\d{4}-\d{2}-\d{2}$/.test(get('fecha')) ? get('fecha').split('-').reverse().join('/') : 'Por definir';
  return [
    'SOLICITUD DE COTIZACIÓN · CARGOTERRA', '',
    `Nombre y empresa: ${get('contacto')}`, `Correo de contacto: ${get('correo')}`, '',
    `Servicio: ${get('servicio')}`, `Origen: ${get('origen')}`, `Destino: ${get('destino')}`,
    `Fecha estimada: ${date}`, `Peso aproximado: ${get('peso') ? `${get('peso')} kg` : 'Por confirmar'}`, '',
    'Carga y equipo requerido:', get('carga'), '',
    'Detalles adicionales:', get('notas') || 'Sin detalles adicionales.', '',
    'Agradezco su cotización y confirmación de disponibilidad para este movimiento.'
  ].join('\n');
}
export function createMailto(data, summary = buildRequest(data)) {
  const subject = `Solicitud de cotización CARGOTERRA · ${clean(data.servicio)}`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
}

function init() {
  const form = document.getElementById('quote-form');
  const review = document.getElementById('quote-review');
  const summary = document.getElementById('request-summary');
  const status = document.getElementById('request-status');
  const firstStep = document.getElementById('progress-one');
  const secondStep = document.getElementById('progress-two');
  form.elements.fecha.min = localDate();
  document.getElementById('review-request').disabled = false;

  function showStep(step) {
    form.hidden = step === 2;
    review.hidden = step === 1;
    firstStep.classList.toggle('active', step === 1);
    secondStep.classList.toggle('active', step === 2);
    (step === 1 ? firstStep : secondStep).setAttribute('aria-current', 'step');
    (step === 1 ? secondStep : firstStep).removeAttribute('aria-current');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const field of form.querySelectorAll('input[required], textarea[required]')) {
      field.value = field.value.trim();
    }
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    summary.textContent = buildRequest(data);
    document.getElementById('send-email').href = createMailto(data, summary.textContent);
    status.textContent = 'Pendiente de envío. Abre tu correo para completar la solicitud.';
    showStep(2);
    document.getElementById('review-title').focus();
  });

  document.getElementById('edit-request').addEventListener('click', () => {
    showStep(1);
    form.elements.contacto.focus();
  });

  document.querySelectorAll('[data-service]').forEach(link => {
    link.addEventListener('click', () => {
      showStep(1);
      form.elements.servicio.value = link.dataset.service;
    });
  });

  async function copyText(text, target, success) {
    try {
      await navigator.clipboard.writeText(text);
      target.textContent = success;
    } catch {
      const helper = document.createElement('textarea');
      helper.value = text;
      helper.setAttribute('aria-label', 'Texto para copiar');
      helper.style.cssText = 'position:fixed;left:0;top:0;opacity:0;width:1px;height:1px';
      document.body.append(helper);
      helper.focus();
      helper.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* Manual copy remains available. */ }
      helper.remove();
      target.textContent = copied ? success : 'Selecciona el correo o el resumen visible y cópialo manualmente.';
      if (target.id === 'request-status') document.getElementById('copy-request').focus();
      else document.querySelector('.copy-email').focus();
    }
  }
  document.getElementById('copy-request').addEventListener('click', () => {
    copyText(summary.textContent, status, 'Solicitud copiada. Pégala en un correo para enviarla a CARGOTERRA.');
  });
  document.querySelector('.copy-email').addEventListener('click', () => {
    copyText(CONTACT_EMAIL, document.getElementById('contact-status'), 'Correo copiado.');
  });
  document.getElementById('send-email').addEventListener('click', () => {
    status.textContent = `Completa el envío en tu aplicación de correo. Si no se abre, copia la solicitud y envíala a ${CONTACT_EMAIL}.`;
  });
}
if (typeof document !== 'undefined') init();
