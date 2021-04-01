interface IUser{
    id:number;
    name:string;
    sex:string;
    orient:string;
    //! potential error to fix with new Date()
    //birthday: Date;
    age:number;
    city:string;
    login:string;
    email:string;
    distance:number;

    photo_path:string;
    //?do we need photos array and others, to add later
}
//do i need to creat this class?? no use at this moment
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
    // get birthday ():Date{
    //     return this._props.birthday
    // }
    get city ():string{
        return this._props.city
    }
    get login ():string{
        return this._props.login
    }
    get email ():string{
        return this._props.email
    }
    get age ():number{
        return this._props.age
    }
    get photo_path():string{
        return this._props.photo_path
    }
    get distance ():number{
        return this._props.distance
    }
}

