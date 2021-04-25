import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Plat} from "../../services/repas.model"
import {inject} from "mobx-react";

interface platProps {
    plat : Plat
}

interface platState {
    kcal_total: string
}

@inject('store')
export default class platHeader extends Component<platProps, platState> {


    constructor(props: any) {
        super(props);

        this.state = {
            kcal_total: ""
        }

    }

    componentDidMount() {
        this.calcul_total_kcal()
    }

    calcul_total_kcal() {
        const { plat } = this.props;
        let total = ""
        if (plat.nb_portions && plat.unit.weight && plat.aliment)
            // @ts-ignore
          total = plat.nb_portions * plat.unit.weight * plat.aliment.kcal / 100;

        this.setState({
            kcal_total: total.toString()
        })
    }

    render() {

        let { plat } = this.props

        return (
            <View style={styles.container} >
                <View style={styles.row}>
                    <View>
                        <Text>
                            {plat.aliment.name}
                            {plat.nb_portions}
                            {plat.unit.name}
                        </Text>
                    </View>
                    <View style={styles.kcal}>
                        <Text>
                            { this.props.store.kcal_of_a_plat(this.props.plat)}
                        </Text>
                    </View>


                </View>

            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {

    },

    row: {
        flexDirection: 'row'
    },

    kcal: {
        marginLeft: 'auto'
    }
});
