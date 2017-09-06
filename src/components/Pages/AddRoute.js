import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

class AddRoute extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            description:'',
            length:0,
            categories:[]
        }
    }
    static navigationOptions = {
        drawerLabel: 'Add Route'
    };
    categories(){
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/categories';
        http.open('GET', url);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !=''){
                    this.setState({
                        categories:JSON.parse(http.response)
                    })
                }

        };
        http.send(null);
    }
    componentDidMount(){
        this.categories();
    }
    addRoute(){
        fetch('http://localhost:3000/routes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": this.state.name,
                "description": this.state.description,
                "length":this.state.length
            })
        });
        alert("Route add");
    }
    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input onChangeText={(text)=>this.setState({name: text})}
                                   placeholder="Route name" />
                        </Item>
                        <Item>
                            <Input onChangeText={(text)=>this.setState({description: text})}
                                   placeholder="Route description" />
                        </Item>
                        <Item>
                            <Input keyboardType="numeric" onChangeText={(text)=>this.setState({length: text})}
                                   placeholder="Route Length" />
                        </Item>
                        <Button block onPress={() => this.addRoute()}>
                            <Text>Add</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default AddRoute;