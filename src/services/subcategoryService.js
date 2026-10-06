import { dbConnect } from "@/lib/mongodb";
import Subcategory from "@/models/subcategories";

export async function getSubcategories() {
  try {
    await dbConnect();

    const subcategories = await Subcategory.find({
      isActive: true,
    }).sort({ name: 1 });

    return subcategories;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
}