interface IUser{
    name:string;
    sex:string;
    orient:string;
    //! potential error to fix with new Date()
    birthday: Date;
    city:string;
    login:string;
    email:string;
    distance:number;

    profilePhoto:string;
    ages:Array<number>;
    //?do we need photos array and others, to add later
}

export class UserModel{
    
    private _props : IUser;

    constructor(props: IUser){
        this._props = props;
    }
    
    get name ():string{
        return this._props.name
    }
    get sex ():string{
        return this._props.sex
    }
    get orient ():string{
        return this._props.orient
    }
    get birthday ():Date{
        return this._props.birthday
    }
    get city ():string{
        return this._props.city
    }
    get login ():string{
        return this._props.login
    }
    get email ():string{
        return this._props.email
    }
    get ages ():Array<number>{
        return this._props.ages
    }
    get profilePhoto ():string{
        return this._props.profilePhoto
    }
    get distance ():number{
        return this._props.distance
    }
}

