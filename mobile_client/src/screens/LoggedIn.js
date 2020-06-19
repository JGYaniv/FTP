import React, { Component } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { Loading } from '../components/common/';
import axios from 'axios';
import { CustomMessage } from '../components/CustomMessage';
import path from '../../config/path'

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: ''
    }
    // this.headers = {}
  }

  componentDidMount(){
    this.headers = {
      'Authorization': 'Bearer ' + this.props.jwt
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.logout}
          onPress={this.props.deleteJWT}
          title="LOGOUT"
        />
        <CustomMessage jwt={this.props.jwt} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  logout: {
    position: "absolute",
    top: 0
  }
};
