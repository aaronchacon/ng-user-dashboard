import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';
import { UiButtonComponent } from '../../../../shared/components/ui/atoms/ui-button/ui-button.component';

@Component({
  standalone: true,
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  imports: [CommonModule, UiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() users: User[] = [];

  @Output() userSelected = new EventEmitter<User>();

  onUserSelected(user: User) {
    this.userSelected.emit(user);
  }

  trackByUser(index: number, user: User): number {
    return user.id || index;
  }
}
