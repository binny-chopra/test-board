import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'products', loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent) },
    { path: 'users', loadComponent: () => import('./components/users/users.component').then(c => c.UsersComponent) }
];
