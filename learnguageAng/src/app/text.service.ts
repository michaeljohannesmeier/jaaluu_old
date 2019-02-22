import { Injectable, OnInit } from '@angular/core';
import { TextPart } from './textpart.model';
import { Headandpara0 } from './headandpara0.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { isDevMode} from '@angular/core';
import { Word } from './word.model';


@Injectable({
  providedIn: 'root'
})
export class TextService implements OnInit {
  textName: string;
  text: Text;
  texts: Headandpara0[];
  markedWords: string[] = [];
  pageNum = 1;
  domain: string;
  protocol: string;
  firstTime = true;
  lan = 'eng';
  categoriesGerman = [
    'Bekannte Leute',
    'Berufe und Wirtschaft',
    'Erdkunde',
    'Essen und Trinken',
    'Geschichte',
    'Glaube und Denken',
    'Körper und Gesundheit',
    'Politik und Gesellschaft',
    'Sport und Spaß',
    'Sprache und Kultur',
    'Tiere und Natur',
    'Wissenschaft und Technik',
    'Alle Texte'
  ];
  categoriesEnglish = [
      'known_people',
      'jobs_and_economy',
      'geography',
      'food_and_drinks',
      'history',
      'believe_and_think',
      'body_and_health',
      'politic_and_society',
      'sport_and_fun',
      'language_and_culture',
      'animals_and_nature',
      'science_and_technic',
      'all'
  ];

  mainDes = {
    eng: {
      text1: 'You speak english and want to learn german?',
      text2: 'Here is how it works:',
      text3: 'Find an article',
      text4: 'Hoover over word',
      text5: 'Get translation, picture and pronounciation',
      text6: 'Learn german with auto translation, pictures and audio'
    },
    es: {
      text1: 'Hablas espanol y quieres hablar aleman?',
      text2: 'Asi functiona:',
      text3: 'Encontre un articulo',
      text4: 'Hoover sobre la palabra',
      text5: 'Get translation, picture and pronounciation',
      text6: 'Learn german with auto translation, pictures and audio'
    },
    fr: {
      text1: 'Vo plais francais y deseas parlay aleman?',
      text2: 'Here is how it works:',
      text3: 'Find an article',
      text4: 'Hoover over word',
      text5: 'Get translation, picture and pronounciation',
      text6: 'Learn german with auto translation, pictures and audio'
    }
  };

  getMainDes(lan: string) {
    return this.mainDes[lan];
  }

  getCategoriesEnglish() {
    return this.categoriesEnglish;
  }


  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.domain = 'localhost:8000';
      this.protocol = 'http';
    } else {
      this.domain = 'www.jaaluu.com';
      this.protocol = 'https';
    }
  }

  ngOnInit() {
  }

  getPaginationNumber() {
    return this.pageNum;
  }

  setPaginationNumber(paginationNumber) {
    this.pageNum = paginationNumber;
  }

  getFirstTime() {
    return this.firstTime;
  }

  setFirstTimeFalse() {
    this.firstTime = false;
  }


  getCategoryGerman(categoryEnglish: string) {
    for (let i = 0; i < this.categoriesEnglish.length; i++) {
      if (this.categoriesEnglish[i] === categoryEnglish) {
        return this.categoriesGerman[i];
      }
    }
  }

  setLan(lan: string) {
    this.lan = lan;
  }


  markedWordsCount(): Observable<number> {
    return Observable.create(observer => {
      observer.next(this.markedWords.length);
    });
  }


  getText(id): Observable<Text> {
    return this.http.get<Text>(this.protocol + '://' + this.domain + '/text?id=' + id + '&lan=' + this.lan);
  }

  getAllHeadAndPara0(category: string): Observable<Headandpara0[]> {
    return this.http.get<Headandpara0[]>(this.protocol + '://' + this.domain + '/texts/' + category + '?lan=' + this.lan);
  }

  toggleAndGetMarkedWord(word) {
    if (this.markedWords.indexOf(word) === -1) {
      this.markedWords.push(word);
      const uniqueWords = new Set(this.markedWords);
      this.markedWords = Array.from(uniqueWords);
      return this.markedWords;
    }
    this.markedWords = this.markedWords.filter(wordInArray => wordInArray !== word);
    return this.markedWords;

  }
  getMarkedWords() {
    return this.markedWords;
  }

  saveWord(data: Word): Promise<number> {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    const headers = new Headers();
    headers.append('X-CSRFToken', csrftoken);
    return fetch(this.protocol + '://' + this.domain + '/saveword/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers,
        credentials: 'include'
    }).then( function() {
      return 1;
    });

  }

  getAdminWords(): Observable<string> {
    return this.http.get<string>(this.protocol + '://' + this.domain + '/adminwords');
  }
}
