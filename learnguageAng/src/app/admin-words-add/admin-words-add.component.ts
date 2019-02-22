import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextService } from '../text.service';
import { FormControl } from '@angular/forms';
import { Word } from '../word.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-words-add',
  templateUrl: './admin-words-add.component.html',
  styleUrls: ['./admin-words-add.component.css']
})
export class AdminWordsAddComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private textService: TextService,
    private router: Router
  ) {}

  public categoriesEnglish: string[];
  public singleUrls = [];
  public singleUrlsBig = [];
  public selectedSingleUrl: string;
  public selectedSingleUrlBig: string;
  public singleUrlId: number;
  public pluralUrls = [];
  public pluralUrlsBig = [];
  public selectedPluralUrl: string;
  public selectedPluralUrlBig: string;
  public pluralUrlId: number;
  public exampleUrls = [];
  public exampleUrlsBig = [];
  public selectedExampleUrl: string;
  public selectedExampleUrlBig: string;
  public exampleUrlId: number;
  public client_id =
    '00d7daff4c4f80d95f26d63a11cadac0d762b2777a746d53c5664d3ee4d70b6a';
  public categories = new FormControl();
  public wordEng: string;
  public videoUrl: string;
  public showVideo = false;

  ngOnInit() {
    this.categoriesEnglish = this.textService.getCategoriesEnglish();
    this.categoriesEnglish.pop();
  }

  openModal(content, type) {
    if (type === 'single') {
      this.singleUrls = [];
      this.singleUrlsBig = [];
    }
    if (type === 'plural') {
      this.pluralUrls = [];
      this.pluralUrlsBig = [];
    }
    if (type === 'example') {
      this.exampleUrls = [];
      this.exampleUrlsBig = [];
    }
    const wordToSearch = document.getElementById(
      'word-' + type
    ) as HTMLInputElement;
    this.textService.getTranslation(wordToSearch.value).subscribe(trans => {
      const url =
        'https://api.unsplash.com/search/photos/?query=' +
        trans +
        '&client_id=' +
        this.client_id;
      fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(response => {
          console.log(response);
          response.results.forEach(result => {
            if (type === 'single') {
              this.singleUrls.push(result.urls.small);
              this.singleUrlsBig.push(result.urls.full);
            }
            if (type === 'plural') {
              this.pluralUrls.push(result.urls.small);
              this.pluralUrlsBig.push(result.urls.full);
            }
            if (type === 'example') {
              this.exampleUrls.push(result.urls.small);
              this.exampleUrlsBig.push(result.urls.full);
            }
          });
          this.modalService.open(content);
          document.getElementById('original-word-' + type).innerHTML =
            wordToSearch.value;
          document.getElementById('translated-word-' + type).innerHTML = trans;
        });
    });
  }
  closeModal(content, type) {
    this.modalService.dismissAll();
    if (type === 'single') {
      this.selectedSingleUrl = this.singleUrls[this.singleUrlId];
      this.selectedSingleUrlBig = this.singleUrlsBig[this.singleUrlId];
    }
    if (type === 'plural') {
      this.selectedPluralUrl = this.pluralUrls[this.pluralUrlId];
      this.selectedPluralUrlBig = this.pluralUrlsBig[this.pluralUrlId];
    }
    if (type === 'example') {
      this.selectedExampleUrl = this.exampleUrls[this.exampleUrlId];
      this.selectedExampleUrlBig = this.exampleUrlsBig[this.exampleUrlId];
    }
  }
  selectImage(id: number, type) {
    const imgModalElements = document.getElementsByClassName(
      'img-modal-' + type
    ) as HTMLCollection;
    for (let i = 0; i < imgModalElements.length; i++) {
      const el = imgModalElements[i] as HTMLHtmlElement;
      el.style.border = 'none';
    }
    document.getElementById(type + '-img-' + id).style.border = '4px solid red';
    if (type === 'single') {
      this.singleUrlId = id;
    }
    if (type === 'plural') {
      this.pluralUrlId = id;
    }
    if (type === 'example') {
      this.exampleUrlId = id;
    }
  }

  saveWord() {
    this.showVideo = false;
    const wordToTranslate = document.getElementById(
      'word-single'
    ) as HTMLInputElement;
    console.log(wordToTranslate.value);
    this.textService.getTranslation(wordToTranslate.value).subscribe(trans => {
      this.wordEng = trans;

      const wordSingle = <HTMLInputElement>(
        document.getElementById('word-single')
      );
      const wordSingleValue = wordSingle.value;

      const wordPlural = <HTMLInputElement>(
        document.getElementById('word-plural')
      );
      const wordPluralValue = wordPlural.value;
      const example = <HTMLInputElement>document.getElementById('example-text');
      const exampleValue = example.value;
      const categoryValue = this.categories.value;
      const data = new Word(
        wordSingleValue,
        wordPluralValue,
        exampleValue,
        categoryValue,
        this.selectedSingleUrlBig,
        this.selectedPluralUrlBig,
        this.selectedExampleUrlBig
      );
      console.log(data);
      document.getElementById('loading-spinner').style.display = 'flex';
      this.textService.saveWord(data).then(result => {
        if (result === 1) {
          document.getElementById('loading-spinner').style.display = 'none';
          document.getElementById('icon-checked').style.display = 'block';
          this.videoUrl =
            './static/assets/words/' + this.wordEng + '/output.mp4';
          setTimeout(() => {
            this.router.navigate(['admin/word/', this.wordEng]);
          }, 2000);
        }
      });
    });
  }
}
