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



export const routes: Routes = [
    {path: '', redirectTo:'Home',pathMatch:'full'},
    {path: 'Home',component:HomeComponent},
    {path: 'manage',component:ManageComponent},
    {path: 'reports',component:ReportsComponent},

    {path: 'manage/Items',component:ItemsComponent},
    {path: 'manage/Invoices',component:InvoicesComponent},
    {path: 'manage/addCompany', component: CompanyFormComponent },
    {path: 'manage/addType', component: TypeFormComponent},
    // {path: 'units',component:UnitsComponent},
    // {path: 'clients',component:ClientsComponent},
    {path: 'manage/addCompany',component:CompanyFormComponent},

    {path: 'manage/Items',component:ItemsComponent},
    {path: 'manage/addItem', component: AddItemsComponent},
    {path: 'manage/Edit/:id',component:EditItemsComponent},
    {path: 'manage/view/:id',component:ItemsDetailsComponent},

    {path: 'manage/Invoices',component:InvoicesComponent},
    {path: 'invoice',component:InvoicesComponent},
    {path: 'manage/Invoices/viewInvoice/:id',component:InvoiceDetailsComponent},
    {path: 'invoice/viewInvoice/:id',component:InvoiceDetailsComponent},
    {path: 'manage/Invoices/addInvoice', component: AddInvoiceComponent},
    {path: 'invoice/addInvoice', component: AddInvoiceComponent},

    {path: 'manage/allCompanies', component: AllCompaniesComponent},
    {path: 'manage/allCompanies/addCompany/:id',component:CompanyFormComponent},
    {path: 'manage/allCompanies/view/:id',component:CompanyDetailsComponent},
    {path: 'manage/addCompany',component:CompanyFormComponent},

    {path: 'manage/addType', component: TypeFormComponent},

    // {path: 'manage/addUnit',component:UnitsComponent},
    // {path: 'manage/addClient',component:ClientsComponent},
    {path: 'manage/addItem', component: AddItemsComponent},
    {path: 'manage/addInvoice', component: AddInvoiceComponent},
    {path: 'Login', component:LoginComponent},

    { path: 'manage/Type', component: TypeComponent },
    { path: 'manage/Type/:id', component: TypeDetailsComponent },
    { path: 'manage/editType/:id', component: TypeFormComponent },

    {path: 'manage/addUnit', component: UnitFormComponent }, // Route for adding unit
    {path: 'manage/allUnits', component:AllUnitsComponent }, //route of the unit page crud
    {path: 'manage/allUnits/editUnit/:id', component: UnitFormComponent }, // Route for editing unit
    {path: 'manage/allUnits/view/:id', component: UnitDetailsComponent }, //route for view details of units

    {path: 'manage/allClients', component:AllClientsComponent },
    {path: 'manage/allClients/view/:id', component: ClientDetailsComponent },
    {path: 'manage/addClient', component: ClientFormComponent }, 
    {path: 'manage/editClient/:id', component: ClientFormComponent },     
    {path: '**',component:NotFoundComponent}




];
