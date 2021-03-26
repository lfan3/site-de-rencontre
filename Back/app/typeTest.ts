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
}

class R extends Circle{

}


let c = new R();
c.jsonResponse(600, 'afd')
c.clientError()

