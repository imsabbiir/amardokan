import mongoose from "mongoose";

// Color Schema
const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hex: {
      type: String,
      required: true,
      match: /^#[0-9A-Fa-f]{6}$/,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

// Pricing Schema
const pricingSchema = new mongoose.Schema(
  {
    minQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    maxQuantity: {
      type: Number,
      default: null,
      validate: {
        validator(value) {
          return value === null || value >= this.minQuantity;
        },
        message: "maxQuantity must be greater than or equal to minQuantity",
      },
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

// Variant Schema
const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      enum: ["M", "L", "XL", "XXL"],
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
);

// Product Schema
const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one category is required",
      },
    },

    subcategory: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },

    colors: {
      type: [colorSchema],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one color is required",
      },
    },

    sizes: {
      type: [String],
      required: true,
      enum: ["M", "L", "XL", "XXL"],
    },

    pricing: {
      type: [pricingSchema],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one pricing tier is required",
      },
    },

    variants: {
      type: [variantSchema],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one variant is required",
      },
    },

    material: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      enum: ["piece", "kg", "set"],
      default: "piece",
    },

    countryOfOrigin: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation during Next.js development reloads
const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;