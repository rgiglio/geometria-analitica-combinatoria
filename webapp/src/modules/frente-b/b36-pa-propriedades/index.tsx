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
        Progressão Aritmética — Propriedades e Soma de Termos
      </h3>

      {/* 1ª Propriedade */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">1ª Propriedade — Média Aritmética</h4>
        <p className="text-gray-800 leading-relaxed">
          Cada termo de uma PA, a partir do segundo, é a <strong>média aritmética</strong> dos seus
          vizinhos (anterior e posterior):
        </p>
        <M tex="a_n = \frac{a_{n-1} + a_{n+1}}{2}, \quad n \geq 2" display />
        <p className="text-gray-700 mt-2">
          Exemplo: na PA <M tex="(3,\;8,\;13,\;18,\;23)" />:
        </p>
        <M tex="\frac{3 + 13}{2} = 8, \qquad \frac{8 + 18}{2} = 13, \qquad \frac{13 + 23}{2} = 18" display />
      </div>

      {/* 2ª Propriedade */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">2ª Propriedade — Termos Equidistantes</h4>
        <p className="text-gray-800 leading-relaxed">
          A soma de dois termos <strong>equidistantes dos extremos</strong> é constante e igual à soma dos
          próprios extremos:
        </p>
        <M tex="a_1 + a_n = a_2 + a_{n-1} = a_3 + a_{n-2} = \ldots" display />
        <p className="text-gray-700 mt-2">
          Exemplo: na PA <M tex="(3,\;8,\;13,\;18,\;23)" />:
        </p>
        <M tex="3 + 23 = 8 + 18 = 13 + 13 = 26" display />
      </div>

      {/* 3ª Propriedade */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">3ª Propriedade — PA de 3 Termos</h4>
        <p className="text-gray-800 leading-relaxed">
          Toda PA de <strong>3 termos</strong> e razão <M tex="r" /> pode ser escrita como:
        </p>
        <M tex="(x - r,\;\; x,\;\; x + r)" display />
        <p className="text-gray-600 text-sm mt-1">
          Onde <M tex="x" /> é o termo central. A soma é <M tex="3x" />.
        </p>
      </div>

      {/* 4ª Propriedade */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">4ª Propriedade — PA de 4 Termos</h4>
        <p className="text-gray-800 leading-relaxed">
          Toda PA de <strong>4 termos</strong> e razão <M tex="2r" /> pode ser escrita como:
        </p>
        <M tex="(x - 3r,\;\; x - r,\;\; x + r,\;\; x + 3r)" display />
        <p className="text-gray-600 text-sm mt-1">
          A distância entre termos consecutivos é <M tex="2r" />.
        </p>
      </div>

      {/* Interpolação */}
      <h3 className="text-xl font-bold text-gray-900 pt-2">Interpolação Aritmética</h3>
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <p className="text-gray-800 leading-relaxed mb-3">
          <strong>Interpolar</strong> <M tex="n" /> meios aritméticos entre dois valores{' '}
          <M tex="a" /> e <M tex="b" /> significa encontrar uma PA com <M tex="n + 2" /> termos
          cujo primeiro termo é <M tex="a" /> e o último é <M tex="b" />.
        </p>
        <p className="text-gray-700 mb-2">
          A razão dessa PA é:
        </p>
        <M tex="r = \frac{b - a}{n + 1}" display />
      </div>

      {/* Soma */}
      <h3 className="text-xl font-bold text-gray-900 pt-2">Soma dos <M tex="n" /> Primeiros Termos</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5">
        <h4 className="font-bold text-yellow-800 mb-2">Fórmula da Soma</h4>
        <M tex="S_n = \frac{(a_1 + a_n) \cdot n}{2}" display />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Demonstração</h4>
        <p className="text-gray-700 mb-2">Escrevemos a soma na ordem direta e na ordem inversa:</p>
        <M
          tex={`\\begin{aligned}
S_n &= a_1 + a_2 + a_3 + \\cdots + a_n \\\\
S_n &= a_n + a_{n-1} + a_{n-2} + \\cdots + a_1
\\end{aligned}`}
          display
        />
        <p className="text-gray-700 mb-2">Somando membro a membro:</p>
        <M tex="2S_n = (a_1 + a_n) + (a_2 + a_{n-1}) + \cdots + (a_n + a_1)" display />
        <p className="text-gray-700 mb-2">
          Pela 2ª propriedade, cada parcela vale <M tex="a_1 + a_n" />, e há <M tex="n" /> parcelas:
        </p>
        <M tex="2S_n = (a_1 + a_n) \cdot n \quad \Longrightarrow \quad S_n = \frac{(a_1 + a_n) \cdot n}{2}" display />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
        <h4 className="font-bold text-blue-800 mb-2">Observação</h4>
        <p className="text-gray-700">
          Substituindo <M tex="a_n = a_1 + (n-1)r" />, obtemos uma forma alternativa:
        </p>
        <M tex="S_n = \frac{n \cdot [2a_1 + (n-1)r]}{2}" display />
      </div>
    </div>
  )
}

/* ───────────────── SIMULADOR ───────────────── */

function Simulador() {
  const [a1, setA1] = useState(1)
  const [r, setR] = useState(2)
  const [n, setN] = useState(10)

  // Interpolation
  const [interpA, setInterpA] = useState(3)
  const [interpB, setInterpB] = useState(23)
  const [interpN, setInterpN] = useState(4)

  const terms = useMemo(() => Array.from({ length: n }, (_, i) => a1 + i * r), [a1, r, n])
  const an = terms[terms.length - 1]
  const sn = ((a1 + an) * n) / 2
  const maxVal = Math.max(...terms)
  const minVal = Math.min(...terms)
  const chartMax = Math.max(Math.abs(maxVal), Math.abs(minVal), 1)

  const interpR = interpN > 0 ? (interpB - interpA) / (interpN + 1) : 0
  const interpTerms = useMemo(
    () => Array.from({ length: interpN + 2 }, (_, i) => interpA + i * interpR),
    [interpA, interpR, interpN]
  )

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Escada de Gauss — Visualização da Soma</h3>

      {/* Controls */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="a_1" />
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
            <M tex="r" />
          </label>
          <input
            type="number"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="n" /> (termos)
          </label>
          <input
            type="number"
            min={1}
            max={30}
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(30, Number(e.target.value))))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Gauss staircase */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-2">Escada direta + invertida</h4>
        <p className="text-sm text-gray-500 mb-4">
          As duas escadas juntas formam um retângulo de altura{' '}
          <M tex={`a_1 + a_n = ${a1} + ${an} = ${a1 + an}`} /> e largura <M tex={`n = ${n}`} />.
        </p>
        <div className="flex items-end gap-1 h-52">
          {terms.map((val, i) => {
            const revVal = terms[terms.length - 1 - i]
            const hDirect = chartMax > 0 ? (Math.abs(val) / chartMax) * 100 : 5
            const hReverse = chartMax > 0 ? (Math.abs(revVal) / chartMax) * 100 : 5
            return (
              <div key={i} className="flex-1 flex flex-col justify-end h-full gap-0">
                <span className="text-[9px] text-gray-500 text-center mb-0.5">{val + revVal}</span>
                <div
                  className="w-full bg-indigo-200 rounded-t opacity-70"
                  style={{ height: `${hReverse}%`, minHeight: '2px' }}
                />
                <div
                  className="w-full bg-indigo-600 rounded-t"
                  style={{ height: `${hDirect}%`, minHeight: '2px' }}
                />
              </div>
            )
          })}
        </div>
        <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-1">
          <span><M tex="a_1" /></span>
          <span><M tex="a_n" /></span>
        </div>
      </div>

      {/* Sum formula step by step */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-5">
        <h4 className="font-semibold text-indigo-800 mb-3">Soma passo a passo</h4>
        <div className="bg-white rounded-lg p-4 border border-indigo-100 space-y-1">
          <M tex={`a_n = a_1 + (n-1) \\cdot r = ${a1} + ${n - 1} \\cdot (${r}) = ${an}`} display />
          <M
            tex={`S_{${n}} = \\frac{(a_1 + a_n) \\cdot n}{2} = \\frac{(${a1} + ${an}) \\cdot ${n}}{2} = \\frac{${a1 + an} \\cdot ${n}}{2} = ${sn}`}
            display
          />
        </div>
        <p className="text-lg font-bold text-indigo-700 mt-3 text-center">
          <M tex={`S_{${n}} = ${sn}`} />
        </p>
      </div>

      {/* Rectangle visualization */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h4 className="font-semibold text-gray-800 mb-3">Visualização do retângulo</h4>
        <div className="relative border-2 border-indigo-400 rounded-lg overflow-hidden" style={{ height: '120px' }}>
          <div className="absolute inset-0 bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-800 font-bold text-lg">
              <M tex={`${a1 + an} \\times ${n} = ${(a1 + an) * n}`} />
            </span>
          </div>
          <div className="absolute inset-0 bg-indigo-500 opacity-30" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">
            Largura = <M tex={`n = ${n}`} />
          </span>
          <span className="text-gray-600">
            Altura = <M tex={`a_1 + a_n = ${a1 + an}`} />
          </span>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          Área do retângulo = <M tex={`${(a1 + an) * n}`} />, logo{' '}
          <M tex={`S_n = \\frac{${(a1 + an) * n}}{2} = ${sn}`} />
        </p>
      </div>

      {/* Interpolation calculator */}
      <h3 className="text-xl font-bold text-gray-900 pt-4">Calculadora de Interpolação</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="a" /> (primeiro)
          </label>
          <input
            type="number"
            value={interpA}
            onChange={(e) => setInterpA(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="b" /> (último)
          </label>
          <input
            type="number"
            value={interpB}
            onChange={(e) => setInterpB(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            <M tex="n" /> meios
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={interpN}
            onChange={(e) => setInterpN(Math.max(1, Math.min(50, Number(e.target.value))))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-5">
        <M
          tex={`r = \\frac{b - a}{n + 1} = \\frac{${interpB} - ${interpA}}{${interpN} + 1} = \\frac{${interpB - interpA}}{${interpN + 1}} = ${Number(interpR.toFixed(4))}`}
          display
        />
        <p className="font-semibold text-gray-800 mt-3">PA resultante:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {interpTerms.map((t, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full text-sm font-mono ${
                i === 0 || i === interpTerms.length - 1
                  ? 'bg-green-600 text-white'
                  : 'bg-green-200 text-green-800'
              }`}
            >
              {Number(t.toFixed(2))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ───────────────── EXERCÍCIOS (Propostos p.778) ───────────────── */

function Exercicios() {
  return (
    <Quiz total={6}>
      <QuizCard
        id={1}
        statement={
          <span>
            Obtenha três termos em PA crescente cuja soma é 18 e o produto é 66.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Representamos os três termos em PA como <M tex="(x - r,\; x,\; x + r)" />.</p>
            <p>Soma:</p>
            <M tex="(x - r) + x + (x + r) = 3x = 18 \implies x = 6" display />
            <p>Produto:</p>
            <M tex="(6 - r) \cdot 6 \cdot (6 + r) = 66" display />
            <M tex="6(36 - r^2) = 66 \implies 36 - r^2 = 11 \implies r^2 = 25 \implies r = \pm 5" display />
            <p>
              Como a PA é <strong>crescente</strong>, <M tex="r > 0" />, logo <M tex="r = 5" />.
            </p>
            <M tex="\text{PA: } (1,\; 6,\; 11)" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Dada uma PA de 13 termos tal que <M tex="a_3 + a_{11} = 42" />, obtenha o 7° termo.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>
              Pela propriedade de termos equidistantes dos extremos numa PA de 13 termos:
            </p>
            <M tex="a_3 + a_{11} = a_1 + a_{13} = 2a_7" display />
            <M tex="42 = 2a_7 \implies a_7 = 21" display />
            <p><strong>Resposta:</strong> <M tex="a_7 = 21" /></p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Insira quatro meios aritméticos entre 3 e 23.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>
              Interpolar 4 meios aritméticos entre 3 e 23 significa encontrar uma PA de{' '}
              <M tex="4 + 2 = 6" /> termos, com <M tex="a_1 = 3" /> e <M tex="a_6 = 23" />.
            </p>
            <M tex="r = \frac{23 - 3}{6 - 1} = \frac{20}{5} = 4" display />
            <M tex="\text{PA: } (3,\; 7,\; 11,\; 15,\; 19,\; 23)" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Calcule a soma dos 60 primeiros termos da PA <M tex="(2,\; 10,\; 18,\; \ldots)" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p><M tex="a_1 = 2" />, <M tex="r = 8" />, <M tex="n = 60" />.</p>
            <M tex="a_{60} = 2 + 59 \cdot 8 = 2 + 472 = 474" display />
            <M tex="S_{60} = \frac{(2 + 474) \cdot 60}{2} = \frac{476 \cdot 60}{2} = 14\,280" display />
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <span>
            Sabendo que <M tex="S_n = n^2 - n" /> para <M tex="n = 1, 2, 3, \ldots" />, determine
            o 11° termo da PA.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>
              Se <M tex="S_n = n^2 - n" />, então <M tex="a_n = S_n - S_{n-1}" /> para{' '}
              <M tex="n \geq 2" />:
            </p>
            <M tex="S_{11} = 11^2 - 11 = 121 - 11 = 110" display />
            <M tex="S_{10} = 10^2 - 10 = 100 - 10 = 90" display />
            <M tex="a_{11} = S_{11} - S_{10} = 110 - 90 = 20" display />
          </div>
        }
      />
      <QuizCard
        id={6}
        statement={
          <span>
            <span className="text-xs font-semibold text-indigo-500 block mb-1">Enem MEC — 06</span>
            Postes são colocados a 80 m, 100 m, 120 m da praça (PA de razão 20 m), até o último a
            1 380 m. Se cada poste custa no máximo R$ 8 000,00, qual o maior valor total com a
            colocação de todos os postes?
          </span>
        }
        solution={
          <div className="space-y-2">
            <M tex="a_1 = 80,\; r = 20,\; a_n = 1380" display />
            <M tex="1380 = 80 + (n-1) \cdot 20 \implies 1300 = 20(n-1) \implies n = 66" display />
            <p>São <strong>66 postes</strong>.</p>
            <M tex="66 \times 8\,000 = 528\,000" display />
            <p><strong>Resposta: R$ 528 000,00 (alternativa c).</strong></p>
          </div>
        }
      />
    </Quiz>
  )
}

/* ───────────────── GABARITO (Complementares p.779) ───────────────── */

function Gabarito() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Exercícios Complementares</h3>

      <ExerciseCard
        number={1}
        solution={
          <div className="space-y-3">
            <p>Representamos: <M tex="(x - r,\; x,\; x + r)" />.</p>
            <p>Soma:</p>
            <M tex="3x = 6 \implies x = 2" display />
            <p>Produto:</p>
            <M tex="(2 - r) \cdot 2 \cdot (2 + r) = -10" display />
            <M tex="2(4 - r^2) = -10 \implies 4 - r^2 = -5 \implies r^2 = 9 \implies r = \pm 3" display />
            <p>
              PAs possíveis: <M tex="(-1,\; 2,\; 5)" /> ou <M tex="(5,\; 2,\; -1)" />.
            </p>
          </div>
        }
      >
        Obtenha três termos em PA cuja soma é 6 e o produto é <M tex="-10" />.
      </ExerciseCard>

      <ExerciseCard
        number={2}
        solution={
          <div className="space-y-3">
            <p>PA com <M tex="a_1 = 4" />, <M tex="a_{12} = 37" /> e <M tex="10 + 2 = 12" /> termos.</p>
            <M tex="r = \frac{37 - 4}{12 - 1} = \frac{33}{11} = 3" display />
            <M tex="\text{PA: } (4,\; 7,\; 10,\; 13,\; 16,\; 19,\; 22,\; 25,\; 28,\; 31,\; 34,\; 37)" display />
          </div>
        }
      >
        Interpole 10 meios aritméticos entre 4 e 37.
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="Vunesp SP"
        solution={
          <div className="space-y-3">
            <p>
              <strong>a)</strong> Lados em PA crescente de razão <M tex="r" />:{' '}
              <M tex="(a - r,\; a,\; a + r)" />.
            </p>
            <p>Pelo teorema de Pitágoras (hipotenusa é o maior lado):</p>
            <M tex="(a - r)^2 + a^2 = (a + r)^2" display />
            <M tex="a^2 - 2ar + r^2 + a^2 = a^2 + 2ar + r^2" display />
            <M tex="a^2 = 4ar \implies a = 4r" display />
            <p>Os lados são: <M tex="(3r,\; 4r,\; 5r)" />.</p>

            <p className="mt-2"><strong>b)</strong> Área do triângulo retângulo (catetos <M tex="3r" /> e <M tex="4r" />):</p>
            <M tex="\frac{3r \cdot 4r}{2} = 6r^2 = 48 \implies r^2 = 8 \implies r = 2\sqrt{2}" display />
          </div>
        }
      >
        <p>
          Os lados de um triângulo retângulo estão em PA crescente de razão <M tex="r" />.
        </p>
        <p><strong>a)</strong> Mostre que os lados medem <M tex="3r" />, <M tex="4r" /> e <M tex="5r" />.</p>
        <p><strong>b)</strong> Se a área do triângulo é 48, calcule <M tex="r" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="UFAL"
        solution={
          <div className="space-y-3">
            <p>Idades em PA de razão 5: <M tex="(x - 5,\; x,\; x + 5)" />.</p>
            <p>Daqui a 3 anos, a mais velha será o dobro da mais nova:</p>
            <M tex="(x + 5) + 3 = 2\,[(x - 5) + 3]" display />
            <M tex="x + 8 = 2(x - 2)" display />
            <M tex="x + 8 = 2x - 4 \implies x = 12" display />
            <p>Idades atuais: <M tex="7,\; 12,\; 17" />.</p>
            <M tex="\text{Soma} = 7 + 12 + 17 = 36 \text{ anos}" display />
          </div>
        }
        alternatives={[
          { label: 'a) 36 anos', correct: true },
          { label: 'b) 39 anos' },
          { label: 'c) 42 anos' },
          { label: 'd) 45 anos' },
          { label: 'e) 48 anos' },
        ]}
      >
        As idades de 3 pessoas formam uma PA de razão 5. Daqui a 3 anos, a idade da mais velha
        será o dobro da idade da mais nova. A soma das idades atuais é:
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="PUC MG"
        solution={
          <div className="space-y-3">
            <p>
              Telefones a cada 42 km. Primeiro no km 42, último no km 2142.
              PA: <M tex="a_1 = 42" />, <M tex="r = 42" />, <M tex="a_n = 2142" />.
            </p>
            <M tex="2142 = 42 + (n - 1) \cdot 42" display />
            <M tex="2100 = 42(n - 1) \implies n - 1 = 50 \implies n = 51" display />
          </div>
        }
        alternatives={[
          { label: 'a) 50' },
          { label: 'b) 51', correct: true },
          { label: 'c) 52' },
          { label: 'd) 53' },
        ]}
      >
        Telefones de emergência são instalados a cada 42 km ao longo de uma rodovia de 2184 km.
        O primeiro está no km 42 e o último no km 2142. A quantidade de telefones é:
      </ExerciseCard>

      <ExerciseCard
        number={6}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> PA <M tex="(6,\;10,\;14,\;\ldots)" />, <M tex="r = 4" />, <M tex="n = 40" />:</p>
            <M tex="a_{40} = 6 + 39 \cdot 4 = 6 + 156 = 162" display />
            <M tex="S_{40} = \frac{(6 + 162) \cdot 40}{2} = \frac{168 \cdot 40}{2} = 3\,360" display />

            <p><strong>b)</strong> PA <M tex="(4,\;11,\;18,\;25,\;\ldots)" />, <M tex="r = 7" />, <M tex="n = 100" />:</p>
            <M tex="a_{100} = 4 + 99 \cdot 7 = 4 + 693 = 697" display />
            <M tex="S_{100} = \frac{(4 + 697) \cdot 100}{2} = \frac{701 \cdot 100}{2} = 35\,050" display />
          </div>
        }
      >
        <p>
          <strong>a)</strong> Calcule a soma dos 40 primeiros termos da PA{' '}
          <M tex="(6,\;10,\;14,\;\ldots)" />.
        </p>
        <p>
          <strong>b)</strong> Calcule a soma dos 100 primeiros termos da PA{' '}
          <M tex="(4,\;11,\;18,\;25,\;\ldots)" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        solution={
          <div className="space-y-3">
            <p><strong>a)</strong> Primeiro termo:</p>
            <M tex="a_1 = S_1 = 1^2 - 2 \cdot 1 = 1 - 2 = -1" display />

            <p><strong>b)</strong> Décimo termo:</p>
            <M tex="S_{10} = 10^2 - 2 \cdot 10 = 100 - 20 = 80" display />
            <M tex="S_9 = 9^2 - 2 \cdot 9 = 81 - 18 = 63" display />
            <M tex="a_{10} = S_{10} - S_9 = 80 - 63 = 17" display />
          </div>
        }
      >
        Uma PA tem <M tex="S_n = n^2 - 2n" />. Determine:{' '}
        <strong>a)</strong> o primeiro termo; <strong>b)</strong> o décimo termo.
      </ExerciseCard>

      <ExerciseCard
        number={8}
        solution={
          <div className="space-y-3">
            <p>PA: <M tex="a_1 = 25" />, <M tex="r = 2" />.</p>
            <p><strong>a)</strong> Poltronas na 40ª fileira:</p>
            <M tex="a_{40} = 25 + 39 \cdot 2 = 25 + 78 = 103" display />

            <p><strong>b)</strong> Total de poltronas no teatro:</p>
            <M tex="S_{40} = \frac{(25 + 103) \cdot 40}{2} = \frac{128 \cdot 40}{2} = 2\,560" display />
          </div>
        }
      >
        Um teatro tem 40 fileiras de poltronas. A 1ª fileira tem 25, a 2ª tem 27, a 3ª tem 29,
        e assim por diante. Determine:{' '}
        <strong>a)</strong> o número de poltronas na 40ª fileira;{' '}
        <strong>b)</strong> o total de poltronas no teatro.
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="UFPB"
        solution={
          <div className="space-y-3">
            <p>
              PA: <M tex="a_1 = 3" />, <M tex="r = 2" />.
              Termo geral: <M tex="a_n = 3 + (n-1) \cdot 2 = 2n + 1" />.
            </p>
            <M tex="S_n = \frac{(a_1 + a_n) \cdot n}{2} = \frac{(3 + 2n + 1) \cdot n}{2} = \frac{(2n + 4) \cdot n}{2} = n^2 + 2n" display />
            <M tex="n^2 + 2n = 483" display />
            <M tex="n^2 + 2n - 483 = 0" display />
            <M tex="\Delta = 4 + 1932 = 1936, \quad \sqrt{\Delta} = 44" display />
            <M tex="n = \frac{-2 + 44}{2} = 21 \text{ dias}" display />
          </div>
        }
      >
        Para combater uma praga, um agricultor usa pesticida: 3 litros no 1° dia, aumentando 2 litros
        a cada dia seguinte. Se o total utilizado foi de 483 litros, quantos dias durou a aplicação?
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="UERJ"
        solution={
          <div className="space-y-3">
            <p>
              Numa torre de cubos empilhados, cada andar <M tex="k" /> (contando de cima para baixo)
              tem <M tex="\frac{k(k+1)}{2}" /> cubos (número triangular).
            </p>
            <p>Base de 4 andares: andar 4 → <M tex="\frac{4 \cdot 5}{2} = 10" /> cubos.</p>
            <p>Para 100 andares, a base é o andar 100:</p>
            <M tex="\frac{100 \cdot 101}{2} = 5050 \text{ cubos}" display />
          </div>
        }
      >
        Uma torre de 4 andares é construída com cubos. A base tem 10 cubos. Seguindo o mesmo padrão,
        quantos cubos teria a base de uma torre com 100 andares?
      </ExerciseCard>

      <ExerciseCard
        number={11}
        source="UFRJ"
        solution={
          <div className="space-y-3">
            <p>
              <strong>Opção A:</strong> R$ 300,00 por mês (fixo).
            </p>
            <p>
              <strong>Opção B:</strong> PA com <M tex="a_1 = 1" />, <M tex="r = 1" />, durante 30 dias.
            </p>
            <M tex="S_{30} = \frac{(1 + 30) \cdot 30}{2} = \frac{31 \cdot 30}{2} = 465" display />
            <p>Diferença:</p>
            <M tex="465 - 300 = \text{R\$ 165,00}" display />
            <p>A opção B é <strong>R$ 165,00 mais vantajosa</strong> para o filho.</p>
          </div>
        }
      >
        Um pai oferece ao filho duas opções de mesada: <strong>A)</strong> R$ 300,00 por mês;{' '}
        <strong>B)</strong> R$ 1,00 no primeiro dia, R$ 2,00 no segundo, R$ 3,00 no terceiro, e assim
        por diante, durante os 30 dias do mês. Qual a diferença entre os totais das duas opções?
      </ExerciseCard>
    </div>
  )
}

/* ───────────────── EXPORT ───────────────── */

export default function B36_PA_Propriedades() {
  return <TabPanel tabs={[<Teoria />, <Simulador />, <Exercicios />, <Gabarito />]} />
}
