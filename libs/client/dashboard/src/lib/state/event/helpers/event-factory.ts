import {guid} from "@datorama/akita";

import {IEvent} from "@eagleye/shared/models";

export function createEvent(params: Partial<IEvent>) {
  return {
    ...params,
    id: guid(),
  } as IEvent;
}
