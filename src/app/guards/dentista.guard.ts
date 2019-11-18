
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController } from '@ionic/angular';


@Injectable()
export class DentistaGuard implements CanActivateChild {

constructor(

    private navCtrl: NavController
  ) {

  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    console.log('guarta de rota filha');

    if (state.url.includes('prot') ) {
      console.log('nao');
      this.navCtrl.navigateBack(['/home-dentista']);
      return false;
    }

    console.log(route);
    console.log(state);
    return true;
  }
}
