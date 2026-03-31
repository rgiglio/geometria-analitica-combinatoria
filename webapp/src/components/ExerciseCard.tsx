import { useState, type ReactNode } from 'react'

interface Props {
  number: string | number
  source?: string
  children: ReactNode
  solution?: ReactNode
  alternatives?: { label: string; correct?: boolean }[]
}

export function ExerciseCard({ number, source, children, solution, alternatives }: Props) {
  const [showSolution, setShowSolution] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <span className="bg-indigo-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
          {number}
        </span>
        <div className="flex-1">
          {source && <span className="text-xs font-semibold text-indigo-500 mb-1 block">{source}</span>}
          <div className="text-gray-800 leading-relaxed text-[15px]">{children}</div>
        </div>
      </div>

      {alternatives && (
        <div className="ml-11 space-y-1.5 mb-3">
          {alternatives.map((alt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selected === i
                  ? alt.correct
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {alt.label}
            </button>
          ))}
        </div>
      )}

      {solution && (
        <div className="ml-11">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {showSolution ? '▾ Ocultar resolução' : '▸ Ver resolução'}
          </button>
          {showSolution && (
            <div className="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-[15px] leading-relaxed">
              {solution}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
