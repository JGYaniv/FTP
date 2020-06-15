// import Messages from './messages/messages_container';
import Login from './session/login_container';
// import Signup from './session/signup_container';
import React from 'react';
import {Switch, Route} from 'react-router-dom';



export default () => (
  <div><Switch >
    <Route component={Login} path="/login" />
    {/* <Route component={Signup} path="/signup" />
    <Route component={Messages} path="/messages" /> */}
    </Switch>
  </div>
)