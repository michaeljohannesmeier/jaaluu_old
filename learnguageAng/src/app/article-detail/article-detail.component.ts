// import { Component, OnInit, Input, ViewChild, ElementRef, Inject} from '@angular/core';
// import { ActivatedRoute, Params, Router} from '@angular/router';
// import { TextPart } from '../textpart.model';
// import { TextService } from '../text.service';
// import { DOCUMENT } from '@angular/common';



// @Component({
//   selector: 'app-article-detail',
//   templateUrl: './article-detail.component.html',
//   styleUrls: ['./article-detail.component.css']
// })



// export class ArticleDetailComponent implements OnInit {
//   text: TextPart;
//   showPicturesChecked = true;
//   showPicturesHover = false;
//   pictureShow: any;
//   topPics = true;
//   imageSize: string;
//   markedWords: string[] = [];
//   completeText: TextPart[];
//   textId: string;
//   boolOpen = false;
//   @ViewChild('checkboxContainer') checkboxContainer: ElementRef;

//   constructor(private router: Router,
//               private route: ActivatedRoute,
//               private textService: TextService,
//               @Inject(DOCUMENT) document) { }

//   public ngOnInit() {
//     if (window.innerWidth < 800) {
//       this.imageSize = Math.floor(window.innerWidth / 4) + 'px';
//     } else {
//       this.imageSize = Math.floor(window.innerWidth * 0.6 / 4) + 'px';
//     }
//     this.route.params.subscribe( params => {
//       this.textId = params.id;
//     });
//     this.textService.getText(this.textId).subscribe(text => {
//       const textLen = Object.keys(text).length - 1;
//       const completeText = [];
//       for (let i = 0; i < textLen / 4 ; i++) {
//         completeText.push(new TextPart(
//           text['oTextHeadline' + i],
//           text['transHeadline' + i],
//           text['oTextParagraph' + i],
//           text['transParagraph' + i]
//           ));
//       }
//       this.completeText = completeText;
//     });
//     this.markedWords = this.textService.getMarkedWords();


//   }

//   toggleVisibility(e) {
//     this.showPicturesChecked = e.target.checked;
//   }

//   toggleColor(event) {
//     // if (window.innerWidth > 800) {
//     //   const word = event.target.innerHTML;
//     //   this.markedWords = this.textService.toggleAndGetMarkedWord(word);

//     // }
//   }

//   toggleColorMobile(textpart, i, event) {
//     const word = document.getElementById(textpart + i);
//     if (word.style.color === 'orange') {
//       word.style.color = 'black';
//     } else {
//       word.style.color = 'orange';
//     }
//   }


//   // openPop(event, p, textPartIndex, i, textPart_transParagraph) {
//   //   if (window.innerWidth > 800) {
//   //     if (event.clientY / window.innerHeight > 0.5) {
//   //       this.topPics = true;
//   //     } else {
//   //       this.topPics = false;
//   //     }
//   //     this.showPicturesHover = true;
//   //     this.pictureShow = {
//   //       textPartIndex: textPartIndex,
//   //       i: i,
//   //       textPart_transParagraph: textPart_transParagraph
//   //     };
//   //     p.open();
//   //   }
//   // }

//   closePop(p) {
//     // if (window.innerWidth < 500 ) {
//       // this.boolClose = true;
//       // setTimeout( () => { this.boolClose = false; }, 300 );
//     // }
//     p.close();
//     this.boolOpen = false;
//   }

//   mouseEnter(p, event, textPartIndex, i, textPart_transParagraph) {

//       if (event.clientY / window.innerHeight > 0.5) {
//         this.topPics = true;
//       } else {
//         this.topPics = false;
//       }
//       this.showPicturesHover = true;
//       this.pictureShow = {
//         textPartIndex: textPartIndex,
//         i: i,
//         textPart_transParagraph: textPart_transParagraph
//       };
//       p.open();
//       this.boolOpen = true;
//     }

// }


// [style.color]="markedWords.indexOf(word)==-1 ? 'black' : 'orange'"


import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { TextPart } from '../textpart.model';
import { TextService } from '../text.service';
import { Observable } from 'rxjs';
import {Howl, Howler} from 'howler';



@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})



export class ArticleDetailComponent implements OnInit {
  text: TextPart;
  showPicturesChecked = true;
  showPicturesHover = false;
  pictureShow: any;
  topPics = true;
  imageSize: string;
  markedWords: string[] = [];
  completeText: TextPart[];
  textId: string;
  boolOpen = false;
  p: any;
  triggers = 'mouseenter:mouseleave';
  mobileScreen = false;
  category: Observable<string>;
  lang = 'eng';
  @ViewChild('checkboxContainer') checkboxContainer: ElementRef;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private textService: TextService) {}

  public ngOnInit() {

    document.addEventListener('scroll', e => {
      this.close();
    });

    if (window.innerWidth < 800) {
      this.imageSize = Math.floor(window.innerWidth / 4) + 'px';
    } else {
      this.imageSize = Math.floor(window.innerWidth * 0.6 / 4) + 'px';
    }
    this.route.params.subscribe( params => {
      this.textId = params.id;
    });
    this.route.queryParams.subscribe(qParams => {
      this.category = qParams.category;
    });
    this.textService.getText(this.textId).subscribe(text => {
      const textLen = Object.keys(text).length - 2;
      const completeText = [];
      for (let i = 0; i < textLen / 4 ; i++) {
        completeText.push(new TextPart(
          text['oTextHeadline' + i],
          text['transHeadline' + i],
          text['oTextParagraph' + i],
          text['transParagraph' + i]
          ));
      }
      this.completeText = completeText;
    });
    this.markedWords = this.textService.getMarkedWords();

    window.addEventListener('touchstart', () => {
      this.triggers = 'manual';
      this.mobileScreen = true;
    });

    const myAudio = <HTMLAudioElement>document.getElementById('my-audio');
    const play = document.getElementById('play');
    const pause = document.getElementById('pause');
    const bar = document.getElementById('bar');
    const currentTime = document.getElementById('current-time');
    const myAudioSrc = <HTMLSourceElement>document.getElementById('my-audio-src');
    myAudioSrc.src = 'static/assets/audio/text' + this.textId + '.mp3';
    currentTime.innerHTML = '00:00';
    myAudio.load();

    function displayControls() {
       play.style.display = 'block';
    }
    if (myAudio.paused) {
       displayControls();
    } else {
       myAudio.addEventListener('canplay', function() {
          displayControls();
       });
    }

    play.addEventListener('click', () => {
          myAudio.play();
          play.style.display = 'none';
          pause.style.display = 'block';
    });

    pause.addEventListener('click', function() {
       myAudio.pause();
       pause.style.display = 'none';
       play.style.display = 'block';
       const words = document.getElementsByClassName('word');
       for (let i = 0; i < words.length; i++) {
         const word = <HTMLElement>words[i];
         word.style.color = 'black';
       }
    });

    myAudio.addEventListener('timeupdate', function() {
      if (myAudio.readyState > 0) {
        const intNum: number = Math.round((myAudio.currentTime / this.duration) * 100);
        bar.style.width = intNum.toString() + '%';
        const minutes = Math.floor(myAudio.currentTime / 60);
        const seconds = Math.floor(myAudio.currentTime - minutes * 60);
        let secondsStr: string;
        if (seconds < 10) {
            secondsStr = '0' + seconds;
          } else {
            secondsStr = '' + seconds;
          }
        currentTime.innerHTML = minutes + ':' + secondsStr;

        const checkboxHighlightText = document.getElementById('show-text-highlight') as HTMLInputElement;
        if (checkboxHighlightText.checked) {
          const words = document.getElementsByClassName('word') as HTMLCollectionOf<HTMLElement>;
          let currentWord: number;
          currentWord = Math.round((myAudio.currentTime / this.duration) * words.length);
          let start: number;
          for (let i = 0; i < words.length; i++) {
            words[i].style.color = 'black';
          }
          if (currentWord === 0) {
            start = 0;
          } else {
            start = currentWord - 1;
          }
          for (let i = start; i < currentWord; i++) {
            if (i < 8) {
                words[0].style.color = '#4CAF50';
                words[1].style.color = '#4CAF50';
                words[2].style.color = '#4CAF50';
                words[3].style.color = '#4CAF50';
                words[4].style.color = '#4CAF50';
                words[5].style.color = '#4CAF50';
                words[6].style.color = '#4CAF50';
                words[7].style.color = '#4CAF50';
            } else {
                words[i - 8].style.color = 'black';
                words[i - 7].style.color = '#4CAF50';
                words[i - 6].style.color = '#4CAF50';
                words[i - 5].style.color = '#4CAF50';
                words[i - 4].style.color = '#4CAF50';
                words[i - 3].style.color = '#4CAF50';
                words[i - 2].style.color = '#4CAF50';
                words[i - 1].style.color = '#4CAF50';
                words[i].style.color = '#4CAF50';
                words[i + 1].style.color = '#4CAF50';
                words[i + 2].style.color = '#4CAF50';
                words[i + 3].style.color = '#4CAF50';
                words[i + 4].style.color = '#4CAF50';
            }
          }
        }
      }
      myAudio.addEventListener('loadeddata', function() {
        const durationElement = document.getElementById('duration-time');
        const minutes = Math.floor(myAudio.duration / 60);
        const seconds = Math.floor(myAudio.duration - minutes * 60);
        let secondsStr: string;
        if (seconds < 10) {
            secondsStr = '0' + seconds;
          } else {
            secondsStr = '' + seconds;
          }
        durationElement.innerHTML = minutes + ':' + secondsStr;
      });

    });
    const progress = document.getElementById('progress');

    progress.addEventListener('click', function(e) {
      let screenSizeAdjustment = (window.innerWidth * 0.4) / 2;
      if (window.innerWidth > 800) {
        screenSizeAdjustment = (window.innerWidth * 0.4) / 2;
      } else {
        screenSizeAdjustment = 0;
      }
      const clickPosition = (e.pageX - screenSizeAdjustment - this.offsetLeft) / this.offsetWidth;
      const myAudio2 = <HTMLAudioElement>document.getElementById('my-audio');
      const clickTime = clickPosition * myAudio.duration;
      myAudio2.currentTime = clickTime;

      const checkboxHighlightText = document.getElementById('show-text-highlight') as HTMLInputElement;
      if (checkboxHighlightText.checked) {
        const words = document.getElementsByClassName('word') as HTMLCollectionOf<HTMLElement>;
        const currentWord: number = Math.round((myAudio.currentTime / myAudio2.duration) * words.length);
        let start: number;
        if (currentWord === 0) {
          start = 0;
        } else {
          start = currentWord - 1;
        }
        for (let i = start; i < currentWord; i++) {
          if (i < 6) {
             words[0].style.color = '#4CAF50';
             words[1].style.color = '#4CAF50';
             words[2].style.color = '#4CAF50';
             words[3].style.color = '#4CAF50';
             words[4].style.color = '#4CAF50';
             words[5].style.color = '#4CAF50';
          } else {
             words[i - 6].style.color = 'black';
             words[i - 5].style.color = '#4CAF50';
             words[i - 4].style.color = '#4CAF50';
             words[i - 3].style.color = '#4CAF50';
             words[i - 2].style.color = '#4CAF50';
             words[i - 1].style.color = '#4CAF50';
             words[i].style.color = '#4CAF50';
             words[i + 1].style.color = '#4CAF50';
          }
        }
      }
    });

  }

  toggleVisibility(e) {
    this.showPicturesChecked = e.target.checked;
  }

  open(p, event, textPartIndex, i, textPart_transParagraph) {
    if (this.boolOpen && this.mobileScreen) {

    } else {
      if (event.clientY / window.innerHeight > 0.5) {
        this.topPics = true;
      } else {
        this.topPics = false;
      }
      this.showPicturesHover = true;
      this.pictureShow = {
        textPartIndex: textPartIndex,
        i: i,
        textPart_transParagraph: textPart_transParagraph
      };
      this.boolOpen = true;
      this.p = p;
      p.open();
    }
  }
  mouseenter(p, event, textPartIndex, i, textPart_transParagraph) {
    if (this.mobileScreen) {

    } else {
      this.open(p, event, textPartIndex, i, textPart_transParagraph);
    }
  }

  close() {
    if (this.mobileScreen) {
      this.boolOpen = false;
    }
    this.p.close();
    this.showPicturesHover = false;
  }

  mouseleave() {
    if (this.mobileScreen) {

    } else {
      this.close();
      this.showPicturesHover = false;
    }
  }

  toggleColor(event) {
    // if (window.innerWidth > 800) {
    //   const word = event.target.innerHTML;
    //   this.markedWords = this.textService.toggleAndGetMarkedWord(word);

    // }
  }
  changePlayback() {
    const selectedPlayback = <HTMLInputElement>document.getElementById('playback-rate');
    const myAudio = <HTMLAudioElement>document.getElementById('my-audio');
    myAudio.playbackRate = parseFloat(selectedPlayback.value);
  }

  toggleTextHighlight(e) {
    const words = document.getElementsByClassName('word') as HTMLCollectionOf<HTMLElement>;
    const myAudio = <HTMLAudioElement>document.getElementById('my-audio');
    if (e.target.checked) {
      const currentWord: number = Math.round((myAudio.currentTime / myAudio.duration) * words.length);
      let start: number;
      if (currentWord === 0) {
        start = 0;
      } else {
        start = currentWord - 1;
      }
      for (let i = start; i < currentWord; i++) {
        if (i < 6) {
           words[0].style.color = '#4CAF50';
           words[1].style.color = '#4CAF50';
           words[2].style.color = '#4CAF50';
           words[3].style.color = '#4CAF50';
           words[4].style.color = '#4CAF50';
           words[5].style.color = '#4CAF50';
        } else {
           words[i - 6].style.color = 'black';
           words[i - 5].style.color = '#4CAF50';
           words[i - 4].style.color = '#4CAF50';
           words[i - 3].style.color = '#4CAF50';
           words[i - 2].style.color = '#4CAF50';
           words[i - 1].style.color = '#4CAF50';
           words[i].style.color = '#4CAF50';
           words[i + 1].style.color = '#4CAF50';
        }
      }
    } else {
      for (let i = 0; i < words.length; i++) {
        words[i].style.color = 'black';
      }
    }
  }

 handleScroll() {
   console.log("scrolling ");
 }

}


// [style.color]="markedWords.indexOf(word)==-1 ? 'black' : 'orange'"
// (click)="mouseEnter(p, $event, textPartIndex, i, textPart.transParagraph)"

