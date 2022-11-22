import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router // Inject Firebase auth service
  ) {}

  user = this.afAuth.user;
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.router.navigateByUrl('/merchants-table');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignOut() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/sign-in');
  }
}
