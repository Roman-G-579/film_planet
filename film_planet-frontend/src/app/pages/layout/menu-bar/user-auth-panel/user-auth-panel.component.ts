import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
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
export class UserAuthPanelComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    console.log("login called")
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (!email || !password) {
        return;
      }
      console.log(email)
      console.log(password)
      this.authService.login(email, password).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
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
