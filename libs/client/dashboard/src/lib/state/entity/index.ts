import {Provider} from "@angular/core";

import {ChosenEntityStore} from './entity.store';
import {ChosenEntityQuery} from './entity.query';
import {ChosenEntityService} from './entity.service';
import {ChosenEntityFilter} from './entity-filter';

import {EntityGroupsService} from './entity-groups';

import {FoundEntitiesService} from "./found-entities";

import {EntityProfileService} from "./entity-profile";

export const ENTITY_STATE_SERVICES: Provider[] = [
  ChosenEntityStore, ChosenEntityQuery, ChosenEntityService, ChosenEntityFilter,
  EntityGroupsService,
  FoundEntitiesService,
  EntityProfileService
];
