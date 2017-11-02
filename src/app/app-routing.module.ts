import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { HomeComponent } from './core/home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
    // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    // 可以防止懒加载时，使用canload来防止权限没有生效。 当加载后，使用canActivate来判断权限
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', 
        canLoad: [AuthGuardService], canActivate: [AuthGuardService]},
    { path: 'shopping-list', component: ShoppingListComponent}
    // { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        // loadChildren 起到了加载懒模块的作用，仅在用户点击模块下的链接时，程序才开始下载模块对应的js文件，然后再渲染出来。若希望用户在还未点击页面的时候，就从后台预先载入该模块的js，可以进行如下修改：
        // preloadingStrategy(模块加载策略): PreloadAllModules作用程序会在首页资源加载完毕后，在后台自动下载其余模块的资源。
        // 在进入其它模块页面的时候，不需要等待js资源的下载，
        // 需要注意的是：如果懒加载的模块有卫士验证，是不能自动的加载资源的。
        RouterModule.forRoot(appRoutes, { useHash: true, preloadingStrategy: PreloadAllModules })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
    
}