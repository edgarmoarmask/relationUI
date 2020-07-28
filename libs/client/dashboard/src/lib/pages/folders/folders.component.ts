import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";

import {Observable} from 'rxjs/internal/Observable';

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {FolderQuery} from '@dashboard/state/folder/folder.query';
import {FolderService} from "@dashboard/state/folder/folder.service";

import {IEntityFolder} from "@dashboard/models/folder.model";

@UntilDestroy()
@Component({
  selector: 'folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersComponent implements OnInit {

  folders$: Observable<IEntityFolder[]>;
  foldersLoading$: Observable<boolean> = this.folderQuery.isLoading$;

  folderContentLoading: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private folderQuery: FolderQuery,
    private folderService: FolderService,
  ) {
  }

  ngOnInit() {

    this.initFolders();
  }

  setWorkFolder(folder: IEntityFolder): void {

    this.folderContentLoading = true;

    this.folderService.setWorkFolder(folder)
      .pipe(untilDestroyed(this))
      .subscribe(_ => {

      this.folderContentLoading = false;

      this.router.navigate([folder.name]);
    }, (error) => {

      this.folderContentLoading = false;
      this.cdr.markForCheck();
    });
  }

  private initFolders(): void {

    this.folders$ = this.folderQuery.folders$;

    this.folderService.get()
      .pipe(
        untilDestroyed(this)
      )
      .subscribe();
  }
}
