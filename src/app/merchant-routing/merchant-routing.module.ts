import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MerchantTableComponent } from '../merchant-table/merchant-table.component';
import { MerchantComponent } from '../merchant/merchant.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['sign-in']);
const redirectLoggedInToMerchantsTable = () =>
  redirectLoggedInTo(['merchants-table']);
const routes: Routes = [
  {
    path: 'merchants-table',
    children: [
      {
        path: '',
        component: MerchantTableComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: ':id',
        component: MerchantComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ],
  },
  // { path: 'merchants-table/:id', component: MerchantComponent },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantRoutingModule {}
