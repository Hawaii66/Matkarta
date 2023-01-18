import React from "react";
import Map from "react-map-gl";
import ShopMarker from "./ShopMarker";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {
  markerClicked: (index: number) => void;
}

function ShopMap({ markerClicked }: Props) {
  return (
    <Map
      initialViewState={{
        latitude: 58.752293424240726,
        longitude: 17.0005521173264,
        zoom: 12,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAP_BOX_STYLE}
      attributionControl={false}
    >
      <ShopMarker onClick={() => markerClicked(5)} />
    </Map>
  );
}

export default ShopMap;
