import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { combineLatest, delay } from 'rxjs';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserService } from '../../services/user.service';
import { HomePageProviders } from './home-page.provider';
import { UserSkeletonComponent } from '../../components/user-skeleton/user-skeleton.component';

@Component({
  standalone: true,
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [
    CommonModule,
    AsyncPipe,
    UserListComponent,
    UserSkeletonComponent,
    ],
    providers: [HomePageProviders],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private userService = inject(UserService);

  vm$ = combineLatest({
    users: this.userService.users$,
  }).pipe(delay(1000));
}
