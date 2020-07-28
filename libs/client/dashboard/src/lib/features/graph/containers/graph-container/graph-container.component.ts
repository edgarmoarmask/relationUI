import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {MatDialog} from "@angular/material/dialog";

import {tap} from "rxjs/operators";
import {zip} from "rxjs";

import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

import {IEntity, IEntityProfile} from '@eagleye/shared/models';

import {BaseMxGraph} from "@dashboard/features/graph/containers/graph-container/base";
import {IDraggedCell} from "@dashboard/features/graph/models/dragged-cell.model";
import {TAnimationState} from "@dashboard/features/graph/models/animation-state.model";

import {ChosenEntityQuery} from "@dashboard/state/entity/entity.query";
import {ChosenEntityService} from "@dashboard/state/entity/entity.service";
import {ChosenEntityFilter} from "@dashboard/state/entity/entity-filter";
import {EntityProfileService} from "@dashboard/state/entity/entity-profile";
import {RelationsService} from "@dashboard/state/relations/relations.service";
import {EventQuery} from "@dashboard/state/event/event.query";
import {EventService} from "@dashboard/state/event/event.service";

@UntilDestroy()
@Component({
  selector: 'eagleye-graph-container',
  templateUrl: './graph-container.component.html',
  styleUrls: ['./graph-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphContainerComponent extends BaseMxGraph implements OnInit, OnDestroy {

  @ViewChild('mxGraph', {read: ElementRef, static: true}) graphElement: ElementRef;

  animationAvailable: boolean = false;

  constructor(private cdr: ChangeDetectorRef,
              private dialog: MatDialog,
              private entityQuery: ChosenEntityQuery,
              private entityService: ChosenEntityService,
              private entityFilter: ChosenEntityFilter,
              private entityProfileService: EntityProfileService,
              private relationsService: RelationsService,
              private eventQuery: EventQuery,
              private eventService: EventService) {

    super();
  }

  ngOnInit() {

    this.init(this.graphElement.nativeElement);

    this.initEntities();
    this.initLinks();
  }

  ngOnDestroy() {

    this.destroyGraph();
  }

  // Drag & drop
  allowEntityDrop(event: DragEvent): void {

    event.preventDefault();
  }

  onEntityDrop(event: DragEvent): void {

    event.preventDefault();

    const entity: IEntity = JSON.parse(event.dataTransfer.getData('text'));

    if (entity)
      this.entityService.add({
        ...entity,
        ...{
          position: {
            x: (<any>event).layerX,
            y: (<any>event).layerY
          }
        }
      });
  }

  //Toolbar
  arrangeEntities(): void {

    this.arrangeCells();
  }

  animateEvents(state: TAnimationState): void {

    if (state === 'start')
      this.startEdgesAnimation();
    else
      this.stopEdgesAnimation();
  }

  clearGraph(): void {

    this.entityService.removeAll();
    this.eventService.removeAll();

    this.clearCells();

    this.animationAvailable = false;
  }

  zoomInGraph(): void {

    this.zoomIn();
  }

  zoomOutGraph(): void {

    this.zoomOut();
  }

  //Abstract methods implementation
  changePosition(draggedCell: IDraggedCell): void {

    this.entityService.updatePosition(draggedCell.id, {position: draggedCell.position});
  }

  selectEntity(cellId: string): void {

    this.entityService.setActive(cellId);
  }

  removeSelectedEntity(cellId: string): void {

    this.entityService.removeActive(cellId);
  }

  findEntityRelations(cellId: string): void {

    this.relationsService.getRelations(cellId);
  }

  edgeAdded(): void {

    this.switchAnimationTools(true);
  }

  async viewEntityProfile(id: string) {

    const {EntityProfileComponent, EntityProfileModule} = await import('@dashboard/features/entity-profile');

    this.entityProfileService.getEntityProfileById$(id)
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(entityProfile => {

      if (entityProfile)
        this.dialog.open<any, IEntityProfile, void>(EntityProfileComponent, {
          data: entityProfile,
          width: '100%',
          maxWidth: '90vw',
          height: '100%'
        });
    });
  }

  // Private methods
  private initEntities(): void {

    zip(
      this.entityQuery.onEntitiesInitialized$(),
      this.entityFilter.onFilteredEntitiesInitialized$()
    )
      .pipe(untilDestroyed(this))
      .subscribe(([allEntities, filteredEntities]) => {

        this.initCells(allEntities);
        this.filterCells(filteredEntities);
      })

    this.entityQuery.onEntitiesAdded$()
      .pipe(untilDestroyed(this))
      .subscribe(entities => {

        this.addCells(entities);
      });

    this.entityFilter.onEntitiesFiltered$()
      .pipe(untilDestroyed(this))
      .subscribe(entities => {

        this.filterCells(entities);
      });
  }

  private initLinks(): void {

    this.eventQuery.onEventsInitialized$()
      .pipe(
        tap(links => this.switchAnimationTools(links?.length > 0)),
        untilDestroyed(this)
      )
      .subscribe(links => {

        this.initEdges(links);
      });

    this.eventQuery.onEventsAdded$()
      .pipe(
        tap(links => this.switchAnimationTools(links?.length > 0)),
        untilDestroyed(this)
      )
      .subscribe(links => {

        this.addEdges(links);
      });
  }

  private switchAnimationTools(iAvailable: boolean): void {

    this.animationAvailable = iAvailable;
    this.cdr.markForCheck();
  }
}
