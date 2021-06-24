import { ReactNode } from 'react';

export interface ChildrenProps {
   children: ReactNode;
}

export interface User {
   id: string;
   avatar: string;
   name: string;
}

export interface Question { 
   content: string,
   author: {
      name: string,
      avatar: string,
   },
   isHighlighted: boolean,
   isAnswered: boolean,
   likes: Record<string, {
      authorId: string;
   }>;
}

export interface Room {
   title: string;
   authorId: string;
   questions: Question[];
}

export interface Likes {
   id: string;
   authorId: string;
}

export interface QuestionFrontEnd {
   id: string,
   content: string,
   author: {
      name: string,
      avatar: string,
   },
   isHighlighted: boolean,
   isAnswered: boolean;
   likeCount: number;
   hasLiked: boolean;
   likeId: LikeId;
}

interface LikeId {
   likeKey: string;
   like: {
      authorId: string;
   }
}

export type FirebaseQuestions = Record<string, Question>;   // Record<string, {}> => um objeto que a chave é uma string

export interface AuthContextValues {
   user: User | null;
   signInWithGoogle: () => Promise<void>;
}