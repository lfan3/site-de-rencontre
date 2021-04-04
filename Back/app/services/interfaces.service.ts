//interface in match.service
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
//in match.service and profile.service
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
}

//in profile,service
export interface IPhoto{
    photo_path:String;
    is_profile:Boolean;
}

export interface IBioCourte{
    bioCourte:string
}

export interface IChatRoom{
    mutual:boolean;
    room:number;
}

