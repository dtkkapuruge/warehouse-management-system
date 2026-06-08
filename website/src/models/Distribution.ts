import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDistribution extends Document {
  product: mongoose.Types.ObjectId;
  warehouse: mongoose.Types.ObjectId;
  quantity: number;
  destination: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  shippedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
}

const DistributionSchema = new Schema<IDistribution>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  warehouse: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  quantity: { type: Number, required: true, min: 1 },
  destination: { type: String, required: true, trim: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
  shippedAt: { type: Date },
  deliveredAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Distribution: Model<IDistribution> = mongoose.models.Distribution || mongoose.model<IDistribution>('Distribution', DistributionSchema);
export default Distribution;
