"use client"

import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Transaction } from "@/types/transaction"

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void
  onClose: () => void
}

const incomeCategories = ["Salário", "Freelance", "Investimentos", "Vendas", "Outros"]
const expenseCategories = [
  "Alimentação", "Transporte", "Moradia", "Saúde", 
  "Educação", "Entretenimento", "Compras", "Outros"
]

export function TransactionForm({ onSubmit, onClose }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    type: "" as "income" | "expense" | "",
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Limpar erros anteriores
    setErrors([])
    const newErrors: string[] = []

    // Validações
    if (!formData.type) {
      newErrors.push("Selecione o tipo da transação")
    }
    
    if (!formData.category) {
      newErrors.push("Selecione uma categoria")
    }
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.push("Insira um valor válido maior que zero")
    }
    
    if (!formData.date) {
      newErrors.push("Selecione uma data")
    }

    // Se houver erros, mostrar e parar
    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Criar transação
    const transaction = {
      type: formData.type as "income" | "expense",
      category: formData.category,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
    }

    console.log("Enviando transação:", transaction) // Debug

    // Enviar dados
    onSubmit(transaction)
  }

  const categories = formData.type === "income" ? incomeCategories : expenseCategories

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Nova Transação</CardTitle>
              <CardDescription className="text-gray-400">
                Adicione uma nova receita ou despesa
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Mostrar erros se houver */}
          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-md">
              <ul className="text-red-400 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Tipo */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-white">Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "income" | "expense") =>
                  setFormData(prev => ({ ...prev, type: value, category: "" }))
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="income" className="text-white hover:bg-gray-700">
                    💰 Receita
                  </SelectItem>
                  <SelectItem value="expense" className="text-white hover:bg-gray-700">
                    💸 Despesa
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Campo Categoria */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                disabled={!formData.type}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campo Valor */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Valor (R$) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Campo Data */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Campo Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Descrição</Label>
              <Input
                id="description"
                placeholder="Descrição opcional..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            {/* Botões */}
            <div className="flex gap-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Adicionar Transação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}