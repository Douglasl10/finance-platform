"use client"

import { useState, useMemo } from "react"
import { Plus, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TransactionForm } from "@/components/transaction-form"
import { TransactionTable } from "@/components/transaction-table"
import { FinancialCharts } from "@/components/financial-charts"
import type { Transaction, FinancialSummary } from "@/types/transaction"
import { generateYearRange, MONTHS, formatCurrency, generateId} from "@/utils/date-ultis"

export default function FinancialDashboard() {
  // Estado principal: lista de transações com dados de exemplo
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "income",
      category: "Salário",
      amount: 5000,
      description: "Salário mensal",
      date: "2024-01-15",
    },
    {
      id: "2",
      type: "expense",
      category: "Alimentação",
      amount: 800,
      description: "Supermercado",
      date: "2024-01-10",
    },
    {
      id: "3",
      type: "expense",
      category: "Transporte",
      amount: 300,
      description: "Combustível",
      date: "2024-01-08",
    },
    {
      id: "4",
      type: "income",
      category: "Freelance",
      amount: 1200,
      description: "Projeto web",
      date: "2024-01-05",
    },
    {
      id: "5",
      type: "expense",
      category: "Moradia",
      amount: 1500,
      description: "Aluguel",
      date: "2023-12-01",
    },
    {
      id: "6",
      type: "income",
      category: "Investimentos",
      amount: 2000,
      description: "Dividendos",
      date: "2023-11-15",
    },
    {
      id: "7",
      type: "expense",
      category: "Saúde",
      amount: 400,
      description: "Consulta médica",
      date: "2022-06-20",
    },
    {
      id: "8",
      type: "income",
      category: "Bonificação",
      amount: 3000,
      description: "Bônus anual",
      date: "2021-12-31",
    },
  ])

  // Estados para filtros
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [showForm, setShowForm] = useState(false)

  // Função para adicionar nova transação
  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
    }
    setTransactions(prev => [newTransaction, ...prev])
    setShowForm(false)
  }

  // Função para deletar transação
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  // Anos disponíveis (5 para trás, 5 para frente + anos das transações)
  const years = useMemo(() => {
    return generateYearRange(5, 5, true, transactions)
  }, [transactions])

  // Transações filtradas por ano e mês
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date)
      const transactionYear = transactionDate.getFullYear().toString()
      const transactionMonth = (transactionDate.getMonth() + 1).toString()

      // Filtro por ano
      if (transactionYear !== selectedYear) return false
      
      // Filtro por mês (se não for "all")
      if (selectedMonth !== "all" && transactionMonth !== selectedMonth) return false

      return true
    })
  }, [transactions, selectedYear, selectedMonth])

  // Resumo financeiro calculado
  const summary: FinancialSummary = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = filteredTransactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0)

    return {
      income,
      expenses,
      balance: income - expenses,
    }
  }, [filteredTransactions])

  
  const isCurrentYear = (year: string): boolean => {
    return year === new Date().getFullYear().toString()
  }

  return (
    <div className="min-h-screen bg-black text-white hove">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              <span className="text-white">Dev</span> Finance
            </h1>
            <p className="text-gray-400 mt-2">Controle suas finanças de forma inteligente</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)} 
            className="bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>

        {/* Filtros */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="w-5 h-5 text-green-500" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            {/* Filtro de Ano */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white hover:bg-gray-750 transition-colors">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {years.map((year) => (
                    <SelectItem 
                      key={year} 
                      value={year} 
                      className={`text-white hover:bg-gray-700 transition-colors ${
                        isCurrentYear(year) ? 'bg-green-900/20 text-green-400' : ''
                      }`}
                    >
                      {year} {isCurrentYear(year) && '(Atual)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro de Mês */}
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white hover:bg-gray-750 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {MONTHS.map((month) => (
                  <SelectItem 
                    key={month.value} 
                    value={month.value} 
                    className="text-white hover:bg-gray-700 transition-colors"
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Indicador de filtros ativos */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>
                {filteredTransactions.length} transação(ões) encontrada(s)
              </span>
              {selectedMonth !== "all" && (
                <Badge variant="outline" className="text-green-400 border-green-400">
                  {MONTHS.find(m => m.value === selectedMonth)?.label}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card de Receitas */}
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-850 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {formatCurrency(summary.income)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {filteredTransactions.filter(t => t.type === "income").length} transação(ões)
              </p>
            </CardContent>
          </Card>

          {/* Card de Despesas */}
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-850 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Despesas</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {formatCurrency(summary.expenses)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {filteredTransactions.filter(t => t.type === "expense").length} transação(ões)
              </p>
            </CardContent>
          </Card>

          {/* Card de Saldo */}
          <Card className="bg-gray-900 border-gray-800 hover:bg-gray-850 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Saldo</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${summary.balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                {formatCurrency(summary.balance)}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant={summary.balance >= 0 ? "default" : "destructive"}
                  className={summary.balance >= 0 ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {summary.balance >= 0 ? "Positivo" : "Negativo"}
                </Badge>
                <span className="text-xs text-gray-500">
                  {((summary.balance / (summary.income || 1)) * 100).toFixed(1)}% do total
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <FinancialCharts transactions={filteredTransactions} />

        {/* Tabela de Transações */}
        <TransactionTable 
          transactions={filteredTransactions} 
          onDelete={deleteTransaction} 
        />

        {/* Modal do Formulário */}
        {showForm && (
          <TransactionForm 
            onSubmit={addTransaction} 
            onClose={() => setShowForm(false)} 
          />
        )}
      </div>
    </div>
  )
}