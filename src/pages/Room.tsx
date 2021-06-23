import { FormEvent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../hooks';
import { database } from '../services/firebase';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';

import logo from '../assets/images/logo.svg';
import '../styles/room.scss';
import { FirebaseQuestions, QuestionFrontEnd } from '../interfaces';

interface ParamsProps {
   id: string;
}

export default function Room() {
   const [newQuestion, setNewQuestion] = useState<string>('');
   const [questions, setQuestions] = useState<QuestionFrontEnd[]>([]);
   const [title, setTitle] = useState<string>('');


   const params = useParams<ParamsProps>();
   const roomId = params.id;

   const { user, signInWithGoogle } = useAuth();

   async function handleSendQuestion(event: FormEvent) {
      event.preventDefault();

      if(newQuestion.trim() === '') return;

      if(!user) throw new Error('You must be logged in');

      const question = {
         content: newQuestion,
         author: {
            name: user.name,
            avatar: user.avatar,
         },
         isHighlighted: false,
         isAnswered: false
      }

      try {
         await database.ref(`rooms/${roomId}/questions`).push(question);
         setNewQuestion('');

      } catch(err) {
         console.error(err);
      }
   }

   useEffect(() => {
      const roomRef = database.ref(`rooms/${roomId}`);

      //once => ouvir 1 vez, on => ouvir sempre
      roomRef.on('value', room => {
         const databaseRoom = room.val();

         setTitle(databaseRoom.title);

         const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

         const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
               id: key,
               content: value.content,
               author: value.author,
               isHighlighted: value.isHighlighted,
               isAnswered: value.isAnswered
            }
         });

         setQuestions(parsedQuestions);
      });
   }, [roomId]);

   return(
      <div id="page-room">
         <header>
            <div className="content">
               <img src={logo} alt="Let me ask" />

               <RoomCode code={roomId}/>
            </div>
         </header>

         <main>
            <div className="room-title">
               <h1>{title}</h1>
               {
                  questions.length && <span>{questions.length} pergunta{questions.length !== 1 ? 's': ''}</span>
               }
            </div>

            <form onSubmit={handleSendQuestion}>
               <textarea 
                  name="newQuestion"
                  value={newQuestion}
                  onChange={event => setNewQuestion(event.target.value)} 
                  placeholder="O que você quer perguntar?"
               />

               <div className="form-footer">
                  {
                     user ? (
                        <div className="user-info">
                           <img src={user.avatar} alt={user.name} title={user.name}/>
                           <span>{user.name}</span>
                        </div>
                     ) : (
                        <span>
                           Para enviar uma pergunta, <button onClick={signInWithGoogle}>faça o seu login.</button>
                        </span>
                     )
                  }
                  <Button type="submit" disabled={!user}>Enviar pergunta</Button>
               </div>
            </form>
         </main>
      </div>
   );
}