import ProjectModel from './ProjectModel';

const mongoObject = (obj) => {
  return { ...obj,  toObject: () => obj };
};

const mockProjects = [
  mongoObject({ _id: 'p1', l: 1 }),
  mongoObject({ _id: 'p2', l: 1 }),
  mongoObject({ _id: 'p3', l: 2 }),
];

jest.mock('mongoose', () => ({
  Schema: () => {},
  model: () => ({
    find: async () => mockProjects,
  }),
}));

const MockDependentClass = {
  getById: (id) => Promise.resolve(id)
};

jest.mock('./ImageModel', () => MockDependentClass);
jest.mock('./SectionModel', () => MockDependentClass);
jest.mock('./ProjectTypeModel', () => MockDependentClass);

describe('ProjectModel', () => {
  beforeEach(() => {
    ProjectModel.populate = jest.fn((p) => Promise.resolve(p));
  });

  it('should return all projects', async () => {
    const p = await ProjectModel.getAll();

    expect(p.length).toBe(3);
    expect(p[0].id).toBe(mockProjects[0]._id);
    expect(p[1].id).toBe(mockProjects[1]._id);
    expect(p[2].id).toBe(mockProjects[2]._id);
  });

  it('should return all matching function criteria', async () => {
    const p = await ProjectModel.getAll({
      l: (l) => l === 1,
    })

    expect(p.length).toBe(2);
    expect(p[0].id).toBe(mockProjects[0]._id);
    expect(p[1].id).toBe(mockProjects[1]._id);
  })
});