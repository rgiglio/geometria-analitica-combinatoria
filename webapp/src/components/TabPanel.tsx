import { useState, type ReactNode } from 'react'

const TAB_ICONS = ['📖', '🔬', '✏️', '✅']
const TAB_LABELS = ['Teoria', 'Simulador', 'Exercícios', 'Gabarito']

interface Props {
  tabs: ReactNode[]
}

export function TabPanel({ tabs }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-6 gap-1">
        {TAB_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-t-lg transition-colors ${
              active === i
                ? 'bg-white text-indigo-700 border-b-2 border-indigo-600 -mb-px'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{TAB_ICONS[i]}</span>
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-[400px]">{tabs[active]}</div>
    </div>
  )
}
