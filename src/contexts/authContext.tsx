import { createContext, useState, useEffect } from 'react';

import { ChildrenProps, User, AuthContextValues } from '../interfaces';
import { firebase, auth } from '../services/firebase';

export const AuthContext = createContext({} as AuthContextValues);

export function AuthContextProvider({ children }: ChildrenProps) {
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      checkUserAuthentication();
   }, []);

   function checkUserAuthentication() {
      auth.onAuthStateChanged(currentUser => {
         if(currentUser) {
            const { displayName, photoURL, uid } = currentUser;

            if(!displayName || !photoURL) {
               throw new Error('Missing information from Google Account');
            }
   
            setUser({ id: uid, name: displayName, avatar: photoURL });
         }
      });
   }

   async function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await auth.signInWithPopup(provider);

      if(result.user) {
         const { displayName, photoURL, uid } = result.user;

         if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account');
         }

         setUser({ id: uid, name: displayName, avatar: photoURL });
      }
   }

   return(
      <AuthContext.Provider value={{
         user,
         signInWithGoogle
      }}>
         { children }
      </AuthContext.Provider>
   );
}