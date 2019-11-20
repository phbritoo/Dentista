import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ProteticoGuard implements CanActivateChild {
  tipoUsuario;
  userRef;
  constructor(
    private navCtrl: NavController,
    private afs: AngularFirestore,
    private authService: AuthService,
    private router: Router
  ) {
    const newUser = this.authService.getAuth().currentUser.uid;
    this.userRef = this.afs.collection('User').doc(newUser);
  }

  canActivateChild(): Observable<boolean> | boolean {
    this.tipoUsuario = this.userRef
      .get()
      .toPromise()
      .then(doc => {
        if (!doc.exists) {
          console.log('Não existe documento');
        } else {
          this.tipoUsuario = doc.get('isDentista');
        }
        if (this.tipoUsuario === true) {
          console.log('dentista');
          this.router.navigate(['/home-dentista']);
          return false;
        }
      });
    return true;
  }
}
