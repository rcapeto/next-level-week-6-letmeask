import { useHistory } from 'react-router-dom';

import { useAuth } from '../hooks';
import Button from '../components/Button';

import illustrationImage from '../assets/images/illustration.svg';
import logoImage from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export default function Home() {
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

               <form>
                  <input 
                     type="text" 
                     placeholder="Digite o código da sala"
                  />
                  <Button type="submit">Entrar na sala</Button>
               </form>
            </div>
         </main>
      </div>
   );
}