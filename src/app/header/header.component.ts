import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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

  isScrolled = false;
  isHamburgerActive: boolean | null = null;
  scrollSubscription: Subscription;
  protected readonly Section = Section;
  protected readonly Sections = Object.values(Section);

  constructor(private scrollService: ScrollService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const largeMediaQuery = window.matchMedia('(min-width: 1024px)');

    if (this.isHamburgerActive && largeMediaQuery.matches) {
      this.toggleHamburger();
    }
  }

  scrollToSection(sectionId: string) {
    this.isHamburgerActive = this.isHamburgerActive ? false : this.isHamburgerActive;
    this.scrollService.scrollToSection(sectionId);
  }

  toggleHamburger() {
    this.isHamburgerActive = this.isHamburgerActive ? !this.isHamburgerActive : true;
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
