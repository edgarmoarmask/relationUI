import {Injectable} from '@angular/core';

import {IEvent} from "@eagleye/shared/models";

import {EventStore} from './event.store';
import {createEvent} from "@dashboard/state/event/helpers/event-factory";

@Injectable()
export class EventService {

  constructor(private eventStore: EventStore) {
  }

  add(event: IEvent) {
    this.eventStore.add(createEvent(event));
  }

  addMultiple(events: IEvent[]) {
    this.eventStore.add(
      events.map(event => createEvent(event))
    );
  }

  removeAll() {
    this.eventStore.remove();
  }
}
