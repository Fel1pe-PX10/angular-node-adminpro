import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import Swal from 'sweetalert2';

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

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de eliminar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.cargarUsuarios();
            Swal.fire(
              'Borrado!',
              `El usuario ${ usuario.nombre } ha sido borrado.`,
              'success'
            )
          })
        
      }
    })
    
    return;
  }

}
