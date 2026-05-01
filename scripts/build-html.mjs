import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const theme = process.argv[2] ?? 'minimal'

const photoB64 = readFileSync(join(root, 'public/photo.jpeg')).toString('base64')
const photoSrc = `data:image/jpeg;base64,${photoB64}`

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
    font-size: 9pt;
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
    padding: 10mm 7mm 10mm 7mm;
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    font-size: 7.5pt;
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
    font-size: 7.5pt;
    padding: 2px 7px;
    border-radius: 10px;
    margin: 2px 2px 0 0;
    border: 1px solid rgba(74,144,217,0.35);
  }

  /* ─── MAIN ────────────────────────────────── */
  .main {
    flex: 1;
    padding: 10mm 10mm 8mm 9mm;
    display: flex;
    flex-direction: column;
    gap: 9px;
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
    font-size: 8.5pt;
    color: var(--text-soft);
    line-height: 1.55;
  }

  .job { margin-bottom: 7px; }
  .job:last-child { margin-bottom: 0; }

  .job-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1px;
  }

  .job-title {
    font-size: 9.5pt;
    font-weight: 700;
    color: var(--text);
  }

  .job-company { color: var(--accent); }

  .job-badge {
    font-size: 7pt;
    color: #fff;
    background: var(--navy-mid);
    padding: 1px 6px;
    border-radius: 8px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .job ul { list-style: none; padding: 0; }

  .job ul li {
    font-size: 8.5pt;
    color: var(--text-soft);
    padding: 0.8px 0 0.8px 11px;
    position: relative;
    line-height: 1.4;
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
    font-size: 9.5pt;
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
        <li><span class="label">Email</span>jonathan.roques@gmail.com</li>
        <li><span class="label">Phone</span>+33 6 37 03 06 64</li>
        <li><span class="label">Born</span>25 November 1985</li>
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
          <span class="job-badge">Feb 2024 – Present · Berlin (remote)</span>
        </div>
        <ul>
          <li>Led P0 Job Worker Dashboard epic (3-person team, ~3 months) — became top committer on Core monorepo despite it not being primary focus</li>
          <li>Achieved 30× CPU reduction and 10× I/O throughput improvement through performance engineering</li>
          <li>Authored approved architecture proposal (Jobs Statistics API, engine-collected metrics); aligned Connectors, Core &amp; Console teams</li>
          <li>Rebuilt release pipeline: automated triggering, test parallelization, flaky retries, Slack observability — near-zero manual steps</li>
          <li>Tech lead for 5 engineers: mentoring, solution design, incident response, cross-team alignment</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Sr. Technical Lead — <span class="job-company">Alva Labs</span></span>
          <span class="job-badge">May 2022 – Feb 2024 · Stockholm (remote)</span>
        </div>
        <ul>
          <li>Resolved engineering-wide issues: developer experience, cross-team processes with design and support</li>
          <li>Created system design interview process, improving hiring quality; worked with Terraform, GKE, PostgreSQL</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Co-founder &amp; CTO — <span class="job-company">Clozzle</span></span>
          <span class="job-badge">Sep 2020 – May 2022 · Toulouse (remote)</span>
        </div>
        <ul>
          <li>Defined and executed product roadmap; built AWS infrastructure (Lambda, EC2, Cognito)</li>
          <li>Developed full stack with Quarkus native (Java, Spring WebFlux)</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Technical Lead — <span class="job-company">Nanolike</span></span>
          <span class="job-badge">Nov 2018 – Sep 2020 · Toulouse (remote)</span>
        </div>
        <ul>
          <li>Designed microservices architecture (Kafka, Docker, AWS); managed team, costing, 1:1s, sprints</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Software Architect — <span class="job-company">Sigfox</span></span>
          <span class="job-badge">Sep 2013 – Nov 2018 · Toulouse</span>
        </div>
        <ul>
          <li>Designed scalable microservices (Java, MongoDB, Prometheus, Grafana) handling 5B metrics/day</li>
          <li>Reduced bandwidth by 50%, increased monitoring capacity ×10; designed and implemented RBAC system</li>
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
