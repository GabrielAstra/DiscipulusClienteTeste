"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Paperclip, Smile } from "lucide-react";
import { PerfilProfessor } from "@/lib/service/teacher/teacher.service";
import { useUsuario } from "@/context/UsuarioContext";
import { listarMensagens } from "@/lib/service/chat/mensagens.service";
import { useSignalR } from "@/context/SignalRContext";

interface Mensagem {  
  id: string;
  texto: string;
  remetente: "usuario" | "professor";
  timestamp: Date;
}

interface PropriedadesModalChat {
  professor: PerfilProfessor;
  aberto: boolean;
  aoFechar: () => void;
}

export default function ModalChat({
  professor,
  aberto,
  aoFechar,
}: PropriedadesModalChat) {
 
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState("");
  const [digitando, setDigitando] = useState(false);
  const { connection } = useSignalR();
  const refFinalMensagens = useRef<HTMLDivElement>(null);

  const { usuario } = useUsuario();

  const conversaId = usuario
      ? `${usuario.id}_${professor.usuarioID}`
      : "";

    const rolarParaBaixo = () => {
      refFinalMensagens.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
      if (!aberto || !usuario) return;

      carregarHistorico(); 

    }, [aberto, conversaId]);

    useEffect(() => {
      if (!aberto || !connection || !conversaId) return;

      connection
        .invoke("EntrarConversa", conversaId)
        .catch(console.error);
    }, [aberto, connection, conversaId]);


  async function carregarHistorico() {
    const mensagens = await listarMensagens(conversaId, usuario!.id);

    setMensagens(
      mensagens.map((m) => ({
        id: m.id,
        texto: m.text,
        remetente: m.sender === "user" ? "usuario" : "professor",
        timestamp: m.timestamp,
      }))
    );
  }


  useEffect(() => {
    rolarParaBaixo();
  }, [mensagens]);
  useEffect(() => {
    if (!connection || !aberto) return;

    const handler = (mensagem: any) => {
      setMensagens((prev) => [
        ...prev,
        {
          id: mensagem.mensagemId,
          texto: mensagem.conteudo,
          remetente:
            mensagem.usuarioId === usuario?.id ? "usuario" : "professor",
          timestamp: new Date(),
        },
      ]);
    };

    connection.on("NovaMensagem", handler);

    return () => {
      connection.off("NovaMensagem", handler);
    };
  }, [connection, aberto, usuario?.id]);

  const lidarComEnviarMensagem = async () => {
  if (!novaMensagem.trim() || !connection) return;

      try {
        await connection.invoke("EnviarMensagem", {
          conversaId,
          texto: novaMensagem,
          usuarioRecebedorId: professor.usuarioID,
        });

        setNovaMensagem("");
      } catch (err) {
        console.error("Erro ao enviar mensagem", err);
      }
    };


  const lidarComTeclaPressionada = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      lidarComEnviarMensagem();
    }
  };

  const formatarHorario = (data: Date) => {
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt={professor.nome}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{professor.nome}</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>
          <button
            onClick={aoFechar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mensagens.map((mensagem) => (
            <div
              key={mensagem.id}
              className={`flex ${
                mensagem.remetente === "usuario"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  mensagem.remetente === "usuario"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{mensagem.texto}</p>
                <p
                  className={`text-xs mt-1 ${
                    mensagem.remetente === "usuario"
                      ? "text-indigo-200"
                      : "text-gray-500"
                  }`}
                >
                  {formatarHorario(mensagem.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {digitando && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={refFinalMensagens} />
        </div>

        <div className="px-4 py-2 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="flex-1 bg-indigo-50 text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
              Agendar Aula
            </button>
            <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Ver Perfil
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                onKeyPress={lidarComTeclaPressionada}
                placeholder="Digite sua mensagem..."
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: "44px", maxHeight: "100px" }}
              />
              <button className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={lidarComEnviarMensagem}
              disabled={!novaMensagem.trim()}
              className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
