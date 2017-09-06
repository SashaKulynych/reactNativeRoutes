import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet
} from 'react-native';
import {Icon} from 'native-base';

import { StackNavigator,DrawerNavigator} from 'react-navigation'

import Favorites from './components/Pages/Favorites';
import AddRoute from './components/Pages/AddRoute';
import AddCategory from './components/Pages/AddCategory';
import AllRoutes from './components/Pages/AllRoutes'
import OneRoute from './components/Pages/OneRoute'
import Authorization from './components/Authorization';
import Registration from './components/Registration';

const StackFavoriteRoutes = StackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: (props) => ({
            header:null
        })
    },
    OneRoute:{
        screen: OneRoute,
        navigationOptions: (props) => ({
            header:null
        })
    }
});

const StackAllRoutes = StackNavigator({
    AllRoutes: {
        screen: AllRoutes,
        navigationOptions: (props) => ({
            header:null
        })
    },
    OneRoute:{
        screen: OneRoute,
        navigationOptions: (props) => ({
            header:null
        })
    }
});
const DrawerNav = DrawerNavigator({
    Favorites: {
        screen: StackFavoriteRoutes
    },
    AddRoute: {
        screen: AddRoute
    },
    MyRoutes: {
        screen: Favorites
    },
    AllRoutes: {
        screen: StackAllRoutes
    },
    AddCategory: {
        screen: AddCategory
    }
});
const Stack = StackNavigator({
    Authorization: {
        screen: Authorization,
        navigationOptions:({navigation}) => ({
            title: "Authorization"
        })
    },
    Registration: {
        screen: Registration,
        navigationOptions: (props) => ({
            title: "Registration",
        })
    },
    DrawerNav:{
        screen: DrawerNav,
        navigationOptions: (props) => ({
            title: "Walking route",
            header:null
        })
    }
});

AppRegistry.registerComponent('app', () => Stack);