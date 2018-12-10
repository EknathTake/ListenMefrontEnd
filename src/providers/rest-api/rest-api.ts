import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const appUrl:string = 'http://172.26.224.1:8080';
@Injectable()
export class RestApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getPredictedActions(query:string){
    return this.http.get(appUrl + '/action?q='+query);
  }

}
