import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /*Esse canActivate vai fazer com que ele retorne
    pra página de login caso não estaja logado
    aos 26 min do vídeo #2*/
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (!user) {
          this.router.navigate(['login']);
        }

        resolve(user ? true : false);
      });
    });
  }
}
