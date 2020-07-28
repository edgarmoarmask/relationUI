import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {FolderQuery} from "@dashboard/state/folder/folder.query";

@Injectable()
export class DesignAccessGuard implements CanLoad {

  constructor(
    private router: Router,
    private folderQuery: FolderQuery
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    const isWorkFolderDefined: boolean = this.folderQuery.isSelectedFolderDefined();

    if (!isWorkFolderDefined)
      this.router.navigate(['']);

    return isWorkFolderDefined;
  }
}
