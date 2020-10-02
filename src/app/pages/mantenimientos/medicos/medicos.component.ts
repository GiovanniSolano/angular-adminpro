import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {


  public medicos: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;



  constructor(private medicoService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.imagenCambio
    .pipe(delay(100))
    .subscribe(img => this.cargarMedicos());


  }

  buscar(termino: string) {    

    if(termino.length === 0) {

    
      return this.cargarMedicos();

    }

    this.busquedaService.buscar('medicos', termino)
        .subscribe(resultados => {
          
          this.medicos = resultados;
        });
    
  }

  cargarMedicos() {
    
    this.cargando = true;

    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;
    });

  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe(resp => {
          Swal.fire(
            'Borrado!',
            'El médico ha sido borrado.',
            'success'
            );
            
          this.cargarMedicos();
        });
      }
    });
  }

  
  abrirModal(medico: Medico) {


    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);

  }


}
