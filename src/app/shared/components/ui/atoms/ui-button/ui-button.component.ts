import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'medium' | 'large' = 'medium';
  @Input() ariaLabel?: string;
}
