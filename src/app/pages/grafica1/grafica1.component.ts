import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  labels1: string[] = ['Download Sales1', 'In-Store Sales1', 'Mail-Order Sales1'];
  data1 = [
    [455, 200, 10]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
