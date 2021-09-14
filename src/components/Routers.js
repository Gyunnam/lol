import React from 'react';
import { BrowserRouter as Router ,Route,Redirect,Switch } from 'react-router-dom';

import Champion from '../routes/champion/index'; 
import Search from '../routes/search';

const PageRouter = ()=>{
    return(
        <>
        <Router>
            <Switch>
                <Route exact path="/" component={Search} />
                <Route path="/champion" component={Champion} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
        </>
    )
}

export default PageRouter;