module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProjectSchema = new Schema({
    name: { type: String },
    img: { type: String },
    git: { type: String },
    site: { type: String },
  });

  return mongoose.model('Project', ProjectSchema);
};
