import { CategoriesService } from '../../services/categories.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    public CategoriesService: CategoriesService,
    public router: Router
  ) {}
  @Input() category: any | undefined;
  color: string = '#007AFF';
  changeModal = false;
  updateCategoryTitle = new FormControl();

  navigation(category: any) {
    if (!this.changeModal) {
      this.router.navigate(['/category', category._id]);
    }
  }

  ngOnInit(): void {
    this.updateCategoryTitle.setValue(this.category.title);
  }
}
