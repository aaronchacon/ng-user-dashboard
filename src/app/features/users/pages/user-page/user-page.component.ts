import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { combineLatest, delay, map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserPageProviders } from './user-page.provider';
import { UserTableComponent } from '../../components/user-table/user-table.component';

@Component({
  standalone: true,
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  imports: [
    CommonModule,
    AsyncPipe,
    UserTableComponent,
  ],
  providers: [UserPageProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserPageComponent {
  private userService = inject(UserService);

  vm$ = combineLatest({
    users: this.userService.users$,
    isLoading: this.userService.isLoading$,
  }).pipe(delay(3000));
}
