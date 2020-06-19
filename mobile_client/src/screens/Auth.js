import React, { Component } from 'react';
import { View, Text, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
        <Registration newJWT={this.props.newJWT} authSwitch={this.authSwitch} setUserId={this.props.setUserId}/>
      );
    } else {
      return(
        <Login newJWT={this.props.newJWT} authSwitch={this.authSwitch} setUserId={this.props.setUserId}/>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.ftp}>
            FIGHT THE <Text style={styles.red}>POWER</Text>
          </Text>
          <Image style={styles.flag} source={require("./img/flag.png")} />
          {this.whichForm()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ef7070",
  },

  ftp: {
    fontSize: 30,
    fontWeight: "600",
    position: "absolute",
    left: 69,
    top: 215,
    color: "#FFF",
    zIndex: 10,
    // transform: [{rotate: "7deg"}]
  },

  red: {
    color: "red",
    fontWeight: "900",
  },

  flag: {
    position: "absolute",
    bottom: "50%",
  },
};
