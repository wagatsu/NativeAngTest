import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { tnsOauthLogin, tnsOauthLogout } from '../auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'NativeAngTest';

  constructor(private page: Page) { 
    page.actionBarHidden = true;
  }

  ngOnInit() {
  }

  onLoginTap(){
    tnsOauthLogin("google");
  }
  onLogoutTap(){
    tnsOauthLogout();
  }
}
