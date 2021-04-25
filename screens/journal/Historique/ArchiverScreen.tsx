import React, {Component} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import { ArchiverScreenProps} from "../../../navigation/JournalStack";

import HistoriqueDataService from "../../../API/Services/historique.service.js"
import {inject, observer} from "mobx-react";

interface ArchiverState {
    protein: string,
    lipid: string,
    carbohydrate: string,
    kcal: string,
    weight: string
}

@inject('store')
@observer
export default class ArchiverScreen extends Component<ArchiverScreenProps,ArchiverState>{
    constructor(props: any) {
        super(props);

        this.state = {
            protein: "",
            lipid: "",
            kcal: "",
            carbohydrate: "",
            weight: ""
        }
    }

    componentDidMount() {
        console.log("dd", this.props.route)

        // @ts-ignore
        const data = this.props.route.params.data

        this.setState({
            protein: data.protein,
            carbohydrate: data.carbohydrate,
            lipid: data.lipid,
            kcal: data.kcal,
            weight: data.weight
        })
    }

    onSubmit() {
        const recap= {
            quantity: this.state.weight,
            lipid: this.state.lipid,
            protein: this.state.protein,
            carbohydrate: this.state.carbohydrate,
            kcal: (4* parseInt(this.state.protein) + 4* parseInt(this.state.carbohydrate) + 9* parseInt(this.state.lipid)).toString(),
            date: new Date().getDate()
        }

        console.log(recap)

        HistoriqueDataService.create(recap)

        this.props.store.reset_meals_of_the_day();
        this.props.navigation.navigate("Journal")

    }


    render() {
        return (
            <View style={styles.container}>


                <View style={styles.form}>
                    <Text style={styles.head_title}>Résumé de la journée</Text>
                    <View style={styles.row}>
                        <Text style={styles.row_title}>Poids des repas :</Text>
                        <TextInput style={styles.input} value={this.state.weight} onChangeText={val => this.setState({weight: val})}/>
                        <Text style={styles.unit}>g</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.row_title}>Protéines :</Text>
                        <TextInput style={styles.input} value={this.state.protein} onChangeText={val => this.setState({protein: val})}/>
                        <Text style={styles.unit}>g</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.row_title}>Glucides :</Text>
                        <TextInput style={styles.input} value={this.state.carbohydrate} onChangeText={val => this.setState({carbohydrate: val})}/>
                        <Text style={styles.unit}>g</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.row_title}>Lipides :</Text>
                        <TextInput style={styles.input} value={this.state.lipid} onChangeText={val => this.setState({lipid: val})}/>
                        <Text style={styles.unit}>g</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.row_title}>Kcal :</Text>
                        <Text style={styles.input}>{ (4* parseInt(this.state.protein) + 4* parseInt(this.state.carbohydrate) + 9* parseInt(this.state.lipid)).toString() }</Text>
                        <Text style={styles.unit}>kcal</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
                        <Text style={ {textAlign: 'center', textAlignVertical: 'center'}}>Archiver la journée</Text>
                    </TouchableOpacity>

                </View>



            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    form: {
        borderRadius: 10,
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,

        margin: '5%',
        flex: 1,
        padding: '5%'
    },

    row: {
        flexDirection: 'row',
        marginTop: '5%'
    },

    head_title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign:'center'
    },

    row_title: {
        fontSize: 14,
        fontWeight: 'bold'
    },

    input: {
        textAlign: 'center',
        width: 100,
        marginLeft: 'auto'
    },

    unit: {
        marginRight: '10%'
    },
    button: {
        backgroundColor: "#6dbd55",
        height: 50,
        width: 100,
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: '5%',
        marginLeft: 'auto',
    }
});
