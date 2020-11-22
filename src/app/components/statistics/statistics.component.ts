import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { Activity } from '../../models/Activity';
import { ActivitiesService } from '../../services/activities/activities.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  constructor(private activitiesService: ActivitiesService) {}

  activities: Activity[];
  data: number[];

  monthCounter = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0 };

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.activitiesService.getActivities().subscribe(
      (data: Activity[]) => {
        if (!this.activities) {
          this.activities = [];
        }
        this.activities = data;
        this.byStartDate();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  byStartDate() {
    // tslint:disable-next-line: no-unused-expression
    const result = new Promise((resolve, reject) => {
      this.activities.forEach((activity, index) => {
        const month = this.findMonth(new Date(activity.startDate).getMonth() + 1);

        if (month !== -1) {
          this.monthCounter[month] += 1;
        }

        if (index === this.activities.length - 1) {
          resolve('success');
        }
      });
    });

    result
      .then((value) => {
        this.applyChart();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findMonth(month: number): number {
    const array = Object.keys(this.monthCounter);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; ++i) {
      if (month.toString() === array[i]) {
        return month;
      }
    }
    return -1;
  }

  applyChart() {
    const canvasA = document.getElementById('myChartA') as HTMLCanvasElement;
    const ctxA = canvasA.getContext('2d');
    // tslint:disable-next-line: no-unused-expression
    new Chart(ctxA, {
      type: 'bar',
      data: {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'כמות פעילויות המתוכננות לצאת לפי חודשים',
            data: [
              this.monthCounter[1],
              (this.monthCounter[2] = 5),
              this.monthCounter[3],
              this.monthCounter[4],
              this.monthCounter[5],
              this.monthCounter[6],
              this.monthCounter[7],
              this.monthCounter[8],
              this.monthCounter[9],
              this.monthCounter[10],
              this.monthCounter[11],
              this.monthCounter[12],
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const canvasB = document.getElementById('myChartB') as HTMLCanvasElement;
    const ctxB = canvasB.getContext('2d');
    // tslint:disable-next-line: no-unused-expression
    new Chart(ctxB, {
      type: 'pie',
      data: {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'כמות פעילויות המתוכננות לצאת לפי חודשים',
            data: [
              this.monthCounter[1],
              (this.monthCounter[2] = 5),
              (this.monthCounter[3] = 2),
              (this.monthCounter[4] = 5),
              (this.monthCounter[5] = 2),
              (this.monthCounter[6] = 1),
              this.monthCounter[7],
              this.monthCounter[8],
              this.monthCounter[9],
              this.monthCounter[10],
              this.monthCounter[11],
              this.monthCounter[12],
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 255, 0, 0.2)',
              'rgba(0, 153, 76, 0.2)',
              'rgba(128, 128, 128, 0.2)',
              'rgba(0, 0, 255, 0.2)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(153, 76, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(0, 153, 76, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(153, 76, 0, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const canvasC = document.getElementById('myChartC') as HTMLCanvasElement;
    const ctxC = canvasC.getContext('2d');

    // tslint:disable-next-line: no-unused-expression
    new Chart(ctxC, {
      type: 'line',
      data: {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'כמות פעילויות המתוכננות לצאת לפי חודשים',
            data: [
              this.monthCounter[1],
              (this.monthCounter[2] = 5),
              (this.monthCounter[3] = 2),
              (this.monthCounter[4] = 5),
              (this.monthCounter[5] = 2),
              (this.monthCounter[6] = 1),
              this.monthCounter[7],
              this.monthCounter[8],
              this.monthCounter[9],
              this.monthCounter[10],
              this.monthCounter[11],
              this.monthCounter[12],
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 255, 0, 0.2)',
              'rgba(0, 153, 76, 0.2)',
              'rgba(128, 128, 128, 0.2)',
              'rgba(0, 0, 255, 0.2)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(153, 76, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(0, 153, 76, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(153, 76, 0, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    const canvasD = document.getElementById('myChartD') as HTMLCanvasElement;
    const ctxD = canvasD.getContext('2d');

    // tslint:disable-next-line: no-unused-expression
    new Chart(ctxD, {
      type: 'polarArea',
      data: {
        labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
        datasets: [
          {
            label: 'כמות פעילויות המתוכננות לצאת לפי חודשים',
            data: [
              this.monthCounter[1],
              (this.monthCounter[2] = 5),
              (this.monthCounter[3] = 2),
              (this.monthCounter[4] = 5),
              (this.monthCounter[5] = 2),
              (this.monthCounter[6] = 1),
              this.monthCounter[7],
              this.monthCounter[8],
              this.monthCounter[9],
              this.monthCounter[10],
              this.monthCounter[11],
              this.monthCounter[12],
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 255, 0, 0.2)',
              'rgba(0, 153, 76, 0.2)',
              'rgba(128, 128, 128, 0.2)',
              'rgba(0, 0, 255, 0.2)',
              'rgba(0, 0, 0, 0.2)',
              'rgba(153, 76, 0, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 255, 0, 1)',
              'rgba(0, 153, 76, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(0, 0, 255, 1)',
              'rgba(0, 0, 0, 1)',
              'rgba(153, 76, 0, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
