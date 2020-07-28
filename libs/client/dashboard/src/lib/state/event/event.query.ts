import {Injectable} from '@angular/core';

import {Observable} from "rxjs";
import {filter, map, take} from "rxjs/operators";

import {EntityActions, QueryEntity} from '@datorama/akita';

import {IEvent} from "@eagleye/shared/models";

import {EventStore, EventState} from './event.store';

@Injectable()
export class EventQuery extends QueryEntity<EventState, IEvent> {

  events$: Observable<IEvent[]> = this.selectAll();

  constructor(protected store: EventStore) {
    super(store);
  }

  onEventsInitialized$(): Observable<IEvent[]> {

    return this.selectAll()
      .pipe(
        take(1),
        filter(events => events.length > 0)
      );
  }

  onEventsAdded$(): Observable<IEvent[]> {

    return this.selectEntityAction(EntityActions.Add)
      .pipe(
        map(ids => ids.map(id => this.getEntity(id)))
      );
  }
}
