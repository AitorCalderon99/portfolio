import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private scrollSubject = new Subject<number>();
  private sectionSource = new Subject<string>();
  private scrollSectionPosition= new Subject<string>();

  section$ = this.sectionSource.asObservable();
  position$= this.scrollSectionPosition.asObservable();

  getScrollObservable() {
    return this.scrollSubject.asObservable();
  }

  notifyScroll(position: number) {
    this.scrollSubject.next(position);
  }

  scrollToSection(sectionId: string) {
    this.sectionSource.next(sectionId);
  }

  setScrollSectionPosition(position: string){
    this.scrollSectionPosition.next(position);
  }
}
