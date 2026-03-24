"use client";

import { DadosCarteira } from '@/types/teacher';
import { formatarMoeda, formatarData } from '@/utils/formatters';
import { TrendingUp, DollarSign } from 'lucide-react';

interface TransactionHistoryProps {
  dadosCarteira: DadosCarteira;
}

export function TransactionHistory({ dadosCarteira }: TransactionHistoryProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Histórico de Transações
      </h3>
      <div className="space-y-4">
        {dadosCarteira.transacoes.map((transacao) => (
          <div
            key={transacao.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transacao.tipo === "ganho"
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {transacao.tipo === "ganho" ? (
                  <TrendingUp
                    className={`w-5 h-5 ${
                      transacao.tipo === "ganho"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                ) : (
                  <DollarSign className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {transacao.descricao}
                </p>
                <p className="text-sm text-gray-600">
                  {formatarData(transacao.data)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`font-semibold ${
                  transacao.tipo === "ganho"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transacao.tipo === "ganho" ? "+" : ""}
                {formatarMoeda(transacao.valor)}
              </p>
              <p
                className={`text-sm ${
                  transacao.status === "concluido"
                    ? "text-green-600"
                    : transacao.status === "pendente"
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {transacao.status === "concluido"
                  ? "Concluído"
                  : transacao.status === "pendente"
                  ? "Pendente"
                  : "Falhou"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}