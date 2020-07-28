import {guid} from "@datorama/akita";

import {IEntityFolder} from "@dashboard/models/folder.model";

export function createEntityFolder(params: Partial<IEntityFolder>): IEntityFolder {
  return {
    id: guid(),
    ...params
  } as IEntityFolder;
}
