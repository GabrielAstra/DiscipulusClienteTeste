export interface Message {
    id: string;
    text: string;
    sender?: 'user' | 'other';
    timestamp: Date;
    userRole?: string;
}

// export interface Conversation {
//     id: string;
//     userId: string;
//     userName: string;
//     userAvatar: string;
//     lastMessage: string;
//     lastMessageTime: Date;
//     unreadCount: number;
//     online: boolean;
//     userRole: 'teacher' | 'student';
// }

export interface Conversation {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    lastMessage: string;
    lastMessageTime: Date;
    online: boolean;
    unreadCount: number;
    userRole: 'Professor' | 'Aluno';
}

export interface User {
    id: string;
    name: string;
    role: 'teacher' | 'student';
    avatar: string;
}
