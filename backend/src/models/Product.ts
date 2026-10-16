import mongoose, { Schema } from "mongoose";

export const productSchema = new Schema({
  name: String,
  desc: String,
  price: Number,
  stock: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
