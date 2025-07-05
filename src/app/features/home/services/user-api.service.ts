import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserApiService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    const url = environment.jsonPlaceholderUrl.base + environment.jsonPlaceholderUrl.endpoints.users;
    return this.http.get<User[]>(url);
  }
}
