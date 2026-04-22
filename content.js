// ========== SEED CONTENT for United Learn LMS ==========
// Structured from the uploaded training material folders:
//   Unitile:       Training material/Chapter 1..5
//   UniVicoustic:  Training-material-Univicoustic/Training Modules, SOP, Test Certificates, Technical Specifications
// Plus the digital catalog at https://catalog.univicoustic.com/

window.SEED_DIVISIONS = [
  { id: 'unitile', name: 'Unitile', tagline: 'Raised Access Flooring & Ceiling Systems', color: 'tile' },
  { id: 'univicoustic', name: 'UniVicoustic', tagline: 'Acoustic Panels & Sound Solutions', color: 'acoustic' }
];

window.SEED_DESIGNATIONS = [
  'Sales Executive', 'Sales Manager', 'Regional Sales Head',
  'Application Engineer', 'Project Engineer', 'Installation Supervisor',
  'Product Manager', 'Marketing Executive', 'Dealer / Channel Partner',
  'Customer Support', 'R&D Engineer', 'Quality Engineer', 'Production Supervisor',
  'HR Executive', 'Finance Executive', 'Intern / Trainee'
];

// ========== Sample employees (admin-assignable roster) ==========
window.SEED_EMPLOYEES = [
  { name: 'Rahul Sharma',       email: 'rahul.sharma@united-group.in',     division: 'unitile',      designation: 'Sales Manager',          unit: 'Mumbai West' },
  { name: 'Priya Iyer',         email: 'priya.iyer@united-group.in',       division: 'unitile',      designation: 'Application Engineer',   unit: 'Bangalore' },
  { name: 'Amit Kulkarni',      email: 'amit.kulkarni@united-group.in',    division: 'unitile',      designation: 'Installation Supervisor',unit: 'Pune Plant' },
  { name: 'Neha Gupta',         email: 'neha.gupta@united-group.in',       division: 'univicoustic', designation: 'Product Manager',        unit: 'Mumbai HQ' },
  { name: 'Suresh Nair',        email: 'suresh.nair@united-group.in',      division: 'univicoustic', designation: 'Sales Executive',        unit: 'Kochi' },
  { name: 'Divya Menon',        email: 'divya.menon@united-group.in',      division: 'univicoustic', designation: 'Marketing Executive',    unit: 'Mumbai HQ' },
  { name: 'Karan Patel',        email: 'karan.patel@united-group.in',      division: 'unitile',      designation: 'Regional Sales Head',    unit: 'Ahmedabad' },
  { name: 'Meera Subramanian',  email: 'meera.s@united-group.in',          division: 'univicoustic', designation: 'Application Engineer',   unit: 'Chennai' },
  { name: 'Vivek Ranjan',       email: 'vivek.ranjan@united-group.in',     division: 'unitile',      designation: 'Project Engineer',       unit: 'Delhi NCR' },
  { name: 'Ananya Desai',       email: 'ananya.desai@united-group.in',     division: 'univicoustic', designation: 'Customer Support',       unit: 'Mumbai HQ' }
];

// ========== Trainers ==========
window.SEED_TRAINERS = [
  { id: 't1', name: 'Dr. Anil Kapoor',   expertise: 'Acoustic Physics & Materials', division: 'univicoustic', bio: '20+ yrs in acoustic engineering, former IIT consultant.' },
  { id: 't2', name: 'Rohan Mehta',       expertise: 'Raised Access Flooring Systems', division: 'unitile', bio: 'Ex-Data-Center lead, 15+ yrs RAF installations.' },
  { id: 't3', name: 'Sneha Agarwal',     expertise: 'Sales & Market Strategy', division: 'both', bio: 'MBA, B2B building-product sales specialist.' },
  { id: 't4', name: 'Prashant Jain',     expertise: 'Installation & SOPs', division: 'both', bio: 'Certified trainer on installation standards & safety.' }
];

// ========== Helper for structured lessons ==========
const L = (title, sections) => ({ title, sections });

// ========== UNITILE COURSES ==========
// Source folders:
//   Chapter 1 - Introduction to RAF
//   Chapter 2 - Business Segments
//   Chapter 3 - Product range (RAF, UFlex Ceiling, Accessories)
//   Chapter 4 - RAF Testing Standards
//   Chapter 5 - Installation
window.SEED_COURSES = [
  {
    id: 'uti-1', division: 'unitile', order: 1,
    title: 'Chapter 1 — Introduction to Raised Access Flooring',
    summary: 'Understand what RAF is, why it exists, core components, and typical applications.',
    thumbnail: '🏗️',
    trainerId: 't2',
    accessRoles: ['all'],
    estimatedMinutes: 35,
    lessons: [
      { id: 'uti-1-l1', title: 'What is a Raised Access Floor (RAF)?', type: 'reading', body: `
<h3>Definition</h3>
<p>A <strong>Raised Access Floor (RAF)</strong> — also called an access floor, raised floor, or false floor — is a secondary floor built above a solid substrate (typically a concrete slab), creating a continuous plenum void used for distributing services such as power cables, data cables, HVAC airflow and even water piping.</p>
<h3>Core idea</h3>
<p>Instead of embedding cables and ducts inside the slab or running them overhead, an RAF creates a service void under the occupied floor that can be accessed through removable panels. This allows services to be reconfigured quickly without any civil work.</p>
<div class="callout"><strong>Why it matters:</strong> In a modern data center one rack move can involve hundreds of cable changes. RAF turns a week-long project into a one-day reconfiguration.</div>
<h3>Brief history</h3>
<div class="timeline">
  <div class="evt"><div class="yr">1950s</div><div>First raised floors built for mainframe computers — IBM pioneered under-floor cabling and cooling.</div></div>
  <div class="evt"><div class="yr">1970s</div><div>Adopted by banks and financial control rooms needing constant reconfiguration.</div></div>
  <div class="evt"><div class="yr">1990s – 2000s</div><div>Becomes standard in enterprise data centers as hot/cold aisle cooling emerges.</div></div>
  <div class="evt"><div class="yr">Today</div><div>Used across DCs, command rooms, trading floors, offices, labs, cleanrooms, studios, auditoriums.</div></div>
</div>
<h3>Key characteristics</h3>
<ul>
<li>Removable / interchangeable panels (typically 600 × 600 mm).</li>
<li>Adjustable height via pedestals — anywhere from 50 mm to 1200 mm+.</li>
<li>Supports concentrated loads from heavy IT equipment.</li>
<li>Designed to meet fire, ESD and load standards.</li>
</ul>
`},
      { id: 'uti-1-l2', title: 'Why Choose RAF? — Benefits & Value Proposition', type: 'reading', body: `
<div class="compare">
  <div class="item"><span class="ico">🔧</span><div class="t">Flexibility</div><div class="d">Lift a panel, rewire, done — no civil work.</div></div>
  <div class="item"><span class="ico">❄️</span><div class="t">Cooling</div><div class="d">Plenum feeds cold air exactly under racks.</div></div>
  <div class="item"><span class="ico">🔌</span><div class="t">Cables</div><div class="d">Thousands of clean, segregated runs.</div></div>
  <div class="item"><span class="ico">📈</span><div class="t">Scalable</div><div class="d">Adapts to future load and service growth.</div></div>
  <div class="item"><span class="ico">✨</span><div class="t">Aesthetics</div><div class="d">Uncluttered, premium finished look.</div></div>
  <div class="item"><span class="ico">🛡️</span><div class="t">Compliance</div><div class="d">Fire-rated + ESD-safe by design.</div></div>
</div>
<h3>The six benefits at a glance</h3>
<ol class="list-decimal pl-6 mb-3 text-slate-700">
<li><strong>Flexibility:</strong> Services can be relocated by simply lifting panels.</li>
<li><strong>Cooling efficiency:</strong> Under-floor plenum lets cold air be pushed exactly where racks need it (cold-aisle containment).</li>
<li><strong>Cable management:</strong> Thousands of cables can be routed cleanly and safely.</li>
<li><strong>Scalability:</strong> The floor can accommodate future load and service changes.</li>
<li><strong>Aesthetics:</strong> Clean, uncluttered finished appearance.</li>
<li><strong>Safety & compliance:</strong> Fire-rated, ESD-safe panels reduce operational risk.</li>
</ol>
<h3>Cost vs Value</h3>
<p>An RAF typically represents <strong>2–5% of total facility cost</strong> but drives 25–40% of operational flexibility savings over a facility's lifetime.</p>
<div class="callout warning"><strong>Common objection:</strong> "It's expensive." Counter with lifetime TCO: one MAC (Move/Add/Change) event in a slab-floor office can cost 3× an RAF reconfiguration.</div>
<h3>Where RAF is NOT ideal</h3>
<ul>
<li>Very low floor-to-ceiling heights (&lt; 2.4 m finished).</li>
<li>Highly wet environments (kitchens, car wash bays).</li>
<li>Purely residential applications (cost rarely justified).</li>
</ul>
`},
      { id: 'uti-1-l3', title: 'Anatomy of an RAF System', type: 'reading', body: `
<h3>Exploded view — how the pieces stack up</h3>
<figure>
<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="slabG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#94a3b8"/><stop offset="1" stop-color="#64748b"/></linearGradient>
    <linearGradient id="panelG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#e2e8f0"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
    <linearGradient id="finishG" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1f3bf5"/><stop offset="1" stop-color="#1a2aa7"/></linearGradient>
  </defs>
  <rect x="40" y="300" width="640" height="30" fill="url(#slabG)" stroke="#475569"/>
  <text x="360" y="352" text-anchor="middle" font-size="11" fill="#334155" font-weight="600">Concrete slab (substrate)</text>
  <g fill="#3357ff" stroke="#1a2aa7" stroke-width="1.2">
    <rect x="90" y="210" width="12" height="90"/><rect x="85" y="200" width="22" height="10"/><rect x="80" y="295" width="32" height="10" fill="#1a2aa7"/>
    <rect x="350" y="210" width="12" height="90"/><rect x="345" y="200" width="22" height="10"/><rect x="340" y="295" width="32" height="10" fill="#1a2aa7"/>
    <rect x="610" y="210" width="12" height="90"/><rect x="605" y="200" width="22" height="10"/><rect x="600" y="295" width="32" height="10" fill="#1a2aa7"/>
  </g>
  <text x="105" y="270" font-size="10" fill="#64748b">Adjustable head</text>
  <g stroke="#7c3aed" stroke-width="3" fill="#c4b5fd">
    <rect x="100" y="196" width="258" height="5" rx="1"/>
    <rect x="358" y="196" width="258" height="5" rx="1"/>
  </g>
  <text x="228" y="190" text-anchor="middle" font-size="11" fill="#6d28d9" font-weight="600">Stringer</text>
  <g fill="url(#panelG)" stroke="#334155" stroke-width="1.4">
    <rect x="80" y="160" width="275" height="35"/><rect x="355" y="160" width="275" height="35"/>
  </g>
  <g fill="url(#finishG)">
    <rect x="80" y="154" width="275" height="8"/><rect x="355" y="154" width="275" height="8"/>
  </g>
  <text x="220" y="179" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="600">Panel (600 × 600 × 35 mm)</text>
  <text x="495" y="179" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="600">Panel</text>
  <text x="355" y="151" text-anchor="middle" font-size="9" fill="#1f3bf5" font-weight="700">HPL / carpet / vinyl finish</text>
  <path d="M90 140 Q 90 80 200 80 L 310 80" stroke="#64748b" stroke-dasharray="3,3" fill="none"/>
  <text x="320" y="84" font-size="10" fill="#334155">Plenum: cables, HVAC, ducts</text>
  <g stroke="#ea580c" stroke-width="1.5" fill="none" marker-end="url(#arr)">
    <path d="M50 230 L 78 230"/>
    <path d="M670 230 L 640 230"/>
  </g>
  <defs><marker id="arr" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#ea580c"/></marker></defs>
  <text x="30" y="234" font-size="10" fill="#ea580c" font-weight="600">Pedestal</text>
  <text x="675" y="234" font-size="10" fill="#ea580c" font-weight="600">Pedestal</text>
  <text x="50" y="320" font-size="10" fill="#334155">Glue-down base with structural adhesive</text>
</svg>
<figcaption>Cross-section of a typical 300 mm raised access floor. Load path: panel → pedestal head → pedestal column → adhesive → slab. Stringers add lateral stiffness.</figcaption>
</figure>

<h3>Five core components</h3>
<table>
<tr><th>Component</th><th>Function</th><th>Typical specs</th></tr>
<tr><td><strong>Panel</strong></td><td>The walkable top surface; removable for access.</td><td>600×600 mm, 25–45 mm thick</td></tr>
<tr><td><strong>Pedestal</strong></td><td>Vertical support at each corner; height-adjustable.</td><td>Steel, adjustable 50–1200 mm</td></tr>
<tr><td><strong>Stringer</strong></td><td>Horizontal beam that connects pedestals into a grid.</td><td>Used for lateral stability, especially above 300 mm height</td></tr>
<tr><td><strong>Finish</strong></td><td>Top layer bonded to panel: HPL, vinyl, anti-static, bare steel, stone, etc.</td><td>Selected by aesthetics + use-case</td></tr>
<tr><td><strong>Accessories</strong></td><td>Airflow grilles, air plugs, cable cutouts, ramps, panel lifters.</td><td>Function-specific</td></tr>
</table>
<h3>How the pieces fit</h3>
<p>Pedestals glue/bolt to slab → pedestals are interconnected by stringers (for rigidity) → panels sit on the pedestal heads → finish is applied on top of panels.</p>
<div class="callout success"><strong>Pro tip:</strong> Load capacity depends on the whole system — panel + pedestal + stringer all matter. A 1250 kg concentrated-load panel on an undersized pedestal will still fail.</div>
`},
      { id: 'uti-1-l4', title: 'Key Terms — Flashcards', type: 'flashcards', body: '', cards: [
        { front: 'RAF', back: 'Raised Access Floor — a secondary floor above the slab that creates an accessible service plenum.' },
        { front: 'Pedestal', back: 'The vertical support column that holds up the RAF panels; usually height-adjustable.' },
        { front: 'Stringer', back: 'A horizontal beam connecting pedestals in a grid for lateral stability.' },
        { front: 'Plenum', back: 'The void under the raised floor used for airflow, power and data cables.' },
        { front: 'Concentrated Load', back: 'The maximum weight a panel can support on a small area (25×25 mm) without permanent deformation.' },
        { front: 'Cold Aisle', back: 'The side of a server rack where cold air is supplied — RAF grilles are typically placed here.' },
        { front: 'FFH', back: 'Finished Floor Height — the distance from slab to top of panel surface.' },
        { front: 'MAC', back: 'Move, Add, Change — an operational reconfiguration event that RAF makes trivial.' }
      ]},
      { id: 'uti-1-quiz', title: 'Chapter 1 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'What is the PRIMARY purpose of a Raised Access Floor?', type: 'mcq',
        options: ['Decorative aesthetic', 'Create an accessible service plenum below the floor', 'Reduce building height', 'Thermal insulation only'],
        correct: 1, explain: 'An RAF creates a plenum that houses cabling, HVAC and services which can be accessed without civil work.' },
      { q: 'Which of these is NOT a core component of an RAF system?', type: 'mcq',
        options: ['Pedestal', 'Stringer', 'Panel', 'Suspended cornice'],
        correct: 3, explain: 'Cornices belong to ceilings/architecture — they are not part of the RAF grid.' },
      { q: 'Which application benefits MOST from RAF?', type: 'mcq',
        options: ['Residential living room', 'Large warehouse', 'Enterprise data center', 'Outdoor terrace'],
        correct: 2, explain: 'Data centers rely on under-floor cooling & cable management, the classic RAF use case.' },
      { q: 'Typical panel size in an RAF is:', type: 'mcq',
        options: ['300 × 300 mm', '450 × 450 mm', '600 × 600 mm', '900 × 900 mm'],
        correct: 2, explain: '600×600 mm is the global industry standard grid.' },
      { q: 'MAC stands for:', type: 'mcq',
        options: ['Modular Air Cooling', 'Move/Add/Change', 'Multi-Access Cable', 'Managed Access Control'],
        correct: 1, explain: 'MAC = Move/Add/Change — the frequent reconfiguration events that justify RAF.' },
      { q: 'Stringers are MOST important when…', type: 'mcq',
        options: ['Finished floor is below 100 mm', 'Finished floor is above 300 mm', 'Only in clean-rooms', 'Never — they are optional'],
        correct: 1, explain: 'As height increases, lateral stability becomes critical — stringers provide it.' },
      { q: 'True or False: RAF is only useful for data centers.', type: 'tf', correct: 1,
        explain: 'False. RAF is used in corporate offices, control rooms, studios, labs, auditoriums and more.' },
      { q: 'The typical life-cycle cost of RAF as % of total facility cost is about:', type: 'mcq',
        options: ['20–30%', '10–15%', '2–5%', '40–50%'],
        correct: 2, explain: 'RAF is typically 2–5% of CapEx but drives disproportionate operational savings.' }
    ],
    passingScore: 70
  },

  {
    id: 'uti-2', division: 'unitile', order: 2,
    title: 'Chapter 2 — Business Segments',
    summary: 'Who buys RAF and why — segment-specific requirements and talking points.',
    thumbnail: '🏢',
    trainerId: 't3',
    accessRoles: ['all'],
    estimatedMinutes: 25,
    lessons: [
      { id: 'uti-2-l1', title: 'Segment Landscape', type: 'reading', body: `
<h3>Primary segments for Unitile RAF</h3>
<table>
<tr><th>Segment</th><th>Why RAF?</th><th>Key panel type</th></tr>
<tr><td><strong>Data Centers & Server Rooms</strong></td><td>Heavy concentrated loads, under-floor cooling, dense cabling</td><td>Calcium Sulphate / Steel Cementitious</td></tr>
<tr><td><strong>Corporate Offices</strong></td><td>Cable management, flexibility, aesthetics</td><td>Woodcore / Low-Flange with HPL or carpet</td></tr>
<tr><td><strong>Control Rooms / Command Centers</strong></td><td>ESD protection, cable access under consoles</td><td>Anti-static calcium sulphate</td></tr>
<tr><td><strong>Clean Rooms / Labs</strong></td><td>Airflow, cleanability, chemical resistance</td><td>Steel panels with HPL / vinyl, grilles</td></tr>
<tr><td><strong>Broadcast Studios / Auditoriums</strong></td><td>Silent panels, cable access to AV equipment</td><td>Heavy woodcore or calcium sulphate</td></tr>
<tr><td><strong>Trading Floors / Financial</strong></td><td>Flexibility for constant layout changes</td><td>Woodcore / steel</td></tr>
<tr><td><strong>Airports / Transit</strong></td><td>Heavy foot traffic, cable runs, upgradability</td><td>High concentrated-load calcium sulphate</td></tr>
</table>
<h3>India market drivers</h3>
<ul>
<li>Massive <strong>data-center build-out</strong> (Mumbai, Chennai, Hyderabad, Bengaluru hubs).</li>
<li>Post-pandemic <strong>office redesigns</strong> with hybrid zones.</li>
<li><strong>Smart city</strong> control rooms for state governments.</li>
<li>Growth of <strong>BFSI trading floors</strong>.</li>
</ul>
`},
      { id: 'uti-2-l2', title: 'Talking to each buyer', type: 'reading', body: `
<h3>Buyer persona cheat-sheet</h3>
<table>
<tr><th>Buyer</th><th>Cares about</th><th>What to emphasize</th></tr>
<tr><td>Data center MEP consultant</td><td>Cooling, load, airflow m³/hr</td><td>Load ratings, grille CFM, cut-out strength</td></tr>
<tr><td>Corporate facility manager</td><td>Total cost, MAC cost, aesthetics</td><td>Flexibility savings, finish options, warranty</td></tr>
<tr><td>IT head</td><td>Uptime, cable density, future-proofing</td><td>Cable capacity, ESD, clean plenum</td></tr>
<tr><td>Architect / Interior designer</td><td>Aesthetics, finish quality, flatness</td><td>Finish range, color match, edge detailing</td></tr>
<tr><td>Contractor</td><td>Ease of install, schedule, site logistics</td><td>Install speed, SOP support, after-sales</td></tr>
</table>
<div class="callout"><strong>Remember:</strong> The same RAF project often has 4–5 stakeholders with different priorities. Tailor your pitch to each.</div>
`},
      { id: 'uti-2-match', title: 'Match Segment to Requirement', type: 'match' },
      { id: 'uti-2-quiz', title: 'Chapter 2 Quiz', type: 'quiz' }
    ],
    matchData: {
      instruction: 'Drag each segment to its primary driver',
      pairs: [
        { a: 'Data Center', b: 'Under-floor cooling & heavy loads' },
        { a: 'Corporate Office', b: 'Cable flexibility & aesthetics' },
        { a: 'Clean Room', b: 'Airflow control & cleanability' },
        { a: 'Broadcast Studio', b: 'AV cable routing & silent panels' },
        { a: 'Trading Floor', b: 'Constant desk reconfiguration' }
      ]
    },
    quiz: [
      { q: 'Which segment typically demands the HIGHEST concentrated load rating?', type: 'mcq',
        options: ['Open-plan office', 'Data center', 'Reception lobby', 'Board room'],
        correct: 1, explain: 'Data-center racks routinely exceed 1500 kg per rack, driving high concentrated-load requirements.' },
      { q: 'Which panel finish is most commonly used in corporate offices?', type: 'mcq',
        options: ['Bare steel', 'Anti-static vinyl only', 'HPL or carpet', 'Polished stone'],
        correct: 2, explain: 'HPL and carpet dominate office finishes for aesthetics and acoustics.' },
      { q: 'True or False: Control-room RAF should prioritize ESD-safe finishes.', type: 'tf', correct: 0,
        explain: 'True — sensitive electronics demand ESD control.' },
      { q: 'A BFSI trading-floor buyer will most value:', type: 'mcq',
        options: ['Low initial cost', 'Rapid reconfiguration capability', 'Lightweight panels', 'Vinyl-only finish'],
        correct: 1, explain: 'Trading floors change layouts constantly — flexibility is king.' },
      { q: 'The fastest-growing segment for RAF in India currently is:', type: 'mcq',
        options: ['Residential', 'Retail malls', 'Data centers', 'Hospitals'],
        correct: 2, explain: 'India\'s DC capacity has grown 3×+ in recent years, fueling RAF demand.' }
    ],
    passingScore: 70
  },

  {
    id: 'uti-3', division: 'unitile', order: 3,
    title: 'Chapter 3 — Product Range',
    summary: 'Deep dive into Unitile RAF panels, UFlex Ceiling systems, and every accessory.',
    thumbnail: '📦',
    trainerId: 't2',
    accessRoles: ['all'],
    estimatedMinutes: 60,
    lessons: [
      { id: 'uti-3-l1', title: 'RAF Panel Types', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">Concentrated load capacity by panel type (kg)</text>
  <g font-size="10" fill="#64748b">
    <line x1="140" y1="60" x2="140" y2="280" stroke="#cbd5e1"/>
    <line x1="140" y1="280" x2="700" y2="280" stroke="#cbd5e1"/>
    <text x="100" y="80">1500</text><line x1="135" y1="76" x2="700" y2="76" stroke="#f1f5f9"/>
    <text x="100" y="130">1100</text><line x1="135" y1="126" x2="700" y2="126" stroke="#f1f5f9"/>
    <text x="100" y="180">750</text><line x1="135" y1="176" x2="700" y2="176" stroke="#f1f5f9"/>
    <text x="100" y="230">450</text><line x1="135" y1="226" x2="700" y2="226" stroke="#f1f5f9"/>
  </g>
  <g>
    <rect x="160" y="60" width="60" height="220" fill="#1f3bf5" rx="4"/><text x="190" y="55" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">1500</text>
    <rect x="240" y="90" width="60" height="190" fill="#3357ff" rx="4"/><text x="270" y="85" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">1250</text>
    <rect x="320" y="130" width="60" height="150" fill="#5b82ff" rx="4"/><text x="350" y="125" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">850</text>
    <rect x="400" y="155" width="60" height="125" fill="#8eaeff" rx="4"/><text x="430" y="150" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">700</text>
    <rect x="480" y="175" width="60" height="105" fill="#bccfff" rx="4"/><text x="510" y="170" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">550</text>
    <rect x="560" y="200" width="60" height="80" fill="#dce7ff" rx="4"/><text x="590" y="195" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">400</text>
  </g>
  <g font-size="9" fill="#334155" text-anchor="middle">
    <text x="190" y="297">Calcium</text><text x="190" y="308">Sulphate</text>
    <text x="270" y="297">Steel</text><text x="270" y="308">Cementitious</text>
    <text x="350" y="297">Nex-Gen</text>
    <text x="430" y="297">Woodcore</text>
    <text x="510" y="297">Low-Flange</text>
    <text x="590" y="297">Unifold</text>
  </g>
</svg>
<figcaption>Typical concentrated-load class by panel family. Always verify the specific SKU spec before quoting.</figcaption>
</figure>

<h3>1. Calcium Sulphate Panels</h3>
<p>Unitile's flagship data-center panel. A composite of calcium sulphate (CaSO₄) reinforced with natural fiber, encased in galvanized steel top and bottom.</p>
<ul>
<li><strong>Strength:</strong> Very high concentrated loads (1100–1500+ kg).</li>
<li><strong>Fire:</strong> Non-combustible core, excellent fire rating.</li>
<li><strong>Acoustic:</strong> Dense core absorbs foot-fall sound.</li>
<li><strong>Use:</strong> Data centers, control rooms, server rooms.</li>
</ul>
<h3>2. Steel Cementitious (Nex-Gen) Panels</h3>
<p>Galvanized steel shell filled with cementitious mortar. Very rigid, cost-effective for heavy loads.</p>
<ul>
<li>High strength-to-cost ratio.</li>
<li>Good for raised floors up to 1000 mm height.</li>
<li>Ideal for larger-area data centers.</li>
</ul>
<h3>3. Woodcore Panels</h3>
<p>High-density particle-board core with galvanized steel bottom. Lighter, more economical, preferred for offices.</p>
<ul>
<li>Lower cost.</li>
<li>Easier to cut in field.</li>
<li>Used mostly in corporate offices with HPL or carpet finish.</li>
</ul>
<h3>4. Low-Flange-Width Panel System</h3>
<p>Designed for minimized visible gridlines — the flange width (visible edge) is reduced for a flush, clean look.</p>
<ul>
<li>Modern interior aesthetics.</li>
<li>Flush finish with stone or HPL.</li>
<li>Preferred by architects in premium offices.</li>
</ul>
<h3>5. Unifold Panels</h3>
<p>Folded sheet-metal construction with internal honeycomb/foam — lightweight yet strong.</p>
<ul>
<li>Lighter panel for quick installs.</li>
<li>Moderate loads, good for mid-height RAF.</li>
</ul>
<h3>6. Nex-Gen Concept Panels</h3>
<p>Next-generation modular flooring that integrates cable channels and quick-release mechanisms for ultra-fast MAC.</p>
`},
      { id: 'uti-3-l2', title: 'UFlex Ceiling System', type: 'reading', body: `
<h3>Three UFlex variants</h3>
<table>
<tr><th>Variant</th><th>Use</th><th>Key feature</th></tr>
<tr><td><strong>UFlex Prime</strong></td><td>Standard suspended ceiling for offices</td><td>Mineral-fiber / metal tiles with T-grid</td></tr>
<tr><td><strong>UFlex Extreme</strong></td><td>Heavy-duty / cleanroom / humid spaces</td><td>Aluminum panels, corrosion-resistant, fire-rated</td></tr>
<tr><td><strong>UFlex Structural</strong></td><td>Exposed-structure / mega-spans</td><td>Integrated structural grid for large bays and atriums</td></tr>
</table>
<h3>Why a ceiling range alongside RAF?</h3>
<ul>
<li>Data-center & office clients want a <strong>single vendor</strong> for floor + ceiling.</li>
<li>Ceiling plenum complements under-floor plenum for airflow & cable.</li>
<li>Same accessory ecosystem (grills, cable tray).</li>
</ul>
`},
      { id: 'uti-3-l3', title: 'Accessories — The Ecosystem', type: 'reading', body: `
<h3>Airflow & Sealing</h3>
<ul>
<li><strong>Airflow Grilles</strong> — perforated/damper panels that direct cold air to cold aisles; adjustable CFM.</li>
<li><strong>Air Plugs</strong> (standard & extended) — seal off unused grille/cable cut-outs to eliminate bypass airflow.</li>
<li><strong>U-FLEX Air Plugs</strong> — specialized for UFlex ceiling grilles.</li>
<li><strong>Grommets & Round Brush Grommets</strong> — seal cable cut-outs while allowing cable to pass, reducing air leakage.</li>
</ul>
<h3>Cable management</h3>
<ul>
<li><strong>Multilayer Cable Tray</strong> — multi-tier trays for segregating power, data, fiber.</li>
<li><strong>Multiplyair</strong> — combined cable tray + airflow path module.</li>
<li><strong>ElectroFlex</strong> — in-floor power/data service boxes for offices.</li>
<li><strong>Forza</strong> — specialized modular power box for dense data-center cabling.</li>
</ul>
<h3>Structural & access aids</h3>
<ul>
<li><strong>Bridge</strong> — reinforcement element over large cable cut-outs to restore panel strength.</li>
<li><strong>Ultra-Strong Panel</strong> — reinforced panel for ultra-heavy loads under racks.</li>
<li><strong>Vision Glass Panel</strong> — clear panel for showing under-floor cabling (lobby / showroom).</li>
<li><strong>Panel Lifter</strong> — suction-cup or mechanical lifter to remove panels safely.</li>
<li><strong>Rack Lift</strong> — trolley for moving heavy racks onto the floor without damaging panels.</li>
<li><strong>Ramp Shoe</strong> — transition piece at floor edges (ramp to finished RAF height).</li>
</ul>
<div class="callout success"><strong>Cross-sell tip:</strong> Every 100 panels sold should be bundled with ~4–6 grilles, ~10 grommets and 1 panel lifter. Accessories have higher margin than panels.</div>
`},
      { id: 'uti-3-match', title: 'Match Product to Application', type: 'match' },
      { id: 'uti-3-quiz', title: 'Chapter 3 Quiz', type: 'quiz' }
    ],
    matchData: {
      instruction: 'Match the product to its primary application',
      pairs: [
        { a: 'Calcium Sulphate Panel', b: 'Data center / heavy loads' },
        { a: 'Woodcore Panel', b: 'Corporate office' },
        { a: 'Low-Flange Panel', b: 'Premium flush-finish interior' },
        { a: 'Airflow Grille', b: 'Directing cold air to server racks' },
        { a: 'Air Plug', b: 'Sealing unused cutouts' },
        { a: 'Grommet', b: 'Passing cables through while sealing' },
        { a: 'Bridge', b: 'Reinforcing large cutouts' },
        { a: 'Panel Lifter', b: 'Safely removing a panel' }
      ]
    },
    quiz: [
      { q: 'Which panel is BEST for a 1500 kg concentrated load?', type: 'mcq',
        options: ['Woodcore', 'Calcium Sulphate', 'Unifold', 'Low-flange laminate'],
        correct: 1, explain: 'Calcium sulphate panels deliver the highest concentrated-load ratings.' },
      { q: 'The primary purpose of an Air Plug is to:', type: 'mcq',
        options: ['Increase cooling', 'Seal unused openings to stop bypass airflow', 'Add structural load', 'Reduce ESD'],
        correct: 1, explain: 'Air plugs prevent cooled air from escaping through unused cut-outs.' },
      { q: 'Which UFlex ceiling variant suits a humid cleanroom?', type: 'mcq',
        options: ['Prime', 'Extreme', 'Structural', 'None'],
        correct: 1, explain: 'UFlex Extreme uses corrosion-resistant aluminum ideal for humid/clean environments.' },
      { q: 'A Bridge is used to:', type: 'mcq',
        options: ['Walk between racks', 'Reinforce panels weakened by large cutouts', 'Level the slab', 'Support the pedestal'],
        correct: 1, explain: 'Bridges restore structural capacity around large cable cut-outs.' },
      { q: 'For ultra-premium office aesthetic with minimal grid lines, choose:', type: 'mcq',
        options: ['Woodcore standard panel', 'Low-Flange-Width Panel System', 'Unifold', 'Concrete-filled steel'],
        correct: 1, explain: 'Low-flange panels minimize visible gridlines for a flush look.' },
      { q: 'Round Brush Grommets primarily:', type: 'mcq',
        options: ['Block cables', 'Let cables pass while sealing airflow', 'Replace pedestals', 'Measure humidity'],
        correct: 1, explain: 'The bristle design lets cables pass yet blocks airflow.' },
      { q: 'A Rack Lift is used to:', type: 'mcq',
        options: ['Lift panels only', 'Move heavy server racks onto RAF safely', 'Elevate pedestals', 'Test fire resistance'],
        correct: 1, explain: 'Rack lifts distribute rack weight to avoid cracking panels during rollouts.' },
      { q: 'Forza is a specialized:', type: 'mcq',
        options: ['Airflow grille', 'Modular power box for dense cabling', 'Panel lifter', 'Ramp'],
        correct: 1, explain: 'Forza is a power/data module for high-density cabling.' },
      { q: 'A Vision Glass Panel is typically used in:', type: 'mcq',
        options: ['Server halls', 'Lobby / showroom / demo', 'Cleanrooms', 'Outdoor decks'],
        correct: 1, explain: 'Glass panels showcase the plenum, typically in lobbies and demos.' },
      { q: 'Which accessory directly improves cable segregation (power vs data)?', type: 'mcq',
        options: ['Multilayer Cable Tray', 'Air Plug', 'Ramp Shoe', 'Vision Glass Panel'],
        correct: 0, explain: 'Multilayer cable trays separate power, data and fiber into tiers.' },
      { q: 'True or False: UFlex Ceiling and Unitile RAF share a common accessory ecosystem.', type: 'tf', correct: 0,
        explain: 'True — shared grilles, cable trays and design language by design.' },
      { q: 'Unifold panels are primarily differentiated by being:', type: 'mcq',
        options: ['Heavier than steel', 'Lightweight folded-sheet construction', 'Fire-rated only', 'Glass-topped'],
        correct: 1, explain: 'Unifold uses folded sheet metal for a lighter yet strong panel.' }
    ],
    passingScore: 70
  },

  {
    id: 'uti-4', division: 'unitile', order: 4,
    title: 'Chapter 4 — RAF Testing Standards',
    summary: 'Load, fire, electrical and environmental standards every salesperson must know.',
    thumbnail: '🧪',
    trainerId: 't2',
    accessRoles: ['all'],
    estimatedMinutes: 30,
    lessons: [
      { id: 'uti-4-l1', title: 'Load Testing — The Numbers that Sell', type: 'reading', body: `
<h3>Four load types you must distinguish</h3>
<ul>
<li><strong>Concentrated load (CL):</strong> Max load on a 25×25 mm pad at panel center without permanent deformation > 1 mm. Stated in <em>kg</em> or <em>lbf</em>.</li>
<li><strong>Uniform distributed load (UDL):</strong> Load spread over the full panel (kg/m²).</li>
<li><strong>Impact load:</strong> Drop-test of a weighted mass from defined height.</li>
<li><strong>Rolling load:</strong> Simulates trolleys/carts, rated by the number of passes without damage.</li>
</ul>
<h3>Common standards</h3>
<table>
<tr><th>Standard</th><th>Scope</th></tr>
<tr><td><strong>PSA MOB PF2 PS/SPU</strong></td><td>UK Property Services Agency — load grading: Light, Medium, Heavy, Extra Heavy.</td></tr>
<tr><td><strong>CISCA A/F (USA)</strong></td><td>Defines panel performance categories.</td></tr>
<tr><td><strong>EN 12825</strong></td><td>European standard for raised access floors — classes 1 to 6.</td></tr>
<tr><td><strong>ASTM E580</strong></td><td>Seismic restraint of raised floors.</td></tr>
</table>
<h3>Safety factor</h3>
<p>RAF ratings are stated at <strong>ultimate load</strong> or at a <strong>factor of 2× working load</strong> depending on spec. Always confirm before quoting.</p>
`},
      { id: 'uti-4-l2', title: 'Fire, ESD & Environmental Standards', type: 'reading', body: `
<h3>Fire</h3>
<ul>
<li><strong>BS 476 Part 4/6/7</strong> — UK: non-combustibility, fire propagation, surface spread of flame.</li>
<li><strong>ASTM E84</strong> — US: Flame spread index + smoke developed index.</li>
<li><strong>IS 12777</strong> — Indian raised access floor standard covering load and fire.</li>
</ul>
<h3>ESD & Anti-static</h3>
<ul>
<li><strong>ANSI/ESD S20.20</strong> — ESD control for electronic environments.</li>
<li>Surface resistance target: 1×10⁶ to 1×10⁹ Ω for static-dissipative finishes.</li>
<li>Critical for server rooms, control rooms, semiconductor labs.</li>
</ul>
<h3>Acoustic & environmental</h3>
<ul>
<li><strong>ISO 140</strong> — impact & airborne sound insulation.</li>
<li><strong>GreenPro / LEED / IGBC</strong> — recycled-content and low-emission certifications for sustainable projects.</li>
</ul>
`},
      { id: 'uti-4-quiz', title: 'Chapter 4 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'Concentrated load is measured on a pad of:', type: 'mcq',
        options: ['10 × 10 mm', '25 × 25 mm', '50 × 50 mm', '100 × 100 mm'],
        correct: 1, explain: '25×25 mm is the global standard footprint for concentrated-load testing.' },
      { q: 'EN 12825 is a standard for:', type: 'mcq',
        options: ['Electrical installations', 'Raised access floors (EU)', 'HVAC ducts', 'Fire detectors'],
        correct: 1, explain: 'EN 12825 defines classes 1–6 for raised access floors in Europe.' },
      { q: 'For ESD-safe finishes, target surface resistance is between:', type: 'mcq',
        options: ['10² and 10⁴ Ω', '10⁶ and 10⁹ Ω', '10¹² and 10¹⁴ Ω', 'Below 10¹ Ω'],
        correct: 1, explain: '10⁶–10⁹ Ω keeps charges dissipating safely without sparking.' },
      { q: 'BS 476 Part 7 specifically tests:', type: 'mcq',
        options: ['Surface spread of flame', 'Sound absorption', 'Load deflection', 'Thermal conductivity'],
        correct: 0, explain: 'BS 476 Part 7 classifies surface spread of flame.' },
      { q: 'Which load type simulates a drop-impact?', type: 'mcq',
        options: ['UDL', 'Concentrated', 'Impact', 'Rolling'],
        correct: 2, explain: 'Impact testing drops a weighted mass onto the panel.' },
      { q: 'True or False: Rolling load matters for warehouse / airport floors.', type: 'tf', correct: 0,
        explain: 'True — trolley traffic is common and must not damage panels.' },
      { q: 'IS 12777 is which country\'s standard?', type: 'mcq',
        options: ['USA', 'UK', 'India', 'Germany'],
        correct: 2, explain: 'IS = Indian Standard; IS 12777 covers RAF in India.' },
      { q: 'Which certification signals recycled-content for a sustainable project bid?', type: 'mcq',
        options: ['ASTM E84', 'ISO 140', 'GreenPro / IGBC / LEED', 'PSA MOB PF2'],
        correct: 2, explain: 'GreenPro / IGBC / LEED certifications highlight sustainability credentials.' }
    ],
    passingScore: 70
  },

  {
    id: 'uti-5', division: 'unitile', order: 5,
    title: 'Chapter 5 — Installation',
    summary: 'Pre-installation planning, execution for open offices and data centers, and the installation manual.',
    thumbnail: '🔧',
    trainerId: 't4',
    accessRoles: ['all'],
    estimatedMinutes: 45,
    lessons: [
      { id: 'uti-5-l1', title: 'GIP — Open Offices (Good Installation Practice)', type: 'reading', body: `
<h3>Step-by-step: Open office RAF install</h3>
<ol class="list-decimal pl-6 text-slate-700">
<li><strong>Site survey:</strong> Measure slab flatness (&lt; 5 mm / 3 m), verify slab strength, mark perimeter, identify service entry points.</li>
<li><strong>Grid marking:</strong> Lay out the 600 × 600 grid from a chosen start point (usually center or longest straight wall).</li>
<li><strong>Pedestal placement:</strong> Bond pedestals to slab with structural adhesive; check verticality.</li>
<li><strong>Level calibration:</strong> Adjust each pedestal head to FFH using laser level; lock-nut each pedestal.</li>
<li><strong>Stringer install</strong> (if floor &gt; 300 mm or spec'd): bolt stringers between pedestal heads.</li>
<li><strong>Services:</strong> Route cables, HVAC ducts and any water lines in the plenum.</li>
<li><strong>Panel laying:</strong> Lay panels starting from a corner; maintain gap-free joints. Cut panels for perimeter.</li>
<li><strong>Cut-outs:</strong> Install grommets at every cable cut-out, air plugs where required.</li>
<li><strong>Finish & clean-up:</strong> Apply edge trim, vacuum plenum, commission.</li>
</ol>
<div class="callout warning"><strong>Critical rule:</strong> Never walk on pedestals before panels are laid. Load the floor progressively.</div>
`},
      { id: 'uti-5-l2', title: 'GIP — Data Center & Critical Rooms', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cold" x1="0" x2="1"><stop offset="0" stop-color="#bfdbfe"/><stop offset="1" stop-color="#3b82f6"/></linearGradient>
    <linearGradient id="hot" x1="0" x2="1"><stop offset="0" stop-color="#fed7aa"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
  </defs>
  <rect x="20" y="220" width="680" height="35" fill="#cbd5e1" stroke="#94a3b8"/>
  <text x="360" y="275" text-anchor="middle" font-size="11" fill="#334155" font-weight="600">Under-floor plenum — supplies cold air</text>
  <g>
    <rect x="120" y="80" width="60" height="140" fill="#1e293b" stroke="#0f172a"/><text x="150" y="155" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">RACK</text>
    <rect x="280" y="80" width="60" height="140" fill="#1e293b" stroke="#0f172a"/><text x="310" y="155" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">RACK</text>
    <rect x="440" y="80" width="60" height="140" fill="#1e293b" stroke="#0f172a"/><text x="470" y="155" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">RACK</text>
    <rect x="600" y="80" width="60" height="140" fill="#1e293b" stroke="#0f172a"/><text x="630" y="155" text-anchor="middle" fill="#fff" font-size="10" font-weight="700">RACK</text>
  </g>
  <g>
    <rect x="200" y="215" width="40" height="10" fill="url(#cold)" stroke="#1d4ed8"/>
    <rect x="360" y="215" width="40" height="10" fill="url(#cold)" stroke="#1d4ed8"/>
    <rect x="520" y="215" width="40" height="10" fill="url(#cold)" stroke="#1d4ed8"/>
  </g>
  <g stroke="#2563eb" stroke-width="2" fill="none">
    <path d="M220 215 Q 220 150 180 120"/>
    <path d="M220 215 Q 220 150 260 120"/>
    <path d="M380 215 Q 380 150 340 120"/>
    <path d="M380 215 Q 380 150 420 120"/>
    <path d="M540 215 Q 540 150 500 120"/>
    <path d="M540 215 Q 540 150 580 120"/>
  </g>
  <text x="220" y="190" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="700">COLD</text>
  <text x="380" y="190" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="700">COLD</text>
  <text x="540" y="190" text-anchor="middle" fill="#1d4ed8" font-size="10" font-weight="700">COLD</text>
  <g stroke="#ea580c" stroke-width="2" fill="none" opacity="0.8">
    <path d="M150 80 Q 140 50 130 30"/><polygon points="125,35 130,24 135,35" fill="#ea580c"/>
    <path d="M310 80 Q 300 50 290 30"/><polygon points="285,35 290,24 295,35" fill="#ea580c"/>
    <path d="M470 80 Q 460 50 450 30"/><polygon points="445,35 450,24 455,35" fill="#ea580c"/>
  </g>
  <text x="100" y="42" fill="#c2410c" font-size="10" font-weight="700">HOT air rises → return to CRAC</text>
  <g font-size="10" fill="#0f172a" font-weight="600">
    <text x="150" y="250" text-anchor="middle">Hot aisle</text>
    <text x="220" y="250" text-anchor="middle" fill="#1d4ed8">Cold aisle</text>
    <text x="310" y="250" text-anchor="middle">Hot aisle</text>
    <text x="380" y="250" text-anchor="middle" fill="#1d4ed8">Cold aisle</text>
    <text x="470" y="250" text-anchor="middle">Hot aisle</text>
    <text x="540" y="250" text-anchor="middle" fill="#1d4ed8">Cold aisle</text>
    <text x="630" y="250" text-anchor="middle">Hot aisle</text>
  </g>
  <rect x="40" y="215" width="18" height="10" fill="#1e293b"/>
  <text x="67" y="223" font-size="9" fill="#334155">= sealed (air plug)</text>
</svg>
<figcaption>Cold-aisle / hot-aisle cooling. Perforated grilles feed cold plenum air to the front of racks; unused cutouts are sealed with air plugs to prevent bypass.</figcaption>
</figure>

<h3>Differences from office installs</h3>
<ul>
<li><strong>Stricter load specs:</strong> Use calcium-sulphate panels; validate concentrated & rolling loads against rack weights.</li>
<li><strong>Stringer grid mandatory</strong> above 300 mm height.</li>
<li><strong>Airflow planning:</strong> Pre-mark cold-aisle grille locations; ensure grilles align exactly under rack cold-air intakes.</li>
<li><strong>Sealing:</strong> Every cable cut-out must have a grommet; every unused grille must have an air plug. Aim for &lt; 5% bypass airflow.</li>
<li><strong>ESD:</strong> Ground the pedestal grid; verify surface resistance post-install.</li>
<li><strong>Seismic bracing</strong> (as per ASTM E580 where applicable).</li>
<li><strong>Cleanliness:</strong> All panels vacuumed top & bottom before go-live; particle count validated in cleanrooms.</li>
</ul>
<h3>Rack rollout checklist</h3>
<ul>
<li>Verify panel concentrated-load ≥ rack foot-load + 25% margin.</li>
<li>Use a rack lift on rated panels only.</li>
<li>Never roll a rack over a cut-out without a bridge.</li>
</ul>
`},
      { id: 'uti-5-l3', title: 'Installation Manual Essentials', type: 'reading', body: `
<h3>Tolerances</h3>
<table>
<tr><th>Parameter</th><th>Tolerance</th></tr>
<tr><td>Panel-to-panel level</td><td>± 0.5 mm</td></tr>
<tr><td>Floor flatness</td><td>± 1.5 mm / 3 m</td></tr>
<tr><td>Gap between panels</td><td>&lt; 0.5 mm</td></tr>
<tr><td>Panel cut-out edge</td><td>Sealed + edged</td></tr>
</table>
<h3>Common mistakes</h3>
<ul>
<li>Skipping pedestal adhesive or using wrong grade.</li>
<li>Ignoring slab flatness — leads to rocking panels.</li>
<li>Using woodcore panels in DCs (wrong load class).</li>
<li>Forgetting grommets — kills cooling efficiency.</li>
</ul>
`},
      { id: 'uti-5-hotspot', title: 'Identify parts on this RAF cross-section', type: 'hotspot' },
      { id: 'uti-5-quiz', title: 'Chapter 5 Quiz', type: 'quiz' }
    ],
    hotspotData: {
      instruction: 'Click each numbered marker and identify the RAF component',
      img: '🔲',
      spots: [
        { id: 1, x: 20, y: 30, label: 'Panel', choices: ['Panel', 'Stringer', 'Pedestal', 'Slab'], correct: 0 },
        { id: 2, x: 45, y: 70, label: 'Pedestal', choices: ['Panel', 'Stringer', 'Pedestal', 'Slab'], correct: 2 },
        { id: 3, x: 70, y: 50, label: 'Stringer', choices: ['Panel', 'Stringer', 'Pedestal', 'Slab'], correct: 1 },
        { id: 4, x: 50, y: 90, label: 'Concrete Slab', choices: ['Panel', 'Stringer', 'Pedestal', 'Slab'], correct: 3 }
      ]
    },
    quiz: [
      { q: 'Grid layout usually starts from:', type: 'mcq',
        options: ['Nearest corner', 'Center or longest straight wall', 'Closest door', 'Random'],
        correct: 1, explain: 'Starting from the longest straight wall or center minimizes awkward perimeter cuts.' },
      { q: 'Floor flatness tolerance is typically:', type: 'mcq',
        options: ['± 10 mm / m', '± 1.5 mm / 3 m', '± 20 mm / 3 m', 'Not defined'],
        correct: 1, explain: '±1.5 mm over 3 m is a common spec for quality installs.' },
      { q: 'True or False: In DCs, stringers are optional above 300 mm height.', type: 'tf', correct: 1,
        explain: 'False — stringers are mandatory for stability at that height.' },
      { q: 'Every cable cut-out in a DC RAF should have:', type: 'mcq',
        options: ['A woodcore block', 'A grommet (or equivalent seal)', 'Tape only', 'Nothing'],
        correct: 1, explain: 'Grommets pass cables while sealing airflow; critical for cooling efficiency.' },
      { q: 'Which panel type is INAPPROPRIATE for a data center?', type: 'mcq',
        options: ['Calcium sulphate', 'Steel cementitious', 'Woodcore', 'Nex-Gen concept'],
        correct: 2, explain: 'Woodcore typically lacks the concentrated-load rating needed for racks.' },
      { q: 'Pedestals are bonded to slab using:', type: 'mcq',
        options: ['Regular glue', 'Structural adhesive (specified grade)', 'Rubber cement', 'Gaffer tape'],
        correct: 1, explain: 'Specified structural adhesive ensures long-term bond strength.' },
      { q: 'A rack should never be rolled over an unsupported cut-out because:', type: 'mcq',
        options: ['It voids the warranty', 'The panel may crack/fail', 'The rack dents', 'It looks bad'],
        correct: 1, explain: 'Cut-outs reduce panel strength; rolling loads can crack them without a Bridge.' },
      { q: 'Surface resistance for ESD-safe DC floor should be verified:', type: 'mcq',
        options: ['Only on paper', 'Post-install on site', 'Never', 'Only by client'],
        correct: 1, explain: 'On-site surface-resistance verification confirms ESD compliance.' },
      { q: 'Panel-to-panel level tolerance is typically:', type: 'mcq',
        options: ['± 5 mm', '± 2 mm', '± 0.5 mm', '± 10 mm'],
        correct: 2, explain: '±0.5 mm keeps the floor feeling flat and prevents rocking.' },
      { q: 'Before go-live in a cleanroom, panels must be:', type: 'mcq',
        options: ['Painted', 'Vacuumed top and bottom, particle count verified', 'Waxed', 'Left alone'],
        correct: 1, explain: 'Cleanrooms demand particulate validation post-install.' }
    ],
    passingScore: 70
  },

  // ========== UNIVICOUSTIC COURSES ==========
  {
    id: 'uva-1', division: 'univicoustic', order: 1,
    title: 'Module 1 — Sound Science',
    summary: 'The physics of sound — waves, frequency, dB, absorption, and room acoustics.',
    thumbnail: '🔊',
    trainerId: 't1',
    accessRoles: ['all'],
    estimatedMinutes: 50,
    lessons: [
      { id: 'uva-1-l1', title: 'What is sound?', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="1.6" fill="#475569"/>
    </pattern>
    <pattern id="dense" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="3" cy="3" r="1.8" fill="#0f172a"/>
    </pattern>
    <pattern id="sparse" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="1.4" fill="#94a3b8"/>
    </pattern>
  </defs>
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">A longitudinal sound wave — air molecules shown as dots</text>
  <rect x="40" y="50" width="640" height="90" fill="url(#dots)" stroke="#cbd5e1"/>
  <rect x="100" y="50" width="60"  height="90" fill="url(#dense)" stroke="#cbd5e1"/>
  <rect x="240" y="50" width="60"  height="90" fill="url(#sparse)" stroke="#cbd5e1"/>
  <rect x="380" y="50" width="60"  height="90" fill="url(#dense)" stroke="#cbd5e1"/>
  <rect x="520" y="50" width="60"  height="90" fill="url(#sparse)" stroke="#cbd5e1"/>
  <g font-size="10" fill="#334155" font-weight="600">
    <text x="130" y="158" text-anchor="middle" fill="#0f172a">Compression</text>
    <text x="270" y="158" text-anchor="middle" fill="#64748b">Rarefaction</text>
    <text x="410" y="158" text-anchor="middle" fill="#0f172a">Compression</text>
    <text x="550" y="158" text-anchor="middle" fill="#64748b">Rarefaction</text>
  </g>
  <g stroke="#1f3bf5" stroke-width="1.5" fill="none">
    <line x1="130" y1="175" x2="410" y2="175" marker-end="url(#wa)" marker-start="url(#wa)"/>
  </g>
  <defs><marker id="wa" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="#1f3bf5"/></marker></defs>
  <text x="270" y="195" text-anchor="middle" font-size="11" fill="#1f3bf5" font-weight="700">Wavelength (λ)</text>
  <path d="M680 90 L 705 90" stroke="#059669" stroke-width="2" marker-end="url(#pa)"/>
  <defs><marker id="pa" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 8,4 0,8" fill="#059669"/></marker></defs>
  <text x="690" y="44" text-anchor="middle" fill="#059669" font-size="10" font-weight="700">Propagation</text>
</svg>
<figcaption>Sound is a mechanical longitudinal wave — regions of compressed and rarefied air molecules travelling through a medium. The distance between two compressions is the wavelength (λ).</figcaption>
</figure>

<h3>The definition</h3>
<p>Sound is a <strong>mechanical wave</strong> — a pressure disturbance traveling through a medium (air, water, solid). Unlike light, sound cannot travel through a vacuum.</p>
<h3>Wave anatomy</h3>
<ul>
<li><strong>Compressions:</strong> Regions of higher pressure where molecules are pushed together.</li>
<li><strong>Rarefactions:</strong> Regions of lower pressure where molecules spread apart.</li>
<li>Sound is therefore a <strong>longitudinal wave</strong>, not transverse like water ripples.</li>
</ul>
<h3>Key properties</h3>
<table>
<tr><th>Property</th><th>Meaning</th><th>Unit</th></tr>
<tr><td>Frequency (f)</td><td>Number of cycles per second — pitch</td><td>Hertz (Hz)</td></tr>
<tr><td>Wavelength (λ)</td><td>Distance between two compressions</td><td>m</td></tr>
<tr><td>Amplitude</td><td>Magnitude of pressure deviation — loudness</td><td>Pa (or dB)</td></tr>
<tr><td>Speed (c)</td><td>In air, ≈ 343 m/s at 20°C</td><td>m/s</td></tr>
</table>
<p>Formula: <strong>c = f × λ</strong>.</p>
<div class="callout"><strong>Useful fact:</strong> Human hearing spans roughly <strong>20 Hz – 20 kHz</strong>. Speech sits between 250 Hz and 4 kHz — that's the range acoustics design targets most.</div>
`},
      { id: 'uva-1-l2', title: 'Decibels & Loudness', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">The decibel ladder — a mental map of loudness</text>
  <line x1="360" y1="40" x2="360" y2="320" stroke="#cbd5e1" stroke-width="2"/>
  <g font-size="11">
    <circle cx="360" cy="310" r="6" fill="#10b981"/><text x="370" y="314" fill="#0f172a" font-weight="700">0 dB</text><text x="440" y="314" fill="#64748b">Threshold of hearing</text>
    <circle cx="360" cy="268" r="6" fill="#22c55e"/><text x="370" y="272" fill="#0f172a" font-weight="700">30 dB</text><text x="440" y="272" fill="#64748b">Quiet library</text>
    <circle cx="360" cy="226" r="6" fill="#84cc16"/><text x="370" y="230" fill="#0f172a" font-weight="700">45–55 dB</text><text x="440" y="230" fill="#64748b">Open-plan office target</text>
    <circle cx="360" cy="184" r="6" fill="#eab308"/><text x="370" y="188" fill="#0f172a" font-weight="700">60 dB</text><text x="440" y="188" fill="#64748b">Normal conversation</text>
    <circle cx="360" cy="142" r="6" fill="#f97316"/><text x="370" y="146" fill="#0f172a" font-weight="700">80 dB</text><text x="440" y="146" fill="#64748b">City traffic</text>
    <circle cx="360" cy="100" r="6" fill="#ef4444"/><text x="370" y="104" fill="#0f172a" font-weight="700">110 dB</text><text x="440" y="104" fill="#64748b">Rock concert</text>
    <circle cx="360" cy="58"  r="6" fill="#b91c1c"/><text x="370" y="62"  fill="#0f172a" font-weight="700">130 dB</text><text x="440" y="62"  fill="#64748b">Jet engine (30 m) — pain</text>
  </g>
  <g font-size="10" fill="#0f172a">
    <text x="60"  y="60" font-weight="700">+10 dB ≈ 2× loud</text>
    <text x="60"  y="85">+3 dB  = 2 equal sources</text>
    <text x="60"  y="110">20 Hz – 20 kHz audible</text>
    <text x="60"  y="135">Speech: 250 Hz – 4 kHz</text>
  </g>
  <rect x="50" y="44" width="170" height="100" fill="#eef4ff" stroke="#bccfff" rx="8" opacity="0.5"/>
</svg>
<figcaption>dB is logarithmic — each 10 dB step roughly doubles perceived loudness. Design for the 45–55 dB band in offices; above 85 dB sustained exposure risks hearing damage.</figcaption>
</figure>

<h3>Why decibels?</h3>
<p>The human ear perceives sound pressure logarithmically. The dB scale converts a huge range (10¹² in energy) into something usable.</p>
<h3>Decibel formula</h3>
<p>SPL (dB) = 20 × log₁₀ (p / p₀) where p₀ = 20 µPa (threshold of hearing).</p>
<h3>Reference table — common sounds</h3>
<table>
<tr><th>Sound</th><th>SPL (dB)</th></tr>
<tr><td>Threshold of hearing</td><td>0</td></tr>
<tr><td>Quiet library</td><td>30</td></tr>
<tr><td>Normal conversation</td><td>60</td></tr>
<tr><td>Open-plan office target</td><td>45–55</td></tr>
<tr><td>City traffic</td><td>80</td></tr>
<tr><td>Jet engine at 30 m</td><td>130</td></tr>
</table>
<h3>dB addition</h3>
<p>Two identical sources don't double the dB — they add only <strong>3 dB</strong>. Ten identical sources add 10 dB.</p>
<div class="callout warning"><strong>Rule of thumb:</strong> A 10 dB increase feels roughly "twice as loud" to humans.</div>
`},
      { id: 'uva-1-l3', title: 'Reflection, Absorption, Transmission', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">When a sound wave meets a panel</text>
  <defs>
    <pattern id="panelFill" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="8" height="8" fill="#dbeafe"/>
      <line x1="0" y1="0" x2="0" y2="8" stroke="#60a5fa" stroke-width="1"/>
    </pattern>
  </defs>
  <rect x="300" y="50" width="60" height="170" fill="url(#panelFill)" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="330" y="245" text-anchor="middle" font-size="10" fill="#1d4ed8" font-weight="700">Acoustic panel</text>
  <g stroke="#1f3bf5" stroke-width="2.2" fill="none">
    <path d="M40 80 Q 150 80 280 130" marker-end="url(#ia)"/>
  </g>
  <text x="60" y="72" font-size="11" font-weight="700" fill="#1f3bf5">Incident sound (100%)</text>
  <g stroke="#ea580c" stroke-width="2" fill="none">
    <path d="M295 130 Q 180 180 60 220" marker-end="url(#ra)"/>
  </g>
  <text x="60" y="200" font-size="11" font-weight="700" fill="#ea580c">Reflected (~20%)</text>
  <g stroke="#7c3aed" stroke-width="0" fill="#7c3aed" opacity="0.25">
    <circle cx="320" cy="90" r="8"/><circle cx="330" cy="115" r="7"/><circle cx="342" cy="140" r="9"/><circle cx="320" cy="170" r="6"/><circle cx="345" cy="195" r="7"/>
  </g>
  <g stroke="#7c3aed" stroke-width="1.5" fill="none">
    <path d="M315 95 L 335 85"/><path d="M325 125 L 345 118"/><path d="M340 150 L 320 168"/>
  </g>
  <text x="500" y="100" font-size="11" font-weight="700" fill="#7c3aed">Absorbed (~70%)</text>
  <text x="500" y="115" font-size="9" fill="#64748b">converted to heat by friction inside fibers</text>
  <g stroke="#059669" stroke-width="2" fill="none">
    <path d="M365 135 Q 480 135 680 135" marker-end="url(#ta)"/>
  </g>
  <text x="500" y="150" font-size="11" font-weight="700" fill="#059669">Transmitted (~10%)</text>
  <defs>
    <marker id="ia" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><polygon points="0,0 7,4 0,8" fill="#1f3bf5"/></marker>
    <marker id="ra" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><polygon points="0,0 7,4 0,8" fill="#ea580c"/></marker>
    <marker id="ta" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto"><polygon points="0,0 7,4 0,8" fill="#059669"/></marker>
  </defs>
  <text x="30" y="245" font-size="10" fill="#64748b" font-style="italic">Energy balance: E_incident = E_reflected + E_absorbed + E_transmitted</text>
</svg>
<figcaption>Three possible fates for incident sound energy. Porous acoustic panels are designed to maximize the absorbed share.</figcaption>
</figure>

<h3>When sound hits a surface</h3>
<p>Three things can happen to the incident energy:</p>
<ul>
<li><strong>Reflection:</strong> Bounces back into the room — hard surfaces like glass, concrete.</li>
<li><strong>Absorption:</strong> Converted to heat within the material — porous acoustic panels, PET wool.</li>
<li><strong>Transmission:</strong> Passes through to the next space — a function of mass and construction.</li>
</ul>
<p>Energy balance: <strong>E<sub>incident</sub> = E<sub>reflected</sub> + E<sub>absorbed</sub> + E<sub>transmitted</sub></strong></p>
<h3>Why porous materials absorb</h3>
<p>Sound waves entering the tiny air pockets of a fibrous / porous material cause air molecules to rub against fibers — friction converts the acoustic energy into a tiny amount of heat.</p>
<h3>Room-acoustics consequences</h3>
<ul>
<li>Too much reflection → long <strong>reverberation</strong>, muddy speech.</li>
<li>Adding absorption → shorter reverb, better intelligibility.</li>
<li>Too much absorption → "dead room", fatiguing for speakers.</li>
</ul>
`},
      { id: 'uva-1-l4', title: 'Reverberation & Room Acoustics', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">RT₆₀ — time for sound to decay by 60 dB</text>
  <g font-size="10" fill="#64748b">
    <line x1="70" y1="40" x2="70" y2="200" stroke="#cbd5e1"/>
    <line x1="70" y1="200" x2="700" y2="200" stroke="#cbd5e1"/>
    <text x="40" y="50">90</text><line x1="65" y1="46" x2="700" y2="46" stroke="#f1f5f9"/>
    <text x="40" y="100">70</text><line x1="65" y1="96" x2="700" y2="96" stroke="#f1f5f9"/>
    <text x="40" y="150">50</text><line x1="65" y1="146" x2="700" y2="146" stroke="#f1f5f9"/>
    <text x="40" y="200">30</text>
    <text x="30" y="130" transform="rotate(-90 30 130)">SPL (dB)</text>
    <text x="360" y="225" text-anchor="middle">Time (s)</text>
  </g>
  <path d="M90 46 L 120 48 L 160 58 L 220 85 L 300 130 L 400 175 L 500 190 L 600 197" stroke="#ea580c" stroke-width="2.5" fill="none"/>
  <path d="M90 46 L 120 48 L 180 70 L 280 115 L 400 170 L 600 197" stroke="#1f3bf5" stroke-width="2.5" fill="none" stroke-dasharray="6,3" opacity="0.7"/>
  <line x1="90" y1="46" x2="90" y2="200" stroke="#94a3b8" stroke-dasharray="3,3"/>
  <text x="95" y="40" font-size="10" fill="#334155" font-weight="700">source off</text>
  <line x1="400" y1="46" x2="400" y2="175" stroke="#ea580c" stroke-dasharray="3,3" opacity="0.5"/>
  <text x="410" y="170" font-size="10" fill="#ea580c" font-weight="700">RT₆₀ ≈ 2.0 s (live)</text>
  <line x1="280" y1="46" x2="280" y2="115" stroke="#1f3bf5" stroke-dasharray="3,3" opacity="0.5"/>
  <text x="290" y="110" font-size="10" fill="#1f3bf5" font-weight="700">RT₆₀ ≈ 0.7 s (treated)</text>
  <g font-size="9" fill="#64748b"><text x="495" y="165">untreated room</text><text x="445" y="140">well-treated room</text></g>
</svg>
<figcaption>A treated office decays from 90 → 30 dB in ~0.7 s; the same room untreated can take 2+ s — the difference you hear as "muddy" vs "clear" speech.</figcaption>
</figure>

<h3>Reverberation Time (RT₆₀)</h3>
<p>RT₆₀ = time for sound to decay by 60 dB after the source stops. A foundational metric for any room.</p>
<h3>Sabine's formula</h3>
<p><strong>RT₆₀ = 0.161 × V / A</strong> where V = room volume (m³), A = total absorption (m² Sabine).</p>
<h3>Target RT₆₀ by space</h3>
<table>
<tr><th>Space</th><th>Ideal RT₆₀ (s)</th></tr>
<tr><td>Recording studio</td><td>0.3–0.5</td></tr>
<tr><td>Classroom</td><td>0.4–0.6</td></tr>
<tr><td>Meeting / conference</td><td>0.5–0.7</td></tr>
<tr><td>Open office</td><td>0.6–0.8</td></tr>
<tr><td>Concert hall (symphonic)</td><td>1.8–2.2</td></tr>
</table>
<h3>Standing waves & modes</h3>
<p>In small rooms, specific frequencies can reinforce themselves between parallel walls, creating uneven bass response. Non-parallel surfaces or bass traps mitigate this.</p>
`},
      { id: 'uva-1-flash', title: 'Flashcards — Acoustic Terminology', type: 'flashcards', cards: [
        { front: 'Sound', back: 'A mechanical longitudinal wave traveling through a medium as alternating compressions and rarefactions.' },
        { front: 'Frequency (Hz)', back: 'Number of wave cycles per second; determines perceived pitch.' },
        { front: 'Wavelength (λ)', back: 'Physical distance between adjacent compressions; λ = c / f.' },
        { front: 'Decibel (dB)', back: 'Logarithmic unit of sound pressure level relative to 20 µPa.' },
        { front: 'Reverberation Time (RT₆₀)', back: 'Time for sound to decay by 60 dB after the source stops.' },
        { front: 'NRC', back: 'Noise Reduction Coefficient — average absorption at 250, 500, 1000, 2000 Hz, 0 to 1.' },
        { front: 'STC', back: 'Sound Transmission Class — single-number rating of airborne sound reduction between spaces.' },
        { front: 'Standing Wave', back: 'Resonant reflection between parallel surfaces producing frequency reinforcement.' },
        { front: 'Absorption Coefficient (α)', back: 'Fraction of sound energy absorbed by a surface at a given frequency (0 to 1).' },
        { front: 'Sabine Equation', back: 'RT₆₀ = 0.161 × V / A, predicting reverb time from volume and absorption.' }
      ]},
      { id: 'uva-1-quiz', title: 'Module 1 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'Sound is a …', type: 'mcq',
        options: ['Transverse wave', 'Longitudinal mechanical wave', 'Electromagnetic wave', 'Static phenomenon'],
        correct: 1, explain: 'Sound propagates as compressions/rarefactions — a longitudinal mechanical wave.' },
      { q: 'Human hearing range is typically:', type: 'mcq',
        options: ['2 Hz – 2 kHz', '20 Hz – 20 kHz', '200 Hz – 200 kHz', '20 kHz – 200 kHz'],
        correct: 1, explain: '20 Hz to 20 kHz is the standard human audible range.' },
      { q: 'A 10 dB increase in SPL is perceived as roughly:', type: 'mcq',
        options: ['Unchanged', 'Twice as loud', 'Ten times as loud', 'Half as loud'],
        correct: 1, explain: 'Psycho-acoustically, +10 dB ≈ doubling of perceived loudness.' },
      { q: 'Two identical noise sources combined produce how many dB more than one?', type: 'mcq',
        options: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'],
        correct: 0, explain: 'Two incoherent equal sources add ~3 dB.' },
      { q: 'Sabine\'s formula relates RT₆₀ to:', type: 'mcq',
        options: ['Humidity & temperature', 'Volume and absorption', 'Pitch & loudness', 'Floor material only'],
        correct: 1, explain: 'RT₆₀ = 0.161 V/A links reverberation to room volume and absorption.' },
      { q: 'A reflective material returns most incident sound. True or False?', type: 'tf', correct: 0,
        explain: 'True — reflective surfaces (glass, concrete) return most of the incident energy.' },
      { q: 'For a modern open office, ideal RT₆₀ is:', type: 'mcq',
        options: ['~0.1 s', '~0.6–0.8 s', '~1.8 s', '~3 s'],
        correct: 1, explain: 'Open offices aim for 0.6–0.8 s to keep speech intelligible.' },
      { q: 'Porous panels absorb sound because:', type: 'mcq',
        options: ['They reflect it back', 'Air friction inside fibers converts energy to heat', 'They block magnetism', 'They vibrate electrically'],
        correct: 1, explain: 'Friction between moving air molecules and the fibers dissipates acoustic energy as heat.' },
      { q: 'Speed of sound in air at 20 °C is approximately:', type: 'mcq',
        options: ['343 m/s', '1125 m/s', '3 × 10⁸ m/s', '34 m/s'],
        correct: 0, explain: '≈ 343 m/s in air at 20 °C.' },
      { q: 'Speech-critical frequency range targeted in acoustic design is roughly:', type: 'mcq',
        options: ['20–200 Hz', '250 Hz – 4 kHz', '5–20 kHz', '1–10 Hz'],
        correct: 1, explain: '250 Hz–4 kHz captures the core of human speech intelligibility.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-2', division: 'univicoustic', order: 2,
    title: 'Module 2 — Acoustic Material & Analysis',
    summary: 'Materials, their metrics (NRC, STC, αw), testing methods, and how to read a lab report.',
    thumbnail: '📊',
    trainerId: 't1',
    accessRoles: ['all'],
    estimatedMinutes: 50,
    lessons: [
      { id: 'uva-2-l1', title: 'Types of Acoustic Materials', type: 'reading', body: `
<h3>Four broad categories</h3>
<ul>
<li><strong>Porous absorbers:</strong> PET wool, recycled polyester fiber, glass wool, mineral wool — absorb mid-to-high frequencies very well.</li>
<li><strong>Resonant absorbers (panel/membrane):</strong> Thin panels over an air cavity resonate at specific frequencies — good for low frequency tuning.</li>
<li><strong>Helmholtz absorbers:</strong> Perforated panels or slots over a cavity — narrow-band absorption controllable by hole size and cavity depth.</li>
<li><strong>Hybrid systems:</strong> Combine porous + perforated + cavity — UniVicoustic's flagship wood-groove boards fall here.</li>
</ul>
<h3>UniVicoustic's material family</h3>
<ul>
<li><strong>Recycled Polyester Fiber (PET) Panels</strong> — 9, 12, 20, 25, 40 mm thick, densities 1600–3600 GSM.</li>
<li><strong>PET Wool</strong> — loose-lay behind panels or in cavities to deepen low-frequency absorption.</li>
<li><strong>Unizen HD PET</strong> — high-density, printable 9/12/25 mm.</li>
<li><strong>VMT Acoustic Wallpaper</strong> — thin, flexible, printable.</li>
<li><strong>UniVic Fluted Panel</strong> — 9 mm decorative vertical flute + PET backing.</li>
<li><strong>HD Groove / Woodscape</strong> — MDF with micro-perforation + PET wool backing.</li>
</ul>
`},
      { id: 'uva-2-l2', title: 'The Metrics that Matter', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Absorption coefficient α vs frequency (125 Hz – 4 kHz)</text>
  <g font-size="10" fill="#64748b">
    <line x1="70" y1="50" x2="70" y2="220" stroke="#cbd5e1"/>
    <line x1="70" y1="220" x2="700" y2="220" stroke="#cbd5e1"/>
    <text x="35" y="56">1.0</text><line x1="65" y1="52" x2="700" y2="52" stroke="#f1f5f9"/>
    <text x="35" y="94">0.75</text><line x1="65" y1="90" x2="700" y2="90" stroke="#f1f5f9"/>
    <text x="35" y="136">0.50</text><line x1="65" y1="132" x2="700" y2="132" stroke="#f1f5f9"/>
    <text x="35" y="178">0.25</text><line x1="65" y1="174" x2="700" y2="174" stroke="#f1f5f9"/>
    <text x="90" y="235">125</text><text x="195" y="235">250</text><text x="300" y="235">500</text><text x="400" y="235">1k</text><text x="505" y="235">2k</text><text x="605" y="235">4k</text><text x="675" y="235">Hz</text>
  </g>
  <path d="M95 200 L 200 170 L 305 110 L 405 70 L 505 58 L 605 62" stroke="#059669" stroke-width="2.5" fill="none"/>
  <g fill="#059669"><circle cx="95" cy="200" r="4"/><circle cx="200" cy="170" r="4"/><circle cx="305" cy="110" r="4"/><circle cx="405" cy="70" r="4"/><circle cx="505" cy="58" r="4"/><circle cx="605" cy="62" r="4"/></g>
  <path d="M95 180 L 200 140 L 305 85 L 405 60 L 505 55 L 605 60" stroke="#1f3bf5" stroke-width="2.5" fill="none" stroke-dasharray="5,3"/>
  <path d="M95 215 L 200 200 L 305 165 L 405 125 L 505 110 L 605 115" stroke="#ea580c" stroke-width="2.5" fill="none"/>
  <rect x="550" y="152" width="148" height="62" fill="#fff" stroke="#cbd5e1" rx="6"/>
  <line x1="560" y1="162" x2="590" y2="162" stroke="#ea580c" stroke-width="2.5"/><text x="598" y="166" font-size="10" fill="#0f172a">9 mm direct</text>
  <line x1="560" y1="182" x2="590" y2="182" stroke="#059669" stroke-width="2.5"/><text x="598" y="186" font-size="10" fill="#0f172a">25 mm + 25 mm gap</text>
  <line x1="560" y1="202" x2="590" y2="202" stroke="#1f3bf5" stroke-width="2.5" stroke-dasharray="5,3"/><text x="598" y="206" font-size="10" fill="#0f172a">25 mm + wool + gap</text>
</svg>
<figcaption>Typical α vs frequency curves for three panel assemblies. The NRC is the average of α at 250, 500, 1000 and 2000 Hz.</figcaption>
</figure>

<h3>Absorption metrics</h3>
<table>
<tr><th>Metric</th><th>Meaning</th><th>Typical good value</th></tr>
<tr><td><strong>α (alpha)</strong></td><td>Absorption coefficient at one frequency (0–1)</td><td>0.7–1.0 at mid freq</td></tr>
<tr><td><strong>NRC</strong></td><td>Average of α at 250, 500, 1000, 2000 Hz</td><td>0.70–1.00</td></tr>
<tr><td><strong>SAA</strong></td><td>Average α across 200–2500 Hz (newer than NRC)</td><td>~NRC</td></tr>
<tr><td><strong>αw</strong></td><td>Weighted absorption per ISO 11654, A–E class</td><td>Class A (αw ≥ 0.90)</td></tr>
</table>
<h3>Sound transmission metrics</h3>
<table>
<tr><th>Metric</th><th>Meaning</th><th>Typical</th></tr>
<tr><td><strong>STC</strong></td><td>Sound Transmission Class (US) — single number between spaces</td><td>45+ good for offices</td></tr>
<tr><td><strong>Rw</strong></td><td>Weighted sound reduction index (ISO 717)</td><td>~STC</td></tr>
<tr><td><strong>CAC</strong></td><td>Ceiling Attenuation Class — through suspended ceiling</td><td>35+ for privacy</td></tr>
</table>
<h3>Reading a UniVicoustic spec</h3>
<div class="callout"><strong>Example:</strong> "Unizen HD Panel 25 mm + 25 mm Air Gap with PET Wool — NRC 1.00" means the assembly absorbs essentially all incident mid-frequency sound when mounted with that air gap and backing.</div>
`},
      { id: 'uva-2-l3', title: 'Testing Methods', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 300" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Same panel, three mounting variants — NRC grows with cavity + infill</text>
  <defs>
    <pattern id="wall" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#e2e8f0"/><line x1="0" y1="0" x2="10" y2="10" stroke="#94a3b8" stroke-width="0.6"/></pattern>
    <pattern id="pet" width="6" height="6" patternUnits="userSpaceOnUse"><rect width="6" height="6" fill="#fef3c7"/><circle cx="3" cy="3" r="1" fill="#d97706"/></pattern>
    <pattern id="panelP" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#dbeafe"/><line x1="0" y1="0" x2="0" y2="8" stroke="#60a5fa" stroke-width="1"/></pattern>
  </defs>

  <g>
    <text x="120" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#1f3bf5">A. Direct mount</text>
    <rect x="50" y="60"  width="30"  height="180" fill="url(#wall)" stroke="#64748b"/>
    <rect x="80" y="60"  width="120" height="180" fill="url(#panelP)" stroke="#1d4ed8"/>
    <text x="60" y="150" font-size="9" fill="#475569" transform="rotate(-90 60 150)">Wall</text>
    <text x="140" y="155" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">Panel</text>
    <rect x="85" y="252" width="115" height="30" fill="#eef4ff" stroke="#bccfff"/>
    <text x="142" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="#1f3bf5">NRC ≈ 0.40</text>
  </g>

  <g>
    <text x="360" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#1f3bf5">B. Panel + 25 mm air gap</text>
    <rect x="280" y="60"  width="30"  height="180" fill="url(#wall)" stroke="#64748b"/>
    <rect x="310" y="60"  width="40"  height="180" fill="#fff" stroke="#cbd5e1" stroke-dasharray="4,3"/>
    <rect x="350" y="60"  width="90"  height="180" fill="url(#panelP)" stroke="#1d4ed8"/>
    <text x="330" y="140" text-anchor="middle" font-size="9" fill="#64748b" transform="rotate(-90 330 140)">Air gap</text>
    <text x="395" y="155" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">Panel</text>
    <rect x="315" y="252" width="120" height="30" fill="#dbeafe" stroke="#60a5fa"/>
    <text x="375" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">NRC ≈ 0.75</text>
  </g>

  <g>
    <text x="600" y="50" text-anchor="middle" font-size="12" font-weight="700" fill="#059669">C. + 25 mm air gap + PET wool infill</text>
    <rect x="500" y="60"  width="30"  height="180" fill="url(#wall)" stroke="#64748b"/>
    <rect x="530" y="60"  width="60"  height="180" fill="url(#pet)" stroke="#d97706"/>
    <rect x="590" y="60"  width="90"  height="180" fill="url(#panelP)" stroke="#1d4ed8"/>
    <text x="560" y="140" text-anchor="middle" font-size="9" fill="#92400e" transform="rotate(-90 560 140)">PET wool</text>
    <text x="635" y="155" text-anchor="middle" font-size="10" font-weight="700" fill="#0f172a">Panel</text>
    <rect x="535" y="252" width="130" height="30" fill="#d1fae5" stroke="#10b981"/>
    <text x="600" y="268" text-anchor="middle" font-size="11" font-weight="700" fill="#047857">NRC ≈ 1.00</text>
  </g>
</svg>
<figcaption>A single 25 mm PET acoustic panel performs very differently depending on mounting. Adding a cavity couples the panel to low-frequency resonance; PET wool infill dampens the cavity — pushing NRC toward 1.00.</figcaption>
</figure>

<h3>Reverberation-room method (ISO 354 / ASTM C423)</h3>
<ul>
<li>Large, highly reflective room with known RT₆₀.</li>
<li>Material is placed; RT₆₀ is measured again.</li>
<li>Absorption calculated from the difference.</li>
<li><strong>Best for real-world installed performance</strong> — reports NRC / αw.</li>
</ul>
<h3>Impedance tube (ISO 10534)</h3>
<ul>
<li>Small sample in a tube; uses two microphones to compute normal-incidence absorption.</li>
<li>Quick & cheap, but reports only normal-incidence α, not installed NRC.</li>
</ul>
<h3>Transmission loss (ISO 140 / ASTM E90)</h3>
<ul>
<li>Two isolated rooms sharing the test wall.</li>
<li>Measures dB difference vs frequency → STC/Rw.</li>
</ul>
<h3>What to check on a test report</h3>
<ul>
<li>Test standard cited — ISO 354 is the gold standard for absorption.</li>
<li>Mounting type — "Type A" (on rigid surface) vs "Type E400" (with 400 mm air gap).</li>
<li>Frequency table from 100 Hz to 5 kHz.</li>
<li>Sample size — minimum 10–12 m² for reverberation method.</li>
</ul>
`},
      { id: 'uva-2-hotspot', title: 'Read the sound-absorption chart', type: 'hotspot' },
      { id: 'uva-2-quiz', title: 'Module 2 Quiz', type: 'quiz' }
    ],
    hotspotData: {
      instruction: 'Click each marker on this sample α vs frequency chart and identify the feature',
      img: '📈',
      spots: [
        { id: 1, x: 15, y: 70, label: 'Low-freq absorption rises with thickness', choices: ['Low-freq absorption', 'Mid-freq peak', 'High-freq roll-off', 'Resonance dip'], correct: 0 },
        { id: 2, x: 45, y: 20, label: 'Mid-freq peak (500–1000 Hz)', choices: ['Low-freq absorption', 'Mid-freq peak', 'High-freq roll-off', 'Resonance dip'], correct: 1 },
        { id: 3, x: 80, y: 25, label: 'High-freq plateau', choices: ['Low-freq absorption', 'Mid-freq peak', 'High-freq plateau', 'Resonance dip'], correct: 2 }
      ]
    },
    quiz: [
      { q: 'NRC is the average α at which frequencies?', type: 'mcq',
        options: ['125, 250, 500, 1000 Hz', '250, 500, 1000, 2000 Hz', '500, 1000, 2000, 4000 Hz', '63, 125, 250, 500 Hz'],
        correct: 1, explain: 'NRC = average of α at 250, 500, 1000, 2000 Hz.' },
      { q: 'An absorption coefficient of 1.00 means:', type: 'mcq',
        options: ['100 % reflection', '100 % absorption (no reflection)', '50% absorption', 'No data'],
        correct: 1, explain: 'α = 1 indicates all incident energy is absorbed.' },
      { q: 'αw Class A requires αw ≥ ?', type: 'mcq',
        options: ['0.50', '0.70', '0.90', '1.00'],
        correct: 2, explain: 'ISO 11654 Class A corresponds to αw ≥ 0.90.' },
      { q: 'Which test method is gold-standard for installed NRC?', type: 'mcq',
        options: ['Impedance tube', 'Reverberation room (ISO 354)', 'Ultrasound', 'dB meter'],
        correct: 1, explain: 'ISO 354 reverberation-room measurement reflects random-incidence installed performance.' },
      { q: 'STC 45 between two offices indicates:', type: 'mcq',
        options: ['Conversations audible through wall', 'Good speech privacy', 'No sound insulation', 'Only bass stopped'],
        correct: 1, explain: 'STC 45+ is generally good for speech privacy between offices.' },
      { q: 'A resonant absorber is best at:', type: 'mcq',
        options: ['Broadband absorption', 'Narrow low-frequency absorption', 'Blocking transmission', 'Increasing reverberation'],
        correct: 1, explain: 'Panel/membrane resonant absorbers target specific low-frequency bands.' },
      { q: 'Adding a 25 mm air gap behind a panel usually:', type: 'mcq',
        options: ['Lowers absorption', 'Boosts low-frequency absorption', 'Has no effect', 'Improves STC only'],
        correct: 1, explain: 'Air gap behind a porous absorber enhances low-frequency α by coupling to the cavity.' },
      { q: 'PET wool in UniVicoustic assemblies is used to:', type: 'mcq',
        options: ['Add color only', 'Deepen low-frequency absorption in the cavity', 'Stop transmission entirely', 'Reflect sound'],
        correct: 1, explain: 'PET wool cavity fill boosts low-frequency absorption.' },
      { q: 'True or False: Impedance-tube α is directly equivalent to NRC.', type: 'tf', correct: 1,
        explain: 'False — impedance tube gives normal incidence only; NRC is random-incidence installed.' },
      { q: 'Unizen HD Panel 25 mm + 25 mm air gap typically achieves NRC around:', type: 'mcq',
        options: ['0.10', '0.40', '0.70', '≈ 1.00'],
        correct: 3, explain: 'Per UniVicoustic test data, this assembly reaches NRC ≈ 1.00.' },
      { q: 'CAC (Ceiling Attenuation Class) matters most for:', type: 'mcq',
        options: ['Outdoor stadiums', 'Speech privacy between offices sharing a plenum', 'Concert halls', 'Auditoriums'],
        correct: 1, explain: 'CAC measures sound leak between rooms through a common suspended ceiling plenum.' },
      { q: 'Typical PET panel thicknesses offered by UniVicoustic include:', type: 'mcq',
        options: ['9, 12, 20, 25, 40 mm', '1, 2, 3 mm only', '100, 200 mm only', '50, 75, 100 mm'],
        correct: 0, explain: 'Standard range is 9, 12, 20, 25, 40 mm.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-3', division: 'univicoustic', order: 3,
    title: 'Module 3 — Market Insights',
    summary: 'Indian acoustic market size, trends, buyer personas, competitive positioning.',
    thumbnail: '📈',
    trainerId: 't3',
    accessRoles: ['all'],
    estimatedMinutes: 25,
    lessons: [
      { id: 'uva-3-l1', title: 'The Indian Acoustic Opportunity', type: 'reading', body: `
<div class="stat-grid">
  <div class="stat-card"><span class="n">₹4,000 Cr</span><span class="l">Indian architectural acoustics, 2025e</span></div>
  <div class="stat-card"><span class="n">12-14%</span><span class="l">CAGR through 2030</span></div>
  <div class="stat-card"><span class="n">35%</span><span class="l">From corporate offices</span></div>
  <div class="stat-card"><span class="n">3×</span><span class="l">DC build-out vs 2019</span></div>
</div>
<figure>
<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Revenue share by segment (approx.)</text>
  <g transform="translate(200 150)">
    <circle cx="0" cy="0" r="100" fill="#fff" stroke="#e2e8f0"/>
    <path d="M0,-100 A100,100 0 0,1 95.1,-30.9 L0,0 Z" fill="#1f3bf5"/>
    <path d="M95.1,-30.9 A100,100 0 0,1 58.8,80.9 L0,0 Z" fill="#3357ff"/>
    <path d="M58.8,80.9 A100,100 0 0,1 -30.9,95.1 L0,0 Z" fill="#5b82ff"/>
    <path d="M-30.9,95.1 A100,100 0 0,1 -95.1,-30.9 L0,0 Z" fill="#8eaeff"/>
    <path d="M-95.1,-30.9 A100,100 0 0,1 0,-100 L0,0 Z" fill="#bccfff"/>
    <circle cx="0" cy="0" r="52" fill="#fff"/>
    <text x="0" y="-4" text-anchor="middle" font-size="14" font-weight="700" fill="#0f172a">₹4000 Cr</text>
    <text x="0" y="14" text-anchor="middle" font-size="9" fill="#64748b">Indian market</text>
  </g>
  <g font-size="11" fill="#0f172a">
    <rect x="400" y="60"  width="14" height="14" fill="#1f3bf5"/><text x="422" y="72">Corporate offices — 35%</text>
    <rect x="400" y="92"  width="14" height="14" fill="#3357ff"/><text x="422" y="104">Education / auditoria — 20%</text>
    <rect x="400" y="124" width="14" height="14" fill="#5b82ff"/><text x="422" y="136">Hospitality / retail — 15%</text>
    <rect x="400" y="156" width="14" height="14" fill="#8eaeff"/><text x="422" y="168">Healthcare — 10%</text>
    <rect x="400" y="188" width="14" height="14" fill="#bccfff"/><text x="422" y="200">Industrial / BPO — 10%</text>
    <rect x="400" y="220" width="14" height="14" fill="#dce7ff"/><text x="422" y="232">Residential / HNI — 10%</text>
  </g>
</svg>
<figcaption>Revenue share across major segments. Hospitality and education are the fastest-growing sub-segments.</figcaption>
</figure>

<h3>Market size & growth</h3>
<ul>
<li>Indian architectural acoustics market ≈ <strong>₹ 3,500–4,500 Cr</strong> (2025 est.) growing at <strong>~12–14% CAGR</strong>.</li>
<li>Core demand drivers: corporate offices, education, hospitality, auditoriums, places of worship.</li>
<li>Sustainability certifications (LEED, IGBC, GreenPro, WELL) are rapidly becoming purchase-qualifying.</li>
</ul>
<h3>Major segments (by revenue share)</h3>
<table>
<tr><th>Segment</th><th>Approx share</th><th>Product focus</th></tr>
<tr><td>Corporate Offices</td><td>35%</td><td>Wall panels, ceiling baffles, booths</td></tr>
<tr><td>Education / Auditoria</td><td>20%</td><td>Full-room treatment, stage acoustics</td></tr>
<tr><td>Hospitality & Retail</td><td>15%</td><td>Decorative + functional (Woodscape, Ombre)</td></tr>
<tr><td>Healthcare</td><td>10%</td><td>Antimicrobial / VMT wallpaper</td></tr>
<tr><td>Industrial / BPO halls</td><td>10%</td><td>High-NRC baffles</td></tr>
<tr><td>Residential / HNI</td><td>10%</td><td>Home theaters, studios</td></tr>
</table>
`},
      { id: 'uva-3-l2', title: 'Trends & Drivers', type: 'reading', body: `
<h3>Top 6 trends</h3>
<ol class="list-decimal pl-6 text-slate-700">
<li><strong>Hybrid-work interiors</strong> — phone booths, huddle pods, open-plan with absorption.</li>
<li><strong>Green certification</strong> — LEED/WELL specify minimum NRC and low VOC.</li>
<li><strong>Biophilic design</strong> — wood-finish acoustic panels (Woodscape).</li>
<li><strong>Print-on-panel</strong> — brand graphics on Unizen HD / VMT wallpaper.</li>
<li><strong>Recycled content</strong> — PET bottle fiber replaces glass wool.</li>
<li><strong>Fast-track design-build</strong> — dealers expected to stock and quote in days.</li>
</ol>
<h3>Competitive landscape</h3>
<table>
<tr><th>Player</th><th>Strength</th><th>Where UniVicoustic wins</th></tr>
<tr><td>International brands</td><td>Brand equity, specs</td><td>Local stock, lead times, price</td></tr>
<tr><td>Unbranded fabricators</td><td>Price</td><td>Certifications, test data, consistency</td></tr>
<tr><td>Other Indian acoustic brands</td><td>Similar pricing</td><td>Vertical integration with United Group, Woodscape design IP, digital catalog</td></tr>
</table>
`},
      { id: 'uva-3-l3', title: 'Buyer personas', type: 'reading', body: `
<h3>Personas you will meet</h3>
<ul>
<li><strong>Architect / ID designer:</strong> aesthetics, finishes, sample library, BIM files.</li>
<li><strong>Acoustic consultant:</strong> NRC, αw, αw class, test reports.</li>
<li><strong>PMC / General contractor:</strong> lead time, price, ease of install, SOP, on-site support.</li>
<li><strong>End-client facility / HR:</strong> speech privacy, branding via printed panels, maintenance.</li>
<li><strong>Green-building consultant:</strong> EPD, GreenPro, recycled content, declare label.</li>
</ul>
<div class="callout"><strong>Tip:</strong> Carry a <em>dealer kit</em> with (a) physical samples, (b) NRC test reports, (c) EPD / GreenPro, (d) finish chart, (e) case studies. One meeting = all five assets.</div>
`},
      { id: 'uva-3-quiz', title: 'Module 3 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'Largest segment by revenue for architectural acoustics in India is:', type: 'mcq',
        options: ['Residential', 'Corporate offices', 'Industrial', 'Retail'],
        correct: 1, explain: 'Corporate offices lead India\'s acoustic market, ~35%.' },
      { q: 'Which certification is MOST important for a green-building bid?', type: 'mcq',
        options: ['ISO 9001 only', 'GreenPro / LEED / EPD', 'BIS only', 'ASTM E84 only'],
        correct: 1, explain: 'GreenPro / LEED / EPD directly drive sustainability scoring.' },
      { q: 'UniVicoustic\'s Woodscape differentiator is:', type: 'mcq',
        options: ['Only functional', 'Biophilic / wood-finish with acoustic performance', 'Cheapest in market', 'Plastic-free'],
        correct: 1, explain: 'Woodscape combines biophilic aesthetics with real NRC performance.' },
      { q: 'A typical acoustic consultant cares MOST about:', type: 'mcq',
        options: ['Color options', 'NRC / αw / test reports', 'Packaging', 'Delivery truck type'],
        correct: 1, explain: 'Consultants specify performance numbers.' },
      { q: 'Recycled PET fiber in UniVicoustic replaces:', type: 'mcq',
        options: ['Concrete', 'Glass wool / other mineral fibers', 'Steel sheet', 'HPL'],
        correct: 1, explain: 'PET fiber is a recycled, safer alternative to traditional mineral wools.' },
      { q: 'True or False: Dealer network is a weak competitive moat.', type: 'tf', correct: 1,
        explain: 'False — fast local supply and install support are major moats in India.' },
      { q: 'Hybrid-work trend has driven demand MOST for:', type: 'mcq',
        options: ['Phone booths & huddle pods', 'Outdoor signage', 'Industrial chimneys', 'Road barriers'],
        correct: 0, explain: 'Booths and huddle pods are the fastest-growing micro-segment.' },
      { q: 'Top dealer kit must include:', type: 'mcq',
        options: ['Only price sheet', 'Samples, test reports, EPD, finish chart, case studies', 'Business card', 'Full factory tour'],
        correct: 1, explain: 'A complete kit accelerates decisions in one meeting.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-4', division: 'univicoustic', order: 4,
    title: 'Module 4 — Product Range',
    summary: 'Every UniVicoustic product family, when to use what, technical specs, and pitch angles.',
    thumbnail: '🎨',
    trainerId: 't1',
    accessRoles: ['all'],
    estimatedMinutes: 60,
    lessons: [
      { id: 'uva-4-l1', title: 'Core Acoustic Panels', type: 'reading', body: `
<div class="compare">
  <div class="item"><span class="ico">🟦</span><div class="t">PET 9–40 mm</div><div class="d">40+ colors · NRC 0.4 – 1.0 · everyday acoustic wall</div></div>
  <div class="item"><span class="ico">🖼️</span><div class="t">Unizen HD Printed</div><div class="d">Full-color print + acoustic · brand walls, signage</div></div>
  <div class="item"><span class="ico">🪵</span><div class="t">UniVic Fluted</div><div class="d">9 mm vertical groove MDF + PET · warm wood look</div></div>
  <div class="item"><span class="ico">📜</span><div class="t">VMT Wallpaper</div><div class="d">Flexible · for curves and columns</div></div>
  <div class="item"><span class="ico">🌿</span><div class="t">Woodscape</div><div class="d">Micro-perforated MDF veneer + PET wool · premium</div></div>
  <div class="item"><span class="ico">🎨</span><div class="t">Bespoke Graphics</div><div class="d">Custom murals on acoustic substrate</div></div>
  <div class="item"><span class="ico">🌈</span><div class="t">Ombre HD Groove</div><div class="d">Gradient grooved panels · statement walls</div></div>
  <div class="item"><span class="ico">🧵</span><div class="t">Fabric System</div><div class="d">Stretched fabric over PET · auditoriums</div></div>
  <div class="item"><span class="ico">〰️</span><div class="t">Uni-VicStrip</div><div class="d">Linear strip panels · quick install</div></div>
</div>
<figure>
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">NRC reachable per panel family (best-case assembly)</text>
  <g font-size="10" fill="#64748b">
    <line x1="180" y1="40" x2="180" y2="210" stroke="#cbd5e1"/>
    <line x1="180" y1="210" x2="700" y2="210" stroke="#cbd5e1"/>
    <text x="155" y="45" text-anchor="end">1.0</text>
    <text x="155" y="90" text-anchor="end">0.85</text>
    <text x="155" y="130" text-anchor="end">0.70</text>
    <text x="155" y="170" text-anchor="end">0.55</text>
    <text x="155" y="210" text-anchor="end">0.40</text>
  </g>
  <g>
    <rect x="195" y="42"  width="40" height="168" fill="#1f3bf5" rx="3"/>
    <rect x="245" y="48"  width="40" height="162" fill="#1f3bf5" rx="3"/>
    <rect x="295" y="95"  width="40" height="115" fill="#3357ff" rx="3"/>
    <rect x="345" y="90"  width="40" height="120" fill="#3357ff" rx="3"/>
    <rect x="395" y="78"  width="40" height="132" fill="#5b82ff" rx="3"/>
    <rect x="445" y="60"  width="40" height="150" fill="#5b82ff" rx="3"/>
    <rect x="495" y="115" width="40" height="95"  fill="#8eaeff" rx="3"/>
    <rect x="545" y="55"  width="40" height="155" fill="#8eaeff" rx="3"/>
    <rect x="595" y="108" width="40" height="102" fill="#bccfff" rx="3"/>
  </g>
  <g font-size="8.5" fill="#475569" text-anchor="middle">
    <text x="215" y="224">PET 40 mm</text>
    <text x="265" y="224">Unizen 25</text>
    <text x="315" y="224">Fluted</text>
    <text x="365" y="224">Woodscape</text>
    <text x="415" y="224">Bespoke</text>
    <text x="465" y="224">Fabric</text>
    <text x="515" y="224">Ombre</text>
    <text x="565" y="224">VicStrip</text>
    <text x="615" y="224">VMT wall</text>
  </g>
</svg>
<figcaption>Typical NRC reachable with each family in its best-case mounted assembly. Adding PET wool infill or air gap moves most products toward NRC 1.0.</figcaption>
</figure>

<h3>Recycled Colored Polyester Fiber (PET) Panels</h3>
<ul>
<li>Thicknesses: 9, 12, 20, 25, 40 mm.</li>
<li>Densities: 1700 GSM (9 mm) → 3600 GSM (25 mm with PET wool).</li>
<li>NRC range: 0.40 (9 mm direct-mount) → 1.00 (25 mm + 50 mm air gap + PET wool).</li>
<li>40+ colors, easy custom cut, anti-fungal, Class-A fire.</li>
<li><strong>Pitch:</strong> "Functional decor — comes in 40 colors and stops sound."</li>
</ul>
<h3>Unizen HD PET Panels (Printed)</h3>
<ul>
<li>9, 12, 25 mm — printable surface.</li>
<li>Ideal for branding walls, meeting rooms, reception signage that doubles as acoustic treatment.</li>
<li>NRC up to 1.00 with 50 mm air gap + PET wool.</li>
<li><strong>Pitch:</strong> "Your logo on the wall that absorbs sound."</li>
</ul>
<h3>UniVic Fluted Panel</h3>
<ul>
<li>9 mm decorative vertical grooves on MDF + PET backing.</li>
<li>NRC 0.55 – 0.85 depending on air gap.</li>
<li>Warm wood aesthetic for premium interiors.</li>
</ul>
`},
      { id: 'uva-4-l2', title: 'Decorative & Specialty Systems', type: 'reading', body: `
<h3>VMT Acoustic Wallpaper</h3>
<ul>
<li>Thin, printable, flexible — wallpaper feel.</li>
<li>Great for curved walls, pillars, ceiling curves.</li>
<li>Applied on a PET backing layer for absorption.</li>
</ul>
<h3>Woodscape</h3>
<ul>
<li>MDF board with micro-perforation + PET wool backing.</li>
<li>Various wood veneers (oak, walnut, teak).</li>
<li>Premium aesthetic for boardrooms, lobbies, hospitality.</li>
</ul>
<h3>Bespoke Graphics</h3>
<ul>
<li>Full-color imagery printed on acoustic substrate.</li>
<li>Murals, brand walls, custom art.</li>
</ul>
<h3>Ombre (HD Groove gradient)</h3>
<ul>
<li>Gradient-colored grooved panels creating visual flow.</li>
<li>Statement walls, education, hospitality.</li>
</ul>
<h3>Fabric System</h3>
<ul>
<li>Stretched fabric over acoustic substrate.</li>
<li>High NRC with textile finish — auditoriums, cinemas.</li>
</ul>
<h3>Uni-VicStrip</h3>
<ul>
<li>Linear strip panels (Windsor Oak etc.).</li>
<li>Quick install, modular, flexible patterns.</li>
</ul>
`},
      { id: 'uva-4-l3', title: 'Baffles, Screens & Functional', type: 'reading', body: `
<h3>Baffles</h3>
<p>Vertical or horizontal hanging panels — absorb on both sides. Ideal for open ceilings in offices, BPO halls.</p>
<h3>Screens / Desk-dividers</h3>
<p>PET-core screens that reduce speech bleed between desks; printable with team logos.</p>
<h3>PET Wool (loose)</h3>
<p>25 / 50 mm loose PET wool used behind panels or in ceiling plenums to boost low-frequency absorption.</p>
<div class="callout success"><strong>Design rule:</strong> If NRC needs to exceed 0.80 consistently, specify panel + PET wool backing + air gap.</div>
`},
      { id: 'uva-4-match', title: 'Product to Use-Case Matcher', type: 'match' },
      { id: 'uva-4-quiz', title: 'Module 4 Quiz', type: 'quiz' }
    ],
    matchData: {
      instruction: 'Match the UniVicoustic product to the best-fit application',
      pairs: [
        { a: 'Unizen HD Printed 12 mm', b: 'Branded reception wall' },
        { a: 'Woodscape', b: 'Premium boardroom' },
        { a: 'VMT Wallpaper', b: 'Curved columns' },
        { a: 'Ombre HD Groove', b: 'Statement gradient wall in a school' },
        { a: 'Baffles', b: 'Open ceiling in a BPO hall' },
        { a: 'Fabric System', b: 'Cinema / auditorium' },
        { a: 'PET 40 mm + 50 mm air gap', b: 'Maximum NRC requirement' },
        { a: 'UniVic Fluted Panel', b: 'Warm wood look in an executive cabin' }
      ]
    },
    quiz: [
      { q: 'Which product is printable for branded walls?', type: 'mcq',
        options: ['Standard PET 9 mm', 'Unizen HD Panel (Printed)', 'UFlex grille', 'Bare PET wool'],
        correct: 1, explain: 'Unizen HD is specifically made to receive full-color print.' },
      { q: 'Maximum NRC assembly typically needs:', type: 'mcq',
        options: ['9 mm panel direct-mount', '25 mm panel + 50 mm air gap + PET wool', 'Wallpaper only', 'Glass wool external'],
        correct: 1, explain: 'Thick panel + deep air gap + wool combination reaches NRC ≈ 1.00.' },
      { q: 'Woodscape is best described as:', type: 'mcq',
        options: ['Metal ceiling', 'MDF with micro-perforation + PET wool backing', 'Plastic film', 'Loose fiber'],
        correct: 1, explain: 'MDF veneer + micro-perforations + PET backing = Woodscape.' },
      { q: 'For a curved pillar you would specify:', type: 'mcq',
        options: ['Rigid 25 mm PET', 'VMT Wallpaper on backing', 'Metal panel', 'Loose PET wool'],
        correct: 1, explain: 'VMT wallpaper is flexible and follows curves.' },
      { q: 'Baffles are used primarily in:', type: 'mcq',
        options: ['Closed cabins', 'Open / exposed ceilings in large rooms', 'Outdoor', 'Floors'],
        correct: 1, explain: 'Vertical baffles work where there is no conventional ceiling.' },
      { q: 'Ombre panels create:', type: 'mcq',
        options: ['Uniform color', 'Gradient visual flow', 'Mirror finish', 'Plain matte'],
        correct: 1, explain: 'Ombre means gradient — the panel color transitions.' },
      { q: 'UniVic Fluted Panel is:', type: 'mcq',
        options: ['Pure MDF only', 'MDF with vertical grooves + PET backing', 'Fabric', 'Metal'],
        correct: 1, explain: 'Fluted panel = vertical-groove MDF + PET acoustic backing.' },
      { q: 'Fabric System suits best:', type: 'mcq',
        options: ['Wet areas', 'Auditoriums & cinemas', 'Kitchens', 'Toilets'],
        correct: 1, explain: 'Stretched-fabric systems are the standard for auditoriums.' },
      { q: 'PET wool is used:', type: 'mcq',
        options: ['As a visible finish', 'Behind panels / in plenum to deepen low-frequency absorption', 'As paint', 'As flooring'],
        correct: 1, explain: 'PET wool is a cavity fill, not a finish.' },
      { q: 'Typical PET panel NRC at 9 mm direct-mount is around:', type: 'mcq',
        options: ['0.05', '0.25–0.45', '0.95', '1.5'],
        correct: 1, explain: 'Thin direct-mounted panels give low-to-mid NRC (~0.25–0.45).' },
      { q: 'To provide print + acoustics in ONE unit, specify:', type: 'mcq',
        options: ['Bare PET wool', 'Unizen HD Printed Panels', 'Metal grille', 'Concrete'],
        correct: 1, explain: 'Unizen HD delivers printable graphics with acoustic performance.' },
      { q: 'Uni-VicStrip is a:', type: 'mcq',
        options: ['Cable tray', 'Linear strip panel (wood-finish modular)', 'Metal air-plug', 'Suspended lamp'],
        correct: 1, explain: 'Uni-VicStrip = linear modular strip panels such as the Windsor Oak variant.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-5', division: 'univicoustic', order: 5,
    title: 'Module 5 — Certifications & Test Standards',
    summary: 'What each certificate means, where they apply, and how to use them in a quote.',
    thumbnail: '📜',
    trainerId: 't1',
    accessRoles: ['all'],
    estimatedMinutes: 30,
    lessons: [
      { id: 'uva-5-l1', title: 'Performance Certificates', type: 'reading', body: `
<h3>NRC / Sound Absorption (ISO 354 / ASTM C423)</h3>
<p>Third-party measured NRC per product + mounting. UniVicoustic publishes reports for every major SKU and assembly (direct mount, 25 mm air gap, 50 mm air gap, with/without PET wool).</p>
<h3>Sound Transmission Loss (STL) — ASTM E90</h3>
<p>Reports STC rating for wall / panel systems, important for separation walls.</p>
<h3>Flexural properties</h3>
<p>Mechanical strength data for HD PET boards — used in specifications for structural panels.</p>
`},
      { id: 'uva-5-l2', title: 'Fire & Safety', type: 'reading', body: `
<h3>ASTM E84 — Surface Burning</h3>
<p>Measures Flame Spread Index (FSI) and Smoke Developed Index (SDI). Class A requires FSI ≤ 25 and SDI ≤ 450.</p>
<h3>BS 476 Parts 6 & 7</h3>
<p>Fire propagation and surface spread of flame per UK standard. Common in commercial spec sheets.</p>
<h3>Reaction to Fire</h3>
<p>European EN 13501-1 classification A–F; UniVicoustic products typically meet B-s1,d0 or better.</p>
<h3>Anti-fungal certification</h3>
<p>Critical for healthcare and humid climates.</p>
`},
      { id: 'uva-5-l3', title: 'Green & Health', type: 'reading', body: `
<h3>LEED (USGBC)</h3>
<p>Contributes credits via recycled content, low VOC, and responsible sourcing.</p>
<h3>GreenPro (CII-IGBC)</h3>
<p>Indian green-product certification — UniVicoustic acoustic panels carry it.</p>
<h3>IGBC</h3>
<p>Indian Green Building Council — project-level green rating; UniVicoustic products support multiple credits.</p>
<h3>EPD (Environmental Product Declaration)</h3>
<p>Third-party life-cycle assessment summary. A must-have for large corporate and government bids.</p>
<h3>Declare / Red List</h3>
<p>Ingredient transparency — "Declare Label" shows there are no Red-List chemicals.</p>
<h3>CDPH / VOC</h3>
<p>California Dept of Public Health emissions standard — low-VOC certification used in WELL buildings.</p>
<h3>RoHS / Heavy Metals</h3>
<p>No hazardous heavy-metal content in the finished product.</p>
<h3>SGS ISO 9001 / 14001 / 45001</h3>
<p>Quality, environment and occupational-health management systems.</p>
`},
      { id: 'uva-5-quiz', title: 'Module 5 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'ASTM E84 Class A requires FSI ≤ ? and SDI ≤ ?', type: 'mcq',
        options: ['25 / 450', '100 / 500', '75 / 200', '10 / 50'],
        correct: 0, explain: 'Class A: Flame Spread ≤ 25, Smoke Developed ≤ 450.' },
      { q: 'EPD stands for:', type: 'mcq',
        options: ['Electrical Product Directive', 'Environmental Product Declaration', 'Emission Plan Document', 'Extended Product Data'],
        correct: 1, explain: 'EPD = Environmental Product Declaration — third-party LCA report.' },
      { q: 'GreenPro is issued by:', type: 'mcq',
        options: ['USGBC', 'CII-IGBC', 'BIS', 'ISO'],
        correct: 1, explain: 'CII-IGBC issues GreenPro for Indian products.' },
      { q: 'Which cert focuses on California VOC emissions?', type: 'mcq',
        options: ['ASTM E84', 'CDPH', 'ISO 9001', 'BS 476'],
        correct: 1, explain: 'CDPH Section 01350 — California emissions standard used in WELL / LEED.' },
      { q: 'ISO 45001 covers:', type: 'mcq',
        options: ['Environmental management', 'Quality management', 'Occupational health & safety', 'Food safety'],
        correct: 2, explain: 'ISO 45001 is the occupational health & safety management standard.' },
      { q: 'True or False: Anti-fungal certification is mostly required in healthcare and humid zones.', type: 'tf', correct: 0,
        explain: 'True — hospitals and humid climates demand anti-fungal finishes.' },
      { q: 'STL / STC is measured per which standard?', type: 'mcq',
        options: ['ISO 354', 'ASTM C423', 'ASTM E90 / ISO 140', 'BS 476 Part 7'],
        correct: 2, explain: 'ASTM E90 / ISO 140 handle airborne sound-transmission loss.' },
      { q: 'Declare Label indicates:', type: 'mcq',
        options: ['Fire class', 'Ingredient transparency against a Red List', 'Sound absorption', 'Install time'],
        correct: 1, explain: 'Declare Label discloses ingredients and Red-List compliance.' },
      { q: 'LEED credits can come from:', type: 'mcq',
        options: ['Recycled content only', 'Recycled content, low VOC, responsible sourcing & more', 'Color options', 'Thickness'],
        correct: 1, explain: 'LEED awards multiple credits across material, air quality, sourcing, etc.' },
      { q: 'ISO 14001 focuses on:', type: 'mcq',
        options: ['Quality', 'Environment', 'Safety', 'Finance'],
        correct: 1, explain: 'ISO 14001 is the environmental management system standard.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-6', division: 'univicoustic', order: 6,
    title: 'Module 6 — Standard Operating Procedures (SOPs)',
    summary: 'Installation, handling, storage, grooving, dealer onboarding — the operations playbook.',
    thumbnail: '🧰',
    trainerId: 't4',
    accessRoles: ['all'],
    estimatedMinutes: 55,
    lessons: [
      { id: 'uva-6-l1', title: 'VMT Panel Installation', type: 'reading', body: `
<figure>
<svg viewBox="0 0 720 180" xmlns="http://www.w3.org/2000/svg">
  <text x="360" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">Install flow — surface to finish</text>
  <g>
    <rect x="20"  y="50" width="110" height="70" rx="10" fill="#dbeafe" stroke="#60a5fa"/><text x="75"  y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#1d4ed8">1. Prep</text><text x="75"  y="96" text-anchor="middle" font-size="9" fill="#334155">Clean, dry, flat</text><text x="75" y="108" text-anchor="middle" font-size="9" fill="#334155">&lt; 2 mm / m</text>
    <rect x="160" y="50" width="110" height="70" rx="10" fill="#e9d5ff" stroke="#a855f7"/><text x="215" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#7c3aed">2. Adhesive</text><text x="215" y="96" text-anchor="middle" font-size="9" fill="#334155">Acrylic / PU only</text><text x="215" y="108" text-anchor="middle" font-size="9" fill="#334155">Roller, both faces</text>
    <rect x="300" y="50" width="110" height="70" rx="10" fill="#fef3c7" stroke="#d97706"/><text x="355" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#b45309">3. Mount</text><text x="355" y="96" text-anchor="middle" font-size="9" fill="#334155">Press center→edge</text><text x="355" y="108" text-anchor="middle" font-size="9" fill="#334155">Stagger joints</text>
    <rect x="440" y="50" width="110" height="70" rx="10" fill="#ffe4e6" stroke="#f43f5e"/><text x="495" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#be123c">4. Fasten</text><text x="495" y="96" text-anchor="middle" font-size="9" fill="#334155">Above 2 m: discrete</text><text x="495" y="108" text-anchor="middle" font-size="9" fill="#334155">mechanical clips</text>
    <rect x="580" y="50" width="120" height="70" rx="10" fill="#d1fae5" stroke="#10b981"/><text x="640" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="#047857">5. Finish</text><text x="640" y="96" text-anchor="middle" font-size="9" fill="#334155">Hairline joints</text><text x="640" y="108" text-anchor="middle" font-size="9" fill="#334155">PET tape or reveal</text>
  </g>
  <g stroke="#64748b" fill="none" stroke-width="1.8">
    <path d="M130 85 L 160 85" marker-end="url(#pa2)"/>
    <path d="M270 85 L 300 85" marker-end="url(#pa2)"/>
    <path d="M410 85 L 440 85" marker-end="url(#pa2)"/>
    <path d="M550 85 L 580 85" marker-end="url(#pa2)"/>
  </g>
  <defs><marker id="pa2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><polygon points="0,0 6,4 0,8" fill="#64748b"/></marker></defs>
  <text x="360" y="155" text-anchor="middle" font-size="11" fill="#64748b" font-style="italic">Acclimatize boards 24 h in the install space before step 1.</text>
</svg>
<figcaption>Standard VMT / PET board install flow — each step has a tolerance and a "don't do this" rule in the SOP.</figcaption>
</figure>

<h3>Surface prep</h3>
<ul>
<li>Substrate must be clean, dry, flat (&lt; 2 mm / m deviation).</li>
<li>Check moisture content — no fresh concrete.</li>
</ul>
<h3>Adhesive + mechanical</h3>
<ul>
<li>Use specified acrylic/contact adhesive evenly rolled on substrate AND panel back.</li>
<li>Roller pressure from center → edges to evacuate air.</li>
<li>Discreet mechanical fasteners at top/bottom for panels above 2 m height.</li>
</ul>
<h3>Joints & finish</h3>
<ul>
<li>Maintain a consistent hairline (&lt; 0.5 mm) joint.</li>
<li>Trim edges with matching color PET tape or reveal beading.</li>
</ul>
`},
      { id: 'uva-6-l2', title: 'PET Board Installation (rev 01)', type: 'reading', body: `
<h3>Key rules</h3>
<ul>
<li>Acclimatize boards 24 h in install space.</li>
<li>Do NOT use solvent-based adhesives — only acrylic/PU recommended.</li>
<li>Mount direct OR use Z-profile/Omega for air gap — air gap dramatically boosts NRC.</li>
<li>Stagger joints on multi-row walls for visual rhythm.</li>
</ul>
<h3>Cutting</h3>
<ul>
<li>Use sharp cutter (segment blade) in multiple light passes.</li>
<li>For intricate shapes use CNC routing.</li>
</ul>
`},
      { id: 'uva-6-l3', title: 'CNC Grooving — Production', type: 'reading', body: `
<h3>Key parameters</h3>
<ul>
<li>Groove width: 3–6 mm (finer for HD aesthetics).</li>
<li>Groove depth: ≤ 0.7 × board thickness to avoid break-through.</li>
<li>Spindle RPM: 18,000+ with compression cutter for clean edge.</li>
<li>Feed rate: ~3 m/min; dust-extraction on.</li>
</ul>
<h3>Process considerations</h3>
<ul>
<li>Always run a 1-groove test on scrap before full panel.</li>
<li>Humidity &gt; 70% → fiber fuzz; run dehumidifier.</li>
<li>Keep cutter sharp; dull cutter = fuzzy groove = rework.</li>
</ul>
`},
      { id: 'uva-6-l4', title: 'Grooving & Finishing', type: 'reading', body: `
<h3>Finishing checklist</h3>
<ul>
<li>Vacuum every groove after cut.</li>
<li>Back-apply black/matching scrim behind grooves for visual depth.</li>
<li>Pack with PET wool if acoustic performance requires it.</li>
<li>Inspect under raking light for edge chipping before dispatch.</li>
</ul>
`},
      { id: 'uva-6-l5', title: 'Shade & Thickness Variation', type: 'reading', body: `
<h3>Why variation occurs</h3>
<ul>
<li>PET boards are made from recycled content — natural batch-to-batch color shift of ± 2–3 ΔE is expected.</li>
<li>Thickness tolerance typically ±0.3 mm for 9 mm, ±0.5 mm for 25 mm boards.</li>
</ul>
<h3>How to manage</h3>
<ul>
<li>Always reserve full project quantity from a single batch.</li>
<li>Unpack and dry-lay panels to blend shade before install.</li>
<li>Communicate tolerance expectations with client at quote stage — documented.</li>
</ul>
<div class="callout warning"><strong>Do NOT</strong> mix batches on the same visible wall. Always sequence from a single batch.</div>
`},
      { id: 'uva-6-l6', title: 'Do\'s & Don\'ts, Handling, Storage', type: 'reading', body: `
<h3>Do</h3>
<ul>
<li>Store panels flat, on a clean, dry pallet, at 50–70% RH, 15–30 °C.</li>
<li>Cover stacks with breathable sheet — not plastic that traps moisture.</li>
<li>Lift panels vertical-edge up, two-person for long panels.</li>
<li>Use cotton gloves for white / light panels.</li>
</ul>
<h3>Don't</h3>
<ul>
<li>Don\'t stack above 1.2 m height.</li>
<li>Don\'t expose to direct sunlight for long — colour fade.</li>
<li>Don\'t drag panels across floor — scratches the back scrim.</li>
<li>Don\'t install on wet substrate.</li>
</ul>
`},
      { id: 'uva-6-l7', title: 'Maintenance & Cleaning', type: 'reading', body: `
<h3>Regular care</h3>
<ul>
<li>Weekly: soft-brush vacuuming with upholstery nozzle.</li>
<li>Monthly: lint roll for dust & hair.</li>
<li>Spot clean with damp (not wet) microfiber cloth + neutral pH cleaner.</li>
<li>Dry thoroughly after cleaning.</li>
</ul>
<h3>Never</h3>
<ul>
<li>Never use bleach, solvents or steam cleaning on PET panels.</li>
<li>Avoid abrasive scrubbers.</li>
</ul>
`},
      { id: 'uva-6-l8', title: 'Dealer Onboarding Process', type: 'reading', body: `
<h3>Stages</h3>
<ol class="list-decimal pl-6 text-slate-700">
<li><strong>Prospect & screen:</strong> KYC, business check, showroom evaluation.</li>
<li><strong>Commercial agreement:</strong> margin slab, exclusivity zone, MOQ.</li>
<li><strong>Training:</strong> Module 1–6 of this LMS + a field visit.</li>
<li><strong>Starter kit:</strong> sample box, printed catalog, digital assets.</li>
<li><strong>Go-live:</strong> first order, marketing announcement, joint call with architect.</li>
<li><strong>Quarterly review:</strong> sell-out, training refreshers, NPS.</li>
</ol>
`},
      { id: 'uva-6-quiz', title: 'Module 6 Quiz', type: 'quiz' }
    ],
    quiz: [
      { q: 'Acceptable substrate flatness for VMT panel install is:', type: 'mcq',
        options: ['&lt; 5 mm / m', '&lt; 2 mm / m', '&lt; 10 mm / m', 'Any'],
        correct: 1, explain: 'Spec: less than 2 mm deviation per metre.' },
      { q: 'Groove depth on PET boards should not exceed:', type: 'mcq',
        options: ['0.1 × thickness', '0.3 × thickness', '0.7 × thickness', '1.0 × thickness'],
        correct: 2, explain: '≤ 0.7 × thickness prevents break-through.' },
      { q: 'For uniform shade across a wall:', type: 'mcq',
        options: ['Mix batches freely', 'Use a single batch and dry-lay to blend', 'Order from different vendors', 'Paint after install'],
        correct: 1, explain: 'Single batch + dry-lay produces best visual uniformity.' },
      { q: 'Acceptable adhesive for PET boards is:', type: 'mcq',
        options: ['Solvent-based epoxy', 'Acrylic or PU specified adhesive', 'Hot glue gun only', 'None — dry-fit only'],
        correct: 1, explain: 'Specified acrylic / PU adhesives are safe for PET.' },
      { q: 'Ideal storage conditions are:', type: 'mcq',
        options: ['Stacked on edge outdoors', 'Flat on clean dry pallet, 50–70% RH, 15–30 °C', 'Inside a refrigerator', 'No requirement'],
        correct: 1, explain: 'Controlled, dry, flat storage preserves shape and color.' },
      { q: 'For cleaning, use:', type: 'mcq',
        options: ['Bleach', 'Steam', 'Damp microfiber + neutral-pH cleaner', 'Petrol'],
        correct: 2, explain: 'Damp microfiber with neutral cleaner is safe; harsh solvents are not.' },
      { q: 'Maximum stack height for panels is:', type: 'mcq',
        options: ['0.5 m', '1.2 m', '2 m', '3 m'],
        correct: 1, explain: 'Keep stacks under 1.2 m to avoid deformation.' },
      { q: 'Acclimatization before PET install is:', type: 'mcq',
        options: ['Not needed', '24 h in install space', '1 week in sun', 'Just before lunch'],
        correct: 1, explain: '24 h acclimatization in the install space.' },
      { q: 'True or False: CNC grooving works best at ~18,000 RPM with compression cutter.', type: 'tf', correct: 0,
        explain: 'True — high RPM + compression cutter produces clean grooves.' },
      { q: 'Dealer onboarding ends with:', type: 'mcq',
        options: ['Signing MOU only', 'First order + joint architect call + marketing announcement', 'Factory tour', 'Issuing a discount'],
        correct: 1, explain: 'A proper go-live cements the partnership with market action.' },
      { q: 'Humidity above 70% during CNC routing causes:', type: 'mcq',
        options: ['Faster cut', 'Fiber fuzz at groove edges', 'Better finish', 'Nothing'],
        correct: 1, explain: 'Humidity makes fibers lift — giving a fuzzy edge.' },
      { q: 'Recommended gloves for white panels:', type: 'mcq',
        options: ['Bare hands', 'Cotton', 'Oily rubber', 'None'],
        correct: 1, explain: 'Cotton gloves prevent finger marks on light finishes.' },
      { q: 'Solvent-based adhesives should be:', type: 'mcq',
        options: ['Used freely', 'Avoided on PET boards', 'Used in doubles', 'Used only in winter'],
        correct: 1, explain: 'Solvents may attack PET fibers — avoid.' },
      { q: 'Color fade is most commonly caused by:', type: 'mcq',
        options: ['Cleaning', 'Prolonged direct sunlight', 'Cold', 'Wind'],
        correct: 1, explain: 'UV exposure is the main fade driver.' },
      { q: 'The dealer kit should include:', type: 'mcq',
        options: ['Only a brochure', 'Sample box, printed catalog, digital assets, starter training', 'Free stock forever', 'Nothing'],
        correct: 1, explain: 'A full kit accelerates dealer readiness.' }
    ],
    passingScore: 70
  },

  {
    id: 'uva-7', division: 'univicoustic', order: 7,
    title: 'Module 7 — Digital Product Catalog',
    summary: 'Deep dive into catalog.univicoustic.com — Bespoke Graphics, Woodscape, Fabric, Ombre, Uni-VicStrip.',
    thumbnail: '🖼️',
    trainerId: 't1',
    accessRoles: ['all'],
    estimatedMinutes: 30,
    lessons: [
      { id: 'uva-7-l1', title: 'Catalog Overview', type: 'reading', body: `
<h3>5 hero lines on catalog.univicoustic.com</h3>
<ol class="list-decimal pl-6 text-slate-700">
<li><strong>Bespoke Graphics</strong> — custom-printed acoustic murals, brand walls, artwork on acoustic substrate.</li>
<li><strong>Woodscape</strong> — wood-look MDF with micro-perforation + PET backing; multiple veneers and patterns.</li>
<li><strong>Fabric</strong> — stretched-fabric acoustic systems for auditoriums, cinemas, premium spaces.</li>
<li><strong>Ombre</strong> — HD Groove gradient-coloured panels creating visual flow and motion.</li>
<li><strong>Uni-VicStrip</strong> — linear strip panels (e.g. Windsor Oak) offering modular wood-finish walls.</li>
</ol>
<h3>How to use the catalog with a client</h3>
<ul>
<li>Start with the mood — does the client want <em>functional, decorative, branded, or premium</em>?</li>
<li>Navigate to the corresponding line, show 2–3 options, confirm colour/veneer.</li>
<li>Pull the matching NRC sheet from the test-certificate library to seal the deal.</li>
</ul>
`},
      { id: 'uva-7-l2', title: 'Bespoke Graphics', type: 'reading', body: `
<h3>What it is</h3>
<p>Full-color digital print on a PET/HD acoustic substrate — transforms any wall into a statement piece that still absorbs sound.</p>
<h3>Applications</h3>
<ul>
<li>Reception / lobby brand walls.</li>
<li>Schools with themed classrooms.</li>
<li>Cafeterias with artwork.</li>
<li>Hotels with bespoke imagery.</li>
</ul>
<h3>Specs</h3>
<ul>
<li>Resolution: up to 1440 dpi digital print.</li>
<li>Seam-free sizes up to 1.2 m × 2.4 m; larger walls tiled with design-aware alignment.</li>
<li>Light-fast ink; anti-fungal treatment available.</li>
</ul>
<h3>Sell it</h3>
<p><em>"Your brand story told on a wall that also gives you a quieter office."</em></p>
`},
      { id: 'uva-7-l3', title: 'Woodscape', type: 'reading', body: `
<h3>Product family</h3>
<ul>
<li>Various veneers — oak, walnut, teak, ash, custom.</li>
<li>Perforation patterns — round, slot, micro, variable.</li>
<li>Standard panels 600 × 2400 mm or 1200 × 2400 mm.</li>
</ul>
<h3>Acoustic performance</h3>
<ul>
<li>With 25 mm PET wool backing + 25 mm air gap: NRC typically 0.70–0.85.</li>
<li>Tunable via perforation % and cavity depth.</li>
</ul>
<h3>Use-cases</h3>
<ul>
<li>Boardrooms, executive cabins.</li>
<li>Hotel lobbies.</li>
<li>Premium retail.</li>
</ul>
`},
      { id: 'uva-7-l4', title: 'Fabric, Ombre, Uni-VicStrip', type: 'reading', body: `
<h3>Fabric System</h3>
<ul>
<li>Track-mounted fabric tensioned over PET substrate.</li>
<li>Huge colour/texture palette.</li>
<li>Typical NRC 0.85+ for auditoriums.</li>
</ul>
<h3>Ombre (HD Groove gradient)</h3>
<ul>
<li>Grooved PET panels with colour gradient; creates kinetic visual effect.</li>
<li>Great for schools, tech offices, experiential retail.</li>
</ul>
<h3>Uni-VicStrip</h3>
<ul>
<li>Linear modular strips (e.g. Windsor Oak) clip-mounted to a backing rail.</li>
<li>Flexible rhythm — variable strip widths.</li>
<li>Fast install, replaceable strips.</li>
</ul>
`},
      { id: 'uva-7-match', title: 'Catalog product matcher', type: 'match' },
      { id: 'uva-7-quiz', title: 'Module 7 Quiz', type: 'quiz' }
    ],
    matchData: {
      instruction: 'Match catalog line to the best-fit brief',
      pairs: [
        { a: 'Bespoke Graphics', b: 'Client wants their logo mural on reception' },
        { a: 'Woodscape', b: 'Boardroom wants warm wood look with real NRC' },
        { a: 'Fabric', b: 'New 300-seat auditorium' },
        { a: 'Ombre', b: 'Experiential retail store with gradient feature wall' },
        { a: 'Uni-VicStrip', b: 'Startup lounge with quick-install modular strips' }
      ]
    },
    quiz: [
      { q: 'Bespoke Graphics is essentially:', type: 'mcq',
        options: ['Plain fabric', 'Custom-printed acoustic substrate', 'Metal panel', 'Loose wool'],
        correct: 1, explain: 'Digital print on PET/HD substrate.' },
      { q: 'Woodscape perforation percentage primarily affects:', type: 'mcq',
        options: ['Panel color', 'Acoustic tuning (which frequencies absorb most)', 'Install time', 'Thickness'],
        correct: 1, explain: 'Perforation % directly tunes which frequencies the panel absorbs.' },
      { q: 'Fabric System typical NRC in auditorium config:', type: 'mcq',
        options: ['0.10', '0.45', '0.85+', 'Not measurable'],
        correct: 2, explain: 'Stretched-fabric systems typically achieve NRC 0.85+.' },
      { q: 'Ombre visual effect is:', type: 'mcq',
        options: ['Uniform color', 'Gradient / kinetic', 'Mirror-finish', 'Glow-in-the-dark'],
        correct: 1, explain: 'Ombre delivers a gradient visual effect.' },
      { q: 'Uni-VicStrip installs best described as:', type: 'mcq',
        options: ['Poured in place', 'Clip-mounted linear strips', 'Adhesive-only tiles', 'Steel trusses'],
        correct: 1, explain: 'Linear strips clip to a backing rail for fast install.' },
      { q: 'For a client wanting a brand mural, recommend:', type: 'mcq',
        options: ['Fabric', 'Bespoke Graphics', 'UniVic Fluted', 'Plain PET'],
        correct: 1, explain: 'Bespoke Graphics is purpose-built for branded imagery.' },
      { q: 'True or False: All 5 catalog lines use an acoustic substrate.', type: 'tf', correct: 0,
        explain: 'True — every line is designed to be both aesthetic and acoustically functional.' },
      { q: 'Typical panel size for Woodscape:', type: 'mcq',
        options: ['100 × 100 mm only', '600 × 2400 mm or 1200 × 2400 mm', '50 × 50 mm', '2 m × 5 m only'],
        correct: 1, explain: 'Standard Woodscape sheets are 600 or 1200 × 2400 mm.' },
      { q: 'Bespoke Graphics max seam-free size is typically:', type: 'mcq',
        options: ['0.1 × 0.1 m', '1.2 × 2.4 m', '10 × 10 m', 'No limit'],
        correct: 1, explain: 'Most digital print equipment caps seam-free at roughly 1.2 × 2.4 m.' },
      { q: 'Fabric System suits which client MOST?', type: 'mcq',
        options: ['Kitchen', '300-seat auditorium', 'Toilet', 'Warehouse roof'],
        correct: 1, explain: 'Fabric track systems are the classic auditorium solution.' }
    ],
    passingScore: 70
  }
];

// ========== Reference Materials (source PPTs / PDFs / SOPs) ==========
// These are the original training materials from the uploaded folders.
// File paths are served from unitile-lms/training-data/ by the dev server.
const TD_UTI = 'training-data/Training material';
const TD_UVA = 'training-data/Training-material-Univicoustic';
window.SEED_RESOURCES = {
  'uti-1': [
    { title: 'Introduction to RAF — Chapter 1 PPT', file: `${TD_UTI}/Chapter 1 - Introduction to RAF/Introduction to RAF_Chapter 1.pdf`, kind: 'ppt' }
  ],
  'uti-2': [
    { title: 'Chapter 2 — Business Segments', file: `${TD_UTI}/Chapter 2 - Business Segments.pdf`, kind: 'ppt' }
  ],
  'uti-3': [
    // RAF panels
    { title: 'Unitile Calcium Sulphate PPT', file: `${TD_UTI}/Chapter 3 - Product range/RAF/Unitile Calcium Sulphate PPT (C).pdf`, kind: 'ppt', group: 'RAF Panels' },
    { title: 'Nex-Gen System — Concept & Product', file: `${TD_UTI}/Chapter 3 - Product range/RAF/Nex-Gen System - Concept & Product (C).pdf`, kind: 'ppt', group: 'RAF Panels' },
    { title: 'Unifold', file: `${TD_UTI}/Chapter 3 - Product range/RAF/Unifold.pdf`, kind: 'ppt', group: 'RAF Panels' },
    { title: 'Low-Flange-Width Panel System', file: `${TD_UTI}/Chapter 3 - Product range/RAF/Unitile Low Flange Width Panel system.pdf`, kind: 'ppt', group: 'RAF Panels' },
    // UFlex Ceiling
    { title: 'U-Flex Prime Ceiling Catalogue', file: `${TD_UTI}/Chapter 3 - Product range/UFlex Ceiling/U-Flex Prime Ceiling Catalogue.pdf`, kind: 'ppt', group: 'UFlex Ceiling' },
    { title: 'U-Flex Extreme Ceiling Catalogue', file: `${TD_UTI}/Chapter 3 - Product range/UFlex Ceiling/U-Flex Extreme Ceiling Catalogue.pdf`, kind: 'ppt', group: 'UFlex Ceiling' },
    { title: 'U-Flex Structural Ceiling Presentation', file: `${TD_UTI}/Chapter 3 - Product range/UFlex Ceiling/U-Flex_Structural_Ceiling_Presentation.pdf`, kind: 'ppt', group: 'UFlex Ceiling' },
    // Accessories
    { title: 'Airflow Grills', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Airflow Grills.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Air Plugs — Extended', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Airplugs & Grommet/Air Plugs- Extended.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'U-FLEX Air Plugs', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Airplugs & Grommet/U-FLEX Air Plugs.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Grommet', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Airplugs & Grommet/Grommet.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Round Brush Grommet', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Airplugs & Grommet/Round Brush Grommet.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Bridge', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Bridge.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Electro Flex', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Electro Flex.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Forza', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Forza PPT.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Multilayer Cable Tray', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Multilayer Cable Tray.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Multiplyair', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Multiplyair.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Panel Lifter', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Panel Lifter.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Rack Lift', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Rack Lift.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Ramp Shoe', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Ramp Shoe.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Ultra Strong Panel', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Ultra Strong Panel.pdf`, kind: 'ppt', group: 'Accessories' },
    { title: 'Vision Glass Panel', file: `${TD_UTI}/Chapter 3 - Product range/Accessories/Vision Glass Panel.pdf`, kind: 'ppt', group: 'Accessories' }
  ],
  'uti-4': [
    { title: 'Chapter 4 — RAF Testing Standards', file: `${TD_UTI}/Chapter 4 - RAF Testing Standards.pdf`, kind: 'ppt' }
  ],
  'uti-5': [
    { title: 'GIP — Open Offices', file: `${TD_UTI}/Chapter 5 - Installation/GIP_Open Offices.pdf`, kind: 'ppt' },
    { title: 'GIP — Data Center & Critical Rooms', file: `${TD_UTI}/Chapter 5 - Installation/GIP - DC & Critical room.pdf`, kind: 'ppt' },
    { title: 'Installation Manual', file: `${TD_UTI}/Chapter 5 - Installation/Installation Manual.pdf`, kind: 'pdf' }
  ],
  'uva-1': [
    { title: 'Training Module 1 — Sound Science', file: `${TD_UVA}/Training Modules/Training Module 1 - Sound Science.pdf`, kind: 'ppt' }
  ],
  'uva-2': [
    { title: 'Training Module 2 — Acoustic Material & Analysis', file: `${TD_UVA}/Training Modules/Training Module 2 - Acoustic Material & Analysis.pdf`, kind: 'ppt' },
    { title: 'FAQ Sheet', file: `${TD_UVA}/Training Modules/FAQ Sheet.pdf`, kind: 'pdf', group: 'Reference' }
  ],
  'uva-3': [
    { title: 'Training Module 3 — Market Insights', file: `${TD_UVA}/Training Modules/Training Module 3 - Market Insights.pdf`, kind: 'ppt' }
  ],
  'uva-4': [
    { title: 'Training Module 4 — Product Range', file: `${TD_UVA}/Training Modules/Training Module 4 - Product Range.pdf`, kind: 'ppt' },
    { title: 'HD VMT & HD PET — Technical Specs', file: `${TD_UVA}/Technical Specifications/HD VMT and HD PET Technical Specs.xls`, kind: 'xls', group: 'Technical specs' },
    { title: 'Technical Specs 2.0', file: `${TD_UVA}/Technical Specifications/Technical Specs-2.0.xls`, kind: 'xls', group: 'Technical specs' },
    { title: 'Technical Specs — Screens & Baffles', file: `${TD_UVA}/Technical Specifications/Technical Specs- screens-baffles.xls`, kind: 'xls', group: 'Technical specs' }
  ],
  'uva-5': [
    // Summary deck
    { title: 'Certifications Master Deck', file: `${TD_UVA}/Test Certificates/Certifications.pptx`, kind: 'ppt', group: 'Overview' },
    { title: 'Warranty Certificate', file: `${TD_UVA}/Test Certificates/Warranty Certificate.pdf`, kind: 'pdf', group: 'Overview' },
    // Green & sustainability
    { title: 'EPD — United Acoustics', file: `${TD_UVA}/Test Certificates/EPD Certificate/United_Acoustics_EPD.pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'GreenPro Certificate', file: `${TD_UVA}/Test Certificates/GreenPro Certificate/GreenPro Certificate_United Acoustic Private Limited (1).pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'LEED Certificate', file: `${TD_UVA}/Test Certificates/LEED Certificate/LEED Certificate.pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'IGBC Certificate', file: `${TD_UVA}/Test Certificates/Indian Green Building Council (IGBC)/Indian Green Building Council (IGBC).pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'IGBC — United Acoustic', file: `${TD_UVA}/Test Certificates/Indian Green Building Council (IGBC)/United Acoustic Pvt Ltd.pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'CDPH — VOC Emissions', file: `${TD_UVA}/Test Certificates/CDPH/CDPH.pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    { title: 'SCS Global — IAQ', file: `${TD_UVA}/Test Certificates/SCS Global Services/IQA United Acoustic_2025_SCS-IAQ-11105_s2.pdf`, kind: 'pdf', group: 'Green & Sustainability' },
    // Fire safety
    { title: 'ASTM E84 — 12 mm', file: `${TD_UVA}/Test Certificates/ASTM - 84 - Flame spread & Smoke Developed Index/ACOUSTIC PANEL-RECYCLED POLYSTER COLOURED FIBER 12MM (1).pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'ASTM D — Fire Test 12 mm', file: `${TD_UVA}/Test Certificates/ASTM D Fire Test/Recycled Colored Polyester Fiber Acoustic Panel 12 mm.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'ASTM D — Fire Test 9 mm', file: `${TD_UVA}/Test Certificates/ASTM D Fire Test/Recycled Colored Polyester Fiber Acoustic Panel 9 mm.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'BS 476 Pt 6 — 12 mm', file: `${TD_UVA}/Test Certificates/BS 476 Part 6 (Fire propagation)/ACOUSTIC PANEL-RECYCLED POLYSTER COLOURED FIBER 12MM.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'BS 476 Pt 6 — 9 mm', file: `${TD_UVA}/Test Certificates/BS 476 Part 6 (Fire propagation)/ACOUSTIC PANEL-RECYCLED POLYSTER COLOURED FIBER 9MM.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'BS 476 Pt 7 — 12 mm', file: `${TD_UVA}/Test Certificates/BS 476 Part 7 (Surface spread of flame)/ACOUSTIC PANEL-RECYCLED POLYSTER COLOURED FIBER 12MM.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'BS 476 Pt 7 — 9 mm', file: `${TD_UVA}/Test Certificates/BS 476 Part 7 (Surface spread of flame)/ACOUSTIC PANEL-RECYCLED POLYSTER COLOURED FIBER 9MM.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'Reaction to Fire — ZE181-1', file: `${TD_UVA}/Test Certificates/Reaction To Fire/ZE181-1 TR0.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'Reaction to Fire — ZE181-2', file: `${TD_UVA}/Test Certificates/Reaction To Fire/ZE181-2 TR0.pdf`, kind: 'pdf', group: 'Fire Safety' },
    { title: 'Reaction to Fire — ZE181-3', file: `${TD_UVA}/Test Certificates/Reaction To Fire/ZE181-3 CR0.pdf`, kind: 'pdf', group: 'Fire Safety' },
    // ISO / management systems
    { title: 'SGS ISO 9001:2015', file: `${TD_UVA}/Test Certificates/SGS_ISO Certificate/United Acoustic_SGS_ISO 9001_2015_INBAR_000740_EN.pdf`, kind: 'pdf', group: 'ISO / Management' },
    { title: 'SGS ISO 14001:2015', file: `${TD_UVA}/Test Certificates/SGS_ISO Certificate/United Acoustic_SGS_ISO 14001_2015_INBAR_000741_EN.pdf`, kind: 'pdf', group: 'ISO / Management' },
    { title: 'SGS ISO 45001:2018', file: `${TD_UVA}/Test Certificates/SGS_ISO Certificate/United Acoustic_SGS_ISO 45001_2018_INBAR_000743_EN.pdf`, kind: 'pdf', group: 'ISO / Management' },
    // Health / heavy metals
    { title: 'Anti-Fungal — 12 mm', file: `${TD_UVA}/Test Certificates/Anti-Fungal - Certificate/Recycled Colored Polyester Fiber Acoustic Panel 12 mm (1).pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'Anti-Fungal — 9 mm', file: `${TD_UVA}/Test Certificates/Anti-Fungal - Certificate/Recycled Colored Polyester Fiber Acoustic Panel 9 mm (1).pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'HD PET — VOC', file: `${TD_UVA}/Test Certificates/HD PET - VOC/UNITED ACOUSTIC PRIVATE LIMITED -B2506311.pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'RoHS Heavy Metals — Report 1', file: `${TD_UVA}/Test Certificates/ROHS - Heavy Metal Test Report (All products)/CHNSL250051020.pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'RoHS Heavy Metals — Report 2', file: `${TD_UVA}/Test Certificates/ROHS - Heavy Metal Test Report (All products)/CHNSL250052010.pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'RoHS Heavy Metals — Report 3', file: `${TD_UVA}/Test Certificates/ROHS - Heavy Metal Test Report (All products)/CHNSL250052011.pdf`, kind: 'pdf', group: 'Health & Emissions' },
    { title: 'PET Wool — Formaldehyde', file: `${TD_UVA}/Test Certificates/PET Wool - Formanldyhyde/Formanldyhyde.pdf`, kind: 'pdf', group: 'Health & Emissions' },
    // Color & physical
    { title: 'Color Fastness — UNIVIC 40 mm', file: `${TD_UVA}/Test Certificates/Color Fastness/UNIVIC Acoustic Panels 40mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Color Fastness — Unizen HD 12 mm', file: `${TD_UVA}/Test Certificates/Color Fastness/UNIZEN HD PET Acoustic Panels 12 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Flexural Properties — Unizen HD 12 mm', file: `${TD_UVA}/Test Certificates/Flexural Properties/UNIZEN HD PET Acoustic Panels 12 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Flexural Properties — Unizen HD 25 mm', file: `${TD_UVA}/Test Certificates/Flexural Properties/UNIZEN HD PET Acoustic Panels 25 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Thermal Conductivity — 12 mm PET', file: `${TD_UVA}/Test Certificates/Thermal Conductivity/Recycled Colored Polyester Fiber Acoustic Panel 12 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Thermal Conductivity — 9 mm PET', file: `${TD_UVA}/Test Certificates/Thermal Conductivity/Recycled Colored Polyester Fiber Acoustic Panel 9 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Thermal Conductivity — Unizen HD 12 mm', file: `${TD_UVA}/Test Certificates/Thermal Conductivity/UNIZEN HD PET Acoustic Panels 12 mm.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'PET Wool — Thermal Conductivity', file: `${TD_UVA}/Test Certificates/PET Wool - Thermal Conductivity/Thermal Conductivity.pdf`, kind: 'pdf', group: 'Physical Properties' },
    { title: 'Univic Strip — Weather Test', file: `${TD_UVA}/Test Certificates/Univic Strip -  Weather Test/B2505814- Weather Test.pdf`, kind: 'pdf', group: 'Physical Properties' },
    // NRC
    { title: 'NRC — Panel 9 mm (1700 GSM)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 9mm - 1700 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 9 mm + 25 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 9mm + 25 mm Air Gap - 1700 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 9 mm + 50 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 9mm + 50mm Air Gap - 1700 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 12 mm (2460 GSM)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 12mm - 2460 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 12 mm + 25 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 12mm + 25 mm Air Gap - 2460 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 12 mm + 50 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 12mm + 50mm Air Gap - 2460 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 20 mm (3150 GSM)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 20mm - 3150 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 20 mm + 25 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Acoustic Panel 20mm + 25mm Air Gap - 3150 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 25 mm (3600 GSM)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Recycled Colored Polyster Fiber Panel 25mm - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 25 mm + 25 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Recycled Colored Polyster Fiber Panel 25mm + 25mm Air Gap - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Panel 25 mm + 50 mm gap', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Recycled Colored Polyster Fiber Panel 25mm + 50mm Air Gap - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 9 mm (Printed)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD Panel 9mm (Printed) - 1650 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 9 mm + 25 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 9mm + 25mm Air Gap with Pet Wool (Printed) - 1650 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 9 mm + 50 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD Panel 9mm + 50mm Air Gap with Pet Wool (Printed) - 1650 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 12 mm (Printed)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 12mm (Printed) - 2400 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 12 mm + 25 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 12mm + 25mm Air Gap with Pet Wool (Printed) - 2400 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 12 mm + 50 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 12mm + 50mm Air Gap with Pet Wool (Printed) - 2400 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 25 mm (Printed)', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 25mm (Printed) - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 25 mm + 25 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 25mm + 25mm Air Gap with Pet Wool (Printed) - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — Unizen HD 25 mm + 50 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/Unizen HD  Panel 25mm + 50mm Air Gap with Pet Wool (Printed) - 3600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — UniVic Fluted 9 mm', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/UniVic Fluted Panel 9mm - 1600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — UniVic Fluted 9 mm + 25 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/UniVic Fluted Panel 9mm + 25mm Air Gap with Pet Wool - 1600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — UniVic Fluted 9 mm + 50 mm gap + wool', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/UniVic Fluted Panel 9mm + 50mm Air Gap with Pet Wool - 1600 GSM.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    { title: 'NRC — NVH Consolidated', file: `${TD_UVA}/Test Certificates/NRC-Noise Reduction Coefficient/NVH31000215032024-250217.pdf`, kind: 'pdf', group: 'NRC Test Reports' },
    // STL
    { title: 'STL — Acoustic Panel 12 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/Acoustic Panel 12mm - 2700 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' },
    { title: 'STL — Acoustic Panel 20 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/Acoustic Panel 20mm - 3500 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' },
    { title: 'STL — Unizen HD 9 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/Unizen HD Panel 9mm (Printed) - 1650 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' },
    { title: 'STL — Unizen HD 12 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/Unizen HD  Panel 12mm (Printed) - 2400 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' },
    { title: 'STL — Unizen HD 25 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/Unizen HD  Panel 25mm (Printed) - 3600 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' },
    { title: 'STL — UniVic Fluted 9 mm', file: `${TD_UVA}/Test Certificates/STL-Sound Transmission Class/UniVic Fluted Panel 9mm - 1600 GSM.pdf`, kind: 'pdf', group: 'STL / STC Reports' }
  ],
  'uva-6': [
    { title: 'SOP — VMT Panel Installation', file: `${TD_UVA}/SOP/SOP VMT Panel Installation.pdf`, kind: 'pdf', group: 'Installation SOPs' },
    { title: 'SOP — Installation of PET Boards (rev 01)', file: `${TD_UVA}/SOP/SOP- Installation of PET boards rev01.docx`, kind: 'doc', group: 'Installation SOPs' },
    { title: 'SOP — Grooving & Finishing', file: `${TD_UVA}/SOP/SOP-Grooving & Finishing.pdf`, kind: 'pdf', group: 'Production SOPs' },
    { title: 'CNC Grooving — Production Considerations', file: `${TD_UVA}/SOP/CNC grooving - Production Considerations (1).pdf`, kind: 'pdf', group: 'Production SOPs' },
    { title: 'SOP — Shade Variation', file: `${TD_UVA}/SOP/SOP-Shade Variation.pdf`, kind: 'pdf', group: 'Quality SOPs' },
    { title: 'SOP — Thickness Variation', file: `${TD_UVA}/SOP/SOP-Thickness Variation.pdf`, kind: 'pdf', group: 'Quality SOPs' },
    { title: "Do's & Don'ts", file: `${TD_UVA}/SOP/Do's & Don'ts.pdf`, kind: 'pdf', group: 'Handling' },
    { title: 'Handling & Storage Guidelines', file: `${TD_UVA}/SOP/Handling & Storage Guidelines.doc`, kind: 'doc', group: 'Handling' },
    { title: 'Maintenance & Cleaning Guide', file: `${TD_UVA}/SOP/Maintenance and Cleaning Guide.pdf`, kind: 'pdf', group: 'Handling' },
    { title: 'SOP — Dealer Onboarding Process', file: `${TD_UVA}/SOP/SOP__Dealer_Onboarding_Process_-_UniAcoustics.pdf`, kind: 'pdf', group: 'Channel' }
  ],
  'uva-7': [
    { title: 'Digital Catalog (external)', file: 'https://catalog.univicoustic.com/', kind: 'link' }
  ]
};

// Final capstone quizzes per division
window.SEED_CAPSTONES = [
  {
    id: 'cap-unitile', division: 'unitile',
    title: 'Unitile Capstone Assessment',
    summary: 'Comprehensive 15-question assessment across all 5 Unitile chapters. Required to unlock your certificate.',
    passingScore: 75,
    questions: [
      { q: 'The core purpose of an RAF is to:', type: 'mcq',
        options: ['Insulate the building', 'Create an accessible service plenum under the floor', 'Reduce slab thickness', 'Act as a vapor barrier'],
        correct: 1 },
      { q: 'Calcium-sulphate panels are preferred for:', type: 'mcq',
        options: ['Residential bedrooms', 'Heavy-load data centers', 'Outdoor patios', 'Swimming pool decks'], correct: 1 },
      { q: 'In an open-office RAF install, grid layout typically starts from:', type: 'mcq',
        options: ['A random corner', 'Center or longest straight wall', 'The doorway', 'The electrical room'], correct: 1 },
      { q: 'Which accessory seals cable cut-outs while allowing cables to pass?', type: 'mcq',
        options: ['Air plug', 'Grommet', 'Bridge', 'Ramp shoe'], correct: 1 },
      { q: 'UFlex Extreme is designed for:', type: 'mcq',
        options: ['Dry offices', 'Humid / cleanroom environments', 'Residential', 'Toilets only'], correct: 1 },
      { q: 'Concentrated load is tested on a … pad.', type: 'mcq',
        options: ['10×10 mm', '25×25 mm', '50×50 mm', '100×100 mm'], correct: 1 },
      { q: 'IS 12777 is the … standard for RAF.', type: 'mcq',
        options: ['US', 'UK', 'Indian', 'Japanese'], correct: 2 },
      { q: 'Stringers are mandatory above approximately what floor height?', type: 'mcq',
        options: ['100 mm', '300 mm', '800 mm', 'Never'], correct: 1 },
      { q: 'Typical target ESD surface resistance is:', type: 'mcq',
        options: ['10²–10⁴ Ω', '10⁶–10⁹ Ω', '10¹²–10¹⁴ Ω', 'Zero'], correct: 1 },
      { q: 'Low-Flange-Width panels are chosen for:', type: 'mcq',
        options: ['Maximum load', 'Flush aesthetic, minimal visible gridlines', 'Cleanrooms only', 'Outdoor use'], correct: 1 },
      { q: 'A Vision Glass Panel is typically placed in:', type: 'mcq',
        options: ['Server hall', 'Lobby/demo area', 'Restroom', 'Warehouse'], correct: 1 },
      { q: 'Data-center airflow efficiency demands bypass airflow under what %?', type: 'mcq',
        options: ['50%', '25%', '5%', '0%'], correct: 2 },
      { q: 'Pedestals adhere to slab with:', type: 'mcq',
        options: ['Hot glue', 'Specified structural adhesive', 'Tape', 'Screws only'], correct: 1 },
      { q: 'A trading-floor buyer values:', type: 'mcq',
        options: ['Cheapest panel', 'Rapid reconfiguration', 'Wallpaper finish', 'Non-removable floor'], correct: 1 },
      { q: 'ASTM E580 relates to:', type: 'mcq',
        options: ['Acoustic testing', 'Seismic restraint of raised floors', 'Fire propagation', 'Paint'], correct: 1 }
    ]
  },
  {
    id: 'cap-univic', division: 'univicoustic',
    title: 'UniVicoustic Capstone Assessment',
    summary: 'Comprehensive 15-question assessment across all 7 UniVicoustic modules. Required for certification.',
    passingScore: 75,
    questions: [
      { q: 'NRC is the average α at which 4 frequencies?', type: 'mcq',
        options: ['125, 250, 500, 1000 Hz', '250, 500, 1000, 2000 Hz', '500, 1000, 2000, 4000 Hz', '1000, 2000, 4000, 8000 Hz'], correct: 1 },
      { q: 'Which assembly reaches NRC ≈ 1.00?', type: 'mcq',
        options: ['9 mm direct-mount', '12 mm direct-mount', '25 mm + 50 mm air gap + PET wool', 'VMT wallpaper alone'], correct: 2 },
      { q: 'Sound is a:', type: 'mcq',
        options: ['Transverse wave', 'Longitudinal mechanical wave', 'Electromagnetic wave', 'Nuclear phenomenon'], correct: 1 },
      { q: 'ISO 354 is the test method for:', type: 'mcq',
        options: ['Fire', 'Sound absorption (reverberation room)', 'Transmission loss', 'Heavy metals'], correct: 1 },
      { q: 'Woodscape consists of:', type: 'mcq',
        options: ['Plain wood', 'MDF with micro-perforation + PET wool backing', 'Metal only', 'Gypsum'], correct: 1 },
      { q: 'A branded reception wall is best delivered by:', type: 'mcq',
        options: ['Plain PET panel', 'Unizen HD Printed Panels / Bespoke Graphics', 'Metal grille', 'Concrete tiles'], correct: 1 },
      { q: 'GreenPro is issued by:', type: 'mcq',
        options: ['USGBC', 'CII-IGBC', 'BIS', 'UL'], correct: 1 },
      { q: 'αw Class A requires αw ≥ ?', type: 'mcq',
        options: ['0.30', '0.60', '0.90', '1.00'], correct: 2 },
      { q: 'For a curved pillar, specify:', type: 'mcq',
        options: ['Rigid 25 mm PET', 'VMT wallpaper on PET backing', 'Steel sheet', 'Concrete render'], correct: 1 },
      { q: 'PET wool behind a panel mainly boosts:', type: 'mcq',
        options: ['High-frequency absorption', 'Low-frequency absorption', 'STC', 'Fire rating'], correct: 1 },
      { q: 'Ombre is best described as:', type: 'mcq',
        options: ['Uniform color panels', 'Gradient-coloured grooved panels', 'Wallpaper', 'Wood flooring'], correct: 1 },
      { q: 'CNC groove depth should stay ≤ … of board thickness.', type: 'mcq',
        options: ['0.1×', '0.3×', '0.7×', '1.0×'], correct: 2 },
      { q: 'For maximum shade uniformity:', type: 'mcq',
        options: ['Mix batches', 'Use single batch + dry-lay', 'Spray paint on site', 'Order from two suppliers'], correct: 1 },
      { q: 'The catalog line best suited for a 300-seat auditorium is:', type: 'mcq',
        options: ['Uni-VicStrip', 'Fabric System', 'Bespoke Graphics', 'Ombre'], correct: 1 },
      { q: 'EPD stands for:', type: 'mcq',
        options: ['Electrical Plumbing Design', 'Environmental Product Declaration', 'Emission Preparation Data', 'End-Product Datasheet'], correct: 1 }
    ]
  }
];
