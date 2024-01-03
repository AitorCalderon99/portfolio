import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Section} from "../shared/section.enum";

@Component({
  selector: 'app-right-nav',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './right-nav.component.html',
  styleUrl: './right-nav.component.scss'
})
export class RightNavComponent {
  @Input() scrollSection: string;
  @Input() sections: Section[];
  @Output() sectionClick = new EventEmitter<string>();

  onSectionClick(section: string) {
    this.sectionClick.emit(section);
  }
}
