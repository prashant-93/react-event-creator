import React, {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const EventRegister = lazy(() => import('../Components/EventRegister/EventRegister'));

const RouterComponent = () => {
    return (
        <Suspense fallback={<div/>}>
            <Router>
                <Switch>
                    <Route exact path={'/'} component={EventRegister}/>
                </Switch>
            </Router>
        </Suspense>
    )
};

export default RouterComponent;
