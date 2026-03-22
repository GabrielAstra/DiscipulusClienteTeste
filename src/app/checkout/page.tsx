"use client";

import { DadosAgendamento } from "@/types/agendamento";
import { Check, CreditCard, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaginaPagamento() {
  const router = useRouter();
  const [dadosAgendamento, setDadosAgendamento] = useState<DadosAgendamento | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [metodoPagamento, setMetodoPagamento] = useState("credito");
  const [processando, setProcessando] = useState(false);

  useEffect(() => {
    const dados = sessionStorage.getItem("dadosAgendamento");
    if (dados) {
      setDadosAgendamento(JSON.parse(dados));
    } else {
     
      router.replace("/");
    }
    setCarregando(false);
  }, [router]);

  const lidarComPagamento = async () => {
    setProcessando(true);

    console.log("Processando pagamento:", {
      ...dadosAgendamento,
      metodoPagamento,
    });

    setTimeout(() => {
      setProcessando(false);
      sessionStorage.removeItem("dadosAgendamento");
      alert("Pagamento realizado com sucesso! Aula agendada.");
      router.push("/");
    }, 2000);
  };

  const aoVoltar = () => {
    router.push("/");
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!dadosAgendamento) return null;

  const dataFormatada = new Date(dadosAgendamento.dataSelecionada + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={aoVoltar}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Voltar</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finalizar Pagamento
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Método de Pagamento
              </h2>

              <div className="space-y-4 mb-6">
                <label className="flex items-center p-5 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="pagamento"
                    value="credito"
                    checked={metodoPagamento === "credito"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                    className="mr-4 w-5 h-5"
                  />
                  <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg">
                      Cartão de Crédito
                    </div>
                    <div className="text-sm text-gray-600">
                      Pagamento seguro via cartão
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-5 border-2 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                  <input
                    type="radio"
                    name="pagamento"
                    value="pix"
                    checked={metodoPagamento === "pix"}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                    className="mr-4 w-5 h-5"
                  />
                  <div className="w-6 h-6 mr-3 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">PIX</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg">PIX</div>
                    <div className="text-sm text-gray-600">
                      Pagamento instantâneo
                    </div>
                  </div>
                </label>
              </div>

              {metodoPagamento === "credito" && (
                <div className="space-y-4 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Informações do Cartão
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Número do Cartão
                      </label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Validade
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          maxLength={5}
                          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="000"
                          maxLength={3}
                          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome no Cartão
                      </label>
                      <input
                        type="text"
                        placeholder="Nome como está no cartão"
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {metodoPagamento === "pix" && (
                <div className="p-8 bg-gray-50 rounded-xl text-center border-2 border-gray-200">
                  <div className="w-64 h-64 bg-white rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg border-2 border-gray-300">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <span className="text-gray-500 text-sm font-semibold">
                        QR Code PIX
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 font-semibold mb-4">
                    Escaneie o QR Code com seu app do banco
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-xs text-gray-500 mb-2">Ou copie o código PIX:</p>
                    <code className="text-sm text-gray-700 font-mono break-all">
                      00020126580014br.gov.bcb.pix0136{dadosAgendamento.professorId}52040000530398654{dadosAgendamento.precoTotal.toFixed(2)}5802BR
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Resumo do Pedido
              </h2>

              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={dadosAgendamento.professorAvatar}
                  alt={dadosAgendamento.professorNome}
                  className="w-20 h-20 rounded-xl object-cover shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/avatar.png";
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {dadosAgendamento.professorNome}
                  </h3>
                  {dadosAgendamento.professorAvaliacao && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-base ${
                              i < Math.floor(dadosAgendamento.professorAvaliacao!.nota)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">
                        {dadosAgendamento.professorAvaliacao.nota.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-semibold text-gray-900 text-right capitalize">
                    {dataFormatada}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Horário:</span>
                  <span className="font-semibold text-gray-900">
                    {dadosAgendamento.horarioSelecionado}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-semibold text-gray-900">
                    {dadosAgendamento.duracao} minutos
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Valor/hora:</span>
                  <span className="font-semibold text-gray-900">
                    R${dadosAgendamento.professorValorHora.toFixed(2)}
                  </span>
                </div>
              </div>

              {dadosAgendamento.observacoes && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Observações:
                  </h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {dadosAgendamento.observacoes}
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-lg">
                      Total a pagar:
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      R${dadosAgendamento.precoTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  🔒 Pagamento seguro e protegido
                </p>
              </div>

              <button
                onClick={lidarComPagamento}
                disabled={processando}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {processando ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Confirmar Pagamento</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
