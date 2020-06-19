import React, { Component } from 'react';
import { Loading } from './components/common/';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';
import deviceStorage from './services/deviceStorage.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: "",
      userId: "",
      loading: true,
    };

    this.saveKey = deviceStorage.saveKey.bind(this);
    this.loadKey = deviceStorage.loadKey.bind(this);
    this.setUserId = this.setUserId.bind(this);
    this.clearUserId = this.clearUserId.bind(this);
    this.newJWT = this.newJWT.bind(this);
    this.deleteJWT = deviceStorage.deleteJWT.bind(this);
    this.loadJWT = deviceStorage.loadJWT.bind(this);
    this.loadJWT();
    this.loadKey("userId");
  }

  newJWT(jwt){
    this.setState({
      jwt: jwt
    });
  }

  setUserId(id){
    this.setState({userId: id})
  }

  clearUserId(){
    this.setState({userId: ""})
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading size={'large'} />
       );
    } else if (!this.state.jwt) {
      return (
        <Auth 
          newJWT={this.newJWT} 
          setUserId={this.setUserId}
        />
      );
    } else if (this.state.jwt) {
      return (
        <LoggedIn 
          jwt={this.state.jwt} 
          deleteJWT={this.deleteJWT} 
          userId={this.state.userId}
          clearUserId={this.clearUserId}
        />
      );
    }
  }
}
