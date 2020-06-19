import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Login, Registration } from '../components';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: false
    };
    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  whichForm() {
    if(!this.state.showLogin){
      return(
        <Registration newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
      );
    } else {
      return(
        <Login newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.fontSize}>FIGHT THE POWER</Text>
        <Image source={require("./img/flag.png")} />
        {this.whichForm()}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f72c2c",
  },

  ftp: {
    fontSize: 30,
  }
};
