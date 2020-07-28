import {icon, marker, Marker} from "leaflet";

export function createMarker(geoLocation: string, title: string): Marker {

  const location: number[] = geoLocation.split(', ').map(entity => +entity);

  return marker(
    [location[0], location[1]],
    {
      opacity: 1,
      title: title,
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/marker-icon.png'
      })
    }
  );
}

export function switchMarker(marker: Marker, container: HTMLElement, containerClassName: string, enable: boolean): void {

  const opacity: string = enable ? '1' : '0';

  marker.setOpacity(+opacity);

  const lineElements = container.getElementsByClassName(containerClassName);

  Array.from(lineElements).forEach((el: HTMLElement) => {

    el.style.opacity = opacity;
  });
}
