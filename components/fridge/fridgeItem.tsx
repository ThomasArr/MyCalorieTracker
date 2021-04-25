import React, { Component } from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import {Aliment} from "../../services/aliment.model";




interface fridgeItemProps {
    aliment : Aliment
}

export default class FridgeItem extends Component<fridgeItemProps, {}> {


    constructor(props: any) {
        super(props);

    }


    render() {
        return (
            <View style={[styles.container, styles.shadow]}>
                <Text>{this.props.aliment.name}</Text>
                <Text>{this.props.aliment.kcal}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width : 300,
        height: 40,
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: '3%',

        flexDirection: "row"


    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,

        elevation: 4,
    }



});
