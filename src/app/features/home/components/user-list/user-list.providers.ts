import { Provider } from "@angular/core";
import { UserTableService } from "./services/user-table.service";
import { UserFilterService } from "./services/user-filter.service";
import { UserPaginationService } from "./services/user-pagination.service";

export const UserListProviders: Provider[] = [
  UserFilterService,
  UserPaginationService,
  UserTableService,
];
