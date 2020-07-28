import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { IEntity } from '@eagleye/shared/models';


@Component({
  selector: 'entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit {

  @Input() entity: IEntity;

  constructor() { }

  ngOnInit() {
  }

}
