import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {PopoverModule} from "primeng/popover";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-window',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PopoverModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-window.component.html',
  styleUrl: './login-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginWindowComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (!email || !password) {
        return;
      }
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
}
