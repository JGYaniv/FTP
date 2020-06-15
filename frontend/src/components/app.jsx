// import Messages from './messages/messages_container';
import Login from './session/login_container';
import Signup from './session/signup_container';
import Splash from './splash/splash_container';
import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';


export default () => (
  <div>
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/signup" component={Signup} />

      {/* <ProtectedRoute exact path="/home" component={Home} /> */}
    </Switch>
  </div>
)