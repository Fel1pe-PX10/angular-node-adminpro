import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../../models/medico.model';

import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital | undefined;
  public medicoSeleccionado!: Medico;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => this.cargarMedico(id) );


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId);
      })
  }

  guardarMedico(){

    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){
      // Actualiza Medico
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe(data => {
          Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
        })
    }
    else{
      // Crea el Medico
      
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe( (resp:any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id }`)
        });
    }
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      })
  }

  cargarMedico(id: string){

    if(id === 'nuevo'){
      return;
    }

    this.medicoService.cargarMedicosPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico: any) => {

        if(!medico){
          this.router.navigateByUrl(`/dashboard/medicos`)
        }
        const {nombre, hospital:{_id} } = medico;

        this.medicoForm.setValue({nombre, hospital: _id})
        this.medicoSeleccionado = medico;
      });
  }

}
