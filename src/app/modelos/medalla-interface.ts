export interface MedallaInterface{
    id:number;
    ano: string;
    tipo: string;
    paisId: number;
    eventoId: number;

    paisNombre?:string;
    eventoNombre?:string;
    deporteId?:number;
    deporteNombre?:string;
    cantidad?:number;
}