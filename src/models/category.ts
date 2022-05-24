import { Schema, model, Types } from 'mongoose';

export interface ICategory {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  url?: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

categorySchema.virtual('url').get(function () {
  return `/catalog/categories/${this._id}`;
});

const Category = model<ICategory>('Category', categorySchema);

export default Category;
