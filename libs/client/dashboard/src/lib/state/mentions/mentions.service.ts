import {Injectable} from "@angular/core";

import {Observable} from "rxjs/internal/Observable";

import {IMentions} from "@eagleye/shared/models";

import {EntityApiService} from "@dashboard/api/entity-api.service";

@Injectable()
export class MentionsService {

  constructor(private entityApiService: EntityApiService) {
  }

  getMentionsByDocument$(documentId: string): Observable<IMentions> {

    return this.entityApiService.getMentionsByDocument(documentId);
  }
}
