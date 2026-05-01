import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  const markdown = readFileSync(join(process.cwd(), 'resume.md'), 'utf-8')
  return Response.json({ markdown })
}
