import ComponentsModel from './ComponentsModel';

jest.mock('../../data/components', () => ([
  { id: 'id1', component: 'c1' },
  { id: 'id2', component: 'c2' },
]));

describe('ComponentsModel', () => {
  it('can get all components', () => {
    const components = ComponentsModel.getAll();
    expect(components).toEqual([
      { id: 'id1', component: 'c1' },
      { id: 'id2', component: 'c2' },
    ]);
  });

  it('can get component by id', () => {
    const component = ComponentsModel.findById('id1');
    expect(component).toEqual({
      id: 'id1', component: 'c1',
    })
  })
});
