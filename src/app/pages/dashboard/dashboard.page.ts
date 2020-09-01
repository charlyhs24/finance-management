import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { CreateFinanceAccountComponent } from 'src/app/components/create-finance-account/create-finance-account.component';
import { Chart } from "chart.js";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  bars: any;
  colorArray: any;
  constructor(
    public modalCtrl: ModalController,
    private menuCtrl: MenuController,
    private auth: AuthService
  ) { }
  showChart() {
    const ctx = (<any>document.getElementById('myChart')).getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mar', 'Apr', 'Mey', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: null,
          data: [900, 4800, 4800, 12000, 1200, 300],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  ngOnInit() {
    this.menuCtrl.enable(true);
    this.showChart();
  }
  logoutHandler() {
    this.auth.signout();
  }
  async showModalHandler() {
    const modal = await this.modalCtrl.create({
      component: CreateFinanceAccountComponent
    });
    await modal.present()
  }
}
