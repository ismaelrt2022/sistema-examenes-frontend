import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Inyectamos  la instancia de HttpClient para conectar con el backend @CorssOrigin("*")
    constructor(private httpClient: HttpClient) { }

 //Creamos metodo para hacer peticion POST de insercion

 public añadirUsuario(user:any){
  return this.httpClient.post(`${baseUrl}/usuarios/`,user);

 }

}
