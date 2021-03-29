interface Point{
    x:number;
    y:number;
}

export class CalculeSphereDistance{
    private _point1 : Point;
    private _point2 : Point;
    private readonly _radius = 6372.8;

    constructor(p1:Point, p2:Point){
        this._point1 = p1;
        this._point2 = p2;
    }

    private toRadians(angle:number){
        return angle * Math.PI / 180;
    }

    public toDistance():number{
        const lon1 = this.toRadians(this._point1.x);
        const lat1 = this.toRadians(this._point1.y);

        const lon2 = this.toRadians(this._point2.x);
        const lat2 = this.toRadians(this._point2.y);
        const dlon = lon2 - lon1;
        const dlat = lat2 - lat1;

        const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
        const c = 2 * Math.asin(Math.sqrt(a));
        return c * this._radius;
    }
}
const p1 = { x: 3.11871, y: 48.474315 };
const p2 = { x: 2.513212, y: 48.911669 };
const k = new CalculeSphereDistance(p1, p2);
const distance = k.toDistance();
console.log(distance);