import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

import {IEntity, IRelations, IMentions, IEntityProfile, IEntityDateGroup} from '@eagleye/shared/models';

@Injectable()
export class EntityApiService {

  private readonly PREFIX: string = '/api/entities';

  constructor(private http: HttpClient) {
  }

  getAllEntities(): Observable<IEntity[]> {

    return this.http.get<IEntity[]>(`${this.PREFIX}`);
  }

  findEntitiesByValue(value: string): Observable<IEntity[]> {

    return this.http.get<IEntity[]>(`${this.PREFIX}/${value}`);
  }

  getEntityRelations(id: string): Observable<IRelations> {

    return this.http.get<IRelations>(`${this.PREFIX}/relations/${id}`);
  }

  getEntityProfile(id: string): Observable<IEntityProfile> {

    return this.http.get<IEntityProfile>(`${this.PREFIX}/profile/${id}`);
  }

  getGroupedEntitiesByDates(): Observable<IEntityDateGroup[]> {

    return this.http.get<IEntityDateGroup[]>(`${this.PREFIX}/groups`);
  }

  getMentionsByDocument(id: string): Observable<IMentions> {

    return this.http.get<IMentions>(`${this.PREFIX}/mentions/${id}`);
  }
}
