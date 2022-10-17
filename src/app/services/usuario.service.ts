import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario!:  Usuario;

  constructor( private http: HttpClient ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }
  
  get uid(): string{
    return this.usuario.uid || '';
  }


  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke('ofpaez87@gmail.com', () => {

    });
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      map((resp: any )=> {

        const {
          email,
          google,
          nombre, 
          role,
          uid,
          img = ''
        } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', google, img, role, uid);

        localStorage.setItem('token', resp.token);

        return true;
      }),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData)
              .pipe(
                tap((resp: any )=> {
                  localStorage.setItem('token', resp.token)
                })
              )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string | undefined}){

    data = {
      ...data,
      role: this.usuario.role
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap((resp: any )=> {
                  //console.log(resp.token);
                  localStorage.setItem('token', resp.token);
                })
              );
  }

  loginGoogle( token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any )=> {
          localStorage.setItem('token', resp.token)
        })
      );
  }


}
