import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, shareReplay, startWith, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { UserApiService } from './user-api.service';

@Injectable()
export class UserService {
  private userApiService = inject(UserApiService);
  private reloadTrigger = new BehaviorSubject<void>(undefined);

  users$: Observable<User[]> = this.reloadTrigger.pipe(
    startWith([]),
    switchMap(() => this.userApiService.getUsers().pipe(
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    )),
    shareReplay({ bufferSize: 1, refCount: true })
  );


  refresh(): void {
    this.reloadTrigger.next();
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }
}
