import React, { Component } from 'react';
import {AppRegistry,View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text,CheckBox,ListItem, List } from 'native-base';
class OneRoute extends Component {
    constructor(props){
        super(props);
        this.state={
            dataRoute:[],
            dataFavorite:[],
            checked:false
        }
    }
    checkFavorite(){
        const {state} = this.props.navigation;
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/favorites?route='+state.params.route;
        http.open('GET', url);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (http.response !='[]'){
                    this.setState({
                        checked:true,
                        dataFavorite:JSON.parse(http.response)
                    })
                }
        };
        http.send(null);
    }
    checkChange(){
        let http = new XMLHttpRequest();
        if(this.state.checked==true){
            let url = 'http://localhost:3000/favorites/'+this.state.dataFavorite.id;
            http.open("DELETE", url);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(null);
        }
        else{
            let url='http://localhost:3000/favorites';
            http.open("POST",url);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(
                JSON.stringify({
                    "route": this.state.dataRoute.id
                })
            )
        }
        let checkedFavorite = !this.state.checked;
        this.setState({
            checked:checkedFavorite
        })
    }
    componentWillMount(){
        const {state} = this.props.navigation;
        let http = new XMLHttpRequest();
        let url = 'http://localhost:3000/routes/'+state.params.route;
        http.open('GET', url);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200)
                if (JSON.parse(http.response) !=[]){
                    this.setState({
                        dataRoute:JSON.parse(http.response)
                    })
                }
        };
        http.send(null);
        this.checkFavorite();
    }
    render() {
        return (
            <List>
                <ListItem>
                    <Text>Name: {this.state.dataRoute.name}</Text>
                </ListItem>
                <ListItem>
                    <Text>Description: {this.state.dataRoute.description}</Text>
                </ListItem>
                <ListItem>
                    <Text>Category: {this.state.dataRoute.category}</Text>
                </ListItem>
                <ListItem>
                    <Text>Length: {this.state.dataRoute.length}</Text>
                </ListItem>
                <ListItem>
                    <CheckBox checked={this.state.checked}
                              onPress={() => this.checkChange()}
                    />
                    <Body>
                        <Text>Favorite</Text>
                    </Body>
                </ListItem>
            </List>
        );
    }
}
export default OneRoute;