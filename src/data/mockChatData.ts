import { Conversation, Message } from '../types/chat';

export const mockConversations: Conversation[] = [
    {
        id: '1',
        userId: 'user1',
        userName: 'Maria Silva',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: 'Obrigada pela aula de hoje!',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
        unreadCount: 2,
        online: true,
        userRole: 'student',
    },
    {
        id: '2',
        userId: 'user2',
        userName: 'João Santos',
        userAvatar: 'https://i.pravatar.cc/150?img=2',
        lastMessage: 'Podemos remarcar a aula de amanhã?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
        unreadCount: 0,
        online: true,
        userRole: 'student',
    },
    {
        id: '3',
        userId: 'user3',
        userName: 'Ana Costa',
        userAvatar: 'https://i.pravatar.cc/150?img=3',
        lastMessage: 'Qual é o material para a próxima aula?',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
        unreadCount: 1,
        online: false,
        userRole: 'student',
    },
    {
        id: '4',
        userId: 'user4',
        userName: 'Prof. Carlos Mendes',
        userAvatar: 'https://i.pravatar.cc/150?img=4',
        lastMessage: 'Confirmo a aula para terça-feira às 14h',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
        unreadCount: 0,
        online: true,
        userRole: 'teacher',
    },
    {
        id: '5',
        userId: 'user5',
        userName: 'Pedro Oliveira',
        userAvatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'Tenho dúvidas sobre o exercício 3',
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
        unreadCount: 0,
        online: false,
        userRole: 'student',
    },
];

export const mockMessages: Record<string, Message[]> = {
    '1': [
        {
            id: 'm1',
            text: 'Olá! Gostaria de agendar uma aula de matemática',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
        },
        {
            id: 'm2',
            text: 'Olá Maria! Claro, tenho disponibilidade na terça às 14h. Serve para você?',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 55),
        },
        {
            id: 'm3',
            text: 'Perfeito! Vou confirmar então',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 50),
        },
        {
            id: 'm4',
            text: 'Ótimo! Te envio o material de estudo antes da aula',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 45),
        },
        {
            id: 'm5',
            text: 'Obrigada pela aula de hoje!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
        },
    ],
    '2': [
        {
            id: 'm6',
            text: 'Boa tarde, professor!',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 40),
        },
        {
            id: 'm7',
            text: 'Boa tarde, João! Como posso ajudar?',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 38),
        },
        {
            id: 'm8',
            text: 'Podemos remarcar a aula de amanhã?',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
        },
    ],
    '3': [
        {
            id: 'm9',
            text: 'Olá! Vi que temos aula na próxima semana',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        },
        {
            id: 'm10',
            text: 'Sim, Ana! Terça-feira às 16h',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        },
        {
            id: 'm11',
            text: 'Qual é o material para a próxima aula?',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
    ],
    '4': [
        {
            id: 'm12',
            text: 'Professor, tenho disponibilidade terça às 14h para nossa aula',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        },
        {
            id: 'm13',
            text: 'Confirmo a aula para terça-feira às 14h',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        },
    ],
    '5': [
        {
            id: 'm14',
            text: 'Professor, comecei a fazer os exercícios',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
        },
        {
            id: 'm15',
            text: 'Ótimo, Pedro! Alguma dúvida?',
            sender: 'user',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5),
        },
        {
            id: 'm16',
            text: 'Tenho dúvidas sobre o exercício 3',
            sender: 'other',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
    ],
};
