"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import type { Transaction } from "@/types/transaction"

interface FinancialChartsProps {
  transactions: Transaction[]
}

// Cores do tema
const COLORS = {
    income: "#10b981",
  expense: "#ef4444",  
  categories: [
    "#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", 
    "#ec4899", "#06b6d4", "#84cc16", "#f97316"
  ]
}

export function FinancialCharts({ transactions }: FinancialChartsProps) {
  // useMemo otimiza cálculos pesados, recalcula apenas quando transactions mudam
  const monthlyData = useMemo(() => {
    const monthlyMap = new Map()

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { month: monthKey, income: 0, expense: 0 })
      }

      const monthData = monthlyMap.get(monthKey)
      if (transaction.type === "income") {
        monthData.income += transaction.amount
      } else {
        monthData.expense += transaction.amount
      }
    })

    return Array.from(monthlyMap.values()).sort((a, b) => a.month.localeCompare(b.month))
  }, [transactions])

  // Dados para gráfico de pizza (apenas despesas)
  const expensesByCategory = useMemo(() => {
    const categoryMap = new Map()

    transactions
      .filter(t => t.type === "expense")
      .forEach((transaction) => {
        if (!categoryMap.has(transaction.category)) {
          categoryMap.set(transaction.category, 0)
        }
        categoryMap.set(transaction.category, categoryMap.get(transaction.category) + transaction.amount)
      })

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }, [transactions])

  // Função para formatar mês
  const formatMonth = (monthKey: string) => {
    const [year, month] = monthKey.split("-")
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfico de Barras - Receitas vs Despesas */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Receitas vs Despesas</CardTitle>
          <CardDescription className="text-gray-400">
            Comparação mensal das suas movimentações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis 
                  dataKey="month" 
                  tickFormatter={formatMonth}
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "6px",
                    color: "#ffffff"
                  }}
                />
                <Bar dataKey="income" fill={COLORS.income} name="Receitas" />
                <Bar dataKey="expense" fill={COLORS.expense} name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Pizza - Despesas por Categoria */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Despesas por Categoria</CardTitle>
          <CardDescription className="text-gray-400">
            Distribuição dos seus gastos por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="amount"
                  nameKey="category"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.categories[index % COLORS.categories.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                          <p className="text-white font-medium">{data.category}</p>
                          <p className="text-green-400">
                            R$ {data.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}