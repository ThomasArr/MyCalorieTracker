import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack';
import React from 'react'

import FridgeScreen from "../screens/Fridge/FridgeScreen";
import FridgeAlimentScreen from "../screens/Fridge/FridgeAlimentScreen";
import FridgeRecipeScreen from "../screens/Fridge/FridgeRecipeScreen";

import FridgeAddTopTab from"./FridgeAddTopTab"

import {StyleSheet} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {Aliment} from "../services/aliment.model";

const Stack = createStackNavigator();

export type RootStackParamList = {
    Fridge : undefined
    FridgeAliment: { isCreation: boolean, aliment: Aliment}
    AddFood: undefined

};

function FridgeStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Fridge" component={FridgeScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />
            <Stack.Screen name="FridgeAliment" component={FridgeAlimentScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />
            <Stack.Screen name="AddFood" component={FridgeAddTopTab}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />

        </Stack.Navigator>
    );
}

export default FridgeStack

export interface FridgeScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Fridge">;
    route: RouteProp<RootStackParamList, "Fridge">
}

export interface FridgeAlimentScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "FridgeAliment">;
    route: RouteProp<RootStackParamList, "FridgeAliment">;
    isCreation: boolean,
    aliment: Aliment
}

export interface  FridgeAddScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "AddFood">;
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
