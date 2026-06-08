import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISupplier extends Document {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
}

const SupplierSchema = new Schema<ISupplier>({
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const Supplier: Model<ISupplier> = mongoose.models.Supplier || mongoose.model<ISupplier>('Supplier', SupplierSchema);
export default Supplier;
