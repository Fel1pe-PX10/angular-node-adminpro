import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  
  public menu: any[] = [];

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
    console.log(this.menu);
  }

  /* menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Progress', url: 'progress' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' },
        { titulo: 'Grafica', url: 'grafica1' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Medicos', url: 'medicos' },
      ]
    }
  ] */

  
}
