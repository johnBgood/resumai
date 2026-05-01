<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Resume project workflow

This repository is both a small Next.js app and a resume-generation workspace. Treat Markdown files as the source of truth and generated HTML/PDF files as build artifacts.

## Current source files

- `resume.md` — canonical/base resume Markdown.
- `applications/<slug>/resume.md` — application-specific resume Markdown.
  - Example: `applications/kestra/resume.md`.
- `scripts/build-html.mjs` — builds the base/minimal static HTML resume.
- `scripts/build-html-<slug>.mjs` — builds an application-specific static HTML resume when the HTML needs hand-tuned copy/layout.
  - Example: `scripts/build-html-kestra.mjs`.
- `scripts/generate-pdf.mjs` — converts `generated/resume-<theme>.html` to `generated/resume-<theme>.pdf` using Puppeteer.

## Generated outputs

Generated files live under `generated/` and follow this naming convention:

- Base resume:
  - `generated/resume-minimal.html`
  - `generated/resume-minimal.pdf`
- Application-specific resume:
  - `generated/resume-<slug>.html`
  - `generated/resume-<slug>.pdf`
  - Example: `generated/resume-kestra.html`, `generated/resume-kestra.pdf`.

Do not manually edit generated HTML/PDF files. Update the Markdown and/or the relevant builder script, then regenerate.

## How to generate the base resume

From the repository root:

```zsh
node scripts/build-html.mjs minimal
node scripts/generate-pdf.mjs minimal
```

This produces:

```text
generated/resume-minimal.html
generated/resume-minimal.pdf
```

## How to generate the Kestra resume

From the repository root:

```zsh
node scripts/build-html-kestra.mjs
node scripts/generate-pdf.mjs kestra
```

This produces:

```text
generated/resume-kestra.html
generated/resume-kestra.pdf
```

After generation, verify the PDF is valid and ideally one page:

```zsh
file generated/resume-kestra.pdf
```

If `pdfinfo` is available:

```zsh
pdfinfo generated/resume-kestra.pdf | grep '^Pages:'
```

## Adding a new application

Use lowercase kebab-case slugs, e.g. `kestra`, `acme-platform-lead`, `datadog-backend`.

1. Create the tailored Markdown source:

   ```text
   applications/<slug>/resume.md
   ```

2. Start from the base resume and tailor only what matters for the role:

   - Profile summary.
   - Skills/keywords.
   - Most relevant bullets in recent roles.
   - Emphasis/bold text in the HTML output.

3. If a dedicated HTML/PDF is needed, create a static builder:

   ```text
   scripts/build-html-<slug>.mjs
   ```

   Use `scripts/build-html-kestra.mjs` as the current application-specific template. Copy the reviewed Markdown content into the HTML structure, then tune emphasis (`<strong>...</strong>`) and line length for readability.

4. The builder should write:

   ```text
   generated/resume-<slug>.html
   ```

5. Generate the PDF with:

   ```zsh
   node scripts/generate-pdf.mjs <slug>
   ```

6. Verify readability and page count. Prefer shortening copy over shrinking fonts/spacing.

## Readability and layout rules

- Keep the visual style close to `scripts/build-html.mjs` unless there is a strong reason to diverge.
- Prefer one-page PDFs for applications.
- If the PDF overflows, first shorten bullets/profile text.
- Avoid aggressive font-size or line-height reductions; they make the resume harder to read.
- Use `<strong>...</strong>` selectively in HTML bullets for high-signal terms only.
- Preserve truthful wording. Do not claim exact technologies, open-source status, or responsibilities unless supported by the Markdown/source experience.

## Recommended future cleanup

The current project has a flat `generated/` folder and one-off HTML builders. Keep that working, but if the project grows, move toward this structure:

```text
resumes/
  base/
    resume.md
    build-html.mjs
  applications/
    kestra/
      resume.md
      build-html.mjs
generated/
  base/
    resume.html
    resume.pdf
  kestra/
    resume.html
    resume.pdf
scripts/
  generate-pdf.mjs
```

Do not perform that migration casually: update scripts, app routes, README/docs, and generation commands together. Until then, use the current conventions documented above.

