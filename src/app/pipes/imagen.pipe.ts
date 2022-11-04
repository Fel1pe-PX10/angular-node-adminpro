import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuario'|'medicos'|'hospitales'): string {
    
    if(!img){
      return `${baseUrl}/uploads/no-image.png`;
    }
    if(img?.includes('https')){
        console.log(img);
        return img;
    }
    if(img){
        return `${baseUrl}/uploads/${tipo}/${img}`;
    }
    else{
        return `${baseUrl}/uploads/no-image.png`;
    }
  }

}
