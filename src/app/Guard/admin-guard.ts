import { Injectable } from '@angular/core';

import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { DbCommunicationService } from '../db-communication.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private _db: DbCommunicationService,
    private router: Router
  ) {

  }

  public canActivate(): boolean {
    if (this._db.getUser().role == "ADMN") {
      return true;
    }
    
    console.warn("Unathorized user attempted to use admin path");
    this.router.navigate(['/']);
    return false;
  }

  public canActivateChild(): boolean {
    return this.canActivate();
  }
}