import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoriqueScreen from "../screens/journal/Historique/HistoriqueScreen";
import JournalScreen from "../screens/journal/JournalScreen";

import FridgeAlimentScreen from "../screens/Fridge/FridgeAlimentScreen";
import FridgeRecipeScreen from "../screens/Fridge/FridgeRecipeScreen";

const Tab = createMaterialTopTabNavigator();

export const JournalTopTab = () => {

    return (

        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#1743aa',
            }}
        >
            <Tab.Screen
                name="Ajouter un aliment"
                component={FridgeAlimentScreen}
            />
            <Tab.Screen
                name="Créer une recette"
                component={FridgeRecipeScreen}
            />
        </Tab.Navigator>
    )
}

export default JournalTopTab
