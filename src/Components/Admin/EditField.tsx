import React from "react";
import { BiSave } from "react-icons/bi";

interface Props {
  children: React.ReactNode;
  title: string;
  saveClicked: () => void;
  shouldSave: boolean;
}

function EditField({ children, saveClicked, title, shouldSave }: Props) {
  return (
    <div className="bg-neutral-50 drop-shadow-card rounded w-full px-2 mt-4 pb-2">
      <div className="w-full flex flex-row justify-between items-center">
        <h3 className="text-md font-bold text-neutral-700">{title}</h3>
        <button className="text-lg" onClick={saveClicked}>
          <BiSave
            className={`${shouldSave ? "text-red-500" : "text-neutral-700"}`}
          />
        </button>
      </div>
      {children}
    </div>
  );
}

export default EditField;
