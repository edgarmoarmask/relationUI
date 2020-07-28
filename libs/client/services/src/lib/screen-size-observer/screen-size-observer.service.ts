import {Injectable} from '@angular/core';

import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

import {Observable} from "rxjs";
import {map, shareReplay, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeObserverService {

  private isDesktop: boolean;

  private isDesktop$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      take(1),
      map(result => result.matches),
      tap(isDesktop => this.isDesktop = isDesktop),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver) {
  }

  isDesktopScreen(): boolean {

    return this.isDesktop;
  }

  isDesktopScreen$(): Observable<boolean> {

    return this.isDesktop$;
  }
}
