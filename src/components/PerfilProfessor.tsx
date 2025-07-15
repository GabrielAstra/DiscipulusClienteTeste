"use client";
import { useState } from "react";
import {
  Star,
  Clock,
  Globe,
  CheckCircle,
  Calendar,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Usuario } from "@/model/usuario";
import { professores } from "@/model/mock/professor-mock";
import { redirect } from "next/navigation";
import ModalChat from "./ModalChat";
import ModalLogin from "./ModalLogin";
import ModalAgendamento from "./ModalAgendamento";
import { useUsuario } from "@/app/context/UsuarioContext";

interface PropriedadesPerfilProfessor {
  id: string;
}

export default function PerfilProfessor({ id }: PropriedadesPerfilProfessor) {
  const { usuario, lidarComLogin } = useUsuario();

  const professor = professores.find((p) => p.id === id);
  const [agendamentoAberto, setAgendamentoAberto] = useState(false);
  const [chatAberto, setChatAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);

  if (!professor) {
    redirect("/catalog");
  }

  const lidarComCliqueBotaoAgendar = () => {
    if (usuario) {
      setAgendamentoAberto(true);
    } else {
      setModalLoginAberto(true);
    }
  };

  const lidarComCliqueBotaoChat = () => {
    if (usuario) {
      setChatAberto(true);
    } else {
      setModalLoginAberto(true);
    }
  };

  const lidarComSucessoLogin = (dadosUsuario: Usuario) => {
    lidarComLogin(dadosUsuario);
    setModalLoginAberto(false);
    setAgendamentoAberto(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative">
                <img
                  src={professor.avatar}
                  alt={professor.nome}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
                {professor.verificado && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {professor.nome}
                    </h1>
                    <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-medium">
                          {professor.avaliacao}
                        </span>
                        <span>({professor.numeroAvaliacoes} avaliações)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-5 h-5" />
                        <span>{professor.experiencia} de experiência</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center md:text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      R${professor.valorHora}
                    </div>
                    <div className="text-gray-600">por hora</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                  {professor.materias.map((materia) => (
                    <span
                      key={materia}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                    >
                      {materia}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <button
                    onClick={lidarComCliqueBotaoAgendar}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Agendar Aula</span>
                  </button>
                  <button
                    onClick={lidarComCliqueBotaoChat}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </button>
                  <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-3 rounded-lg transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sobre
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {professor.biografia}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Matérias e Especialidades
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {professor.materias.map((materia) => (
                  <div
                    key={materia}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium text-gray-900">{materia}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Avaliações ({professor.numeroAvaliacoes})
              </h2>
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Sarah M.</span>
                    <span className="text-gray-500">2 semanas atrás</span>
                  </div>
                  <p className="text-gray-700">
                    Excelente professora! Realmente me ajudou a entender
                    conceitos complexos de cálculo. Paciente e explica as coisas
                    claramente.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <span className="font-medium text-gray-900">Mike R.</span>
                    <span className="text-gray-500">1 mês atrás</span>
                  </div>
                  <p className="text-gray-700">
                    Ótimo estilo de ensino e muito conhecedor. Minhas notas
                    melhoraram significativamente após apenas algumas sessões.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Informações Rápidas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Idiomas</div>
                    <div className="font-medium">
                      {professor.idiomas.join(", ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Experiência</div>
                    <div className="font-medium">{professor.experiencia}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="font-medium text-green-600">
                      Professor Verificado
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Disponibilidade
              </h3>
              <div className="space-y-2">
                {[
                  "Segunda",
                  "Terça",
                  "Quarta",
                  "Quinta",
                  "Sexta",
                  "Sábado",
                  "Domingo",
                ].map((dia) => (
                  <div key={dia} className="flex items-center justify-between">
                    <span className="text-gray-700">{dia}</span>
                    <span
                      className={`text-sm font-medium ${
                        professor.disponibilidade.includes(dia)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {professor.disponibilidade.includes(dia)
                        ? "Disponível"
                        : "Indisponível"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ModalAgendamento
          professor={professor}
          aberto={agendamentoAberto}
          aoFechar={() => setAgendamentoAberto(false)}
        />

        <ModalChat
          professor={professor}
          aberto={chatAberto}
          aoFechar={() => setChatAberto(false)}
        />

        <ModalLogin
          aberto={modalLoginAberto}
          aoFechar={() => setModalLoginAberto(false)}
          aoFazerLogin={lidarComSucessoLogin}
        />
      </div>
    </div>
  );
}
