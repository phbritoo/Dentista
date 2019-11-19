import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { DentistaGuard } from './guards/dentista.guard';

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
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'home-protetico',
    loadChildren: './auth/pages/home-protetico/home-protetico.module#HomeProteticoPageModule',
    canActivate: [AuthGuard]
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'novo-pedido',
    loadChildren: './auth/pages/novo-pedido/novo-pedido.module#NovoPedidoPageModule',
    canActivate: [AuthGuard]
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'popup-menu',
    loadChildren: './auth/pages/popup-menu/popup-menu.module#PopupMenuPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil-dentista',
    loadChildren: './auth/pages/perfil-dentista/perfil-dentista.module#PerfilDentistaPageModule',
    canActivate: [AuthGuard]
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'editar-pedido/:id',
    loadChildren: './auth/pages/editar-pedido/editar-pedido.module#EditarPedidoPageModule',
    canActivate: [AuthGuard]
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'editar-pedido-prot/:id',
    loadChildren:
      './auth/pages/editar-pedido-prot/editar-pedido-prot.module#EditarPedidoProtPageModule',
    canActivate: [AuthGuard]
    // canActivateChild: [DentistaGuard]
  },
  {
    path: 'status-cancelado',
    loadChildren: './auth/pages/status-cancelado/status-cancelado.module#StatusCanceladoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'status-concluido',
    loadChildren: './auth/pages/status-concluido/status-concluido.module#StatusConcluidoPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'status-pendente',
    loadChildren: './auth/pages/status-pendente/status-pendente.module#StatusPendentePageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
