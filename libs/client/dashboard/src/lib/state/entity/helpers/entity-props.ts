import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {IChosenEntity} from "@dashboard/models/entity.model";
import {IDetailsGroup} from "@dashboard/features/entity-details/models/details.model";
import {IEntityProperty} from "@eagleye/shared/models";

export function configureEntitiesProps$(entities$: Observable<IChosenEntity[]>): Observable<IDetailsGroup[]> {

  return entities$.pipe(
    map(entities => entities.map(entity => entity.properties)),
    map(entities => entities.flat(1)),
    map(props => Array.from(new Set(props.map(prop => JSON.stringify(prop)))).map(prop => JSON.parse(prop))),
    map(props => {

      return props
        .map(prop => prop.name)
        .map((groupName: string) => {

          return {
            name: groupName,
            items: props
              .filter((prop: IEntityProperty) => prop.name === groupName)
              .map(prop => ({value: prop.value, selected: prop.selected}))
          } as IDetailsGroup
        })
    })
  );
}
