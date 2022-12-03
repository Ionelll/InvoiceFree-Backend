import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"


@Injectable({providedIn: 'root'})
export class PostsService{
      constructor(private http: HttpClient){}
      
}