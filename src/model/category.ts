import mongoose, { Schema, Document, Model } from "mongoose";

interface Icategory extends Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId;
  timeStamp: Date;
}

const categorySchema: Schema<Icategory> = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const categoryModel: Model<Icategory> = mongoose.model('category', categorySchema);

export default categoryModel;
