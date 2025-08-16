"use client";

import { DadosCarteira } from '@/types/teacher';
import { formatarMoeda } from '@/utils/formatters';
import { DollarSign, TrendingUp, Calendar, Star } from 'lucide-react';

interface WalletOverviewProps {
  dadosCarteira: DadosCarteira;
  onSolicitarSaque: () => void;
}

export function WalletOverview({ dadosCarteira, onSolicitarSaque }: WalletOverviewProps) {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Saldo Disponível
              </p>
              <p className="text-2xl font-bold text-green-600">
                {formatarMoeda(dadosCarteira.saldo)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Ganhos Totais
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatarMoeda(dadosCarteira.ganhosTotal)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pagamentos Pendentes
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {formatarMoeda(dadosCarteira.pagamentosPendentes)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Este Mês
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatarMoeda(dadosCarteira.ganhosMensais)}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Sacar Dinheiro
          </h3>
          <button
            onClick={onSolicitarSaque}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Solicitar Saque
          </button>
        </div>
        <p className="text-gray-600">
          Você pode sacar seu saldo disponível a qualquer momento. Os
          saques são processados em até 2 dias úteis.
        </p>
      </div>
    </>
  );
}