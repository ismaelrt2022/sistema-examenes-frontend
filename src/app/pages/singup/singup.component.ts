import { Component, OnInit,Input } from '@angular/core';
//import { ConsoleReporter } from 'jasmine';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {


 //Declarar variables

 public user ={
      username:'',
      password:'',
      nombre:'',
      apellido:'',
      email:'',
      telefono:''
 }
 
 //Inyectar la variable del servicio
  //Inyectar la variable snack
  constructor(private  userService:UserService,private snack:MatSnackBar) { }

  ngOnInit(): void {
  }

  //Funcion submit para enviar informacion para insertar
  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      //alert('El nombre del usuario es requerido')
      //Implementando MaterialSnackBar

      this.snack.open('Message archived', 'Undo', {
        duration: 3000
      });
      this.snack.open('El nombre del usuario es requerido!!','Aceptar',{
        duration:3000,     
        verticalPosition:'top',
        horizontalPosition:'right'
      });
     return;
    }
   
    //Se realiza la subscripcion donde 
    this.userService.añadirUsuario(this.user).subscribe(
      (data)=>{
                 console.log(data);
               //  alert("Usuario Guardado con exito");

Swal.fire("Usuario Guardado","Usuario Registrado con exito en el sistema","success");

      },(error)=>{
        console.log(error);
        //alert('Ha ocurrido un error en el sistema')

        this.snack.open('Ha ocurrido un error en el sistema!!','Aceptar',{
          duration:3000,
          verticalPosition:'top',
          horizontalPosition:'right'
        });
      }
    )

  }
}
