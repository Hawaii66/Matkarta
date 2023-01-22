import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import ShopMap from "@/Components/Map/ShopMap";
import Shops from "@/Components/Map/Shops";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollTo, setScrollTo] = useState(-1);

  //Reset zoom to if move
  useEffect(() => {
    window.onscroll = () => {
      setScrollTo(-1);
    };

    window.ondrag = () => {
      setScrollTo(-1);
    };

    window.onpointermove = () => {
      setScrollTo(-1);
    };
  });

  return (
    <div className="w-full h-screen flex md:flex-row flex-col-reverse">
      <div className="fixed inset-0">
        <ShopMap markerClicked={(e) => setScrollTo(e)} />
      </div>
      <Shops scrollTo={scrollTo} />
    </div>
  );
}
