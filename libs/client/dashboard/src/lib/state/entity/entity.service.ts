import {Injectable} from '@angular/core';

import {IChosenEntity} from "@dashboard/models/entity.model";

import {ChosenEntityStore} from './entity.store';

import {createEntity} from "@dashboard/state/entity/helpers/entity-factory";


@Injectable()
export class ChosenEntityService {

  constructor(
    private store: ChosenEntityStore) {
  }

  add(entity: IChosenEntity) {
    this.store.add(createEntity(entity));
  }

  addMultiple(entities: Partial<IChosenEntity>[]) {
    this.store.add(
      entities.map(entity => createEntity(entity))
    );
  }

  setActive(id: string) {

    this.store.setActive(id);
  }

  removeActive(id: string) {

    this.store.removeActive(id);
  }

  updatePosition(id: string, options: Partial<IChosenEntity>) {
    this.store.update(id, {
      ...options
    });
  }

  removeAll() {
    this.store.remove();
  }
}
