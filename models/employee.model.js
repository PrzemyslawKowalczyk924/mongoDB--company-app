const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  department: { type: String, require: true }
});

module.exports = mongoose.model('Employee', employeeSchema);