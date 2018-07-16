import AbstractModel from './AbstractModel';
import CommonTypes from './common';

class ProjectTypeModel extends AbstractModel {
  static modelName = 'projectTypes';
  static schema = CommonTypes.idNameSchema;

  constructor() {
    super(ProjectTypeModel.modelName, ProjectTypeModel.schema);
  }
}

export default new ProjectTypeModel();
