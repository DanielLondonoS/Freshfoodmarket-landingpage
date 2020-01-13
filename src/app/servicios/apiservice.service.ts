import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  urlApi:string ="http://freshfoodmarket.co/api/"
  constructor(private http: HttpClient) {

  }

  enviarContacto(nombre:string,correo:string,celular:string,descripcion:string){
    let headers = new HttpHeaders({'Content-type':'application/json'});
    let url : string =`${this.urlApi}Mensajeria/contactoweb?nombre=${nombre}&correo=${correo}&celular=${celular}&descripcion=${descripcion}`
    return this.http.get(url,{headers:headers})
  }

  enviarContactoPost(contacto:any){
    let headers = new HttpHeaders({'Content-type':'application/json','X-Requested-With': 'XMLHttpRequest'});
    // let headers = new HttpHeaders().set('Content-type','application/x-www-form-urlencoded');
    return this.http.post(`${this.urlApi}Mensajeria/contactoweb`,JSON.stringify(contacto),{headers:headers})
    // return this.http.post("http://localhost:29354/Api/Mensajeria/contactodaniel",JSON.stringify(ContactoDanielModel),{headers:headers})
  
}
}
