import { Component, OnInit } from '@angular/core';
import {TextService} from "../text.service";
import { HttpClient } from '@angular/common/http';
import {Headandpara0} from "../headandpara0.model";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  category: string;
  textLength: number;
  pageNum: number;

  constructor(private textService: TextService,
              private http: HttpClient,
              private route: ActivatedRoute) {}

  texts: Headandpara0[];
  unfilteredTexts: Headandpara0[];


  ngOnInit() {
    this.route.params.subscribe( params => {
      this.category = params.category;
    });

    this.textService.getAllHeadAndPara0(this.category).subscribe(data => {
      this.texts = data;
      this.textLength = data.length;
      this.unfilteredTexts = data;
    });

    this.pageNum = this.textService.getPaginationNumber();

    // this.textService.getPaginationNumber().subscribe(paginationNumber => {
    //   this.p = paginationNumber;
    // });

  }
  search(value) {
    const filteredTexts = [];
    this.unfilteredTexts.forEach(text => {
      if (text.oTextHeadline0.join('').replace('>ss<', '').toLowerCase().includes(value.toLowerCase())) {
        filteredTexts.push(text);
      }
    });
    this.texts = filteredTexts;
  }

  pageChange(e) {
    this.textService.pageNum = e;
    this.pageNum = e;
    window.scrollTo(0, 0);
  }

}
