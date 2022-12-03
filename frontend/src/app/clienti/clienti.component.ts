import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
  animations:[
    trigger('enterleave',[
      transition('*=>void',[
      animate('100ms', style({height:0}))
    ]),
      transition('void=>*',[
        
        animate('100ms',style({height:'2.4em'}))
      ])
  ])
  ]
})
export class ClientiComponent  {
  i=[1]
  x=1
  date=new Date()
  y=this.date.getFullYear()
  m=this.date.getMonth()
  d=this.date.getDay()
  datenow=this.d+'/'+this.m+'/'+this.y
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
removeInput(i:number){
  this.i.splice(i-1,1)
  this.x=this.i.length

}

}