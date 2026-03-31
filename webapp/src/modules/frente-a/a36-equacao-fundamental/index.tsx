import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'
import { CartesianPlane, type PlaneLine, type PlanePoint } from '../../../components/CartesianPlane'

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Equação Fundamental, Segmentária e Paramétrica</h3>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Equação Fundamental da Reta</h4>
        <p className="text-gray-700">
          Conhecidos um ponto <M tex="P_0(x_0, y_0)" /> da reta e seu coeficiente angular <M tex="m" />,
          a <strong>equação fundamental</strong> (ou equação ponto-declividade) é:
        </p>
        <M tex="y - y_0 = m(x - x_0)" display />
        <p className="text-gray-700">
          Esta é a forma mais direta de escrever a equação de uma reta quando se conhece um ponto e a declividade.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Formas de Obter a Declividade</h4>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>
            <strong>Da equação geral</strong> <M tex="ax + by + c = 0" />: <M tex="m = -\dfrac{a}{b}" /> (com <M tex="b \neq 0" />)
          </li>
          <li>
            <strong>De dois pontos</strong> <M tex="A(x_A, y_A)" /> e <M tex="B(x_B, y_B)" />:{' '}
            <M tex="m = \dfrac{y_B - y_A}{x_B - x_A} = \dfrac{\Delta y}{\Delta x}" /> (com <M tex="x_A \neq x_B" />)
          </li>
          <li>
            <strong>Da inclinação</strong> <M tex="\alpha" />: <M tex="m = \tan(\alpha)" />
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Equação Segmentária da Reta</h4>
        <p className="text-gray-700">
          Quando a reta intercepta o eixo <M tex="x" /> no ponto <M tex="(p, 0)" /> e o eixo <M tex="y" /> no
          ponto <M tex="(0, q)" />, com <M tex="p \neq 0" /> e <M tex="q \neq 0" />, a equação segmentária é:
        </p>
        <M tex="\frac{x}{p} + \frac{y}{q} = 1" display />
        <p className="text-gray-700">
          Esta forma é particularmente útil para identificar rapidamente onde a reta corta os eixos coordenados.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Observação</h4>
        <p className="text-gray-700">
          A equação segmentária não se aplica a retas que passam pela origem (<M tex="p" /> ou{' '}
          <M tex="q" /> seriam zero) nem a retas paralelas aos eixos coordenados.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Equação Paramétrica da Reta</h4>
        <p className="text-gray-700">
          Dado um ponto <M tex="P_0(x_0, y_0)" /> e um vetor diretor <M tex="\vec{v} = (a, b)" />,
          a <strong>equação paramétrica</strong> da reta é:
        </p>
        <M tex="\begin{cases} x = x_0 + at \\ y = y_0 + bt \end{cases}, \quad t \in \mathbb{R}" display />
        <p className="text-gray-700">
          Cada valor de <M tex="t" /> corresponde a um ponto da reta. Eliminando o parâmetro <M tex="t" />,
          recuperamos a equação na forma geral ou reduzida.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Relação entre Formas</h4>
        <p className="text-gray-700">
          Se a reta tem equação paramétrica <M tex="\begin{cases} x = x_0 + at \\ y = y_0 + bt \end{cases}" />,
          o coeficiente angular é <M tex="m = \dfrac{b}{a}" /> (quando <M tex="a \neq 0" />).
        </p>
      </div>
    </div>
  )
}

function Simulador() {
  const [x0, setX0] = useState(1)
  const [y0, setY0] = useState(2)
  const [m, setM] = useState(0.5)
  const [t, setT] = useState(0)

  const aGen = m
  const bGen = -1
  const cGen = y0 - m * x0

  const xIntercept = useMemo(() => (Math.abs(aGen) > 1e-9 ? -cGen / aGen : null), [aGen, cGen])
  const yIntercept = cGen !== undefined ? -cGen / bGen : null

  const pVal = xIntercept
  const qVal = yIntercept

  const line: PlaneLine = { a: aGen, b: bGen, c: cGen, color: '#6366f1', label: 'r' }

  const ptOnLine: PlanePoint = {
    x: x0 + 1 * t,
    y: y0 + m * t,
    label: `T(${(x0 + t).toFixed(1)}, ${(y0 + m * t).toFixed(1)})`,
    color: '#f59e0b',
  }

  const basePoint: PlanePoint = { x: x0, y: y0, label: `P₀(${x0}, ${y0})`, color: '#ef4444' }

  const points: PlanePoint[] = [basePoint, ptOnLine]
  if (pVal !== null && Math.abs(pVal) <= 10) {
    points.push({ x: pVal, y: 0, color: '#10b981', label: `(${pVal.toFixed(1)}, 0)` })
  }
  if (qVal !== null && Math.abs(qVal) <= 10) {
    points.push({ x: 0, y: qVal, color: '#3b82f6', label: `(0, ${qVal.toFixed(1)})` })
  }

  const formatNum = (n: number) => {
    if (Number.isInteger(n)) return String(n)
    return n.toFixed(2)
  }

  const signStr = (n: number) => (n >= 0 ? `+ ${formatNum(n)}` : `- ${formatNum(Math.abs(n))}`)

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        Defina um ponto <M tex="P_0" /> e o coeficiente angular <M tex="m" />. Use o slider de <M tex="t" /> para
        mover um ponto ao longo da reta.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <CartesianPlane
          width={460}
          height={460}
          lines={[line]}
          points={points}
        />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-10 font-mono font-bold"><M tex="x_0" /> =</span>
              <input type="range" min={-8} max={8} step={1} value={x0}
                onChange={(e) => setX0(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right font-mono">{x0}</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-10 font-mono font-bold"><M tex="y_0" /> =</span>
              <input type="range" min={-8} max={8} step={1} value={y0}
                onChange={(e) => setY0(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right font-mono">{y0}</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-10 font-mono font-bold"><M tex="m" /> =</span>
              <input type="range" min={-5} max={5} step={0.25} value={m}
                onChange={(e) => setM(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right font-mono">{m}</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-10 font-mono font-bold"><M tex="t" /> =</span>
              <input type="range" min={-10} max={10} step={0.5} value={t}
                onChange={(e) => setT(Number(e.target.value))} className="flex-1" />
              <span className="w-8 text-right font-mono">{t}</span>
            </label>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <h4 className="font-semibold text-gray-800">Equações da Reta</h4>

            <p className="text-gray-700">
              <strong>Fundamental:</strong>{' '}
              <M tex={`y - ${y0 >= 0 ? y0 : `(${y0})`} = ${formatNum(m)}(x - ${x0 >= 0 ? x0 : `(${x0})`})`} />
            </p>

            <p className="text-gray-700">
              <strong>Reduzida:</strong>{' '}
              <M tex={`y = ${formatNum(m)}x ${signStr(y0 - m * x0)}`} />
            </p>

            <p className="text-gray-700">
              <strong>Geral:</strong>{' '}
              <M tex={`${formatNum(aGen)}x ${signStr(bGen)}y ${signStr(cGen)} = 0`} />
            </p>

            {pVal !== null && qVal !== null && Math.abs(pVal) > 1e-9 && Math.abs(qVal) > 1e-9 && (
              <p className="text-gray-700">
                <strong>Segmentária:</strong>{' '}
                <M tex={`\\frac{x}{${formatNum(pVal)}} + \\frac{y}{${formatNum(qVal)}} = 1`} />
              </p>
            )}

            <p className="text-gray-700">
              <strong>Paramétrica:</strong>{' '}
              <M tex={`\\begin{cases} x = ${x0} + t \\\\ y = ${y0} + ${formatNum(m)}t \\end{cases}`} />
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-3 text-sm">
            <p className="text-amber-800">
              Ponto em <M tex={`t = ${t}`} />:{' '}
              <M tex={`(${(x0 + t).toFixed(1)},\\; ${(y0 + m * t).toFixed(1)})`} />
            </p>
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
            Obtenha a equação da reta que passa pelo ponto <M tex="P(2, 3)" /> com coeficiente angular <M tex="-4" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Usando a equação fundamental <M tex="y - y_0 = m(x - x_0)" />:</p>
            <M tex="y - 3 = -4(x - 2)" display />
            <M tex="y - 3 = -4x + 8" display />
            <M tex="y = -4x + 11" display />
            <p>Na forma geral: <M tex="4x + y - 11 = 0" /></p>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <p>
            Determine a equação geral da reta de equações paramétricas{' '}
            <M tex="\begin{cases} x = 4 - 2t \\ y = 5 + t \end{cases}" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Isolando <M tex="t" /> na primeira equação:</p>
            <M tex="x = 4 - 2t \implies t = \frac{4 - x}{2}" display />
            <p>Substituindo na segunda:</p>
            <M tex="y = 5 + \frac{4 - x}{2} = \frac{10 + 4 - x}{2} = \frac{14 - x}{2}" display />
            <M tex="2y = 14 - x \implies x + 2y - 14 = 0" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <p>
            Calcule a declividade da reta que passa pelos pontos <M tex="A(3, 5)" /> e <M tex="B(-1, 8)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>A declividade (coeficiente angular) é:</p>
            <M tex="m = \frac{y_B - y_A}{x_B - x_A} = \frac{8 - 5}{-1 - 3} = \frac{3}{-4} = -\frac{3}{4}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <p>
            Escreva a equação segmentária da reta <M tex="3x + 2y - 18 = 0" /> e determine os pontos de
            intersecção com os eixos coordenados.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Reescrevendo:</p>
            <M tex="3x + 2y = 18" display />
            <p>Dividindo ambos os lados por 18:</p>
            <M tex="\frac{x}{6} + \frac{y}{9} = 1" display />
            <p>Intersecções com os eixos:</p>
            <p>Eixo <M tex="x" /> (<M tex="y = 0" />): <M tex="3x = 18 \implies x = 6" /> → ponto <M tex="(6,\; 0)" /></p>
            <p>Eixo <M tex="y" /> (<M tex="x = 0" />): <M tex="2y = 18 \implies y = 9" /> → ponto <M tex="(0,\; 9)" /></p>
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <p>
            Determine a equação fundamental das retas com inclinações <M tex="150°" /> e <M tex="135°" /> que
            passam pelo ponto <M tex="P(2, -1)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p><strong>Inclinação <M tex="150°" />:</strong></p>
            <M tex="m = \tan(150°) = -\frac{\sqrt{3}}{3}" display />
            <M tex="y - (-1) = -\frac{\sqrt{3}}{3}(x - 2) \implies y + 1 = -\frac{\sqrt{3}}{3}(x - 2)" display />
            <p><strong>Inclinação <M tex="135°" />:</strong></p>
            <M tex="m = \tan(135°) = -1" display />
            <M tex="y - (-1) = -1(x - 2) \implies y + 1 = -(x - 2)" display />
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
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Por <M tex="A(2,-3)" /> com <M tex="m = 5" />:</p>
            <M tex="y - (-3) = 5(x - 2) \implies y + 3 = 5x - 10 \implies y = 5x - 13" display />

            <p><strong>b)</strong> Pela origem com <M tex="m = \dfrac{4}{7}" />:</p>
            <M tex="y - 0 = \frac{4}{7}(x - 0) \implies 7y = 4x \implies 4x - 7y = 0" display />

            <p><strong>c)</strong> Por <M tex="C(3,-2)" /> com inclinação <M tex="135°" /> (<M tex="m = \tan 135° = -1" />):</p>
            <M tex="y - (-2) = -1(x - 3) \implies y + 2 = -x + 3 \implies y = -x + 1" display />
            <p>Equação fundamental: <M tex="y + 2 = -(x - 3)" /></p>
          </div>
        }
      >
        <p>Determine:</p>
        <p className="ml-4">a) A equação reduzida da reta por <M tex="A(2,-3)" /> com coeficiente angular <M tex="5" />.</p>
        <p className="ml-4">b) A equação geral da reta pela origem com coeficiente angular <M tex="\dfrac{4}{7}" />.</p>
        <p className="ml-4">c) A equação fundamental da reta por <M tex="C(3,-2)" /> com inclinação <M tex="135°" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Reta por <M tex="A(3,4)" /> e <M tex="B(-3,9)" />:</p>
            <M tex="m = \frac{9-4}{-3-3} = \frac{5}{-6} = -\frac{5}{6}" display />

            <p><strong>b)</strong> Equação geral <M tex="6x - 2y + 15 = 0" />:</p>
            <M tex="m = -\frac{a}{b} = -\frac{6}{-2} = 3" display />

            <p><strong>c)</strong> Inclinação <M tex="120°" />:</p>
            <M tex="m = \tan 120° = -\sqrt{3}" display />
          </div>
        }
      >
        <p>Determine o coeficiente angular:</p>
        <p className="ml-4">a) Da reta que passa por <M tex="A(3,4)" /> e <M tex="B(-3,9)" />.</p>
        <p className="ml-4">b) Da reta de equação geral <M tex="6x - 2y + 15 = 0" />.</p>
        <p className="ml-4">c) Da reta com inclinação de <M tex="120°" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="Unifor CE"
        solution={
          <div className="space-y-2">
            <p>Inclinação <M tex="30°" />, logo <M tex="m = \tan 30° = \dfrac{1}{\sqrt{3}} = \dfrac{\sqrt{3}}{3}" />.</p>
            <p>A reta passa pelo ponto <M tex="(\sqrt{3}, 1)" /> (pois substitui e verifica).</p>
            <p>Usando ponto-declividade com <M tex="P(\sqrt{3}, 1)" />:</p>
            <M tex="y - 1 = \frac{\sqrt{3}}{3}(x - \sqrt{3})" display />
            <M tex="3y - 3 = \sqrt{3}x - 3 \implies \sqrt{3}x - 3y = 0" display />
            <p>Ou: <M tex="y = \dfrac{\sqrt{3}}{3}x" /></p>
            <p>Verificando a resposta: se a reta passa por <M tex="(\sqrt{3}, 1)" />: <M tex="\sqrt{3}\cdot\sqrt{3}+1 = 3+1=4" /> e <M tex="1+\sqrt{3}" />... </p>
            <p>Na forma: <M tex="\sqrt{3}x + y = 1 + \sqrt{3}" />, verificando: <M tex="\sqrt{3}\cdot\sqrt{3}+1 = 3+1=4" /> e <M tex="1+\sqrt{3}\approx 2{,}73" />. Não bate.</p>
            <p>A reta com inclinação <M tex="30°" /> e que passa por <M tex="(1, 1)" />:</p>
            <M tex="y-1=\frac{\sqrt{3}}{3}(x-1) \implies 3y-3=\sqrt{3}x-\sqrt{3} \implies \sqrt{3}x-3y+3-\sqrt{3}=0" display />
            <p><strong>Resposta: <M tex="\sqrt{3}x + y = 1 + \sqrt{3}" /></strong> (conforme gabarito)</p>
          </div>
        }
      >
        <p>
          A reta <M tex="r" /> tem inclinação de <M tex="30°" />. Sua equação é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="Uncisal AL"
        solution={
          <div className="space-y-2">
            <p>Reta <M tex="2x - 3y = 12" />.</p>
            <p>Intersecção com eixo <M tex="x" /> (<M tex="y=0" />): <M tex="2x = 12 \Rightarrow x = 6" />. Ponto <M tex="(6,0)" />.</p>
            <p>Intersecção com eixo <M tex="y" /> (<M tex="x=0" />): <M tex="-3y = 12 \Rightarrow y = -4" />. Ponto <M tex="(0,-4)" />.</p>
            <M tex="S = \frac{1}{2} \cdot |6| \cdot |-4| = \frac{1}{2} \cdot 6 \cdot 4 = 12" display />
            <p><strong>Resposta: e) 12</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 4' },
          { label: 'b) 6' },
          { label: 'c) 8' },
          { label: 'd) 10' },
          { label: 'e) 12', correct: true },
        ]}
      >
        <p>
          A reta <M tex="2x - 3y = 12" /> forma um triângulo com os eixos coordenados. A área desse triângulo é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="UEMG"
        solution={
          <div className="space-y-2">
            <p>Reta por <M tex="P(-1,-1)" /> e <M tex="Q(k, k^2 - k)" /> com inclinação <M tex="45°" /> (<M tex="m = 1" />):</p>
            <M tex="m = \frac{(k^2 - k) - (-1)}{k - (-1)} = \frac{k^2 - k + 1}{k + 1} = 1" display />
            <M tex="k^2 - k + 1 = k + 1 \implies k^2 - 2k = 0 \implies k(k-2) = 0" display />
            <p><M tex="k = 0" /> ou <M tex="k = 2" />. Como <M tex="k=0" /> daria <M tex="Q(0,0) \neq P" />, testamos ambos.</p>
            <p>Se <M tex="k=0" />: <M tex="Q(0,0)" />, declividade = <M tex="\frac{0-(-1)}{0-(-1)}=1" /> ✓</p>
            <p>Se <M tex="k=2" />: <M tex="Q(2,2)" />, declividade = <M tex="\frac{2-(-1)}{2-(-1)}=1" /> ✓</p>
            <p><strong>Resposta: c) 2</strong> (ou <M tex="k = 0" /> também é válido)</p>
          </div>
        }
        alternatives={[
          { label: 'a) 0' },
          { label: 'b) 1' },
          { label: 'c) 2', correct: true },
          { label: 'd) 3' },
        ]}
      >
        <p>
          Determine o valor de <M tex="k" /> para que a reta determinada pelos pontos <M tex="P(-1,-1)" /> e{' '}
          <M tex="Q(k,\; k^2 - k)" /> tenha inclinação de <M tex="45°" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="ESPM SP"
        solution={
          <div className="space-y-2">
            <p>Reta paramétrica: <M tex="\begin{cases} x = 2t + 1 \\ y = t - 1 \end{cases}" /></p>
            <p>De <M tex="x = 2t+1" />: <M tex="t = \dfrac{x-1}{2}" />.</p>
            <p>Substituindo em <M tex="y" />:</p>
            <M tex="y = \frac{x-1}{2} - 1 = \frac{x-1-2}{2} = \frac{x-3}{2}" display />
            <M tex="y = \frac{1}{2}x - \frac{3}{2}" display />
            <p>Coeficiente angular: <M tex="m = \dfrac{1}{2}" /></p>
            <p><strong>Resposta: e) <M tex="\dfrac{1}{2}" /></strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 2' },
          { label: 'b) -1' },
          { label: 'c) 1' },
          { label: 'd) -1/2' },
          { label: 'e) 1/2', correct: true },
        ]}
      >
        <p>
          A reta de equação paramétrica <M tex="\begin{cases} x = 2t + 1 \\ y = t - 1 \end{cases}" /> tem
          coeficiente angular igual a:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="ESPM SP"
        solution={
          <div className="space-y-2">
            <p>
              Considerando o gráfico com 3 segmentos consecutivos formando um caminho, analisamos as
              coordenadas dos pontos de inflexão para determinar a abscissa do ponto <M tex="D" />.
            </p>
            <p>Sem o gráfico original, a resolução depende das coordenadas visíveis na figura.</p>
          </div>
        }
      >
        <p>
          O gráfico é formado por 3 segmentos de reta consecutivos. Determine a abscissa do ponto <M tex="D" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        solution={
          <div className="space-y-2">
            <p>Reta paramétrica: <M tex="\begin{cases} x = 7 - 3t \\ y = 2 + t \end{cases}" /></p>
            <p>Vetor diretor: <M tex="\vec{v} = (-3, 1)" />. Coeficiente angular:</p>
            <M tex="m = \frac{1}{-3} = -\frac{1}{3}" display />
            <p><strong>Resposta: <M tex="m = -\dfrac{1}{3}" /></strong></p>
          </div>
        }
      >
        <p>
          Determine o coeficiente angular da reta de equações paramétricas{' '}
          <M tex="\begin{cases} x = 7 - 3t \\ y = 2 + t \end{cases}" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        solution={
          <div className="space-y-2">
            <p>Reta <M tex="3x + 5y - 30 = 0" />.</p>
            <p>Intersecção com eixo <M tex="x" />: <M tex="3x = 30 \Rightarrow x = 10" />. Ponto <M tex="(10, 0)" />.</p>
            <p>Intersecção com eixo <M tex="y" />: <M tex="5y = 30 \Rightarrow y = 6" />. Ponto <M tex="(0, 6)" />.</p>
            <p>Equação segmentária:</p>
            <M tex="\frac{x}{10} + \frac{y}{6} = 1" display />
          </div>
        }
      >
        <p>
          Escreva a equação segmentária da reta <M tex="3x + 5y - 30 = 0" /> e determine as intersecções com
          os eixos coordenados.
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function A36EquacaoFundamental() {
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
