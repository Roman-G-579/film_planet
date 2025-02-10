import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {RegistrationDetails} from './registration-details.interface';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}`;

  registerUser(registrationDetails: RegistrationDetails): Observable<object> {
    const { href } = new URL('auth/register', this.apiUrl);
    console.log(registrationDetails)
    return this.http.post(href, registrationDetails);
  }
}
