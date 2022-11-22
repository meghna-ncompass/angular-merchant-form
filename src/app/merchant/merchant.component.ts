import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css'],
})
export class MerchantComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.id).subscribe((data) => {
      this.user = data;
      this.breadcrumbService.set('merchants-table/:id', this.user.name);
    });
  }

  id = String(this.route.snapshot.paramMap.get('id'));

  user!: User;
}
