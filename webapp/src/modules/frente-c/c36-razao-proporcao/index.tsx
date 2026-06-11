import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Razão e Proporção</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Razão</h4>
        <p className="text-gray-800 leading-relaxed">
          A <strong>razão</strong> entre dois números <M tex="a" /> e <M tex="b" /> (com{' '}
          <M tex="b \neq 0" />) é o quociente:
        </p>
        <M tex="r = \frac{a}{b} = a : b" display />
        <p className="text-gray-600 text-sm mt-2">
          Ex: a razão entre 12 e 8 é <M tex="\frac{12}{8} = \frac{3}{2} = 1{,}5" /> ou{' '}
          <M tex="3 : 2" />.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Proporção</h4>
        <p className="text-gray-800 leading-relaxed">
          Uma <strong>proporção</strong> é a igualdade entre duas razões:
        </p>
        <M tex="\frac{a}{b} = \frac{c}{d} \quad \text{ou} \quad a : b = c : d" display />
        <p className="text-gray-700 mt-2">
          Lê-se: &quot;<M tex="a" /> está para <M tex="b" /> assim como <M tex="c" /> está para{' '}
          <M tex="d" />&quot;.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Propriedades Fundamentais</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Propriedade Fundamental</h4>
          <M tex="a \cdot d = b \cdot c" display />
          <p className="text-gray-600 text-sm mt-2">Produto dos meios = produto dos extremos.</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Soma dos Antecedentes</h4>
          <M tex="\frac{a}{b} = \frac{c}{d} \Rightarrow \frac{a + c}{b + d} = \frac{a}{b}" display />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Diferença dos Antecedentes</h4>
          <M tex="\frac{a}{b} = \frac{c}{d} \Rightarrow \frac{a - c}{b - d} = \frac{a}{b}" display />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">Soma e Diferença</h4>
          <M tex="\frac{a + c}{a - c} = \frac{b + d}{b - d}" display />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 className="font-bold text-green-800 mb-2">Razão Composta</h4>
        <p className="text-gray-700">
          Quando duas ou mais razões são multiplicadas:
        </p>
        <M tex="\frac{a}{b} \cdot \frac{c}{d} = \frac{a \cdot c}{b \cdot d}" display />
      </div>
    </div>
  )
}

function Simulador() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [c, setC] = useState(8)
  const [mode, setMode] = useState<'find-d' | 'check'>('find-d')

  const d = useMemo(() => (b !== 0 ? (b * c) / a : 0), [a, b, c])
  const [dInput, setDInput] = useState(12)
  const isValid = Math.abs(a * dInput - b * c) < 0.001

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Calculadora de Proporção</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('find-d')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${mode === 'find-d' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Encontrar termo desconhecido
        </button>
        <button
          onClick={() => setMode('check')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${mode === 'check' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          Verificar proporção
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-800 flex-wrap">
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))}
            className="w-20 border-2 border-indigo-300 rounded-lg px-2 py-1 text-center text-lg" />
          <span className="text-gray-400">:</span>
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))}
            className="w-20 border-2 border-indigo-300 rounded-lg px-2 py-1 text-center text-lg" />
          <span className="text-gray-400">=</span>
          <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))}
            className="w-20 border-2 border-indigo-300 rounded-lg px-2 py-1 text-center text-lg" />
          <span className="text-gray-400">:</span>
          {mode === 'find-d' ? (
            <span className="w-20 text-center text-indigo-600 bg-indigo-50 rounded-lg py-1">{d.toFixed(2)}</span>
          ) : (
            <input type="number" value={dInput} onChange={(e) => setDInput(Number(e.target.value))}
              className="w-20 border-2 border-indigo-300 rounded-lg px-2 py-1 text-center text-lg" />
          )}
        </div>

        {mode === 'find-d' && (
          <div className="mt-6 bg-indigo-50 rounded-lg p-4 text-center">
            <M tex={`d = \\frac{b \\cdot c}{a} = \\frac{${b} \\cdot ${c}}{${a}} = ${d.toFixed(4)}`} display />
          </div>
        )}

        {mode === 'check' && (
          <div className={`mt-6 rounded-lg p-4 text-center ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <p className="font-semibold mb-2">
              {isValid ? '✓ Proporção verdadeira!' : '✗ Proporção falsa'}
            </p>
            <M tex={`${a} \\cdot ${dInput} = ${(a * dInput).toFixed(2)} \\quad \\text{e} \\quad ${b} \\cdot ${c} = ${(b * c).toFixed(2)}`} display />
          </div>
        )}
      </div>
    </div>
  )
}

function Exercicios() {
  return (
    <Quiz total={4}>
      <QuizCard
        id={1}
        statement={<span>Determine <M tex="x" /> na proporção <M tex="3 : 5 = x : 20" />.</span>}
        solution={
          <div className="space-y-2">
            <M tex="5x = 3 \cdot 20 = 60" display />
            <M tex="x = 12" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={<span>Verifique se <M tex="2 : 6 = 5 : 15" /> é uma proporção verdadeira.</span>}
        solution={
          <div className="space-y-2">
            <M tex="2 \cdot 15 = 30 \quad \text{e} \quad 6 \cdot 5 = 30" display />
            <p>Sim, é verdadeira (ambos valem <M tex="\frac{1}{3}" />).</p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Divida 84 em partes diretamente proporcionais a 2, 3 e 5.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="2 + 3 + 5 = 10 \text{ partes}" display />
            <M tex="2k + 3k + 5k = 84 \Rightarrow 10k = 84 \Rightarrow k = 8{,}4" display />
            <M tex="16{,}8,\; 25{,}2,\; 42" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Se <M tex="\frac{a}{b} = \frac{3}{4}" /> e <M tex="a + b = 35" />, determine <M tex="a" /> e{' '}
            <M tex="b" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="a = 3k,\; b = 4k \Rightarrow 7k = 35 \Rightarrow k = 5" display />
            <M tex="a = 15,\; b = 20" display />
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
            <M tex="4x = 7 \cdot 21 = 147 \Rightarrow x = 36{,}75" display />
          </div>
        }
      >
        Determine <M tex="x" /> em <M tex="4 : 7 = x : 21" />.
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="3 + 5 + 7 = 15 \text{ partes}" display />
            <M tex="15k = 120 \Rightarrow k = 8" display />
            <M tex="24,\; 40,\; 56" display />
          </div>
        }
      >
        Divida 120 em partes proporcionais a 3, 5 e 7.
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="2k + 3k = 50 \Rightarrow k = 10" display />
            <M tex="a = 20,\; b = 30" display />
          </div>
        }
      >
        Dois números estão na razão <M tex="2 : 3" /> e somam 50. Quais são?
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <M tex="\frac{12}{18} = \frac{2}{3}" display />
            <M tex="\frac{12 + 18}{12 - 18} = \frac{30}{-6} = -5" display />
            <M tex="\frac{2 + 3}{2 - 3} = \frac{5}{-1} = -5" display />
          </div>
        }
      >
        Verifique a propriedade da soma e diferença para <M tex="12 : 18 = 2 : 3" />.
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="UEG GO — 14"
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Concentração de álcool:</p>
            <M tex="C_A = \frac{4}{4+7} = \frac{4}{11} \approx 0{,}36 \quad;\quad C_B = \frac{3}{3+2} = \frac{3}{5} = 0{,}60" display />
            <p>O combustível <strong>B</strong> possui maior concentração de álcool.</p>
            <p><strong>b)</strong> Em 1 L de A: álcool <M tex="\frac{4}{11}" /> L, gasolina <M tex="\frac{7}{11}" /> L.</p>
            <p>Em 1 L de B: álcool <M tex="\frac{3}{5}" /> L, gasolina <M tex="\frac{2}{5}" /> L.</p>
            <M tex="\text{álcool total} = \frac{4}{11} + \frac{3}{5} = \frac{53}{55} \text{ L}" display />
            <M tex="\text{gasolina total} = \frac{7}{11} + \frac{2}{5} = \frac{57}{55} \text{ L}" display />
            <M tex="\text{razão} = \frac{53}{55} : \frac{57}{55} = 53 : 57" display />
            <p className="text-sm text-gray-600">Não se somam as razões <M tex="\frac{4}{7} + \frac{3}{2}" /> — somam-se os volumes de álcool e gasolina separadamente.</p>
          </div>
        }
      >
        <p>
          Dois combustíveis são obtidos por mistura de álcool e gasolina. O combustível A contém 4 partes
          de álcool para cada 7 de gasolina; o B contém 3 partes de álcool para cada 2 de gasolina.
        </p>
        <p><strong>a)</strong> Qual possui maior concentração de álcool?</p>
        <p><strong>b)</strong> Qual a razão álcool : gasolina de uma mistura de 1 L de A com 1 L de B?</p>
      </ExerciseCard>
    </div>
  )
}

export default function C36_RazaoProporcao() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
