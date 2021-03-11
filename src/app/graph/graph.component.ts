import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'RRS443',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'blue',
    },
    {
      data: [],
      label: 'RRS547',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'green',
    },
    {
      data: [],
      label: 'RRS667',
      type: 'line',
      pointRadius: 0,
      fill: false,
      lineTension: 0,
      borderWidth: 2,
      borderColor: 'red',
    },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: { responsive: true, },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Measure'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'MIDI note'
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor() { }

  ngOnInit(): void {
  }

}
