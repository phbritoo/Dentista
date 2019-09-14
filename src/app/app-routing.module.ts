import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tela-inicial', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/pages/login/login.module#LoginPageModule' },
  {
    path: 'tela-inicial',
    loadChildren: './auth/pages/tela-inicial/tela-inicial.module#TelaInicialPageModule'
  },
  {
    path: 'cadastro-dentista',
    loadChildren:
      './auth/pages/cadastro-dentista/cadastro-dentista.module#CadastroDentistaPageModule'
  },
  {
    path: 'cadastro-protetico',
    loadChildren:
      './auth/pages/cadastro-protetico/cadastro-protetico.module#CadastroProteticoPageModule'
  },
  {
    path: 'home-dentista',
    loadChildren: './auth/pages/home-dentista/home-dentista.module#HomeDentistaPageModule'
    // canActivate: [AuthGuard]
  },
  {
    path: 'home-protetico',
    loadChildren: './auth/pages/home-protetico/home-protetico.module#HomeProteticoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home-dentista/order',
    loadChildren: './auth/pages/novo-pedido/novo-pedido.module#NovoPedidoPageModule'
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
