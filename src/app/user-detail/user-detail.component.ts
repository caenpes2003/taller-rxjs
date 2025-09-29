import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/models';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  @Input() user: User | null = null;

  /**
   * Calcula la edad aproximada del usuario basada en su fecha de nacimiento
   */
  calculateAge(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }

    return age;
  }

  /**
   * Formatea la fecha de nacimiento para mostrarla de manera legible
   */
  formatBirthDate(birthDate: string): string {
    const date = new Date(birthDate);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
