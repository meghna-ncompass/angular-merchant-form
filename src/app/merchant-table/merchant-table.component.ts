import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-merchant-table',
  templateUrl: './merchant-table.component.html',
  styleUrls: ['./merchant-table.component.css'],
})
export class MerchantTableComponent implements OnInit {
  users!: Observable<User[]>;

  showFiller = false;
  constructor(
    private breadcrumbService: BreadcrumbService,
    public authService: AuthenticationService,
    public userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'website',
    'contactName',
    'contactPhone',
    'contactEmail',
    'notes',
    'type',
    'category',
    'comissionPercentage',
    'activeFrom',
    'logo',
    'criticalAccount',
    'paymentOptions',
    'actions',
  ];

  ngOnInit(): void {
    this.getUsers();
    this.breadcrumbService.set('merchants-table', 'Merchants Table');
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  deleteUser(id: string): void {
    if (id) {
      this.userService.deleteUser(id);
    }
  }

  onClickRow(id: string): void {
    this.router.navigateByUrl(`/merchants-table/${id}`);
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id, deleteUser: this.deleteUser },
    });

    dialogRef.afterClosed().subscribe((result) => {});

    dialogRef.componentInstance.isDelete.subscribe((res) => {
      if (res) {
        this.deleteUser(id);
      }
    });
  }
}
