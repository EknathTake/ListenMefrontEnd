export class Activity{
    public id:number;

    public fieldInput:string;

    public userResponse:string;

    constructor(id:number, fieldInput:string, userResponse:string){
        this.id = id;
        this.fieldInput = fieldInput;
        this.userResponse = userResponse;
    }
}