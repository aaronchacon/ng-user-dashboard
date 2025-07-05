import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  standalone: true,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() isLoading: boolean = false;
}
