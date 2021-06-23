import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext';
import { RoomContext } from '../contexts/roomContext';

export function useAuth() {
   return useContext(AuthContext);
}

export function useRoom() {
   return useContext(RoomContext);
}