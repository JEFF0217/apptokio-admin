import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { pairs } from 'rxjs';
import { DeporteInterface } from 'src/app/modelos/deporte-interface';
import { EventoInterface } from 'src/app/modelos/evento-interface';
import { MedallaInterface } from 'src/app/modelos/medalla-interface';
import { PaisInterface } from 'src/app/modelos/pais-interface';

import { ApiService } from 'src/app/servicios/api.service';
import { NgForm } from '@angular/forms';






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


  

export class HomeComponent implements OnInit {


    medallas : MedallaInterface[]=[];

    pageActual: number = 1;


   editarPais = new FormGroup({
    nombre: new FormControl(''),
  });

   declare pais : PaisInterface;
   declare deporte: DeporteInterface;
   declare evento: EventoInterface;


  constructor(private api : ApiService,private router: Router) { }

  ngOnInit(): void {
    this.getListMedallas();  


     

    
  
  
  }

getListMedallas(){
  this.api.getAllMedallas()
  .subscribe(  data  => {
    this.medallas=data;
    this.llenarTabla(); }
    
    );
}


llenarTabla(){

for(let medalla of this.medallas){
 this.getEvento(medalla);
 this.getPais(medalla);
 this.getDeporte(medalla);
}

console.log(this.medallas);

}

getPais(medalla: MedallaInterface){
 
 this.api.getPais(medalla.paisId)
  .subscribe( data => {
    medalla.paisNombre = data.nombre;
    medalla.cantidad=1;
    });

}


delete(id: number){

  console.log(id);

  if (confirm('Are you sure to delete?')) {
    this.api.deletemMedalla(id).subscribe();

  this.medallas.forEach(function(medalla, index, object) {
    if(medalla.id === id){
      object.splice(index, 1);
    }
  });
  }
 

}

onPreUpdateMedalla(medalla: MedallaInterface): void {
  this.api.selectedMedalla = Object.assign({}, medalla);
}



getEvento(medalla: MedallaInterface){
 this.api.getEvento(medalla.eventoId)
  .subscribe(  data  => {
    
    medalla.eventoNombre=data.nombre;
    medalla.deporteId=data.deporteId;
    this.getDeporte(medalla)
  })


 // this.getDeporte(this.evento.deporteId);

 

  //return this.evento;



}

getDeporte(medalla: MedallaInterface){

  if(medalla.deporteId != null){
    this.api.getDeporte(medalla.deporteId)
    .subscribe(  data  => {
      medalla.deporteNombre = data.name
    });
  }
  
 
}


trackById(index: number, medalla:any){
  return medalla.id;
}


resetForm(medallaForm?: NgForm): void {
  this.api.selectedMedalla = {
    id:0,
    ano: '2020',
    tipo: '',
    paisId: 0,
    eventoId: 0,
  };
}







}
  