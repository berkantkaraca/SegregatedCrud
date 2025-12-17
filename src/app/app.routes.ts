import { Routes } from '@angular/router';
import { CategoryOperation } from './myComponents/category-operation/category-operation';
import { ProductOperation } from './myComponents/product-operation/product-operation';
import { MainNav } from './myComponents/main-nav/main-nav';
import { NotFound } from './myComponents/not-found/not-found';

export const routes: Routes = [
    {path: '', component: MainNav},
    {path: 'categories', component: CategoryOperation},
    {path: 'products', component: ProductOperation},
    {path: '**', component: NotFound}
];
