import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity} from "react-native";
import {Aliment, Unit} from "../../services/aliment.model";
import RecipeItem from "../../components/fridge/recipeItem";
import {Plat} from "../../services/repas.model";
import ItemSearch from "../../components/journal/itemSearch";
import AlimentDataService from "../../API/Services/aliment.service";
import {create_plat_from_aliment , macro_plat}  from "../../services/repas.model"

import { FridgeAddScreenProps } from "../../navigation/FridgeStack"

interface fridgeScreenState {
    recipeName: string
    search_aliments : Array<Aliment>
    recipe_plats: Array<Plat>
    search: string

}

export default class FridgeRecipeScreen extends Component<FridgeAddScreenProps,fridgeScreenState>{

    constructor(props: any) {
        super(props);

        this.state = {
            recipeName : "",
            search_aliments: [],
            recipe_plats: [],
            search: ""
        }
    }

    _search(val: string) {
        this.setState({
            search: val
        })
        this.fetch_aliments()
    }

    fetch_aliments() {
        AlimentDataService.getAll().then((res) => {
            this.setState({
                search_aliments : res.data.filter(aliment => aliment.name.includes(this.state.search)) || []
            })
        })
    }

    _addAliment(aliment: Aliment) {
        this.setState({
            recipe_plats : [... this.state.recipe_plats, create_plat_from_aliment(aliment)]
        })

    }

    _update_nb_portions(index: number, val: string) {
        let new_plats = this.state.recipe_plats;
        new_plats[index].nb_portions= val;


        this.setState({
            recipe_plats : new_plats
        })
    }

    _update_selected_unit(index: number, unit: Unit) {
        let new_plats = this.state.recipe_plats;
        new_plats[index].unit= unit;

        this.setState({
            recipe_plats : new_plats
        })
    }

    _deleteItem(index: number) {
        const new_plats = this.state.recipe_plats.filter((plat,_index) => _index !== index)
        this.setState({
            recipe_plats: new_plats
        })
    }

    onSubmit() {
        let protein = 0;
        let lipid = 0;
        let carbohydrate = 0;
        let weight = 0;

        this.state.recipe_plats.forEach(plat => {
            const val = macro_plat(plat);
            protein += val.protein;
            lipid += val.lipid;
            carbohydrate += val.carbohydrate;
            weight += val.weight;
        })

        const new_aliment : Aliment = {
            name: this.state.recipeName,
            categorie: "Recette",
            units: [
                {name : "g", weight: "1"},
                {name : "Recette", weight: weight.toString()}
            ],
            protein : Math.round(protein / weight * 100),
            lipid : Math.round(lipid / weight * 100),
            carbohydrate : Math.round(carbohydrate / weight * 100),
            id: 0,
            kcal: (Math.round(protein / weight * 100)* 4 + Math.round(lipid / weight * 100)* 9 + Math.round(carbohydrate / weight * 100)*4).toString()
        }



        AlimentDataService.create(new_aliment)

        this.props.navigation.navigate("Fridge")
    }


    componentDidMount() {
        this.fetch_aliments()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.name, styles.shadow]}>
                    <Text style={styles.title}>Name</Text>
                    <TextInput
                        value={this.state.recipeName}
                        onChangeText={val => this.setState({recipeName: val})}
                        placeholder={"Nom de la recette"}

                    />
                </View>

                <View style={[styles.shadow, {width: '100%'}]}>
                    <FlatList
                        data={this.state.recipe_plats}
                        extraData={this.state}

                        keyExtractor = {(item, index) => index.toString() }

                        renderItem= {({ item, index }) => (
                            <RecipeItem
                                plat={item}
                                onQuantityChange={val => this._update_nb_portions(index,val)}
                                onUnitChange={ val => this._update_selected_unit(index,val)}
                                deleteItem={() => this._deleteItem(index)}
                            />

                        )}
                    />
                </View>

                <TextInput placeholder={"Rechercher"} value={this.state.search} onChangeText={val => this._search(val)}/>

                <FlatList
                    data={this.state.search_aliments}

                    keyExtractor={(aliment : Aliment) => aliment.id.toString()}

                    renderItem= {({ item } : {item : Aliment}) => (
                        <TouchableOpacity
                            onPress={() => this._addAliment(item)}
                        >
                            <ItemSearch aliment={item} />
                        </TouchableOpacity>

                    )}
                />

                <TouchableOpacity onPress={() => this.onSubmit()}>
                    <Text>Créer la recette</Text>
                </TouchableOpacity>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    name: {
        flexDirection: 'row',
        margin: '5%',
        backgroundColor: 'white',
        padding: '10%'
    },

    title: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: '15%'
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
});
