import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import path from '../../config/path'

class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      error: '',
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const { email, password, passwordConfirm } = this.state;

    this.setState({ error: '', loading: true });

    return axios.post(path + "/api/users/signup",{
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    })
    .then((res) => {
      return axios.post(path + "/api/users/login", {
        email: this.state.email,
        password: this.state.password,
      })}
    )
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.token);
      this.props.newJWT(response.data.token);
    })
    .catch((error) => {
      console.log(error);
      this.onRegistrationFail();
    });
  }

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { email, password, passwordConfirm, error, loading } = this.state;
    const { form, section, errorTextStyle, link } = styles;

    return (
      <Fragment>
        <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={passwordConfirm}
              onChangeText={(passwordConfirm) =>
                this.setState({ passwordConfirm })
              }
            />
          </View>

          <Text style={errorTextStyle}>{error}</Text>

          {!loading ? (
            <Button onPress={this.registerUser}>Register</Button>
          ) : (
            <Loading size={"large"} />
          )}
        <TextLink style={link} onPress={this.props.authSwitch}>
          Already have an account? Log in!
        </TextLink>
        </View>
      </Fragment>
    );
  }
}

const styles = {
  form: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    position: 'absolute',
    bottom: 143
  },
  section: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  errorTextStyle: {
    alignSelf: "center",
    fontSize: 18,
    color: "black",
  },
  link: {
    color: '#fff',
  }
};


export { Registration };
