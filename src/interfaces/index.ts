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
   isAnswered: boolean
}

export interface Room {
   title: string;
   authorId: string;
   questions: Question[]
}

export interface QuestionFrontEnd {
   id: string,
   content: string,
   author: {
      name: string,
      avatar: string,
   },
   isHighlighted: boolean,
   isAnswered: boolean
}

export type FirebaseQuestions = Record<string, Question>;   // Record<string, {}> => um objeto que a chave é uma string

export interface AuthContextValues {
   user: User | null;
   signInWithGoogle: () => Promise<void>;
}