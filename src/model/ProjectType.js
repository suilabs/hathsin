import Controller from '../ModelController/ProjectType';
import Utils from '../utils/utils';

const ProjectTypeResolver = {
  Query: {
    types() {
      return Controller.all();
    },
  },
  Mutation: {
    /**
     *
     * @param {*} _ - unused variable
     * @param {String} type - new type name
     * @returns {*} ProjectType
     */
    insertProjectType(_, { type }) {
      const newType = new Controller({ key: Utils.joinLowerCase(type), name: type });
      newType.save();
      return newType.object;
    },
    /**
     * @param {*} _ - unused variable
     * @param {string} key - Unique key
     * @returns {Object} - Deleted element
     */
    deleteProjectType(_, { key }) {
      const type = Controller.byKey(key);
      type.delete();
      return type.object;
    },
  },
};

export default ProjectTypeResolver;
