class Circle {
    static pi: number = 3.14;
        //?why static for jsonResponse
    public jsonResponse (statusCode: number, message: string){
        console.log(statusCode);
        console.log(message);
    }
    public static jsonResponse (statusCode: number, message: string){
        console.log(statusCode);
        console.log(message);
    }
    public clientError (message?: string) {
        return this.jsonResponse(400, 'abc');
    }
    public showChildeName(){
        return this.constructor.name;
    }
}

class R extends Circle{
    private n:number;
    constructor(nu:number){
        super();
        this.n = nu
    }

}


let c = new R(2);
c.showChildeName();
// c.jsonResponse(600, 'afd')
// c.clientError()

interface LabeledValue {
    size : number;
    label: string;
}
  
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj);
}
  
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

