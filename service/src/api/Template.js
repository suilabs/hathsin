import TemplateModel from '../model/TemplateModel';

export default {
  Query: {
    async templates(parent) {
      return TemplateModel.getAll();
    }
  }
}