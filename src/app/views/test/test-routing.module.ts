import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChoiceComponent} from "./choice/choice.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";
import {AnswersComponent} from "./answers/answers.component";

const routes: Routes = [
  {path: 'choice', component: ChoiceComponent, title: 'Выбор теста'},
  {path: 'test/:id', component: TestComponent, title: 'Тест'},
  {path: 'result', component: ResultComponent, title: 'Результат'},
  {path: 'answers', component: AnswersComponent, title: 'Ответы'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
