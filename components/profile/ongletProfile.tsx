import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';


interface OngletState  {
}

interface OngletProps {
    title : string
    icon : any
    _display : any
}

export default class OngletProfile extends Component<OngletProps, OngletState> {


    constructor(props: any) {
        super(props);

    }


    render() {
        return (
            <TouchableOpacity
                onPress={this.props._display}
            >
                <View style={styles.container}>

                        <Image style= {styles.icon} source={this.props.icon} />

                        <Text style={styles.title}>{ this.props.title } </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width : 300,
        height: 60,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: "row",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,

    },

    title: {
        fontSize: 16,
    },

    icon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginRight: 15
    }


});
