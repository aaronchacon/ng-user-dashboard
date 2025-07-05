import { inject, Injectable, signal } from '@angular/core';
import { UserApiService } from './user-api.service';
import { BehaviorSubject, Observable, catchError, map, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';
import { toSignal } from '@angular/core/rxjs-interop';

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



  // Método para recargar los datos
  refresh(): void {
    this.reloadTrigger.next();
  }

  // Método para obtener usuarios (mantiene compatibilidad)
  getUsers(): Observable<User[]> {
    return this.users$;
  }
}
