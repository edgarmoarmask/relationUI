import {Component, OnInit, ChangeDetectionStrategy, NgZone, ElementRef} from '@angular/core';

import {zip} from "rxjs";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {ChosenEntityQuery} from "@dashboard/state/entity/entity.query";
import {EventQuery} from "@dashboard/state/event/event.query";
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";
import {IEvent} from "@eagleye/shared/models";

import {BaseMap} from "@dashboard/features/map/containers/map-container/base";


@UntilDestroy()
@Component({
  selector: 'map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent extends BaseMap implements OnInit {

  constructor(
    private ngZone: NgZone,
    private element: ElementRef,
    private entityQuery: ChosenEntityQuery,
    private entityFilter: ChosenEntityFilter,
    private eventQuery: EventQuery) {

    super(element.nativeElement);
  }

  ngOnInit() {

    this.initEntities();
  }

  // Private methods
  private initEntities() {

    zip(
      this.entityQuery.onEntitiesInitialized$(true),
      this.eventQuery.onEventsInitialized$(),
      this.entityFilter.onFilteredEntitiesInitialized$(true)
    )
      .pipe(untilDestroyed(this))
      .subscribe(async([allEntities, events, filteredEntities]) => {

        this.initMarkers(allEntities);

        await this.initEvents(events);

        this.filterMarkers(filteredEntities);
      })

    this.entityFilter.onEntitiesFiltered$()
      .pipe(untilDestroyed(this))
      .subscribe(entities => {

        this.filterMarkers(entities);
      });
  }

  private initEvents(events: IEvent[]) {

    return new Promise((resolve, reject) => {

      this.ngZone.runOutsideAngular(() => {

        const intervalId = setInterval(() => {

          if (this.map) {

            clearInterval(intervalId);

            this.initLines(events);

            resolve();
          }
        })
      })
    });
  }
}
