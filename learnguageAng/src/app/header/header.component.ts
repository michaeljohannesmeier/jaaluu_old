import { Component, OnInit, Input } from '@angular/core';
import {TextService} from "../text.service";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  countMarkedWords = 0;
  textId: number;
  category: string;
  categoryGerman: string;
  isArticleListView: boolean;
  isArticle: boolean;
  pageNum: string;

  constructor(private textService: TextService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qParams => {
      this.category = qParams.category;
      if (!this.category) {
        this.route.params.subscribe( params => {
          this.category = params.category;
        });
      }
    });
    if (this.router.url.indexOf('/categories/') > -1) {
      this.isArticleListView = true;
    } else {
      this.isArticleListView = false;
    }
    if (this.router.url.indexOf('/articles/') > -1) {
      this.isArticle = true;
    } else {
      this.isArticle = false;
    }
    this.categoryGerman = this.textService.getCategoryGerman(this.category);

    this.textService.markedWordsCount().subscribe(wordCount => {
      this.countMarkedWords = wordCount;
    });
    this.route.params.subscribe( params => {
      this.textId = params.id;
    });
  }

  goToCategories() {
    this.router.navigate(['/']);
  }
  goToCategory() {
    this.router.navigate(['/categories/' + this.category]);
  }


}
