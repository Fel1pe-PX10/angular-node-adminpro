import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir?: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService  ) { 
              
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);

    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe((resp: any ) => {
        const {nombre, email} = resp.msg;

        this.usuario.nombre = nombre;
        this.usuario.email = email;
      });
  }

  cambiarImagen(event: any): null | undefined {
    const file = event.target.files[0];

    this.imagenSubir = file;

    if(!file) { 
      return this.imgTemp = null; 
    }

    const reader = new FileReader;
    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }

    return;
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario.uid!)
      .then(img => this.usuario.img = img)
  }

}
