import { CommonModule } from '@angular/common';
import { Component, Input, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UISearchComponent } from '../../../../shared/components/ui/molecules/ui-search/ui-search.component';
import { UserTableComponent } from '../user-table/user-table.component';
import { UIPaginatorComponent } from '../../../../shared/components/ui/molecules/ui-paginator/ui-paginator.component';
import { UserTableService } from './services/user-table.service';
import { UserListProviders } from './user-list.providers';
import { PaginationInfo } from './services/user-pagination.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: UserListProviders,
  imports: [CommonModule, UISearchComponent, UserTableComponent, UIPaginatorComponent],
})
export class UserListComponent implements OnInit {
  private userTableService = inject(UserTableService);

  @Input() set users(value: User[]) {
    this.userTableService.setUsers(value);
  }

  @Input() isLoading = false;

  paginatedUsers$: Observable<User[]> = this.userTableService.paginatedUsers$;
  paginationInfo$: Observable<PaginationInfo> = this.userTableService.paginationInfo$;

  onSearchChange(searchText: string): void {
    this.userTableService.updateFilter(searchText);
  }

  onPreviousPage(): void {
    this.userTableService.goToPreviousPage();
  }

  onNextPage(): void {
    this.userTableService.goToNextPage();
  }

  ngOnInit(): void {
    this.userTableService.setupFilteringAndPagination();
  }
}
