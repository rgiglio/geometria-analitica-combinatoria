import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Grandezas Diretamente e Inversamente Proporcionais
      </h3>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <h4 className="font-bold text-green-800 mb-2">Grandeza Diretamente Proporcional</h4>
        <p className="text-gray-800 leading-relaxed">
          Duas grandezas <M tex="x" /> e <M tex="y" /> são <strong>diretamente proporcionais</strong>{' '}
          quando, ao dobrar uma, a outra também dobra. A razão entre elas é constante:
        </p>
        <M tex="y = k \cdot x \quad \text{ou} \quad \frac{y}{x} = k \text{ (constante)}" display />
        <p className="text-gray-600 text-sm mt-2">
          Ex: distância e tempo (velocidade constante), preço e quantidade de produto.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-5">
        <h4 className="font-bold text-red-800 mb-2">Grandeza Inversamente Proporcional</h4>
        <p className="text-gray-800 leading-relaxed">
          Duas grandezas são <strong>inversamente proporcionais</strong> quando, ao dobrar uma, a
          outra cai pela metade. O produto entre elas é constante:
        </p>
        <M tex="y = \frac{k}{x} \quad \text{ou} \quad x \cdot y = k \text{ (constante)}" display />
        <p className="text-gray-600 text-sm mt-2">
          Ex: velocidade e tempo (distância fixa), operários e dias para concluir um trabalho.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Como identificar?</h4>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <p className="font-semibold text-green-700 mb-1">Direta ↑↑</p>
            <p className="text-gray-700 text-sm">
              Se <M tex="x" /> aumenta e <M tex="y" /> também aumenta → diretamente proporcional.
            </p>
          </div>
          <div>
            <p className="font-semibold text-red-700 mb-1">Inversa ↑↓</p>
            <p className="text-gray-700 text-sm">
              Se <M tex="x" /> aumenta e <M tex="y" /> diminui → inversamente proporcional.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Tabela de Proporcionalidade</h4>
        <p className="text-gray-700 mb-2">
          <strong>Direta:</strong> se <M tex="x_1 \to x_2" />, então <M tex="y_1 \to y_2" /> com{' '}
          <M tex="\frac{x_1}{x_2} = \frac{y_1}{y_2}" />.
        </p>
        <p className="text-gray-700">
          <strong>Inversa:</strong> se <M tex="x_1 \to x_2" />, então <M tex="y_1 \to y_2" /> com{' '}
          <M tex="x_1 \cdot y_1 = x_2 \cdot y_2" />.
        </p>
      </div>
    </div>
  )
}

function Simulador() {
  const [type, setType] = useState<'direct' | 'inverse'>('direct')
  const [k, setK] = useState(2)
  const [x, setX] = useState(5)

  const y = type === 'direct' ? k * x : k / x

  const tableX = [1, 2, 3, 4, 5, 6, 7, 8]
  const tableY = tableX.map((vx) => (type === 'direct' ? k * vx : k / vx))

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Explorador de Proporcionalidade</h3>

      <div className="flex gap-2">
        <button
          onClick={() => setType('direct')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${type === 'direct' ? 'bg-green-600 text-white' : 'bg-gray-100'}`}
        >
          Diretamente proporcional
        </button>
        <button
          onClick={() => setType('inverse')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${type === 'inverse' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
        >
          Inversamente proporcional
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Constante <M tex="k" />
          </label>
          <input type="number" value={k} onChange={(e) => setK(Number(e.target.value) || 1)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1"><M tex="x" /></label>
          <input type="number" value={x} onChange={(e) => setX(Number(e.target.value) || 1)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 text-center">
        {type === 'direct' ? (
          <M tex={`y = k \\cdot x = ${k} \\cdot ${x} = ${y.toFixed(2)}`} display />
        ) : (
          <M tex={`y = \\frac{k}{x} = \\frac{${k}}{${x}} = ${y.toFixed(2)}`} display />
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Gráfico comparativo</h4>
        <div className="flex items-end gap-1 h-40">
          {tableY.map((vy, i) => {
            const maxY = Math.max(...tableY.map(Math.abs))
            const h = maxY > 0 ? (Math.abs(vy) / maxY) * 100 : 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center">
                <span className="text-[9px] text-gray-500 mb-1">{vy.toFixed(1)}</span>
                <div
                  className={`w-full rounded-t ${type === 'direct' ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ height: `${Math.max(h, 2)}%` }}
                />
                <span className="text-[9px] text-gray-400 mt-1">{tableX[i]}</span>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-400 text-center mt-2">Eixo horizontal: x</p>
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
            Um carro percorre 240 km em 3 horas. Quantos km percorre em 5 horas (velocidade constante)?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Distância e tempo são diretamente proporcionais.</p>
            <M tex="\frac{240}{3} = \frac{x}{5} \Rightarrow x = 400 \text{ km}" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            4 operários fazem um trabalho em 12 dias. Em quantos dias 6 operários fazem o mesmo
            trabalho?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Operários e dias são inversamente proporcionais.</p>
            <M tex="4 \cdot 12 = 6 \cdot x \Rightarrow x = 8 \text{ dias}" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Se 5 kg de arroz custam R$ 25,00, quanto custam 8 kg?
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="\frac{5}{25} = \frac{8}{x} \Rightarrow x = 40 \text{ reais}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Um tanque é enchido por 3 torneiras em 4 horas. Em quanto tempo 6 torneiras iguais
            enchem o tanque?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Torneiras e tempo são inversamente proporcionais.</p>
            <M tex="3 \cdot 4 = 6 \cdot x \Rightarrow x = 2 \text{ horas}" display />
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
            <M tex="\frac{150}{2} = \frac{x}{7} \Rightarrow x = 525 \text{ km}" display />
          </div>
        }
      >
        Um avião voa 150 km em 2 horas. Quantos km voa em 7 horas?
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-2">
            <M tex="8 \cdot 15 = 12 \cdot x \Rightarrow x = 10 \text{ dias}" display />
          </div>
        }
      >
        8 pedreiros constroem um muro em 15 dias. Quantos dias 12 pedreiros levam?
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <M tex="\frac{3}{18} = \frac{10}{x} \Rightarrow x = 60 \text{ reais}" display />
          </div>
        }
      >
        3 m de tecido custam R$ 18,00. Quanto custam 10 m?
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <M tex="5 \cdot 6 = 10 \cdot x \Rightarrow x = 3 \text{ horas}" display />
          </div>
        }
      >
        5 máquinas produzem certa quantidade em 6 horas. Em quanto tempo 10 máquinas iguais produzem a mesma quantidade?
      </ExerciseCard>
    </div>
  )
}

export default function C37_Proporcionalidade() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
