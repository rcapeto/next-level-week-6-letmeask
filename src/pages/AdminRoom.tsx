import { useParams, useHistory } from 'react-router-dom';

import { useAuth } from '../hooks';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import Button from '../components/Button';
import RoomCode from '../components/RoomCode';
import Question from '../components/Question';

import logo from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
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

   async function handleCheckQuestionAsAnswred(questionId: string) {
      try {
         await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isAnswered: true });
      } catch(err) {
         console.error(err.message);
      }
   }

   async function handleHighlightQuestion(questionId: string) {
      try {
         await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ isHighlighted: true });
      } catch(err) {
         console.error(err.message);
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
                        {
                           !question.isAnswered && (
                              <>
                                 <button 
                                    type="button"
                                    onClick={() => handleCheckQuestionAsAnswred(question.id)}
                                 >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                 </button>
                                 <button 
                                    type="button"
                                    className={`${question.isHighlighted ? 'isHighlighted' : ''}`}
                                    onClick={() => handleHighlightQuestion(question.id)}
                                 >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                 </button>
                              </>
                           )
                        }
                        
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