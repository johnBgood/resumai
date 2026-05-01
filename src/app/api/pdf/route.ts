import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import puppeteer from 'puppeteer'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const theme = searchParams.get('theme') ?? 'base'

  // Hand-crafted resumes live under generated/<slug>/resume.html;
  // AI-generated ones use the legacy flat path generated/resume-<theme>.html.
  const slugPath = join(process.cwd(), 'generated', theme, 'resume.html')
  const legacyPath = join(process.cwd(), 'generated', `resume-${theme}.html`)
  const htmlPath = existsSync(slugPath) ? slugPath : legacyPath

  if (!existsSync(htmlPath)) {
    return Response.json(
      { error: 'No saved HTML for this theme. Generate it first.' },
      { status: 404 },
    )
  }

  const html = readFileSync(htmlPath, 'utf-8')

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  })

  await browser.close()

  return new Response(Buffer.from(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="resume-${theme}.pdf"`,
    },
  })
}
