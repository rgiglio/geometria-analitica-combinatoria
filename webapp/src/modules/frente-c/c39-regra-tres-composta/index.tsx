import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">Regra de Três Composta</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">O que é?</h4>
        <p className="text-gray-800 leading-relaxed">
          A <strong>regra de três composta</strong> envolve <strong>três ou mais grandezas</strong>{' '}
          relacionadas entre si. Um valor muda e precisamos calcular como isso afeta outra grandeza,
          mantendo as demais condições.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-900 pt-2">Método de Resolução</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <ol className="list-decimal list-inside space-y-3 text-gray-800">
          <li>
            <strong>Monte uma tabela</strong> com todas as grandezas e seus valores (situação inicial
            e final).
          </li>
          <li>
            <strong>Classifique cada grandeza</strong> em relação à incógnita: diretamente ou
            inversamente proporcional.
          </li>
          <li>
            <strong>Multiplique</strong> os valores das grandezas diretas e{' '}
            <strong>divida</strong> pelos valores das grandezas inversas (ou use a fórmula composta).
          </li>
        </ol>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 className="font-bold text-green-800 mb-2">Fórmula geral</h4>
        <p className="text-gray-700 mb-2">
          Se <M tex="G_1, G_2, \ldots, G_k" /> são grandezas e <M tex="X" /> é a incógnita:
        </p>
        <M tex="\frac{G_1 \cdot G_2 \cdots \text{(diretas)}}{G_j \cdot G_k \cdots \text{(inversas)}} = \frac{G'_1 \cdot G'_2 \cdots}{G'_j \cdot G'_k \cdots}" display />
        <p className="text-gray-600 text-sm mt-2">
          Na prática: coloque diretas em cima e inversas embaixo (ou vice-versa), de um lado para o
          outro.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Exemplo clássico</h4>
        <p className="text-gray-700 mb-2">
          5 operários, trabalhando 8 h/dia, fazem uma obra em 12 dias. Em quantos dias 8 operários,
          trabalhando 6 h/dia, fazem a mesma obra?
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border-b">Operários</th>
                <th className="p-2 border-b">Horas/dia</th>
                <th className="p-2 border-b">Dias</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-center border-b">5</td>
                <td className="p-2 text-center border-b">8</td>
                <td className="p-2 text-center border-b">12</td>
              </tr>
              <tr>
                <td className="p-2 text-center">8</td>
                <td className="p-2 text-center">6</td>
                <td className="p-2 text-center font-bold text-indigo-600">X</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-sm mt-3">
          Operários: inversa (↑ operários → ↓ dias). Horas: inversa. Dias: incógnita.
        </p>
        <M tex="5 \cdot 8 \cdot 12 = 8 \cdot 6 \cdot X \Rightarrow X = \frac{480}{48} = 10 \text{ dias}" display />
      </div>
    </div>
  )
}

function Simulador() {
  const [op1, setOp1] = useState(5)
  const [h1, setH1] = useState(8)
  const [d1, setD1] = useState(12)
  const [op2, setOp2] = useState(8)
  const [h2, setH2] = useState(6)

  const d2 = (op1 * h1 * d1) / (op2 * h2)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Simulador — Operários, Horas e Dias</h3>
      <p className="text-gray-600 text-sm">
        Operários e horas são inversamente proporcionais aos dias (obra fixa).
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-semibold text-gray-700 mb-4">Situação inicial</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Operários</label>
              <input type="number" value={op1} onChange={(e) => setOp1(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Horas/dia</label>
              <input type="number" value={h1} onChange={(e) => setH1(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Dias</label>
              <input type="number" value={d1} onChange={(e) => setD1(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
          <h4 className="font-semibold text-indigo-700 mb-4">Situação final</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-indigo-500">Operários</label>
              <input type="number" value={op2} onChange={(e) => setOp2(Number(e.target.value))}
                className="w-full border border-indigo-200 rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-indigo-500">Horas/dia</label>
              <input type="number" value={h2} onChange={(e) => setH2(Number(e.target.value))}
                className="w-full border border-indigo-200 rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="text-xs text-indigo-500">Dias (resultado)</label>
              <div className="w-full bg-white border-2 border-indigo-400 rounded-lg px-3 py-2 mt-1 font-bold text-indigo-700 text-lg">
                {d2.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 text-center">
        <M tex={`${op1} \\cdot ${h1} \\cdot ${d1} = ${op2} \\cdot ${h2} \\cdot X`} display />
        <M tex={`X = \\frac{${op1 * h1 * d1}}{${op2 * h2}} = ${d2.toFixed(2)} \\text{ dias}`} display />
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
            4 máquinas, operando 6 h/dia, produzem 600 peças em 5 dias. Quantas peças 6 máquinas,
            operando 8 h/dia, produzem em 3 dias?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Máquinas e horas: diretas. Dias: direta.</p>
            <M tex="\frac{4 \cdot 6 \cdot 600}{5} = \frac{6 \cdot 8 \cdot X}{3}" display />
            <M tex="2880 = 16X \Rightarrow X = 180 \text{ peças}" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            10 operários fazem uma obra em 16 dias, trabalhando 5 h/dia. Em quantos dias 8 operários
            fazem a mesma obra, trabalhando 10 h/dia?
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="10 \cdot 5 \cdot 16 = 8 \cdot 10 \cdot X" display />
            <M tex="800 = 80X \Rightarrow X = 10 \text{ dias}" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            3 torneiras enchem um tanque em 4 horas. Em quanto tempo 5 torneiras enchem 2 tanques
            iguais?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Torneiras: inversa. Tanques: direta.</p>
            <M tex="3 \cdot 4 = 5 \cdot X \Rightarrow X = 2{,}4 \text{ h para 1 tanque}" display />
            <M tex="2 \text{ tanques} \Rightarrow 2 \cdot 2{,}4 = 4{,}8 \text{ horas}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Um carro a 80 km/h percorre um trecho em 3 horas. Em quanto tempo percorre o mesmo trecho
            a 60 km/h?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Regra de três simples inversa (velocidade e tempo).</p>
            <M tex="80 \cdot 3 = 60 \cdot X \Rightarrow X = 4 \text{ horas}" display />
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
            <M tex="6 \cdot 7 \cdot 20 = 10 \cdot 6 \cdot X \Rightarrow X = 14 \text{ dias}" display />
          </div>
        }
      >
        6 operários, trabalhando 7 h/dia, concluem um serviço em 20 dias. Em quantos dias 10
        operários, trabalhando 6 h/dia, concluem o mesmo serviço?
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="2 \cdot 5 \cdot 300 = 4 \cdot 6 \cdot X \Rightarrow X = 125 \text{ peças}" display />
          </div>
        }
      >
        2 máquinas, 5 h/dia, produzem 300 peças em 8 dias. Quantas peças 4 máquinas, 6 h/dia,
        produzem em 8 dias?
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="5 \cdot 8 \cdot 12 = 10 \cdot 4 \cdot X \Rightarrow X = 12 \text{ dias}" display />
          </div>
        }
      >
        5 pedreiros, 8 h/dia, constroem um muro em 12 dias. Em quantos dias 10 pedreiros, 4 h/dia,
        constroem o mesmo muro?
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <M tex="4 \cdot 6 \cdot 900 = 6 \cdot 9 \cdot X \Rightarrow X = 400 \text{ peças}" display />
          </div>
        }
      >
        4 operários, 6 h/dia, produzem 900 peças em 10 dias. Quantas peças 6 operários, 9 h/dia,
        produzem em 10 dias?
      </ExerciseCard>
    </div>
  )
}

export default function C39_RegraTresComposta() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
