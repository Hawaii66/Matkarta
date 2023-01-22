import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import ShopMap from "@/Components/Map/ShopMap";
import Shops from "@/Components/Map/Shops";
import { useEffect, useState } from "react";
import { LoadingContext } from "@/Contexts/LoadingContext";

export default function Home() {
  const [scrollTo, setScrollTo] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => {
        if (i === 5) {
          return 0;
        }
        return i + 1;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-lg text-orange-500 font-bold font-mono">Laddar</h1>
        <p>{getAnimState()}</p>
        <p>Why did the loading bar take so long to fill up?</p>
        <p>Because it was stuck at 99%!</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex md:flex-row flex-col-reverse">
      <div className="fixed inset-0">
        <ShopMap markerClicked={(e) => setScrollTo(e)} />
      </div>
      <LoadingContext.Provider
        value={{
          loading,
          setLoading: (e) => setLoading(e),
        }}
      >
        <Shops scrollTo={scrollTo} />
      </LoadingContext.Provider>
    </div>
  );
}
