import { Activity } from "./activities";

export class Action{

    public id:number;

    public voiceCmd:string;

    public activities:Activity[];

    constructor(id:number, voiceCmd:string, activities:Activity[]){
        this.id = id;
        this.voiceCmd = voiceCmd;
        this.activities = activities;
    }
    
}