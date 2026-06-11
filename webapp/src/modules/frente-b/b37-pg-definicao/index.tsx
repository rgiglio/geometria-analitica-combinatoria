import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Progressão Geométrica — Definição, Classificação e Termo Geral
      </h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Definição</h4>
        <p className="text-gray-800 leading-relaxed">
          <strong>Progressão Geométrica (PG)</strong> é toda sequência numérica em que cada termo, a
          partir do segundo, é obtido <strong>multiplicando-se</strong> uma constante{' '}
          <M tex="q" /> (≠ 0) ao termo anterior. Essa constante é a <strong>razão</strong> da PG.
        </p>
        <M tex="a_{n+1} = a_n \cdot q \quad \Longrightarrow \quad q = \frac{a_{n+1}}{a_n}" display />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-2">Exemplo</h4>
        <p className="text-gray-700 mb-2">
          A sequência <M tex="(3,\; 6,\; 12,\; 24,\; 48,\; \ldots)" /> é uma PG de razão{' '}
          <M tex="q = 2" />:
        </p>
        <M tex="\frac{6}{3} = 2, \quad \frac{12}{6} = 2, \quad \frac{24}{12} = 2" display />
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Classificação</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-1">PG Crescente</h4>
          <p className="text-gray-700 text-sm mb-2">
            <M tex="q > 1" /> e <M tex="a_1 > 0" />, ou <M tex="0 < q < 1" /> e <M tex="a_1 < 0" />
          </p>
          <p className="text-gray-600 text-sm">Ex: <M tex="(2,\; 6,\; 18,\; 54,\; \ldots)" /> com <M tex="q = 3" /></p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-1">PG Decrescente</h4>
          <p className="text-gray-700 text-sm mb-2">
            <M tex="0 < q < 1" /> e <M tex="a_1 > 0" />, ou <M tex="q > 1" /> e <M tex="a_1 < 0" />
          </p>
          <p className="text-gray-600 text-sm">Ex: <M tex="(81,\; 27,\; 9,\; 3,\; \ldots)" /> com <M tex="q = \frac{1}{3}" /></p>
        </div>
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h4 className="font-bold text-gray-700 mb-1">PG Constante</h4>
          <p className="text-gray-700 text-sm mb-2"><M tex="q = 1" /></p>
          <p className="text-gray-600 text-sm">Ex: <M tex="(5,\; 5,\; 5,\; 5,\; \ldots)" /></p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-bold text-purple-800 mb-1">PG Alternada</h4>
          <p className="text-gray-700 text-sm mb-2"><M tex="q < 0" /></p>
          <p className="text-gray-600 text-sm">Ex: <M tex="(2,\; -4,\; 8,\; -16,\; \ldots)" /> com <M tex="q = -2" /></p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Termo Geral</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Fórmula do Termo Geral</h4>
        <M tex="a_n = a_1 \cdot q^{\,n-1}" display />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Derivação</h4>
        <M
          tex={`\\begin{aligned}
a_2 &= a_1 \\cdot q \\\\
a_3 &= a_1 \\cdot q^2 \\\\
a_4 &= a_1 \\cdot q^3 \\\\
&\\;\\vdots \\\\
a_n &= a_1 \\cdot q^{n-1}
\\end{aligned}`}
          display
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Observação</h4>
        <p className="text-gray-700">
          Em função de qualquer termo <M tex="a_k" /> conhecido:
        </p>
        <M tex="a_n = a_k \cdot q^{\,n-k}" display />
      </div>
    </div>
  )
}

function Simulador() {
  const [a1, setA1] = useState(2)
  const [q, setQ] = useState(2)
  const [nCalc, setNCalc] = useState(8)

  const terms = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => a1 * Math.pow(q, i))
  }, [a1, q])

  const classification =
    q === 1
      ? 'Constante'
      : q < 0
      ? 'Alternada'
      : (q > 1 && a1 > 0) || (q > 0 && q < 1 && a1 < 0)
      ? 'Crescente'
      : 'Decrescente'

  const classColor =
    classification === 'Crescente'
      ? 'text-green-600'
      : classification === 'Decrescente'
      ? 'text-red-600'
      : classification === 'Alternada'
      ? 'text-purple-600'
      : 'text-gray-500'

  const an = a1 * Math.pow(q, nCalc - 1)
  const maxAbs = Math.max(...terms.map(Math.abs), 1)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Simulador de PG</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="a_1" /> (primeiro termo)
          </label>
          <input
            type="number"
            value={a1}
            onChange={(e) => setA1(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="q" /> (razão)
          </label>
          <input
            type="number"
            step="0.1"
            value={q}
            onChange={(e) => setQ(Number(e.target.value) || 1)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Classificação:</span>
        <span className={`font-bold text-lg ${classColor}`}>{classification}</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Primeiros 10 termos</h4>
        <div className="flex items-end gap-2 h-48">
          {terms.map((val, i) => {
            const height = (Math.abs(val) / maxAbs) * 100
            const isNeg = val < 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] text-gray-600 mb-1 font-mono">{val.toFixed(2)}</span>
                <div
                  className={`w-full rounded-t opacity-80 ${isNeg ? 'bg-red-400' : 'bg-indigo-500'}`}
                  style={{ height: `${Math.max(height, 2)}%` }}
                />
                <span className="text-[10px] text-gray-400 mt-1">
                  <M tex={`a_{${i + 1}}`} />
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
        <h4 className="font-semibold text-indigo-800 mb-3">
          Calcular <M tex="a_n" />
        </h4>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm font-medium text-gray-700"><M tex="n =" /></label>
          <input
            type="number"
            min={1}
            value={nCalc}
            onChange={(e) => setNCalc(Math.max(1, Number(e.target.value)))}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 outline-none"
          />
        </div>
        <M
          tex={`a_{${nCalc}} = ${a1} \\cdot (${q})^{${nCalc - 1}} = ${an.toFixed(4)}`}
          display
        />
      </div>
    </div>
  )
}

function Exercicios() {
  return (
    <Quiz total={4}>
      <QuizCard
        id={1}
        statement={
          <span>
            Escreva os cinco primeiros termos das PGs:{' '}
            <strong>a)</strong> <M tex="a_1 = 3" />, <M tex="q = 2" />.{' '}
            <strong>b)</strong> <M tex="a_1 = 81" />, <M tex="q = \frac{1}{3}" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> <M tex="(3,\; 6,\; 12,\; 24,\; 48)" /></p>
            <p><strong>b)</strong> <M tex="(81,\; 27,\; 9,\; 3,\; 1)" /></p>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Dada a PG <M tex="(2,\; 6,\; 18,\; \ldots)" />, determine o 8° termo.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="q = \frac{6}{2} = 3" display />
            <M tex="a_8 = 2 \cdot 3^{7} = 2 \cdot 2187 = 4374" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Dada a PG <M tex="(x,\; 2x,\; 4x,\; \ldots)" /> com <M tex="x \neq 0" />, determine{' '}
            <M tex="x" /> e <M tex="q" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="q = \frac{2x}{x} = 2" display />
            <p>A sequência é <M tex="(x,\; 2x,\; 4x,\; 8x,\; \ldots)" /> para qualquer <M tex="x \neq 0" />.</p>
            <p>Se a PG for <M tex="(1,\; 2,\; 4,\; \ldots)" />, então <M tex="x = 1" /> e <M tex="q = 2" />.</p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Uma PG tem <M tex="a_3 = 12" /> e <M tex="a_5 = 48" />. Determine <M tex="a_1" /> e{' '}
            <M tex="q" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="a_5 = a_3 \cdot q^2 \Rightarrow 48 = 12 \cdot q^2 \Rightarrow q^2 = 4" display />
            <M tex="q = 2 \text{ ou } q = -2" display />
            <M tex="a_1 = \frac{a_3}{q^2} = \frac{12}{4} = 3" display />
          </div>
        }
      />
    </Quiz>
  )
}

function Gabarito() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Exercícios Complementares</h3>

      <ExerciseCard
        number={1}
        solution={
          <div className="space-y-2">
            <M tex="q = \frac{1}{2}" display />
            <M tex="a_6 = 64 \cdot \left(\frac{1}{2}\right)^5 = 64 \cdot \frac{1}{32} = 2" display />
          </div>
        }
      >
        Qual o 6° termo da PG <M tex="(64,\; 32,\; 16,\; \ldots)" />?
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="a_4 = a_1 \cdot q^3 = 54 \Rightarrow a_1 \cdot 27 = 54 \Rightarrow a_1 = 2" display />
            <M tex="a_7 = 2 \cdot 3^6 = 2 \cdot 729 = 1458" display />
          </div>
        }
      >
        Uma PG tem <M tex="a_4 = 54" /> e <M tex="q = 3" />. Calcule <M tex="a_7" />.
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="a_5 = a_1 \cdot q^4 = 160 \Rightarrow 10 \cdot q^4 = 160 \Rightarrow q^4 = 16" display />
            <M tex="q = 2 \text{ ou } q = -2" display />
          </div>
        }
      >
        Dada a PG <M tex="(10,\; \ldots,\; 160)" /> com 5 termos, determine a razão.
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <p>PG decrescente: <M tex="q = \frac{1}{2}" /></p>
            <M tex="a_1 = 256,\; a_2 = 128,\; a_3 = 64,\; a_4 = 32,\; a_5 = 16" display />
          </div>
        }
      >
        Interpole 3 meios geométricos entre 256 e 16.
      </ExerciseCard>

      <ExerciseCard
        number={5}
        solution={
          <div className="space-y-2">
            <M tex="a_n = 5 \cdot 2^{n-1}" display />
            <M tex="a_{10} = 5 \cdot 2^9 = 5 \cdot 512 = 2560" display />
          </div>
        }
      >
        Escreva o termo geral da PG <M tex="(5,\; 10,\; 20,\; 40,\; \ldots)" /> e calcule{' '}
        <M tex="a_{10}" />.
      </ExerciseCard>
    </div>
  )
}

export default function B37_PG_Definicao() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
