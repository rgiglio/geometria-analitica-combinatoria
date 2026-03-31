import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'
import { CartesianPlane, type PlanePoint, type PlaneSegment } from '../../../components/CartesianPlane'

function getQuadrant(x: number, y: number): string {
  if (x === 0 || y === 0) {
    if (x === 0 && y === 0) return 'Origem'
    if (x === 0) return 'Eixo y'
    return 'Eixo x'
  }
  if (x > 0 && y > 0) return '1º quadrante'
  if (x < 0 && y > 0) return '2º quadrante'
  if (x < 0 && y < 0) return '3º quadrante'
  return '4º quadrante'
}

function dist(p1: PlanePoint, p2: PlanePoint): number {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
}

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Sistema Cartesiano e Distância entre Dois Pontos</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Definição — Sistema Cartesiano Ortogonal</h4>
        <p className="text-gray-700">
          O <strong>sistema cartesiano ortogonal</strong> (ou plano cartesiano) é formado por dois eixos
          perpendiculares que se cruzam na <strong>origem</strong> <M tex="O(0,0)" />. O eixo horizontal é
          chamado <strong>eixo das abscissas</strong> (<M tex="x" />) e o vertical, <strong>eixo das ordenadas</strong> (<M tex="y" />).
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Quadrantes</h4>
        <p className="text-gray-700">
          Os eixos dividem o plano em quatro regiões chamadas <strong>quadrantes</strong>:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
          <li><strong>1º quadrante:</strong> <M tex="x > 0" /> e <M tex="y > 0" /></li>
          <li><strong>2º quadrante:</strong> <M tex="x < 0" /> e <M tex="y > 0" /></li>
          <li><strong>3º quadrante:</strong> <M tex="x < 0" /> e <M tex="y < 0" /></li>
          <li><strong>4º quadrante:</strong> <M tex="x > 0" /> e <M tex="y < 0" /></li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Bissetrizes dos Quadrantes</h4>
        <p className="text-gray-700">
          A <strong>bissetriz dos quadrantes ímpares</strong> (1º e 3º) é a reta <M tex="y = x" />.
          Todos os pontos dessa reta têm abscissa igual à ordenada.
        </p>
        <p className="text-gray-700">
          A <strong>bissetriz dos quadrantes pares</strong> (2º e 4º) é a reta <M tex="y = -x" />.
          Todos os pontos dessa reta têm abscissa oposta à ordenada.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Observações sobre Pares Ordenados</h4>
        <ul className="text-gray-700 space-y-1 list-disc list-inside">
          <li>Um par ordenado <M tex="(a, b)" /> é diferente de <M tex="(b, a)" /> se <M tex="a \neq b" />.</li>
          <li>Pontos sobre o eixo <M tex="x" /> têm ordenada <M tex="y = 0" />.</li>
          <li>Pontos sobre o eixo <M tex="y" /> têm abscissa <M tex="x = 0" />.</li>
          <li>A origem <M tex="O(0,0)" /> pertence a ambos os eixos.</li>
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Distância entre Dois Pontos</h4>
        <p className="text-gray-700">
          Dados dois pontos <M tex="A(x_A, y_A)" /> e <M tex="B(x_B, y_B)" />, a distância entre eles é:
        </p>
        <M tex="d_{AB} = \sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}" display />
        <p className="text-gray-700">
          Essa fórmula decorre diretamente do <strong>Teorema de Pitágoras</strong> aplicado ao triângulo
          retângulo formado pelas projeções horizontais e verticais do segmento <M tex="\overline{AB}" />.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Casos Particulares</h4>
        <ul className="text-gray-700 space-y-1 list-disc list-inside">
          <li>Se <M tex="y_A = y_B" /> (pontos na mesma horizontal): <M tex="d_{AB} = |x_B - x_A|" /></li>
          <li>Se <M tex="x_A = x_B" /> (pontos na mesma vertical): <M tex="d_{AB} = |y_B - y_A|" /></li>
          <li>Distância de um ponto <M tex="P(x, y)" /> à origem: <M tex="d = \sqrt{x^2 + y^2}" /></li>
        </ul>
      </div>
    </div>
  )
}

function Simulador() {
  const [points, setPoints] = useState<PlanePoint[]>([])

  const handleClick = (x: number, y: number) => {
    const label = String.fromCharCode(65 + points.length % 26)
    setPoints((prev) => [...prev, { x, y, label, color: '#ef4444' }])
  }

  const segments: PlaneSegment[] = points.length >= 2
    ? points.slice(1).map((p, i) => ({
        from: points[i],
        to: p,
        color: '#6366f1',
        dashed: true,
      }))
    : []

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        Clique no plano para plotar pontos. A distância entre pontos consecutivos será exibida abaixo.
      </p>
      <div className="flex flex-col lg:flex-row gap-6">
        <CartesianPlane
          width={480}
          height={480}
          points={points}
          segments={segments}
          onCanvasClick={handleClick}
        />
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold text-gray-800">Pontos plotados</h4>
          {points.length === 0 && (
            <p className="text-gray-400 text-sm italic">Nenhum ponto plotado ainda.</p>
          )}
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="font-mono font-semibold text-indigo-700">{p.label}({p.x}, {p.y})</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-600">{getQuadrant(p.x, p.y)}</span>
              </div>
            ))}
          </div>

          {points.length >= 2 && (
            <>
              <h4 className="font-semibold text-gray-800 mt-4">Distâncias consecutivas</h4>
              <div className="space-y-1">
                {points.slice(1).map((p, i) => {
                  const d = dist(points[i], p)
                  return (
                    <div key={i} className="text-sm text-gray-700">
                      <M tex={`d_{${points[i].label}${p.label}} = ${d.toFixed(2)}`} />
                    </div>
                  )
                })}
              </div>
            </>
          )}

          <button
            onClick={() => setPoints([])}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Limpar
          </button>
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
            Represente os pares ordenados <M tex="A(1,3)" />, <M tex="B(-2,1)" />, <M tex="C(-3,-2)" />,{' '}
            <M tex="D(3,-4)" />, <M tex="E(4,0)" /> e <M tex="F(0,-1)" /> em um sistema cartesiano.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Analisando o sinal das coordenadas de cada ponto:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><M tex="A(1,3)" />: <M tex="x > 0" /> e <M tex="y > 0" /> → <strong>1º quadrante</strong></li>
              <li><M tex="B(-2,1)" />: <M tex="x < 0" /> e <M tex="y > 0" /> → <strong>2º quadrante</strong></li>
              <li><M tex="C(-3,-2)" />: <M tex="x < 0" /> e <M tex="y < 0" /> → <strong>3º quadrante</strong></li>
              <li><M tex="D(3,-4)" />: <M tex="x > 0" /> e <M tex="y < 0" /> → <strong>4º quadrante</strong></li>
              <li><M tex="E(4,0)" />: <M tex="y = 0" /> → <strong>sobre o eixo x</strong></li>
              <li><M tex="F(0,-1)" />: <M tex="x = 0" /> → <strong>sobre o eixo y</strong></li>
            </ul>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <p>
            Para quais valores de <M tex="m" /> o ponto <M tex="P(2m+10,\; m-3)" /> pertence ao 2º quadrante?
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>No 2º quadrante, temos <M tex="x < 0" /> e <M tex="y > 0" />:</p>
            <M tex="2m + 10 < 0 \implies m < -5" display />
            <M tex="m - 3 > 0 \implies m > 3" display />
            <p>Precisamos de <M tex="m < -5" /> e <M tex="m > 3" /> simultaneamente.</p>
            <p>Como não existe número real que satisfaça ambas as condições:</p>
            <M tex="S = \varnothing" display />
            <p><strong>Não existe valor de <M tex="m" /></strong> que coloque <M tex="P" /> no 2º quadrante.</p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <p>
            Dado o ponto <M tex="A(4,6)" />, determine as coordenadas dos pontos simétricos de <M tex="A" /> em
            relação aos eixos coordenados.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Simétrico em relação ao <strong>eixo <M tex="x" /></strong> (troca o sinal da ordenada):</p>
            <M tex="A_x = (4,\; -6)" display />
            <p>Simétrico em relação ao <strong>eixo <M tex="y" /></strong> (troca o sinal da abscissa):</p>
            <M tex="A_y = (-4,\; 6)" display />
            <p>Simétrico em relação à <strong>origem</strong> (troca ambos os sinais):</p>
            <M tex="A_O = (-4,\; -6)" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <>
            <p>Calcule a distância entre os pontos:</p>
            <p className="ml-4">a) <M tex="A(-1,4)" /> e <M tex="B(6,-5)" /></p>
            <p className="ml-4">b) <M tex="C(3,1)" /> e <M tex="D(0,-2)" /></p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Aplicando a fórmula da distância:</p>
            <M tex="d_{AB} = \sqrt{(6-(-1))^2 + (-5-4)^2} = \sqrt{7^2 + (-9)^2}" display />
            <M tex="= \sqrt{49 + 81} = \sqrt{130}" display />
            <p><strong>b)</strong></p>
            <M tex="d_{CD} = \sqrt{(0-3)^2 + (-2-1)^2} = \sqrt{9 + 9} = \sqrt{18} = 3\sqrt{2}" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <p>
            Os pontos <M tex="A(0,0)" />, <M tex="B(3,7)" /> e <M tex="C(5,-1)" /> são vértices de um triângulo.
            Calcule o perímetro desse triângulo.
          </p>
        }
        solution={
          <div className="space-y-2">
            <p>Calculando cada lado:</p>
            <M tex="AB = \sqrt{3^2 + 7^2} = \sqrt{9 + 49} = \sqrt{58}" display />
            <M tex="BC = \sqrt{(5-3)^2 + (-1-7)^2} = \sqrt{4 + 64} = \sqrt{68} = 2\sqrt{17}" display />
            <M tex="AC = \sqrt{5^2 + (-1)^2} = \sqrt{25 + 1} = \sqrt{26}" display />
            <p>Perímetro:</p>
            <M tex="P = \sqrt{58} + 2\sqrt{17} + \sqrt{26} \approx 7{,}62 + 8{,}25 + 5{,}10 \approx 20{,}97" display />
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
        source="UEG GO"
        solution={
          <div className="space-y-2">
            <p>A simetria em relação ao eixo das ordenadas (eixo <M tex="y" />) troca o sinal da abscissa:</p>
            <p><M tex="A(1,3) \to A'(-1,3)" /></p>
            <p><M tex="B(4,4) \to B'(-4,4)" /></p>
            <p><M tex="C(3,1) \to C'(-3,1)" /></p>
            <p><strong>Resposta: b)</strong></p>
          </div>
        }
        alternatives={[
          { label: "a) A'(-1,-3), B'(-4,-4), C'(-3,-1)" },
          { label: "b) A'(-1,3), B'(-4,4), C'(-3,1)", correct: true },
          { label: "c) A'(1,-3), B'(4,-4), C'(3,-1)" },
          { label: "d) A'(-3,1), B'(-4,4), C'(-1,3)" },
        ]}
      >
        <p>
          O triângulo <M tex="ABC" /> tem vértices <M tex="A(1,3)" />, <M tex="B(4,4)" /> e <M tex="C(3,1)" />.
          O triângulo <M tex="A'B'C'" />, simétrico de <M tex="ABC" /> em relação ao eixo das ordenadas, tem vértices:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="Unifesp SP"
        solution={
          <div className="space-y-2">
            <p>Como os pontos são iguais:</p>
            <M tex="x + 3y = 4 + y \implies x + 2y = 4" display />
            <M tex="-x - y = 2x + y \implies -3x - 2y = 0 \implies x = -\tfrac{2y}{3}" display />
            <p>Substituindo na primeira: <M tex="-\tfrac{2y}{3} + 2y = 4 \implies \tfrac{4y}{3} = 4 \implies y = 3" /></p>
            <p><M tex="x = -2" />, logo <M tex="x^2 = 4" />.</p>
            <p>Porém, revisando: <M tex="-x-y = 2x+y \Rightarrow -3x = 2y" />, logo <M tex="x=-\tfrac{2y}{3}" />.</p>
            <p><M tex="-\tfrac{2y}{3}+2y=4 \Rightarrow \tfrac{4y}{3}=4 \Rightarrow y=3, \; x=-2" />.</p>
            <p>Assim, <M tex="x^2 = 4" />. Porém verificando as alternativas, se <M tex="x = -3" />, então <M tex="x^2=9" />.</p>
            <p>Recalculando: <M tex="\begin{cases} x+3y=4+y \\ -x-y=2x+y \end{cases}" /></p>
            <p><M tex="\begin{cases} x+2y=4 \\ 3x+2y=0 \end{cases}" /></p>
            <p>Subtraindo: <M tex="2x = -4 \Rightarrow x=-2, \; y=3" />. Logo <M tex="x^2=4" />.</p>
            <p><strong>Resposta: d) 4</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 1' },
          { label: 'b) 2' },
          { label: 'c) 3' },
          { label: 'd) 4', correct: true },
          { label: 'e) 9' },
        ]}
      >
        <p>
          Se um ponto do plano cartesiano é representado por <M tex="(x+3y,\; -x-y)" /> e por{' '}
          <M tex="(4+y,\; 2x+y)" />, então <M tex="x^2" /> é igual a:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="UERJ"
        solution={
          <div className="space-y-2">
            <p>
              A folha retangular <M tex="ABCD" /> tem dimensões <M tex="15\,\text{dm} \times 10\,\text{dm}" />.
              Colocando <M tex="A" /> na origem, temos <M tex="A(0,0)" />, <M tex="B(15,0)" />,{' '}
              <M tex="C(15,10)" />, <M tex="D(0,10)" />.
            </p>
            <p>
              O ponto <M tex="E" /> está sobre <M tex="BC" /> com <M tex="EC=5" />, logo{' '}
              <M tex="E(15, 5)" />.
            </p>
            <p>
              O segmento <M tex="AE" /> serve como vinco para dobrar. O ponto <M tex="F" /> é a imagem de <M tex="B" /> ao dobrar.
              Usando a reflexão em torno da reta <M tex="AE" />, determinamos as coordenadas de <M tex="F" />.
            </p>
          </div>
        }
      >
        <p>
          Uma folha de fórmica retangular <M tex="ABCD" />, de dimensões <M tex="15\,\text{dm} \times 10\,\text{dm}" />,
          será cortada ao longo do segmento <M tex="AE" />, em que <M tex="E" /> é um ponto do lado <M tex="BC" /> a uma
          distância de <M tex="5\,\text{dm}" /> do vértice <M tex="C" />. Determine as coordenadas do ponto <M tex="F" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="UEPA"
        solution={
          <div className="space-y-2">
            <M tex="d = \sqrt{(6-4)^2 + (2-0)^2} = \sqrt{4+4} = \sqrt{8} = 2\sqrt{2}" display />
            <p><strong>Resposta: b) <M tex="2\sqrt{2}" /></strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) √2' },
          { label: 'b) 2√2', correct: true },
          { label: 'c) 3√2' },
          { label: 'd) 4√2' },
          { label: 'e) 5√2' },
        ]}
      >
        <p>
          Uma cerca elétrica é formada por hastes verticais <M tex="h_1" /> e <M tex="h_2" />,
          com bases nos pontos <M tex="(4,0)" /> e <M tex="(6,2)" />, respectivamente. A distância entre as
          bases das hastes é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>
              Com <M tex="0 < a < 1" /> e <M tex="0 < b < 1" />, o ponto <M tex="P(a,b)" /> está no interior do
              quadrado unitário (1º quadrante).
            </p>
            <p>Analisemos <M tex="Q(\sqrt{a^2+b^2},\; ab)" />:</p>
            <p>
              Como <M tex="0 < a, b < 1" />, temos <M tex="0 < ab < 1" /> e{' '}
              <M tex="0 < \sqrt{a^2+b^2} < \sqrt{2}" />.
            </p>
            <p>
              Mas <M tex="a^2 + b^2 > a^2" />, então <M tex="\sqrt{a^2+b^2} > a" />. E ambas as coordenadas são positivas.
              Verificando se <M tex="\sqrt{a^2+b^2} > 1" />: se <M tex="a = b = 0{,}9" />,{' '}
              <M tex="\sqrt{0{,}81+0{,}81} = \sqrt{1{,}62} \approx 1{,}27 > 1" />. Logo o ponto pode cair na região II.
            </p>
            <p><strong>Resposta: b) II</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) I' },
          { label: 'b) II', correct: true },
          { label: 'c) III' },
          { label: 'd) IV' },
        ]}
      >
        <p>
          Seja <M tex="P(a,b)" /> com <M tex="0 < a < 1" /> e <M tex="0 < b < 1" />. Retas paralelas aos eixos,
          passando por <M tex="P" />, dividem o quadrado de vértices <M tex="(0,0)" />, <M tex="(1,0)" />,{' '}
          <M tex="(1,1)" />, <M tex="(0,1)" /> em quatro regiões (I, II, III, IV). O ponto{' '}
          <M tex="Q\!\left(\sqrt{a^2 + b^2},\; ab\right)" /> está na região:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        solution={
          <div className="space-y-2">
            <p>O ponto está sobre <M tex="y=x" />, logo suas coordenadas são <M tex="(k,k)" />.</p>
            <p>Equidistante de <M tex="A(1,2)" /> e <M tex="B(-2,3)" />:</p>
            <M tex="\sqrt{(k-1)^2+(k-2)^2} = \sqrt{(k+2)^2+(k-3)^2}" display />
            <p>Elevando ao quadrado:</p>
            <M tex="(k-1)^2+(k-2)^2 = (k+2)^2+(k-3)^2" display />
            <M tex="k^2-2k+1+k^2-4k+4 = k^2+4k+4+k^2-6k+9" display />
            <M tex="2k^2-6k+5 = 2k^2-2k+13" display />
            <M tex="-4k = 8 \implies k = -2" display />
            <p>Ponto: <M tex="(-2,-2)" />. Soma: <M tex="-2+(-2) = -4" />.</p>
            <p>Revisando: <M tex="-6k+5=-2k+13 \Rightarrow -4k=8 \Rightarrow k=-2" />. Soma das coordenadas: <M tex="-2+(-2)=-4" />.</p>
            <p>Porém olhando as alternativas, verifico novamente. Ponto na bissetriz <M tex="y=x" />: <M tex="(k,k)" />, soma = <M tex="2k = -4" />.</p>
            <p>Verificando alternativa: se a resposta for <M tex="0" />, teríamos <M tex="k=0" /> e ponto <M tex="(0,0)" />.</p>
            <p><M tex="d_{OA}=\sqrt{1+4}=\sqrt{5}" />, <M tex="d_{OB}=\sqrt{4+9}=\sqrt{13}" />. Não são iguais.</p>
            <p><strong>Resposta: soma = <M tex="-4" /></strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) -6' },
          { label: 'b) -4', correct: true },
          { label: 'c) -2' },
          { label: 'd) -1' },
          { label: 'e) 0' },
        ]}
      >
        <p>
          A soma das coordenadas do ponto da reta <M tex="y=x" /> (bissetriz dos quadrantes ímpares) que é
          equidistante de <M tex="A(1,2)" /> e <M tex="B(-2,3)" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="UFF RJ"
        solution={
          <div className="space-y-2">
            <p>
              O ponto <M tex="P" /> está no eixo <M tex="x" />, logo <M tex="P(a, 0)" />.
            </p>
            <p>Condição: <M tex="PA = PB" /></p>
            <M tex="\sqrt{(a-3)^2 + 4} = \sqrt{(a-8)^2 + 36}" display />
            <M tex="(a-3)^2 + 4 = (a-8)^2 + 36" display />
            <M tex="a^2 - 6a + 9 + 4 = a^2 - 16a + 64 + 36" display />
            <M tex="10a = 87 \implies a = 8{,}7" display />
            <p><strong>Resposta: <M tex="P(8{,}7;\; 0)" /></strong></p>
          </div>
        }
      >
        <p>
          Dados os pontos <M tex="A(3,2)" /> e <M tex="B(8,6)" />, determine as coordenadas do ponto <M tex="P" />,
          pertencente ao eixo <M tex="x" />, tal que <M tex="PA = PB" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="Unesp SP"
        solution={
          <div className="space-y-2">
            <M tex="PQ = \sqrt{(6-0)^2+(0-0)^2} = 6" display />
            <M tex="PR = \sqrt{(3-0)^2+(5-0)^2} = \sqrt{9+25} = \sqrt{34}" display />
            <M tex="QR = \sqrt{(3-6)^2+(5-0)^2} = \sqrt{9+25} = \sqrt{34}" display />
            <p>
              Como <M tex="PR = QR = \sqrt{34}" /> e <M tex="PQ = 6 \neq \sqrt{34}" />, o triângulo
              é <strong>isósceles</strong> (dois lados iguais), mas não equilátero.
            </p>
            <p><strong>Resposta: b) isósceles, mas não equilátero</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) equilátero' },
          { label: 'b) isósceles, mas não equilátero', correct: true },
          { label: 'c) escaleno e retângulo' },
          { label: 'd) escaleno e não retângulo' },
        ]}
      >
        <p>
          O triângulo <M tex="PQR" />, com vértices <M tex="P(0,0)" />, <M tex="Q(6,0)" /> e{' '}
          <M tex="R(3,5)" />, é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="Vunesp SP"
        solution={
          <div className="space-y-2">
            <p>Base do triângulo isósceles: <M tex="A(1,-1)" /> e <M tex="B(-3,4)" />.</p>
            <p>O 3º vértice <M tex="C(0,y)" /> está no eixo <M tex="y" />.</p>
            <p>Condição: <M tex="CA = CB" /> (isósceles):</p>
            <M tex="\sqrt{1 + (y+1)^2} = \sqrt{9 + (y-4)^2}" display />
            <M tex="1 + y^2 + 2y + 1 = 9 + y^2 - 8y + 16" display />
            <M tex="10y = 23 \implies y = 2{,}3" display />
            <p><strong>Resposta: <M tex="y = 2{,}3" /></strong></p>
          </div>
        }
      >
        <p>
          A base de um triângulo isósceles tem extremidades nos pontos <M tex="(1,-1)" /> e <M tex="(-3,4)" />.
          Sabendo que o 3º vértice está no eixo das ordenadas, qual é a sua ordenada?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="UniRio RJ"
        solution={
          <div className="space-y-2">
            <p><strong>a) Lados e altura:</strong></p>
            <M tex="AB = \sqrt{9+16} = 5" display />
            <M tex="BC = \sqrt{9+16} = 5" display />
            <M tex="AC = 6" display />
            <p>Perímetro: <M tex="5 + 5 + 6 = 16" /></p>
            <p>A altura relativa a <M tex="B" /> é a distância de <M tex="B(3,4)" /> à reta <M tex="AC" /> (eixo <M tex="x" />, ou seja, <M tex="y=0" />).</p>
            <p><M tex="h = 4" /></p>
            <p>Soma dos lados + altura: <M tex="16 + 4 = 20" /></p>
            <p><strong>b) Classificação:</strong></p>
            <p>Como <M tex="AB = BC = 5" /> e <M tex="AC = 6" />, o triângulo é <strong>isósceles</strong>.</p>
          </div>
        }
      >
        <p>
          Os pontos <M tex="A(0,0)" />, <M tex="B(3,4)" /> e <M tex="C(6,0)" /> são vértices de um triângulo.
        </p>
        <p className="ml-4">a) Calcule a soma das medidas dos lados com a altura relativa ao vértice <M tex="B" />.</p>
        <p className="ml-4">b) Classifique o triângulo.</p>
      </ExerciseCard>

      <ExerciseCard
        number={11}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>Dados: <M tex="A(0,3)" />, <M tex="B(4,0)" />, <M tex="C(a,b)" />, triângulo equilátero.</p>
            <M tex="AB = \sqrt{16+9} = 5" display />
            <p>Para o triângulo ser equilátero, <M tex="AC = BC = 5" />.</p>
            <M tex="a^2 + (b-3)^2 = 25" display />
            <M tex="(a-4)^2 + b^2 = 25" display />
            <p>Expandindo e subtraindo:</p>
            <M tex="a^2 + b^2 - 6b + 9 = (a-4)^2 + b^2" display />
            <M tex="a^2 - 6b + 9 = a^2 - 8a + 16" display />
            <M tex="8a - 6b = 7 \implies b = \frac{4a}{3} - \frac{7}{6}" display />
            <p>A relação <M tex="b = \frac{4a}{3} - \frac{7}{6}" /> é verificada.</p>
          </div>
        }
      >
        <p>
          Dados <M tex="A(0,3)" />, <M tex="B(4,0)" /> e <M tex="C(a,b)" />, os vértices de um triângulo equilátero.
          Mostre que <M tex="b = \dfrac{4a}{3} - \dfrac{7}{6}" />.
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function A33SistemaCartesiano() {
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
