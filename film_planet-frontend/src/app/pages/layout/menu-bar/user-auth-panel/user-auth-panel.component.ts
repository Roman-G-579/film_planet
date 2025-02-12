import {ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {Popover, PopoverModule} from "primeng/popover";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {RouterLink} from '@angular/router';
import {AutoFocus} from 'primeng/autofocus';
import {NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';


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
    RouterLink,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './user-auth-panel.component.html',
  styleUrl: './user-auth-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAuthPanelComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly authService = inject(AuthService);
  private messageService = inject(MessageService);

  @ViewChild('loginPopover') loginPopoverRef!: Popover;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.authService.restoreSession();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value?.trim() ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.authService.login(username, password).subscribe({
      next: (res) => {
        if (res.token) {
          //TODO: add loading spinner while logging in
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful', life: 3000 })
          this.loginPopoverRef.hide();
        }
      },
      error: (err) => {
        console.error(err.message);
        //const errorMessage = 'Invalid email or password';
        //TODO: use errorMessage in toastr popup
      }
    })
  }
}
