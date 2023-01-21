import { GetImageSize } from "@/Functions/GetImageSize";
import React, { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  dishId: number;
  dishImages: string[][];
  index: number;
  deleteImage: (dishId: number, image: string) => void;
  addImage: (dishId: number, file: File) => void;
}

function ImageEditor({
  dishImages,
  index,
  deleteImage,
  dishId,
  addImage,
}: Props) {
  const [file, setFile] = useState<File | null>(null);

  const verifyImage = async () => {
    if (file === null) {
      return;
    }

    const { height, width } = await GetImageSize(file);

    const ration = width / height;
    if (ration < 1) {
      alert("Varning! Bilden måste vara i landscape");
      return;
    }

    addImage(dishId, file);
  };

  return (
    <div className="grid grid-cols-3 gap-1 drop-shadow-card bg-neutral-50 p-2 rounded">
      {dishImages[index].map((image) => (
        <div className="relative col-span-1" key={image}>
          <img src={image} className="rounded" />
          <button
            onClick={() => deleteImage(dishId, image)}
            className="absolute bottom-1 right-1 text-md font-bold text-neutral-700 p-1 rounded bg-red-500 flex items-center justify-center"
          >
            <BsFillTrashFill />
          </button>
        </div>
      ))}
      <div className="grid grid-cols-3 col-span-3">
        <input
          type="file"
          className="col-span-2"
          onChange={(e) =>
            setFile(e.target.files === null ? null : e.target.files[0])
          }
        />
        <button
          className="col-span-1 col-start-3 text-md font-bold text-neutral-700 p-1 rounded bg-green-500 flex items-center justify-center"
          onClick={verifyImage}
        >
          <AiFillFileAdd />
        </button>
      </div>
    </div>
  );
}

export default ImageEditor;
