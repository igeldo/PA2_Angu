import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { ENV } from '../../api/environments/environment';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { Routes } from '../../../assets/route-enumeration';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule,ButtonModule, DialogModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent implements OnInit {

  password = ENV.auth.password;
  username = ENV.auth.username;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate([`/${Routes.SHOPPING}`]);
    }
  }

  login() {
    this.authService.login(this.username, this.password);
  }
}
