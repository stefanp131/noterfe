import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  userName: string;
  navLinks = [
    {
      path: 'my-space',
      label: 'MySpace'
    },
    {
      path: 'our-space',
      label: 'OurSpace'
    }];

  constructor(private loginService: LoginService, private router: Router,
    private cookieService: CookieService, private headerService: HeaderService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  logout() {
    this.loginService.logout().subscribe(() => this.router.navigate(['/login']));
  }

  isNotAuthenticated() {
    return !this.cookieService.check('.AspNetCore.cookies');
  }

  getUserName() {
    if (!this.isNotAuthenticated()) {
      return 'Welcome';
    }
    return 'Login please!';
  }
}
