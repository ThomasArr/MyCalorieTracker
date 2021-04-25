import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Picker, TextInput} from 'react-native';
import {Aliment, Unit} from "../../services/aliment.model";

import { DetailsAlimentScreenProps } from "../../navigation/JournalStack";
import {inject, observer} from "mobx-react";

import { createViewModel } from 'mobx-utils'
import {empty_plat} from "../../services/repas.model";


interface DetailsAlimentScreenState  {
    selectedUnit : Unit
    nb_portions: string
    protein_ratio: string
    carbohydrate_ratio: string
    lipid_ratio: string
}

@inject('store')
@observer
export default class DetailsAlimentScreen extends Component<DetailsAlimentScreenProps, DetailsAlimentScreenState> {


    constructor(props: any) {
        super(props);

        this.state = {
            selectedUnit: {name: "",weight : ""},
            nb_portions: "1",
            protein_ratio: "",
            carbohydrate_ratio: "",
            lipid_ratio: ""
        }

    }

    update_unit(nom: string) {

        let unit = this.props.route.params.plat.aliment.units.find((unit: Unit)=> unit.name == nom) || {name: "", weight: ""};

        this.setState({selectedUnit: unit})

    }

    _onQuantityChange(val: string) {
        this.setState({nb_portions: val})
    }

    button_name() {
        if (this.props.route.params.isCreation) {
            return <Text>Ajouter</Text>;
        }
        else return <Text>Valider</Text>;
    }

    componentDidMount() {
            const plat = this.props.route.params.plat;

            this.setState({
                selectedUnit : plat.unit,
                nb_portions : plat.nb_portions,
                protein_ratio: Math.round(parseInt(plat.aliment.protein)*4/parseInt(plat.aliment.kcal) * 100).toString(),
                carbohydrate_ratio: Math.round(parseInt(plat.aliment.carbohydrate)*4/parseInt(plat.aliment.kcal) * 100).toString(),
                lipid_ratio: Math.round(parseInt(plat.aliment.lipid)*9/parseInt(plat.aliment.kcal) * 100).toString(),
            });


    }


    onButtonClick = () => {
        let new_plat;

        if (!this.props.route.params.isCreation){
            new_plat = createViewModel(this.props.route.params.plat);

            new_plat.nb_portions = this.state.nb_portions;
            new_plat.unit = this.state.selectedUnit;

            this.props.store.modify_plat(
                this.props.route.params.meal_id,
                this.props.route.params.plat_id,
                new_plat)
        }

        else {
            new_plat= this.props.route.params.plat;

            new_plat.nb_portions = this.state.nb_portions;
            new_plat.unit = this.state.selectedUnit;

            this.props.store.create_plat(
                this.props.route.params.meal_id,
                new_plat
            )
        }

    }


    render() {

        const aliment = this.props.route.params.plat.aliment;


        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={ styles.margin}>
                    <Text style={styles.title} >{aliment.name}</Text>

                    <View style={styles.row}>
                        <Text>Nombre de portions : </Text>
                        <TextInput

                            value={this.state.nb_portions}
                            placeholder={"quantité"}
                            onChangeText={text => this._onQuantityChange(text)}
                            style={{width: '40%', textAlign: "right", marginLeft: 'auto', marginRight: "5%"}}
                        />

                    </View>


                    <View style={styles.unit}>
                        <Text>Taille de la portion : </Text>
                        <Picker
                            selectedValue={this.state.selectedUnit.name}
                            style={styles.picker}
                            onValueChange={(index) => this.update_unit(index)}
                        >
                            {
                                aliment.units.map( (unit : Unit,index : number) => {
                                    let name;
                                    if (unit.name!= "g" && unit.weight !="1") {name = "1 "+unit.name+" ( "+unit.weight+"g )"}
                                    else name = unit.name;
                                    return <Picker.Item key={index} label={name} value={unit.name} />
                                })
                            }

                        </Picker>

                    </View>

                    <View style={styles.macros} key={this.state.nb_portions}>
                        <View style={styles.macro_column}>
                            <Text style={[ styles.macro_value, {color: "#CE6D36"}]}>{this.state.protein_ratio} %</Text>
                            <Text style={styles.text_center}>
                                { Math.round(parseInt(this.state.nb_portions) * parseInt(this.state.selectedUnit.weight) / 100 * aliment.protein) || 0}
                            </Text>
                            <Text style={styles.text_center}>Protéines</Text>
                        </View>
                        <View style={styles.macro_column}>
                            <Text style={[ styles.macro_value, {color: "#38C2B2"}]}>{this.state.carbohydrate_ratio} %</Text>
                            <Text style={styles.text_center}>
                                {Math.round(parseInt(this.state.nb_portions) * parseInt(this.state.selectedUnit.weight) / 100 * aliment.carbohydrate) || 0}
                            </Text>
                            <Text style={styles.text_center}>Glucides</Text>
                        </View>
                        <View style={styles.macro_column}>
                            <Text style={ [ styles.macro_value, {color : "#1B658E"} ]}> {this.state.lipid_ratio} %</Text>
                            <Text style={styles.text_center}>
                                {Math.round(parseInt(this.state.nb_portions) * parseInt(this.state.selectedUnit.weight) / 100 * aliment.lipid) || 0}
                            </Text>
                            <Text style={styles.text_center}>Lipides</Text>
                        </View>

                    </View>
                </View>


                <TouchableOpacity style={styles.button} onPress={() => { this.onButtonClick(); navigation.navigate("Journal")}}>
                    {this.button_name()}
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        margin : "5%"
    },

    title : {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize : 26,
        marginTop: "5%",
        marginBottom: "5%",
        textAlign: 'center'
    },

    unit: {
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: "row"
    },

    picker: {
        height: 40,
        width: 150,
        marginTop: '2%',
        marginLeft: 'auto',
        textAlign: "right"
    },

    margin: {
        margin: "5%"
    },

    row: {
        flexDirection: "row"
    },

    button: {
        marginTop: 'auto',
        marginLeft: 'auto',
        marginBottom: '15%',
        marginRight: '15%',
        borderRadius: 10,
        padding: "3%",
        backgroundColor: "#1382cb"
    },

    macro_column : {
        flex: 1
    },

    text_center: {
        textAlign: 'center'
    },
    macros: {
        flexDirection: 'row',
        marginTop: '30%',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%'
    },

    macro_value:  {
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        textAlign: 'center'
    }

});
