import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import RecapitulatifRow from "./recapitulatifRow";
import {empty_profile, Profile} from "../../../services/profile.model";
import {inject, observer} from "mobx-react";

interface RecapitulatifState  {
    tableHead: Array<string>
    protRow: Array<string>
    glucRow: Array<string>
    lipRow: Array<string>
    totRow: Array<string>
    profile: Profile
}

interface RecapitulatifProps {
    profile: Profile
}

@inject('store')
@observer
export default class objectifTable extends Component<RecapitulatifProps, RecapitulatifState> {


    constructor(props: any) {
        super(props);

        this.state = {
            tableHead: ['', 'g', 'kcal', '% total'],
            protRow: ["Protéines", "0", "0", "0%"],
            glucRow: ["Glucides", "0", "0", "0%"],
            lipRow: ["Lipides", "0", "0", "0%"],
            totRow: ["Total", "-", "0", "100%"],
            profile: props.profile
        }
    }

    load_state(profile : Profile) {
        console.log("load")
        if (profile) {
            let protRow = this.state.protRow;
            protRow[1] = profile.objectif_protein ;
            const objectif_kcal_prot = profile.objectif_protein * 4
            protRow[2] = objectif_kcal_prot.toString();
            protRow[3] = Math.round((objectif_kcal_prot / profile.objectif_kcal)*100).toString() + "%";

            let lipRow = this.state.lipRow;
            lipRow[1] = profile.objectif_lipid;
            const objectif_kcal_lip = profile.objectif_lipid * 9
            lipRow[2] = objectif_kcal_lip.toString();
            lipRow[3] = Math.round((objectif_kcal_lip / profile.objectif_kcal)*100).toString() + "%";

            let glucRow = this.state.glucRow;
            const objectif_kcal_gluc = profile.objectif_kcal - objectif_kcal_lip- objectif_kcal_prot;
            glucRow[1] = Math.round(objectif_kcal_gluc /4).toString();
            glucRow[2] = objectif_kcal_gluc.toString();
            glucRow[3] = Math.round((objectif_kcal_gluc / profile.objectif_kcal)*100).toString() + "%";


            let totalRow = this.state.totRow;
            totalRow[2] = profile.objectif_kcal;

            let tableHead = this.state.tableHead;
            switch (profile.objectif) {
                case "prise_de_masse":
                    tableHead[0] = "Prise de masse";
                    break
                case "seche":
                    tableHead[0] = "Sèche";
                    break
                default:
                    tableHead[0] = "";
            }

            this.setState({protRow : protRow, lipRow : lipRow, glucRow: glucRow, totRow: totalRow, tableHead: tableHead})

        }
    }


    componentDidMount() {
        this.load_state(this.props.profile)
    }





    render() {


        return (
            <View style={styles.container} key={this.props.profile.weight}>
                <RecapitulatifRow row={this.state.tableHead} textStyle={{color: 'white'}} containerStyle={{background : '#4E4E53'}}/>
                <RecapitulatifRow row={this.state.protRow} textStyle={{color: '#232326'}} containerStyle={{background : ''}}/>
                <RecapitulatifRow row={this.state.glucRow} textStyle={{color: '#232326'}} containerStyle={{background : ''}}/>
                <RecapitulatifRow row={this.state.lipRow} textStyle={{color: '#232326'}} containerStyle={{background : ''}}/>
                <RecapitulatifRow row={this.state.totRow} textStyle={{color: '#232326'}} containerStyle={{background : ''}}/>
            </View>

        );
    }
}


const styles = StyleSheet.create({

    container: {
        width: 320,
        height: 170,
        flexDirection: 'column',
        borderWidth: 2,
        marginTop: '3%',


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,


    },



});
