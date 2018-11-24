import Project from '../model/ProjectModel';

export default {
  Query: {
    async project(parent, { id } ) {
      return Project.getById(id);
    },
    async projects() {
      return Project.getAll();
    },
  },
  Mutation: {
    async insertProject(parent, { project: newProject }, context, info) {
      return Project.create(newProject);
    },
    async updateProject(parent, { id, project: newProjectData }, context, info) {
      return Project.update(id, newProjectData);
    },
    async deleteProjects(parent, { ids }, context, info) {
      const deletedProjects = [];
      ids.forEach(id => {
        deletedProjects.push(Project.delete(id));
      });
      return deletedProjects;
    }
  }
};
