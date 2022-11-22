import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantFormComponent } from './merchant-form/merchant-form.component';
import { MerchantTableComponent } from './merchant-table/merchant-table.component';
import { MerchantComponent } from './merchant/merchant.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TabsComponent } from './tabs/tabs.component';
import { UnsavedGuard } from './unsaved.guard';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToMerchantsTable = () =>
  redirectLoggedInTo(['merchants-table']);

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMerchantsTable },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMerchantsTable },
  },
  {
    path: 'merchant-form/:id',
    component: MerchantFormComponent,
    canActivate: [AngularFireAuthGuard],
    canDeactivate: [UnsavedGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AngularFireAuthGuard],
    // canDeactivate: [UnsavedGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
