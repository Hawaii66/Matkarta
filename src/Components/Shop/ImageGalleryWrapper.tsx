import React from "react";
import ImageGallery from "react-image-gallery";

interface Props {
  images: string[];
}

function ImageGalleryWrapper({ images }: Props) {
  if (images.length === 0 || images[0] === "") {
    return <></>;
  }

  return (
    <div className="w-11/12">
      <ImageGallery
        items={images.map((image) => ({
          original: image,
          thumbnail: image,
        }))}
        showPlayButton={false}
        showBullets={false}
      />
    </div>
  );
}

export default ImageGalleryWrapper;
