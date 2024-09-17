import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompanyFormComponent } from './components/company-form/company-form.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { ItemsComponent } from './components/items/items.component';
import { EditItemsComponent } from './components/edit-items/edit-items.component';

import { TypeFormComponent } from './components/type-form/type-form.component';

import { UnitsComponent } from './components/units/units.component';
import { ClientsComponent } from './components/clients/clients.component';


export const routes: Routes = [
    {path: '', redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',component:HomeComponent},
    {path: 'manage',component:ManageComponent},
    {path: 'invoice',component:InvoicesComponent},
    {path: 'reports',component:ReportsComponent},
    {path: 'manage/Items',component:ItemsComponent},
    {path: 'manage/addCompany', component: CompanyFormComponent },
    {path: 'manage/addType', component: TypeFormComponent},
    {path: 'units',component:UnitsComponent},
    {path: 'clients',component:ClientsComponent},
    {path: 'manage/addCompany',component:CompanyFormComponent},
    {path: 'manage/Edit/:id',component:EditItemsComponent},
    {path: 'AddItem', component: AddItemsComponent},
    {path: '**',component:NotFoundComponent}




];
