import {Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";

import {IEntity} from '@eagleye/shared/models';

import {FoundEntitiesService} from "@dashboard/state/entity/found-entities";

@Component({
  selector: 'entities-list',
  templateUrl: './entities-list.component.html',
  styleUrls: ['./entities-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesListComponent implements OnInit {

  entities$: Observable<IEntity[]>;

  constructor(private foundEntitiesService: FoundEntitiesService) {
  }

  ngOnInit() {

    this.initEntities();
  }

  searchChanged(value: string): void {

    this.foundEntitiesService.findEntitiesByValue(value);
  }

  trackByEntity(index: number, entity: IEntity): string {

    return entity.id;
  }

  onEntityDragStart(event: DragEvent, item: IEntity): void {

    event.dataTransfer.setData("text", JSON.stringify(item));
  }

  private initEntities(): void {

    this.entities$ = this.foundEntitiesService.getFoundEntities$();
  }
}
