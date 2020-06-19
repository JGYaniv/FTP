import React, { Component, Fragment } from 'react';
import { View, Text, Image, Picker, Button } from "react-native";
import { Input, TextLink, Loading } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import path from '../../config/path'

class CustomMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", contactType: "", contactIdx:"", contactTypes: []}
    }

    componentDidMount(){
        const headers = {
            'Authorization': this.props.jwt
        };
        let whatevers;
        axios.get(path + '/api/contact_types', {
            headers: {
                Authorization: headers.Authorization
            }
        })
        .then(contactTypes => (
            contactTypes ? this.setState({contactTypes: contactTypes.data}) : ""
        ))
        .catch(e => console.log(e))
    }

    render() {
        const {text, contactTypes, contactType} = this.state;

        const Types = () => (
          <Picker
            style={{ height: 50, width: 150, color: "black" }}
            selectedValue={contactType}
            onValueChange={(contactType, contactIdx) => this.setState({contactType}) }
          >
            {
                contactTypes.map((type, typeIdx) => (
                    <Picker.Item
                        label={type.name}
                        key={typeIdx}
                        value={type.name}
                        style={{ color: "black" }}
                    />
                ))
            }
          </Picker>
        );

        return (
          <Fragment>
            <View style={styles.form}>
              <View style={styles.section}>
                <Text>Enter a message to send: </Text>
              </View>
              
              <View style={styles.section}>
                <Input
                  placeholder="Type message here..."
                  label="text"
                  value={text}
                  onChangeText={(text) => this.setState({ text })}
                />
              </View>

              <View style={styles.section}>
                <Types />
              </View>
            </View>

            <Button
                style={{ position: "absolute", bottom:0 }}
                title="Send"
            />
          </Fragment>
        );}
}
const styles = {
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
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
        color: 'red'
    }
};
export {CustomMessage}