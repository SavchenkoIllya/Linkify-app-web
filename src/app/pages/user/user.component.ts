import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ModalService } from './../../services/modal.service';
import { CategoriesService } from './../../services/categories.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    public CategoriesService: CategoriesService,
    public UserService: UserService,
    public ModalService: ModalService,
    public router: Router
  ) {}

  closableInput: boolean = false;
  color: string = '#007AFF';
  newCategoryTitle = new FormControl('');

  ngOnInit(): void {
    this.UserService.getMe().subscribe();
    this.UserService.getById().subscribe();
    this.CategoriesService.get().subscribe(() => {});
  }
}
