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
    StyleClassModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);

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

    this.registerService.registerUser(formData).subscribe({
      next: () => {
        //TODO: Add success message
      },
      error: (err) => {
        if(err.error.message && err.error.message.includes('Account with this Email already exists')) {
          //TODO: Add error message
        } else {
          //TODO: Add error message
        }
      }
    })
  }
}
