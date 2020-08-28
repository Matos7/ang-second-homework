import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private _router:Router) { }

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
