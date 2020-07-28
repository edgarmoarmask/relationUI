import {Injectable} from "@angular/core";

import {Observable} from "rxjs";

import {IEntityProfile} from "@eagleye/shared/models";

import {EntityApiService} from "@dashboard/api/entity-api.service";

@Injectable()
export class EntityProfileService {

  constructor(private entityApiService: EntityApiService) {
  }

  getEntityProfileById$(id: string): Observable<IEntityProfile> {

    return this.entityApiService.getEntityProfile(id);
  }
}
