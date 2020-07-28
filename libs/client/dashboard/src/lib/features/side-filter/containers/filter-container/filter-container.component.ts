import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

import {IEntityDateGroup} from "@eagleye/shared/models";
import {EntityMentionsService} from "@dashboard/state/mentions/entity-mentions.service";
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";
import {Observable} from "rxjs";
import {MatSelectionListChange} from "@angular/material/list";


@Component({
  selector: 'filter-container',
  templateUrl: './filter-container.component.html',
  styleUrls: ['./filter-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterContainerComponent implements OnInit {

  dateGroups$: Observable<IEntityDateGroup[]>;

  constructor(
    private entityMentionsService: EntityMentionsService,
    private entityFilter: ChosenEntityFilter) {
  }

  ngOnInit(): void {

    this.initFilter();
  }

  dateSelectionChanged(event: MatSelectionListChange, dateGroups: IEntityDateGroup[]): void {

    if (event.source._value.length > 0) {

      const ids: string[] = this.getEntitiesIds(event.source._value, dateGroups);

      if (ids.length > 0)
        this.entityFilter.setDateFilter(ids);
    } else {

      this.entityFilter.removeDateFilter();
    }
  }

  private initFilter(): void {

    this.dateGroups$ = this.entityMentionsService.getGroupedEntitiesByDates$();
  }

  private getEntitiesIds(selectedDates: string[], dateGroups: IEntityDateGroup[]): string[] {

    let ids: string[] = [];

    dateGroups
      .filter(group => selectedDates.includes(group.date))
      .forEach(group => {

        ids = [...ids, ...group.entities];
    });

    if (ids.length > 0)
      ids = [...new Set(ids)];

    return ids;
  }
}
