import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private textService: TextService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    for (let i = 0; i < 8; i++) {
      setTimeout(function() {
        const respElement = document.getElementById('about-text-' + i );
        const containerUls = document.getElementById('container-uls');
        respElement.style.display = 'block';
        if (i === 0 ) {
          containerUls.style.borderBottom = 'none';
          respElement.style.borderTop = '1px solid #4CAF50';
          respElement.style.borderRight = '1px solid #4CAF50';
        }
        if (i === 1 ) {
          respElement.style.marginBottom = '-10px';
          respElement.style.borderLeft = '1px solid gray';
          containerUls.style.borderLeft = '1px solid gray';
        }
        if (i > 1) {
          respElement.style.fontStyle = 'italic';
        }
        if ( i === 5) {
          containerUls.style.borderBottom = '1px solid gray';
          this.textService.setFirstTimeFalse();
        }

      }, i * 2000 + 1500);
    }


  }

}
