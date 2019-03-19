import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsPage} from "./admin/tabs/tabs.page";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'reset-password', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule'},
    {path: 'admin', redirectTo: 'admin/tabs/delivery-mans', pathMatch: 'full'},
    {
        path: 'admin/tabs', component: TabsPage,
        children: [
            {path: 'clients', loadChildren: './admin/clients/clients.module#ClientsPageModule'},
            {
                path: 'delivery-mans',
                loadChildren: './admin/delivery-mans/delivery-mans.module#DeliveryMansPageModule'
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
