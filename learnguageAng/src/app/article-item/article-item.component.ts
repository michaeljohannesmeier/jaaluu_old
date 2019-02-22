import {Component, Input, OnInit} from '@angular/core';
import { Headandpara0 } from '../headandpara0.model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() textId: string;
  @Input() text: Headandpara0;
  @Input() category: string;
  name: string;

  constructor() {}

  ngOnInit() {
    let headlineText = '';
    this.text.oTextHeadline0.forEach(word => {
      if (word !== '>ss<') {
        headlineText = headlineText + word.trim() + ' ';
      }
    });
    headlineText = headlineText.trim();
    headlineText = headlineText.replace(' ', '_');
    this.name = headlineText;
  }

}
