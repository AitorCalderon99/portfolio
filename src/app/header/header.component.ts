import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScrollService} from "../shared/services/scroll.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  isScrolled = false;
  isHamburgerActive = false;

  constructor(private scrollService: ScrollService) {
  }

  toggleButton() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }

  ngOnInit() {
    this.scrollService.getScrollObservable().subscribe((scrollPosition) => {
      this.isScrolled = scrollPosition > 100;
    });
  }
}
