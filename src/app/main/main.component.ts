import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';
import { MainupperComponent } from '../mainupper/mainupper.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ HeaderComponent, LoadingComponent, MainupperComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router
    ) {}
  @ViewChild("particle") particle : ElementRef<HTMLDivElement>
  @ViewChild("main") main : ElementRef<HTMLDivElement>
  @ViewChild("conteiner") conteiner : ElementRef<HTMLDivElement>
  @ViewChild("loading") loading : LoadingComponent
  @HostListener('window:scroll', ['$event'])
  SpawnParticle: boolean = true
  usedText: string[] = []
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    var reveal = document.querySelectorAll(".reveal")
    reveal.forEach(element => {
      var windowHeight = window.innerHeight
      var elementTop = element.getBoundingClientRect().top
      var elementVisible = -150
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
        if(element.classList.contains("WII")){
          element.previousElementSibling?.classList.add("active")
          let text = element.nextElementSibling! as HTMLSpanElement
          if(!(this.usedText.includes(text.getAttribute("text")!))){
            this.textAnimation(text)
            this.usedText.push(text.getAttribute("text")!)
          }
        }
      } else {
        element.classList.remove("active");
        if(element.classList.contains("WII")){
          element.previousElementSibling?.classList.remove("active")
          let text = element.nextElementSibling! as HTMLSpanElement
          if(this.usedText.includes(text.getAttribute("text")!)){
            this.textAnimation(text)
            this.usedText[this.usedText.indexOf((text.getAttribute("text")!))] = ""
          }
        }
      }
    });
    document.body.style.setProperty(
      "--scroll", (window.scrollY*1.35 /(document.body.scrollHeight - window.innerHeight)-0.001).toString()
    );
  }
  ngOnInit(){
    if(this.cookieService.check("skipLoading")){
      setTimeout(() => {
        this.loading.loading.nativeElement.style.display = "none"
        document.body.style.overflowY = "auto"
      }, 10);
    }
  }
  textAnimation(text : HTMLSpanElement){
    if(text.innerText == ""){
      let Newtext = text.getAttribute("text")!
      let interval = setInterval(function() {
        if(text.innerText == ""){
          text.innerText = "_"
        }
        else{
          text.innerText = text.innerText.replace(/.$/, Newtext.charAt(text.innerText.length-1) + "_");
          if(text.innerText.length == Newtext.length + 1){
            text.innerText = text.innerText.replace("_", "");
            clearInterval(interval)
          }
        }
      }, 100);
    }
    if(text.innerText != ""){
      setTimeout(() => {
        text.innerText = ""
      }, 100);
    }
  }
  onMove(event: MouseEvent){
    if (this.SpawnParticle){
      this.SpawnParticle = false
      setTimeout(() => {
        this.SpawnParticle = true
      }, 70);
      let posX = event.screenX - 45
      let posY = event.screenY - 70 + window.scrollY
      let Id = (Math.floor((Math.random() * 213769)).toString())
      let particleCopy = this.particle.nativeElement.cloneNode(true) as HTMLDivElement
      let moveX = ((Math.random() * 3) - 1)
      if(moveX <= 0.5 && moveX >= -0.5){
        moveX = 0.5
      }
      let moveY = ((Math.random() * 3) - 1)
      if(moveY <= 0.5 && moveY >= -0.5){
        moveY = -0.5
      }
      particleCopy.setAttribute("Id", Id)
      particleCopy.style.left = posX.toString() + "px"
      particleCopy.style.top = posY.toString() + "px"
      this.main.nativeElement.appendChild(particleCopy)
      let existing : HTMLDivElement
      let particles = document.getElementsByClassName("particle")
        Array.from(particles).forEach(element => {
          let div = element as HTMLDivElement
          if(div.getAttribute("Id") == Id){
            existing = div
          }
        });
      let interval = setInterval(() => {
        existing.style.left = (parseInt(existing.style.left.split("px")[0]) + moveX).toString() + "px"
        existing.style.top = (parseInt(existing.style.top.split("px")[0]) + moveY).toString() + "px"
      }, 20)
      setTimeout(() => {
        let particles = document.getElementsByClassName("particle")
        Array.from(particles).forEach(element => {
          let div = element as HTMLDivElement
          if(div.getAttribute("Id") == Id){
            clearInterval(interval)
            div.remove()
          }
        });
      }, 1000);
    }
  }
  navigate(){
    this.router.navigate(["buy"])
  }
}
