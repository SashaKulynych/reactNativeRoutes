import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {styles} from './styles'
class Registration extends Component {
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
            uniqueEmail:""
        };
    }
    AddUser(){
        let r = /^\w+@\w+\.\w{2,4}$/i;
        if (!r.test(this.state.email)) {
            return (
               alert("Not correct e-mail!")
            )
        }
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/users?email='+this.state.email);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if (http.response == "") {
                    fetch('http://localhost:3000/users', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": this.state.email,
                            "password": this.state.password
                        })
                    });
                    alert("User add please log in!")
                    this.props.navigation.navigate('Authorization')
                }
                else alert("E-mail exist!")
            }
        };
        http.send(null);
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input keyboardType="email-address" placeholder="E-mail"
                                   onChangeText={(text)=> this.setState({email: text})} placeHolder/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password"
                                   onChangeText={(text)=>this.setState({password: text})}/>
                        </Item>
                    </Form>
                    <Container>
                        <Button style={styles.buttons} block onPress={() => this.AddUser()}>
                            <Text>Registration</Text>
                        </Button>
                    </Container>
                </Content>
            </Container>
        );
    }
}
export default Registration;