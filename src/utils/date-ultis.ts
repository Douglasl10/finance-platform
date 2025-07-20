import type { Transaction } from "@/types/transaction"

/**
 * Gera array de anos baseado em um intervalo
 * @param yearsBack - Quantos anos para trás
 * @param yearsForward - Quantos anos para frente
 * @param includeTransactionYears - Se deve incluir anos das transações existentes
 * @param existingTransactions - Array de transações existentes
 */
export function generateYearRange(
  yearsBack: number = 5,
  yearsForward: number = 5,
  includeTransactionYears: boolean = true,
  existingTransactions: Transaction[] = []
): string[] {
  const currentYear = new Date().getFullYear()
  const startYear = currentYear - yearsBack
  const endYear = currentYear + yearsForward
  
  // Anos do intervalo
  const rangeYears = new Set<number>()
  for (let year = startYear; year <= endYear; year++) {
    rangeYears.add(year)
  }
  
  // Adicionar anos das transações existentes (se solicitado)
  if (includeTransactionYears && existingTransactions.length > 0) {
    existingTransactions.forEach(transaction => {
      const transactionYear = new Date(transaction.date).getFullYear()
      rangeYears.add(transactionYear)
    })
  }
  
  // Converter para array de strings e ordenar (mais recente primeiro)
  return Array.from(rangeYears)
    .sort((a, b) => b - a)
    .map(year => year.toString())
}

/**
 * Lista de meses para filtros
 */
export const MONTHS = [
  { value: "all", label: "Todos os meses" },
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
] as const

/**
 * Formata valor monetário para exibição
 */
export function formatCurrency(amount: number): string {
  return `R$ ${amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
}

/**
 * Formata data para exibição
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR")
}

/**
 * Gera ID único baseado em timestamp
 */
export function generateId(): string {
  return Date.now().toString()
}