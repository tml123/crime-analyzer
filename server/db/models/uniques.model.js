const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueSchema = new Schema({
    category: Array,
    description: Array,
    district: Array,
    incidentNum: Array,
    address: Array,
    resolution: Array
});

const Unique = mongoose.model('Unique', uniqueSchema);

module.exports = Unique;
