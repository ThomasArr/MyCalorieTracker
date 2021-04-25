import React, { Component } from "react";
import {StyleSheet, Text, View, TouchableOpacity, Picker, TextInput} from 'react-native';

import RecapitulatifTable from "../../components/profile/Metabolism/RecapitulatifTable";

import AsyncStorage from "@react-native-async-storage/async-storage";
import MetabolismeInput from "../../components/profile/Metabolism/metabolismInput";
import { Profile, empty_profile } from "../../services/profile.model";
import {inject, observer} from "mobx-react";

import { MetabolismeScreenProps } from "../../navigation/ProfileStack"

interface MetabolismeState  {
    profile : Profile
    selectedValue : string
}

@inject('store')
@observer
export default class MetabolismeScreen extends Component<MetabolismeScreenProps, MetabolismeState> {

    state : MetabolismeState = {
        profile : {
            weight : "78",
            bodyfat: "",
            activity: "",
            maintenance: "",
            coef_lip : "",
            coef_prot: "",
            deficit_seche: "",
            surplus_pdm: "",
            objectif: "",
            objectif_protein: "",
            objectif_lipid: "",
            objectif_glucid: "",
            objectif_kcal: ""
        },
        selectedValue: "Maintenance"
    }

    _isModified = false;


    constructor(props: any) {
        super(props);

        this.update_profile = this.update_profile.bind(this)
    }

    update_profile(field : string, value: string) {

        this.props.store.modify_profile(field,value)

        this.refresh_maintenance()
        this._isModified = true;
    }

    async getAll ()  {
        try {
            const jsonValue = await AsyncStorage.getItem('profile')
            return jsonValue != null ? JSON.parse(jsonValue) : empty_profile;
        } catch(e) {
            console.log(e)
        }
    }
        save ()  {
                try {
                    const jsonValue = JSON.stringify(this.state.profile)
                    AsyncStorage.setItem('profile', jsonValue)
                } catch (e) {
                    // saving error
                }
            }

    load_profile() {
        this.getAll().then((_profile) => {
            this.props.store.update_all_profile(_profile)
            this.setState({
                profile: this.props.store.profile
            })
            this._isModified = false;
        })

    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.load_profile()
        }

    }

    componentWillUnmount() {
        this._isMounted= false;
    }


    refresh_maintenance() {
        if (this.state.profile.bodyfat != ""
            && this.state.profile.weight != ""
            && this.state.profile.activity !="")
        {

            const value =  Math.round((370 + 21.6 * (1 - this.state.profile.bodyfat / 100)*this.state.profile.weight)*this.state.profile.activity);

            this.props.store.modify_profile("maintenance",value.toString())

            const profile = this.state.profile;
            let kcal_objectif;

            switch(profile.objectif) {
                case "prise_de_masse":
                    kcal_objectif = Math.round(value * (1+this.state.profile.surplus_pdm / 100))
                    break
                case "seche":
                    kcal_objectif = Math.round( value * (1-this.state.profile.deficit_seche / 100))
                    break
                default:
                    kcal_objectif = value
            }


            this.props.store.modify_profile("objectif_kcal",kcal_objectif.toString())
            this.props.store.modify_profile("objectif_protein",Math.round(profile.coef_prot*(1-profile.bodyfat/100)*profile.weight).toString())
            this.props.store.modify_profile("objectif_lipid",Math.round(profile.coef_lip*(1-profile.bodyfat/100)*profile.weight).toString())
            this.props.store.modify_profile("objectif_glucid",Math.round((kcal_objectif - profile.objectif_protein * 4 - profile.objectif_lipid * 9 )/4).toString())

        }
    }


    render() {
        console.log("refresh render ?", this.state.profile)

        const modifier = () => {
            switch(this.state.profile.objectif) {

                case "seche":   return <MetabolismeInput  name={"Déficit sèche :"} value={this.state.profile.deficit_seche} placeholder={""} unit={"%"}  field={"deficit_seche"} _onChange={this.update_profile}/>;
                case "prise_de_masse":   return <MetabolismeInput  name={"Surplus prise de masse :"} value={this.state.profile.surplus_pdm} placeholder={""} unit={"%"}  field={"surplus_pdm"} _onChange={this.update_profile}/>;

                default:      return <View style={{height:28}}/>
            }
        }

        const { profile } = this.state


        return (
            <View style={styles.container}>


                <View style={styles.shadow}>
                    <MetabolismeInput  name={"Poids :"} value={profile.weight} placeholder={"votre poids"} unit={"kg"} field={"weight"} _onChange={this.update_profile}/>
                    <MetabolismeInput  name={"Taux de graisse :"} value={profile.bodyfat} placeholder={"bodyfat"} unit={"%"}  field={"bodyfat"} _onChange={this.update_profile}/>
                    <MetabolismeInput  name={"Multiplicateur d'activité :"} value={profile.activity} placeholder={"activité"} unit={""} field={"activity"} _onChange={this.update_profile}/>
                    <Text style={styles.maintenance}> Maintenance : {profile.maintenance } kcal</Text>
                </View>


                <View style={styles.shadow}>
                    <View style={styles.objectif}>
                        <Text>Objectif :</Text>
                        <Picker
                            selectedValue={this.state.profile.objectif}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => this.update_profile("objectif",itemValue)}
                        >
                            <Picker.Item label="Maintenance" value="maintenance" />
                            <Picker.Item label="Prise de masse" value="prise_de_masse" />
                            <Picker.Item label="Sèche" value="seche" />
                        </Picker>
                    </View>

                    <View style={styles.coefficient}>
                        <MetabolismeInput  name={"Coef. protéines :"} value={profile.coef_prot} placeholder={"protein"} unit={"g / kg sec"}  field={"coef_prot"} _onChange={this.update_profile}/>
                        <MetabolismeInput  name={"Coef. lipides :"} value={profile.coef_lip} placeholder={"lipid"} unit={"g / kg sec"}  field={"coef_lip"} _onChange={this.update_profile}/>

                        {modifier()}

                        <Text style={styles.maintenance}>Objectif : {profile.objectif_kcal}</Text>
                    </View>
                </View>

                <View key={profile.coef_lip}>
                    <View key={profile.coef_prot}>
                        <View key={profile.objectif}>
                            <View key={profile.deficit_seche}>
                                <View key={profile.surplus_pdm}>
                                    <RecapitulatifTable profile={profile} key={profile.maintenance}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>



                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.cancel_button} onPress={() => this.load_profile()}>
                        <Text>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.save_button} onPress={() => this.save()}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECF0F3',
        alignItems: 'center'
    },

    maintenance : {
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '2%',
        marginBottom: '2%'
    },

    objectif: {
        alignItems: 'center',
        flexDirection: "row"
    },



    save_button: {
        height: 20,
        width: 50,
        borderRadius: 4,
        backgroundColor: "#49b828",
        marginLeft: 20
    },

    cancel_button: {
        height: 20,
        width: 50,
        borderRadius: 4,
        backgroundColor: "#9191bd",
        marginRight: 20

    },

    buttons: {
        flexDirection: 'row',
        marginTop: '3%'
    },

    shadow : {
        backgroundColor: "white",
        borderRadius: 5,
        marginTop: '2%',
        paddingLeft: '2%',
        width : 320,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,

        elevation: 5,
    },

    picker: {
        height: 50,
        width: 150,
        marginTop: '2%',
        marginRight: 'auto',
        marginLeft: 'auto'
    },

    coefficient:  {

    }


});
