import * as React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JournalStack from "./JournalStack";
import HistoriqueScreen from "../screens/journal/Historique/HistoriqueScreen";
import {StyleSheet} from "react-native";
import JournalScreen from "../screens/journal/JournalScreen";


const Tab = createMaterialTopTabNavigator();

export const JournalTopTab = () => {
    return (

            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#1743aa',
                }}

            >
                <Tab.Screen
                    name="Aujourd'hui"
                    component={JournalScreen}
                />
                <Tab.Screen
                    name="Historique"
                    component={HistoriqueScreen}
                />
            </Tab.Navigator>
    )
}

export default JournalTopTab
