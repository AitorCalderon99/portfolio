import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  texts = ['Aitor Calderon', 'Frontend Developer', 'Web Developer'];
  mainText = this.texts[0];
  counter = 0;
  animateClass = 'animate__lightSpeedInRight';

  ngOnInit() {
    setInterval(() => {
      this.animateClass = 'animate__lightSpeedOutRight';
      setTimeout(() => {
        this.counter = (this.counter + 1) % this.texts.length;
        this.mainText = this.texts[this.counter];
        this.animateClass = 'animate__lightSpeedInRight';
      }, 1000);
    }, 4500);
  }

}
