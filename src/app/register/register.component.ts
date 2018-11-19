import { Component, OnInit } from '@angular/core';
import { RegisterModel } from './registerModel';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { Error } from './errorModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerModel: RegisterModel = { userName: '', password: '', confirmPassword: ''};
  error: Error = { error: []};
  hasNotError = true;
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    if (this.confirmPassword()) {
      this.registerService.register(this.registerModel).subscribe(() => this.router.navigate(['/login']),
      err => {this.error = err.error;
        this.hasNotError = false; });
    }
  }

  confirmPassword() {
    if (this.registerModel.password === this.registerModel.confirmPassword) {
      return true;
    }
    return false;
  }
}
