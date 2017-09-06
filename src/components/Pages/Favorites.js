import React, { Component } from 'react';
import {AppRegistry,View,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text,CheckBox,ListItem, List } from 'native-base';
class Favorites extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    static navigationOptions = {
        drawerLabel: 'Favorites'
    };
    getData(){
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/favorites';
        http.open('GET', url);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !='[]'){
                    this.setState({
                        data:JSON.parse(http.response)
                    })
                }

        };
        http.send(null);
    }
    componentDidMount(){
        this.getData();
    }
    async fetchName(id,resource,value){
        let url = 'http://localhost:3000/'+resource +"/"+id;
        return await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                let name = json[value];
                return name;
            });
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
                                            route:item.route
                                        })
                                }}>
                                <Text>Name: {console.log(this.fetchName(item.route, "routes","name"))}</Text>
                            </ListItem>
                        </List>
                    )}
                />
            </Content>
        );
    }
}
export default Favorites;