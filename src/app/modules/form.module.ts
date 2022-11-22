import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MerchantFormComponent } from '../merchant-form/merchant-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { UnsavedDialogComponent } from '../unsaved-dialog/unsaved-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    MerchantFormComponent,
    DeleteDialogComponent,
    UnsavedDialogComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCommonModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
    MatProgressSpinnerModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
  ],
  exports: [MerchantFormComponent],
})
export class FormModule {}
