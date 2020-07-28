import {Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject, ElementRef, OnDestroy} from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Annotator} from 'poplar-annotation';

import {IDocumentView} from '@eagleye/shared/models';

import {IAnnotator} from "@dashboard/features/document-viewer/models/annotator.model";
import {createAnnotatorConfiguration} from "@dashboard/features/document-viewer/helpers/annotator-config";

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, OnDestroy {

  @ViewChild('viewer', {read: ElementRef, static: true}) viewArea: ElementRef;

  annotator: Annotator;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public documentView: IDocumentView) {
  }

  ngOnInit() {

    this.setAnnotator();
  }

  ngOnDestroy() {

    this.annotator?.remove();
  }

  private setAnnotator(): void {

    const annotatorConfig: IAnnotator = createAnnotatorConfiguration(this.documentView.text, this.documentView.mentions);

    this.annotator = new Annotator(
      annotatorConfig,
      this.viewArea.nativeElement,
      {
        contentEditable: false
      }
    );
  }
}
