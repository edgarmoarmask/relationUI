import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";
import {IDraggedCell} from "@dashboard/features/graph/models/dragged-cell.model";

export function addCellClickListener(graph: mxgraph.mxGraph, callback: (id: string, isCellClicked: boolean) => void): void {

  graph.addListener(mx.mxEvent.CLICK, (sender, evt) => {

    const isCellClicked: boolean = !!evt.getProperty('cell');
    const selectedCellId: string = graph.getSelectionCell()?.id;

    if (selectedCellId)
      callback(selectedCellId, isCellClicked);
  });
}

export function addCellsDragStopListener(graph: mxgraph.mxGraph, callback: (draggedCell: IDraggedCell) => void): void {

  graph.addListener(mx.mxEvent.CELLS_MOVED, (sender, evt: { properties: { cells: mxgraph.mxCell[] } }) => {

    evt.properties.cells.forEach((cell: mxgraph.mxCell) => {

      const cellGeometry: mxgraph.mxGeometry = graph.getCellGeometry(cell);

      callback({
        id: cell.id,
        position: {
          x: cellGeometry.x,
          y: cellGeometry.y
        }
      })
    })
  });
}

export function addEdgesCreationListener(graph: mxgraph.mxGraph, callback: () => void): void {

  graph.addListener(mx.mxEvent.CELLS_ADDED, (sender, evt: { properties: { cells: mxgraph.mxCell[] } }) => {

    evt.properties.cells.some((cell: mxgraph.mxCell) => {

      if (graph.getModel().isEdge(cell)) {

        callback();

        return;
      }
    })
  });
}
