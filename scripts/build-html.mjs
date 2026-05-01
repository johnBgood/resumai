import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const theme = process.argv[2] ?? 'minimal'

const photoB64 = readFileSync(join(root, 'public/photo.jpeg')).toString('base64')
const photoSrc = `data:image/jpeg;base64,${photoB64}`

const iconPin = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
const iconGlobe = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
const iconMail = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
const iconPhone = `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
const iconGithub = `<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
const iconLinkedin = `<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block;vertical-align:middle;margin-bottom:1px"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Jonathan Roques — Resume</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #1b2d4f;
    --navy-mid: #243a63;
    --accent: #4a90d9;
    --accent-light: #d6e8f7;
    --text: #1a1a2e;
    --text-soft: #4a4a6a;
    --muted: #8892a4;
    --sidebar-text: rgba(255,255,255,0.92);
    --sidebar-muted: rgba(255,255,255,0.55);
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9.5pt;
    line-height: 1.45;
    color: var(--text);
    background: #fff;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    display: flex;
  }

  /* ─── SIDEBAR ─────────────────────────────── */
  .sidebar {
    width: 68mm;
    background: var(--navy);
    padding: 9mm 7mm 9mm 7mm;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }

  .photo-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
  }

  .photo-wrap img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--accent);
  }

  .sidebar-name {
    text-align: center;
    margin-bottom: 2px;
  }

  .sidebar-name h1 {
    font-size: 13pt;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .sidebar-name .title {
    font-size: 7.5pt;
    color: var(--accent);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 3px;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.12);
    margin: 2px 0;
  }

  .sidebar-section-title {
    font-size: 6.5pt;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 5px;
  }

  .contact-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .contact-list li {
    font-size: 8pt;
    color: var(--sidebar-text);
    line-height: 1.35;
    word-break: break-all;
  }

  .contact-list li .label {
    display: block;
    font-size: 6pt;
    color: var(--sidebar-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1px;
  }

  .skill-tag {
    display: inline-block;
    background: rgba(74,144,217,0.18);
    color: var(--sidebar-text);
    font-size: 8pt;
    padding: 2px 7px;
    border-radius: 10px;
    margin: 2px 2px 0 0;
    border: 1px solid rgba(74,144,217,0.35);
  }

  /* ─── MAIN ────────────────────────────────── */
  .main {
    flex: 1;
    padding: 9mm 9mm 7mm 8mm;
    display: flex;
    flex-direction: column;
    gap: 11px;
  }

  .section-title {
    font-size: 7pt;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: var(--navy);
    margin-bottom: 5px;
    padding-bottom: 3px;
    border-bottom: 2px solid var(--accent-light);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .section-title::before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 10px;
    background: var(--accent);
    border-radius: 2px;
    flex-shrink: 0;
  }

  .profile p {
    font-size: 9pt;
    color: var(--text-soft);
    line-height: 1.6;
  }

  .job { margin-bottom: 9px; }
  .job:last-child { margin-bottom: 0; }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
  }

  .job-title {
    font-size: 10pt;
    font-weight: 700;
    color: var(--text);
  }

  .job-company { color: var(--accent); }

  .job-badge {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 7pt;
    color: #fff;
    background: var(--navy-mid);
    padding: 2px 8px;
    border-radius: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .badge-sep { opacity: 0.35; }

  .badge-item {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  .job-desc {
    font-size: 7.5pt;
    color: var(--muted);
    font-style: italic;
    margin-bottom: 3px;
  }

  .job ul { list-style: none; padding: 0; }

  .job ul li {
    font-size: 9pt;
    color: var(--text-soft);
    padding: 1.5px 0 1.5px 11px;
    position: relative;
    line-height: 1.5;
  }

  .job ul li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 7pt;
    line-height: 1.6;
  }

  .edu-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .edu-degree {
    font-size: 10pt;
    font-weight: 700;
    color: var(--text);
  }

  .edu-period { font-size: 7.5pt; color: var(--muted); }

  .edu-detail {
    font-size: 8.5pt;
    color: var(--text-soft);
    margin-top: 1px;
  }

  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page">

  <aside class="sidebar">

    <div class="photo-wrap">
      <img src="${photoSrc}" alt="Jonathan Roques" />
    </div>

    <div class="sidebar-name">
      <h1>Jonathan Roques</h1>
      <div class="title">Tech Lead</div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Contact</div>
      <ul class="contact-list">
        <li>${iconPin} Toulouse, France <span style="opacity:0.55">(remote only)</span></li>
        <li>${iconMail} jonathan.roques@gmail.com</li>
        <li>${iconPhone} +33 6 37 03 06 64</li>
        <li>${iconGithub} github.com/johnBgood</li>
        <li>${iconLinkedin} linkedin.com/in/jonathan-roques-43941542</li>
      </ul>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Technical</div>
      <div>
        <span class="skill-tag">Micro-services</span>
        <span class="skill-tag">GCP</span>
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">Design patterns</span>
        <span class="skill-tag">System design</span>
      </div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Stack</div>
      <div>
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Spring</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">React</span>
      </div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Languages</div>
      <ul class="contact-list">
        <li>French — Native</li>
        <li>English — Fluent</li>
      </ul>
    </div>

  </aside>

  <main class="main">

    <section class="profile">
      <div class="section-title">Profile</div>
      <p>15+ years in software development and technical leadership. Self-learner with a track record of adapting to complex domains and delivering high-impact systems. Autonomous, production-oriented, and focused on growth. References available upon request.</p>
    </section>

    <section>
      <div class="section-title">Experience</div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Tech Lead — <span class="job-company">Camunda</span></span>
          <span class="job-badge">Feb 2024 – Present <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Berlin</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Workflow automation platform for complex business processes (BPMN/DMN engine at scale)</div>
        <ul>
          <li>Led <strong>P0 Job Worker Dashboard</strong> epic (<strong>3-person team</strong>, ~3 months) — became <strong>top committer on the Core monorepo</strong> despite it not being primary focus</li>
          <li>Achieved <strong>30× CPU reduction</strong> and <strong>10× I/O throughput</strong> improvement through performance engineering</li>
          <li>Authored approved architecture proposal (<strong>Jobs Statistics API</strong>, engine-collected metrics); aligned Connectors, Core &amp; Console teams</li>
          <li>Rebuilt release pipeline: automated triggering, test parallelization, flaky retries — <strong>near-zero manual steps</strong> per release</li>
          <li>Tech lead for <strong>5 engineers</strong>: mentoring, solution design, incident response, cross-team alignment</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Sr. Engineering Manager — <span class="job-company">Alva Labs</span></span>
          <span class="job-badge">May 2022 – Feb 2024 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Stockholm</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Talent assessment SaaS — science-based hiring tools for mid-to-large enterprises</div>
        <ul>
          <li>Resolved engineering-wide issues: <strong>developer experience</strong>, broken cross-team processes with design and support</li>
          <li>Created <strong>system design interview process</strong>, improving hiring quality; worked with Terraform, GKE, PostgreSQL</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Co-founder &amp; Tech Lead — <span class="job-company">Clozzle</span></span>
          <span class="job-badge">Sep 2020 – May 2022 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Real estate SaaS startup — tools for property professionals</div>
        <ul>
          <li>Defined and executed <strong>product roadmap</strong>; built full stack on <strong>AWS</strong> (Lambda, EC2, Cognito) with Quarkus native (Java, Spring WebFlux)</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Tech Lead — <span class="job-company">Nanolike</span></span>
          <span class="job-badge">Nov 2018 – Sep 2020 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">IoT startup — smart sensors for industrial fill-level monitoring (silos, tanks)</div>
        <ul>
          <li>Designed <strong>microservices architecture</strong> (Kafka, Docker, AWS) and built the <strong>monitoring frontend from scratch</strong> — real-time device dashboard with fill-level visualization</li>
          <li>Pioneered the <strong>silo monitoring product line</strong>, which became the company's new core offering</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Software Architect — <span class="job-company">Sigfox</span></span>
          <span class="job-badge">Sep 2013 – Nov 2018 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span></span>
        </div>
        <div class="job-desc">Global IoT network operator — 1B+ connected objects across 70 countries</div>
        <ul>
          <li>Designed scalable microservices (Java, MongoDB, Prometheus, Grafana) handling <strong>5B metrics/day</strong></li>
          <li>Reduced bandwidth by <strong>50%</strong>, increased monitoring capacity <strong>×10</strong>; designed and implemented <strong>RBAC system</strong></li>
        </ul>
      </div>
    </section>

    <section>
      <div class="section-title">Education</div>
      <div class="edu-row">
        <span class="edu-degree">Master's Degree — with distinction</span>
        <span class="edu-period">2003 – 2008</span>
      </div>
      <div class="edu-detail">Robotics, AI &amp; Software Engineering · IUP Paul Sabatier, Toulouse</div>
    </section>

  </main>

</div>
</body>
</html>`

writeFileSync(join(root, 'generated', `resume-${theme}.html`), html)
console.log(`HTML written to generated/resume-${theme}.html`)
