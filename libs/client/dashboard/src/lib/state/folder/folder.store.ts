import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';

import {IEntityFolder} from '../../models/folder.model';

export interface FolderState extends EntityState<IEntityFolder> {}

const initialState = {
  active: null
};

@Injectable({providedIn: 'any'})
@StoreConfig({name: 'folder'})
export class FolderStore extends EntityStore<FolderState, IEntityFolder> {

  constructor() {
    super(initialState);
  }
}

