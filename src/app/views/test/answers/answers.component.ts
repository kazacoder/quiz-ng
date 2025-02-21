import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../shared/services/test.service";
import {QuizResultType} from "../../../../types/quiz.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  userInfo = this.authService.getUserInfo()
  userInfoString: string = ''
  result: string = '';
  quiz!: QuizResultType;


  constructor(private authService: AuthService,
              private router: Router,
              private testService: TestService,
              private activatedRoute: ActivatedRoute,) {

  }

  ngOnInit(): void {
    if (this.userInfo) {
      this.userInfoString = this.userInfo?.fullName + ', ' + this.userInfo?.email
      this.testService.getAnswers(this.userInfo.userId, this.activatedRoute.snapshot.queryParams['id'] )
        .subscribe(result => {
          if (result) {

            if ((result as DefaultResponseType).error !== undefined) {
              throw new Error((result as DefaultResponseType).message);
            }
            this.quiz = (result as QuizResultType);
          }
        })
    }
  }

  backToResult() {
    if (this.activatedRoute.snapshot.queryParams['id']) {
      this.router.navigate(['/result'], {queryParams: {id: this.activatedRoute.snapshot.queryParams['id']}}).then();
    } else {
      this.router.navigate(['/']).then();
    }
  }
}
