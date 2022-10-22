import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private transformarUsuarios( valores:any[]): Usuario[]{
    return valores.map((user:any) => new Usuario(user.nombre, user.email, '', user.google, user.img, user.role, user.uid))
  }

  constructor( private http:HttpClient ) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string){
    const url = `${ base_url }/todo/coleccion/${tipo}/${termino}`
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.data)
              break;
          
            default:
              return [];
              break;
          }
        })
      )
  }
}
