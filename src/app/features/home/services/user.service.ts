import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserApiService } from './user-api.service';
import { UserCacheService } from './user-cache.service';

@Injectable()
export class UserService {
  private userApiService = inject(UserApiService);
  private cacheService = inject(UserCacheService);
  private reloadTrigger = new BehaviorSubject<void>(undefined);

  users$: Observable<User[]> = this.reloadTrigger.pipe(
    startWith([]),
    switchMap(() => {
      const cachedUsers = this.cacheService.getUsers();
      if (cachedUsers) {
        return of(cachedUsers);
      }

      return this.userApiService.getUsers().pipe(
        tap(users => {
          this.cacheService.setUsers(users);
        }),
        catchError((error) => {
          console.error('Error fetching users:', error);
          return of([]);
        })
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  refresh(): void {
    this.cacheService.clearUsers();
    this.reloadTrigger.next();
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }
}
