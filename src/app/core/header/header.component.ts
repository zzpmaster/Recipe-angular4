import { Component, EventEmitter, Output } from '@angular/core';
import {HttpEvent, HttpEventType} from '@angular/common/http';

import {DataStorageService} from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    // @Output() featureSeleted = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSeleted.emit(feature);
    // }

    constructor(private dataStorageService: DataStorageService, 
                private authService: AuthService) {

    }

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe((response) => {
            console.log(response);
        });
        /**
        this.dataStorageService.storeRecipes().subscribe((response: HttpEvent<Object>) => {
            if (response.type === HttpEventType.Sent) {
                console.log("senting");
            } else if (response.type === HttpEventType.Response) {
                console.log("response");
            }
        });
         */
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

    isAuthenticated() { 
        return this.authService.isAuthenticated(); 
    }
}