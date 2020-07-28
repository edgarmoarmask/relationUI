import {Injectable} from '@angular/core';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {catchError} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";
import {throwError} from "rxjs/internal/observable/throwError";
import {NotifierService} from "@eagleye/client/ui/notifier";


const UNAUTHORIZED_STATUS: number = 401;

@Injectable({providedIn: 'root'})
export class InterceptorErrorService implements HttpInterceptor {

  constructor(private notifierService: NotifierService) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((response: HttpErrorResponse) => {

          const errorMessage: string = response.message;

          if (response.status >= 400 && response.status !== UNAUTHORIZED_STATUS) {
            //Here comes logic for http error response

            const error: string = response.error?.error || response.error || response.message;

            this.notifierService.showError({
              title: 'HTTP Request error', message: error
            });
          }

          return throwError(errorMessage);
        })
      )
  }
}
