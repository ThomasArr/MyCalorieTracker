import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import TableRow from "./tableRow";
import {inject, observer} from "mobx-react";

interface datasheetObjectifState  {
    profile: object
    tableHead: Array<string>
    tableData: Array<string>
    tablePercent: Array<string>
    tableObjectif: Array<string>
}

interface datasheetObjectifProps {

}

@inject('store')
@observer
export default class objectifTable extends Component<datasheetObjectifProps, datasheetObjectifState> {


    constructor(props: any) {
        super(props);

        this.state = {
            tableHead: ['P', 'G', 'L', 'Cal'],
            tableData: ['0','0','0','0'],
            tablePercent: ['0%','0%','0%','0%'],
            tableObjectif: ['0','0','0','0'],
            profile: {}
        }

    }


    init_data() {
        console.log(this.props.store.profile)
        const macros = this.props.store.macros_of_the_day();
        const objectifs = this.props.store.get_objectifs()

        const new_tabla_data = [
            macros.protein,
            macros.carbohydrate,
            macros.lipid,
            macros.kcal ]

        const new_table_objectif = [
            " / " + objectifs.objectif_protein,
            " / " + objectifs.objectif_glucid,
            " / " + objectifs.objectif_lipid,
            " / " + objectifs.objectif_kcal,
        ]

        let new_table_percent = ["-- %", "-- %", "-- %", "-- %"]
        if (objectifs.objectif_kcal != "") {
            new_table_percent = [
                Math.round(macros.protein / objectifs.objectif_protein * 100).toString() + " %",
                Math.round(macros.carbohydrate / objectifs.objectif_glucid * 100).toString()  + " %",
                Math.round(macros.lipid / objectifs.objectif_lipid * 100).toString() + " %",
                Math.round(macros.kcal / objectifs.objectif_kcal * 100).toString() + " %",
            ]
        }


        this.setState({
            tableData: new_tabla_data,
            tableObjectif: new_table_objectif,
            tablePercent: new_table_percent
        })

    }

    componentDidMount() {
        this.setState({
            profile: this.props.store.profile || {}
        })

        this.init_data()
    }

    render() {
        return (
            <View style={styles.container}>
                <TableRow row={this.state.tableHead} objectif={["", "", "", ""]} />
                <TableRow row={this.state.tableData} objectif={this.state.tableObjectif}/>
                <TableRow row={this.state.tablePercent} objectif={["", "", "", ""]}/>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        width: 300,
        height: 60,
        flexDirection: 'column',
        borderWidth: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,

    },



});
