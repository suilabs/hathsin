import ComponentsModel from './ComponentsModel';
import templates from '../../data/templates';

/**
 * @typedef {Object} Template
 * @property {string} id
 * @property {string} name
 * @property {Array[]} rows
 */

/**
 * @property {Template[]} templates
 */
class TemplateModel {
  constructor() {
    this.templates = templates;

    this.templates.forEach(template => {
      template.rows = template.rows.map(row => {
        return row.map(compId => {
          return ComponentsModel.findById(compId);
        })
      });
    });
  }

  async getAll() {
    return this.templates; // this should be already populated
  }

  async getById(id) {
    return this.templates.find(t => t.id === id);
  }
}

export default new TemplateModel();
