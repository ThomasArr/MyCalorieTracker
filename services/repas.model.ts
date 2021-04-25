import {Aliment, Unit} from "./aliment.model";

export interface Repas {
    identifiant: number,
    nom: string,
    repas: Array<Plat>
}

export interface Plat {
    identifiant: number,
    aliment: Aliment,
    unit: Unit,
    nb_portions : string
}

export function create_plat_from_aliment(aliment: Aliment) : Plat {
    return {
        identifiant: 0,
        aliment: aliment,
        nb_portions: "1",
        unit: aliment.units[0]
    }
}

export function macro_plat(plat: Plat) {
    const weight = parseInt(plat.nb_portions) * parseInt(plat.unit.weight);

    return {
        protein : Math.round(weight / 100 * plat.aliment.protein) || 0,
        lipid : Math.round(weight / 100 * plat.aliment.lipid) || 0,
        carbohydrate : Math.round(weight / 100 * plat.aliment.carbohydrate) || 0,
        weight: weight
    }
}

export const repas_sample : Repas = {
    identifiant: 0,
    nom : "test",
    repas : [
        {
            identifiant: 1,
            aliment : new Aliment(3,"Lapin","21","6","","Viande", [{name : "g", weight: "1"}, {name: "morceau", weight: "80"}]),
            unit: {name : "morceau", weight : "80"},
            nb_portions: "4"
        },
        {
            identifiant: 2,
            aliment : new Aliment(1,"Carotte","0.8","0","8","Fruits et légumes", []),
            unit: {name : "", weight : ""},
            nb_portions: ""
        },
        {
            identifiant: 3,
            aliment : new Aliment(2,"Concombre","1","0","2","Fruits et légumes", []),
            unit: {name : "", weight : ""},
            nb_portions: ""
        }
    ]
}

export const daily_meals : Array<Repas> = [
    {
        identifiant: 0,
        nom: "Petit déjeuner",
        repas : []
    },
    {
        identifiant: 1,
        nom: "Déjeuner",
        repas : []
    },
    {
        identifiant: 2,
        nom: "Collation",
        repas : []
    },
    {
        identifiant: 3,
        nom: "Dîner",
        repas : []
    }
]

export const empty_plat : Plat = {
    identifiant: 0,
    aliment : new Aliment(0,"","","","","", []),
    unit: {name : "", weight : ""},
    nb_portions: ""

}
