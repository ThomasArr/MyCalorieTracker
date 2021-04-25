import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Aliment, Unit} from "../../services/aliment.model";
import { MaterialIcons } from '@expo/vector-icons';
import {Repas} from "../../services/repas.model"
import Plat from "./platHeader"
import {inject, observer} from "mobx-react";



interface mealState  {
}

interface mealProps {
    repas : Repas
    navigation: any
}

@inject('store')
@observer
export default class Meal extends Component<mealProps, mealState> {


    constructor(props: any) {
        super(props);

        this.state = {}

    }


    componentDidMount() {

    }


    render() {

        const { navigation } = this.props;


        return (
            <View style={styles.container} >
                <View style={styles.title}>
                    <Text style={styles.title_font}>{this.props.repas.nom} </Text>

                    <Text style={[styles.title_font, {marginLeft: 'auto'}]}>{this.props.store.kcal_of_a_meal(this.props.repas.identifiant)}kcal </Text>
                </View>

                    {
                        this.props.repas.repas.map(
                            (plat,index) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[index%2==0 ? {backgroundColor: 'white'} : {backgroundColor: '#E9E9E9'},
                                        styles.meal_container]}
                                        onPress={() => navigation.navigate("Détails", { meal_id : this.props.repas.identifiant, plat_id: plat.identifiant, plat: plat ,isCreation: false })}
                                    >
                                        <Plat plat={plat}/>
                                    </TouchableOpacity>

                                )
                            }  // This will render a row for each data element.
                        )
                    }
                    <TouchableOpacity
                        style={[styles.add_button,
                        [this.props.repas.repas.length%2==0 ? {backgroundColor: 'white'} : {backgroundColor: '#E9E9E9'},
                            styles.meal_container]]}
                        onPress={() => navigation.navigate("Recherche", {meal_id : this.props.repas.identifiant})}
                    >
                        <MaterialIcons size={24} name="add-circle-outline"/>
                    </TouchableOpacity>

            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        width: 300,
        flexDirection: 'column',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,

        marginTop: '5%'
    },

    title : {
        backgroundColor: "#BB4503",
        Height : 30,
        flexDirection: "row"

    },

    title_font : {
        fontSize: 22,
        color: 'white',
        marginLeft: '5%'

    },

    meal_container: {
        height: 25
    },

    add_button: {
        height: 25,
        alignItems: 'center'
    }



});
