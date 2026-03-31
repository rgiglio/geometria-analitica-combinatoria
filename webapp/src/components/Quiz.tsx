import { useState, createContext, useContext, useCallback, type ReactNode } from 'react'

interface QuizCtx {
  revealed: Set<number>
  answers: Map<number, string>
  grades: Map<number, boolean>
  reveal: (id: number) => void
  setAnswer: (id: number, val: string) => void
  grade: (id: number, correct: boolean) => void
  total: number
}

const Ctx = createContext<QuizCtx>(null!)

interface QuizProps {
  children: ReactNode
  total: number
}

export function Quiz({ children, total }: QuizProps) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [answers, setAnswers] = useState<Map<number, string>>(new Map())
  const [grades, setGrades] = useState<Map<number, boolean>>(new Map())
  const [finished, setFinished] = useState(false)

  const reveal = useCallback((id: number) => {
    setRevealed((prev) => new Set(prev).add(id))
  }, [])

  const setAnswer = useCallback((id: number, val: string) => {
    setAnswers((prev) => new Map(prev).set(id, val))
  }, [])

  const grade = useCallback((id: number, correct: boolean) => {
    setGrades((prev) => new Map(prev).set(id, correct))
  }, [])

  const reset = () => {
    setRevealed(new Set())
    setAnswers(new Map())
    setGrades(new Map())
    setFinished(false)
  }

  const graded = grades.size
  const correct = [...grades.values()].filter(Boolean).length
  const allGraded = graded === total

  return (
    <Ctx.Provider value={{ revealed, answers, grades, reveal, setAnswer, grade, total }}>
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">Exercícios Propostos</h3>
          <div className="flex items-center gap-3">
            {graded > 0 && (
              <span className="text-sm font-semibold text-gray-600">
                {correct}/{graded} correto{correct !== 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={reset}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Recomeçar
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-indigo-500 to-indigo-400"
            style={{ width: `${(graded / total) * 100}%` }}
          />
        </div>

        {children}

        {/* Score card */}
        {(allGraded || finished) && (
          <div className="mt-6 p-6 rounded-xl border-2 border-indigo-200 bg-indigo-50 text-center">
            <div className="text-4xl font-black text-indigo-700 mb-1">
              {correct}/{total}
            </div>
            <p className="text-gray-600 mb-1">
              {correct === total
                ? 'Perfeito! Todos corretos!'
                : correct >= total * 0.7
                ? 'Muito bem! Quase tudo certo.'
                : correct >= total * 0.5
                ? 'Bom, mas revise os erros.'
                : 'Precisa revisar a teoria. Tente de novo!'}
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {Array.from({ length: total }, (_, i) => {
                const g = grades.get(i + 1)
                return (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      g === true
                        ? 'bg-green-500 text-white'
                        : g === false
                        ? 'bg-red-400 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {i + 1}
                  </div>
                )
              })}
            </div>
            <button
              onClick={reset}
              className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!allGraded && graded > 0 && (
          <div className="text-center">
            <button
              onClick={() => setFinished(true)}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Finalizar sem responder tudo
            </button>
          </div>
        )}
      </div>
    </Ctx.Provider>
  )
}

interface QuizCardProps {
  id: number
  statement: ReactNode
  solution: ReactNode
  hint?: string
}

export function QuizCard({ id, statement, solution, hint }: QuizCardProps) {
  const { revealed, answers, grades, reveal, setAnswer, grade } = useContext(Ctx)
  const isRevealed = revealed.has(id)
  const answer = answers.get(id) || ''
  const gradeVal = grades.get(id)

  return (
    <div
      className={`border rounded-xl p-5 bg-white shadow-sm transition-colors ${
        gradeVal === true
          ? 'border-green-300 bg-green-50/30'
          : gradeVal === false
          ? 'border-red-300 bg-red-50/30'
          : 'border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span
          className={`text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 ${
            gradeVal === true
              ? 'bg-green-500'
              : gradeVal === false
              ? 'bg-red-400'
              : 'bg-indigo-600'
          }`}
        >
          {gradeVal === true ? '✓' : gradeVal === false ? '✗' : id}
        </span>
        <div className="flex-1 text-gray-800 leading-relaxed text-[15px]">{statement}</div>
      </div>

      {/* Answer area */}
      {!isRevealed && (
        <div className="ml-11 space-y-3">
          {hint && <p className="text-xs text-gray-400 italic">{hint}</p>}
          <textarea
            value={answer}
            onChange={(e) => setAnswer(id, e.target.value)}
            placeholder="Escreva sua resposta aqui..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 outline-none resize-y min-h-[60px] bg-gray-50"
            rows={2}
          />
          <button
            onClick={() => reveal(id)}
            className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Corrigir
          </button>
        </div>
      )}

      {/* Solution + grading */}
      {isRevealed && (
        <div className="ml-11 space-y-3">
          {answer && (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-semibold text-gray-400 mb-1">Sua resposta:</p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{answer}</p>
            </div>
          )}
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-[15px] leading-relaxed">
            <p className="text-xs font-bold text-indigo-500 mb-2">Resolução</p>
            {solution}
          </div>
          {gradeVal === undefined && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Você acertou?</span>
              <button
                onClick={() => grade(id, true)}
                className="px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-200 transition-colors border border-green-200"
              >
                Sim, acertei
              </button>
              <button
                onClick={() => grade(id, false)}
                className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors border border-red-200"
              >
                Não, errei
              </button>
            </div>
          )}
          {gradeVal !== undefined && (
            <p className={`text-sm font-semibold ${gradeVal ? 'text-green-600' : 'text-red-500'}`}>
              {gradeVal ? '✓ Marcado como correto' : '✗ Marcado como incorreto — revise a teoria!'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
