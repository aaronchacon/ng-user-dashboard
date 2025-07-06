import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss'
})
export class UiInputComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Output() valueChange = new EventEmitter<string>();

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
