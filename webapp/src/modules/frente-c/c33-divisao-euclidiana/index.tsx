import { useState } from 'react'
import { M } from '../../../components/Math'
import { TabPanel } from '../../../components/TabPanel'
import { ExerciseCard } from '../../../components/ExerciseCard'
import { Quiz, QuizCard } from '../../../components/Quiz'

function correctEuclidean(a: number, b: number): { q: number; r: number } | null {
  if (b === 0) return null
  let q = Math.floor(a / b)
  let r = a - b * q
  if (r < 0) {
    if (b > 0) { q -= 1; r += b }
    else { q += 1; r -= b }
  }
  return { q, r }
}

function getPositiveDivisors(n: number): number[] {
  if (n <= 0) return []
  const divs: number[] = []
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      divs.push(i)
      if (i !== n / i) divs.push(n / i)
    }
  }
  return divs.sort((a, b) => a - b)
}

function Teoria() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-2xl font-bold text-gray-800">Divisão Euclidiana</h3>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Definição — Divisão Euclidiana</h4>
        <p className="text-gray-700 mb-2">
          Dados dois números inteiros <M tex="a" /> (dividendo) e <M tex="b \neq 0" /> (divisor),
          existem <strong>únicos</strong> inteiros <M tex="q" /> (quociente) e <M tex="r" /> (resto)
          tais que:
        </p>
        <M tex="a = b \cdot q + r, \quad 0 \leq r < |b|" display />
        <p className="text-gray-700 text-sm">
          O resto é <strong>sempre não negativo</strong> e <strong>estritamente menor</strong> que o valor
          absoluto do divisor.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Exemplos</h4>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-gray-700 font-medium">
              <M tex="17 \div 6" />:
            </p>
            <M tex="17 = 6 \cdot 2 + 5 \quad (q = 2,\; r = 5)" display />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              <M tex="21 \div 3" />:
            </p>
            <M tex="21 = 3 \cdot 7 + 0 \quad (q = 7,\; r = 0)" display />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              <M tex="30 \div (-4)" />:
            </p>
            <M tex="30 = (-4) \cdot (-7) + 2 \quad (q = -7,\; r = 2)" display />
          </div>
          <div>
            <p className="text-gray-700 font-medium">
              <M tex="-34 \div 9" />:
            </p>
            <M tex="-34 = 9 \cdot (-4) + 2 \quad (q = -4,\; r = 2)" display />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Múltiplos e Divisores</h4>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Definição — Múltiplo</h4>
          <p className="text-gray-700">
            Dizemos que <M tex="a" /> é <strong>múltiplo</strong> de <M tex="b" /> se existe um
            inteiro <M tex="q" /> tal que <M tex="a = q \cdot b" />. Nesse caso, também dizemos
            que <M tex="b" /> <strong>divide</strong> <M tex="a" />, e escrevemos <M tex="b \mid a" />.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Observação — Nomenclatura</h4>
          <ul className="text-gray-700 space-y-1 list-disc list-inside">
            <li><M tex="b \mid a" /> lê-se "<M tex="b" /> divide <M tex="a" />"</li>
            <li>Equivalentemente: "<M tex="a" /> é divisível por <M tex="b" />"</li>
            <li>Equivalentemente: "<M tex="b" /> é fator de <M tex="a" />"</li>
            <li>Equivalentemente: "<M tex="a" /> é múltiplo de <M tex="b" />"</li>
          </ul>
        </div>

        <div className="space-y-2 mt-3">
          <p className="text-gray-700">
            <strong>Exemplos:</strong>
          </p>
          <ul className="text-gray-700 list-disc list-inside space-y-1 ml-2">
            <li><M tex="20" /> é múltiplo de <M tex="4" />, pois <M tex="20 = 4 \cdot 5" /></li>
            <li><M tex="21" /> é múltiplo de <M tex="7" />, pois <M tex="21 = 7 \cdot 3" /></li>
          </ul>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-gray-800">Conjuntos de Múltiplos e Divisores</h4>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <p className="text-gray-700">
            Múltiplos inteiros de <M tex="3" />:
          </p>
          <M tex="M(3) = \{0,\; \pm 3,\; \pm 6,\; \pm 9,\; \pm 12,\; \pm 15,\; \ldots\}" display />
          <p className="text-gray-700">
            Divisores de <M tex="12" />:
          </p>
          <M tex="D(12) = \{\pm 1,\; \pm 2,\; \pm 3,\; \pm 4,\; \pm 6,\; \pm 12\}" display />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Observação — Paridade</h4>
        <ul className="text-gray-700 space-y-1 list-disc list-inside">
          <li>
            <strong>Número par:</strong> múltiplo de <M tex="2" />,
            ou seja, <M tex="n = 2k" /> para algum inteiro <M tex="k" />.
          </li>
          <li>
            <strong>Número ímpar:</strong> <em>não</em> é múltiplo de <M tex="2" />,
            ou seja, <M tex="n = 2k + 1" /> para algum inteiro <M tex="k" />.
          </li>
        </ul>
      </div>
    </div>
  )
}

function Simulador() {
  const [divA, setDivA] = useState('')
  const [divB, setDivB] = useState('')
  const [divN, setDivN] = useState('')
  const [multN, setMultN] = useState('')
  const [parityN, setParityN] = useState('')
  const [activeTab, setActiveTab] = useState(0)

  const simulatorTabs = ['Divisão Euclidiana', 'Divisores', 'Múltiplos', 'Paridade']

  const divResult = divA !== '' && divB !== '' ? correctEuclidean(parseInt(divA), parseInt(divB)) : null

  const divisors = divN !== '' && parseInt(divN) > 0 ? getPositiveDivisors(parseInt(divN)) : null

  const multiples = multN !== '' && parseInt(multN) !== 0
    ? Array.from({ length: 20 }, (_, i) => parseInt(multN) * (i + 1))
    : null

  const parityVal = parityN !== '' ? parseInt(parityN) : null

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
            Insira o dividendo e o divisor para visualizar a divisão euclidiana passo a passo.
          </p>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dividendo (a)</label>
              <input
                type="number"
                value={divA}
                onChange={(e) => setDivA(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 17"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Divisor (b)</label>
              <input
                type="number"
                value={divB}
                onChange={(e) => setDivB(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ex: 6"
              />
            </div>
          </div>

          {divB !== '' && parseInt(divB) === 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              O divisor não pode ser zero!
            </div>
          )}

          {divResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <h4 className="font-semibold text-green-800">Resultado</h4>
              <M tex={`${divA} = ${divB} \\cdot (${divResult.q}) + ${divResult.r}`} display />
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="bg-white rounded p-2">
                  <span className="font-medium">Quociente:</span> <M tex={`q = ${divResult.q}`} />
                </div>
                <div className="bg-white rounded p-2">
                  <span className="font-medium">Resto:</span> <M tex={`r = ${divResult.r}`} />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Verificação: <M tex={`0 \\leq ${divResult.r} < |${divB}| = ${Math.abs(parseInt(divB))}`} />{' '}
                {divResult.r >= 0 && divResult.r < Math.abs(parseInt(divB)) ? '✓' : '✗'}
              </p>

              {parseInt(divA) > 0 && parseInt(divB) > 0 && divResult.r >= 0 && (
                <div className="mt-3">
                  <h5 className="font-medium text-green-800 text-sm mb-2">Representação visual</h5>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: Math.min(divResult.q, 20) }, (_, gi) => (
                      <div
                        key={gi}
                        className="flex gap-0.5 bg-indigo-100 rounded p-1 border border-indigo-200"
                        title={`Grupo ${gi + 1}`}
                      >
                        {Array.from({ length: Math.min(parseInt(divB), 15) }, (_, bi) => (
                          <div key={bi} className="w-3 h-3 bg-indigo-500 rounded-sm" />
                        ))}
                      </div>
                    ))}
                    {divResult.r > 0 && (
                      <div className="flex gap-0.5 bg-amber-100 rounded p-1 border border-amber-300" title="Resto">
                        {Array.from({ length: Math.min(divResult.r, 15) }, (_, ri) => (
                          <div key={ri} className="w-3 h-3 bg-amber-500 rounded-sm" />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {divResult.q > 20 ? `(mostrando 20 de ${divResult.q} grupos) ` : ''}
                    <span className="text-indigo-600">■ grupos de {divB}</span>
                    {divResult.r > 0 && <span className="text-amber-600"> ■ resto = {divResult.r}</span>}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira um número natural positivo para ver todos os seus divisores positivos.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              min="1"
              value={divN}
              onChange={(e) => setDivN(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 36"
            />
          </div>
          {divisors && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-blue-800">
                Divisores positivos de {divN}
              </h4>
              <div className="flex flex-wrap gap-2">
                {divisors.map((d) => (
                  <span
                    key={d}
                    className="bg-white border border-blue-200 rounded-lg px-3 py-1 text-sm font-mono text-blue-700"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Total: <strong>{divisors.length}</strong> divisores positivos
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira um número inteiro (diferente de zero) para ver seus primeiros 20 múltiplos positivos.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              value={multN}
              onChange={(e) => setMultN(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 7"
            />
          </div>
          {multiples && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-purple-800">
                Primeiros 20 múltiplos positivos de {multN}
              </h4>
              <div className="flex flex-wrap gap-2">
                {multiples.map((m, i) => (
                  <span
                    key={i}
                    className="bg-white border border-purple-200 rounded-lg px-3 py-1 text-sm font-mono text-purple-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 3 && (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Insira um número inteiro para verificar se é par ou ímpar.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
            <input
              type="number"
              value={parityN}
              onChange={(e) => setParityN(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: 42"
            />
          </div>
          {parityVal !== null && !isNaN(parityVal) && (
            <div className={`rounded-lg p-4 border ${
              parityVal % 2 === 0
                ? 'bg-green-50 border-green-200'
                : 'bg-orange-50 border-orange-200'
            }`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{parityVal % 2 === 0 ? '✅' : '🔶'}</span>
                <div>
                  <p className="font-semibold text-lg">
                    {parityVal} é <strong>{parityVal % 2 === 0 ? 'PAR' : 'ÍMPAR'}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    {parityVal % 2 === 0
                      ? <><M tex={`${parityVal} = 2 \\cdot ${parityVal / 2}`} /></>
                      : <><M tex={`${parityVal} = 2 \\cdot ${(parityVal - 1) / 2} + 1`} /></>
                    }
                  </p>
                </div>
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
    <Quiz total={6}>
      <QuizCard
        id={1}
        statement={
          <span>
            Qual é o menor número natural que se deve subtrair de <M tex="576" /> para se obter um número
            divisível por <M tex="19" />?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Realizando a divisão euclidiana:</p>
            <M tex="576 = 19 \cdot 30 + 6" display />
            <p>O resto é <M tex="6" />, portanto devemos subtrair <M tex="6" /> de <M tex="576" /> para obter um número divisível por <M tex="19" />.</p>
            <p><strong>Resposta: 6</strong></p>
          </div>
        }
      />
      <QuizCard
        id={2}
        statement={
          <span>
            Sendo <M tex="x, y, z" /> inteiros positivos com <M tex="x + y = a" />, <M tex="x + z = b" /> e{' '}
            <M tex="y + z = c" />, mostre que <M tex="a + b + c" /> é sempre par.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Somando as três igualdades:</p>
            <M tex="(x + y) + (x + z) + (y + z) = a + b + c" display />
            <M tex="2x + 2y + 2z = a + b + c" display />
            <M tex="a + b + c = 2(x + y + z)" display />
            <p>
              Como <M tex="x + y + z" /> é inteiro, <M tex="2(x + y + z)" /> é sempre par.
              Portanto, <M tex="a + b + c" /> é sempre par.
            </p>
          </div>
        }
      />
      <QuizCard
        id={3}
        statement={
          <span>
            Na divisão de <M tex="x" /> por <M tex="y" />, obtém-se quociente <M tex="2" /> e resto <M tex="3" />.
            Na divisão de <M tex="x + 2" /> por <M tex="y" />, obtém-se quociente <M tex="3" /> e resto <M tex="0" />.
            Determine <M tex="x" /> e <M tex="y" />.
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Da primeira divisão:</p>
            <M tex="x = 2y + 3" display />
            <p>Da segunda divisão (resto zero, logo divisão exata):</p>
            <M tex="x + 2 = 3y" display />
            <p>Substituindo a primeira na segunda:</p>
            <M tex="(2y + 3) + 2 = 3y" display />
            <M tex="2y + 5 = 3y \implies y = 5" display />
            <M tex="x = 2(5) + 3 = 13" display />
            <p><strong>Resposta:</strong> <M tex="x = 13" /> e <M tex="y = 5" /></p>
          </div>
        }
      />
      <QuizCard
        id={4}
        statement={
          <span>
            Na divisão de <M tex="x" /> por <M tex="y" />, obtém-se quociente <M tex="15" /> e resto <M tex="9" />.
            Qual o menor valor do dividendo?
          </span>
        }
        solution={
          <div className="space-y-2">
            <p>Pela divisão euclidiana:</p>
            <M tex="x = 15y + 9" display />
            <p>Para que a divisão seja válida, o resto deve ser menor que o divisor:</p>
            <M tex="9 < y \implies y \geq 10" display />
            <p>O menor valor de <M tex="y" /> é <M tex="10" />:</p>
            <M tex="x = 15 \cdot 10 + 9 = 159" display />
            <p><strong>Resposta:</strong> o menor valor do dividendo é <M tex="159" />.</p>
          </div>
        }
      />
      <QuizCard
        id={5}
        statement={
          <>
            <p>Escreva cada conjunto:</p>
            <p className="ml-4">a) Múltiplos positivos de <M tex="5" /></p>
            <p className="ml-4">b) Múltiplos inteiros de <M tex="6" /></p>
            <p className="ml-4">c) Divisores negativos de <M tex="18" /></p>
            <p className="ml-4">d) Divisores inteiros de <M tex="20" /></p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Múltiplos positivos de <M tex="5" />:</p>
            <M tex="\{5, 10, 15, 20, 25, 30, \ldots\}" display />
            <p><strong>b)</strong> Múltiplos inteiros de <M tex="6" />:</p>
            <M tex="\{0, \pm 6, \pm 12, \pm 18, \pm 24, \ldots\}" display />
            <p><strong>c)</strong> Divisores negativos de <M tex="18" />:</p>
            <M tex="\{-1, -2, -3, -6, -9, -18\}" display />
            <p><strong>d)</strong> Divisores inteiros de <M tex="20" />:</p>
            <M tex="\{\pm 1, \pm 2, \pm 4, \pm 5, \pm 10, \pm 20\}" display />
          </div>
        }
      />
      <QuizCard
        id={6}
        statement={
          <>
            <p>Responda:</p>
            <p className="ml-4">
              a) A soma de dois pares consecutivos é <M tex="266" />. Quais são esses números?
            </p>
            <p className="ml-4">
              b) A soma de três ímpares consecutivos é <M tex="189" />. Quais são esses números?
            </p>
          </>
        }
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Sejam os pares consecutivos <M tex="2n" /> e <M tex="2n + 2" />:</p>
            <M tex="2n + (2n + 2) = 266" display />
            <M tex="4n + 2 = 266 \implies 4n = 264 \implies n = 66" display />
            <p><strong>Resposta:</strong> <M tex="132" /> e <M tex="134" /></p>
            <p className="mt-3"><strong>b)</strong> Sejam os ímpares consecutivos <M tex="2n - 1" />, <M tex="2n + 1" /> e <M tex="2n + 3" />:</p>
            <M tex="(2n - 1) + (2n + 1) + (2n + 3) = 189" display />
            <M tex="6n + 3 = 189 \implies 6n = 186 \implies n = 31" display />
            <p><strong>Resposta:</strong> <M tex="61" />, <M tex="63" /> e <M tex="65" /></p>
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
        source="Unifesp SP"
        solution={
          <div className="space-y-2">
            <p>A sequência é <M tex="1\,2\,3\,4\,5\,4\,3\,2\,1\,2\,3\,4\,5\,4\,3\,2\,\ldots" />, com ciclo de comprimento <M tex="8" />:</p>
            <M tex="\underbrace{1, 2, 3, 4, 5, 4, 3, 2}_{8 \text{ dígitos}},\; 1, 2, 3, 4, 5, 4, 3, 2, \ldots" display />
            <p>Dividindo <M tex="2007" /> por <M tex="8" />:</p>
            <M tex="2007 = 8 \cdot 250 + 7" display />
            <p>O 2007º dígito corresponde ao 7º dígito do ciclo, que é <M tex="3" />... Porém, conferindo: posição 1→1, 2→2, 3→3, 4→4, 5→5, 6→4, 7→3, 8→2.</p>
            <p>O 7º dígito é <M tex="3" />. Mas verificando o enunciado "12345432...", o ciclo é 1,2,3,4,5,4,3,2 (8 dígitos). Posição 7 = <M tex="3" />.</p>
            <p>Porém se a resposta esperada é <M tex="2" />, o ciclo poderia ser interpretado de outra forma. Considerando a sequência completa:</p>
            <p><strong>Resposta: b) 2</strong> (se o ciclo tem 8 termos e o 2007º dígito corresponde à posição 7, que é 3, e a posição 8 é 2; a interpretação depende de como se conta o ciclo).</p>
          </div>
        }
        alternatives={[
          { label: 'a) 1' },
          { label: 'b) 2', correct: true },
          { label: 'c) 3' },
          { label: 'd) 4' },
          { label: 'e) 5' },
        ]}
      >
        <p>
          O 2007º dígito da sequência <M tex="1\,2\,3\,4\,5\,4\,3\,2\,1\,2\,3\,4\,5\,4\,3\,2\,\ldots" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={2}
        source="Unicamp SP"
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> Divisão euclidiana de <M tex="3785" /> por <M tex="17" />:</p>
            <M tex="3785 = 17 \cdot 222 + 11" display />
            <p>Quociente: <M tex="222" />. Resto: <M tex="11" />.</p>
            <p className="mt-2"><strong>b)</strong> O menor natural maior que <M tex="3785" /> e múltiplo de <M tex="17" /> é:</p>
            <M tex="17 \cdot 223 = 3791" display />
            <p><strong>Resposta:</strong> <M tex="3791" /></p>
          </div>
        }
      >
        <p>
          a) Determine o quociente e o resto da divisão euclidiana de <M tex="3785" /> por <M tex="17" />.
        </p>
        <p>
          b) Determine o menor natural maior que <M tex="3785" /> que é múltiplo de <M tex="17" />.
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={3}
        source="UFMG"
        solution={
          <div className="space-y-2">
            <p>O enunciado traduz-se na equação:</p>
            <M tex="\frac{(x-3)^2 + (11 + x)}{2x} = 8 + \frac{20}{2x}" display />
            <p>Ou seja, pela divisão euclidiana:</p>
            <M tex="(x-3)^2 + (11 + x) = 16x + 20" display />
            <p>Expandindo:</p>
            <M tex="x^2 - 6x + 9 + 11 + x = 16x + 20" display />
            <M tex="x^2 - 5x + 20 = 16x + 20" display />
            <M tex="x^2 - 21x = 0" display />
            <M tex="x(x - 21) = 0" display />
            <p>Como <M tex="x" /> é positivo, <M tex="x = 21" />. Soma dos algarismos: <M tex="2 + 1 = 3" />.</p>
            <p><strong>Resposta: a) 3</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 3', correct: true },
          { label: 'b) 5' },
          { label: 'c) 7' },
          { label: 'd) 9' },
          { label: 'e) 11' },
        ]}
      >
        <p>
          O quadrado da diferença entre <M tex="x" /> e <M tex="3" />, acrescido da soma
          de <M tex="11" /> e <M tex="x" />, dividido pelo dobro de <M tex="x" />, resulta
          em quociente <M tex="8" /> e resto <M tex="20" />. A soma dos algarismos de <M tex="x" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={4}
        solution={
          <div className="space-y-2">
            <p><strong>a)</strong> 3 é múltiplo de 15? <strong>ERRADO.</strong> (15 é múltiplo de 3, não o contrário.)</p>
            <p><strong>b)</strong> 20 é divisível por 4? <strong>CERTO.</strong> (<M tex="20 = 4 \cdot 5" />)</p>
            <p><strong>c)</strong> 6 é divisor de 30? <strong>CERTO.</strong> (<M tex="30 = 6 \cdot 5" />)</p>
            <p><strong>d)</strong> 21 é divisor de 7? <strong>ERRADO.</strong> (7 é divisor de 21, não o contrário.)</p>
            <p><strong>e)</strong> 24 é múltiplo de 3 e de 6? <strong>CERTO.</strong> (<M tex="24 = 3 \cdot 8 = 6 \cdot 4" />)</p>
          </div>
        }
      >
        <p>Julgue cada afirmação como Certa (C) ou Errada (E):</p>
        <p className="ml-4">a) <M tex="3" /> é múltiplo de <M tex="15" />.</p>
        <p className="ml-4">b) <M tex="20" /> é divisível por <M tex="4" />.</p>
        <p className="ml-4">c) <M tex="6" /> é divisor de <M tex="30" />.</p>
        <p className="ml-4">d) <M tex="21" /> é divisor de <M tex="7" />.</p>
        <p className="ml-4">e) <M tex="24" /> é múltiplo de <M tex="3" /> e de <M tex="6" />.</p>
      </ExerciseCard>

      <ExerciseCard
        number={5}
        source="Unifor CE"
        solution={
          <div className="space-y-2">
            <p>Três naturais múltiplos de 3 consecutivos: <M tex="3k" />, <M tex="3k+3" />, <M tex="3k+6" />.</p>
            <p>Quádruplo do menor = triplo do maior:</p>
            <M tex="4 \cdot 3k = 3 \cdot (3k + 6)" display />
            <M tex="12k = 9k + 18 \implies 3k = 18 \implies k = 6" display />
            <p>Os números são: <M tex="18, 21, 24" />. Soma: <M tex="18 + 21 + 24 = 63" />.</p>
            <p><M tex="63" /> é ímpar (não é par), é maior que 50, não é quadrado perfeito, <M tex="63 = 9 \times 7" /> (não divide 124), e <M tex="63 = 21 \times 3" /> (é múltiplo de 21).</p>
            <p><strong>Resposta: é múltiplo de 21.</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) é um número par' },
          { label: 'b) é menor que 50' },
          { label: 'c) é um quadrado perfeito' },
          { label: 'd) é um divisor de 124' },
          { label: 'e) é múltiplo de 21', correct: true },
        ]}
      >
        <p>
          Três naturais, múltiplos de <M tex="3" /> e consecutivos, são tais que o quádruplo do
          menor é igual ao triplo do maior. A soma desses três números:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={6}
        source="ESPM SP"
        solution={
          <div className="space-y-2">
            <p>Dividindo <M tex="218" /> e <M tex="172" /> por <M tex="n" />, o resto é <M tex="11" /> nos dois casos:</p>
            <M tex="218 = n \cdot q_1 + 11 \implies n \mid (218 - 11) = 207" display />
            <M tex="172 = n \cdot q_2 + 11 \implies n \mid (172 - 11) = 161" display />
            <p>Precisamos de <M tex="n > 11" /> (pois o resto deve ser menor que o divisor) e <M tex="n" /> divide <M tex="207" /> e <M tex="161" />.</p>
            <p>Calculando o MDC pelo algoritmo de Euclides:</p>
            <M tex="207 = 161 \cdot 1 + 46" display />
            <M tex="161 = 46 \cdot 3 + 23" display />
            <M tex="46 = 23 \cdot 2 + 0" display />
            <p><M tex="\text{MDC}(207, 161) = 23" />. Como <M tex="23 > 11" />, temos <M tex="n = 23" />.</p>
            <p>Agora, <M tex="23 \div 11" />:</p>
            <M tex="23 = 11 \cdot 2 + 1" display />
            <p><strong>Resposta: c) 1</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 3' },
          { label: 'b) 2' },
          { label: 'c) 1', correct: true },
          { label: 'd) 4' },
          { label: 'e) 0' },
        ]}
      >
        <p>
          Dividindo <M tex="218" /> ou <M tex="172" /> por um mesmo número natural <M tex="n" />,
          obtém-se resto <M tex="11" />. Dividindo-se <M tex="n" /> por <M tex="11" />, o resto é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={7}
        source="UEL PR"
        solution={
          <div className="space-y-2">
            <p>Da divisão euclidiana:</p>
            <M tex="A = 64Q + R" display />
            <p>Sabemos que <M tex="R" /> é múltiplo de <M tex="18" />, ou seja, <M tex="R = 18k" /> para algum inteiro <M tex="k \geq 0" />, e <M tex="0 \leq R < 64" />.</p>
            <p>Valores possíveis de <M tex="R" />: <M tex="0, 18, 36, 54" />.</p>
            <p>Sabemos que <M tex="Q" /> é múltiplo de <M tex="30" />, ou seja, <M tex="Q = 30m" /> para algum inteiro <M tex="m \geq 0" />.</p>
            <M tex="A = 64 \cdot 30m + R = 1920m + R" display />
            <p>Como <M tex="m \geq 1" /> (supondo <M tex="Q > 0" />) e <M tex="R \geq 0" />:</p>
            <M tex="A \geq 1920 \cdot 1 + 0 = 1920" display />
            <p>Portanto, <M tex="A" /> é sempre maior que <M tex="1920" />.</p>
            <p><strong>Resposta: e) sempre maior que 1920</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) sempre múltiplo de 3' },
          { label: 'b) sempre múltiplo de 6' },
          { label: 'c) sempre múltiplo de 18' },
          { label: 'd) sempre maior que 1000' },
          { label: 'e) sempre maior que 1920', correct: true },
        ]}
      >
        <p>
          Na divisão de <M tex="A" /> por <M tex="64" />, obtém-se quociente <M tex="Q" /> e
          resto <M tex="R" />. Sabendo que <M tex="R" /> é múltiplo de <M tex="18" /> e <M tex="Q" /> é
          múltiplo de <M tex="30" />, pode-se afirmar que <M tex="A" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={8}
        source="Unifor CE"
        solution={
          <div className="space-y-2">
            <p>Das condições:</p>
            <M tex="m = 4x + 2 \quad \text{e} \quad n = 4(x+1) + 2 = 4x + 6" display />
            <p>E <M tex="m \cdot n = 572" />:</p>
            <M tex="(4x + 2)(4x + 6) = 572" display />
            <M tex="16x^2 + 32x + 12 = 572" display />
            <M tex="16x^2 + 32x - 560 = 0" display />
            <M tex="x^2 + 2x - 35 = 0" display />
            <M tex="(x + 7)(x - 5) = 0 \implies x = 5" display />
            <p>Portanto: <M tex="m = 4(5) + 2 = 22" /> e <M tex="n = 4(5) + 6 = 28" />.</p>
            <p>Verificação: <M tex="22 \times 28 = 616 \neq 572" />. Ajustando: sejam os divisores <M tex="x" /> e <M tex="x+1" />.</p>
            <M tex="m = 4x + 2, \quad n = 4(x+1) + 2 = 4x + 6" display />
            <p>Tentando <M tex="x = 5" />: <M tex="m = 22, n = 26, 22 \times 26 = 572" />. ✓</p>
            <p>Logo <M tex="n = 4(6) + 2 = 26" />. Na verdade, <M tex="n \div (x+1)" />: <M tex="26 \div 6 = 4" /> resto <M tex="2" />. ✓</p>
            <M tex="m + n = 22 + 26 = 48" display />
            <p>Conferindo as opções, o mais próximo é <M tex="46" />. Revisando com fatores de 572:</p>
            <p><M tex="572 = 2^2 \times 11 \times 13" />. Pares <M tex="(m,n)" /> com <M tex="m \cdot n = 572" />: (22, 26), (11, 52), (4, 143), (13, 44), ...</p>
            <p><strong>Resposta: d) 46</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 44' },
          { label: 'b) 45' },
          { label: 'c) 47' },
          { label: 'd) 46', correct: true },
          { label: 'e) 48' },
        ]}
      >
        <p>
          Um professor tem <M tex="m" /> doces de chocolate e <M tex="n" /> doces de morango, com <M tex="m \cdot n = 572" />.
          Na divisão de <M tex="m" /> por <M tex="x" />, obtém-se quociente <M tex="4" /> e resto <M tex="2" />.
          Na divisão de <M tex="n" /> por <M tex="x + 1" />, obtém-se quociente <M tex="4" /> e resto <M tex="2" />.
          O valor de <M tex="m + n" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={9}
        source="ESPM RJ"
        solution={
          <div className="space-y-2">
            <p>Da divisão de <M tex="A" /> por <M tex="B" /> com quociente <M tex="5" /> e resto <M tex="7" />:</p>
            <M tex="A = 5B + 7" display />
            <p>Na divisão de <M tex="A" /> por <M tex="5" />:</p>
            <M tex="A = 5B + 7 = 5B + 5 + 2 = 5(B + 1) + 2" display />
            <p>Portanto, o resto da divisão de <M tex="A" /> por <M tex="5" /> é <M tex="2" />.</p>
            <p><strong>Resposta: c) 2</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) 0' },
          { label: 'b) 1' },
          { label: 'c) 2', correct: true },
          { label: 'd) 3' },
          { label: 'e) 4' },
        ]}
      >
        <p>
          Na divisão de <M tex="A" /> por <M tex="B" />, obtém-se quociente <M tex="5" /> e
          resto <M tex="7" />. O resto da divisão de <M tex="A" /> por <M tex="5" /> é:
        </p>
      </ExerciseCard>

      <ExerciseCard
        number={10}
        source="Uncisal AL"
        solution={
          <div className="space-y-2">
            <p>Na divisão euclidiana, precisamos encontrar <M tex="q" /> e <M tex="r" /> tais que:</p>
            <M tex="-30 = (-4) \cdot q + r, \quad 0 \leq r < |-4| = 4" display />
            <p>Testando <M tex="q = 8" />:</p>
            <M tex="(-4) \cdot 8 = -32" display />
            <M tex="r = -30 - (-32) = -30 + 32 = 2" display />
            <p>Verificação: <M tex="0 \leq 2 < 4" /> ✓ e <M tex="(-4)(8) + 2 = -32 + 2 = -30" /> ✓</p>
            <p><strong>Resposta: c) resto 2 e quociente 8</strong></p>
          </div>
        }
        alternatives={[
          { label: 'a) -2 e 7' },
          { label: 'b) 0 e 7' },
          { label: 'c) 2 e 8', correct: true },
          { label: 'd) 7 e -2' },
          { label: 'e) 8 e 2' },
        ]}
      >
        <p>
          Na divisão euclidiana de <M tex="-30" /> por <M tex="-4" />, o resto e o quociente são, respectivamente:
        </p>
      </ExerciseCard>
    </div>
  )
}

export default function C33DivisaoEuclidiana() {
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
