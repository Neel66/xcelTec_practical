import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loaderShow: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loaderShow = true;
    this._authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.loaderShow = false;
        // if (response && response.success) {
        this.router.navigate(['/audios']);
        this.toastr.success('Login successfully.', 'Success');
        // }
      },
      (e) => {
        this.router.navigate(['/audios']);
        this.loaderShow = false;
        this.toastr.error(
          e.error.errors.length && e.error.errors[0].message
            ? e.error.errors[0].message
            : e.error.message,
          'Error'
        );
      }
    );
  }
}
