import Controller from '../ModelController/Project';

const ProjectResolver = {
  Query: {
    project(_, { key }) {
      return Controller.byKey(key).object;
    },
    projects() {
      return Controller.all().sort((p1, p2) => p1.position - p2.position);
    },
  },
  Mutation: {
    insertProject(_, { project }) {
      const newProject = new Controller(project);
      newProject.save();
      return newProject.object;
    },
    updateProject(_, { project }) {
      const projectToUpdate = Controller.byKey(project.key);
      projectToUpdate.name = project.name;
      projectToUpdate.title = project.title;
      projectToUpdate.subTitle = project.subTitle;
      projectToUpdate.coverImage = project.coverImage;
      projectToUpdate.types = project.types;
      projectToUpdate.images = project.images;
      projectToUpdate.save();
      return projectToUpdate.object;
    },
    deleteProject(_, { key }) {
      const project = Controller.byKey(key);
      project.delete();
      return project.object;
    },
    changeOrder(_, { projects }) {
      const retProj = [];
      projects.forEach(({ key, position }) => {
        const project = Controller.byKey(key);
        project.position = position;
        retProj.push(project);
        project.save();
      });
      return retProj;
    },
  },
};

export default ProjectResolver;
