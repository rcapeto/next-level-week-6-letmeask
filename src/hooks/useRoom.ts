import { useState, useEffect } from 'react';

import { database } from '../services/firebase';
import { QuestionFrontEnd, FirebaseQuestions } from '../interfaces';
import { useAuth } from './index';

interface ReturnUseRoom {
   questions: QuestionFrontEnd[];
   title: string;
}

export function useRoom(roomId: string): ReturnUseRoom {
   const [questions, setQuestions] = useState<QuestionFrontEnd[]>([]);
   const [title, setTitle] = useState<string>('');

   const { user } = useAuth();

   useEffect(() => {
      const roomRef = database.ref(`rooms/${roomId}`);

      //once => ouvir 1 vez, on => ouvir sempre
      roomRef.on('value', room => {
         const databaseRoom = room.val();
         
         setTitle(databaseRoom.title);

         const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

         const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            const [likedId] = value.likes ? Object.entries(value.likes).map(([likeKey, like]) => {
               return {
                  likeKey,
                  like
               }
            }) : [{ likeKey: '', like: { authorId: '' }}];

            return {
               id: key,
               content: value.content,
               author: value.author,
               isHighlighted: value.isHighlighted,
               isAnswered: value.isAnswered,
               likeCount: value.likes ? Object.values(value.likes).length : 0,
               hasLiked: value.likes ? Object.values(value.likes).some(like => like.authorId == user?.id) : false,
               likeId: likedId
            }
         });

         setQuestions(parsedQuestions.reverse());
      });

      return () => {
         roomRef.off('value');
      }
   }, [roomId]);

   return { questions, title }
}