import { Schema } from 'mongoose';
import AbstractModel from './AbstractModel';
import CommonTypes from './common';
import ImageModel from './ImageModel';
import SectionModel from './SectionModel';
import ProjectTypeModel from './ProjectTypeModel';

const configurationSchema = new Schema({
  componentId: String,
  propsJson: String,
});

class ProjectModel extends AbstractModel {
  static modelName = 'projects';
  static schema = {
    ...CommonTypes.idNameSchema,
    url: String,
    description: String,
    textPool: [String],

    cover: {type: String, ref: 'images'},
    section: {type: String, ref: 'sections'},
    type: {type: String, ref: 'projectTypes'},
    configuration: [configurationSchema],
  };

  constructor() {
    super(ProjectModel.modelName, ProjectModel.schema);
  }

  async getAll() {
    const projects = await super.getAll();
    return projects.map(async project => this.populate(project));
  }

  async getById(id) {
    const project = await super.getById(id);
    return this.populate(project);
  }

  // populate the refs
  async populate(project) {
    const cover = await ImageModel.getById(project.cover);
    const section = await SectionModel.getById(project.section);
    const type = await ProjectTypeModel.getById(project.type);
    return {
      ...project,
      cover,
      section,
      type,
    };
  }
}

export default new ProjectModel();
