import React, { useEffect, useState } from "react";

function Loading() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 100);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-lg text-neutral-700 font-bold">Laddar</h1>
      <p className="text-md text-neutral-700 font-bold">{time}</p>
    </div>
  );
}

export default Loading;
