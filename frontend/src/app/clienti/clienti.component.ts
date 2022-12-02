import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent  {
  i=[1]
  x=1
  date=new Date()
  datenow=formatDate(this.date,'dd/MM/yyy','en-US')
addInput(){
  this.x=this.i.slice(-1)[0]
  this.x++
  this.i.push(this.x)
}

suma(form:NgForm,i:number){
  return form.value["bucati"+i]*form.value["pret"+i]
}
netto(form:NgForm){
  let z=0
  for(let item of this.i ){
  z+=(parseInt(form.value["bucati"+item])*parseInt(form.value["pret"+item]))||0
  }
  return z
}

}