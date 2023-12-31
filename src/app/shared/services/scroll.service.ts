import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new Subject<number>();
  private sectionSource = new Subject<string>();

  section$ = this.sectionSource.asObservable();

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }

  notifyScroll(position: number) {
    this.scrollSubject.next(position);
  }

  scrollToSection(sectionId: string) {
    this.sectionSource.next(sectionId);
  }
}
