import ProjectTypeModel from "../model/ProjectTypeModel";

export default {
  Query: {
    async projectTypes(parent, args, context, info) {
      return ProjectTypeModel.getAll();
    },
    async projectType(parent, { id }) {
      return ProjectTypeModel.getById(id);
    }
  },
  Mutation: {
    async insertProjectType(parent, newProjectType, context, info) {
      return ProjectTypeModel.create(newProjectType);
    },
    async updateProjectType(parent, { id, name }, context, info) {
      return ProjectTypeModel.update(id, { name });
    },
    async deleteProjectTypes(parent, { ids }, context, info) {
      const deleteItems = [];
      ids.forEach(id => {
        deleteItems.push(ProjectTypeModel.delete(id));
      });
      return deleteItems;
    }
  }
};
