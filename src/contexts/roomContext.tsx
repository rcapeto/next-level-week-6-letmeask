import { createContext } from 'react';

import { ChildrenProps } from '../interfaces';

export const RoomContext = createContext({});

export function RoomContextProvider({ children } : ChildrenProps) {
   return(
      <RoomContext.Provider value={{}}>
         { children }
      </RoomContext.Provider>
   );
}