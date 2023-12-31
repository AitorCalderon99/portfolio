import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {WorkComponent} from "./work/work.component";
import {ScrollService} from "./shared/services/scroll.service";
import {ContactComponent} from "./contact/contact.component";
import {FooterComponent} from "./footer/footer.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent, AboutComponent, WorkComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;

  title = 'Portfolio';

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  @ViewChild('home') home: ElementRef;
  @ViewChild('about') about: ElementRef;
  @ViewChild('work') work: ElementRef;
  @ViewChild('contact') contact: ElementRef;
  @ViewChild('footer') footer: ElementRef;

  constructor(private scrollService: ScrollService) {
  }

  ngAfterViewInit() {
    const containerElement = this.scrollContainer.nativeElement;

    containerElement.addEventListener('scroll', () => {
      this.scrollService.notifyScroll(containerElement.scrollTop);
    });

    this.subscription = this.scrollService.section$.subscribe(sectionId => {
      this.scrollToElement(this[sectionId]);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  scrollToElement(element: ElementRef) {
    element.nativeElement.scrollIntoView({behavior: "smooth"});
  }
}
