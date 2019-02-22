import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UnsafePipe } from '../../unsafe.pipe';
import { SentenceSymbolPipe } from './sentencesymbol.pipe';
import { NameStripPipe } from './namestrip.pipe';
import { SlashUnderlinePipe } from './slashunderline.pipe';
import { NgxPaginationModule} from 'ngx-pagination';
import { FooterComponent } from './footer/footer.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesItemComponent } from './categories-item/categories-item.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { LicenceComponent } from './licence/licence.component';
import { AboutComponent } from './about/about.component';
import { AdminWordDetailComponent } from './admin-word-detail/admin-word-detail.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSelectModule, MatProgressSpinnerModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminWordListComponent } from './admin-word-list/admin-word-list.component';
import { AdminWordsAddComponent } from './admin-words-add/admin-words-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDetailComponent,
    ArticleListComponent,
    ArticleItemComponent,
    HeaderComponent,
    UnsafePipe,
    SentenceSymbolPipe,
    NameStripPipe,
    SlashUnderlinePipe,
    FooterComponent,
    CategoriesListComponent,
    CategoriesItemComponent,
    PrivacyPolicyComponent,
    ImpressumComponent,
    DisclaimerComponent,
    LicenceComponent,
    AboutComponent,
    AdminWordDetailComponent,
    AdminWordListComponent,
    AdminWordsAddComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
