import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLoginComponent } from './headers/userlogin/userlogin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { BrowseComponent } from './browse/browse.component';
import { BusinessAccountComponent } from './business-account/business-account.component';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { AboutComponent } from './about/about.component';
import { HeadersComponent } from './headers/headers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserLoginComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    MyBenefitsComponent,
    BrowseComponent,
    BusinessAccountComponent,
    BusinessHomeComponent,
    AboutComponent,
    HeadersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'register',
        component: SignUpComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },{
        path: 'business',
        component: BusinessHomeComponent
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
