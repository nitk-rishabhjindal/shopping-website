import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../signin/signin.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{6,}')]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{6,}')]);
  submitted = false;
  misMatchPassword = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  registerClicked() {
    this.submitted = true;
    if (!(this.firstName.errors &&
      this.lastName.errors &&
      this.email.errors &&
      this.password.errors &&
      this.confirmPassword.errors)) {
      if (this.password.value === this.confirmPassword.value) {
        this.router.navigate(['/home'])
      } else {
        this.misMatchPassword = true;
      }
    }
  }

}
