import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import ObjectifTable from "../components/journal/ObjectifTable";
import PieChart from "../components/pieChart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppStore from "../store/AppStore";
import {inject, observer} from "mobx-react";
import {observable, action} from "mobx";
import AlimentDataService from "../API/Services/aliment.service.js"

interface HomeState  {
}


@inject('store')
@observer
class HomeScreen extends Component<{store: any}, HomeState> {


    constructor(props: any) {
        super(props);

    }


    async show_all() {
            const keys = await AsyncStorage.getAllKeys();
            const jsonTodos = await AsyncStorage.multiGet(keys);

            console.log("clefs :",keys)
    }

    componentDidMount() {
        this.show_all()
    }


    render() {


        return (
            <View style={styles.container}>
                <Text style={styles.today}>Aujourd'hui</Text>

                <View key={this.props.store.macros_of_the_day().kcal}>
                    <ObjectifTable/>
                </View>



            </View>
        );
    }
}

export default HomeScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ECF0F3',
        alignItems: 'center',
    },

    today : {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize : 26,
        marginTop: "5%",
        marginBottom: "5%"
    }

});
