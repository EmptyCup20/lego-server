import { Application } from 'egg';
import { Schema } from 'mongoose';

const FileSchema = new Schema({
  name: { type: String },
  content: { type: String },
  url: { type: String },
  tags: { type: String },
  img: { type: String },
});

export interface IFile {
  _id: string;
  name: string;
  content: string;
  url: string;
  tags: string;
  img: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  return mongoose.model('File', FileSchema);
};
