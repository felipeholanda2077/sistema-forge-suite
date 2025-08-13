import mongoose, { Document, Schema } from 'mongoose';

export interface IApiRequest extends Document {
  method: string;
  path: string;
  statusCode: number;
  responseTime: number;
  user?: mongoose.Types.ObjectId;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const ApiRequestSchema: Schema = new Schema(
  {
    method: {
      type: String,
      required: true,
      enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
    path: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    responseTime: {
      type: Number, // in milliseconds
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IApiRequest>('ApiRequest', ApiRequestSchema);
