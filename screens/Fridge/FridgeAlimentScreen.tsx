import React, { Component } from "react";
import {StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Picker, Alert} from 'react-native';
import {Aliment, empty_aliment, Unit} from "../../services/aliment.model";

import AlimentDataService from "../../API/Services/aliment.service.js"

import { FridgeAlimentScreenProps} from "../../navigation/FridgeStack";
import PieChart from "../../components/pieChart";

interface AlimentItemState {
    aliment : Aliment
    protein_ratio: string
    carbohydrate_ratio: string
    lipid_ratio: string
    new_unit_name: string,
    new_unit_weight: string
    isCreation: boolean
}

export default class FridgeAlimentScreen extends Component<FridgeAlimentScreenProps, AlimentItemState> {


    constructor(props: any) {
        super(props);

        this.state = {
            aliment: empty_aliment,
            protein_ratio: "0",
            carbohydrate_ratio: "0",
            lipid_ratio: "0",
            new_unit_name: "",
            new_unit_weight: "",
            isCreation: true
        }
    }

    modify_aliment= (field: string, value: string) => {
        let new_aliment = this.state.aliment;
        if (field=="protein" || field=="lipid" || field=="carbohydrate"){
            if (parseInt(value) > 100) {
                new_aliment[field] = 100;
            }
            else new_aliment[field] = value;

            const kcal = parseInt(new_aliment.lipid)*9 + parseInt(new_aliment.protein)*4 + parseInt(new_aliment.carbohydrate)*4;
            new_aliment["kcal"]=kcal.toString();


            this.setState({
                aliment: new_aliment,
                protein_ratio: Math.round(parseInt(new_aliment.protein)*4/kcal * 100).toString(),
                carbohydrate_ratio: Math.round(parseInt(new_aliment.carbohydrate)*4/kcal * 100).toString(),
                lipid_ratio: Math.round(parseInt(new_aliment.lipid)*9/kcal * 100).toString(),
            })
        }
        else {
            new_aliment[field] = value;
            this.setState({
                aliment: new_aliment,
            })
        }
    }


    Titre() {
        if (this.state.isCreation) {
            return <Text style={styles.title}> Création </Text>;
        }
        return <Text style={styles.title}> Détails </Text>;
    }

    Button_title() {
        if (this.state.isCreation) {
            return <Text > Créer </Text>;
        }
        return <Text > Modifier </Text>;
    }

    onClickButton() {

        if (!isNaN(parseInt(this.state.aliment.kcal)) && this.state.aliment.name != "") {
            if (this.state.isCreation) {
                AlimentDataService.create(this.state.aliment);
                this.setState({
                    aliment: empty_aliment,
                    protein_ratio: "0",
                    carbohydrate_ratio: "0",
                    lipid_ratio: "0",
                    new_unit_name: "",
                    new_unit_weight: "",
                })
                this.props.navigation.navigate("Fridge")
            }
            else {

                AlimentDataService.update(this.state.aliment.id,this.state.aliment)
            }
        }
        else {
            console.log("cc")
        }
    }

    _addUnit() {
        if (this.state.new_unit_weight != "" && this.state.new_unit_name){
            const unit = { name: this.state.new_unit_name, weight: this.state.new_unit_weight}
            let aliment = this.state.aliment;
            aliment.units.push(unit);
            this.setState({aliment: aliment})
        }
        else {

        }
    }

    componentDidMount() {
        if (this.props.route.params) {
            console.log("test11")
            this.setState({
                aliment: this.props.route.params.aliment,
                isCreation: this.props.route.params.isCreation
            })
        }
        else {
            this.setState({
                aliment: empty_aliment,
                isCreation: true
            })
        }
    }


    render() {

        const categories = ["Viandes, Poissons, Oeufs", "Produits laitiers", "Matières grasses", "Fruits & Légumes",
        "Céréales & Légumineuses", "Produis sucrés", "Boissons", "Recette"]

        return (
            <View style={[styles.shadow, styles.container]}>
                {this.Titre()}
                    <TextInput placeholder={"Nom de l'aliment"} value={this.state.aliment.name} onChangeText={val => this.modify_aliment("name",val)}/>

                <Picker
                    selectedValue={this.state.aliment.categorie}
                    onValueChange={(val,index) => this.modify_aliment("categorie",val)}
                >
                    {
                        categories.map( (val,index : number) => {
                            return <Picker.Item key={index} label={val} value={val} />
                        })
                    }

                </Picker>

                <View>
                    <Picker
                        selectedValue={this.state.aliment.units[0]}
                    >
                        {
                            this.state.aliment.units.map( (val,index : number) => {
                                return <Picker.Item key={index} label={val.name} value={val} />
                            })
                        }
                    </Picker>

                    <TextInput placeholder={"unité"} value={this.state.new_unit_name} onChangeText={val => this.setState({new_unit_name : val})}/>

                    <TextInput placeholder={"poids"} value={this.state.new_unit_weight} onChangeText={val => this.setState({new_unit_weight : val})}/>

                    <TouchableOpacity onPress={() => this._addUnit()}>
                        <Text>Ajouter l'unité</Text>
                    </TouchableOpacity>
                </View>


                <Text>
                    {
                        this.state.aliment.kcal
                    }
                </Text>




                    <View style={styles.macros}>
                        <View style={styles.macro_column}>
                            <Text style={[ styles.macro_value, {color: "#CE6D36"}]}>{this.state.protein_ratio} %</Text>
                            <TextInput style={styles.text_center} placeholder={"0 g"} value={this.state.aliment.protein} onChangeText={val => this.modify_aliment("protein",val)}/>
                            <Text style={styles.text_center}>Protéines</Text>
                        </View>
                        <View style={styles.macro_column}>
                            <Text style={[ styles.macro_value, {color: "#38C2B2"}]}>{this.state.carbohydrate_ratio} %</Text>
                            <TextInput style={styles.text_center} placeholder={"0 g"} value={this.state.aliment.carbohydrate} onChangeText={val => this.modify_aliment("carbohydrate",val)}/>
                            <Text style={styles.text_center}>Glucides</Text>
                        </View>
                        <View style={styles.macro_column}>
                            <Text style={ [ styles.macro_value, {color : "#1B658E"} ]}> {this.state.lipid_ratio} %</Text>
                            <TextInput style={styles.text_center} placeholder={"0 g"} value={this.state.aliment.lipid} onChangeText={val => this.modify_aliment("lipid",val)}/>
                            <Text style={styles.text_center}>Lipides</Text>
                        </View>

                    </View>



                    <TouchableOpacity onPress={() => this.onClickButton()} style={styles.button}>
                        {this.Button_title()}
                    </TouchableOpacity>



                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: 340,
        marginRight: 'auto',
        marginLeft: 'auto'
    },


    shadow: {
        padding: '5%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        elevation: 4,
    },

    title: {
        fontWeight: 'bold',
        fontSize: 25,
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
    },

    button: {
        marginTop: "10%",
        width: 60,
        height: 20,
        borderRadius: 5,
        backgroundColor: "#2196F3"
    },

    macro_column : {
        flex: 1
    },

    text_center: {
        textAlign: 'center'
    }



});
