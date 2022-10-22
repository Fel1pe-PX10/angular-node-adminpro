import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = []; 
  public usuariosTmp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando = true;

    this.usuarioService.cargarUsuario( this.desde )
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTmp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0
    } else if( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();

  }

  buscar(termino: string): Usuario[] | undefined{

    if(termino.length === 0){
      return this.usuarios = this.usuariosTmp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe(resp => {
        this.totalUsuarios = resp.length;
        this.usuarios = resp;
      })
    return;
  }

}
