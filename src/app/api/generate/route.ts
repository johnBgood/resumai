import Anthropic from '@anthropic-ai/sdk'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const client = new Anthropic()

const THEME_PROMPTS: Record<string, string> = {
  minimal:
    'Clean and minimal design. Use a white background, simple typography with a single accent color (slate blue), generous whitespace, and subtle horizontal rules to separate sections. No decorative elements.',
  modern:
    'Modern and bold design. Use a dark header with white text, a strong accent color (teal or emerald), clean grid layout, and icon-like bullet markers. Professional and eye-catching.',
  creative:
    'Creative and distinctive design. Use a sidebar layout with a colored left panel (deep purple or navy) for contact/skills info, and the right for experience. Mix font weights boldly. Memorable but still professional.',
}

export async function POST(request: Request) {
  const { theme } = (await request.json()) as { theme: string }

  if (!THEME_PROMPTS[theme]) {
    return Response.json({ error: 'Unknown theme' }, { status: 400 })
  }

  const markdown = readFileSync(join(process.cwd(), 'resume.md'), 'utf-8')

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    system: `You are an expert resume designer. Given a resume in Markdown, produce a single self-contained HTML file with embedded CSS that looks like a polished, print-ready resume PDF page.

Rules:
- Return ONLY the complete HTML document — no explanation, no markdown fences, no commentary
- The HTML must be fully self-contained with all CSS embedded in a <style> tag
- Use a standard A4 page size (210mm × 297mm) as the root container
- Do NOT use external fonts or images
- Use web-safe fonts or system fonts only (e.g. Georgia, Arial, system-ui)
- Ensure good print fidelity: no background colors that bleed, proper margins
- The design should look professional enough to send to a top-tier company`,
    messages: [
      {
        role: 'user',
        content: `Design style: ${THEME_PROMPTS[theme]}

Resume content (Markdown):
${markdown}`,
      },
    ],
  })

  const html =
    message.content[0].type === 'text' ? message.content[0].text : ''

  const generatedDir = join(process.cwd(), 'generated')
  mkdirSync(generatedDir, { recursive: true })
  writeFileSync(join(generatedDir, `resume-${theme}.html`), html, 'utf-8')

  return Response.json({ html })
}
