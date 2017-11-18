import { NgModule } from "@angular/core/";
import { AppModule } from "app/app.module";
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from "app/app.component";

@NgModule({
    imports: [
        AppModule,  //导入AppModule整个模块将在服务期间使用
        ServerModule,    //暴露一些工具使得angular在服务器端正确运行
        ModuleMapLoaderModule   //懒加载路由
    ],
    bootstrap: [AppComponent]
})
export class AppServerModule {

}