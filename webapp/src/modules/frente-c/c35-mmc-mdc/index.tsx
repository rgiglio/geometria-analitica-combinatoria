import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return Math.abs(a * b) / gcd(a, b)
}

function gcdMultiple(nums: number[]): number {
  return nums.reduce((acc, n) => gcd(acc, n))
}

function lcmMultiple(nums: number[]): number {
  return nums.reduce((acc, n) => lcm(acc, n))
}

function primeFactorize(n: number): Map<number, number> {
  const factors = new Map<number, number>()
  if (n <= 1) return factors
  let remaining = n
  for (let p = 2; p * p <= remaining; p++) {
    let count = 0
    while (remaining % p === 0) {
      remaining /= p
      count++
    }
    if (count > 0) factors.set(p, count)
  }
  if (remaining > 1) factors.set(remaining, 1)
  return factors
}

interface DecompStep {
  values: number[]
  divisor: number
}

function simultaneousDecomposition(
  nums: number[],
  mode: 'lcm' | 'gcd'
): DecompStep[] {
  const steps: DecompStep[] = []
  let current = [...nums]

  const smallPrimes: number[] = []
  for (let i = 2; i <= 1000; i++) {
    let isPrime = true
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { isPrime = false; break }
    }
    if (isPrime) smallPrimes.push(i)
  }

  for (const p of smallPrimes) {
    if (current.every((v) => v <= 1)) break

    if (mode === 'gcd') {
      while (current.every((v) => v % p === 0)) {
        steps.push({ values: [...current], divisor: p })
        current = current.map((v) => v / p)
      }
    } else {
      while (current.some((v) => v % p === 0)) {
        steps.push({ values: [...current], divisor: p })
        current = current.map((v) => (v % p === 0 ? v / p : v))
      }
    }
  }

  return steps
}

function formatFactorization(factors: Map<number, number>): string {
  if (factors.size === 0) return '1'
  return Array.from(factors.entries())
    .sort(([a], [b]) => a - b)
    .map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`))
    .join(' \\cdot ')
}

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">MMC e MDC</h3>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Mínimo Múltiplo Comum (MMC)</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Definição</h4>
          <p className="text-gray-700">
            O <strong>MMC</strong> de dois ou mais números inteiros (ao menos um diferente de zero) é o
            <strong> menor múltiplo positivo</strong> comum a todos eles.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <p className="text-gray-700 font-medium">
            Exemplo: <M tex="\text{MMC}(4, 6)" />
          </p>
          <p className="text-gray-700">
            Múltiplos positivos de <M tex="4" />: <M tex="\{4, 8, \mathbf{12}, 16, 20, \mathbf{24}, 28, \ldots\}" />
          </p>
          <p className="text-gray-700">
            Múltiplos positivos de <M tex="6" />: <M tex="\{6, \mathbf{12}, 18, \mathbf{24}, 30, \ldots\}" />
          </p>
          <p className="text-gray-700">
            Múltiplos comuns: <M tex="\{12, 24, 36, \ldots\}" />. Logo, <M tex="\text{MMC}(4, 6) = 12" />.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2 mt-3">
          <p className="text-gray-700 font-medium">Método da decomposição simultânea</p>
          <p className="text-gray-700 text-sm">
            Dividimos pelo menor primo que divide <strong>pelo menos um</strong> dos números:
          </p>
          <div className="font-mono text-sm space-y-0.5 text-gray-700 my-2">
            <div className="flex"><span className="w-24 text-right">36, 48, 56</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
            <div className="flex"><span className="w-24 text-right">18, 24, 28</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
            <div className="flex"><span className="w-24 text-right">9, 12, 14</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
            <div className="flex"><span className="w-24 text-right">9, 6, 7</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
            <div className="flex"><span className="w-24 text-right">9, 3, 7</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">3</span></div>
            <div className="flex"><span className="w-24 text-right">3, 1, 7</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">3</span></div>
            <div className="flex"><span className="w-24 text-right">1, 1, 7</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">7</span></div>
            <div className="flex"><span className="w-24 text-right">1, 1, 1</span><span className="mx-2"> </span></div>
          </div>
          <M tex="\text{MMC}(36, 48, 56) = 2^4 \cdot 3^2 \cdot 7 = 1008" display />
          <p className="text-gray-700 text-sm">
            O MMC é o produto de todos os fatores primos com seus <strong>maiores expoentes</strong>.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Máximo Divisor Comum (MDC)</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Definição</h4>
          <p className="text-gray-700">
            O <strong>MDC</strong> de dois ou mais números inteiros (ao menos um diferente de zero)
            é o <strong>maior divisor positivo</strong> comum a todos eles.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <p className="text-gray-700 font-medium">
            Exemplo: <M tex="\text{MDC}(12, 20)" />
          </p>
          <p className="text-gray-700">
            Divisores de <M tex="12" />: <M tex="\{1, \mathbf{2}, 3, \mathbf{4}, 6, 12\}" />
          </p>
          <p className="text-gray-700">
            Divisores de <M tex="20" />: <M tex="\{1, \mathbf{2}, \mathbf{4}, 5, 10, 20\}" />
          </p>
          <p className="text-gray-700">
            Divisores comuns: <M tex="\{1, 2, 4\}" />. Logo, <M tex="\text{MDC}(12, 20) = 4" />.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
          <h4 className="font-semibold text-blue-800 mb-2">Observação — Decomposição simultânea para MDC</h4>
          <p className="text-gray-700 text-sm">
            Na decomposição para o MDC, dividimos pelo menor primo que divide <strong>todos</strong> os
            números simultaneamente. O MDC é o produto dos fatores primos <strong>comuns</strong> com
            seus <strong>menores expoentes</strong>.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Propriedade Fundamental</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-gray-700 mb-1">Para quaisquer inteiros positivos <M tex="a" /> e <M tex="b" />:</p>
          <M tex="\text{MMC}(a, b) \cdot \text{MDC}(a, b) = a \cdot b" display />
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Números Primos entre Si</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Definição</h4>
          <p className="text-gray-700">
            Dois inteiros <M tex="a" /> e <M tex="b" /> são <strong>primos entre si</strong>{' '}
            (ou coprimos) quando <M tex="\text{MDC}(a, b) = 1" />.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
          <h4 className="font-semibold text-blue-800 mb-2">Consequências</h4>
          <ul className="text-gray-700 space-y-1 list-disc list-inside">
            <li>
              Se <M tex="a" /> e <M tex="b" /> são primos entre si, então <M tex="\text{MMC}(a, b) = a \cdot b" />.
            </li>
            <li>Dois números primos distintos são sempre primos entre si.</li>
            <li>Dois inteiros consecutivos são sempre primos entre si.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Simulador() {
  const [activeTab, setActiveTab] = useState(0)
  const [inputA, setInputA] = useState('')
  const [inputB, setInputB] = useState('')
  const [inputC, setInputC] = useState('')
  const [step, setStep] = useState(0)
  const [copA, setCopA] = useState('')
  const [copB, setCopB] = useState('')

  const simulatorTabs = ['MMC & MDC', 'Primos entre si?']

  const nums = [inputA, inputB, inputC]
    .filter((v) => v !== '' && parseInt(v) > 0)
    .map((v) => parseInt(v))

  const hasValidInput = nums.length >= 2

  const lcmResult = hasValidInput ? lcmMultiple(nums) : null
  const gcdResult = hasValidInput ? gcdMultiple(nums) : null

  const lcmSteps = hasValidInput ? simultaneousDecomposition(nums, 'lcm') : []
  const gcdSteps = hasValidInput ? simultaneousDecomposition(nums, 'gcd') : []

  const visibleLcmSteps = lcmSteps.slice(0, step)
  const visibleGcdSteps = gcdSteps.slice(0, step)
  const maxSteps = Math.max(lcmSteps.length, gcdSteps.length)
  const allRevealed = step >= maxSteps

  const lcmFactors = lcmResult ? primeFactorize(lcmResult) : new Map()
  const gcdFactors = gcdResult ? primeFactorize(gcdResult) : new Map()

  const copNumA = copA !== '' ? parseInt(copA) : null
  const copNumB = copB !== '' ? parseInt(copB) : null
  const copResult = copNumA !== null && copNumB !== null && copNumA > 0 && copNumB > 0
    ? gcd(copNumA, copNumB)
    : null

  return (
    <div className="space-y-4">
      <div className="flex gap-1 border-b border-gray-200 mb-4">
        {simulatorTabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === i
                ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600 -mb-px'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira 2 ou 3 números para calcular o MMC e o MDC por decomposição simultânea.
            Use o botão "Próximo passo" para animar a decomposição.
          </p>
          <div className="flex gap-4 items-end flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">1º número</label>
              <input
                type="number"
                min="1"
                value={inputA}
                onChange={(e) => { setInputA(e.target.value); setStep(0) }}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 36"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">2º número</label>
              <input
                type="number"
                min="1"
                value={inputB}
                onChange={(e) => { setInputB(e.target.value); setStep(0) }}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 48"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">3º (opcional)</label>
              <input
                type="number"
                min="1"
                value={inputC}
                onChange={(e) => { setInputC(e.target.value); setStep(0) }}
                className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 56"
              />
            </div>
          </div>

          {hasValidInput && (
            <>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep((s) => Math.min(s + 1, maxSteps))}
                  disabled={allRevealed}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    allRevealed
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Próximo passo
                </button>
                <button
                  onClick={() => setStep(maxSteps)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Mostrar tudo
                </button>
                <button
                  onClick={() => setStep(0)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Reiniciar
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-3">
                    Decomposição para MMC
                  </h4>
                  <p className="text-xs text-purple-600 mb-2">
                    Divide pelo menor primo que divide <em>pelo menos um</em>
                  </p>
                  <div className="font-mono text-sm space-y-0.5">
                    {visibleLcmSteps.map((s, i) => (
                      <div key={i} className="flex animate-fade-in">
                        <span className="w-32 text-right text-gray-700">
                          {s.values.join(', ')}
                        </span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-purple-600 font-bold">{s.divisor}</span>
                      </div>
                    ))}
                    {step >= lcmSteps.length && lcmSteps.length > 0 && (
                      <div className="flex">
                        <span className="w-32 text-right text-gray-700">
                          {nums.map(() => '1').join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                  {allRevealed && lcmResult !== null && (
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <M
                        tex={`\\text{MMC}(${nums.join(', ')}) = ${formatFactorization(lcmFactors)} = ${lcmResult}`}
                        display
                      />
                    </div>
                  )}
                </div>

                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <h4 className="font-semibold text-teal-800 mb-3">
                    Decomposição para MDC
                  </h4>
                  <p className="text-xs text-teal-600 mb-2">
                    Divide pelo menor primo que divide <em>todos</em>
                  </p>
                  <div className="font-mono text-sm space-y-0.5">
                    {visibleGcdSteps.map((s, i) => (
                      <div key={i} className="flex animate-fade-in">
                        <span className="w-32 text-right text-gray-700">
                          {s.values.join(', ')}
                        </span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-teal-600 font-bold">{s.divisor}</span>
                      </div>
                    ))}
                    {step >= gcdSteps.length && gcdSteps.length > 0 && (
                      <div className="flex">
                        <span className="w-32 text-right text-gray-700">
                          {gcdSteps.length > 0
                            ? gcdSteps[gcdSteps.length - 1].values.map((v) => v / gcdSteps[gcdSteps.length - 1].divisor).join(', ')
                            : nums.join(', ')}
                        </span>
                      </div>
                    )}
                    {gcdSteps.length === 0 && step > 0 && (
                      <p className="text-sm text-gray-500 italic">
                        Nenhum primo divide todos simultaneamente.
                      </p>
                    )}
                  </div>
                  {allRevealed && gcdResult !== null && (
                    <div className="mt-3 pt-3 border-t border-teal-200">
                      <M
                        tex={`\\text{MDC}(${nums.join(', ')}) = ${gcdResult === 1 ? '1' : formatFactorization(gcdFactors)} = ${gcdResult}`}
                        display
                      />
                    </div>
                  )}
                </div>
              </div>

              {allRevealed && nums.length === 2 && lcmResult !== null && gcdResult !== null && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Verificação da propriedade</h4>
                  <M tex={`\\text{MMC} \\times \\text{MDC} = ${lcmResult} \\times ${gcdResult} = ${lcmResult * gcdResult}`} display />
                  <M tex={`${nums[0]} \\times ${nums[1]} = ${nums[0] * nums[1]}`} display />
                  <p className="text-sm text-gray-700">
                    {lcmResult * gcdResult === nums[0] * nums[1]
                      ? '✓ Propriedade verificada!'
                      : '✗ Erro na verificação.'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Verifique se dois números são primos entre si (coprimos), ou seja, se o MDC deles é 1.
          </p>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número A</label>
              <input
                type="number"
                min="1"
                value={copA}
                onChange={(e) => setCopA(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número B</label>
              <input
                type="number"
                min="1"
                value={copB}
                onChange={(e) => setCopB(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 28"
              />
            </div>
          </div>
          {copResult !== null && copNumA !== null && copNumB !== null && (
            <div className={`rounded-lg p-4 border ${
              copResult === 1
                ? 'bg-green-50 border-green-200'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div className="space-y-2">
                <p className="font-semibold text-lg">
                  <M tex={`\\text{MDC}(${copNumA}, ${copNumB}) = ${copResult}`} />
                </p>
                <p className="text-gray-700">
                  {copResult === 1 ? (
                    <>
                      <span className="text-green-700 font-bold">✓ São primos entre si!</span>
                      <span className="text-sm block mt-1">
                        Consequência: <M tex={`\\text{MMC}(${copNumA}, ${copNumB}) = ${copNumA} \\times ${copNumB} = ${copNumA * copNumB}`} />
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-orange-700 font-bold">✗ NÃO são primos entre si.</span>
                      <span className="text-sm block mt-1">
                        Fatores comuns: <M tex={`\\text{MDC} = ${formatFactorization(primeFactorize(copResult))}`} />
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Exercicios() {
  return (
    <Quiz total={5}>
      <QuizCard
        id={1}
        statement={
          <span>
            Dados <M tex="a = 2^3 \cdot 3^2 \cdot 5" /> e <M tex="b = 2 \cdot 3^3 \cdot 7" />,
            determine <M tex="\text{MMC}(a, b)" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Fatorações:</p>
            <M tex="a = 2^3 \cdot 3^2 \cdot 5^1" display />
            <M tex="b = 2^1 \cdot 3^3 \cdot 7^1" display />
            <p>Para o MMC, tomamos o <strong>maior expoente</strong> de cada primo:</p>
            <M tex="\text{MMC}(a, b) = 2^3 \cdot 3^3 \cdot 5^1 \cdot 7^1 = 8 \cdot 27 \cdot 5 \cdot 7 = 7560" display />
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Dados <M tex="a = 2^2 \cdot 3^2 \cdot 5" /> e <M tex="b = 2 \cdot 3 \cdot 7" />,
            determine <M tex="\text{MDC}(a, b)" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Fatorações:</p>
            <M tex="a = 2^2 \cdot 3^2 \cdot 5^1" display />
            <M tex="b = 2^1 \cdot 3^1 \cdot 7^1" display />
            <p>Para o MDC, tomamos o <strong>menor expoente</strong> dos fatores <strong>comuns</strong>:</p>
            <p>Fatores comuns: <M tex="2" /> e <M tex="3" /> (o primo 5 só aparece em <M tex="a" />, e 7 só em <M tex="b" />).</p>
            <M tex="\text{MDC}(a, b) = 2^1 \cdot 3^1 = 6" display />
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <>
            <p>
              Uma parede retangular de <M tex="350" /> cm <M tex="\times" /> <M tex="500" /> cm será revestida
              com azulejos quadrados.
            </p>
            <p className="ml-4">a) Quantos azulejos de <M tex="20" /> cm de lado são necessários?</p>
            <p className="ml-4">b) Qual a maior dimensão possível de azulejo quadrado sem necessidade de cortar?</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Com azulejos de <M tex="20" /> cm:</p>
            <M tex="\text{Horizontal: } \frac{500}{20} = 25 \text{ azulejos}" display />
            <M tex="\text{Vertical: } \frac{350}{20} = 17{,}5" display />
            <p>Como <M tex="350 \div 20 = 17{,}5" />, não é possível revestir sem cortar com azulejos de 20 cm. Sendo possível (com corte ou ajuste): <M tex="25 \times 18 = 450" /> azulejos.</p>
            <p className="mt-2"><strong>b)</strong> A maior dimensão de azulejo quadrado sem cortar é o MDC das dimensões:</p>
            <M tex="\text{MDC}(350, 500) = 50 \text{ cm}" display />
            <p>Verificação: <M tex="350 \div 50 = 7" /> e <M tex="500 \div 50 = 10" />. Total: <M tex="7 \times 10 = 70" /> azulejos.</p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Júpiter leva <M tex="12" /> anos, Saturno <M tex="30" /> anos e Urano <M tex="84" /> anos
            para completar uma volta ao redor do Sol. Se estão alinhados agora, em quantos anos
            ocorrerá o próximo alinhamento?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Precisamos do MMC dos períodos orbitais:</p>
            <M tex="\text{MMC}(12, 30, 84)" display />
            <p>Fatorando: <M tex="12 = 2^2 \cdot 3" />, <M tex="30 = 2 \cdot 3 \cdot 5" />, <M tex="84 = 2^2 \cdot 3 \cdot 7" />.</p>
            <M tex="\text{MMC} = 2^2 \cdot 3 \cdot 5 \cdot 7 = 420 \text{ anos}" display />
            <p><strong>Resposta:</strong> o próximo alinhamento ocorrerá em <M tex="420" /> anos.</p>
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <>
            <p>a) Escreva <M tex="306" /> como produto de primos.</p>
            <p>
              b) Dados <M tex="a = 2^{17} \cdot 3^{28} \cdot 7^{10}" /> e <M tex="b = 2^9 \cdot 5^3 \cdot 7^{16}" />,
              determine o MDC e o MMC como produto de potências de primos.
            </p>
            <p>c) Quantos divisores inteiros positivos possui <M tex="b" />?</p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Fatoração de 306:</p>
            <M tex="306 = 2 \cdot 153 = 2 \cdot 9 \cdot 17 = 2 \cdot 3^2 \cdot 17" display />
            <p><strong>b)</strong> Com <M tex="a = 2^{17} \cdot 3^{28} \cdot 7^{10}" /> e <M tex="b = 2^9 \cdot 5^3 \cdot 7^{16}" />:</p>
            <M tex="\text{MDC}(a,b) = 2^9 \cdot 7^{10}" display />
            <p>(Primos comuns com menores expoentes: <M tex="2^{\min(17,9)} \cdot 7^{\min(10,16)}" />)</p>
            <M tex="\text{MMC}(a,b) = 2^{17} \cdot 3^{28} \cdot 5^3 \cdot 7^{16}" display />
            <p>(Todos os primos com maiores expoentes)</p>
            <p className="mt-2"><strong>c)</strong> Divisores inteiros positivos de <M tex="b = 2^9 \cdot 5^3 \cdot 7^{16}" />:</p>
            <M tex="d(b) = (9+1)(3+1)(16+1) = 10 \cdot 4 \cdot 17 = 680" display />
          </div>
        }
      />
    </Quiz>
  )
}

function Gabarito() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Exercícios de Vestibular</h3>

      <ExerciseCard
        number={1}
        source="Fuvest SP"
        solution={
          <div className="space-y-2">
            <p>Uma luz pisca <M tex="15" /> vezes/min → a cada <M tex="\frac{60}{15} = 4" /> segundos.</p>
            <p>Outra pisca <M tex="10" /> vezes/min → a cada <M tex="\frac{60}{10} = 6" /> segundos.</p>
            <p>Voltam a piscar juntas após:</p>
            <M tex="\text{MMC}(4, 6) = 12 \text{ segundos}" display />
            <p><strong>Resposta: a) 12</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 12', correct: true },
          { label: 'b) 18' },
          { label: 'c) 20' },
          { label: 'd) 24' },
          { label: 'e) 30' },
        ]}
      >
        <p>
          No alto de uma torre de TV há duas luzes que piscam com frequências diferentes.
          Uma pisca <M tex="15" /> vezes por minuto e a outra <M tex="10" /> vezes por minuto.
          Se elas piscam juntas num dado instante, após quantos segundos voltarão a piscar juntas?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>Chamando <M tex="N" /> o número de laranjas (entre 500 e 1500):</p>
            <M tex="N \equiv 12 \pmod{50} \quad \text{e} \quad N \equiv 12 \pmod{36}" display />
            <p>Logo <M tex="N - 12" /> é múltiplo de <M tex="50" /> e de <M tex="36" />:</p>
            <M tex="\text{MMC}(50, 36): \quad 50 = 2 \cdot 5^2, \quad 36 = 2^2 \cdot 3^2" display />
            <M tex="\text{MMC}(50, 36) = 2^2 \cdot 3^2 \cdot 5^2 = 900" display />
            <p><M tex="N - 12 = 900k" />. Para <M tex="500 \leq N \leq 1500" />: <M tex="k = 1" /> → <M tex="N = 912" />.</p>
            <p>Dividindo por 35:</p>
            <M tex="912 = 35 \cdot 26 + 2" display />
            <p><strong>Resposta: d) 2</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 0' },
          { label: 'b) 10' },
          { label: 'c) 12' },
          { label: 'd) 2', correct: true },
          { label: 'e) 22' },
        ]}
      >
        <p>
          Uma pessoa tem entre 500 e 1500 laranjas. Colocando-as em sacos de 50 sobram 12.
          Colocando em sacos de 36 também sobram 12. Se colocá-las em sacos de 35, quantas sobram?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="UFG GO"
        solution={
          <div className="space-y-2">
            <p>São <M tex="864" /> bermudas e <M tex="756" /> calças divididas em pacotes iguais.</p>
            <p>O número de pacotes <M tex="k" /> deve dividir ambos: <M tex="k \mid 864" /> e <M tex="k \mid 756" />.</p>
            <p>Para maximizar peças por pacote, minimizamos <M tex="k" />... mas queremos o <strong>maior número de pacotes iguais</strong>:</p>
            <M tex="864 = 2^5 \cdot 3^3, \quad 756 = 2^2 \cdot 3^3 \cdot 7" display />
            <M tex="\text{MDC}(864, 756) = 2^2 \cdot 3^3 = 108" display />
            <p>Com <M tex="k = 108" /> pacotes, cada pacote tem:</p>
            <M tex="\frac{864 + 756}{108} = \frac{1620}{108} = 15 \text{ peças}" display />
            <p><strong>Resposta: c) 15</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 9' },
          { label: 'b) 12' },
          { label: 'c) 15', correct: true },
          { label: 'd) 18' },
          { label: 'e) 20' },
        ]}
      >
        <p>
          Uma confecção produz <M tex="864" /> bermudas e <M tex="756" /> calças. Dividindo-as em
          pacotes iguais, cada um com <M tex="n_1" /> bermudas e <M tex="n_2" /> calças, sem sobrar
          nenhuma peça, o maior número de peças em cada pacote é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="UEL PR"
        solution={
          <div className="space-y-2">
            <p>Para dividir 1350 rapazes e 1224 garotas em grupos iguais do mesmo sexo:</p>
            <p>O tamanho do grupo <M tex="d" /> deve dividir ambos.</p>
            <p>Para <strong>mínimo de professores</strong>, queremos o maior grupo possível → <M tex="d = \text{MDC}(1350, 1224)" />.</p>
            <M tex="1350 = 2 \cdot 3^3 \cdot 5^2, \quad 1224 = 2^3 \cdot 3^2 \cdot 17" display />
            <M tex="\text{MDC}(1350, 1224) = 2 \cdot 3^2 = 18" display />
            <p>Número de grupos (= professores):</p>
            <M tex="\frac{1350}{18} + \frac{1224}{18} = 75 + 68 = 143" display />
            <p><strong>Resposta: e) 143</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 125' },
          { label: 'b) 130' },
          { label: 'c) 135' },
          { label: 'd) 140' },
          { label: 'e) 143', correct: true },
        ]}
      >
        <p>
          Uma escola tem <M tex="1350" /> rapazes e <M tex="1224" /> garotas. Para uma atividade,
          devem ser divididos em grupos de mesmo tamanho e mesmo sexo, com um professor por grupo.
          O número mínimo de professores é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="UEG GO"
        solution={
          <div className="space-y-2">
            <p>João trabalha 8 dias e folga no 9º (ciclo de 9 dias).</p>
            <p>O irmão trabalha 20 dias e folga no 21º (ciclo de 21 dias).</p>
            <p>Próxima folga simultânea:</p>
            <M tex="\text{MMC}(9, 21) = \text{MMC}(3^2,\; 3 \cdot 7) = 3^2 \cdot 7 = 63 \text{ dias}" display />
            <p><strong>Resposta: c) 63 dias</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 42 dias' },
          { label: 'b) 56 dias' },
          { label: 'c) 63 dias', correct: true },
          { label: 'd) 84 dias' },
          { label: 'e) 189 dias' },
        ]}
      >
        <p>
          João e seu irmão dividem o aluguel. João trabalha 8 dias e folga no 9º dia.
          Seu irmão trabalha 20 dias e folga no 21º dia. Se folgam juntos hoje,
          em quantos dias voltarão a folgar juntos?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="Fuvest SP"
        solution={
          <div className="space-y-2">
            <p>O lado do cubo deve dividir todas as dimensões:</p>
            <M tex="\text{MDC}(60, 24, 18)" display />
            <p>Fatorando: <M tex="60 = 2^2 \cdot 3 \cdot 5" />, <M tex="24 = 2^3 \cdot 3" />, <M tex="18 = 2 \cdot 3^2" />.</p>
            <M tex="\text{MDC} = 2 \cdot 3 = 6 \text{ cm}" display />
            <p>Quantidade de cubos:</p>
            <M tex="\frac{60}{6} \cdot \frac{24}{6} \cdot \frac{18}{6} = 10 \cdot 4 \cdot 3 = 120" display />
            <p><strong>Resposta: e) 120</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 30' },
          { label: 'b) 48' },
          { label: 'c) 60' },
          { label: 'd) 96' },
          { label: 'e) 120', correct: true },
        ]}
      >
        <p>
          Um paralelepípedo retângulo de dimensões <M tex="60" /> cm <M tex="\times" /> <M tex="24" /> cm{' '}
          <M tex="\times" /> <M tex="18" /> cm deve ser preenchido com a menor quantidade possível de cubos
          idênticos. Essa quantidade é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="Univag MT"
        solution={
          <div className="space-y-2">
            <p>Ônibus Norte: a cada 40 min. Ônibus Sul: a cada 72 min (1h12min).</p>
            <p>Voltam a sair juntos após:</p>
            <M tex="40 = 2^3 \cdot 5, \quad 72 = 2^3 \cdot 3^2" display />
            <M tex="\text{MMC}(40, 72) = 2^3 \cdot 3^2 \cdot 5 = 360 \text{ min} = 6 \text{ horas}" display />
            <p>Saíram juntos às 10h. Próximo horário: <M tex="10\text{h} + 6\text{h} = 16\text{h}" />.</p>
            <p><strong>Resposta: a) 16h</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 16h', correct: true },
          { label: 'b) 17h' },
          { label: 'c) 18h' },
          { label: 'd) 19h' },
          { label: 'e) 20h' },
        ]}
      >
        <p>
          De um terminal, ônibus para o Norte saem a cada <M tex="40" /> minutos e para o Sul
          a cada <M tex="72" /> minutos. Se ambos saíram juntos às <M tex="10" />h, a que horas
          voltarão a sair juntos?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="Famema SP"
        solution={
          <div className="space-y-2">
            <p>Sílvia vai à capital a cada 10 dias, Márcio a cada 12 dias.</p>
            <M tex="\text{MMC}(10, 12) = 60 \text{ dias}" display />
            <p>Encontraram-se num sábado. Próximo encontro: 60 dias depois.</p>
            <M tex="60 \div 7 = 8 \text{ semanas} + 4 \text{ dias}" display />
            <p>Sábado + 4 dias = <strong>quarta-feira</strong>.</p>
            <p><strong>Resposta: b) quarta-feira</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) terça-feira' },
          { label: 'b) quarta-feira', correct: true },
          { label: 'c) quinta-feira' },
          { label: 'd) sexta-feira' },
          { label: 'e) sábado' },
        ]}
      >
        <p>
          Sílvia vai à capital a cada <M tex="10" /> dias e Márcio a cada <M tex="12" /> dias.
          Encontraram-se num sábado. Em que dia da semana será o próximo encontro?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="UEFS BA"
        solution={
          <div className="space-y-2">
            <p>Em 3 dias, a equipe corrige 702, 728 e 585 redações (igualmente distribuídas entre os professores).</p>
            <p>O número de professores deve dividir cada dia:</p>
            <M tex="702 = 2 \cdot 3^3 \cdot 13" display />
            <M tex="728 = 2^3 \cdot 7 \cdot 13" display />
            <M tex="585 = 3^2 \cdot 5 \cdot 13" display />
            <M tex="\text{MDC}(702, 728, 585) = 13" display />
            <p>Cada professor corrige por dia:</p>
            <M tex="\text{1º dia: } \frac{702}{13} = 54, \quad \text{2º dia: } \frac{728}{13} = 56, \quad \text{3º dia: } \frac{585}{13} = 45" display />
            <p>Total de redações por professor: <M tex="54 + 56 + 45 = 155" />.</p>
            <p><strong>Resposta: a equipe tem 13 professores.</strong></p>
          </div>
        }
      >
        <p>
          Uma equipe de professores corrige redações em 3 dias: <M tex="702" /> no primeiro dia,{' '}
          <M tex="728" /> no segundo e <M tex="585" /> no terceiro. Se as redações são divididas
          igualmente entre os professores a cada dia, quantos professores compõem a equipe?
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function C35MmcMdc() {
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
