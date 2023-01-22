import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import ShopMarker from "./ShopMarker";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "@/Hooks/useLocations";

interface Props {
  markerClicked: (index: number) => void;
}

function ShopMap({ markerClicked }: Props) {
  const { locations, loading } = useLocation();
  const [index, setIndex] = useState(0);
  const [baseLoad, setBaseLoad] = useState(2);

  const getAnimState = () => {
    var output = "";
    for (var i = 0; i < index; i++) {
      output += "🔵";
    }
    for (var i = index; i < 5; i++) {
      output += "⚪";
    }

    return output;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => {
        if (i === 5) {
          return 0;
        }
        return i + 1;
      });

      setBaseLoad((i) => i - 1);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  if (baseLoad > 0) {
    return <></>;
  }

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-lg text-orange-500 font-bold font-mono">
          Laddar karta & platser
        </h1>
        <p>{getAnimState()}</p>
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
