import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWarehouse extends Document {
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  createdAt: Date;
}

const WarehouseSchema = new Schema<IWarehouse>({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  capacity: { type: Number, required: true, min: 0 },
  currentStock: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Warehouse: Model<IWarehouse> = mongoose.models.Warehouse || mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);
export default Warehouse;
