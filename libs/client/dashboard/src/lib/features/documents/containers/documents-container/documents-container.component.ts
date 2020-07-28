import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Observable} from "rxjs";

import {MatDialog} from "@angular/material/dialog";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {IDocumentView, IEntityDocument, IMentions} from "@eagleye/shared/models";

import {ChosenEntityQuery} from "@dashboard/state/entity/entity.query";

import {DocumentService} from "@dashboard/state/document/document.service";
import {MentionsService} from "@dashboard/state/mentions/mentions.service";

@UntilDestroy()
@Component({
  selector: 'documents-container',
  templateUrl: './documents-container.component.html',
  styleUrls: ['./documents-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentsContainerComponent implements OnInit {

  entityDocuments$: Observable<IEntityDocument[]>;

  constructor(
    private dialog: MatDialog,
    private entityQuery: ChosenEntityQuery,
    private mentionsService: MentionsService,
    private documentService: DocumentService) {
  }

  ngOnInit() {

    this.initDocuments();
  }

  async openDocument(document: IEntityDocument) {

    const {DocumentViewerComponent} = await import('@dashboard/features/document-viewer');

    this.documentService.getDocumentView$(document.id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(({text, mentions}) => {

        if (text && mentions)
          this.dialog.open<any, IDocumentView>(
            DocumentViewerComponent,
            {
              data: {
                text,
                mentions
              },
              width: '100%',
              maxWidth: '90vw',
              height: '100%'
            }
          );
      })
  }

  private initDocuments(): void {

    this.entityDocuments$ = this.entityQuery.selectedEntityDocuments$;
  }
}
