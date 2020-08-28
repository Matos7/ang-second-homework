import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Location]
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router) {
  }

  public isLinkDisabled():boolean{
    const pathName = this._router.url;
    if(pathName === "/login" || pathName === "/register" || pathName === "//forget-password" ){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.isLinkDisabled();
  }

  navigateToAbout(event: MouseEvent): void {
    this._router.navigateByUrl('/about');
  }
}
