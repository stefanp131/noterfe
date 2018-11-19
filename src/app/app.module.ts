import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OurSpaceComponent } from './our-space/our-space.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MySpaceComponent } from './my-space/my-space.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { OurSpaceService } from './our-space/our-space.service';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { TopicComponent } from './topic/topic.component';
import { TopicService } from './topic/topic.service';
import { HeaderComponent } from './header/header.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { EditCommentaryComponent } from './edit-commentary/edit-commentary.component';
import { CommentaryComponent } from './commentary/commentary.component';
import { CommentaryService } from './commentary/commentary.service';
import { EditCommentaryService } from './edit-commentary/edit-commentary.service';
import { MySpaceService } from './my-space/my-space.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EditTopicSheetComponent } from './edit-topic-sheet/edit-topic-sheet.component';
import { EditTopicSheetService } from './edit-topic-sheet/edit-topic-sheet.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { LoginGuardService } from './shared/login.guard';
import { CookieService } from 'ngx-cookie-service';
import { LoginDataService } from './shared/login.service';
import { HeaderService } from './header/header.service';


const appRoutes: Routes = [
  {
    path: 'my-space', component: MySpaceComponent, canActivate: [ LoginGuardService ]
  },
  {
    path: 'our-space', component: OurSpaceComponent, canActivate: [ LoginGuardService ]
  },
  {
    path: 'topic/:id', component: TopicComponent, canActivate: [ LoginGuardService ]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: MySpaceComponent, canActivate: [ LoginGuardService ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    OurSpaceComponent,
    MySpaceComponent,
    TopicComponent,
    HeaderComponent,
    EditCommentaryComponent,
    CommentaryComponent,
    FooterComponent,
    EditTopicComponent,
    EditTopicSheetComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatButtonToggleModule,
    MatBadgeModule,
    FormsModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatSnackBarModule,
  ],
  providers: [
    OurSpaceService,
    TopicService,
    CommentaryService,
    EditCommentaryService,
    MySpaceService,
    EditTopicSheetService,
    RegisterService,
    LoginService,
    LoginGuardService,
    CookieService,
    LoginDataService,
    HeaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditCommentaryComponent, EditTopicSheetComponent]
})
export class AppModule { }
