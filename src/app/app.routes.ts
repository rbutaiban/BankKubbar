import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { isLoggedOutGuard } from './guards/is-logged-out.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [isLoggedOutGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isLoggedOutGuard],
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [loggedInGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [loggedInGuard],
  },
  { path: '**', redirectTo: '' },
];
