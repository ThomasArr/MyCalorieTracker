import React, {Component} from "react";
import {Picker, StyleSheet, Text, View} from "react-native";
import {Unit} from "../../../services/aliment.model";

import HistoriqueGraph from "../../../components/journal/historique/HistoriqueGraph";

interface HistoriqueScreenState {
    selectedValue: string
}

const picker_choice = [
    "kcal",
    "protein",
    "lipid",
    "carbohydrate",
    "weight"
]

export default class HistoriqueScreen extends Component<{},HistoriqueScreenState>{

    constructor(props:any) {
        super(props);

        this.state = {
            selectedValue: "kcal"
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <Picker
                    selectedValue={this.state.selectedValue}
                    style={styles.picker}
                    onValueChange={val => this.setState({selectedValue: val})}
                >
                    {
                        picker_choice.map( (val,index) => <Picker.Item key={index} label={val} value={val} />)
                    }
                </Picker>

                <View key={this.state.selectedValue}>
                    <HistoriqueGraph value={this.state.selectedValue}/>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    picker: {
        height: 40,
        width: 150,
        marginTop: '2%',
        marginLeft: 'auto',
        textAlign: "right"
    },
});
