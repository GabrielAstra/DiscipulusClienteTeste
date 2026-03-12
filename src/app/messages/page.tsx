'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import ConversationList from '@/components/ConversationList';
import ChatWindow from '@/components/ChatWindow';
import { Message, Conversation } from '@/types/chat';
import { listarMensagens } from "@/lib/service/chat/mensagens.service";
import { useUsuario } from "@/context/UsuarioContext";
import { useSignalR } from '@/context/SignalRContext';

export default function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messagesData, setMessagesData] = useState<Record<string, Message[]>>({});
  const { usuario } = useUsuario();
  const { connection } = useSignalR();

  useEffect(() => {
    if (!connection || !usuario) return;

    const handler = (msg: any) => {
      const conversaId = msg.conversaId;

      if (msg.usuarioId === usuario.id) return;

      const novaMsg: Message = {
        id: `m${Date.now()}`,
        text: msg.conteudo,
        sender: 'other',
        userRole: usuario.role === 'Professor' ? 'Aluno' : 'Professor',
        timestamp: new Date(),
      };

      setMessagesData(prev => ({
        ...prev,
        [conversaId]: [...(prev[conversaId] || []), novaMsg],
      }));
    };

    connection.on("NovaMensagem", handler);

    return () => {
      connection.off("NovaMensagem", handler);
    };
  }, [connection, usuario]);


  const currentUserRole: 'teacher' | 'student' = 'teacher';
  useEffect(() => {
    const carregarMensagens = async () => {
      if (!selectedConversationId || !usuario) return;

      if (messagesData[selectedConversationId]) return;

      try {
        const mensagens = await listarMensagens(selectedConversationId, usuario.id);

        setMessagesData((prev) => ({
          ...prev,
          [selectedConversationId]: mensagens,
        }));
      } catch (error) {
        console.error("Erro ao carregar mensagens", error);
      }
    };

    carregarMensagens();
  }, [selectedConversationId, usuario]);
  useEffect(() => {
    if (!selectedConversationId || !connection) return;

    connection
      .invoke("EntrarConversa", selectedConversationId)
      .then(() => console.log(`Entrou na conversa ${selectedConversationId}`))
      .catch(console.error);
  }, [selectedConversationId, connection]);


  useEffect(() => {
    const carregarConversas = async () => {
      try {

        const response = await fetch("/api/chat");

        const data = await response.json();

        const conversasFormatadas: Conversation[] = data.$values.map((c: any) => {

          return {
            id: c.conversaId,
            userName: c.outroUsuarioNome,
            userAvatar: c.urlFotoPerfil
              ? c.urlFotoPerfil
              : '/avatar.png',
            lastMessage: c.ultimaMensagem ?? '',
            lastMessageTime: new Date(c.dataUltimaMensagem),
            unreadCount: 0,
            online: true,
            userRole: currentUserRole === 'teacher' ? 'student' : 'teacher',
          };
        });

        setConversations(conversasFormatadas);
      } catch (error) {
        console.error('Erro ao carregar conversas', error);
      }
    };

    carregarConversas();
  }, [currentUserRole]);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const currentMessages = selectedConversationId
    ? messagesData[selectedConversationId] || []
    : [];

  const handleSendMessage = async (text: string) => {
    if (!selectedConversationId || !connection || !usuario) return;

    try {
      await connection.invoke("EnviarMensagem", {
        conversaId: selectedConversationId,
        texto: text,
        usuarioRecebedorId: currentUserRole === 'teacher' ? 'student' : 'teacher',
      });

      const newMessage: Message = {
        id: `m${Date.now()}`,
        text,
        sender: 'user',
        timestamp: new Date(),
      };

      setMessagesData(prev => ({
        ...prev,
        [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
      }));

    } catch (err) {
      console.error("Erro ao enviar mensagem", err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
            currentUserRole={currentUserRole}
          />

          {selectedConversation ? (
            <ChatWindow
              conversation={selectedConversation}
              messages={currentMessages}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Selecione uma conversa
                </h3>
                <p className="text-gray-600">
                  Escolha uma conversa da lista para começar a trocar mensagens
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
