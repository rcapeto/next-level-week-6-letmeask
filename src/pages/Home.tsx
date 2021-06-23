import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks';
import { database } from '../services/firebase';

import Button from '../components/Button';

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export default function Home() {
   const [roomCode, setRoomCode] = useState<string>('');

   const history = useHistory();
   const { user, signInWithGoogle } = useAuth();

   async function handleCreateRoom() {
      if(!user) {
         try {
            await signInWithGoogle();
            history.push('/rooms/new');

         } catch(err) {
            console.error(err.message);
         }
      } else {
         history.push('/rooms/new');
      }
   }

   async function handleJoinRoom(event: FormEvent) {
      event.preventDefault();

      if(roomCode.trim() === '') return;

      try {
         const roomRef = await database.ref(`rooms/${roomCode}`).get();

         if(!roomRef.exists()) {
            alert('This room does not exists.');
            setRoomCode('');
            return;
         }
   
         history.push(`/rooms/${roomCode}`);

      } catch(err) {
         console.error(err.message);
      }
   }

   return(
      <div id="page-auth">
         <aside>
            <img src={illustrationImage} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao-vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo-real.</p>
         </aside>

         <main>
            <div className="main-content">
               <img src={logoImage} alt="LetMeAsk" />
               <button className="create-room" onClick={handleCreateRoom}>
                  <img src={googleIconImage} alt="Logo do Google" />
                  Crie sua sala com o Google
               </button>

               <div className="separator">ou entre em uma sala</div>

               <form onSubmit={handleJoinRoom}>
                  <input 
                     type="text" 
                     placeholder="Digite o código da sala"
                     value={roomCode}
                     onChange={event => setRoomCode(event.target.value)}
                  />
                  <Button type="submit">Entrar na sala</Button>
               </form>
            </div>
         </main>
      </div>
   );
}