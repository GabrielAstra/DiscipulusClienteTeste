'use client';


import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ConversationList from '@/components/ConversationList';
import ChatWindow from '@/components/ChatWindow';
import { mockConversations, mockMessages } from '@/data/mockChatData';
import { Message } from '@/types/chat';

export default function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversations] = useState(mockConversations);
  const [messagesData, setMessagesData] = useState(mockMessages);

  const currentUserRole: 'teacher' | 'student' = 'teacher';

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const currentMessages = selectedConversationId
    ? messagesData[selectedConversationId] || []
    : [];

  const handleSendMessage = (text: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessagesData((prev) => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
