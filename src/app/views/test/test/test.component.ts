import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestService} from "../../../shared/services/test.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {QuizQuestionType, QuizType} from "../../../../types/quiz.type";
import {ActionTestType} from "../../../../types/action-test.type";
import {UserResultType} from "../../../../types/user-result.type";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  quiz!: QuizType;
  timerSeconds = 59;
  private interval: number = 0;
  currentQuestionIndex: number = 1;
  chosenAnswerId: number | null = null;
  readonly userResult: Array<UserResultType> = [];
  actionTestType = ActionTestType

  constructor(private activatedRoute: ActivatedRoute,
              private testService: TestService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.testService.getQuiz(params['id'])
          .subscribe(result => {
            if (result) {
              if ((result as DefaultResponseType).error !== undefined) {
                throw new Error((result as DefaultResponseType).message)
              }
              this.quiz = result as QuizType;
              this.startQuiz();
            }
          })
      }
    })
  }

  get activeQuestion(): QuizQuestionType {
    return this.quiz.questions[this.currentQuestionIndex - 1]
  }

  startQuiz(): void {
    // progress bar

    // show question

    // this.interval = window.setInterval(() => {
    //   this.timerSeconds--;
    //   if (this.timerSeconds === 0) {
    //     clearInterval(this.interval);
    //     this.complete();
    //   }
    // }, 1000);

  }

  complete(): void {

  }

  move(action: ActionTestType):void {

    const existingResult: UserResultType | undefined = this.userResult.find(item => {
      return item.questionId === this.activeQuestion.id;
    });

    if (this.chosenAnswerId) {
      if (existingResult) {
        existingResult.chosenAnswerId = this.chosenAnswerId;
      } else {
        this.userResult.push({
          questionId: this.activeQuestion.id,
          chosenAnswerId: this.chosenAnswerId,
        });
      }
    }

    if (action === ActionTestType.next || action === ActionTestType.pass) {
      this.currentQuestionIndex++
    } else {
      this.currentQuestionIndex--
    }
    console.log(this.chosenAnswerId)
    const currentResult: UserResultType | undefined = this.userResult.find(item => {
      return item.questionId === this.activeQuestion.id;
    })

    if (currentResult) {
      this.chosenAnswerId = currentResult.chosenAnswerId;
    } else {this.chosenAnswerId = null}

    if (this.currentQuestionIndex > this.quiz.questions.length) {
      clearInterval(this.interval)
      this.complete();
      return;
    }

    // if (this.progressBarElement) {
    //   Array.from(this.progressBarElement.children).forEach((item: Element, index: number) => {
    //     const currentItemIndex: number = index + 1
    //     item.classList.remove('active');
    //     item.classList.remove('complete');
    //
    //     if (currentItemIndex === this.currentQuestionIndex) {
    //       item.classList.add('active');
    //     } else if (currentItemIndex < this.currentQuestionIndex) {
    //       item.classList.add('complete');
    //     }
    //   });
    // }

  }

}
