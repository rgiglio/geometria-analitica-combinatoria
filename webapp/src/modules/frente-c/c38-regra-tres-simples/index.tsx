import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Regra de Três Simples</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">O que é?</h4>
        <p className="text-gray-800 leading-relaxed">
          A <strong>regra de três simples</strong> é um procedimento para resolver problemas com{' '}
          <strong>duas grandezas proporcionais</strong>, conhecendo três valores e buscando o quarto.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Regra de Três Simples Direta</h3>
      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <p className="text-gray-800 mb-3">
          Quando as grandezas são <strong>diretamente proporcionais</strong>, montamos:
        </p>
        <M tex="\frac{A}{B} = \frac{C}{X} \quad \Rightarrow \quad X = \frac{B \cdot C}{A}" display />
        <div className="bg-white rounded-lg p-4 mt-4 border border-green-100">
          <p className="font-semibold text-gray-800 mb-2">Exemplo</p>
          <p className="text-gray-700 text-sm">
            Se 2 kg de maçã custam R$ 10, quanto custam 5 kg?
          </p>
          <M tex="\frac{2}{10} = \frac{5}{X} \Rightarrow X = \frac{10 \cdot 5}{2} = 25" display />
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Regra de Três Simples Inversa</h3>
      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <p className="text-gray-800 mb-3">
          Quando as grandezas são <strong>inversamente proporcionais</strong>, igualamos os{' '}
          <strong>produtos</strong>:
        </p>
        <M tex="A \cdot B = C \cdot X \quad \Rightarrow \quad X = \frac{A \cdot B}{C}" display />
        <div className="bg-white rounded-lg p-4 mt-4 border border-red-100">
          <p className="font-semibold text-gray-800 mb-2">Exemplo</p>
          <p className="text-gray-700 text-sm">
            Se 3 operários fazem um serviço em 8 dias, em quantos dias 6 operários fazem?
          </p>
          <M tex="3 \cdot 8 = 6 \cdot X \Rightarrow X = \frac{24}{6} = 4 \text{ dias}" display />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Passo a passo</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Identifique as duas grandezas envolvidas.</li>
          <li>Determine se a relação é direta ou inversa.</li>
          <li>Monte a regra de três com os valores conhecidos e o incógnito <M tex="X" />.</li>
          <li>Resolva: multiplique e divida (direta) ou iguale produtos (inversa).</li>
        </ol>
      </div>
    </div>
  )
}

function Simulador() {
  const [type, setType] = useState<'direct' | 'inverse'>('direct')
  const [a, setA] = useState(2)
  const [b, setB] = useState(10)
  const [c, setC] = useState(5)

  const x = useMemo(
    () => (type === 'direct' ? (b * c) / a : (a * b) / c),
    [type, a, b, c]
  )

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Calculadora de Regra de Três Simples</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setType('direct')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${type === 'direct' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
        >
          Direta
        </button>
        <button
          onClick={() => setType('inverse')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${type === 'inverse' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
        >
          Inversa
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          <div className="text-center">
            <label className="text-xs font-semibold text-gray-500 block mb-1">Grandeza 1</label>
            <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-bold" />
          </div>
          <div className="text-center">
            <label className="text-xs font-semibold text-gray-500 block mb-1">Grandeza 2</label>
            <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))}
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-center text-lg font-bold" />
          </div>
          <div className="text-center">
            <label className="text-xs font-semibold text-gray-500 block mb-1">Grandeza 1</label>
            <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))}
              className="w-full border-2 border-indigo-200 rounded-lg px-3 py-2 text-center text-lg font-bold" />
          </div>
          <div className="text-center">
            <label className="text-xs font-semibold text-indigo-500 block mb-1">Grandeza 2 (X)</label>
            <div className="w-full border-2 border-indigo-400 bg-indigo-50 rounded-lg px-3 py-2 text-center text-lg font-bold text-indigo-700">
              {x.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4 text-center">
          {type === 'direct' ? (
            <M tex={`X = \\frac{${b} \\cdot ${c}}{${a}} = ${x.toFixed(4)}`} display />
          ) : (
            <M tex={`X = \\frac{${a} \\cdot ${b}}{${c}} = ${x.toFixed(4)}`} display />
          )}
        </div>
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
            Um automóvel gasta 8 litros de gasolina para percorrer 96 km. Quantos litros gasta para
            percorrer 300 km?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Regra de três direta (litros e km).</p>
            <M tex="\frac{8}{96} = \frac{X}{300} \Rightarrow X = 25 \text{ litros}" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Se 6 pessoas comem 18 kg de arroz em 10 dias, quantos kg 9 pessoas comem em 10 dias?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Direta (pessoas e arroz, tempo fixo).</p>
            <M tex="\frac{6}{18} = \frac{9}{X} \Rightarrow X = 27 \text{ kg}" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Um tapete de 6 m² pesa 4,5 kg. Quanto pesa um tapete de 10 m² do mesmo material?
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="\frac{6}{4{,}5} = \frac{10}{X} \Rightarrow X = 7{,}5 \text{ kg}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            5 máquinas produzem 500 peças em 8 horas. Quantas horas 10 máquinas levam para produzir
            500 peças?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Inversa (máquinas e tempo, produção fixa).</p>
            <M tex="5 \cdot 8 = 10 \cdot X \Rightarrow X = 4 \text{ horas}" display />
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
            <M tex="\frac{3}{45} = \frac{12}{X} \Rightarrow X = 180 \text{ km}" display />
          </div>
        }
      >
        Um ciclista percorre 45 km em 3 horas. Quantos km percorre em 12 horas?
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="4 \cdot 20 = 8 \cdot X \Rightarrow X = 10 \text{ dias}" display />
          </div>
        }
      >
        4 operários terminam uma obra em 20 dias. Em quantos dias 8 operários terminam?
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="\frac{2}{16} = \frac{7}{X} \Rightarrow X = 56 \text{ reais}" display />
          </div>
        }
      >
        2 cadernos custam R$ 16,00. Quanto custam 7 cadernos iguais?
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <M tex="3 \cdot 12 = 9 \cdot X \Rightarrow X = 4 \text{ horas}" display />
          </div>
        }
      >
        3 torneiras enchem um reservatório em 12 horas. Em quanto tempo 9 torneiras iguais enchem o reservatório?
      </ExerciseCard>
    </div>
  )
}

export default function C38_RegraTresSimples() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
