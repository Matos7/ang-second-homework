import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [Location]
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router,private router: Router) {
  }

  public isLinkDisabled():boolean{
    const pathName = this.router.url;
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
