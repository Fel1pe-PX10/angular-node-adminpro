import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public google?: boolean,
        public img?: string,
        public role?: string,
        public uid?: string,
    ){}

    get imagenUrl() {
        
        if(this.img?.includes('https')){
            console.log(this.img);
            return this.img;
        }

        if(this.img){
            return `${baseUrl}/uploads/usuarios/${this.img}`;
        }
        else{
            return `${baseUrl}/uploads/no-image.png`;
        }
    }
}