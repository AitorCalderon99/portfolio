import {Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isScrolled = false;
  isHamburgerActive = false;

  toggleButton() {
    this.isHamburgerActive = !this.isHamburgerActive;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Usar document.documentElement.scrollTop como principal referencia
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollPosition > 100;
  }
}
