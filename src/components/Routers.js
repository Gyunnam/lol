import React from 'react';
import { BrowserRouter as Router ,Route,Redirect,Switch } from 'react-router-dom';

import Champion from '../routes/champion/index'; 
import Search from '../routes/search';
import Header from '../components/header'

const PageRouter = ()=>{
    return(
        <>
        <Header/>
        <Router>
            <Switch>
                <Route exact path="/">
                    hi
                </Route>
                <Route path='/search' component={Search}/>
                <Route path="/champion" component={Champion} />
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
        </>
    )
}

export default PageRouter;