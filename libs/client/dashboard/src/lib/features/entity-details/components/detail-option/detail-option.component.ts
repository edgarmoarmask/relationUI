import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {IGroupItem} from "@dashboard/features/entity-details/models/details.model";

@Component({
  selector: 'detail-option',
  templateUrl: './detail-option.component.html',
  styleUrls: ['./detail-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailOptionComponent {

  @Input() option: IGroupItem;
  @Output() propertyChanged = new EventEmitter<boolean>();

  constructor() { }

  selectionChanged(checked: boolean): void {

    this.propertyChanged.emit(!checked);
  }
}
