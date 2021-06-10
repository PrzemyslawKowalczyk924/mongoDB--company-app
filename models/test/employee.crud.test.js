const Employee = require('../employee.model');
const expect = require('chai').expect;

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
      const fakeDB = new MongoMemoryServer();
  
      const uri = await fakeDB.getUri();
  
      mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
    } catch(err) {
      console.log(err);
    }
  
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Robin', lastName: 'Hood', department: 'Thief' });
      await testEmpThree.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 3;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employeesOne = await Employee.findOne({ firstName: 'John' });
      const employeesTwo = await Employee.findOne({ lastName: 'Doe' });
      const employeesThree = await Employee.findOne({ department: 'Thief' });
      
      const expectedDataOne = 'John';
      const expectedDataTwo = 'Doe';
      const expectedDataThree = 'Thief';

      expect(employeesOne.firstName).to.be.equal(expectedDataOne);
      expect(employeesTwo.lastName).to.be.equal(expectedDataTwo);
      expect(employeesThree.department).to.be.equal(expectedDataThree);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'Peter', lastName: 'Parker', department: 'Superhero' });
      await employee.save();
      const savedEmployee = await Employee.findOne({ firstName: 'Peter', lastName: 'Parker', department: 'Superhero' });
      expect(savedEmployee).to.not.be.null;
    });
  
    after(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Robin', lastName: 'Hood', department: 'Thief' });
      await testEmpThree.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'John' }, { $set: { firstName: '=Gordon=' }});
      const updatedEmployee = await Employee.findOne({ firstName: '=Gordon=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.firstName = '=John=';
      await employee.save();
    
      const updatedEmployee = await Employee.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { name: 'Updated!' }});
      const employee = await Employee.find();
      expect(employee[0].name).to.be.equal('Updated!');
      expect(employee[1].name).to.be.equal('Updated!');
    });
  
    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  after(() => {
    mongoose.models = {};
  });

});