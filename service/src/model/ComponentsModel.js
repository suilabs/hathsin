import components from '../../data/components';

/**
 * @property {{id, name, type}[]} components
 */
class ComponentsModel {
  constructor() {
    this.components = components;
  }

  getAll() {
    return this.components;
  }

  findById(id) {
    return this.components.find(c => c.id === id);
  }
}

export default new ComponentsModel();