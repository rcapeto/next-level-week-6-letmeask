import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

export default function Routes() {
   return(
      <BrowserRouter>
         <Switch>
            <Route component={Home} path="/" exact/>
            <Route component={NewRoom} path="/rooms/new" />
         </Switch>
      </BrowserRouter>
   );
}