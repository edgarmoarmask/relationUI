import {mxgraph} from "mxgraph";
import {mx} from "@dashboard/features/graph/models/mxgraph.model";

export function initGraph(element: HTMLElement): mxgraph.mxGraph {

  const graph: mxgraph.mxGraph = new mx.mxGraph(element);

  setGraphStyle(graph);
  setGraphConfiguration(graph, element);
  correctEdgesIntersection();

  return graph;
}

// Private
function setGraphStyle(graph: mxgraph.mxGraph): void {

  // Cells style
  const cellStyle = graph.stylesheet.getDefaultVertexStyle();
  cellStyle[mx.mxConstants.STYLE_SHAPE] = mx.mxConstants.SHAPE_RECTANGLE;
  cellStyle[mx.mxConstants.STYLE_PERIMETER] = mx.mxPerimeter.RectanglePerimeter;
  cellStyle[mx.mxConstants.STYLE_ROUNDED] = true;
  // style[mx.mxConstants.STYLE_FONTCOLOR] = 'white';
  cellStyle[mx.mxConstants.STYLE_GRADIENTCOLOR] = 'white';
  //  style[mx.mxConstants.STYLE_FONTSTYLE] = mx.mxConstants.FONT_BOLD;
  cellStyle[mx.mxConstants.STYLE_FONTSIZE] = 10;
  // style[mx.mxConstants.STYLE_SHADOW] = true;
  cellStyle[mx.mxConstants.STYLE_PERIMETER_SPACING] = 4;
  cellStyle[mx.mxConstants.STYLE_VERTICAL_LABEL_POSITION] = 'bottom';
  cellStyle[mx.mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
  cellStyle[mx.mxConstants.STYLE_STROKEWIDTH] = '2';
  cellStyle[mx.mxConstants.STYLE_STROKECOLOR] = 'black';

  // Edge style
  const edgeStyle = graph.stylesheet.getDefaultEdgeStyle();
  edgeStyle[mx.mxConstants.STYLE_PERIMETER_SPACING] = 4;
  edgeStyle[mx.mxConstants.STYLE_STROKEWIDTH] = 2;
  edgeStyle[mx.mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
  edgeStyle[mx.mxConstants.STYLE_FONTSTYLE] = 2;
}

function setGraphConfiguration(graph: mxgraph.mxGraph, element: HTMLElement): void {

  // Disables built-in context menu
  mx.mxEvent.disableContextMenu(element);

  graph.setCellsMovable(true);
  graph.setCellsResizable(false);
  graph.setCellsSelectable(true);
  graph.setAutoSizeCells(true);

  graph.setConnectableEdges(false);
  graph.setAllowDanglingEdges(false);
  graph.setEdgeLabelsMovable(false);

  graph.setConnectable(true);
  graph.selectionModel.singleSelection = true;

  graph.setPanning(true);
  graph.centerZoom = false;
  // graph.dropEnabled = true;
  graph.panningHandler.useLeftButtonForPanning = true;

  // Sets the image to be used for creating new connections
  mx.mxConnectionHandler.prototype.connectImage = new mx.mxImage('assets/cells-connector.png', 14, 14);
}

function correctEdgesIntersection(): void {

  // Redirects the perimeter to the label bounds if intersection
  // between edge and label is found
  const mxGraphViewGetPerimeterPoint = mx.mxGraphView.prototype.getPerimeterPoint;

  mx.mxGraphView.prototype.getPerimeterPoint = function (terminal, next, orthogonal, border) {

    let point = mxGraphViewGetPerimeterPoint.apply(this, arguments);

    if (point != null) {
      const perimeter = this.getPerimeterFunction(terminal);

      if (terminal.text != null && terminal.text.boundingBox != null) {
        // Adds a small border to the label bounds
        const b = terminal.text.boundingBox.clone();
        b.grow(3);

        if (mx.mxUtils.rectangleIntersectsSegment(b, point, next)) {
          point = perimeter(b, terminal, next, orthogonal);
        }
      }
    }

    return point;
  };
}
