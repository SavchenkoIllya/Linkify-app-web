import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  categories: any;

  getById() {
    let fullLocation = location.href
      .toString()
      .replace(location.origin.toString().concat('/category/'), '');
    return this.http.get(`http://localhost:3000/api/category/${fullLocation}/links`);
  }

  get() {
    let fullLocation = location.href
      .toString()
      .replace(location.origin.toString().concat('/user/'), '');
    return this.http
      .get(`http://localhost:3000/api/category/${fullLocation}`)
      .pipe(
        tap((data) => {
          this.categories = data;
        })
      );
  }

  send(titleData: FormControl, colorData: string) {
    let category = {
      title: titleData.value,
      color: colorData.toUpperCase(),
    };
    return this.http
      .post('http://localhost:3000/api/category/create', category, {
        headers: {
          'Content-Type': 'application/json',
          autorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe(() => {
        titleData.reset();
        colorData = '#007AFF';
        this.get().subscribe();
      });
  }

  delete(category: any) {
    return this.http
      .delete(`http://localhost:3000/api/category/${category._id}`, {
        headers: {
          'Content-Type': 'application/json',
          autorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .subscribe(() => {
        this.get().subscribe();
      });
  }

  update(category: any, newTitleData: FormControl, newColorData: string) {
    let updateCategory = {
      title: newTitleData.value,
      color: newColorData.toUpperCase(),
    };
    return this.http
      .put(
        `http://localhost:3000/api/category/${category._id}`,
        updateCategory,
        {
          headers: {
            'Content-Type': 'application/json',
            autorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .subscribe(() => {
        this.get().subscribe;
      });
  }
}
