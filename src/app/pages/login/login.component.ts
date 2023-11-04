import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData={
    "username":"",
    "password":""
  }


  constructor(private snack:MatSnackBar,private loginService:LoginService) { }



  ngOnInit(): void {
  }


  formSubmit(){

    //console.log("Clik en el boton Login");

    if(this.loginData.username =="" || this.loginData.username ==null){

      this.snack.open("EL nombre del usuario es requerido!!","aceptar",{
        duration:3000
      })
      return;
    }

    if(this.loginData.password=="" || this.loginData.password ==null){

      this.snack.open("EL password es requerido!!","aceptar",{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
       console.log(data);
       this.loginService.loginUser(data.token);
       this.loginService.getCurrentUser().subscribe((user:any)=>{
        this.loginService.setUser(user);
        console.log(user);

       //Validar que rol tiene el usuario que se loguea para definir que dashboard Mostrarle

        if(this.loginService.getUserRole()=="ADMIN"){
          //Mostrar el Dashboard de Administrador
       
           window.location.href="/admin";


          }else if(this.loginService.getUserRole()=="NORMAL"){
            //Mostrar el Dashboard de user o usuarios normales
             window.location.href="/user-dashboard";
           }
           
           else{
            this.loginService.logout();
           }
        
       });
    },(error)=>{
           console.log(error);
           this.snack.open("Detalles Invalidos!!","Aceptar",{
            duration:3000
           })
    }
    )

  }
}








