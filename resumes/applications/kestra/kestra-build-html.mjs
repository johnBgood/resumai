import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const photoB64 = readFileSync(join(root, 'public/photo.jpeg')).toString('base64')
const photoSrc = `data:image/jpeg;base64,${photoB64}`
const baseBuilder = readFileSync(join(root, 'scripts/build-html.mjs'), 'utf-8')
const baseStyles = baseBuilder.match(/<style>([\s\S]*?)<\/style>/)?.[1]

if (!baseStyles) {
  throw new Error('Could not extract base resume styles')
}

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
<title>Jonathan Roques — Kestra Resume</title>
<style>
${baseStyles}
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
      <div class="title">Lead Software Engineer</div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Contact</div>
      <ul class="contact-list">
        <li>${iconPin} Toulouse, France <span style="opacity:0.55">(remote only)</span></li>
        <li>${iconMail} jonathan.roques@gmail.com</li>
        <li>${iconPhone} +33637030664</li>
        <li>${iconGithub} github.com/johnBgood</li>
        <li>${iconLinkedin} linkedin.com/in/jonathan-roques-43941542</li>
      </ul>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Technical</div>
      <div>
        <span class="skill-tag">Orchestration</span>
        <span class="skill-tag">Java platforms</span>
        <span class="skill-tag">Distributed systems</span>
        <span class="skill-tag">APIs</span>
        <span class="skill-tag">Kubernetes</span>
        <span class="skill-tag">Docker</span>
        <span class="skill-tag">Kafka</span>
        <span class="skill-tag">Terraform</span>
        <span class="skill-tag">CI/CD</span>
        <span class="skill-tag">Observability</span>
        <span class="skill-tag">GCP</span>
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">Source-available</span>
      </div>
    </div>

    <div class="divider"></div>

    <div>
      <div class="sidebar-section-title">Stack</div>
      <div>
        <span class="skill-tag">Java</span>
        <span class="skill-tag">Spring</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">React</span>
        <span class="skill-tag">Python</span>
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
      <p>Hands-on Lead Software Engineer with 15+ years building Java-based distributed systems and platform products. Recent workflow automation/orchestration experience at Camunda, including public/source-available platform contributions. Strong track record in performance engineering, CI/CD automation, observability, mentoring, and translating product/customer needs into simple, scalable solutions.</p>
    </section>

    <section>
      <div class="section-title">Experience</div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Tech Lead, Engineering — <span class="job-company">Camunda</span></span>
          <span class="job-badge">Feb 2024 – Present <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Berlin</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Workflow automation platform with public/source-available components for complex business processes (BPMN/DMN engine at scale)</div>
        <ul>
          <li>Led <strong>P0 Job Worker Dashboard</strong> delivery across Connectors, Core, and Console (<strong>3-person team</strong>, ~3 months) — shipped ahead of commitment; became <strong>top committer on the public/source-available Core monorepo</strong></li>
          <li>Achieved <strong>30× CPU reduction</strong> and <strong>10× I/O throughput</strong> improvement through targeted performance engineering on a critical epic</li>
          <li>Authored approved architecture proposal (<strong>Jobs Statistics API</strong>, engine-collected metrics); led scalability and performance trade-off discussions</li>
          <li>Rebuilt Connectors release pipeline: automated triggering, test parallelization, flaky retries, milestone management, and Slack observability — <strong>near-zero manual intervention</strong></li>
          <li>Tech lead for <strong>5 engineers</strong>: code reviews, mentoring, solution design, incident support, and Product/engineering alignment</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Sr. Engineering Manager — <span class="job-company">Alva Labs</span></span>
          <span class="job-badge">May 2022 – Feb 2024 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Stockholm</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Talent assessment SaaS platform — science-based hiring tools for mid-to-large enterprises</div>
        <ul>
          <li>Led a team of <strong>5 engineers</strong> while staying close to product delivery, technical trade-offs, and execution quality</li>
          <li>Led delivery of <strong>Structured Interviews</strong> — a major product addition enabling science-based interview frameworks for customers</li>
          <li>Partnered with Product, Design, and Customer Support to improve requirements clarity, cross-team processes, and delivery predictability</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Co-founder &amp; Tech Lead — <span class="job-company">Clozzle</span></span>
          <span class="job-badge">Sep 2020 – May 2022 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">Real estate SaaS startup — tools for property professionals</div>
        <ul>
          <li>Defined and executed the <strong>product roadmap</strong> from 0 to 1; built <strong>AWS</strong> infrastructure and full stack using <strong>Quarkus native</strong> (Java, Spring WebFlux)</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Tech Lead — <span class="job-company">Nanolike</span></span>
          <span class="job-badge">Nov 2018 – Sep 2020 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span> <span class="badge-sep">·</span> <span class="badge-item">${iconGlobe}Remote</span></span>
        </div>
        <div class="job-desc">IoT startup — smart sensors for industrial fill-level monitoring (silos, tanks)</div>
        <ul>
          <li>Designed backend roadmap and <strong>event-driven microservices architecture</strong> (Kafka, Docker, AWS)</li>
          <li>Built the <strong>monitoring frontend from scratch</strong> — real-time device dashboard; pioneered the <strong>silo monitoring product line</strong>, which became the company's new core offering</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-title">Software Architect — <span class="job-company">Sigfox</span></span>
          <span class="job-badge">Sep 2013 – Nov 2018 <span class="badge-sep">·</span> <span class="badge-item">${iconPin}Toulouse</span></span>
        </div>
        <div class="job-desc">Global IoT network operator — 1B+ connected objects across 70 countries</div>
        <ul>
          <li>Designed scalable and highly available Java microservices architecture (MongoDB, Prometheus, Grafana)</li>
          <li>Reduced bandwidth consumption by <strong>50%</strong>, increased device monitoring capacity <strong>×10</strong>, handling up to <strong>5B metrics/day</strong>; designed and implemented RBAC system</li>
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

writeFileSync(join(root, 'generated/resume-kestra.html'), html)
console.log('HTML written to generated/resume-kestra.html')

