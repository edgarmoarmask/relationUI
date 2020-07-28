import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

import {IDocument, IDocumentText} from '@eagleye/shared/models';

@Injectable()
export class DocumentApiService {

  private readonly PREFIX: string = '/api/document';

  constructor(private http: HttpClient) {
  }

  getAllDocuments(): Observable<IDocument[]> {

    return this.http.get<IDocument[]>(`${this.PREFIX}`);
  }

  getDocumentTextById(id: string): Observable<IDocumentText> {

    return this.http.get<{ text: string }>(`${this.PREFIX}/text/${id}`);
  }
}
