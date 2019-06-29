import Project, { STATUS } from '../model/ProjectModel';
import ImageModel from '../model/ImageModel';
import SectionModel from '../model/SectionModel';
import ProjectTypeModel from '../model/ProjectTypeModel';

const project = (parent, { id } ) => Project.getById(id);
const projects = () => Project.getAll();
const projectsByLanguage = (parnet, { id }) =>
  Project.getAll({
      languages: (languagesArray) => languagesArray.indexOf(lang) !== -1
  });

const insertProject = (parent, { project }) => {
  project.status = STATUS.DRAFT;
  return Project.create(project);
};

const updateProject = async (parent, { id, project }) => {
  debugger;
  const res = await Project.update(id, project);
  return res;
}
const deleteProjects = (parent, { ids }) => {
  const deletedProjects = [];
  ids.forEach(id => {
    deletedProjects.push(Project.delete(id));
  });
  return deletedProjects;
};

export default {
  Query: {
    project,
    projects,
    projectsByLanguage
  },
  Mutation: {
    insertProject,
    updateProject,
    deleteProjects,
  },
  Project: {
    cover: (project) => ImageModel.getById(project.cover),
    section: (project) => SectionModel.getById(project.section),
    type: (project) => ProjectTypeModel.getById(project.type)
  }
};

