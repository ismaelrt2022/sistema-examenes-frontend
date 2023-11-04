import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //Inyectamos http
  constructor(private http:HttpClient) { }

  //Se realiza peticion  al backend para generar Token
public generateToken(loginData:any){

  return this.http.post(`${baseUrl}/generate-token`,loginData)

}


//Iniciamos sesion y establecemos el token en el localStorage
public loginUser(token:any){
  localStorage.setItem('token',token);

}

  //Validamos que exista o este el token alamacenado
public isLoggedIn(){

  let tokenStr=localStorage.getItem('token');


  if(tokenStr ==undefined || tokenStr =='' || tokenStr==null){
    return false;
  }
  else{
    return true;

  }
}

//Cerrar sesion y eliminamos el token  del localstorage
public logout(){
localStorage.removeItem('token');
localStorage.removeItem('user');
return true;

}


//Obtenemos el token 
public getToken(){

  return localStorage.getItem('token');
}


//Pasamos el usuario al localstorage como String JSON
public setUser(user:any){
  localStorage.setItem('user',JSON.stringify(user));

}

//Obtenemos el usuario si no existe se cierra sesion
public getUser(){
  let UserSter =localStorage.getItem('user');
if(UserSter != null){
   return JSON.parse(UserSter);
}else{
  this.logout();
  return null;


}
}

//Obtengo usuario y rol
public getUserRole(){
  let user =this.getUser();
  return user.authorities[0].authority;

  }

  //Obter el actual usuario 
  public getCurrentUser(){


    return this.http.get(`${baseUrl}/actual-usuario`,)

  }
}


