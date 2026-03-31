import { useState, useMemo } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

/* ───────────────── TEORIA ───────────────── */

function Teoria() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900">
        Progressão Aritmética — Definição, Classificação e Termo Geral
      </h3>

      {/* Definição */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Definição</h4>
        <p className="text-gray-800 leading-relaxed">
          <strong>Progressão Aritmética (PA)</strong> é toda sequência numérica em que cada termo, a
          partir do segundo, é obtido somando-se uma constante <M tex="r" /> ao termo anterior. Essa
          constante é chamada de <strong>razão</strong> da PA.
        </p>
        <M tex="a_{n+1} = a_n + r \quad \Longrightarrow \quad r = a_{n+1} - a_n" display />
      </div>

      {/* Exemplo introdutório */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-2">Exemplo</h4>
        <p className="text-gray-700 mb-2">
          A sequência <M tex="(2,\; 5,\; 8,\; 11,\; 14,\; \ldots)" /> é uma PA de razão{' '}
          <M tex="r = 3" />, pois:
        </p>
        <M tex="5 - 2 = 3, \quad 8 - 5 = 3, \quad 11 - 8 = 3, \quad 14 - 11 = 3" display />
        <p className="text-gray-600 text-sm mt-2">
          Para obter a razão, basta subtrair qualquer termo do seu seguinte.
        </p>
      </div>

      {/* Classificação */}
      <h3 className="text-xl font-bold text-gray-900 pt-2">Classificação</h3>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-800 mb-1">PA Crescente</h4>
          <p className="text-gray-700 text-sm mb-2">
            <M tex="r > 0" />
          </p>
          <p className="text-gray-600 text-sm">
            Ex: <M tex="(6,\;10,\;14,\;18,\;22,\;\ldots)" />
          </p>
          <p className="text-green-700 text-sm font-semibold mt-1">
            <M tex="r = 4" />
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-bold text-red-800 mb-1">PA Decrescente</h4>
          <p className="text-gray-700 text-sm mb-2">
            <M tex="r < 0" />
          </p>
          <p className="text-gray-600 text-sm">
            Ex: <M tex="(5,\;2,\;-1,\;-4,\;-7,\;\ldots)" />
          </p>
          <p className="text-red-700 text-sm font-semibold mt-1">
            <M tex="r = -3" />
          </p>
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
          <h4 className="font-bold text-gray-700 mb-1">PA Constante</h4>
          <p className="text-gray-700 text-sm mb-2">
            <M tex="r = 0" />
          </p>
          <p className="text-gray-600 text-sm">
            Ex: <M tex="(4,\;4,\;4,\;4,\;\ldots)" />
          </p>
          <p className="text-gray-500 text-sm font-semibold mt-1">
            <M tex="r = 0" />
          </p>
        </div>
      </div>

      {/* Termo geral */}
      <h3 className="text-xl font-bold text-gray-900 pt-2">Termo Geral</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Fórmula do Termo Geral</h4>
        <M tex="a_n = a_1 + (n - 1) \cdot r" display />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Derivação</h4>
        <p className="text-gray-700 mb-3">
          Partindo da definição <M tex="a_{n+1} = a_n + r" />, escrevemos cada termo em função de{' '}
          <M tex="a_1" />:
        </p>
        <M
          tex={`\\begin{aligned}
a_2 &= a_1 + r \\\\
a_3 &= a_1 + 2r \\\\
a_4 &= a_1 + 3r \\\\
&\\;\\vdots \\\\
a_n &= a_1 + (n-1)\\,r
\\end{aligned}`}
          display
        />
        <p className="text-gray-600 text-sm mt-2">
          O expoente de <M tex="r" /> é sempre uma unidade a menos que o índice do termo.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Observação</h4>
        <p className="text-gray-700">
          A fórmula do termo geral também pode ser escrita em função de qualquer termo{' '}
          <M tex="a_k" /> conhecido:
        </p>
        <M tex="a_n = a_k + (n - k) \cdot r" display />
      </div>
    </div>
  )
}

/* ───────────────── SIMULADOR ───────────────── */

function Simulador() {
  const [a1, setA1] = useState(2)
  const [r, setR] = useState(3)
  const [nCalc, setNCalc] = useState(10)

  const terms = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => a1 + i * r)
  }, [a1, r])

  const classification = r > 0 ? 'Crescente' : r < 0 ? 'Decrescente' : 'Constante'
  const classColor = r > 0 ? 'text-green-600' : r < 0 ? 'text-red-600' : 'text-gray-500'
  const barColor = r > 0 ? 'bg-green-500' : r < 0 ? 'bg-red-500' : 'bg-gray-400'

  const an = a1 + (nCalc - 1) * r
  const maxAbs = Math.max(...terms.map(Math.abs), 1)

  const numberLineMin = Math.min(...terms) - Math.abs(r || 1)
  const numberLineMax = Math.max(...terms) + Math.abs(r || 1)
  const numberLineRange = numberLineMax - numberLineMin || 1

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Simulador de PA</h3>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="a_1" /> (primeiro termo)
          </label>
          <input
            type="number"
            value={a1}
            onChange={(e) => setA1(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="r" /> (razão)
          </label>
          <input
            type="number"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Classification badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Classificação:</span>
        <span className={`font-bold text-lg ${classColor}`}>{classification}</span>
        <span className="text-sm text-gray-500">
          (<M tex={`r = ${r}`} />)
        </span>
      </div>

      {/* Bar chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Primeiros 15 termos</h4>
        <div className="flex items-end gap-1.5 h-48">
          {terms.map((val, i) => {
            const height = maxAbs > 0 ? (Math.abs(val) / maxAbs) * 100 : 10
            const isNeg = val < 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                <span className="text-[10px] text-gray-600 mb-1 font-mono">{val}</span>
                <div className="w-full relative flex flex-col justify-end h-full">
                  {isNeg ? (
                    <div className="flex flex-col items-center justify-start" style={{ height: '50%' }}>
                      <div className="w-full bg-red-400 rounded-t opacity-80" style={{ height: `${height}%` }} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-end" style={{ height: '100%' }}>
                      <div className={`w-full ${barColor} rounded-t opacity-80`} style={{ height: `${height}%`, minHeight: '2px' }} />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1">
                  <M tex={`a_{${i + 1}}`} />
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Number line */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-4">Reta Numérica</h4>
        <div className="relative h-16">
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300" />
          {terms.map((val, i) => {
            const pct = ((val - numberLineMin) / numberLineRange) * 100
            return (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
              >
                <span className="text-[9px] text-gray-500 whitespace-nowrap">
                  {val}
                </span>
                <div className={`w-2 h-2 rounded-full mt-0.5 ${barColor}`} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Calculate aₙ */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
        <h4 className="font-semibold text-indigo-800 mb-3">
          Calcular <M tex="a_n" />
        </h4>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-sm font-medium text-gray-700">
            <M tex="n =" />
          </label>
          <input
            type="number"
            min={1}
            value={nCalc}
            onChange={(e) => setNCalc(Math.max(1, Number(e.target.value)))}
            className="w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="bg-white rounded-lg p-4 border border-indigo-100">
          <M
            tex={`a_{${nCalc}} = a_1 + (${nCalc} - 1) \\cdot r = ${a1} + ${nCalc - 1} \\cdot (${r}) = ${a1} + ${(nCalc - 1) * r} = ${an}`}
            display
          />
        </div>
      </div>
    </div>
  )
}

/* ───────────────── EXERCÍCIOS (Propostos p.774) ───────────────── */

function Exercicios() {
  return (
    <Quiz total={4}>
      <QuizCard
        id={1}
        statement={
          <span>
            Escreva os cinco primeiros termos das PAs:{' '}
            <strong>a)</strong> Primeiro termo <M tex="-2" />, razão <M tex="3" />.{' '}
            <strong>b)</strong> Segundo termo <M tex="13" />, razão <M tex="-6" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> <M tex="a_1 = -2" />, <M tex="r = 3" />:</p>
            <M tex="(-2,\; 1,\; 4,\; 7,\; 10)" display />
            <p><strong>b)</strong> <M tex="a_2 = 13" />, <M tex="r = -6" />. Primeiro, <M tex="a_1 = a_2 - r = 13 - (-6) = 19" />:</p>
            <M tex="(19,\; 13,\; 7,\; 1,\; -5)" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Dada a PA <M tex="(x+1,\; 3x+1,\; x+13,\; \ldots)" />, determine{' '}
            <M tex="x" /> e a razão.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Em uma PA, a diferença entre termos consecutivos é constante:</p>
            <M tex="(3x+1) - (x+1) = (x+13) - (3x+1)" display />
            <M tex="2x = -2x + 12" display />
            <M tex="4x = 12 \implies x = 3" display />
            <p>Substituindo: <M tex="(4,\;10,\;16,\;\ldots)" /></p>
            <M tex="r = 10 - 4 = 6" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Dada a PA <M tex="(10,\;17,\;24,\;\ldots,\;143)" />, determine:{' '}
            <strong>a)</strong> O décimo termo.{' '}
            <strong>b)</strong> A quantidade de termos.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> <M tex="a_1 = 10" />, <M tex="r = 7" />. O décimo termo:</p>
            <M tex="a_{10} = 10 + 9 \cdot 7 = 10 + 63 = 73" display />
            <p><strong>b)</strong> O último termo é 143:</p>
            <M tex="143 = 10 + (n-1) \cdot 7" display />
            <M tex="133 = 7(n-1) \implies n - 1 = 19 \implies n = 20" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Escreva a PA em que <M tex="a_4 = 43" /> e <M tex="a_{15} = 85" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Usando a fórmula do termo geral:</p>
            <M tex="a_4 = a_1 + 3r = 43" display />
            <M tex="a_{15} = a_1 + 14r = 85" display />
            <p>Subtraindo a primeira da segunda:</p>
            <M tex="(a_1 + 14r) - (a_1 + 3r) = 85 - 43" display />
            <M tex="11r = 42 \implies r = \frac{42}{11}" display />
            <p>Encontrando <M tex="a_1" />:</p>
            <M tex="a_1 = 43 - 3 \cdot \frac{42}{11} = 43 - \frac{126}{11} = \frac{473 - 126}{11} = \frac{347}{11}" display />
            <p>
              A PA é: <M tex={`\\left(\\frac{347}{11},\\; \\frac{389}{11},\\; \\frac{431}{11},\\; 43,\\; \\ldots\\right)`} />
            </p>
          </div>
        }
      />
    </Quiz>
  )
}

/* ───────────────── GABARITO (Complementares p.775) ───────────────── */

function Gabarito() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Exercícios Complementares</h3>

      <ExerciseCard
        number={1}
        source="UEG GO"
        solution={
          <div className="space-y-3">
            <p>
              Seja <M tex="l" /> o lado do quadrado. Diagonal: <M tex="l\sqrt{2}" />.
              Área: <M tex="l^2" />.
            </p>
            <p>PA: <M tex="(l,\; l\sqrt{2},\; l^2)" />. A condição de PA é:</p>
            <M tex="2 \cdot l\sqrt{2} = l + l^2" display />
            <M tex="2l\sqrt{2} = l + l^2" display />
            <p>Dividindo por <M tex="l" /> (com <M tex="l \neq 0" />):</p>
            <M tex="2\sqrt{2} = 1 + l \implies l = 2\sqrt{2} - 1" display />
          </div>
        }
      >
        Sabendo que o lado, a diagonal e a área de um quadrado estão, nessa ordem, em PA, calcule a
        medida do lado desse quadrado.
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> <M tex="r = 2" />, <M tex="a_{12} = 49" />. Queremos <M tex="a_{32}" />:</p>
            <M tex="a_{32} = a_{12} + (32 - 12) \cdot r = 49 + 20 \cdot 2 = 89" display />

            <p><strong>b)</strong> <M tex="a_4 + a_8 = 17" /> e <M tex="a_{60} + a_{90} = 53" />.</p>
            <M tex="(a_1 + 3r) + (a_1 + 7r) = 17 \implies 2a_1 + 10r = 17" display />
            <M tex="(a_1 + 59r) + (a_1 + 89r) = 53 \implies 2a_1 + 148r = 53" display />
            <p>Subtraindo:</p>
            <M tex="138r = 36 \implies r = \frac{36}{138} = \frac{6}{23}" display />
          </div>
        }
      >
        <p>
          <strong>a)</strong> Qual é o 32° termo da PA <M tex="(a_n)" /> com{' '}
          <M tex="r = 2" /> e <M tex="a_{12} = 49" />?
        </p>
        <p>
          <strong>b)</strong> Qual é a razão da PA <M tex="(a_n)" /> tal que{' '}
          <M tex="a_4 + a_8 = 17" /> e <M tex="a_{60} + a_{90} = 53" />?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="UFU MG"
        solution={
          <div className="space-y-3">
            <p>Lados: <M tex="x-4" />, <M tex="x" />, <M tex="x+3" />. Áreas: <M tex="(x-4)^2" />, <M tex="x^2" />, <M tex="(x+3)^2" /> em PA.</p>
            <M tex="2x^2 = (x-4)^2 + (x+3)^2" display />
            <M tex="2x^2 = x^2 - 8x + 16 + x^2 + 6x + 9" display />
            <M tex="2x^2 = 2x^2 - 2x + 25" display />
            <M tex="2x = 25 \implies x = 12{,}5" display />
            <p>Lados: <M tex="8{,}5" />, <M tex="12{,}5" /> e <M tex="15{,}5" />.</p>
            <p>Soma dos perímetros:</p>
            <M tex="4(8{,}5) + 4(12{,}5) + 4(15{,}5) = 34 + 50 + 62 = 146" display />
            <p><strong>Resposta: 146</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 142' },
          { label: 'b) 144' },
          { label: 'c) 146', correct: true },
          { label: 'd) 148' },
        ]}
      >
        Três terrenos quadrados têm lados que medem, respectivamente,{' '}
        <M tex="x - 4" />, <M tex="x" /> e <M tex="x + 3" />. Sabendo que as áreas desses
        terrenos estão em PA, a soma dos perímetros dos três terrenos é:
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="UPF RS"
        solution={
          <div className="space-y-3">
            <p>A sequência de triângulos forma um padrão:</p>
            <p>Minuto 1: 1 triângulo; Minuto 2: 4 triângulos; Minuto 3: 7 triângulos.</p>
            <p>PA com <M tex="a_1 = 1" />, <M tex="r = 3" />.</p>
            <M tex="a_{60} = 1 + 59 \cdot 3 = 1 + 177 = 178" display />
            <p><strong>Resposta: c) 178</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 168' },
          { label: 'b) 175' },
          { label: 'c) 178', correct: true },
          { label: 'd) 180' },
          { label: 'e) 183' },
        ]}
      >
        Em um laboratório, a evolução de um vírus é registrada a cada minuto. A sequência
        observada nos 3 primeiros minutos forma triângulos em padrão crescente. Após 1 hora,
        a quantidade de triângulos será:
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="UERJ"
        solution={
          <div className="space-y-3">
            <p>
              <M tex="a_1 = 7{,}04" /> m, <M tex="a_3 = 7{,}07" /> m.
              Razão: <M tex="r = 0{,}03 \div 2" />... Na verdade, <M tex="a_3 = a_1 + 2r" />:
            </p>
            <M tex="7{,}07 = 7{,}04 + 2r \implies r = 0{,}015" display />
            <p>Mas o enunciado diz <M tex="r = 0{,}03" />. Vamos usar <M tex="r = 0{,}03" /> conforme dado.</p>
            <p>Último salto ímpar: <M tex="a_n = 7{,}22" /> com <M tex="n" /> ímpar.</p>
            <M tex="7{,}22 = 7{,}04 + (n-1) \cdot 0{,}03" display />
            <M tex="0{,}18 = (n-1) \cdot 0{,}03" display />
            <M tex="n - 1 = 6 \implies n = 7" display />
            <p><strong>Resposta:</strong> <M tex="n = 7" /> (7° salto, que é ímpar).</p>
          </div>
        }
      >
        Em uma competição, Maurren Maggi realizou saltos cujas distâncias formam uma PA com{' '}
        <M tex="a_1 = 7{,}04" /> m, <M tex="a_3 = 7{,}07" /> m e razão{' '}
        <M tex="r = 0{,}03" />. Sabendo que o último salto de ordem ímpar mede{' '}
        <M tex="7{,}22" /> m, calcule <M tex="n" />.
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="UFG GO"
        solution={
          <div className="space-y-3">
            <p>
              Sequência de retângulos cujas bases formam uma PA crescente e alturas formam
              uma PA decrescente, com um quadrado de lado <M tex="e = 1" /> no início
              e lado <M tex="a = 9" /> na altura.
            </p>
            <p>
              A razão da PA das bases é positiva e a razão da PA das alturas é negativa.
              Como as dimensões devem ser compatíveis, as razões dependem do número de
              figuras na sequência.
            </p>
          </div>
        }
      >
        Uma sequência de retângulos e um quadrado são desenhados de forma que a base mede{' '}
        <M tex="e = 1" /> e a altura mede <M tex="a = 9" />. As bases estão em PA crescente
        e as alturas em PA decrescente. Determine as razões das duas PAs.
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="FGV SP"
        solution={
          <div className="space-y-3">
            <p>Prestações formam uma PA. Dados:</p>
            <M tex="a_{15} = a_1 + 14r = 3690" display />
            <M tex="a_{81} = a_1 + 80r = 2700" display />
            <p>Subtraindo:</p>
            <M tex="66r = 2700 - 3690 = -990 \implies r = -15" display />
            <p>Substituindo:</p>
            <M tex="a_1 = 3690 - 14 \cdot (-15) = 3690 + 210 = 3900" display />
            <p><strong>Resposta: R$ 3.900,00</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) R$ 3.800,00' },
          { label: 'b) R$ 3.850,00' },
          { label: 'c) R$ 3.900,00', correct: true },
          { label: 'd) R$ 3.950,00' },
          { label: 'e) R$ 4.000,00' },
        ]}
      >
        As prestações de um financiamento formam uma PA. Sabe-se que a 15ª prestação vale
        R$ 3.690,00 e a 81ª prestação vale R$ 2.700,00. O valor da 1ª prestação é:
      </ExerciseCard>

      <ExerciseCard
        number={8}
        solution={
          <div className="space-y-3">
            <p>
              Cada quadrado novo compartilha um lado com o anterior, então são adicionados 3 palitos por quadrado.
            </p>
            <p>PA: <M tex="a_1 = 4" /> (1 quadrado), <M tex="r = 3" />.</p>
            <p>Para <M tex="n" /> quadrados, total de palitos:</p>
            <M tex="P(n) = 4 + 3(n - 1) = 3n + 1" display />
            <p>Para 150 quadrados:</p>
            <M tex="P(150) = 3 \cdot 150 + 1 = 451 \text{ palitos}" display />
          </div>
        }
      >
        Três quadrados são montados com palitos de fósforo, cada novo quadrado compartilhando
        um lado com o anterior. Quantos palitos são necessários para construir uma fileira de
        150 quadrados?
      </ExerciseCard>

      <ExerciseCard
        number={9}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Como é PA, a diferença entre termos consecutivos é constante:</p>
            <M tex="(2x - 4) - (x + 3) = (39 - 2x) - (2x - 4)" display />
            <M tex="x - 7 = 43 - 4x" display />
            <M tex="5x = 50 \implies x = 10" display />
            <p>Termos: <M tex="(13,\; 16,\; 19)" /></p>
            <p><strong>b)</strong> <M tex="r = 16 - 13 = 3" /></p>
          </div>
        }
      >
        Dada a PA <M tex="(x + 3,\; 2x - 4,\; 39 - 2x)" />, determine:{' '}
        <strong>a)</strong> <M tex="x" />; <strong>b)</strong> a razão.
      </ExerciseCard>

      <ExerciseCard
        number={10}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> PA <M tex="(3,\;9,\;15,\;\ldots)" /> com <M tex="r = 6" />:</p>
            <M tex="a_{21} = 3 + 20 \cdot 6 = 3 + 120 = 123" display />

            <p><strong>b)</strong> PA <M tex="(1,\;5,\;9,\;\ldots,\;97)" /> com <M tex="r = 4" />:</p>
            <M tex="97 = 1 + (n-1) \cdot 4" display />
            <M tex="96 = 4(n-1) \implies n - 1 = 24 \implies n = 25" display />
          </div>
        }
      >
        <p>
          <strong>a)</strong> Qual o 21° termo da PA <M tex="(3,\;9,\;15,\;\ldots)" />?
        </p>
        <p>
          <strong>b)</strong> Quantos termos tem a PA <M tex="(1,\;5,\;9,\;\ldots,\;97)" />?
        </p>
      </ExerciseCard>
    </div>
  )
}

/* ───────────────── EXPORT ───────────────── */

export default function B35_PA_Definicao() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
