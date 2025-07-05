import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../models/user.model';
import { UserFilterService } from './user-filter.service';
import { UserPaginationService, PaginationInfo } from './user-pagination.service';

@Injectable()
export class UserTableService {
  private filterService = inject(UserFilterService);
  private paginationService = inject(UserPaginationService);

  get filteredUsers$(): Observable<User[]> {
    return this.filterService.filteredUsers$;
  }

  get paginatedUsers$(): Observable<User[]> {
    return this.paginationService.paginatedUsers$;
  }

  get paginationInfo$(): Observable<PaginationInfo> {
    return this.paginationService.paginationInfo$;
  }

  get currentPage$(): Observable<number> {
    return this.paginationService.currentPage$;
  }

  setUsers(users: User[]): void {
    this.filterService.setUsers(users);
    this.paginationService.setUsers(users);
  }

  updateFilter(filterText: string): void {
    this.filterService.updateFilter(filterText);
    this.paginationService.resetToFirstPage();
  }

  goToPreviousPage(): void {
    this.paginationService.goToPreviousPage();
  }

  goToNextPage(): void {
    this.paginationService.goToNextPage();
  }

  setupFilteringAndPagination(): void {
    this.filterService.filteredUsers$.subscribe(filteredUsers => {
      this.paginationService.setUsers(filteredUsers);
    });
  }

  getFilteredUsers(): Observable<User[]> {
    return this.filterService.filteredUsers$;
  }
}
