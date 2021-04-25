import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

import HistoriqueDataService from "../../../API/Services/historique.service.js"
import extractGradient from "react-native-svg/lib/typescript/lib/extract/extractGradient";

interface GraphState {
    data: Array<number>
}

interface GraphProps {
    value: string
}

export default class HistoriqueGraph extends Component<GraphProps,GraphState>{

    constructor(props:any) {
        super(props);

        this.state = {
            data: []
        }
    }

    get_data = () => {

        let data= []

        HistoriqueDataService.getAll().then(recaps => {
            recaps.data.forEach((val : object) => {
                if (val[this.props.value])
                data.push(parseInt(val[this.props.value]))
            })
        }).then(() => {
                this.setState({data: data});
                console.log("les données", data);
        }
        )

    }

    componentDidMount() {
        this.get_data()
    }


    render() {
        const contentInset = { top: 20, bottom: 20 }

        const data = this.state.data

        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={data}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                />

                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                </LineChart>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
});
