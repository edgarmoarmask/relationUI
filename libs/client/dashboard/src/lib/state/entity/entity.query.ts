import {Injectable} from '@angular/core';

import {Observable} from "rxjs";
import {filter, map, take} from "rxjs/operators";

import {EntityActions, QueryEntity} from '@datorama/akita';

import {IEntityDocument} from "@eagleye/shared/models";

import {IChosenEntity} from "@dashboard/models/entity.model";

import {IDetailsGroup} from "@dashboard/features/entity-details/models/details.model";

import {configureEntitiesProps$} from './helpers/entity-props';
import {getEntityDocuments$} from "@dashboard/state/entity/helpers/entity-documents";

import {ChosenEntityState, ChosenEntityStore} from './entity.store';

@Injectable()
export class ChosenEntityQuery extends QueryEntity<ChosenEntityState, IChosenEntity> {

  entities$: Observable<IChosenEntity[]> = this.selectAll();

  selectedEntity$: Observable<IChosenEntity> = this.selectActive() as Observable<IChosenEntity>;
  selectedEntityDocuments$: Observable<IEntityDocument[]> = getEntityDocuments$(this.selectedEntity$);

  entitiesProps$: Observable<IDetailsGroup[]> = configureEntitiesProps$(this.entities$);

  constructor(protected store: ChosenEntityStore) {
    super(store);
  }

  onEntitiesInitialized$(onlyGeo?: boolean): Observable<IChosenEntity[]> {

    return this.selectAll(
      {...(onlyGeo && {filterBy: entity => !!entity.geoLocation})}
      )
      .pipe(
        take(1),
        filter(entities => entities.length > 0)
      );
  }

  onEntitiesAdded$(): Observable<IChosenEntity[]> {

    return this.selectEntityAction(EntityActions.Add)
      .pipe(
        map(ids => ids.map(id => this.getEntity(id)))
      );
  }
}
