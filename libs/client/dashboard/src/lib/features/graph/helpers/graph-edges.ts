import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";

import {changeGraph} from "@dashboard/features/graph/helpers/graph-change";
import {IEvent} from "@eagleye/shared/models";

export function createEdges(graph: mxgraph.mxGraph, edges: IEvent[]): void {

  changeGraph(graph,(model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    edges.forEach((edge: IEvent) => {

      const cells: mxgraph.mxCell[] = Object.values(graph.getModel().cells);

      graph.insertEdge(
        parent,
        Math.random().toString(),
        edge.name || '',
        cells.find(cell => cell.id === edge.sourceId),
        cells.find(cell => cell.id === edge.targetId)
      );
    });
  });
}

export function startEdgesAnimation(graph: mxgraph.mxGraph): void {

  changeGraph(graph,(model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    const cells: mxgraph.mxCell[] = Object.values(model.cells);

    cells.forEach(cell => {

      if (model.isEdge(cell)) {
        const state: mxgraph.mxCellState = graph.view.getState(cell);

        state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'yellow');
        state.shape.node.getElementsByTagName('path')[1].setAttribute('class', 'edge-flow');
      }
    })
  })
}

export function stopEdgesAnimation(graph: mxgraph.mxGraph): void {

  changeGraph(graph,(model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => {

    const cells: mxgraph.mxCell[] = Object.values(model.cells);

    cells.forEach(cell => {

      if (model.isEdge(cell)) {
        const state: mxgraph.mxCellState = graph.view.getState(cell);

        state.shape.node.getElementsByTagName('path')[0].setAttribute('visibility', 'hidden');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '10');
        state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'white');
        state.shape.node.getElementsByTagName('path')[1].removeAttribute('class');
      }
    })
  })
}
