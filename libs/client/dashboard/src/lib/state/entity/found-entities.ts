import {Injectable} from "@angular/core";

import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {IEntity} from "@eagleye/shared/models";

import {EntityApiService} from "@dashboard/api/entity-api.service";
import {ChosenEntityFilter, DATE_FILTER_NAME, PROPERTY_FILTER_NAME} from "@dashboard/state/entity/entity-filter";

import {getFilteredEntities} from "@dashboard/state/entity/helpers/entity-filtration";

@UntilDestroy()
@Injectable()
export class FoundEntitiesService {
  private foundEntities$ = new BehaviorSubject<IEntity[]>([]);

  constructor(
    private entityApiService: EntityApiService,
    private entityFilter: ChosenEntityFilter,
  ) {
  }

  findEntitiesByValue(value: string): void {

    if (value) {
      this.entityApiService.findEntitiesByValue(value)
        .pipe(untilDestroyed(this))
        .subscribe(entities => {

          this.foundEntities$.next(entities);
        });
    } else {
      this.foundEntities$.next([]);
    }
  }

  getFoundEntities$(): Observable<IEntity[]> {

    return combineLatest([this.entityFilter.getActiveFilters$(), this.foundEntities$])
      .pipe(
        map(([filters, entities]) => {
          if (filters.length === 0)
            return entities;

          const filteredEntities: IEntity[] = getFilteredEntities(entities, filters);

          return filteredEntities;
        }),
      );
  }
}
