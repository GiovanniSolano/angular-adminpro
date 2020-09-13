import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

    @Input() titulo = 'Sin titulo';

    // Doughnut
    @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
    @Input('data') doughnutChartData: MultiDataSet = [
      [250, 130, 70],
    ];

    public colors: Color[] = [
      {backgroundColor: ['#9E120E', '#FF5800', '#FFB414']}
    ];

}
