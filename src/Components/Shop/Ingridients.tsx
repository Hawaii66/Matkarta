import { IIngridient } from "@/Interface/Shop";
import React from "react";

interface Props {
  ingridients: IIngridient[];
}

function Ingridients({ ingridients }: Props) {
  if (ingridients.length === 0) {
    return <></>;
  }

  return (
    <div className="w-11/12 grid grid-cols-2 mt-4">
      <h3 className={`bg-slate-200 text-lg font-bold px-2 py-1`}>Innehåll</h3>
      <p className={`bg-slate-200 text-lg font-bold text-right px-2 py-1`}>
        Antal
      </p>
      {ingridients.map((ingridient, index) => (
        <>
          <h3
            className={`${
              index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
            } px-2 py-1`}
          >
            {ingridient.name}
          </h3>
          <p
            className={`${
              index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"
            } text-right px-2 py-1`}
          >
            {ingridient.amount} st
          </p>
        </>
      ))}
    </div>
  );
}

export default Ingridients;
