import { isSwitchStatement, Type } from "typescript";

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
interface IA{
    error : string;
}

interface IEnsemble{
    size : number;
    label: string;
    error : string;
}
//& and | or
//expresso LabeledValue & IA = IEnsemble
function newType(): LabeledValue & IA {
    return { size: 10, label: "Size 10 Object", error : 'abc' };
}

function typeCom(input : IEnsemble){
    return console.log(input);
}


//typeCom(newType());

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj);
}

function outputLabel():LabeledValue{
    return { size: 10, label: "Size 10 Object" };
}
let myObj = { size: 10, label: "Size 10 Object" };
let secObj = { size: 20};



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

//topprincipal();
const e = new Error('some');
//console.log(e instanceof Error);

//type Guard

interface A{
    member:string;
}

const p = {member:'abc', id: 4};

function testInterface(arg : A){
    return 'ok';
}

function instanceOfA(object: any): object is A {
    return 'member' in object;
}

function instanceOfB(object: any, prop:string): object is Object {
    return prop in object;
}

function notInstanceOfError(object: any): object is Object {
    return  'id' in object || 'userId' in object;
}

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

//function as param
type GreetFunction = (a: Array<string>) => Array<string>;
function greeter(fn: GreetFunction) {
  // ...
}

const array = [1,2,3]
function add(a:number){
    return a + 5;
}

const res = array.map(add)
console.log(res)









