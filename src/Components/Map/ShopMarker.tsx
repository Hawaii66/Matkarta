import React from "react";
import { Marker } from "react-map-gl";
import { AiOutlineShop } from "react-icons/ai";

interface Props {
  name?: string;
  onClick?: () => void;
}

function ShopMarker({ name = "Shop", onClick }: Props) {
  return (
    <Marker
      latitude={58.75375362119627}
      longitude={17.00188014002779}
      anchor={"bottom"}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <div className="flex justify-center items-center flex-col bg-neutral-50 bg-opacity-60 rounded p-2">
        <h1 className="text-3xl text-neutral-700 font-bold">{name}</h1>
        <AiOutlineShop color={"#404040"} size={"3rem"} />
      </div>
    </Marker>
  );
}

export default ShopMarker;
