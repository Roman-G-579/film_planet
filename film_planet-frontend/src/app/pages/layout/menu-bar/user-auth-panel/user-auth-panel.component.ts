import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PopoverModule} from "primeng/popover";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {AutoFocus} from 'primeng/autofocus';
import {NgIf} from '@angular/common';

// Contains links related to user login and registration
@Component({
  selector: 'app-user-auth-panel',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PopoverModule,
    ReactiveFormsModule,
    AutoFocus,
    NgIf,
    RouterLink
  ],
  templateUrl: './user-auth-panel.component.html',
  styleUrl: './user-auth-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAuthPanelComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    let data = localStorage.getItem('userData');
    console.log(data);
  }

  login() {

    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (!username || !password) {
        return;
      }
      console.log(username)
      console.log(password)
      this.authService.login(username, password).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/','pages','home']).then();
            console.log("logged in")
          }
        },
        error: (err) => {
          //TODO: use errorMessage in toastr popup
          const errorMessage = 'Invalid email or password';
          console.error('Could not log in', err);
        }
      });
    }
  }

  protected readonly localStorage = localStorage;
}
