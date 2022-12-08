import { animate, style, transition, trigger } from '@angular/animations';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from '../api.service';
import { Client } from '../client.model';
import { Observable } from 'rxjs';
import { startWith,map } from 'rxjs';


@Component({
  selector: 'app-facturanoua',
  templateUrl: './facturanoua.component.html',
  styleUrls: ['./facturanoua.component.scss'],
  animations:[
    trigger('enterleave',[
      transition(':leave',[
      animate('100ms', style({height:0,opacity:0}))
    ]),
      transition(':enter',[
        style({height:0,opacity:0}),
        animate('100ms')
      ])
  ])
  ]
})
export class FacturaNouaComponent implements OnInit  {
  constructor(public api:ApiService){}
  //input counter variables
  i=[1]
  x=1
  //date variables
  date=new Date()
  y=this.date.getFullYear()
  m=this.date.getMonth()
  d=this.date.getDate()
  datenow=this.d+'/'+(this.m+1)+'/'+this.y
  //Observable variables
  nrfactura:number
  client:Client
  //Forms
  showclient=new FormGroup({
    numeclient:new FormControl(''),
    adresaclient:new FormControl(''),
    telefonclient:new FormControl('')
  })
  searchControl = new FormControl();
  //autocomplete variables
  options: string[] = [];
  filteredoptions = new Observable<string[]>();
  private _filter(value: string): string[] {
    const filterValue = value;
    return this.options.filter(option => option.toLowerCase().includes(filterValue.toLowerCase()));
  }

  ngOnInit(): void {  
    this.api.clientList()
    this.api.clients$.subscribe(res=>{this.options=res})
    this.api.client$.subscribe(res=>{
      this.showclient.controls.numeclient.setValue(res.name)
      this.showclient.controls.adresaclient.setValue(res.adress)
      this.showclient.controls.telefonclient.setValue(res.tel)
  }
    )
    this.filteredoptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
  }

addInput(){
  this.x=this.i.length
  this.x++
  this.i.push(this.x)
}

suma(form:NgForm,i:number){
  return (form.value["bucati"+i]*form.value["pret"+i]).toFixed(2)
}
netto(form:NgForm){
  let z=0
  for(let item of this.i ){
  z+=(parseFloat(form.value["bucati"+item])*parseFloat(form.value["pret"+item]))||0
  }
  return z.toFixed(2)
}
tva(form:NgForm){
  let z=0
  for(let item of this.i ){
  z+=(parseFloat(form.value["bucati"+item])*parseFloat(form.value["pret"+item]))||0
  
}
return (z*19/100).toFixed(2)
}
total(form:NgForm){
  let z=0
  for(let item of this.i ){
  z+=(parseFloat(form.value["bucati"+item])*parseFloat(form.value["pret"+item]))||0  
}
  return (z*19/100+z)
}
removeInput(i:number){
  if(this.x>1){
  this.i.splice(i-1,1)
  this.x=this.i.length
  }

}
exportPdf(){
  let data:any= document.getElementById('contcont')
  let clientdata:any= document.getElementById('')
  html2canvas(data,{scrollY: -window.scrollY})
  .then(canvas=>{
    let fileWidth = 210;
    let fileHeight = (canvas.height*fileWidth)/canvas.width;
    const tabel = canvas.toDataURL('image/png');
    const logo = new Image()
    logo.src='assets/pdflogo.png'
    const footer = new Image()
    footer.src = 'assets/footer.png'
    let PDF = new jsPDF('p', 'mm', 'a4');
    PDF.addImage(logo,'png', 0 , 0,210,50,'logo')
    PDF.addImage(tabel, 'png', 10, 70, 210, fileHeight,'tabel');
    PDF.addImage(footer,'png',0,270,210,30,'footer')
    let filedata=new Blob([PDF.output('blob')],{type:"application/pdf"})
    let form= new FormData()
    form.append('filename',this.showclient.controls.numeclient.value)
    form.append('file',filedata)
    this.api.saveFactura(form)
  })

}
onSearchClient(){
  this.api.searchClient(this.searchControl.value)
 }

}
