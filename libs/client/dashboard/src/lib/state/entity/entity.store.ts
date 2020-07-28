import {Injectable} from '@angular/core';

import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';

import {IChosenEntity} from "@dashboard/models/entity.model";

export interface ChosenEntityState extends EntityState<IChosenEntity> {
}

const initialState = {
  active: null
};

@Injectable()
@StoreConfig({name: 'chosen-entity'})
export class ChosenEntityStore extends EntityStore<ChosenEntityState, IChosenEntity> {

  constructor() {
    super(initialState);
  }
}

