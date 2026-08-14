import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
providedIn:'root'
})

export class RequestsService{


api="https://localhost:5001/api/requests";


constructor(private http:HttpClient){}



getRequests()
{

return this.http.get<any[]>(this.api);

}


}