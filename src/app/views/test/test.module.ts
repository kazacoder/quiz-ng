import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestRoutingModule} from './test-routing.module';
import {ResultComponent} from './result/result.component';
import {TestComponent} from './test/test.component';
import {ChoiceComponent} from './choice/choice.component';
import {FormsModule} from "@angular/forms";
import { AnswersComponent } from './answers/answers.component';


@NgModule({
  declarations: [
    ResultComponent,
    TestComponent,
    ChoiceComponent,
    AnswersComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule
  ]
})
export class TestModule {
}
