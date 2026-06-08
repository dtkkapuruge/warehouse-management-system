import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  warehouse: mongoose.Types.ObjectId;
  supplier: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  sku: { type: String, required: true, unique: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
