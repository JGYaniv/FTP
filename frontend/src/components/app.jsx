import Login from './session/login_container';
import Signup from './session/signup_container';
import Splash from './splash/splash_container';
import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import NavBarContainer from './nav/navbar_container';
import Home from './home/home_container'
import Modal from './modal/modal';

export default () => (
  <div>
    <Modal/>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={Splash} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/signup" component={Signup} />

      <ProtectedRoute exact path="/home" component={Home} />
    </Switch>
  </div>
)