interface IPairDistance{
    userId : number;
    otherId : number;
    distance : number | string;
}

export class PaireDistance{
    private _props : IPairDistance;

    constructor(props : IPairDistance){
        this._props = props;
    }

    get userId (): number {
        return this._props.userId;
    }

    get otherId (): number {
        return this._props.otherId;
    }
}