import { Component, OnInit, OnDestroy } from '@angular/core';

import { delay, Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImageService } from '../../../services/modal-image.service';

type NewType = Subscription;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = true;
  public medicos: Medico[] = [];

  public medicosTmp: Medico[] = [];

  public imgSubs!: NewType;

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImageService,
               private busquedaService: BusquedasService) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarMedicos()
      });
  }

  cargarMedicos(){
    
    this.cargando = true;

    this.medicoService.cargarMedicos()
      .subscribe((resp: any) => {
        this.cargando = false;
        this.medicos = resp;
        this.medicosTmp = resp;
      });
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img); 
  }

  buscar(termino: string): Medico[] | undefined {
    
    if(termino.trim().length === 0){
      return this.medicos = this.medicosTmp;
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp
      })


    return [];
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de eliminar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id)
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Borrado!',
              `El médico ${ medico.nombre } ha sido borrado.`,
              'success'
            )
          })
        
      }
    })
  }

}
