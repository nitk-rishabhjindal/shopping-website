import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern('(?=.*[a-z])(?=.*[0-9]).{6,}')]);
  submitted = false;
  constructor(private router: Router) { }
  ngOnInit() {
  }

  loginClick() {
    this.submitted = true;
    if (!(this.email.errors || this.password.errors)) {
      this.router.navigate(['/home'])
    }
  }
}
