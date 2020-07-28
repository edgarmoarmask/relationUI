import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";
import {IGraphPopupItem} from "@dashboard/features/graph/models/graph-popup-item.model";

export function initGraphPopupMenu(graph: mxgraph.mxGraph, callback: (menu: mxgraph.mxPopupMenu, cell: mxgraph.mxCell) => void): mxgraph.mxPopupMenuHandler {

  const graphPopupMenu = new mx.mxPopupMenuHandler(graph, (menu: mxgraph.mxPopupMenu, cell: mxgraph.mxCell, event: MouseEvent) => {

    if (cell)
      callback(menu, cell);

    return false;
  });

  return graphPopupMenu;
}

export function createPopupMenu(menu: mxgraph.mxPopupMenu, cell: mxgraph.mxCell, cellPopupItems: IGraphPopupItem[]): void {

  if (!cell)
    return;

  cellPopupItems.forEach(item => {
    // @ts-ignore
    menu.addItem(item.name, null, () => {

      item.callback(cell.id);
    });
  });
}
