import katex from 'katex'
import { useMemo } from 'react'

interface MathProps {
  tex: string
  display?: boolean
  className?: string
}

export function M({ tex, display = false, className = '' }: MathProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, { displayMode: display, throwOnError: false })
    } catch {
      return tex
    }
  }, [tex, display])

  if (display) {
    return <div className={`my-4 overflow-x-auto ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
