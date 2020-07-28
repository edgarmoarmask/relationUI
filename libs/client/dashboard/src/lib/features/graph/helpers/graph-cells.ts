import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";

import {changeGraph} from "@dashboard/features/graph/helpers/graph-change";
import {IChosenEntity} from "@dashboard/models/entity.model";
import {IDraggedCell} from "@dashboard/features/graph/models/dragged-cell.model";

export function initCells(graph: mxgraph.mxGraph, cells: IChosenEntity[]): void {

  changeGraph(graph, (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    cells.forEach((cell: IChosenEntity) => {

      const {x = 0, y = 0} = cell.position;

      const newCell = addCell(graph, parent, cell, x, y);

      newCell;
    });
  })
}

export function addCells(graph: mxgraph.mxGraph, cells: IChosenEntity[],
                         callback: (draggedCell: IDraggedCell) => void): void {

  changeGraph(graph, (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    const ids: string[] = Object.keys(model.cells);

    const selectedCell: mxgraph.mxCell = graph.getSelectionCell();

    const geo: mxgraph.mxGeometry = graph.getCellGeometry(selectedCell);
    let v2;

    const cx = geo.x;
    const cy = geo.y;

    model.beginUpdate();
    try {

      cells.forEach((cell: IChosenEntity) => {

        if (!ids.includes(cell.id, 2)) {

          v2 = addCell(graph, parent, cell, cx, cy);

          graph.refresh(v2);
        }
      });

      let vertices = [];

      for (let key in graph.getModel().cells) {
        let tmp = model.getCell(key);

        if (!ids.includes(tmp.id) && tmp != selectedCell && model.isVertex(tmp)) {
          vertices.push(tmp);

          // Changes the initial location "in-place"
          // to get a nice animation effect from the
          // center to the radius of the circle
          let geo = model.getGeometry(tmp);

          if (geo) {
            geo.x = cx;
            geo.y = cy;
          }
        }
      }

      // Arranges the response in a circle
      const cellCount = vertices.length;
      const phi = 2 * Math.PI / cellCount;
      const r = Math.min(graph.container.clientWidth / 4, graph.container.clientHeight / 4);

      for (let i = 0; i < cellCount; i++) {
        let geo = model.getGeometry(vertices[i]);

        if (geo) {
          geo = geo.clone();
          geo.x += (r * Math.sin(i * phi)) * 1.8;
          geo.y += (r * Math.cos(i * phi)) * 1.8;

          callback({
            id: vertices[i].id,
            position: {
              x: geo.x,
              y: geo.y
            }
          });

          model.setGeometry(vertices[i], geo);
        }
      }
    } catch (e) {
      throw e;
    } finally {
      // New API for animating graph layout results asynchronously
      const morph = new mx.mxMorphing(graph, null, null, null);

      morph.addListener(mx.mxEvent.DONE, mx.mxUtils.bind(this, function () {
        model.endUpdate();

        graph.scrollCellToVisible(v2, null);
      }));

      morph.startAnimation();
    }
  });
}

export function toggleCells(graph: mxgraph.mxGraph, ids: string[]) {

  changeGraph(graph, (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    Object.values(model.cells).forEach((cell: mxgraph.mxCell) => {

      if (model.isVertex(cell)) {

        const showCell: boolean = ids.length > 0 && ids.includes(cell.id);

        graph.toggleCells(showCell, [cell], true);
      }
    })
  })
}

export function arrangeCells(graph: mxgraph.mxGraph, callback: (draggedCell: IDraggedCell) => void): void {

  changeGraph(graph, (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    const layout = new mx.mxFastOrganicLayout(graph);

    // Moves stuff wider apart than usual
    layout.forceConstant = 140;

    layout.execute(parent);

    graph.fit();

    Object.values(graph.getModel().cells).forEach((cell: mxgraph.mxCell) => {

      if (model.isVertex(cell))
        callback({
          id: cell.id,
          position: {
            x: cell.geometry.x,
            y: cell.geometry.y
          }
        });
    })
  })
}

export function clearCells(graph: mxgraph.mxGraph): void {

  changeGraph(graph, (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    graph.removeCells(graph.getChildCells(parent));
    graph.zoomActual();
  })
}

// helper functions
function addCell(graph: mxgraph.mxGraph, parent: mxgraph.mxCell, entity: IChosenEntity, x: number, y: number): mxgraph.mxCell {

  const image: string = entity.image ? `shape=image;image=${entity.image}` : '';

  return graph.insertVertex(parent, entity.id, entity.name,
    x || 30, y || 40, 80, 50,
    image
  );
}
