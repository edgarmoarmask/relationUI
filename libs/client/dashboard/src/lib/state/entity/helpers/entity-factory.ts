import {IChosenEntity} from "@dashboard/models/entity.model";

export function createEntity(params: Partial<IChosenEntity>) {
  return {
    position: null,
    ...params
  } as IChosenEntity;
}
