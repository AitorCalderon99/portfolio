import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {WorkComponent} from "./work/work.component";
import {ScrollService} from "./shared/services/scroll.service";
import {ContactComponent} from "./contact/contact.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HomeComponent, AboutComponent, WorkComponent, ContactComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(private scrollService: ScrollService) {}

  title = 'Portfolio';

  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  ngAfterViewInit() {
    const containerElement = this.scrollContainer.nativeElement;

    containerElement.addEventListener('scroll', () => {
      const scrollPosition = containerElement.scrollTop;
      this.scrollService.notifyScroll(scrollPosition);
    });
  }
}
