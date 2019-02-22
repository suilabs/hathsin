import AbstractModel from './AbstractModel';
import CommonTypes from './common';

class SectionModel extends AbstractModel {
  static modelName = 'sections';
  static schema = CommonTypes.idNameSchema;

  constructor() {
    super(SectionModel.modelName, SectionModel.schema);
  }
}

export default new SectionModel();
