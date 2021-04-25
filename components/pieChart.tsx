import React, { Component } from "react";

import { PieChart } from 'react-native-svg-charts'
import {View, Text} from "react-native";

interface PieChartProps {
    protein: string,
    lipid: string,
    carbohydrate: string
}

interface PieChartState {
    data: Array<Object>
}



export default  class PieChartExample extends React.Component<PieChartProps,PieChartState> {

    constructor(props) {
        super(props);

        this.state= {
            data: []
        }
    }

    init_data() {
        const new_data = [
            {
                key: 1,
                amount: this.props.lipid,
                svg: { fill: '#1B658E' }
            },
            {
                key: 2,
                amount: this.props.carbohydrate,
                svg: { fill: '#38C2B2' }
            },
            {
                key: 3,
                amount: this.props.protein,
                svg: { fill: '#CE6D36' },
            }
             ]

        this.setState({data: new_data})

    }

    componentDidMount() {
        this.init_data()
    }


    render() {

        return (
        <View>
            <PieChart
                style={{ height: 150 }}
                valueAccessor={({ item }) => item.amount}
                data={this.state.data}
                spacing={0}
                outerRadius={'40%'}

            />
        </View>)
    }
}
