export interface IFilterUsersRaw{
    userId : number;
    sex : string;
    orient : string;
    ages : Array<number>;
    distance : number 
}

export interface ISexOrienAgeFilterResult{
    id : number;
    name : string;
    city : string;
    sex : string;
    orient : string;
    age : number;
    photo_path : string;
    login:string;
    email:string;
}

export interface IPaireDistance{
    userId : number;
    otherId : number;
    distance : number;
}

export interface IUser{
    id:number;
    name:string;
    sex:string;
    orient:string;
    age:number;
    city:string;
    login:string;
    email:string;
    distance:number;

    photo_path:string;
    //?do we need photos array and others, to add later
}

export interface IPhoto{
    photo_path:string
}