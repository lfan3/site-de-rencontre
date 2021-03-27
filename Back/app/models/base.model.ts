interface IRepo {
    exists: boolean
    delete: any
    save: any
}

export interface IUserRepo extends IRepo{
    getUserById(userId: number | string): Array<any>;
}