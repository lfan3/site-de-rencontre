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

function outputLabel():LabeledValue{
    return { size: 10, label: "Size 10 Object" };
}
let myObj = { size: 10, label: "Size 10 Object" };
//printLabel(myObj);
//console.log('size' in outputLabel() );

function topprincipal(){
    try{
        principal();
    }catch(e){
        console.log(e);
    }
}

function principal()
{
    try{
        part();
        throw Error('in principal');
    }catch(e){
        console.log(e);
    }
}

function part()
{
    try{
        throw Error('in part');
    }catch(e){
        console.log(e);
    }
   
}

topprincipal();





