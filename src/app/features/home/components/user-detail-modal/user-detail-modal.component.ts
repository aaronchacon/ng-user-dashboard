    import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { UiButtonComponent } from '../../../../shared/components/ui/atoms/ui-button/ui-button.component';

@Component({
  standalone: true,
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrl: './user-detail-modal.component.scss',
  imports: [CommonModule, UiButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() user: User | null = null;

  userIcon = 'assets/img/svg/user-plus-double.svg';
  closeIcon = 'assets/img/svg/x-close.svg';

  onCloseModal() {
    this.closeModal.emit();
  }
}
