import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiInputComponent } from '../../atoms/ui-input/ui-input.component';

@Component({
  standalone: true,
  selector: 'app-ui-search',
  templateUrl: './ui-search.component.html',
  styleUrl: './ui-search.component.scss',
  imports: [CommonModule, FormsModule, UiInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UISearchComponent {
  @Input() placeholder =  'Search...';
  @Output() searchChange = new EventEmitter<string>();

  searchIcon = 'assets/img/icons/search-lg.svg';

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }
}
