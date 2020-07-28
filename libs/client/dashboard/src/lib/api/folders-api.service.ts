import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'any'
})
export class FoldersApiService {

  private readonly PREFIX: string = '/api/folders';

  constructor(private http: HttpClient) {}

  getFolders(): Observable<string[]> {

    return this.http.get<string[]>(`${this.PREFIX}`);
  }

  setWorkFolder(folderName: string): Observable<any> {

    const body = {folderName};

    return this.http.post<any>(
      `${this.PREFIX}`,
       JSON.stringify(body),
       {
         headers: {
           'Content-type': 'application/json'
         }
       }
    );
  }
}
