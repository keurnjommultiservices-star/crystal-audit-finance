/* ============================================================
   Crystal Audit Finance — données du site
   Toutes les données affichées sur index.html viennent d'ici.
   L'admin (admin.html) modifie ces données et les enregistre
   dans le navigateur (localStorage). index.html les relit à
   chaque chargement : tout devient modifiable sans toucher au code.
   ============================================================ */

const CAF_STORAGE_KEY = 'caf_site_data_v1';
const CAF_AUTH_KEY = 'caf_admin_pass_v1';
const CAF_DEFAULT_PASSWORD = 'crystal2026';

// Petite image placeholder (dégradé vert) encodée en SVG->dataURL,
// utilisée tant qu'aucune vraie photo n'a été chargée depuis l'admin.
function cafPlaceholder(label, tone) {
  const colors = {
    a: ['#1F5C8C', '#123A57'],
    b: ['#2E6DA4', '#1F5C8C'],
    c: ['#4A87B8', '#1F5C8C']
  };
  const [c1, c2] = colors[tone] || colors.a;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="420">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="640" height="420" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#F6F5F1" font-family="Arial" font-size="26" font-weight="700"
      text-anchor="middle" dominant-baseline="middle">${label}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

const CAF_DEFAULT_DATA = {
  brand: {
    name: 'Crystal Audit Finance',
    accentWord: 'Finance'
  },
  colors: {
    charcoal: '#262B27',
    ink: '#1B1E1B',
    inkSoft: '#4C554D',
    paper: '#F6F5F1',
    paper2: '#ECF2ED',
    line: '#D3DBD4',
    green: '#1F5C8C',
    greenDeep: '#123A57',
    greenLight: '#E4ECF3'
  },
  hero: {
    heroImage: '', // vide = illustration Gorée par défaut ; sinon dataURL/URL uploadée en admin
    eyebrow: "Cabinet d'audit, d'expertise comptable et de conseil",
    title: 'Des comptes clairs, des décisions sûres.',
    lead: "Crystal Audit Finance accompagne entreprises, associations et institutions à Dakar et sur toute la Petite Côte : audit légal et contractuel, tenue comptable SYSCOHADA et SYCEBNL, fiscalité, formation et ingénierie financière.",
    ctaPrimary: 'Demander un rendez-vous',
    ctaSecondary: 'Voir nos prestations',
    ledgerTitle: 'Cabinet — en bref',
    ledgerRows: [
      { label: "Missions d'audit conduites", value: '180+' },
      { label: "Années d'exercice", value: '12' },
      { label: 'Secteurs accompagnés', value: '9' },
      { label: 'Référentiel entreprises', value: 'SYSCOHADA' },
      { label: 'Référentiel entités à but non lucratif', value: 'SYCEBNL' }
    ]
  },
  about: {
    title: 'Un cabinet ancré dans la pratique OHADA',
    intro: "Fondé à Dakar, Crystal Audit Finance réunit experts-comptables, auditeurs et fiscalistes formés aux exigences du droit comptable OHADA — SYSCOHADA pour les entreprises, SYCEBNL pour les associations et ONG — et aux réalités des organisations sénégalaises.",
    figureBigA: 'CAF',
    figureCapA: "Membre affilié — Ordre des Experts-Comptables et Comptables Agréés du Sénégal",
    figureBigB: '01',
    figureCapB: 'Cabinet, deux implantations : siège à Dakar, antenne sur la Petite Côte',
    paragraphs: [
      "Notre rôle n'est pas de produire des documents, mais des décisions. Chaque bilan, chaque rapport d'audit ou chaque note fiscale que nous livrons est pensé pour éclairer un choix concret : investir, embaucher, refinancer, se mettre en conformité.",
      "Nous travaillons avec des PME familiales, des filiales de groupes internationaux, des associations et des collectivités. Cette diversité nourrit une exigence commune : la rigueur du chiffre, la clarté du langage."
    ],
    pillars: [
      { title: 'Indépendance', desc: 'Aucune mission de conseil sur un dossier que nous certifions.' },
      { title: 'Confidentialité', desc: 'Secret professionnel appliqué à chaque échange, écrit ou oral.' },
      { title: 'Proximité', desc: 'Un interlocuteur unique du premier rendez-vous à la clôture.' },
      { title: 'Actualisation', desc: 'Veille continue sur le droit fiscal et comptable sénégalais.' }
    ]
  },
  services: {
    title: "Quatre pôles d'intervention",
    intro: "De la certification des comptes à la montée en compétence de vos équipes, chaque pôle peut être mobilisé seul ou en mission combinée.",
    items: [
      { code: 'Audit', title: 'Audit légal & contractuel', desc: "Commissariat aux comptes, audit d'acquisition, revue de contrôle interne et missions ponctuelles à la demande des associés ou des bailleurs." },
      { code: 'Conseils', title: 'Conseil fiscal & juridique', desc: "Optimisation et sécurisation fiscale, accompagnement à la création d'entreprise, assistance lors des contrôles de la DGID." },
      { code: 'Formation', title: 'Formation & renforcement de capacités', desc: 'Sessions intra-entreprise sur le SYSCOHADA, le SYCEBNL, la fiscalité pratique et les outils de gestion.' },
      { code: 'Finance', title: 'Ingénierie & structuration financière', desc: 'Montage de dossiers de financement, business plans, tableaux de bord et accompagnement auprès des banques et investisseurs.' }
    ]
  },
  audit: {
    title: 'Une opinion indépendante sur vos comptes',
    paragraphs: [
      "Nos missions d'audit suivent les normes ISA et le référentiel OHADA (SYSCOHADA pour les entreprises, SYCEBNL pour les entités à but non lucratif). L'objectif : donner à vos associés, banquiers et partenaires une assurance raisonnable sur la fiabilité de vos états financiers.",
      "Chaque mission démarre par une note de cadrage partagée avec la direction, pour que les délais et les zones d'attention soient connus dès le premier jour."
    ],
    subservices: [
      {
        icon: 'calculator',
        title: 'Expertise comptable',
        desc: "Tenue, supervision et révision de votre comptabilité, dans le respect du plan SYSCOHADA ou SYCEBNL selon votre statut.",
        points: [
          'Tenue et supervision comptable mensuelle',
          "Établissement des états financiers annuels",
          'Assistance à la clôture des comptes'
        ]
      },
      {
        icon: 'shield',
        title: 'Commissariat aux comptes',
        desc: "Certification légale de vos comptes et sécurisation de vos obligations vis-à-vis des associés et des tiers.",
        points: [
          'Certification légale des comptes annuels',
          'Rapport aux organes sociaux (AG, conseil)',
          "Procédure d'alerte et missions ponctuelles"
        ]
      }
    ],
    checklist: [
      "Audit d'acquisition (due diligence)",
      'Revue des procédures de contrôle interne',
      'Audit sur financement bailleur ou subvention (SYCEBNL)'
    ],
    statTitle: "Déroulé type d'une mission",
    stats: [
      { label: 'Cadrage & lettre de mission', value: 'Semaine 1' },
      { label: 'Prise de connaissance & tests', value: 'Semaines 2–4' },
      { label: 'Contrôle des comptes', value: 'Semaines 5–6' },
      { label: 'Restitution & rapport', value: 'Semaine 7' }
    ]
  },
  conseils: {
    title: 'Anticiper plutôt que subir',
    paragraphs: [
      "La majorité des redressements fiscaux naissent d'un défaut d'anticipation. Nos consultants revoient vos déclarations avant échéance et vous alertent sur les risques avant qu'ils ne deviennent des litiges.",
      "En cas de contrôle de la Direction Générale des Impôts et des Domaines, nous préparons le dossier avec vous et pouvons vous représenter lors des échanges avec l'administration."
    ],
    checklist: [
      "Calendrier fiscal personnalisé et alertes d'échéance",
      'Choix du régime fiscal et de la forme juridique',
      'Négociation et suivi des contentieux fiscaux'
    ],
    statTitle: 'Domaines de conseil',
    stats: [
      { label: 'Fiscalité (IS, TVA, IR)', value: 'Récurrent' },
      { label: 'Création & restructuration', value: 'Sur devis' },
      { label: 'Assistance contrôle fiscal', value: 'Sur demande' },
      { label: 'Paie & droit social', value: 'Récurrent' }
    ]
  },
  formation: {
    title: 'Des équipes comptables autonomes',
    paragraphs: [
      "Nous formons vos collaborateurs directement sur vos dossiers réels : plan comptable SYSCOHADA ou SYCEBNL selon votre statut, clôture, immobilisations, TVA — plutôt que sur des cas théoriques.",
      'Chaque session se conclut par un support de référence que l\'équipe garde en interne, pensé comme un guide de poste et non comme un simple diaporama.'
    ],
    checklist: [
      'Comptabilité générale — plan SYSCOHADA (entreprises)',
      'Comptabilité des associations & ONG — plan SYCEBNL',
      'Fiscalité pratique pour comptables et gestionnaires',
      'Lecture des états financiers pour dirigeants non-financiers'
    ],
    statTitle: 'Formats proposés',
    stats: [
      { label: 'Intra-entreprise (sur site)', value: '1 à 3 jours' },
      { label: 'Ateliers de clôture annuelle', value: 'Demi-journée' },
      { label: 'Accompagnement continu', value: 'Forfait mensuel' }
    ],
    photos: [
      { url: '', caption: 'Session intra-entreprise — clôture annuelle' },
      { url: '', caption: 'Atelier SYSCOHADA / SYCEBNL' },
      { url: '', caption: 'Formation dirigeants — lecture des états financiers' }
    ]
  },
  finance: {
    title: 'Construire le dossier qui convainc un financeur',
    paragraphs: [
      "Un bon projet mal chiffré reste souvent sans financement. Nous traduisons votre activité en business plan, prévisionnel et plan de trésorerie lisibles par une banque ou un investisseur.",
      "Nous accompagnons ensuite la négociation : structuration de la dette, garanties, calendrier de remboursement."
    ],
    checklist: [
      'Business plan et comptes de résultat prévisionnels',
      'Montage de dossiers de crédit bancaire ou de subvention',
      'Tableaux de bord et pilotage de trésorerie'
    ],
    statTitle: 'Partenaires de financement usuels',
    stats: [
      { label: 'Banques commerciales locales', value: 'Dossier crédit' },
      { label: 'Fonds de garantie & institutions', value: 'Co-financement' },
      { label: 'Bailleurs & ONG', value: 'Subvention' }
    ]
  },
  team: {
    title: "L'équipe qui suit votre dossier",
    intro: 'Un pôle resserré, pour que le consultant qui signe votre rapport soit celui qui a suivi la mission de bout en bout.',
    members: [
      { initials: 'AD', name: 'Amadou Diallo', role: 'Associé fondateur — Expert-comptable', desc: '15 ans de pratique du commissariat aux comptes et de la due diligence.' },
      { initials: 'FS', name: 'Fatou Sarr', role: 'Directrice Audit', desc: 'Pilotage des missions légales et des audits sur financement.' },
      { initials: 'MN', name: 'Moussa Ndiaye', role: 'Responsable Fiscalité', desc: 'Conseil fiscal et accompagnement des contrôles DGID.' },
      { initials: 'KB', name: 'Khady Ba', role: 'Responsable Formation & Finance', desc: 'Sessions de formation et montage de dossiers de financement.' }
    ]
  },
  contact: {
    intro: "Premier échange sans engagement pour cadrer vos besoins et vous orienter vers le bon interlocuteur du cabinet.",
    address: 'Rue 15 x Bd du Centenaire, Dakar, Sénégal',
    phone: '+221 33 800 00 00',
    whatsappNumber: '221770000000',
    whatsappMessage: 'Bonjour Crystal Audit Finance, je souhaite un premier échange.',
    email: 'contact@crystalauditfinance.sn',
    hours: 'Lundi – Vendredi, 8h30 – 17h30'
  },
  footer: {
    desc: "Cabinet d'audit, d'expertise comptable et de conseil basé à Dakar, au service des entreprises et institutions sénégalaises.",
    orderLine: "Membre de l'Ordre des Experts-Comptables et Comptables Agréés du Sénégal",
    year: '2026'
  }
};

function cafLoadData() {
  try {
    const raw = localStorage.getItem(CAF_STORAGE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(CAF_DEFAULT_DATA));
    const parsed = JSON.parse(raw);
    // fusion superficielle avec les valeurs par défaut pour éviter les champs manquants
    return cafMerge(JSON.parse(JSON.stringify(CAF_DEFAULT_DATA)), parsed);
  } catch (e) {
    return JSON.parse(JSON.stringify(CAF_DEFAULT_DATA));
  }
}

function cafMerge(base, override) {
  if (Array.isArray(base)) return override !== undefined ? override : base;
  if (typeof base === 'object' && base !== null) {
    const out = {};
    for (const k in base) {
      out[k] = (override && override[k] !== undefined) ? cafMerge(base[k], override[k]) : base[k];
    }
    return out;
  }
  return override !== undefined ? override : base;
}

function cafSaveData(data) {
  localStorage.setItem(CAF_STORAGE_KEY, JSON.stringify(data));
}

function cafResetData() {
  localStorage.removeItem(CAF_STORAGE_KEY);
}

function cafGetPassword() {
  return localStorage.getItem(CAF_AUTH_KEY) || CAF_DEFAULT_PASSWORD;
}

function cafSetPassword(pass) {
  localStorage.setItem(CAF_AUTH_KEY, pass);
}
