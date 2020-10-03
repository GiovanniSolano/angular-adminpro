import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
declare function customSideBar();
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
  }

  ngOnInit(): void {
    customSideBar();
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
    
  }

}
