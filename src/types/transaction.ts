export interface Transaction {
  id: string
  type: "income" | "expense"
  category: string
  amount: number
  description: string
  date: string
}

export interface FinancialSummary {
  income: number
  expenses: number
  balance: number
}