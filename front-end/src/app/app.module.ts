import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicComponent } from './topic/topic.component';
import { Wordle } from './wordle/wordle.component';
import { ExampleTopicComponent } from './example-topic/example-topic.component';
import { GPTService } from './service/gpt.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    Wordle,
    ExampleTopicComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [GPTService],
  bootstrap: [AppComponent]
})
export class AppModule { }
