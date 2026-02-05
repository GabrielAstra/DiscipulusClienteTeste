import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Calendar, User } from 'lucide-react';
import { Message, Conversation } from '../types/chat';

interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export default function ChatWindow({
  conversation,
  messages,
  onSendMessage,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // rola para baixo sempre que mensagens mudam
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // envia mensagem usando função passada pelo pai
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage); // envia para o pai (Messages.tsx)
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={conversation.userAvatar}
              alt={conversation.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {conversation.userName}
            </h3>
            <p className={`text-sm ${conversation.online ? 'text-green-600' : 'text-gray-500'}`}>
              {conversation.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 px-4 py-2 rounded-2xl border border-gray-200">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white">
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Agendar Aula</span>
          </button>
          <button className="flex-1 bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
            <User className="w-4 h-4" />
            <span>Ver Perfil</span>
          </button>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '100px' }}
            />
            <button className="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
