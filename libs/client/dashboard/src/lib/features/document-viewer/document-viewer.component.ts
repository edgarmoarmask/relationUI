import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Inject, ElementRef, OnDestroy } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Annotator } from 'poplar-annotation';

import { IMentions } from '@eagleye/shared/models';

import {
  createAnnotatorConnectionCategories,
  createAnnotatorConnections,
  createAnnotatorLabelCategories,
  createAnnotatorLabels
} from "@dashboard/features/document-viewer/helpers";

@Component({
  selector: 'document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewerComponent implements OnInit, OnDestroy {

  @ViewChild('viewer', { read: ElementRef, static: true }) viewArea: ElementRef;

  annotator: Annotator;

  constructor(
    public dialogRef: MatDialogRef<DocumentViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string, mentions: IMentions }) {

  }

  ngOnInit() {

    this.setAnnotator();
  }

  ngOnDestroy() {

    this.annotator?.remove();
  }

  private setAnnotator(): void {

    const annotationData = {
      content: this.data.text,
      labelCategories: createAnnotatorLabelCategories(this.data.mentions.entities),
      labels: createAnnotatorLabels(this.data.mentions.relations),
      connectionCategories: createAnnotatorConnectionCategories(this.data.mentions.events),
      connections: createAnnotatorConnections(this.data.mentions.events)
    };

    this.annotator = new Annotator(
      annotationData,
      this.viewArea.nativeElement,
      {
        contentEditable: false
      }
    );
  }
}
