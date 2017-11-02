import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipesEditComponent } from './recipes-edit/recipes-edit.component';

import { AuthGuardService } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
    // { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipesStartComponent },
        // 需要放在:id上面
        { path: 'new', component: RecipesEditComponent, canActivate: [AuthGuardService] },
        { path: ':id', component: RecipesDetailComponent },
        { path: ':id/edit', component: RecipesEditComponent, canActivate: [AuthGuardService] }
    ]},
];

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RecipesRoutingModule {

}