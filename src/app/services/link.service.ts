import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(public http: HttpClient) {}
  linkInfo: any;
  links: any;

  getLinkData(linkForm: FormGroup, link: FormControl) {
    let postData = link.value;
    return this.http
      .post('http://localhost:3000/api/link/getLinkData', { postData })
      .pipe(
        tap((data) => {
          this.linkInfo = data;
          linkForm.patchValue({
            title : this.linkInfo.linkData.title,
            description: this.linkInfo.linkData.description
          });
        })
      )
      .subscribe(() => {});
  }

  createLink(linkForm: FormGroup, categoryData: any, closeModal: any) {
    let newLink = {
      title: linkForm.value.title,
      description: linkForm.value.description || '',
      url: this.linkInfo.linkData.url,
      image: this.linkInfo.linkData.images[0] || '',
      author: categoryData.authorId,
      category: categoryData._id,
    };
    return this.http
      .post('http://localhost:3000/api/link/create', newLink)
      .subscribe(() => {
        this.getAllLinks(categoryData)
        closeModal()});
  }

  getAllLinks(categoryId: string) {
    return this.http
      .post('http://localhost:3000/api/link/getAllCategoriesLinks', {
        categoryId,
      })
      .subscribe((data: any) => (this.links = data.links));
  }

  deleteLink(linkId: string, categoryId: string) {
    return this.http.delete(`http://localhost:3000/api/link/${linkId}`).subscribe(()=>{
      this.getAllLinks(categoryId)
    });
  }
}
