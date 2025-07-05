import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { User } from '../../../models/user.model';

@Injectable()
export class UserFilterService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private filterTextSubject = new BehaviorSubject<string>('');

  filteredUsers$: Observable<User[]> = combineLatest([
    this.usersSubject,
    this.filterTextSubject
  ]).pipe(
    map(([users, filterText]) => {
      if (!filterText.trim()) return users;
      const searchTerm = filterText.toLowerCase();
      return users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    })
  );

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  updateFilter(filterText: string): void {
    this.filterTextSubject.next(filterText);
  }

  getFilterText(): string {
    return this.filterTextSubject.value;
  }
}
