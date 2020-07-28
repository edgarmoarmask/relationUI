import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {Observable} from "rxjs";

import {MatSelectionListChange} from "@angular/material/list";

import {IEntityDateGroup} from "@eagleye/shared/models";

import {EntityGroupsService} from "@dashboard/state/entity/entity-groups";
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";

import {getGroupEntitiesIds} from "@dashboard/features/filter/mobile/helpers/date-groups";
import {map} from "rxjs/operators";


@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainerComponent implements OnInit {

  dateGroups$: Observable<IEntityDateGroup[]>;

  constructor(
    private entityGroupsService: EntityGroupsService,
    private entityFilter: ChosenEntityFilter) {
  }

  ngOnInit(): void {

    this.initFilter();
  }

  dateSelectionChanged(event: MatSelectionListChange, dateGroups: IEntityDateGroup[]): void {

    if (event.source._value.length > 0) {

      const ids: string[] = getGroupEntitiesIds(event.source._value, dateGroups);

      if (ids.length > 0)
        this.entityFilter.setDateFilter(ids);
    } else {

      this.entityFilter.removeDateFilter();
    }
  }

  private initFilter(): void {

    this.dateGroups$ = this.entityGroupsService.getGroupedEntitiesByDates$()
      .pipe(
        map(
          groupes => groupes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        )
      );
  }
}
