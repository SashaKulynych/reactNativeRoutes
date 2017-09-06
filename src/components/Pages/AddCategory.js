import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base';

class MyCategories extends Component {
    constructor(props){
        super(props);
        this.state={
            categoryName:''
        }
    }
    static navigationOptions = {
        drawerLabel: 'Add category'
    };
    componentDidMount(){

    }
    addCategory(){
        let http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/categories?name='+this.state.categoryName);
        http.setRequestHeader("Content-Type", "application/json");
        http.responseType = 'json';
        http.onload = ()=> {
            if (http.readyState==4 && http.status == 200) {
                if (http.response == "") {
                    fetch('http://localhost:3000/categories', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "name": this.state.categoryName
                        })
                    });
                    alert("Category add");
                }
                else alert("Category exist!")
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
                            <Input onChangeText={(text)=>this.setState({categoryName: text})}
                                   placeholder="Category name" />
                        </Item>
                        <Button block onPress={() => this.addCategory()}>
                            <Text>Add</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
export default MyCategories;