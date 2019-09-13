import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tela-inicial', pathMatch: 'full' },
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
  {
    path: 'tela-inicial',
    loadChildren: './auth/pages/tela-inicial/tela-inicial.module#TelaInicialPageModule'
  },
  { path: 'cadastro-teste', loadChildren: './auth/pages/cadastro-teste/cadastro-teste.module#CadastroTestePageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
