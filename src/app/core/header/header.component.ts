import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {DataStorageService} from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

    // @Output() featureSeleted = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSeleted.emit(feature);
    // }

    authState: Observable<fromAuth.State>;

    constructor(private dataStorageService: DataStorageService, 
                private authService: AuthService,
                private store: Store<fromApp.AppState>) {
    }

    ngOnInit() {
        this.authState = this.store.select('auth');
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

    // isAuthenticated() {
        // return this.authService.isAuthenticated(); 
    // }
}