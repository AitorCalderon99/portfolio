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

  private destroy$ = new Subject<void>();

  constructor(private scrollService: ScrollService) {
  }

  ngAfterViewInit() {
    this.setupScrollListener();
    this.subscribeToScrollService();
  }

  scrollToElement(element: ElementRef) {
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
      .subscribe(() => this.scrollService.notifyScroll(scrollContainerElement.scrollTop));
  }

  private subscribeToScrollService() {
    this.scrollService.section$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sectionId => this.scrollToElement(this.sections.find(section => section.nativeElement.id === sectionId)));
  }
}
