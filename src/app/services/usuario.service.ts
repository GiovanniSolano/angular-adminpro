import { Injectable, NgZone } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone
              ) {

    this.googleInit();

   }

   get token(): string {
    return localStorage.getItem('token') || '';
   }
   get uid(): string {
    return this.usuario.uid || '';
   }

   get headers() {
     return {
      headers: {
        'x-token': this.token
      }
     };
   }


  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '48660591988-j342geqqtuug4olq6gl05um8crc627dv.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');

      });

    });

  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((resp: any) => {
      const {
        email,
        google,
        nombre,
        role,
        img = '',
        uid
      } = resp.usuario;
      
      this.usuario = new Usuario(nombre, email, '', img, google, role, uid);
      localStorage.setItem('token', resp.token);
      return true;
    }),
    catchError(error => of(false)));

  }


  crearUsuario(formData: RegisterForm) {
    

    return this.http.post(`${base_url}/usuarios`, formData)
                    .pipe(tap((resp: any) => {
                      localStorage.setItem('token', resp.token);
                    }));
    
  }

  actualizarUsuario(data: {email: string, nombre: string, role: string}) {

    data = {
      ...data,
      role: this.usuario.role
    };
    

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
    
  }

  login(formData: LoginForm) {
    

    return this.http.post(`${base_url}/login`, formData)
                    .pipe(tap((resp: any) => {
                      localStorage.setItem('token', resp.token);
                    }));
    
  }
  loginGoogle(token) {
    

    return this.http.post(`${base_url}/login/google`, {token})
                    .pipe(tap((resp: any) => {
                      localStorage.setItem('token', resp.token);
                    }));
    
  }

  cargarUsuarios(desde: number = 0) {

    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
            .pipe(
              map(resp => {
              const usuarios = resp.usuarios
              .map(usuario => new Usuario(usuario.nombre, usuario.email, '', usuario.img, usuario.google, usuario.role, usuario.uid));

              return {
                totalUsuarios: resp.totalUsuarios,
                usuarios
              };
            }));

  }

  eliminarUsuario(usuario: Usuario) {

    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);

  }

  guardarUsuario(usuario: Usuario) {

    

    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
    
  }

 

}
