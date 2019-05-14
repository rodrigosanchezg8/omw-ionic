import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TabsPage} from "./admin/tabs/tabs.page";
import {DeliveryMenTabsPage} from "./delivery-men/tabs/delivery-men-tabs.page";
import {ClientsTabsPage} from "./clients/tabs/clients-tabs.page";

const deliveriesRoutes = [{
    path: 'deliveries', children: [
        {
            path: '',
            loadChildren: './deliveries/client-deliveries.module#ClientDeliveriesPageModule'
        },
        {
            path: 'send', children: [
                {
                    path: 'choose-origin',
                    loadChildren: './deliveries/choose-origin/client-delivery-choose-origin.module#ClientDeliveryChooseOriginPageModule'
                },
                {
                    path: 'find-client',
                    loadChildren: './deliveries/find-client/delivery-find-client.module#DeliveryFindClientPageModule'
                },
                {
                    path: 'products',
                    children: [
                        {
                            path: '',
                            loadChildren: './deliveries/products/delivery-products.module#DeliveryProductsPageModule'
                        },
                        {
                            path: 'messages',
                            loadChildren: './deliveries/messages/delivery-messages.module#DeliveryMessagesPageModule'
                        },
                        {
                            path: 'save',
                            loadChildren: './deliveries/products/save/product-save.module#ProductSavePageModule'
                        },
                    ],
                },
                {
                    path: 'assign',
                    loadChildren: './deliveries/assign/delivery-assign.module#DeliveryAssignPageModule'
                },
            ]
        },
        {
            path: 'delivery-man-tracker',
            children: [
                {
                    path: '',
                    loadChildren: './deliveries/delivery-man-tracker/delivery-man-tracker.module#DeliveryManTrackerPageModule'
                },
                {
                    path: 'messages',
                    loadChildren: './deliveries/messages/delivery-messages.module#DeliveryMessagesPageModule'
                },
            ]
        },
    ]
}];

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: 'home', children: [
            {path: '', loadChildren: './home/home.module#HomePageModule'},
            {
                path: 'sign-up',
                loadChildren: './admin/clients/save-user/clients-save.module#ClientsSavePageModule'
            },
        ]
    },
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
                    },
                    {
                        path: 'detail',
                        loadChildren: './admin/clients/detail/client-detail.module#ClientDetailPageModule'
                    }
                ]
            },
            {
                path: 'companies', children: [
                    {path: '', loadChildren: './admin/companies/companies.module#CompaniesPageModule'},
                    {
                        path: 'detail',
                        loadChildren: './admin/companies/detail/company-detail.module#CompanyDetailPageModule'
                    },
                ]
            },
            {
                path: 'delivery-men', children: [
                    {path: '', loadChildren: './admin/delivery-men/delivery-men.module#DeliveryMenPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/delivery-men/save-user/delivery-men-save.module#DeliveryMenSavePageModule'
                    },
                    {
                        path: 'detail',
                        loadChildren: './admin/delivery-men/detail/delivery-men-detail.module#DeliveryMenDetailPageModule'
                    }
                ]
            },
            ...deliveriesRoutes,
            {
                path: 'setup', children: [
                    {path: '', loadChildren: './setup/setup.module#SetupPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/clients/save-user/clients-save.module#ClientsSavePageModule'
                    },
                ]
            }
        ]
    },
    {path: 'delivery-men', redirectTo: 'delivery-men/tabs/delivery-men-options', pathMatch: 'full'},
    {
        path: 'delivery-men/tabs', component: DeliveryMenTabsPage,
        children: [
            {path: '', redirectTo: 'deliveries', pathMatch: 'full'},
            {
                path: 'delivery-men-options',
                loadChildren: './delivery-men/delivery-options/delivery-men-save-options.module#DeliveryMenSaveOptionsPageModule'
            },
            ...deliveriesRoutes,
            {
                path: 'setup', children: [
                    {path: '', loadChildren: './setup/setup.module#SetupPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/clients/save-user/clients-save.module#ClientsSavePageModule'
                    },
                ]
            }
        ]
    },
    {path: 'clients', redirectTo: 'clients/tabs/company', pathMatch: 'full'},
    {
        path: 'clients/tabs', component: ClientsTabsPage,
        children: [
            {path: '', redirectTo: 'company', pathMatch: 'full'},
            {
                path: 'company', children: [
                    {path: '', loadChildren: './clients/company/clients-company.module#ClientsCompanyPageModule'},
                    {
                        path: 'save',
                        loadChildren: './clients/company/save/client-side-save-company.module#ClientSideSaveCompanyPageModule'
                    }
                ]
            },
            ...deliveriesRoutes,
            {
                path: 'setup', children: [
                    {path: '', loadChildren: './setup/setup.module#SetupPageModule'},
                    {
                        path: 'save-user',
                        loadChildren: './admin/clients/save-user/clients-save.module#ClientsSavePageModule'
                    },
                ]
            }
        ]
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'reload'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
