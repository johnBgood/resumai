'use client'

import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FileText, Sparkles, Download, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

const THEMES = [
  { id: 'minimal', label: 'Minimal', description: 'Clean, whitespace-heavy' },
  { id: 'modern', label: 'Modern', description: 'Bold, dark header' },
  { id: 'creative', label: 'Creative', description: 'Sidebar layout' },
] as const

type Theme = (typeof THEMES)[number]['id']

export function ResumeStudio() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>('minimal')
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)

  const { data: resumeData } = useQuery({
    queryKey: ['resume'],
    queryFn: () => axios.get<{ markdown: string }>('/api/resume').then((r) => r.data),
  })

  const generateMutation = useMutation({
    mutationFn: (theme: Theme) =>
      axios.post<{ html: string }>('/api/generate', { theme }).then((r) => r.data),
    onSuccess: (data) => setPreviewHtml(data.html),
  })

  const handleGenerate = () => {
    generateMutation.mutate(selectedTheme)
  }

  const handleDownloadPdf = () => {
    window.open(`/api/pdf?theme=${selectedTheme}`, '_blank')
  }

  const hasGeneratedHtml = !!previewHtml

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <header className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[var(--primary)]" />
          <span className="font-semibold tracking-tight text-[var(--foreground)]">resumai</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            disabled={!hasGeneratedHtml}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              hasGeneratedHtml
                ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90'
                : 'opacity-40 cursor-not-allowed bg-[var(--muted)] text-[var(--muted-foreground)]',
            )}
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r border-[var(--border)] bg-[var(--card)] p-5 flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-3">
              Theme
            </p>
            <div className="flex flex-col gap-2">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-md border transition-all text-sm',
                    selectedTheme === theme.id
                      ? 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]'
                      : 'border-[var(--border)] hover:border-[var(--ring)] text-[var(--foreground)]',
                  )}
                >
                  <div className="font-medium">{theme.label}</div>
                  <div
                    className={cn(
                      'text-xs mt-0.5',
                      selectedTheme === theme.id
                        ? 'text-[var(--primary-foreground)] opacity-70'
                        : 'text-[var(--muted-foreground)]',
                    )}
                  >
                    {theme.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {generateMutation.isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>

            {generateMutation.isError && (
              <p className="text-xs text-red-500 text-center">
                Generation failed. Check your API key.
              </p>
            )}
          </div>

          {resumeData && (
            <div className="mt-auto">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">
                Source
              </p>
              <pre className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)] rounded p-2 overflow-auto max-h-64 whitespace-pre-wrap">
                {resumeData.markdown.slice(0, 300)}…
              </pre>
            </div>
          )}
        </aside>

        <main className="flex-1 overflow-auto bg-[var(--muted)] flex items-start justify-center p-8">
          {previewHtml ? (
            <div className="w-full max-w-[800px] shadow-xl rounded overflow-hidden">
              <iframe
                srcDoc={previewHtml}
                className="w-full h-[1130px] border-0"
                title="Resume preview"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 text-center h-full text-[var(--muted-foreground)]">
              <Sparkles className="w-10 h-10 opacity-30" />
              <p className="text-sm font-medium">Select a theme and click Generate</p>
              <p className="text-xs opacity-60">Claude will produce a styled HTML resume</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
