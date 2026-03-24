import { Search } from 'lucide-react';
import { Conversation } from '../types/chat';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  currentUserRole: 'teacher' | 'student';
}

export default function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  currentUserRole,
}: ConversationListProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const getConversationTitle = (conv: Conversation) => {
    if (currentUserRole === 'teacher') {
      return conv.userRole === 'Aluno' ? 'Aluno' : 'Professor';
    }
    return conv.userRole === 'Professor' ? 'Professor' : 'Aluno';
  };

  return (
    <div className="w-full md:w-96 border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Mensagens</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar conversas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <button
            key={conversation.id}
            onClick={() => onSelectConversation(conversation.id)}
            className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
              selectedConversationId === conversation.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={conversation.userAvatar}
                alt={conversation.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 truncate">
                  {conversation.userName}
                </h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {formatTime(conversation.lastMessageTime)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 truncate flex-1">
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {getConversationTitle(conversation)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
