module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const FileSchema = new Schema({
    name: { type: String },
    filesite: { type: String },
  });

  return mongoose.model('File', FileSchema);
};
