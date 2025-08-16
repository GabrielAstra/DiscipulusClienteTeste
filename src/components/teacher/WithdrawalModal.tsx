"use client";

import { useState } from 'react';
import { DadosCarteira } from '@/types/teacher';
import { formatarMoeda } from '@/utils/formatters';
import { X } from 'lucide-react';

interface WithdrawalModalProps {
  mostrarModal: boolean;
  onClose: () => void;
  dadosCarteira: DadosCarteira;
  onConfirmarSaque: (valor: number, metodo: string) => void;
}

export function WithdrawalModal({ 
  mostrarModal, 
  onClose, 
  dadosCarteira, 
  onConfirmarSaque 
}: WithdrawalModalProps) {
  const [valorSaque, setValorSaque] = useState("");
  const [metodoSaque, setMetodoSaque] = useState("pix");

  const handleConfirmarSaque = () => {
    const valor = parseFloat(valorSaque);
    if (valor > 0 && valor <= dadosCarteira.saldo) {
      onConfirmarSaque(valor, metodoSaque);
      setValorSaque("");
      onClose();
    }
  };

  if (!mostrarModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Solicitar Saque
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Saque
            </label>
            <input
              type="number"
              value={valorSaque}
              onChange={(e) => setValorSaque(e.target.value)}
              placeholder="0,00"
              max={dadosCarteira.saldo}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-600 mt-1">
              Saldo disponível: {formatarMoeda(dadosCarteira.saldo)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Método de Saque
            </label>
            <select
              value={metodoSaque}
              onChange={(e) => setMetodoSaque(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="pix">PIX</option>
              <option value="banco">Transferência Bancária</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmarSaque}
              disabled={
                !valorSaque ||
                parseFloat(valorSaque) <= 0 ||
                parseFloat(valorSaque) > dadosCarteira.saldo
              }
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Saque
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}