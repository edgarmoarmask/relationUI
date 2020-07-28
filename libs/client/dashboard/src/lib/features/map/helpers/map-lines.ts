import {Marker, Polyline, polyline} from "leaflet";

export function createLine(sourceMarker: Marker, targetMarker: Marker, className: string): Polyline {

  const mapPolyline: Polyline = polyline([sourceMarker.getLatLng(), targetMarker.getLatLng()], {
    color: '#3388ff',
    lineCap: 'square',
    stroke: true,
    lineJoin: 'bevel',
    className: className
  });

  return mapPolyline;

  /*const decorator = polylineDecorator(mapPolyline, {
        patterns: [
          // defines a pattern of 10px-wide dashes, repeated every 20px on the line
          {
            offset: 0,
            repeat: 50,
            symbol: Symbol.arrowHead({pixelSize: 8, polygon: false, pathOptions: {stroke: true}})
          }
        ]
      });

      decorator.addTo(this.map);*/
}
