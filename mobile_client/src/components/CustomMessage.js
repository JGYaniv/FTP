import React, { Component, Fragment } from 'react';
import { View, Text, Image, Picker, TouchableOpacity, TextInput } from "react-native";
import { Input, TextLink, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import path from '../../config/path'

class CustomMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", contactType: "", contactIdx:"", status:"", contactTypes: []}
        this.submitHandler = this.submitHandler.bind(this)
    }

    componentDidMount(){
        const headers = {
            'Authorization': this.props.jwt
        };
        axios.get('https://ftp-crm.herokuapp.com/api/contact_types', {
            headers: {
                Authorization: headers.Authorization
            }
        })
        .then(contactTypes => (
            contactTypes ? this.setState({contactTypes: contactTypes.data}) : ""
        ))
        .catch(e => console.log(e))
    }

    submitHandler(){
      const { text, contactType } = this.state;
      const userId = this.props.userId;
      const auth = this.props.jwt;

      axios
        .post("https://ftp-crm.herokuapp.com/api/messages", {
          text: text,
          contactType: contactType,
          authorId: userId, 
        },
        {
          headers: {
            Authorization: auth,
          }
        })
        .then((res) => {
          this.setState({
            text: "",
            contactType: "",
            contactIdx: "",
            status: "sent"
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }

    render() {
        const {text, contactTypes, contactType} = this.state;

        const Types = () => (
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={contactType}
            onValueChange={(contactType, contactIdx) =>
              this.setState({ contactType })
            }
          >
            {contactTypes.map((type, typeIdx) => (
              <Picker.Item
                label={type.name}
                key={typeIdx}
                value={type.name}
              />
            ))}
          </Picker>
        );

        return (
          <Fragment>
            <View style={styles.form}>
              <TextInput
                style={styles.tinput}
                multiline
                placeholder="Type message here..."
                defaultValue={this.state.text}
                onChangeText={(text) => this.setState({ text })}
              ></TextInput>

              <Text style={styles.type}>Scroll to Contact Type</Text>
              <Types />
            </View>
            <Text style={styles.status}>{this.state.status}</Text>
            <TouchableOpacity style={styles.send} onPress={this.submitHandler}>
              <Text style={styles.text}>Send</Text>
            </TouchableOpacity>
          </Fragment>
        );}
}
const styles = {
    form: {
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section: {
        flexDirection: 'row',
        height: 150,
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: 'black',
    },
    text: {
      alignSelf: "center",
      color: "white",
      fontSize: 18,
      fontWeight: "700",
      paddingTop: 10,
      paddingBottom: 10,
    },

    send: {
      position: "absolute",
      bottom: 50,
      left: 5,
      right: 5,
      transform: [
      ],
      backgroundColor: "#F15656",
      borderRadius: 25,
      borderColor: 'black',
      borderWidth: 1,
      padding: 10
    },

    picker: {
      height: 100,
      color: "#F15656",
      backgroundColor: "#fff",
    },

    pickerItem: {
      color: '#F15656',
      height: 100,
    },

    tinput: {
      flexDirection: 'row',
      height: 100,
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      borderColor: 'black',
      fontSize: 20,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10
    },

    type: {
      fontSize: 18,
      position: 'absolute',
      left: 110,
      bottom: 70,
      zIndex: 5
    },

    status: {
      fontSize: 18,
      color: "green",
      justifyContent: "center"
    }
};

export {CustomMessage}