import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


interface RowProps  {
    row: Array<any>
    textStyle: any
    containerStyle: any
}

export default class RecapitulatifRow extends Component<RowProps> {


    constructor(props: any) {
        super(props);

    }


    render() {
        return (
            <View style={ [styles.container, this.props.containerStyle]}>
                <View style={{flex: 6}}>
                    <Text style={[styles.row, this.props.textStyle, ]}>{ this.props.row[0] }</Text>
                </View>
                <View style={{flex: 4}}>
                    <Text style={[styles.row, this.props.textStyle, ]}>{ this.props.row[1] }</Text>
                </View>
                <View style={{flex:5}}>
                    <Text style={[styles.row, this.props.textStyle, ]}>{ this.props.row[2] }</Text>
                </View>
                <View style={{flex: 5}}>
                    <Text style={[styles.row, this.props.textStyle, ]}>{ this.props.row[3] }</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
    },

    row: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'sans-serif'
    }


});
