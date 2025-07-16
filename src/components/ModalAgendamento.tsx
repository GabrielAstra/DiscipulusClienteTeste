"use client";
import { Professor } from "@/model/professor";
import { Check, CreditCard, X } from "lucide-react";
import { useState } from "react";

interface PropriedadesModalAgendamento {
  professor: Professor;
  aberto: boolean;
  aoFechar: () => void;
}

export default function ModalAgendamento({
  professor,
  aberto,
  aoFechar,
}: PropriedadesModalAgendamento) {
  const [passo, setPasso] = useState(1);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [duracao, setDuracao] = useState(60);
  const [observacoes, setObservacoes] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("credito");

  if (!aberto) return null;

  const obterDatasDisponiveis = () => {
    const datas = [];
    const hoje = new Date();
    const nomesDias = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];

    for (let i = 1; i <= 14; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      const nomeDia = nomesDias[data.getDay()];

      if (professor.disponibilidade.includes(nomeDia)) {
        datas.push({
          data: data.toISOString().split("T")[0],
          exibicao: data.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
          nomeDia,
        });
      }
    }
    return datas;
  };

  const obterHorariosDisponiveis = () => {
    const horarios = [];
    for (let hora = 8; hora <= 20; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horarioString = `${hora.toString().padStart(2, "0")}:${minuto
          .toString()
          .padStart(2, "0")}`;
        horarios.push(horarioString);
      }
    }
    return horarios;
  };

  const precoTotal = (professor.valorHora * duracao) / 60;

  const lidarComAgendar = () => {
    console.log("Agendamento:", {
      professor: professor.id,
      data: dataSelecionada,
      horario: horarioSelecionado,
      duracao,
      observacoes,
      metodoPagamento,
      precoTotal,
    });

    alert(
      "Aula agendada com sucesso! Você receberá uma confirmação por email."
    );
    aoFechar();
    setPasso(1);
  };

  const datasDisponiveis = obterDatasDisponiveis();
  const horariosDisponiveis = obterHorariosDisponiveis();

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={professor.avatar}
              alt={professor.nome}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Agendar Aula com {professor.nome}
              </h2>
              <p className="text-gray-600">R${professor.valorHora}/hora</p>
            </div>
          </div>
          <button
            onClick={aoFechar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                passo >= 1 ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  passo >= 1 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {passo > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="font-medium">Data e Hora</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div
              className={`flex items-center space-x-2 ${
                passo >= 2 ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  passo >= 2 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                {passo > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <span className="font-medium">Detalhes</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div
              className={`flex items-center space-x-2 ${
                passo >= 3 ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  passo >= 3 ? "bg-indigo-600 text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="font-medium">Pagamento</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {passo === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Escolha a Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {datasDisponiveis.map((opcaoData) => (
                    <button
                      key={opcaoData.data}
                      onClick={() => setDataSelecionada(opcaoData.data)}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        dataSelecionada === opcaoData.data
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-medium text-gray-900 capitalize">
                        {opcaoData.exibicao}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {dataSelecionada && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Escolha o Horário
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {horariosDisponiveis.map((horario) => (
                      <button
                        key={horario}
                        onClick={() => setHorarioSelecionado(horario)}
                        className={`p-3 rounded-lg border-2 text-center transition-colors ${
                          horarioSelecionado === horario
                            ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {horario}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {dataSelecionada && horarioSelecionado && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setPasso(2)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          )}

          {passo === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detalhes da Aula
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duração da Aula
                    </label>
                    <select
                      value={duracao}
                      onChange={(e) => setDuracao(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value={30}>
                        30 minutos - R${(professor.valorHora * 0.5).toFixed(2)}
                      </option>
                      <option value={60}>
                        1 hora - R${professor.valorHora}
                      </option>
                      <option value={90}>
                        1h 30min - R${(professor.valorHora * 1.5).toFixed(2)}
                      </option>
                      <option value={120}>
                        2 horas - R${(professor.valorHora * 2).toFixed(2)}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      placeholder="Descreva o que você gostaria de focar na aula..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Resumo do Agendamento
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Data:</span>{" "}
                      {new Date(dataSelecionada).toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Horário:</span>{" "}
                      {horarioSelecionado}
                    </p>
                    <p>
                      <span className="font-medium">Duração:</span> {duracao}{" "}
                      minutos
                    </p>
                    <p>
                      <span className="font-medium">Professor:</span>{" "}
                      {professor.nome}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 mt-2">
                      Total: R${precoTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setPasso(1)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={() => setPasso(3)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Continuar para Pagamento
                </button>
              </div>
            </div>
          )}

          {passo === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Pagamento
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Método de Pagamento
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="pagamento"
                          value="credito"
                          checked={metodoPagamento === "credito"}
                          onChange={(e) => setMetodoPagamento(e.target.value)}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            Cartão de Crédito
                          </div>
                          <div className="text-sm text-gray-600">
                            Pagamento seguro via cartão
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="pagamento"
                          value="pix"
                          checked={metodoPagamento === "pix"}
                          onChange={(e) => setMetodoPagamento(e.target.value)}
                          className="mr-3"
                        />
                        <div className="w-5 h-5 mr-3 bg-green-500 rounded"></div>
                        <div>
                          <div className="font-medium text-gray-900">PIX</div>
                          <div className="text-sm text-gray-600">
                            Pagamento instantâneo
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {metodoPagamento === "credito" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 gap-4">
                        <input
                          type="text"
                          placeholder="Número do cartão"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/AA"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Nome no cartão"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {metodoPagamento === "pix" && (
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-500">QR Code PIX</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Escaneie o QR Code com seu app do banco ou copie o
                        código PIX
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">
                      Total a pagar:
                    </span>
                    <span className="text-2xl font-bold text-indigo-600">
                      R${precoTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Pagamento seguro e protegido
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setPasso(2)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={lidarComAgendar}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Confirmar Agendamento</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
