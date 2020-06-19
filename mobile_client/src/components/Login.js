import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import path from "../../config/path";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  loginUser() {
    const { email, password, passwordConfirm } = this.state;

    this.setState({ error: '', loading: true });

    axios.post(path + "/api/users/login",{
        email: email,
        password: password
    })
    .then((response) => {
      let userId = response.data.id ? response.data.id : "5eecbe90b401afc133ce1c71"
      deviceStorage.saveKey("id_token", response.data.token);
      deviceStorage.saveKey("userId", userId);
      this.props.newJWT(response.data.token);
      this.props.setUserId(userId);
    })
    .catch((error) => {
      console.log(error);
      this.onLoginFail();
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }

  render() {
    const { email, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <Text style={errorTextStyle}>
            {error}
          </Text>

          {!loading ?
            <Button onPress={this.loginUser}>
              Login
            </Button>
            :
            <Loading size={'large'} />
          }

        <TextLink onPress={this.props.authSwitch}>
          Don't have an account? Register!
        </TextLink>
        </View>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    position: 'absolute',
    top: 405
  },
  section: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black'
  }
};

export { Login };
