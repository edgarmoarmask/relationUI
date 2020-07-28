import {Injectable} from "@angular/core";

import {AkitaFilter, AkitaFiltersPlugin, AkitaFiltersStore} from "akita-filters-plugin";

import {Observable} from "rxjs";
import {filter, map, skip, take, withLatestFrom} from "rxjs/operators";

import {IChosenEntity} from "@dashboard/models/entity.model";
import {ChosenEntityState} from "@dashboard/state/entity/entity.store";
import {ChosenEntityQuery} from "@dashboard/state/entity/entity.query";


export const DATE_FILTER_NAME = 'date-filter';
export const PROPERTY_FILTER_NAME = 'prop-filter';


@Injectable()
export class ChosenEntityFilter extends AkitaFiltersPlugin<ChosenEntityState> {

  constructor(private entityQuery: ChosenEntityQuery) {

    super(entityQuery);
  }

  //Getters
  onFilteredEntitiesInitialized$(onlyGeo?: boolean): Observable<IChosenEntity[]> {

    return this.selectAllByFilters(
      {...(onlyGeo && {filterBy: entity => !!entity.geoLocation})}
    )
      .pipe(
        take(1),
        filter(entities => entities.length > 0)
      ) as Observable<IChosenEntity[]>;
  }

  onEntitiesFiltered$(): Observable<IChosenEntity[]> {

    return this.selectFilters()
      .pipe(
        skip(1),
        withLatestFrom(this.selectAllByFilters()),
        map(([filters, entities]) => entities)
      ) as Observable<IChosenEntity[]>;
  }

  //Setters
  setDateFilter(ids: string[]) {

    this.setFilter({
      id: DATE_FILTER_NAME,
      value: ids,
      name: DATE_FILTER_NAME,
      predicate: entity => ids.includes(entity.id)
    })
  }

  removeDateFilter() {

    this.removeFilter(DATE_FILTER_NAME);
  }

  setPropertyFilter(propName: string, propValue: string) {

    this.setFilter({
      id: `${propName}:${propValue}`,
      value: `${propName}:${propValue}`,
      name: PROPERTY_FILTER_NAME,
      predicate: entity => !entity.properties.some(
        prop => prop.name === propName && prop.value === propValue
      )
    })
  }

  removePropertyFilter(propName: string, propValue: string) {

    this.removeFilter(`${propName}:${propValue}`);
  }

  getActiveFilters$(): Observable<AkitaFilter<ChosenEntityState, IChosenEntity>[]> {

    return this.selectFilters();
  }
}
