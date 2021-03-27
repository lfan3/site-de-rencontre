interface IUser{
    name:String;
    sex:String;
    sex_orient:string;
    //! potential error to fix with new Date()
    birthday: Date;
    city:String;
    login:String;
    email:String;
}


export class UserModel{
    
    private name:String;
    private sex:String;
    private sex_orient:string;
    private birthday: Date;
    private city:String;
    private login:String;
    private email:String;

    constructor (user:IUser) {
        this.name = user.name
        this.sex= user.sex
        this.sex_orient= user.sex_orient
        this.birthday=  user.birthday
        this.city= user.city
        this.login= user.login
        this.email= user.email
    }

    public someFunc(){
        console.log(this.name);
    }
}

