import { useState, Suspense, lazy, useMemo, useEffect } from 'react'
import { modules, frentes } from './modules/registry'

function daysUntilExam(): number {
  const exam = new Date(2026, 3, 13) // April 13, 2026
  const now = new Date()
  return Math.max(0, Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
}

function App() {
  const [activeId, setActiveId] = useState(() => localStorage.getItem('gimba-active') || 'a33')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('gimba-fontsize') || '16'))
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('gimba-done') || '[]'))
    } catch { return new Set() }
  })

  useEffect(() => { localStorage.setItem('gimba-active', activeId) }, [activeId])
  useEffect(() => { localStorage.setItem('gimba-fontsize', String(fontSize)) }, [fontSize])
  useEffect(() => { localStorage.setItem('gimba-done', JSON.stringify([...completed])) }, [completed])

  const toggleCompleted = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const ActiveModule = useMemo(() => {
    const mod = modules.find((m) => m.id === activeId)!
    return lazy(mod.component)
  }, [activeId])

  const activeMod = modules.find((m) => m.id === activeId)!
  const currentIdx = modules.findIndex((m) => m.id === activeId)
  const days = daysUntilExam()
  const progress = Math.round((completed.size / modules.length) * 100)

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontSize: `${fontSize}px` }}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-[290px]' : 'w-0'
        } transition-all duration-300 overflow-hidden bg-white border-r border-gray-200 flex flex-col shrink-0`}
      >
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-lg font-bold text-gray-900">Prova 1 — 13/04</h1>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              days <= 3 ? 'bg-red-100 text-red-700' : days <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
            }`}>
              {days === 0 ? 'HOJE!' : `${days} dia${days > 1 ? 's' : ''}`}
            </span>
            <span className="text-xs text-gray-400">{completed.size}/{modules.length} módulos</span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {frentes.map((f) => (
            <div key={f.id} className="mb-4">
              <h3 className={`text-[11px] font-bold uppercase tracking-wider mb-2 px-2 ${f.color}`}>
                {f.label}
              </h3>
              {modules
                .filter((m) => m.frente === f.id)
                .map((m) => (
                  <div key={m.id} className="flex items-center gap-1 mb-0.5">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCompleted(m.id) }}
                      className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center text-xs transition-colors ${
                        completed.has(m.id)
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      title={completed.has(m.id) ? 'Marcar como pendente' : 'Marcar como concluído'}
                    >
                      {completed.has(m.id) && '✓'}
                    </button>
                    <button
                      onClick={() => setActiveId(m.id)}
                      className={`flex-1 text-left px-2 py-1.5 rounded-lg text-[13px] transition-colors ${
                        activeId === m.id
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : completed.has(m.id)
                          ? 'text-gray-400 line-through hover:bg-gray-50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="font-mono text-[11px] mr-1 opacity-60">{m.code}</span>
                      {m.title}
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </nav>

        {/* Font size controls */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">Fonte</span>
          <div className="flex gap-1">
            {[14, 16, 18, 20].map((size) => (
              <button
                key={size}
                onClick={() => setFontSize(size)}
                className={`w-7 h-7 rounded text-[11px] font-bold transition-colors ${
                  fontSize === size ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-gray-700 text-lg transition-colors"
            title={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {sidebarOpen ? '◀' : '☰'}
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">{activeMod.code}</span>
              <span className="text-[11px] text-gray-400">{activeMod.frenteLabel}</span>
            </div>
            <h2 className="text-lg font-bold text-gray-900">{activeMod.title}</h2>
          </div>
          <button
            onClick={() => toggleCompleted(activeId)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              completed.has(activeId)
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {completed.has(activeId) ? '✓ Concluído' : 'Marcar concluído'}
          </button>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-64 text-gray-400">
                Carregando módulo...
              </div>
            }
          >
            <ActiveModule />
          </Suspense>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
            {currentIdx > 0 ? (
              <button
                onClick={() => { setActiveId(modules[currentIdx - 1].id); window.scrollTo(0, 0) }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                <span>←</span>
                <span>{modules[currentIdx - 1].code}: {modules[currentIdx - 1].title}</span>
              </button>
            ) : <span />}
            {currentIdx < modules.length - 1 ? (
              <button
                onClick={() => { setActiveId(modules[currentIdx + 1].id); window.scrollTo(0, 0) }}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              >
                <span>{modules[currentIdx + 1].code}: {modules[currentIdx + 1].title}</span>
                <span>→</span>
              </button>
            ) : <span />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
