import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _ocultarModal: boolean = true;
  public tipo!:  'usuarios'|'medicos'|'hospitales';
  public id!: string | undefined;
  public img!: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal(){
    return this._ocultarModal;
  }

  constructor() { }

  abrirModal(tipo: 'usuarios'|'medicos'|'hospitales', id: string | undefined, img: string = 'no-image.png'){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img?.includes('https')){
      this.img = img;
    }
    else{
      this.img = `${ base_url }/uploads/${ tipo }/${ img }`
    }
  }
  
  cerrarModal(){
    this._ocultarModal = true;
  }

}
