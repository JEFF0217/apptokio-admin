import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'; 


import { MedallaInterface } from '../modelos/medalla-interface';
import { PaisInterface } from '../modelos/pais-interface';
import { EventoInterface } from '../modelos/evento-interface';
import { DeporteInterface } from '../modelos/deporte-interface';
import { pairs } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url_api:string='https://apptokio.herokuapp.com/';


  constructor(private http: HttpClient) {}


  medalla?: Observable<any>;

  public selectedMedalla: MedallaInterface = {
    id:0,
    ano: '',
    tipo: '',
    paisId: 0,
    eventoId: 0,
    
  };

  getAllMedallas():Observable<MedallaInterface[]>{
   let direccion=this.url_api+'medallas';
   return this.http.get<MedallaInterface[]>(direccion);
  }


  getAllPaises():Observable<PaisInterface[]>{
   let direccion=this.url_api+'paises';
   return this.http.get<PaisInterface[]>(direccion);
  }

  
  getAllEventos():Observable<EventoInterface[]>{
   let direccion=this.url_api+'eventos';
   return this.http.get<EventoInterface[]>(direccion);
  }



  getPais(id:number):Observable<PaisInterface>{
    let direccion=this.url_api+'paises/'+id;
    return this.http.get<PaisInterface>(direccion);
   }



   getEvento(id:number):Observable<EventoInterface>{
    let direccion=this.url_api+'eventos/'+id;
    return this.http.get<EventoInterface>(direccion);
   }


   getDeporte(id:number):Observable<DeporteInterface>{
    let direccion=this.url_api+'deportes/'+id;
    return this.http.get<DeporteInterface>(direccion);
   }





   updateMedalla(medalla: MedallaInterface):Observable<MedallaInterface> {
 
 
    const medallaId = medalla.id;
    let direccion=this.url_api+ `medallas/${medallaId}`;
  
    return this.http
      .put<MedallaInterface>(direccion, {ano:medalla.ano,
        tipo:medalla.tipo,
        paisId:medalla.paisId,
        eventoId:medalla.eventoId});
  }



  deletemMedalla(id: number) {

    let direccion=this.url_api+ `medallas/${id}`;
    return this.http
      .delete<MedallaInterface>(direccion)
      .pipe(map(data => data));
  }


  
  saveMedalla(medalla: MedallaInterface) :Observable<MedallaInterface>{
    let direccion=this.url_api+ `medallas`;
   
    return this.http
      .post<MedallaInterface>(direccion, {
        ano:medalla.ano,
        tipo:medalla.tipo,
        paisId:medalla.paisId,
        eventoId:medalla.eventoId
      });
  }


}
