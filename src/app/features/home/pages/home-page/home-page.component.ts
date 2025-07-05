import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { combineLatest, delay } from 'rxjs';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserService } from '../../services/user.service';
import { HomePageProviders } from './home-page.provider';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    CommonModule,
    AsyncPipe,
    UserListComponent,
    ],
    providers: [HomePageProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent {
  private userService = inject(UserService);

  vm$ = combineLatest({
    users: this.userService.users$,
    isLoading: this.userService.isLoading$,
  }).pipe(delay(1000));
}
