import { dbConnect } from "@/lib/mongodb";
import Category from "@/models/categories";

export async function getCategories() {
  try {
    await dbConnect();

    const categories = await Category.find({
      isActive: true,
    }).sort({ name: 1 });

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}