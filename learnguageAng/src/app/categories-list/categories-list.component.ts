import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  firstTime: boolean;
  selected: string;
  mainDes: any;


  constructor(private textService: TextService) { }
  categories = this.textService.categoriesEnglish.slice(0, this.textService.categoriesEnglish.length - 1);
  categoriesGerman = this.textService.categoriesGerman.slice(0, this.textService.categoriesGerman.length - 1);

  ngOnInit() {
    this.selected = this.textService.lan;
    this.mainDes = this.textService.getMainDes(this.selected);
    this.textService.setPaginationNumber(1);
    this.firstTime = this.textService.getFirstTime();
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        const respElement = document.getElementById('about-text-' + i );
        const containerUls = document.getElementById('container-uls');
        respElement.style.visibility = 'visible';
        if (i === 0 ) {
          respElement.style.borderTop = '1px solid #4CAF50';
        }
        if (i === 1 ) {
          respElement.style.marginBottom = '-10px';
        }
        if (i > 1) {
          respElement.style.fontStyle = 'italic';
          respElement.style.fontWeight = 'bold';
        }
        if ( i === 4) {
          containerUls.style.borderBottom = '1px solid gray';
          this.textService.setFirstTimeFalse();
        }

      }, i * 1000 + 1500);
    }
    // setTimeout(function() {
    //   document.getElementById('description-container').style.height = '0px';
    // }, 14000);
  }

  closeIntro() {
    document.getElementById('description-container').style.display = 'none';
    this.textService.setFirstTimeFalse();
  }

  changeLan(lan: string) {
    this.textService.setLan(lan);
    this.mainDes = this.textService.getMainDes(this.selected);
  }

}
