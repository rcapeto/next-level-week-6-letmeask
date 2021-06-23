import copyImage from '../assets/images/copy.svg';
import '../styles/components/room-code.scss';

interface RoomCodeProps {
   code: string;
}

export default function RoomCode({ code }: RoomCodeProps) {
   function copyRoomCodeToClipboard() {
      navigator.clipboard.writeText(code);
   }

   return(
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
         <div>
            <img src={copyImage} alt={`Copiar código ${code}`} />
         </div>

         <span>Sala {code}</span>
      </button>
   );
}