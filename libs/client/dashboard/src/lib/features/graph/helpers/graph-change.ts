import {mxgraph} from "mxgraph";

export function changeGraph(graph: mxgraph.mxGraph, callback: (model: mxgraph.mxGraphModel, parent: mxgraph.mxCell) => void) {

  const model: mxgraph.mxGraphModel = graph.getModel();
  const parent: mxgraph.mxCell = graph.getDefaultParent();

  model.beginUpdate();

  try {
    callback(model, parent);
  } finally {
    model.endUpdate();
  }
}
