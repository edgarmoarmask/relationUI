import {Injectable} from '@angular/core';

import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';

import {IEvent} from "@eagleye/shared/models";

export interface EventState extends EntityState<IEvent> {
}

@Injectable()
@StoreConfig({name: 'event'})
export class EventStore extends EntityStore<EventState, IEvent> {

  constructor() {
    super();
  }
}

