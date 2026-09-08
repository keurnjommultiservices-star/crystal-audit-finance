/* ============================================================
   Administration Crystal Audit Finance
   ============================================================ */

let DATA = cafLoadData();
let ACTIVE_TAB = 'brand';

const TABS = [
  { id: 'brand', label: 'Marque & couleurs' },
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'A-propos' },
  { id: 'services', label: 'Services' },
  { id: 'audit', label: 'Audit' },
  { id: 'conseils', label: 'Conseils' },
  { id: 'formation', label: 'Formation' },
  { id: 'finance', label: 'Finance' },
  { id: 'team', label: 'Équipe' },
  { id: 'contact', label: 'Contact' },
  { id: 'security', label: 'Sécurité' },
  { id: 'backup', label: 'Sauvegarde' }
];

/* ---------------- Connexion ---------------- */
function cafAttemptLogin() {
  const val = document.getElementById('loginPass').value;
  if (val === cafGetPassword()) {
    sessionStorage.setItem('caf_admin_logged', '1');
    showDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}
document.getElementById('loginPass') && document.getElementById('loginPass').addEventListener('keydown', e => {
  if (e.key === 'Enter') cafAttemptLogin();
});

function cafLogout() {
  sessionStorage.removeItem('caf_admin_logged');
  location.reload();
}

function showDashboard() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
  buildTabs();
  renderPanel(ACTIVE_TAB);
}

if (sessionStorage.getItem('caf_admin_logged') === '1') {
  document.addEventListener('DOMContentLoaded', showDashboard);
}

/* ---------------- Onglets ---------------- */
function buildTabs() {
  const nav = document.getElementById('adminTabs');
  nav.innerHTML = '';
  TABS.forEach(t => {
    const btn = document.createElement('button');
    btn.textContent = t.label;
    btn.className = t.id === ACTIVE_TAB ? 'active' : '';
    btn.onclick = () => {
      ACTIVE_TAB = t.id;
      buildTabs();
      renderPanel(t.id);
    };
    nav.appendChild(btn);
  });
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg || 'Modifications enregistrées';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function saveAll() {
  cafSaveData(DATA);
  toast();
}

/* ---------------- Helpers de champs ---------------- */
function field(label, id, value, type) {
  type = type || 'text';
  return `<div class="f-group"><label for="${id}">${label}</label><input type="${type}" id="${id}" value="${escapeAttr(value)}"></div>`;
}
function textareaField(label, id, value) {
  return `<div class="f-group"><label for="${id}">${label}</label><textarea id="${id}">${escapeHtml(value)}</textarea></div>`;
}
function escapeAttr(s) { return (s || '').toString().replace(/"/g, '&quot;'); }
function escapeHtml(s) { return (s || '').toString().replace(/</g, '&lt;'); }
function val(id) { const e = document.getElementById(id); return e ? e.value : ''; }

/* ---------------- Éditeurs de listes génériques ---------------- */
function kvListHtml(containerId, items) {
  const rows = items.map((it, i) => kvRowHtml(containerId, i, it.label, it.value)).join('');
  return `<div class="list-editor" id="${containerId}">${rows}</div>
    <button type="button" class="add-btn" onclick="addKVRow('${containerId}')">+ Ajouter une ligne</button>`;
}
function kvRowHtml(containerId, i, label, value) {
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-row">
      <div class="f-group"><label>Libellé</label><input type="text" class="row-label" value="${escapeAttr(label)}"></div>
      <div class="f-group"><label>Valeur</label><input type="text" class="row-value" value="${escapeAttr(value)}"></div>
    </div>
  </div>`;
}
function addKVRow(containerId) {
  document.getElementById(containerId).insertAdjacentHTML('beforeend', kvRowHtml(containerId, 999, '', ''));
}
function readKVList(containerId) {
  const items = [];
  document.getElementById(containerId).querySelectorAll('.list-item').forEach(it => {
    items.push({ label: it.querySelector('.row-label').value, value: it.querySelector('.row-value').value });
  });
  return items;
}

function strListHtml(containerId, items) {
  const rows = items.map(txt => strRowHtml(txt)).join('');
  return `<div class="list-editor" id="${containerId}">${rows}</div>
    <button type="button" class="add-btn" onclick="addStrRow('${containerId}')">+ Ajouter</button>`;
}
function strRowHtml(txt) {
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-group"><input type="text" class="row-text" value="${escapeAttr(txt)}"></div>
  </div>`;
}
function addStrRow(containerId) {
  document.getElementById(containerId).insertAdjacentHTML('beforeend', strRowHtml(''));
}
function readStrList(containerId) {
  const items = [];
  document.getElementById(containerId).querySelectorAll('.row-text').forEach(inp => items.push(inp.value));
  return items;
}

/* ---------------- Rendu des panneaux ---------------- */
function renderPanel(id) {
  const c = document.getElementById('adminContent');
  const fn = PANEL_RENDERERS[id];
  c.innerHTML = fn ? fn() : '';
}

const PANEL_RENDERERS = {
  brand: renderBrandPanel,
  hero: renderHeroPanel,
  about: renderAboutPanel,
  services: renderServicesPanel,
  audit: renderAuditPanel,
  conseils: () => renderDetailPanel('conseils', 'Conseils'),
  formation: renderFormationPanel,
  finance: () => renderDetailPanel('finance', 'Finance'),
  team: renderTeamPanel,
  contact: renderContactPanel,
  security: renderSecurityPanel,
  backup: renderBackupPanel
};

/* --- Marque & couleurs --- */
function renderBrandPanel() {
  const c = DATA.colors;
  return `
    <h2>Marque & couleurs</h2>
    <p class="desc">Nom du cabinet et charte graphique appliquée à tout le site.</p>
    ${field('Nom complet du cabinet', 'brandName', DATA.brand.name)}
    ${field('Mot mis en avant (accent) dans le nom', 'brandAccent', DATA.brand.accentWord)}
    <div class="f-row">
      <div class="f-group"><label>Bleu principal</label><div class="swatch-row"><input type="color" id="colGreen" value="${c.green}"><input type="text" id="colGreenText" value="${c.green}"></div></div>
      <div class="f-group"><label>Bleu foncé</label><div class="swatch-row"><input type="color" id="colGreenDeep" value="${c.greenDeep}"><input type="text" id="colGreenDeepText" value="${c.greenDeep}"></div></div>
    </div>
    <div class="f-row">
      <div class="f-group"><label>Bleu clair (fonds)</label><div class="swatch-row"><input type="color" id="colGreenLight" value="${c.greenLight}"><input type="text" id="colGreenLightText" value="${c.greenLight}"></div></div>
      <div class="f-group"><label>Anthracite (titres)</label><div class="swatch-row"><input type="color" id="colCharcoal" value="${c.charcoal}"><input type="text" id="colCharcoalText" value="${c.charcoal}"></div></div>
    </div>
    <button class="save-btn" onclick="saveBrandPanel()">Enregistrer</button>
  `;
}
function saveBrandPanel() {
  DATA.brand.name = val('brandName');
  DATA.brand.accentWord = val('brandAccent');
  DATA.colors.green = val('colGreenText');
  DATA.colors.greenDeep = val('colGreenDeepText');
  DATA.colors.greenLight = val('colGreenLightText');
  DATA.colors.charcoal = val('colCharcoalText');
  saveAll();
}
// synchroniser les pickers couleur <-> champs texte
document.addEventListener('input', e => {
  if (e.target.id && e.target.id.startsWith('col') && e.target.type === 'color') {
    const textInput = document.getElementById(e.target.id + 'Text');
    if (textInput) textInput.value = e.target.value;
  }
});

/* --- Accueil / Hero --- */
function renderHeroPanel() {
  const h = DATA.hero;
  return `
    <h2>Page d'accueil</h2>
    <p class="desc">Titre principal, texte d'introduction, encadré chiffres-clés et image de fond (Île de Gorée par défaut).</p>
    ${field('Phrase d\'introduction (au-dessus du titre)', 'heroEyebrowI', h.eyebrow)}
    ${field('Titre principal', 'heroTitleI', h.title)}
    ${textareaField('Texte d\'introduction', 'heroLeadI', h.lead)}
    <div class="f-row">
      ${field('Bouton principal', 'heroCtaPrimaryI', h.ctaPrimary)}
      ${field('Bouton secondaire', 'heroCtaSecondaryI', h.ctaSecondary)}
    </div>
    ${field('Titre de l\'encadré chiffres-clés', 'heroLedgerTitleI', h.ledgerTitle)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin-bottom:6px;">Lignes de l'encadré (ex : référentiels SYSCOHADA / SYCEBNL)</label>
    ${kvListHtml('heroLedgerEditor', h.ledgerRows)}
    <div style="margin-top:24px;">
      <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin-bottom:6px;">Photo de fond de la page d'accueil (Île de Gorée)</label>
      <input type="file" id="heroImageFile" accept="image/*" onchange="handleHeroImageUpload(event)">
      <img id="heroImagePreview" class="thumb-preview" src="${h.heroImage || ''}" style="${h.heroImage ? '' : 'display:none;'}">
      <p style="font-size:12.5px; color:#8B928B; margin-top:6px;">Sans photo chargée, une illustration de l'Île de Gorée est utilisée par défaut. Chargez une vraie photo pour la remplacer.</p>
      <button type="button" class="btn-outline" style="margin-top:8px;" onclick="clearHeroImage()">Revenir à l'illustration par défaut</button>
    </div>
    <button class="save-btn" onclick="saveHeroPanel()">Enregistrer</button>
  `;
}
function handleHeroImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    DATA.hero.heroImage = reader.result;
    const prev = document.getElementById('heroImagePreview');
    prev.src = reader.result;
    prev.style.display = 'block';
  };
  reader.readAsDataURL(file);
}
function clearHeroImage() {
  DATA.hero.heroImage = '';
  const prev = document.getElementById('heroImagePreview');
  prev.style.display = 'none';
}
function saveHeroPanel() {
  const h = DATA.hero;
  h.eyebrow = val('heroEyebrowI');
  h.title = val('heroTitleI');
  h.lead = val('heroLeadI');
  h.ctaPrimary = val('heroCtaPrimaryI');
  h.ctaSecondary = val('heroCtaSecondaryI');
  h.ledgerTitle = val('heroLedgerTitleI');
  h.ledgerRows = readKVList('heroLedgerEditor');
  saveAll();
}

/* --- A-propos --- */
function renderAboutPanel() {
  const a = DATA.about;
  return `
    <h2>A-propos</h2>
    <p class="desc">Présentation du cabinet, chiffres mis en avant et valeurs (piliers).</p>
    ${field('Titre de la section', 'aboutTitleI', a.title)}
    ${textareaField('Texte d\'introduction', 'aboutIntroI', a.intro)}
    <div class="f-row">
      ${field('Encadré 1 — grand texte', 'aboutFigBigAI', a.figureBigA)}
      ${field('Encadré 1 — légende', 'aboutFigCapAI', a.figureCapA)}
    </div>
    <div class="f-row">
      ${field('Encadré 2 — grand texte', 'aboutFigBigBI', a.figureBigB)}
      ${field('Encadré 2 — légende', 'aboutFigCapBI', a.figureCapB)}
    </div>
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Paragraphes de présentation</label>
    ${strListHtml('aboutParasEditor', a.paragraphs)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:20px 0 6px;">Valeurs (piliers)</label>
    ${pillarListHtml('aboutPillarsEditor', a.pillars)}
    <button class="save-btn" onclick="saveAboutPanel()">Enregistrer</button>
  `;
}
function pillarListHtml(containerId, items) {
  const rows = items.map(p => pillarRowHtml(p.title, p.desc)).join('');
  return `<div class="list-editor" id="${containerId}">${rows}</div>
    <button type="button" class="add-btn" onclick="addPillarRow('${containerId}')">+ Ajouter une valeur</button>`;
}
function pillarRowHtml(title, desc) {
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-group"><label>Titre</label><input type="text" class="row-title" value="${escapeAttr(title)}"></div>
    <div class="f-group"><label>Description</label><input type="text" class="row-desc" value="${escapeAttr(desc)}"></div>
  </div>`;
}
function addPillarRow(containerId) {
  document.getElementById(containerId).insertAdjacentHTML('beforeend', pillarRowHtml('', ''));
}
function readPillarList(containerId) {
  const items = [];
  document.getElementById(containerId).querySelectorAll('.list-item').forEach(it => {
    items.push({ title: it.querySelector('.row-title').value, desc: it.querySelector('.row-desc').value });
  });
  return items;
}
function saveAboutPanel() {
  const a = DATA.about;
  a.title = val('aboutTitleI');
  a.intro = val('aboutIntroI');
  a.figureBigA = val('aboutFigBigAI');
  a.figureCapA = val('aboutFigCapAI');
  a.figureBigB = val('aboutFigBigBI');
  a.figureCapB = val('aboutFigCapBI');
  a.paragraphs = readStrList('aboutParasEditor');
  a.pillars = readPillarList('aboutPillarsEditor');
  saveAll();
}

/* --- Services --- */
function renderServicesPanel() {
  const s = DATA.services;
  return `
    <h2>Services</h2>
    <p class="desc">Les quatre pôles présentés sur la page d'accueil des services.</p>
    ${field('Titre de la section', 'servicesTitleI', s.title)}
    ${textareaField('Texte d\'introduction', 'servicesIntroI', s.intro)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Pôles</label>
    ${serviceListHtml('servicesEditor', s.items)}
    <button class="save-btn" onclick="saveServicesPanel()">Enregistrer</button>
  `;
}
function serviceListHtml(containerId, items) {
  const rows = items.map(it => serviceRowHtml(it.code, it.title, it.desc)).join('');
  return `<div class="list-editor" id="${containerId}">${rows}</div>
    <button type="button" class="add-btn" onclick="addServiceRow('${containerId}')">+ Ajouter un pôle</button>`;
}
function serviceRowHtml(code, title, desc) {
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-row">
      <div class="f-group"><label>Code (ex : Audit)</label><input type="text" class="row-code" value="${escapeAttr(code)}"></div>
      <div class="f-group"><label>Titre</label><input type="text" class="row-title" value="${escapeAttr(title)}"></div>
    </div>
    <div class="f-group"><label>Description</label><textarea class="row-desc">${escapeHtml(desc)}</textarea></div>
  </div>`;
}
function addServiceRow(containerId) {
  document.getElementById(containerId).insertAdjacentHTML('beforeend', serviceRowHtml('', '', ''));
}
function readServiceList(containerId) {
  const items = [];
  document.getElementById(containerId).querySelectorAll('.list-item').forEach(it => {
    items.push({
      code: it.querySelector('.row-code').value,
      title: it.querySelector('.row-title').value,
      desc: it.querySelector('.row-desc').value
    });
  });
  return items;
}
function saveServicesPanel() {
  DATA.services.title = val('servicesTitleI');
  DATA.services.intro = val('servicesIntroI');
  DATA.services.items = readServiceList('servicesEditor');
  saveAll();
}

/* --- Audit (titre, 2 sous-pôles, paragraphes, encadré) --- */
function renderAuditPanel() {
  const d = DATA.audit;
  return `
    <h2>Audit</h2>
    <p class="desc">Titre de la section, les deux sous-pôles mis en avant (Expertise comptable / Commissariat aux comptes), le texte et l'encadré chiffres.</p>
    ${field('Titre de la section', 'audit_title', d.title)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:20px 0 6px;">Sous-pôles mis en avant</label>
    <div class="list-editor" id="audit_subservices">${(d.subservices || []).map(s => subserviceRowHtml(s)).join('')}</div>
    <button type="button" class="add-btn" onclick="addSubserviceRow()">+ Ajouter un sous-pôle</button>
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:24px 0 6px;">Paragraphes</label>
    ${strListHtml('audit_paras', d.paragraphs)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:20px 0 6px;">Autres missions (liste à puces)</label>
    ${strListHtml('audit_checklist', d.checklist)}
    ${field('Titre de l\'encadré', 'audit_statTitle', d.statTitle)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Lignes de l'encadré</label>
    ${kvListHtml('audit_stats', d.stats)}
    <button class="save-btn" onclick="saveAuditPanel()">Enregistrer</button>
  `;
}
function subserviceRowHtml(s) {
  s = s || {};
  const icon = s.icon || 'calculator';
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-row">
      <div class="f-group"><label>Titre</label><input type="text" class="row-title" value="${escapeAttr(s.title)}"></div>
      <div class="f-group"><label>Icône</label>
        <select class="row-icon">
          <option value="calculator" ${icon === 'calculator' ? 'selected' : ''}>Calculatrice</option>
          <option value="shield" ${icon === 'shield' ? 'selected' : ''}>Bouclier</option>
          <option value="star" ${icon === 'star' ? 'selected' : ''}>Étoile</option>
        </select>
      </div>
    </div>
    <div class="f-group"><label>Description courte</label><textarea class="row-desc">${escapeHtml(s.desc)}</textarea></div>
    <div class="f-group"><label>Points clés (un par ligne)</label><textarea class="row-points">${escapeHtml((s.points || []).join('\n'))}</textarea></div>
  </div>`;
}
function addSubserviceRow() {
  document.getElementById('audit_subservices').insertAdjacentHTML('beforeend', subserviceRowHtml({}));
}
function readSubserviceList() {
  const items = [];
  document.getElementById('audit_subservices').querySelectorAll('.list-item').forEach(it => {
    items.push({
      title: it.querySelector('.row-title').value,
      icon: it.querySelector('.row-icon').value,
      desc: it.querySelector('.row-desc').value,
      points: it.querySelector('.row-points').value.split('\n').map(s => s.trim()).filter(Boolean)
    });
  });
  return items;
}
function saveAuditPanel() {
  const d = DATA.audit;
  d.title = val('audit_title');
  d.subservices = readSubserviceList();
  d.paragraphs = readStrList('audit_paras');
  d.checklist = readStrList('audit_checklist');
  d.statTitle = val('audit_statTitle');
  d.stats = readKVList('audit_stats');
  saveAll();
}

/* --- Conseils / Finance (structure commune) --- */
function renderDetailPanel(key, label) {
  const d = DATA[key];
  return `
    <h2>${label}</h2>
    <p class="desc">Texte, liste de prestations et encadré chiffres pour la section « ${label} ».</p>
    ${field('Titre de la section', key + '_title', d.title)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Paragraphes</label>
    ${strListHtml(key + '_paras', d.paragraphs)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:20px 0 6px;">Liste à puces</label>
    ${strListHtml(key + '_checklist', d.checklist)}
    ${field('Titre de l\'encadré', key + '_statTitle', d.statTitle)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Lignes de l'encadré</label>
    ${kvListHtml(key + '_stats', d.stats)}
    <button class="save-btn" onclick="saveDetailPanel('${key}')">Enregistrer</button>
  `;
}
function saveDetailPanel(key) {
  const d = DATA[key];
  d.title = val(key + '_title');
  d.paragraphs = readStrList(key + '_paras');
  d.checklist = readStrList(key + '_checklist');
  d.statTitle = val(key + '_statTitle');
  d.stats = readKVList(key + '_stats');
  saveAll();
}

/* --- Formation (avec photos) --- */
function renderFormationPanel() {
  const d = DATA.formation;
  return `
    <h2>Formation</h2>
    <p class="desc">Texte, liste de formations, encadré et photos illustrant les sessions.</p>
    ${field('Titre de la section', 'formation_title', d.title)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Paragraphes</label>
    ${strListHtml('formation_paras', d.paragraphs)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:20px 0 6px;">Liste à puces (SYSCOHADA / SYCEBNL...)</label>
    ${strListHtml('formation_checklist', d.checklist)}
    ${field('Titre de l\'encadré', 'formation_statTitle', d.statTitle)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Lignes de l'encadré</label>
    ${kvListHtml('formation_stats', d.stats)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:24px 0 6px;">Photos de formation</label>
    <div class="list-editor" id="formation_photos">${d.photos.map((p, i) => photoRowHtml(p.url, p.caption, i)).join('')}</div>
    <button type="button" class="add-btn" onclick="addPhotoRow()">+ Ajouter une photo</button>
    <br><button class="save-btn" onclick="saveFormationPanel()">Enregistrer</button>
  `;
}
let photoRowCounter = 0;
function photoRowHtml(url, caption, idx) {
  const uid = 'photo_' + (idx !== undefined ? idx : photoRowCounter++) + '_' + Math.random().toString(36).slice(2, 7);
  return `<div class="list-item" data-uid="${uid}">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-group"><label>Photo</label>
      <input type="file" accept="image/*" onchange="handlePhotoUpload(event, '${uid}')">
      <img id="prev_${uid}" class="thumb-preview" src="${url || ''}" style="${url ? '' : 'display:none;'}">
      <input type="hidden" class="row-url" value="${escapeAttr(url || '')}">
    </div>
    <div class="f-group"><label>Légende</label><input type="text" class="row-caption" value="${escapeAttr(caption || '')}"></div>
  </div>`;
}
function addPhotoRow() {
  document.getElementById('formation_photos').insertAdjacentHTML('beforeend', photoRowHtml('', ''));
}
function handlePhotoUpload(e, uid) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const item = e.target.closest('.list-item');
    item.querySelector('.row-url').value = reader.result;
    const prev = item.querySelector('img.thumb-preview');
    prev.src = reader.result;
    prev.style.display = 'block';
  };
  reader.readAsDataURL(file);
}
function readPhotoList() {
  const items = [];
  document.getElementById('formation_photos').querySelectorAll('.list-item').forEach(it => {
    items.push({ url: it.querySelector('.row-url').value, caption: it.querySelector('.row-caption').value });
  });
  return items;
}
function saveFormationPanel() {
  const d = DATA.formation;
  d.title = val('formation_title');
  d.paragraphs = readStrList('formation_paras');
  d.checklist = readStrList('formation_checklist');
  d.statTitle = val('formation_statTitle');
  d.stats = readKVList('formation_stats');
  d.photos = readPhotoList();
  saveAll();
}

/* --- Équipe --- */
function renderTeamPanel() {
  const t = DATA.team;
  return `
    <h2>Équipe</h2>
    <p class="desc">Membres de l'équipe présentés sur le site.</p>
    ${field('Titre de la section', 'teamTitleI', t.title)}
    ${textareaField('Texte d\'introduction', 'teamIntroI', t.intro)}
    <label style="display:block; font-size:13px; font-weight:700; color:var(--ink-soft); margin:14px 0 6px;">Membres</label>
    <div class="list-editor" id="teamEditor">${t.members.map(m => teamRowHtml(m)).join('')}</div>
    <button type="button" class="add-btn" onclick="addTeamRow()">+ Ajouter un membre</button>
    <br><button class="save-btn" onclick="saveTeamPanel()">Enregistrer</button>
  `;
}
function teamRowHtml(m) {
  m = m || {};
  return `<div class="list-item">
    <button type="button" class="remove-btn" onclick="this.closest('.list-item').remove()">Supprimer</button>
    <div class="f-row">
      <div class="f-group"><label>Initiales</label><input type="text" class="row-initials" value="${escapeAttr(m.initials)}" maxlength="3"></div>
      <div class="f-group"><label>Nom</label><input type="text" class="row-name" value="${escapeAttr(m.name)}"></div>
    </div>
    <div class="f-group"><label>Fonction</label><input type="text" class="row-role" value="${escapeAttr(m.role)}"></div>
    <div class="f-group"><label>Description</label><input type="text" class="row-desc" value="${escapeAttr(m.desc)}"></div>
  </div>`;
}
function addTeamRow() {
  document.getElementById('teamEditor').insertAdjacentHTML('beforeend', teamRowHtml({}));
}
function readTeamList() {
  const items = [];
  document.getElementById('teamEditor').querySelectorAll('.list-item').forEach(it => {
    items.push({
      initials: it.querySelector('.row-initials').value,
      name: it.querySelector('.row-name').value,
      role: it.querySelector('.row-role').value,
      desc: it.querySelector('.row-desc').value
    });
  });
  return items;
}
function saveTeamPanel() {
  DATA.team.title = val('teamTitleI');
  DATA.team.intro = val('teamIntroI');
  DATA.team.members = readTeamList();
  saveAll();
}

/* --- Contact --- */
function renderContactPanel() {
  const c = DATA.contact;
  return `
    <h2>Contact</h2>
    <p class="desc">Coordonnées affichées en pied de page, dans la section Contacts et via le bouton WhatsApp flottant.</p>
    ${textareaField('Texte d\'introduction', 'contactIntroI', c.intro)}
    ${field('Adresse', 'contactAddressI', c.address)}
    ${field('Téléphone (affiché)', 'contactPhoneI', c.phone)}
    ${field('E-mail', 'contactEmailI', c.email)}
    ${field('Horaires', 'contactHoursI', c.hours)}
    <div class="f-row">
      ${field('Numéro WhatsApp (format international, sans + ni espace, ex : 221770000000)', 'contactWaNumberI', c.whatsappNumber)}
      ${field('Message pré-rempli WhatsApp', 'contactWaMessageI', c.whatsappMessage)}
    </div>
    <button class="save-btn" onclick="saveContactPanel()">Enregistrer</button>
  `;
}
function saveContactPanel() {
  const c = DATA.contact;
  c.intro = val('contactIntroI');
  c.address = val('contactAddressI');
  c.phone = val('contactPhoneI');
  c.email = val('contactEmailI');
  c.hours = val('contactHoursI');
  c.whatsappNumber = val('contactWaNumberI').replace(/[^0-9]/g, '');
  c.whatsappMessage = val('contactWaMessageI');
  saveAll();
}

/* --- Sécurité --- */
function renderSecurityPanel() {
  return `
    <h2>Sécurité</h2>
    <p class="desc">Le mot de passe protège l'accès à cette page d'administration sur cet appareil.</p>
    ${field('Nouveau mot de passe', 'newPass1', '', 'password')}
    ${field('Confirmer le nouveau mot de passe', 'newPass2', '', 'password')}
    <button class="save-btn" onclick="changePassword()">Changer le mot de passe</button>
  `;
}
function changePassword() {
  const p1 = val('newPass1'), p2 = val('newPass2');
  if (!p1 || p1.length < 4) { toast('Mot de passe trop court (4 caractères minimum)'); return; }
  if (p1 !== p2) { toast('Les deux mots de passe ne correspondent pas'); return; }
  cafSetPassword(p1);
  toast('Mot de passe mis à jour');
  document.getElementById('newPass1').value = '';
  document.getElementById('newPass2').value = '';
}

/* --- Sauvegarde / restauration --- */
function renderBackupPanel() {
  return `
    <h2>Sauvegarde</h2>
    <p class="desc">Les modifications sont enregistrées dans ce navigateur. Exportez régulièrement une copie du contenu, et importez-la sur un autre appareil pour transférer le site.</p>
    <div class="backup-actions">
      <button class="btn-outline" onclick="exportBackup()">Exporter le contenu (.json)</button>
      <label class="btn-outline" style="cursor:pointer;">Importer un fichier .json
        <input type="file" accept="application/json" style="display:none;" onchange="importBackup(event)">
      </label>
      <button class="btn-outline danger" onclick="resetContent()">Réinitialiser le contenu par défaut</button>
    </div>
  `;
}
function exportBackup() {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'crystal-audit-finance-contenu.json';
  a.click();
  URL.revokeObjectURL(url);
}
function importBackup(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(reader.result);
      DATA = cafMerge(JSON.parse(JSON.stringify(CAF_DEFAULT_DATA)), imported);
      cafSaveData(DATA);
      toast('Contenu importé');
      renderPanel(ACTIVE_TAB);
    } catch (err) {
      toast('Fichier invalide');
    }
  };
  reader.readAsText(file);
}
function resetContent() {
  if (!confirm('Réinitialiser tout le contenu du site aux valeurs par défaut ?')) return;
  cafResetData();
  DATA = cafLoadData();
  toast('Contenu réinitialisé');
  renderPanel(ACTIVE_TAB);
}
