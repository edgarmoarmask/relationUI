import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {IEntityProfile} from "@eagleye/shared/models";

@Component({
  selector: 'entity-profile',
  templateUrl: './entity-profile.component.html',
  styleUrls: ['./entity-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityProfileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EntityProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEntityProfile) {

  }

  ngOnInit(): void {
  }

}
