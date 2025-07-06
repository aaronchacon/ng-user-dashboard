import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiButtonComponent } from '../../atoms/ui-button/ui-button.component';

@Component({
  standalone: true,
  selector: 'app-ui-empty',
  templateUrl: './ui-empty.component.html',
  styleUrl: './ui-empty.component.scss',
  imports: [CommonModule, UiButtonComponent],
})
export class UiEmptyComponent {
  @Input() title: string | null = null;
  @Input() description: string | null = null;
  @Input() primaryButtonText: string | null = null;
  @Input() secondaryButtonText: string | null = null;

  @Output() primaryButtonEvent = new EventEmitter<void>();
  @Output() secondaryButtonEvent = new EventEmitter<void>();

  searchImage = 'assets/img/svg/search-double.svg';

  onPrimaryButtonClick(): void {
    this.primaryButtonEvent.emit();
  }

  onSecondaryButtonClick(): void {
    this.secondaryButtonEvent.emit();
  }
}
