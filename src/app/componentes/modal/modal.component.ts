import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api.service';
import { Location } from '@angular/common';
import { MedallaInterface } from 'src/app/modelos/medalla-interface';
import { PaisInterface } from 'src/app/modelos/pais-interface';
import { EventoInterface } from 'src/app/modelos/evento-interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  paises : PaisInterface[]=[];
  eventos : EventoInterface[]=[];


  constructor(
    public api : ApiService, 
    private location: Location
    ) {

   }

  ngOnInit(): void {
  this.getListPaises();
  this.getListEventos()
  

  }

  getListPaises(){
    this.api.getAllPaises()
    .subscribe(  data  =>(this.paises=data) 
      );
  }
  getListEventos(){
    this.api.getAllEventos()
    .subscribe(  data  =>(this.eventos=data) 
      );
  }



  onSaveMedalla(medallaForm: NgForm): void {


    let medalla : MedallaInterface={
      id:medallaForm.value.medallaId,
      ano: medallaForm.value.ano,
      tipo :medallaForm.value.tipo,
      paisId : parseInt(medallaForm.value.paisId),
      eventoId : parseInt(medallaForm.value.eventoId)
    };
    console.log(medallaForm.value);



    if (medallaForm.value.medallaId == 0) {
      // NEW
      console.log(medalla);

      this.api.saveMedalla(medalla).subscribe(medalla => location.reload());
    } else {
      // update
      console.log(medalla);
      this.api.updateMedalla(medalla).subscribe(medalla => location.reload());
    }
  }

}
