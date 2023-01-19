import React from "react";
import Map from "react-map-gl";
import ShopMarker from "./ShopMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "@/Hooks/useLocations";

interface Props {
  markerClicked: (index: number) => void;
}

function ShopMap({ markerClicked }: Props) {
  const { locations, loading } = useLocation();

  if (loading) {
    return (
      <div>
        <h1>Laddar platser</h1>
      </div>
    );
  }

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
      {locations.map((location, index) => (
        <ShopMarker
          lat={location.lat}
          lng={location.lng}
          name={location.name}
          key={location.shopId}
          onClick={() => markerClicked(index)}
        />
      ))}
    </Map>
  );
}

export default ShopMap;
