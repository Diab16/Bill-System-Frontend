import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ManageComponent } from './components/manage/manage.component';
import { InvoicesComponent } from './components/Invoice/invoices/invoices.component';
import { ReportsComponent } from './components/reports/reports.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CompanyFormComponent } from './components/Company/company-form/company-form.component';
import { AddItemsComponent } from './components/Item/add-items/add-items.component';

import { ItemsComponent } from './components/Item/items/items.component';
import { EditItemsComponent } from './components/Item/edit-items/edit-items.component';
import { AllCompaniesComponent } from './components/Company/all-companies/all-companies.component';
import { CompanyDetailsComponent } from './components/Company/company-details/company-details.component';

import { TypeFormComponent } from './components/Types/type-form/type-form.component';
import { TypeComponent } from './components/Types/type/type.component';
import { TypeDetailsComponent } from './components/Types/type-details/type-details.component';
// import { UnitsComponent } from './components/units/units.component';
// import { ClientsComponent } from './components/clients/clients.component';
import { ItemsDetailsComponent } from './components/Item/items-details/items-details.component';
import { LoginComponent } from './components/login/login.component';
import { AddInvoiceComponent } from './components/Invoice/add-invoice/add-invoice.component';

import { AllUnitsComponent } from './components/units/all-units/all-units.component';
import { UnitDetailsComponent } from './components/units/unit-details/unit-details.component';
import { UnitFormComponent } from './components/units/unit-form/unit-form.component'; 
import { AllClientsComponent } from './components/clients/all-clients/all-clients.component';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';

import { InvoiceDetailsComponent } from './components/Invoice/invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './components/Invoice/edit-invoice/edit-invoice.component';
import { authGuard } from './auth.guard';



export const routes: Routes = [
    {path: '', redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',canActivate:[authGuard] ,component:HomeComponent},
    {path: 'manage', canActivate:[authGuard],component:ManageComponent},
    {path: 'reports',canActivate:[authGuard],component:ReportsComponent},

    {path: 'manage/Items',canActivate:[authGuard] ,component:ItemsComponent},
    {path: 'manage/Invoices',canActivate:[authGuard] ,component:InvoicesComponent},
    {path: 'manage/addCompany', canActivate:[authGuard] ,component: CompanyFormComponent },
    {path: 'manage/addType',canActivate:[authGuard]  ,component: TypeFormComponent},
    // {path: 'units',component:UnitsComponent},
    // {path: 'clients',component:ClientsComponent},
    {path: 'manage/addCompany',canActivate:[authGuard]  ,component:CompanyFormComponent},

    {path: 'manage/Items',canActivate:[authGuard] ,component:ItemsComponent},
    {path: 'manage/addItem', canActivate:[authGuard] ,component: AddItemsComponent},
    {path: 'manage/Edit/:id',canActivate:[authGuard] ,component:EditItemsComponent},
    {path: 'manage/view/:id',canActivate:[authGuard] ,component:ItemsDetailsComponent},

    {path: 'manage/Invoices', canActivate:[authGuard] ,component:InvoicesComponent},
    {path: 'invoice',canActivate:[authGuard] ,component:InvoicesComponent},
    {path: 'manage/Invoices/viewInvoice/:id',canActivate:[authGuard]  ,component:InvoiceDetailsComponent},
    {path: 'invoice/viewInvoice/:id',canActivate:[authGuard]  ,component:InvoiceDetailsComponent},
    {path: 'manage/Invoices/addInvoice',canActivate:[authGuard]  ,component: AddInvoiceComponent},
    {path: 'invoice/addInvoice',canActivate:[authGuard]  ,component: AddInvoiceComponent},

    {path: 'manage/allCompanies',canActivate:[authGuard]  ,component: AllCompaniesComponent},
    {path: 'manage/allCompanies/addCompany/:id',canActivate:[authGuard]  ,component:CompanyFormComponent},
    {path: 'manage/allCompanies/view/:id',canActivate:[authGuard]  ,component:CompanyDetailsComponent},
    {path: 'manage/addCompany', canActivate:[authGuard] ,component:CompanyFormComponent},

    {path: 'manage/addType',canActivate:[authGuard]  ,component: TypeFormComponent},

    // {path: 'manage/addUnit',component:UnitsComponent},
    // {path: 'manage/addClient',component:ClientsComponent},
    {path: 'manage/addItem',canActivate:[authGuard]  ,component: AddItemsComponent},
    {path: 'manage/addInvoice',canActivate:[authGuard]  ,component: AddInvoiceComponent},
    {path: 'Login', component:LoginComponent},

    { path: 'manage/Type',canActivate:[authGuard]  ,component: TypeComponent },
    { path: 'manage/Type/:id',canActivate:[authGuard]  ,component: TypeDetailsComponent },
    { path: 'manage/editType/:id',canActivate:[authGuard]  ,component: TypeFormComponent },

    {path: 'manage/addUnit',canActivate:[authGuard]  ,component: UnitFormComponent }, // Route for adding unit
    {path: 'manage/allUnits',canActivate:[authGuard]  ,component:AllUnitsComponent }, //route of the unit page crud
    {path: 'manage/allUnits/editUnit/:id',canActivate:[authGuard]  ,component: UnitFormComponent }, // Route for editing unit
    {path: 'manage/allUnits/view/:id',canActivate:[authGuard]  ,component: UnitDetailsComponent }, //route for view details of units

    {path: 'manage/allClients',canActivate:[authGuard]  ,component:AllClientsComponent },
    {path: 'manage/allClients/view/:id', canActivate:[authGuard] ,component: ClientDetailsComponent },
    {path: 'manage/addClient',canActivate:[authGuard]  ,component: ClientFormComponent }, 
    {path: 'manage/editClient/:id',canActivate:[authGuard]  ,component: ClientFormComponent },     
    {path: '**',component:NotFoundComponent}




];
