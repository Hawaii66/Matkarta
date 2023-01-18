import React from "react";

interface Props {
  height?: number;
}

function Divider({ height = 2 }: Props) {
  return (
    <div
      style={{
        minHeight: `${height}px`,
      }}
      className="w-full flex justify-center items-center"
    >
      <div
        style={{ minHeight: `${height}px` }}
        className="w-11/12 bg-slate-700"
      />
    </div>
  );
}

export default Divider;
