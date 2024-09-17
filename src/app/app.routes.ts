import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompanyFormComponent } from './components/Company/company-form/company-form.component';
import { AddItemsComponent } from './components/add-items/add-items.component';
import { AllCompaniesComponent } from './components/Company/all-companies/all-companies.component';
import { CompanyDetailsComponent } from './components/Company/company-details/company-details.component';

import { TypeFormComponent } from './components/type-form/type-form.component';

import { UnitsComponent } from './components/units/units.component';
import { ClientsComponent } from './components/clients/clients.component';


export const routes: Routes = [
    {path: '', redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',component:HomeComponent},
    {path: 'manage',component:ManageComponent},
    {path: 'reports',component:ReportsComponent},
    {path: 'manage/allCompanies', component: AllCompaniesComponent},
    {path: 'manage/allCompanies/addCompany/:id',component:CompanyFormComponent},
    {path: 'manage/allCompanies/view/:id',component:CompanyDetailsComponent},
    {path: 'manage/addType', component: TypeFormComponent},
    {path: 'units',component:UnitsComponent},
    {path: 'clients',component:ClientsComponent},

    {path: 'AddItem', component: AddItemsComponent},
    {path: 'AddInvoice', component: InvoicesComponent},

    {path: '**',component:NotFoundComponent}




];
