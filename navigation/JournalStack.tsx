import {createStackNavigator} from '@react-navigation/stack';
import React from 'react'
import { StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';
import {Plat} from "../services/repas.model";
import {StyleSheet} from "react-native";
import DetailsAlimentScreen from "../screens/journal/DetailsAlimentScreen";
import {Aliment} from "../services/aliment.model";
import SearchAlimentScreen from "../screens/journal/SearchAlimentScreen";
import JournalTopTab from "./JournalTopTab"
import ArchiverScreen from "../screens/journal/Historique/ArchiverScreen";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Journal : undefined
    Détails : { plat : Plat, meal_id: number, plat_id: number, isCreation: boolean};
    Recherche: { meal_id: number }
    Archiver: { data: object}

};

function JournalStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Journal" component={JournalTopTab}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />
            <Stack.Screen name="Détails" component={DetailsAlimentScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />
            <Stack.Screen name="Recherche" component={SearchAlimentScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />
            <Stack.Screen name="Archiver" component={ArchiverScreen}
                          options={ {
                              headerStyle : styles.header,
                              headerTitleStyle: styles.title,
                              headerTitleContainerStyle: styles.padding
                          }}
            />

        </Stack.Navigator>
    );
}

export default JournalStack

export interface DetailsAlimentScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Détails">;
    route: RouteProp<RootStackParamList, "Détails">
    plat: Plat
    plat_id: number
    meal_id: number
    isCreation: boolean
    store: any
}

export interface JournalScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Journal">;
    route: RouteProp<RootStackParamList, "Journal">
    meal : string;
    aliments : Array<Aliment>
    store: any
}

export interface RechercheScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Recherche">;
    route: RouteProp<RootStackParamList, "Recherche">
}

export interface ArchiverScreenProps {
    navigation: StackNavigationProp<RootStackParamList, "Recherche">;
    route: RouteProp<RootStackParamList, "Recherche">
    data: {
        protein: string,
        lipid: string,
        carbohydrate: string,
        kcal: string,
        weight: string
    }
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
