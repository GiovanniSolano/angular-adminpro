import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(retry(1))
    // .subscribe(valor => console.log(valor),
    // (err) => console.warn('Error', err),
    // () => console.info('Salió'));

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

   }

   ngOnDestroy(): void {
     this.intervalSubs.unsubscribe();
   }

   retornaIntervalo(): Observable<number>  {

    return interval(500)
            .pipe(
              map(valor => valor + 1),
              filter(valor => valor % 2 === 0),
              take(10));

   }

   retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
    const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if ( i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('2 ya eh');
        }
        

      }, 1000);

    });

   }



}
