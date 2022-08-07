import { Component, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  image3Url:string ="/assets/img/POS.jpg";
  ShowtypeValue:boolean=false;
  ReceivableAmount:number = 0;

  public ngAfterViewInit(): void {
    this.SalesChartLine();
    this.PurchaseChartLine();
    this.StockChartGauge();
    this.StockLevelChartPie();
    this.ReceivableChartPie();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  ngOnInit(): void {
   
  }
  openNav()
  {
    if(this.ShowtypeValue == false)
    {
     {
       this.ShowtypeValue = true;
       document.getElementById("mySidenav")!.style.width = "250px";
       document.getElementById("main")!.style.marginLeft = "250px";
     }
    }
    else{
     this.ShowtypeValue = false;
     document.getElementById("mySidenav")!.style.width = "0";
     document.getElementById("main")!.style.marginLeft= "0";
    }
   
  
 }
 private SalesChartLine(): void {
  let date = new Date();
    const data: any[] = [];

    for (let i = 0; i < 10; i++) {
      date.setDate(new Date().getDate() + i);
      data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
    }

    const chart = Highcharts.chart('Sales', {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Sales',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: null,
        }
      },
      xAxis: {
        type: 'category',
      },
      tooltip: {
        headerFormat: `<div>Date: {point.key}</div>`,
        pointFormat: `<div>{series.name}: {point.y}</div>`,
        shared: true,
        useHTML: true,
      },
      series: [{
        name: 'Amount',
        data,
      }],
    } as any);

    setInterval(() => {
      date.setDate(date.getDate() + 1);
      chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
    }, 1500);
  }

 
  private PurchaseChartLine(): void {
    let date = new Date();
      const data: any[] = [];
  
      for (let i = 0; i < 10; i++) {
        date.setDate(new Date().getDate() + i);
        data.push([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)]);
      }
  
      const chart = Highcharts.chart('Purchase', {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Purchase',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null,
          }
        },
        xAxis: {
          type: 'category',
        },
        tooltip: {
          headerFormat: `<div>Date: {point.key}</div>`,
          pointFormat: `<div>{series.name}: {point.y}</div>`,
          shared: true,
          useHTML: true,
        },
        series: [{
          name: 'Amount',
          data,
        }],
      } as any);
  
      setInterval(() => {
        date.setDate(date.getDate() + 1);
        chart.series[0].addPoint([`${date.getDate()}/${date.getMonth() + 1}`, this.getRandomNumber(0, 1000)], true, true);
      }, 1500);
    }

    private StockChartGauge(): void {
      const chart = Highcharts.chart('Stock', {
        chart: {
          type: 'solidgauge',
        },
        title: {
          text: 'Overall Stock',
        },
        credits: {
          enabled: false,
        },
        pane: {
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '85%'],
          size: '160%',
          background: {
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc',
          },
        },
        yAxis: {
          min: 0,
          max: 100,
          stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'], // red
          ],
          minorTickInterval: null,
          tickAmount: 2,
          labels: {
            y: 16,
          },
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: -25,
              borderWidth: 0,
              useHTML: true,
            },
          },
        },
        tooltip: {
          enabled: false,
        },
        series: [{
          name: null,
          data: [this.getRandomNumber(0, 100)],
          dataLabels: {
            format: '<div style="text-align: center"><span style="font-size: 1.25rem">{y}</span></div>',
          },
        }],
      } as any);
  
      setInterval(() => {
        chart.series[0].points[0].update(this.getRandomNumber(0, 100));
      }, 1000);
    }

    private StockLevelChartPie(): void {
      let date = new Date();
      const data: any[] = [];
  
      for (let i = 0; i < 5; i++) {
        date.setDate(new Date().getDate() + i);
        data.push({
          name: `${date.getDate()}/${date.getMonth() + 1}`,
          y: this.getRandomNumber(0, 1000),
        });
      }
  
      const chart = Highcharts.chart('StockLevel', {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Stock Level',
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
          pointFormat: '<span>Amount: {point.y}</span>',
          useHTML: true,
        },
       
        series: [{
          name: null,
          innerSize: '50%',
          data,
        }],
      } as any);
  
      setInterval(() => {
        date.setDate(date.getDate() + 1);
        chart.series[0].addPoint({
          name: `${date.getDate()}/${date.getMonth() + 1}`,
          y: this.getRandomNumber(0, 1000),
        }, true, true);
      }, 1500);
    }

    ReceivableChartPie(){

      let date = new Date();
      const data: any[] = [];
  
      // for (let i = 0; i < 5; i++) {
      //   date.setDate(new Date().getDate() + i);
      //   data.push({
      //     name: `${date.getDate()}/${date.getMonth() + 1}`,
      //     y: this.getRandomNumber(0, 1000),
      //   });
      // }

      data.push({name:'Receivable Amount',y:15000});
      this.ReceivableAmount = 15000;
      const chart = Highcharts.chart('Receivable', {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Receivable',
        },
        credits: {
          enabled: false,
        },
        // tooltip: {
        //   headerFormat: `<span class="mb-2">Date: {point.key}</span><br>`,
        //   pointFormat: '<span>Amount: {point.y}</span>',
        //   useHTML: true,
        // },
        plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
                  dataLabels: {
                      enabled: false,
                  }
              }
             
                
               
          },
        series: [{
          name: null,
          innerSize: '89%',
          data,
        }],
      } as any);
    
    }

  
}
