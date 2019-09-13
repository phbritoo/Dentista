import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /*Esse canActivate vai fazer com que ele seja direcionado
    pra página de home-dentista caso o login seja efetuado com sucesso
    temos que bolar uma forma de melhorar esse método pra ele
    entender se o login é de protético ou dentista.
    Uma saída rápida e fácil seria criar login de protético e
    login de dentista separados. Depois perderíamos tempo com o método
    aos 26 min do vídeo #2*/
  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.authService.getAuth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['home-dentista']);

        resolve(!user ? true : false);
      });
    });
  }

}
