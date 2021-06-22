import { AuthContextProvider } from './contexts/authContext';
import Routes from './routes';

import './services/firebase';

export default function App() {
  return(
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}