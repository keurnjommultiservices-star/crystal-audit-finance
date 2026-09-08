/* Rendu dynamique de index.html à partir de cafLoadData() */

function goreeIllustrationDataUrl() {
  // Illustration stylisée de l'Île de Gorée (silhouette des maisons ocre,
  // fort et mer) en SVG, utilisée par défaut tant qu'aucune vraie photo
  // n'a été chargée depuis l'admin.
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 460" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#BFD9CE"/>
        <stop offset="1" stop-color="#E7EFE7"/>
      </linearGradient>
      <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3E7DA8"/>
        <stop offset="1" stop-color="#1F5C8C"/>
      </linearGradient>
    </defs>
    <rect width="1400" height="460" fill="url(#sky)"/>
    <rect y="300" width="1400" height="160" fill="url(#sea)"/>
    <!-- promontoire / falaise -->
    <path d="M0,300 L0,220 Q120,180 220,230 L320,300 Z" fill="#5C6B57" opacity="0.55"/>
    <!-- ligne de maisons ocre / bâtiments coloniaux -->
    <g>
      <rect x="120" y="240" width="70" height="60" fill="#B5602F"/>
      <rect x="120" y="230" width="70" height="14" fill="#7A3A1D"/>
      <rect x="200" y="250" width="55" height="50" fill="#C9863F"/>
      <rect x="200" y="240" width="55" height="12" fill="#7A3A1D"/>
      <rect x="265" y="235" width="60" height="65" fill="#A8532B"/>
      <rect x="265" y="224" width="60" height="14" fill="#5C2C15"/>
      <rect x="335" y="255" width="50" height="45" fill="#D9A15B"/>
      <rect x="335" y="245" width="50" height="12" fill="#7A3A1D"/>
      <rect x="395" y="242" width="65" height="58" fill="#B5602F"/>
      <rect x="395" y="230" width="65" height="14" fill="#5C2C15"/>
      <rect x="470" y="258" width="45" height="42" fill="#C9863F"/>
      <rect x="470" y="248" width="45" height="12" fill="#7A3A1D"/>
      <rect x="525" y="238" width="60" height="62" fill="#A8532B"/>
      <rect x="525" y="226" width="60" height="14" fill="#5C2C15"/>
      <!-- fenêtres -->
      <g fill="#F2E6D6" opacity="0.85">
        <rect x="135" y="255" width="10" height="14"/>
        <rect x="160" y="255" width="10" height="14"/>
        <rect x="215" y="262" width="9" height="12"/>
        <rect x="280" y="250" width="10" height="14"/>
        <rect x="305" y="250" width="10" height="14"/>
        <rect x="410" y="256" width="10" height="14"/>
        <rect x="435" y="256" width="10" height="14"/>
        <rect x="540" y="252" width="10" height="14"/>
        <rect x="565" y="252" width="10" height="14"/>
      </g>
    </g>
    <!-- fort / bastion à droite -->
    <g fill="#8A8478">
      <rect x="1080" y="250" width="220" height="55" />
      <rect x="1080" y="235" width="20" height="20"/>
      <rect x="1120" y="235" width="20" height="20"/>
      <rect x="1160" y="235" width="20" height="20"/>
      <rect x="1200" y="235" width="20" height="20"/>
      <rect x="1240" y="235" width="20" height="20"/>
      <rect x="1280" y="235" width="20" height="20"/>
    </g>
    <!-- baobab stylisé -->
    <g fill="#3E4A3B">
      <rect x="660" y="255" width="10" height="45"/>
      <ellipse cx="665" cy="245" rx="34" ry="24"/>
    </g>
    <!-- vagues -->
    <g stroke="#EAF3EC" stroke-width="3" fill="none" opacity="0.5">
      <path d="M0,330 Q40,320 80,330 T160,330 T240,330 T320,330 T400,330 T480,330 T560,330 T640,330 T720,330 T800,330 T880,330 T960,330 T1040,330 T1120,330 T1200,330 T1280,330 T1360,330"/>
      <path d="M0,370 Q40,360 80,370 T160,370 T240,370 T320,370 T400,370 T480,370 T560,370 T640,370 T720,370 T800,370 T880,370 T960,370 T1040,370 T1120,370 T1200,370 T1280,370 T1360,370"/>
    </g>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function renderLedgerRows(container, rows) {
  container.innerHTML = '';
  rows.forEach(r => {
    const row = el('div', 'ledger-row');
    row.innerHTML = `<span>${r.label}</span><span class="num">${r.value}</span>`;
    container.appendChild(row);
  });
}

function renderStatRows(container, rows) {
  container.innerHTML = '';
  rows.forEach(r => {
    const row = el('div', 'stat-row');
    row.innerHTML = `<span>${r.label}</span><b>${r.value}</b>`;
    container.appendChild(row);
  });
}

function renderChecklist(container, items) {
  container.innerHTML = '';
  items.forEach(txt => {
    const li = document.createElement('li');
    li.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${txt}`;
    container.appendChild(li);
  });
}

function renderParagraphs(container, paragraphs) {
  container.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
}

const CAF_ICONS = {
  calculator: '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/>',
  shield: '<path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z"/><polyline points="9 12 11 14 15 10"/>',
  star: '<polygon points="12 2 15 9 22 9.5 16.5 14 18 21.5 12 17.5 6 21.5 7.5 14 2 9.5 9 9"/>'
};
function renderSubservices(container, items) {
  container.innerHTML = '';
  items.forEach(it => {
    const iconPath = CAF_ICONS[it.icon] || CAF_ICONS.star;
    const card = el('div', 'subservice-card');
    card.innerHTML = `
      <div class="subservice-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${iconPath}</svg></div>
      <h3>${it.title}</h3>
      <p class="sub-desc">${it.desc}</p>
      <ul>${(it.points || []).map(p => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${p}</li>`).join('')}</ul>
    `;
    container.appendChild(card);
  });
}

function applyColors(c) {
  const root = document.documentElement.style;
  root.setProperty('--charcoal', c.charcoal);
  root.setProperty('--ink', c.ink);
  root.setProperty('--ink-soft', c.inkSoft);
  root.setProperty('--paper', c.paper);
  root.setProperty('--paper-2', c.paper2);
  root.setProperty('--line', c.line);
  root.setProperty('--green', c.green);
  root.setProperty('--green-deep', c.greenDeep);
  root.setProperty('--green-light', c.greenLight);
}

function renderSite() {
  const d = cafLoadData();

  applyColors(d.colors);

  document.getElementById('brandAccent').textContent = d.brand.accentWord;
  document.getElementById('brandName').childNodes[0].textContent = d.brand.name.replace(d.brand.accentWord, '').trim() + ' ';
  document.getElementById('footBrandName').textContent = d.brand.name;

  // Hero
  document.getElementById('heroEyebrow').textContent = d.hero.eyebrow;
  document.getElementById('heroTitle').textContent = d.hero.title;
  document.getElementById('heroLead').textContent = d.hero.lead;
  document.getElementById('heroCtaPrimary').textContent = d.hero.ctaPrimary;
  document.getElementById('heroCtaSecondary').textContent = d.hero.ctaSecondary;
  document.getElementById('heroLedgerTitle').textContent = d.hero.ledgerTitle;
  renderLedgerRows(document.getElementById('heroLedgerRows'), d.hero.ledgerRows);

  const cover = document.getElementById('heroCover');
  const bgUrl = d.hero.heroImage && d.hero.heroImage.trim() ? d.hero.heroImage : goreeIllustrationDataUrl();
  cover.style.backgroundImage = `url("${bgUrl}")`;

  // About
  document.getElementById('aboutTitle').textContent = d.about.title;
  document.getElementById('aboutIntro').textContent = d.about.intro;
  document.getElementById('aboutFigBigA').textContent = d.about.figureBigA;
  document.getElementById('aboutFigCapA').textContent = d.about.figureCapA;
  document.getElementById('aboutFigBigB').textContent = d.about.figureBigB;
  document.getElementById('aboutFigCapB').textContent = d.about.figureCapB;
  renderParagraphs(document.getElementById('aboutParagraphs'), d.about.paragraphs);
  const pillarsWrap = document.getElementById('aboutPillars');
  pillarsWrap.innerHTML = '';
  d.about.pillars.forEach(p => {
    const div = el('div', 'pillar', `<h4>${p.title}</h4><p>${p.desc}</p>`);
    pillarsWrap.appendChild(div);
  });

  // Services
  document.getElementById('servicesTitle').textContent = d.services.title;
  document.getElementById('servicesIntro').textContent = d.services.intro;
  const servicesList = document.getElementById('servicesList');
  servicesList.innerHTML = '';
  d.services.items.forEach(s => {
    const row = el('div', 'service-row', `<span class="code">${s.code}</span><h3>${s.title}</h3><p>${s.desc}</p>`);
    servicesList.appendChild(row);
  });

  // Audit
  document.getElementById('auditTitle').textContent = d.audit.title;
  renderSubservices(document.getElementById('auditSubservices'), d.audit.subservices || []);
  renderParagraphs(document.getElementById('auditParagraphs'), d.audit.paragraphs);
  renderChecklist(document.getElementById('auditChecklist'), d.audit.checklist);
  document.getElementById('auditStatTitle').textContent = d.audit.statTitle;
  renderStatRows(document.getElementById('auditStats'), d.audit.stats);

  // Conseils
  document.getElementById('conseilsTitle').textContent = d.conseils.title;
  renderParagraphs(document.getElementById('conseilsParagraphs'), d.conseils.paragraphs);
  renderChecklist(document.getElementById('conseilsChecklist'), d.conseils.checklist);
  document.getElementById('conseilsStatTitle').textContent = d.conseils.statTitle;
  renderStatRows(document.getElementById('conseilsStats'), d.conseils.stats);

  // Formation
  document.getElementById('formationTitle').textContent = d.formation.title;
  renderParagraphs(document.getElementById('formationParagraphs'), d.formation.paragraphs);
  renderChecklist(document.getElementById('formationChecklist'), d.formation.checklist);
  document.getElementById('formationStatTitle').textContent = d.formation.statTitle;
  renderStatRows(document.getElementById('formationStats'), d.formation.stats);
  const gallery = document.getElementById('formationGallery');
  gallery.innerHTML = '';
  d.formation.photos.forEach((p, i) => {
    const url = p.url && p.url.trim() ? p.url : cafPlaceholder('Photo à ajouter', ['a','b','c'][i % 3]);
    const card = el('div', 'formation-photo', `<img src="${url}" alt="${p.caption}"><div class="cap">${p.caption}</div>`);
    gallery.appendChild(card);
  });

  // Finance
  document.getElementById('financeTitle').textContent = d.finance.title;
  renderParagraphs(document.getElementById('financeParagraphs'), d.finance.paragraphs);
  renderChecklist(document.getElementById('financeChecklist'), d.finance.checklist);
  document.getElementById('financeStatTitle').textContent = d.finance.statTitle;
  renderStatRows(document.getElementById('financeStats'), d.finance.stats);

  // Team
  document.getElementById('teamTitle').textContent = d.team.title;
  document.getElementById('teamIntro').textContent = d.team.intro;
  const teamGrid = document.getElementById('teamGrid');
  teamGrid.innerHTML = '';
  d.team.members.forEach(m => {
    const card = el('div', 'team-card', `<div class="team-avatar">${m.initials}</div><h4>${m.name}</h4><p class="role">${m.role}</p><p>${m.desc}</p>`);
    teamGrid.appendChild(card);
  });

  // Contact
  document.getElementById('contactIntro').textContent = d.contact.intro;
  document.getElementById('contactAddress').textContent = d.contact.address;
  document.getElementById('contactPhone').textContent = d.contact.phone;
  document.getElementById('contactEmail').textContent = d.contact.email;
  document.getElementById('contactHours').textContent = d.contact.hours;

  const waHref = `https://wa.me/${d.contact.whatsappNumber}?text=${encodeURIComponent(d.contact.whatsappMessage)}`;
  document.getElementById('whatsappLink').href = waHref;
  document.getElementById('waFloat').href = waHref;

  // Footer
  document.getElementById('footDesc').textContent = d.footer.desc;
  document.getElementById('footOrderLine').textContent = d.footer.orderLine;
  document.getElementById('footCopyright').textContent = `© ${d.footer.year} ${d.brand.name}. Tous droits réservés.`;

  document.title = `${d.brand.name} — Cabinet d'audit, d'expertise comptable et de conseil`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderSite();

  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }));
});
