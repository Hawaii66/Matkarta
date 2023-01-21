import supabase from "./Supabase";

export const GetDishImages = async (
  shopId: number,
  dishId: number
): Promise<string[]> => {
  const staticPath = `${shopId}/dish/${dishId}`;

  const { data: imageData, error } = await supabase.storage
    .from("images")
    .list(staticPath);

  if (error) {
    return [];
  }

  const paths = imageData
    .filter((i) => i.name !== ".emptyFolderPlaceholder")
    .map(
      (data) =>
        supabase.storage
          .from("images")
          .getPublicUrl(`${staticPath}/${data.name}`).data.publicUrl
    );

  return paths;
};

export const GetShopImages = async (shopId: number): Promise<string[]> => {
  const staticPath = `${shopId}/shop/`;

  const { data: listed, error } = await supabase.storage
    .from("images")
    .list(staticPath);
  if (error) {
    return [];
  }
  const newPaths = listed
    .filter((i) => i.name !== ".emptyFolderPlaceholder")
    .map(
      (i) =>
        supabase.storage.from("images").getPublicUrl(`${staticPath}${i.name}`)
          .data.publicUrl
    );

  return newPaths;
};

export const AddDishImage = async (
  shopId: number,
  dishId: number,
  file: File
) => {
  const staticPath = `${shopId}/dish/${dishId}/${file.name}`;
  const { data: imageMetadata, error } = await supabase.storage
    .from("images")
    .upload(staticPath, file);
};

export const AddShopImage = async (shopId: number, file: File) => {
  const staticPath = `${shopId}/shop/${file.name}`;
  await supabase.storage.from("images").upload(staticPath, file);
};

export const DeleteShopImage = async (shopId: number, filename: string) => {
  const staticPath = `${shopId}/shop/${filename}`;
  await supabase.storage.from("images").remove([staticPath]);
};

export const DeleteDishImage = async (
  shopId: number,
  dishId: number,
  fileName: string
) => {
  const staticPath = `${shopId}/dish/${dishId}/${fileName}`;
  const { data: imageMetadata, error } = await supabase.storage
    .from("images")
    .remove([staticPath]);
};
export const GetPrimaryImage = async (shopId: number): Promise<string> => {
  const images = await GetShopImages(shopId);

  return images[0];
};
