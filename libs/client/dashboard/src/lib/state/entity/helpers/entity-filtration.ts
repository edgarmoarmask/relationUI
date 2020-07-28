import {AkitaFilter} from "akita-filters-plugin";

import {IEntity} from "@eagleye/shared/models";

import {ChosenEntityState} from "@dashboard/state/entity/entity.store";
import {IChosenEntity} from "@dashboard/models/entity.model";

import {DATE_FILTER_NAME, PROPERTY_FILTER_NAME} from "@dashboard/state/entity/entity-filter";

export function getFilteredEntities(entities: IEntity[], filters: AkitaFilter<ChosenEntityState, IChosenEntity>[]): IEntity[] {

  return entities
    .filter(entity => {

      let isAvailable: boolean = true;

      for (let filter of filters) {
        if (filter.name === DATE_FILTER_NAME) {

          isAvailable = filter.value.includes(entity.id);
        } else if (filter.name === PROPERTY_FILTER_NAME) {
          const {propName, propvalue} = filter.value.split(':');

          isAvailable = entity.properties.every(
            prop => prop.name === propName && prop.value === propvalue
          );
        }

        if (!isAvailable)
          break;
      }

      return isAvailable;
    });
}
