import { Component, OnInit } from '@angular/core';

import { delay, Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();

    
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => {
        this.cargarHospitales()
      });
  }

  cargarHospitales(){
    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  guardarCambios( hospital: Hospital ){
    
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })
  }

  borrarHospital( hospital: Hospital ){
    
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe(resp => {
        this.cargarHospitales();
        Swal.fire('Eliminado', hospital.nombre, 'success');
      })
  }

  async abrirSweetAlert(){
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: 'Nombre del Hospital'
    })

    if( value!.trim().length > 0){
      this.hospitalService.crearHospital(value)
        .subscribe( (resp: any) => {
          Swal.fire('Hospital Creado', resp.hospital.nombre, 'success');
          this.hospitales.push(resp.hospital);
        })
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img); 
  }



}
