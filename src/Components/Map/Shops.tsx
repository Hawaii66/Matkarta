import React, { useEffect, useRef, useState } from "react";
import Divider from "../Utils/Divider";
import ShopCard from "./ShopCard";

interface Props {
  scrollTo: number;
}

function Shops({ scrollTo }: Props) {
  const refs = Array.from(Array(8)).reduce((acc, value, index) => {
    acc[index] = React.createRef();
    return acc;
  }, []);

  useEffect(() => {
    if (scrollTo === -1) {
      return;
    }

    refs[scrollTo]?.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [scrollTo]);

  return (
    <div className="w-1/4 z-50">
      <h1>Sushi</h1>
      <ShopCard ref={refs[0]} />
      <ShopCard ref={refs[1]} />
      <ShopCard ref={refs[2]} />
      <ShopCard ref={refs[3]} />
      <Divider />
      <h1>Hamburger</h1>
      <ShopCard ref={refs[4]} />
      <ShopCard ref={refs[5]} />
      <ShopCard ref={refs[6]} />
      <Divider />
      <h1>Other</h1>
      <ShopCard ref={refs[7]} />
    </div>
  );
}

export default Shops;
