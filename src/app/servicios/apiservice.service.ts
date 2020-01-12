import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  urlApi:string ="http://freshfoodmarket.co/api/ "
  constructor(private http: HttpClient) {

  }

  enviarContacto(nombre:string,correo:string,celular:string,descripcion:string){
    return this.http.get(`${this.urlApi}Mensajeria/contactoweb?nombre=${nombre}&correo=${correo}&celular=${celular}&descripcion=${descripcion}`)
  }
}
