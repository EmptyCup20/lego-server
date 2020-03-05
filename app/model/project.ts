import { Application } from 'egg';
import { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: { type: String },
  img: { type: String },
  git: { type: String },
  site: { type: String },
});

export interface IProject {
  _id: string;
  name: string;
  img: string;
  git: string;
  site: string;
}

export default (app: Application) => {
  const mongoose = app.mongoose;

  return mongoose.model('Project', ProjectSchema);
};
