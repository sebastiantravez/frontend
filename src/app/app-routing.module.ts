import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MetasComponent } from './metas/metas.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CanActivateViaAuthGuard } from './guards/CanActivateViaAuthGuard';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      {
        path: '', component: NavbarComponent, children: [
          { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
          { path: 'dashboard/users', component: UsersComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]},
          { path: 'dashboard/metas', component: MetasComponent, pathMatch: 'full', canActivate: [CanActivateViaAuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
