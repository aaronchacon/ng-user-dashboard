import { Component } from '@angular/core';
import { UserPageProviders } from './user-page.provider';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  standalone: true,
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
  imports: [UserListComponent],
  providers: [UserPageProviders],
})
export class UserPageComponent {

}
