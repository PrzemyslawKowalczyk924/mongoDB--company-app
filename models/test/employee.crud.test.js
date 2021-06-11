const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;

const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

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

  describe('Reading data with "populate', () => {
    it('should return all the data with "find" method with "populate"', async () => {
      const testDepOne = new Department({ _id: ObjectId('111111111111aaaaaaaaaaaa'), name: 'DevOps' });
      await testDepOne.save();
      
      const testDepTwo = new Department({ _id: ObjectId('222222222222bbbbbbbbbbbb'), name: 'Security' });
      await testDepTwo.save();

      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: '111111111111aaaaaaaaaaaa' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: '222222222222bbbbbbbbbbbb' });
      await testEmpTwo.save();

      const employees = await Employee.find().populate('department');
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
      expect(employees[1].department.name).to.be.equal('Security');
    });

    after(async () => {
      await Department.deleteMany();
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
      await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(3);
    });
  
    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'John', lastName: 'Doe', department: 'IT' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
      await testEmpTwo.save();

      const testEmpThree = new Employee({ firstName: 'Robin', lastName: 'Hood', department: 'Thief' });
      await testEmpThree.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removeEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removeEmployee).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'Amanda' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'Amanda' });
      expect(removedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  
    afterEach(async () => {
      await Employee.deleteMany();
    });

  });

  after(() => {
    mongoose.models = {};
  });

});