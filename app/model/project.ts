import { Application } from 'egg';
import { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: { type: String },
  img: { type: String },
  git: { type: String },
  site: { type: String },
  type: { type: String },
  userId: { type: String },
  vuelocation: { type: String },
  createTime: { type: Date },
  lastModify: { type: Date },
});

export interface IProject {
  _id: string;
  name: string;
  img: string;
  git: string;
  site: string;
  type: string;
  userId: string;
  vuelocation: string;
  createTime: Date;
  lastModify: Date;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  return mongoose.model('Project', ProjectSchema);
};
