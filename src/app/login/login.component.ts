import { Component, OnInit } from '@angular/core';
import { LoginModel } from './loginModel';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = { userName: '', password: ''};

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginModel).subscribe(() => this.router.navigate(['/our-space']));
  }
}
