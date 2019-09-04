import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/pages/login/login.module#LoginPageModule' },
  {
    path: 'cadastro-protetico',
    loadChildren:
      './auth/pages/cadastro-protetico/cadastro-protetico.module#CadastroProteticoPageModule'
  },
  {
    path: 'cadastro-dentista',
    loadChildren:
      './auth/pages/cadastro-dentista/cadastro-dentista.module#CadastroDentistaPageModule'
  },
  {
    path: 'home-dentista',
    loadChildren: './auth/pages/home-dentista/home-dentista.module#HomeDentistaPageModule'
  },
  {
    path: 'home-protetico',
    loadChildren: './auth/pages/home-protetico/home-protetico.module#HomeProteticoPageModule'
  },
  { path: 'header', loadChildren: './auth/pages/header/header.module#HeaderPageModule' },
  { path: 'footer', loadChildren: './auth/pages/footer/footer.module#FooterPageModule' },
  { path: 'index', loadChildren: './auth/pages/index/index.module#IndexPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
