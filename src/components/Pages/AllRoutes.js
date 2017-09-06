import React, { Component } from 'react';
import {AppRegistry,View,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text,CheckBox,ListItem, List } from 'native-base';

class AllRoutes extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    static navigationOptions = {
        drawerLabel: 'All Routes'
    };
    getData(){
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/routes';
        http.open('GET', url);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !=''){
                    this.setState({
                        data:JSON.parse(http.response)
                    })
                }

        };
        http.send(null);
    }
    componentWillMount(){
        this.getData();
    }
    render() {
        return (
            <Content>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x,i)=>i}
                    renderItem={({ item }) => (
                        <List>
                            <ListItem
                                onPress={()=>{
                                    this.props.navigation.navigate('OneRoute',
                                        {
                                            route:item.id
                                        })
                                }}>
                                <Text>Name: {item.name}</Text>
                            </ListItem>
                        </List>
                    )}
                />
            </Content>
        );
    }
}
export default AllRoutes;