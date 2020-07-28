import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IChosenEntity} from "@dashboard/models/entity.model";


export function getEntityDocuments$(entity$: Observable<IChosenEntity>): Observable<Array<{id: string,name: string}>> {

  return entity$
    .pipe(
      map(entity => entity?.documents)
    );
}
