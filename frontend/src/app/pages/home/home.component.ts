import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showForm = false;
  user: string = '';

  constructor(private router: Router) {}

  openForm(event: Event) {
    event.preventDefault();
    this.showForm = true;
  }

  startGame() {
    if (this.user.trim()) {
      localStorage.setItem('usuario', this.user);
      // this.router.navigate(['/quiz']);
    }
  }

    closeForm() {
    this.showForm = false;
  }

}
