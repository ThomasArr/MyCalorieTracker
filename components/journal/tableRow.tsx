import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';


interface RowProps  {
    row: Array<any>
    objectif: Array<string>
}

export default class TableRow extends Component<RowProps> {


    constructor(props: any) {
        super(props);

    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.row.map(
                        (val,index) => {
                            return (<View key={index} style={styles.row} >
                                <Text style={styles.val}> { val}</Text>
                                <Text style={styles.objectif}> {this.props.objectif[index] || ""}</Text>

                            </View>)
                        }  // This will render a row for each data element.
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },

    val: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'sans-serif'
    },

    objectif : {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'sans-serif',
        color: "gray"
    },

    row: {
        flexDirection: 'row',
        margin : 'auto'
    }


});
