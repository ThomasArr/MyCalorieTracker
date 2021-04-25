import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import {inject, observer} from "mobx-react";



interface MetabolismeInputProps  {
    unit: string,
    name: string,
    value: string,
    placeholder: string,
    field: string,
    _onChange : any
}

export default class MetabolismeInput extends Component<MetabolismeInputProps> {


    constructor(props: any) {
        super(props);
    }

    _onChange(val: string) {
        this.props._onChange(this.props.field,val)
    }

    render() {
        return (
            <View style={styles.container}>
                    <Text style={styles.name}> { this.props.name }  </Text>
                    <View style={styles.right}>
                        <TextInput style={styles.input} placeholder={this.props.placeholder} value={this.props.value == null ? '' : this.props.value} onChangeText={(val) => this._onChange(val)}/>
                        <Text style={styles.unit}>{ this.props.unit} </Text>
                    </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        width: 320,
        marginTop : 10,

    },

    name: {
        marginRight: '1%',
        fontSize: 14
    },

    unit: {
        width: 80,
        fontSize: 14
    },

    input:   {
        width: 80,
        fontSize: 14
    },


    right: {
        marginLeft: 'auto',
        flexDirection: 'row',

    }


});
