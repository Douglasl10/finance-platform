"use client";

import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/transaction";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";


interface TransactionTableProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
}

export function TransactionTable({transactions, onDelete}: TransactionTableProps) {
    const formatDate = (dataString: string) =>  {
        return new Date(dataString).toLocaleDateString("pt-BR")
    }

    const formatCurrency = (amount: number) => {
        return `R$ ${amount.toLocaleString("pt-BR", {minimumFractionDigits: 2})}`
    }

    return (
        <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Transações Recentes</CardTitle>
        <CardDescription className="text-gray-400">
          Histórico completo das suas movimentações financeiras
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Nenhuma transação encontrada para o período selecionado
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Tipo</TableHead>
                  <TableHead className="text-gray-400">Categoria</TableHead>
                  <TableHead className="text-gray-400">Descrição</TableHead>
                  <TableHead className="text-gray-400">Data</TableHead>
                  <TableHead className="text-gray-400 text-right">Valor</TableHead>
                  <TableHead className="text-gray-400 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="border-gray-800">
                    <TableCell>
                      <Badge
                        variant={transaction.type === "income" ? "default" : "destructive"}
                        className={`flex items-center gap-1 w-fit ${
                          transaction.type === "income" ? "bg-green-600" : ""
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {transaction.type === "income" ? "Receita" : "Despesa"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{transaction.category}</TableCell>
                    <TableCell className="text-gray-300">{transaction.description || "-"}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(transaction.date)}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${
                        transaction.type === "income" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(transaction.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
    )
}