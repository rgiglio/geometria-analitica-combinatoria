import { useState, useRef, useEffect, useCallback } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

interface Vertex {
  x: number
  y: number
  label: string
  color: string
}

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Ponto Médio, Baricentro e Alinhamento de Três Pontos</h3>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Ponto Médio</h4>
        <p className="text-gray-700">
          Dados dois pontos <M tex="A(x_A, y_A)" /> e <M tex="B(x_B, y_B)" />, o <strong>ponto médio</strong>{' '}
          <M tex="M" /> do segmento <M tex="\overline{AB}" /> tem coordenadas:
        </p>
        <M tex="M = \left(\frac{x_A + x_B}{2},\; \frac{y_A + y_B}{2}\right)" display />
        <p className="text-gray-700">
          Essa fórmula decorre do <strong>Teorema de Tales</strong>: ao traçar paralelas aos eixos passando
          pelo ponto médio, obtemos segmentos divididos ao meio tanto na horizontal quanto na vertical.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Observação</h4>
        <p className="text-gray-700">
          Se <M tex="M" /> é ponto médio de <M tex="\overline{AB}" />, então conhecendo <M tex="M" /> e um
          dos extremos podemos encontrar o outro. Por exemplo, se conhecemos <M tex="M(x_M, y_M)" /> e{' '}
          <M tex="A(x_A, y_A)" />:
        </p>
        <M tex="x_B = 2x_M - x_A \qquad y_B = 2y_M - y_A" display />
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Baricentro de um Triângulo</h4>
        <p className="text-gray-700">
          O <strong>baricentro</strong> (ou centroide) <M tex="G" /> de um triângulo de vértices{' '}
          <M tex="A(x_A, y_A)" />, <M tex="B(x_B, y_B)" /> e <M tex="C(x_C, y_C)" /> é o ponto de
          interseção das <strong>medianas</strong>:
        </p>
        <M tex="G = \left(\frac{x_A + x_B + x_C}{3},\; \frac{y_A + y_B + y_C}{3}\right)" display />
        <p className="text-gray-700">
          As três medianas de um triângulo se interceptam no baricentro, que divide cada mediana
          na razão <M tex="2:1" /> a partir do vértice.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Condição de Alinhamento de Três Pontos</h4>
        <p className="text-gray-700">
          Três pontos <M tex="A(x_A, y_A)" />, <M tex="B(x_B, y_B)" /> e <M tex="C(x_C, y_C)" /> são{' '}
          <strong>colineares</strong> se, e somente se:
        </p>
        <M tex="\begin{vmatrix} x_A & y_A & 1 \\ x_B & y_B & 1 \\ x_C & y_C & 1 \end{vmatrix} = 0" display />
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5 space-y-4">
        <h4 className="text-lg font-bold text-indigo-900">Regra de Sarrus — determinante 3×3</h4>
        <p className="text-gray-700 leading-relaxed">
          Para calcular o determinante de uma matriz 3×3, <strong>repita as duas primeiras colunas</strong>{' '}
          à direita da matriz e aplique a regra:
        </p>
        <p className="text-gray-800 font-medium">
          soma das <span className="text-green-700">diagonais principais</span> (↘) − soma das{' '}
          <span className="text-red-700">diagonais secundárias</span> (↙)
        </p>

        <div className="bg-white rounded-lg border border-indigo-100 p-4 overflow-x-auto">
          <M
            tex={`\\det \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix}
= \\underbrace{aei + bfg + cdh}_{\\text{diagonais principais}}
- \\underbrace{ceg + afh + bdi}_{\\text{diagonais secundárias}}`}
            display
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="font-semibold text-green-800 mb-2">Diagonais principais (↘) — somar</p>
            <ul className="text-gray-700 space-y-1 list-disc list-inside">
              <li><M tex="a \cdot e \cdot i" /> (canto superior esquerdo → inferior direito)</li>
              <li><M tex="b \cdot f \cdot g" /></li>
              <li><M tex="c \cdot d \cdot h" /></li>
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="font-semibold text-red-800 mb-2">Diagonais secundárias (↙) — subtrair</p>
            <ul className="text-gray-700 space-y-1 list-disc list-inside">
              <li><M tex="c \cdot e \cdot g" /> (canto superior direito → inferior esquerdo)</li>
              <li><M tex="a \cdot f \cdot h" /></li>
              <li><M tex="b \cdot d \cdot i" /></li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-indigo-100 p-4">
          <p className="font-semibold text-gray-800 mb-2">Esquema visual (repita as 2 primeiras colunas)</p>
          <div className="font-mono text-sm text-center leading-loose text-gray-700">
            <div className="inline-grid grid-cols-5 gap-x-3 gap-y-1">
              {[
                ['a', 'b', 'c', 'a', 'b'],
                ['d', 'e', 'f', 'd', 'e'],
                ['g', 'h', 'i', 'g', 'h'],
              ].map((row, ri) =>
                row.map((cell, ci) => (
                  <span
                    key={`${ri}-${ci}`}
                    className={`px-2 py-1 rounded ${
                      ci >= 3 ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-50'
                    }`}
                  >
                    {cell}
                  </span>
                ))
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              As colunas 4 e 5 (destacadas) são cópias das colunas 1 e 2 — só para visualizar as diagonais.
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="font-semibold text-yellow-900 mb-2">Exemplo — alinhamento de A(1, −2), B(4, −11), C(−2, 7)</p>
          <M
            tex={`D = \\begin{vmatrix} 1 & -2 & 1 \\\\ 4 & -11 & 1 \\\\ -2 & 7 & 1 \\end{vmatrix}`}
            display
          />
          <p className="text-gray-700 text-sm mb-2">Principais: <M tex="1 \cdot (-11) \cdot 1 + (-2) \cdot 1 \cdot (-2) + 1 \cdot 4 \cdot 7 = -11 + 4 + 28 = 21" /></p>
          <p className="text-gray-700 text-sm mb-2">Secundárias: <M tex="(-2) \cdot (-11) \cdot 1 + 7 \cdot 1 \cdot 1 + 1 \cdot 4 \cdot (-2) = 22 + 7 - 8 = 21" /></p>
          <M tex="D = 21 - 21 = 0" display />
          <p className="text-green-700 font-semibold mt-2">Como <M tex="D = 0" />, os três pontos são colineares.</p>
        </div>

        <div className="bg-white rounded-lg border border-indigo-100 p-4">
          <p className="font-semibold text-gray-800 mb-2">Fórmula simplificada (caso dos pontos A, B, C)</p>
          <p className="text-gray-700 text-sm mb-2">
            Expandindo o determinante de alinhamento pela Sarrus, obtemos:
          </p>
          <M tex="D = x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)" display />
          <p className="text-gray-600 text-sm mt-2">
            Use Sarrus quando quiser ver o passo a passo; use a fórmula compacta para resolver mais rápido.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-gray-700">
          Se <M tex="D = 0" />, os pontos são colineares. Se <M tex="D \neq 0" />, formam um triângulo.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Área do Triângulo</h4>
        <p className="text-gray-700">
          Se os três pontos não são colineares, a área do triângulo formado por eles é:
        </p>
        <M tex="S = \frac{|D|}{2} = \frac{1}{2}\left|x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)\right|" display />
      </div>
    </div>
  )
}

function TriangleCanvas({ width = 500, height = 500 }: { width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridRange = 10
  const [vertices, setVertices] = useState<Vertex[]>([
    { x: -3, y: -2, label: 'A', color: '#ef4444' },
    { x: 4, y: -1, label: 'B', color: '#3b82f6' },
    { x: 1, y: 5, label: 'C', color: '#10b981' },
  ])
  const draggingRef = useRef<number | null>(null)

  const toScreen = useCallback(
    (x: number, y: number): [number, number] => {
      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / (2 * gridRange + 2)
      return [cx + x * scale, cy - y * scale]
    },
    [width, height]
  )

  const fromScreen = useCallback(
    (sx: number, sy: number): [number, number] => {
      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / (2 * gridRange + 2)
      return [(sx - cx) / scale, (cy - sy) / scale]
    },
    [width, height]
  )

  const midpoint = (a: Vertex, b: Vertex) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  })

  const barycenter = () => ({
    x: (vertices[0].x + vertices[1].x + vertices[2].x) / 3,
    y: (vertices[0].y + vertices[1].y + vertices[2].y) / 3,
  })

  const area = () => {
    const [a, b, c] = vertices
    return Math.abs(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, width, height)

    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 0.5
    for (let i = -gridRange; i <= gridRange; i++) {
      const [sx, sy] = toScreen(i, -gridRange)
      const [ex, ey] = toScreen(i, gridRange)
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke()
      const [sx2, sy2] = toScreen(-gridRange, i)
      const [ex2, ey2] = toScreen(gridRange, i)
      ctx.beginPath(); ctx.moveTo(sx2, sy2); ctx.lineTo(ex2, ey2); ctx.stroke()
    }

    ctx.strokeStyle = '#374151'
    ctx.lineWidth = 2
    const [ox, oy] = toScreen(0, 0)
    ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(width, oy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(ox, 0); ctx.lineTo(ox, height); ctx.stroke()

    ctx.fillStyle = '#6b7280'
    ctx.font = '11px Inter, sans-serif'
    ctx.textAlign = 'center'
    for (let i = -gridRange; i <= gridRange; i++) {
      if (i === 0) continue
      const [sx] = toScreen(i, 0)
      ctx.fillText(String(i), sx, oy + 14)
      const [, sy] = toScreen(0, i)
      ctx.fillText(String(i), ox - 14, sy + 4)
    }

    const [a, b, c] = vertices

    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    const [ax, ay] = toScreen(a.x, a.y)
    const [bx, by] = toScreen(b.x, b.y)
    const [cx, cy] = toScreen(c.x, c.y)
    ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.lineTo(cx, cy); ctx.closePath()
    ctx.fillStyle = 'rgba(99,102,241,0.08)'
    ctx.fill()
    ctx.stroke()

    const mAB = midpoint(a, b)
    const mBC = midpoint(b, c)
    const mAC = midpoint(a, c)

    ctx.setLineDash([4, 4])
    ctx.strokeStyle = '#f59e0b'
    ctx.lineWidth = 1
    const drawMedian = (vx: number, vy: number, mx: number, my: number) => {
      const [v1, v2] = toScreen(vx, vy)
      const [m1, m2] = toScreen(mx, my)
      ctx.beginPath(); ctx.moveTo(v1, v2); ctx.lineTo(m1, m2); ctx.stroke()
    }
    drawMedian(a.x, a.y, mBC.x, mBC.y)
    drawMedian(b.x, b.y, mAC.x, mAC.y)
    drawMedian(c.x, c.y, mAB.x, mAB.y)
    ctx.setLineDash([])

    const drawPoint = (px: number, py: number, color: string, label: string, size = 5) => {
      const [sx, sy] = toScreen(px, py)
      ctx.fillStyle = color
      ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#1f2937'
      ctx.font = 'bold 12px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(label, sx + 8, sy - 8)
    }

    drawPoint(mAB.x, mAB.y, '#f59e0b', 'M_AB', 3)
    drawPoint(mBC.x, mBC.y, '#f59e0b', 'M_BC', 3)
    drawPoint(mAC.x, mAC.y, '#f59e0b', 'M_AC', 3)

    const g = barycenter()
    drawPoint(g.x, g.y, '#7c3aed', 'G', 6)

    vertices.forEach((v) => drawPoint(v.x, v.y, v.color, v.label))
  }, [vertices, width, height, toScreen])

  const getVertexAt = (sx: number, sy: number): number | null => {
    for (let i = 0; i < vertices.length; i++) {
      const [vx, vy] = toScreen(vertices[i].x, vertices[i].y)
      if (Math.hypot(sx - vx, sy - vy) < 15) return i
    }
    return null
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    const sx = e.clientX - rect.left
    const sy = e.clientY - rect.top
    const idx = getVertexAt(sx, sy)
    if (idx !== null) draggingRef.current = idx
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingRef.current === null) return
    const rect = canvasRef.current!.getBoundingClientRect()
    const [x, y] = fromScreen(e.clientX - rect.left, e.clientY - rect.top)
    const rx = Math.round(x * 2) / 2
    const ry = Math.round(y * 2) / 2
    setVertices((prev) => {
      const next = [...prev]
      next[draggingRef.current!] = { ...next[draggingRef.current!], x: rx, y: ry }
      return next
    })
  }

  const handleMouseUp = () => {
    draggingRef.current = null
  }

  const g = barycenter()
  const [a, b, c] = vertices
  const mAB = midpoint(a, b)
  const mBC = midpoint(b, c)
  const mAC = midpoint(a, c)

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        Arraste os vértices do triângulo para ver os pontos médios, medianas, baricentro e área
        atualizando em tempo real.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <canvas
          ref={canvasRef}
          style={{ width, height }}
          className="rounded-xl border border-gray-200 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div className="flex-1 space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Vértices</h4>
            {vertices.map((v) => (
              <p key={v.label} className="text-gray-700">
                <span className="font-mono font-bold" style={{ color: v.color }}>{v.label}</span>
                ({v.x}, {v.y})
              </p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Pontos Médios</h4>
            <p className="text-gray-700"><M tex={`M_{AB} = (${mAB.x.toFixed(1)},\\; ${mAB.y.toFixed(1)})`} /></p>
            <p className="text-gray-700"><M tex={`M_{BC} = (${mBC.x.toFixed(1)},\\; ${mBC.y.toFixed(1)})`} /></p>
            <p className="text-gray-700"><M tex={`M_{AC} = (${mAC.x.toFixed(1)},\\; ${mAC.y.toFixed(1)})`} /></p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Baricentro</h4>
            <p className="text-gray-700">
              <M tex={`G = (${g.x.toFixed(2)},\\; ${g.y.toFixed(2)})`} />
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">Área</h4>
            <p className="text-gray-700">
              <M tex={`S = ${area().toFixed(2)} \\text{ u.a.}`} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Simulador() {
  return <TriangleCanvas />
}

function Exercicios() {
  return (
    <Quiz total={5}>
      <QuizCard
        id={1}
        statement={
          <>
            <p>
              O triângulo <M tex="ABC" /> tem vértices <M tex="A(2,2)" />, <M tex="B(-4,2)" /> e{' '}
              <M tex="C(0,8)" />.
            </p>
            <p className="ml-4">a) Determine as coordenadas do ponto <M tex="M" />, médio de <M tex="\overline{BC}" />.</p>
            <p className="ml-4">b) Calcule a medida da mediana <M tex="\overline{AM}" />.</p>
            <p className="ml-4">c) Determine as coordenadas do baricentro.</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Ponto médio de <M tex="\overline{BC}" />:</p>
            <M tex="M = \left(\frac{-4+0}{2},\;\frac{2+8}{2}\right) = (-2,\; 5)" display />
            <p><strong>b)</strong> Mediana <M tex="\overline{AM}" />:</p>
            <M tex="AM = \sqrt{(2-(-2))^2 + (2-5)^2} = \sqrt{16 + 9} = \sqrt{25} = 5" display />
            <p><strong>c)</strong> Baricentro:</p>
            <M tex="G = \left(\frac{2+(-4)+0}{3},\;\frac{2+2+8}{3}\right) = \left(-\frac{2}{3},\; 4\right)" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <p>
            Determine <M tex="x" /> e <M tex="y" /> para que <M tex="M(2,3)" /> seja o ponto médio de{' '}
            <M tex="A(x,7)" /> e <M tex="B(3,y)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Pela fórmula do ponto médio:</p>
            <M tex="\frac{x + 3}{2} = 2 \implies x + 3 = 4 \implies x = 1" display />
            <M tex="\frac{7 + y}{2} = 3 \implies 7 + y = 6 \implies y = -1" display />
            <p><strong>Resposta:</strong> <M tex="x = 1" /> e <M tex="y = -1" />.</p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <p>
            Verifique se os pontos <M tex="A(1,-2)" />, <M tex="B(4,-11)" /> e <M tex="C(-2,7)" /> são colineares.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Calculando o determinante:</p>
            <M tex="D = \begin{vmatrix} 1 & -2 & 1 \\ 4 & -11 & 1 \\ -2 & 7 & 1 \end{vmatrix}" display />
            <M tex="D = 1(-11-7) - (-2)(4-(-2)) + 1(28-22)" display />
            <M tex="= 1 \cdot (-18) - (-2) \cdot 6 + 1 \cdot 6" display />
            <M tex="= -18 + 12 + 6 = 0" display />
            <p>Como <M tex="D = 0" />, os pontos <strong>são colineares</strong>.</p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <p>
            Calcule a área do triângulo de vértices <M tex="A(1,2)" />, <M tex="B(2,4)" /> e <M tex="C(0,7)" />.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Usando a fórmula com determinante:</p>
            <M tex="D = x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)" display />
            <M tex="D = 1(4 - 7) + 2(7 - 2) + 0(2 - 4)" display />
            <M tex="= -3 + 10 + 0 = 7" display />
            <M tex="S = \frac{|D|}{2} = \frac{7}{2} = 3{,}5 \text{ u.a.}" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <p>
            Determine o valor de <M tex="m" /> para que os pontos <M tex="A(-2,7)" />, <M tex="B(m,-11)" /> e{' '}
            <M tex="C(1,-2)" /> sejam colineares (alinhados).
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Para colinearidade, o determinante deve ser zero:</p>
            <M tex="D = \begin{vmatrix} -2 & 7 & 1 \\ m & -11 & 1 \\ 1 & -2 & 1 \end{vmatrix} = 0" display />
            <M tex="D = -2(-11-(-2)) - 7(m - 1) + 1(-2m + 11)" display />
            <M tex="= -2(-9) - 7m + 7 - 2m + 11" display />
            <M tex="= 18 - 7m + 7 - 2m + 11 = 36 - 9m" display />
            <M tex="36 - 9m = 0 \implies m = 4" display />
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
        source="PUC Campinas SP"
        solution={
          <div className="space-y-2">
            <p>Paralelogramo <M tex="ABCD" />: <M tex="A(0,0)" />, <M tex="B(1,4)" />, <M tex="C(3,6)" />.</p>
            <p>Em um paralelogramo, as diagonais se bissetam. Logo o ponto médio de <M tex="AC" /> é igual ao ponto médio de <M tex="BD" />.</p>
            <M tex="M_{AC} = \left(\frac{0+3}{2},\;\frac{0+6}{2}\right) = \left(\frac{3}{2},\;3\right)" display />
            <p>Para <M tex="D(x,y)" />:</p>
            <M tex="\frac{1+x}{2} = \frac{3}{2} \implies x = 2 \qquad \frac{4+y}{2} = 3 \implies y = 2" display />
            <p>Logo <M tex="D(2,2)" />.</p>
            <M tex="BD = \sqrt{(2-1)^2 + (2-4)^2} = \sqrt{1+4} = \sqrt{5}" display />
            <p><strong>Resposta: <M tex="BD = \sqrt{5}" /></strong></p>
          </div>
        }
      >
        <p>
          No paralelogramo <M tex="ABCD" />, sabe-se que <M tex="A(0,0)" />, <M tex="B(1,4)" /> e{' '}
          <M tex="C(3,6)" />. A medida da diagonal <M tex="BD" /> vale:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="UEM PR"
        solution={
          <div className="space-y-2">
            <p>Se <M tex="P(1,1)" /> é ponto médio de <M tex="X(a,b)" /> e <M tex="X'" />, então:</p>
            <M tex="X' = (2 \cdot 1 - a,\; 2 \cdot 1 - b) = (2 - a,\; 2 - b)" display />
            <p><strong>Resposta: <M tex="X'(2-a,\; 2-b)" /></strong></p>
          </div>
        }
      >
        <p>
          Se <M tex="X" /> e <M tex="X'" /> são simétricos em relação ao ponto <M tex="P" /> (ponto médio do
          segmento <M tex="\overline{XX'}" />), determine o simétrico de <M tex="X(a,b)" /> em relação a{' '}
          <M tex="P(1,1)" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="Mackenzie SP"
        solution={
          <div className="space-y-2">
            <p>O segmento <M tex="AB" /> é prolongado até <M tex="M" /> tal que <M tex="AM = 3 \cdot AB" />.</p>
            <p>Isso significa que <M tex="M" /> está além de <M tex="B" />, com <M tex="B" /> a 1/3 de <M tex="A" /> até <M tex="M" />.</p>
            <p>Vetor <M tex="\vec{AB} = (1-3,\; 2-1) = (-2, 1)" />.</p>
            <M tex="M = A + 3\vec{AB} = (3,1) + 3(-2,1) = (3-6,\; 1+3) = (-3,\; 4)" display />
            <p><strong>Resposta: <M tex="M(-3, 4)" /></strong></p>
          </div>
        }
      >
        <p>
          O segmento <M tex="\overline{AB}" />, com <M tex="A(3,1)" /> e <M tex="B(1,2)" />, é prolongado até
          o ponto <M tex="M" /> de modo que o comprimento de <M tex="AM" /> seja o triplo do comprimento
          de <M tex="AB" />. Determine as coordenadas de <M tex="M" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="Unesp SP"
        solution={
          <div className="space-y-2">
            <M tex="AB = \sqrt{(1-(-2))^2 + (-2-1)^2} = \sqrt{9+9} = 3\sqrt{2}" display />
            <p>Baricentro de <M tex="ABC" /> é <M tex="\left(\tfrac{2}{3}, 1\right)" />:</p>
            <M tex="\frac{-2 + 1 + x_C}{3} = \frac{2}{3} \implies x_C = 3" display />
            <M tex="\frac{1 + (-2) + y_C}{3} = 1 \implies y_C = 4" display />
            <p><strong>Resposta: <M tex="AB = 3\sqrt{2}" /> e <M tex="C(3, 4)" /></strong></p>
          </div>
        }
      >
        <p>
          Dados <M tex="A(-2,1)" /> e <M tex="B(1,-2)" />, calcule a distância <M tex="AB" />.
          Sabendo que o baricentro do triângulo <M tex="ABC" /> é <M tex="\left(\tfrac{2}{3}, 1\right)" />,
          determine as coordenadas de <M tex="C" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="PUC RJ"
        solution={
          <div className="space-y-2">
            <p>Condição de alinhamento:</p>
            <M tex="\begin{vmatrix} 0 & 8 & 1 \\ 3 & 1 & 1 \\ 1 & y & 1 \end{vmatrix} = 0" display />
            <M tex="0(1-y) - 8(3-1) + 1(3y - 1) = 0" display />
            <M tex="-16 + 3y - 1 = 0 \implies 3y = 17 \implies y = \frac{17}{3}" display />
            <p><strong>Resposta: <M tex="y = \dfrac{17}{3}" /></strong></p>
          </div>
        }
      >
        <p>
          Os pontos <M tex="(0,8)" />, <M tex="(3,1)" /> e <M tex="(1,y)" /> são colineares. O valor de <M tex="y" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="UFG GO"
        solution={
          <div className="space-y-2">
            <p>Área do triângulo com vértices <M tex="A(2,1)" />, <M tex="B(3,5)" />, <M tex="C(7,4)" />:</p>
            <M tex="D = 2(5-4) + 3(4-1) + 7(1-5) = 2 + 9 - 28 = -17" display />
            <M tex="S = \frac{|-17|}{2} = 8{,}5 \text{ km}^2" display />
            <p><strong>Resposta: <M tex="8{,}5 \text{ km}^2" /></strong></p>
          </div>
        }
      >
        <p>
          Uma fazenda triangular tem vértices nos pontos <M tex="A(2,1)" />, <M tex="B(3,5)" /> e{' '}
          <M tex="C(7,4)" />, em que as coordenadas estão em quilômetros. A área dessa fazenda,
          em <M tex="\text{km}^2" />, é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="Unesp SP"
        solution={
          <div className="space-y-2">
            <p>Como <M tex="P(a,b)" />, <M tex="Q(1,3)" />, <M tex="R(-1,-1)" /> são colineares:</p>
            <M tex="\begin{vmatrix} a & b & 1 \\ 1 & 3 & 1 \\ -1 & -1 & 1 \end{vmatrix} = 0" display />
            <M tex="a(3-(-1)) - b(1-(-1)) + 1(1\cdot(-1) - 3\cdot(-1)) = 0" display />
            <M tex="4a - 2b + (-1+3) = 0 \implies 4a - 2b + 2 = 0 \implies 2a - b = -1" display />
            <p>E a condição <M tex="a + b = 7" />.</p>
            <p>Do sistema:</p>
            <M tex="\begin{cases} 2a - b = -1 \\ a + b = 7 \end{cases} \implies 3a = 6 \implies a = 2,\; b = 5" display />
            <p><strong>Resposta: <M tex="P(2, 5)" /></strong></p>
          </div>
        }
      >
        <p>
          Os pontos <M tex="P(a,b)" />, <M tex="Q(1,3)" /> e <M tex="R(-1,-1)" /> são colineares e{' '}
          <M tex="a + b = 7" />. Determine as coordenadas de <M tex="P" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="Unesp SP"
        solution={
          <div className="space-y-2">
            <p>Vértices: <M tex="P(2,1)" />, <M tex="Q(2,5)" />, <M tex="R(x_0, 4)" /> com <M tex="x_0 > 0" />.</p>
            <M tex="D = 2(5-4) + 2(4-1) + x_0(1-5) = 2 + 6 - 4x_0 = 8 - 4x_0" display />
            <M tex="S = \frac{|8 - 4x_0|}{2} = 20 \implies |8 - 4x_0| = 40" display />
            <p>Caso 1: <M tex="8 - 4x_0 = 40 \implies x_0 = -8" /> (descartado, pois <M tex="x_0 > 0" />).</p>
            <p>Caso 2: <M tex="8 - 4x_0 = -40 \implies 4x_0 = 48 \implies x_0 = 12" />.</p>
            <p><strong>Resposta: <M tex="x_0 = 12" /></strong></p>
          </div>
        }
      >
        <p>
          O triângulo de vértices <M tex="P(2,1)" />, <M tex="Q(2,5)" /> e <M tex="R(x_0, 4)" />, com{' '}
          <M tex="x_0 > 0" />, tem área igual a <M tex="20" />. O valor de <M tex="x_0" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="UFU MG"
        solution={
          <div className="space-y-2">
            <p>Polígono com vértices <M tex="A(0,0)" />, <M tex="B(5,0)" />, <M tex="C(5,1)" />, <M tex="D(3,4)" />, <M tex="E(3,2)" />, <M tex="F(1,1)" />.</p>
            <p>Utilizando a fórmula do cadarço (Shoelace):</p>
            <M tex="2S = |x_A(y_B-y_F) + x_B(y_C-y_A) + x_C(y_D-y_B) + x_D(y_E-y_C) + x_E(y_F-y_D) + x_F(y_A-y_E)|" display />
            <M tex="= |0(0-1) + 5(1-0) + 5(4-0) + 3(2-1) + 3(1-4) + 1(0-2)|" display />
            <M tex="= |0 + 5 + 20 + 3 - 9 - 2| = |17| = 17" display />
            <M tex="S = \frac{17}{2} = 8{,}5 \text{ u.a.}" display />
            <p><strong>Resposta: <M tex="S = 8{,}5 \text{ u.a.}" /></strong></p>
          </div>
        }
      >
        <p>
          Calcule a área do polígono de vértices <M tex="A(0,0)" />, <M tex="B(5,0)" />, <M tex="C(5,1)" />,{' '}
          <M tex="D(3,4)" />, <M tex="E(3,2)" /> e <M tex="F(1,1)" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="Unisa SP"
        solution={
          <div className="space-y-2">
            <p>Triângulo retângulo em <M tex="A(3,-2)" />, <M tex="B(6,1)" />, <M tex="C" /> no 2º quadrante com ordenada 2 e área 12.</p>
            <p>Logo <M tex="C(x_C, 2)" /> com <M tex="x_C < 0" />.</p>
            <p>Área:</p>
            <M tex="S = \frac{1}{2}|3(1-2) + 6(2-(-2)) + x_C(-2-1)| = 12" display />
            <M tex="\frac{1}{2}|-3 + 24 - 3x_C| = 12 \implies |21 - 3x_C| = 24" display />
            <p>Caso 1: <M tex="21 - 3x_C = 24 \implies x_C = -1" /> (2º quadrante ✓)</p>
            <p>Caso 2: <M tex="21 - 3x_C = -24 \implies x_C = 15" /> (não é 2º quadrante)</p>
            <p><strong>Resposta: <M tex="x_C = -1" />, ou seja, <M tex="C(-1, 2)" /></strong></p>
          </div>
        }
      >
        <p>
          Um triângulo retângulo tem vértices <M tex="A(3,-2)" /> e <M tex="B(6,1)" />. O vértice <M tex="C" /> está
          no 2º quadrante, tem ordenada <M tex="2" /> e a área do triângulo é <M tex="12" />. Determine a
          abscissa de <M tex="C" />.
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function A34PontoMedio() {
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
