import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  state: IAuth = {
    username: '',
    password: ''
  };
  constructor(
    private menuCtrl: MenuController,
    private auth: AuthService,
    private navCtrl: NavController
  ) {
    this.isLogedin();
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
  async isLogedin() {
    const isLogedIn = await this.auth.isLogedIn();
    if (isLogedIn) {
      this.navCtrl.navigateRoot('/dashboard');
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }
  onSubmitHandler() {
    this.auth.signin({
      username: this.state.username,
      password: this.state.password
    });
  }

}
