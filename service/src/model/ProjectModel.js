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

const doesMatchCriteria = (criteria, project) => {
  return Object.entries(criteria).every(([key, criteriaFunction]) => {
    return criteriaFunction(project[key]);
  });
};

export const STATUS = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
  DELETED: "DELETED",
};

class ProjectModel extends AbstractModel {

  static modelName = 'projects';
  static schema = {
    ...CommonTypes.idNameSchema,
    url: String,
    description: String,
    status: {type: String, enum: Object.keys(STATUS)},

    cover: {type: String, ref: 'images'},
    section: {type: String, ref: 'sections'},
    type: {type: String, ref: 'projectTypes'},
    configuration: [configurationSchema],
    languages: [String],
  };

  constructor() {
    super(ProjectModel.modelName, ProjectModel.schema);
  }

  async getAllByStatus(status) {
    return this.getAll({ status: (p) => p === status });
  }

  async getAll(criteria = {}) {
    const projects = (await super.getAll());
    return Promise.all(projects
      .filter(project => doesMatchCriteria(criteria, project)));
  }
}

export default new ProjectModel();
