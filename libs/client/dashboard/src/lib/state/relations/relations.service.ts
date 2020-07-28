import {Injectable} from "@angular/core";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {EntityApiService} from "@dashboard/api/entity-api.service";
import {ChosenEntityService} from "@dashboard/state/entity/entity.service";
import {EventService} from "@dashboard/state/event/event.service";

@UntilDestroy()
@Injectable()
export class RelationsService {

  constructor(
    private entityApiService: EntityApiService,
    private chosenEntityService: ChosenEntityService,
    private eventService: EventService) {
  }

  getRelations(id: string) {

    this.entityApiService.getEntityRelations(id)
      .pipe(untilDestroyed(this))
      .subscribe(relations => {

        this.chosenEntityService.addMultiple(relations.entities);
        this.eventService.addMultiple(relations.events);
      })
  }
}
