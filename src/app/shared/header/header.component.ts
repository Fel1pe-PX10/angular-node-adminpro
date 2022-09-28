import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  logout(){
    this.usuarioService.logout();
    return this.router.navigateByUrl('/login');
  }
}
