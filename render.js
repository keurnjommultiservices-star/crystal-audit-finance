/* Rendu dynamique de index.html à partir de content/site.json */

function goreeIllustrationDataUrl() {
  // Illustration stylisée de l'Île de Gorée, utilisée uniquement si
  // aucune photo n'a été chargée depuis l'admin.
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
    <path d="M0,300 L0,220 Q120,180 220,230 L320,300 Z" fill="#5C6B57" opacity="0.55"/>
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
    <g fill="#8A8478">
      <rect x="1080" y="250" width="220" height="55" />
      <rect x="1080" y="235" width="20" height="20"/>
      <rect x="1120" y="235" width="20" height="20"/>
      <rect x="1160" y="235" width="20" height="20"/>
      <rect x="1200" y="235" width="20" height="20"/>
      <rect x="1240" y="235" width="20" height="20"/>
      <rect x="1280" y="235" width="20" height="20"/>
    </g>
    <g fill="#3E4A3B">
      <rect x="660" y="255" width="10" height="45"/>
      <ellipse cx="665" cy="245" rx="34" ry="24"/>
    </g>
    <g stroke="#EAF3EC" stroke-width="3" fill="none" opacity="0.5">
      <path d="M0,330 Q40,320 80,330 T160,330 T240,330 T320,330 T400,330 T480,330 T560,330 T640,330 T720,330 T800,330 T880,330 T960,330 T1040,330 T1120,330 T1200,330 T1280,330 T1360,330"/>
      <path d="M0,370 Q40,360 80,370 T160,370 T240,370 T320,370 T400,370 T480,370 T560,370 T640,370 T720,370 T800,370 T880,370 T960,370 T1040,370 T1120,370 T1200,370 T1280,370 T1360,370"/>
    </g>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}


function contactSilhouettesDataUrl() {
  // Illustration par défaut : silhouettes de personnes en dégradé bleu,
  // utilisée tant qu'aucune vraie photo n'a été chargée depuis l'admin.
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 560" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#123A57"/>
        <stop offset="1" stop-color="#0A1620"/>
      </linearGradient>
    </defs>
    <rect width="1400" height="560" fill="url(#cbg)"/>
    <g fill="#FFFFFF" opacity="0.10">
      <ellipse cx="220" cy="430" rx="90" ry="130"/>
      <circle cx="220" cy="255" r="58"/>
      <ellipse cx="430" cy="460" rx="105" ry="150"/>
      <circle cx="430" cy="265" r="66"/>
      <ellipse cx="670" cy="440" rx="95" ry="140"/>
      <circle cx="670" cy="258" r="60"/>
      <ellipse cx="920" cy="470" rx="110" ry="155"/>
      <circle cx="920" cy="262" r="68"/>
      <ellipse cx="1160" cy="445" rx="98" ry="142"/>
      <circle cx="1160" cy="256" r="62"/>
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

const LEDGER_ICONS = {
  clipboard: '<rect x="6" y="3" width="12" height="4" rx="1"/><path d="M6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1"/><polyline points="9 13 11 15 15 11"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="3" y1="10" x2="21" y2="10"/>',
  building: '<rect x="4" y="3" width="16" height="18"/><line x1="9" y1="7" x2="9" y2="7"/><line x1="15" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="9" y2="11"/><line x1="15" y1="11" x2="15" y2="11"/><line x1="9" y1="15" x2="9" y2="15"/><line x1="15" y1="15" x2="15" y2="15"/><line x1="10" y1="21" x2="10" y2="17"/><line x1="14" y1="21" x2="14" y2="17"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
  star: '<polygon points="12 2 15 9 22 9.5 16.5 14 18 21.5 12 17.5 6 21.5 7.5 14 2 9.5 9 9"/>'
};
function pickLedgerIcon(label) {
  const l = (label || '').toLowerCase();
  if (l.includes('audit')) return LEDGER_ICONS.clipboard;
  if (l.includes('année') || l.includes('exercice')) return LEDGER_ICONS.calendar;
  if (l.includes('secteur')) return LEDGER_ICONS.building;
  if (l.includes('référentiel') || l.includes('syscohada') || l.includes('sycebnl')) return LEDGER_ICONS.book;
  return LEDGER_ICONS.star;
}
function renderLedgerRows(container, rows) {
  container.innerHTML = '';
  rows.forEach(r => {
    const row = el('div', 'ledger-row');
    row.innerHTML = `
      <span class="ledger-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${pickLedgerIcon(r.label)}</svg></span>
      <span class="ledger-row-text"><span>${r.label}</span><span class="num">${r.value}</span></span>
    `;
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

function renderAuditGroups(groups) {
  return groups.map(g => `
    <div class="audit-group">
      <h4>${g.title}</h4>
      <ul>${(g.items || []).map(it => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${it}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function renderAuditTabs(navEl, panelsEl, tabs) {
  const keys = Object.keys(tabs);
  navEl.innerHTML = keys.map((k, i) => `<button type="button" class="audit-tab-btn${i === 0 ? ' active' : ''}" data-tab="${k}">${tabs[k].label}</button>`).join('');
  panelsEl.innerHTML = keys.map((k, i) => `
    <div class="audit-tab-panel${i === 0 ? ' active' : ''}" data-panel="${k}">
      <p class="audit-tagline">${tabs[k].tagline}</p>
      <div class="audit-groups">${renderAuditGroups(tabs[k].groups || [])}</div>
    </div>
  `).join('');

  navEl.querySelectorAll('.audit-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navEl.querySelectorAll('.audit-tab-btn').forEach(b => b.classList.remove('active'));
      panelsEl.querySelectorAll('.audit-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      panelsEl.querySelector(`[data-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
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

function initFormationCarousel(photos) {
  const track = document.getElementById('fcTrack');
  const dotsWrap = document.getElementById('fcDots');
  const prevBtn = document.getElementById('fcPrev');
  const nextBtn = document.getElementById('fcNext');
  const carousel = document.getElementById('formationCarousel');

  if (!photos.length) {
    carousel.style.display = 'none';
    dotsWrap.style.display = 'none';
    return;
  }

  track.innerHTML = '';
  dotsWrap.innerHTML = '';
  photos.forEach((p, i) => {
    const url = p.url && p.url.trim() ? p.url : cafPlaceholder('Photo à ajouter', ['a', 'b', 'c'][i % 3]);
    const slide = el('div', 'fc-slide', `<div class="formation-photo"><img src="${url}" alt="${p.caption || ''}"><div class="cap">${p.caption || ''}</div></div>`);
    track.appendChild(slide);
    const dot = el('button', 'fc-dot' + (i === 0 ? ' active' : ''));
    dot.type = 'button';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const showArrows = photos.length > 1;
  prevBtn.style.display = showArrows ? 'flex' : 'none';
  nextBtn.style.display = showArrows ? 'flex' : 'none';
  dotsWrap.style.display = showArrows ? 'flex' : 'none';

  let current = 0;
  function goTo(i) {
    current = (i + photos.length) % photos.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.fc-dot').forEach((d, idx) => d.classList.toggle('active', idx === current));
  }
  prevBtn.onclick = () => goTo(current - 1);
  nextBtn.onclick = () => goTo(current + 1);
  goTo(0);
}

async function renderSite() {
  const d = await cafFetchData();

  applyColors(d.colors);

  // Bande défilante
  if (d.ticker && d.ticker.text) {
    const track = document.getElementById('tickerTrack');
    track.innerHTML = `<span>${d.ticker.text}</span><span>${d.ticker.text}</span>`;
  } else {
    document.getElementById('tickerBar').style.display = 'none';
  }

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

  const heroSection = document.getElementById('accueil');
  const bgUrl = d.hero.heroImage && d.hero.heroImage.trim() ? d.hero.heroImage : goreeIllustrationDataUrl();
  heroSection.style.backgroundImage = `url("${bgUrl}")`;
  // Qui sommes-nous
  if (d.quiSommesNous) {
    const q = d.quiSommesNous;
    const qsnImg = q.photo && q.photo.trim() ? q.photo : cafPlaceholder('Photo à ajouter', 'b');
    document.getElementById('qsnPhoto').src = qsnImg;
    document.getElementById('qsnTitle').textContent = q.title;
    document.getElementById('qsnIntro').textContent = q.intro;
    document.getElementById('qsnSubheading').textContent = q.subheading;
    document.getElementById('qsnParagraph2').textContent = q.paragraph2;
    document.getElementById('qsnParagraph3').textContent = q.paragraph3;
    const qsnStats = document.getElementById('qsnStats');
    qsnStats.innerHTML = '';
    (q.stats || []).forEach(s => {
      const div = el('div', 'qsn-stat', `<div class="num">${s.value}</div><div class="label">${s.label}</div><div class="bar"></div>`);
      qsnStats.appendChild(div);
    });
  }

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
    const pointsHtml = (s.points && s.points.length)
      ? `<ul class="service-points">${s.points.map(p => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${p}</li>`).join('')}</ul>`
      : '';
    const row = el('div', 'service-row', `<span class="code">${s.code}</span><h3>${s.title}</h3><div><p>${s.desc}</p>${pointsHtml}</div>`);
    servicesList.appendChild(row);
  });

  // Audit
  document.getElementById('auditTitle').textContent = d.audit.title;
  document.getElementById('auditIntro').innerHTML = (d.audit.paragraphs || []).map(p => `<p>${p}</p>`).join('');
  renderAuditTabs(document.getElementById('auditTabsNav'), document.getElementById('auditTabPanels'), d.audit.tabs);
  renderChecklist(document.getElementById('auditChecklist'), d.audit.checklist);
  document.getElementById('auditStatTitle').textContent = d.audit.statTitle;
  renderStatRows(document.getElementById('auditStats'), d.audit.stats);

  // Conseils
  document.getElementById('conseilsTitle').textContent = d.conseils.title;
  renderParagraphs(document.getElementById('conseilsParagraphs'), d.conseils.paragraphs);
  renderChecklist(document.getElementById('conseilsChecklist'), d.conseils.checklist);
  document.getElementById('conseilsStatTitle').textContent = d.conseils.statTitle;
  renderStatRows(document.getElementById('conseilsStats'), d.conseils.stats);
  const conseilCards = document.getElementById('conseilCards');
  conseilCards.innerHTML = '';
  (d.conseils.cards || []).forEach((c, i) => {
    const url = c.photo && c.photo.trim() ? c.photo : cafPlaceholder(c.title || 'Photo à ajouter', ['a', 'b', 'c'][i % 3]);
    const itemsHtml = (c.items || []).map(it => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${it}</li>`).join('');
    const card = el('div', 'conseil-card', `<img src="${url}" alt="${c.title}"><div class="body"><h3>${c.title}</h3><ul>${itemsHtml}</ul></div>`);
    conseilCards.appendChild(card);
  });

  // Formation
  document.getElementById('formationTitle').textContent = d.formation.title;
  renderParagraphs(document.getElementById('formationParagraphs'), d.formation.paragraphs);
  renderChecklist(document.getElementById('formationChecklist'), d.formation.checklist);
  document.getElementById('formationStatTitle').textContent = d.formation.statTitle;
  renderStatRows(document.getElementById('formationStats'), d.formation.stats);
  initFormationCarousel(d.formation.photos || []);

  // Finance
  document.getElementById('financeTitle').textContent = d.finance.title;
  renderParagraphs(document.getElementById('financeParagraphs'), d.finance.paragraphs);
  renderChecklist(document.getElementById('financeChecklist'), d.finance.checklist);
  document.getElementById('financeStatTitle').textContent = d.finance.statTitle;
  renderStatRows(document.getElementById('financeStats'), d.finance.stats);
  const financeMission = document.getElementById('financeMission');
  if (d.finance.missionCard) {
    const mc = d.finance.missionCard;
    const stepsHtml = (mc.steps || []).map(s => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>${s}</li>`).join('');
    const partnersHtml = mc.partnersImage && mc.partnersImage.trim()
      ? `<div class="fm-partners"><img src="${mc.partnersImage}" alt="${mc.partnersCaption || 'Nos partenaires'}">${mc.partnersCaption ? `<div class="fm-partners-caption">${mc.partnersCaption}</div>` : ''}</div>`
      : '';
    financeMission.innerHTML = `
      ${d.finance.subheading ? `<div class="fm-subheading">${d.finance.subheading}</div>` : ''}
      ${d.finance.subheadingText ? `<p class="fm-subtext">${d.finance.subheadingText}</p>` : ''}
      <div class="fm-card-grid">
        <div>
          <div class="fm-card-title">${mc.title}</div>
          <p class="fm-card-desc">${mc.desc}</p>
          ${mc.stepsTitle ? `<div class="fm-steps-title">${mc.stepsTitle}</div>` : ''}
          <ul class="fm-steps">${stepsHtml}</ul>
        </div>
        ${partnersHtml}
      </div>
    `;
  } else {
    financeMission.style.display = 'none';
  }

  // Team
  document.getElementById('teamTitle').textContent = d.team.title;
  document.getElementById('teamIntro').textContent = d.team.intro;
  const teamGrid = document.getElementById('teamGrid');
  teamGrid.innerHTML = '';
  d.team.members.forEach(m => {
    const avatarInner = (m.photo && m.photo.trim()) ? `<img src="${m.photo}" alt="${m.name}">` : m.initials;
    const card = el('div', 'team-card', `<div class="team-avatar">${avatarInner}</div><h4>${m.name}</h4><p class="role">${m.role}</p><p>${m.desc}</p>`);
    teamGrid.appendChild(card);
  });

  // Contact
  const contactBgImg = document.getElementById('contactBgImg');
  const contactBg = d.contact.backgroundImage && d.contact.backgroundImage.trim() ? d.contact.backgroundImage : contactSilhouettesDataUrl();
  contactBgImg.style.backgroundImage = `url("${contactBg}")`;
  if (d.contact.sectionLabel) document.getElementById('contactSectionLabel').textContent = d.contact.sectionLabel;
  if (d.contact.title) document.getElementById('contactTitle').textContent = d.contact.title;
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
