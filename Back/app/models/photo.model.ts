interface IPhoto{
    photo_path:String;
    is_profile:Boolean;
}

export class PhotoModel{
    
    private photo_path:String;
    private profilePhoto:Boolean;

    constructor (userPhoto:IPhoto) {
      this.photo_path = userPhoto.photo_path;
      this.profilePhoto = userPhoto.is_profile;
    }

    public display(){
        console.log(this.photo_path);
    }
}
