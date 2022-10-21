import { Usuario } from '../models/usuario.model';

export interface Cargarusuario {
    total: number;
    usuarios: Usuario[];
}