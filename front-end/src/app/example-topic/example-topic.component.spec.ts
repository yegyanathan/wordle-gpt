import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleTopicComponent } from './example-topic.component';

describe('ExampleTopicComponent', () => {
  let component: ExampleTopicComponent;
  let fixture: ComponentFixture<ExampleTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
