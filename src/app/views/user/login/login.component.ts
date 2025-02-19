import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          {
            next: (data: LoginResponseType) => {
              if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
                this._snackBar.open('Ошибка при авторизации')
                throw new Error(data.message ? data.message : 'Error with data on login');
              }

              this.authService.setUserInfo({
                fullName: data.fullName,
                userId: data.userId,
                email: this.loginForm.value.email,
              })
              this.authService.setTokens(data.accessToken, data.refreshToken);
              this.router.navigate(['/choice']).then();

            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.open(error.error.message ? error.error.message : 'Ошибка при авторизации')
              throw new Error(error.error.message);
            }
          }
        )
    }
  }
}
