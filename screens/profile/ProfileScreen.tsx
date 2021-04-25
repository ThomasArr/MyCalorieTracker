import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import OngletProfile from "../../components/profile/ongletProfile";

import RecapitulatifTable from "../../components/profile/Metabolism/RecapitulatifTable";
import {inject, observer} from "mobx-react";


interface ProfileProps {
    navigation: any
}

@inject('store')
@observer
export default class ProfileScreen extends Component<ProfileProps> {

    constructor(props: any) {
        super(props);

        //this.navigateToMetabolism = this.navigateToMetabolism.bind(this)
    }

    navigateToMetabolism = () => {
        this.props.navigation.navigate('Mon métabolisme')
    }

    componentDidMount() {

    }

    render() {

        return (
            <View style={styles.container}>


                <Text style={styles.bold}> Récapitulatif </Text>



                <OngletProfile title={"Mon métabolisme"} icon={require("../../icons/address-book.png")} _display={this.navigateToMetabolism}/>

                <Text style={styles.bold}> Paramètres </Text>

                <OngletProfile title={"Mes informations personnelles"} icon={require("../../icons/settings.png")} _display={this.navigateToMetabolism}/>

                <Text style={styles.deconnexion }> Me déconnecter </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderRadius: 8,
        flex:1
    },

    bold: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '4%',
        marginBottom: '4%'
    },

    deconnexion : {
        marginTop : '4%',
        marginBottom: '10%'
    },

    recapitulatif: {
        marginBottom: '10%'
    }


});
