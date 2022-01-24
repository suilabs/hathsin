import { Schema } from 'mongoose';
import AbstractModel from './AbstractModel';
import CommonTypes from './common';

const configurationSchema = new Schema({
  componentId: String,
  propsJson: String,
});

export const STATUS = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
  DELETED: "DELETED",
};

const cmp = (a, b) => {
  if (a.date && b.date) {
    return a.date.getTime() - b.date.getTime()
  }
  if (a.date) {
    return 1
  }

  return -1
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
    date: Date,
  };

  constructor() {
    super(ProjectModel.modelName, ProjectModel.schema);
  }

  async getAllByStatus(status) {
    return this.getAll({ status }).then(r => r.sort(cmp));
  }

  async getPublishedAndDraft() {
    return this.getAll({ status: { $in: [STATUS.DRAFT, STATUS.PUBLISHED]}}).then(r => r.sort(cmp))
  }

  async delete(id) {
    return super.update(id, { status: STATUS.DELETED });
  }
}

export default new ProjectModel();
