export class Profile {
    constructor(
        public weight: any,
        public bodyfat: any,
        public activity: any,
        public maintenance : any,
        public coef_lip: any,
        public coef_prot: any,
        public deficit_seche: any,
        public surplus_pdm : any,
        public objectif: any,
        public objectif_protein: any,
        public objectif_lipid: any,
        public objectif_glucid : any,
        public objectif_kcal: any
    ) {}
}

export const empty_profile : Profile = {
    weight: "",
    bodyfat: "",
    activity: "",
     coef_lip: "",
     coef_prot: "",
    maintenance: "",
     deficit_seche: "",
     surplus_pdm : "",
     objectif: "",
     objectif_protein: "",
     objectif_lipid: "",
     objectif_glucid : "",
     objectif_kcal: ""
}
