import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              this.props.deleteJWT();
              this.props.clearUserId();}}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
          <CustomMessage jwt={this.props.jwt} userId={this.props.userId} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    // padding: 20,
    flex: 1,
    // width: '100%',
    // height: '100%',
    justifyContent: "center",
    backgroundColor: "#ef7070",
  },
  logout: {
    position: "absolute",
    top: 50,
    left: 5,
    right: 5,
    transform: [
      // {translateX: '-50%'},
      // {translateY: '-50%'},
    ],
    backgroundColor: "#F15656",
    borderRadius: 25,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },

  text: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    paddingTop: 10,
    paddingBottom: 10,
  },
};
