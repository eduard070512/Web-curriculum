(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  // ---------- Storage helpers (may be blocked in private mode) ----------
  function load(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, value); } catch (e) {}
  }

  // ---------- Theme ----------
  var themeBtn = document.getElementById('theme-toggle');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    save('theme', next);
  });

  // ---------- Language ----------
  // English is the source text in index.html; Spanish lives here.
  var es = {
    'meta.title': 'Eduardo Michel Magaña — Ingeniero de Software',
    'meta.description': 'Estudiante de Ingeniería en Computación Inteligente y desarrollador backend y de automatización. Next.js, TypeScript, PostgreSQL, agentes LLM y automatización de flujos en producción.',

    'skip': 'Saltar al contenido',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Habilidades',
    'nav.education': 'Formación',
    'nav.contact': 'Contacto',

    'hero.status': 'Buscando prácticas en ingeniería de software',
    'hero.role': 'Estudiante de Ingeniería en Computación Inteligente · Desarrollador Backend y de Automatización',
    'hero.lead': 'Construyo software en producción para usuarios reales: plataformas web con Next.js, TypeScript y PostgreSQL, y pipelines de IA que encadenan agentes LLM a través de más de 90 flujos automatizados. Me importan la integridad de los datos, el diseño claro de sistemas y entregar cosas que sigan funcionando.',
    'hero.cta': 'Ver mi trabajo',
    'hero.email': 'Escríbeme',

    'stats.automations': 'automatizaciones de flujos en producción',
    'stats.apps': 'aplicaciones full-stack desplegadas',
    'stats.award': 'concurso de programación en C, U. de Colima',
    'stats.awardValue': '1er lugar',
    'stats.english': 'nivel de inglés',

    'experience.title': 'Experiencia',
    'job.role': 'Desarrollador Backend y de Automatización',
    'job.companyType': '· Agencia de marketing',
    'job.dates': 'Jul 2026 – Actualidad',
    'job.remote': 'Remoto',
    'job.p1': 'Diseñé y mantengo una plataforma en <strong>Next.js + TypeScript + PostgreSQL</strong> que gestiona clientes, suscripciones y reportes de contenido; la migré de un prototipo en Google Sheets a una base de datos relacional.',
    'job.p2': 'Construí y opero <strong>más de 90 flujos en n8n</strong> que ejecutan un pipeline de contenido con IA multi-cliente (generación de ideas, planeación SEO, calendarios editoriales mensuales y guiones) con agentes de OpenAI encadenados que intercambian <strong>contratos JSON estructurados</strong>.',
    'job.p3': 'Encontré y corregí <strong>errores de concurrencia y de trazabilidad de datos</strong> que mezclaban en silencio la información entre clientes; cada cambio a los flujos sale con respaldo y plan de reversión.',
    'job.p4': 'Integré flujos <strong>OAuth 2.0</strong> con TikTok (Content Posting API) y LinkedIn con renovación automática de tokens y protección CSRF, además de un pipeline de video con IA que combina avatares, generación de imágenes, animación y texto a voz.',
    'job.p5': 'Creé un modelo de calificación de videos (percentil de vistas + estructura del guion) que relaciona cada video publicado con su guion por ID de plataforma, título y fecha, para que los clientes vean qué ganchos funcionan.',
    'job.p6': 'Desarrollé un asistente de operación con LLM que se usa a diario para operar y monitorear el sistema, con salvaguardas que piden confirmación antes de cualquier acción costosa o destructiva; protegí la comunicación entre la app web y las automatizaciones con autenticación de webhooks por secreto compartido.',

    'projects.title': 'Proyectos destacados',
    'projects.lead': 'Productos full-stack que diseñé, construí y desplegué de principio a fin. Algunos repositorios son privados porque funcionan para negocios reales; enlazo sus demos en vivo.',
    'badge.private': 'Repo privado',
    'badge.public': 'Código abierto',
    'badge.work': 'Proyecto laboral',
    'link.demo': 'Demo en vivo ↗',
    'link.code': 'Código ↗',
    'link.repo': 'Repositorio ↗',
    'link.confidential': 'Datos confidenciales de clientes, sin demo pública',

    'p.vendors.name': 'Plataforma de Vendedores del Campus',
    'p.vendors.desc': 'Cada salón de la universidad tiene un código QR. Los alumnos lo escanean, ven los menús de los vendedores ambulantes del campus y pueden llamarlos al salón, encargar pedidos o calificarlos. Los vendedores no necesitan usar la página: los pedidos les llegan por un <strong>bot de Telegram</strong> con botones de respuesta rápida.',
    'p.vendors.b1': 'Tres PWA instalables (compradores, vendedores y administrador) con notificaciones push',
    'p.vendors.b2': 'Webhook de Telegram con vinculación de cuentas por token',

    'p.menu.desc': 'SaaS multi-negocio donde los restaurantes publican su menú digital y reciben pedidos sin apps de comisión. Unas 14 mil líneas de TypeScript que cubren pedidos, tarjetas de lealtad, reservaciones y un visor de productos en 3D/realidad aumentada.',
    'p.menu.b1': 'Migración de Google Sheets a PostgreSQL (Drizzle ORM) conservando todos los IDs, sin cambiar el código que la consume',
    'p.menu.b2': 'Identificación de clientes sin contraseña con SMS de Twilio Verify; precios y promociones siempre recalculados en el servidor',

    'p.pos.name': 'Comandera: Sistema de Pedidos para Restaurante',
    'p.pos.desc': 'Gestión de comandas con tres pantallas según el rol: los meseros toman pedidos desde el celular, la pantalla de cocina muestra la comanda más antigua a pantalla completa y el administrador gestiona el menú y los reportes de ventas.',
    'p.pos.b1': 'Precios y opciones se guardan en cada comanda, así que editar el menú nunca altera ventas pasadas',
    'p.pos.b2': 'Actualizaciones casi en tiempo real sin infraestructura extra; avisos sonoros con Web Audio',

    'p.shop.desc': 'Tienda en línea de ropa deportiva personalizada. Una prenda 3D gira con el scroll para mostrar las zonas de grabado, y cada producto tiene un visor 3D donde el cliente elige colores y prueba su logo.',
    'p.shop.b1': 'Render 3D con three.js y animaciones de scroll con GSAP',
    'p.shop.b2': 'Carrito, pedido por WhatsApp y panel de administración de pedidos',

    'p.tasks.name': 'Pendientes: Gestor de Tareas',
    'p.tasks.desc': 'Registro de pendientes por perfil sobre una base Postgres serverless. Las migraciones se generan desde el esquema de Prisma y se aplican automáticamente en cada despliegue.',
    'p.tasks.b1': 'Cookies de sesión del administrador firmadas con HMAC',

    'p.content.name': 'Sistema de Gestión de Contenido con IA',
    'p.content.desc': 'La plataforma interna detrás de mi puesto en KJ Publicidad: gestión de clientes y suscripciones, estadísticas por cliente con una vista de contenido estilo Netflix, una herramienta pública de auditoría SEO que capta prospectos y control con un clic de cada automatización del pipeline.',
    'p.content.b1': 'Acceso por roles: el administrador ve todo y cada cliente ve solo sus propias estadísticas',

    'more.title': 'Proyectos académicos y anteriores',
    'm.school.name': 'Sistema de Gestión Escolar',
    'm.school.desc': 'Sistema web multiusuario (administrador, maestro, alumno) para materias, grupos, horarios e inscripciones. POO + MVC.',
    'm.hardware.name': 'Punto de Venta para Ferretería',
    'm.hardware.desc': 'Sistema de punto de venta completo y responsivo para una ferretería, con diseño orientado a objetos.',
    'm.stationery.name': 'Punto de Venta para Papelería',
    'm.stationery.desc': 'Ventas, productos, proveedores, niveles de usuario con inicio de sesión y corte de caja.',
    'm.autoparts.name': 'Sistema para Tienda de Autopartes',
    'm.autoparts.desc': 'Proyecto final de curso desarrollado en equipo.',
    'm.inventory.name': 'App de Inventario para Papelería',
    'm.inventory.desc': 'App de escritorio con inicio de sesión y operaciones completas de alta, búsqueda, edición y baja.',
    'm.numbers.name': 'Convertidor de Números a Texto',
    'm.numbers.desc': 'App de Windows Forms que convierte cualquier número entero a su forma escrita en español.',
    'm.rpg.desc': 'Juego RPG en el navegador, hecho mientras aprendía los fundamentos de JavaScript y el DOM.',
    'm.web.name': 'Sitio Web de Papelería',
    'm.web.desc': 'Mi primer sitio web estático, para una papelería local.',

    'skills.title': 'Habilidades',
    'skills.languages': 'Lenguajes',
    'skills.web': 'Web y backend',
    'skills.data': 'Bases de datos',
    'skills.modeling': 'Modelado de datos',
    'skills.ai': 'IA y automatización',
    'skills.llm': 'Agentes LLM',
    'skills.json': 'Salidas JSON estructuradas',
    'skills.tools': 'Herramientas y plataformas',
    'skills.cs': 'Fundamentos',
    'skills.oop': 'Diseño orientado a objetos',
    'skills.concurrency': 'Depuración de concurrencia',
    'skills.security': 'Autenticación y seguridad web',

    'education.title': 'Formación y logros',
    'edu.uni.dates': 'Ago 2025 – Actualidad',
    'edu.uni.degree': 'Ingeniería en Computación Inteligente',
    'edu.hs.degree': 'Bachillerato Técnico, Analista Programador',
    'edu.award.dates': 'Marzo 2025',
    'edu.award.title': '1er lugar, Concurso de Programación en C',
    'edu.lang.label': 'Idiomas',
    'edu.lang.list': 'Español (nativo) · Inglés (B2) · Alemán (A1)',
    'edu.lang.note': 'Leo documentación técnica y trabajo en inglés con soltura.',

    'contact.title': 'Trabajemos juntos',
    'contact.lead': 'Busco prácticas en ingeniería de software donde pueda aprender de equipos fuertes y aportar desde el primer día. La forma más rápida de contactarme es por correo.'
  };

  var nodes = document.querySelectorAll('[data-i18n]');
  var metaDesc = document.querySelector('meta[name="description"]');
  var en = {
    'meta.title': document.title,
    'meta.description': metaDesc.getAttribute('content')
  };
  nodes.forEach(function (el) { en[el.dataset.i18n] = el.innerHTML; });

  var langBtn = document.getElementById('lang-toggle');
  var lang = 'en';

  function setLang(next) {
    var dict = next === 'es' ? es : en;
    nodes.forEach(function (el) {
      var value = dict[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    });
    document.title = dict['meta.title'];
    metaDesc.setAttribute('content', dict['meta.description']);
    root.lang = next;
    lang = next;
    langBtn.textContent = next === 'es' ? 'EN' : 'ES';
    langBtn.setAttribute('aria-label', next === 'es' ? 'Switch to English' : 'Cambiar a español');
    themeBtn.setAttribute('aria-label', next === 'es' ? 'Cambiar modo oscuro' : 'Toggle dark mode');
  }

  langBtn.addEventListener('click', function () {
    var next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    save('lang', next);
  });

  // ?lang=es in the URL wins, so a Spanish link can be shared directly.
  var param = new URLSearchParams(window.location.search).get('lang');
  var initial = param === 'es' || param === 'en' ? param : load('lang');
  if (initial === 'es') setLang('es');

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Reveal on scroll ----------
  var revealTargets = document.querySelectorAll('.job, .project, .mini, .skill-group, .edu');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
})();
