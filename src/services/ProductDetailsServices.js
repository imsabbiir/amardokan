import Products from "@/models/products";
import { dbConnect } from "@/lib/mongodb";

export async function getProductDetails(id) {
  await dbConnect();

  const product = await Products.findById(id).lean();

  if (!product) {
    return null;
  }

  return {
    ...product,
    _id: product._id.toString(),
  };
}