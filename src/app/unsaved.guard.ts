import { Dialog } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MerchantFormComponent } from './merchant-form/merchant-form.component';
import { UnsavedDialogComponent } from './unsaved-dialog/unsaved-dialog.component';
import { User } from './user';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class UnsavedGuard implements CanDeactivate<MerchantFormComponent> {
  oldUser: User;
  constructor(private userService: UserService, public dialog: MatDialog) {}

  canDeactivate(component: MerchantFormComponent): Observable<boolean> {
    // this.userService.getUser(component.id).subscribe((data: any) => {
    //   this.oldUser = { ...data };
    //   console.log('OLD USER IN SUBSCRIBE', data);
    // });
    console.log('OLD USER ', component.oldUser);
    if (
      component.id !== 'new' &&
      JSON.stringify(component.user) !== JSON.stringify(component.oldUser)
    ) {
      const dialogRef = this.dialog.open(UnsavedDialogComponent, {
        width: '300px',
        height: '150px',
        data: {},
      });

      return dialogRef.afterClosed();
    } else if (
      JSON.stringify(component.user) !== JSON.stringify(component.defaultUser)
    ) {
      const dialogRef = this.dialog.open(UnsavedDialogComponent, {
        width: '300px',
        height: '150px',
        data: {},
      });

      return dialogRef.afterClosed();
    }
    return of(true);
  }
}
