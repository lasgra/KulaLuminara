import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mainupper',
  standalone: true,
  imports: [],
  templateUrl: './mainupper.component.html',
  styleUrl: './mainupper.component.css'
})
export class MainupperComponent {
  @ViewChild("img1") img1: ElementRef<HTMLImageElement>
  @ViewChild("img1blur") img1blur: ElementRef<HTMLImageElement>
  @ViewChild("img2") img2: ElementRef<HTMLImageElement>
  @ViewChild("img2blur") img2blur: ElementRef<HTMLImageElement>
  @ViewChild("mainText") mainText : ElementRef<HTMLSpanElement>
  
  ngOnInit(){
    let words = ["Niesamowita", "Jasna", "Biała", "Świecąca", "Kulowata", "Niezwykła", "Przykuwająca", "Ekskluzywna", "Niesamowita", "Intrygująca", "Ekologiczna", "Wysokiej jakości", "Uderzająca", "Zastanawiająca"]
    let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","J","I","K","L","M","N","O","P","R","S","T","U","V","W","X","Y","Z","!","@","#","$","%","*","&","(",")"]
    let cycles = 1
    let removing = true
    let wordToAdd = ""
    let waiting = 0
    setTimeout(() => {
      let text = this.mainText.nativeElement
      setInterval(() => {
        if(waiting == 0){
          if(removing){
            if (cycles > 0 && cycles < 10){
              let random = Math.floor(Math.random() * letters.length)
              text.innerText = text.innerText.replace(/.$/, letters[random]);
              cycles = cycles + 1
            }
            else{
              text.innerText = text.innerText.replace(/.$/, "");
              cycles = 1
            }
            if(text.innerText == ""){
              removing = false
              waiting = 30
            }
          }
          else{
            if (text.innerText == ""){
              this.changePicture()
              let random = Math.floor(Math.random() * words.length)
              text.innerText = "%"
              wordToAdd = words[random]
            }
            if (cycles > 0 && cycles < 10){
              let random = Math.floor(Math.random() * letters.length)
              text.innerText = text.innerText.replace(/.$/, letters[random]);
              cycles = cycles + 1
            }
            else{
              text.innerText = text.innerText.replace(/.$/, wordToAdd.charAt(text.innerText.length-1) + "&");
              cycles = 1
              if(text.innerText == (wordToAdd + "&")){
                text.innerText = wordToAdd
                removing = true
                waiting = 1
              }
            }
          }
        }
        else{
          waiting = waiting + 1
          if (waiting > 80){
            waiting = 0
          }
        }
      }, 25);
    }, 200);
  }
  changePicture(){
    let img1b = this.img1blur.nativeElement
    let img1 = this.img1.nativeElement
    let img2b = this.img2blur.nativeElement
    let img2 = this.img2.nativeElement
    let random = Math.floor(Math.random()*234)
    if(img1.style.display == "none"){
      img1.style.display = "block"
      img1b.style.display = "block"
      img2.classList.add("fallAnim1")
      img2b.classList.add("fallAnim1")
      setTimeout(() => {
        img2.style.display = "none"
        img2b.style.display = "none"
        img2.src = "https://picsum.photos/350/600?random=" + random.toString()
        img2b.src = "https://picsum.photos/350/600?random=" + random.toString()
        img2.classList.remove("fallAnim1")
        img2b.classList.remove("fallAnim1")
      }, 1000);
    }
    else{
      img2.style.display = "block"
      img2b.style.display = "block"
      img1.classList.add("fallAnim2")
      img1b.classList.add("fallAnim2")
      setTimeout(() => {
        img1.style.display = "none"
        img1b.style.display = "none"
        img1.src = "https://picsum.photos/350/600?random=" + random.toString()
        img1b.src = "https://picsum.photos/350/600?random=" + random.toString()
        img1.classList.remove("fallAnim2")
        img1b.classList.remove("fallAnim2")
      }, 1000);
    }
  }
}
