import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Output() valueChange = new EventEmitter<string>();

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
