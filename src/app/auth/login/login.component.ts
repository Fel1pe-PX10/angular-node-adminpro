import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  
  public loginForm = this.fb.group({
    email:    [localStorage.getItem('email') || 'user1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember: [false]
  });

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  
  constructor(private fb: FormBuilder,
              private router:Router,
              private usuarioService: UsuarioService ) { }
  
  
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '193859895844-btth2gd6su43c6e2f34sequf0594169r.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential)
      .subscribe( resp => {
        this.router.navigateByUrl('/');
      })
  }

  

  login(){
    //console.log(this.loginForm.value);
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value)
        }
        else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

        
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
