import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AutoFocus} from 'primeng/autofocus';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ConfirmPasswordValidator} from '../../core/validators/confirm-password.validator';
import {RegisterService} from './register.service';
import {RegistrationDetails} from './registration-details.interface';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {FloatLabelModule} from 'primeng/floatlabel';
import {StyleClassModule} from 'primeng/styleclass';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AutoFocus,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,
    CardModule,
    FloatLabelModule,
    StyleClassModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);
  private readonly router = inject(Router);
  private messageService = inject(MessageService);

  registerForm = this.fb.group({
    usernameAndEmail: new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    }),
    fullName: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),

    passwordAndConfirmation: new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      confirmPassword: new FormControl('', Validators.required)
      },
      {
        validators: ConfirmPasswordValidator.match('password', 'confirmPassword')
      }
    )
  });

  register() {
    const formData: RegistrationDetails = Object.assign({}, ...Object.values(this.registerForm.value));

    if (formData.password !== formData.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password and confirmation do not match', life: 3000 });
      return;
    }

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword ) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill all required fields to proceed', life: 3000 });
      return;
    }

    this.registerService.registerUser(formData).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account successfully created', life: 3000 });
        this.router.navigate(['/', '/pages', 'home']).then();
      },
      error: (err) => {
        const errorMessage = err.error?.message || "Registration failed";
        if(errorMessage.includes('Account with this Email already exists')) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Account with this Email already exists', life: 3000 });
        } else if (errorMessage.incluldes('Username already taken')) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username already taken. Please select another', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Registration failed', life: 3000 });
        }
      }
    })
  }
}
