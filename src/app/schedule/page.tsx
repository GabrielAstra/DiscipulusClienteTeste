"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Star,
  MoreVertical,
  X,
  Edit,
  AlertTriangle,
} from "lucide-react";

interface AulaAgendada {
  id: string;
  nomeProfessor: string;
  avatarProfessor: string;
  habilidade: string;
  data: string;
  horario: string;
  duracao: number;
  status: "proxima" | "concluida" | "cancelada";
  linkReuniao?: string;
  preco: number;
}

export default function MinhaAgenda() {
  const [abaAtiva, setAbaAtiva] = useState<"proximas" | "concluidas">(
    "proximas"
  );
  const [menuAbertoId, setMenuAbertoId] = useState<string | null>(null);
  const [mostrarModalCancelar, setMostrarModalCancelar] = useState(false);
  const [aulaParaCancelar, setAulaParaCancelar] = useState<AulaAgendada | null>(
    null
  );

  const aulasAgendadas: AulaAgendada[] = [
    {
      id: "1",
      nomeProfessor: "Sarah Johnson",
      avatarProfessor:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
      habilidade: "Matemática",
      data: "2024-01-15",
      horario: "14:00",
      duracao: 60,
      status: "proxima",
      linkReuniao: "https://meet.google.com/abc-def-ghi",
      preco: 45,
    },
    {
      id: "2",
      nomeProfessor: "Michael Chen",
      avatarProfessor:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      habilidade: "Programação",
      data: "2024-01-12",
      horario: "16:30",
      duracao: 90,
      status: "concluida",
      preco: 82.5,
    },
  ];

  const aulasProximas = aulasAgendadas.filter((a) => a.status === "proxima");
  const aulasConcluidas = aulasAgendadas.filter(
    (a) => a.status === "concluida"
  );

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const obterCorStatus = (status: string) => {
    switch (status) {
      case "proxima":
        return "bg-blue-100 text-blue-800";
      case "concluida":
        return "bg-green-100 text-green-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const obterTextoStatus = (status: string) => {
    switch (status) {
      case "proxima":
        return "Agendada";
      case "concluida":
        return "Concluída";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const alternarMenu = (aulaId: string) => {
    setMenuAbertoId(menuAbertoId === aulaId ? null : aulaId);
  };

  const lidarComCancelarAula = (aula: AulaAgendada) => {
    setAulaParaCancelar(aula);
    setMostrarModalCancelar(true);
    setMenuAbertoId(null);
  };

  const confirmarCancelarAula = () => {
    if (aulaParaCancelar) {
      alert("Aula cancelada testando");
      setMostrarModalCancelar(false);
      setAulaParaCancelar(null);
    }
  };

  const lidarComReagendarAula = (aula: AulaAgendada) => {
    alert("Testando");
    setMenuAbertoId(null);
  };

  return (
    <div className="min-h-screen bg-transparent ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Minhas Aulas
          </h1>
          <p className="text-gray-600">
            Gerencie suas aulas agendadas e acompanhe seu progresso
          </p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setAbaAtiva("proximas")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${abaAtiva === "proximas"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Próximas Aulas ({aulasProximas.length})
              </button>
              <button
                onClick={() => setAbaAtiva("concluidas")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${abaAtiva === "concluidas"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                Aulas Concluídas ({aulasConcluidas.length})
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-4">
          {abaAtiva === "proximas" && (
            <>
              {aulasProximas.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma aula agendada
                  </h3>
                  <p className="text-gray-600">
                    Que tal agendar uma aula com um de nossos professores?
                  </p>
                </div>
              ) : (
                aulasProximas.map((aula) => (
                  <div
                    key={aula.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={aula.avatarProfessor}
                          alt={aula.nomeProfessor}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {aula.habilidade} com {aula.nomeProfessor}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatarData(aula.data)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {aula.horario} ({aula.duracao}min)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${obterCorStatus(
                            aula.status
                          )}`}
                        >
                          {obterTextoStatus(aula.status)}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => alternarMenu(aula.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {menuAbertoId === aula.id && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                              <button
                                onClick={() => lidarComReagendarAula(aula)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Edit className="w-4 h-4" />
                                <span>Reagendar</span>
                              </button>
                              <button
                                onClick={() => lidarComCancelarAula(aula)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                              >
                                <X className="w-4 h-4" />
                                <span>Cancelar Aula</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">
                        R${aula.preco.toFixed(2)}
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat</span>
                        </button>
                        {aula.linkReuniao && (
                          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Video className="w-4 h-4" />
                            <span>Entrar na Aula</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {abaAtiva === "concluidas" && (
            <>
              {aulasConcluidas.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nenhuma aula concluída ainda
                  </h3>
                  <p className="text-gray-600">
                    Suas aulas concluídas aparecerão aqui
                  </p>
                </div>
              ) : (
                aulasConcluidas.map((aula) => (
                  <div
                    key={aula.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={aula.avatarProfessor}
                          alt={aula.nomeProfessor}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {aula.habilidade} com {aula.nomeProfessor}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatarData(aula.data)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {aula.horario} ({aula.duracao}min)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${obterCorStatus(
                          aula.status
                        )}`}
                      >
                        {obterTextoStatus(aula.status)}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">
                        R${aula.preco.toFixed(2)}
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          <Star className="w-4 h-4" />
                          <span>Avaliar</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                          <Calendar className="w-4 h-4" />
                          <span>Agendar Novamente</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {mostrarModalCancelar && aulaParaCancelar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Cancelar Aula
                  </h3>
                  <p className="text-sm text-gray-600">
                    Esta ação não pode ser desfeita
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Tem certeza que deseja cancelar a aula de{" "}
                  <strong>{aulaParaCancelar.habilidade}</strong> com{" "}
                  <strong>{aulaParaCancelar.nomeProfessor}</strong> agendada
                  para <strong>{formatarData(aulaParaCancelar.data)}</strong> às{" "}
                  <strong>{aulaParaCancelar.horario}</strong>?
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    <strong>Política de Cancelamento:</strong> Cancelamentos
                    feitos com menos de 24 horas de antecedência podem estar
                    sujeitos a taxas. Verifique os termos com o professor.
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setMostrarModalCancelar(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Manter Aula
                </button>
                <button
                  onClick={confirmarCancelarAula}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancelar Aula
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {menuAbertoId && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setMenuAbertoId(null)}
        />
      )}
    </div>
  );
}
