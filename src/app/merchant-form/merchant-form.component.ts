import { Component, OnInit } from '@angular/core';
import { PaymentOptions, User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UnsavedDialogComponent } from '../unsaved-dialog/unsaved-dialog.component';
import { map, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { formatDate } from '@angular/common';
import { Payments } from '../user.service';
import { AuthenticationService } from '../authentication.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

@Component({
  selector: 'app-merchant-form',
  templateUrl: './merchant-form.component.html',
  styleUrls: ['./merchant-form.component.css'],
})
export class MerchantFormComponent implements OnInit {
  isLoaded: boolean = false;
  isFormReady: boolean = false;
  isUserSignedIn: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private afStorage: AngularFireStorage, // private datePipe: DatePipe,
    private authService: AuthenticationService,
    private afns: AngularFireFunctions
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((data) => {
      this.defaultUser.createdBy = data.email;
      this.isUserSignedIn = true;
    });
    // this.userService.getFormElements().subscribe((data) => {
    //   console.log('Form Element Subscribed Data', data);
    //   this.Categories = data[0];
    //   this.testPayments = data[2] as Payments;
    //   this.testTypes = data[3];
    //   this.isFormReady = true;
    // });
    const callable = this.afns.httpsCallable('getFormValues');
    callable({}).subscribe((data) => {
      console.log('CALLABLE DATA', data);
      this.Categories = data[0].Data;
      this.testPayments = data[2].Data as Payments;
      this.testTypes = data[3].Data;
      this.isFormReady = true;
    });
    if (this.id !== 'new') {
      this.userService.getUser(this.id).subscribe((data) => {
        this.user = {
          ...data,
          activeFrom: new Date(data.activeFrom.toJSON()['seconds'] * 1000),
          // activeFrom: data.activeFrom.toDate()
        };
        this.togglePaymentOpt(data.paymentOptions);
        this.oldUser = { ...data };
        this.isLoaded = true;
      });
    } else {
      this.user = { ...this.defaultUser };
      this.isLoaded = true;
    }
  }

  oldUser: User;
  //check if form fields are dirty
  defaultUser: User = new User(
    uuidv4(),
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'small-business',
    null,
    0,
    new Date(),
    null,
    false,
    'Cash On Delivery',
    '',
    '',
    ''
  );
  id = String(this.route.snapshot.paramMap.get('id'));

  user: User;

  isEdit: boolean = this.id === 'new' ? true : false;

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  Categories;
  testPayments: Payments;
  testTypes;

  getFloatLabelValue(): any {
    return this.floatLabelControl.value || 'auto';
  }

  private basePath = '/images';
  async uploadFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const filePath = `${this.basePath}/${file.name}`;
      const snap = await this.afStorage.upload(filePath, file);
      this.user.fileName = file.name;
      (await snap).ref.getDownloadURL().then((url: string) => {
        this.user.logoUrl = url;
      });
    } else {
      alert('Please select an image');
    }
  }

  togglePaymentOpt(option: string): void {
    Object.keys(this.testPayments).forEach((opt) => {
      if (opt === option)
        this.testPayments[opt as keyof Payments].checked = true;
      else this.testPayments[opt as keyof Payments].checked = false;
    });
  }
  onSubmit(user: User): void {
    console.log('CRITICAL ACCOUNT', this.user.criticalAccount);
    this.user = {
      ...user,
      type: this.getFloatLabelValue(),
      activeFrom: new Date(user.activeFrom),
      paymentOptions: this.testPayments['Cash On Delivery'].checked
        ? 'Cash On Delivery'
        : this.testPayments['UPI'].checked
        ? 'UPI'
        : 'Card Payment',
    };
    if (this.id === 'new') {
      console.log('adding new user');
      console.log(this.user.id);
      this.userService.addNewUser(this.user);
    } else {
      this.userService.editUser(this.user, this.id);
    }
    this.user = { ...this.defaultUser };
    this.router.navigateByUrl('/merchants-table');
  }

  unsavedDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(UnsavedDialogComponent, {
      width: '300px',
      height: '150px',
      data: {},
    });

    return dialogRef.afterClosed();
  }
}
