import { useParams, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';

import logo from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss';

interface ParamsProps {
   id: string;
}

export default function AdminRoom() {
   const history = useHistory();
   const params = useParams<ParamsProps>();
   const roomId = params.id;

   const { questions, title } = useRoom(roomId);
   const { user, signInWithGoogle } = useAuth();

   async function handleDeleteQuestion(questionId: string) {
      if(window.confirm('Tem certeza que você deseja excluir essa pergunta?')) {
         try {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
         } catch(err) {
            console.error(err.message);
         }
      }
   }

   async function handleEndRoom() {
      try {
         await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
         });
         history.push('/');
      } catch(err) {
         console.error(err);
      }
   }

   return(
      <div id="page-room">
         <header>
            <div className="content">
               <img src={logo} alt="Let me ask" />

               <div className="right-content">
                  <RoomCode code={roomId}/>
                  <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
               </div>
               
            </div>
         </header>

         <main>
            <div className="room-title">
               <h1>{title}</h1>
               {
                  questions.length > 0 && <span>{questions.length} pergunta{questions.length !== 1 ? 's': ''}</span>
               }
            </div>

            <div className="question-list">
               {
                  questions.map(question => (
                     <Question  
                        key={question.id}
                        author={question.author}
                        content={question.content}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                        id={question.id}
                        hasLiked={question.hasLiked}
                        likeCount={question.likeCount}
                        likeId={question.likeId}
                     >
                        <button
                           type="button"
                           onClick={() => handleDeleteQuestion(question.id)}
                        >
                           <img src={deleteImg} alt="Remover Pergunta" />
                        </button>
                     </Question>
                  ))
               }
            </div>
         </main>
      </div>
   );
}