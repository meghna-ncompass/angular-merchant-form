import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormModule } from './modules/form.module';
import { TableModule } from './modules/table.module';
import { MerchantRoutingModule } from './merchant-routing/merchant-routing.module';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';
import { UnsavedDialogComponent } from './unsaved-dialog/unsaved-dialog.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthenticationService } from './authentication.service';
@NgModule({
  declarations: [AppComponent, SignInComponent, SignUpComponent],
  imports: [
    BrowserModule,
    FormsModule,
    FormModule,
    TableModule,
    AppRoutingModule,
    MerchantRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  providers: [BreadcrumbService, AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
