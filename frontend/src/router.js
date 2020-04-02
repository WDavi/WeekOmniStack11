import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import UpdateIncident from './pages/UpdateIncident';

export default function Router(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route exact path="/incident/new" component={NewIncident}/>
                <Route exact path="/incident/modify" component={UpdateIncident}/>
            </Switch>
        </BrowserRouter>
    )
}