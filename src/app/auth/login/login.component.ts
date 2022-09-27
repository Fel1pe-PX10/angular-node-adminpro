import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public loginForm = this.fb.group({
    email:    [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [false]
  });
  
  constructor(private fb: FormBuilder,
              private router:Router,
              private usuarioService: UsuarioService ) { }

  

  login(){
    console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp);

        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        }
        else{
          localStorage.removeItem('email');
        }
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    //this.router.navigateByUrl('/');
  }

}
