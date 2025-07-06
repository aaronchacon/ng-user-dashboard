import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UISearchComponent } from '../../../../shared/components/ui/molecules/ui-search/ui-search.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { UIPaginatorComponent } from '../../../../shared/components/ui/molecules/ui-paginator/ui-paginator.component';
import { UserTableService } from './services/user-table.service';
import { UserListProviders } from './user-list.providers';
import { PaginationInfo } from './services/user-pagination.service';
import { UiEmptyComponent } from '../../../../shared/components/ui/molecules/ui-empty/ui-empty.component';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: UserListProviders,
  imports: [CommonModule, UISearchComponent, UserTableComponent, UIPaginatorComponent, UiEmptyComponent, UserDetailModalComponent],
})
export class UserListComponent implements OnInit {
  private userTableService = inject(UserTableService);

  @Input() set users(value: User[]) {
    this.userTableService.setUsers(value);
  }

  selectedUserSubject = new BehaviorSubject<User | null>(null);

  selectedUser$ = this.selectedUserSubject.asObservable();
  paginatedUsers$: Observable<User[]> = this.userTableService.paginatedUsers$;
  paginationInfo$: Observable<PaginationInfo> = this.userTableService.paginationInfo$;


  ngOnInit(): void {
    this.userTableService.setupFilteringAndPagination();
  }

  onSearchChange(searchText: string): void {
    this.userTableService.updateFilter(searchText);
  }

  onPreviousPage(): void {
    this.userTableService.goToPreviousPage();
  }

  onNextPage(): void {
    this.userTableService.goToNextPage();
  }

  onClearSearch(): void {
    this.userTableService.updateFilter('');
  }

  onUserSelected(user: User): void {
    this.selectedUserSubject.next(user);
  }

  onCloseModal(): void {
    this.selectedUserSubject.next(null);
  }
}
