import {latLng, tileLayer, MapOptions, Marker, Map, Polyline} from 'leaflet';
import 'leaflet-polylinedecorator';

import {IEvent} from '@eagleye/shared/models';

import {IChosenEntity} from "@dashboard/models/entity.model";

import {IEntityMarker} from "@dashboard/features/map/models/entity-marker.model";

import {createLine} from "@dashboard/features/map/helpers/map-lines";
import {createMarker, switchMarker} from "@dashboard/features/map/helpers/map-markers";

export abstract class BaseMap {

  containerEl: HTMLElement;
  entityMarkers: IEntityMarker[] = [];

  map: Map;

  options: MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'}),
    ],
    zoom: 5,
  };

  layersControl = {
    /* baseLayers: {
       'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
     },
     overlays: {
       'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
       'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
     }*/
  };

  constructor(element: HTMLElement) {

    this.containerEl = element;
  }

  onMapReady(map: Map): void {

    this.map = map;
  }

  initMarkers(entities: IChosenEntity[]) {

    const centerLocation: [number, number] = [0, 0];
    let markers: Marker[] = [];

    entities.forEach(entity => {

      const marker: Marker = createMarker(entity.geoLocation, entity.name);

      const location = marker.getLatLng();

      centerLocation[0] += location.lat;
      centerLocation[1] += location.lng;

      markers.push(marker);
    })

    this.options.center = latLng(centerLocation[0] / markers.length, centerLocation[1] / markers.length);
    this.options.layers = [...this.options.layers, ...markers];

    this.entityMarkers = entities.map((entity, index) => ({id: entity.id, marker: markers[index]}));
  }

  filterMarkers(entities: IChosenEntity[]) {

    this.entityMarkers.forEach(entityMarker => {

      const markerFound: boolean = entities.some(entity => entityMarker.id === entity.id);

      switchMarker(
        entityMarker.marker,
        this.containerEl,
        `${entityMarker.id}-event`,
        markerFound
      );
    });
  }

  initLines(events: IEvent[]) {

    events.forEach(event => {

      const source = this.entityMarkers.find(entityMarker => event.sourceId === entityMarker.id);
      const target = this.entityMarkers.find(entityMarker => event.targetId === entityMarker.id);

      if (source && target){

        const line: Polyline = createLine(
          source.marker, target.marker,`${source.id}-event`
        );

        line.addTo(this.map);
      }
    })
  }
}
