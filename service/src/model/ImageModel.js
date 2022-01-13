import AbstractModel from './AbstractModel';
import CommonTypes from './common';

class ImageModel extends AbstractModel {
  static modelName = 'images';
  static schema = {
    ...CommonTypes.idNameSchema,
    url: String,
    thumbnailUrl: String,
    filename: String,
  };

  constructor() {
    super(ImageModel.modelName, ImageModel.schema);
  }
}

export default new ImageModel();
