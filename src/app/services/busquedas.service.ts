import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

   get headers() {
    return {
     headers: {
       'x-token': this.token
     }
    };
  }

  private transformarUsuarios(resultados: any[]): Usuario[] {
    return resultados.map(
      usuario => new Usuario(usuario.nombre, usuario.email, '', usuario.img, usuario.google, usuario.role, usuario.uid)
    );

  }

  buscar(tipo: 'usuarios'|'medicos'|'hospitales', termino: string = '') {
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers)
            .pipe(map((resp: any) => {

              switch (tipo) {
                case 'usuarios':
                  return this.transformarUsuarios(resp.resultados);
                  break;
                default:
                  return [];
              }

            }));

  }

}
