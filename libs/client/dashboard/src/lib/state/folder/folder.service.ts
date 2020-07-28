import {Injectable} from '@angular/core';

import {FoldersApiService} from "@dashboard/api/folders-api.service";

import {IEntityFolder} from '@dashboard/models/folder.model';

import {createEntityFolder} from "./helpers/folder-factory";

import {FolderStore} from './folder.store';
import {Observable} from "rxjs";
import {filter, tap} from "rxjs/operators";

@Injectable({providedIn: 'any'})
export class FolderService {

  constructor(
    private folderApiService: FoldersApiService,
    private store: FolderStore) {
  }

  get(): Observable<string[]> {

    return this.folderApiService.getFolders()
      .pipe(
        filter(folders => !!folders?.length),
        tap(folders => {

          const storeFolders: IEntityFolder[] = folders.map(folder => createEntityFolder({name: folder}));

          this.store.set(storeFolders);
        })
      );
  }

  setWorkFolder(folder: IEntityFolder): Observable<any> {

    return this.folderApiService.setWorkFolder(folder.name)
      .pipe(
        tap(_ => {
          this.store.setActive(folder.id);
        })
      );
  }
}
