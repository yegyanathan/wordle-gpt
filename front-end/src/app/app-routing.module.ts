import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicComponent } from './topic/topic.component';
import { Wordle } from './wordle/wordle.component';


const routes: Routes = [
  {
    path: 'home',
    component: TopicComponent
  },
  {
    path: 'wordle',
    component: Wordle
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
