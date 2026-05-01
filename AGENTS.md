<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Resume project workflow

This repository is both a small Next.js app and a resume-generation workspace. Treat Markdown files as the source of truth and generated HTML/PDF files as build artifacts.

## Project structure

```text
resumes/
  base/
    resume.md          ← canonical base resume Markdown
    build-html.mjs     ← base HTML builder
  applications/
    kestra/
      kestra-resume.md        ← Kestra-tailored resume Markdown
      kestra-build-html.mjs   ← Kestra HTML builder
generated/
  base/
    resume.html
    resume.pdf
  kestra/
    resume.html
    resume.pdf
scripts/
  generate-pdf.mjs     ← shared Puppeteer PDF converter
```

Do not manually edit generated HTML/PDF files. Update the Markdown and/or the relevant builder script, then regenerate.

## How to generate the base resume

From the repository root:

```zsh
node resumes/base/build-html.mjs
node scripts/generate-pdf.mjs base
```

This produces:

```text
generated/base/resume.html
generated/base/resume.pdf
```

## How to generate the Kestra resume

From the repository root:

```zsh
node resumes/applications/kestra/kestra-build-html.mjs
node scripts/generate-pdf.mjs kestra
```

This produces:

```text
generated/kestra/resume.html
generated/kestra/resume.pdf
```

After generation, verify the PDF is valid and ideally one page:

```zsh
file generated/kestra/resume.pdf
```

If `pdfinfo` is available:

```zsh
pdfinfo generated/kestra/resume.pdf | grep '^Pages:'
```

## Adding a new application

Use lowercase kebab-case slugs, e.g. `kestra`, `acme-platform-lead`, `datadog-backend`.

1. Create the tailored Markdown source:

   ```text
   resumes/applications/<slug>/<slug>-resume.md
   ```

2. Start from the base resume and tailor only what matters for the role:

   - Profile summary.
   - Skills/keywords.
   - Most relevant bullets in recent roles.
   - Emphasis/bold text in the HTML output.

3. Create a static builder:

   ```text
   resumes/applications/<slug>/<slug>-build-html.mjs
   ```

   Use `resumes/applications/kestra/kestra-build-html.mjs` as the template. Copy the reviewed Markdown content into the HTML structure, then tune emphasis (`<strong>...</strong>`) and line length for readability. Set `root = join(__dirname, '../../..')` to point to the project root.

4. The builder should write:

   ```text
   generated/<slug>/resume.html
   ```

5. Generate the PDF with:

   ```zsh
   node scripts/generate-pdf.mjs <slug>
   ```

6. Verify readability and page count. Prefer shortening copy over shrinking fonts/spacing.

## Readability and layout rules

- Keep the visual style close to `resumes/base/build-html.mjs` unless there is a strong reason to diverge.
- Prefer one-page PDFs for applications.
- If the PDF overflows, first shorten bullets/profile text.
- Avoid aggressive font-size or line-height reductions; they make the resume harder to read.
- Use `<strong>...</strong>` selectively in HTML bullets for high-signal terms only.
- Preserve truthful wording. Do not claim exact technologies, open-source status, or responsibilities unless supported by the Markdown/source experience.


