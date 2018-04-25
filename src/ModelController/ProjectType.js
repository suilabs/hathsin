import AbstractModelController from './AbstractController';

/**
 * Schema
 *
 * type ProjectType {
 *   key: String!
 *   name: String!
 * };
 */
class ProjectType extends AbstractModelController {
  get key() {
    return this.object.key;
  }

  get name() {
    return this.object.name;
  }

  set name(value) {
    this.object.name = value;
  }

  constructor({ key, name }) {
    super();
    this.object = {};
    this.object.key = key;
    this.object.name = name;
  }
}

ProjectType.prototype.objectName = 'types';

export default ProjectType;
