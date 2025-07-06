import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-user-skeleton',
  templateUrl: './user-skeleton.component.html',
  styleUrl: './user-skeleton.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSkeletonComponent {
  skeletonRows = Array(6);
  skeletonItems = Array(30);
}
