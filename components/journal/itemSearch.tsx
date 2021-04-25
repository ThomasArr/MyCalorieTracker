import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Aliment} from "../../services/aliment.model";



interface itemSearchProps  {
    aliment: Aliment
}

export default class itemSearchScreen extends Component<itemSearchProps, {}> {

    constructor(props: any) {
        super(props);

    }


    render() {

        let aliment = this.props.aliment;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{aliment.name}</Text>
                    <Text style={styles.italic}> 100,0 g</Text>
                </View>
                <View style={styles.kcal}>
                    <Text>{aliment.kcal} kcal</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ECF0F3',
        marginBottom: '5%',
        flexDirection : 'row',
        paddingRight: '2%',
        paddingLeft: '2%',
        width : 240,
        height: 30,
    },

    title: {
        fontSize: 12,
    },

    macro :  {
        fontSize: 10,
        color: "#666666",
        textAlignVertical: 'center'
    },

    italic : {
        fontStyle: 'italic',
        fontSize: 10,
        color: "#9a9a9a"
    },

    kcal: {
        marginLeft:'auto',
        marginRight: '2%'

    }


});
