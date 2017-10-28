import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // loadedFeature:string = 'recipe';

  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

  ngOnInit() {
    // 使用firebase的权限验证，必须在页面初始化时，初始化firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBOPKDK81EHizn3aUT-e-ZxNgcVdEK7dVI",
      authDomain: "ng-recipe-book-6fa96.firebaseapp.com"
    });
  }
}
