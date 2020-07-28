import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";

import {
  addCellClickListener,
  addCellsDragStopListener,
  createPopupMenu,
  initCells,
  addCells,
  arrangeCells,
  initGraph,
  initGraphPopupMenu,
  clearCells,
  toggleCells,
  createEdges,
  startEdgesAnimation,
  stopEdgesAnimation,
  addEdgesCreationListener,
} from "@dashboard/features/graph/helpers";

import {IDraggedCell} from "@dashboard/features/graph/models/dragged-cell.model";
import {IGraphPopupItem} from "@dashboard/features/graph/models/graph-popup-item.model";
import {IChosenEntity} from "@dashboard/models/entity.model";
import {IEvent} from "@eagleye/shared/models";

export abstract class BaseMxGraph {

  private graph: mxgraph.mxGraph;

  constructor() {
  }

  init(element: HTMLElement): void {

    this.initGraph(element);
    this.initGraphListeners();
    this.initGraphPopupMenu();
  }

  destroyGraph(): void {

    this.graph.destroy();
  }


  initCells(cells: IChosenEntity[]): void {

    initCells(this.graph, cells);
  }

  addCells(cells: IChosenEntity[]): void {

    const droppedCells: IChosenEntity[] = cells.filter(cell => !!cell.position);
    const relatedCells: IChosenEntity[] = cells.filter(cell => !cell.position);

    if (droppedCells.length > 0)
      initCells(this.graph, droppedCells);

    if (relatedCells.length > 0)
      addCells(this.graph, relatedCells, (draggedCell: IDraggedCell) => {

        this.changePosition(draggedCell);
      });
  }

  filterCells(cells: IChosenEntity[]): void {

    toggleCells(this.graph, cells.map(cell => cell.id));
  }

  arrangeCells(): void {

    arrangeCells(this.graph, (draggedCell: IDraggedCell) => {

      this.changePosition(draggedCell);
    })
  }

  startEdgesAnimation(): void {

    startEdgesAnimation(this.graph);
  }

  stopEdgesAnimation(): void {

    stopEdgesAnimation(this.graph);
  }

  clearCells(): void {

    clearCells(this.graph);
  }

  initEdges(edges: IEvent[]): void {

    createEdges(this.graph, edges);
  }

  addEdges(edges: IEvent[]): void {

    createEdges(this.graph, edges);
  }

  zoomGraph(event: WheelEvent): void {

    if (event.deltaY < 0)
      this.zoomIn();
    else
      this.zoomOut();
  }

  zoomIn(): void {

    this.graph.zoomIn();
  }

  zoomOut(): void {

    this.graph.zoomOut();
  }

  private initGraph(element: HTMLElement): void {

    this.graph = initGraph(element);
  }

  private initGraphListeners(): void {

    addCellClickListener(this.graph, (cellId: string, isCellClicked) => {

      if (isCellClicked)
        this.selectEntity(cellId);
      else
        this.removeSelectedEntity(cellId);
    });

    addCellsDragStopListener(this.graph, (draggedCell: IDraggedCell) => {

      this.changePosition(draggedCell);
    })

    addEdgesCreationListener(this.graph, () => {

      this.edgeAdded();
    })
  }

  private initGraphPopupMenu(): void {

    this.graph.popupMenuHandler = initGraphPopupMenu(this.graph, (menu: mxgraph.mxPopupMenu, cell: mxgraph.mxCell) => {

      this.configurePopupItems(menu, cell);
    });
  }

  private configurePopupItems(menu: mxgraph.mxPopupMenu, cell: mxgraph.mxCell) {

    let cellPopupItems: IGraphPopupItem[] = [
      {
        name: 'Find relations',
        callback: (cellId: string) => this.findEntityRelations(cellId)
      },
      {
        name: 'View profile',
        callback: (cellId: string) => this.viewEntityProfile(cellId)
      },
    ];

    createPopupMenu(menu, cell, cellPopupItems);
  };

  //Protected methods
  protected abstract changePosition(draggedCell: IDraggedCell): void;

  protected abstract selectEntity(cellId: string): void;
  protected abstract removeSelectedEntity(cellId: string): void;

  protected abstract findEntityRelations(cellId: string): void;

  protected abstract edgeAdded(): void;

  protected abstract viewEntityProfile(cellId: string): void;
}
