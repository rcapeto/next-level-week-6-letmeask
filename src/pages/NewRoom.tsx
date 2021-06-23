import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../services/firebase';
import { useAuth } from '../hooks';

import Button from '../components/Button';

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';

import '../styles/auth.scss';

export default function NewRoom() {
   const { user } = useAuth();
   const history = useHistory();

   const [newRoom, setNewRoom] = useState<string>('');

   async function handleCreateRoom(event: FormEvent) {
      event.preventDefault();

      if(newRoom.trim() === '') return;

      const roomRef = database.ref('rooms');

      try {
         const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
         });

         history.push(`/rooms/${firebaseRoom.key}`);
         
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
               <h2>Criar uma nova sala</h2>
               <form onSubmit={handleCreateRoom}>
                  <input 
                     type="text" 
                     placeholder="Nome da sala"
                     value={newRoom}
                     onChange={({ target: { value }}) => setNewRoom(value)}
                  />
                  <Button type="submit">Criar sala</Button>
               </form>
               <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p> 
            </div>
         </main>
      </div>
   );
}