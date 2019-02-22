import { Component, OnInit } from '@angular/core';
import { TextService } from '../text.service';

@Component({
  selector: 'app-admin-word-list',
  templateUrl: './admin-word-list.component.html',
  styleUrls: ['./admin-word-list.component.css']
})
export class AdminWordListComponent implements OnInit {

  constructor(private textService: TextService) {}

  public words: string;

  ngOnInit() {
    this.textService.getAdminWords().subscribe(words => {
      this.words = words;
      console.log(words);
    });

  }




}
