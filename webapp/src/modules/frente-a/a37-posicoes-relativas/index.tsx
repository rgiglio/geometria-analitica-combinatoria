import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'
import { CartesianPlane, type PlaneLine, type PlanePoint } from '../../../components/CartesianPlane'

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Posições Relativas entre Retas</h3>

      <p className="text-gray-700">
        Dadas duas retas <M tex="r: a_1 x + b_1 y + c_1 = 0" /> e <M tex="s: a_2 x + b_2 y + c_2 = 0" />,
        podemos classificá-las de acordo com a posição relativa entre elas.
      </p>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Retas Concorrentes</h4>
        <p className="text-gray-700">
          Duas retas são <strong>concorrentes</strong> quando se interceptam em exatamente um ponto.
          Isso ocorre quando o sistema formado pelas equações tem <strong>solução única</strong>:
        </p>
        <M tex="\frac{a_1}{a_2} \neq \frac{b_1}{b_2}" display />
        <p className="text-gray-700">
          Equivalentemente, na forma reduzida: <M tex="m_1 \neq m_2" />.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Retas Paralelas Distintas</h4>
        <p className="text-gray-700">
          Duas retas são <strong>paralelas distintas</strong> quando não se interceptam. Isso ocorre quando:
        </p>
        <M tex="\frac{a_1}{a_2} = \frac{b_1}{b_2} \neq \frac{c_1}{c_2}" display />
        <p className="text-gray-700">
          Na forma reduzida: <M tex="m_1 = m_2" /> e <M tex="n_1 \neq n_2" />.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Retas Coincidentes</h4>
        <p className="text-gray-700">
          Duas retas são <strong>coincidentes</strong> (representam a mesma reta) quando:
        </p>
        <M tex="\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}" display />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Retas Perpendiculares</h4>
        <p className="text-gray-700">
          Um caso especial de retas concorrentes: duas retas são <strong>perpendiculares</strong> quando
          se interceptam formando ângulo de <M tex="90°" />. A condição é:
        </p>
        <M tex="m_1 \cdot m_2 = -1" display />
        <p className="text-gray-700">
          Na forma geral: <M tex="a_1 a_2 + b_1 b_2 = 0" />.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Ângulo entre Duas Retas</h4>
        <p className="text-gray-700">
          O <strong>ângulo agudo</strong> <M tex="\theta" /> entre duas retas concorrentes de declividades{' '}
          <M tex="m_1" /> e <M tex="m_2" /> é dado por:
        </p>
        <M tex="\tan \theta = \frac{|m_1 - m_2|}{1 + m_1 \cdot m_2}" display />
        <p className="text-gray-700">
          desde que <M tex="1 + m_1 \cdot m_2 \neq 0" /> (caso contrário, são perpendiculares e <M tex="\theta = 90°" />).
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Distância de Ponto a Reta</h4>
        <p className="text-gray-700">
          A distância de um ponto <M tex="P(x_0, y_0)" /> à reta <M tex="r: ax + by + c = 0" /> é:
        </p>
        <M tex="d(P, r) = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}" display />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Distância entre Retas Paralelas</h4>
        <p className="text-gray-700">
          Se <M tex="r: ax + by + c_1 = 0" /> e <M tex="s: ax + by + c_2 = 0" /> são paralelas distintas,
          a distância entre elas é:
        </p>
        <M tex="d(r, s) = \frac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}" display />
        <p className="text-gray-700">
          Basta escolher um ponto qualquer de uma reta e calcular sua distância à outra.
        </p>
      </div>
    </div>
  )
}

type Classification = 'concorrentes' | 'perpendiculares' | 'paralelas' | 'coincidentes'

function classify(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): Classification {
  const hasM1 = Math.abs(b1) > 1e-9
  const hasM2 = Math.abs(b2) > 1e-9

  if (hasM1 && hasM2) {
    const m1 = -a1 / b1
    const m2 = -a2 / b2
    const n1 = -c1 / b1
    const n2 = -c2 / b2

    if (Math.abs(m1 - m2) < 1e-9) {
      return Math.abs(n1 - n2) < 1e-9 ? 'coincidentes' : 'paralelas'
    }
    if (Math.abs(m1 * m2 + 1) < 1e-9) return 'perpendiculares'
    return 'concorrentes'
  }

  if (!hasM1 && !hasM2) {
    const x1 = Math.abs(a1) > 1e-9 ? -c1 / a1 : 0
    const x2 = Math.abs(a2) > 1e-9 ? -c2 / a2 : 0
    return Math.abs(x1 - x2) < 1e-9 ? 'coincidentes' : 'paralelas'
  }

  if (!hasM1 && hasM2) return 'perpendiculares'
  if (hasM1 && !hasM2) return 'perpendiculares'

  return 'concorrentes'
}

function getIntersection(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): PlanePoint | null {
  const det = a1 * b2 - a2 * b1
  if (Math.abs(det) < 1e-9) return null
  const x = (-c1 * b2 + c2 * b1) / det
  const y = (-a1 * c2 + a2 * c1) / det
  return { x, y, label: `P(${x.toFixed(1)}, ${y.toFixed(1)})`, color: '#ef4444' }
}

function Simulador() {
  const [a1, setA1] = useState(2)
  const [b1, setB1] = useState(-3)
  const [c1, setC1] = useState(6)
  const [a2, setA2] = useState(4)
  const [b2, setB2] = useState(-6)
  const [c2, setC2] = useState(-10)

  const cls = useMemo(() => classify(a1, b1, c1, a2, b2, c2), [a1, b1, c1, a2, b2, c2])
  const intersection = useMemo(
    () => (cls === 'concorrentes' || cls === 'perpendiculares') ? getIntersection(a1, b1, c1, a2, b2, c2) : null,
    [a1, b1, c1, a2, b2, c2, cls]
  )

  const m1 = Math.abs(b1) > 1e-9 ? -a1 / b1 : null
  const m2 = Math.abs(b2) > 1e-9 ? -a2 / b2 : null

  const angle = useMemo(() => {
    if (cls === 'perpendiculares') return 90
    if (m1 === null || m2 === null) return null
    const denom = 1 + m1 * m2
    if (Math.abs(denom) < 1e-9) return 90
    return (Math.atan(Math.abs(m1 - m2) / denom) * 180) / Math.PI
  }, [m1, m2, cls])

  const parallelDist = useMemo(() => {
    if (cls !== 'paralelas') return null
    return Math.abs(c1 - c2) / Math.sqrt(a1 * a1 + b1 * b1)
  }, [a1, b1, c1, c2, cls])

  const lines: PlaneLine[] = [
    { a: a1, b: b1, c: c1, color: '#6366f1', label: 'r' },
    { a: a2, b: b2, c: c2, color: '#f59e0b', label: 's' },
  ]

  const points: PlanePoint[] = intersection ? [intersection] : []

  const classLabel: Record<Classification, string> = {
    concorrentes: 'Concorrentes',
    perpendiculares: 'Perpendiculares (concorrentes)',
    paralelas: 'Paralelas distintas',
    coincidentes: 'Coincidentes',
  }

  const classColor: Record<Classification, string> = {
    concorrentes: 'text-blue-700 bg-blue-50 border-blue-200',
    perpendiculares: 'text-purple-700 bg-purple-50 border-purple-200',
    paralelas: 'text-amber-700 bg-amber-50 border-amber-200',
    coincidentes: 'text-green-700 bg-green-50 border-green-200',
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        Ajuste os coeficientes das duas retas e observe a classificação, ângulo, ponto de interseção ou distância.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <CartesianPlane width={460} height={460} lines={lines} points={points} />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-indigo-700">Reta r: <M tex="a_1 x + b_1 y + c_1 = 0" /></h4>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">a₁</span>
              <input type="range" min={-5} max={5} step={1} value={a1}
                onChange={(e) => setA1(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{a1}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">b₁</span>
              <input type="range" min={-5} max={5} step={1} value={b1}
                onChange={(e) => setB1(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{b1}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">c₁</span>
              <input type="range" min={-10} max={10} step={1} value={c1}
                onChange={(e) => setC1(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{c1}</span>
            </label>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-amber-700">Reta s: <M tex="a_2 x + b_2 y + c_2 = 0" /></h4>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">a₂</span>
              <input type="range" min={-5} max={5} step={1} value={a2}
                onChange={(e) => setA2(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{a2}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">b₂</span>
              <input type="range" min={-5} max={5} step={1} value={b2}
                onChange={(e) => setB2(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{b2}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="w-8 font-mono">c₂</span>
              <input type="range" min={-10} max={10} step={1} value={c2}
                onChange={(e) => setC2(Number(e.target.value))} className="flex-1" />
              <span className="w-6 text-right font-mono">{c2}</span>
            </label>
          </div>

          <div className={`rounded-lg p-4 border space-y-2 text-sm ${classColor[cls]}`}>
            <p className="font-bold text-base">{classLabel[cls]}</p>

            {intersection && (
              <p>Ponto de intersecção: <M tex={`P(${intersection.x.toFixed(2)},\\; ${intersection.y.toFixed(2)})`} /></p>
            )}

            {angle !== null && (cls === 'concorrentes' || cls === 'perpendiculares') && (
              <p>Ângulo entre as retas: <M tex={`\\theta = ${angle.toFixed(1)}°`} /></p>
            )}

            {parallelDist !== null && (
              <p>Distância entre as retas: <M tex={`d = ${parallelDist.toFixed(2)}`} /></p>
            )}

            {m1 !== null && <p>Declividade de r: <M tex={`m_1 = ${m1.toFixed(2)}`} /></p>}
            {m2 !== null && <p>Declividade de s: <M tex={`m_2 = ${m2.toFixed(2)}`} /></p>}
          </div>
        </div>
      </div>
    </div>
  )
}

function Exercicios() {
  return (
    <Quiz total={5}>
      <QuizCard
        id={1}
        statement={
          <p>
            Classifique as retas <M tex="r: 2x - 3y + 6 = 0" /> e <M tex="s: 4x - 6y - 10 = 0" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Comparando as razões dos coeficientes:</p>
            <M tex="\frac{a_1}{a_2} = \frac{2}{4} = \frac{1}{2}, \quad \frac{b_1}{b_2} = \frac{-3}{-6} = \frac{1}{2}, \quad \frac{c_1}{c_2} = \frac{6}{-10} = -\frac{3}{5}" display />
            <p>Como <M tex="\dfrac{a_1}{a_2} = \dfrac{b_1}{b_2} \neq \dfrac{c_1}{c_2}" />, as retas são <strong>paralelas distintas</strong>.</p>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <p>
            Determine o ponto de intersecção das retas <M tex="r: x + 2y - 5 = 0" /> e{' '}
            <M tex="s: 3x - y - 1 = 0" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Da reta <M tex="s" />: <M tex="y = 3x - 1" />. Substituindo em <M tex="r" />:</p>
            <M tex="x + 2(3x - 1) - 5 = 0" display />
            <M tex="x + 6x - 2 - 5 = 0 \implies 7x = 7 \implies x = 1" display />
            <M tex="y = 3(1) - 1 = 2" display />
            <p><strong>Ponto de intersecção:</strong> <M tex="P(1,\; 2)" /></p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <p>
            Verifique se as retas <M tex="r: y = 3x + 1" /> e <M tex="s: y = -\dfrac{x}{3} + 2" /> são perpendiculares.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Identificando as declividades:</p>
            <M tex="m_r = 3 \quad \text{e} \quad m_s = -\frac{1}{3}" display />
            <p>Verificando o produto:</p>
            <M tex="m_r \cdot m_s = 3 \cdot \left(-\frac{1}{3}\right) = -1" display />
            <p>Como <M tex="m_r \cdot m_s = -1" />, as retas <strong>são perpendiculares</strong>.</p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <p>
            Calcule a distância do ponto <M tex="P(1, 2)" /> à reta <M tex="r: 3x + 4y - 10 = 0" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Aplicando a fórmula da distância ponto-reta:</p>
            <M tex="d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}" display />
            <M tex="d = \frac{|3(1) + 4(2) - 10|}{\sqrt{3^2 + 4^2}} = \frac{|3 + 8 - 10|}{\sqrt{9 + 16}}" display />
            <M tex="= \frac{|1|}{\sqrt{25}} = \frac{1}{5}" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <p>
            Dadas as retas paralelas <M tex="r: 2x + y - 3 = 0" /> e <M tex="s: 2x + y + 7 = 0" />,
            calcule a distância entre elas.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Como as retas são paralelas (mesmos coeficientes <M tex="a" /> e <M tex="b" />), usamos:</p>
            <M tex="d = \frac{|c_1 - c_2|}{\sqrt{a^2 + b^2}}" display />
            <M tex="d = \frac{|-3 - 7|}{\sqrt{2^2 + 1^2}} = \frac{|-10|}{\sqrt{5}} = \frac{10}{\sqrt{5}} = \frac{10\sqrt{5}}{5} = 2\sqrt{5}" display />
          </div>
        }
      />
    </Quiz>
  )
}

function Gabarito() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Exercícios Complementares</h3>

      <ExerciseCard
        number={1}
        source="Estilo ENEM"
        solution={
          <div className="space-y-2">
            <p>Retas <M tex="r: y = 2x + 3" /> e <M tex="s: y = 2x - 5" />: mesma declividade (<M tex="m = 2" />), logo são paralelas.</p>
            <p>Na forma geral: <M tex="r: 2x - y + 3 = 0" /> e <M tex="s: 2x - y - 5 = 0" />.</p>
            <M tex="d = \frac{|3 - (-5)|}{\sqrt{4 + 1}} = \frac{8}{\sqrt{5}} = \frac{8\sqrt{5}}{5}" display />
            <p><strong>Resposta: <M tex="d = \dfrac{8\sqrt{5}}{5} \approx 3{,}58" /></strong></p>
          </div>
        }
      >
        <p>
          As retas <M tex="r: y = 2x + 3" /> e <M tex="s: y = 2x - 5" /> são paralelas. Calcule a distância entre elas.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="Estilo Fuvest"
        solution={
          <div className="space-y-2">
            <p>Retas <M tex="r: 3x - y + 1 = 0" /> e <M tex="s: x + 3y - 7 = 0" />.</p>
            <p>Declividades: <M tex="m_r = 3" /> e <M tex="m_s = -\dfrac{1}{3}" />.</p>
            <M tex="m_r \cdot m_s = 3 \cdot \left(-\frac{1}{3}\right) = -1" display />
            <p>São <strong>perpendiculares</strong> ✓</p>
            <p>Ponto de intersecção (resolvendo o sistema):</p>
            <p>De <M tex="r" />: <M tex="y = 3x + 1" />. Substituindo em <M tex="s" />:</p>
            <M tex="x + 3(3x+1) - 7 = 0 \implies x + 9x + 3 - 7 = 0 \implies 10x = 4 \implies x = \frac{2}{5}" display />
            <M tex="y = 3 \cdot \frac{2}{5} + 1 = \frac{6}{5} + 1 = \frac{11}{5}" display />
            <p><strong>Resposta: Sim, são perpendiculares. Intersecção: <M tex="\left(\dfrac{2}{5},\; \dfrac{11}{5}\right)" /></strong></p>
          </div>
        }
      >
        <p>
          As retas <M tex="r: 3x - y + 1 = 0" /> e <M tex="s: x + 3y - 7 = 0" /> são perpendiculares?
          Determine o ponto de intersecção.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <p>Para perpendiculares: <M tex="m_1 \cdot m_2 = -1" />.</p>
            <p>Reta <M tex="y = -3x + 1" /> tem <M tex="m_2 = -3" />.</p>
            <M tex="k \cdot (-3) = -1 \implies k = \frac{1}{3}" display />
            <p><strong>Resposta: <M tex="k = \dfrac{1}{3}" /></strong></p>
          </div>
        }
      >
        <p>
          Para que valor de <M tex="k" /> a reta <M tex="y = kx + 2" /> é perpendicular à reta{' '}
          <M tex="y = -3x + 1" />?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <p>Ponto <M tex="A(3, -1)" />, reta <M tex="5x - 12y + 26 = 0" />.</p>
            <M tex="d = \frac{|5(3) - 12(-1) + 26|}{\sqrt{25 + 144}} = \frac{|15 + 12 + 26|}{\sqrt{169}} = \frac{53}{13}" display />
            <p><strong>Resposta: <M tex="d = \dfrac{53}{13} \approx 4{,}08" /></strong></p>
          </div>
        }
      >
        <p>
          Calcule a distância do ponto <M tex="A(3, -1)" /> à reta <M tex="5x - 12y + 26 = 0" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        solution={
          <div className="space-y-2">
            <p>
              Para perpendicularidade: <M tex="m_r \cdot m_s = -1" />.
            </p>
            <p>Reta <M tex="s: 3x - y + 2 = 0 \Rightarrow m_s = 3" />.</p>
            <p>Reta <M tex="r: ax + 2y - 6 = 0 \Rightarrow m_r = -\dfrac{a}{2}" />.</p>
            <M tex="\left(-\frac{a}{2}\right) \cdot 3 = -1 \implies -\frac{3a}{2} = -1 \implies a = \frac{2}{3}" display />
            <p><strong>Resposta: <M tex="a = \dfrac{2}{3}" /></strong></p>
          </div>
        }
      >
        <p>
          As retas <M tex="r: ax + 2y - 6 = 0" /> e <M tex="s: 3x - y + 2 = 0" /> são perpendiculares.
          Determine o valor de <M tex="a" />.
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function A37PosicoesRelativas() {
  return (
    <TabPanel
      tabs={[
        <Teoria key="teoria" />,
        <Simulador key="simulador" />,
        <Exercicios key="exercicios" />,
        <Gabarito key="gabarito" />,
      ]}
    />
  )
}
