import React, { Component } from 'react';
import {AppRegistry,AsyncStorage} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label,Button,Text } from 'native-base';
import {styles} from './styles'
class Authorization extends Component {
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:""
        };
    }
    async userCheck(){
        let value = JSON.parse(await AsyncStorage.getItem('USER_SUCCESS'));
        if (value !== null)this.props.navigation.navigate('DrawerNav')
    }
    componentDidMount(){
        try {
            this.userCheck()
        } catch (error) {}

    }
    login(){
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/users?email='+this.state.email+'&password='+this.state.password,true);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if(http.response!=="") {
                    AsyncStorage.setItem('USER_SUCCESS',JSON.stringify(http.response))
                    this.props.navigation.navigate('DrawerNav')
                }
                else alert("E-mail or password incorrect!")
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
                                   onChangeText={(text)=> this.setState({email: text})} />
                        </Item>
                        <Item last>
                            <Input placeholder="Password" onChangeText={(text)=>this.setState({password: text})}/>
                        </Item>
                    </Form>
                    <Container>
                        <Button style={styles.buttons} block onPress={() => this.login()}>
                            <Text>Login</Text>
                        </Button>
                        <Button style={styles.buttons} block onPress={() => this.props.navigation.navigate("Registration")}>
                            <Text>Registration</Text>
                        </Button>
                    </Container>
                </Content>
            </Container>
        );
    }
}
export default Authorization;