import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoadingComponent {
  constructor(
    private cookieService: CookieService    
    ) {}
  @ViewChild("loadingText") loadingText : ElementRef<HTMLDivElement>
  @ViewChild("loading") loading : ElementRef<HTMLDivElement>
  loadingPercent : number = 1
  loadingSpeed : number = 100

  ngOnInit(){
    document.body.style.overflowY = "hidden"
    this.cookieService.set("skipLoading", "true")
    let interval = setInterval(() => {
      window.scrollTo(0,0)
    }, 1);
    setTimeout(() => {
      clearInterval(interval)
    }, 500);
    setTimeout(() => {
      document.body.style.overflowY = "auto"
      this.loading.nativeElement.remove()
    }, 9682);
    for (let i = 100; i > 0; i--) {
      setTimeout(() => {
        this.loadingText.nativeElement.innerText = `${this.loadingPercent.toString()}%`
        this.loadingPercent = this.loadingPercent + 1
      }, this.loadingSpeed)
      if(i < 70){
        this.loadingSpeed = this.loadingSpeed + 70
      }
      else{
        this.loadingSpeed = this.loadingSpeed + i
      }
      if (i < 22){
        this.loadingSpeed = this.loadingSpeed + (-(i-22)*7)
      }
    }
  }
}
