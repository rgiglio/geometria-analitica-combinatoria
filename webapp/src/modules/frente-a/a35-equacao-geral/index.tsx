import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'
import { CartesianPlane, type PlaneLine, type PlanePoint } from '../../../components/CartesianPlane'

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Equação Geral e Equação Reduzida da Reta</h3>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Equação Geral da Reta</h4>
        <p className="text-gray-700">
          Dados dois pontos <M tex="A(x_A, y_A)" /> e <M tex="B(x_B, y_B)" />, a equação da reta que passa
          por eles pode ser obtida pela condição de alinhamento:
        </p>
        <M tex="\begin{vmatrix} x & y & 1 \\ x_A & y_A & 1 \\ x_B & y_B & 1 \end{vmatrix} = 0" display />
        <p className="text-gray-700">
          Desenvolvendo, obtemos a <strong>equação geral</strong> da reta:
        </p>
        <M tex="ax + by + c = 0" display />
        <p className="text-gray-700">
          onde <M tex="a" />, <M tex="b" /> e <M tex="c" /> são constantes reais com{' '}
          <M tex="a" /> e <M tex="b" /> não simultaneamente nulos.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Casos Especiais</h4>
        <ul className="text-gray-700 space-y-2 list-disc list-inside">
          <li>
            <strong>Reta horizontal</strong> (<M tex="a = 0" />): a equação reduz-se a{' '}
            <M tex="by + c = 0" />, ou seja, <M tex="y = -\dfrac{c}{b}" />.
          </li>
          <li>
            <strong>Reta vertical</strong> (<M tex="b = 0" />): a equação reduz-se a{' '}
            <M tex="ax + c = 0" />, ou seja, <M tex="x = -\dfrac{c}{a}" />.
          </li>
          <li>
            <strong>Reta pela origem</strong> (<M tex="c = 0" />): a equação é <M tex="ax + by = 0" />,
            passando por <M tex="(0,0)" />.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Inclinação e Declividade</h4>
        <p className="text-gray-700">
          A <strong>inclinação</strong> <M tex="\alpha" /> de uma reta é o ângulo que ela forma com o
          semieixo positivo de <M tex="x" />, medido no sentido anti-horário:
        </p>
        <M tex="0° \leq \alpha < 180°" display />
        <p className="text-gray-700">
          A <strong>declividade</strong> (ou coeficiente angular) <M tex="m" /> é a tangente da inclinação:
        </p>
        <M tex="m = \tan(\alpha)" display />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
          <h4 className="font-semibold text-blue-800 mb-2">Observação</h4>
          <ul className="text-gray-700 space-y-1 list-disc list-inside">
            <li>Reta horizontal: <M tex="\alpha = 0°" />, <M tex="m = 0" /></li>
            <li>Reta vertical: <M tex="\alpha = 90°" />, <M tex="m" /> não existe</li>
            <li>Reta crescente: <M tex="0° < \alpha < 90°" />, <M tex="m > 0" /></li>
            <li>Reta decrescente: <M tex="90° < \alpha < 180°" />, <M tex="m < 0" /></li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Equação Reduzida da Reta</h4>
        <p className="text-gray-700">
          A <strong>equação reduzida</strong> expressa <M tex="y" /> em função de <M tex="x" />:
        </p>
        <M tex="y = mx + n" display />
        <p className="text-gray-700">
          onde <M tex="m" /> é o <strong>coeficiente angular</strong> (declividade) e <M tex="n" /> é o{' '}
          <strong>coeficiente linear</strong> (ordenada do ponto onde a reta intercepta o eixo <M tex="y" />).
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Conversão entre Formas</h4>
        <p className="text-gray-700">
          Da equação geral <M tex="ax + by + c = 0" /> para a reduzida (quando <M tex="b \neq 0" />):
        </p>
        <M tex="m = -\frac{a}{b} \qquad n = -\frac{c}{b}" display />
        <p className="text-gray-700">
          Da equação reduzida <M tex="y = mx + n" /> para a geral:
        </p>
        <M tex="mx - y + n = 0" display />
      </div>
    </div>
  )
}

function Simulador() {
  const [mode, setMode] = useState<'general' | 'reduced'>('general')
  const [a, setA] = useState(1)
  const [b, setB] = useState(-1)
  const [c, setC] = useState(2)

  const mVal = useMemo(() => (Math.abs(b) > 1e-9 ? -a / b : null), [a, b])
  const nVal = useMemo(() => (Math.abs(b) > 1e-9 ? -c / b : null), [b, c])

  const inclinacao = useMemo(() => {
    if (mVal === null) return '90°'
    const deg = (Math.atan(mVal) * 180) / Math.PI
    return `${(deg < 0 ? deg + 180 : deg).toFixed(1)}°`
  }, [mVal])

  const xIntercept = useMemo(() => {
    if (Math.abs(a) < 1e-9) return null
    return -c / a
  }, [a, c])

  const yIntercept = useMemo(() => {
    if (Math.abs(b) < 1e-9) return null
    return -c / b
  }, [b, c])

  const line: PlaneLine = { a, b, c, color: '#6366f1', label: 'r' }

  const interceptPoints: PlanePoint[] = []
  if (xIntercept !== null && Math.abs(xIntercept) <= 10) {
    interceptPoints.push({ x: xIntercept, y: 0, label: `(${xIntercept.toFixed(1)}, 0)`, color: '#ef4444' })
  }
  if (yIntercept !== null && Math.abs(yIntercept) <= 10) {
    interceptPoints.push({ x: 0, y: yIntercept, label: `(0, ${yIntercept.toFixed(1)})`, color: '#3b82f6' })
  }

  const handleMChange = (newM: number) => {
    const newN = nVal ?? 0
    setA(newM)
    setB(-1)
    setC(newN)
  }

  const handleNChange = (newN: number) => {
    const currentM = mVal ?? 1
    setA(currentM)
    setB(-1)
    setC(newN)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('general')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'general' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Equação Geral
        </button>
        <button
          onClick={() => setMode('reduced')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'reduced' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Equação Reduzida
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <CartesianPlane
          width={460}
          height={460}
          lines={[line]}
          points={interceptPoints}
        />
        <div className="flex-1 space-y-4">
          {mode === 'general' ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Equação Geral: <M tex="ax + by + c = 0" /></h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 font-mono font-bold">a =</span>
                  <input
                    type="range" min={-5} max={5} step={0.5} value={a}
                    onChange={(e) => setA(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{a}</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 font-mono font-bold">b =</span>
                  <input
                    type="range" min={-5} max={5} step={0.5} value={b}
                    onChange={(e) => setB(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{b}</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 font-mono font-bold">c =</span>
                  <input
                    type="range" min={-10} max={10} step={0.5} value={c}
                    onChange={(e) => setC(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{c}</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Equação Reduzida: <M tex="y = mx + n" /></h4>
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 font-mono font-bold">m =</span>
                  <input
                    type="range" min={-5} max={5} step={0.25} value={mVal ?? 1}
                    onChange={(e) => handleMChange(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{(mVal ?? 1).toFixed(2)}</span>
                </label>
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 font-mono font-bold">n =</span>
                  <input
                    type="range" min={-10} max={10} step={0.5} value={nVal ?? 0}
                    onChange={(e) => handleNChange(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-10 text-right font-mono">{(nVal ?? 0).toFixed(1)}</span>
                </label>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <h4 className="font-semibold text-gray-800">Propriedades da Reta</h4>
            <p className="text-gray-700">
              <strong>Eq. Geral:</strong>{' '}
              <M tex={`${a}x + ${b < 0 ? `(${b})` : b}y + ${c < 0 ? `(${c})` : c} = 0`} />
            </p>
            {mVal !== null && (
              <p className="text-gray-700">
                <strong>Eq. Reduzida:</strong>{' '}
                <M tex={`y = ${mVal.toFixed(2)}x ${nVal! >= 0 ? '+' : ''} ${nVal!.toFixed(1)}`} />
              </p>
            )}
            <p className="text-gray-700"><strong>Inclinação:</strong> <M tex={`\\alpha = ${inclinacao}`} /></p>
            {mVal !== null && (
              <p className="text-gray-700"><strong>Declividade:</strong> <M tex={`m = ${mVal.toFixed(2)}`} /></p>
            )}
            {xIntercept !== null && (
              <p className="text-gray-700">
                <strong>Intersecção com eixo x:</strong> <M tex={`(${xIntercept.toFixed(1)},\\; 0)`} />
              </p>
            )}
            {yIntercept !== null && (
              <p className="text-gray-700">
                <strong>Intersecção com eixo y:</strong> <M tex={`(0,\\; ${yIntercept.toFixed(1)})`} />
              </p>
            )}
            {Math.abs(b) < 1e-9 && (
              <p className="text-amber-700 font-medium">Reta vertical — coeficiente angular não definido.</p>
            )}
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
            Obtenha a equação geral da reta que passa pelos pontos <M tex="A(-2, 3)" /> e <M tex="B(4, 6)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Usando a condição de alinhamento:</p>
            <M tex="\begin{vmatrix} x & y & 1 \\ -2 & 3 & 1 \\ 4 & 6 & 1 \end{vmatrix} = 0" display />
            <M tex="x(3 - 6) - y(-2 - 4) + 1(-12 - 12) = 0" display />
            <M tex="-3x + 6y - 24 = 0" display />
            <p>Dividindo por <M tex="-3" />:</p>
            <M tex="x - 2y + 8 = 0" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <>
            <p>Dada a reta <M tex="2x - 3y + 18 = 0" />:</p>
            <p className="ml-4">a) Verifique se o ponto <M tex="A(9, 12)" /> pertence à reta.</p>
            <p className="ml-4">b) Determine o ponto <M tex="B" />, intersecção da reta com o eixo <M tex="x" />.</p>
            <p className="ml-4">c) Determine o ponto <M tex="C" />, intersecção da reta com o eixo <M tex="y" />.</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Substituindo <M tex="A(9,12)" /> na equação:</p>
            <M tex="2(9) - 3(12) + 18 = 18 - 36 + 18 = 0 \;\checkmark" display />
            <p>O ponto <M tex="A" /> <strong>pertence</strong> à reta.</p>
            <p><strong>b)</strong> No eixo <M tex="x" />, <M tex="y = 0" />:</p>
            <M tex="2x + 18 = 0 \implies x = -9" display />
            <p><M tex="B(-9,\; 0)" /></p>
            <p><strong>c)</strong> No eixo <M tex="y" />, <M tex="x = 0" />:</p>
            <M tex="-3y + 18 = 0 \implies y = 6" display />
            <p><M tex="C(0,\; 6)" /></p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <p>
            Determine o ponto de intersecção das retas <M tex="r: 2x - y - 1 = 0" /> e{' '}
            <M tex="s: 4x + 3y - 17 = 0" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Da reta <M tex="r" />: <M tex="y = 2x - 1" />. Substituindo em <M tex="s" />:</p>
            <M tex="4x + 3(2x - 1) - 17 = 0" display />
            <M tex="4x + 6x - 3 - 17 = 0 \implies 10x = 20 \implies x = 2" display />
            <M tex="y = 2(2) - 1 = 3" display />
            <p><strong>Ponto de intersecção:</strong> <M tex="P(2,\; 3)" /></p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <p>
            Determine a equação reduzida da reta que passa pelos pontos <M tex="A(0, -5)" /> e{' '}
            <M tex="B(2, 7)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Coeficiente angular:</p>
            <M tex="m = \frac{7 - (-5)}{2 - 0} = \frac{12}{2} = 6" display />
            <p>Como <M tex="A(0,-5)" /> é o ponto onde a reta corta o eixo <M tex="y" />, temos <M tex="n = -5" />:</p>
            <M tex="y = 6x - 5" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <p>
            Determine a equação reduzida da reta com inclinação de <M tex="45°" /> que intercepta o eixo{' '}
            <M tex="y" /> no ponto <M tex="(0, -8)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Coeficiente angular a partir da inclinação:</p>
            <M tex="m = \tan(45°) = 1" display />
            <p>O coeficiente linear é <M tex="n = -8" /> (ponto de intersecção com eixo <M tex="y" />):</p>
            <M tex="y = x - 8" display />
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
            <p><strong>a)</strong> <M tex="A(0,2)" /> e <M tex="B(-3,7)" />:</p>
            <M tex="\begin{vmatrix} x & y & 1 \\ 0 & 2 & 1 \\ -3 & 7 & 1 \end{vmatrix} = 0" display />
            <M tex="x(2-7) - y(0+3) + 1(0+6) = 0 \implies -5x - 3y + 6 = 0 \implies 5x + 3y - 6 = 0" display />

            <p><strong>b)</strong> <M tex="C(-1,4)" /> e <M tex="D(-5,3)" />:</p>
            <M tex="\begin{vmatrix} x & y & 1 \\ -1 & 4 & 1 \\ -5 & 3 & 1 \end{vmatrix} = 0" display />
            <M tex="x(4-3) - y(-1+5) + 1(-3+20) = 0 \implies x - 4y + 17 = 0" display />

            <p><strong>c)</strong> <M tex="E(-2,-4)" /> e <M tex="F(5,0)" />:</p>
            <M tex="\begin{vmatrix} x & y & 1 \\ -2 & -4 & 1 \\ 5 & 0 & 1 \end{vmatrix} = 0" display />
            <M tex="x(-4-0) - y(-2-5) + 1(0+20) = 0 \implies -4x + 7y + 20 = 0 \implies 4x - 7y - 20 = 0" display />
          </div>
        }
      >
        <p>Determine a equação geral da reta que passa pelos pontos:</p>
        <p className="ml-4">a) <M tex="A(0,2)" /> e <M tex="B(-3,7)" /></p>
        <p className="ml-4">b) <M tex="C(-1,4)" /> e <M tex="D(-5,3)" /></p>
        <p className="ml-4">c) <M tex="E(-2,-4)" /> e <M tex="F(5,0)" /></p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Reta <M tex="2x+3y-18=0" />. Eixo <M tex="x" />: <M tex="y=0 \Rightarrow 2x=18 \Rightarrow x=9" />. Ponto: <M tex="(9,0)" />.</p>
            <p><strong>b)</strong> Eixo <M tex="y" />: <M tex="x=0 \Rightarrow 3y=18 \Rightarrow y=6" />. Ponto: <M tex="(0,6)" />.</p>
            <p><strong>c)</strong> <M tex="P(3,4)" />: <M tex="2(3)+3(4)-18=6+12-18=0" />. Pertence ✓</p>
            <p><M tex="Q(5,-3)" />: <M tex="2(5)+3(-3)-18=10-9-18=-17\neq 0" />. Não pertence ✗</p>
          </div>
        }
      >
        <p>Dada a reta <M tex="2x + 3y - 18 = 0" />, determine:</p>
        <p className="ml-4">a) O ponto de intersecção com o eixo <M tex="x" />.</p>
        <p className="ml-4">b) O ponto de intersecção com o eixo <M tex="y" />.</p>
        <p className="ml-4">c) Se <M tex="P(3,4)" /> e <M tex="Q(5,-3)" /> pertencem à reta.</p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Paralela ao eixo <M tex="x" /> por <M tex="P(-3,5)" />: <M tex="y = 5" />, ou <M tex="0x + y - 5 = 0" />.</p>
            <p><strong>b)</strong> Paralela ao eixo <M tex="y" /> por <M tex="Q(-4,6)" />: <M tex="x = -4" />, ou <M tex="x + 0y + 4 = 0" />.</p>
            <p><strong>c)</strong> Pela origem e <M tex="R(4,12)" />: <M tex="m = 12/4 = 3" />. Eq: <M tex="y = 3x" />, ou <M tex="3x - y = 0" />.</p>
          </div>
        }
      >
        <p>Determine:</p>
        <p className="ml-4">a) A equação geral da reta paralela ao eixo <M tex="x" /> que passa por <M tex="P(-3,5)" />.</p>
        <p className="ml-4">b) A equação geral da reta paralela ao eixo <M tex="y" /> que passa por <M tex="Q(-4,6)" />.</p>
        <p className="ml-4">c) A equação geral da reta que passa pela origem e pelo ponto <M tex="R(4,12)" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> <M tex="2x - y = 0" /> e <M tex="x + y - 15 = 0" />.</p>
            <p>Da 1ª: <M tex="y = 2x" />. Substituindo na 2ª: <M tex="x + 2x = 15 \Rightarrow x = 5,\; y = 10" />.</p>
            <p>Ponto: <M tex="(5, 10)" />.</p>

            <p><strong>b)</strong> <M tex="2x + y - 5 = 0" /> e <M tex="x - y - 1 = 0" />.</p>
            <p>Somando: <M tex="3x - 6 = 0 \Rightarrow x = 2,\; y = 1" />.</p>
            <p>Ponto: <M tex="(2, 1)" />.</p>
          </div>
        }
      >
        <p>Determine o ponto de intersecção das retas:</p>
        <p className="ml-4">a) <M tex="2x - y = 0" /> e <M tex="x + y - 15 = 0" /></p>
        <p className="ml-4">b) <M tex="2x + y - 5 = 0" /> e <M tex="x - y - 1 = 0" /></p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        solution={
          <div className="space-y-2">
            <p>
              Resolvendo o sistema formado pelas duas equações das retas para encontrar o ponto <M tex="P" /> de intersecção.
            </p>
          </div>
        }
      >
        <p>
          Duas retas se interceptam no ponto <M tex="P" />. Determine as coordenadas de <M tex="P" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="UFOP MG"
        solution={
          <div className="space-y-2">
            <p>A reta <M tex="r" /> passa por <M tex="(-1,-3)" /> e <M tex="(2,3)" />.</p>
            <M tex="m = \frac{3 - (-3)}{2 - (-1)} = \frac{6}{3} = 2" display />
            <p>Equação: <M tex="y - 3 = 2(x - 2) \Rightarrow y = 2x - 1" /></p>
            <p>Para <M tex="(m, 7) \in r" />: <M tex="7 = 2m - 1 \Rightarrow m = 4" />.</p>
            <p><strong>Resposta: d) 4</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 1' },
          { label: 'b) 2' },
          { label: 'c) 3' },
          { label: 'd) 4', correct: true },
          { label: 'e) 5' },
        ]}
      >
        <p>
          A reta <M tex="r" /> passa pelos pontos <M tex="(-1,-3)" /> e <M tex="(2,3)" />. Determine o valor
          de <M tex="m" /> para que <M tex="(m, 7)" /> pertença a <M tex="r" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        solution={
          <div className="space-y-2">
            <p>
              Quadrado <M tex="ABCD" /> de lado <M tex="4\sqrt{2}" />. Seja <M tex="A" /> na origem e lados
              paralelos às bissetrizes dos quadrantes. <M tex="AB" /> na direção de inclinação <M tex="45°" />,
              logo coeficiente angular de <M tex="AB" /> é <M tex="m_{AB} = 1" />.
            </p>
            <p>
              Se <M tex="A(0,0)" /> e <M tex="AB" /> tem declividade 1, então <M tex="B = (4, 4)" /> (pois
              lado = <M tex="4\sqrt{2}" /> na diagonal equivale a <M tex="\Delta x = \Delta y = 4" />).
            </p>
            <p>
              <M tex="BC" /> é perpendicular a <M tex="AB" />, logo <M tex="m_{BC} = -1" />.
              Passando por <M tex="B(4,4)" />: <M tex="y - 4 = -1(x - 4) \Rightarrow y = -x + 8" />.
            </p>
            <p>
              <M tex="AD" /> é paralela a <M tex="BC" />, logo <M tex="m_{AD} = -1" />.
              Passando por <M tex="A(0,0)" />: <M tex="y = -x" />.
            </p>
          </div>
        }
      >
        <p>
          Dado o quadrado <M tex="ABCD" /> de lado <M tex="4\sqrt{2}" />, determine o coeficiente angular de{' '}
          <M tex="AB" />, e as equações reduzidas de <M tex="BC" /> e <M tex="AD" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="Unicamp SP"
        solution={
          <div className="space-y-2">
            <p>Reta <M tex="2x - 3y - 12 = 0" />:</p>
            <p>Intersecção com eixo <M tex="x" /> (<M tex="y=0" />): <M tex="2x = 12 \Rightarrow x = 6" />. Ponto <M tex="A(6,0)" />.</p>
            <p>Intersecção com eixo <M tex="y" /> (<M tex="x=0" />): <M tex="-3y = 12 \Rightarrow y = -4" />. Ponto <M tex="B(0,-4)" />.</p>
            <M tex="M = \left(\frac{6+0}{2},\; \frac{0+(-4)}{2}\right) = (3, -2)" display />
            <p><strong>Resposta: <M tex="(3, -2)" /></strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) (3, 2)' },
          { label: 'b) (-3, 2)' },
          { label: 'c) (-3, -2)' },
          { label: 'd) (3, -2)', correct: true },
        ]}
      >
        <p>
          A reta <M tex="2x - 3y - 12 = 0" /> intercepta os eixos coordenados nos pontos <M tex="A" /> e{' '}
          <M tex="B" />. O ponto médio de <M tex="\overline{AB}" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Coeficiente angular <M tex="m = 2" />, coeficiente linear <M tex="n = -8" />:</p>
            <M tex="y = 2x - 8" display />
            <p><strong>b)</strong> Coeficiente angular <M tex="m = -5" />, passa por <M tex="P(0,3)" /> (logo <M tex="n = 3" />):</p>
            <M tex="y = -5x + 3" display />
            <p><strong>c)</strong> Inclinação <M tex="30°" />, logo <M tex="m = \tan 30° = \dfrac{\sqrt{3}}{3}" />. Coeficiente linear <M tex="n = 10" />:</p>
            <M tex="y = \frac{\sqrt{3}}{3}x + 10" display />
          </div>
        }
      >
        <p>Determine a equação reduzida da reta:</p>
        <p className="ml-4">a) com coeficiente angular <M tex="2" /> e coeficiente linear <M tex="-8" />.</p>
        <p className="ml-4">b) com coeficiente angular <M tex="-5" /> passando por <M tex="P(0,3)" />.</p>
        <p className="ml-4">c) com inclinação de <M tex="30°" /> e coeficiente linear <M tex="10" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="PUC RJ"
        solution={
          <div className="space-y-2">
            <p>
              Retângulo <M tex="ABCD" /> com lados sobre os eixos. Área <M tex="= 15" />, <M tex="AB = 5" />.
              Logo o outro lado vale <M tex="3" />.
            </p>
            <p>
              Se <M tex="AB" /> está no eixo <M tex="x" />, temos <M tex="A(0,0)" />, <M tex="B(5,0)" />,{' '}
              <M tex="C(5,3)" />, <M tex="D(0,3)" />.
            </p>
            <p>Reta por <M tex="D(0,3)" /> e <M tex="B(5,0)" />:</p>
            <M tex="m = \frac{0-3}{5-0} = -\frac{3}{5}" display />
            <M tex="y = -\frac{3}{5}x + 3" display />
            <p><strong>Resposta: <M tex="y = -\dfrac{3}{5}x + 3" /></strong></p>
          </div>
        }
      >
        <p>
          Um retângulo <M tex="ABCD" /> tem lados sobre os eixos coordenados, área <M tex="15" /> e{' '}
          <M tex="AB = 5" />. Determine a equação da reta que passa por <M tex="D" /> e <M tex="B" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={11}
        source="Insper SP"
        solution={
          <div className="space-y-2">
            <p>Reta <M tex="r" />: <M tex="y = 10x + a" />. Reta <M tex="s" />: <M tex="y = 9x + b" />.</p>
            <p>Intersecção (mesma abscissa <M tex="x = 6" />):</p>
            <M tex="10(6) + a = 9(6) + b \implies 60 + a = 54 + b \implies b = a + 6" display />
            <p><strong>Resposta: d) <M tex="b = a + 6" /></strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) b = a - 6' },
          { label: 'b) b = a + 1' },
          { label: 'c) b = a - 1' },
          { label: 'd) b = a + 6', correct: true },
          { label: 'e) b = 6a' },
        ]}
      >
        <p>
          A reta <M tex="r" /> tem coeficiente angular <M tex="10" /> e intercepta o eixo <M tex="y" /> em um
          ponto de ordenada <M tex="a" />. A reta <M tex="s" /> tem coeficiente angular <M tex="9" /> e
          intercepta o eixo <M tex="y" /> em um ponto de ordenada <M tex="b" />. As retas interceptam-se em
          um ponto de abscissa <M tex="6" />. Então:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={12}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>Triângulo isósceles <M tex="ABC" /> com base <M tex="A(4,0)" />, <M tex="B(0,6)" />.</p>
            <M tex="AB = \sqrt{16+36} = \sqrt{52} = 2\sqrt{13}" display />
            <p><M tex="C" /> está sobre <M tex="y = x - 4" />, logo <M tex="C = (t, t-4)" />.</p>
            <p>Isósceles: <M tex="CA = CB" />:</p>
            <M tex="(t-4)^2 + (t-4)^2 = t^2 + (t-4-6)^2" display />
            <M tex="2(t-4)^2 = t^2 + (t-10)^2" display />
            <M tex="2t^2 - 16t + 32 = t^2 + t^2 - 20t + 100" display />
            <M tex="2t^2 - 16t + 32 = 2t^2 - 20t + 100" display />
            <M tex="4t = 68 \implies t = 17" display />
            <p><M tex="C = (17, 13)" />.</p>
            <p>Declividade de <M tex="BC" />:</p>
            <M tex="m_{BC} = \frac{13 - 6}{17 - 0} = \frac{7}{17}" display />
            <p><strong>Resposta: <M tex="m_{BC} = \dfrac{7}{17}" /></strong></p>
          </div>
        }
      >
        <p>
          O triângulo isósceles <M tex="ABC" /> tem base <M tex="\overline{AB}" />, com <M tex="A(4,0)" /> e{' '}
          <M tex="B(0,6)" />. O vértice <M tex="C" /> pertence à reta <M tex="y = x - 4" />. A declividade
          da reta <M tex="BC" /> é:
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function A35EquacaoGeral() {
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
