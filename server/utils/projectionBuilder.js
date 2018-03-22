const projectionBuilder = function(projectionString, listMapping) {
  let projection = {};
  for (var i = 0; i < projectionString.length; i++) {
    if (parseInt(projectionString.charAt(i))) {
      projection[listMapping[i]] = 1
    }
  }
  return projection;
};

module.exports = projectionBuilder;
