import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignupResponseType} from "../../../../types/signup-response.type";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[А-Я][а-яё]+\s*$/)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[А-Я][а-яё]+\s*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    agree: new FormControl(false, [Validators.required]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value.name, this.signupForm.value.lastName,
        this.signupForm.value.email, this.signupForm.value.password)
        .subscribe(
          {
            next: (data: SignupResponseType) => {
              if (data.error || !data.user) {
                this._snackBar.open('Ошибка при регистрации')
                throw new Error(data.message ? data.message : 'Error with data on signup');
              }

              this.authService.login(this.signupForm.value.email, this.signupForm.value.password)
                .subscribe(
                  {
                    next: (data: LoginResponseType) => {
                      if (data.error || !data.accessToken || !data.refreshToken || !data.fullName || !data.userId) {
                        this._snackBar.open('Ошибка при авторизации')
                        throw new Error(data.message ? data.message : 'Error with data on login');
                      }

                      this.router.navigate(['/choice']).then();
                    },
                    error: (error: HttpErrorResponse) => {
                      this._snackBar.open(error.error.message ? error.error.message : 'Ошибка при авторизации')
                      throw new Error(error.error.message);
                    }
                  }
                )

            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.open(error.error.message ? error.error.message : 'Ошибка при регистрации')
              throw new Error(error.error.message);
            }
          }
        )
    }
  }
}
