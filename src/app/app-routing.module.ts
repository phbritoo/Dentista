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
    path: 'reset-password',
    loadChildren: './auth/pages/reset-password/reset-password.module#ResetPasswordPageModule'
  },
  {
    path: 'cadastro-protetico',
    loadChildren:
      './auth/pages/cadastro-protetico/cadastro-protetico.module#CadastroProteticoPageModule'
  },
  {
    path: 'home-dentista',
    loadChildren: './auth/pages/home-dentista/home-dentista.module#HomeDentistaPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'home-protetico',
    loadChildren: './auth/pages/home-protetico/home-protetico.module#HomeProteticoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'novo-pedido',
    loadChildren: './auth/pages/novo-pedido/novo-pedido.module#NovoPedidoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'modal-pedido',
    loadChildren: './auth/pages/modal-pedido/modal-pedido.module#ModalPedidoPageModule'
  },
  {
    path: 'popup-menu',
    loadChildren: './auth/pages/popup-menu/popup-menu.module#PopupMenuPageModule'
  },
  {
    path: 'perfil-dentista',
    loadChildren: './auth/pages/perfil-dentista/perfil-dentista.module#PerfilDentistaPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-protetico',
    loadChildren: './auth/pages/perfil-protetico/perfil-protetico.module#PerfilProteticoPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
