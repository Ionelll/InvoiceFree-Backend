import { Injectable } from "@angular/core"
import {  Subject } from "rxjs"
import { HttpClient } from "@angular/common/http"
import {Client} from "./client.model"


@Injectable({providedIn: 'root'})
export class ApiService{
      private clients=new Subject<string[]>()
      public clients$=this.clients.asObservable()
      private client=new Subject<Client>()
      public client$= this.client.asObservable()
      constructor(private http: HttpClient){}
      
      addClient(form:Client){
            this.http.post<Client>('http://localhost:3000/api/addclient',form).subscribe()
      }
      saveFactura(file:FormData){
            console.log(file)
            this.http.post('http://localhost:3000/api/invoice/addInvoice',file).subscribe()
      }
      clientList(){
            this.http.get<string[]>('http://localhost:3000/api/clients').subscribe(res=>{
                  this.clients.next(res)
            })
      }
      searchClient(clientname:string){
            this.http.get<Client>(`http://localhost:3000/api/client/${clientname}`).subscribe(res=>{
                  this.client.next(res[0])
            })
      }
}