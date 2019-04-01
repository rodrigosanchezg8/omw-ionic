import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsPage} from "./admin/tabs/tabs.page";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule'},
    {path: 'admin', redirectTo: 'admin/tabs/clients', pathMatch: 'full'},
    {
        path: 'admin/tabs', component: TabsPage,
        children: [
            {path: '', redirectTo: 'clients', pathMatch: 'full'},
            {
                path: 'clients', children: [
                    {path: '', loadChildren: './admin/clients/clients.module#ClientsPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/clients/save-user/clients-save.module#ClientsSavePageModule'
                    },
                    {
                        path: 'save-company',
                        loadChildren: './admin/clients/save-company/clients-save-company.module#ClientsSaveCompanyPageModule'
                    }
                ]
            },
            {
                path: 'delivery-mans', children: [
                    {path: '', loadChildren: './admin/delivery-mans/delivery-mans.module#DeliveryMansPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/delivery-mans/save-user/delivery-mans-save.module#DeliveryMansSavePageModule'
                    },
                    {
                        path: 'save-options',
                        loadChildren: './admin/delivery-mans/save-options/delivery-mans-save-options.module#DeliveryMansSaveOptionsPageModule'
                    }
                ]
            },
            {path: 'setup', loadChildren: './admin/setup/setup.module#SetupPageModule'},
            {path: 'products', loadChildren: './admin/products/products.module#ProductsPageModule'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
