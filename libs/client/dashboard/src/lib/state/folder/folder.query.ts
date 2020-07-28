import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {QueryEntity} from '@datorama/akita';

import {FolderStore, FolderState} from './folder.store';
import {IEntityFolder} from '../../models/folder.model';

@Injectable({providedIn: 'any'})
export class FolderQuery extends QueryEntity<FolderState, IEntityFolder> {

  folders$: Observable<IEntityFolder[]> = this.selectAll();
  isLoading$: Observable<boolean> = this.selectLoading();

  constructor(protected store: FolderStore) {
    super(store);
  }

  isSelectedFolderDefined(): boolean {

    return this.hasActive();
  }
}
