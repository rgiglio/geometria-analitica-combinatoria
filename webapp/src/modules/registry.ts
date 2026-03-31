import type { ComponentType } from 'react'

export interface ModuleMeta {
  id: string
  code: string
  title: string
  frente: string
  frenteLabel: string
  component: () => Promise<{ default: ComponentType }>
}

export const modules: ModuleMeta[] = [
  { id: 'a33', code: 'A33', title: 'Sistema Cartesiano e Distância entre Dois Pontos', frente: 'a', frenteLabel: 'Frente A — Geometria Analítica', component: () => import('./frente-a/a33-sistema-cartesiano') },
  { id: 'a34', code: 'A34', title: 'Ponto Médio, Baricentro e Alinhamento', frente: 'a', frenteLabel: 'Frente A — Geometria Analítica', component: () => import('./frente-a/a34-ponto-medio') },
  { id: 'a35', code: 'A35', title: 'Equação Geral e Equação Reduzida da Reta', frente: 'a', frenteLabel: 'Frente A — Geometria Analítica', component: () => import('./frente-a/a35-equacao-geral') },
  { id: 'a36', code: 'A36', title: 'Equação Fundamental, Segmentária e Paramétrica', frente: 'a', frenteLabel: 'Frente A — Geometria Analítica', component: () => import('./frente-a/a36-equacao-fundamental') },
  { id: 'a37', code: 'A37', title: 'Posições Relativas entre Retas', frente: 'a', frenteLabel: 'Frente A — Geometria Analítica', component: () => import('./frente-a/a37-posicoes-relativas') },
  { id: 'b35', code: 'B35', title: 'PA — Definição, Classificação e Termo Geral', frente: 'b', frenteLabel: 'Frente B — Progressão Aritmética', component: () => import('./frente-b/b35-pa-definicao') },
  { id: 'b36', code: 'B36', title: 'PA — Propriedades e Soma de Termos', frente: 'b', frenteLabel: 'Frente B — Progressão Aritmética', component: () => import('./frente-b/b36-pa-propriedades') },
  { id: 'c33', code: 'C33', title: 'Divisão Euclidiana', frente: 'c', frenteLabel: 'Frente C — Aritmética', component: () => import('./frente-c/c33-divisao-euclidiana') },
  { id: 'c34', code: 'C34', title: 'Critérios de Divisibilidade e Qtd. de Divisores', frente: 'c', frenteLabel: 'Frente C — Aritmética', component: () => import('./frente-c/c34-criterios-divisibilidade') },
  { id: 'c35', code: 'C35', title: 'Problemas de MMC e MDC', frente: 'c', frenteLabel: 'Frente C — Aritmética', component: () => import('./frente-c/c35-mmc-mdc') },
]

export const frentes = [
  { id: 'a', label: 'Frente A — Geometria Analítica', color: 'text-red-600' },
  { id: 'b', label: 'Frente B — Progressão Aritmética', color: 'text-blue-600' },
  { id: 'c', label: 'Frente C — Aritmética', color: 'text-green-600' },
]
