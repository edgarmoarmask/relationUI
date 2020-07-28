import {Injectable} from "@angular/core";

import {forkJoin, Observable} from "rxjs";

import {IDocument, IDocumentText, IDocumentView} from "@eagleye/shared/models";

import {DocumentApiService} from "@dashboard/api/document-api.service";
import {MentionsService} from "@dashboard/state/mentions/mentions.service";
import {map} from "rxjs/operators";

@Injectable()
export class DocumentService {

  constructor(
    private documentApiService: DocumentApiService,
    private mentionsService: MentionsService) {
  }

  getAllDocuments$(): Observable<IDocument[]> {

    return this.documentApiService.getAllDocuments();
  }

  getDocumentTextById$(id: string): Observable<IDocumentText> {

    return this.documentApiService.getDocumentTextById(id);
  }

  getDocumentView$(id: string): Observable<IDocumentView> {

    return forkJoin([
      this.getDocumentTextById$(id),
      this.mentionsService.getMentionsByDocument$(id)
    ]).pipe(
      map(
        ([document, mentions]) => ({text: document.text, mentions})
      )
    )
  }
}
