export const GetImageSize = (
  file: File
): Promise<{ width: number; height: number }> =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
    const url = URL.createObjectURL(file);
    img.src = url;
  });
