import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

@Component({
  standalone: true,
  selector: 'app-ui-paginator',
  templateUrl: './ui-paginator.component.html',
  styleUrl: './ui-paginator.component.scss',
  imports: [CommonModule],
})
export class UIPaginatorComponent {
  @Input() paginationInfo: PaginationInfo | null = null;
  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  get canGoPrevious(): boolean {
    return this.paginationInfo ? this.paginationInfo.currentPage > 1 : false;
  }

  get canGoNext(): boolean {
    return this.paginationInfo ? this.paginationInfo.currentPage < this.paginationInfo.totalPages : false;
  }

  get displayText(): string {
    if (!this.paginationInfo) return '';

    const { currentPage, totalPages, totalItems, itemsPerPage } = this.paginationInfo;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return `Mostrando ${start}-${end} de ${totalItems} usuarios`;
  }

  onPreviousPage(): void {
    this.previousPage.emit();
  }

  onNextPage(): void {
    this.nextPage.emit();
  }
}
