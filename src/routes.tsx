import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';

export default function Routes() {
   return(
      <BrowserRouter>
         <Switch>
            <Route component={Home} path="/" exact/>
            <Route component={NewRoom} path="/rooms/new" exact />
            <Route component={Room} path="/rooms/:id" />
         </Switch>
      </BrowserRouter>
   );
}