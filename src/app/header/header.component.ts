import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ScrollService} from "../shared/services/scroll.service";
import {Subscription} from "rxjs";
import {Section} from "../shared/section.enum";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected readonly Section = Section;

  isScrolled = false;
  isHamburgerActive = false;
  scrollSubscription: Subscription;

  constructor(private scrollService: ScrollService) {
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
  }

  toggleButton() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }

  ngOnInit() {
    this.scrollSubscription = this.scrollService.getScrollObservable().subscribe((scrollPosition) => {
      this.isScrolled = scrollPosition > 100;
    });
  }

  ngOnDestroy() {
    this.scrollSubscription?.unsubscribe();
  }
}
