import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import React from 'react'

import ProfileScreen from "../screens/profile/ProfileScreen";
import Metabolism from "../screens/profile/MetabolismeScreen";
import {StyleSheet} from "react-native";
import {RootStackParamList} from "./JournalStack";
import {RouteProp} from "@react-navigation/native";

const Stack = createStackNavigator();


function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Mon compte" component={ProfileScreen}
                          options={ {
                headerStyle : styles.header,
                headerTitleStyle: styles.title,
                headerTitleContainerStyle: styles.padding
            }}/>
            <Stack.Screen name="Mon métabolisme" component={Metabolism}
                          options={ {
                headerStyle : styles.header,
                headerTitleStyle: styles.title,
                headerTitleContainerStyle: styles.padding
            }}/>
        </Stack.Navigator>
    );
}

export default ProfileStack

export interface MetabolismeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Recherche">;
    route: RouteProp<RootStackParamList, "Recherche">;
    store: any
}

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
