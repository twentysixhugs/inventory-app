import { Schema, model, Types } from 'mongoose';

interface IItem {
  name: string;
  description: string;
  price: number;
  numberInStock: number;
  category: Types.ObjectId;
  url: string;
}

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
});

itemSchema.virtual('url').get(function () {
  return `/catalog/item/${this._id}`;
});

const Item = model<IItem>('Item', itemSchema);

export default Item;
