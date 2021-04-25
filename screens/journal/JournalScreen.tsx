import React, {Component} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ObjectifTable from "../../components/journal/ObjectifTable";
import {daily_meals, Plat, Repas, repas_sample} from "../../services/repas.model"

import { useEffect } from 'react';
import Meal from "../../components/journal/Meal";


import {JournalScreenProps} from "../../navigation/JournalStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {inject, observer} from "mobx-react";
import {Aliment} from "../../services/aliment.model";
import ItemSearch from "../../components/journal/itemSearch";

interface JournalState  {

}

@inject('store')
@observer
export default class JournalScreen extends Component<JournalScreenProps, JournalState> {


    constructor(props: any) {
        super(props);

        this.state = {

        }
    }


    componentDidMount() {
    }

    render() {
        const { navigation } = this.props;
        const { meals } = this.props.store;

        return (
            <View style={styles.container}>
                <View key = {this.props.store.macros_of_the_day().kcal} style={{marginTop:'3%'}}>
                    <ObjectifTable/>
                </View>

                <FlatList
                    data={meals}

                    keyExtractor={(meal: Repas) => meal.identifiant.toString()}

                    renderItem= {({ item } : {item : Repas}) => (
                        <Meal
                            repas={item}
                            navigation={navigation}
                        />

                    )}
                />

                <TouchableOpacity
                    onPress={() =>  this.props.navigation.navigate("Archiver", { data: this.props.store.macros_of_the_day()})}
                    style={styles.btn_archiver}
                >
                    <Text style={{textAlign: 'center', color: 'white'}}>Archiver la journée</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ECF0F3',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btn_archiver: {
        backgroundColor: "#d2995a",
        height: 40,
        width: 100,
        borderRadius: 10,
        padding: 2,
        zIndex: 2,


    }


});
