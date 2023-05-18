import { Component, Input } from '@angular/core';
import { GPTService } from '../service/gpt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'example-topic',
  templateUrl: './example-topic.component.html',
  styleUrls: ['./example-topic.component.scss']
})
export class ExampleTopicComponent {

  @Input() topic!: string;

  constructor(private gptService: GPTService, private route: Router) {}

  async onClick(): Promise<void> {
    const response = await this.gptService.generate(this.topic)
    var targetWord =response.targetWord;
    console.log(targetWord)
    this.route.navigate(['/wordle'], { queryParams: {targetWord: targetWord}});
  }

}
