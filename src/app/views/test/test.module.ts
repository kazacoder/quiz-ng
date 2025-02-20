import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TestRoutingModule} from './test-routing.module';
import {ResultComponent} from './result/result.component';
import {TestComponent} from './test/test.component';
import {ChoiceComponent} from './choice/choice.component';


@NgModule({
  declarations: [
    ResultComponent,
    TestComponent,
    ChoiceComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule {
}
