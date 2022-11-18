import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Cargarusuario } from '../interfaces/cargar-usuario.iterface';
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

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarStorage( token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

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

        this.guardarStorage(resp.token, resp.menu);

        return true;
      }),
      catchError( error => of(false))
    );
  }

  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${base_url}/usuarios`, formData)
              .pipe(
                tap((resp: any )=> {
                  this.guardarStorage(resp.token, resp.menu);
                })
              )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string | undefined}){

    data = {
      ...data,
      role: this.usuario.role
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers)
  }

  login( formData: LoginForm ){
    
    return this.http.post(`${base_url}/login`, formData)
              .pipe(
                tap((resp: any )=> {
                  //console.log(resp.token);
                  this.guardarStorage(resp.token, resp.menu);
                })
              );
  }

  loginGoogle( token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap((resp: any )=> {
          this.guardarStorage(resp.token, resp.menu);
        })
      );
  }

  cargarUsuario(desde: number = 0){
    const url = `${ base_url }/usuarios?desde=${ desde }`
    return this.http.get<Cargarusuario>(url, this.headers)
      .pipe(
        map( resp => {

          const usuarios = resp.usuarios.map(user => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid))

          return {
            total: resp.total,
            usuarios
          }
        })
      );
  }

  eliminarUsuario(usuario: Usuario){

    const url = `${ base_url }/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }

  guardarUsuario(usuario: Usuario ){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }


}
