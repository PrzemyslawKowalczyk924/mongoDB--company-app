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
    const [string, func, array, object] = ['hello world!', function() {}, [], {}]
    const example1 = new Employee({firstName: string, lastName: array, department: string});
    const example2 = new Employee({firstName: object, lastName: string, department: string});
    const example3 = new Employee({firstName: string, lastName: array, department: func});
    const example4 = new Employee({firstName: object, lastName: func, department: array});
    const example5 = new Employee({firstName: func, lastName: array, department: object});

    const cases = [example1, example2, example3, example4, example5]

    for(let example of cases) {
      example.validate(err => {
        expect(err.errors).to.exist;
      });
    }
    
  });

  it('should not throw an error if all args are okay', () => {
    const [firstName, lastName, department] = ['John', 'Doe', 'IT']
    const example = new Employee({firstName: firstName, lastName: lastName, department: department});

    example.validate(err => {
      expect(err).to.not.exist;
    });
  
  });

});