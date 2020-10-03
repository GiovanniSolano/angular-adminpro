import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor(public sidebarService: SidebarService, private usuarioService: UsuarioService) {
    
  }
  
  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }

}
