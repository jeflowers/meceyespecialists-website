/* Injects the shared site footer wherever [data-footer] appears.
   Runs synchronously (script sits at end of <body>) so site.js's
   DOMContentLoaded language pass still translates it. */
(function () {
  var mount = document.querySelector('[data-footer]');
  if (!mount) return;
  // path prefix: pages in /forms/ need to go up one level
  var p = location.pathname.indexOf('/forms/') !== -1 ? '../' : '';
  mount.outerHTML =
  '<footer class="site">' +
    '<div class="container">' +
      '<div class="foot-grid">' +
        '<div class="foot-brand">' +
          '<b>MEC</b> <span style="letter-spacing:.24em;font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase">Eye Specialists</span>' +
          '<p data-en="Comprehensive ophthalmology and surgical eye care, delivered with warmth and clarity." data-es="Oftalmología integral y cirugía ocular, con calidez y claridad.">Comprehensive ophthalmology and surgical eye care, delivered with warmth and clarity.</p>' +
        '</div>' +
        '<div>' +
          '<h4 data-en="Care" data-es="Atención">Care</h4>' +
          '<a href="' + p + 'services.html#cataract" data-en="Cataract Surgery" data-es="Cirugía de Cataratas">Cataract Surgery</a><br>' +
          '<a href="' + p + 'services.html#glaucoma" data-en="Glaucoma" data-es="Glaucoma">Glaucoma</a><br>' +
          '<a href="' + p + 'services.html#retina" data-en="Retinal Disease" data-es="Enfermedad de Retina">Retinal Disease</a><br>' +
          '<a href="' + p + 'services.html#diabetic" data-en="Diabetic Eye Care" data-es="Cuidado Diabético">Diabetic Eye Care</a>' +
        '</div>' +
        '<div>' +
          '<h4 data-en="Patients" data-es="Pacientes">Patients</h4>' +
          '<a href="' + p + 'patients.html" data-en="Patient Portal" data-es="Portal del Paciente">Patient Portal</a><br>' +
          '<a href="' + p + 'forms/registration.html" data-en="New Patient Forms" data-es="Formularios">New Patient Forms</a><br>' +
          '<a href="' + p + 'referrals.html" data-en="Referrals" data-es="Referencias">Referrals</a><br>' +
          '<a href="' + p + 'patients.html#billpay" data-en="Bill Pay" data-es="Pago de Facturas">Bill Pay</a>' +
        '</div>' +
        '<div>' +
          '<h4 data-en="Contact" data-es="Contacto">Contact</h4>' +
          '<a href="tel:8442115462">(844) 211-5462</a><br>' +
          '<a href="mailto:hello@meceyespecialists.com">hello@meceyespecialists.com</a><br>' +
          '<a href="' + p + 'contact.html#locations" data-en="View Locations" data-es="Ver Ubicaciones">View Locations</a>' +
        '</div>' +
      '</div>' +
      '<div class="foot-bottom">' +
        '<span>© 2025 MEC Eye Specialists. <span data-en="All rights reserved." data-es="Todos los derechos reservados.">All rights reserved.</span></span>' +
        '<span data-en="Privacy Policy · HIPAA Notice · Accessibility" data-es="Privacidad · Aviso HIPAA · Accesibilidad">Privacy Policy · HIPAA Notice · Accessibility</span>' +
      '</div>' +
    '</div>' +
  '</footer>';
})();
