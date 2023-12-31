import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

interface SignedinResponse {
  authenticated: boolean;
  username: string;
}

export interface SigninCredentials {
  username: string;
  password: string;
}

export interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  rootUrl = 'https://api.angular-email.com';

  signedin$ = new BehaviorSubject<any>(null);

  username = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`, {
            username
        })
  }

  signup(credentials: SignupCredentials ){
    //return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, { withCredentials: true })
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials )
    .pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }

  checkAuth(){
    // return this.http.get(`${this.rootUrl}/auth/signedin`, { withCredentials: true })  //Adding the second argument { withCrendentials: true } will make the cookie to be send in to fix our requests
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }

  signout(){
    // return this.http.get(`${this.rootUrl}/auth/signedin`, { withCredentials: true })  //Adding the second argument { withCrendentials: true } will make the cookie to be send in to fix our requests
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    )
  }

  signin(credentials: SigninCredentials ){
    return this.http.post<SigninResponse>(`${this.rootUrl}/auth/signin`, credentials )
    .pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    );
  }
}
