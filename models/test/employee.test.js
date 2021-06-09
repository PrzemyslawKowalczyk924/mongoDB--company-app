const Employee = require('../employee.model');

const expect = require('chai').expect;

describe('Employee', () => {
  
  it('should throw an error if at least one field is empty', () => {
    const [firstName, lastName, department] = ['John', 'Doe', 'IT']
    const example1 = new Employee({});
    const example2 = new Employee({department: department});
    const example3 = new Employee({firstName: firstName, lastName: lastName});

    const cases = [example1, example2, example3];

    for(example of cases) {
      example.validate(err => {
        expect(err.errors).to.exist;
      });
    }
  });

  it('should throw an error if added arg is not a string', () => {
    const [firstName, lastName, department] = ['John', {}, 123]
    const example = new Employee({firstName: firstName, lastName: lastName, department: department});

    example.validate(err => {
      expect(err.errors).to.exist;
    });
    
  });

});