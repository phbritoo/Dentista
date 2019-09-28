import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-protetico',
  templateUrl: './home-protetico.page.html',
  styleUrls: ['./home-protetico.page.scss']
})
export class HomeProteticoPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  /*Comentado devido a bugs  */

  // ionViewDidLeave() {
  //   this.router.navigate(['/login']);
  // }
}
