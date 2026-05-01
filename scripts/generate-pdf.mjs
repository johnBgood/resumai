import puppeteer from 'puppeteer'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const theme = process.argv[2] ?? 'base'
const htmlPath = join(root, 'generated', theme, `${theme}-resume.html`)
const pdfPath = join(root, 'generated', theme, `${theme}-resume.pdf`)

const html = readFileSync(htmlPath, 'utf-8')

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await browser.close()

console.log(`PDF saved to: ${pdfPath}`)
