import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-ui-search',
  templateUrl: './ui-search.component.html',
  styleUrl: './ui-search.component.scss',
  imports: [CommonModule, FormsModule],
})
export class UISearchComponent {
  @Input() placeholder =  'Search...';
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchChange.emit(target.value);
  }
}
