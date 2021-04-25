import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Picker} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {Aliment, Unit} from "../../services/aliment.model";

import {aliment_sample} from "../../services/aliment.model";
import {RechercheScreenProps} from "../../navigation/JournalStack"
import ItemSearch from "../../components/journal/itemSearch";
import {create_plat_from_aliment} from "../../services/repas.model";
import AlimentDataService from "../../API/Services/aliment.service";

interface SearchIngredientState {
    search: string
    aliments: Array<Aliment>
    filter: string
}


export default class SearchAlimentScreen extends Component<RechercheScreenProps, SearchIngredientState> {


    constructor(props: any) {
        super(props);

        this.state= {
            search : "",
            aliments: [],
            filter: ""
        }
    }

    fetch_aliments() {
        AlimentDataService.getAll().then((res) => {
            this.setState({
                aliments : res.data.filter(aliment => {
                    if (this.state.filter == "")
                    {
                        if(aliment.name.includes(this.state.search)) return aliment
                    }
                    else {
                        if (aliment.name.includes(this.state.search) && aliment.categorie ==  this.state.filter) return aliment;
                    }

                }) || []
            })
        })
    }

    _onSearchChange(search: string) {
    this.setState(
        {
            search: search
        })
    }

    _search = () => {
        this.fetch_aliments()

    }


    render() {
        const { navigation } = this.props;

        const categories = ["","Viandes, Poissons, Oeufs", "Produits laitiers", "Matières grasses", "Fruits & Légumes",
            "Céréales & Légumineuses", "Produis sucrés", "Boissons", "Recette"]

        return (
            <View style={[styles.container, styles.shadow]}>
                <Picker
                    selectedValue={this.state.filter}
                    onValueChange={(val,index) => {this.setState({filter: val}); this.fetch_aliments()}}
                >
                    {
                        categories.map( (val,index : number) => {
                            return <Picker.Item key={index} label={val} value={val} />
                        })
                    }

                </Picker>

                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.search}
                        onChangeText={(val) => this._onSearchChange(val)}
                        placeholder={"Aliment"}
                    />
                    <TouchableOpacity style={{marginTop: "5%"}} onPress={this._search}>
                        <MaterialIcons size={24}  name="search"/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.aliments}

                    keyExtractor={(aliment : Aliment) => aliment.id.toString()}

                    renderItem= {({ item } : {item : Aliment}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Détails",
                                {   plat : create_plat_from_aliment(item),
                                    isCreation: true,
                                    plat_id: 0,
                                    meal_id: this.props.route.params.meal_id
                                })}
                        >
                            <ItemSearch aliment={item} />
                        </TouchableOpacity>

                    )}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        margin: "5%",
        borderRadius: 20
    },

    today : {
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize : 26,
        marginTop: "5%",
        marginBottom: "5%"
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,
    },

    search: {
        margin: "5%"
    },

    searchBar: {
        flexDirection: "row"
    }

});
