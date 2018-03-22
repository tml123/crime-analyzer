const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = new Schema({
  type: String,
  coordinates: Array,
  properties: {
    category: String,
    description: String,
    district: String,
    time: String,
    date: Date,
    incidentNum: Number,
    address: String,
    resolution: String
  }
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
