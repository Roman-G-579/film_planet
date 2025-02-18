import {ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {Popover, PopoverModule} from "primeng/popover";
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {RouterLink} from '@angular/router';
import {AutoFocus} from 'primeng/autofocus';
import {NgIf} from '@angular/common';
import {MenuItem, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import {MenuModule} from 'primeng/menu';


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
    PasswordModule,
    MenuModule,
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

  isLoading: WritableSignal<boolean> = signal<boolean>(false);

  @ViewChild('loginPopover') loginPopoverRef!: Popover;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  profileMenuItems: MenuItem[] | undefined;


  ngOnInit() {
    this.restoreSession();


  }

  login() {
    this.isLoading.set(true);
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Both fields are required', life: 3000 });
      this.isLoading.set(false);
      return;
    }

    const username = this.loginForm.get('username')?.value?.trim() ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.authService.login(username, password).subscribe({
      next: (res) => {
        if (res.token) {
          this.isLoading.set(false);
          this.messageService.add({ severity: 'success', summary: 'Welcome', detail: 'Login successful', life: 3000 });
          this.setProfileMenuItems();
          this.loginPopoverRef.hide();
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Wrong username or password', life: 3000 });
      }
    })
  }

  /**
   * Sets the buttons and labels of the profile menu
   */
  setProfileMenuItems() {
    this.profileMenuItems = [
      {
        label: `Welcome, ${this.authService.userData().firstName || this.authService.userData().username}!`,
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-user',
            route: '/pages/profile'

          },
          {
            label: 'Ratings',
            icon: 'pi pi-star',
            route: '/pages/profile'

          },
          {
            label: 'Reviews',
            icon: 'pi pi-book',
            route: '/pages/profile'

          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',

          }
        ]
      }
    ];
  }

  restoreSession() {
    // this.authService.restoreSession()?.subscribe({
    //   next: (res) => {
    //     this.authService.isLoggedIn.set(true);
    //   },
    //   error: (err) => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unauthorized - Try logging in again.', life: 3000 });
    //   }
    // })
  }
}
