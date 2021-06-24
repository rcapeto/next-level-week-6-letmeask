import { ReactNode } from 'react';
import { QuestionFrontEnd } from '../interfaces';

import '../styles/components/question.scss';

type QuestionProps = QuestionFrontEnd & {
   children?: ReactNode;
}

export default function Question({ author, content, isAnswered, isHighlighted, children }: QuestionProps) {
   return(
      <div className="question">
         <p>{content}</p>
         <footer>
            <div className="user-info">
               <img src={author.avatar} alt={author.name} />
               <span>{author.name}</span>
            </div>

            <div>
               { children }
            </div>
         </footer>
      </div>
   );
}