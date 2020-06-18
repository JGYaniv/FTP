import React, { Component, Fragment } from 'react';
import { View, Text, Image } from 'react-native';
import { Input, TextLink, Loading, Button } from './common';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';
import path from '../../config/path'

class CustomMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", contactType: "", contactTypes: []}
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
        .then(contactTypes => {
            whatevers = contactTypes;
            // this.setState({contactTypes: contactTypes.data})
        })
    }

    render() {

        const {text} = this.state;
        return(
        <Fragment>
            <View style={styles.form}>
                <View style={styles.section}>
                    <Text>Imagonnasendyousamessages!</Text>
                </View>
                <View style={styles.section}>
                    <Input 
                        placeholder="Type message here..."
                        label="text"
                        value={text}
                        onChangeText={text => this.setState({ text })}
                    />
                </View>
                {/* <View style={styles.section}>
                        <Text></Text>
                </View> */}
                <Button>Send</Button>
            </View>
        </Fragment>
    )}
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