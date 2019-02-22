import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent implements OnInit {

  constructor() { }
  @Input() categoryGerman: string;
  @Input() category: string;
  @Input() index: string;

  ngOnInit() {
  }

}
