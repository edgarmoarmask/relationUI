import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Observable} from "rxjs/internal/Observable";

import {IDetailsGroup} from "@dashboard/features/entity-details/models/details.model";

import {ChosenEntityQuery} from '@dashboard/state/entity/entity.query';
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";

@Component({
  selector: 'entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityDetailsComponent implements OnInit {

  detailsGroups$: Observable<IDetailsGroup[]>;

  constructor(
    private entityQuery: ChosenEntityQuery,
    private entityFilter: ChosenEntityFilter) {
  }

  ngOnInit() {

    this.initDetails();
  }

  propertyChanged(isSelected: boolean, groupName: string, propValue: string): void {

    if (isSelected)
      this.entityFilter.setPropertyFilter(groupName, propValue);
    else
      this.entityFilter.removePropertyFilter(groupName, propValue);
  }

  private initDetails(): void {

    this.detailsGroups$ = this.entityQuery.entitiesProps$;
  }
}
