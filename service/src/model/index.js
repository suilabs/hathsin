import mongoose from 'mongoose';

const basicSchema = {
  _id: String,
  name: String,
};

const SectionSchema = new mongoose.Schema(basicSchema);

const ProjectTypeSchema = new mongoose.Schema(basicSchema);

const ImageSchema = new mongoose.Schema({
  ...basicSchema,
  url: String,
});

const ProjectSchema = new mongoose.Schema({
  ...basicSchema,
  description: String,
  textPool: [String],

  cover: {type: String, ref: 'images'},
  section: {type: String, ref: 'sections'},
  type: {type: String, ref: 'projectTypes'},
});

export const Project = mongoose.model('projects', ProjectSchema);
export const Image = mongoose.model('images', ImageSchema);

export const ProjectType = mongoose.model('projectTypes', ProjectTypeSchema);
export const Section = mongoose.model('sections', SectionSchema);
