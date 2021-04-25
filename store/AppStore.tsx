import {action, makeAutoObservable, observable, computed, runInAction} from "mobx";
import {daily_meals, empty_plat, Plat, Repas, macro_plat} from "../services/repas.model"
import {Profile, empty_profile} from "../services/profile.model";
import AsyncStorage from "@react-native-async-storage/async-storage";


class AppStore {

    constructor() {
        makeAutoObservable(this, {
            meals: observable,
            profile: observable
        })
    }

    meals: Array<Repas> = daily_meals

    profile : Profile = {
        weight : "91",
        bodyfat: "15",
        activity: "1.25",
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
    }

    is_loaded : Boolean = false

    @action load_datas() {
        if (! this.is_loaded) {
            this.getProfile().then(profile => this.update_all_profile(profile))
            this.get_meals_of_the_day().then(meals => this.update_meals_of_the_day(meals))
            if (this.profile.weight != "") this.is_loaded= true;

        }
    }

    @action async getProfile ()  {
        try {
            const jsonValue = await AsyncStorage.getItem('profile')
            return jsonValue != null ? JSON.parse(jsonValue) : empty_profile;
        } catch(e) {
            console.log(e)
        }
    }

    async get_meals_of_the_day() {
        try {
            const jsonValue = await AsyncStorage.getItem('meals_of_the_day')
            return jsonValue != null ? JSON.parse(jsonValue) : daily_meals;
        } catch(e) {
            console.log(e)
        }
    }

    save_meals_of_the_day = () => {
        try {
            const jsonValue = JSON.stringify(this.meals)
            AsyncStorage.setItem('meals_of_the_day', jsonValue)
        } catch (e) {
            // saving error
        }
    }


    @computed maintenance() {
        return  Math.round((370 + 21.6 * (1 - parseInt(this.profile.bodyfat) / 100)*parseInt(this.profile.weight))*parseInt(this.profile.activity));
    }

    @computed objectif_kcal() {
        const maintenance = this.maintenance();

        let objectif_kcal;
        switch (this.profile.objectif) {
            case "prise_de_masse":
                objectif_kcal= Math.round(maintenance * (1+parseInt(this.profile.surplus_pdm) / 100));
                break;
            case "seche":
                objectif_kcal= Math.round( maintenance * (1-parseInt(this.profile.deficit_seche) / 100))
                break;
            default:
                objectif_kcal= maintenance
        }

        this.profile.objectif_kcal = objectif_kcal;
    }

    @action reset_meals_of_the_day = () => {
        this.meals = daily_meals;
        this.save_meals_of_the_day()
    }


    @action modify_profile = (field: string, value: string) => {
        this.profile[field] = value;
    }

    @action update_all_profile = (new_profile : Profile) => {
        this.profile= new_profile;
    }

    @action update_meals_of_the_day = (meals :Array<Repas>) => {
        this.meals = meals;
    }



    @action save_profile = () => {
        try {
            const jsonValue = JSON.stringify(this.profile)
            AsyncStorage.setItem('profile', jsonValue)
        } catch (e) {
            // saving error
        }
    }



    @action modify_plat = (meal_id : number, plat_id: number, new_plat : Plat) => {

        const plat_index = this.meals[meal_id].repas.findIndex((plat) => plat.identifiant==plat_id) || -1 ;

        this.meals[meal_id].repas[plat_index] = new_plat;
        //console.log(this.meals)

    }

    @action create_plat = (meal_id : number, new_plat : Plat) => {

        let max = 0;
        this.meals[meal_id].repas.forEach((plat) => {
            if (plat.identifiant > max) max=plat.identifiant
        })
        new_plat.identifiant = max + 1;

        this.meals[meal_id].repas.push(new_plat);

        this.save_meals_of_the_day();


    }

    @computed kcal_of_a_plat(plat : Plat) {
        if (plat.nb_portions && plat.unit.weight && plat.aliment)

            return Math.round(parseInt(plat.nb_portions) * parseInt(plat.unit.weight) *
                parseInt(plat.aliment.kcal) / 100);
    }


    @computed kcal_of_a_meal(meal_id: number) {
        let kcal = 0;
        this.meals[meal_id].repas.forEach((plat) => {
            if (plat !== undefined) {
                // @ts-ignore
                kcal = kcal + this.kcal_of_a_plat(plat)
            }
        })
        return kcal
    }

    @computed macros_of_the_day() {
        let protein = 0;
        let lipid = 0;
        let carbohydrate = 0;
        let weight = 0;
        let kcal= 0;

        this.meals.forEach((repas) => {
            repas.repas.forEach((plat) => {
                const macros = macro_plat(plat);
                protein += macros.protein;
                lipid += macros.lipid;
                carbohydrate += macros.carbohydrate;
                weight += macros.weight;
            })
        })

        kcal = protein * 4 + lipid * 9 + carbohydrate * 4;
        return {
            protein: protein,
            lipid: lipid,
            carbohydrate: carbohydrate,
            kcal: kcal,
            weight: weight
        }
    }

    @computed get_objectifs() {
        return {
            objectif_protein: this.profile.objectif_protein,
            objectif_glucid: this.profile.objectif_glucid,
            objectif_lipid: this.profile.objectif_lipid,
            objectif_kcal: this.profile.objectif_kcal,
        }
    }



}

export default AppStore
