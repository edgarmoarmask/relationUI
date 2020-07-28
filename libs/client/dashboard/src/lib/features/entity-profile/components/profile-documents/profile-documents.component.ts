import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

import {IDocumentLabel} from "@eagleye/shared/models";

@Component({
  selector: 'profile-documents',
  templateUrl: './profile-documents.component.html',
  styleUrls: ['./profile-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDocumentsComponent implements OnInit {

  @Input() documents: IDocumentLabel[];

  headers: Array<keyof IDocumentLabel>;

  constructor() {}

  ngOnInit() {

    this.initHeaders();
  }

  private initHeaders(): void {

    this.headers = ['id', 'name', 'date'];
  }
}
