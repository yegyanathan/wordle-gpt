import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GPTService } from '../service/gpt.service';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {

  @ViewChild('input') input!: ElementRef<HTMLTextAreaElement>

  private topic = ""

  constructor(private route: Router, private gptService: GPTService) {}

  async onClick(): Promise<void> {
    this.topic = this.input.nativeElement.value
    console.log("topic =", this.topic)
    const response = await this.gptService.generate(this.topic)
    var targetWord = response.targetWord
    this.route.navigate(['/wordle'], { queryParams: {targetWord: targetWord}});
    this.input.nativeElement.value = '';
  }
  
}
