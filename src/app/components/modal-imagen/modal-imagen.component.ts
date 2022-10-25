import { Component, OnInit } from '@angular/core';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir?: File;
  public imgTemp: any = null;

  constructor( public modalImagenService: ModalImageService,
               public fileUploadService: FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id   = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir!, tipo, id!)
      .then(img => {
        Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(img);

        this.cerrarModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
  }

}
