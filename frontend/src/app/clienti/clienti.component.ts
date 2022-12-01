import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent {
  i=[1]
  
addInput(){
  let x=this.i.slice(-1)[0]
  x++
  this.i.push(x)
}

netto(form:NgForm){
  return form.value.bucati1*form.value.pret1
}
}

