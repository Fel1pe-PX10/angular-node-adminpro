import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    
    

    /* this.retornaObservable().pipe(
      retry()
    )
        .subscribe(
          valor => console.log('Sub ', valor),
          err => console.warn('Error', err),
          () => console.log('Obs Terminado')
    ); */

    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        valor => console.log(valor)
      );


  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  retornaIntervalo():Observable<number> {
    return interval(200)
                      .pipe(
                        take(1000),
                        map( valor => valor+1),
                        filter(valor => (valor % 2 === 0) ? true : false)
                      );
  }

  retornaObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>( observer => {
      
      const intervalo = setInterval(() => {
        
        i++
        observer.next(i);

        if(i == 4){
          clearInterval();
          observer.complete();
        }
        
        if(i == 2){
          observer.error("i llego a dos");
        }
      
      }, 1000)
    });

    return obs$;
  }

}
