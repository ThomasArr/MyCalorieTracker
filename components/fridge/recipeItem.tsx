import React, {Component} from "react";
import {Picker, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Plat} from "../../services/repas.model";
import {Unit} from "../../services/aliment.model";
import {MaterialIcons} from "@expo/vector-icons";

interface recipeItemProps {
    plat: Plat
    onQuantityChange: any
    onUnitChange: any
    deleteItem: any
}

export default class recipeItem extends Component<recipeItemProps,{}>{

    constructor(props : any) {
        super(props);
    }

    update_unit(index: number) {
        this.props.onUnitChange(this.props.plat.aliment.units[index])
    }

    update_nb_portions(val : string) {

        this.props.onQuantityChange(val)
    }

    delete_item(){
        this.props.deleteItem();
    }


    render() {
        const { plat } = this.props

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.delete_item()}>
                    <MaterialIcons  size={20} name="delete-outline"/>

                </TouchableOpacity>

                <Text style={styles.name}>{plat.aliment.name}</Text>

                <TextInput style={styles.input} value={plat.nb_portions} onChangeText={ val => this.update_nb_portions(val)}/>

                <Picker
                    selectedValue={plat.unit.name}
                    style={styles.picker}
                    onValueChange={(val, index) => this.update_unit(index)}
                >
                    {
                        plat.aliment.units.map( (unit : Unit,index : number) => {
                            let name;
                            if (unit.name!= "g" && unit.weight !="1") {name = unit.name+" ( "+unit.weight+"g )"}
                            else name = unit.name;
                            return <Picker.Item key={index} label={name} value={unit.name} />
                        })
                    }

                </Picker>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row'
    },

    picker: {
        height: 40,
        width: 100,
        marginTop: '2%',
        marginLeft: 'auto',
        textAlign: "right"
    },

    input: {
        width: 50,
        marginLeft: 20
    },

    name: {
        textAlignVertical: 'center',
        width: 100,
        marginLeft: 10
    }
});
