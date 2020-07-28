import {Injectable} from "@angular/core";

import {filter, shareReplay, tap} from "rxjs/operators";

import {Observable} from "rxjs/internal/Observable";

import {IEntityDateGroup} from "@eagleye/shared/models";

import {EntityApiService} from "@dashboard/api/entity-api.service";

@Injectable()
export class EntityMentionsService {

  private entitiesGroups$: Observable<IEntityDateGroup[]>;

  private originalDateGroups: IEntityDateGroup[] = [];

  constructor(private entityApiService: EntityApiService) {
  }

  getGroupedEntitiesByDates$(): Observable<IEntityDateGroup[]> {

    if (!this.entitiesGroups$)
      this.entitiesGroups$ = this.entityApiService.getGroupedEntitiesByDates()
        .pipe(
          filter(groupes => groupes?.length > 0),
          tap(groupes => this.originalDateGroups = groupes),
          shareReplay(1)
        )

    return this.entitiesGroups$;
  }

  getOriginalDateGroups(): IEntityDateGroup[] {

    return JSON.parse(JSON.stringify(this.originalDateGroups));
  }
}
