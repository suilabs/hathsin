import sinon from 'sinon';

import JSONConnector from '../../src/DBConnection/jsonConnector';

describe('JSONConnector', () => {
  let writeDBStub;
  let project;
  let project2;

  beforeEach(() => {
    JSONConnector.init();
    writeDBStub = sinon.stub(JSONConnector, 'writeDB').callsFake(() => {

    });
    JSONConnector._createId = m => `${m}-1`; // eslint-disable-line no-underscore-dangle

    project = {
      key: 'k1',
      title: 't1',
      subTitle: 's1',
      coverImage: { name: 'c1', url: 'url1', text: null },
      images: [{ name: 'c1', url: 'url1', text: 'text1' }],
    };

    project2 = {
      key: 'k2',
      title: 't2',
      subTitle: 's2',
      coverImage: { name: 'c1', url: 'url1', text: null },
      images: [{ name: 'c1', url: 'url1', text: 'text1' }],
    };
  });

  afterEach(() => {
    writeDBStub.restore();
  });

  it('inserts an entry', () => {
    const returnProject = JSONConnector.insert('projects', project);

    expect(writeDBStub.called).to.be.equal(true);
    expect(returnProject).to.be.equal(project.key);
  });

  it('returns the inserted elements not persisting', () => {
    JSONConnector.insert('projects', project, false);
    JSONConnector.insert('projects', project2, false);

    const ret = JSONConnector.get('projects');

    expect(Object.keys(ret).length).to.be.equal(2);
    expect(ret[0]).to.be.equal(project);
    expect(ret[1]).to.be.equal(project2);
    expect(writeDBStub.called).to.be.equal(false);
  });

  it('returns the inserted elements persisting', () => {
    JSONConnector.insert('projects', project);
    JSONConnector.insert('projects', project2);

    const ret = JSONConnector.get('projects');

    expect(Object.keys(ret).length).to.be.equal(2);
    expect(ret[0]).to.be.equal(project);
    expect(ret[1]).to.be.equal(project2);
    expect(writeDBStub.called).to.be.equal(true);
  });

  it('returns only the element that matches k1', () => {
    JSONConnector.insert('projects', project);
    JSONConnector.insert('projects', project2);

    const ret = JSONConnector.get('projects', e => e.key === 'k1');

    expect(Object.keys(ret).length).to.be.equal(1);
    expect(ret[0]).to.be.equal(project);
  });
});
