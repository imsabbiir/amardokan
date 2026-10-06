import Products from "@/models/products";
import { dbConnect } from "@/lib/mongodb";

function serializeProduct(product) {
  return {
    ...product,
    _id: product._id.toString(),
    categoryId: product.categoryId?.toString?.() ?? null,
    subcategoryId: product.subcategoryId?.toString?.() ?? null,
  };
}

export async function getProducts() {
  await dbConnect();

  const products = await Products.find()
    .sort({ createdAt: -1 })
    .lean();

  return products.map(serializeProduct);
}

export async function getFlashSaleProducts(limit = 4) {
  await dbConnect();

  const products = await Products.find({
    isActive: true,
    "discount.isFlashSale": true,
  })
    .sort({ "discount.percentage": -1 })
    .limit(limit)
    .lean();

  return products.map(serializeProduct);
}

export async function getBestSellers(limit = 4) {
  await dbConnect();

  const products = await Products.find({
    isActive: true,
  })
    .sort({ "sales.totalOrders": -1 })
    .limit(limit)
    .lean();

  return products.map(serializeProduct);
}

export async function getPopularProducts(limit = 4) {
  await dbConnect();

  const products = await Products.find({
    isActive: true,
    rating: { $gt: 0 },
  })
    .sort({
      rating: -1,
      reviewCount: -1,
      soldStock: -1,
    })
    .limit(limit)
    .lean();

  return products.map(serializeProduct);
}

export async function getNewArrivals(limit = 4) {
  await dbConnect();

  const products = await Products.find({
    isActive: true,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return products.map(serializeProduct);
}