import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { User } from '../../../models/user.model';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

@Injectable()
export class UserPaginationService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  private currentPageSubject = new BehaviorSubject<number>(1);

  readonly itemsPerPage = 5;

  paginatedUsers$: Observable<User[]> = combineLatest([
    this.usersSubject,
    this.currentPageSubject
  ]).pipe(
    map(([users, currentPage]) => {
      const startIndex = (currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return users.slice(startIndex, endIndex);
    })
  );

  paginationInfo$: Observable<PaginationInfo> = combineLatest([
    this.usersSubject,
    this.currentPageSubject
  ]).pipe(
    map(([users, currentPage]) => ({
      currentPage,
      totalPages: Math.ceil(users.length / this.itemsPerPage),
      totalItems: users.length,
      itemsPerPage: this.itemsPerPage
    }))
  );

  currentPage$ = this.currentPageSubject.asObservable();

  setUsers(users: User[]): void {
    this.usersSubject.next(users);
    this.resetToFirstPage();
  }

  goToPreviousPage(): void {
    const currentPage = this.currentPageSubject.value;
    if (currentPage > 1) {
      this.currentPageSubject.next(currentPage - 1);
    }
  }

  goToNextPage(): void {
    const currentPage = this.currentPageSubject.value;
    const totalPages = Math.ceil(this.usersSubject.value.length / this.itemsPerPage);
    if (currentPage < totalPages) {
      this.currentPageSubject.next(currentPage + 1);
    }
  }

  resetToFirstPage(): void {
    this.currentPageSubject.next(1);
  }

  getCurrentPage(): number {
    return this.currentPageSubject.value;
  }
}
