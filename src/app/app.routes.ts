import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddItemsComponent } from './components/add-items/add-items.component';

export const routes: Routes = [
    {path: '', redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',component:HomeComponent},
    {path: 'manage',component:ManageComponent},
    {path: 'invoice',component:InvoicesComponent},
    {path: 'reports',component:ReportsComponent},
    {path: 'AddItem', component: AddItemsComponent},
    {path: '**',component:NotFoundComponent}

    
];
