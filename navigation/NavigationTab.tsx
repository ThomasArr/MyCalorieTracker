import * as React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';


import ProfileStack from "./ProfileStack"
import HomeStack from "./HomeStack"
import JournalStack, {RootStackParamList} from "./JournalStack"
import FridgeStack from "./FridgeStack"
import {StackNavigationProp} from "@react-navigation/stack";

import JournalTopTab from "./JournalTopTab"

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                tabBarOptions={{
                    activeTintColor: '#1743aa',
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" color={color} size={size} />
                        ),
                    }}

                />
                <Tab.Screen
                    name="Journal"
                    component={JournalStack}
                    options={{
                        tabBarLabel: 'Journal',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="book" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Aliments"
                    component={FridgeStack}
                    options={{
                        tabBarLabel: 'Fridge',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="kitchen" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                    options={{
                        tabBarLabel: 'Profil',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="settings" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

