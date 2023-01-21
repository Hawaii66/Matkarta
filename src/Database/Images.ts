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
  const { data: imageMetadata, error } = await supabase
    .from("Images")
    .select("*")
    .eq("shop", shopId);

  if (error) {
    return [];
  }

  const sortedImageNames = imageMetadata
    .sort((a, b) => b.index - a.index)
    .map((i) => i.name);

  const staticPath = `${shopId}/shop/`;

  const paths = sortedImageNames.map(
    (image) =>
      supabase.storage.from("images").getPublicUrl(`${staticPath}${image}`).data
        .publicUrl
  );

  return paths;
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
  const { data: imageMetadata, error } = await supabase
    .from("Images")
    .select("*")
    .eq("shop", shopId)
    .eq("index", 0)
    .single();

  if (error) {
    return "";
  }

  const staticPath = `${shopId}/shop/`;

  return supabase.storage
    .from("images")
    .getPublicUrl(`${staticPath}${imageMetadata.name}`).data.publicUrl;
};
