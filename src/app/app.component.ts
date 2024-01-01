import {AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {WorkComponent} from "./work/work.component";
import {ScrollService} from "./shared/services/scroll.service";
import {ContactComponent} from "./contact/contact.component";
import {FooterComponent} from "./footer/footer.component";
import {fromEvent, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, AboutComponent, WorkComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  title = 'Portfolio';

  @ViewChildren('scrollContainer, home, about, work, contact, footer') sections: QueryList<ElementRef>;
  protected scrollSectionPosition: string;
  private destroy$ = new Subject<void>();

  constructor(private scrollService: ScrollService) {
  }

  ngAfterViewInit() {
    this.setupScrollListener();
    this.subscribeToScrollService();
  }

  scrollToElement(sectionId: string) {
    const element: ElementRef = this.sections.find(section => section.nativeElement.id === sectionId);
    element.nativeElement.scrollIntoView({behavior: "smooth"});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupScrollListener() {
    const scrollContainerElement = this.sections.toArray()[0].nativeElement;
    fromEvent(scrollContainerElement, 'scroll')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const scrollTop = scrollContainerElement.scrollTop;
        this.setScrollSectionPosition(scrollTop, scrollContainerElement.clientHeight);
        this.scrollService.notifyScroll(scrollTop);
      });
  }

  private setScrollSectionPosition(scrollTop: number, clientHeight: number) {
    const sectionsArray = this.sections.toArray();
    const currentComponentIndex = Math.floor(scrollTop / clientHeight);
    this.scrollSectionPosition = sectionsArray[currentComponentIndex + 1].nativeElement.id;
  }


  private subscribeToScrollService() {
    this.scrollService.section$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sectionId => this.scrollToElement(sectionId));
  }
}
