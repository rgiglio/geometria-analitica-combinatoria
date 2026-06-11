import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Progressão Geométrica — Propriedades e Soma de Termos
      </h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">1ª Propriedade — Média Geométrica</h4>
        <p className="text-gray-800 leading-relaxed">
          Cada termo de uma PG (exceto o primeiro e o último) é a <strong>média geométrica</strong>{' '}
          dos seus vizinhos:
        </p>
        <M tex="a_n = \sqrt{a_{n-1} \cdot a_{n+1}}, \quad n \geq 2" display />
        <p className="text-gray-700 mt-2">
          Equivalentemente: <M tex="a_{n-1} \cdot a_{n+1} = a_n^2" />
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Ex: na PG <M tex="(2,\; 6,\; 18,\; 54)" />: <M tex="\sqrt{2 \cdot 18} = 6" />
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">2ª Propriedade — Termos Equidistantes</h4>
        <p className="text-gray-800 leading-relaxed">
          O produto de dois termos equidistantes dos extremos é constante:
        </p>
        <M tex="a_1 \cdot a_n = a_2 \cdot a_{n-1} = a_3 \cdot a_{n-2} = \ldots" display />
        <p className="text-gray-700 mt-2">
          Ex: <M tex="2 \cdot 54 = 6 \cdot 18 = 108" />
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">3ª Propriedade — PG de 3 Termos</h4>
        <p className="text-gray-800">
          Toda PG de 3 termos e razão <M tex="q" /> pode ser escrita como:
        </p>
        <M tex="\left(\frac{x}{q},\;\; x,\;\; x \cdot q\right)" display />
        <p className="text-gray-600 text-sm mt-1">
          O produto dos três termos é <M tex="x^3" />.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Interpolação Geométrica</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <p className="text-gray-800 mb-3">
          Interpolar <M tex="n" /> meios geométricos entre <M tex="a" /> e <M tex="b" /> significa
          encontrar uma PG com <M tex="n + 2" /> termos cujo primeiro é <M tex="a" /> e o último é{' '}
          <M tex="b" />.
        </p>
        <M tex="q = \sqrt[n+1]{\dfrac{b}{a}}" display />
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Soma dos <M tex="n" /> Primeiros Termos</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Fórmula da Soma (q ≠ 1)</h4>
        <M tex="S_n = a_1 \cdot \frac{q^n - 1}{q - 1}" display />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Demonstração</h4>
        <M
          tex={`\\begin{aligned}
S_n &= a_1 + a_1 q + a_1 q^2 + \\cdots + a_1 q^{n-1} \\\\
q \\cdot S_n &= a_1 q + a_1 q^2 + \\cdots + a_1 q^n \\\\
S_n - qS_n &= a_1 - a_1 q^n \\\\
S_n(1 - q) &= a_1(1 - q^n) \\\\
S_n &= a_1 \\cdot \\frac{q^n - 1}{q - 1}
\\end{aligned}`}
          display
        />
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
        <h4 className="font-bold text-purple-800 mb-2">Soma Infinita (|q| &lt; 1)</h4>
        <p className="text-gray-700 mb-2">
          Quando <M tex="|q| < 1" />, a PG é infinita e convergente. A soma de todos os termos é:
        </p>
        <M tex="S_\infty = \frac{a_1}{1 - q}" display />
        <p className="text-gray-600 text-sm mt-2">
          Ex: <M tex="1 + \frac{1}{2} + \frac{1}{4} + \cdots = \frac{1}{1 - \frac{1}{2}} = 2" />
        </p>
      </div>
    </div>
  )
}

function Simulador() {
  const [a1, setA1] = useState(2)
  const [q, setQ] = useState(2)
  const [n, setN] = useState(6)

  const terms = useMemo(
    () => Array.from({ length: n }, (_, i) => a1 * Math.pow(q, i)),
    [a1, q, n]
  )

  const sum =
    q === 1 ? a1 * n : a1 * ((Math.pow(q, n) - 1) / (q - 1))

  const sumInf = Math.abs(q) < 1 ? a1 / (1 - q) : null

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Simulador de Soma de PG</h3>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1"><M tex="a_1" /></label>
          <input type="number" value={a1} onChange={(e) => setA1(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1"><M tex="q" /></label>
          <input type="number" step="0.1" value={q} onChange={(e) => setQ(Number(e.target.value) || 1)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1"><M tex="n" /> (termos)</label>
          <input type="number" min={1} max={20} value={n} onChange={(e) => setN(Math.max(1, Math.min(20, Number(e.target.value))))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Termos e soma parcial</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {terms.map((t, i) => (
            <span key={i} className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-mono">
              <M tex={`a_{${i + 1}} = ${t.toFixed(2)}`} />
            </span>
          ))}
        </div>
        <M tex={`S_{${n}} = ${sum.toFixed(4)}`} display />
      </div>

      {sumInf !== null && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
          <h4 className="font-semibold text-purple-800 mb-2">Soma infinita (|q| &lt; 1)</h4>
          <M tex={`S_\\infty = \\frac{${a1}}{1 - (${q})} = ${sumInf.toFixed(4)}`} display />
        </div>
      )}
    </div>
  )
}

function Exercicios() {
  return (
    <Quiz total={7}>
      <QuizCard
        id={1}
        statement={<span>Calcule a soma dos 6 primeiros termos da PG <M tex="(3,\; 6,\; 12,\; \ldots)" />.</span>}
        solution={
          <div className="space-y-2">
            <M tex="a_1 = 3,\; q = 2" display />
            <M tex="S_6 = 3 \cdot \frac{2^6 - 1}{2 - 1} = 3 \cdot 63 = 189" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={<span>Três números estão em PG. O produto é 216 e a razão é 3. Quais são os números?</span>}
        solution={
          <div className="space-y-2">
            <M tex="\left(\frac{x}{3},\; x,\; 3x\right)" display />
            <M tex="\frac{x}{3} \cdot x \cdot 3x = x^3 = 216 \Rightarrow x = 6" display />
            <M tex="(2,\; 6,\; 18)" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={<span>Calcule <M tex="1 + \frac{1}{3} + \frac{1}{9} + \frac{1}{27} + \cdots" /></span>}
        solution={
          <div className="space-y-2">
            <M tex="a_1 = 1,\; q = \frac{1}{3}" display />
            <M tex="S_\infty = \frac{1}{1 - \frac{1}{3}} = \frac{1}{\frac{2}{3}} = \frac{3}{2}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            A soma dos 5 primeiros termos de uma PG é 62 e a razão é 2. Determine o primeiro termo.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="S_5 = a_1 \cdot \frac{2^5 - 1}{2 - 1} = 31 \cdot a_1 = 62" display />
            <M tex="a_1 = 2" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <span>
            <span className="text-xs font-semibold text-indigo-500 block mb-1">Exercícios Propostos — 01</span>
            Obtenha três termos em PG crescente cuja soma é 26 e o produto é 216.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Escreva os termos como <M tex="\left(\frac{x}{q},\; x,\; xq\right)" />:</p>
            <M tex="x^3 = 216 \implies x = 6" display />
            <M tex="\frac{6}{q} + 6 + 6q = 26 \implies 6q^2 - 20q + 6 = 0 \implies q = 3 \text{ ou } q = \frac{1}{3}" display />
            <p>PG crescente com <M tex="q = 3" />:</p>
            <M tex="(2,\; 6,\; 18)" display />
          </div>
        }
      />
      <QuizCard
        id={6}
        statement={
          <span>
            <span className="text-xs font-semibold text-indigo-500 block mb-1">Exercícios Propostos — 02</span>
            Inserir 2 meios geométricos entre 3 e −24.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="a_1 = 3,\; a_4 = -24 \implies 3q^3 = -24 \implies q = -2" display />
            <M tex="PG\ (3,\; -6,\; 12,\; -24)" display />
            <p>Meios geométricos: <strong>−6</strong> e <strong>12</strong> (PG alternada, <M tex="q < 0" />).</p>
          </div>
        }
      />
      <QuizCard
        id={7}
        statement={
          <span>
            <span className="text-xs font-semibold text-indigo-500 block mb-1">Exercícios Propostos — 04</span>
            Escreva a PG em que <M tex="a_3 = 16" /> e <M tex="a_6 = 1024" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="a_6 = a_3 \cdot q^{6-3} \implies 1024 = 16 \cdot q^3 \implies q^3 = 64 \implies q = 4" display />
            <M tex="a_1 = \frac{a_3}{q^2} = \frac{16}{16} = 1" display />
            <M tex="a_n = 4^{n-1}" display />
            <p>PG: <M tex="(1,\; 4,\; 16,\; 64,\; 256,\; 1024,\; \ldots)" /></p>
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
            <M tex="S_8 = 5 \cdot \frac{3^8 - 1}{3 - 1} = 5 \cdot \frac{6560}{2} = 16400" display />
          </div>
        }
      >
        Calcule a soma dos 8 primeiros termos da PG <M tex="(5,\; 15,\; 45,\; \ldots)" />.
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="a_1 \cdot a_5 = a_3^2 \Rightarrow 2 \cdot 162 = a_3^2 \Rightarrow a_3 = 18" display />
          </div>
        }
      >
        Numera PG, <M tex="a_1 = 2" /> e <M tex="a_5 = 162" />. Determine <M tex="a_3" />.
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="S_4 = 2 \cdot \frac{(\frac{1}{2})^4 - 1}{\frac{1}{2} - 1} = 2 \cdot \frac{-\frac{15}{16}}{-\frac{1}{2}} = \frac{15}{4}" display />
          </div>
        }
      >
        Calcule <M tex="S_4" /> da PG <M tex="(2,\; 1,\; \frac{1}{2},\; \frac{1}{4})" />.
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <M tex="q^3 = \frac{54}{2} = 27 \Rightarrow q = 3" display />
            <M tex="S_5 = 2 \cdot \frac{3^5 - 1}{2} = 2 \cdot 121 = 242" display />
          </div>
        }
      >
        Uma PG tem <M tex="a_1 = 2" /> e <M tex="a_4 = 54" />. Calcule <M tex="S_5" />.
      </ExerciseCard>

      <ExerciseCard
        number={5}
        solution={
          <div className="space-y-2">
            <M tex="S_\infty = \frac{80}{1 - \frac{1}{4}} = \frac{80}{\frac{3}{4}} = \frac{320}{3}" display />
          </div>
        }
      >
        Calcule a soma infinita da PG <M tex="(80,\; 20,\; 5,\; \ldots)" />.
      </ExerciseCard>
    </div>
  )
}

export default function B38_PG_Propriedades() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
