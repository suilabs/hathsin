import Project, { STATUS } from '../model/ProjectModel';
import ImageModel from '../model/ImageModel';
import SectionModel from '../model/SectionModel';
import ProjectTypeModel from '../model/ProjectTypeModel';

const project = (parent, { id } ) => Project.getById(id);
const projects = (parent, { status }) => Project.getAllByStatus(status);
const draftProjects = () => Project.getPublishedAndDraft();

const projectsByLanguage = (parent, { id, lang }) =>
  Project.getAll({
    languages: lang,
    status: 'PUBLISHED'  
  });

const insertProject = (parent, { project }) => {
  project.status = STATUS.DRAFT;
  return Project.create(project);
};

const updateProject = (parent, { id, project }) => Project.update(id, project);
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
    draftProjects,
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

