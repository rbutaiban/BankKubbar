import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { TransferComponent } from './components/transfer/transfer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [loggedInGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [loggedInGuard],
  },
  { path: 'transfer', component: TransferComponent },
  { path: '**', redirectTo: '' },
];
