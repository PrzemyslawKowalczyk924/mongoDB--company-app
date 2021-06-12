const Department = require('../../../models/department.model');
const server = require('../../../server.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
    await testDepOne.save();
  });

  it('/:id should delete chosen document and return success', async () => {
    const res = await request(server).delete('/api/departments/5d9f1159f81ce8d1ef2bee48');
    const deletedDepartment = await Department.findOne({ name: '#Department #2' });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.not.be.null;
    expect(deletedDepartment).to.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});