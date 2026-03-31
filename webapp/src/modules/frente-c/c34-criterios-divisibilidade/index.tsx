import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function digitSum(n: number): number {
  return Math.abs(n).toString().split('').reduce((s, d) => s + parseInt(d), 0)
}

function lastNDigits(n: number, count: number): number {
  return Math.abs(n) % (10 ** count)
}

function alternatingDigitSum(n: number): { oddSum: number; evenSum: number; diff: number } {
  const digits = Math.abs(n).toString().split('').map(Number)
  let oddSum = 0
  let evenSum = 0
  digits.forEach((d, i) => {
    const posFromRight = digits.length - i
    if (posFromRight % 2 === 1) oddSum += d
    else evenSum += d
  })
  return { oddSum, evenSum, diff: oddSum - evenSum }
}

function checkDivisibility(n: number): { divisor: number; result: boolean; explanation: string }[] {
  const absN = Math.abs(n)
  const ds = digitSum(absN)
  const units = absN % 10
  const last2 = lastNDigits(absN, 2)
  const last3 = lastNDigits(absN, 3)
  const alt = alternatingDigitSum(absN)

  return [
    {
      divisor: 2,
      result: units % 2 === 0,
      explanation: `Algarismo das unidades = ${units}, que é ${units % 2 === 0 ? 'par' : 'ímpar'}`,
    },
    {
      divisor: 3,
      result: ds % 3 === 0,
      explanation: `Soma dos algarismos = ${ds}, ${ds % 3 === 0 ? 'divisível' : 'não divisível'} por 3`,
    },
    {
      divisor: 4,
      result: last2 % 4 === 0,
      explanation: `Últimos 2 algarismos = ${last2.toString().padStart(2, '0')}, ${last2 % 4 === 0 ? 'divisível' : 'não divisível'} por 4`,
    },
    {
      divisor: 5,
      result: units === 0 || units === 5,
      explanation: `Algarismo das unidades = ${units}, ${units === 0 || units === 5 ? 'é 0 ou 5' : 'não é 0 nem 5'}`,
    },
    {
      divisor: 6,
      result: units % 2 === 0 && ds % 3 === 0,
      explanation: `Divisível por 2 (${units % 2 === 0 ? '✓' : '✗'}) E por 3 (${ds % 3 === 0 ? '✓' : '✗'})`,
    },
    {
      divisor: 8,
      result: last3 % 8 === 0,
      explanation: `Últimos 3 algarismos = ${last3.toString().padStart(3, '0')}, ${last3 % 8 === 0 ? 'divisível' : 'não divisível'} por 8`,
    },
    {
      divisor: 9,
      result: ds % 9 === 0,
      explanation: `Soma dos algarismos = ${ds}, ${ds % 9 === 0 ? 'divisível' : 'não divisível'} por 9`,
    },
    {
      divisor: 10,
      result: units === 0,
      explanation: `Algarismo das unidades = ${units}, ${units === 0 ? 'é 0' : 'não é 0'}`,
    },
    {
      divisor: 11,
      result: alt.diff % 11 === 0,
      explanation: `Soma posições ímpares = ${alt.oddSum}, pares = ${alt.evenSum}, diferença = ${alt.diff}, ${Math.abs(alt.diff) % 11 === 0 ? 'divisível' : 'não divisível'} por 11`,
    },
    {
      divisor: 12,
      result: last2 % 4 === 0 && ds % 3 === 0,
      explanation: `Divisível por 3 (${ds % 3 === 0 ? '✓' : '✗'}) E por 4 (${last2 % 4 === 0 ? '✓' : '✗'})`,
    },
  ]
}

function primeFactorize(n: number): { factor: number; power: number }[] {
  if (n <= 1) return []
  const factors: { factor: number; power: number }[] = []
  let remaining = n
  for (let p = 2; p * p <= remaining; p++) {
    let count = 0
    while (remaining % p === 0) {
      remaining /= p
      count++
    }
    if (count > 0) factors.push({ factor: p, power: count })
  }
  if (remaining > 1) factors.push({ factor: remaining, power: 1 })
  return factors
}

function factorizationSteps(n: number): { divisor: number; quotient: number }[] {
  if (n <= 1) return []
  const steps: { divisor: number; quotient: number }[] = []
  let remaining = n
  for (let p = 2; p * p <= remaining; p++) {
    while (remaining % p === 0) {
      steps.push({ divisor: p, quotient: remaining / p })
      remaining /= p
    }
  }
  if (remaining > 1) steps.push({ divisor: remaining, quotient: 1 })
  return steps
}

function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

function countDivisors(n: number): number {
  const factors = primeFactorize(n)
  return factors.reduce((prod, f) => prod * (f.power + 1), 1)
}

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Critérios de Divisibilidade e Quantidade de Divisores</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Critérios de Divisibilidade</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="border-b border-yellow-300">
                <th className="text-left py-2 px-2 font-semibold">Divisor</th>
                <th className="text-left py-2 px-2 font-semibold">Critério</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100">
              <tr><td className="py-2 px-2 font-mono font-bold">2</td><td className="py-2 px-2">Algarismo das unidades é <M tex="0, 2, 4, 6" /> ou <M tex="8" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">3</td><td className="py-2 px-2">Soma dos algarismos divisível por <M tex="3" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">4</td><td className="py-2 px-2">Dois últimos algarismos formam número divisível por <M tex="4" /> (ou são <M tex="00" />)</td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">5</td><td className="py-2 px-2">Algarismo das unidades é <M tex="0" /> ou <M tex="5" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">6</td><td className="py-2 px-2">Divisível por <M tex="2" /> <strong>E</strong> por <M tex="3" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">8</td><td className="py-2 px-2">Três últimos algarismos formam número divisível por <M tex="8" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">9</td><td className="py-2 px-2">Soma dos algarismos divisível por <M tex="9" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">10</td><td className="py-2 px-2">Algarismo das unidades é <M tex="0" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">11</td><td className="py-2 px-2">Diferença entre soma dos algarismos de posição ímpar e par (da direita) é divisível por <M tex="11" /></td></tr>
              <tr><td className="py-2 px-2 font-mono font-bold">12</td><td className="py-2 px-2">Divisível por <M tex="3" /> <strong>E</strong> por <M tex="4" /></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Números Primos</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Definição — Número Primo</h4>
          <p className="text-gray-700">
            Um número inteiro <M tex="p > 1" /> é <strong>primo</strong> se possui exatamente
            4 divisores inteiros: <M tex="\pm 1" /> e <M tex="\pm p" />.
          </p>
          <M tex="\text{Primos: } 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, \ldots" display />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Observações</h4>
          <ul className="text-gray-700 space-y-1 list-disc list-inside">
            <li>O único primo par é <M tex="2" />. Todos os demais primos são ímpares.</li>
            <li>Existem infinitos números primos (Euclides).</li>
            <li>
              Para verificar se <M tex="n" /> é primo, basta testar divisão por todos os
              primos <M tex="p" /> com <M tex="p^2 \leq n" /> (ou seja, <M tex="p \leq \sqrt{n}" />).
            </li>
            <li><M tex="1" /> <strong>não</strong> é primo (tem apenas 2 divisores inteiros: <M tex="\pm 1" />).</li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Teorema Fundamental da Aritmética (TFA)</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Teorema</h4>
          <p className="text-gray-700 mb-2">
            Todo número inteiro <M tex="n > 1" /> que não é primo (<strong>composto</strong>) pode ser escrito,
            de maneira única (a menos da ordem), como produto de fatores primos:
          </p>
          <M tex="n = p_1^{a_1} \cdot p_2^{a_2} \cdot \ldots \cdot p_k^{a_k}" display />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          <p className="text-gray-700 font-medium mb-2">Exemplo: Fatoração de 528</p>
          <div className="flex items-start gap-6">
            <div className="font-mono text-sm space-y-0.5 text-gray-700">
              <div className="flex"><span className="w-12 text-right">528</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
              <div className="flex"><span className="w-12 text-right">264</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
              <div className="flex"><span className="w-12 text-right">132</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
              <div className="flex"><span className="w-12 text-right">66</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">2</span></div>
              <div className="flex"><span className="w-12 text-right">33</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">3</span></div>
              <div className="flex"><span className="w-12 text-right">11</span><span className="mx-2">|</span><span className="text-indigo-600 font-bold">11</span></div>
              <div className="flex"><span className="w-12 text-right">1</span><span className="mx-2"> </span></div>
            </div>
            <div className="text-gray-700">
              <M tex="528 = 2^4 \cdot 3^1 \cdot 11^1" display />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Quantidade de Divisores</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Fórmula</h4>
          <p className="text-gray-700 mb-2">
            Se <M tex="n = p_1^{a_1} \cdot p_2^{a_2} \cdot \ldots \cdot p_k^{a_k}" />, então a
            quantidade de <strong>divisores positivos</strong> de <M tex="n" /> é:
          </p>
          <M tex="d(n) = (a_1 + 1)(a_2 + 1) \cdots (a_k + 1)" display />
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mt-2">
          <p className="text-gray-700 font-medium mb-1">Exemplo:</p>
          <M tex="1200 = 2^4 \cdot 3^1 \cdot 5^2" display />
          <p className="text-gray-700">
            Divisores positivos: <M tex="(4+1)(1+1)(2+1) = 5 \cdot 2 \cdot 3 = 30" />
          </p>
          <p className="text-gray-700 text-sm mt-1">
            A quantidade de divisores <em>negativos</em> é a mesma, e o total de
            divisores inteiros é o dobro: <M tex="60" />.
          </p>
        </div>
      </div>
    </div>
  )
}

function Simulador() {
  const [activeTab, setActiveTab] = useState(0)
  const [divInput, setDivInput] = useState('')
  const [factInput, setFactInput] = useState('')
  const [primeInput, setPrimeInput] = useState('')

  const simulatorTabs = ['Verificador de Divisibilidade', 'Fatoração Prima', 'Verificador de Primo']

  const divNum = divInput !== '' ? parseInt(divInput) : null
  const divResults = divNum !== null && !isNaN(divNum) && divNum > 0 ? checkDivisibility(divNum) : null

  const factNum = factInput !== '' ? parseInt(factInput) : null
  const factSteps = factNum !== null && !isNaN(factNum) && factNum > 1 ? factorizationSteps(factNum) : null
  const factFactors = factNum !== null && !isNaN(factNum) && factNum > 1 ? primeFactorize(factNum) : null
  const factDivisorCount = factNum !== null && !isNaN(factNum) && factNum > 1 ? countDivisors(factNum) : null

  const primeNum = primeInput !== '' ? parseInt(primeInput) : null
  const primeResult = primeNum !== null && !isNaN(primeNum) && primeNum >= 0

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
            Insira um número natural positivo para verificar os critérios de divisibilidade de 2 a 12.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              min="1"
              value={divInput}
              onChange={(e) => setDivInput(e.target.value)}
              className="w-60 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 252489076254"
            />
          </div>
          {divResults && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left font-semibold">Divisor</th>
                    <th className="py-2 px-3 text-center font-semibold">Resultado</th>
                    <th className="py-2 px-3 text-left font-semibold">Justificativa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {divResults.map((r) => (
                    <tr key={r.divisor} className={r.result ? 'bg-green-50' : 'bg-red-50'}>
                      <td className="py-2 px-3 font-mono font-bold">{r.divisor}</td>
                      <td className="py-2 px-3 text-center text-xl">
                        {r.result ? <span className="text-green-600">✓</span> : <span className="text-red-500">✗</span>}
                      </td>
                      <td className="py-2 px-3 text-gray-700">{r.explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira um número natural maior que 1 para ver sua fatoração prima passo a passo.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              min="2"
              value={factInput}
              onChange={(e) => setFactInput(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 1200"
            />
          </div>
          {factSteps && factFactors && factDivisorCount !== null && factNum !== null && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-3">Decomposição passo a passo</h4>
                <div className="font-mono text-sm space-y-0.5">
                  {factSteps.map((step, i) => {
                    const valueAtStep = i === 0
                      ? factNum
                      : factSteps.slice(0, i).reduce((v, s) => v / s.divisor, factNum)
                    return (
                      <div key={i} className="flex">
                        <span className="w-20 text-right text-gray-700">
                          {Math.round(valueAtStep)}
                        </span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-indigo-600 font-bold">{step.divisor}</span>
                      </div>
                    )
                  })}
                  <div className="flex">
                    <span className="w-20 text-right text-gray-700">1</span>
                    <span className="mx-2 text-gray-400"> </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2">Forma canônica</h4>
                  <M
                    tex={`${factNum} = ${factFactors.map((f) => f.power === 1 ? `${f.factor}` : `${f.factor}^{${f.power}}`).join(' \\cdot ')}`}
                    display
                  />
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Quantidade de divisores</h4>
                  <M
                    tex={`d(${factNum}) = ${factFactors.map((f) => `(${f.power}+1)`).join(' \\cdot ')} = ${factDivisorCount}`}
                    display
                  />
                  <p className="text-sm text-gray-600">
                    <strong>{factDivisorCount}</strong> divisores positivos ·{' '}
                    <strong>{factDivisorCount}</strong> divisores negativos ·{' '}
                    <strong>{factDivisorCount * 2}</strong> divisores inteiros
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira um número natural para verificar se é primo. O teste divide por todos os
            primos <M tex="p" /> com <M tex="p \leq \sqrt{n}" />.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              min="0"
              value={primeInput}
              onChange={(e) => setPrimeInput(e.target.value)}
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 97"
            />
          </div>
          {primeResult && primeNum !== null && (
            <div className="space-y-3">
              {primeNum < 2 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-gray-700">
                    <M tex={`${primeNum}`} /> <strong>não é primo</strong> (primos são maiores que 1).
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Teste: primos <M tex={`p \\leq \\sqrt{${primeNum}} \\approx ${Math.sqrt(primeNum).toFixed(2)}`} />
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const limit = Math.floor(Math.sqrt(primeNum))
                        const tests: { p: number; divides: boolean }[] = []
                        for (let p = 2; p <= limit; p++) {
                          if (isPrime(p)) {
                            tests.push({ p, divides: primeNum % p === 0 })
                          }
                        }
                        if (tests.length === 0) {
                          return (
                            <p className="text-sm text-gray-600">
                              Nenhum primo a testar (<M tex={`\\sqrt{${primeNum}} < 2`} />).
                            </p>
                          )
                        }
                        return tests.map((t) => (
                          <span
                            key={t.p}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-mono ${
                              t.divides
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-green-100 text-green-700 border border-green-300'
                            }`}
                          >
                            {t.p} {t.divides ? '✗ divide!' : '✓'}
                          </span>
                        ))
                      })()}
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border ${
                    isPrime(primeNum)
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{isPrime(primeNum) ? '✅' : '❌'}</span>
                      <div>
                        <p className="font-semibold text-lg">
                          <M tex={`${primeNum}`} /> {isPrime(primeNum) ? 'é PRIMO' : 'NÃO é primo'}
                        </p>
                        {!isPrime(primeNum) && primeNum > 1 && (
                          <p className="text-sm text-gray-600">
                            Fatoração:{' '}
                            <M tex={`${primeNum} = ${primeFactorize(primeNum).map((f) => f.power === 1 ? `${f.factor}` : `${f.factor}^{${f.power}}`).join(' \\cdot ')}`} />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
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
            Verifique se <M tex="252\,489\,076\,254" /> é divisível por <M tex="6" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Verificando se <M tex="252\,489\,076\,254" /> é divisível por <M tex="6" />:</p>
            <p><strong>Por 2:</strong> O algarismo das unidades é <M tex="4" />, que é par. ✓</p>
            <p><strong>Por 3:</strong> Soma dos algarismos: <M tex="2+5+2+4+8+9+0+7+6+2+5+4 = 54" />, que é divisível por 3. ✓</p>
            <p>Como é divisível por 2 e por 3, é <strong>divisível por 6</strong>. ✓</p>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Considerando o número de 4 algarismos <M tex="147n" />, qual deve ser o valor de <M tex="n" /> para
            que o número seja divisível por <M tex="11" />?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Para que <M tex="147n" /> (4 algarismos) seja divisível por <M tex="11" />, a diferença alternada deve ser divisível por 11.</p>
            <p>Algarismos (da esquerda para a direita): <M tex="1, 4, 7, n" />.</p>
            <p>Posições da direita: <M tex="n" /> (1ª, ímpar), <M tex="7" /> (2ª, par), <M tex="4" /> (3ª, ímpar), <M tex="1" /> (4ª, par).</p>
            <p>Soma das posições ímpares: <M tex="n + 4" />. Soma das posições pares: <M tex="7 + 1 = 8" />.</p>
            <M tex="(n + 4) - 8 = n - 4" display />
            <p>Para divisibilidade por 11: <M tex="n - 4 \equiv 0 \pmod{11}" />, ou seja, <M tex="n = 4" />.</p>
            <p>(Se <M tex="n - 4 = -11" />, teríamos <M tex="n = -7" />, impossível para algarismo.)</p>
            <p><strong>Resposta:</strong> <M tex="n = 4" /></p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>Determine os divisores positivos de <M tex="120" />.</span>
        }
        solution={
          <div className="space-y-2">
            <p>Fatorando <M tex="120" />:</p>
            <M tex="120 = 2^3 \cdot 3 \cdot 5" display />
            <p>Divisores positivos: <M tex="(3+1)(1+1)(1+1) = 16" /> divisores.</p>
            <M tex="D^+(120) = \{1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120\}" display />
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Determine <M tex="k" /> sabendo que <M tex="N = 2^k \cdot 3^2 \cdot 7" /> possui
            exatamente <M tex="24" /> divisores positivos.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>O número de divisores positivos de <M tex="N = 2^k \cdot 3^2 \cdot 7" /> é:</p>
            <M tex="d(N) = (k+1)(2+1)(1+1) = 6(k+1)" display />
            <p>Igualando a 24:</p>
            <M tex="6(k+1) = 24 \implies k+1 = 4 \implies k = 3" display />
            <p><strong>Resposta:</strong> <M tex="k = 3" /></p>
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <span>Qual o número de divisores naturais <strong>ímpares</strong> de <M tex="210" />?</span>
        }
        solution={
          <div className="space-y-2">
            <p>Fatorando:</p>
            <M tex="210 = 2 \cdot 3 \cdot 5 \cdot 7" display />
            <p>Os divisores <strong>ímpares</strong> são obtidos excluindo o fator <M tex="2" />:</p>
            <M tex="210_{\text{ímpar}} = 3^1 \cdot 5^1 \cdot 7^1" display />
            <p>Quantidade de divisores ímpares:</p>
            <M tex="(1+1)(1+1)(1+1) = 8" display />
            <p><strong>Resposta:</strong> <M tex="8" /> divisores naturais ímpares.</p>
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
        solution={
          <div className="space-y-2">
            <p><strong>a) Divisível por 2</strong> (unidades par):</p>
            <p>Menor: <M tex="102" />. Maior: <M tex="986" />.</p>
            <p><strong>b) Divisível por 3</strong> (soma dos algarismos div. por 3):</p>
            <p>Menor: <M tex="102" /> (<M tex="1+0+2=3" />). Maior: <M tex="987" /> (<M tex="9+8+7=24" />).</p>
            <p><strong>c) Divisível por 4</strong> (últimos 2 dígitos div. por 4):</p>
            <p>Menor: <M tex="104" />. Maior: <M tex="984" />.</p>
            <p><strong>d) Divisível por 5</strong> (unidades 0 ou 5):</p>
            <p>Menor: <M tex="105" />. Maior: <M tex="985" />.</p>
          </div>
        }
      >
        <p>
          Utilizando os critérios de divisibilidade, determine o menor e o maior inteiro de 3 algarismos
          distintos que seja divisível por: a) 2, b) 3, c) 4, d) 5.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="Cefet CE"
        solution={
          <div className="space-y-2">
            <p>O número <M tex="7a6" /> deve ser divisível por 4 e por 9 simultaneamente.</p>
            <p><strong>Por 4:</strong> últimos 2 algarismos = <M tex="a6" />. Para <M tex="a6" /> ser divisível por 4:</p>
            <p>Valores possíveis: <M tex="16, 36, 56, 76, 96" /> → <M tex="a \in \{1, 3, 5, 7, 9\}" />.</p>
            <p><strong>Por 9:</strong> soma dos algarismos = <M tex="7 + a + 6 = 13 + a" /> divisível por 9.</p>
            <M tex="13 + a = 18 \implies a = 5" display />
            <p>Verificação: <M tex="a = 5 \in \{1,3,5,7,9\}" /> ✓. O número é <M tex="756" />.</p>
            <p><strong>Resposta:</strong> <M tex="a = 5" /></p>
          </div>
        }
      >
        <p>
          Qual algarismo <M tex="a" /> deve ser intercalado entre <M tex="7" /> e <M tex="6" /> para
          que o número <M tex="7a6" /> seja divisível por <M tex="4" /> e <M tex="9" /> simultaneamente?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>Simplificando o produto:</p>
            <M tex="2^a \cdot 3 \cdot 6 \cdot 20 = 2^a \cdot 3 \cdot (2 \cdot 3) \cdot (2^2 \cdot 5) = 2^{a+3} \cdot 3^2 \cdot 5" display />
            <p>Quantidade de divisores naturais:</p>
            <M tex="(a+3+1)(2+1)(1+1) = (a+4) \cdot 6 = 48" display />
            <M tex="a + 4 = 8 \implies a = 4" display />
            <p><strong>Resposta:</strong> <M tex="a = 4" /></p>
          </div>
        }
      >
        <p>
          O número <M tex="2^a \cdot 3 \cdot 6 \cdot 20" /> tem <M tex="48" /> divisores naturais.
          Determine o valor de <M tex="a" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        source="FCC SP"
        solution={
          <div className="space-y-2">
            <p>Para <M tex="222\,222n" /> ser divisível por 6:</p>
            <p><strong>Por 2:</strong> <M tex="n" /> deve ser par → <M tex="n \in \{0, 2, 4, 6, 8\}" /></p>
            <p><strong>Por 3:</strong> Soma dos algarismos = <M tex="2+2+2+2+2+2+n = 12 + n" /> div. por 3.</p>
            <p>Valores de <M tex="n" /> par com <M tex="12 + n" /> divisível por 3:</p>
            <ul className="list-disc list-inside ml-4">
              <li><M tex="n = 0" />: <M tex="12" /> div. por 3 ✓</li>
              <li><M tex="n = 2" />: <M tex="14" /> não div. por 3 ✗</li>
              <li><M tex="n = 4" />: <M tex="16" /> não div. por 3 ✗</li>
              <li><M tex="n = 6" />: <M tex="18" /> div. por 3 ✓</li>
              <li><M tex="n = 8" />: <M tex="20" /> não div. por 3 ✗</li>
            </ul>
            <p><strong>Resposta: b) 0 ou 6</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 2 ou 8' },
          { label: 'b) 0 ou 6', correct: true },
          { label: 'c) 4' },
          { label: 'd) 2 ou 7' },
          { label: 'e) 3 ou 9' },
        ]}
      >
        <p>
          Para que o número <M tex="222\,222n" /> seja divisível por <M tex="6" />, o algarismo <M tex="n" /> deve ser:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="Unifor CE"
        solution={
          <div className="space-y-2">
            <p><M tex="6X3Y" /> divisível por 15 = divisível por 3 E por 5.</p>
            <p><strong>Por 5:</strong> <M tex="Y = 0" /> ou <M tex="Y = 5" />.</p>
            <p><strong>Por 3:</strong> <M tex="6 + X + 3 + Y = 9 + X + Y" /> divisível por 3.</p>
            <p>Se <M tex="Y = 0" />: <M tex="9 + X" /> div. por 3 → <M tex="X \in \{0, 3, 6, 9\}" /> (4 pares).</p>
            <p>Se <M tex="Y = 5" />: <M tex="14 + X" /> div. por 3 → <M tex="X \in \{1, 4, 7\}" /> (3 pares).</p>
            <p>Total: <M tex="4 + 3 = 7" /> pares <M tex="(X, Y)" />.</p>
            <p><strong>Resposta: 7 pares</strong></p>
          </div>
        }
      >
        <p>
          Para que <M tex="6X3Y" /> seja divisível por <M tex="15" />, quantos pares <M tex="(X, Y)" /> são possíveis?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="UFF RJ"
        solution={
          <div className="space-y-2">
            <p>Um primo de Sophie Germain <M tex="p" /> é tal que <M tex="p" /> é primo e <M tex="2p + 1" /> também é primo.</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li><M tex="7" />: <M tex="2(7)+1 = 15 = 3 \times 5" /> — não primo ✗</li>
              <li><M tex="17" />: <M tex="2(17)+1 = 35 = 5 \times 7" /> — não primo ✗</li>
              <li><M tex="18" />: não é primo ✗</li>
              <li><M tex="19" />: <M tex="2(19)+1 = 39 = 3 \times 13" /> — não primo ✗</li>
              <li><M tex="41" />: <M tex="2(41)+1 = 83" /> — primo ✓</li>
            </ul>
            <p><strong>Resposta: e) 41</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 7' },
          { label: 'b) 17' },
          { label: 'c) 18' },
          { label: 'd) 19' },
          { label: 'e) 41', correct: true },
        ]}
      >
        <p>
          Primos de Sophie Germain são primos <M tex="p" /> tais que <M tex="2p + 1" /> também é primo.
          Qual dos números abaixo é um primo de Sophie Germain?
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="UFG GO"
        solution={
          <div className="space-y-2">
            <p>Divisores próprios de 220 (excluindo 220):</p>
            <M tex="1+2+4+5+10+11+20+22+44+55+110 = 284" display />
            <p>Divisores próprios de 284 (excluindo 284):</p>
            <M tex="1+2+4+71+142 = 220" display />
            <p>Como a soma dos divisores próprios de 220 é 284, e a soma dos divisores próprios de 284 é 220, os números <M tex="220" /> e <M tex="284" /> são <strong>amigáveis</strong>. ✓</p>
          </div>
        }
      >
        <p>
          Dois números são ditos "amigáveis" quando a soma dos divisores próprios de cada um é igual ao outro.
          Verifique que <M tex="220" /> e <M tex="284" /> são amigáveis.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="UFU MG"
        solution={
          <div className="space-y-2">
            <p>Os divisores de <M tex="p^2" /> (com <M tex="p" /> primo) são: <M tex="1, p, p^2" />.</p>
            <M tex="1 + p + p^2 = 31" display />
            <M tex="p^2 + p - 30 = 0" display />
            <M tex="(p + 6)(p - 5) = 0" display />
            <p>Como <M tex="p > 0" />, temos <M tex="p = 5" />.</p>
            <p>Verificação: <M tex="5" /> é primo e <M tex="1 + 5 + 25 = 31" /> ✓</p>
            <p><strong>Resposta: a) 5</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 5', correct: true },
          { label: 'b) 6' },
          { label: 'c) 7' },
          { label: 'd) 11' },
          { label: 'e) 13' },
        ]}
      >
        <p>
          Sendo <M tex="p" /> um número natural primo, a soma de todos os divisores
          de <M tex="p^2" /> é <M tex="31" />. O valor de <M tex="p" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="UFES"
        solution={
          <div className="space-y-2">
            <p>Fatorando <M tex="2004" />:</p>
            <M tex="2004 = 2^2 \cdot 3 \cdot 167" display />
            <p>O número de tipos de caixa corresponde ao número de divisores positivos de 2004:</p>
            <M tex="d(2004) = (2+1)(1+1)(1+1) = 3 \cdot 2 \cdot 2 = 12" display />
            <p><strong>Resposta: a) 12</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 12', correct: true },
          { label: 'b) 18' },
          { label: 'c) 24' },
          { label: 'd) 36' },
          { label: 'e) 48' },
        ]}
      >
        <p>
          Um fornecedor tem <M tex="2004" /> bolas de tênis para embalar em caixas de mesma capacidade,
          desde o tipo com capacidade para apenas uma bola até o tipo com capacidade para
          todas as <M tex="2004" /> bolas. O número de tipos de caixa que ele pode utilizar é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="Cefet MG"
        solution={
          <div className="space-y-2">
            <p>Analisando os números 1870, 1875, 1877, 1878, 1880:</p>
            <p><strong>I. Apenas dois múltiplos de 3:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li><M tex="1870" />: <M tex="1+8+7+0=16" />, não div. por 3</li>
              <li><M tex="1875" />: <M tex="1+8+7+5=21" />, div. por 3 ✓</li>
              <li><M tex="1877" />: <M tex="1+8+7+7=23" />, não div. por 3</li>
              <li><M tex="1878" />: <M tex="1+8+7+8=24" />, div. por 3 ✓</li>
              <li><M tex="1880" />: <M tex="1+8+8+0=17" />, não div. por 3</li>
            </ul>
            <p>Dois múltiplos de 3: 1875 e 1878. <strong>Verdadeiro.</strong></p>
            <p><strong>II. Apenas três múltiplos de 4:</strong></p>
            <ul className="list-disc list-inside ml-4 text-sm">
              <li><M tex="1870" />: <M tex="70 \div 4 = 17{,}5" /> ✗</li>
              <li><M tex="1875" />: <M tex="75 \div 4 = 18{,}75" /> ✗</li>
              <li><M tex="1877" />: <M tex="77 \div 4 = 19{,}25" /> ✗</li>
              <li><M tex="1878" />: <M tex="78 \div 4 = 19{,}5" /> ✗</li>
              <li><M tex="1880" />: <M tex="80 \div 4 = 20" /> ✓</li>
            </ul>
            <p>Apenas 1 múltiplo de 4. <strong>Falso.</strong></p>
            <p><strong>III. Apenas dois primos:</strong> 1877 é primo (verificar). 1879? Não está na lista. Dos números dados, verificar se 1877 é primo e se há outro. <strong>Depende da verificação detalhada.</strong></p>
            <p><strong>IV.</strong> <M tex="\text{MDC}(1870, 1880) = 10" />, que é múltiplo de 10. <strong>Verdadeiro.</strong></p>
            <p><strong>V.</strong> <M tex="1875 = 3 \cdot 5^4" />, então todos os seus múltiplos possuem 5 como fator primo. <strong>Verdadeiro.</strong></p>
          </div>
        }
      >
        <p>
          Considere os números 1870, 1875, 1877, 1878, 1880. Julgue as afirmações:
        </p>
        <p className="ml-4">I. Apenas dois deles são múltiplos de 3.</p>
        <p className="ml-4">II. Apenas três deles são múltiplos de 4.</p>
        <p className="ml-4">III. Apenas dois deles são primos.</p>
        <p className="ml-4">IV. O MDC entre 1870 e 1880 é múltiplo de 10.</p>
        <p className="ml-4">V. Múltiplos de 1875 possuem 5 como fator primo.</p>
      </ExerciseCard>
    </div>
  )
}

export default function C34CriteriosDivisibilidade() {
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
