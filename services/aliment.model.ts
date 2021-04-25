export class Aliment {
    kcal : string;
    constructor(
    public id: number,
    public name: string,
    public protein: any,
    public lipid: any,
    public carbohydrate : any,
    public categorie: string,
    public units : Array<Unit>,
    ) {
        this.kcal = (protein * 4 + carbohydrate * 4 + lipid * 7).toString();
    }
}

export const aliment_sample : Array<Aliment> = [
    new Aliment(3,"Lapin","21","6","0","Viandes, Poissons, Oeufs", [{name : "g", weight: "1"}, {name: "morceau", weight: "80"}]),
    new Aliment(1,"Carotte","0.8","0","8","Fruits & Légumes", []),
    new Aliment(2,"Concombre","1","0","2","Fruits & Légumes", []),

]


export interface Unit {
    name : string
    weight : string
}

export const empty_aliment : Aliment = {
    name: "",
    id: 0,
    protein: "0",
    lipid: "0",
    carbohydrate: "0",
    kcal: "",
    categorie: "Viandes, Poissons, Oeufs",
    units: [{name : "g", weight: "1"}]
}
