import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'

import HomeScreen from "../screens/HomeScreen";
import {StyleSheet} from "react-native";

const Stack = createStackNavigator();


function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
            }}/>
        </Stack.Navigator>
    );
}

export default HomeStack

const styles = StyleSheet.create({
    header:  {
        backgroundColor: "#356592",

    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },

    padding: {
        alignItems: 'center',
        alignContent: 'center',
    }
})
