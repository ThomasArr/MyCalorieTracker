import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Modal, Picker} from 'react-native';
import {Aliment, empty_aliment} from "../../services/aliment.model";

import AlimentDataService from "../../API/Services/aliment.service.js"

import {MaterialIcons} from "@expo/vector-icons";

import { FridgeScreenProps } from "../../navigation/FridgeStack"
import {create_plat_from_aliment} from "../../services/repas.model";
import ItemSearch from "../../components/journal/itemSearch";

interface FridgeScreenState  {
    aliments: Array<Aliment>
    search: string
    filter: string
}

export default class FridgeScreen extends Component<FridgeScreenProps, FridgeScreenState> {


    constructor(props: any) {
        super(props);

        this.state = {
            aliments : [],
            search: "",
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

                <View style={styles.container}>

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
                                onPress={() => navigation.navigate("FridgeAliment", {isCreation: false, aliment: item})}
                            >
                                <ItemSearch aliment={item} />
                            </TouchableOpacity>

                        )}
                    />
                </View>

                <TouchableOpacity
                    style={styles.add_button}
                    onPress={() => navigation.navigate("AddFood")}
                >
                    <MaterialIcons  size={50} name="add-circle-outline"/>
                </TouchableOpacity>


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

    add_button:  {
        zIndex: 1,
        position: "absolute",
        marginTop: '95%',
        marginLeft: '80%',
        backgroundColor: '#1c527d'
    },

    add_recipe:  {
        zIndex: 1,
        position: "absolute",
        marginTop: '80%',
        marginLeft: '80%',
        backgroundColor: '#295f1e'
    },

    searchBar: {
        flexDirection: "row"
    },

    search: {
        margin: "5%"
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
    }



});
