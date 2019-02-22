import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { LicenceComponent } from './licence/licence.component';
import { AboutComponent } from './about/about.component';
import { AdminWordDetailComponent } from './admin-word-detail/admin-word-detail.component';
import { AdminWordListComponent } from './admin-word-list/admin-word-list.component';
import { AdminWordsAddComponent } from './admin-words-add/admin-words-add.component';


const appRoutes: Routes = [
  {path: '', redirectTo: 'categories', pathMatch: 'full'},
  {path: 'about', component: AboutComponent},
  {path: 'privacypolicy', component: PrivacyPolicyComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'disclaimer', component: DisclaimerComponent},
  {path: 'licence', component: LicenceComponent},
  {path: 'categories', children: [
    {path: '', component: CategoriesListComponent},
    {path: ':category', component: ArticleListComponent}
  ]},
  {path: 'articles/:id', component: ArticleDetailComponent},
  {path: 'admin/words', component: AdminWordListComponent},
  {path: 'admin/words/add', component: AdminWordsAddComponent},
  {path: 'admin/word/:word', component: AdminWordDetailComponent},
  {path: '**', redirectTo: 'categories', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
