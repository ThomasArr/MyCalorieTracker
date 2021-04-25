import * as React from 'react';
import {Component} from 'react';
import {TabNavigator} from "./navigation/NavigationTab";
import {Provider} from 'mobx-react';
import AppStore from "./store/AppStore"

import AlimentDataService from "./API/Services/aliment.service.js"

import {aliment_sample} from "./services/aliment.model";

const store = new AppStore()

class App extends Component {


    init_database() {

        //AlimentDataService.create({name: "dauphin", protein: "", lipid: "", carbohydrate : "", kcal: "", categorie: "" })
        /*
        aliment_sample.map(aliment => {
            AlimentDataService.create(aliment)
        })*/

    }

    componentDidMount() {
        this.init_database()
        store.load_datas()
    }

    render() {
        return (
            <Provider store={store}>
                <TabNavigator />
            </Provider>

        );
    }

}

export default App
