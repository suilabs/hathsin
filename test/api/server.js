import http from 'chai-http';

import server from '../../src/server';

chai.use(http);

describe('API', () => {
  const query = {
    query: 'mutation deleteProject($id: String!){deleteProject(key: $id) {key}}',
    variables: { id: 'test' },
    operationName: 'deleteProject',
  };
  it('should not pass without password', (done) => {
    chai.request(server)
      .post('/graphql')
      .send(query)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        JSON.parse(res.text).errors[0].message.should.be.eql('Missing password');
        done();
      });
  });

  it('should not allow incorrect passwords', (done) => {
    query.password = 'incorrect';
    chai.request(server)
      .post('/graphql')
      .send(query)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        JSON.parse(res.text).errors[0].message.should.be.eql('Password incorrect');
        done();
      });
  });

  after(done => server.close(done));
});
