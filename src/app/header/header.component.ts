import { Component, EventEmitter, Output } from '@angular/core';
import {Response} from '@angular/http';

import {DataStorageService} from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    // @Output() featureSeleted = new EventEmitter<string>();

    // onSelect(feature: string) {
    //     this.featureSeleted.emit(feature);
    // }

    constructor(private dataStorageService: DataStorageService) {

    }

    onSaveData() {
        this.dataStorageService.storeRecipes().subscribe((response: Response) => {
            console.log(response);
        });
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }
}