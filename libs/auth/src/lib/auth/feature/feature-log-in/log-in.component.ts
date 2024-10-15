import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@conciso/auth';
import { Routes } from '@conciso/shared';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule,ButtonModule, DialogModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent implements OnInit {
  
  password = "passKeycloakUser";
  username = "java-starter-user";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService.isRefreshExpired());
    if(!this.authService.isRefreshExpired() || !this.authService.isRefreshExpired()) {
      this.router.navigate([`/${Routes.SHOPPING}`]);
    }
  }

  login() {
    this.authService.login(this.username, this.password);
  }
}
