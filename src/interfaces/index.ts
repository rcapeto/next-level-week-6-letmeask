import { ReactNode } from 'react';

export interface ChildrenProps {
   children: ReactNode;
}

export interface User {
   id: string;
   avatar: string;
   name: string;
}

export interface AuthContextValues {
   user: User | null;
   signInWithGoogle: () => Promise<void>;
}