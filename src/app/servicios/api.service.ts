import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'; 


import { MedallaInterface } from '../modelos/medalla-interface';
import { PaisInterface } from '../modelos/pais-interface';
import { EventoInterface } from '../modelos/evento-interface';
import { DeporteInterface } from '../modelos/deporte-interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url_api:string='https://apptokio.herokuapp.com/';


  constructor(private http: HttpClient) {}


  medalla?: Observable<any>;

  getAllMedallas():Observable<MedallaInterface[]>{
   let direccion=this.url_api+'medallas';
   return this.http.get<MedallaInterface[]>(direccion);
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


/*
   updateMedalla(medalla):Observable<MedallaInterface> {
 
    const medallaId = medalla.medallaId;
    let direccion=this.url_api+ `medallas/${medallaId}`;
  
    return this.http
      .put<MedallaInterface>(direccion, medalla)
      .pipe(map(data => data));
  }
*/


  deletemMedalla(id: number) {

    let direccion=this.url_api+ `medallas/${id}`;
    return this.http
      .delete<MedallaInterface>(direccion)
      .pipe(map(data => data));
  }
}
