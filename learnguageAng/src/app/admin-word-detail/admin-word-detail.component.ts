import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextService } from '../text.service';
import {FormControl} from '@angular/forms';
import { Word } from '../word.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-word-detail',
  templateUrl: './admin-word-detail.component.html',
  styleUrls: ['./admin-word-detail.component.css']
})
export class AdminWordDetailComponent implements OnInit {

  public textName: string;

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params.subscribe( params => {
    this.textName = params.word;
  });
}

}
