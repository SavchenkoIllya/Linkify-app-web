import { LinkService } from './../../services/link.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  constructor(
    public router: Router,
    public CategoriesService: CategoriesService,
    public LinkService: LinkService,
  ) {}
  changeModal = false;
  categoryData: any;

  navBack() {
    this.router.navigate(['/user', this.categoryData.authorId]);
  }
  nav(url: string) {
    window.open(url);
  }

  ngOnInit(): void {
    this.CategoriesService.getById().subscribe((data) => {
      this.categoryData = data;
      this.LinkService.getAllLinks(this.categoryData._id)
    });
  }
}
