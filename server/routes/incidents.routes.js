const express = require('express');
const Incident = require('../db/models/incident.model');
const projectionBuilder = require('../utils/projectionBuilder');

const router = express.Router();

var incidentsProjection = {
  _id: 1,
  type: 1,
  geometry: 1,
  properties: 1
};

const incidentsFields = [
  '_id', 'type', 'geometry', 'properties'
]

router.get('/incidents', function(req, res){
    let query = req.query;
    if (query.fields) {
      incidentsProjection = projectionBuilder(query.fields, incidentsFields);
      delete query.fields;
    }
    let incidentsQuery = Incident.find(query).select(incidentsProjection);
    incidentsQuery.exec(function(err, incidents){
      res.json(incidents);
    });
  });

module.exports = router;
