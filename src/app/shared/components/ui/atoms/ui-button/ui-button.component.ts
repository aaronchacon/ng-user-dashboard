import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss',
  imports: [CommonModule],
  standalone: true
})
export class UiButtonComponent {
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
