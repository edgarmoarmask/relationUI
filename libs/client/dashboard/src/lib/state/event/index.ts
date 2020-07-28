import {Provider} from "@angular/core";

import {EventStore} from './event.store';
import {EventQuery} from './event.query';
import {EventService} from './event.service';

export const EVENT_STATE_SERVICES: Provider[] = [
  EventStore, EventQuery, EventService
];
