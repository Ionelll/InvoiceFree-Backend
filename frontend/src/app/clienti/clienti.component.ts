import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent  {
  i=[1]
  x=1
  z=0
addInput(){
  this.x=this.i.slice(-1)[0]
  this.x++
  this.i.push(this.x)
}

suma(form:NgForm,i:number){
  return form.value["bucati"+i]*form.value["pret"+i]
}
netto(form:NgForm){
  this.z=0
  for(let item of this.i ){
    this.z+=(parseInt(form.value["bucati"+item])*parseInt(form.value["pret"+item]))||0
  }
  return this.z
}

}