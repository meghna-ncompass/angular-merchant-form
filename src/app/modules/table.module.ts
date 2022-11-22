import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MerchantTableComponent } from '../merchant-table/merchant-table.component';
import { CriticalDirective } from '../critical.directive';
import { AppRoutingModule } from '../app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { TabsComponent } from '../tabs/tabs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MerchantComponent } from '../merchant/merchant.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';
@NgModule({
  declarations: [
    MerchantTableComponent,
    CriticalDirective,
    TabsComponent,
    MerchantComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    AppRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatSidenavModule,
    MatSnackBarModule,
    BreadcrumbModule,
  ],
  exports: [MerchantTableComponent],
  providers: [BreadcrumbService],
})
export class TableModule {}
