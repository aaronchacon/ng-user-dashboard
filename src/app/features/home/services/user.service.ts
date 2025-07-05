import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { UserApiService } from './user-api.service';

@Injectable()
export class UserService {
  private userApiService = inject(UserApiService);
  private reloadTrigger = new BehaviorSubject<void>(undefined);
  private isLoading = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoading.asObservable();

  users$: Observable<User[]> = this.reloadTrigger.pipe(
    startWith([]),
    tap(() => this.isLoading.next(true)),
    switchMap(() => this.userApiService.getUsers().pipe(
      tap(() => this.isLoading.next(false)),
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
